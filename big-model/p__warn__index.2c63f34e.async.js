(self.webpackChunk=self.webpackChunk||[]).push([[284],{94321:function(J,x,u){"use strict";u.r(x),u.d(x,{default:function(){return P}});var b=u(25359),C=u.n(b),S=u(57213),p=u.n(S),O=u(49811),M=u.n(O),A=u(54306),$=u.n(A),V=u(93236),D={warnContainer:"warnContainer___yIrIM"},Y=u(84875),Z=u.n(Y),G=u(26686),R=u(20038),B=u(46599),N=u(94080),z=u(15911),j=u(5726),T=u.n(j),L=u(62086);function P(E){var l=[{title:"\u65F6\u95F4",dataIndex:"alarm_time",key:"alarm_time",ellipsis:!0,render:function(m){return T()(m).format("YYYY-MM-DD HH:MM:ss:ms")}},{title:"\u5185\u5BB9",dataIndex:"alarm_content",key:"alarm content"},{title:"\u7EA7\u522B",dataIndex:"alarm_level",key:"alarm content"},{title:"\u5904\u7406\u63AA\u65BD",dataIndex:"alarm_measures",key:"alarm_measures"}],o=(0,z.x)({start_time:-1,end_time:-1}),W=$()(o,2),k=W[0],a=W[1],e=(0,z.x)({current:1,pageSize:10,total:0}),t=$()(e,2),r=t[0],n=t[1],i=function(m,g,w){console.log("Various parameters",m,g,w)},s=(0,B.useQuery)(["getWarnData"],M()(C()().mark(function h(){var m,g;return C()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return m=p()({},k),y.next=3,(0,N.d)(m);case 3:return g=y.sent,g.success&&n(function(I){I.total=g.data.total}),y.abrupt("return",g.data.list);case 6:case"end":return y.stop()}},h)}))),c=s.isLoading,f=s.isError,d=s.data;return c?(0,L.jsx)(G.Z,{size:"large",className:Z()("center_X_Y_transform")}):(0,L.jsxs)("div",{className:Z()(D.warnContainer,"boxShadow"),children:[(0,L.jsx)("div",{className:D.tableHeader}),(0,L.jsx)(R.Z,{columns:l,dataSource:d,pagination:r,onChange:i})]})}},94080:function(J,x,u){"use strict";u.d(x,{d:function(){return p}});var b=u(15367),C=window,S=C.global_config;function p(O){return S.localData?new Promise(function(M){setTimeout(function(){M({data:{list:[{alarm_time:"2023-09-24T02:00:00Z",alarm_content:"\u6A21\u578B1\u5F02\u5E38"},{alarm_time:"2023-09-24T02:00:00Z",alarm_content:"\u96C6\u7FA4CPU\u8D44\u6E90\u4F7F\u7528\u8FBE\u5230\u4E0A\u9650"}],total:2},success:!0})},100)}):(0,b.Z)("/bigIntelligence/v1/reasoning/alarmInfo",{method:"GET",params:O})}},5726:function(J){(function(x,u){J.exports=u()})(this,function(){"use strict";var x=1e3,u=6e4,b=36e5,C="millisecond",S="second",p="minute",O="hour",M="day",A="week",$="month",V="quarter",D="year",Y="date",Z="Invalid Date",G=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,R=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,B={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(a){var e=["th","st","nd","rd"],t=a%100;return"["+a+(e[(t-20)%10]||e[t]||e[0])+"]"}},N=function(a,e,t){var r=String(a);return!r||r.length>=e?a:""+Array(e+1-r.length).join(t)+a},z={s:N,z:function(a){var e=-a.utcOffset(),t=Math.abs(e),r=Math.floor(t/60),n=t%60;return(e<=0?"+":"-")+N(r,2,"0")+":"+N(n,2,"0")},m:function a(e,t){if(e.date()<t.date())return-a(t,e);var r=12*(t.year()-e.year())+(t.month()-e.month()),n=e.clone().add(r,$),i=t-n<0,s=e.clone().add(r+(i?-1:1),$);return+(-(r+(t-n)/(i?n-s:s-n))||0)},a:function(a){return a<0?Math.ceil(a)||0:Math.floor(a)},p:function(a){return{M:$,y:D,w:A,d:M,D:Y,h:O,m:p,s:S,ms:C,Q:V}[a]||String(a||"").toLowerCase().replace(/s$/,"")},u:function(a){return a===void 0}},j="en",T={};T[j]=B;var L="$isDayjsObject",P=function(a){return a instanceof W||!(!a||!a[L])},E=function a(e,t,r){var n;if(!e)return j;if(typeof e=="string"){var i=e.toLowerCase();T[i]&&(n=i),t&&(T[i]=t,n=i);var s=e.split("-");if(!n&&s.length>1)return a(s[0])}else{var c=e.name;T[c]=e,n=c}return!r&&n&&(j=n),n||!r&&j},l=function(a,e){if(P(a))return a.clone();var t=typeof e=="object"?e:{};return t.date=a,t.args=arguments,new W(t)},o=z;o.l=E,o.i=P,o.w=function(a,e){return l(a,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var W=function(){function a(t){this.$L=E(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[L]=!0}var e=a.prototype;return e.parse=function(t){this.$d=function(r){var n=r.date,i=r.utc;if(n===null)return new Date(NaN);if(o.u(n))return new Date;if(n instanceof Date)return new Date(n);if(typeof n=="string"&&!/Z$/i.test(n)){var s=n.match(G);if(s){var c=s[2]-1||0,f=(s[7]||"0").substring(0,3);return i?new Date(Date.UTC(s[1],c,s[3]||1,s[4]||0,s[5]||0,s[6]||0,f)):new Date(s[1],c,s[3]||1,s[4]||0,s[5]||0,s[6]||0,f)}}return new Date(n)}(t),this.init()},e.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},e.$utils=function(){return o},e.isValid=function(){return this.$d.toString()!==Z},e.isSame=function(t,r){var n=l(t);return this.startOf(r)<=n&&n<=this.endOf(r)},e.isAfter=function(t,r){return l(t)<this.startOf(r)},e.isBefore=function(t,r){return this.endOf(r)<l(t)},e.$g=function(t,r,n){return o.u(t)?this[r]:this.set(n,t)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(t,r){var n=this,i=!!o.u(r)||r,s=o.p(t),c=function(I,v){var H=o.w(n.$u?Date.UTC(n.$y,v,I):new Date(n.$y,v,I),n);return i?H:H.endOf(M)},f=function(I,v){return o.w(n.toDate()[I].apply(n.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(v)),n)},d=this.$W,h=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(s){case D:return i?c(1,0):c(31,11);case $:return i?c(1,h):c(0,h+1);case A:var w=this.$locale().weekStart||0,y=(d<w?d+7:d)-w;return c(i?m-y:m+(6-y),h);case M:case Y:return f(g+"Hours",0);case O:return f(g+"Minutes",1);case p:return f(g+"Seconds",2);case S:return f(g+"Milliseconds",3);default:return this.clone()}},e.endOf=function(t){return this.startOf(t,!1)},e.$set=function(t,r){var n,i=o.p(t),s="set"+(this.$u?"UTC":""),c=(n={},n[M]=s+"Date",n[Y]=s+"Date",n[$]=s+"Month",n[D]=s+"FullYear",n[O]=s+"Hours",n[p]=s+"Minutes",n[S]=s+"Seconds",n[C]=s+"Milliseconds",n)[i],f=i===M?this.$D+(r-this.$W):r;if(i===$||i===D){var d=this.clone().set(Y,1);d.$d[c](f),d.init(),this.$d=d.set(Y,Math.min(this.$D,d.daysInMonth())).$d}else c&&this.$d[c](f);return this.init(),this},e.set=function(t,r){return this.clone().$set(t,r)},e.get=function(t){return this[o.p(t)]()},e.add=function(t,r){var n,i=this;t=Number(t);var s=o.p(r),c=function(h){var m=l(i);return o.w(m.date(m.date()+Math.round(h*t)),i)};if(s===$)return this.set($,this.$M+t);if(s===D)return this.set(D,this.$y+t);if(s===M)return c(1);if(s===A)return c(7);var f=(n={},n[p]=u,n[O]=b,n[S]=x,n)[s]||1,d=this.$d.getTime()+t*f;return o.w(d,this)},e.subtract=function(t,r){return this.add(-1*t,r)},e.format=function(t){var r=this,n=this.$locale();if(!this.isValid())return n.invalidDate||Z;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=o.z(this),c=this.$H,f=this.$m,d=this.$M,h=n.weekdays,m=n.months,g=n.meridiem,w=function(v,H,U,F){return v&&(v[H]||v(r,i))||U[H].slice(0,F)},y=function(v){return o.s(c%12||12,v,"0")},I=g||function(v,H,U){var F=v<12?"AM":"PM";return U?F.toLowerCase():F};return i.replace(R,function(v,H){return H||function(U){switch(U){case"YY":return String(r.$y).slice(-2);case"YYYY":return o.s(r.$y,4,"0");case"M":return d+1;case"MM":return o.s(d+1,2,"0");case"MMM":return w(n.monthsShort,d,m,3);case"MMMM":return w(m,d);case"D":return r.$D;case"DD":return o.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return w(n.weekdaysMin,r.$W,h,2);case"ddd":return w(n.weekdaysShort,r.$W,h,3);case"dddd":return h[r.$W];case"H":return String(c);case"HH":return o.s(c,2,"0");case"h":return y(1);case"hh":return y(2);case"a":return I(c,f,!0);case"A":return I(c,f,!1);case"m":return String(f);case"mm":return o.s(f,2,"0");case"s":return String(r.$s);case"ss":return o.s(r.$s,2,"0");case"SSS":return o.s(r.$ms,3,"0");case"Z":return s}return null}(v)||s.replace(":","")})},e.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},e.diff=function(t,r,n){var i,s=this,c=o.p(r),f=l(t),d=(f.utcOffset()-this.utcOffset())*u,h=this-f,m=function(){return o.m(s,f)};switch(c){case D:i=m()/12;break;case $:i=m();break;case V:i=m()/3;break;case A:i=(h-d)/6048e5;break;case M:i=(h-d)/864e5;break;case O:i=h/b;break;case p:i=h/u;break;case S:i=h/x;break;default:i=h}return n?i:o.a(i)},e.daysInMonth=function(){return this.endOf($).$D},e.$locale=function(){return T[this.$L]},e.locale=function(t,r){if(!t)return this.$L;var n=this.clone(),i=E(t,r,!0);return i&&(n.$L=i),n},e.clone=function(){return o.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},a}(),k=W.prototype;return l.prototype=k,[["$ms",C],["$s",S],["$m",p],["$H",O],["$W",M],["$M",$],["$y",D],["$D",Y]].forEach(function(a){k[a[1]]=function(e){return this.$g(e,a[0],a[1])}}),l.extend=function(a,e){return a.$i||(a(e,W,l),a.$i=!0),l},l.locale=E,l.isDayjs=P,l.unix=function(a){return l(1e3*a)},l.en=T[j],l.Ls=T,l.p={},l})}}]);
