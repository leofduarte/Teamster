import{b as T,$ as C,_ as L,c as z}from"./index-BSvPNBtZ.js";import{r as n}from"./app-DA6yD-bg.js";import{$ as h}from"./index-wyKmaqcT.js";import{b as y}from"./index-DjDCE-CF.js";function A(i,e=globalThis==null?void 0:globalThis.document){const s=y(i);n.useEffect(()=>{const o=t=>{t.key==="Escape"&&s(t)};return e.addEventListener("keydown",o),()=>e.removeEventListener("keydown",o)},[s,e])}const p="dismissableLayer.update",K="dismissableLayer.pointerDownOutside",N="dismissableLayer.focusOutside";let w;const R=n.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),H=n.forwardRef((i,e)=>{var s;const{disableOutsidePointerEvents:o=!1,onEscapeKeyDown:t,onPointerDownOutside:a,onFocusOutside:b,onInteractOutside:u,onDismiss:l,...v}=i,c=n.useContext(R),[d,I]=n.useState(null),f=(s=d==null?void 0:d.ownerDocument)!==null&&s!==void 0?s:globalThis==null?void 0:globalThis.document,[,W]=n.useState({}),B=T(e,r=>I(r)),O=Array.from(c.layers),[k]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),S=O.indexOf(k),m=d?O.indexOf(d):-1,_=c.layersWithOutsidePointerEventsDisabled.size>0,D=m>=S,U=j(r=>{const $=r.target,g=[...c.branches].some(E=>E.contains($));!D||g||(a==null||a(r),u==null||u(r),r.defaultPrevented||l==null||l())},f),P=q(r=>{const $=r.target;[...c.branches].some(E=>E.contains($))||(b==null||b(r),u==null||u(r),r.defaultPrevented||l==null||l())},f);return A(r=>{m===c.layers.size-1&&(t==null||t(r),!r.defaultPrevented&&l&&(r.preventDefault(),l()))},f),n.useEffect(()=>{if(d)return o&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(w=f.body.style.pointerEvents,f.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(d)),c.layers.add(d),x(),()=>{o&&c.layersWithOutsidePointerEventsDisabled.size===1&&(f.body.style.pointerEvents=w)}},[d,f,o,c]),n.useEffect(()=>()=>{d&&(c.layers.delete(d),c.layersWithOutsidePointerEventsDisabled.delete(d),x())},[d,c]),n.useEffect(()=>{const r=()=>W({});return document.addEventListener(p,r),()=>document.removeEventListener(p,r)},[]),n.createElement(C.div,L({},v,{ref:B,style:{pointerEvents:_?D?"auto":"none":void 0,...i.style},onFocusCapture:h(i.onFocusCapture,P.onFocusCapture),onBlurCapture:h(i.onBlurCapture,P.onBlurCapture),onPointerDownCapture:h(i.onPointerDownCapture,U.onPointerDownCapture)}))}),X=n.forwardRef((i,e)=>{const s=n.useContext(R),o=n.useRef(null),t=T(e,o);return n.useEffect(()=>{const a=o.current;if(a)return s.branches.add(a),()=>{s.branches.delete(a)}},[s.branches]),n.createElement(C.div,L({},i,{ref:t}))});function j(i,e=globalThis==null?void 0:globalThis.document){const s=y(i),o=n.useRef(!1),t=n.useRef(()=>{});return n.useEffect(()=>{const a=u=>{if(u.target&&!o.current){let v=function(){F(K,s,l,{discrete:!0})};const l={originalEvent:u};u.pointerType==="touch"?(e.removeEventListener("click",t.current),t.current=v,e.addEventListener("click",t.current,{once:!0})):v()}else e.removeEventListener("click",t.current);o.current=!1},b=window.setTimeout(()=>{e.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(b),e.removeEventListener("pointerdown",a),e.removeEventListener("click",t.current)}},[e,s]),{onPointerDownCapture:()=>o.current=!0}}function q(i,e=globalThis==null?void 0:globalThis.document){const s=y(i),o=n.useRef(!1);return n.useEffect(()=>{const t=a=>{a.target&&!o.current&&F(N,s,{originalEvent:a},{discrete:!1})};return e.addEventListener("focusin",t),()=>e.removeEventListener("focusin",t)},[e,s]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function x(){const i=new CustomEvent(p);document.dispatchEvent(i)}function F(i,e,s,{discrete:o}){const t=s.originalEvent.target,a=new CustomEvent(i,{bubbles:!1,cancelable:!0,detail:s});e&&t.addEventListener(i,e,{once:!0}),o?z(t,a):t.dispatchEvent(a)}const V=H,Y=X;export{H as $,Y as a,V as b};
