import React, {useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {Input, Select, Spin, Table} from "antd";
import {getLog} from "@/services/log";
import {useQuery} from "umi";
import {useImmer} from "use-immer";
import dayjs from 'dayjs';

export default function (props) {

    const columns: ColumnsType<DataType> = [
        {
            title: '板卡名称',
            dataIndex: 'card_type',
            key: 'card_type',
            render: text=>{
                const logInfo={
                    info: '通知',
                    warn: '警告',
                    error: '错误',
                }
                return logInfo[text]
            }
        },
        {
            title: '日志类型',
            dataIndex: 'log_type',
            key: 'log_type',
            render: text=>{
                const logInfo={
                    info: '通知',
                    warn: '警告',
                    error: '错误',
                }
                return logInfo[text]
            }
        },
        {
            title: '日志内容',
            dataIndex: 'log_content',
            key: 'log_content',
        },
        {
            title: '日志时间',
            dataIndex: 'log_time',
            key: 'log_time',
            ellipsis: true,
            render: text=>dayjs(text).format('YYYY-MM-DD HH:MM:ss:ms')
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



    const query = useQuery<any, Error>(['getLogInfo'], async ()=> {
        const params = {
            ...searchParams
        }
        const res = await getLog(params);
        if(res.success){
            setPagination(draft => {
                draft.total = res.data.total
            })
        }
        return res.data.list
    })
    const {isLoading, isError, data } = query;
    console.log("logData", data)
    if(isLoading) return <Spin size="large" className={classnames("center_X_Y_transform")}/>

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    return(
        <div className={classnames(styles.logContainer,'boxShadow')}>
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
