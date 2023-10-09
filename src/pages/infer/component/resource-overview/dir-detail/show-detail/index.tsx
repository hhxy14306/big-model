import {Badge, Divider, List, Modal, Table, Typography} from "antd";
import styles from "@/pages/infer/component/resource-overview/dir-detail/index.less";
import React,{useMemo} from "react/index";
import {useQuery} from "umi";
import {getTaskLog} from "@/services/infer";

export default function (props){
    const {visible, onClose, record } = props;

    const columns = [
        {
            title: '计算文件',
            dataIndex: 'filePath',
            key: 'filePath',
            width: '2.2rem',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '计算结果',
            dataIndex: 'outFile',
            width: '2.2rem',
            ellipsis: true,
            key: 'outFile',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '1.2rem',
            align: 'center',
            render: text=> {
                // 0计算失败 1计算成功 2 计算中 3计算等待
                const data = [
                    {label: '计算失败', value: 'error'},
                    {label: '计算成功', value: 'success'},
                    {label: '计算中', value: 'processing'},
                    {label: '计算等待', value: 'warning'}
                ];
                return <Badge status={data[text]?.value} text={data[text]?.label} />
            }
        },
    ];
    const data = useMemo(()=>{
        return record.fileList;
    }, [record])

    return (
        <Modal
            title="任务详情"
           // getContainer={false}
            className={styles.dirDetail}
            open={visible}
            //maskClosable={false}
            centered
            width='60vw'
            footer={null}
            onCancel={onClose}
        >
            <Table
                columns={columns}
                rowKey="filePath"
                bordered
                dataSource={data}
            />
        </Modal>

    )
}
