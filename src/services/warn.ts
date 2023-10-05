import request from "@/utils/request";
const { global_config } = window as any

export function getWarnLog(params?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    "data": {
                        "list": [
                            {
                                "alarm_time": "2023-09-24T02:00:00Z",
                                "alarm_content": "模型1异常"
                            },
                            {
                                "alarm_time": "2023-09-24T02:00:00Z",
                                "alarm_content": "集群CPU资源使用达到上限"
                            }
                        ],
                        "total": 2
                    },
                    "success": true
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/reasoning/alarmInfo`, {
        method: 'GET',
        params
    });
}
