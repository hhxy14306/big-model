import React, {createElement, useState, Suspense, useEffect} from 'react';
import { Link, Outlet, history, useModel,useLocation } from 'umi';
import styles from './index.less';
import logo from '@/assets/logo.png'
import userIcon from '@/assets/userIcon.png'
import {Badge, Dropdown, Menu, message, Space} from 'antd';
import {AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {MenuProps} from "antd/es/menu";
import { ReactComponent as InferIcon } from '@/assets/menuIcon/inferIcon.svg';
import { ReactComponent as ResourceIcon } from '@/assets/menuIcon/resourceIcon.svg';
import { ReactComponent as LogIcon } from '@/assets/menuIcon/log.svg';
import { ReactComponent as WarnIcon } from '@/assets/menuIcon/warnIcon.svg';
import { ReactComponent as StudioVisualizeIcon } from '@/assets/menuIcon/studioVisualizeIcon.svg';
import router from '../../../config/router'
import {IconMap} from "@/components/MenuIcon";
import{wrapPromise} from '@/utils';
import {getWarnLog} from "@/services/warn";
import {logOut} from "@/services";

const { global_config } = window as any

function ShowBadge(props){
  const {initialState} = useModel('@@initialState');
  //console.log(initialState)
  const {path} = props;
  if (path !== '/warn')return
  const [result, setResult] = useState(0);

  useEffect(()=>{
    getLogCount();
  },[]);

  async function getLogCount(){
    const res = await getWarnLog({
      start_time: -1,
      end_time: -1
    });
    if(res.success){
      setResult(res.data.total);
    }
  }

  return <Badge count={result} overflowCount={99999999999999999999} size="small" />
}

export default function Header(props) {
  const {initialState} = useModel('@@initialState');
  const location = useLocation();
  const {username} = initialState ||{};
  const [current, setCurrent] = useState(location.pathname);


  const data = wrapPromise(new Promise(resolve => {
    setTimeout(()=>{
      resolve(Math.random() > 0.2 ? 10 : 0)
    },0)
  }))

  const menuData = [];

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      //danger: true,
      label: '退出登录',
    },
  ];

  router.forEach((item:any)=>{
    if(item.path==="/warehouse" && !global_config.showWarehouse){
      item.hideInMenu = true
    }
    if(!item.hideInMenu){
      menuData.push({
        label:
            <>
              { item.name}
              <ShowBadge {...item}/>
            </>
           ,
        key: item.path,
        icon: item.customIcon ? createElement(IconMap[item.icon], {
          ...item.customIcon,
          className: "icon-"+item.icon
        }) : <i/>,
      },)
    }
  });

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    if(["/studio-visualize"].includes(e.key)){
        return window.open("http://192.168.2.92:9101", "_blank")
    }
    setCurrent(e.key);
    history.push(e.key);
  };
  const handleMenuClick: MenuProps['onClick'] =async (e) => {
    console.log('click', e);
    if(e.key === 'logout'){
      logOut().then();
      history.push("/login")
    }
  };
  return (
    <div className={styles.headerLayout}>
      <div className={styles.leftArea}>
        <img src={logo} alt=""/>
        <span className={styles.title}>遥感大模型一体推理平台</span>
      </div>
      <div className={styles.contentArea}>
        <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuData} />
      </div>
      <div className={styles.rightArea}>
        <Dropdown menu={{ items, onClick: handleMenuClick, }} trigger={['click']}>
          <img onClick={(e) => e.preventDefault()} width={28} src={userIcon} alt=""/>
        </Dropdown>
        <span className={styles.username}>{username}</span>
      </div>
    </div>
  );
}
