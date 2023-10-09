import {getCurrentUser, login} from '@/services'
export async function getInitialState(): Promise<any> {
  if(location.hash === "#/login") return
  const res = await getCurrentUser();
  // login({
  //   "user_name": "admin",
  //   "user_pass": "123456"
  // })
  // const warnTotal = await new Promise(resolve => {
  //   setTimeout(()=>{
  //     resolve(Math.random() > 0.2 ? 10 : 0)
  //   },2000)
  // })
  return {
    //warnTotal,
    username: res.data.user_name,
    userId: 105,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
  };
}
export function render(oldRender) {
  //debugger
  console.log(location)
  oldRender()
}
