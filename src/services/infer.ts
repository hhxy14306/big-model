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
            "nodeStatus": 2,
            "runTaskNum": 0,
            "waitTaskNum": 0
          },
          {
            "nodeName": "Ascend 310P3-vdavinci102",
            "nodeStatus": 3,
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
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve({
          "fileNum": 12,
          "nodeName": "ascend310p3-vdavinci2",
          "taskList": [
            {
              "createtime": "2023-10-08 07:26:33",
              "fileList": [
                {
                  "filePath": "/data/admin/input/top_potsdam_2_10_RGB.tif",
                  "outFile": "/Z/input/top_potsdam_2_10_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/Z/input",
              "level": 1,
              "status": 1,
              "taskID": "06076458-3688-4934-a71c-6c33a4c0ec6d",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 07:26:11",
              "fileList": [
                {
                  "filePath": "/data/admin/input/top_potsdam_2_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                }
              ],
              "folder": "/Z/input",
              "level": 1,
              "status": 3,
              "taskID": "0997064b-9fe0-49ed-a43a-ec4cc9f767b9",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 06:48:23",
              "fileList": [
                {
                  "filePath": "/data/admin/input//top_potsdam_2_10_RGB.tif",
                  "outFile": "/Z/input//top_potsdam_2_10_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/Z/input/",
              "level": 1,
              "status": 1,
              "taskID": "0c21813f-1ac3-43da-aaf0-f2ec5fa3c2d0",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 07:33:45",
              "fileList": [
                {
                  "filePath": "/data/admin/input/top_potsdam_2_10_RGB.tif",
                  "outFile": "/Z/input/top_potsdam_2_10_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/Z/input",
              "level": 1,
              "status": 1,
              "taskID": "155496a3-b5c9-48e0-a773-0f75e4d96d50",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-07 10:56:45",
              "fileList": [
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_2_10_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_2_11_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_4_11_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_5_11_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_7_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_6_7_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_8_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_6_8_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.json",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_8_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_7_8_RGB.json",
                  "status": 1
                }
              ],
              "folder": "/data/potsdam_2_Ortho_RGB_test",
              "level": 1,
              "status": 1,
              "taskID": "1eadcaa9-a61d-45eb-a247-82ae7e13873e",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 09:00:57",
              "fileList": [
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_8_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.tif",
                  "outFile": "",
                  "status": 3
                }
              ],
              "folder": "/admin/potsdam_2_Ortho_RGB_test",
              "level": 1,
              "status": 3,
              "taskID": "272bae8f-19ac-4db3-a0aa-665b80d5a6d1",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 06:53:35",
              "fileList": [
                {
                  "filePath": "/data/admin/input//top_potsdam_2_10_RGB.tif",
                  "outFile": "/Z/input//top_potsdam_2_10_RGB.json",
                  "status": 1
                }
              ],
              "folder": "/Z/input/",
              "level": 1,
              "status": 1,
              "taskID": "3ac72e66-5d32-4a5a-acf1-e77d97c59a2b",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 06:40:31",
              "fileList": [
                {
                  "filePath": "/data/admin/input//top_potsdam_2_10_RGB.tif",
                  "outFile": "/Z/input//top_potsdam_2_10_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/Z/input/",
              "level": 1,
              "status": 1,
              "taskID": "5f20d1bc-5fc1-485a-a885-298b2d23f738",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 06:36:11",
              "fileList": [
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_10_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_2_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_11_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_2_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_11_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_4_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_11_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_5_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_7_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_6_7_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_8_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_6_8_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_8_RGB.tif",
                  "outFile": "data/potsdam_2_Ortho_RGB_test/top_potsdam_7_8_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "data/potsdam_2_Ortho_RGB_test",
              "level": 1,
              "status": 1,
              "taskID": "6b59e518-f864-4701-a248-02c19aeb8767",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-07 10:26:25",
              "fileList": [
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_11_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_11_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_11_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_7_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_8_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.tif",
                  "outFile": "",
                  "status": 3
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_8_RGB.tif",
                  "outFile": "",
                  "status": 3
                }
              ],
              "folder": "/data/potsdam_2_Ortho_RGB_test",
              "level": 0,
              "status": 0,
              "taskID": "939ea217-bc1b-41f3-af1e-56f275add6b4",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-07 11:20:19",
              "fileList": [
                {
                  "filePath": "/data/admin/input/top_potsdam_2_10_RGB.tif",
                  "outFile": "/data/input/top_potsdam_2_10_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/data/input",
              "level": 1,
              "status": 1,
              "taskID": "94b16723-389d-4dc4-a115-75bc47906186",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 06:35:58",
              "fileList": [
                {
                  "filePath": "/data/admin/input//top_potsdam_2_10_RGB.tif",
                  "outFile": "/Z/input//top_potsdam_2_10_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/Z/input/",
              "level": 1,
              "status": 1,
              "taskID": "b459b56d-d955-4a53-ac32-789347a591a0",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-08 06:28:14",
              "fileList": [
                {
                  "filePath": "/data/admin/input//top_potsdam_2_10_RGB.tif",
                  "outFile": "/Z/input//top_potsdam_2_10_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/Z/input/",
              "level": 1,
              "status": 1,
              "taskID": "d66407fc-a726-4708-af02-e194a0b332ec",
              "userName": "admin"
            },
            {
              "createtime": "2023-10-07 11:10:58",
              "fileList": [
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_2_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_2_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_2_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_3_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_3_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_4_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_4_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_4_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_5_10_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_5_11_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_5_11_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_7_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_6_7_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_6_8_RGB.tif",
                  "outFile": "",
                  "status": 0
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_7_7_RGB.xml",
                  "status": 1
                },
                {
                  "filePath": "/data/admin/potsdam_2_Ortho_RGB_test/top_potsdam_7_8_RGB.tif",
                  "outFile": "/data/potsdam_2_Ortho_RGB_test/top_potsdam_7_8_RGB.xml",
                  "status": 1
                }
              ],
              "folder": "/data/potsdam_2_Ortho_RGB_test",
              "level": 1,
              "status": 1,
              "taskID": "e3181448-65d2-452d-ac87-bcf4848200f0",
              "userName": "admin"
            }
          ]
        })
      },100)
    })
  }

  return request<any>(`/bigIntelligence/v1/getNodeTaskMsg`, {
    method: 'GET',
    params
  });
}

export function getFolder(params?: any){
  console.log(params)
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve({
          "data": [
            "usr",
            "data",
            "opt",
            "test",
            "router",
            "vendor"
          ],
          "success": true
        })
      },100)
    })
  }
  return request<any>(`/bigIntelligence/v1/system/ListDirectory`, {
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
              "time": "2023-10-08 16"
            },
            {
              "num": 1,
              "time": "2023-10-08 17"
            },
            {
              "num": 1,
              "time": "2023-10-08 18"
            },
            {
              "num": 1,
              "time": "2023-10-08 11"
            },
            {
              "num": 2,
              "time": "2023-10-08 20"
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

export function getTaskAverageTime(params?:any){
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve([
          {
            "Id": "fcdeb61c-4b21-43f8-a781-c55cde4da1f3", //id
            "averageTime": 11.4972,                                     //平均时间
            "consumernum": 4,                                            //前十秒下发的任务个数
            "createTime": "2023-10-10 04:43:42.370",        //任务创建时间
            "errornum": 0,                                                 //错误个数
            "fileTime": [                                                    //单个任务完成的时间
              38.933,
              38.966,
              37.943,
              37.871,
              37.053,
              37.009,
              38.967,
              38.946,
              38.562,
              38.54
            ],
            "modeType": 11,                                                 //模型类型 11：分割   12：分类  13：识别  14： 变化
            "num": 10,                                                         //总个数
            "parallel": 0,                                                      //正在执行的个数
            "sucnum": 10,                                                   //执行成功的个数
            "time": 114.972,                                                //总时间
            "userName": "admin"                                       //提交用户
          },
          {
            "Id": "9fd81059-410c-4b50-a0ee-7d5920fe8635",
            "averageTime": 24.910400000000003,
            "consumernum": 1,
            "createTime": "2023-10-10 04:34:37.190",
            "errornum": 0,
            "fileTime": [
              25.019,
              24.94,
              25.028,
              25.063,
              25.025,
              24.982,
              24.995,
              24.98,
              24.923,
              24.127
            ],
            "modeType": 11,
            "num": 10,
            "parallel": 0,
            "sucnum": 10,
            "time": 249.104,
            "userName": "admin"
          },
          {
            "Id": "532696a3-52f5-45ba-a579-d0c112e919f3",
            "averageTime": 24.6785,
            "consumernum": 1,
            "createTime": "2023-10-10 04:26:35.500",
            "errornum": 0,
            "fileTime": [
              23.295,
              25.73,
              24.953,
              24.152,
              24.875,
              23.37,
              25.701,
              25.019,
              25.018,
              24.462
            ],
            "modeType": 11,
            "num": 10,
            "parallel": 0,
            "sucnum": 10,
            "time": 246.785,
            "userName": "admin"
          },
          {
            "Id": "0dfa803f-f911-4d3c-a723-30de6a930006",
            "averageTime": 24.9232,
            "consumernum": 1,
            "createTime": "2023-10-10 04:10:37.597",
            "errornum": 0,
            "fileTime": [
              24.988,
              24.996,
              24.476,
              25.48,
              24.671
            ],
            "modeType": 12,
            "num": 29,
            "parallel": 1,
            "sucnum": 5,
            "time": 124.616,
            "userName": "admin"
          },
          {
            "Id": "ccf50e8f-52d3-419f-abc7-0e1b5884b911",
            "averageTime": 24.808799999999998,
            "consumernum": 1,
            "createTime": "2023-10-10 03:41:23.910",
            "errornum": 0,
            "fileTime": [
              24.754,
              25.227,
              24.988,
              25.045,
              23.99
            ],
            "modeType": 12,
            "num": 5,
            "parallel": 0,
            "sucnum": 5,
            "time": 124.044,
            "userName": "admin"
          },
          {
            "Id": "22c58cfd-d352-4711-af3c-9faa0b026f45",
            "averageTime": 7.7577037037037035,
            "consumernum": 5,
            "createTime": "2023-10-10 03:34:58.987",
            "errornum": 0,
            "fileTime": [
              25.006,
              38.761,
              38.078,
              36.889,
              37.028,
              36.968,
              36.851,
              25.009,
              35.965,
              36.025,
              24.057,
              36.97,
              36.904,
              35.988,
              35.968,
              24.945,
              37.081,
              37.074,
              38.117,
              37.954,
              25.155,
              23.938,
              39.914,
              39.891,
              38.338,
              37.471,
              25.865
            ],
            "modeType": 13,
            "num": 27,
            "parallel": 0,
            "sucnum": 27,
            "time": 209.458,
            "userName": "admin"
          },
          {
            "Id": "103ed4f4-2985-47c4-a17c-0735c795a229",
            "averageTime": 24.928,
            "consumernum": 1,
            "createTime": "2023-10-10 03:31:36.129",
            "errornum": 0,
            "fileTime": [
              24.86,
              24.981,
              25.022,
              25.0,
              24.775
            ],
            "modeType": 13,
            "num": 5,
            "parallel": 0,
            "sucnum": 5,
            "time": 124.64,
            "userName": "admin"
          },
          {
            "Id": "dcc70acd-4b55-466f-a62d-544e21d941b3",
            "averageTime": 8.4035,
            "consumernum": 4,
            "createTime": "2023-10-10 03:14:05.820",
            "errornum": 0,
            "fileTime": [
              25.788,
              24.921,
              25.062,
              25.078,
              37.216,
              37.057,
              24.984,
              24.238,
              37.466,
              37.421,
              25.73,
              25.004
            ],
            "modeType": 11,
            "num": 27,
            "parallel": 4,
            "sucnum": 12,
            "time": 100.842,
            "userName": "admin"
          },
          {
            "Id": "5faaee98-781b-463f-a81b-84bfda602c33",
            "averageTime": 24.264400000000002,
            "consumernum": 1,
            "createTime": "2023-10-10 03:09:17.486",
            "errornum": 0,
            "fileTime": [
              24.08,
              24.94,
              24.101,
              24.047,
              24.151
            ],
            "modeType": 11,
            "num": 5,
            "parallel": 0,
            "sucnum": 5,
            "time": 121.322,
            "userName": "admin"
          },
          {
            "Id": "c25cfddb-5ee0-4098-a76d-c2d77b2910c5",
            "averageTime": 24.3536,
            "consumernum": 1,
            "createTime": "2023-10-10 03:01:19.908",
            "errornum": 0,
            "fileTime": [
              23.981,
              24.044,
              24.929,
              24.08,
              24.732
            ],
            "modeType": 11,
            "num": 5,
            "parallel": 0,
            "sucnum": 5,
            "time": 121.768,
            "userName": "admin"
          }
        ])
      },100)
    })
  }
  return request<any>(`/bigIntelligence/v1/getTaskAverageTime`, {
    method: 'GET',
    params
  });
}

export function getAverageTreatment(params?:any){
  if(global_config.localData){
    return new Promise<AxiosResponse<T>>(resolve => {
      setTimeout(()=>{
        resolve({
              "change": [],
              "recognize": [],
              "segmentation": [
                {
                  "num": 10.654,
                  "time": "2023-10-08 16"
                },
                {
                  "num": 0.005,
                  "time": "2023-10-08 17"
                },
                {
                  "num": 0.001,
                  "time": "2023-10-08 18"
                },
                {
                  "num": 18000.005,
                  "time": "2023-10-08 11"
                },
                {
                  "num": 0.007,
                  "time": "2023-10-08 20"
                }
              ],
              "sort": []
            })
      },100)
    })
  }
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
          "success": false
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



