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
  const [noData,setNoDate] = useImmer({
    inferRequest: false,
    dealTime: false,
    resourceUsageRate: false,
  })

  const [searchParams, setSearchParams] = useImmer({
    params1: 1,
    params2: 1,
    params3: 1,
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

  const chartsConfigList = [
    {
      key: 'inferRequest',
      name: '推理请求（个）',
      onChange: (e)=>{
        setSearchParams(draft => {
          draft.params1 = e.target.value;
        })
      }
    },
    {
      key: 'dealTime',
      name: '遥感数据平均处理时间（秒）',
      onChange: (e)=>{
        console.log( e.target.value)
        setSearchParams(draft => {
          draft.params2 = e.target.value;
        });
      }
    },
    {
      key: 'resourceUsageRate',
      name: '一体机资源使用率（%）',
      onChange: (e)=>{
        setSearchParams(draft => {
          draft.params3 = e.target.value;
        });
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
        tickCount: 100,
        tickInterval: 1
      },
      yAxis: {
        label: {
          //formatter: (v) => `${v}个`
        },
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
        //tickCount: 5,
      },
      yAxis:{
        label: {
          //formatter: (v) => `${v}分钟`
        },
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
    resourceUsageRate: {
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
        label: {
          //formatter: (v) => `${v}%`
        },
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
  },[]);

  useEffect(()=>{
    getTasksData().then();
  },[searchParams.params1])

  useEffect(()=>{
    getAverageTreatmentData().then();
  },[searchParams.params2])

  useEffect(()=>{
    getResourceUsageData().then();
  },[searchParams.params3])

  async function getTasksData(){
    const params = getParams(searchParams.params1)
    setLoading(draft => {
      draft.inferRequest = true;
    })
    setNoDate(draft => {
      draft.inferRequest = false;
    })
    try {
      const res = await getTasks(params);
      let total = 0;
      const data = [];

      //---临时添加
      const currentDay = dayjs(new Date()).format("YYYY-MM-DD");
      const xData = new Map();
      const modelList = ['分割', '分类', '识别', '变化'];
      modelList.forEach(name=>{
        const tempMap = new Map();
        for(let i=1;i<24;i++){
          const time = currentDay + ( i>=10 ? ` ${i}` : ` 0${i}`);
          tempMap.set(time,{name, time, num: 0})
        }
        xData.set(name, tempMap);
      })

      console.log("currentDate",xData)

      res.segmentation.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("分割");
        tempMap.set(item.time, {...item, name: '分割'})
      });
      res.sort.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("分类");
        tempMap.set(item.time, {...item, name: '分类'});
      });
      res.recognize.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("识别");
        tempMap.set(item.time, {...item, name: '识别'});
      });
      res.change.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("变化");
        tempMap.set(item.time, {...item, name: '变化'});
      });

      const data2 = [];
      xData.forEach((values, key)=>{
        values.forEach((item,k)=>{
          data2.push(item)
        })
      });
      console.log("ffffff",data2)
      setChartsConfig(draft => {
        // if(total === 0){
        //   draft.inferRequest.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
        // }
        draft.inferRequest.data = data2;
      });

      // ---

      // if(!res.segmentation || res.segmentation.length === 0){
      //   data.push({name: '分割', num: 0})
      // }else {
      //   res.segmentation.forEach(item=>{
      //     data.push({...item, name: '分割'});
      //     total += item.num;
      //   });
      // }
      // if(!res.sort || res.sort.length === 0){
      //   data.push({name: '分类', num: 0})
      // }else {
      //   res.sort.forEach(item=>{
      //     data.push({...item, name: '分类'});
      //     total += item.num;
      //   });
      // }
      // if(!res.recognize || res.sort.length === 0){
      //   data.push({name: '识别', num: 0})
      // }else {
      //   res.recognize.forEach(item=>{
      //     data.push({...item, name: '识别'});
      //     total += item.num;
      //   });
      // }
      // if(!res.change || res.sort.length === 0){
      //   data.push({name: '变化', num: 0})
      // }else {
      //   res.change.forEach(item=>{
      //     data.push({...item, name: '变化'});
      //     total += item.num;
      //   });
      // }
      // setChartsConfig(draft => {
      //   if(total === 0){
      //     draft.inferRequest.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
      //   }
      //   draft.inferRequest.data = data;
      // });
    }catch (e) {
      setChartsConfig(draft => {
        draft.inferRequest.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
        //draft.inferRequest.data = data;
      });
      setNoDate(draft => {
        draft.inferRequest = true;
      })
    }
    setLoading(draft => {
      draft.inferRequest = false;
    })
  }

  function onAverageTreatmentNoData(){
    const timeList = getAxis(searchParams.params2);
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
      draft.dealTime.data = data;
      draft.dealTime.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
    });
    setNoDate(draft => {
      draft.dealTime = true;
    })
  }
  async function getAverageTreatmentData(){
    console.log(searchParams.params2)
    const params = getParams(searchParams.params2)
    setNoDate(draft => {
      draft.dealTime = false;
    })
    setLoading(draft => {
      draft.dealTime = true;
    });
    try{
      const res = await getAverageTreatment(params);
      let total = 0;
      const data = [];

      //---临时添加
      const currentDay = dayjs(new Date()).format("YYYY-MM-DD");
      const xData = new Map();
      const modelList = ['分割', '分类', '识别', '变化'];
      modelList.forEach(name=>{
        const tempMap = new Map();
        for(let i=1;i<24;i++){
          const time = currentDay + ( i>=10 ? ` ${i}` : ` 0${i}`);
          tempMap.set(time,{name, time, num: 0})
        }
        xData.set(name, tempMap);
      })

      console.log("currentDate",xData)

      res.segmentation.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("分割");
        tempMap.set(item.time, {...item, name: '分割'})
      });
      res.sort.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("分类");
        tempMap.set(item.time, {...item, name: '分类'});
      });
      res.recognize.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("识别");
        tempMap.set(item.time, {...item, name: '识别'});
      });
      res.change.forEach(item=>{
        const tempMap: Map<string,any> = xData.get("变化");
        tempMap.set(item.time, {...item, name: '变化'});
      });

      const data2 = [];
      xData.forEach((values, key)=>{
        values.forEach((item,k)=>{
          data2.push(item)
        })
      });
      console.log("ffffff",data2)
      setChartsConfig(draft => {
        // if(total === 0){
        //   draft.inferRequest.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
        // }
        draft.dealTime.data = data2;
      });

      // ---




      // if(!res.segmentation || res.segmentation.length === 0){
      //   data.push({name: '分割', num: 0})
      // }else {
      //   res.segmentation.forEach(item=>{
      //     data.push({...item, name: '分割'});
      //     total += item.num;
      //   });
      // }
      // if(!res.sort || res.sort.length === 0){
      //   data.push({name: '分类', num: 0})
      // }else {
      //   res.sort.forEach(item=>{
      //     data.push({...item, name: '分类'});
      //     total += item.num;
      //   });
      // }
      // if(!res.recognize || res.sort.length === 0){
      //   data.push({name: '识别', num: 0})
      // }else {
      //   res.recognize.forEach(item=>{
      //     data.push({...item, name: '识别'});
      //     total += item.num;
      //   });
      // }
      // if(!res.change || res.sort.length === 0){
      //   data.push({name: '变化', num: 0})
      // }else {
      //   res.change.forEach(item=>{
      //     data.push({...item, name: '变化'});
      //     total += item.num;
      //   });
      // }
      // setChartsConfig(draft => {
      //   if(total === 0){
      //     draft.dealTime.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
      //   }
      //   draft.dealTime.data = data;
      // });
    }catch (e) {
      onAverageTreatmentNoData();
    }
    setLoading(draft => {
      draft.dealTime = false;
    });
  }

  function onResourceUsageDataNoData(){
    const timeList = getAxis(searchParams.params3);
    const nameList = ['内存用量（%）', '磁盘用量详情（%）', 'CPU用量（%）'];
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
      draft.resourceUsageRate.data = data;
      draft.resourceUsageRate.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
    });
    setNoDate(draft => {
      draft.resourceUsageRate = true;
    })
  }

  async function getResourceUsageData(){
    const params = getParams(searchParams.params3)
    console.log(params)
    setLoading(draft => {
      draft.resourceUsageRate = true;
    });
    setNoDate(draft => {
      draft.resourceUsageRate = false;
    });
    try {
      const res = await getResourceUsage(params);
      const data = [];
      let total = 0;
      console.log(123123,res)
      if(res.success && res.data?.natural_resources && res.data?.natural_resources.length ){
        res.data?.natural_resources[0]?.node_monitor.forEach(item=>{
          item.values.forEach(i=>{
            total++;
            data.push({
              name: item.metric_name,
              time: dayjs(i.time).format('HH:MM:ss'),
              usage: i.usage
            })
          })
        });
      }
      setChartsConfig(draft => {
        draft.resourceUsageRate.data = data;
        draft.resourceUsageRate.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
        if(total === 0){
          draft.resourceUsageRate.yAxis.tickMethod = ()=>[0, 20, 40, 60, 80, 100];
        }
        if(data.length === 0){
          onResourceUsageDataNoData()
        }
      });
    }catch (e) {
      onResourceUsageDataNoData()
    }
    setLoading(draft => {
      draft.resourceUsageRate = false;
    });
  }

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
                      {/*<Radio.Group defaultValue={1} onChange={item.onChange}>*/}
                      {/*  <Radio.Button value={1}>1小时</Radio.Button>*/}
                      {/*  <Radio.Button value={2}>2小时</Radio.Button>*/}
                      {/*  <Radio.Button value={4}>4小时</Radio.Button>*/}
                      {/*  <Radio.Button value={8}>8小时</Radio.Button>*/}
                      {/*</Radio.Group>*/}
                    </div>
                    {
                      loading[item.key] ?
                          <Spin className={classnames(styles.loading,"flex_center_X_Y")}/>
                          :
                          <div className={styles.wrapperLine}>
                            <Line {...chartsConfig[item.key]} />
                            {
                              noData[item.key] &&
                              <div className={styles.noData}>暂无数据</div>
                            }
                          </div>
                    }
                  </div>
              ))
            }
          </div>
        </Card>
      </div>
  )

}
