import React, {useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {Button, Divider, Input, message, Modal, Select, Spin, Table} from "antd";
import CreateUpdateUser from './create-update-user'
import {useQuery} from "umi";
import {getUserList, deleteUser} from "@/services/user";
import { useImmer } from 'use-immer';

export default function (props) {

  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'user_name',
      key: 'user_name',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      width: '1.6rem',
      render:(_,row)=>{
        return (
            <>
              <a onClick={()=>{
                setVisible(true);
                setRecord(row);
              }}>修改密码</a>
              <Divider type="vertical"/>
              <a onClick={()=>{
                Modal.confirm({
                  title: `确认删除${row.user_name}?`,
                  onOk: async ()=>{
                      const res = await deleteUser({names: [row.user_name]});
                      if(res.success){
                        message.success("删除成功！")
                      }else {
                        message.error("删除失败！")
                      }
                  }
                })
              }}>删除</a>
            </>
        )
      }
    },
  ];
  const [pagination, setPagination]=useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    // setFilteredInfo(filters);
    // setSortedInfo(sorter as SorterResult<DataType>);
  };


  const query = useQuery<any, Error>(['getUserList'], async ()=> {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize
    };
    const res = await getUserList(params);
    if(res.success){
      setPagination(draft => {
        draft.total = res.data.total;
      })
    }
    return res.data.list
  })
  const {isLoading, isError, data } = query;
  console.log(data)
  if(isLoading) return <Spin size="large" className={classnames("center_X_Y_transform")}/>

  return(
      <div className={classnames(styles.userMgtContainer,'boxShadow')}>
        <div className={styles.tableHeader}>
          <Button onClick={()=>setVisible(true)} type="primary">添加用户</Button>
          {/*<Select value={status} options={options} onChange={e=>console.log(e)}/>*/}
          <Input.Search
              placeholder="请输入用户名"
              className={styles.searchInput}
              //suffix="search"
          />
        </div>
        <Table
            rowKey="user_name"
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={handleChange}
        />
          {
              visible &&
              <CreateUpdateUser
                  visible={visible}
                  record={record}
                  onClose={()=>{
                      setVisible(false)}
                  }
              />
          }
      </div>
  )

}
