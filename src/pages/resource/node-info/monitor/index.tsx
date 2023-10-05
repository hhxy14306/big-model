import React, {useEffect, useState, useRef} from 'react'
import styles from './index.less'
import { Area } from '@ant-design/plots';
import classnames from "classnames";
import {Dropdown, Select, Space} from "antd";
import {CaretRightOutlined, ClockCircleOutlined, DownOutlined, RedoOutlined} from "@ant-design/icons/lib/icons";

export default function (props){

    const chartCpuRef = useRef();
    const chart = useRef();
    const [data, setData] = useState([]);
    const [time, setTime] = useState(3);

    const timeLabels = [
        "最近1小时",
        "最近2小时",
        "最近4小时",
        "最近8小时",
    ]

    const drownData = timeLabels.map((item,index)=>({key: index, label:item}))


    useEffect(()=>{
        console.log( chartCpuRef)
        asyncFetch()
    },[])

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        title: '123',
        autoFit: true,
        xAxis: {
            range: [0, 1],
        },
    };


    const onClick: MenuProps['onClick'] = ({ key }) => {
        console.log(key)
    };

    return (
        <div className={classnames(styles.monitor,'boxShadow')}>
            <div className={styles.headerArea}>
                <span className={styles.title}>监控</span>
                <span className={styles.operateArea}>
                    <div className={styles.timeArea}>
                        <Dropdown menu={{ items: drownData, onClick }}>
                            <Space className={styles.wrapperSpace}>
                                <span>
                                    <ClockCircleOutlined />
                                    {timeLabels[time]}
                                </span>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </div>
                    <CaretRightOutlined width={20}/>
                    <RedoOutlined />
                </span>
            </div>
            <div className={styles.wrapperChart}>
                <div className={classnames(styles.chartItem)}>
                    <div className={styles.chartTitle}>
                        CPU用量（%）
                    </div>
                    <Area {...config} ref={chartCpuRef}/>
                </div>
                <div className={classnames(styles.chartItem)}>
                    <div className={styles.chartTitle}>
                        CPU平均负载
                    </div>
                    <Area {...config} ref={chartCpuRef}/>
                </div>
                <div className={classnames(styles.chartItem)}>
                    <div className={styles.chartTitle}>
                        内存用量（%）
                    </div>
                    <Area {...config} ref={chartCpuRef}/>
                </div>
                <div className={classnames(styles.chartItem)}>
                    <div className={styles.chartTitle}>
                        磁盘用量（%）
                    </div>
                    <Area {...config} ref={chartCpuRef}/>
                </div>
            </div>
        </div>
    )
}
