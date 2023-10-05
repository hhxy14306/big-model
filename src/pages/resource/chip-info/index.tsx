import React, {useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {Badge, Input, Select, Spin, Table} from "antd";
import {useImmer} from "use-immer";
import {getChainInfo} from "@/services/resource";
import {useQuery} from "umi";


export default function (props) {

    const [status, setStatus] = useState(0);
    const [pagination, setPagination]=useImmer({
        current: 1,
        pageSize: 10,
        total: 0
    })
    const [searchParams, setSearchParams] = useImmer({
        start_time: -1,
        end_time: -1
    });
    const options = [
        {
            key: 0,
            value: 0,
            label: '已完成'
        },
        {
            key: 1,
            value: 0,
            label: '等待中'
        }
    ]

    const columns: ColumnsType<DataType> = [
        {
            title: '芯片名称',
            dataIndex: 'chip_name',
            key: 'chip_name',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '芯片状态',
            dataIndex: 'chip_status',
            key: 'chip_status',
            align: 'center',
            ellipsis: true,
           // render: text=>{}
        },
        {
            title: '芯片功率',
            dataIndex: 'chip_power',
            key: 'chip_power',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '芯片温度',
            dataIndex: 'chip_temperature',
            key: 'chip_temperature',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '芯片AI核数',
            dataIndex: 'chip_aicore',
            key: 'chip_aicore',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '芯片内存',
            dataIndex: 'chip_memory',
            key: 'chip_memory',
            align: 'center',
            ellipsis: true,
        },
        // {
        //     title: 'VNPU数据',
        //     dataIndex: 'vnpu_data',
        //     key: 'vnpu_data',
        // },
    ];

    const expandedRowRender = (record) => {
        const columns: TableColumnsType<ExpandedDataType> = [
            {title: '名称', align: 'center', dataIndex: 'vnpu_name', key: 'vnpu_name'},
            {title: '内存', align: 'center', dataIndex: 'vnpu_memory', key: 'vnpu_memory'},
            {title: 'CPU', align: 'center', dataIndex: 'vnpu_aicpu', key: 'vnpu_aicpu'},
            {title: '状态', align: 'center', dataIndex: 'vnpu_status', key: 'vnpu_status',
                render: (text) => {
                    // 0:空闲 1:就绪 2:失败
                    const list = [
                        {value: "lime", label: '空闲'},
                        {value: "success", label: '就绪'},
                        {value: "error", label: '失败'},
                    ]
                    return <Badge status={list[text]?.value} text={list[text]?.label} />
                }
            },
        ];
        console.log(123,data)
        return <Table rowKey="vnpu_name" columns={columns} dataSource={record.vnpu_data} pagination={false} />;
    };

    const query = useQuery<any, Error>(['resource_getChainInfo_chipInfo'], async ()=> {
        const params = {
            ...searchParams
        };
        const res = await getChainInfo(params);
        console.log(res)
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
        <div className={classnames(styles.chipInfo,'boxShadow')}>
            {/*<div className={styles.tableHeader}>*/}
            {/*    <Select value={status} options={options} onChange={e=>console.log(e)}/>*/}
            {/*    <Input.Search*/}
            {/*        placeholder="搜索"*/}
            {/*        className={styles.searchInput}*/}
            {/*        //suffix="search"*/}
            {/*    />*/}
            {/*</div>*/}
            <Table
                rowKey="chip_name"
                columns={columns}
                dataSource={data}
                pagination={pagination}
                expandable={{
                    expandedRowRender,
                    //defaultExpandedRowKeys: ['0']
                }}
            />

        </div>
    )

}
