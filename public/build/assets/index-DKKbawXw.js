import{r as t}from"./app-DA6yD-bg.js";import{$ as a}from"./index-DjDCE-CF.js";function x(e){const[r,o]=t.useState(void 0);return a(()=>{if(e){o({width:e.offsetWidth,height:e.offsetHeight});const f=new ResizeObserver(i=>{if(!Array.isArray(i)||!i.length)return;const d=i[0];let n,s;if("borderBoxSize"in d){const c=d.borderBoxSize,u=Array.isArray(c)?c[0]:c;n=u.inlineSize,s=u.blockSize}else n=e.offsetWidth,s=e.offsetHeight;o({width:n,height:s})});return f.observe(e,{box:"border-box"}),()=>f.unobserve(e)}else o(void 0)},[e]),r}const b=t.createContext(void 0);function p(e){const r=t.useContext(b);return e||r||"ltr"}function z(e){const r=t.useRef({value:e,previous:e});return t.useMemo(()=>(r.current.value!==e&&(r.current.previous=r.current.value,r.current.value=e),r.current.previous),[e])}export{p as $,z as a,x as b};
