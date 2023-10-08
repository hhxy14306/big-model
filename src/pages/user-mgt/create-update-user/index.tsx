import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less'
import { Form, Input, message, Modal } from 'antd';
import { getNodeStatus, createInfer } from '@/services/infer'
import { useModel } from 'umi';
import SelectFolderPath from '@/components/select-folder-path'
import {addUser, updateUser} from "@/services/user";

export default function(props){
  const { visible, onClose, record} = props;
  const { initialState } = useModel('@@initialState');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const title = useMemo(()=> JSON.stringify(props.record) === "{}" ? '添加用户' : '修改用户',[props.record]);

  const isEdit = useMemo(()=> JSON.stringify(props.record) !== "{}",[props.record]);

  useEffect(()=>{
    form.setFieldsValue(record)
  },[record])

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


  return (
    <Modal
      title={title}
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
        <Form.Item label="用户名" name="user_name" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input disabled={isEdit} placeholder='请输入用户名'/>
        </Form.Item>
        <Form.Item label="密码" name="user_pass" rules={[{ required: true, message: '请输入用户密码!' }]}>
          <Input.Password placeholder='请输入密码'/>
        </Form.Item>
      </Form>
    </Modal>
  )
}
