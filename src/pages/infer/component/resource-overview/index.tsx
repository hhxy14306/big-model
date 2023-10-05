import React, { useEffect, useRef, useState } from 'react';
import {Badge, Dropdown, Space, Button, Card, Spin, message, Tooltip, Modal, Row, Col} from 'antd';
import styles from './index.less'
import {useQuery} from "umi";
import classnames from 'classnames'
import aa from '@/assets/yay.jpg'
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

  const chainInfo=[
    {
      key: 'chip_status', label: '芯片状态',
      render: val=>val
    },
    {
      key: 'chip_power', label: '功率',
      render: val => val ? val + 'mW' : '-'
    },
    {
      key: 'chip_temperature', label: '温度',
      render: val => val ? val + '°C' : '-'
    },
    {
      key: 'chip_aicore', label: 'AI核心',
      render: val => val ? val + 'core' : '-'
    },
    {
      key: 'chip_memory', label: '内存',
      render: val => val ? val + 'GB' : '-'
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
      label: '异常',
      desc: '发生故障或状态未知，不允许对不可用的虚拟核做任何操作'
    },
    1: {
      value: 'lime',
      label: '空闲',
      desc: '虚拟核状态正常，但未调度任何模型在其上运行'
    },
    2: {
      value: 'success',
      label: '就绪',
      desc: '虚拟核状态正常，已调度模型在其上运行，且模型运行状态正常，此时虚拟核已具备处理遥感数据的能力'
    },
    3: {
      value: 'orange',
      label: '繁忙',
      desc: '虚拟核上模型运行状态正常，且正在处理遥感数据'
    },
  }
  const relationMap = useRef(new Map());
  const [createTaskVisible, setCreateTaskVisible] = useState(false)
  const [modelConfig, setModelConfig] = useImmer<any>({
    visible: false,
    record: {}
  });

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
        memoryUsage: i.vnpu_memory,
        cpuUsage: i.vnpu_aicpu,
        ...i,
      }))
    }))
  });

  async function getNodeStatusData(){
    const res = await getNodeStatus();
    try {
      console.log(res)
      res?.map(item=>{
        relationMap.current.set(item.nodeName, item)
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
          title: `模型 ${item.vnpu_name} 正在 ${item.chip_name} 上运行，是否停止？`,
          onOk: (close)=>{
              updateInfer({
                chip_tag: item.chip_name,
                vnpu_tag: item.name,
              }).then(res=>{
                if(res.success){
                  message.success("操作成功！");
                  close();
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
    //message.info('Click on menu item.');
  };

  const {isLoading, isError, data, refetch } = query;
  console.log("relationMap",relationMap);

  useEffect(()=>{
    console.log("get data123");
    getNodeStatusData().then();
    const timer = setInterval( async ()=>{
      console.log("get data");
      await refetch();
      getNodeStatusData().then();
    }, 5 * 1000);
    return ()=>clearInterval(timer);
  },[]);

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
                <span>资源总览</span>
                <Button onClick={()=>setCreateTaskVisible(true)}>推理任务</Button>
              </div>
            }
          >
            <div className={styles.content}>
              {
                data?.map(item=>(
                  <div className={classnames(styles.wrapperCalculation)} key={item.id}>
                    <div className={styles.calculationHeader}>
                      <span className={styles.calculationTitle}>推理卡（{item.name}）</span>
                      <Row className={styles.calculationInfo}>
                        {
                          chainInfo.map(chainInfoItem=>{
                            return (
                                <Col key={chainInfoItem.key} span={3}>
                                  <span>{chainInfoItem.label}:</span>
                                  <span className={styles.chainInfoItemValue}>{chainInfoItem.render(item[chainInfoItem.key])}</span>
                                </Col>
                          )})
                        }
                      </Row>
                    </div>
                    <div className={styles.calculationContent}>
                      {
                        item?.children.length ?
                        item?.children.map(i=>{
                          let status = relationMap.current.get(item.name +"-"+i.name)?.nodeStatus;
                          if(typeof status === "undefined"){
                            status = 1;
                          }
                          return (
                              <div key={i.id} className={styles.calculationItem}>
                                <div className={classnames(styles.left, i.disabled ? styles.leftDisabled : null)}>
                                  <div className={styles.name}>
                                    虚拟核
                                    <span>({i.name})</span>
                                  </div>
                                  {/*<div className={styles.name}>{i.name}</div>*/}
                                  <img src={actionMap.get(i.actionType)?.img} alt=""/>
                                  {
                                    !i.disabled &&
                                    <div className={styles.algorithmName}>{actionMap.get(i.actionType)?.name}</div>
                                  }
                                </div>
                                <div className={styles.right}>
                                  <div className={styles.header}>
                                <span className={styles.firstSpan}><CheckOutlined style={{color: 'rgb(144,193,82)'}}/>
                                  {relationMap.current.get(item.name +"-"+i.name)?.runTaskNum}
                                </span>
                                    <span><ShaLou width={12} height={12} fill="rgb(216,176,86)"/>
                                      {relationMap.current.get(item.name +"-"+i.name)?.waitTaskNum}
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
                                      <span className={styles.label}>CPU({i.memoryTotal}核)</span>
                                      <div className={styles.value}>{i.cpuUsage || '--'}</div>
                                    </div>
                                    <div className={styles.contentItem}>
                                      <span className={styles.label}>内存({i.cpuTotal}MB)</span>
                                      <div className={styles.value}>{i.memoryUsage || '--'}</div>
                                    </div>
                                  </div>
                                  <div className={styles.footer}>
                                    <Button onClick={()=>setDirDetailData(draft => {
                                      draft.visible = true;
                                      draft.record = i;
                                    })} disabled={i.disabled}>详情</Button>
                                    <Dropdown
                                        disabled={i.disabled}
                                        menu={{
                                          items: [
                                            {
                                              label: '启动模型',
                                              key: 0,
                                              disabled: status !== 1
                                            },
                                            {
                                              label: '停止模型',
                                              key: 1,
                                              disabled: status !== 2
                                            },
                                            {
                                              label: '更换模型',
                                              key: 2,
                                              disabled: status !== 1 && status !== 2
                                              //danger: true,
                                            },
                                          ],
                                          onClick: (e)=> handleMenuClick(e.key, i)
                                        }}
                                    >
                                      <Button>
                                        <Space>
                                          操作
                                          <DownOutlined />
                                        </Space>
                                      </Button>
                                    </Dropdown>

                                  </div>
                                </div>
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
          onClose={()=>setDirDetailData((draft:any)=>{
            draft.visible = false;
            draft.record = {};
          })}
        />
      }
      {
        createTaskVisible &&
        <CreateTask visible={createTaskVisible} onClose={()=>{
          setCreateTaskVisible(false)
        }}/>
      }
    </div>
  )

}
