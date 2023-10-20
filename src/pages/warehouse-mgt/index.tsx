import React, {useEffect, useMemo, useState} from "react";
import styles from './index.less'
import classnames from "classnames";
import {ConfigProvider, Divider, Input, Select, Modal, Table, message} from "antd";
import {getWarehouse, getBoardOperate, delBoard} from "@/services/warehouse";
import {useQuery} from "umi";
import {useImmer} from "use-immer";
import dayjs from 'dayjs';
import AddBoard from './add-board'
import {updateInfer} from "@/services/infer";

export default function (props) {

    const columnsLeft = [
        {
            title: '名称',
            dataIndex: 'operatorName',
            key: 'operatorName',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '版本',
            dataIndex: 'version',
            align: 'center',
            key: 'version',
            ellipsis: true,
        },
        {
            title: '编号',
            dataIndex: 'number',
            align: 'center',
            key: 'number',
            ellipsis: true,
        },
        {
            title: '说明',
            dataIndex: 'explain',
            key: 'explain',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            align: 'center',
            width: '2rem',
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'log_content',
            align: 'center',
            key: 'log_content',
            width: '.8rem',
            render: (_,record)=>{
               return (
                   <span>
                       <a onClick={(e)=>{
                           e.stopPropagation();
                           setBoardState(draft => {
                               console.log(record)
                               draft.visible = true;
                               draft.record = record;
                           })
                       }}>添加</a>
                       {/*<Divider type="vertical"/>*/}
                       {/*<a>测试</a>*/}
                   </span>

               )
            }
        },
    ]

    const columns = [
        {
            title: '机箱名称',
            dataIndex: 'operatorName',
            align: 'center',
            key: 'operatorName',
            ellipsis: true,
        },
        {
            title: '板卡名称',
            dataIndex: 'boardName',
            align: 'center',
            key: 'boardName',
            ellipsis: true,
        },
        {
            title: '库名称',
            dataIndex: 'wareName',
            align: 'center',
            key: 'wareName',

        },
        {
            title: '库编号',
            dataIndex: 'number',
            align: 'center',
            key: 'number',
        },
        {
            title: '版本',
            dataIndex: 'version',
            align: 'center',
            key: 'version',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            align: 'center',
            key: 'operate',
            width: '.8rem',
            render: (_,record)=>{
                return (
                    <span>
                       <a onClick={(e)=>{
                           e.stopPropagation();
                           handleDelete(record);
                       }}>删除</a>
                        {/*<Divider type="vertical"/>*/}
                        {/*<a>测试</a>*/}
                   </span>

                )
            }
        },
    ];

    const [boardState, setBoardState] = useImmer({
        visible: false,
        record: {}
    })

    const [leftTable, setLeftTable] = useImmer({
        loading: false,
        data: []
    });
    const [rightTable, setRightTable] = useImmer({
        loading: false,
        data: []
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [selectedRows, setSelectedRows] = useState([]);


    const [pagination, setPagination]=useImmer({
        current: 1,
        pageSize: 10,
        total: 0
    })

    useEffect(()=>{
        Promise.all([getWarehouseData(),getBoardOperateData()]).then()
    },[])

    async function getWarehouseData(){
        setLeftTable(draft => {
            draft.loading = true;
        });
        const res = await getWarehouse();
        if(res.code === 200){
            setLeftTable(draft => {
                draft.data = res.data;
                draft.loading = false;
            })
        }

    }

    async function getBoardOperateData(){
        setLeftTable(draft => {
            draft.loading = true;
        });
        const res = await getBoardOperate();
        if(res.code === 200){
            setRightTable(draft => {
                draft.data = res.data;
                draft.loading = false;
            })
        }

    }

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        // setFilteredInfo(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const rowSelection = {
        type: 'radio',
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    const rightRowSelection = useMemo(()=>{
        return {
            //type: 'radio',
            selectedRowKeys: selectedRowKeys
            //selectedRowKeys: rightTable.data.filter(item=>item.number === selectedRowKeys[0])
        }
    },[selectedRowKeys]);
    console.log(rightRowSelection)

    async function handleDelete(record) {
        Modal.confirm({
            title: `确认删除${record.number}？`,
            onOk: (close)=>{
                delBoard(record).then(res=>{
                    if(res.success){
                        message.success("操作成功！");
                        close();
                        getBoardOperateData();
                    }else {
                        message.error("操作失败,"+res.msg);
                    }
                }).catch (e=>{
                    message.error("操作失败！")
                })
            },
        })

    }
    return(
        <div className={classnames(styles.szMgtContainer,'boxShadow')}>
            <div className={classnames(styles.leftTable, styles.wrapperTable, 'boxShadow')}>
                <Table
                    title={()=>"仓库列表"}
                    rowKey='number'
                    dataSource={leftTable.data}
                    columns={columnsLeft}
                    rowSelection={rowSelection}
                    onRow={(record) => {
                        return {
                            onClick: (event) => {
                                console.log(record);
                                setSelectedRows([record]);
                                setSelectedRowKeys([record.number])
                            }, // 点击行
                            onDoubleClick: (event) => {},
                            onContextMenu: (event) => {},
                            onMouseEnter: (event) => {}, // 鼠标移入行
                            onMouseLeave: (event) => {},
                        };
                    }}
                />
            </div>
            <div className={classnames(styles.rightTable, styles.wrapperTable, 'boxShadow')}>
                <Table
                    title={()=>"板卡信息"}
                    columns={columns}
                    rowKey="number"
                    rowSelection={rightRowSelection}
                    dataSource={rightTable.data}
                    pagination={pagination}
                    onChange={handleChange}
                />

            </div>
            <AddBoard
                visible={boardState.visible}
                record={boardState.record}
                onClose={()=>{
                    setBoardState(draft => {
                        draft.visible = false
                    })}
                }
            />
        </div>
    )

}
