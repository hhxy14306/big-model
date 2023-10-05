import request from "@/utils/request";
const { global_config } = window as any

export function getNodeInfo(params){
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
                                                "0": [1695506124, "39.18333333333333"]
                                            },
                                            {
                                                "0": [1695506124, "39.18333333333333"]
                                            }
                                        ]
                                    },
                                    {
                                        "metric_name": "内存用量（%）",
                                        "values": [
                                            {
                                                "0": [1695506124, "39.18333333333333"]
                                            },
                                            {
                                                "0": [1695506124, "39.18333333333333"]
                                            }
                                        ]
                                    },
                                    {
                                        "metric_name": "磁盘用量详情（%）",
                                        "values": [
                                            {
                                                "0": [1695506124, "39.18333333333333"]
                                            },
                                            {
                                                "0": [1695506124, "39.18333333333333"]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "algorithm_info": [ // 模型信息
                            {
                                "algorithm_name": "模型1",
                                "algorithm_status": "已完成",
                                "algorithm_node": "node1（172.16.10.220）",
                                "algorithm_ip": "10.233.125.196",
                                "algorithm_project": "project1",
                                "algorithm_update_time": "2023-09-24T02:00:00Z"
                            }
                        ]
                    },
                    "success": true
                })
            },100)
        })
    }
    return request<any>(`/bigIntelligence/v1/reasoning/resourceInfo`,{params});
}

//获取核心信息
export function getChainInfo(params?: any){
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
                                    },
                                    {
                                        "vnpu_name": "vdavinci101",
                                        "vnpu_aicpu": 2,
                                        "vnpu_memory": 6,
                                        "vnpu_status": 0, // 0:空闲 1:就绪 2:失败
                                    },
                                    {
                                        "vnpu_name": "vdavinci102",
                                        "vnpu_aicpu": 1,
                                        "vnpu_memory": 6,
                                        "vnpu_status": 0, // 0:空闲 1:就绪 2:失败
                                    },
                                    {
                                        "vnpu_name": "vdavinci103",
                                        "vnpu_aicpu": 4,
                                        "vnpu_memory": 12,
                                        "vnpu_status": 0, // 0:空闲 1:就绪 2:失败
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
                                        "vnpu_memory": 3
                                    },
                                    {
                                        "vnpu_name": "vdavinci101",
                                        "vnpu_aicpu": 2,
                                        "vnpu_memory": 6
                                    },
                                    {
                                        "vnpu_name": "vdavinci102",
                                        "vnpu_aicpu": 1,
                                        "vnpu_memory": 6
                                    },
                                    {
                                        "vnpu_name": "vdavinci103",
                                        "vnpu_aicpu": 4,
                                        "vnpu_memory": 12
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
    return request<any>(`/bigIntelligence/v1/reasoning/vnpuList`,{
        params
    });
}



