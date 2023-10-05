import React, {createElement} from "react";
import { useModel } from 'umi';
import styles from './index.less';
import {Tabs} from "antd";
import NodeInfo from './node-info'
import AlgorithmInfo from './algorithm-info'
import ChipInfo from './chip-info'

export default() => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '设备',
            children: createElement(NodeInfo),
        },
        {
            key: '2',
            label: '芯片',
            children: createElement(ChipInfo)
        },
        {
            key: '3',
            label: '模型',
            children: createElement(AlgorithmInfo),
        },
    ];
    return (
    <div className={styles.resourceContainer}>
        <Tabs className={styles.tabs} defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
    );
};
