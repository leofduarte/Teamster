import{r as i,j as p}from"./app-DA6yD-bg.js";import{$,_ as u}from"./index-BSvPNBtZ.js";import{c as m}from"./utils-Baa09YAL.js";const c="horizontal",v=["horizontal","vertical"],s=i.forwardRef((r,e)=>{const{decorative:t,orientation:o=c,...a}=r,n=f(o)?o:c,l=t?{role:"none"}:{"aria-orientation":n==="vertical"?n:void 0,role:"separator"};return i.createElement($.div,u({"data-orientation":n},l,a,{ref:e}))});s.propTypes={orientation(r,e,t){const o=r[e],a=String(o);return o&&!f(o)?new Error(x(a,t)):null}};function x(r,e){return`Invalid prop \`orientation\` of value \`${r}\` supplied to \`${e}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${c}\`.`}function f(r){return v.includes(r)}const d=s,h=i.forwardRef(({className:r,orientation:e="horizontal",decorative:t=!0,...o},a)=>p.jsx(d,{ref:a,decorative:t,orientation:e,className:m("shrink-0 bg-border",e==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",r),...o}));h.displayName=d.displayName;export{h as S};
