import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less'
import { Form, Input, message, Modal, Radio, Select, Slider } from 'antd';
import { getResourceConfig, createInfer } from '@/services/infer'
import { useModel } from '@@/plugin-model';
import SelectFolderPath from '@/components/select-folder-path'

export default function(props){

  const { visible, onClose } = props;
  const [machineList, setMachineList] = useState([]);
  const { initialState } = useModel('@@initialState');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  async function handleOk(){
    setConfirmLoading(true)
    const values = await form.validateFields();
    console.log(values)
    const res = await createInfer({
      ...values,
     // nodeList: JSON.stringify(values.nodeList),
      userName: initialState.name
      }
    )
    console.log(res)
    if(res.code === "200" ){
      message.success("创建成功！")
      onClose()
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

  useEffect(()=>{
    getMachineData().then();
  },[]);

  async function getMachineData(){
    const res = await getResourceConfig();
    const data = [];
    if(res.success){
      res.data.list.forEach(item=>{
        item.vnpu_data.forEach(i=>{
          data.push({
            label: item.chip_name + "-" + i.vnpu_name,
            value: item.chip_name + "-" + i.vnpu_name,
          });
        });
      })
      setMachineList(data);
    }
  }

  const machineData = useMemo(()=>{
    return machineList
  },[machineList])

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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="虚拟核" name="nodeList">
          <Select
            placeholder='请选择'
            mode="multiple"
            allowClear
            options={machineData}
          />
        </Form.Item>
        <Form.Item label="模型" name="modelType" required>
          <Radio.Group>
            {/*模型名称 segmentation：分割 classification：分类 recognition 识别 change 变化*/}
            <Radio value="segmentation">分割</Radio>
            <Radio value="classification">分类</Radio>
            <Radio value="recognition">识别</Radio>
            <Radio value="change">变化</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="遥感数据路径" name="path" required>
          <SelectFolderPath/>
          {/*<Input/>*/}
        </Form.Item>
        <Form.Item label="优先级" name="level" required>
          <Radio.Group>
            <Radio value={0}>一级</Radio>
            <Radio value={1}>二级</Radio>
            <Radio value={2}>三级</Radio>
            <Radio value={3}>四级</Radio>
            <Radio value={4}>五级</Radio>
          </Radio.Group>
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
