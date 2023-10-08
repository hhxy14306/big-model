import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import styles from './index.less';
import { Badge, Checkbox, Input, Table } from 'antd';
import {useQuery} from "umi";
import { getNodeDetail } from '@/services/infer'
import dayjs from 'dayjs';
import ShowLog from '../show-log'

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

  console.log(record)
  const columns = [
      {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center'
      },
      {
          title: '待处理数据路径',
          dataIndex: 'url',
          key: 'url',
      },
      {
          title: '提交人',
          dataIndex: 'submitPerson',
          key: 'submitPerson',
      },
      {
          title: '提交时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center'
      },
      {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: text=><Badge status={['default','processing','success'][text]} text={['排队中','处理中','已处理'][text]} />
      },
      {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          align: 'center',
          render: (_,rowData)=>{
              console.log(rowData)
              const disabled = false
              return (
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
              )
          }
      },
  ];
  const [searchParams, setSearchParams] = useImmer<any>({
    status: [1,2]
  });

  const query = useQuery<any, Error>(['getTaskList'], async ()=> {
    console.log(1233,searchParams,record)
    const res = await getNodeDetail({
      nodeName: record.chip_name + "-" + record.name,
      //...searchParams,
    });
    return res.taskList.map(item=>({
      index: item.taskID,
      submitPerson: item.userName,
      url: item.folder,
      time: item.createtime.split(" ")[0],
      //time: dayjs(new Date(item.createtime), 'YYYY-MM-DD'),
      status: 0,
    }))
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
          rowKey="index"
          border={false}
          // dataSource={data}
          dataSource={[
              {
                  id:1,
                  index: 1
              }
          ]}
          //loading={isLoading}
          columns={columns} />
        {
            showLog.visible &&
            <ShowLog {...showLog}/>
        }
    </span>
  )
}
