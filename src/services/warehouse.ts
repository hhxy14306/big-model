import request from "@/utils/request";
const { global_config } = window as any

export function getWarehouse(params?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    code: 200,
                    data: [
                        {"operatorName":"111","version":"3.0","number":244,"updateTime":"2023-09-26 16:12:14.500","explain":"求和"},
                        {"operatorName":"111","version":"4.0","number":245,"updateTime":"2023-09-27 16:12:14.500","explain":"求和"},
                        {"operatorName":"222","version":"3.0","number":246,"updateTime":"2023-09-26 16:12:14.500","explain":"卷积"},
                        {"operatorName":"333","version":"3.0","number":247,"updateTime":"2023-09-26 16:12:14.500","explain":"阶乘"}
                    ]
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/getLocalOperator`, {
        method: 'GET',
        params
    });
}

export function getBoardList(params?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    code: 200,
                    data: [
                        {name: '222', code: 'ddd'},
                        {name: '333', code: 'rrr'},
                        {name: '444', code: 'ttt'},
                    ]
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/getBoardList`, {
        method: 'GET',
        params
    });
}

export function getChassisList(params?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    code: 200,
                    data: [
                        {name: '222', code: 'ddd'},
                        {name: '333', code: 'rrr'},
                        {name: '444', code: 'ttt'},
                    ]
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/getChassisList`, {
        method: 'GET',
        params
    });
}

export function getBoardOperate(params?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    code: 200,
                    data: [
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:244,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111"
                        },
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:245,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111",
                            wareName: '仓库1'
                        },
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:246,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111",
                            wareName: '仓库1'
                        },
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:247,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111",
                            wareName: '仓库1'
                        },
                    ]
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/getBoardOperate`, {
        method: 'GET',
        params
    });
}

export function delBoard(data?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    code: 200,
                    success: true
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/delBoard`, {
        method: 'post',
        data
    });
}



export function getTaskList(params?: any){
    if(global_config.localData){
        return new Promise<AxiosResponse<T>>(resolve => {
            setTimeout(()=>{
                resolve({
                    code: 200,
                    data: [
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:244,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111"
                        },
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:245,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111",
                            wareName: '仓库1'
                        },
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:246,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111",
                            wareName: '仓库1'
                        },
                        {
                            operatorName:"111",
                            version:"4.0",
                            number:247,
                            updateTime:"2023-09-27 16:12:14.500",
                            boardName:"111",
                            wareName: '仓库1'
                        },
                    ]
                })
            },100)
        })
    }

    return request<any>(`/bigIntelligence/v1/getTaskList`, {
        method: 'GET',
        params
    });
}
