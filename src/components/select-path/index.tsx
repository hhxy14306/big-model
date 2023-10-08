import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less'
import {Button, Input, message, Upload, Space, Modal, Tree, Tooltip, Divider} from 'antd';
import { getFolder } from '@/services/infer'
import { ReactComponent as Back } from '@/assets/svg/back.svg';
import {useQuery} from "umi";

import debounce from 'lodash/debounce'
import {useImmer} from "use-immer";
import ch = CSS.ch;

export default function(props){
  const {value, onChange} = props;

  const [parentPath, setParentPath] = useState();
  const [showSelect, setShowSelect] = useState(false);
  const [deep, setDeep] = useState(0);
  const [path, setPath] = useState<string>(value);
  const [treeData, setTreeData] = useState([]);

  const folderData = useImmer(new Map());

  useEffect(()=>{
    getFolderData().then(data=>{
      setTreeData(data);
    })
  },[]);

  const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
      list.map((node) => {
        if (node.key === key) {
          return {
            ...node,
            children,
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTreeData(node.children, key, children),
          };
        }
        return node;
      });

  async function getFolderData(key?: string){
    const res = await getFolder({path_name: key});
    const parentKey = typeof key === 'undefined' ? '/' : (key + '/');
    if(res.success){
      return res.data.map(item=>({
        title: item,
        key: parentKey + item,
      }));
    }
    return [];
  }

  // useEffect(()=>{
  //   if(!data) return
  //   console.log(12313123, data, parentPath);
  //   const key = parentPath === undefined ? "/" : parentPath + "-" + 1;
  //  // folderData.push(key, data);
  //
  // },[]);


  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
    setPath(keys[0]);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  const onLoadData = async ({ key, children }: any) => {
    if(children) return;
    const data:any = await getFolderData(key)
    setTreeData((origin) =>
        updateTreeData(origin, key, data),
    );
    return
  }

  function handleOk(){
    onChange(path);
    setShowSelect(false);
  }

  return (
    <span className={styles.selectFolderPath}>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="请输入或选择遥感数据路径"
          value={value}
          onChange={(e)=>{
            onChange(e.target.value)
          }}
          allowClear
        />
        <Button type="primary" onClick={()=>setShowSelect(true)}>选择路径</Button>
      </Space.Compact>

      <Modal
        title="选择路径"
        className={styles.selectFolderPathModal}
        footer={null}
        onCancel={()=>setShowSelect(false)}
        width='40vw'
        open={showSelect}
      >
        <div className={styles.selectFolderPathContent}>
          <div className={styles.header}>
            <span>当前选择目录：{path}</span>
            <Button type="primary" onClick={handleOk}>确定</Button>
            {/*<Button disabled={deep === 0} className={styles.backButton}>*/}
            {/*  <span>返回上级</span>*/}
            {/*  <Back fill={deep === 0 ? '#d9d9d9' : ""} width={20} height={20}/>*/}
            {/*</Button>*/}
          </div>
          <Divider/>
          <Tree.DirectoryTree
              multiple
              //defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
              loadData={onLoadData}
              treeData={treeData}
          />
        </div>
      </Modal>
    </span>
  )
}
