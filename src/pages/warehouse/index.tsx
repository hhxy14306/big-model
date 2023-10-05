import React, {useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {Input, Select, Table} from "antd";

const dataSource: any[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];


export default function (props) {

    const warehouseColumn = [
        {
            title: '编号',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            ellipsis: true,
        },
        {
            title: '名称',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            ellipsis: true,
        },
    ];


    const columns: ColumnsType<DataType> = [
        {
            title: '时间',
            dataIndex: 'name',
            key: 'name',
            filters: [
                { text: 'Joe', value: 'Joe' },
                { text: 'Jim', value: 'Jim' },
            ],
            onFilter: (value: string, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            ellipsis: true,
        },
        {
            title: '来源',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            ellipsis: true,
        },
        {
            title: '类型',
            dataIndex: 'address',
            key: 'address',
            render: text=>{
                const logInfo={
                    info: 'info',
                    warn: 'warn',
                    error: 'error',
                }
                return
            }
        },
    ];

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        // setFilteredInfo(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

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
        <div className={classnames(styles.warehouse)}>
            <div className={classnames(styles.left,styles.wrapperTable,'boxShadow')}>
                <div className={styles.tableHeader}>
                    <span className={styles.tableTitle}>仓库列表</span>
                    {/*<Select value={status} options={options} onChange={e=>console.log(e)}/>*/}
                    {/*<Input.Search*/}
                    {/*    placeholder="搜索"*/}
                    {/*    className={styles.searchInput}*/}
                    {/*    //suffix="search"*/}
                    {/*/>*/}
                </div>
                <Table
                    columns={warehouseColumn}
                    dataSource={dataSource}
                    onChange={handleChange}
                    pagination={false}
                />

            </div>
            <div className={classnames(styles.right,styles.wrapperTable,'boxShadow')}>
                <div className={styles.tableHeader}>
                    <span className={styles.tableTitle}>仓库列表</span>
                    {/*<Select value={status} options={options} onChange={e=>console.log(e)}/>*/}
                    {/*<Input.Search*/}
                    {/*    placeholder="搜索"*/}
                    {/*    className={styles.searchInput}*/}
                    {/*    //suffix="search"*/}
                    {/*/>*/}
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    onChange={handleChange}
                />

            </div>
        </div>
    )

}
