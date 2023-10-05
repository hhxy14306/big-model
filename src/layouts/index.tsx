import React from 'react';
import { Link, Outlet } from 'umi';
import styles from './index.less';
import Header from '@/layouts/header';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';

export default function Layout(props) {
  return (
      <ConfigProvider locale={locale}>
          <div className={styles.layout}>
              <Header/>
              <div className={styles.contentArea}>
                  <Outlet />
              </div>
          </div>
      </ConfigProvider>
  );
}
