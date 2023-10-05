import request from "@/utils/request";
const { global_config } = window as any

export function getUserList(params){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    "data": {
                        "list": [
                            {
                                "user_name": "admin",
                            },
                            {
                                "user_name": "admin1",
                            },
                        ],
                        "total": 2
                    },
                    "success": true
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/user/list`, {
        method: 'GET',
        params
    });
}
export function addUser(data){
    return request<any>(`/bigIntelligence/v1/user/add`, {
        method: 'post',
        data
    });
}
export function updateUser(data){
    return request<any>(`/bigIntelligence/v1/user/update`, {
        method: 'post',
        data
    });
}
export function deleteUser(data){
    return request<any>(`/bigIntelligence/v1/user/delete`, {
        method: 'post',
        data
    });
}
export function getCurrentUser(data){
    return request<any>(`/bigIntelligence/v1/user/info`, {
        method: 'post',
        data
    });
}
