import{Q as D,E as Q}from"./qr.js-8bf59ccc.js";import{p as w}from"./prop-types-a8abeb81.js";import{r as O}from"./react-e2306d96.js";var v={},_={};Object.defineProperty(_,"__esModule",{value:!0});var T=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},P=w,a=x(P),h=O,s=x(h);function x(e){return e&&e.__esModule?e:{default:e}}function E(e,o){var t={};for(var r in e)o.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}var q={bgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,bgD:a.default.string.isRequired,fgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,fgD:a.default.string.isRequired,size:a.default.number.isRequired,title:a.default.string,viewBoxSize:a.default.number.isRequired,xmlns:a.default.string},S={title:void 0,xmlns:"http://www.w3.org/2000/svg"},g=(0,h.forwardRef)(function(e,o){var t=e.bgColor,r=e.bgD,c=e.fgD,C=e.fgColor,d=e.size,p=e.title,n=e.viewBoxSize,u=E(e,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize"]);return s.default.createElement("svg",T({},u,{height:d,ref:o,viewBox:"0 0 "+n+" "+n,width:d}),p?s.default.createElement("title",null,p):null,s.default.createElement("path",{d:r,fill:t}),s.default.createElement("path",{d:c,fill:C}))});g.displayName="QRCodeSvg";g.propTypes=q;g.defaultProps=S;_.default=g;Object.defineProperty(v,"__esModule",{value:!0});v.QRCode=void 0;var $=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},j=D,B=i(j),F=Q,M=i(F),L=w,l=i(L),z=O,N=i(z),W=_,Z=i(W);function i(e){return e&&e.__esModule?e:{default:e}}function A(e,o){var t={};for(var r in e)o.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}var G={bgColor:l.default.oneOfType([l.default.object,l.default.string]),fgColor:l.default.oneOfType([l.default.object,l.default.string]),level:l.default.string,size:l.default.number,value:l.default.string.isRequired},H={bgColor:"#FFFFFF",fgColor:"#000000",level:"L",size:256},f=(0,z.forwardRef)(function(e,o){var t=e.bgColor,r=e.fgColor,c=e.level,C=e.size,d=e.value,p=A(e,["bgColor","fgColor","level","size","value"]),n=new B.default(-1,M.default[c]);n.addData(d),n.make();var u=n.modules;return N.default.createElement(Z.default,$({},p,{bgColor:t,bgD:u.map(function(m,b){return m.map(function(R,y){return R?"":"M "+y+" "+b+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:r,fgD:u.map(function(m,b){return m.map(function(R,y){return R?"M "+y+" "+b+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:o,size:C,viewBoxSize:u.length}))});v.QRCode=f;f.displayName="QRCode";f.propTypes=G;f.defaultProps=H;var U=v.default=f;export{U as _};
