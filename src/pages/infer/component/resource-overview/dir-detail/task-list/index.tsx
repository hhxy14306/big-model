import React, { useEffect, useState, useMemo } from 'react';
import { useImmer } from 'use-immer';
import styles from './index.less';
import {Badge, Checkbox, Divider, Input, Table} from 'antd';
import {useQuery} from "umi";
import { getNodeDetail } from '@/services/infer'
import dayjs from 'dayjs';
import ShowLog from '../show-log'
import ShowDetail from '../show-detail'

export default function(props){
  const {record} = props;
  const [showLog, setShowLog] = useImmer({
      visible: false,
      record: {},
      onClose: ()=> {
          setShowLog(draft => {
              draft.visible = false
          })
      }
  });

    const [showDetail, setShowDetail] = useImmer({
        visible: false,
        record: {},
        onClose: ()=> {
            setShowDetail(draft => {
                draft.visible = false
            })
        }
    });

  const columns = [
      {
          title: '任务ID',
          dataIndex: 'taskID',
          key: 'taskID',
          width: '2.2rem',
          ellipsis: true,
          align: 'center'
      },
      {
          title: '遥感数据路径',
          dataIndex: 'folder',
          width: '2.2rem',
          ellipsis: true,
          key: 'folder',
      },
      {
          title: '提交人',
          dataIndex: 'userName',
          key: 'userName',
      },
      {
          title: '提交时间',
          dataIndex: 'createtime',
          key: 'createtime',
          align: 'center'
      },
      {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: text=> {
              // 0计算失败 1计算成功 2 计算中 3计算等待
              const data = [
                  {label: '计算失败', value: 'error'},
                  {label: '计算成功', value: 'success'},
                  {label: '计算中', value: 'processing'},
                  {label: '计算等待', value: 'warning'}
              ];
              return <Badge status={data[text]?.value} text={data[text]?.label} />
          }
      },
      {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          width: '1.7rem',
          align: 'center',
          render: (_,rowData)=>{
              const disabled = false
              return (
                  <>
                      <a
                          onClick={()=>{
                              if(disabled) return;
                              setShowDetail(draft => {
                                  draft.visible = true;
                                  draft.record = rowData;
                              })
                          }}
                          className={disabled ? styles.disabledDirLog : styles.dirLog}
                      >查看详情</a>
                      <Divider type="vertical"/>
                      <a
                          onClick={()=>{
                              if(disabled) return;
                              setShowLog(draft => {
                                  draft.visible = true;
                                  draft.record = {
                                      chipData: record,
                                      taskData: rowData,
                                  };
                              })
                          }}
                          className={disabled ? styles.disabledDirLog : styles.dirLog}
                      >
                          查看日志
                      </a>
                  </>
              )
          }
      },
  ];
  const [searchParams, setSearchParams] = useImmer<any>({
    status: [0,1,2]
  });

  const nodeName = useMemo(()=>record.chip_name + "-" + record.name,[record])

  const query = useQuery<any, Error>(['getTaskList',nodeName], async ()=> {
    console.log(1233,searchParams,record)
    const res = await getNodeDetail({
      nodeName,
      //...searchParams,
    });
    return res.taskList
  });
  const {isLoading, isError, data, refetch} = query;
  console.log(query)

  useEffect(()=>{
    refetch()
  },[searchParams])
  return (
    <span className={styles.taskList}>
        <div className={styles.searchArea}>
          <div className={styles.status}>
            <span className={styles.statusLabel}>状态：</span>
            <Checkbox.Group
              options={[
                {
                  value: 0,
                  label: '排队中'
                },
                {
                  value: 1,
                  label: '处理中'
                },
                {
                  value: 2,
                  label: '已处理'
                }
              ]}
              value={searchParams.status}
              onChange={(val)=>{
                setSearchParams(draft => {
                  draft.status = val
                })
              }}
            />
          </div>
          <Input.Search
            className={styles.inputSearch}
            placeholder="请输入提交人姓名"
            allowClear
            enterButton="搜索"
           // size="large"
            onSearch={val=>setSearchParams(draft => {
              draft.name = val
            })}
          />
        </div>
        <Table
          rowKey="taskID"
          border={false}
          dataSource={data}
          loading={isLoading}
          columns={columns} />
        {
            showLog.visible &&
            <ShowLog {...showLog}/>
        }
        {
            showDetail.visible &&
            <ShowDetail {...showDetail}/>
        }
    </span>
  )
}
