import{j as e,r as m,R as ae}from"./react-e2306d96.js";import{c as je}from"./react-dom-12a48263.js";import{N as M,u as re,L as ie,a as we,F as G,c as ve,R as Ne}from"./react-router-dom-41163de9.js";import{N as Q,C as ye,a as Ee}from"./react-bootstrap-cea3850a.js";import"./firebase-546b0136.js";import{i as Re,g as Ie,a as Se,b as Pe,c as z,d as q,u as oe,e as ce,s as J,f as V,q as Y,l as De,w as X,h as le,j as Le,k as Ae,o as Ce,m as _e,n as Fe}from"./@firebase-d9fc7786.js";import{s as Oe}from"./short-uuid-8a99f7d9.js";import{e as Be,d as de,h as Te,O as me,i as H,j as $,k as ke,l as ue,n as he,o as Ue,p as A}from"./react-router-3d5247a2.js";import{t as $e}from"./html-to-image-afae00f5.js";import{F as Me}from"./file-saver-593d5644.js";import{J as qe}from"./jszip-c900fc38.js";import{f as Z}from"./@remix-run-1a57f73b.js";import{_ as Ve}from"./react-qr-code-17bb6b2e.js";import{C as We}from"./react-multi-carousel-1ae391f8.js";import{i as pe}from"./browser-image-compression-a3ab6596.js";import"./react-drag-drop-files-d60d8635.js";/* empty css                  */import"./any-base-7b60a4e7.js";import"./scheduler-765c72db.js";import"./classnames-09210039.js";import"./prop-types-extra-571b8aa3.js";import"./uncontrollable-546bc386.js";import"./@babel-a64ce94c.js";import"./@restart-f81e0502.js";import"./dom-helpers-84f6ce4b.js";import"./react-transition-group-4ce84304.js";import"./prop-types-a8abeb81.js";import"./tslib-6635c9de.js";import"./idb-81bdbf9b.js";import"./qr.js-8bf59ccc.js";import"./react-is-e8e5dbb3.js";import"./@emotion-7a6999b0.js";import"./hoist-non-react-statics-8b467c5a.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const T={VITE_FIREBASE_API:"AIzaSyAV3ksqEROCzb_DuNW-uw4BORu0E9J4cvE",VITE_FIREBASE_AUTH_DOMAIN:"arham-enterprises.firebaseapp.com",VITE_FIREBASE_PROJECT_ID:"arham-enterprises",VITE_FIREBASE_STORAGE_BUCKET:"arham-enterprises.appspot.com",VITE_FIREBASE_SENDER_ID:"26564962066",VITE_FIREBASE_APP_ID:"1:26564962066:web:a2b672a6ae62d0044335cb",BASE_URL:"/qr-ceramica-pages/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},Ge={apiKey:T.VITE_FIREBASE_API,authDomain:T.VITE_FIREBASE_AUTH_DOMAIN,projectId:T.VITE_FIREBASE_PROJECT_ID,storageBucket:T.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:T.VITE_FIREBASE_SENDER_ID,appId:T.VITE_FIREBASE_APP_ID},ge=Re(Ge),ee=Ie(ge),C=Se(ge),W=Pe();z(C,"products");async function ze(t,n,r,a,s,i){const o=Oe.generate(),c=a.name.split(".").pop(),l=`${t}-${n}.${c}`;if(a.type.split("/")[0]==="image"){const j=q(W,`images/${o}/${l}`);try{const f=await oe(j,a),S=q(W,f.ref),D=ce(S).then(_=>{J(V(C,"products",o),{brand:t,model:n,desc:r,image_location:_,created_at:s,last_modified:i},{merge:!0}).catch(L=>L.message)}).catch(_=>_.message)}catch(f){throw new Error(f.message)}}else throw new Error("IMAGE FILES ACCEPTED, PLEASE UPLOAD IMAGE FILES")}async function He(t,n){console.log(t,n);const r=Y(z(C,"products"),X("brand","==",t),X("model","==",n),De(1));try{const s=await le(r);console.log(s);var a="";const i=s.forEach(o=>{a=o.data().image_location});return a}catch(s){return s.message}}async function Ke({id:t,brand:n}){const r=Le(C),a=Y(z(C,"products"),X("brand","==",n));(await le(a)).forEach(i=>{r.delete(V(C,"products",i.id))}),await r.commit()}async function Qe(t){let n={brand:t.brand,model:t.model,desc:t.desc,last_modified:t.lastModified},r,a;if(t.img){r=t.img;const i=r.name.split(".").pop();a=`${t.brand}-${t.model}.${i}`}let s=t.id;if((r==null?void 0:r.size)>0)if(r.type.split("/")[0]==="image"){const i=q(W,`images/${s}/${a}`);try{const o=await oe(i,r),c=q(W,o.ref),l=ce(c).then(j=>(n={...n,image_location:j},J(V(C,"products",s),n,{merge:!0}).catch(f=>{throw new Error("IMG NOT FOUND")}),j)).catch(j=>{throw new Error("IMG NOT FOUND 4")});return n}catch{throw new Error("IMG NOT FOUND 2")}}else throw new Error("IMAGE FILES ACCEPTED. PLEASE ADD IMAGE");else return J(V(C,"products",s),n,{merge:!0}).catch(i=>{throw new Error("IMG NOT FOUND 3")}),n}function Je({show:t,onChangeState:n,disabled:r}){const a=Be();async function s(){try{const o=await Ae(ee);return a("/login",{replace:!0})}catch(o){return o.message}}const i=()=>{n(!t)};return e.jsx(Q,{expand:"sm",className:"bg-body-tertiary header",id:"navbar--height",children:e.jsxs(ye,{className:"ms-2 w-100",children:[e.jsx(M,{to:"/",end:!0,className:"navbar-brand",children:e.jsx("img",{src:"/android-chrome-512x512.png",width:"64px",height:"64px"})}),e.jsx(Q.Toggle,{"aria-controls":"basic-navbar-nav"}),e.jsx(Q.Collapse,{id:"basic-navbar-nav",children:e.jsxs(Ee,{children:[e.jsx(M,{to:"/",className:"nav-link",children:"Add Product"}),e.jsxs("div",{className:"d-flex justify-content-lg-center align-items-center nav-link gap-1",children:[e.jsxs("label",{className:"switch ",children:[e.jsx("input",{type:"checkbox",name:"export-btn",checked:t,onChange:i,disabled:r}),e.jsx("span",{className:"slider round"})]}),e.jsx("div",{style:{userSelect:"none",cursor:"pointer"},onClick:i,disabled:r,children:"Exports"})]}),e.jsx(M,{to:"/delete",className:"nav-link",children:"Delete Product"}),e.jsx("button",{className:"nav-link header--button",onClick:s,children:"Logout"})]})})]})})}function Xe({products:t}){const[n,r]=re(),a=n.get("search");function s(c){let l=c.target.value,j="search";console.log(c.target.value),r(f=>(l===null||l===""?f.delete(j):f.set(j,l),f))}console.log(n);const i=a?t==null?void 0:t.filter(c=>{if(c.brand.toLowerCase().includes(a.toLowerCase())||c.model.toLowerCase().includes(a.toLowerCase()))return t}):t;console.log(i);const o=(t==null?void 0:t.length)>0&&(i==null?void 0:i.length)>0?i.map(c=>e.jsxs(M,{to:`/edit/${c.id}`,className:`list-group-item list-group-item-action ${({isActive:l})=>l?"active":""}`,"aria-current":"true",children:[e.jsxs("div",{className:"d-flex gap-5 w-100 justify-content-between",children:[e.jsxs("h5",{className:"mb-1 trim list--title",children:[c.brand,"-",c.model]}),e.jsx("small",{className:"trim list--date",children:c.created_at})]}),e.jsx("p",{className:"mb-1 trim list--desc",children:c.desc})]},c.id)):e.jsxs(ie,{to:"/",className:"list-group-item list-group-item-action","aria-current":"true",children:[e.jsx("div",{className:"d-flex gap-auto w-100 justify-content-between",children:e.jsx("h5",{className:"mb-1 trim list--title",children:(i==null?void 0:i.length)===0&&n.get("search")!==""?"0 Products Found":typeof t>"u"?"Loading, please wait...":"No Products Added"})}),typeof t<"u"&&e.jsx("p",{className:"mb-1 trim list--desc",children:"Click to Add Product"})]});return e.jsxs("div",{className:"list-group",children:[e.jsx("div",{className:"d-flex flex-row",id:"searchbar",children:e.jsx("input",{className:"form-control me-1 flex-grow-1",type:"search",placeholder:"Search","aria-label":"Search",onChange:s})}),e.jsx("div",{className:"sidebar--cards",children:o})]})}function Ye(t){const n=new URL(t.url).pathname;if(!localStorage.getItem("loggedIn"))throw Z(`/login?message=You must log in first.&redirectTo=${n}`);return null}async function se(t){const n=new qe;let r=new Date;const a=new Intl.DateTimeFormat("en-IN",{year:"numeric",month:"2-digit",day:"2-digit"}).format(r);t&&await Promise.all(t.map(async s=>{const i=document.getElementById(s.id);return $e(i,{backgroundColor:"white",canvasWidth:"350",canvasHeight:"375",quality:"1"}).then(function(o){let c=`${s.brand}-${s.model}.png`;n.file(c,o)})})),n.generateAsync({type:"blob",compression:"DEFLATE"}).then(function(s){let i=t.length===1?`QR CODE - ${t[0].brand} - ${t[0].model}`:`QR CODES - ${a}`;Me.saveAs(s,i)})}function Ze({next:t,previous:n,goToSlide:r,...a}){const{currentSlide:s}=a;return e.jsxs("div",{className:"carousel-button-group",children:[e.jsx("button",{type:"button",className:`btn btn-outline-secondary ${s===0?"disable":""}`,onClick:()=>n(),children:e.jsx("img",{src:"/arrow-left.svg"})}),e.jsx("button",{type:"button",className:"btn btn-outline-secondary",onClick:()=>t(),children:e.jsx("img",{src:"/arrow-right.svg"})})]})}const et={superLargeDesktop:{breakpoint:{max:4e3,min:3e3},items:5},desktop:{breakpoint:{max:3e3,min:1024},items:4},tablet:{breakpoint:{max:1024,min:464},items:1},mobile:{breakpoint:{max:464,min:0},items:1}};function tt({products:t}){console.log(`${window.location.hostname}${window.location.protocol&&`:${window.location.protocol}`}`),m.useState(!1);const n=t?t.map(r=>{const a=`${window.location.hostname}/images?brand=${r.brand}&model=${r.model}`;return e.jsxs("div",{className:"d-flex flex-column align-items-center text-center justify-content-center",children:[e.jsxs("div",{className:"d-flex flex-column justify-content-center align-items-center text-center mh-100",style:{width:"fit-content",padding:"5px"},id:r.id,children:[e.jsx(Ve,{size:150,viewBox:"0 0 200 200",value:a}),e.jsxs("span",{style:{margin:"0",padding:"0",fontSize:"16px",fontWeight:"bold"},children:[r.brand," - ",r.model]}),e.jsx("span",{style:{margin:"0",padding:"0",fontSize:"14px",fontWeight:"normal"},children:"Scan this QR Code to learn more."})]}),e.jsx("div",{className:"pb-2",children:e.jsx("button",{className:"btn btn-outline-primary",onClick:()=>se([r]),children:"Click to Export this QR Code"})})]})}):"";return e.jsxs(ae.Fragment,{children:[e.jsx("h3",{className:"text-center",children:"EXPORTS"}),e.jsx(We,{arrows:!1,renderButtonGroupOutside:!0,responsive:et,customButtonGroup:e.jsx(Ze,{}),children:n}),e.jsx("button",{className:"btn btn-outline-primary",onClick:()=>se(t),children:"Export All QR Codes"})]})}async function st({request:t}){return Ye(t),null}function nt(){const[t,n]=m.useState(),[r,a]=m.useState(!1),s=de(),i=j=>{a(j)};m.useEffect(()=>{const j=Y(z(C,"products"));return Ce(j,S=>{n(S.docs.map(D=>({...D.data(),id:D.id})))})},[]),t==null||t.length;const c=(()=>(t==null?void 0:t.length)===0&&s.pathname.includes("edit")&&s.pathname.includes("delete")?e.jsx(Te,{to:"/"}):typeof t>"u"?e.jsx("div",{children:"Loading, please wait..."}):e.jsx(me,{context:t}))(),l=(t==null?void 0:t.length)===0;return e.jsx(e.Fragment,{children:e.jsxs(m.Fragment,{children:[e.jsx(Je,{show:r,disabled:l,onChangeState:i}),e.jsx("div",{className:"main--content",children:e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"p-5 col-9 main-column",children:[c,r&&t.length>0&&e.jsx(tt,{products:t})]}),e.jsx("div",{className:"col-3 sidebar-column",children:e.jsx(Xe,{products:t})})]})})]})})}async function at({request:t}){const n=await t.formData(),r=n.get("prod_brand"),a=n.get("prod_model"),s=n.get("prod_desc"),i=n.get("blobFile"),o=new Date().toLocaleString().replace(",",""),c=new Date().toLocaleString().replace(",","");try{const l=await ze(r,a,s,i,o,c)}catch(l){throw new Error(l.message)}return null}HTMLCanvasElement.prototype.toObjectURL=async function(t="image/jpeg",n=.85){return new Promise((r,a)=>{this.toBlob(s=>{if(!s){a("Error creating blob");return}r(s)},t,n)})};function rt(){const t=H();$(),we();const n=[".jpg",".png","gif"],[r,a]=m.useState(["","","",""]),[s,i]=m.useState(!1),[o,c]=m.useState(["","","",""]),[l,j]=m.useState(!0),[f,S]=m.useState(""),D=m.useRef(null);m.useRef([]);const _=r.map((u,x)=>e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("input",{type:"file",className:"form-control",accept:n,name:"prod_img",id:`prod_img_${x}`,onChange:w=>{a(F=>{const R=[...F];return R[x]=w.target.files[0],R}),l===!1&&j(!0)},required:x===0&&!0,disabled:s}),e.jsx("button",{className:"btn btn-outline-danger",type:"button",onClick:w=>{const F=document.getElementById(`prod_img_${x}`);F.value="",a(R=>{const g=[...R];return g[x]="",g}),l===!1&&j(!0)},disabled:r[x]===""||s,children:"Reset"})]},x));m.useEffect(()=>{const u=r.map(w=>w!==""&&typeof w=="object"?URL.createObjectURL(w):"");r.filter(w=>w).length<=0&&(console.log("HERE"),S(""),document.getElementById("blobFile").value=""),c(u);const x=r.forEach(w=>URL.revokeObjectURL(w));return()=>x},[r]);async function L(u){i(!0);var x=0,w=0;const F=h=>new Promise(async(p,v)=>{var d=new Image;d.src=h,d.onload=function(){const N=document.createElement("canvas"),y=N.getContext("2d");x=Math.max(x,d.width),w+=d.height,N.width=d.width,N.height=d.height,y.drawImage(this,N.width/2-d.width/2,d.height/d.width),N.toBlob(E=>{URL.createObjectURL(E)}),p({cnv:N,width:d.width,height:d.height})},d.onerror=N=>{v(N)}}),R=u.map(async h=>new Promise(async(p,v)=>{try{const d=await F(h);p(d)}catch(d){v(d)}}));try{var g=0;const h=await Promise.all(R),p=document.createElement("canvas"),v=p.getContext("2d");p.height=w,p.width=x,h.forEach(async P=>{var U=P.width;v.drawImage(P.cnv,p.width/2-U/2,g),g+=P.height});let d=await p.toObjectURL("image/jpeg",1);const y=await pe(d,{maxSizeMB:2,useWebWorker:!0}),E=new Date;let O=new File([y],"temp_img.jpeg",{type:"image/jpeg",lastModified:E}),b=new DataTransfer;b.items.add(O),document.getElementById("blobFile").files=b.files;const I=URL.createObjectURL(y);return S(I),URL.revokeObjectURL(y),i(!1),j(!1),y}catch(h){throw new Error(h.message)}}m.useEffect(()=>{f===""&&document.getElementById("blobFile").value},[f]);async function k(){const u=o.filter(x=>x);console.time("PREVIEW"),await L(u),console.timeEnd("PREVIEW"),i(!1)}const B=t.state==="submitting"||s||l;return e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col text-center",children:[e.jsx("h3",{className:"text-center text-uppercase",children:"Add Product"}),e.jsxs(G,{method:"post",className:"products--form p-3",encType:"multipart/form-data",replace:!0,children:[e.jsxs("div",{className:"mb-1",children:[e.jsxs("div",{className:"input-group mb-1",children:[e.jsx("span",{className:"input-group-text",id:"brand--name",children:"Brand Name"}),e.jsx("input",{className:"form-control product--input",type:"text",name:"prod_brand",placeholder:"Brand Name...",onKeyDown:u=>{u.target.value.length===0&&u.code==="Space"&&u.preventDefault()},required:!0})]}),e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Required. Name of the brand."})]}),e.jsxs("div",{className:"mb-1",children:[e.jsxs("div",{className:"input-group mb-1",children:[e.jsx("span",{className:"input-group-text",id:"model--name",children:"Model Name"}),e.jsx("input",{className:"form-control product--input",type:"text",name:"prod_model",placeholder:"Model Name...",onKeyDown:u=>{u.target.value.length===0&&u.code==="Space"&&u.preventDefault()},required:!0})]}),e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Required. Name of the model."})]}),e.jsxs("div",{className:"mb-1",children:[e.jsxs("div",{className:"input-group mb-1",children:[e.jsx("span",{className:"input-group-text",id:"description--name",children:"Description"}),e.jsx("input",{className:"form-control product--input",type:"text",name:"prod_desc",onKeyDown:u=>{u.target.value.length===0&&u.code==="Space"&&u.preventDefault()},placeholder:"Description..."})]}),e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Optional. Description of the product."})]}),_&&e.jsxs("div",{className:"mb-1",children:[e.jsx("div",{className:"d-flex row mb-2",children:e.jsx("div",{className:"d-flex gap-2 col-shrink-1 align-items-center",children:e.jsx(e.Fragment,{children:"UPLOAD IMAGES"})})}),_,e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Required. Multiple images can be added."}),e.jsx("div",{className:"input-group mb-3",children:e.jsx("input",{type:"file",name:"blobFile",id:"blobFile",accept:n,style:{pointerEvents:"none"},className:"form-control",required:!0})})]}),e.jsxs("div",{className:"btn-group",role:"group","aria-label":"Basic example",children:[e.jsx("button",{type:"button",className:"btn btn-outline-secondary submit--button",onClick:()=>k(),disabled:o.filter(u=>u).length<=0||s||t.state==="submitting",children:o.filter(u=>u).length<=0?"Add images to preview...":"Display Preview"}),e.jsx("button",{disabled:B,className:"submit--button btn btn-outline-primary",type:"submit",ref:D,children:t.state==="submitting"?"Adding Product...":"Add Product"})]})]})]}),e.jsxs("div",{className:"preview--container col text-center",children:[e.jsx("h4",{children:"PREVIEW"}),f&&e.jsx("div",{className:"images--preview",children:e.jsx("div",{id:"preview",children:f&&e.jsx("img",{src:f,style:{maxWidth:"100%"}})})})]})]})}async function it({request:t,params:n}){return null}async function ot({request:t}){var s;const n=await t.formData();var r="";let a={id:n.get("id"),brand:n.get("brand"),model:n.get("model"),desc:n.get("desc"),lastModified:new Date().toLocaleString().replace(",","")};((s=n.get("blobFile"))==null?void 0:s.size)!=0&&(a={...a,img:n.get("blobFile")});try{r=await Qe(a)}catch(i){throw new Error(i)}return{image_url:r}}HTMLCanvasElement.prototype.toObjectURL=async function(t="image/jpeg",n=.85){return new Promise((r,a)=>{this.toBlob(s=>{if(!s){a("Error creating blob");return}r(s)},t,n)})};function ct(){$();const t=ke();var n=ue();const r=[".jpg",".png","gif"];let a;for(var s=0;s<n.length;s++)n[s].id===t.id&&(a=n[s]);if(console.log(a),typeof a>"u")throw new Response("Not Found",{status:404});de();const i=H(),[o,c]=m.useState({id:"",brand:"",model:"",desc:""});m.useEffect(()=>{c(g=>(g={id:a.id,brand:a.brand,model:a.model,desc:a.desc},g))},[t.id]);const[l,j]=m.useState(["","","",""]),[f,S]=m.useState(!1),[D,_]=m.useState(["","","",""]),[L,k]=m.useState(!1),[B,u]=m.useState(""),x=l.map((g,h)=>e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("input",{type:"file",className:"form-control",accept:r,name:"prod_img",id:`prod_img_${h}`,onChange:p=>{j(v=>{const d=[...v];return d[h]=p.target.files[0],d}),L===!1&&l.filter(v=>v).length>=0&&k(!0)},disabled:f}),e.jsx("button",{className:"btn btn-outline-danger",type:"button",onClick:p=>{const v=document.getElementById(`prod_img_${h}`);v.value="",j(d=>{const N=[...d];return N[h]="",N}),L===!1&&l.filter(d=>d).length>=0&&k(!0)},disabled:l[h]===""||f,children:"Reset"})]},h));m.useEffect(()=>{console.log(L,f);const g=l.map(p=>p!==""&&typeof p=="object"?URL.createObjectURL(p):"");l.filter(p=>p).length<=0&&(console.log("HERE"),u(""),document.getElementById("blobFile").value=""),_(g);const h=l.forEach(p=>URL.revokeObjectURL(p));return()=>h},[l]),m.useEffect(()=>{B===""&&document.getElementById("blobFile").value},[B]);async function w(){const g=D.filter(h=>h);console.time("PREVIEW"),await F(g),console.timeEnd("PREVIEW"),S(!1)}i.state;async function F(g){S(!0);var h=0,p=0;const v=y=>new Promise(async(E,O)=>{var b=new Image;b.src=y,b.onload=function(){const I=document.createElement("canvas"),P=I.getContext("2d");h=Math.max(h,b.width),p+=b.height,I.width=b.width,I.height=b.height,P.drawImage(this,I.width/2-b.width/2,b.height/b.width),I.toBlob(U=>{URL.createObjectURL(U)}),E({cnv:I,width:b.width,height:b.height})},b.onerror=I=>{O(I)}}),d=g.map(async y=>new Promise(async(E,O)=>{try{const b=await v(y);E(b)}catch(b){O(b)}}));try{var N=0;const y=await Promise.all(d),E=document.createElement("canvas"),O=E.getContext("2d");E.height=p,E.width=h,y.forEach(async K=>{var be=K.width;O.drawImage(K.cnv,E.width/2-be/2,N),N+=K.height});let b=await E.toObjectURL("image/jpeg",1);const P=await pe(b,{maxSizeMB:2,useWebWorker:!0}),U=new Date;let fe=new File([P],"temp_img.jpeg",{type:"image/jpeg",lastModified:U}),te=new DataTransfer;te.items.add(fe),document.getElementById("blobFile").files=te.files;const xe=URL.createObjectURL(P);return u(xe),URL.revokeObjectURL(P),S(!1),k(!1),P}catch(y){throw new Error(y.message)}}function R(g){const{name:h,value:p}=g.target;c(v=>({...v,[h]:p}))}return e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col text-center",children:[e.jsx("h3",{className:"text-center text-uppercase",children:"Edit Product"}),e.jsxs(G,{method:"post",className:"products--form p-3",encType:"multipart/form-data",children:[e.jsx("input",{type:"hidden",name:"id",value:a.id,onChange:R}),e.jsxs("div",{className:"mb-1",children:[e.jsxs("div",{className:"input-group mb-1",children:[e.jsx("span",{className:"input-group-text",id:"brand--name",children:"Brand Name"}),e.jsx("input",{className:"form-control product--input",type:"text",name:"brand",placeholder:"Brand Name...",value:o.brand,onChange:R,required:!0})]}),e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Required. Name of the brand."})]}),e.jsxs("div",{className:"mb-1",children:[e.jsxs("div",{className:"input-group mb-1",children:[e.jsx("span",{className:"input-group-text",id:"model--name",children:"Model Name"}),e.jsx("input",{className:"form-control product--input",type:"text",name:"model",placeholder:"Model Name...",value:o.model,onChange:R,required:!0})]}),e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Required. Name of the model."})]}),e.jsxs("div",{className:"mb-1",children:[e.jsxs("div",{className:"input-group mb-1",children:[e.jsx("span",{className:"input-group-text",id:"description--name",children:"Description"}),e.jsx("input",{className:"form-control product--input",type:"text",name:"desc",placeholder:"Description...",value:o.desc,onChange:R})]}),e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Optional. Description of the product."})]}),x&&e.jsxs("div",{className:"mb-1",children:[e.jsx("div",{className:"d-flex row mb-2",children:e.jsx("div",{className:"d-flex gap-2 col-shrink-1 align-items-center",children:e.jsx(e.Fragment,{children:"UPLOAD IMAGES"})})}),x,e.jsx("div",{className:"form-text d-flex align-items-start px-1",children:"Required. Multiple images can be added."}),e.jsx("div",{className:"input-group mb-3",children:e.jsx("input",{type:"file",name:"blobFile",id:"blobFile",accept:r,style:{pointerEvents:"none"},className:"form-control",required:(l==null?void 0:l.filter(g=>g).length)>0})})]}),e.jsxs("div",{className:"btn-group",role:"group","aria-label":"Basic example",children:[e.jsx("button",{type:"button",className:"btn btn-outline-secondary submit--button",onClick:()=>w(),disabled:D.filter(g=>g).length<=0||f||i.state==="submitting",children:D.filter(g=>g).length<=0?"Add images to preview...":"Display Preview"}),e.jsx("button",{disabled:i.state==="submitting"||L||f,className:"submit--button btn btn-outline-primary",children:i.state==="submitting"?"Editing Product...":"Edit Product"})]})]})]}),e.jsxs("div",{className:"preview--container col text-center",children:[e.jsx("h4",{children:"PREVIEW"}),e.jsx("div",{className:"images--preview",children:e.jsx("div",{id:"preview",children:B&&e.jsx("img",{src:B,style:{maxWidth:"100%"}})})})]})]})}async function lt({request:t}){return dt(),null}function dt(){const t=localStorage.getItem("loggedIn");if(t)throw Z("/");return t}async function mt({request:t}){const n=await t.formData(),r=n.get("email"),a=n.get("password");new URL(t.url).searchParams.get("redirectTo");try{const s=await _e(ee,r,a);return Z("/")}catch(s){if(s.message.includes("too-many-requests"))return{message:"Too many failed login attempts. Please try again later.",error:s};if(s.message.includes("invalid-credential"))return{message:"Incorrect email/password. Please check and try again.",error:s}}return null}function ut(){$(),he();const t=$(),n=H();return e.jsxs("div",{className:"signup--container",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{children:"LOGIN"}),e.jsx("div",{children:e.jsx("p",{style:{color:"red",fontSize:"12px",width:"inherit"},children:(t==null?void 0:t.error)&&t.message})}),e.jsxs(G,{method:"post",className:"signup-form",replace:!0,children:[e.jsx("input",{className:"form-control signup--input",type:"text",name:"email",placeholder:"Email Address...",required:!0}),e.jsx("input",{className:"form-control signup--input",type:"password",name:"password",placeholder:"Password...",required:!0}),e.jsx("button",{disabled:n.state==="submitting",className:"submit--button login-button",children:n.state==="submitting"?"Logging in...":"Login"})]})]}),e.jsx(e.Fragment,{children:e.jsx("img",{src:"../../login-page.jpg",style:{maxHeight:"70vh"}})})]})}function ne(){return e.jsxs("div",{className:"not-found-container",children:[e.jsx("h1",{children:"Sorry, the page you were looking for was not found."}),e.jsx(ie,{to:"/",className:"link-button",children:"Return to Home"})]})}function ht(){return e.jsx(e.Fragment,{children:e.jsx(me,{})})}function pt(){return e.jsx(e.Fragment,{children:e.jsx("div",{children:"EXPORT FUNCTION!"})})}async function gt({request:t,params:n}){return null}async function ft({request:t}){const r=(await t.formData()).get("brands");try{if(await Ke({brand:r}))return 200}catch(a){throw new Error(a.message)}finally{return null}}function xt(t){const r=[...new Set(t.map(a=>a.brand))].filter(a=>a).map(a=>e.jsx("option",{value:a,children:a},a));return e.jsx(e.Fragment,{children:r})}function bt(){const t=ue();$();const n=H(),[r,a]=m.useState(""),s=xt(t);function i(o){a(c=>(c=o.target.value,c))}return e.jsxs("div",{className:"product",children:[e.jsx("h3",{className:"text-center",children:"Bulk Delete Products"}),e.jsx("div",{className:"product--container",children:e.jsxs(G,{method:"post",className:"products--form",encType:"multipart/form-data",replace:!0,onSubmit:()=>confirm("Are you sure you want to delete data of this brand?"),children:[e.jsxs("div",{className:"mb-1",children:[e.jsxs("div",{className:"input-group mb-1",children:[e.jsx("span",{className:"input-group-text",id:"brand--name",children:"Brand"}),e.jsxs("select",{className:"form-control product--input",name:"brands",id:"brands",onChange:o=>i(o),value:r,children:[e.jsx("option",{value:"",children:"- Select -"}),s]})]}),e.jsx("div",{className:"form-text d-flex align-items-start px-1",id:"basic-addon4",children:"Brand to delete Bulk data."})]}),e.jsx("button",{disabled:n.state==="submitting",className:"submit--button btn btn-outline-primary",children:n.state==="submitting"?"Deleting Product...":"Delete Product"})]})})]})}async function jt({request:t}){const n=new URL(t.url).searchParams,r=n.get("brand"),a=n.get("model");if(r&&a)try{const s=await He(r,a);return console.log(s),s}catch(s){throw new Error(s.message)}else return null}function wt({brandProp:t,modelProp:n}){const r=he(),[a,s]=re();return a.get("brand"),a.get("model"),m.useEffect(()=>{document.getElementsByTagName("html")[0].style.overflowY="scroll"}),e.jsx("img",{src:r,alt:"new",style:{maxWidth:"100%"}})}function vt(){m.useEffect(()=>Fe(ee,r=>{r?localStorage.setItem("loggedIn",!0):localStorage.clear()}),[]);const t=ve(Ue(e.jsxs(A,{path:"/",element:e.jsx(ht,{}),children:[e.jsxs(A,{element:e.jsx(nt,{}),loader:st,errorElement:e.jsx(ne,{}),children:[e.jsx(A,{index:!0,element:e.jsx(rt,{}),action:at}),e.jsx(A,{path:"delete",element:e.jsx(bt,{}),loader:gt,action:ft}),e.jsx(A,{path:"edit/:id",element:e.jsx(ct,{}),loader:it,action:ot})]}),e.jsx(A,{path:"*",element:e.jsx(ne,{})}),e.jsx(A,{path:"images",loader:jt,element:e.jsx(wt,{})}),e.jsx(A,{path:"login",element:e.jsx(ut,{}),loader:lt,action:mt}),e.jsx(A,{path:"export",element:e.jsx(pt,{})})]})));return e.jsx(Ne,{router:t})}je.createRoot(document.getElementById("root")).render(e.jsx(ae.StrictMode,{children:e.jsx(vt,{})}));
