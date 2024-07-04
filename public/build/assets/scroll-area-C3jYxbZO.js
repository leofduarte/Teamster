import{r as l,j as m,e as ue}from"./app-DA6yD-bg.js";import{S as de}from"./button-Czat_LeM.js";import{c as G}from"./utils-Baa09YAL.js";var fe=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],_=fe.reduce((e,t)=>{const r=l.forwardRef((n,o)=>{const{asChild:c,...s}=n,i=c?de:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),m.jsx(i,{...s,ref:o})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function he(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function me(...e){return t=>e.forEach(r=>he(r,t))}function A(...e){return l.useCallback(me(...e),e)}var B=globalThis!=null&&globalThis.document?l.useLayoutEffect:()=>{};function pe(e,t){return l.useReducer((r,n)=>t[r][n]??r,e)}var L=e=>{const{present:t,children:r}=e,n=Se(t),o=typeof r=="function"?r({present:n.isPresent}):l.Children.only(r),c=A(n.ref,be(o));return typeof r=="function"||n.isPresent?l.cloneElement(o,{ref:c}):null};L.displayName="Presence";function Se(e){const[t,r]=l.useState(),n=l.useRef({}),o=l.useRef(e),c=l.useRef("none"),s=e?"mounted":"unmounted",[i,a]=pe(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return l.useEffect(()=>{const u=I(n.current);c.current=i==="mounted"?u:"none"},[i]),B(()=>{const u=n.current,d=o.current;if(d!==e){const f=c.current,p=I(u);e?a("MOUNT"):p==="none"||(u==null?void 0:u.display)==="none"?a("UNMOUNT"):a(d&&f!==p?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,a]),B(()=>{if(t){const u=h=>{const p=I(n.current).includes(h.animationName);h.target===t&&p&&ue.flushSync(()=>a("ANIMATION_END"))},d=h=>{h.target===t&&(c.current=I(n.current))};return t.addEventListener("animationstart",d),t.addEventListener("animationcancel",u),t.addEventListener("animationend",u),()=>{t.removeEventListener("animationstart",d),t.removeEventListener("animationcancel",u),t.removeEventListener("animationend",u)}}else a("ANIMATION_END")},[t,a]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:l.useCallback(u=>{u&&(n.current=getComputedStyle(u)),r(u)},[])}}function I(e){return(e==null?void 0:e.animationName)||"none"}function be(e){var n,o;let t=(n=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:n.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,r=t&&"isReactWarning"in t&&t.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}function ve(e,t=[]){let r=[];function n(c,s){const i=l.createContext(s),a=r.length;r=[...r,s];function u(h){const{scope:f,children:p,...S}=h,x=(f==null?void 0:f[e][a])||i,y=l.useMemo(()=>S,Object.values(S));return m.jsx(x.Provider,{value:y,children:p})}function d(h,f){const p=(f==null?void 0:f[e][a])||i,S=l.useContext(p);if(S)return S;if(s!==void 0)return s;throw new Error(`\`${h}\` must be used within \`${c}\``)}return u.displayName=c+"Provider",[u,d]}const o=()=>{const c=r.map(s=>l.createContext(s));return function(i){const a=(i==null?void 0:i[e])||c;return l.useMemo(()=>({[`__scope${e}`]:{...i,[e]:a}}),[i,a])}};return o.scopeName=e,[n,we(o,...t)]}function we(...e){const t=e[0];if(e.length===1)return t;const r=()=>{const n=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(c){const s=n.reduce((i,{useScope:a,scopeName:u})=>{const h=a(c)[`__scope${u}`];return{...i,...h}},{});return l.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return r.scopeName=t.scopeName,r}function C(e){const t=l.useRef(e);return l.useEffect(()=>{t.current=e}),l.useMemo(()=>(...r)=>{var n;return(n=t.current)==null?void 0:n.call(t,...r)},[])}var ge=l.createContext(void 0);function xe(e){const t=l.useContext(ge);return e||t||"ltr"}function Pe(e,[t,r]){return Math.min(r,Math.max(t,e))}function R(e,t,{checkForDefaultPrevented:r=!0}={}){return function(o){if(e==null||e(o),r===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function Ce(e,t){return l.useReducer((r,n)=>t[r][n]??r,e)}var V="ScrollArea",[J,Xe]=ve(V),[Re,v]=J(V),K=l.forwardRef((e,t)=>{const{__scopeScrollArea:r,type:n="hover",dir:o,scrollHideDelay:c=600,...s}=e,[i,a]=l.useState(null),[u,d]=l.useState(null),[h,f]=l.useState(null),[p,S]=l.useState(null),[x,y]=l.useState(null),[P,D]=l.useState(0),[Y,O]=l.useState(0),[j,N]=l.useState(!1),[M,W]=l.useState(!1),b=A(t,E=>a(E)),w=xe(o);return m.jsx(Re,{scope:r,type:n,dir:w,scrollHideDelay:c,scrollArea:i,viewport:u,onViewportChange:d,content:h,onContentChange:f,scrollbarX:p,onScrollbarXChange:S,scrollbarXEnabled:j,onScrollbarXEnabledChange:N,scrollbarY:x,onScrollbarYChange:y,scrollbarYEnabled:M,onScrollbarYEnabledChange:W,onCornerWidthChange:D,onCornerHeightChange:O,children:m.jsx(_.div,{dir:w,...s,ref:b,style:{position:"relative","--radix-scroll-area-corner-width":P+"px","--radix-scroll-area-corner-height":Y+"px",...e.style}})})});K.displayName=V;var Q="ScrollAreaViewport",Z=l.forwardRef((e,t)=>{const{__scopeScrollArea:r,children:n,nonce:o,...c}=e,s=v(Q,r),i=l.useRef(null),a=A(t,i,s.onViewportChange);return m.jsxs(m.Fragment,{children:[m.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"},nonce:o}),m.jsx(_.div,{"data-radix-scroll-area-viewport":"",...c,ref:a,style:{overflowX:s.scrollbarXEnabled?"scroll":"hidden",overflowY:s.scrollbarYEnabled?"scroll":"hidden",...e.style},children:m.jsx("div",{ref:s.onContentChange,style:{minWidth:"100%",display:"table"},children:n})})]})});Z.displayName=Q;var g="ScrollAreaScrollbar",k=l.forwardRef((e,t)=>{const{forceMount:r,...n}=e,o=v(g,e.__scopeScrollArea),{onScrollbarXEnabledChange:c,onScrollbarYEnabledChange:s}=o,i=e.orientation==="horizontal";return l.useEffect(()=>(i?c(!0):s(!0),()=>{i?c(!1):s(!1)}),[i,c,s]),o.type==="hover"?m.jsx(Ae,{...n,ref:t,forceMount:r}):o.type==="scroll"?m.jsx(Ee,{...n,ref:t,forceMount:r}):o.type==="auto"?m.jsx(ee,{...n,ref:t,forceMount:r}):o.type==="always"?m.jsx(F,{...n,ref:t}):null});k.displayName=g;var Ae=l.forwardRef((e,t)=>{const{forceMount:r,...n}=e,o=v(g,e.__scopeScrollArea),[c,s]=l.useState(!1);return l.useEffect(()=>{const i=o.scrollArea;let a=0;if(i){const u=()=>{window.clearTimeout(a),s(!0)},d=()=>{a=window.setTimeout(()=>s(!1),o.scrollHideDelay)};return i.addEventListener("pointerenter",u),i.addEventListener("pointerleave",d),()=>{window.clearTimeout(a),i.removeEventListener("pointerenter",u),i.removeEventListener("pointerleave",d)}}},[o.scrollArea,o.scrollHideDelay]),m.jsx(L,{present:r||c,children:m.jsx(ee,{"data-state":c?"visible":"hidden",...n,ref:t})})}),Ee=l.forwardRef((e,t)=>{const{forceMount:r,...n}=e,o=v(g,e.__scopeScrollArea),c=e.orientation==="horizontal",s=X(()=>a("SCROLL_END"),100),[i,a]=Ce("hidden",{hidden:{SCROLL:"scrolling"},scrolling:{SCROLL_END:"idle",POINTER_ENTER:"interacting"},interacting:{SCROLL:"interacting",POINTER_LEAVE:"idle"},idle:{HIDE:"hidden",SCROLL:"scrolling",POINTER_ENTER:"interacting"}});return l.useEffect(()=>{if(i==="idle"){const u=window.setTimeout(()=>a("HIDE"),o.scrollHideDelay);return()=>window.clearTimeout(u)}},[i,o.scrollHideDelay,a]),l.useEffect(()=>{const u=o.viewport,d=c?"scrollLeft":"scrollTop";if(u){let h=u[d];const f=()=>{const p=u[d];h!==p&&(a("SCROLL"),s()),h=p};return u.addEventListener("scroll",f),()=>u.removeEventListener("scroll",f)}},[o.viewport,c,a,s]),m.jsx(L,{present:r||i!=="hidden",children:m.jsx(F,{"data-state":i==="hidden"?"hidden":"visible",...n,ref:t,onPointerEnter:R(e.onPointerEnter,()=>a("POINTER_ENTER")),onPointerLeave:R(e.onPointerLeave,()=>a("POINTER_LEAVE"))})})}),ee=l.forwardRef((e,t)=>{const r=v(g,e.__scopeScrollArea),{forceMount:n,...o}=e,[c,s]=l.useState(!1),i=e.orientation==="horizontal",a=X(()=>{if(r.viewport){const u=r.viewport.offsetWidth<r.viewport.scrollWidth,d=r.viewport.offsetHeight<r.viewport.scrollHeight;s(i?u:d)}},10);return T(r.viewport,a),T(r.content,a),m.jsx(L,{present:n||c,children:m.jsx(F,{"data-state":c?"visible":"hidden",...o,ref:t})})}),F=l.forwardRef((e,t)=>{const{orientation:r="vertical",...n}=e,o=v(g,e.__scopeScrollArea),c=l.useRef(null),s=l.useRef(0),[i,a]=l.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),u=le(i.viewport,i.content),d={...n,sizes:i,onSizesChange:a,hasThumb:u>0&&u<1,onThumbChange:f=>c.current=f,onThumbPointerUp:()=>s.current=0,onThumbPointerDown:f=>s.current=f};function h(f,p){return De(f,s.current,i,p)}return r==="horizontal"?m.jsx(Te,{...d,ref:t,onThumbPositionChange:()=>{if(o.viewport&&c.current){const f=o.viewport.scrollLeft,p=q(f,i,o.dir);c.current.style.transform=`translate3d(${p}px, 0, 0)`}},onWheelScroll:f=>{o.viewport&&(o.viewport.scrollLeft=f)},onDragScroll:f=>{o.viewport&&(o.viewport.scrollLeft=h(f,o.dir))}}):r==="vertical"?m.jsx(ye,{...d,ref:t,onThumbPositionChange:()=>{if(o.viewport&&c.current){const f=o.viewport.scrollTop,p=q(f,i);c.current.style.transform=`translate3d(0, ${p}px, 0)`}},onWheelScroll:f=>{o.viewport&&(o.viewport.scrollTop=f)},onDragScroll:f=>{o.viewport&&(o.viewport.scrollTop=h(f))}}):null}),Te=l.forwardRef((e,t)=>{const{sizes:r,onSizesChange:n,...o}=e,c=v(g,e.__scopeScrollArea),[s,i]=l.useState(),a=l.useRef(null),u=A(t,a,c.onScrollbarXChange);return l.useEffect(()=>{a.current&&i(getComputedStyle(a.current))},[a]),m.jsx(re,{"data-orientation":"horizontal",...o,ref:u,sizes:r,style:{bottom:0,left:c.dir==="rtl"?"var(--radix-scroll-area-corner-width)":0,right:c.dir==="ltr"?"var(--radix-scroll-area-corner-width)":0,"--radix-scroll-area-thumb-width":H(r)+"px",...e.style},onThumbPointerDown:d=>e.onThumbPointerDown(d.x),onDragScroll:d=>e.onDragScroll(d.x),onWheelScroll:(d,h)=>{if(c.viewport){const f=c.viewport.scrollLeft+d.deltaX;e.onWheelScroll(f),se(f,h)&&d.preventDefault()}},onResize:()=>{a.current&&c.viewport&&s&&n({content:c.viewport.scrollWidth,viewport:c.viewport.offsetWidth,scrollbar:{size:a.current.clientWidth,paddingStart:z(s.paddingLeft),paddingEnd:z(s.paddingRight)}})}})}),ye=l.forwardRef((e,t)=>{const{sizes:r,onSizesChange:n,...o}=e,c=v(g,e.__scopeScrollArea),[s,i]=l.useState(),a=l.useRef(null),u=A(t,a,c.onScrollbarYChange);return l.useEffect(()=>{a.current&&i(getComputedStyle(a.current))},[a]),m.jsx(re,{"data-orientation":"vertical",...o,ref:u,sizes:r,style:{top:0,right:c.dir==="ltr"?0:void 0,left:c.dir==="rtl"?0:void 0,bottom:"var(--radix-scroll-area-corner-height)","--radix-scroll-area-thumb-height":H(r)+"px",...e.style},onThumbPointerDown:d=>e.onThumbPointerDown(d.y),onDragScroll:d=>e.onDragScroll(d.y),onWheelScroll:(d,h)=>{if(c.viewport){const f=c.viewport.scrollTop+d.deltaY;e.onWheelScroll(f),se(f,h)&&d.preventDefault()}},onResize:()=>{a.current&&c.viewport&&s&&n({content:c.viewport.scrollHeight,viewport:c.viewport.offsetHeight,scrollbar:{size:a.current.clientHeight,paddingStart:z(s.paddingTop),paddingEnd:z(s.paddingBottom)}})}})}),[Ne,te]=J(g),re=l.forwardRef((e,t)=>{const{__scopeScrollArea:r,sizes:n,hasThumb:o,onThumbChange:c,onThumbPointerUp:s,onThumbPointerDown:i,onThumbPositionChange:a,onDragScroll:u,onWheelScroll:d,onResize:h,...f}=e,p=v(g,r),[S,x]=l.useState(null),y=A(t,b=>x(b)),P=l.useRef(null),D=l.useRef(""),Y=p.viewport,O=n.content-n.viewport,j=C(d),N=C(a),M=X(h,10);function W(b){if(P.current){const w=b.clientX-P.current.left,E=b.clientY-P.current.top;u({x:w,y:E})}}return l.useEffect(()=>{const b=w=>{const E=w.target;(S==null?void 0:S.contains(E))&&j(w,O)};return document.addEventListener("wheel",b,{passive:!1}),()=>document.removeEventListener("wheel",b,{passive:!1})},[Y,S,O,j]),l.useEffect(N,[n,N]),T(S,M),T(p.content,M),m.jsx(Ne,{scope:r,scrollbar:S,hasThumb:o,onThumbChange:C(c),onThumbPointerUp:C(s),onThumbPositionChange:N,onThumbPointerDown:C(i),children:m.jsx(_.div,{...f,ref:y,style:{position:"absolute",...f.style},onPointerDown:R(e.onPointerDown,b=>{b.button===0&&(b.target.setPointerCapture(b.pointerId),P.current=S.getBoundingClientRect(),D.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",p.viewport&&(p.viewport.style.scrollBehavior="auto"),W(b))}),onPointerMove:R(e.onPointerMove,W),onPointerUp:R(e.onPointerUp,b=>{const w=b.target;w.hasPointerCapture(b.pointerId)&&w.releasePointerCapture(b.pointerId),document.body.style.webkitUserSelect=D.current,p.viewport&&(p.viewport.style.scrollBehavior=""),P.current=null})})})}),U="ScrollAreaThumb",oe=l.forwardRef((e,t)=>{const{forceMount:r,...n}=e,o=te(U,e.__scopeScrollArea);return m.jsx(L,{present:r||o.hasThumb,children:m.jsx(_e,{ref:t,...n})})}),_e=l.forwardRef((e,t)=>{const{__scopeScrollArea:r,style:n,...o}=e,c=v(U,r),s=te(U,r),{onThumbPositionChange:i}=s,a=A(t,h=>s.onThumbChange(h)),u=l.useRef(),d=X(()=>{u.current&&(u.current(),u.current=void 0)},100);return l.useEffect(()=>{const h=c.viewport;if(h){const f=()=>{if(d(),!u.current){const p=Oe(h,i);u.current=p,i()}};return i(),h.addEventListener("scroll",f),()=>h.removeEventListener("scroll",f)}},[c.viewport,d,i]),m.jsx(_.div,{"data-state":s.hasThumb?"visible":"hidden",...o,ref:a,style:{width:"var(--radix-scroll-area-thumb-width)",height:"var(--radix-scroll-area-thumb-height)",...n},onPointerDownCapture:R(e.onPointerDownCapture,h=>{const p=h.target.getBoundingClientRect(),S=h.clientX-p.left,x=h.clientY-p.top;s.onThumbPointerDown({x:S,y:x})}),onPointerUp:R(e.onPointerUp,s.onThumbPointerUp)})});oe.displayName=U;var $="ScrollAreaCorner",ne=l.forwardRef((e,t)=>{const r=v($,e.__scopeScrollArea),n=!!(r.scrollbarX&&r.scrollbarY);return r.type!=="scroll"&&n?m.jsx(Le,{...e,ref:t}):null});ne.displayName=$;var Le=l.forwardRef((e,t)=>{const{__scopeScrollArea:r,...n}=e,o=v($,r),[c,s]=l.useState(0),[i,a]=l.useState(0),u=!!(c&&i);return T(o.scrollbarX,()=>{var h;const d=((h=o.scrollbarX)==null?void 0:h.offsetHeight)||0;o.onCornerHeightChange(d),a(d)}),T(o.scrollbarY,()=>{var h;const d=((h=o.scrollbarY)==null?void 0:h.offsetWidth)||0;o.onCornerWidthChange(d),s(d)}),u?m.jsx(_.div,{...n,ref:t,style:{width:c,height:i,position:"absolute",right:o.dir==="ltr"?0:void 0,left:o.dir==="rtl"?0:void 0,bottom:0,...e.style}}):null});function z(e){return e?parseInt(e,10):0}function le(e,t){const r=e/t;return isNaN(r)?0:r}function H(e){const t=le(e.viewport,e.content),r=e.scrollbar.paddingStart+e.scrollbar.paddingEnd,n=(e.scrollbar.size-r)*t;return Math.max(n,18)}function De(e,t,r,n="ltr"){const o=H(r),c=o/2,s=t||c,i=o-s,a=r.scrollbar.paddingStart+s,u=r.scrollbar.size-r.scrollbar.paddingEnd-i,d=r.content-r.viewport,h=n==="ltr"?[0,d]:[d*-1,0];return ce([a,u],h)(e)}function q(e,t,r="ltr"){const n=H(t),o=t.scrollbar.paddingStart+t.scrollbar.paddingEnd,c=t.scrollbar.size-o,s=t.content-t.viewport,i=c-n,a=r==="ltr"?[0,s]:[s*-1,0],u=Pe(e,a);return ce([0,s],[0,i])(u)}function ce(e,t){return r=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(r-e[0])}}function se(e,t){return e>0&&e<t}var Oe=(e,t=()=>{})=>{let r={left:e.scrollLeft,top:e.scrollTop},n=0;return function o(){const c={left:e.scrollLeft,top:e.scrollTop},s=r.left!==c.left,i=r.top!==c.top;(s||i)&&t(),r=c,n=window.requestAnimationFrame(o)}(),()=>window.cancelAnimationFrame(n)};function X(e,t){const r=C(e),n=l.useRef(0);return l.useEffect(()=>()=>window.clearTimeout(n.current),[]),l.useCallback(()=>{window.clearTimeout(n.current),n.current=window.setTimeout(r,t)},[r,t])}function T(e,t){const r=C(t);B(()=>{let n=0;if(e){const o=new ResizeObserver(()=>{cancelAnimationFrame(n),n=window.requestAnimationFrame(r)});return o.observe(e),()=>{window.cancelAnimationFrame(n),o.unobserve(e)}}},[e,r])}var ie=K,je=Z,Me=ne;const We=l.forwardRef(({className:e,children:t,...r},n)=>m.jsxs(ie,{ref:n,className:G("relative overflow-hidden",e),...r,children:[m.jsx(je,{className:"h-full w-full rounded-[inherit] bg-white",children:t}),m.jsx(ae,{}),m.jsx(Me,{})]}));We.displayName=ie.displayName;const ae=l.forwardRef(({className:e,orientation:t="vertical",...r},n)=>m.jsx(k,{ref:n,orientation:t,className:G("flex touch-none select-none transition-colors",t==="vertical"&&"h-full w-2.5 border-l border-l-transparent p-[1px]",t==="horizontal"&&"h-2.5 flex-col border-t border-t-transparent p-[1px]",e),...r,children:m.jsx(oe,{className:"relative flex-1 rounded-full bg-border"})}));ae.displayName=k.displayName;export{We as S,ae as a};
