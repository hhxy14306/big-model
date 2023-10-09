import React, {useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {Input, Select, Spin, Table} from "antd";
import {useQuery} from "umi";
import {getWarnLog} from "@/services/warn";
import {useImmer} from "use-immer";
import dayjs from "dayjs";

export default function (props) {

  const columns: ColumnsType<DataType> = [
    {
      title: '时间',
      dataIndex: 'alarm_time',
      key: 'alarm_time',
      ellipsis: true,
      render: text=>dayjs(text).format('YYYY-MM-DD HH:MM:ss:ms')
    },
    {
      title: '内容',
      dataIndex: 'alarm_content',
      key: 'alarm content',
    },
    {
      title: '级别',
      dataIndex: 'alarm_level',
      key: 'alarm content',
    },
    {
      title: '处理措施',
      dataIndex: 'alarm_measures',
      key: 'alarm_measures',
    },
  ];

  const [searchParams, setSearchParams] = useImmer({
    start_time: -1,
    end_time: -1
  });
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

  const query = useQuery<any, Error>(['getWarnData'], async ()=> {
    const params = {
      ...searchParams
    };

    const res = await getWarnLog(params);
    if(res.success){
      setPagination(draft => {
        draft.total = res.data.total
      })
    }
    return res.data.list
  })
  const {isLoading, isError, data } = query;
  if(isLoading) return <Spin size="large" className={classnames("center_X_Y_transform")}/>

  return(
      <div className={classnames(styles.warnContainer,'boxShadow')}>
        <div className={styles.tableHeader}>
          {/*<Select value={status} options={options} onChange={e=>console.log(e)}/>*/}
          {/*<Input.Search*/}
          {/*    placeholder="搜索"*/}
          {/*    className={styles.searchInput}*/}
          {/*    //suffix="search"*/}
          {/*/>*/}
        </div>
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={handleChange}
        />

      </div>
  )

}
