import request from "@/utils/request";
const { global_config } = window as any

export function getLog(params?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    "data": {
                        "list": [
                            {
                                "log_time": "2023-09-24T02:00:00Z",
                                "log_source": "algorithm",
                                "log_type": "info",
                                "log_content": "模型1被启动"
                            },
                            {
                                "log_time": "2023-09-24T02:00:00Z",
                                "log_source": "algorithm",
                                "log_type": "info",
                                "log_content": "模型1被停止"
                            }
                        ],
                        "total": 2
                    },
                    "success": true
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/reasoning/logInfo`, {
        method: 'GET',
        params
    });
}

