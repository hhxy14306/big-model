import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, Form, message, Modal, Radio, Slider } from 'antd';
import styles from './index.less'
import { updateInfer } from '@/services/infer'
import { useModel } from 'umi';

export default function(props){
  const { visible, onClose, record } = props;
  const { initialState } = useModel('@@initialState');

  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const algorithmTypeList = useMemo(()=>{
    const list = [
      { label: '场景分割', value: 0},
      { label: '检测分类', value: 1},
      { label: '识别', value: 2},
      { label: '变化检测', value: 3},
    ]
    if(record.is_independence_npu){
      return list.slice(0,1)
    }
    return list
  },[record.is_independence_npu])

  async function handleOk(){
    setConfirmLoading(true);
    const values = await form.validateFields();
    try{
      const res = await updateInfer({
        operate_type: parseInt(record.operate_type),
        chip_tag: record.chip_name,
        vnpu_tag: record.name,
        user_name: initialState.username,
        //模型类型 0:场景分割 1:检测分类 2:目标识别 :变化检测
        algorithm_type: values.algorithmType
      })
      console.log(res)
      if(res.success){
        message.success("操作成功！");
        onClose();
      }else {
        message.error("操作失败,"+res.msg);
      }
    }catch (e) {
      message.error("操作失败！")
    }
    setConfirmLoading(false);
  }

  useEffect(()=>{
    let algorithmType = record.algorithm_type;
    if(algorithmType === -1 || typeof algorithmType === 'undefined'){
      algorithmType = 0;
    }
    if(visible){
      const data = {
        ...record,
        algorithmType
      }
      //isEdit && (data.model = 0)
      form.setFieldsValue(data)
    }else {
      form.resetFields()
    }
  }, [visible])

  return (
    <Modal
      title="模型启动配置"
      open={visible}
      getContainer={false}
      onOk={handleOk}
      maskClosable={false}
      centered
      width='40vw'
      confirmLoading={confirmLoading}
      onCancel={onClose}
    >
      <Form
        className={styles.modelConfig}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="模型" name="algorithmType" required>
          <Radio.Group>
            {algorithmTypeList.map(item=>(
                <Radio value={item.value} key={item.value}>{item.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="配置（置信度）" name="config" required>
          <Slider
              min={0}
              max={1}
              step={0.000001}
              onChange={()=>setOpen(true)}
              tooltip={{
                open,
                placement: 'bottom'
              }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
