import{r as a,j as e,Y as v,a as x}from"./app-DA6yD-bg.js";import{Layout as A}from"./Layout-CD6lmAmp.js";import{t as l}from"./use-toast-DSZ2X8Ft.js";import{M as N}from"./Modal-Q1vF_rf7.js";import D from"./AddQuestionaire-DUCcdIq8.js";import{B as n}from"./button-Czat_LeM.js";import{F as y}from"./index.es-C4Hz4JyV.js";import{b}from"./index-DTzn02tC.js";import{I as w}from"./index-DlhB-auK.js";import{A as C,a as k,b as Q,c as E,d as F,e as S,f as I,g as M,h as P}from"./alert-dialog-DPhN9ELP.js";import"./logo-teamster-DKsO-BHU.js";import"./index-CNbTJdn3.js";import"./transition-CHIl-Fii.js";import"./input-BMchtnkz.js";import"./utils-Baa09YAL.js";import"./label-DJGv7VYA.js";import"./index-BSvPNBtZ.js";import"./index-0yB0lKw6.js";import"./index-DjDCE-CF.js";import"./index-wyKmaqcT.js";import"./index-gIoNW1Kd.js";import"./index-DUFVU-Ky.js";import"./Combination-JEORXwyg.js";import"./index-JpmpzNkP.js";const ie=({auth:o})=>{const[c,T]=a.useState(null),[r,d]=a.useState([]),[p,i]=a.useState(!1),[h,m]=a.useState(!1);console.log(o.user.id);const f=s=>{console.log("action",s),m(!0)},u=()=>{console.log("cancel"),m(!1)};a.useEffect(()=>{(async()=>{try{const t=await x.post("/api/v1/getquestionnaires",{userId:o.user.id});console.log("API Response:",t),d(t.data),console.log("Questionnaires State:",r)}catch(t){console.error(t),l({variant:"destructive",title:"Error!",description:`${t.response.data.message}`})}})()},[]);const j=async s=>{try{const t=await x.delete(`/v1/deletequestionnaire/${s}`);console.log("API Response:",t),l({variant:"success",title:"Success!",description:"Questionnaire deleted successfully!"}),d(r.filter(g=>g.id!==s))}catch(t){console.error(t),l({variant:"destructive",title:"Error!",description:`${t.response.data.message}`})}};return e.jsxs("div",{children:[e.jsxs(A,{children:[e.jsx(v,{title:"Formulário de Feedback"}),e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12",children:e.jsx("div",{className:"overflow-hidden",children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold text-black",children:"Formulários"}),e.jsxs(n,{onClick:()=>i(!0),className:"align-middle",children:["Adicionar Formulário",e.jsx(y,{className:"ms-2",icon:b})]})]}),e.jsxs("div",{className:"my-6 flex flex-col justify-between",children:[e.jsx("h2",{className:"text-2xl font-serif uppercase",children:"Está na hora de analisar resultados"}),e.jsx("p",{className:"text-gray-500",children:"Pergunte aos seus colaboradores o que pensam sobre a atividade"})]}),r.length===0?e.jsx("div",{className:"mt-16  ",children:e.jsx("p",{children:"Crie um novo formulário para começar a recolher feedback dos seus colaboradores..."})}):e.jsx("div",{className:"gap-4 flex flex-col",children:r&&r.map(s=>e.jsxs("div",{className:"flex justify-between my-4 bg-white p-4 min-h-fit rounded-xl gap-4 shadow-lg",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("h2",{className:"text-2xl font-serif uppercase",children:s.title}),e.jsx("span",{className:"text-gray-500 mx-3",children:"-"}),e.jsx("p",{className:"text-gray-500",children:s.description})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(w,{href:`/questionnaires/${s.id}/edit`,method:"get",children:e.jsx(n,{children:"Update"})}),e.jsxs(C,{isOpen:h,children:[e.jsx(k,{asChild:!0,children:e.jsx(n,{variant:"destructive",onClick:()=>f(s.id),children:"Delete"})}),e.jsxs(Q,{children:[e.jsxs(E,{className:"text-black",children:[e.jsx(F,{children:"Confirm Delete"}),e.jsxs(S,{children:["Do you want to ",e.jsx("strong",{children:"delete"})," this activity?"]})]}),e.jsxs(I,{children:[e.jsx(M,{onClick:u,children:"Cancel"}),e.jsx(P,{variant:"destructive",onClick:()=>j(s.id),children:"Confirm"})]})]})]})]})]},s.id))}),c&&e.jsx("p",{className:"text-red-500 text-xs italic",children:c})]})})})]}),e.jsx(N,{title:"Adicionar Questionário",onClose:()=>i(!1),show:p,auth:o,children:e.jsx(D,{auth:o,onClose:()=>i(!1)})})]})};export{ie as default};
