import styles from './index.less'
import Logo from '/public/favicon.png'
import classnames from 'classnames'
import {Form, Input, Checkbox} from 'antd'
import {login} from '@/services'
import {history, useModel} from "umi";

export default function HomePage() {
    const {initialState, setInitialState	} = useModel('@@initialState');

    const [form] = Form.useForm();

    async function handleLogin(){
        try {
            const values = await form.validateFields()
            console.log(values)
            const res = await login({
                "user_name": values.username,
                "user_pass": values.password,
            })
            console.log(res)
            if(res.success){
                setInitialState(res.data)
                history.replace("/");
            }
        }catch (e) {
            return false
        }
    }

    return (
    <div className={styles.loginPage}>
        <div className={styles.loginArea}>
            {/*<div className={styles.wrapperLoginLeft}>*/}
            {/*    <div className={classnames('flex_center_X_Y', styles.loginLeft)}>*/}
            {/*        <img src={Logo} alt=""/>*/}
            {/*        <div className={classnames(styles.leftTitle, 'flex_column_center_X_Y')}>*/}
            {/*            <span className={styles.title_zh}>数字人</span>*/}
            {/*            <span className={styles.title_en}>Digital people</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={classnames('flex_center_X_Y', styles.rightArea)}>
                {/*<span className={styles.registerArea}>*/}
                {/*    <span className={styles.registerTips}>你还没有账户？</span>*/}
                {/*    <a>马上注册</a>*/}
                {/*</span>*/}

                <div className={classnames(styles.wrapperLogin, 'flex_column_center_X_Y')}>
                    {/*<span className={styles.loginTitle}>用户登录</span>*/}
                    <Form layout='vertical' form={form}>
                        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input size="large" placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入用户密码' }]}>
                            <Input.Password size="large" placeholder="请输入用户密码" />
                        </Form.Item>
                        <Form.Item name="rememberPassword" valuePropName="checked">
                            <Checkbox >记住密码</Checkbox>
                        </Form.Item>
                    </Form>
                    <span onClick={handleLogin} className={classnames(styles.loginBtn, 'flex_center_X_Y')}>登录</span>
                </div>
            </div>
        </div>
    </div>
  );
}
