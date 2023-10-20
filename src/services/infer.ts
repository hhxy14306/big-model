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
          "data": [
            {
              "ID": 5438,
              "CreatedAt": "2023-10-20T06:40:23.445617025Z",
              "UpdatedAt": "2023-10-20T06:40:23.445617025Z",
              "DeletedAt": null,
              "cpu_use_num": 2.01,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697784022
            },
            {
              "ID": 5437,
              "CreatedAt": "2023-10-20T06:39:22.44082022Z",
              "UpdatedAt": "2023-10-20T06:39:22.44082022Z",
              "DeletedAt": null,
              "cpu_use_num": 2,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697783961
            },
            {
              "ID": 5436,
              "CreatedAt": "2023-10-20T06:38:21.435905158Z",
              "UpdatedAt": "2023-10-20T06:38:21.435905158Z",
              "DeletedAt": null,
              "cpu_use_num": 0.84,
              "mem_use_num": 6.06,
              "disk_use_num": 2.77,
              "time": 1697783900
            },
            {
              "ID": 5435,
              "CreatedAt": "2023-10-20T06:37:20.431071736Z",
              "UpdatedAt": "2023-10-20T06:37:20.431071736Z",
              "DeletedAt": null,
              "cpu_use_num": 1.04,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697783839
            },
            {
              "ID": 5434,
              "CreatedAt": "2023-10-20T06:36:43.547248976Z",
              "UpdatedAt": "2023-10-20T06:36:43.547248976Z",
              "DeletedAt": null,
              "cpu_use_num": 2.45,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697783802
            },
            {
              "ID": 5433,
              "CreatedAt": "2023-10-20T06:35:42.534427292Z",
              "UpdatedAt": "2023-10-20T06:35:42.534427292Z",
              "DeletedAt": null,
              "cpu_use_num": 2.97,
              "mem_use_num": 6.07,
              "disk_use_num": 2.77,
              "time": 1697783741
            },
            {
              "ID": 5432,
              "CreatedAt": "2023-10-20T06:34:41.51689179Z",
              "UpdatedAt": "2023-10-20T06:34:41.51689179Z",
              "DeletedAt": null,
              "cpu_use_num": 0.67,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697783680
            },
            {
              "ID": 5431,
              "CreatedAt": "2023-10-20T06:33:40.501348908Z",
              "UpdatedAt": "2023-10-20T06:33:40.501348908Z",
              "DeletedAt": null,
              "cpu_use_num": 0.96,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697783619
            },
            {
              "ID": 5430,
              "CreatedAt": "2023-10-20T06:32:39.495719237Z",
              "UpdatedAt": "2023-10-20T06:32:39.495719237Z",
              "DeletedAt": null,
              "cpu_use_num": 0.75,
              "mem_use_num": 6.06,
              "disk_use_num": 2.77,
              "time": 1697783558
            },
            {
              "ID": 5429,
              "CreatedAt": "2023-10-20T06:31:38.490250621Z",
              "UpdatedAt": "2023-10-20T06:31:38.490250621Z",
              "DeletedAt": null,
              "cpu_use_num": 2.17,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697783497
            },
            {
              "ID": 5428,
              "CreatedAt": "2023-10-20T06:30:37.483872336Z",
              "UpdatedAt": "2023-10-20T06:30:37.483872336Z",
              "DeletedAt": null,
              "cpu_use_num": 0.96,
              "mem_use_num": 6.02,
              "disk_use_num": 2.77,
              "time": 1697783436
            },
            {
              "ID": 5427,
              "CreatedAt": "2023-10-20T06:29:36.477899618Z",
              "UpdatedAt": "2023-10-20T06:29:36.477899618Z",
              "DeletedAt": null,
              "cpu_use_num": 1.84,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697783375
            },
            {
              "ID": 5426,
              "CreatedAt": "2023-10-20T06:28:35.472514409Z",
              "UpdatedAt": "2023-10-20T06:28:35.472514409Z",
              "DeletedAt": null,
              "cpu_use_num": 1.34,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697783314
            },
            {
              "ID": 5425,
              "CreatedAt": "2023-10-20T06:27:34.45554947Z",
              "UpdatedAt": "2023-10-20T06:27:34.45554947Z",
              "DeletedAt": null,
              "cpu_use_num": 1.13,
              "mem_use_num": 6.02,
              "disk_use_num": 2.77,
              "time": 1697783253
            },
            {
              "ID": 5424,
              "CreatedAt": "2023-10-20T06:26:33.448224248Z",
              "UpdatedAt": "2023-10-20T06:26:33.448224248Z",
              "DeletedAt": null,
              "cpu_use_num": 0.88,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697783192
            },
            {
              "ID": 5423,
              "CreatedAt": "2023-10-20T06:25:32.440782581Z",
              "UpdatedAt": "2023-10-20T06:25:32.440782581Z",
              "DeletedAt": null,
              "cpu_use_num": 0.88,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697783131
            },
            {
              "ID": 5422,
              "CreatedAt": "2023-10-20T06:24:31.429576097Z",
              "UpdatedAt": "2023-10-20T06:24:31.429576097Z",
              "DeletedAt": null,
              "cpu_use_num": 1.04,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697783070
            },
            {
              "ID": 5421,
              "CreatedAt": "2023-10-20T06:23:30.424618976Z",
              "UpdatedAt": "2023-10-20T06:23:30.424618976Z",
              "DeletedAt": null,
              "cpu_use_num": 0.71,
              "mem_use_num": 6.02,
              "disk_use_num": 2.77,
              "time": 1697783009
            },
            {
              "ID": 5420,
              "CreatedAt": "2023-10-20T06:22:29.41935419Z",
              "UpdatedAt": "2023-10-20T06:22:29.41935419Z",
              "DeletedAt": null,
              "cpu_use_num": 1.08,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782948
            },
            {
              "ID": 5419,
              "CreatedAt": "2023-10-20T06:21:28.412233293Z",
              "UpdatedAt": "2023-10-20T06:21:28.412233293Z",
              "DeletedAt": null,
              "cpu_use_num": 2.67,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782887
            },
            {
              "ID": 5418,
              "CreatedAt": "2023-10-20T06:20:27.40686767Z",
              "UpdatedAt": "2023-10-20T06:20:27.40686767Z",
              "DeletedAt": null,
              "cpu_use_num": 1.75,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782826
            },
            {
              "ID": 5417,
              "CreatedAt": "2023-10-20T06:19:26.401686413Z",
              "UpdatedAt": "2023-10-20T06:19:26.401686413Z",
              "DeletedAt": null,
              "cpu_use_num": 1.67,
              "mem_use_num": 6.02,
              "disk_use_num": 2.77,
              "time": 1697782765
            },
            {
              "ID": 5416,
              "CreatedAt": "2023-10-20T06:18:25.397015072Z",
              "UpdatedAt": "2023-10-20T06:18:25.397015072Z",
              "DeletedAt": null,
              "cpu_use_num": 1.67,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697782704
            },
            {
              "ID": 5415,
              "CreatedAt": "2023-10-20T06:17:24.392285085Z",
              "UpdatedAt": "2023-10-20T06:17:24.392285085Z",
              "DeletedAt": null,
              "cpu_use_num": 2.43,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697782643
            },
            {
              "ID": 5414,
              "CreatedAt": "2023-10-20T06:16:23.387450614Z",
              "UpdatedAt": "2023-10-20T06:16:23.387450614Z",
              "DeletedAt": null,
              "cpu_use_num": 3.06,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782582
            },
            {
              "ID": 5413,
              "CreatedAt": "2023-10-20T06:15:22.382557941Z",
              "UpdatedAt": "2023-10-20T06:15:22.382557941Z",
              "DeletedAt": null,
              "cpu_use_num": 3.04,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697782521
            },
            {
              "ID": 5412,
              "CreatedAt": "2023-10-20T06:15:17.261867479Z",
              "UpdatedAt": "2023-10-20T06:15:17.261867479Z",
              "DeletedAt": null,
              "cpu_use_num": 0.79,
              "mem_use_num": 6.04,
              "disk_use_num": 2.78,
              "time": 1697782516
            },
            {
              "ID": 5411,
              "CreatedAt": "2023-10-20T06:14:16.247610096Z",
              "UpdatedAt": "2023-10-20T06:14:16.247610096Z",
              "DeletedAt": null,
              "cpu_use_num": 2.39,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782455
            },
            {
              "ID": 5410,
              "CreatedAt": "2023-10-20T06:13:15.243399438Z",
              "UpdatedAt": "2023-10-20T06:13:15.243399438Z",
              "DeletedAt": null,
              "cpu_use_num": 1.84,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782394
            },
            {
              "ID": 5409,
              "CreatedAt": "2023-10-20T06:12:14.231376035Z",
              "UpdatedAt": "2023-10-20T06:12:14.231376035Z",
              "DeletedAt": null,
              "cpu_use_num": 2.34,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782333
            },
            {
              "ID": 5408,
              "CreatedAt": "2023-10-20T06:11:13.227105439Z",
              "UpdatedAt": "2023-10-20T06:11:13.227105439Z",
              "DeletedAt": null,
              "cpu_use_num": 1.55,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697782272
            },
            {
              "ID": 5407,
              "CreatedAt": "2023-10-20T06:10:12.207778698Z",
              "UpdatedAt": "2023-10-20T06:10:12.207778698Z",
              "DeletedAt": null,
              "cpu_use_num": 0.5,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782211
            },
            {
              "ID": 5406,
              "CreatedAt": "2023-10-20T06:09:11.202195612Z",
              "UpdatedAt": "2023-10-20T06:09:11.202195612Z",
              "DeletedAt": null,
              "cpu_use_num": 2.83,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697782150
            },
            {
              "ID": 5405,
              "CreatedAt": "2023-10-20T06:08:10.186817295Z",
              "UpdatedAt": "2023-10-20T06:08:10.186817295Z",
              "DeletedAt": null,
              "cpu_use_num": 1.3,
              "mem_use_num": 6.03,
              "disk_use_num": 2.77,
              "time": 1697782089
            },
            {
              "ID": 5404,
              "CreatedAt": "2023-10-20T06:07:09.182569154Z",
              "UpdatedAt": "2023-10-20T06:07:09.182569154Z",
              "DeletedAt": null,
              "cpu_use_num": 3,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697782028
            },
            {
              "ID": 5403,
              "CreatedAt": "2023-10-20T06:06:08.174187666Z",
              "UpdatedAt": "2023-10-20T06:06:08.174187666Z",
              "DeletedAt": null,
              "cpu_use_num": 5.55,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697781967
            },
            {
              "ID": 5402,
              "CreatedAt": "2023-10-20T06:05:07.169751783Z",
              "UpdatedAt": "2023-10-20T06:05:07.169751783Z",
              "DeletedAt": null,
              "cpu_use_num": 3.72,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697781906
            },
            {
              "ID": 5401,
              "CreatedAt": "2023-10-20T06:04:06.15594877Z",
              "UpdatedAt": "2023-10-20T06:04:06.15594877Z",
              "DeletedAt": null,
              "cpu_use_num": 1.3,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697781845
            },
            {
              "ID": 5400,
              "CreatedAt": "2023-10-20T06:03:05.14402026Z",
              "UpdatedAt": "2023-10-20T06:03:05.14402026Z",
              "DeletedAt": null,
              "cpu_use_num": 1.59,
              "mem_use_num": 6.06,
              "disk_use_num": 2.77,
              "time": 1697781784
            },
            {
              "ID": 5399,
              "CreatedAt": "2023-10-20T06:02:04.132194091Z",
              "UpdatedAt": "2023-10-20T06:02:04.132194091Z",
              "DeletedAt": null,
              "cpu_use_num": 2.42,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697781723
            },
            {
              "ID": 5398,
              "CreatedAt": "2023-10-20T06:01:03.126207282Z",
              "UpdatedAt": "2023-10-20T06:01:03.126207282Z",
              "DeletedAt": null,
              "cpu_use_num": 1.25,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697781662
            },
            {
              "ID": 5397,
              "CreatedAt": "2023-10-20T06:00:02.117577908Z",
              "UpdatedAt": "2023-10-20T06:00:02.117577908Z",
              "DeletedAt": null,
              "cpu_use_num": 1.04,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697781601
            },
            {
              "ID": 5396,
              "CreatedAt": "2023-10-20T05:59:01.11086725Z",
              "UpdatedAt": "2023-10-20T05:59:01.11086725Z",
              "DeletedAt": null,
              "cpu_use_num": 1.05,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697781540
            },
            {
              "ID": 5395,
              "CreatedAt": "2023-10-20T05:58:00.102313138Z",
              "UpdatedAt": "2023-10-20T05:58:00.102313138Z",
              "DeletedAt": null,
              "cpu_use_num": 0.63,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697781479
            },
            {
              "ID": 5394,
              "CreatedAt": "2023-10-20T05:56:59.096728044Z",
              "UpdatedAt": "2023-10-20T05:56:59.096728044Z",
              "DeletedAt": null,
              "cpu_use_num": 1.09,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697781418
            },
            {
              "ID": 5393,
              "CreatedAt": "2023-10-20T05:55:58.087665242Z",
              "UpdatedAt": "2023-10-20T05:55:58.087665242Z",
              "DeletedAt": null,
              "cpu_use_num": 0.63,
              "mem_use_num": 6.04,
              "disk_use_num": 2.77,
              "time": 1697781357
            },
            {
              "ID": 5392,
              "CreatedAt": "2023-10-20T05:54:57.082164297Z",
              "UpdatedAt": "2023-10-20T05:54:57.082164297Z",
              "DeletedAt": null,
              "cpu_use_num": 1.38,
              "mem_use_num": 6.05,
              "disk_use_num": 2.77,
              "time": 1697781296
            },
            {
              "ID": 5391,
              "CreatedAt": "2023-10-13T23:29:12.094350647Z",
              "UpdatedAt": "2023-10-13T23:29:12.094350647Z",
              "DeletedAt": null,
              "cpu_use_num": 6.63,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239751091
            },
            {
              "ID": 5390,
              "CreatedAt": "2023-10-13T23:28:11.078987298Z",
              "UpdatedAt": "2023-10-13T23:28:11.078987298Z",
              "DeletedAt": null,
              "cpu_use_num": 6.31,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239690076
            },
            {
              "ID": 5389,
              "CreatedAt": "2023-10-13T23:27:10.074057484Z",
              "UpdatedAt": "2023-10-13T23:27:10.074057484Z",
              "DeletedAt": null,
              "cpu_use_num": 7.84,
              "mem_use_num": 9.39,
              "disk_use_num": 2.86,
              "time": 1697239629071
            },
            {
              "ID": 5388,
              "CreatedAt": "2023-10-13T23:26:09.054282347Z",
              "UpdatedAt": "2023-10-13T23:26:09.054282347Z",
              "DeletedAt": null,
              "cpu_use_num": 9.22,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239568051
            },
            {
              "ID": 5387,
              "CreatedAt": "2023-10-13T23:25:08.05028011Z",
              "UpdatedAt": "2023-10-13T23:25:08.05028011Z",
              "DeletedAt": null,
              "cpu_use_num": 7.52,
              "mem_use_num": 9.41,
              "disk_use_num": 2.86,
              "time": 1697239507047
            },
            {
              "ID": 5386,
              "CreatedAt": "2023-10-13T23:24:07.030471354Z",
              "UpdatedAt": "2023-10-13T23:24:07.030471354Z",
              "DeletedAt": null,
              "cpu_use_num": 7.52,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239446028
            },
            {
              "ID": 5385,
              "CreatedAt": "2023-10-13T23:23:06.02621306Z",
              "UpdatedAt": "2023-10-13T23:23:06.02621306Z",
              "DeletedAt": null,
              "cpu_use_num": 6.36,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239385023
            },
            {
              "ID": 5384,
              "CreatedAt": "2023-10-13T23:22:05.018697612Z",
              "UpdatedAt": "2023-10-13T23:22:05.018697612Z",
              "DeletedAt": null,
              "cpu_use_num": 7.47,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239324015
            },
            {
              "ID": 5383,
              "CreatedAt": "2023-10-13T23:21:04.013765828Z",
              "UpdatedAt": "2023-10-13T23:21:04.013765828Z",
              "DeletedAt": null,
              "cpu_use_num": 7.47,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239263011
            },
            {
              "ID": 5382,
              "CreatedAt": "2023-10-13T23:20:02.998468889Z",
              "UpdatedAt": "2023-10-13T23:20:02.998468889Z",
              "DeletedAt": null,
              "cpu_use_num": 7.9,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239201996
            },
            {
              "ID": 5381,
              "CreatedAt": "2023-10-13T23:19:01.994454372Z",
              "UpdatedAt": "2023-10-13T23:19:01.994454372Z",
              "DeletedAt": null,
              "cpu_use_num": 9.17,
              "mem_use_num": 9.41,
              "disk_use_num": 2.86,
              "time": 1697239140991
            },
            {
              "ID": 5380,
              "CreatedAt": "2023-10-13T23:18:00.982585205Z",
              "UpdatedAt": "2023-10-13T23:18:00.982585205Z",
              "DeletedAt": null,
              "cpu_use_num": 7.42,
              "mem_use_num": 9.39,
              "disk_use_num": 2.86,
              "time": 1697239079979
            },
            {
              "ID": 5379,
              "CreatedAt": "2023-10-13T23:16:59.977809549Z",
              "UpdatedAt": "2023-10-13T23:16:59.977809549Z",
              "DeletedAt": null,
              "cpu_use_num": 8.22,
              "mem_use_num": 9.4,
              "disk_use_num": 2.86,
              "time": 1697239018975
            }
          ],
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



