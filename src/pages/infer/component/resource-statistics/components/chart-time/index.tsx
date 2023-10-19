import React, {useEffect, useState} from "react";
import {getAverageTreatment} from "@/services/infer";
import {useQuery} from "umi";
import {Line} from "@ant-design/plots";
import {useImmer} from "use-immer";
import styles from './index.less'
import dayjs from "dayjs";

export default function (){

    const modeTypeConfig = {
        11: '分割',
        12: '分类',
        13: '识别',
        14: '变化'
    }
    const [params, setParams] = useState(1)

    const [config, setConfig] = useImmer({
        data: [],
        padding: 'auto',
        xField: 'time',
        yField: 'num',
        seriesField: 'name',
        xAxis: {
            // type: 'timeCat',
            //tickCount: 5,
            tickCount: 100,
            tickInterval: 1,
            //nice: true,
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
        yAxis:{
            label: {
                //formatter: (v) => `${v}分钟`
            },
        },
        // scrollbar:{
        //   x: {}
        // },
        legend: {
            position: 'bottom',
            itemName: {
                style: {
                    fill: '#000',
                },
                formatter: (name) => name,
            },
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
        smooth: true,
        lineStyle: {
            //stroke: 'black',
            lineWidth: 2,
           // lineDash: [4,5],
            strokeOpacity: 0.7,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            cursor: 'pointer'
        }
    });

    useQuery(['getAverageTreatment'], getData);


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

    function onAverageTreatmentNoData(){
        const timeList = getAxis(params);
        const nameList = ['分割', '分类', '识别', '变化'];
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
        })
        setChartsConfig(draft => {
            draft.data = data;
            draft.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
        });
    }

    useEffect(()=>{
        const timer = setInterval(()=>{
            getData()
        },3000);
        return ()=>clearInterval(timer);
    },[])

    async function getData(){
        try{
            const res = await getAverageTreatment(getParams(params));
            console.log("getAverageTreatment",res)
            let total = 0;
            //---临时添加
            let currentTime = new Date();
            if(new Date().getHours()%2 !== 0){
                currentTime = new Date(currentTime - 60*60*1000);
            }
            const xData = new Map();
            const modelList = ['分割', '分类', '识别', '变化'];
            modelList.forEach(name=>{
                const tempMap = new Map();
                for(let i=22; i>=0; i-=2){
                    const time = dayjs(currentTime - i*60*60*1000).format("YYYY-MM-DD HH");
                    tempMap.set(time,{name, time, num: 0})
                }
                xData.set(name, tempMap);
            })

            console.log("currentDate",xData)

            res.segmentation.forEach(item=>{
                const tempMap: Map<string,any> = xData.get("分割");
                tempMap.set(item.time, {...item, name: '分割'})
                total += item.num;
            });
            res.sort.forEach(item=>{
                const tempMap: Map<string,any> = xData.get("分类");
                tempMap.set(item.time, {...item, name: '分类'});
                total += item.num;
            });
            res.recognize.forEach(item=>{
                const tempMap: Map<string,any> = xData.get("识别");
                tempMap.set(item.time, {...item, name: '识别'});
                total += item.num;
            });
            res.change.forEach(item=>{
                const tempMap: Map<string,any> = xData.get("变化");
                tempMap.set(item.time, {...item, name: '变化'});
                total += item.num;
            });

            const data = [];
            xData.forEach((values, key)=>{
                values.forEach((item,k)=>{
                    data.push(item)
                })
            });
            setConfig(draft => {
                if(total === 0){
                    draft.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
                }
                draft.data = data;
            });

        }catch (e) {
            console.log(e)
            onAverageTreatmentNoData();
        }
        return null;
    }


    return (
        <div className={styles.wrapperChartRate}>
            <div className={styles.title}>遥感数据平均处理时间（秒/张）</div>
            <Line {...config} />
            {
                config.data.length === 0 && <div className={styles.noData}>暂无数据</div>
            }
        </div>
    )
}
