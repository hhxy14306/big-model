import React, { useEffect, useRef, useState } from 'react';
import { Badge,Radio, Tabs, Button, Card, Spin } from 'antd';

import styles from './index.less'
import {useQuery, history} from "umi";
import classnames from 'classnames'
import { Line } from '@ant-design/plots';
import { useImmer } from 'use-immer';
import { getTasks, getAverageTreatment, getResourceUsage } from '@/services/infer';
import dayjs from "dayjs";


export default () => {

  const [loading, setLoading] = useImmer({
    inferRequest: true,
    dealTime: true,
    resourceUsageRate: true,
  });

  const [state, setState] = useImmer({
    inferRequest: 1,
    dealTime: 1,
    resourceUsageRate: 1,
  });

  const [searchParams, setSearchParams] = useImmer({
    params1: getParams(1),
    params2: getParams(1),
    params3: getParams(1),
  });

  //近num小时转换成起止时间
  function getParams(num){
    const end_time = new Date().getTime();
    const start_time = end_time - num*1000 * 60*60;
    return {
      start_time,
      end_time
    }
  }


  const chartsConfigList = [
    {
      key: 'inferRequest',
      name: '推理请求',
      onChange: (e)=>{
        const params1 = getParams(e.target.value);
        setSearchParams(draft => {
          draft.params1 = params1;
        })
        getTasksData().then();
      }
    },
    {
      key: 'dealTime',
      name: '遥感数据平均处理时间',
      onChange: (e)=>{
        setSearchParams(draft => {
          draft.params2 = getParams(e.target.value);
        })
      }
    },
    {
      key: 'resourceUsageRate',
      name: '一体机资源使用率',
      onChange: (e)=>{
        setSearchParams(draft => {
          draft.params3 = getParams(e.target.value);
        })
      }
    },
  ];

  const [chartsConfig, setChartsConfig] = useImmer({
    inferRequest: {
      data: [],
      title: '123',
      padding: 'auto',
      xField: 'time',
      yField: 'num',
      seriesField: 'name',
      xAxis: {
        // type: 'timeCat',
        tickCount: 5,
      },
      yAxis: {
        //tickInterval: 10
      },
      scrollbar:{
        x: {}
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
      smooth: true,
    },
    dealTime: {
      data: [],
      title: '123',
      padding: 'auto',
      xField: 'time',
      yField: 'num',
      seriesField: 'name',
      xAxis: {
        // type: 'timeCat',
        tickCount: 5,
      },
      yAxis:{},
      scrollbar:{
        x: {}
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
      smooth: true,
    },
    resourceUsageRate: {
      data: [],
      title: '123',
      padding: 'auto',
      xField: 'time',
      yField: 'usage',
      seriesField: 'name',
      xAxis: {
        // type: 'timeCat',
        tickCount: 5,
      },
      yAxis: {
        //tickInterval: 10
      },
      scrollbar:{
        x: {}
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
      smooth: true,
    },
  });

  useEffect(()=>{
    Promise.all([getTasksData(),getAverageTreatmentData(),getResourceUsageData()]).then(()=>{});
  },[])

  async function getTasksData(){
    console.log(searchParams.params1)
    setLoading(draft => {
      draft.inferRequest = true;
    })
    const res = await getTasks(searchParams.params1);
    let total = 0;
    const data = [];
    if(!res.segmentation || res.segmentation.length === 0){
      data.push({name: '分割', num: 0})
    }else {
      res.segmentation.forEach(item=>{
        data.push({...item, name: '分割'});
        total += item.num;
      });
    }
    if(!res.sort || res.sort.length === 0){
      data.push({name: '分类', num: 0})
    }else {
      res.sort.forEach(item=>{
        data.push({...item, name: '分类'});
        total += item.num;
      });
    }
    if(!res.recognize || res.sort.length === 0){
      data.push({name: '识别', num: 0})
    }else {
      res.recognize.forEach(item=>{
        data.push({...item, name: '识别'});
        total += item.num;
      });
    }
    if(!res.change || res.sort.length === 0){
      data.push({name: '变化', num: 0})
    }else {
      res.change.forEach(item=>{
        data.push({...item, name: '变化'});
        total += item.num;
      });
    }
    setChartsConfig(draft => {
      if(total === 0){
        draft.inferRequest.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
      }
      draft.inferRequest.data = data;
    });
    setLoading(draft => {
      draft.inferRequest = false;
    })
  }

  async function getAverageTreatmentData(){
    setLoading(draft => {
      draft.dealTime = true;
    });
    const res = await getAverageTreatment(searchParams.params2);
    let total = 0;
    const data = [];
    if(!res.segmentation || res.segmentation.length === 0){
      data.push({name: '分割', num: 0})
    }else {
      res.segmentation.forEach(item=>{
        data.push({...item, name: '分割'});
        total += item.num;
      });
    }
    if(!res.sort || res.sort.length === 0){
      data.push({name: '分类', num: 0})
    }else {
      res.sort.forEach(item=>{
        data.push({...item, name: '分类'});
        total += item.num;
      });
    }
    if(!res.recognize || res.sort.length === 0){
      data.push({name: '识别', num: 0})
    }else {
      res.recognize.forEach(item=>{
        data.push({...item, name: '识别'});
        total += item.num;
      });
    }
    if(!res.change || res.sort.length === 0){
      data.push({name: '变化', num: 0})
    }else {
      res.change.forEach(item=>{
        data.push({...item, name: '变化'});
        total += item.num;
      });
    }
    setChartsConfig(draft => {
      if(total === 0){
        draft.dealTime.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
      }
      draft.dealTime.data = data;
    });
    setLoading(draft => {
      draft.dealTime = false;
    });
  }

  async function getResourceUsageData(){
    setLoading(draft => {
      draft.resourceUsageRate = true;
    });
    const res = await getResourceUsage(searchParams.params3);
    const data = [];
    let total = 0;
    if(res.success && res.data?.natural_resources && res.data?.natural_resources.length ){
      res.data?.natural_resources[0]?.node_monitor.forEach(item=>{
        console.log(item)
        item.values.forEach(i=>{
          data.push({
            name: item.metric_name,
            time: dayjs(i.time).format('HH:MM:ss'),
            usage: i.usage
          })
        })
      })
    }
    setChartsConfig(draft => {
      draft.resourceUsageRate.data = data;
      if(total === 0){
        draft.resourceUsageRate.yAxis.tickMethod = ()=>[0, 25, 50, 75, 100];
      }
    });
    setLoading(draft => {
      draft.resourceUsageRate = false;
    });
  }
  console.log(loading)
  return (
      <div className={classnames(styles.resourceStatistics,'boxShadow')}>
        <Card
            bordered={false}
            title={<span className={styles.title}>一体机资源使用统计</span>}>
          <div className={styles.content}>
            {
              chartsConfigList.map(item=>(
                  <div key={item.key} className={styles.contentItem}>
                    <div className={styles.contentItemHeader}>
                      <span className={styles.chartsName}>{item.name}</span>
                      <Radio.Group defaultValue={1} onChange={item.onChange}>
                        <Radio.Button value={1}>1小时</Radio.Button>
                        <Radio.Button value={2}>2小时</Radio.Button>
                        <Radio.Button value={4}>4小时</Radio.Button>
                        <Radio.Button value={8}>8小时</Radio.Button>
                      </Radio.Group>
                    </div>
                    {
                      loading[item.key] ?
                          <Spin className={classnames(styles.loading,"flex_center_X_Y")}/>
                          :
                          <Line {...chartsConfig[item.key]} />
                    }
                  </div>
              ))
            }
          </div>
        </Card>
      </div>
  )

}
