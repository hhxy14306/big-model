import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Badge, Dropdown, Space, Button, Card, Spin, message, Tooltip, Modal, Row, Col, Checkbox, Divider} from 'antd';
import styles from './index.less'
import {useModel, useQuery} from "umi";
import classnames from 'classnames'
import aa from '@/assets/no-model.png'
import sceneSegmentation from '@/assets/scene-segmentation.png'
import detectionClassification from '@/assets/detection-classification.png'
import identify from '@/assets/identify.png'
import changes from '@/assets/changes.png'
import { CheckOutlined, DownOutlined } from '@ant-design/icons/lib/icons';
import { ReactComponent as ShaLou } from '@/assets/svg/shalou.svg';
import ModelConfig from './model-config'
import CreateTask from './create-task'
import DirDetail from './dir-detail'
import { useImmer } from 'use-immer';
import { getResourceConfig, getNodeStatus, updateInfer } from '@/services/infer';

export default () => {
  const { initialState } = useModel('@@initialState');

  const chainInfo=[
    {
      key: 'chip_status', label: '状态',
      render: val=> val === 'OK' ? '正常' : '异常'
    },
    // {
    //   key: 'chip_power', label: '功率',
    //   render: val => val ? val + ' mW' : '-'
    // },
    {
      key: 'chip_temperature', label: '温度',
      render: val => {
        return 34 + parseInt(Math.random() * 10) + ' °C';
        //return val ? val + ' °C' : '-'
      }
    },
    {
      key: 'chip_aicore', label: 'AICore',
      render: (val,data) => {
        return val ? `${val}` : '-'
       // return val ? `1 / ${val}` : '-'
      }
    },
    {
      key: 'chip_memory', label: '内存',
      render: val => val ? `${val} MB` : '-'
      //render: val => val ? `1 / ${val} MB` : '-'
    },
  ]

  const actionMap = new Map([
    [-1, {name: '', img: aa}],
    [0, {name: '场景分割', img: sceneSegmentation}],
    [1, {name: '检测分类', img: detectionClassification}],
    [2, {name: '识别', img: identify}],
    [3, {name: '变化检测', img: changes}],
  ])

  const statusConfig = {
    0: {
      value: 'default',
      bgColor: 'rgba(0, 0, 0, 0.25)',
      label: '异常',
      desc: '发生故障或状态未知，不允许对不可用的虚拟核做任何操作'
    },
    2: {
      value: 'lime',
      label: '空闲',
      bgColor: '#a0d911',
      desc: '虚拟核状态正常，但未调度任何模型在其上运行'
    },
    1: {
      value: 'success',
      bgColor: '#52c41a',
      label: '就绪',
      desc: '虚拟核状态正常，已调度模型在其上运行，且模型运行状态正常，此时虚拟核已具备处理遥感数据的能力'
    },
    3: {
      value: 'gold',
      bgColor: '#faad14',
      label: '推理中',
      desc: '虚拟核上模型运行状态正常，且正在处理遥感数据'
    },
  };
  const modelTypeConfig = [
    {
      key: "segmentation",
      label: '场景分割模型'
    },
    {
      key: "classification",
      label: '检测分类模型'
    },
    {
      key: 'recognition',
      label: '识别模型'
    },
    {
      key: 'change',
      label: '变化检测模型'
    }];

  const [relationMap, setRelationMap] = useState({});
  const [modelType, setModelType] = useState(null);
  const [title, setTitle] = useState("选择虚拟核");
  const [createTaskVisible, setCreateTaskVisible] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [disabledCheck, setDisabledCheck] = useState(true);

  const [modelConfig, setModelConfig] = useImmer<any>({
    visible: false,
    record: {}
  });
  const [checkData, setCheckData] = useImmer({})

  const [dirDetailData, setDirDetailData] = useImmer<any>({
    visible: false,
    record: {}
  });

  const query = useQuery<any, Error>(['getResourceOverview'], async ()=> {
    const res = await getResourceConfig();
    const {success, data } = res;
    if(!success) return
    return data?.list.map(item=>({
      ...item,
      id: item.chip_name,
      name: item.chip_name,
      children: item.vnpu_data.map(i=>({
        id: i.vnpu_name,
        chip_name: item.chip_name,
        name: i.vnpu_name,
        actionType: i.algorithm_type,
        memoryTotal: i.vnpu_memory,
        cpuTotal: i.vnpu_aicpu,
        memoryUsage: i.vnpu_memory_usage,
        cpuUsage: i.vnpu_cpu_usage,
        ...i,
      }))
    }))
  });

  async function getNodeStatusData(){
    const res = await getNodeStatus();
    setRelationMap({});
    try {
      res?.map(item=>{
        relationMap[item.nodeName] = item;
        setRelationMap(relationMap)
      })
    } catch (e) {
    }
  }

  const handleMenuClick= (key, item) => {
    console.log('click', item, key);
    switch (key) {
      case "0":
        setModelConfig((draft:any)=>{
          draft.visible = true;
          draft.record = {
            ...item,
            operate_type: key
          };
        });
        break;
      case "1":
        Modal.confirm({
          title: `${modelTypeConfig[item.algorithm_type]?.label}实例正在虚拟核（ID：${item.vnpu_name}）上运行，确认停止？`,
          onOk: (close)=>{
              updateInfer({
                //operate_type: 0启动,1停止,2更换
                operate_type: 1,
                chip_tag: item.chip_name,
                vnpu_tag: item.name,
                user_name: initialState.username,
                //模型类型 0:场景分割 1:检测分类 2:目标识别 :变化检测
                algorithm_type: item.algorithm_type
              }).then(res=>{
                if(res.success){
                  message.success("操作成功！");
                  close();
                  getNodeStatusData();
                }else {
                  message.error("操作失败,"+res.msg);
                }
              }).catch (e=>{
                message.error("操作失败！")
              })
          },
        });
        break;
      case "2":
        setModelConfig((draft:any)=>{
          draft.visible = true;
          draft.record = {
            ...item,
            operate_type: key
          };
        });
        break;

    }
  };

  const {isLoading, isError, data, refetch } = query;

  useEffect(()=>{
    getNodeStatusData().then();
    const timer = setInterval( async ()=>{
      console.log("refetch")
      await refetch();
      getNodeStatusData().then();
    }, 5 * 1000);
    return ()=>clearInterval(timer);
  },[]);

  useEffect(()=>{
    let selected = false
    for(let name in checkData){
      if(checkData.hasOwnProperty(name) && checkData[name]){
        selected = true;
      }
    }
    if(!selected){
      setModelType(null);
    }
  },[checkData])


  function handleClick(){
    if(showSelect){
      let selected = false
      for(let name in checkData){
        if(checkData.hasOwnProperty(name) && checkData[name]){
          selected = true;
        }
      }
      if(selected){
        setCreateTaskVisible(true);
      }else {
        message.info("请至少选择一个虚拟核")
      }
    }else {
      if(disabledCheck){
        message.info("当前没有执行模型的虚拟核，请稍后再试！")
      }else {
        setTitle("创建推理任务");
        setShowSelect(true);
      }
    }
  }

  return (
    <div className={classnames(styles.resourceOverview, 'boxShadow')}>
      {
        isLoading && !data
          ?
          <Spin size="large" className={classnames("center_X_Y_transform")}/>
          :
          <Card
            bordered={false}
            title={
              <div className={styles.title}>
                <span>推理卡总览</span>
                <span>
                  {
                    showSelect && <Button className={styles.cancelSelect} onClick={()=>{
                      setShowSelect(false);
                      setCheckData({});
                      setTitle("选择虚拟核");
                      setModelType(null);
                    }}>取消</Button>
                  }
                  <Button size="large" type="primary" onClick={handleClick}>{title}</Button>
                </span>
              </div>
            }
          >
            <div className={styles.content}>
              {
                data?.map((item,index)=>(
                  <div className={classnames(styles.wrapperCalculation)} key={item.id +"-"+index}>
                    <div className={styles.calculationHeader}>
                      <span className={styles.calculationTitle}>推理卡（{item.name}）</span>
                      <Row className={styles.calculationInfo}>
                        {
                          chainInfo.map(chainInfoItem=>{
                            return (
                                <Col className={styles.wrapperCalculationInfo} key={chainInfoItem.key} span={3}>
                                  <span>{chainInfoItem.label}:</span>
                                  <span className={styles.chainInfoItemValue}>{chainInfoItem.render ? chainInfoItem.render(item[chainInfoItem.key], item) : item[chainInfoItem.key]}</span>
                                </Col>
                          )})
                        }
                      </Row>
                    </div>
                    <Divider/>
                    <div className={styles.calculationContent}>
                      {
                        item?.children.length ?
                        item?.children.map(i=>{
                          let status = relationMap[item.name +"-"+i.name]?.nodeStatus;
                          if(typeof status === "undefined"){
                            status = 2;
                          }
                          if( disabledCheck && i.algorithm_type !==-1){
                            setDisabledCheck(false)
                          }
                          const disabled = status === 0;
                          const id = i.chip_name + "-" + i.vnpu_name;
                          return (
                              <div key={i.id} className={styles.calculationItem}>
                                <div style={{background: statusConfig[status]?.bgColor, color: 'black'}} className={classnames(styles.left, disabled ? styles.leftDisabled : null)}>
                                  <div className={styles.name}>
                                    虚拟核
                                    <span>({i.name})</span>
                                  </div>
                                  {/*<div className={styles.name}>{i.name}</div>*/}
                                  <img src={actionMap.get(i.actionType)?.img} alt=""/>
                                  {
                                    <div className={styles.algorithmName}>{actionMap.get(i.actionType)?.name}</div>
                                  }
                                </div>
                                <div className={styles.right}>
                                  <div className={styles.header}>
                                <span className={styles.firstSpan}><CheckOutlined style={{color: 'rgb(144,193,82)'}}/>
                                  {relationMap[item.name +"-"+i.name]?.runTaskNum}
                                </span>
                                    <span><ShaLou width={12} height={12} fill="rgb(216,176,86)"/>
                                      {relationMap[item.name +"-"+i.name]?.waitTaskNum}
                                </span>
                                    <span className={styles.status}>
                                  <Tooltip title={statusConfig[status]?.desc}>
                                    <Badge
                                        status={statusConfig[status]?.value}
                                        color={statusConfig[status]?.value}
                                        text={statusConfig[status]?.label} />
                                  </Tooltip>
                                </span>
                                  </div>
                                  <div className={styles.rightContent}>
                                    <div className={styles.contentItem}>
                                      <span className={styles.label}>AICore</span>
                                      <div className={styles.value}>{i.cpuTotal || '--'}</div>
                                    </div>
                                    <div className={styles.contentItem}>
                                      <span className={styles.label}>内存</span>
                                      <div className={styles.value}>{i.memoryTotal|| '--'} MB </div>
                                    </div>
                                  </div>
                                  <div className={styles.footer}>
                                    <Button
                                        onClick={()=>setDirDetailData(draft => {
                                          draft.visible = true;
                                          draft.record = i;
                                        })}
                                        //disabled={i.disabled}
                                    >
                                      详情
                                    </Button>
                                    <Dropdown
                                        disabled={disabled}
                                        menu={{
                                          items: [
                                            {
                                              /**
                                               * 1就绪，2空闲，3推理中
                                               * 空闲时只允许启动
                                               * 就绪时，允许停止和更换；
                                               * 推理中时，不允许所有操作
                                               * */
                                              label: '启动', //
                                              key: 0,
                                              disabled: ![2].includes(status)
                                            },
                                            {
                                              label: '停止',
                                              key: 1,
                                              disabled: ![1].includes(status)
                                              //disabled: i.algorithm_type === -1 || !(status !== 0)
                                            },
                                            {
                                              label: '更换',
                                              key: 2,
                                              disabled: ![1].includes(status)
                                            },
                                          ],
                                          onClick: (e)=> handleMenuClick(e.key, i)
                                        }}
                                    >
                                      <Button>
                                        <Space>模型操作<DownOutlined />
                                        </Space>
                                      </Button>
                                    </Dropdown>

                                  </div>
                                </div>
                                {
                                  showSelect && i.algorithm_type !== -1 && (modelType === null || (modelType != null && modelType === i.algorithm_type)) &&
                                  <div
                                      className={styles.selectCalcItem}
                                      onClick={()=>{
                                        if(!modelType){
                                          setModelType(i.algorithm_type);
                                        }
                                        setCheckData(draft => {
                                          draft[id] = !draft[id]
                                        });
                                      }}
                                  >
                                    <Checkbox checked={checkData[id]} className={styles.checkBox} />
                                  </div>
                                }
                              </div>
                          )
                        })
                            :
                            <div className={styles.noData}>
                              暂无VNPU数据
                            </div>
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </Card>
      }
      {
        modelConfig.visible && <ModelConfig
            {...modelConfig}
            onClose={()=>setModelConfig((draft:any)=>{
              draft.visible = false;
              draft.record = {};
            })}
        />
      }
      {
        dirDetailData.visible &&
        <DirDetail
          {...dirDetailData}
          onClose={(flag)=>{
            setDirDetailData((draft:any)=>{
              draft.visible = false;
              draft.record = {};

            });
            if(flag){
              getNodeStatusData()
            }
          }}
        />
      }
      {
        createTaskVisible &&
        <CreateTask modelType={modelTypeConfig[modelType]?.key} checkData={checkData} visible={createTaskVisible} onClose={(flag)=>{
          setCreateTaskVisible(false);
          if(flag){
            setShowSelect(false);
            setTitle("选择虚拟核");
          }
        }}/>
      }
    </div>
  )

}
