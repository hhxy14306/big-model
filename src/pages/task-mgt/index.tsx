import React, {useEffect, useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {Badge, Form, Input, Select, Spin, Table, Tabs} from "antd";
import {useQuery} from "umi";
import {getBoardList,getTaskList} from "@/services/warehouse";
import {useImmer} from "use-immer";
import dayjs from "dayjs";
import {AudioOutlined, SearchOutlined} from "@ant-design/icons";

export default function (props) {

  const columns = [
    {
      title: '任务ID',
      dataIndex: 'taskID',
      key: 'taskID',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '算子名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '任务提交时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
  ];

  const resultColumns = [
    {
      title: '任务ID',
      dataIndex: 'taskID',
      key: 'taskID',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '板卡',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '算子名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '优先级',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '任务提交时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: '完成时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: '执行结果',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      render: text=> {
        // const data = {
        //
        // }
        // return <Badge status={data[text]?.value} text={data[text]?.label} />
      }

    },
  ];

  const [form] = Form.useForm();

  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination]=useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [tab, setTab] = useImmer({
    items: [],
    defaultActiveKey: ''
  });

  useEffect(()=>{
    Promise.all([getBoardData()]).then()
  },[]);

  async function getBoardData(){
    console.log(2222222)
    const res = await getBoardList();
    if(res.code === 200){
      setTab(draft => {
        draft.defaultActiveKey = res.data[0].code;
        draft.items = res.data.map(item=>({key: item.code, label: item.name}))
      });
    }
  }


  const query = useQuery<any, Error>(['getTaskList',tab.defaultActiveKey], async ()=> {
    const res = await getTaskList();
    if(res.code === 200){
      return res.data
    }
  },{
    // 未选中defaultActiveKey，查询不会执行
    enabled: tab.defaultActiveKey !== '',
  })

  const resultTask = useQuery<any, Error>(['getTaskResultList',searchParams], async ({queryKey})=> {
    const [_,params] = queryKey;
    const res = await getTaskList(params);
    if(res.code === 200){
      return res.data
    }
  },{
    // 未选中defaultActiveKey，查询不会执行
    enabled: tab.defaultActiveKey !== '',
  })

  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    // setFilteredInfo(filters);
    // setSortedInfo(sorter as SorterResult<DataType>);
  };

  const onChange = (key: string) => {
    console.log(key)
    setTab(draft => {
      draft.defaultActiveKey = key;
    })
  };
  async function handleSearch(){
    const values = form.getFieldsValue();
    setSearchParams(values);
  }

  const {isLoading, isError, data } = query;

  return(
      <div className={classnames(styles.taskContainer,'boxShadow')}>
        <div className={classnames(styles.runningTaskArea,'boxShadow')}>
          <Tabs defaultActiveKey={tab.defaultActiveKey} items={tab.items} onChange={onChange} />
          <Table
              rowKey="number"
              className={styles.runningTaskTable}
              columns={columns}
              dataSource={data}
              loading={isLoading}
              pagination={false}
              //pagination={pagination}
              onChange={handleChange}
          />
        </div>

        <div className={classnames(styles.resultTaskArea,'boxShadow')}>
          <Form form={form} className={styles.tableHeader} autoComplete="off">
            <Form.Item  name="user_name">
              <Input
                  placeholder="请输入算子名称"
                  className={styles.searchInput}
                  onPressEnter={handleSearch}
                  suffix={<SearchOutlined onClick={handleSearch} className={styles.searchIcon}/>}
              />
            </Form.Item>
            <Form.Item name="boardName">
              <Input
                  placeholder="请输入板卡名称"
                  className={styles.searchInput}
                  onPressEnter={handleSearch}
                  suffix={<SearchOutlined onClick={handleSearch} className={styles.searchIcon}/>}
              />
            </Form.Item>
          </Form>
          <Table
              rowKey="number"
              className={styles.resultTaskTable}
              columns={resultColumns}
              dataSource={resultTask.data}
              loading={resultTask.isLoading}
              pagination={false}
              //pagination={pagination}
              onChange={handleChange}
          />
        </div>
      </div>
  )

}
