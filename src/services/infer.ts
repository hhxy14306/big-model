import request from "@/utils/request";
const { global_config } = window as any

export function getResourceConfig(params?: any) {
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve({
          "data": {
            "list": [
              {
                "chip_name": "Ascend 310P3",
                "chip_status": "OK",
                "chip_power": "",
                "chip_temperature": "44",
                "chip_aicore": "0",
                "chip_memory": "7",
                "vnpu_data": [
                  {
                    "vnpu_name": "vdavinci100",
                    "vnpu_aicpu": 1,
                    "vnpu_memory": 3,
                    "vnpu_status": 0, // 0:空闲 1:就绪 2:失败
                    "algorithm_type": -1,  //-1:无模型 0:场景分割 1:检测分类 2:目标识别 3"algorithm type":
                    "is_independence_npu": true  // 是否是独交npu
                  },
                  {
                    "vnpu_name": "vdavinci101",
                    "vnpu_aicpu": 2,
                    "vnpu_memory": 6,
                    "vnpu_status": 0, // 0:空闲 1:就绪 2:失败
                    "algorithm_type": 0,  //-1:无模型 0:场景分割 1:检测分类 2:目标识别 3"algorithm type":
                  },
                  {
                    "vnpu_name": "vdavinci102",
                    "vnpu_aicpu": 1,
                    "vnpu_memory": 6,
                    "vnpu_status": 0, // 0:空闲 1:就绪 2:失败
                    "algorithm_type": 1
                  },
                  {
                    "vnpu_name": "vdavinci103",
                    "vnpu_aicpu": 4,
                    "vnpu_memory": 12,
                    "vnpu_status": 0, // 0:空闲 1:就绪 2:失败
                    "algorithm_type": 2
                  }
                ]
              },
              {
                "chip_name": "Mcu",
                "chip_status": "OK",
                "chip_power": "15.0",
                "chip_temperature": "",
                "chip_aicore": "",
                "chip_memory": "",
                "vnpu_data": [
                  {
                    "vnpu_name": "vdavinci100",
                    "vnpu_aicpu": 1,
                    "vnpu_memory": 3,
                    "algorithm_type": 3
                  },
                  {
                    "vnpu_name": "vdavinci101",
                    "vnpu_aicpu": 2,
                    "vnpu_memory": 6,
                    "algorithm_type": 3
                  },
                  {
                    "vnpu_name": "vdavinci102",
                    "vnpu_aicpu": 1,
                    "vnpu_memory": 6,
                    "algorithm_type": 3
                  },
                  {
                    "vnpu_name": "vdavinci103",
                    "vnpu_aicpu": 4,
                    "vnpu_memory": 12,
                    "algorithm_type": 3
                  }
                ]
              }
            ],
            "total": 2
          },
          "success": true
        })
      },100)
    })
  }

  return request<any>(`/bigIntelligence/v1/reasoning/vnpuList`, {
    method: 'GET',
    params,
  });
}

export function getNodeStatus(){
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve([
          {
            "nodeName": "Ascend 310P3-vdavinci100",
            "nodeStatus": 1,
            "runTaskNum": 0,
            "waitTaskNum": 0
          },
          {
            "nodeName": "Ascend 310P3-vdavinci101",
            "nodeStatus": 1,
            "runTaskNum": 0,
            "waitTaskNum": 0
          },
          {
            "nodeName": "Ascend 310P3-vdavinci102",
            "nodeStatus": 1,
            "runTaskNum": 0,
            "waitTaskNum": 0
          }
        ])
      },100)
    })
  }
  return request<any>(`/bigIntelligence/v1/getNodeStatus`, {
    method: 'GET',
  });
}

export function getNodeDetail(params){
  return request<any>(`/bigIntelligence/v1/getNodeTaskMsg`, {
    method: 'GET',
    params
  });
}

export function getTasks(params?:any){
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve({
          "change": [],
          "recognize": [],
          "segmentation": [
            {
              "num": 30,
              "time": "2023-09-26 16"
            },
            {
              "num": 1,
              "time": "2023-09-26 17"
            },
            {
              "num": 1,
              "time": "2023-09-26 18"
            },
            {
              "num": 1,
              "time": "2023-09-27 11"
            },
            {
              "num": 2,
              "time": "2023-09-27 20"
            }
          ],
          "sort": []
        })
      },100)
    })
  }
  return request<any>(`/bigIntelligence/v1/getTasks`, {
    method: 'GET',
    params
  });
}

export function getAverageTreatment(params?:any){
  // if(global_config.localData){
  //   return new Promise<AxiosResponse<T>>(resolve => {
  //     setTimeout(()=>{
  //       resolve({
  //             "change": [],
  //             "recognize": [],
  //             "segmentation": [
  //               {
  //                 "num": 10.654,
  //                 "time": "2023-09-26 16"
  //               },
  //               {
  //                 "num": 0.005,
  //                 "time": "2023-09-26 17"
  //               },
  //               {
  //                 "num": 0.001,
  //                 "time": "2023-09-26 18"
  //               },
  //               {
  //                 "num": 18000.005,
  //                 "time": "2023-09-27 11"
  //               },
  //               {
  //                 "num": 0.007,
  //                 "time": "2023-09-27 20"
  //               }
  //             ],
  //             "sort": []
  //           })
  //     },100)
  //   })
  // }
  return request<any>(`/bigIntelligence/v1/getAverageTreatment`, {
    method: 'GET',
    params
  });
}

export function getResourceUsage(params?:any){
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve({
          "data": {
            "natural_resources": [  // 资源信息
              {
                "node_name": "node1", // 名称
                "node_status": "运行中",   //状态
                "node_role": "控制平面节点",  // 角色
                "cpu_total": "4核",   // CPU总量
                "cpu_used": "0.98",   // CPU已使用
                "cpu_usage": "27%",   // CPU使用率
                "mem_total": "14.64GB",   // 内存总量
                "mem_used": "9.71",      // 内存已使用
                "mem_usage": "66%",    // 内存使用率
                "container_group_total": "110",   // 容器组总量
                "container_group_used": "51",  // 容器组已使用
                "container_group_usage": "46%",  // 容器组使用率
                "node_monitor": [
                  {
                    "metric_name": "CPU用量（%）",
                    "values": [
                      {
                        time: 1695506124,
                        usage: "60"
                      },
                      {
                        time: 1695506124,
                        usage: "39.18333333333333"
                      }
                    ]
                  },
                  {
                    "metric_name": "内存用量（%）",
                    "values": [
                      {
                        time: 1695506124,
                        usage: "80"
                      },
                    ]
                  },
                  {
                    "metric_name": "磁盘用量详情（%）",
                    "values": [
                      {
                        time: 1695506124,
                        usage: "39.18333333333333"
                      },
                    ]
                  }
                ]
              }
            ],
          },
          "success": true
        })
      },100)
    })
  }
  return request<any>(`/bigIntelligence/v1/reasoning/resourceInfo`,{params});
}

export function createInfer(data:any){
  return request<any>(`/bigIntelligence/v1/bigModelInterface`, {
    method: 'post',
    data
  });
}

export function updateInfer(data){
  return request<any>(`bigIntelligence/v1/reasoning/algorithmOperate`, {
    method: 'post',
    data
  });
}


export function getTaskLog(params?:any){
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve({
          "data": {
            "natural_resources": [  // 资源信息
              {
                "node_name": "node1", // 名称
                "node_status": "运行中",   //状态
                "node_role": "控制平面节点",  // 角色
                "cpu_total": "4核",   // CPU总量
                "cpu_used": "0.98",   // CPU已使用
                "cpu_usage": "27%",   // CPU使用率
                "mem_total": "14.64GB",   // 内存总量
                "mem_used": "9.71",      // 内存已使用
                "mem_usage": "66%",    // 内存使用率
                "container_group_total": "110",   // 容器组总量
                "container_group_used": "51",  // 容器组已使用
                "container_group_usage": "46%",  // 容器组使用率
                "node_monitor": [
                  {
                    "metric_name": "CPU用量（%）",
                    "values": [
                      {
                        time: 1695506124,
                        usage: "39.18333333333333"
                      },
                      {
                        time: 1695506124,
                        usage: "39.18333333333333"
                      }
                    ]
                  },
                  {
                    "metric_name": "内存用量（%）",
                    "values": [
                      {
                        time: 1695506124,
                        usage: "39.18333333333333"
                      },
                    ]
                  },
                  {
                    "metric_name": "磁盘用量详情（%）",
                    "values": [
                      {
                        time: 1695506124,
                        usage: "39.18333333333333"
                      },
                    ]
                  }
                ]
              }
            ],
          },
          "success": true
        })
      },100)
    })
  }
  return request<any>(`/bigIntelligence/v1/reasoning/resourceInfo`,{params});
}



