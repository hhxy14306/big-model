import React, { createElement, useEffect, useMemo } from 'react';
import styles from './index.less'
import { Badge, Modal, Table, Tabs, Input, Radio, Checkbox } from 'antd';
import TaskList from './task-list/index'

export default function(props){
  const {visible, onClose, record } = props;

  const tabList = [
    {
      label: '任务队列',
      key: '1',
      children: createElement(TaskList, {record}),
    },
    // {
    //   label: 'Tab 2',
    //   key: '2',
    //   children: 'Tab 2',
    //   disabled: true,
    // },
  ]

  return (
    <Modal
      title="虚拟核详情"
      getContainer={false}
      className={styles.dirDetail}
      open={visible}
      maskClosable={false}
      centered
      width='60vw'
      footer={null}
      onCancel={onClose}
    >
      <div className={styles.dirDetailContent}>
        <Tabs
          defaultActiveKey="1"
          items={tabList}
        />
      </div>
    </Modal>
  )
}
