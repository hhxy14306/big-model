import React from 'react';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel } from 'umi';
import styles from './index.less';
import { ReactComponent as InferIcon } from '@/assets/menuIcon/inferIcon.svg';
import ResourceView from './component/resource-overview'
import ResourceStatistics from './component/resource-statistics'

export default() => {
  const { name } = useModel('global');
  return (
    <div className={styles.inferContainer}>
      <ResourceView/>
      <ResourceStatistics/>
    </div>
  );
};
