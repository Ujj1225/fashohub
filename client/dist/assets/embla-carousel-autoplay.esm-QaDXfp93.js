import{p as Ne,r as N,j as q,g as le,n as Ue,o as ye}from"./index-Dn45rCbr.js";import{c as Ke}from"./create-safe-context-91HhculZ.js";import{f as Pe,u as ze,B as Ve,i as $e,j as me,I as We,a as Je,k as Xe,c as Ye}from"./Skeleton-9Y7E4ClX.js";import{U as xe}from"./UnstyledButton-BWqOA1Vn.js";function Ze(e,n){return e in n.breakpoints?Ne(n.breakpoints[e]):Ne(e)}function Qe(e,n){const a=e.map(r=>({value:r,px:Ze(r,n)}));return a.sort((r,i)=>r.px-i.px),a}function De(e){return typeof e=="object"&&e!==null?"base"in e?e.base:void 0:e}function en(e,n,a){return a===void 0?Math.max(e,n):Math.min(Math.max(e,n),a)}const nn=N.createContext({dir:"ltr",toggleDirection:()=>{},setDirection:()=>{}});function rn(){return N.useContext(nn)}function we({style:e,size:n=16,...a}){return q.jsx("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{...e,width:le(n),height:le(n),display:"block"},...a,children:q.jsx("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}we.displayName="@mantine/core/AccordionChevron";function tn(e,n,a,r,i){return r+(i-r)*((e-n)/(a-n))}function be(e){return typeof e=="number"}function Le(e){return typeof e=="string"}function Ee(e){return Object.prototype.toString.call(e)==="[object Object]"}function an(e){return Array.isArray(e)}function Be(e){return Ee(e)||an(e)}function L(e){return Math.abs(e)}function Ae(e){return e?e/L(e):0}function ce(e,n){return L(e-n)}function on(e,n){if(e===0||n===0||L(e)<=L(n))return 0;var a=ce(L(e),L(n));return L(a/e)}function sn(e){var n=Math.pow(10,e);return function(a){return Math.round(a*n)/n}}function fe(e){return oe(e).map(Number)}function ee(e){return e[he(e)]}function he(e){return Math.max(0,e.length-1)}function oe(e){return Object.keys(e)}function Re(e,n){return[e,n].reduce(function(a,r){return oe(r).forEach(function(i){var s=a[i],o=r[i],l=Ee(s)&&Ee(o);a[i]=l?Re(s,o):o}),a},{})}function _e(e,n){var a=oe(e),r=oe(n);return a.length!==r.length?!1:a.every(function(i){var s=e[i],o=n[i];return typeof s=="function"?"".concat(s)==="".concat(o):!Be(s)||!Be(o)?s===o:_e(s,o)})}function un(e,n){var a={start:r,center:i,end:s};function r(){return 0}function i(u){return s(u)/2}function s(u){return n-u}function o(){return n*Number(e)}function l(u){return be(e)?o():a[e](u)}var f={measure:l};return f}function cn(e){var n=0;function a(o,l){return function(){o===!!n&&l()}}function r(){n=window.requestAnimationFrame(e)}function i(){window.cancelAnimationFrame(n),n=0}var s={proceed:a(!0,r),start:a(!1,r),stop:a(!0,i)};return s}function ln(e,n){var a=e==="y"?"y":"x",r=e==="y"?"x":"y",i=l(),s=f();function o(c){var t=c.width,d=c.height;return a==="x"?t:d}function l(){return a==="y"?"top":n==="rtl"?"right":"left"}function f(){return a==="y"?"bottom":n==="rtl"?"left":"right"}var u={scroll:a,cross:r,startEdge:i,endEdge:s,measureSize:o};return u}function se(e,n){var a=L(e-n);function r(u){return u<e}function i(u){return u>n}function s(u){return r(u)||i(u)}function o(u){return s(u)?r(u)?e:n:u}function l(u){return a?u-a*Math.ceil((u-n)/a):u}var f={length:a,max:n,min:e,constrain:o,reachedAny:s,reachedMax:i,reachedMin:r,removeOffset:l};return f}function Fe(e,n,a){var r=se(0,e),i=r.min,s=r.constrain,o=e+1,l=f(n);function f(v){return a?L((o+v)%o):s(v)}function u(){return l}function c(v){return l=f(v),p}function t(v){return c(u()+v)}function d(){return Fe(e,u(),a)}var p={add:t,clone:d,get:u,set:c,min:i,max:e};return p}function fn(e){var n=e==="rtl"?-1:1;function a(i){return i*n}var r={apply:a};return r}function ge(){var e=[];function n(i,s,o,l){return l===void 0&&(l={passive:!0}),i.addEventListener(s,o,l),e.push(function(){return i.removeEventListener(s,o,l)}),r}function a(){return e=e.filter(function(i){return i()}),r}var r={add:n,removeAll:a};return r}function te(e){var n=e;function a(){return n}function r(t){return n=u(t),c}function i(t){return n+=u(t),c}function s(t){return n-=u(t),c}function o(t){return n*=t,c}function l(t){return n/=t,c}function f(){return n!==0&&l(n),c}function u(t){return be(t)?t:t.get()}var c={add:i,divide:l,get:a,multiply:o,normalize:f,set:r,subtract:s};return c}function dn(e,n,a,r,i,s,o,l,f,u,c,t,d,p,v,m){var y=e.cross,g=["INPUT","SELECT","TEXTAREA"],h={passive:!1},b=te(0),S=ge(),E=ge(),C=d.measure(20),I={mouse:300,touch:400},O={mouse:500,touch:600},j=v?5:16,G=1,_=0,W=0,$=!1,K=!1,z=!1,B=!1;function Y(){var x=a;S.add(x,"dragstart",function(D){return D.preventDefault()},h).add(x,"touchmove",function(){},h).add(x,"touchend",function(){}).add(x,"touchstart",re).add(x,"mousedown",re).add(x,"touchcancel",k).add(x,"contextmenu",k).add(x,"click",V,!0)}function P(){var x=B?document:a;E.add(x,"touchmove",X,h).add(x,"touchend",k).add(x,"mousemove",X,h).add(x,"mouseup",k)}function F(){S.removeAll(),E.removeAll()}function J(x){var D=x.nodeName||"";return g.indexOf(D)>-1}function ne(){var x=v?O:I,D=B?"mouse":"touch";return x[D]}function ie(x,D){var U=c.clone().add(Ae(x)*-1),T=U.get()===c.min||U.get()===c.max,H=u.byDistance(x,!v).distance;return v||L(x)<C?H:!p&&T?H*.4:m&&D?H*.5:u.byIndex(U.get(),0).distance}function re(x){if(B=!i.isTouchEvent(x),!(B&&x.button!==0)&&!J(x.target)){var D=ce(r.get(),s.get())>=2,U=B||!D;$=!0,i.pointerDown(x),b.set(r),r.set(s),f.useBaseMass().useSpeed(80),P(),_=i.readPoint(x),W=i.readPoint(x,y),t.emit("pointerDown"),U&&(z=!1)}}function X(x){if(!K&&!B){if(!x.cancelable)return k(x);var D=i.readPoint(x),U=i.readPoint(x,y),T=ce(D,_),H=ce(U,W);if(K=T>H,!K&&!z)return k(x)}var Z=i.pointerMove(x);!z&&Z&&(z=!0),o.start(),r.add(n.apply(Z)),x.preventDefault()}function k(x){var D=u.byDistance(0,!1),U=D.index!==c.get(),T=i.pointerUp(x)*ne(),H=ie(n.apply(T),U),Z=on(T,H),de=ce(r.get(),b.get())>=.5,ue=U&&Z>.75,Se=L(T)<C,ve=ue?10:j,pe=ue?G+2.5*Z:G;de&&!B&&(z=!0),K=!1,$=!1,E.removeAll(),f.useSpeed(Se?9:ve).useMass(pe),l.distance(H,!v),B=!1,t.emit("pointerUp")}function V(x){z&&(x.stopPropagation(),x.preventDefault())}function A(){return!z}function M(){return $}var w={addActivationEvents:Y,clickAllowed:A,pointerDown:M,removeAllEvents:F};return w}function vn(e){var n=170,a,r;function i(t){return typeof TouchEvent<"u"&&t instanceof TouchEvent}function s(t){return t.timeStamp}function o(t,d){var p=d||e.scroll,v="client".concat(p==="x"?"X":"Y");return(i(t)?t.touches[0]:t)[v]}function l(t){return a=t,r=t,o(t)}function f(t){var d=o(t)-o(r),p=s(t)-s(a)>n;return r=t,p&&(a=t),d}function u(t){if(!a||!r)return 0;var d=o(r)-o(a),p=s(t)-s(a),v=s(t)-s(r)>n,m=d/p,y=p&&!v&&L(m)>.1;return y?m:0}var c={isTouchEvent:i,pointerDown:l,pointerMove:f,pointerUp:u,readPoint:o};return c}function pn(e){function n(r){return e*(r/100)}var a={measure:n};return a}function mn(e,n,a){var r=sn(2),i=te(0),s=te(0),o=te(0),l=0,f=n,u=a;function c(){i.add(s),e.add(i),s.multiply(0)}function t(S){S.divide(u),s.add(S)}function d(S){o.set(S).subtract(e);var E=tn(o.get(),0,100,0,f);return l=Ae(o.get()),o.normalize().multiply(E).subtract(i),t(o),b}function p(S){var E=S.get()-e.get(),C=!r(E);return C&&e.set(S),C}function v(){return l}function m(){return g(n)}function y(){return h(a)}function g(S){return f=S,b}function h(S){return u=S,b}var b={direction:v,seek:d,settle:p,update:c,useBaseMass:y,useBaseSpeed:m,useMass:h,useSpeed:g};return b}function gn(e,n,a,r,i){var s=i.measure(10),o=i.measure(50),l=.85,f=!1;function u(){return!(f||!e.reachedAny(a.get())||!e.reachedAny(n.get()))}function c(p){if(u()){var v=e.reachedMin(n.get())?"min":"max",m=L(e[v]-n.get()),y=a.get()-n.get(),g=Math.min(m/o,l);a.subtract(y*g),!p&&L(y)<s&&(a.set(e.constrain(a.get())),r.useSpeed(10).useMass(3))}}function t(p){f=!p}var d={constrain:c,toggleActive:t};return d}function hn(e,n,a,r){var i=se(-n+e,a[0]),s=a.map(i.constrain),o=f();function l(){var c=s[0],t=ee(s),d=s.lastIndexOf(c),p=s.indexOf(t)+1;return se(d,p)}function f(){if(n<=e)return[i.max];if(r==="keepSnaps")return s;var c=l(),t=c.min,d=c.max;return s.slice(t,d)}var u={snapsContained:o};return u}function Sn(e,n,a){var r=i();function i(){var o=n[0],l=ee(n),f=a?o-e:l,u=o;return se(f,u)}var s={limit:r};return s}function yn(e,n,a,r){var i=.1,s=n.min+i,o=n.max+i,l=se(s,o),f=l.reachedMin,u=l.reachedMax;function c(p){return p===1?u(a.get()):p===-1?f(a.get()):!1}function t(p){if(c(p)){var v=e*(p*-1);r.forEach(function(m){return m.add(v)})}}var d={loop:t};return d}function xn(e){var n=e.max,a=e.length;function r(s){var o=s-n;return o/-a}var i={get:r};return i}function wn(e,n,a,r,i,s,o){var l=e.startEdge,f=e.endEdge,u=s.groupSlides,c=p().map(n.measure),t=v(),d=m();function p(){return u(r).map(function(g){return ee(g)[f]-g[0][l]}).map(L)}function v(){return r.map(function(g){return a[l]-g[l]}).map(function(g){return-L(g)})}function m(){var g=0,h=ee(t)-ee(i);return u(t).map(function(b){return b[0]}).map(function(b,S,E){var C=!S,I=S===he(E);return o&&C?g:o&&I?h:b+c[S]})}var y={snaps:t,snapsAligned:d};return y}function En(e,n,a,r,i){var s=r.reachedAny,o=r.removeOffset,l=r.constrain;function f(v){return v.concat().sort(function(m,y){return L(m)-L(y)})[0]}function u(v){var m=e?o(v):l(v),y=n.map(function(h){return h-m}).map(function(h){return c(h,0)}).map(function(h,b){return{diff:h,index:b}}).sort(function(h,b){return L(h.diff)-L(b.diff)}),g=y[0].index;return{index:g,distance:m}}function c(v,m){var y=[v,v+a,v-a];if(!e)return y[0];if(!m)return f(y);var g=y.filter(function(h){return Ae(h)===m});return f(g)}function t(v,m){var y=n[v]-i.get(),g=c(y,m);return{index:v,distance:g}}function d(v,m){var y=i.get()+v,g=u(y),h=g.index,b=g.distance,S=!e&&s(y);if(!m||S)return{index:h,distance:v};var E=n[h]-b,C=v+c(E,0);return{index:h,distance:C}}var p={byDistance:d,byIndex:t,shortcut:c};return p}function bn(e,n,a,r,i,s){function o(c){var t=c.distance,d=c.index!==n.get();t&&(e.start(),i.add(t)),d&&(a.set(n.get()),n.set(c.index),s.emit("select"))}function l(c,t){var d=r.byDistance(c,t);o(d)}function f(c,t){var d=n.clone().set(c),p=r.byIndex(d.get(),t);o(p)}var u={distance:l,index:f};return u}function He(e,n,a){var r=e.scroll==="x"?o:l,i=a.style,s=!1;function o(d){return"translate3d(".concat(d,"px,0px,0px)")}function l(d){return"translate3d(0px,".concat(d,"px,0px)")}function f(d){s||(i.transform=r(n.apply(d.get())))}function u(d){s=!d}function c(){s||(i.transform="",a.getAttribute("style")||a.removeAttribute("style"))}var t={clear:c,to:f,toggleActive:u};return t}function An(e,n,a,r,i,s,o,l,f){var u=fe(i),c=fe(i).reverse(),t=m().concat(y());function d(E,C){return E.reduce(function(I,O){return I-i[O]},C)}function p(E,C){return E.reduce(function(I,O){var j=d(I,C);return j>0?I.concat([O]):I},[])}function v(E,C){var I=C==="start",O=I?-r:r,j=o.findSlideBounds([O]);return E.map(function(G){var _=I?0:-r,W=I?r:0,$=j.filter(function(F){return F.index===G})[0],K=$[I?"end":"start"],z=te(-1),B=te(-1),Y=He(e,n,f[G]),P=function(){return z.set(l.get()>K?_:W)};return{index:G,location:B,translate:Y,target:P}})}function m(){var E=s[0]-1,C=p(c,E);return v(C,"end")}function y(){var E=a-s[0]-1,C=p(u,E);return v(C,"start")}function g(){return t.every(function(E){var C=E.index,I=u.filter(function(O){return O!==C});return d(I,a)<=.1})}function h(){t.forEach(function(E){var C=E.target,I=E.translate,O=E.location,j=C();j.get()!==O.get()&&(j.get()===0?I.clear():I.to(j),O.set(j))})}function b(){t.forEach(function(E){return E.translate.clear()})}var S={canLoop:g,clear:b,loop:h,loopPoints:t};return S}function Cn(e,n,a,r,i,s,o){var l=i.removeOffset,f=i.constrain,u=.5,c=s?[0,n,-n]:[0],t=p(c,o);function d(y){var g=y||0;return a.map(function(h){var b=se(u,h-u);return b.constrain(h*g)})}function p(y,g){var h=y||c,b=d(g);return h.reduce(function(S,E){var C=r.map(function(I,O){return{start:I-a[O]+b[O]+E,end:I+e-b[O]+E,index:O}});return S.concat(C)},[])}function v(y,g){var h=s?l(y):f(y),b=g||t;return b.reduce(function(S,E){var C=E.index,I=E.start,O=E.end,j=S.indexOf(C)!==-1,G=I<h&&O>h;return!j&&G?S.concat([C]):S},[])}var m={check:v,findSlideBounds:p};return m}function In(e,n,a,r,i){var s=e.measureSize,o=e.startEdge,l=e.endEdge,f=a[0]&&i,u=p(),c=v(),t=a.map(s),d=m();function p(){if(!f)return 0;var g=a[0];return L(n[o]-g[o])}function v(){if(!f)return 0;var g=window.getComputedStyle(ee(r));return parseFloat(g.getPropertyValue("margin-".concat(l)))}function m(){return a.map(function(g,h,b){var S=!h,E=h===he(b);return S?t[h]+u:E?t[h]+c:b[h+1][o]-g[o]}).map(L)}var y={slideSizes:t,slideSizesWithGaps:d};return y}function Mn(e,n,a){var r=be(a);function i(f,u){return fe(f).filter(function(c){return c%u===0}).map(function(c){return f.slice(c,c+u)})}function s(f){return fe(f).reduce(function(u,c){var t=n.slice(ee(u),c+1),d=t.reduce(function(p,v){return p+v},0);return!c||d>e?u.concat(c):u},[]).map(function(u,c,t){return f.slice(u,t[c+1])})}function o(f){return r?i(f,a):s(f)}var l={groupSlides:o};return l}function On(e,n,a,r,i){var s=r.align,o=r.axis,l=r.direction,f=r.startIndex,u=r.inViewThreshold,c=r.loop,t=r.speed,d=r.dragFree,p=r.slidesToScroll,v=r.skipSnaps,m=r.containScroll,y=n.getBoundingClientRect(),g=a.map(function(H){return H.getBoundingClientRect()}),h=fn(l),b=ln(o,l),S=b.measureSize(y),E=pn(S),C=un(s,S),I=!c&&m!=="",O=c||m!=="",j=In(b,y,g,a,O),G=j.slideSizes,_=j.slideSizesWithGaps,W=Mn(S,_,p),$=wn(b,C,y,g,_,W,I),K=$.snaps,z=$.snapsAligned,B=-ee(K)+ee(_),Y=hn(S,B,z,m).snapsContained,P=I?Y:z,F=Sn(B,P,c).limit,J=Fe(he(P),f,c),ne=J.clone(),ie=fe(a),re=function(){c||T.scrollBounds.constrain(T.dragHandler.pointerDown()),T.scrollBody.seek(A).update();var H=T.scrollBody.settle(A);H&&!T.dragHandler.pointerDown()&&(T.animation.stop(),i.emit("settle")),H||i.emit("scroll"),c&&(T.scrollLooper.loop(T.scrollBody.direction()),T.slideLooper.loop()),T.translate.to(V),T.animation.proceed()},X=cn(re),k=P[J.get()],V=te(k),A=te(k),M=mn(V,t,1),w=En(c,P,B,F,A),x=bn(X,J,ne,w,A,i),D=Cn(S,B,G,K,F,c,u),U=dn(b,h,e,A,vn(b),V,X,x,M,w,J,i,E,c,d,v),T={containerRect:y,slideRects:g,animation:X,axis:b,direction:h,dragHandler:U,eventStore:ge(),percentOfView:E,index:J,indexPrevious:ne,limit:F,location:V,options:r,scrollBody:M,scrollBounds:gn(F,V,A,M,E),scrollLooper:yn(B,F,V,[V,A]),scrollProgress:xn(F),scrollSnaps:P,scrollTarget:w,scrollTo:x,slideLooper:An(b,h,S,B,_,P,D,V,a),slidesToScroll:W,slidesInView:D,slideIndexes:ie,target:A,translate:He(b,h,n)};return T}function Tn(){var e={};function n(o){return e[o]||[]}function a(o){return n(o).forEach(function(l){return l(o)}),s}function r(o,l){return e[o]=n(o).concat([l]),s}function i(o,l){return e[o]=n(o).filter(function(f){return f!==l}),s}var s={emit:a,off:i,on:r};return s}var Nn={align:"center",axis:"x",container:null,slides:null,containScroll:"",direction:"ltr",slidesToScroll:1,breakpoints:{},dragFree:!1,draggable:!0,inViewThreshold:0,loop:!1,skipSnaps:!1,speed:10,startIndex:0,active:!0};function Ce(){function e(i,s){return Re(i,s||{})}function n(i,s){var o=JSON.stringify(oe(i.breakpoints||{})),l=JSON.stringify(oe(s.breakpoints||{}));return o!==l?!1:_e(i,s)}function a(i){var s=i.breakpoints||{},o=oe(s).filter(function(l){return window.matchMedia(l).matches}).map(function(l){return s[l]}).reduce(function(l,f){return e(l,f)},{});return e(i,o)}var r={merge:e,areEqual:n,atMedia:a};return r}function Dn(){var e=Ce(),n=e.atMedia,a=e.areEqual,r=[],i=[];function s(){return i.some(function(c){return c()})}function o(c){var t=n(c.options);return function(){return!a(t,n(c.options))}}function l(c,t){return i=c.map(o),r=c.filter(function(d){return n(d.options).active}),r.forEach(function(d){return d.init(t)}),c.reduce(function(d,p){var v;return Object.assign(d,(v={},v[p.name]=p,v))},{})}function f(){r=r.filter(function(c){return c.destroy()})}var u={init:l,destroy:f,haveChanged:s};return u}function ae(e,n,a){var r=ge(),i=Ce(),s=Dn(),o=Tn(),l=o.on,f=o.off,u=E,c=!1,t,d=i.merge(Nn,ae.globalOptions),p=i.merge(d),v=[],m,y=0,g,h;function b(){var A=p.container,M=p.slides,w=Le(A)?e.querySelector(A):A;g=w||e.children[0];var x=Le(M)?g.querySelectorAll(M):M;h=[].slice.call(x||g.children)}function S(A,M){if(!c){if(d=i.merge(d,A),p=i.atMedia(d),b(),t=On(e,g,h,p,o),y=t.axis.measureSize(e.getBoundingClientRect()),!p.active)return C();if(t.translate.to(t.location),v=M||v,m=s.init(v,V),p.loop){if(!t.slideLooper.canLoop()){C(),S({loop:!1},M),d=i.merge(d,{loop:!0});return}t.slideLooper.loop()}p.draggable&&g.offsetParent&&h.length&&t.dragHandler.addActivationEvents()}}function E(A,M){var w=P();C(),S(i.merge({startIndex:w},A),M),o.emit("reInit")}function C(){t.dragHandler.removeAllEvents(),t.animation.stop(),t.eventStore.removeAll(),t.translate.clear(),t.slideLooper.clear(),s.destroy()}function I(){c||(c=!0,r.removeAll(),C(),o.emit("destroy"))}function O(){var A=i.atMedia(d),M=!i.areEqual(A,p),w=t.axis.measureSize(e.getBoundingClientRect()),x=y!==w,D=s.haveChanged();(x||M||D)&&E(),o.emit("resize")}function j(A){var M=t[A?"target":"location"].get(),w=p.loop?"removeOffset":"constrain";return t.slidesInView.check(t.limit[w](M))}function G(A){var M=j(A);return t.slideIndexes.filter(function(w){return M.indexOf(w)===-1})}function _(A,M,w){!p.active||c||(t.scrollBody.useBaseMass().useSpeed(M?100:p.speed),t.scrollTo.index(A,w||0))}function W(A){var M=t.index.clone().add(1);_(M.get(),A===!0,-1)}function $(A){var M=t.index.clone().add(-1);_(M.get(),A===!0,1)}function K(){var A=t.index.clone().add(1);return A.get()!==P()}function z(){var A=t.index.clone().add(-1);return A.get()!==P()}function B(){return t.scrollSnaps.map(t.scrollProgress.get)}function Y(){return t.scrollProgress.get(t.location.get())}function P(){return t.index.get()}function F(){return t.indexPrevious.get()}function J(){return t.dragHandler.clickAllowed()}function ne(){return m}function ie(){return t}function re(){return e}function X(){return g}function k(){return h}var V={canScrollNext:K,canScrollPrev:z,clickAllowed:J,containerNode:X,internalEngine:ie,destroy:I,off:f,on:l,plugins:ne,previousScrollSnap:F,reInit:u,rootNode:re,scrollNext:W,scrollPrev:$,scrollProgress:Y,scrollSnapList:B,scrollTo:_,selectedScrollSnap:P,slideNodes:k,slidesInView:j,slidesNotInView:G};return S(n,a),r.add(window,"resize",O),setTimeout(function(){return o.emit("init")},0),V}ae.globalOptions=void 0;ae.optionsHandler=Ce;function Ln(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function ke(e){return e.concat().sort(function(n,a){return n.name>a.name?1:-1}).map(function(n){return n.options})}function Bn(e,n){if(e.length!==n.length)return!1;var a=ae.optionsHandler().areEqual,r=ke(e),i=ke(n);return r.every(function(s,o){var l=i[o];return a(s,l)})}function Ie(e,n){e===void 0&&(e={}),n===void 0&&(n=[]);var a=N.useRef(ae.optionsHandler()),r=N.useRef(e),i=N.useRef(n),s=N.useState(),o=s[0],l=s[1],f=N.useState(),u=f[0],c=f[1],t=N.useCallback(function(){o&&o.reInit(r.current,i.current)},[o]);return N.useEffect(function(){if(Ln()&&u){ae.globalOptions=Ie.globalOptions;var d=ae(u,r.current,i.current);return l(d),function(){return d.destroy()}}else l(void 0)},[u,l]),N.useEffect(function(){a.current.areEqual(r.current,e)||(r.current=e,t())},[e,t]),N.useEffect(function(){Bn(i.current,n)||(i.current=n,t())},[n,t]),[c,o]}Ie.globalOptions=void 0;const[kn,jn]=Ke("Carousel component was not found in tree");var Me={root:"m_17884d0f",viewport:"m_a2dae653",container:"m_fcd81474",controls:"m_39bc3463",control:"m_64f58e10",indicators:"m_71ea3ab1",indicator:"m_eae68602",slide:"m_d98df724"};const Pn={},Oe=Pe((e,n)=>{const{classNames:a,className:r,style:i,styles:s,vars:o,mod:l,...f}=ze("CarouselSlide",Pn,e),u=jn();return q.jsx(Ve,{ref:n,mod:[{orientation:u.orientation},l],...u.getStyles("slide",{className:r,style:i,classNames:a,styles:s}),...f})});Oe.classes=Me;Oe.displayName="@mantine/carousel/CarouselSlide";function zn({slideGap:e,slideSize:n,selector:a}){const r=Ue(),i=$e({"--carousel-slide-gap":me(De(e)),"--carousel-slide-size":le(De(n))}),s=ye(r.breakpoints).reduce((f,u)=>(f[u]||(f[u]={}),typeof e=="object"&&e[u]!==void 0&&(f[u]["--carousel-slide-gap"]=me(e[u])),typeof n=="object"&&n[u]!==void 0&&(f[u]["--carousel-slide-size"]=me(n[u])),f),{}),l=Qe(ye(s),r).filter(f=>ye(s[f.value]).length>0).map(f=>({query:`(min-width: ${r.breakpoints[f.value]})`,styles:s[f.value]}));return q.jsx(We,{styles:i,media:l,selector:a})}function je({dir:e,orientation:n,direction:a}){return a==="previous"?n==="horizontal"?90*(e==="ltr"?1:-1):-180:n==="horizontal"?90*(e==="ltr"?-1:1):0}const Vn={controlSize:26,controlsOffset:"sm",slideSize:"100%",slideGap:0,orientation:"horizontal",align:"center",slidesToScroll:1,includeGapInSize:!0,draggable:!0,dragFree:!1,loop:!1,speed:10,initialSlide:0,inViewThreshold:0,withControls:!0,withIndicators:!1,skipSnaps:!1,containScroll:"",withKeyboardEvents:!0},Rn=Ye((e,{height:n,controlSize:a,controlsOffset:r})=>({root:{"--carousel-height":le(n),"--carousel-control-size":le(a),"--carousel-controls-offset":me(r)}})),Te=Pe((e,n)=>{const a=ze("Carousel",Vn,e),{classNames:r,className:i,style:s,styles:o,unstyled:l,vars:f,children:u,getEmblaApi:c,onNextSlide:t,onPreviousSlide:d,onSlideChange:p,nextControlProps:v,previousControlProps:m,controlSize:y,controlsOffset:g,slideSize:h,slideGap:b,orientation:S,height:E,align:C,slidesToScroll:I,includeGapInSize:O,draggable:j,dragFree:G,loop:_,speed:W,initialSlide:$,inViewThreshold:K,withControls:z,withIndicators:B,plugins:Y,nextControlIcon:P,previousControlIcon:F,skipSnaps:J,containScroll:ne,withKeyboardEvents:ie,mod:re,...X}=a,k=Je({name:"Carousel",classes:Me,props:a,className:i,style:s,classNames:r,styles:o,unstyled:l,vars:f,varsResolver:Rn}),V=Xe(),{dir:A}=rn(),[M,w]=Ie({axis:S==="horizontal"?"x":"y",direction:S==="horizontal"?A:void 0,startIndex:$,loop:_,align:C,slidesToScroll:I,draggable:j,dragFree:G,speed:W,inViewThreshold:K,skipSnaps:J,containScroll:ne},Y),[x,D]=N.useState(0),[U,T]=N.useState(0),H=N.useCallback(R=>w&&w.scrollTo(R),[w]),Z=N.useCallback(()=>{if(!w)return;const R=w.selectedScrollSnap();D(R),p==null||p(R)},[w,D]),de=N.useCallback(()=>{w==null||w.scrollPrev(),d==null||d()},[w]),ue=N.useCallback(()=>{w==null||w.scrollNext(),t==null||t()},[w]),Se=N.useCallback(R=>{ie&&(R.key==="ArrowRight"&&(R.preventDefault(),ue()),R.key==="ArrowLeft"&&(R.preventDefault(),de()))},[w]);N.useEffect(()=>{if(w)return c==null||c(w),Z(),T(w.scrollSnapList().length),w.on("select",Z),()=>{w.off("select",Z)}},[w,I]),N.useEffect(()=>{w&&(w.reInit(),T(w.scrollSnapList().length),D(R=>en(R,0,N.Children.toArray(u).length-1)))},[N.Children.toArray(u).length,I]);const ve=(w==null?void 0:w.canScrollPrev())||!1,pe=(w==null?void 0:w.canScrollNext())||!1,Ge=Array(U).fill(0).map((R,Q)=>N.createElement(xe,{...k("indicator"),key:Q,"data-active":Q===x||void 0,"aria-hidden":!0,tabIndex:-1,onClick:()=>H(Q),"data-orientation":S}));return q.jsxs(kn,{value:{getStyles:k,orientation:S},children:[q.jsx(zn,{...a,selector:`.${V}`}),q.jsxs(Ve,{ref:n,...k("root",{className:V}),...X,mod:[{orientation:S,"include-gap-in-size":O},re],onKeyDownCapture:Se,children:[q.jsx("div",{...k("viewport"),ref:M,children:q.jsx("div",{...k("container"),"data-orientation":S,children:u})}),B&&q.jsx("div",{...k("indicators"),"data-orientation":S,children:Ge}),z&&q.jsxs("div",{...k("controls"),"data-orientation":S,children:[q.jsx(xe,{...m,...k("control",{className:m==null?void 0:m.className,style:m==null?void 0:m.style}),onClick:R=>{var Q;de(),(Q=m==null?void 0:m.onClick)==null||Q.call(m,R)},"data-inactive":!ve||void 0,tabIndex:ve?0:-1,children:typeof F<"u"?F:q.jsx(we,{style:{transform:`rotate(${je({dir:A,orientation:S,direction:"previous"})}deg)`}})}),q.jsx(xe,{...k("control",{className:v==null?void 0:v.className,style:v==null?void 0:v.style}),...v,onClick:R=>{var Q;ue(),(Q=v==null?void 0:v.onClick)==null||Q.call(v,R)},"data-inactive":!pe||void 0,tabIndex:pe?0:-1,children:typeof P<"u"?P:q.jsx(we,{style:{transform:`rotate(${je({dir:A,orientation:S,direction:"next"})}deg)`}})})]})]})]})});Te.classes=Me;Te.displayName="@mantine/carousel/Carousel";Te.Slide=Oe;var _n={active:!0,breakpoints:{},delay:4e3,jump:!1,playOnInit:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,stopOnLastSnap:!1,rootNode:null};function qe(e){var n=ae.optionsHandler(),a=n.merge(_n,qe.globalOptions),r,i,s,o=0,l=!1;function f(m){i=m,r=n.atMedia(v.options),l=r.jump,s=r.stopOnInteraction?u:t;var y=i.internalEngine().eventStore,g=i.rootNode(),h=r.rootNode&&r.rootNode(g)||g;i.on("pointerDown",s),r.stopOnInteraction||i.on("pointerUp",d),r.stopOnMouseEnter&&(y.add(h,"mouseenter",s),r.stopOnInteraction||y.add(h,"mouseleave",d)),y.add(document,"visibilitychange",function(){if(document.visibilityState==="hidden")return t();d()}),y.add(window,"pagehide",function(b){b.persisted&&t()}),r.playOnInit&&c()}function u(){i.off("pointerDown",s),r.stopOnInteraction||i.off("pointerUp",d),t(),o=0}function c(m){t(),typeof m<"u"&&(l=m),o=window.setTimeout(p,r.delay)}function t(){o&&window.clearTimeout(o)}function d(){o&&(t(),c())}function p(){var m=i.internalEngine().index,y=r.stopOnLastSnap&&m.get()===m.max;if(y)return u();i.canScrollNext()?i.scrollNext(l):i.scrollTo(0,l),c()}var v={name:"autoplay",options:n.merge(a,e),init:f,destroy:u,play:c,stop:t,reset:d};return v}qe.globalOptions=void 0;export{qe as A,Te as C,rn as u};
