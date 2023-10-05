export function wrapPromise (promise: Promise<any>) {
  let status = 'pending';
  let result: any;

  const suspender = promise.then( (resolve) => {
    status = 'success';
    result = resolve;
  }, (err) => {
    status = 'error';
    result = err
  })

  return {
    read(){ // 暴露一个read方法
      if( status === 'pending'){
        throw suspender
      } else if ( status === 'error'){
        throw result
      } else if ( status === 'success'){
        return result
      }
    }
  }
}

export function getSystemType() {

  const sUserAgent = navigator.userAgent;
  const isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  const isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");

  if (isMac) return "MacOS";
  const isUnix = (navigator.platform == "X11") && !isWin && !isMac;

  if (isUnix) return "Unix";

  const isLinux = (String(navigator.platform).indexOf("Linux") > -1);

  if (isLinux) return "Linux";
  if (isWin) {
    const isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Windows2000";
    const isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WindowsXP";
    const isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Windows2003";
    const isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "Windows Vista";
    const isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Windows7";
  }
  return "other";
}

