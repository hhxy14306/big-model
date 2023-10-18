import React from "react";
import {getTaskAverageTime} from "@/services/infer";
import {useQuery} from "umi";
import {Column} from "@ant-design/plots";
import {useImmer} from "use-immer";
import styles from './index.less'

export default function (){

    const modeTypeConfig = {
        11: '分割',
        12: '分类',
        13: '识别',
        14: '变化'
    }

    const [config, setConfig] = useImmer({
        data: [],
        isGroup: true,
        xField: 'createTime',
        yField: 'consumernum',
        seriesField: "modeTypeName",
        theme:{
            minColumnWidth: 20
        },
        scrollbar:{
          x: {}
        },
        xAxis: {
            // type: 'timeCat',
            tickCount: 100,
            tickInterval: 1,
            nice: true,
            tickLine: {
                style: {
                    lineWidth: 2,
                    stroke: '#aaa',
                },
                length: 5,
            },
            // tickCount: 8,
            // 文本标签
            label: {
                // autoRotate: false,
                rotate: Math.PI / 3,
                offset: 10,
                style: {
                    fill: '#aaa',
                    fontSize: 12,
                },
                formatter: (name) => name,
            },
        },
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        legend: {
            position: 'bottom',
            itemName: {
                style: {
                    fill: '#000',
                },
                formatter: (name) => name,
            },
        },
        tooltip: {
            formatter: (datum) => {
                return {
                    name: datum.modeTypeName,
                    value: datum.consumernum + "张/十分钟"
                }
            },
        },
        layout: [
            // 柱形图数据标签位置自动调整
            {
                type: 'interval-adjust-position',
            }, // 数据标签防遮挡
            {
                type: 'interval-hide-overlap',
            }, // 数据标签文颜色自动调整
            {
                type: 'adjust-color',
            },
        ],
    });

    useQuery(['getTaskAverageTime'], getData);

    async function getData(){
        try {
            const res = await getTaskAverageTime();
            setConfig(draft => {
                draft.data = res.map(item=>({
                    ...item,
                    modeTypeName: modeTypeConfig[item.modeType]
                }));
            })
            return res
        }catch (e) {

        }
    }

    return (
        <div className={styles.wrapperChartRate}>
            <div className={styles.title}>推理请求处理速率（张/十分钟）</div>
            <Column {...config} />
        </div>
    )
}
