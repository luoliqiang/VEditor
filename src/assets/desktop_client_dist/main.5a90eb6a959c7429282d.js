!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=37)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(3),o=n(12);t.exports=n(4)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(10),o=n(29),i=n(16),u=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){t.exports=!n(11)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(48),o=n(15);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(20)("wks"),o=n(13),i=n(0).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=!0},function(t,e,n){var r=n(8);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(8);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports={}},function(t,e,n){var r=n(33),o=n(21);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(20)("keys"),o=n(13);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(7),o=n(0),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(9)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(3).f,o=n(1),i=n(6)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){e.f=n(6)},function(t,e,n){var r=n(0),o=n(7),i=n(9),u=n(23),c=n(3).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||c(e,t,{value:u.f(t)})}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){t.exports={default:n(38),__esModule:!0}},function(t,e,n){"use strict";var r=n(9),o=n(28),i=n(31),u=n(2),c=n(17),a=n(46),s=n(22),f=n(53),l=n(6)("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,h,m,y,v){a(n,e,h);var b,g,_,w=function(t){if(!p&&t in O)return O[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",x="values"==m,k=!1,O=t.prototype,I=O[l]||O["@@iterator"]||m&&O[m],A=I||w(m),M=m?x?w("entries"):A:void 0,D="Array"==e&&O.entries||I;if(D&&(_=f(D.call(new t)))!==Object.prototype&&_.next&&(s(_,S,!0),r||"function"==typeof _[l]||u(_,l,d)),x&&I&&"values"!==I.name&&(k=!0,A=function(){return I.call(this)}),r&&!v||!p&&!k&&O[l]||u(O,l,A),c[e]=A,c[S]=d,m)if(b={values:x?A:w("values"),keys:y?A:w("keys"),entries:M},v)for(g in b)g in O||i(O,g,b[g]);else o(o.P+o.F*(p||k),e,b);return b}},function(t,e,n){var r=n(0),o=n(7),i=n(44),u=n(2),c=n(1),a=function(t,e,n){var s,f,l,p=t&a.F,d=t&a.G,h=t&a.S,m=t&a.P,y=t&a.B,v=t&a.W,b=d?o:o[e]||(o[e]={}),g=b.prototype,_=d?r:h?r[e]:(r[e]||{}).prototype;for(s in d&&(n=e),n)(f=!p&&_&&void 0!==_[s])&&c(b,s)||(l=f?_[s]:n[s],b[s]=d&&"function"!=typeof _[s]?n[s]:y&&f?i(l,r):v&&_[s]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):m&&"function"==typeof l?i(Function.call,l):l,m&&((b.virtual||(b.virtual={}))[s]=l,t&a.R&&g&&!g[s]&&u(g,s,l)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){t.exports=!n(4)&&!n(11)(function(){return 7!=Object.defineProperty(n(30)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(8),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=n(2)},function(t,e,n){var r=n(10),o=n(47),i=n(21),u=n(19)("IE_PROTO"),c=function(){},a=function(){var t,e=n(30)("iframe"),r=i.length;for(e.style.display="none",n(52).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[i[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(c.prototype=r(t),n=new c,c.prototype=null,n[u]=t):n=a(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(1),o=n(5),i=n(49)(!1),u=n(19)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),a=0,s=[];for(n in c)n!=u&&r(c,n)&&s.push(n);for(;e.length>a;)r(c,n=e[a++])&&(~i(s,n)||s.push(n));return s}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(33),o=n(21).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){"use strict";var r=u(n(26)),o=u(n(39));n(70);var i=u(n(71));function u(t){return t&&t.__esModule?t:{default:t}}!function(t){var e;try{e=new Function("return "+INIT_DATA+";")()}catch(t){console.log(t)}var n=t.web_handler,u=[{id:"t",name:"剪切(T)",key:"Ctrl+X",menu_id:"cut"},{id:"c",name:"复制(C)",key:"Ctrl+C",menu_id:"copy"},{id:"d",name:"删除(D)",key:"Del",menu_id:"delete"},{id:"m",name:"重命名(M)",key:"F2",menu_id:"rename"},{id:"r",name:"属性(R)",key:"",menu_id:"property"}],c=[{id:"a",name:"添加到压缩文件...(A)",key:"",menu_id:"zip_to"},{id:"e",name:"添加到 __NAME__.rar(E)",key:"",menu_id:"zip_to_file"}],a=[{id:"a",name:"解压文件...(A)",key:"",menu_id:"unzip_to"},{id:"x",name:"解压到当前文件夹(X)...",key:"",menu_id:"unzip_to_current"},{id:"e",name:"解压到 __NAME__\\ (E)",key:"",menu_id:"unzip_to_folder"}],s={findIconsItem:function(t){var e=m.blocks.download;return e.vScrollData?_.find(e.vScrollData,function(e){return e.id===t}):!!e.pageData&&_.find(e.pageData,function(e){return e.id===t})},findIconsSed:function(){return this.findIconsItem(m.currentSelected)},shortcutStart:function(t){var e=this.findIconsSed();e&&t&&(m.menu.show=!1,i.default.menuApp(e.id,t))},shortcutKeyStart:function(t){},renameItem:function(t,e){var n=this.findIconsItem(t);if(!n)return i.default.log("图标名称为空或没有可重命名的图标");m.currentRename=n.id;var r=/\.[^\.]+/.exec(n.text);setTimeout(function(){var e=$("#js-ico-"+t).find("textarea")[0],o=r&&r.index?r.index:n.text.length;e.setSelectionRange(0,o),e.focus()},10)},selectIconsItem:function(t){m.currentSelected=t},replaceZipName:function(t,e){var n=[];t.length>10&&(t=t.substr(0,10)+"...");for(var r=0,o=e.length;r<o;r++)n.push(e[r]),n[r].name=n[r].name.replace(/__NAME__/,t);return n},getWindowXY:function(){var t=$("body");return{w:t.width(),h:t.height()}},getMenuXY:function(){var t=$(".m-menu");return{w:t.width(),h:t.height()}},setMenuXY:function(t,e){var n=0,r=this.getMenuXY(),o=this.getWindowXY();o.h,r.h,o.w,r.w;return n=e+r.h>o.h?e-(e+r.h-o.h)+40:e,{x:t+r.w>o.w?t-r.w:t,y:n}}},f={disable_in_input:!0};shortcut.add("Ctrl+V",function(){m.menu.show=!1,i.default.menuApp("","paste")},f),shortcut.add("Ctrl+X",function(){s.shortcutStart("cut")},f),shortcut.add("Ctrl+C",function(){s.shortcutStart("copy")},f),shortcut.add("Delete",function(){s.shortcutStart("delete")},f),shortcut.add("F2",function(){var t=s.findIconsSed();t&&(m.menu.show=!1,s.renameItem(t.id,"rename"))},f),shortcut.add("A",function(){s.shortcutKeyStart("a")},f),shortcut.add("X",function(){s.shortcutKeyStart("x")},f),shortcut.add("E",function(){s.shortcutKeyStart("e")},f),shortcut.add("T",function(){s.shortcutKeyStart("t")},f),shortcut.add("C",function(){s.shortcutKeyStart("c")},f),shortcut.add("D",function(){s.shortcutKeyStart("d")},f),shortcut.add("M",function(){s.shortcutKeyStart("m")},f),shortcut.add("R",function(){s.shortcutKeyStart("r")},f),shortcut.add("P",function(){s.shortcutKeyStart("p")},f);var l=[];function p(t){var e=t.icons.length,n=Number(t.iconSize)+35+16,r=h.indexOf(Number(t.skin))<0?t.height-40-10:t.height-10,o=Math.floor(r/n)||1;if(t.pageCounts=Math.ceil(e/(o*t.rowNum)),d.indexOf(t.skin)>=0){var i=o*t.rowNum;t.pageData=_.chunk(t.icons,i)}else t.vScrollData=t.icons;return t}var d=[5,6,7,8],h=[-1,3,6,7,8],m=new Vue({el:"#js-template",data:{skinTypeSlide:d,skinTypeNoTitle:h,icos:[],currentSelected:"",currentRename:"",blocks:[],blockProp:[],listStyle:[],localIcons:[],menu:{show:!1,style:{top:0,left:0},list:[]}},methods:{startApp:function(t){switch(t.iconsType){case"gamemenu":n.startAppByConfig((0,r.default)(t));break;case"windows":n.startAppByLocalName(t.name);break;case"builtIn":n.openUrl(t.url);break;case"desktop":n.startAppByLocalName(t.text);break;case"customIconList":n.startAppByLocalPath(t.app_path);break;case"self":n.on_click(String(t.id));break;default:n.startAppByLocalId(t.id)}},selectApp:function(t){try{n.ondragStart((0,r.default)(t))}catch(t){i.default.log(t.message)}},showMenu:function(t){this.menu.style.top="-9999px",this.menu.style.left="-9999px",this.menu.show=!0;var e=s.setMenuXY(t.pageX,t.pageY);this.menu.style.top=e.y+"px",this.menu.style.left=e.x+"px"},mouseDesktop:function(t){var e=this;setTimeout(function(){e.currentSelected="",e.currentRename="",e.menu.show=!1},5)},selectMenuItem:function(t){var e=s.findIconsSed(),n="";e&&(n=e.id),"rename"===t?s.renameItem(n,t):(i.default.menuApp(n,t),s.selectIconsItem(0)),this.menu.show=!1},mouseApp:function(t,e){if(2===e.button){var n=s.findIconsItem(t);if(!n)return void i.default.log("没有找到该图标id："+t);0===n.zip_type?this.menu.list=i.default.mergeArr(s.replaceZipName(n.text,c),u):1===n.zip_type?this.menu.list=i.default.mergeArr(s.replaceZipName(n.text,a),u):2===n.zip_type&&(this.menu.list=u),s.selectIconsItem(t),this.showMenu(e)}else 0===e.button&&(this.menu.show=!1,this.currentRename="",s.selectIconsItem(t));e.stopPropagation()},renameItem:function(t,e){s.renameItem(0),i.default.menuApp(t,"rename",e)},renameEnterItem:function(t,e){t.target.blur()},initData:function(){this.blocks=function(t){for(var e,n={},r=0;r<t.length;r++){var i=t[r].iconSize?t[r].iconSize.split("*")[0]:48,u=t[r].width-20,c=Math.floor(t[r].width/i/1.5)||1,a=Math.floor(u/c),s=c*a;t[r].liWidth=a,t[r].title=decodeURIComponent(t[r].title),t[r].listWidth=s,t[r].iconSize=i,t[r].rowNum=c,"module-downloadArea"===t[r].name&&(t[r].skin=101),t[r].skinClass="skin-"+t[r].skin,t[r].currentPageNo=1,t[r].icons=(e=t[r].icons,_.map(e,function(t){return"customIconList"===t.iconsType&&"0"===t.icon_type&&t.app_path&&l.push(t),t=_.mapObject(t,function(t,e){var n=decodeURIComponent(t);return"object"===(void 0===t?"undefined":(0,o.default)(t))&&(n=_.mapObject(t,function(t,e){return decodeURIComponent(t)})),n})})),t[r]=p(t[r]);var f=r;"module-origin"===t[r].name&&(f="origin"),"module-downloadArea"===t[r].name&&(f="download"),n[f]=t[r]}return n}(e)},getCustomLocalFiles:function(){l.length&&_.each(l,function(t){var e;if(0===t.app_path.indexOf("http://")||0===t.app_path.indexOf("https://")){var r=t.app_path.split("/");e=r[0]+"//"+r[2]}else e=n.getFileIcon(decodeURIComponent(t.app_path));for(var o in m.blocks)m.blocks.hasOwnProperty(o)&&"download"!==o&&"origin"!==o&&(m.blocks[o]&&m.blocks[o].vScrollData&&m.$set(m.blocks[o],"vScrollData",_.each(m.blocks[o].vScrollData,function(n){n.id===t.id&&(n.img=e)})),m.blocks[o]&&m.blocks[o].pageData&&m.$set(m.blocks[o],"pageData",_.each(m.blocks[o].pageData,function(n){n.id===t.id&&(n.img=e)})))})}},mounted:function(){var t=this;this.initData(),setTimeout(function(){t.getCustomLocalFiles()},1e3);try{n&&n.loadFinished()}catch(t){console.log(t)}}});t.AddButton=function(t){"string"==typeof t&&(t=new Function("return "+t+";")()),fundebug.notify("AddButton",(0,r.default)(t));var e=t.new_item?"download":"origin";if(m.blocks[e]){var n=m.skinTypeSlide.indexOf(m.blocks[e].skin)>=0?"pageData":"vScrollData",o=m.blocks[e][n],i=_.chain(o).union(t.add_button).uniq(function(t,e,n){return t.id}).map(function(t){return t.iconId=t.id,t.iconType="self",t}).value();if("origin"===e&&m.blocks.origin.forbidedIcons){var u=_.pluck(m.blocks.origin.forbidedIcons,"id"),c=_.union(["brower_menu","center_left_top"],u);i=_.filter(i,function(t){return c.indexOf(t.id)<0});for(var a,s=[],f=0;f<m.blocks.origin.forbidedIcons.length;f++)a=m.blocks.origin.forbidedIcons[f],s.push(a.name||a.text||a.app_name||a.barIconValue);i=_.filter(i,function(t){return s.indexOf(t.text)<0})}var l=_.clone(m.blocks[e]);l.icons=i,m.$set(m.blocks,e,p(l))}},t.RemoveButton=function(t){if(t)for(var e in m.blocks)!m.blocks.hasOwnProperty(e)||"download"!==e&&"origin"!==e||(m.blocks[e].vScrollData&&m.$set(m.blocks[e],"vScrollData",_.filter(m.blocks[e].vScrollData,function(e){return e.id!==t})),m.blocks[e].pageData&&m.$set(m.blocks[e],"pageData",_.filter(m.blocks[e].pageData,function(e){return e.id!==t})));else i.default.log("ID不合法[window.RemoveButton].")},t.UpdateButton=function(t){if("string"==typeof t&&(t=new Function("return "+t+";")()),fundebug.notify("UpdateButton",(0,r.default)(t)),t.update_item&&""!==t.update_item.img)for(var e in m.blocks)!m.blocks.hasOwnProperty(e)||"download"!==e&&"origin"!==e||(m.blocks[e].vScrollData&&m.$set(m.blocks[e],"vScrollData",_.each(m.blocks[e].vScrollData,function(e){e.id===t.update_item.id&&(e.text=t.update_item.text,e.img=t.update_item.img)})),m.blocks[e].pageData&&m.$set(m.blocks[e],"pageData",_.each(m.blocks[e].pageData,function(e){e.id===t.update_item.id&&(e.text=t.update_item.text,e.img=t.update_item.img)})))},t.SetRename=function(t){t&&s.renameItem(t,"rename")},document.onkeydown=function(){if(27===t.event.keyCode||116===t.event.keyCode)return t.event.returnValue=!1,!1},document.body.oncontextmenu=function(){return!1},document.body.ondragstart=function(){return!1},document.body.onselectstart=function(){return!1},document.body.onbeforecopy=function(){return!1},document.body.oncopy=function(){document.selection.empty()}}(window)},function(t,e,n){var r=n(7),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){"use strict";e.__esModule=!0;var r=u(n(40)),o=u(n(59)),i="function"==typeof o.default&&"symbol"==typeof r.default?function(t){return typeof t}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":typeof t};function u(t){return t&&t.__esModule?t:{default:t}}e.default="function"==typeof o.default&&"symbol"===i(r.default)?function(t){return void 0===t?"undefined":i(t)}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":void 0===t?"undefined":i(t)}},function(t,e,n){t.exports={default:n(41),__esModule:!0}},function(t,e,n){n(42),n(55),t.exports=n(23).f("iterator")},function(t,e,n){"use strict";var r=n(43)(!0);n(27)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(14),o=n(15);t.exports=function(t){return function(e,n){var i,u,c=String(o(e)),a=r(n),s=c.length;return a<0||a>=s?t?"":void 0:(i=c.charCodeAt(a))<55296||i>56319||a+1===s||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536}}},function(t,e,n){var r=n(45);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){"use strict";var r=n(32),o=n(12),i=n(22),u={};n(2)(u,n(6)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(3),o=n(10),i=n(18);t.exports=n(4)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),c=u.length,a=0;c>a;)r.f(t,n=u[a++],e[n]);return t}},function(t,e,n){var r=n(34);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(5),o=n(50),i=n(51);t.exports=function(t){return function(e,n,u){var c,a=r(e),s=o(a.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if((c=a[f++])!=c)return!0}else for(;s>f;f++)if((t||f in a)&&a[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(14),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(14),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(0).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(1),o=n(54),i=n(19)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(15);t.exports=function(t){return Object(r(t))}},function(t,e,n){n(56);for(var r=n(0),o=n(2),i=n(17),u=n(6)("toStringTag"),c="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),a=0;a<c.length;a++){var s=c[a],f=r[s],l=f&&f.prototype;l&&!l[u]&&o(l,u,s),i[s]=i.Array}},function(t,e,n){"use strict";var r=n(57),o=n(58),i=n(17),u=n(5);t.exports=n(27)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports={default:n(60),__esModule:!0}},function(t,e,n){n(61),n(67),n(68),n(69),t.exports=n(7).Symbol},function(t,e,n){"use strict";var r=n(0),o=n(1),i=n(4),u=n(28),c=n(31),a=n(62).KEY,s=n(11),f=n(20),l=n(22),p=n(13),d=n(6),h=n(23),m=n(24),y=n(63),v=n(64),b=n(10),g=n(8),_=n(5),w=n(16),S=n(12),x=n(32),k=n(65),O=n(66),I=n(3),A=n(18),M=O.f,D=I.f,P=k.f,j=r.Symbol,T=r.JSON,E=T&&T.stringify,L=d("_hidden"),N=d("toPrimitive"),C={}.propertyIsEnumerable,F=f("symbol-registry"),R=f("symbols"),B=f("op-symbols"),z=Object.prototype,K="function"==typeof j,U=r.QObject,V=!U||!U.prototype||!U.prototype.findChild,X=i&&s(function(){return 7!=x(D({},"a",{get:function(){return D(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=M(z,e);r&&delete z[e],D(t,e,n),r&&t!==z&&D(z,e,r)}:D,W=function(t){var e=R[t]=x(j.prototype);return e._k=t,e},$=K&&"symbol"==typeof j.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof j},G=function(t,e,n){return t===z&&G(B,e,n),b(t),e=w(e,!0),b(n),o(R,e)?(n.enumerable?(o(t,L)&&t[L][e]&&(t[L][e]=!1),n=x(n,{enumerable:S(0,!1)})):(o(t,L)||D(t,L,S(1,{})),t[L][e]=!0),X(t,e,n)):D(t,e,n)},Y=function(t,e){b(t);for(var n,r=y(e=_(e)),o=0,i=r.length;i>o;)G(t,n=r[o++],e[n]);return t},J=function(t){var e=C.call(this,t=w(t,!0));return!(this===z&&o(R,t)&&!o(B,t))&&(!(e||!o(this,t)||!o(R,t)||o(this,L)&&this[L][t])||e)},H=function(t,e){if(t=_(t),e=w(e,!0),t!==z||!o(R,e)||o(B,e)){var n=M(t,e);return!n||!o(R,e)||o(t,L)&&t[L][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=P(_(t)),r=[],i=0;n.length>i;)o(R,e=n[i++])||e==L||e==a||r.push(e);return r},q=function(t){for(var e,n=t===z,r=P(n?B:_(t)),i=[],u=0;r.length>u;)!o(R,e=r[u++])||n&&!o(z,e)||i.push(R[e]);return i};K||(c((j=function(){if(this instanceof j)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===z&&e.call(B,n),o(this,L)&&o(this[L],t)&&(this[L][t]=!1),X(this,t,S(1,n))};return i&&V&&X(z,t,{configurable:!0,set:e}),W(t)}).prototype,"toString",function(){return this._k}),O.f=H,I.f=G,n(36).f=k.f=Z,n(25).f=J,n(35).f=q,i&&!n(9)&&c(z,"propertyIsEnumerable",J,!0),h.f=function(t){return W(d(t))}),u(u.G+u.W+u.F*!K,{Symbol:j});for(var Q="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Q.length>tt;)d(Q[tt++]);for(var et=A(d.store),nt=0;et.length>nt;)m(et[nt++]);u(u.S+u.F*!K,"Symbol",{for:function(t){return o(F,t+="")?F[t]:F[t]=j(t)},keyFor:function(t){if(!$(t))throw TypeError(t+" is not a symbol!");for(var e in F)if(F[e]===t)return e},useSetter:function(){V=!0},useSimple:function(){V=!1}}),u(u.S+u.F*!K,"Object",{create:function(t,e){return void 0===e?x(t):Y(x(t),e)},defineProperty:G,defineProperties:Y,getOwnPropertyDescriptor:H,getOwnPropertyNames:Z,getOwnPropertySymbols:q}),T&&u(u.S+u.F*(!K||s(function(){var t=j();return"[null]"!=E([t])||"{}"!=E({a:t})||"{}"!=E(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(g(e)||void 0!==t)&&!$(t))return v(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!$(e))return e}),r[1]=e,E.apply(T,r)}}),j.prototype[N]||n(2)(j.prototype,N,j.prototype.valueOf),l(j,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(13)("meta"),o=n(8),i=n(1),u=n(3).f,c=0,a=Object.isExtensible||function(){return!0},s=!n(11)(function(){return a(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++c,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!a(t))return"F";if(!e)return"E";f(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!a(t))return!0;if(!e)return!1;f(t)}return t[r].w},onFreeze:function(t){return s&&l.NEED&&a(t)&&!i(t,r)&&f(t),t}}},function(t,e,n){var r=n(18),o=n(35),i=n(25);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,c=n(t),a=i.f,s=0;c.length>s;)a.call(t,u=c[s++])&&e.push(u);return e}},function(t,e,n){var r=n(34);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(5),o=n(36).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))}},function(t,e,n){var r=n(25),o=n(12),i=n(5),u=n(16),c=n(1),a=n(29),s=Object.getOwnPropertyDescriptor;e.f=n(4)?s:function(t,e){if(t=i(t),e=u(e,!0),a)try{return s(t,e)}catch(t){}if(c(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e){},function(t,e,n){n(24)("asyncIterator")},function(t,e,n){n(24)("observable")},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(26),i=(r=o)&&r.__esModule?r:{default:r};window.web_handler;e.default={log:function(t,e){e=e||"info",t="[桌面FontEnd日志]"+t;web_handler&&void 0!==web_handler.printLog?web_handler.printLog({info:0,warning:1,error:2}[e]||0,t):window.console&&("error"===e&&console.error?console.error(t):console.log&&console.log(t))},openUrl:function(t){this.log("[openUrl]："+t),web_handler&&web_handler.openUrl&&web_handler.openUrl(t)},openAppBox:function(t,e){if(web_handler&&void 0!==web_handler.openAppBox){var n="https://plaza.wxdesk.com"+e;this.log("[跳转]："+n),web_handler.openAppBox(t,n)}else this.startApp(t)},startApp:function(t){this.log("Start App ID："+t),web_handler&&void 0!==web_handler.on_click&&web_handler.on_click(String(t))},menuApp:function(t,e,n){var r={item_id:t,menu_item_id:e,text:n||""};if(r=(0,i.default)(r),this.log("Menu："+r),web_handler&&void 0!==web_handler.on_menu_click)try{web_handler.on_menu_click(r)}catch(t){alert(t.message)}},isFeeMgr:function(){var t=window.desktop_feemgr,e=t&&t.getEnv;if(e){var n=t.getEnv();e=1===n.fee_itg&&"1,2".indexOf(n.fee_type)>=0}return e},mergeArr:function(){return Array.prototype.concat.apply([],arguments)}}}]);