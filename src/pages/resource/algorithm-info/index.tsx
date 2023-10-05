import React, {useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {DatePicker, Input, Select, Spin, Table} from "antd";
import {useQuery} from "umi";
import {getNodeInfo} from "@/services/resource";
import {useImmer} from "use-immer";

export default function (props) {

    const [status, setStatus] = useState(0);
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

    const [searchParams, setSearchParams] = useImmer({
        start_time: -1,
        end_time: -1
    });

    const columns: ColumnsType<DataType> = [
        {
            title: '模型名称',
            dataIndex: 'algorithm_name',
            key: 'algorithm_name',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '状态',
            dataIndex: 'algorithm_status',
            align: 'center',
            key: 'algorithm_status',
            ellipsis: true,
        },
        {
            title: '运行节点',
            dataIndex: 'algorithm_node',
            key: 'algorithm_node',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '所属芯片',
            dataIndex: 'algorithm_project',
            align: 'algorithm_project',
            key: 'cpu',
        },
        {
            title: '容器组IP',
            dataIndex: 'algorithm_ip',
            key: 'algorithm_ip',
            align: 'center',
        },
        {
            title: '更新时间',
            dataIndex: 'algorithm_update_time',
            align: 'center',
            key: 'algorithm_update_time',
        },
    ];
    const [pagination, setPagination]=useImmer({
        current: 1,
        pageSize: 10,
        total: 0
    })

    const query = useQuery<any, Error>(['resource_getAlgorithmInfo'], async ()=> {
        const params = {
            ...searchParams
        };

        const res = await getNodeInfo(params);
        if(res.success){
            setPagination(draft => {
                draft.total = res.data.total
            })
        }
        return res.data.algorithm_info
    })
    const {isLoading, isError, data } = query;
    if(isLoading) return <Spin size="large" className={classnames("center_X_Y_transform")}/>
    return(
        <div className={classnames(styles.algorithmInfo,'boxShadow')}>
            <div className={styles.tableHeader}>
                <Select value={status} options={options} onChange={e=>console.log(e)}/>
                <Input.Search
                    placeholder="搜索"
                    className={styles.searchInput}
                    //suffix="search"
                />
                {/*<DatePicker />*/}
            </div>
            <Table
                rowKey="algorithm_name"
                columns={columns}
                dataSource={data}
                pagination={pagination}
            />

        </div>
    )

}
