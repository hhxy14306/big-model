import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less'
import { Button, Input, message, Upload, Space } from 'antd';
import { getSystemType } from '@/utils'
import debounce from 'lodash/debounce'

export default function(props){
  const {value, onChange} = props;

  const [path, setPath] = useState<string>(value);
  const  uploadRef = useRef();

  useEffect(()=>{
    onChange(path);
  },[path]);

  const onInputChange = debounce((val)=>{
    setPath(val)
  }, 50);

  function handleClick(e){
    console.log(e)
     uploadRef.current.click()
  }
  function onUpload(){
    console.log("终端设备：",getSystemType())

    const filePath = uploadRef.current.value;
    const folderList = filePath.split("\\");
    let folderPath = folderList.splice(0,folderList.length -1).join("\\") + "\\";
    setPath(folderPath)
    // const filePath2 = uploadRef.current.value.split("\\\\");
    // console.log(filePath2)
    // setValue(filePath2[filePath2.length - 1])
  }
  return (
    <span className={styles.selectFolderPath}>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="请输入或选择遥感数据路径"
          value={value}
          onChange={(e)=>onInputChange(e.target.value)}
          allowClear
        />
        <Button type="primary" onClick={handleClick}>选择路径</Button>
      </Space.Compact>
      <input ref={uploadRef}  type='file' style={{display: "none"}} onChange={onUpload}/>
    </span>
  )
}
