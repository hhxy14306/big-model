"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[939],{91863:function(Z,o,e){e.r(o),e.d(o,{default:function(){return x}});var v=e(25359),g=e.n(v),f=e(49811),p=e.n(f),j=e(54306),F=e.n(j),s={loginPage:"loginPage___CqEFK",loginArea:"loginArea___WO2YS",wrapperLoginLeft:"wrapperLoginLeft___J1qhw",loginLeft:"loginLeft___w3DTX",leftTitle:"leftTitle___j8gVU",title_zh:"title_zh___SO_Ly",title_en:"title_en___Gkeuq",rightArea:"rightArea___vS_7g",registerArea:"registerArea___RjL3O",registerTips:"registerTips___SBK7C",wrapperLogin:"wrapperLogin___pnCP2",loginTitle:"loginTitle___N1icl",loginBtn:"loginBtn___IRejT"},L=e(84875),t=e.n(L),l=e(81752),d=e(18347),B=e(19045),T=e(16397),m=e(46599),a=e(62086);function x(){var c=(0,m.useModel)("@@initialState"),N=c.initialState,A=c.setInitialState,y=l.Z.useForm(),C=F()(y,1),h=C[0];function S(){return u.apply(this,arguments)}function u(){return u=p()(g()().mark(function P(){var n,i;return g()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,h.validateFields();case 3:return n=r.sent,console.log(n),r.next=7,(0,T.x)({user_name:n.username,user_pass:n.password});case 7:i=r.sent,console.log(i),i.success&&(A(i.data),m.history.replace("/")),r.next=15;break;case 12:return r.prev=12,r.t0=r.catch(0),r.abrupt("return",!1);case 15:case"end":return r.stop()}},P,null,[[0,12]])})),u.apply(this,arguments)}return(0,a.jsx)("div",{className:s.loginPage,children:(0,a.jsx)("div",{className:s.loginArea,children:(0,a.jsx)("div",{className:t()("flex_center_X_Y",s.rightArea),children:(0,a.jsxs)("div",{className:t()(s.wrapperLogin,"flex_column_center_X_Y"),children:[(0,a.jsxs)(l.Z,{layout:"vertical",form:h,children:[(0,a.jsx)(l.Z.Item,{name:"username",label:"\u7528\u6237\u540D",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"}],children:(0,a.jsx)(d.Z,{size:"large",placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"})}),(0,a.jsx)(l.Z.Item,{name:"password",label:"\u5BC6\u7801",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u5BC6\u7801"}],children:(0,a.jsx)(d.Z.Password,{size:"large",placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u5BC6\u7801"})}),(0,a.jsx)(l.Z.Item,{name:"rememberPassword",valuePropName:"checked",children:(0,a.jsx)(B.Z,{children:"\u8BB0\u4F4F\u5BC6\u7801"})})]}),(0,a.jsx)("span",{onClick:S,className:t()(s.loginBtn,"flex_center_X_Y"),children:"\u767B\u5F55"})]})})})})}}}]);
