import React,{useState,} from "react";
import styles from './index.less'
import {Row, Col, Spin, Table, Space, Input} from "antd";
import {useQuery} from "umi";
import {getNodeInfo} from "@/services/resource";
import classnames from "classnames";
import {ReactComponent as NodeSvg } from '@/assets/resource/node.svg'
import {RedoOutlined} from "@ant-design/icons/lib/icons";
import Monitor from './monitor'
import {useImmer} from "use-immer";

export default function (props: any){

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const [pagination, setPagination]=useImmer({
        current: 1,
        pageSize: 10,
        total: 0
    })
    const [searchParams, setSearchParams] = useImmer({
        start_time: -1,
        end_time: -1
    });
    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };

    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'node_name',
            key: 'node_name',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '状态',
            dataIndex: 'node_status',
            key: 'node_status',
            align: 'center',
        },
        {
            title: '角色',
            dataIndex: 'node_role',
            key: 'node_role',
            ellipsis: true,
        },
        {
            title: 'CPU总量',
            dataIndex: 'cpu_total',
            key: 'cpu_total',
        },
        {
            title: 'CPU已使用',
            dataIndex: 'cpu_used',
            key: 'cpu_used',
        },
        {
            title: 'CPU使用率',
            dataIndex: 'cpu_usage',
            key: 'cpu_usage',
        },
        {
            title: '内存总量',
            dataIndex: 'mem_total',
            key: 'mem_total',
        },
        {
            title: '内存已使用',
            dataIndex: 'mem_used',
            key: 'mem_used',
        },
        {
            title: '内存使用率',
            dataIndex: 'mem_usage',
            key: 'mem_usage',
        },
        {
            title: '容器组总量',
            dataIndex: 'container_group_total',
            key: 'container_group_total',
        },
        {
            title: '容器组已使用',
            dataIndex: 'container_group_used',
            key: 'container_group_used',
        },
        {
            title: '容器组使用率',
            dataIndex: 'container_group_usage',
            key: 'container_group_usage',
        },
    ];
    const tableHeaderConfig = [
        {
            key: 'nodeCount',
            label: '节点'
        },
        {
            key: 'controlNodeCount',
            label: '控制平面节点'
        },
        {
            key: 'workNodeCount',
            label: '工作节点'
        },
    ]

    const query = useQuery<any, Error>(['resource_getNodeInfo'], async ()=> {
        const params = {
            ...searchParams
        };
        const res = await getNodeInfo(params);
        console.log(res)
        if(res.success){
            setPagination(draft => {
                draft.total = res.data.total
            })
        }
        return res.data.natural_resources
    })
    const {isLoading, isError, data } = query;
    console.log(data)
    if(isLoading) return <Spin size="large" className={classnames("center_X_Y_transform")}/>
    return(
        <div className={styles.nodeInfo}>
            <div className={styles.tableArea}>
                {/*<div className={classnames(styles.nodeInfoConfig,'boxShadow')}>*/}
                {/*    <NodeSvg className={styles.nodeSvg} width={32} height={32}/>*/}
                {/*    <Row className={classnames(styles.tableHeaderNodeInfo)}>*/}
                {/*        {*/}
                {/*            tableHeaderConfig.map(item=>(*/}
                {/*                <Col key={item.key} span={4}>*/}
                {/*                    <div>{data?.nodeData[item.key]}</div>*/}
                {/*                    <div>{item.label}</div>*/}
                {/*                </Col>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </Row>*/}
                {/*</div>*/}

                <div className={classnames(styles.wrapperTable,'boxShadow')}>
                    <div className={styles.tableHeader}>
                        <Input.Search
                            size="large"
                            placeholder="搜索"
                            className={styles.searchInput}
                            //suffix="search"
                            onClick={setAgeSort}
                        />
                        {/*<RedoOutlined />*/}
                    </div>
                    <Table
                        rowKey="node_name"
                        columns={columns}
                        dataSource={data}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Monitor/>
        </div>
    )
}


