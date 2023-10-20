import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './index.less'
import { Form, Select, message, Modal } from 'antd';
import { getNodeStatus, createInfer } from '@/services/infer'
import { useModel } from 'umi';
import SelectFolderPath from '@/components/select-folder-path'
import {addUser, updateUser} from "@/services/user";
import {getBoardList, getChassisList} from "@/services/warehouse";

export default function(props){

  const { visible, onClose, record} = props;
  const { initialState } = useModel('@@initialState');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [boardList, setBoardList] = useState([]);
  const [list, setList] = useState([]);

  const dataMap = useRef({});

  useEffect(()=>{
    Promise.all([getBoardData()]).then()
  },[]);

  useEffect(()=>{
    form.setFieldsValue(record)
  },[record]);

  async function getBoardData(){
    const res = await getBoardList();
    if(res.code === 200){
      setBoardList(res.data.map(item=>({
        label: item.name,
        value: item.code
      })))
    }
    console.log(res)
  }

  async function handleOk(){
    setConfirmLoading(true)
    try{
      const values = await form.validateFields();
      console.log(values);
      const method = isEdit ? updateUser : addUser;
      const res = await method({
            ...values,
            // nodeList: JSON.stringify(values.nodeList),
            userName: initialState.name
          }
      )

      if(res.code === "200" ){
        message.success("创建成功！")
        onClose()
      }else {
        message.error("创建失败！")
      }
    }catch (e) {

    }
    setConfirmLoading(false)
  }

  useEffect(()=>{
    if(visible){
      // form.setFieldsValue({
      //   level: 0,
      //   shareType: 'quantity',
      //   modelType: 'segmentation'
      // })
    }else {
      form.resetFields()
    }
  },[visible]);

  async function handleSelect(boardName){
    console.log(boardName)
    let data = dataMap[boardName];
    if(!data){
      const res = await getChassisList({boardName});
      if(res.code === 200){
        data = res.data.map(item=>({
          label: item.name,
          value: item.code
        }))
      }
    }
    setList(data);
  }

  return (
    <Modal
      title="添加到板卡"
      open={visible}
      onOk={handleOk}
      getContainer={false}
      maskClosable={false}
      width='40vw'
      centered
      confirmLoading={confirmLoading}
      onCancel={onClose}
      className={styles.createUpdateUser}
    >
      <Form
        className={styles.createForm}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="机箱名" name="user_name" rules={[{ required: true, message: '请选择机箱!' }]}>
          <Select onSelect={handleSelect} placeholder='请选择机箱' options={boardList}/>
        </Form.Item>
        <Form.Item label="板卡名" name="user_pass" rules={[{ required: true, message: '请选择板卡!' }]}>
          <Select placeholder='请选择板卡' options={list}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}
