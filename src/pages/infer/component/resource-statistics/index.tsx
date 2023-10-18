import React from 'react';
import { Card } from 'antd';

import styles from './index.less'
import classnames from 'classnames'
import ChartRate from './components/chart-rate'
import ChartTime from './components/chart-time'
import ChartResourceUsage from './components/chart-resource-usage'


export default () => {

  return (
      <div className={classnames(styles.resourceStatistics,'boxShadow')}>
        <Card
            bordered={false}
            title={<span className={styles.title}>遥感数据推理统计</span>}>
          <div className={styles.content}>
            <ChartRate/>
            <ChartTime/>
            <ChartResourceUsage/>
          </div>
        </Card>
      </div>
  )

}
