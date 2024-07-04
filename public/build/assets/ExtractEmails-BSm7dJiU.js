import{r as t,j as e,Y as W,a as w}from"./app-DA6yD-bg.js";import{r as y,u as C}from"./xlsx-DG2X6oDA.js";import{A as Y}from"./AuthenticatedLayout-jK92KjJv.js";import{I as E}from"./input-BMchtnkz.js";import{S as G,a as P,b as X,c as z,d as J,e as K,f as Q}from"./select-8KFRuk-M.js";import{c as Z}from"./index-DTzn02tC.js";import{F as L}from"./index.es-C4Hz4JyV.js";import{A as ee,b as ae,c as se,d as te,e as re,f as le,g as oe,h as ie}from"./alert-dialog-DPhN9ELP.js";import{B as R}from"./button-Czat_LeM.js";import{u as ne}from"./use-toast-DSZ2X8Ft.js";import"./ApplicationLogo-BK5pa0mE.js";import"./transition-CHIl-Fii.js";import"./index-BSvPNBtZ.js";import"./index-wyKmaqcT.js";import"./index-DjDCE-CF.js";import"./index-D2R9fagv.js";import"./index-DUFVU-Ky.js";import"./index-JpmpzNkP.js";import"./index-DzzVjFRl.js";import"./utils-Baa09YAL.js";import"./createLucideIcon-TB6UWrdR.js";import"./index-DKKbawXw.js";import"./Combination-JEORXwyg.js";import"./index-gIoNW1Kd.js";import"./index-DgaNj54m.js";import"./index-0yB0lKw6.js";function Te({auth:U}){const[r,F]=t.useState(""),[f,j]=t.useState(""),[g,v]=t.useState(""),[ce,V]=t.useState([]),[p,S]=t.useState([]),[m,q]=t.useState(null),[l,c]=t.useState({fileUploadError:"",columnError:"",minRowError:"",maxRowError:"",validateEmailsError:"",storeEmailsError:""}),[b,M]=t.useState([]),[x,D]=t.useState(""),[N,T]=t.useState([]),[_,h]=t.useState(!1),{toast:A}=ne(),B=a=>{const s=a.target.files[0],d=new FileReader;d.onload=o=>{q(new Uint8Array(o.target.result));const n=y(new Uint8Array(o.target.result),{type:"array"});M(n.SheetNames),n.SheetNames.length===1&&D(n.SheetNames[0])},d.readAsArrayBuffer(s)};t.useEffect(()=>{if(m&&r){const s=y(m,{type:"array"}).Sheets[x],n=C.sheet_to_json(s,{header:1,raw:!1}).map(i=>i[r.charCodeAt(0)-65]).filter(i=>i!==void 0);j("1"),v(n.length.toString())}},[m,r]),t.useEffect(()=>{if(m&&r&&f&&g&&x){const s=y(m,{type:"array"}).Sheets[x],d=C.sheet_to_json(s,{header:"A",raw:!1}),o={};d.forEach((i,k)=>{k+1<Number(f)||k+1>Number(g)||Object.keys(i).forEach(u=>{o[u]||(o[u]=[]),i[u]!==""&&o[u].push(i[u])})}),V(o);const n=o[r]||[];S(n),c(i=>({...i,columnError:""})),console.log(n),console.log(p)}if(r===""){c({fileUploadError:"",columnError:"",minRowError:"",maxRowError:"",validateEmailsError:""});return}!m&&r!==""&&c(a=>({...a,fileUploadError:"Please upload a file before entering a column."}))},[r,m,f,g,x]);const I=a=>{const s=[...p];s.splice(a,1),S(s),a===0?j(s.length>0?"1":""):a===p.length-1&&v(s.length>0?s.length.toString():"")},O=async()=>{try{const a=await w.post("/api/v1/validate-emails",{emails:p.map(s=>({email:s})),removeDuplicates:!1});console.log(a.data),c(s=>({...s,validateEmailsError:""})),a.data.message.includes("Duplicate")&&h(!0)}catch(a){console.error(a.response.data),a.response.data.message&&(c(s=>({...s,validateEmailsError:a.response.data.message})),a.response.data.message.includes("Duplicate")&&h(!0))}},$=async()=>{h(!1);try{const a=await w.post("/api/v1/validate-emails",{emails:p.map(s=>({email:s})),removeDuplicates:!0});console.log(a.data),c(s=>({...s,validateEmailsError:""})),T(a.data.emails)}catch(a){console.error(a.response.data),a.response.data.message&&c(s=>({...s,validateEmailsError:a.response.data.message}))}},H=async()=>{try{const a=await w.post("/api/v1/store-unique-emails",{emails:N});console.log(a.data),c(i=>({...i,storeEmailsError:""}));const{newEmails:s,existingEmails:d}=a.data,o=s.join(", "),n=d.join(", ");A({variant:"success",title:"Success!",description:`New emails added: ${o}${d.length>0?`. Already existing emails: ${n}`:""}`})}catch(a){console.error(a.response.data),c(s=>({...s,storeEmailsError:a.response.data.message})),A({variant:"destructive",title:"Error!",description:a.response.data.message})}};return e.jsxs(Y,{user:U.user,header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800",children:"Extract Emails"}),children:[e.jsx(W,{title:"Extract Emails"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsx(E,{type:"file",onChange:B}),b.length>1&&e.jsxs(G,{onValueChange:a=>D(a),children:[e.jsx(P,{className:"w-[180px] mt-1",children:e.jsx(X,{placeholder:"Select a Sheet",defaultValue:x})}),e.jsx(z,{children:e.jsxs(J,{label:"Sheet Names",children:[e.jsx(K,{children:"Sheets"}),b.map((a,s)=>e.jsx(Q,{value:a,children:a},s))]})})]}),e.jsx(E,{type:"text",className:"my-1",placeholder:"Enter column letter",value:r,onChange:a=>F(a.target.value.toUpperCase())}),r!==""&&e.jsxs("div",{className:"flex gap-1",children:[e.jsx(E,{type:"number",placeholder:"Enter min row number",value:f,onChange:a=>j(a.target.value)}),e.jsx(E,{type:"number",placeholder:"Enter max row number",value:g,onChange:a=>v(a.target.value)})]}),l.fileUploadError&&e.jsx("p",{className:"text-red-500 text-xs italic",children:l.fileUploadError}),l.columnError&&e.jsx("p",{className:"text-red-500 text-xs italic",children:l.columnError}),l.minRowError&&e.jsx("p",{className:"text-red-500 text-xs italic",children:l.minRowError}),l.maxRowError&&e.jsx("p",{className:"text-red-500 text-xs italic",children:l.maxRowError}),l.validateEmailsError&&e.jsx("p",{className:"text-red-500 text-xs italic",children:l.validateEmailsError}),r!==""&&(p.length>0?e.jsxs("div",{className:"mt-4 flex flex-col",children:[e.jsx("p",{className:"mb-2 text-lg",children:"Extracted:"}),e.jsx("div",{className:"flex flex-row flex-wrap",children:p.map((a,s)=>e.jsx("div",{className:"m-1",children:e.jsxs("p",{className:"w-fit rounded-full bg-blue-300 px-4 py-2 text-black",children:[a,e.jsx("span",{className:"ml-2 cursor-pointer",onClick:()=>I(s),children:e.jsx(L,{icon:Z})})]})},s))})]}):!l.columnError&&e.jsx("div",{className:"mt-4 flex flex-col",children:e.jsx("p",{className:"text-lg text-gray-800",children:"No data found"})})),e.jsx("div",{className:"mt-4 flex justify-end",children:e.jsx("div",{className:"flex-col",children:e.jsx(R,{variant:"",className:"",onClick:O,disabled:!r||!m||!x,children:"Validate Emails"})})}),N.length>0&&e.jsxs("div",{className:"mt-4 flex flex-col",children:[e.jsx("p",{className:"mb-2 text-lg",children:"Unique Emails Extracted:"}),e.jsx("div",{className:"flex flex-row flex-wrap",children:N.map((a,s)=>e.jsx("div",{className:"m-1",children:e.jsx("p",{className:"w-fit rounded-full bg-green-300 px-4 py-2 text-black",children:a.email})},s))}),e.jsx("div",{className:"mt-4 flex justify-end",children:e.jsx("div",{className:"flex-col",children:e.jsx(R,{variant:"secondary",onClick:H,children:"Add Emails to Team"})})})]}),e.jsx(ee,{open:_,onOpenChange:h,children:e.jsxs(ae,{children:[e.jsxs(se,{children:[e.jsx(te,{children:"Delete Duplicate Emails "}),e.jsxs(re,{children:[e.jsx("p",{className:"mb-2",children:"We have detected duplicate emails in your list. Would you like us to remove them for you?"}),e.jsx("p",{children:"Having duplicate emails can result in sending invites and notifications multiple times to the same email address, corresponding to the number of times it appears in the list."})]})]}),e.jsxs(le,{children:[e.jsx(oe,{variant:"outline",onClick:()=>h(!1),children:"No"}),e.jsx(ie,{variant:"",onClick:$,children:"Yes"})]})]})})]})})})})]})}export{Te as default};
