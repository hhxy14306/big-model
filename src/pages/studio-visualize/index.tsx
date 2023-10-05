import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel } from 'umi';
import styles from './index.less';
import { ReactComponent as InferIcon } from '@/assets/menuIcon/inferIcon.svg';

export default() => {
  const { name } = useModel('global');
  return (
    <div className={styles.container}>
      <InferIcon/>
      <Guide name={trim(name)} />
    </div>
  );
};
