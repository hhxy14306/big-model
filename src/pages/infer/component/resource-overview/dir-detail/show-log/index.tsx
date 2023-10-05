import {List, Modal, Typography} from "antd";
import styles from "@/pages/infer/component/resource-overview/dir-detail/index.less";
import React from "react/index";
import {useQuery} from "umi";
import {getTaskLog} from "@/services/infer";

export default function (props){
    const {visible, onClose, record } = props;

    async function getData(){
        const res = await getTaskLog();
        console.log(res)
        //return res
        return  [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
        ];

    }
    const query = useQuery<any, Error>(['getShowLogData'], getData);
    const {isLoading, isError, data, refetch} = query;

    return (
        <Modal
            title="任务日志"
           // getContainer={false}
            className={styles.dirDetail}
            open={visible}
            //maskClosable={false}
            centered
            width='60vw'
            footer={null}
            onCancel={onClose}
        >
            <List
                // header={<div>Header</div>}
                bordered
                dataSource={data}
                loading={isLoading}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                )}
            />
        </Modal>

    )
}
