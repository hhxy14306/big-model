import request from "@/utils/request";

export function login(data){
    return request<any>(`/bigIntelligence/v1/user/login`, {
        method: 'post',
        data
    });
}

export function getCurrentUser(){
    //return request<any>(`/bigIntelligence/v1/user/info`);
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({"data":{"user_name":"admin"},"success":true})
        },200);
    })
}



