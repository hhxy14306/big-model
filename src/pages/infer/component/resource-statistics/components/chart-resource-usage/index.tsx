import React, {useEffect, useState, useRef} from "react";
import { getResourceUsage} from "@/services/infer";
import {useQuery} from "umi";
import {Line} from "@ant-design/plots";
import {useImmer} from "use-immer";
import styles from './index.less'
import dayjs from "dayjs";

export default function (){

    const [params, setParams] = useState(1)

    const [config, setConfig] = useImmer({
        data: [],
        padding: 'auto',
        xField: 'time',
        yField: 'usage',
        seriesField: 'name',
        xAxis: {
            // type: 'timeCat',
            tickCount: 100,
            tickInterval: 1,
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
        yAxis: {
            label: {
                formatter: (v) => {
                    return `${v ||0}%`
                }
            },
            //tickInterval: 10
        },
        scrollbar:{
            x: {}
        },
        point: {
            size: 5,
            style: {
                lineWidth: 1,
                fillOpacity: 1,
            },
            shape: (item) => {
                if (item.category === 'Cement production') {
                    return 'circle';
                }

                return 'diamond';
            },
        },
        legend: {
            position: 'bottom',
            itemName: {
                style: {
                    fill: '#000',
                },
                formatter: (name) => {
                    return name
                },
            },
        },
        tooltip: {
            formatter: (datum) => {
                return { name: datum.name, value: (datum.usage||0) + '%' };
            },
        },
        smooth: true,
    });

    useQuery(['getResourceUsage'], getData);

    useEffect(()=>{
        const timer = setInterval(()=>{
           getData().then()
        },3000);
        return ()=>clearInterval(timer);
    },[])

    //近num小时转换成xAxis
    function getAxis(num){
        const currentTime = new Date().getTime();
        const data = [];
        let step = 10 * num //分钟
        for(let i = 6; i >0 ;i--){
            data.push(dayjs(currentTime - step*i*60*1000).format("HH:mm:ss"));
        }
        return data;
    }

    function getParams(num){
        const end_time = new Date().getTime();
        const start_time = end_time - num*1000 * 60*60;
        return {
            start_time,
            end_time
        }
    }


    function onResourceUsageDataNoData(){
        const timeList = getAxis(params);
        const nameList = ['内存', '磁盘', 'CPU'];
        const data = [];
        timeList.forEach(time=>{
            nameList.forEach(name=>{
                data.push({name, time});
            })
        });
        [0, 20, 40, 60, 80, 100].forEach(usage=>{
            nameList.forEach(name=>{
                data.push({name, usage, time: timeList});
            })
        });
        setConfig(draft => {
            draft.data = data;
            draft.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
        });
    }

    async function getData(){
        try {
            const res = await getResourceUsage(getParams(params));
            let total = 0;
            const data = [];
            const mapConfig = [
                {key: 'cpu_use_num', label: 'CPU'},
                {key: 'disk_use_num', label: '磁盘'},
                {key: 'mem_use_num', label: '内存'},
            ]
            if(res.success && res.data ){
                res.data?.forEach(item=>{
                    mapConfig.forEach(i=>{
                        //console.log(item.time, dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'))
                        data.push({
                            name: i.label,
                            time: dayjs(item.time).format('HH:mm:ss'),
                            time1: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
                            usage: item[i.key],
                            time2: item.time,
                        })
                        total++;
                    })
                });
                setConfig(draft => {
                    draft.data = data.sort((pre, next)=> pre.time2 - next.time2);
                    if(total === 0){
                        draft.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
                    }
                });
                if(data.length === 0){
                    onResourceUsageDataNoData()
                }
            }
            return res
        }catch (e) {
            console.log(e)
            onResourceUsageDataNoData()
        }
    }


    return (
        <div className={styles.wrapperChartRate}>
            <div className={styles.title}>资源使用率</div>
            <Line {...config} />
            {
                config.data.length === 0 && <div className={styles.noData}>暂无数据</div>
            }
        </div>
    )
}
