(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{4447:function(e,n,r){Promise.resolve().then(r.bind(r,3979))},3979:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return i}});var t=r(7437),l=function(e){let{jsonData:n,parentCallback:r}=e,l=n.nodes,s=null==l?void 0:l.map(e=>(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{children:["Node: ",e.id]}),(0,t.jsxs)("p",{children:["Group: ",e.group]})]},e.id));return(0,t.jsxs)("section",{children:[(0,t.jsxs)("section",{className:"border-4 border-red-800 py-3 w-svw",children:["Menu bar section",(0,t.jsx)("div",{className:"float-right border-4 border-red-600  hover:animate-bounce",children:(0,t.jsx)("button",{onClick:function(){r(void 0)},children:"Go Back"})})]}),(0,t.jsx)("h2",{children:"Canvas"}),s]})},s=r(2265);function o(e){let{validationTypeFromParent:n,parentCallback:r}=e,[l,o]=(0,s.useState)(!1),i=(0,s.useRef)(null),[a,c]=(0,s.useState)([]),[d,u]=(0,s.useState)("");async function p(){let e=function(e,n){var r;return r="SpringBeanJson"===n?0===e.length?{isValid:!1,errorMessage:"No file provided"}:e.length>1?{isValid:!1,errorMessage:"More than one file provided"}:"application/json"!==e[0].type?{isValid:!1,errorMessage:"The file is not a JSON"}:{isValid:!0}:{isValid:!1,errorMessage:"Invalid validation type"}}(a,n);if(e.isValid){var t=await f(a[0]);console.log(t),r(t)}else c([]),u(e.errorMessage)}let f=async e=>{let n=new FileReader;return new Promise((r,t)=>{n.onload=e=>{var n;let l=null===(n=e.target)||void 0===n?void 0:n.result;try{let e=JSON.parse(l);r(e)}catch(e){console.error("Error parsing JSON:",e),t(e)}},n.onerror=e=>{console.error("Error reading file:",e),t(e)},n.readAsText(e)})};return(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,t.jsxs)("form",{className:"".concat(l?"bg-blue-400":"bg-blue-100","  p-8 w-2/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center \n          hover:bg-blue-200 hover:animate-pulse"),onDragEnter:function(e){e.preventDefault(),e.stopPropagation(),o(!0)},onSubmit:e=>e.preventDefault(),onDrop:function(e){var n;if(e.preventDefault(),e.stopPropagation(),o(!1),(null===(n=e.dataTransfer)||void 0===n?void 0:n.files)&&e.dataTransfer.files[0])for(let n=0;n<e.dataTransfer.files.length;n++)c(r=>{var t;return[...r,null===(t=e.dataTransfer)||void 0===t?void 0:t.files[n]]})},onDragLeave:function(e){e.preventDefault(),e.stopPropagation(),o(!1)},onDragOver:function(e){e.preventDefault(),e.stopPropagation(),o(!0)},children:[(0,t.jsx)("input",{placeholder:"fileInput",className:"hidden",ref:i,type:"file",multiple:!1,onChange:function(e){if(e.preventDefault(),console.log("File has been added"),u(""),e.target.files&&e.target.files[0]){console.log(e.target.files);for(let n=0;n<e.target.files.length;n++)c(r=>[...r,e.target.files[n]])}},accept:".json"}),(0,t.jsx)("p",{onClick:function(){i.current.value="",i.current.click()},children:"Drag & Drop files or Select files to upload"})]}),(0,t.jsx)("button",{className:"bg-teal-600 rounded-lg p-5 mt-3 w-auto",onClick:p,children:(0,t.jsx)("span",{className:"p-2 text-white",children:"Process"})}),(null==d?void 0:d.length)==0?null:(0,t.jsx)("div",{className:"bg-red-700 text-white opacity-50 rounded-xl p-2 mt-3 w-auto",children:d}),a.map((e,n)=>(0,t.jsxs)("div",{className:"flex flex-row space-x-5",children:[(0,t.jsx)("span",{children:e.name}),(0,t.jsx)("span",{className:"text-red-500 cursor-pointer",onClick:()=>(function(e,n){let r=[...a];r.splice(n,1),c([]),c(r),u("")})(e.name,n),children:"remove"})]},n))]})}function i(){let[e,n]=(0,s.useState)(0),[r]=(0,s.useState)("SpringBeanJson"),[i,a]=(0,s.useState)();return(0,t.jsxs)("main",{className:"flex flex-col border-8 border-blue-500",children:[(0,t.jsxs)("section",{className:"border-8 border-red-500 text-center items-center",children:["Visualize your spring dependencies",(0,t.jsx)("h1",{children:"data gogg - check not getting applied"})]}),void 0===i?(0,t.jsx)("section",{className:"border-8 border-red-300 max-w-lg p-3",children:(0,t.jsx)(o,{validationTypeFromParent:r,parentCallback:e=>{console.log("inside page callback"),console.log(e),a(e)}})}):(0,t.jsx)("section",{children:(0,t.jsx)(l,{jsonData:i,parentCallback:e=>{console.log("inside page callback"),console.log(e),a(e)}})}),(0,t.jsx)("section",{className:"border-8 border-red-400 p-2",children:(0,t.jsxs)("div",{className:"text-center items-center",children:[(0,t.jsxs)("p",{children:["Click counter - You clicked ",e," times"]}),(0,t.jsx)("button",{onClick:()=>n(e+1),children:"Click me"})]})})]})}}},function(e){e.O(0,[971,69,744],function(){return e(e.s=4447)}),_N_E=e.O()}]);