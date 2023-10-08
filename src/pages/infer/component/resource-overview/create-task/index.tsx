import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less'
import { Form, Input, message, Modal, Radio, Select, Slider } from 'antd';
import { createInfer } from '@/services/infer'
import { useModel } from '@@/plugin-model';
import SelectFolderPath from '@/components/select-folder-path'
import SelectPath from '@/components/select-path'

export default function(props){

  const { visible, onClose, checkData, modelType } = props;
  const [machineList, setMachineList] = useState([]);
  const { initialState } = useModel('@@initialState');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const marks = {
    0: '一级',
    1: '二级',
    2: '三级',
    3: '四级',
    4: '五级'
  };
  const [form] = Form.useForm();

  const nodeList = useMemo(()=>{
    const list = [];
    for(let name in checkData){
      if(checkData.hasOwnProperty(name) && checkData[name]){
        list.push(name);
      }
    }
    return list
  },[checkData])

  console.log(initialState, modelType)

  async function handleOk(){
    setConfirmLoading(true)
    const values = await form.validateFields();
    const res = await createInfer({
      ...values,
      nodeList,
      modelType,
     // nodeList: JSON.stringify(values.nodeList),
      userName: initialState.username
      }
    )
    console.log(res)
    if(res.code === "200" ){
      message.success("创建成功！")
      onClose(true);
    }else {
      message.error("创建失败！")
    }
    setConfirmLoading(false)
  }

  useEffect(()=>{
    if(visible){
      form.setFieldsValue({
        level: 0,
        shareType: 'quantity',
        modelType: 'segmentation'
      })
    }else {
      form.resetFields()
    }
  },[visible]);

  return (
    <Modal
      title="创建推理任务"
      open={visible}
      onOk={handleOk}
      getContainer={false}
      maskClosable={false}
      width='40vw'
      centered
      confirmLoading={confirmLoading}
      onCancel={onClose}
      className={styles.createTaskModal}
    >
      <Form
        className={styles.createTask}
        form={form}
        initialValues={{level: 0}}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        {/*<Form.Item label="模型" name="modelType" required>*/}
        {/*  <Radio.Group>*/}
        {/*    /!*模型名称 segmentation：分割 classification：分类 recognition 识别 change 变化*!/*/}
        {/*    <Radio value="segmentation">分割</Radio>*/}
        {/*    <Radio value="classification">分类</Radio>*/}
        {/*    <Radio value="recognition">识别</Radio>*/}
        {/*    <Radio value="change">变化</Radio>*/}
        {/*  </Radio.Group>*/}
        {/*</Form.Item>*/}
        <Form.Item label="遥感数据路径" name="path" required>
          {/*<SelectFolderPath/>*/}
          <SelectPath/>
          {/*<Input/>*/}
        </Form.Item>
        <Form.Item tooltip="一级最低，五级最高" label="优先级" name="level" required>
          <Slider tooltip={{
            open: false
          }} marks={marks} min={0} max={4}/>
          {/*<Radio.Group>*/}
          {/*  <Radio value={0}>一级</Radio>*/}
          {/*  <Radio value={1}>二级</Radio>*/}
          {/*  <Radio value={2}>三级</Radio>*/}
          {/*  <Radio value={3}>四级</Radio>*/}
          {/*  <Radio value={4}>五级</Radio>*/}
          {/*</Radio.Group>*/}
        </Form.Item>
        <Form.Item label="数据分配策略" name="shareType" required>
          <Radio.Group>
            <Radio value="quantity">平均处理文件数</Radio>
            <Radio value="size">平均处理数据量</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
