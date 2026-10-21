 
 
 (function(){'use strict';var e={"class":"className",contenteditable:"contentEditable","for":"htmlFor",readonly:"readOnly",maxlength:"maxLength",tabindex:"tabIndex",colspan:"colSpan",rowspan:"rowSpan",usemap:"useMap"};function aa(a,b){try{return a(b)}catch(c){return b}}var k=document,m=window,ba=k.documentElement,n=k.createElement.bind(k),ca=n("div"),p=n("table"),da=n("tbody"),ea=n("tr"),q=Array.isArray,r=Array.prototype,fa=r.concat,t=r.filter,ha=r.indexOf,ia=r.map,ja=r.push,ka=r.slice,u=r.some,la=r.splice,ma=/^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,na=/^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,oa=/<.+>/,pa=/^\w+$/;function v(a,b){return a&&(w(b)||x(b))?na.test(a)?b.getElementsByClassName(a.slice(1)):pa.test(a)?b.getElementsByTagName(a):b.querySelectorAll(a):[]}var B=function(){function a(a,c){if(a){if(a instanceof B)return a;var b=a;if(C(a)){if(b=(c instanceof B?c[0]:c)||k,b=ma.test(a)?b.getElementById(a.slice(1)):oa.test(a)?qa(a):v(a,b),!b)return}else if(D(a))return this.ready(a);if(b.nodeType||b===m)b=[b];this.length=b.length;a=0;for(c=this.length;a<c;a++)this[a]=b[a]}}a.prototype.init=function(b,c){return new a(b,c)};return a}(),E=B.prototype,F=E.init;F.fn=F.prototype=E;E.length=0;E.splice=la;"function"===typeof Symbol&&(E[Symbol.iterator]=r[Symbol.iterator]);E.map=function(a){return F(fa.apply([],ia.call(this,function(b,c){return a.call(b,c,b)})))};E.slice=function(a,b){return F(ka.call(this,a,b))};var ra=/-([a-z])/g;function G(a){return a.replace(ra,function(a,c){return c.toUpperCase()})}F.guid=1;function sa(a,b){var c=a&&(a.matches||a.webkitMatchesSelector||a.msMatchesSelector);return!!c&&!!b&&c.call(a,b)}function H(a){return!!a&&a===a.window}function w(a){return!!a&&9===a.nodeType}function x(a){return!!a&&1===a.nodeType}function D(a){return"function"===typeof a}function C(a){return"string"===typeof a}function ta(a){return!isNaN(parseFloat(a))&&isFinite(a)}function I(a){if("object"!==typeof a||null===a)return!1;a=Object.getPrototypeOf(a);return null===a||a===Object.prototype}F.isWindow=H;F.isFunction=D;F.isArray=q;F.isNumeric=ta;F.isPlainObject=I;E.get=function(a){if(void 0===a)return ka.call(this);a=Number(a);return this[0>a?a+this.length:a]};E.eq=function(a){return F(this.get(a))};E.first=function(){return this.eq(0)};E.last=function(){return this.eq(-1)};function J(a,b,c){if(c)for(c=a.length;c--&&!1!==b.call(a[c],c,a[c]););else if(I(a)){var d=Object.keys(a);c=0;for(var h=d.length;c<h;c++){var f=d[c];if(!1===b.call(a[f],f,a[f]))break}}else for(c=0,h=a.length;c<h&&!1!==b.call(a[c],c,a[c]);c++);return a}F.each=J;E.each=function(a){return J(this,a)};E.prop=function(a,b){if(a){if(C(a))return a=e[a]||a,2>arguments.length?this[0]&&this[0][a]:this.each(function(c,h){h[a]=b});for(var c in a)this.prop(c,a[c]);return this}};E.removeProp=function(a){return this.each(function(b,c){delete c[e[a]||a]})};function K(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];b="boolean"===typeof a[0]?a.shift():!1;var c=a.shift(),d=a.length;if(!c)return{};if(!d)return K(b,F,c);for(var h=0;h<d;h++){var f=a[h],g;for(g in f)b&&(q(f[g])||I(f[g]))?(c[g]&&c[g].constructor===f[g].constructor||(c[g]=new f[g].constructor),K(b,c[g],f[g])):c[g]=f[g]}return c}F.extend=K;E.extend=function(a){return K(E,a)};function L(a){return C(a)?function(b,c){return sa(c,a)}:D(a)?a:a instanceof B?function(b,c){return a.is(c)}:a?function(b,c){return c===a}:function(){return!1}}E.filter=function(a){var b=L(a);return F(t.call(this,function(a,d){return b.call(a,d,a)}))};function M(a,b){return b?a.filter(b):a}var ua=/\S+/g;function N(a){return C(a)?a.match(ua)||[]:[]}E.hasClass=function(a){return!!a&&u.call(this,function(b){return x(b)&&b.classList.contains(a)})};E.removeAttr=function(a){var b=N(a);return this.each(function(a,d){x(d)&&J(b,function(a,b){d.removeAttribute(b)})})};E.attr=function(a,b){if(a){if(C(a)){if(2>arguments.length){if(!this[0]||!x(this[0]))return;var c=this[0].getAttribute(a);return null===c?void 0:c}return void 0===b?this:null===b?this.removeAttr(a):this.each(function(c,h){x(h)&&h.setAttribute(a,b)})}for(c in a)this.attr(c,a[c]);return this}};E.toggleClass=function(a,b){var c=N(a),d=void 0!==b;return this.each(function(a,f){x(f)&&J(c,function(a,c){d?b?f.classList.add(c):f.classList.remove(c):f.classList.toggle(c)})})};E.addClass=function(a){return this.toggleClass(a,!0)};E.removeClass=function(a){return arguments.length?this.toggleClass(a,!1):this.attr("class","")};function O(a,b,c,d){for(var h=[],f=D(b),g=d&&L(d),y=0,z=a.length;y<z;y++)if(f){var l=b(a[y]);l.length&&ja.apply(h,l)}else for(l=a[y][b];!(null==l||d&&g(-1,l));)h.push(l),l=c?l[b]:null;return h}function P(a){return 1<a.length?t.call(a,function(a,c,d){return ha.call(d,a)===c}):a}F.unique=P;E.add=function(a,b){return F(P(this.get().concat(F(a,b).get())))};function Q(a,b,c){if(x(a)){var d=m.getComputedStyle(a,null);return c?d.getPropertyValue(b)||void 0:d[b]||a.style[b]}}function R(a,b){return parseInt(Q(a,b),10)||0}var S=/^--/,T={},va=ca.style,wa=["webkit","moz","ms"];function xa(a,b){void 0===b&&(b=S.test(a));if(b)return a;if(!T[a]){b=G(a);var c=""+b[0].toUpperCase()+b.slice(1);b=(b+" "+wa.join(c+" ")+c).split(" ");J(b,function(b,c){if(c in va)return T[a]=c,!1})}return T[a]}var ya={animationIterationCount:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0};function za(a,b,c){void 0===c&&(c=S.test(a));return c||ya[a]||!ta(b)?b:b+"px"}E.css=function(a,b){if(C(a)){var c=S.test(a);a=xa(a,c);if(2>arguments.length)return this[0]&&Q(this[0],a,c);if(!a)return this;b=za(a,b,c);return this.each(function(d,f){x(f)&&(c?f.style.setProperty(a,b):f.style[a]=b)})}for(var d in a)this.css(d,a[d]);return this};var Aa=/^\s+|\s+$/;function Ba(a,b){a=a.dataset[b]||a.dataset[G(b)];return Aa.test(a)?a:aa(JSON.parse,a)}E.data=function(a,b){if(!a){if(!this[0])return;var c={},d;for(d in this[0].dataset)c[d]=Ba(this[0],d);return c}if(C(a))return 2>arguments.length?this[0]&&Ba(this[0],a):void 0===b?this:this.each(function(c,d){c=b;c=aa(JSON.stringify,c);d.dataset[G(a)]=c});for(d in a)this.data(d,a[d]);return this};function Ca(a,b){var c=a.documentElement;return Math.max(a.body["scroll"+b],c["scroll"+b],a.body["offset"+b],c["offset"+b],c["client"+b])}function Da(a,b){return R(a,"border"+(b?"Left":"Top")+"Width")+R(a,"padding"+(b?"Left":"Top"))+R(a,"padding"+(b?"Right":"Bottom"))+R(a,"border"+(b?"Right":"Bottom")+"Width")}J([!0,!1],function(a,b){J(["Width","Height"],function(a,d){E[(b?"outer":"inner")+d]=function(c){if(this[0])return H(this[0])?b?this[0]["inner"+d]:this[0].document.documentElement["client"+d]:w(this[0])?Ca(this[0],d):this[0][(b?"offset":"client")+d]+(c&&b?R(this[0],"margin"+(a?"Top":"Left"))+R(this[0],"margin"+(a?"Bottom":"Right")):0)}})});J(["Width","Height"],function(a,b){var c=b.toLowerCase();E[c]=function(d){if(!this[0])return void 0===d?void 0:this;if(!arguments.length)return H(this[0])?this[0].document.documentElement["client"+b]:w(this[0])?Ca(this[0],b):this[0].getBoundingClientRect()[c]-Da(this[0],!a);var h=parseInt(d,10);return this.each(function(b,d){x(d)&&(b=Q(d,"boxSizing"),d.style[c]=za(c,h+("border-box"===b?Da(d,!a):0)))})}});var U={};E.toggle=function(a){return this.each(function(b,c){if(x(c))if(void 0===a?"none"===Q(c,"display"):a){if(c.style.display=c.___cd||"","none"===Q(c,"display")){b=c.style;c=c.tagName;if(U[c])c=U[c];else{var d=n(c);k.body.insertBefore(d,null);var h=Q(d,"display");k.body.removeChild(d);c=U[c]="none"!==h?h:"block"}b.display=c}}else c.___cd=Q(c,"display"),c.style.display="none"})};E.hide=function(){return this.toggle(!1)};E.show=function(){return this.toggle(!0)};function Ea(a,b){return!b||!u.call(b,function(b){return 0>a.indexOf(b)})}var V={focus:"focusin",blur:"focusout"},W={mouseenter:"mouseover",mouseleave:"mouseout"},Fa=/^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;function Ga(a,b,c,d,h){var f=a.___ce=a.___ce||{};f[b]=f[b]||[];f[b].push([c,d,h]);a.addEventListener(b,h)}function X(a){a=a.split(".");return[a[0],a.slice(1).sort()]}function Y(a,b,c,d,h){var f=a.___ce=a.___ce||{};if(b)f[b]&&(f[b]=f[b].filter(function(f){var g=f[0],z=f[1];f=f[2];if(h&&f.guid!==h.guid||!Ea(g,c)||d&&d!==z)return!0;a.removeEventListener(b,f)}));else for(b in f)Y(a,b,c,d,h)}E.off=function(a,b,c){var d=this;if(void 0===a)this.each(function(a,b){(x(b)||w(b)||H(b))&&Y(b)});else if(C(a))D(b)&&(c=b,b=""),J(N(a),function(a,h){a=X(h);h=a[0];var f=a[1],g=W[h]||V[h]||h;d.each(function(a,d){(x(d)||w(d)||H(d))&&Y(d,g,f,b,c)})});else for(var h in a)this.off(h,a[h]);return this};E.on=function(a,b,c,d,h){var f=this;if(!C(a)){for(var g in a)this.on(g,b,c,a[g],h);return this}C(b)||(void 0!==b&&null!==b&&(void 0!==c&&(d=c),c=b),b="");D(d)||(d=c,c=void 0);if(!d)return this;J(N(a),function(a,g){a=X(g);g=a[0];var l=a[1],z=W[g]||V[g]||g,y=g in W,Ka=g in V;z&&f.each(function(a,f){if(x(f)||w(f)||H(f))a=function La(a){if(a.target["___i"+a.type])return a.stopImmediatePropagation();if(!a.namespace||Ea(l,a.namespace.split(".")))if(b||!(Ka&&(a.target!==f||a.___ot===z)||y&&a.relatedTarget&& f.contains(a.relatedTarget))){var g=f;if(b){for(var A=a.target;!sa(A,b);){if(A===f)return;A=A.parentNode;if(!A)return}g=A;a.___cd=!0}a.___cd&&Object.defineProperty(a,"currentTarget",{configurable:!0,get:function(){return g}});Object.defineProperty(a,"data",{configurable:!0,get:function(){return c}});A=d.call(g,a,a.___td);h&&Y(f,z,l,b,La);!1===A&&(a.preventDefault(),a.stopPropagation())}},a.guid=d.guid=d.guid||F.guid++,Ga(f,z,l,b,a)})});return this};E.one=function(a,b,c,d){return this.on(a,b,c,d,!0)};E.ready=function(a){function b(){return setTimeout(a,0,F)}"loading"!==k.readyState?b():k.addEventListener("DOMContentLoaded",b);return this};E.trigger=function(a,b){if(C(a)){var c=X(a),d=c[0];c=c[1];var h=W[d]||V[d]||d;if(!h)return this;var f=Fa.test(h)?"MouseEvents":"HTMLEvents";a=k.createEvent(f);a.initEvent(h,!0,!0);a.namespace=c.join(".");a.___ot=d}a.___td=b;var g=a.___ot in V;return this.each(function(b,c){g&&D(c[a.___ot])&&(c["___i"+a.type]=!0,c[a.___ot](),c["___i"+a.type]=!1);c.dispatchEvent(a)})};function Ha(a){return a.multiple&&a.options?O(t.call(a.options,function(a){return a.selected&&!a.disabled&&!a.parentNode.disabled}),"value"):a.value||""}var Ia=/%20/g,Ja=/\r?\n/g,Ma=/file|reset|submit|button|image/i,Na=/radio|checkbox/i;E.serialize=function(){var a="";this.each(function(b,c){J(c.elements||[c],function(b,c){c.disabled||!c.name||"FIELDSET"===c.tagName||Ma.test(c.type)||Na.test(c.type)&&!c.checked||(b=Ha(c),void 0!==b&&(b=q(b)?b:[b],J(b,function(b,d){b=a;d="&"+encodeURIComponent(c.name)+"="+encodeURIComponent(d.replace(Ja,"\r\n")).replace(Ia,"+");a=b+d})))})});return a.slice(1)};E.val=function(a){return arguments.length?this.each(function(b,c){if((b=c.multiple&&c.options)||Na.test(c.type)){var d=q(a)?ia.call(a,String):null===a?[]:[String(a)];b?J(c.options,function(a,b){b.selected=0<=d.indexOf(b.value)},!0):c.checked=0<=d.indexOf(c.value)}else c.value=void 0===a||null===a?"":a}):this[0]&&Ha(this[0])};E.clone=function(){return this.map(function(a,b){return b.cloneNode(!0)})};E.detach=function(a){M(this,a).each(function(a,c){c.parentNode&&c.parentNode.removeChild(c)});return this};var Oa=/^\s*<(\w+)[^>]*>/,Pa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,Qa={"*":ca,tr:da,td:ea,th:ea,thead:p,tbody:p,tfoot:p};function qa(a){if(!C(a))return[];if(Pa.test(a))return[n(RegExp.$1)];var b=Oa.test(a)&&RegExp.$1;b=Qa[b]||Qa["*"];b.innerHTML=a;return F(b.childNodes).detach().get()}F.parseHTML=qa;E.empty=function(){return this.each(function(a,b){for(;b.firstChild;)b.removeChild(b.firstChild)})};E.html=function(a){return arguments.length?void 0===a?this:this.each(function(b,c){x(c)&&(c.innerHTML=a)}):this[0]&&this[0].innerHTML};E.remove=function(a){M(this,a).detach().off();return this};E.text=function(a){return void 0===a?this[0]?this[0].textContent:"":this.each(function(b,c){x(c)&&(c.textContent=a)})};E.unwrap=function(){this.parent().each(function(a,b){"BODY"!==b.tagName&&(a=F(b),a.replaceWith(a.children()))});return this};E.offset=function(){var a=this[0];if(a)return a=a.getBoundingClientRect(),{top:a.top+m.pageYOffset,left:a.left+m.pageXOffset}};E.offsetParent=function(){return this.map(function(a,b){for(a=b.offsetParent;a&&"static"===Q(a,"position");)a=a.offsetParent;return a||ba})};E.position=function(){var a=this[0];if(a){var b="fixed"===Q(a,"position"),c=b?a.getBoundingClientRect():this.offset();if(!b){var d=a.ownerDocument;for(b=a.offsetParent||d.documentElement;(b===d.body||b===d.documentElement)&&"static"===Q(b,"position");)b=b.parentNode;b!==a&&x(b)&&(d=F(b).offset(),c.top-=d.top+R(b,"borderTopWidth"),c.left-=d.left+R(b,"borderLeftWidth"))}return{top:c.top-R(a,"marginTop"),left:c.left-R(a,"marginLeft")}}};E.children=function(a){return M(F(P(O(this,function(a){return a.children}))),a)};E.contents=function(){return F(P(O(this,function(a){return"IFRAME"===a.tagName?[a.contentDocument]:"TEMPLATE"===a.tagName?a.content.childNodes:a.childNodes})))};E.find=function(a){return F(P(O(this,function(b){return v(a,b)})))};var Ra=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Sa=/^$|^module$|\/(java|ecma)script/i,Ta=["type","src","nonce","noModule"];function Ua(a,b){a=F(a);a.filter("script").add(a.find("script")).each(function(a,d){if(Sa.test(d.type)&&ba.contains(d)){var c=n("script");c.text=d.textContent.replace(Ra,"");J(Ta,function(a,b){d[b]&&(c[b]=d[b])});b.head.insertBefore(c,null);b.head.removeChild(c)}})}function Z(a,b,c,d,h,f,g,y){J(a,function(a,f){J(F(f),function(a,f){J(F(b),function(b,g){var l=c?g:f;b=c?a:b;g=c?f:g;l=b?l.cloneNode(!0):l;b=!b;h?g.insertBefore(l,d?g.firstChild:null):g.parentNode.insertBefore(l,d?g:g.nextSibling);b&&Ua(l,g.ownerDocument)},y)},g)},f);return b}E.after=function(){return Z(arguments,this,!1,!1,!1,!0,!0)};E.append=function(){return Z(arguments,this,!1,!1,!0)};E.appendTo=function(a){return Z(arguments,this,!0,!1,!0)};E.before=function(){return Z(arguments,this,!1,!0)};E.insertAfter=function(a){return Z(arguments,this,!0,!1,!1,!1,!1,!0)};E.insertBefore=function(a){return Z(arguments,this,!0,!0)};E.prepend=function(){return Z(arguments,this,!1,!0,!0,!0,!0)};E.prependTo=function(a){return Z(arguments,this,!0,!0,!0,!1,!1,!0)};E.replaceWith=function(a){return this.before(a).remove()};E.replaceAll=function(a){F(a).replaceWith(this);return this};E.wrapAll=function(a){a=F(a);for(var b=a[0];b.children.length;)b=b.firstElementChild;this.first().before(a);return this.appendTo(b)};E.wrap=function(a){return this.each(function(b,c){var d=F(a)[0];F(c).wrapAll(b?d.cloneNode(!0):d)})};E.wrapInner=function(a){return this.each(function(b,c){b=F(c);c=b.contents();c.length?c.wrapAll(a):b.append(a)})};E.has=function(a){var b=C(a)?function(b,d){return v(a,d).length}:function(b,d){return d.contains(a)};return this.filter(b)};E.is=function(a){var b=L(a);return u.call(this,function(a,d){return b.call(a,d,a)})};E.next=function(a,b,c){return M(F(P(O(this,"nextElementSibling",b,c))),a)};E.nextAll=function(a){return this.next(a,!0)};E.nextUntil=function(a,b){return this.next(b,!0,a)};E.not=function(a){var b=L(a);return this.filter(function(c,d){return(!C(a)||x(d))&&!b.call(d,c,d)})};E.parent=function(a){return M(F(P(O(this,"parentNode"))),a)};E.index=function(a){var b=a?F(a)[0]:this[0];a=a?this:F(b).parent().children();return ha.call(a,b)};E.closest=function(a){var b=this.filter(a);if(b.length)return b;var c=this.parent();return c.length?c.closest(a):b};E.parents=function(a,b){return M(F(P(O(this,"parentElement",!0,b))),a)};E.parentsUntil=function(a,b){return this.parents(b,a)};E.prev=function(a,b,c){return M(F(P(O(this,"previousElementSibling",b,c))),a)};E.prevAll=function(a){return this.prev(a,!0)};E.prevUntil=function(a,b){return this.prev(b,!0,a)};E.siblings=function(a){return M(F(P(O(this,function(a){return F(a).parent().children().not(a)}))),a)};"undefined"!==typeof exports?module.exports=F:m.cash=m.$=F;})();
 
 var elementos_css ={};
 var blocos_posicao ={};
 var elementos_posicao ={};
 var elementos_popup ={};
 var elementos_botoes_evento ={};
 var pagina_controle ={
 'classe_bloco':'gpc-b',
 'classe_elemento':'gpc-e',
 'classe_elemento_antigo':'gpc-elemento',
 'classe_elemento_interno':'c',
 'classe_elemento_interno_antigo':'conteudo',
 'elementos_timer':{}
};
 var largura_tela, altura_tela, timeout_resize;
 
 function GreatResize(){
 let tamanho_tela = $(window).width();
 let zoom_default = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no';
 
 function iOS(){return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)}
 if(tamanho_tela <= 1200){
 let controle = 1200;
 if(tamanho_tela > 360 && tamanho_tela <= 800){
 $('.gpc-b').each(function(){if($(this).css('background-attachment') == 'fixed'){$(this).css('background-position','');}});
 if(iOS()){$('meta[name="viewport"]').attr('content',zoom_default);}
 else{$('body').css('zoom','');}
 return;
}else if(tamanho_tela <= 360){controle = 360;}
 let proporcao = (((tamanho_tela*100)/controle)).toFixed(5), novo_tamanho;
 novo_tamanho = (tamanho_tela-(tamanho_tela*(proporcao/100)));
 if(novo_tamanho != 0){
 $('.gpc-b').each(function(i,bloco){
 if($(bloco).css('background-attachment') == 'fixed'){
 if(iOS()){$(bloco).css('background-attachment','initial');}
 if($(bloco).position().top >= $(window).height()){$(bloco).css('background-position',$(bloco).css('background-position-x')+' 100%');}
 else{$(bloco).css('background-position',$(bloco).css('background-position-x')+' 0%');}
}
});
 if(iOS()){
 $('meta[name="viewport"]').attr('content','width='+novo_tamanho+', initial-scale='+(proporcao/100)+', maximum-scale='+(proporcao/100)+', minimum-scale='+(proporcao/100)+', user-scalable=no, shrink-to-fit=no');
}else{$('body').css({'zoom':proporcao+'%'});}
}else{
 if(iOS()){
 $('.gpc-b').each(function(i,bloco){
 if($(bloco).css('background-attachment') == 'fixed'){
 $(bloco).css('background-attachment','initial');
 if($(bloco).position().top >= $(window).height()){$(bloco).css('background-position',$(bloco).css('background-position-x')+' 100%');}
 else{$(bloco).css('background-position',$(bloco).css('background-position-x')+' 0%');}
}
});
}
}
}else{
 $('.gpc-b').each(function(i,bloco){if($(bloco).css('background-attachment') == 'fixed'){$(bloco).css('background-position','');}});
 if(iOS()){$('meta[name="viewport"]').attr('content',zoom_default);}
 else{$('body').css('zoom','');}
}
}
 GreatResize();
 $(function(){GreatResize();});
 window.addEventListener('resize', function(e){
 e.preventDefault();
 e.stopPropagation();
 if(timeout_resize){clearTimeout(timeout_resize);timeout_resize = null;}
 largura_tela = $(window).width();
 altura_tela = $(window).height();
 timeout_resize = setTimeout(function(){
 if($(window).width() == largura_tela && $(window).height() == altura_tela){GreatResize();}
},50);
},{passive:true});
 
 function GreatFontesAplicar(raiz, fator){
 if (!(fator > 0)) { return; }
 raiz.each(function(){
 var nos = [this].concat(Array.prototype.slice.call(this.querySelectorAll('*')));
 var medidos = [], i, n;
 for (i = 0; i < nos.length; i++){
 n = nos[i];
 if (n.nodeType !== 1 || !n.style || typeof n.style.setProperty !== 'function') continue;
 if (typeof n.namespaceURI === 'string' && n.namespaceURI.indexOf('svg') !== -1) continue;
 medidos.push([n, parseFloat(window.getComputedStyle(n).fontSize)]);
}
 for (i = 0; i < medidos.length; i++){
 if (medidos[i][1] > 0){ medidos[i][0].style.setProperty('font-size', (medidos[i][1]/(fator*fator))+'px', 'important'); }
}
});
}
 function GreatFontes(modal){
 if(modal == undefined){modal = false;}
 if((navigator.userAgent.match(/Android/i) && $(window).width() <= 800 && navigator.userAgent.match(/Instagram|FBAN|FBAV|FB_IAB|WhatsApp|BytedanceWebview|musical_ly|TikTok|Line\/|KAKAOTALK/i)) || (navigator.userAgent.match(/iPhone/i) && $(window).width() < 360)){
 
 $((modal ? '.gm ':'')+'.gpc-e').each(function(){
 
 var elemento = $(this);
 var elemento_id = elemento.attr('id');
 
 if (elementos_css.hasOwnProperty(elemento_id)){
 
 var elemento_conteudo = (elemento.hasClass('e_formulario') ? elemento.find('.gpc_botao') :elemento.children('.c'));
 if(!elemento_conteudo.length){ elemento_conteudo = elemento.children('[class*="typography-"]').first(); }
 
 if (Math.abs(parseFloat(elemento_conteudo.css('font-size')) - parseFloat(elementos_css[elemento_id]['fs'])) > 0.5){
 
 var fator = parseFloat(elemento_conteudo.css('font-size'))/parseFloat(elementos_css[elemento_id]['fs']);
 
 GreatFontesAplicar(elemento_conteudo, fator);
 
 if (elementos_css[elemento_id]['lh']){
 
 elemento_conteudo.css('line-height',elementos_css[elemento_id]['lh']);
}
 
 if (elemento.hasClass('e_timer')){
 
 if (parseFloat(elemento_conteudo.css('font-size')) != elementos_css[elemento_id]['fs']){
 elemento_conteudo.find('.contador_titulos').css('line-height','1');
 elemento_conteudo.find('.contador_itens').children('span').css('line-height','1.2');
}
}else if (elemento.hasClass('e_formulario')){
 
 var fieldset = elemento.find('fieldset');
 if (fieldset.length){ GreatFontesAplicar(fieldset, fator); }
}
}
}
});
}
}
 $(function(){
 
 GreatFontes();
});
 
 
 $(function(){GreatLoader('iniciar');});
 
 var gle_fontes ={}, gle_css ={}, gle_scripts ={};
 
 function GreatLoader(acao){
 
 
 gle_fontes['elementos'] = $('.gle_fontes');
 gle_fontes['encontrados'] = gle_fontes['elementos'].length;
 gle_fontes['carregados'] = 0;
 
 if (gle_fontes['encontrados'] != 0){
 InserirFontes(acao);
 setTimeout(function(){CarregarFontes();},4500);
}else{CarregarFontes();}
 
 setTimeout(function(){
 
 gle_scripts['elementos'] = $('.gle_scripts');
 gle_scripts['encontrados'] = gle_scripts['elementos'].length;
 gle_scripts['carregados'] = 0;
 
 if (gle_scripts['encontrados'] != 0){
 InserirScripts(acao);
}else{if (acao == 'iniciar'){if (window.InserirScriptsInline != undefined){InserirScriptsInline();}}}
},20);
 
 setTimeout(function(){
 
 gle_css = $('.gle_css');
 
 InserirCss(acao);
},30);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.e_animacoes',
 'antecipacao' :0,
 'executar' :function(elemento){
 (function(elemento){
 var elemento_carregando = setInterval(function(){
 if (!$(elemento).hasClass('se_imagem') && !$(elemento).hasClass('se_video') && !$(elemento).hasClass('se_caixa') && !$(elemento).find('.c').hasClass('se_fonte') && !$(elemento).hasClass('se_slider')){
 
 clearInterval(elemento_carregando);
 
 var elemento_id = $(elemento).attr('id').replace('_d', '').replace('_m', '');
 var elemento_informacoes = ($(elemento).hasClass('e_video') && $(elemento).find('.carregando').length ? $(elemento).find('.carregando') :$(elemento).find('.c'));
 var animacao_nome = $(elemento_informacoes).attr('data-animation-nome');
 var animacao_duration = ($(elemento_informacoes).attr('data-animation-duration') ? $(elemento_informacoes).attr('data-animation-duration')+'ms' :'1000ms');
 var animacao_delay = ($(elemento_informacoes).attr('data-animation-delay') ? $(elemento_informacoes).attr('data-animation-delay')+'ms' :'0ms');
 var animacao_repeat = ($(elemento_informacoes).attr('data-animation-repeat') == 'loop' ? 'infinite' :'');
 
 if (animacao_nome == 'slide' || animacao_nome == 'zoom' || animacao_nome == 'flip'){var animacao_tipo = 'cubic-bezier(.25,.46,.45,.94)';}
 else if (animacao_nome == 'fade'){var animacao_tipo = 'cubic-bezier(0.390, 0.575, 0.565, 1.000)';}
 else if (animacao_nome == 'roll'){var animacao_tipo = 'ease-out';}
 else if (animacao_nome == 'fold'){var animacao_tipo = 'cubic-bezier(.175,.885,.32,1.275)';}
 else{var animacao_tipo = '';}
 
 $(elemento).removeClass('e_animacoes');
 if($(elemento).hasClass('e_faq')){
 var itens = $(elemento).find('.gac-item');
 for (var i = 0;i < itens.length;i++){
 $(itens[i]).css({
 'animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+(parseInt(animacao_delay)+(500*i))+'ms '+animacao_repeat+' both',
 '-webkit-animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+(parseInt(animacao_delay)+(500*i))+'ms '+animacao_repeat+' both',
 'transform':'translate3d(0,0,0)',
 '-webkit-transform':'translate3d(0,0,0)'
 });
}
}else{
 $(elemento).find('.c').css({
 'animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+animacao_delay+' '+animacao_repeat+' both',
 '-webkit-animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+animacao_delay+' '+animacao_repeat+' both',
 'transform':'translate3d(0,0,0)',
 '-webkit-transform':'translate3d(0,0,0)'
});
}
 
 $(elemento_informacoes).removeAttr('data-animation-nome data-animation-duration data-animation-delay data-animation-repeat');
 }
}, 50);
})(elemento);
}
});
},30);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_imagem',
 'antecipacao' :600,
 'executar' :function(elemento){
 
 if (elemento.querySelector('picture')){elemento.classList.remove('se_imagem');elemento.removeAttribute('ll_src');elemento.removeAttribute('ll_src_mobile');return;}
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}else if (window.innerWidth > 800){var dispositivo = 'desktop';}

 var img_mobile = elemento.getAttribute('ll_src_mobile');
 var img_desktop = elemento.getAttribute('ll_src');
 if (img_mobile == 'null' || img_mobile == 'undefined'){img_mobile = null;}
 if (img_desktop == 'null' || img_desktop == 'undefined'){img_desktop = null;}
 var src_desktop = img_desktop || img_mobile;
 var src_mobile = img_mobile || src_desktop;
 var interno_img = elemento.querySelector('.'+pagina_controle['classe_elemento_interno']);
 var ll_largura = (interno_img && interno_img.getAttribute('gpc_largura_imagem')) ? interno_img.getAttribute('gpc_largura_imagem') :'';
 var ll_altura = (interno_img && interno_img.getAttribute('gpc_altura_imagem')) ? interno_img.getAttribute('gpc_altura_imagem') :'';
 var alt_raw = elemento.getAttribute('data-ll-alt') || '';
 var src_download = (dispositivo == 'mobile' && img_mobile) ? img_mobile :(img_desktop || img_mobile);

 if (!src_download){
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.removeAttribute('data-ll-alt');
 if (interno_img){
 interno_img.removeAttribute('data-ll-alt');
 interno_img.removeAttribute('gpc_ratio_imagem');
 interno_img.removeAttribute('gpc_altura_imagem');
 interno_img.removeAttribute('gpc_largura_imagem');
}
 elemento.classList.remove('se_imagem');
 if (elemento.children[0]){elemento.children[0].innerHTML = '<div class="imagem_fundo fallback_background"></div>';}
 return;
}

 var imagem_download = new Image();

 imagem_download.onload = function(e){
 if (imagem_download.decode && !imagem_download.__decodificada){
 imagem_download.__decodificada = 1;
 imagem_download.decode().then(function(){imagem_download.onload(e);}).catch(function(){imagem_download.onload(e);});
 return;
}

 imagem_download.onload = null;
 imagem_download.onerror = null;

 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.removeAttribute('data-ll-alt');
 if (interno_img){
 interno_img.removeAttribute('data-ll-alt');
 interno_img.removeAttribute('gpc_ratio_imagem');
 interno_img.removeAttribute('gpc_altura_imagem');
 interno_img.removeAttribute('gpc_largura_imagem');
}
 elemento.classList.remove('se_imagem');
 var container = elemento.children[0];
 if (!container){return;}
 while (container.firstChild){container.removeChild(container.firstChild);}
 if (ll_largura && ll_altura){
 var source = document.createElement('source');
 source.setAttribute('media', '(max-width: 800px)');
 source.setAttribute('srcset', src_mobile);
 var picture = document.createElement('picture');
 picture.appendChild(source);
 imagem_download.className = 'imagem_fundo';
 imagem_download.alt = alt_raw;
 imagem_download.setAttribute('width', ll_largura);
 imagem_download.setAttribute('height', ll_altura);
 picture.appendChild(imagem_download);
 container.appendChild(picture);
}else{
 var fundo = document.createElement('div');
 fundo.className = 'imagem_fundo';
 container.appendChild(fundo);
}
};
 imagem_download.onerror = function(e){

 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.removeAttribute('data-ll-alt');
 if (interno_img){
 interno_img.removeAttribute('data-ll-alt');
 interno_img.removeAttribute('gpc_ratio_imagem');
 interno_img.removeAttribute('gpc_altura_imagem');
 interno_img.removeAttribute('gpc_largura_imagem');
}
 elemento.classList.remove('se_imagem');
 if (elemento.children[0]){elemento.children[0].innerHTML = '<div class="imagem_fundo fallback_background"></div>';}
};
 imagem_download.src = src_download;
}
});
},40);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_caixa',
 'antecipacao' :500,
 'executar' :function(elemento){
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}else if (window.innerWidth > 800){var dispositivo = 'desktop';}
 
 var elemento_carregando_src = '';
 if (dispositivo == 'mobile' && elemento.getAttribute('ll_src_mobile')){elemento_carregando_src = elemento.getAttribute('ll_src_mobile');}
 else if (dispositivo == 'desktop' && elemento.getAttribute('ll_src')){elemento_carregando_src = elemento.getAttribute('ll_src');}
 if (elemento_carregando_src && elemento_carregando_src != 'null' && elemento_carregando_src != 'undefined'){
 
 var imagem_download = new Image();
 imagem_download.src = elemento_carregando_src;
 imagem_download.onload = function(e){
 if (imagem_download.decode && !imagem_download.__decodificada){
 imagem_download.__decodificada = 1;
 imagem_download.decode().then(function(){imagem_download.onload(e);}).catch(function(){imagem_download.onload(e);});
 return;
}
 
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('se_caixa');
};
 imagem_download.onerror = function(e){
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('se_caixa');
 elemento.children[0].classList.add('fallback_background');
};
}else{
 elemento.classList.remove('se_caixa');
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
}
}
});
},40);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_slider',
 'antecipacao' :500,
 'executar' :function(elemento){
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}
 else if (window.innerWidth > 800){var dispositivo = 'desktop';}
 
 var imagens = $(elemento).find('.imagem');
 if(imagens.length){
 imagens.each(function(i,imagem){
 var elemento_carregando_src = '';
 if (dispositivo == 'mobile' && imagem.getAttribute('ll_src_mobile')){elemento_carregando_src = imagem.getAttribute('ll_src_mobile');}
 else if (dispositivo == 'desktop' && imagem.getAttribute('ll_src')){elemento_carregando_src = imagem.getAttribute('ll_src');}
 if (elemento_carregando_src && elemento_carregando_src != 'null' && elemento_carregando_src != 'undefined'){
 
 var imagem_download = new Image();
 imagem_download.src = elemento_carregando_src;
 imagem_download.onload = function(e){
 if (imagem_download.decode && !imagem_download.__decodificada){
 imagem_download.__decodificada = 1;
 imagem_download.decode().then(function(){imagem_download.onload(e);}).catch(function(){imagem_download.onload(e);});
 return;
}
 
 imagem.removeAttribute('ll_src');
 imagem.removeAttribute('ll_src_mobile');
 imagem.closest('.'+pagina_controle['classe_elemento']).classList.remove('se_slider');
 if(imagem.classList.contains('gsi_clone')){imagem.style.backgroundImage = 'url('+elemento_carregando_src+')';}
};
 imagem_download.onerror = function(e){
 
 imagem.removeAttribute('ll_src');
 imagem.removeAttribute('ll_src_mobile');
 try{
 imagem.closest('.'+pagina_controle['classe_elemento']).classList.remove('se_slider');
 imagem.closest('.'+pagina_controle['classe_elemento']).children[0].classList.add('fallback_background');
 let id_slider = `gsi_${elemento.closest('.'+pagina_controle['classe_elemento']).getAttribute('id')}`;
 if(gsi_intervalo.hasOwnProperty(id_slider)){
 GSlideImage.destruir(id_slider);
 GSlideImage.iniciar(elemento.closest('.'+pagina_controle['classe_elemento']).getAttribute('id'));
 }else{
 GSlideImage.iniciar(elemento.closest('.'+pagina_controle['classe_elemento']).getAttribute('id'));
 }
}catch (error){
}
};
 }else{
 imagem.closest('.'+pagina_controle['classe_elemento']).classList.remove('se_slider');
 imagem.removeAttribute('ll_src');
 imagem.removeAttribute('ll_src_mobile');
 }
});
}
}
});
},400);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.ll_background',
 'antecipacao' :500,
 'executar' :function(elemento){
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}
 else if (window.innerWidth > 800){var dispositivo = 'desktop';}
 
 var elemento_carregando_src = '';
 if (dispositivo == 'mobile' && elemento.getAttribute('ll_src_mobile')){elemento_carregando_src = elemento.getAttribute('ll_src_mobile');}
 else if (dispositivo == 'desktop' && elemento.getAttribute('ll_src')){elemento_carregando_src = elemento.getAttribute('ll_src');}
 if (elemento_carregando_src && elemento_carregando_src != 'null' && elemento_carregando_src != 'undefined'){
 
 var background_download = new Image();
 background_download.src = elemento_carregando_src;
 background_download.onload = function(e){
 
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('ll_background');
};
 background_download.onerror = function(e){
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('ll_background');
 elemento.classList.add('fallback_background');
};
}else{
 
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('ll_background');
 elemento.classList.add('fallback_background');
}
}
});
},50);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_video',
 'antecipacao' :0,
 'executar' :function(elemento){
 
 if(document.getElementById(elemento.getAttribute('id')).getElementsByTagName('iframe').length == 0){
 
 var animacao_nome = (elemento.querySelector('.carregando').getAttribute('data-animation-nome') ? elemento.querySelector('.carregando').getAttribute('data-animation-nome') :'none');
 var animacao_duration = (elemento.querySelector('.carregando').getAttribute('data-animation-duration') ? elemento.querySelector('.carregando').getAttribute('data-animation-duration') :1000);
 var animacao_delay = (elemento.querySelector('.carregando').getAttribute('data-animation-delay') ? elemento.querySelector('.carregando').getAttribute('data-animation-delay') :0);
 var animacao_repeat = (elemento.querySelector('.carregando').getAttribute('data-animation-repeat') == 'loop' ? 'infinite' :'show');
 
 var video_download = document.createElement("iframe");
 console.log(elemento.getAttribute('ll_src'));
 video_download.setAttribute('src', elemento.getAttribute('ll_src'));
 video_download.setAttribute('frameborder', 0);
 video_download.setAttribute('allowfullscreen', '');
 video_download.setAttribute('mozallowfullscreen', '');
 video_download.setAttribute('webkitallowfullscreen', '');
 video_download.setAttribute('allow', 'accelerometer;autoplay;picture-in-picture');
 video_download.setAttribute('class', 'c e_video');
 video_download.setAttribute('data-animation-nome', animacao_nome);
 video_download.setAttribute('data-animation-duration', animacao_duration);
 video_download.setAttribute('data-animation-delay', animacao_delay);
 video_download.setAttribute('data-animation-repeat', animacao_repeat);
 video_download.onload = function(){
 if(document.getElementById(elemento.getAttribute('id')).querySelector('.carregando')){
 document.getElementById(elemento.getAttribute('id')).querySelector('.carregando').remove();
 }
 elemento.removeAttribute('ll_src');
 elemento.classList.remove('se_video');
};
 video_download.onreadystatechange = function(){
 if(document.getElementById(elemento.getAttribute('id')).querySelector('.carregando')){
 document.getElementById(elemento.getAttribute('id')).querySelector('.carregando').remove();
 }
 if (this.readyState == 'complete'){
 elemento.removeAttribute('ll_src');
 elemento.classList.remove('se_video');
 }
};
 
 document.getElementById(elemento.getAttribute('id')).appendChild(video_download);
}
}
});
},400);
}
 
 function InserirFontes(acao){
 if (gle_fontes['elementos'].length){
 for(var i = 0;i < gle_fontes['elementos'].length;i++){
 
 (function(index){
 
 var elemento = $(gle_fontes['elementos'][index]);
 
 gle_fontes['elementos'].splice(index, 1);
 
 var fonte = document.createElement('link');
 fonte.href = elemento.attr('gle_href');
 fonte.rel = 'stylesheet';
 fonte.media = 'all';
 fonte.onload = function(){
 
 elemento.remove();
 
 gle_fontes['carregados']++;
 
 CarregarFontes();
 
 InserirFontes(acao);
};
 fonte.onerror = function(){
 
 elemento.remove();
 
 gle_fontes['carregados']++;
 
 CarregarFontes();
 
 InserirFontes(acao);
};
 fonte.onreadystatechange = function(){if (this.readyState == 'complete'){
 
 elemento.remove();
 
 gle_fontes['carregados']++;
 
 CarregarFontes();
 
 InserirFontes(acao);
}};
 document.head.appendChild(fonte);
})(i, acao);
 
 break;
}
}
}
 function CarregarFontes(){
 var fontes_carregar = $('.se_fonte, .se_contador');
 if (fontes_carregar.length){
 for(var i = 0;i < fontes_carregar.length;i++){
 
 if ($(fontes_carregar[i]).hasClass('se_fonte')){$(fontes_carregar[i]).removeClass('se_fonte');}
 else{$(fontes_carregar[i]).removeClass('se_contador');}
}
}
}
 
 function InserirCss(acao){
 if (gle_css.length){
 for(var i = 0;i < gle_css.length;i++){
 
 (function(index){
 
 var elemento = $(gle_css[index]);
 
 gle_css.splice(index, 1);
 
 var fonte = document.createElement('link');
 
 for (var x = 0;x < elemento[0].attributes.length;x++){
 if(elemento[0].attributes[x].nodeName != 'rel'){fonte.setAttribute(elemento[0].attributes[x].nodeName.replace('gle_',''),elemento[0].attributes[x].nodeValue.replace('gle_css',''));}
}
 
 fonte.onload = function(){
 
 elemento.remove();
 
 InserirCss(acao);
};
 fonte.onerror = function(){
 
 elemento.remove();
 
 InserirCss(acao);
};
 fonte.onreadystatechange = function(){if (this.readyState == 'complete'){
 
 elemento.remove();
 
 InserirCss(acao);
}};
 document.body.appendChild(fonte);
})(i, acao);
 
 break;
}
}
}
 
 function InserirScripts(acao){
 if (gle_scripts['elementos'].length){
 for(var i = 0;i < gle_scripts['elementos'].length;i++){
 
 (function(index){
 
 var elemento = $(gle_scripts['elementos'][index]);
 
 gle_scripts['elementos'].splice(index, 1);
 
 var script = document.createElement('script');
 
 for (var x = 0;x < elemento[0].attributes.length;x++){
 let valor = elemento[0].attributes[x].nodeValue;
 if(elemento[0].attributes[x].nodeName != 'href'){
 valor = valor.replace(/dns-prefetch\s+?/gm,'');
 valor = valor.replace(/\s+?dns-prefetch/gm,'');
 valor = valor.replace(/preconnect\s+?/gm,'');
 valor = valor.replace(/\s+?preconnect/gm,'');
 valor = valor.replace('dns-prefetch','');
 valor = valor.replace('preconnect','');
 valor = valor.replace('gle_scripts','');
 if(elemento[0].attributes[x].nodeName != 'async'){script.setAttribute(elemento[0].attributes[x].nodeName,valor);}
}
}
 script.src = elemento.attr('href');
 script.type = 'text/javascript';
 script.defer = true;
 script.onload = function(){
 
 elemento.remove();
 
 gle_scripts['carregados']++;
 
 if (gle_scripts['encontrados'] == gle_scripts['carregados'] && acao == 'iniciar'){
 if (window.InserirScriptsInline != undefined){InserirScriptsInline();}
}
 
 InserirScripts(acao);
};
 script.onerror = function(){
 
 elemento.remove();
 
 gle_scripts['carregados']++;
 
 if (gle_scripts['encontrados'] == gle_scripts['carregados'] && acao == 'iniciar'){
 if (window.InserirScriptsInline != undefined){InserirScriptsInline();}
}
 
 InserirScripts(acao);
};
 script.onreadystatechange = function(){if (this.readyState == 'complete'){
 
 elemento.remove();
 
 gle_scripts['carregados']++;
 
 if (gle_scripts['encontrados'] == gle_scripts['carregados'] && acao == 'iniciar'){
 if (window.InserirScriptsInline != undefined){InserirScriptsInline();}
}
 
 InserirScripts(acao);
}};
 document.body.appendChild(script);
})(i, acao);
 
 break;
}
}
}
 
 
 /* intl-tel-input v25.3.1 core (sem utils) — https://github.com/jackocnr/intl-tel-input, MIT, https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/intlTelInput.min.js, sha256 f0c96e6848522adeaa6f202c2f115684216b36dcbdf4a5b03d4a904817d9548d */
/*
 * International Telephone Input v25.3.1
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// UMD
(function(factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    window.intlTelInput = factory();
  }
}(() => {

var factoryOutput=(()=>{var L=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var R=Object.prototype.hasOwnProperty;var F=(l,t)=>{for(var e in t)L(l,e,{get:t[e],enumerable:!0})},B=(l,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of O(t))!R.call(l,n)&&n!==e&&L(l,n,{get:()=>t[n],enumerable:!(i=H(t,n))||i.enumerable});return l};var j=l=>B(L({},"__esModule",{value:!0}),l);var Y={};F(Y,{Iti:()=>w,default:()=>q});var D=[["af","93"],["ax","358",1],["al","355"],["dz","213"],["as","1",5,["684"]],["ad","376"],["ao","244"],["ai","1",6,["264"]],["ag","1",7,["268"]],["ar","54"],["am","374"],["aw","297"],["ac","247"],["au","61",0,null,"0"],["at","43"],["az","994"],["bs","1",8,["242"]],["bh","973"],["bd","880"],["bb","1",9,["246"]],["by","375"],["be","32"],["bz","501"],["bj","229"],["bm","1",10,["441"]],["bt","975"],["bo","591"],["ba","387"],["bw","267"],["br","55"],["io","246"],["vg","1",11,["284"]],["bn","673"],["bg","359"],["bf","226"],["bi","257"],["kh","855"],["cm","237"],["ca","1",1,["204","226","236","249","250","263","289","306","343","354","365","367","368","382","387","403","416","418","428","431","437","438","450","584","468","474","506","514","519","548","579","581","584","587","604","613","639","647","672","683","705","709","742","753","778","780","782","807","819","825","867","873","879","902","905"]],["cv","238"],["bq","599",1,["3","4","7"]],["ky","1",12,["345"]],["cf","236"],["td","235"],["cl","56"],["cn","86"],["cx","61",2,["89164"],"0"],["cc","61",1,["89162"],"0"],["co","57"],["km","269"],["cg","242"],["cd","243"],["ck","682"],["cr","506"],["ci","225"],["hr","385"],["cu","53"],["cw","599",0],["cy","357"],["cz","420"],["dk","45"],["dj","253"],["dm","1",13,["767"]],["do","1",2,["809","829","849"]],["ec","593"],["eg","20"],["sv","503"],["gq","240"],["er","291"],["ee","372"],["sz","268"],["et","251"],["fk","500"],["fo","298"],["fj","679"],["fi","358",0],["fr","33"],["gf","594"],["pf","689"],["ga","241"],["gm","220"],["ge","995"],["de","49"],["gh","233"],["gi","350"],["gr","30"],["gl","299"],["gd","1",14,["473"]],["gp","590",0],["gu","1",15,["671"]],["gt","502"],["gg","44",1,["1481","7781","7839","7911"],"0"],["gn","224"],["gw","245"],["gy","592"],["ht","509"],["hn","504"],["hk","852"],["hu","36"],["is","354"],["in","91"],["id","62"],["ir","98"],["iq","964"],["ie","353"],["im","44",2,["1624","74576","7524","7924","7624"],"0"],["il","972"],["it","39",0],["jm","1",4,["876","658"]],["jp","81"],["je","44",3,["1534","7509","7700","7797","7829","7937"],"0"],["jo","962"],["kz","7",1,["33","7"],"8"],["ke","254"],["ki","686"],["xk","383"],["kw","965"],["kg","996"],["la","856"],["lv","371"],["lb","961"],["ls","266"],["lr","231"],["ly","218"],["li","423"],["lt","370"],["lu","352"],["mo","853"],["mg","261"],["mw","265"],["my","60"],["mv","960"],["ml","223"],["mt","356"],["mh","692"],["mq","596"],["mr","222"],["mu","230"],["yt","262",1,["269","639"],"0"],["mx","52"],["fm","691"],["md","373"],["mc","377"],["mn","976"],["me","382"],["ms","1",16,["664"]],["ma","212",0,null,"0"],["mz","258"],["mm","95"],["na","264"],["nr","674"],["np","977"],["nl","31"],["nc","687"],["nz","64"],["ni","505"],["ne","227"],["ng","234"],["nu","683"],["nf","672"],["kp","850"],["mk","389"],["mp","1",17,["670"]],["no","47",0],["om","968"],["pk","92"],["pw","680"],["ps","970"],["pa","507"],["pg","675"],["py","595"],["pe","51"],["ph","63"],["pl","48"],["pt","351"],["pr","1",3,["787","939"]],["qa","974"],["re","262",0,null,"0"],["ro","40"],["ru","7",0,null,"8"],["rw","250"],["ws","685"],["sm","378"],["st","239"],["sa","966"],["sn","221"],["rs","381"],["sc","248"],["sl","232"],["sg","65"],["sx","1",21,["721"]],["sk","421"],["si","386"],["sb","677"],["so","252"],["za","27"],["kr","82"],["ss","211"],["es","34"],["lk","94"],["bl","590",1],["sh","290"],["kn","1",18,["869"]],["lc","1",19,["758"]],["mf","590",2],["pm","508"],["vc","1",20,["784"]],["sd","249"],["sr","597"],["sj","47",1,["79"]],["se","46"],["ch","41"],["sy","963"],["tw","886"],["tj","992"],["tz","255"],["th","66"],["tl","670"],["tg","228"],["tk","690"],["to","676"],["tt","1",22,["868"]],["tn","216"],["tr","90"],["tm","993"],["tc","1",23,["649"]],["tv","688"],["ug","256"],["ua","380"],["ae","971"],["gb","44",0,null,"0"],["us","1",0],["uy","598"],["vi","1",24,["340"]],["uz","998"],["vu","678"],["va","39",1,["06698"]],["ve","58"],["vn","84"],["wf","681"],["eh","212",1,["5288","5289"],"0"],["ye","967"],["zm","260"],["zw","263"]],N=[];for(let l=0;l<D.length;l++){let t=D[l];N[l]={name:"",iso2:t[0],dialCode:t[1],priority:t[2]||0,areaCodes:t[3]||null,nodeById:{},nationalPrefix:t[4]||null}}var f=N;var U={ad:"Andorra",ae:"United Arab Emirates",af:"Afghanistan",ag:"Antigua & Barbuda",ai:"Anguilla",al:"Albania",am:"Armenia",ao:"Angola",ar:"Argentina",as:"American Samoa",at:"Austria",au:"Australia",aw:"Aruba",ax:"\xC5land Islands",az:"Azerbaijan",ba:"Bosnia & Herzegovina",bb:"Barbados",bd:"Bangladesh",be:"Belgium",bf:"Burkina Faso",bg:"Bulgaria",bh:"Bahrain",bi:"Burundi",bj:"Benin",bl:"St. Barth\xE9lemy",bm:"Bermuda",bn:"Brunei",bo:"Bolivia",bq:"Caribbean Netherlands",br:"Brazil",bs:"Bahamas",bt:"Bhutan",bw:"Botswana",by:"Belarus",bz:"Belize",ca:"Canada",cc:"Cocos (Keeling) Islands",cd:"Congo - Kinshasa",cf:"Central African Republic",cg:"Congo - Brazzaville",ch:"Switzerland",ci:"C\xF4te d\u2019Ivoire",ck:"Cook Islands",cl:"Chile",cm:"Cameroon",cn:"China",co:"Colombia",cr:"Costa Rica",cu:"Cuba",cv:"Cape Verde",cw:"Cura\xE7ao",cx:"Christmas Island",cy:"Cyprus",cz:"Czechia",de:"Germany",dj:"Djibouti",dk:"Denmark",dm:"Dominica",do:"Dominican Republic",dz:"Algeria",ec:"Ecuador",ee:"Estonia",eg:"Egypt",eh:"Western Sahara",er:"Eritrea",es:"Spain",et:"Ethiopia",fi:"Finland",fj:"Fiji",fk:"Falkland Islands",fm:"Micronesia",fo:"Faroe Islands",fr:"France",ga:"Gabon",gb:"United Kingdom",gd:"Grenada",ge:"Georgia",gf:"French Guiana",gg:"Guernsey",gh:"Ghana",gi:"Gibraltar",gl:"Greenland",gm:"Gambia",gn:"Guinea",gp:"Guadeloupe",gq:"Equatorial Guinea",gr:"Greece",gt:"Guatemala",gu:"Guam",gw:"Guinea-Bissau",gy:"Guyana",hk:"Hong Kong SAR China",hn:"Honduras",hr:"Croatia",ht:"Haiti",hu:"Hungary",id:"Indonesia",ie:"Ireland",il:"Israel",im:"Isle of Man",in:"India",io:"British Indian Ocean Territory",iq:"Iraq",ir:"Iran",is:"Iceland",it:"Italy",je:"Jersey",jm:"Jamaica",jo:"Jordan",jp:"Japan",ke:"Kenya",kg:"Kyrgyzstan",kh:"Cambodia",ki:"Kiribati",km:"Comoros",kn:"St. Kitts & Nevis",kp:"North Korea",kr:"South Korea",kw:"Kuwait",ky:"Cayman Islands",kz:"Kazakhstan",la:"Laos",lb:"Lebanon",lc:"St. Lucia",li:"Liechtenstein",lk:"Sri Lanka",lr:"Liberia",ls:"Lesotho",lt:"Lithuania",lu:"Luxembourg",lv:"Latvia",ly:"Libya",ma:"Morocco",mc:"Monaco",md:"Moldova",me:"Montenegro",mf:"St. Martin",mg:"Madagascar",mh:"Marshall Islands",mk:"North Macedonia",ml:"Mali",mm:"Myanmar (Burma)",mn:"Mongolia",mo:"Macao SAR China",mp:"Northern Mariana Islands",mq:"Martinique",mr:"Mauritania",ms:"Montserrat",mt:"Malta",mu:"Mauritius",mv:"Maldives",mw:"Malawi",mx:"Mexico",my:"Malaysia",mz:"Mozambique",na:"Namibia",nc:"New Caledonia",ne:"Niger",nf:"Norfolk Island",ng:"Nigeria",ni:"Nicaragua",nl:"Netherlands",no:"Norway",np:"Nepal",nr:"Nauru",nu:"Niue",nz:"New Zealand",om:"Oman",pa:"Panama",pe:"Peru",pf:"French Polynesia",pg:"Papua New Guinea",ph:"Philippines",pk:"Pakistan",pl:"Poland",pm:"St. Pierre & Miquelon",pr:"Puerto Rico",ps:"Palestinian Territories",pt:"Portugal",pw:"Palau",py:"Paraguay",qa:"Qatar",re:"R\xE9union",ro:"Romania",rs:"Serbia",ru:"Russia",rw:"Rwanda",sa:"Saudi Arabia",sb:"Solomon Islands",sc:"Seychelles",sd:"Sudan",se:"Sweden",sg:"Singapore",sh:"St. Helena",si:"Slovenia",sj:"Svalbard & Jan Mayen",sk:"Slovakia",sl:"Sierra Leone",sm:"San Marino",sn:"Senegal",so:"Somalia",sr:"Suriname",ss:"South Sudan",st:"S\xE3o Tom\xE9 & Pr\xEDncipe",sv:"El Salvador",sx:"Sint Maarten",sy:"Syria",sz:"Eswatini",tc:"Turks & Caicos Islands",td:"Chad",tg:"Togo",th:"Thailand",tj:"Tajikistan",tk:"Tokelau",tl:"Timor-Leste",tm:"Turkmenistan",tn:"Tunisia",to:"Tonga",tr:"Turkey",tt:"Trinidad & Tobago",tv:"Tuvalu",tw:"Taiwan",tz:"Tanzania",ua:"Ukraine",ug:"Uganda",us:"United States",uy:"Uruguay",uz:"Uzbekistan",va:"Vatican City",vc:"St. Vincent & Grenadines",ve:"Venezuela",vg:"British Virgin Islands",vi:"U.S. Virgin Islands",vn:"Vietnam",vu:"Vanuatu",wf:"Wallis & Futuna",ws:"Samoa",ye:"Yemen",yt:"Mayotte",za:"South Africa",zm:"Zambia",zw:"Zimbabwe"},A=U;var z={selectedCountryAriaLabel:"Selected country",noCountrySelected:"No country selected",countryListAriaLabel:"List of countries",searchPlaceholder:"Search",zeroSearchResults:"No results found",oneSearchResult:"1 result found",multipleSearchResults:"${count} results found",ac:"Ascension Island",xk:"Kosovo"},S=z;var K={...A,...S},T=K;for(let l=0;l<f.length;l++)f[l].name=T[f[l].iso2];var V=0,k={allowDropdown:!0,autoPlaceholder:"polite",containerClass:"",countryOrder:null,countrySearch:!0,customPlaceholder:null,dropdownContainer:null,excludeCountries:[],fixDropdownWidth:!0,formatAsYouType:!0,formatOnDisplay:!0,geoIpLookup:null,hiddenInput:null,i18n:{},initialCountry:"",loadUtils:null,nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",showFlags:!0,separateDialCode:!1,strictMode:!1,useFullscreenPopup:typeof navigator<"u"&&typeof window<"u"?/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=500:!1,validationNumberTypes:["MOBILE"]},$=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"],I=l=>l.replace(/\D/g,""),M=(l="")=>l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),P=l=>{let t=I(l);if(t.charAt(0)==="1"){let e=t.substr(1,3);return $.includes(e)}return!1},W=(l,t,e,i)=>{if(e===0&&!i)return 0;let n=0;for(let s=0;s<t.length;s++){if(/[+0-9]/.test(t[s])&&n++,n===l&&!i)return s+1;if(i&&n===l+1)return s}return t.length},m=(l,t,e)=>{let i=document.createElement(l);return t&&Object.entries(t).forEach(([n,s])=>i.setAttribute(n,s)),e&&e.appendChild(i),i},b=(l,...t)=>{let{instances:e}=r;Object.values(e).forEach(i=>i[l](...t))},w=class{constructor(t,e={}){this.id=V++,this.a=t,this.c=null,this.d=Object.assign({},k,e),this.e=!!t.getAttribute("placeholder")}_init(){this.d.useFullscreenPopup&&(this.d.fixDropdownWidth=!1),this.d.onlyCountries.length===1&&(this.d.initialCountry=this.d.onlyCountries[0]),this.d.separateDialCode&&(this.d.nationalMode=!1),this.d.allowDropdown&&!this.d.showFlags&&!this.d.separateDialCode&&(this.d.nationalMode=!1),this.d.useFullscreenPopup&&!this.d.dropdownContainer&&(this.d.dropdownContainer=document.body),this.isAndroid=typeof navigator<"u"?/Android/i.test(navigator.userAgent):!1,this.isRTL=!!this.a.closest("[dir=rtl]");let t=this.d.allowDropdown||this.d.separateDialCode;this.showSelectedCountryOnLeft=this.isRTL?!t:t,this.d.separateDialCode&&(this.isRTL?this.originalPaddingRight=this.a.style.paddingRight:this.originalPaddingLeft=this.a.style.paddingLeft),this.d.i18n={...T,...this.d.i18n};let e=new Promise((n,s)=>{this.h=n,this.i=s}),i=new Promise((n,s)=>{this.i0=n,this.i1=s});this.promise=Promise.all([e,i]),this.s={},this._b(),this._f(),this._h(),this._i(),this._i3()}_b(){this._d(),this._d2(),this._d0(),this._sortCountries()}_sortCountries(){this.d.countryOrder&&(this.d.countryOrder=this.d.countryOrder.map(t=>t.toLowerCase())),this.p.sort((t,e)=>{let{countryOrder:i}=this.d;if(i){let n=i.indexOf(t.iso2),s=i.indexOf(e.iso2),o=n>-1,u=s>-1;if(o||u)return o&&u?n-s:o?-1:1}return t.name.localeCompare(e.name)})}_c(t,e,i){e.length>this.dialCodeMaxLen&&(this.dialCodeMaxLen=e.length),this.q.hasOwnProperty(e)||(this.q[e]=[]);for(let s=0;s<this.q[e].length;s++)if(this.q[e][s]===t)return;let n=i!==void 0?i:this.q[e].length;this.q[e][n]=t}_d(){let{onlyCountries:t,excludeCountries:e}=this.d;if(t.length){let i=t.map(n=>n.toLowerCase());this.p=f.filter(n=>i.includes(n.iso2))}else if(e.length){let i=e.map(n=>n.toLowerCase());this.p=f.filter(n=>!i.includes(n.iso2))}else this.p=f}_d0(){for(let t=0;t<this.p.length;t++){let e=this.p[t].iso2.toLowerCase();this.d.i18n.hasOwnProperty(e)&&(this.p[t].name=this.d.i18n[e])}}_d2(){this.dialCodes={},this.dialCodeMaxLen=0,this.q={};for(let t=0;t<this.p.length;t++){let e=this.p[t];this.dialCodes[e.dialCode]||(this.dialCodes[e.dialCode]=!0),this._c(e.iso2,e.dialCode,e.priority)}for(let t=0;t<this.p.length;t++){let e=this.p[t];if(e.areaCodes){let i=this.q[e.dialCode][0];for(let n=0;n<e.areaCodes.length;n++){let s=e.areaCodes[n];for(let o=1;o<s.length;o++){let u=s.substr(0,o),a=e.dialCode+u;this._c(i,a),this._c(e.iso2,a)}this._c(e.iso2,e.dialCode+s)}}}}_f(){this.a.classList.add("iti__tel-input"),!this.a.hasAttribute("autocomplete")&&!(this.a.form&&this.a.form.hasAttribute("autocomplete"))&&this.a.setAttribute("autocomplete","off");let{allowDropdown:t,separateDialCode:e,showFlags:i,containerClass:n,hiddenInput:s,dropdownContainer:o,fixDropdownWidth:u,useFullscreenPopup:a,countrySearch:h,i18n:d}=this.d,p="iti";t&&(p+=" iti--allow-dropdown"),i&&(p+=" iti--show-flags"),n&&(p+=` ${n}`),a||(p+=" iti--inline-dropdown");let c=m("div",{class:p});if(this.a.parentNode?.insertBefore(c,this.a),t||i||e){this.k=m("div",{class:"iti__country-container"},c),this.showSelectedCountryOnLeft?this.k.style.left="0px":this.k.style.right="0px",t?(this.selectedCountry=m("button",{type:"button",class:"iti__selected-country","aria-expanded":"false","aria-label":this.d.i18n.selectedCountryAriaLabel,"aria-haspopup":"true","aria-controls":`iti-${this.id}__dropdown-content`,role:"combobox"},this.k),this.a.disabled&&this.selectedCountry.setAttribute("disabled","true")):this.selectedCountry=m("div",{class:"iti__selected-country"},this.k);let g=m("div",{class:"iti__selected-country-primary"},this.selectedCountry);if(this.l=m("div",{class:"iti__flag"},g),this.selectedCountryA11yText=m("span",{class:"iti__a11y-text"},this.l),t&&(this.u=m("div",{class:"iti__arrow","aria-hidden":"true"},g)),e&&(this.t=m("div",{class:"iti__selected-dial-code"},this.selectedCountry)),t){let C=u?"":"iti--flexible-dropdown-width";if(this.dropdownContent=m("div",{id:`iti-${this.id}__dropdown-content`,class:`iti__dropdown-content iti__hide ${C}`}),h&&(this.searchInput=m("input",{type:"text",class:"iti__search-input",placeholder:d.searchPlaceholder,role:"combobox","aria-expanded":"true","aria-label":d.searchPlaceholder,"aria-controls":`iti-${this.id}__country-listbox`,"aria-autocomplete":"list",autocomplete:"off"},this.dropdownContent),this.searchResultsA11yText=m("span",{class:"iti__a11y-text"},this.dropdownContent)),this.countryList=m("ul",{class:"iti__country-list",id:`iti-${this.id}__country-listbox`,role:"listbox","aria-label":d.countryListAriaLabel},this.dropdownContent),this._g(),h&&this._p4(),o){let y="iti iti--container";a?y+=" iti--fullscreen-popup":y+=" iti--inline-dropdown",this.dropdown=m("div",{class:y}),this.dropdown.appendChild(this.dropdownContent)}else this.k.appendChild(this.dropdownContent)}}if(c.appendChild(this.a),this._updateInputPadding(),s){let g=this.a.getAttribute("name")||"",C=s(g);if(C.phone){let y=this.a.form?.querySelector(`input[name="${C.phone}"]`);y?this.hiddenInput=y:(this.hiddenInput=m("input",{type:"hidden",name:C.phone}),c.appendChild(this.hiddenInput))}if(C.country){let y=this.a.form?.querySelector(`input[name="${C.country}"]`);y?this.hiddenInputCountry=y:(this.hiddenInputCountry=m("input",{type:"hidden",name:C.country}),c.appendChild(this.hiddenInputCountry))}}}_g(){for(let t=0;t<this.p.length;t++){let e=this.p[t],i=t===0?"iti__highlight":"",n=m("li",{id:`iti-${this.id}__item-${e.iso2}`,class:`iti__country ${i}`,tabindex:"-1",role:"option","data-dial-code":e.dialCode,"data-country-code":e.iso2,"aria-selected":"false"},this.countryList);e.nodeById[this.id]=n;let s="";this.d.showFlags&&(s+=`<div class='iti__flag iti__${e.iso2}'></div>`),s+=`<span class='iti__country-name'>${e.name}</span>`,s+=`<span class='iti__dial-code'>+${e.dialCode}</span>`,n.insertAdjacentHTML("beforeend",s)}}_h(t=!1){let e=this.a.getAttribute("value"),i=this.a.value,s=e&&e.charAt(0)==="+"&&(!i||i.charAt(0)!=="+")?e:i,o=this._5(s),u=P(s),{initialCountry:a,geoIpLookup:h}=this.d,d=a==="auto"&&h;if(o&&!u)this._v(s);else if(!d||t){let p=a?a.toLowerCase():"";p&&this._y(p,!0)?this._z(p):o&&u?this._z("us"):this._z()}s&&this._u(s)}_i(){this._j(),this.d.allowDropdown&&this._i2(),(this.hiddenInput||this.hiddenInputCountry)&&this.a.form&&this._i0()}_i0(){this._a14=()=>{this.hiddenInput&&(this.hiddenInput.value=this.getNumber()),this.hiddenInputCountry&&(this.hiddenInputCountry.value=this.getSelectedCountryData().iso2||"")},this.a.form?.addEventListener("submit",this._a14)}_i2(){this._a9=e=>{this.dropdownContent.classList.contains("iti__hide")?this.a.focus():e.preventDefault()};let t=this.a.closest("label");t&&t.addEventListener("click",this._a9),this._a10=()=>{this.dropdownContent.classList.contains("iti__hide")&&!this.a.disabled&&!this.a.readOnly&&this._n()},this.selectedCountry.addEventListener("click",this._a10),this._a11=e=>{this.dropdownContent.classList.contains("iti__hide")&&["ArrowUp","ArrowDown"," ","Enter"].includes(e.key)&&(e.preventDefault(),e.stopPropagation(),this._n()),e.key==="Tab"&&this._2()},this.k.addEventListener("keydown",this._a11)}_i3(){let{loadUtils:t,initialCountry:e,geoIpLookup:i}=this.d;t&&!r.utils?(this._handlePageLoad=()=>{window.removeEventListener("load",this._handlePageLoad),r.attachUtils(t)?.catch(()=>{})},r.documentReady()?this._handlePageLoad():window.addEventListener("load",this._handlePageLoad)):this.i0(),e==="auto"&&i&&!this.s.iso2?this._i4():this.h()}_i4(){r.autoCountry?this.handleAutoCountry():r.startedLoadingAutoCountry||(r.startedLoadingAutoCountry=!0,typeof this.d.geoIpLookup=="function"&&this.d.geoIpLookup((t="")=>{let e=t.toLowerCase();e&&this._y(e,!0)?(r.autoCountry=e,setTimeout(()=>b("handleAutoCountry"))):(this._h(!0),b("rejectAutoCountryPromise"))},()=>{this._h(!0),b("rejectAutoCountryPromise")}))}_nWithPlus(){this._n(),this.searchInput.value="+",this._p3("",!0)}_j(){let{strictMode:t,formatAsYouType:e,separateDialCode:i,formatOnDisplay:n,allowDropdown:s,countrySearch:o}=this.d,u=!1;/\p{L}/u.test(this.a.value)&&(u=!0),this._a12=a=>{if(this.isAndroid&&a?.data==="+"&&i&&s&&o){let c=this.a.selectionStart||0,g=this.a.value.substring(0,c-1),C=this.a.value.substring(c);this.a.value=g+C,this._nWithPlus();return}this._v(this.a.value)&&this._8();let h=a?.data&&/[^+0-9]/.test(a.data),d=a?.inputType==="insertFromPaste"&&this.a.value;h||d&&!t?u=!0:/[^+0-9]/.test(this.a.value)||(u=!1);let p=a?.detail&&a.detail.isSetNumber&&!n;if(e&&!u&&!p){let c=this.a.selectionStart||0,C=this.a.value.substring(0,c).replace(/[^+0-9]/g,"").length,y=a?.inputType==="deleteContentForward",v=this._9(),_=W(C,v,c,y);this.a.value=v,this.a.setSelectionRange(_,_)}},this.a.addEventListener("input",this._a12),(t||i)&&(this._handleKeydownEvent=a=>{if(a.key&&a.key.length===1&&!a.altKey&&!a.ctrlKey&&!a.metaKey){if(i&&s&&o&&a.key==="+"){a.preventDefault(),this._nWithPlus();return}if(t){let h=this.a.value,d=h.charAt(0)==="+",p=!d&&this.a.selectionStart===0&&a.key==="+",c=/^[0-9]$/.test(a.key),g=i?c:p||c,C=h.slice(0,this.a.selectionStart)+a.key+h.slice(this.a.selectionEnd),y=this._6(C),v=r.utils.getCoreNumber(y,this.s.iso2),_=this.maxCoreNumberLength&&v.length>this.maxCoreNumberLength,E=!1;if(d){let x=this.s.iso2;E=this._getCountryFromNumber(y)!==x}(!g||_&&!E&&!p)&&a.preventDefault()}}},this.a.addEventListener("keydown",this._handleKeydownEvent))}_j2(t){let e=parseInt(this.a.getAttribute("maxlength")||"",10);return e&&t.length>e?t.substr(0,e):t}_trigger(t,e={}){let i=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:e});this.a.dispatchEvent(i)}_n(){let{fixDropdownWidth:t,countrySearch:e}=this.d;if(t&&(this.dropdownContent.style.width=`${this.a.offsetWidth}px`),this.dropdownContent.classList.remove("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","true"),this._o(),e){let i=this.countryList.firstElementChild;i&&(this._x(i,!1),this.countryList.scrollTop=0),this.searchInput.focus()}this._p(),this.u.classList.add("iti__arrow--up"),this._trigger("open:countrydropdown")}_o(){if(this.d.dropdownContainer&&this.d.dropdownContainer.appendChild(this.dropdown),!this.d.useFullscreenPopup){let t=this.a.getBoundingClientRect(),e=this.a.offsetHeight;this.d.dropdownContainer&&(this.dropdown.style.top=`${t.top+e}px`,this.dropdown.style.left=`${t.left}px`,this._a4=()=>this._2(),window.addEventListener("scroll",this._a4))}}_p(){this._a0=n=>{let s=n.target?.closest(".iti__country");s&&this._x(s,!1)},this.countryList.addEventListener("mouseover",this._a0),this._a1=n=>{let s=n.target?.closest(".iti__country");s&&this._1(s)},this.countryList.addEventListener("click",this._a1);let t=!0;this._a2=()=>{t||this._2(),t=!1},document.documentElement.addEventListener("click",this._a2);let e="",i=null;if(this._a3=n=>{["ArrowUp","ArrowDown","Enter","Escape"].includes(n.key)&&(n.preventDefault(),n.stopPropagation(),n.key==="ArrowUp"||n.key==="ArrowDown"?this._q(n.key):n.key==="Enter"?this._r():n.key==="Escape"&&this._2()),!this.d.countrySearch&&/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(n.key)&&(n.stopPropagation(),i&&clearTimeout(i),e+=n.key.toLowerCase(),this._searchForCountry(e),i=setTimeout(()=>{e=""},1e3))},document.addEventListener("keydown",this._a3),this.d.countrySearch){let n=()=>{let o=this.searchInput.value.trim();o?this._p3(o):this._p3("",!0)},s=null;this._a7=()=>{s&&clearTimeout(s),s=setTimeout(()=>{n(),s=null},100)},this.searchInput.addEventListener("input",this._a7),this.searchInput.addEventListener("click",o=>o.stopPropagation())}}_searchForCountry(t){for(let e=0;e<this.p.length;e++){let i=this.p[e];if(i.name.substr(0,t.length).toLowerCase()===t){let s=i.nodeById[this.id];this._x(s,!1),this._3(s);break}}}_p3(t,e=!1){let i=!0;this.countryList.innerHTML="";let n=M(t);for(let s=0;s<this.p.length;s++){let o=this.p[s],u=M(o.name),a=o.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map(d=>d[0]).join("").toLowerCase(),h=`+${o.dialCode}`;if(e||u.includes(n)||h.includes(n)||o.iso2.includes(n)||a.includes(n)){let d=o.nodeById[this.id];d&&this.countryList.appendChild(d),i&&(this._x(d,!1),i=!1)}}i&&this._x(null,!1),this.countryList.scrollTop=0,this._p4()}_p4(){let{i18n:t}=this.d,e=this.countryList.childElementCount,i;e===0?i=t.zeroSearchResults:e===1?i=t.oneSearchResult:i=t.multipleSearchResults.replace("${count}",e.toString()),this.searchResultsA11yText.textContent=i}_q(t){let e=t==="ArrowUp"?this.c?.previousElementSibling:this.c?.nextElementSibling;!e&&this.countryList.childElementCount>1&&(e=t==="ArrowUp"?this.countryList.lastElementChild:this.countryList.firstElementChild),e&&(this._3(e),this._x(e,!1))}_r(){this.c&&this._1(this.c)}_u(t){let e=t;if(this.d.formatOnDisplay&&r.utils&&this.s){let i=this.d.nationalMode||e.charAt(0)!=="+"&&!this.d.separateDialCode,{NATIONAL:n,INTERNATIONAL:s}=r.utils.numberFormat,o=i?n:s;e=r.utils.formatNumber(e,this.s.iso2,o)}e=this._7(e),this.a.value=e}_v(t){let e=this._getCountryFromNumber(t);return e!==null?this._z(e):!1}_ensureHasDialCode(t){let{dialCode:e,nationalPrefix:i}=this.s;if(t.charAt(0)==="+"||!e)return t;let o=i&&t.charAt(0)===i&&!this.d.separateDialCode?t.substring(1):t;return`+${e}${o}`}_getCountryFromNumber(t){let e=t.indexOf("+"),i=e?t.substring(e):t,n=this.s.iso2,s=this.s.dialCode;i=this._ensureHasDialCode(i);let o=this._5(i,!0),u=I(i);if(o){let a=I(o),h=this.q[a];if(!n&&this.j&&h.includes(this.j))return this.j;let d=n&&h.includes(n)&&(u.length===a.length||!this.s.areaCodes);if(!(s==="1"&&P(u))&&!d){for(let c=0;c<h.length;c++)if(h[c])return h[c]}}else{if(i.charAt(0)==="+"&&u.length)return"";if((!i||i==="+")&&!this.s.iso2)return this.j}return null}_x(t,e){let i=this.c;if(i&&(i.classList.remove("iti__highlight"),i.setAttribute("aria-selected","false")),this.c=t,this.c){this.c.classList.add("iti__highlight"),this.c.setAttribute("aria-selected","true");let n=this.c.getAttribute("id")||"";this.selectedCountry.setAttribute("aria-activedescendant",n),this.d.countrySearch&&this.searchInput.setAttribute("aria-activedescendant",n)}e&&this.c.focus()}_y(t,e){for(let i=0;i<this.p.length;i++)if(this.p[i].iso2===t)return this.p[i];if(e)return null;throw new Error(`No country data for '${t}'`)}_z(t){let{separateDialCode:e,showFlags:i,i18n:n}=this.d,s=this.s.iso2?this.s:{};if(this.s=t?this._y(t,!1)||{}:{},this.s.iso2&&(this.j=this.s.iso2),this.l){let o="",u="";t&&i?(o=`iti__flag iti__${t}`,u=`${this.s.name} +${this.s.dialCode}`):(o="iti__flag iti__globe",u=n.noCountrySelected),this.l.className=o,this.selectedCountryA11yText.textContent=u}if(this._z3(t,e),e){let o=this.s.dialCode?`+${this.s.dialCode}`:"";this.t.innerHTML=o,this._updateInputPadding()}return this._0(),this._updateMaxLength(),s.iso2!==t}_updateInputPadding(){if(this.selectedCountry){let e=(this.selectedCountry.offsetWidth||this._z2())+6;this.showSelectedCountryOnLeft?this.a.style.paddingLeft=`${e}px`:this.a.style.paddingRight=`${e}px`}}_updateMaxLength(){let{strictMode:t,placeholderNumberType:e,validationNumberTypes:i}=this.d,{iso2:n}=this.s;if(t&&r.utils)if(n){let s=r.utils.numberType[e],o=r.utils.getExampleNumber(n,!1,s,!0),u=o;for(;r.utils.isPossibleNumber(o,n,i);)u=o,o+="0";let a=r.utils.getCoreNumber(u,n);this.maxCoreNumberLength=a.length,n==="by"&&(this.maxCoreNumberLength=a.length+1)}else this.maxCoreNumberLength=null}_z3(t=null,e){if(!this.selectedCountry)return;let i;t&&!e?i=`${this.s.name}: +${this.s.dialCode}`:t?i=this.s.name:i="Unknown",this.selectedCountry.setAttribute("title",i)}_z2(){if(this.a.parentNode){let t=this.a.parentNode.cloneNode(!1);t.style.visibility="hidden",document.body.appendChild(t);let e=this.k.cloneNode();t.appendChild(e);let i=this.selectedCountry.cloneNode(!0);e.appendChild(i);let n=i.offsetWidth;return document.body.removeChild(t),n}return 0}_0(){let{autoPlaceholder:t,placeholderNumberType:e,nationalMode:i,customPlaceholder:n}=this.d,s=t==="aggressive"||!this.e&&t==="polite";if(r.utils&&s){let o=r.utils.numberType[e],u=this.s.iso2?r.utils.getExampleNumber(this.s.iso2,i,o):"";u=this._7(u),typeof n=="function"&&(u=n(u,this.s)),this.a.setAttribute("placeholder",u)}}_1(t){let e=this._z(t.getAttribute("data-country-code"));this._2(),this._4(t.getAttribute("data-dial-code")),this.a.focus(),e&&this._8()}_2(){this.dropdownContent.classList.add("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","false"),this.selectedCountry.removeAttribute("aria-activedescendant"),this.c&&this.c.setAttribute("aria-selected","false"),this.d.countrySearch&&this.searchInput.removeAttribute("aria-activedescendant"),this.u.classList.remove("iti__arrow--up"),document.removeEventListener("keydown",this._a3),this.d.countrySearch&&this.searchInput.removeEventListener("input",this._a7),document.documentElement.removeEventListener("click",this._a2),this.countryList.removeEventListener("mouseover",this._a0),this.countryList.removeEventListener("click",this._a1),this.d.dropdownContainer&&(this.d.useFullscreenPopup||window.removeEventListener("scroll",this._a4),this.dropdown.parentNode&&this.dropdown.parentNode.removeChild(this.dropdown)),this._handlePageLoad&&window.removeEventListener("load",this._handlePageLoad),this._trigger("close:countrydropdown")}_3(t){let e=this.countryList,i=document.documentElement.scrollTop,n=e.offsetHeight,s=e.getBoundingClientRect().top+i,o=s+n,u=t.offsetHeight,a=t.getBoundingClientRect().top+i,h=a+u,d=a-s+e.scrollTop;if(a<s)e.scrollTop=d;else if(h>o){let p=n-u;e.scrollTop=d-p}}_4(t){let e=this.a.value,i=`+${t}`,n;if(e.charAt(0)==="+"){let s=this._5(e);s?n=e.replace(s,i):n=i,this.a.value=n}}_5(t,e){let i="";if(t.charAt(0)==="+"){let n="";for(let s=0;s<t.length;s++){let o=t.charAt(s);if(!isNaN(parseInt(o,10))){if(n+=o,e)this.q[n]&&(i=t.substr(0,s+1));else if(this.dialCodes[n]){i=t.substr(0,s+1);break}if(n.length===this.dialCodeMaxLen)break}}}return i}_6(t){let e=t||this.a.value.trim(),{dialCode:i}=this.s,n,s=I(e);return this.d.separateDialCode&&e.charAt(0)!=="+"&&i&&s?n=`+${i}`:n="",n+e}_7(t){let e=t;if(this.d.separateDialCode){let i=this._5(e);if(i){i=`+${this.s.dialCode}`;let n=e[i.length]===" "||e[i.length]==="-"?i.length+1:i.length;e=e.substr(n)}}return this._j2(e)}_8(){this._trigger("countrychange")}_9(){let t=this._6(),e=r.utils?r.utils.formatNumberAsYouType(t,this.s.iso2):t,{dialCode:i}=this.s;return this.d.separateDialCode&&this.a.value.charAt(0)!=="+"&&e.includes(`+${i}`)?(e.split(`+${i}`)[1]||"").trim():e}handleAutoCountry(){this.d.initialCountry==="auto"&&r.autoCountry&&(this.j=r.autoCountry,this.s.iso2||this.l.classList.contains("iti__globe")||this.setCountry(this.j),this.h())}handleUtils(){r.utils&&(this.a.value&&this._u(this.a.value),this.s.iso2&&(this._0(),this._updateMaxLength())),this.i0()}destroy(){let{allowDropdown:t,separateDialCode:e}=this.d;if(t){this._2(),this.selectedCountry.removeEventListener("click",this._a10),this.k.removeEventListener("keydown",this._a11);let s=this.a.closest("label");s&&s.removeEventListener("click",this._a9)}let{form:i}=this.a;this._a14&&i&&i.removeEventListener("submit",this._a14),this.a.removeEventListener("input",this._a12),this._handleKeydownEvent&&this.a.removeEventListener("keydown",this._handleKeydownEvent),this.a.removeAttribute("data-intl-tel-input-id"),e&&(this.isRTL?this.a.style.paddingRight=this.originalPaddingRight:this.a.style.paddingLeft=this.originalPaddingLeft);let n=this.a.parentNode;n?.parentNode?.insertBefore(this.a,n),n?.parentNode?.removeChild(n),delete r.instances[this.id]}getExtension(){return r.utils?r.utils.getExtension(this._6(),this.s.iso2):""}getNumber(t){if(r.utils){let{iso2:e}=this.s;return r.utils.formatNumber(this._6(),e,t)}return""}getNumberType(){return r.utils?r.utils.getNumberType(this._6(),this.s.iso2):-99}getSelectedCountryData(){return this.s}getValidationError(){if(r.utils){let{iso2:t}=this.s;return r.utils.getValidationError(this._6(),t)}return-99}isValidNumber(){if(!this.s.iso2)return!1;let t=this._6(),e=t.search(/\p{L}/u);if(e>-1){let i=t.substring(0,e),n=this._utilsIsPossibleNumber(i),s=this._utilsIsPossibleNumber(t);return n&&s}return this._utilsIsPossibleNumber(t)}_utilsIsPossibleNumber(t){return r.utils?r.utils.isPossibleNumber(t,this.s.iso2,this.d.validationNumberTypes):null}isValidNumberPrecise(){if(!this.s.iso2)return!1;let t=this._6(),e=t.search(/\p{L}/u);if(e>-1){let i=t.substring(0,e),n=this._utilsIsValidNumber(i),s=this._utilsIsValidNumber(t);return n&&s}return this._utilsIsValidNumber(t)}_utilsIsValidNumber(t){return r.utils?r.utils.isValidNumber(t,this.s.iso2,this.d.validationNumberTypes):null}setCountry(t){let e=t?.toLowerCase(),i=this.s.iso2;(t&&e!==i||!t&&i)&&(this._z(e),this._4(this.s.dialCode),this._8())}setNumber(t){let e=this._v(t);this._u(t),e&&this._8(),this._trigger("input",{isSetNumber:!0})}setPlaceholderNumberType(t){this.d.placeholderNumberType=t,this._0()}setDisabled(t){this.a.disabled=t,t?this.selectedCountry.setAttribute("disabled","true"):this.selectedCountry.removeAttribute("disabled")}},G=l=>{if(!r.utils&&!r.startedLoadingUtilsScript){let t;if(typeof l=="function")try{t=Promise.resolve(l())}catch(e){return Promise.reject(e)}else return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof l}`));return r.startedLoadingUtilsScript=!0,t.then(e=>{let i=e?.default;if(!i||typeof i!="object")throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");return r.utils=i,b("handleUtils"),!0}).catch(e=>{throw b("rejectUtilsScriptPromise",e),e})}return null},r=Object.assign((l,t)=>{let e=new w(l,t);return e._init(),l.setAttribute("data-intl-tel-input-id",e.id.toString()),r.instances[e.id]=e,e},{defaults:k,documentReady:()=>document.readyState==="complete",getCountryData:()=>f,getInstance:l=>{let t=l.getAttribute("data-intl-tel-input-id");return t?r.instances[t]:null},instances:{},attachUtils:G,startedLoadingUtilsScript:!1,startedLoadingAutoCountry:!1,version:"25.3.1"}),q=r;return j(Y);})();

// UMD
  return factoryOutput.default;
}));
/* form-utils-br: substituto BR-only do utils.js do intl-tel-input 25.3.1, via libphonenumber-js/core (metadata Brasil apenas) */
(()=>{var ee=t=>{throw TypeError(t)};var tr=(t,e,r)=>e.has(t)||ee("Cannot "+r);var re=(t,e,r)=>e.has(t)?ee("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r);var f=(t,e,r)=>(tr(t,e,"access private method"),r);function st(t,e){t=t.split("-"),e=e.split("-");for(var r=t[0].split("."),n=e[0].split("."),i=0;i<3;i++){var o=Number(r[i]),a=Number(n[i]);if(o>a)return 1;if(a>o)return-1;if(!isNaN(o)&&isNaN(a))return 1;if(isNaN(o)&&!isNaN(a))return-1}return t[1]&&e[1]?t[1]>e[1]?1:t[1]<e[1]?-1:0:!t[1]&&e[1]?1:t[1]&&!e[1]?-1:0}var er={}.constructor;function P(t){return t!=null&&t.constructor===er}var rr=/^\d+$/;function ft(t){return rr.test(t)}function I(t){"@babel/helpers - typeof";return I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(t)}function et(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ne(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,nr(n.key),n)}}function rt(t,e,r){return e&&ne(t.prototype,e),r&&ne(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function nr(t){var e=ir(t,"string");return I(e)=="symbol"?e:e+""}function ir(t,e){if(I(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(I(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var or="1.2.0",ar="1.7.35",ie=" ext. ",c=(function(){function t(e){et(this,t),ct(e),this.metadata=e,le.call(this,e)}return rt(t,[{key:"getCountries",value:function(){return Object.keys(this.metadata.countries).filter(function(r){return r!=="001"})}},{key:"getCountryMetadata",value:function(r){return this.metadata.countries[r]}},{key:"nonGeographic",value:function(){if(!(this.v1||this.v2||this.v3))return this.metadata.nonGeographic||this.metadata.nonGeographical}},{key:"hasCountry",value:function(r){return this.getCountryMetadata(r)!==void 0}},{key:"hasCallingCode",value:function(r){if(this.getCountryCodesForCallingCode(r))return!0;if(this.nonGeographic()){if(this.nonGeographic()[r])return!0}else{var n=this.countryCallingCodes()[r];if(n&&n.length===1&&n[0]==="001")return!0}}},{key:"isNonGeographicCallingCode",value:function(r){return this.nonGeographic()?!!this.nonGeographic()[r]:!this.getCountryCodesForCallingCode(r)}},{key:"country",value:function(r){return this.selectNumberingPlan(r)}},{key:"selectNumberingPlan",value:function(r,n){var i,o;if(r&&(ft(r)?o=r:i=r),n&&(o=n),i&&i!=="001"){var a=this.getCountryMetadata(i);if(!a)throw new Error("Unknown country: ".concat(i));this.numberingPlan=new oe(a,this)}else if(o){if(!this.hasCallingCode(o))throw new Error("Unknown calling code: ".concat(o));this.numberingPlan=new oe(this.getNumberingPlanMetadata(o),this)}else this.numberingPlan=void 0;return this}},{key:"getCountryCodesForCallingCode",value:function(r){var n=this.countryCallingCodes()[r];if(n)return n.length===1&&n[0].length===3?void 0:n}},{key:"getCountryCodeForCallingCode",value:function(r){var n=this.getCountryCodesForCallingCode(r);if(n)return n[0]}},{key:"getNumberingPlanMetadata",value:function(r){var n=this.getCountryCodeForCallingCode(r);if(n)return this.getCountryMetadata(n);if(this.nonGeographic()){var i=this.nonGeographic()[r];if(i)return i}else{var o=this.countryCallingCodes()[r];if(o&&o.length===1&&o[0]==="001")return this.metadata.countries["001"]}}},{key:"countryCallingCode",value:function(){return this.numberingPlan.callingCode()}},{key:"IDDPrefix",value:function(){return this.numberingPlan.IDDPrefix()}},{key:"defaultIDDPrefix",value:function(){return this.numberingPlan.defaultIDDPrefix()}},{key:"nationalNumberPattern",value:function(){return this.numberingPlan.nationalNumberPattern()}},{key:"possibleLengths",value:function(){return this.numberingPlan.possibleLengths()}},{key:"formats",value:function(){return this.numberingPlan.formats()}},{key:"nationalPrefixForParsing",value:function(){return this.numberingPlan.nationalPrefixForParsing()}},{key:"nationalPrefixTransformRule",value:function(){return this.numberingPlan.nationalPrefixTransformRule()}},{key:"leadingDigits",value:function(){return this.numberingPlan.leadingDigits()}},{key:"hasTypes",value:function(){return this.numberingPlan.hasTypes()}},{key:"type",value:function(r){return this.numberingPlan.type(r)}},{key:"ext",value:function(){return this.numberingPlan.ext()}},{key:"countryCallingCodes",value:function(){return this.v1?this.metadata.country_phone_code_to_countries:this.metadata.country_calling_codes}},{key:"chooseCountryByCountryCallingCode",value:function(r){return this.selectNumberingPlan(r)}},{key:"hasSelectedNumberingPlan",value:function(){return this.numberingPlan!==void 0}}])})();var oe=(function(){function t(e,r){et(this,t),this.globalMetadataObject=r,this.metadata=e,le.call(this,r.metadata)}return rt(t,[{key:"callingCode",value:function(){return this.metadata[0]}},{key:"_getDefaultCountryMetadataForThisCallingCode",value:function(){return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode())}},{key:"getDefaultCountryMetadataForRegion",value:function(){return this._getDefaultCountryMetadataForThisCallingCode()}},{key:"IDDPrefix",value:function(){if(!(this.v1||this.v2))return this.metadata[1]}},{key:"defaultIDDPrefix",value:function(){if(!(this.v1||this.v2))return this.metadata[12]}},{key:"nationalNumberPattern",value:function(){return this.v1||this.v2?this.metadata[1]:this.metadata[2]}},{key:"possibleLengths",value:function(){if(!this.v1)return this.metadata[this.v2?2:3]}},{key:"_getFormats",value:function(r){return r[this.v1?2:this.v2?3:4]}},{key:"formats",value:function(){var r=this,n=this._getFormats(this.metadata)||this._getFormats(this._getDefaultCountryMetadataForThisCallingCode())||[];return n.map(function(i){return new ur(i,r)})}},{key:"nationalPrefix",value:function(){return this.metadata[this.v1?3:this.v2?4:5]}},{key:"_getNationalPrefixFormattingRule",value:function(r){return r[this.v1?4:this.v2?5:6]}},{key:"nationalPrefixFormattingRule",value:function(){return this._getNationalPrefixFormattingRule(this.metadata)||this._getNationalPrefixFormattingRule(this._getDefaultCountryMetadataForThisCallingCode())}},{key:"_nationalPrefixForParsing",value:function(){return this.metadata[this.v1?5:this.v2?6:7]}},{key:"nationalPrefixForParsing",value:function(){return this._nationalPrefixForParsing()||this.nationalPrefix()}},{key:"nationalPrefixTransformRule",value:function(){return this.metadata[this.v1?6:this.v2?7:8]}},{key:"_getNationalPrefixIsOptionalWhenFormatting",value:function(){return!!this.metadata[this.v1?7:this.v2?8:9]}},{key:"nationalPrefixIsOptionalWhenFormattingInNationalFormat",value:function(){return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata)||this._getNationalPrefixIsOptionalWhenFormatting(this._getDefaultCountryMetadataForThisCallingCode())}},{key:"leadingDigits",value:function(){return this.metadata[this.v1?8:this.v2?9:10]}},{key:"types",value:function(){return this.metadata[this.v1?9:this.v2?10:11]}},{key:"hasTypes",value:function(){return this.types()&&this.types().length===0?!1:!!this.types()}},{key:"type",value:function(r){if(this.hasTypes()&&ae(this.types(),r))return new sr(ae(this.types(),r),this)}},{key:"ext",value:function(){return this.v1||this.v2?ie:this.metadata[13]||ie}}])})(),ur=(function(){function t(e,r){et(this,t),this._format=e,this.metadata=r}return rt(t,[{key:"pattern",value:function(){return this._format[0]}},{key:"format",value:function(){return this._format[1]}},{key:"leadingDigitsPatterns",value:function(){return this._format[2]||[]}},{key:"nationalPrefixFormattingRule",value:function(){return this._format[3]||this.metadata.nationalPrefixFormattingRule()}},{key:"nationalPrefixIsOptionalWhenFormattingInNationalFormat",value:function(){return!!this._format[4]||this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat()}},{key:"nationalPrefixIsMandatoryWhenFormattingInNationalFormat",value:function(){return this.usesNationalPrefix()&&!this.nationalPrefixIsOptionalWhenFormattingInNationalFormat()}},{key:"usesNationalPrefix",value:function(){return!!(this.nationalPrefixFormattingRule()&&!lr.test(this.nationalPrefixFormattingRule()))}},{key:"internationalFormat",value:function(){return this._format[5]||this.format()}}])})(),lr=/^\(?\$1\)?$/,sr=(function(){function t(e,r){et(this,t),this.type=e,this.metadata=r}return rt(t,[{key:"pattern",value:function(){return this.metadata.v1?this.type:this.type[0]}},{key:"possibleLengths",value:function(){if(!this.metadata.v1)return this.type[1]||this.metadata.possibleLengths()}}])})();function ae(t,e){switch(e){case"FIXED_LINE":return t[0];case"MOBILE":return t[1];case"TOLL_FREE":return t[2];case"PREMIUM_RATE":return t[3];case"PERSONAL_NUMBER":return t[4];case"VOICEMAIL":return t[5];case"UAN":return t[6];case"PAGER":return t[7];case"VOIP":return t[8];case"SHARED_COST":return t[9]}}function ct(t){if(!t)throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");if(!P(t)||!P(t.countries))throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(P(t)?"an object of shape: { "+Object.keys(t).join(", ")+" }":"a "+fr(t)+": "+t,"."))}var fr=function(e){return I(e)};function D(t,e){var r=new c(e);if(r.hasCountry(t))return r.selectNumberingPlan(t).countryCallingCode();throw new Error("Unknown country: ".concat(t))}function ue(t,e){return e.countries.hasOwnProperty(t)}function le(t){var e=t.version;typeof e=="number"?(this.v1=e===1,this.v2=e===2,this.v3=e===3,this.v4=e===4):e?st(e,or)===-1?this.v2=!0:st(e,ar)===-1?this.v3=!0:this.v4=!0:this.v1=!0}function cr(t,e){var r=typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=mr(t))||e&&t&&typeof t.length=="number"){r&&(t=r);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function mr(t,e){if(t){if(typeof t=="string")return se(t,e);var r={}.toString.call(t).slice(8,-1);return r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set"?Array.from(t):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?se(t,e):void 0}}function se(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function mt(t,e){for(var r=t.slice(),n=cr(e),i;!(i=n()).done;){var o=i.value;t.indexOf(o)<0&&r.push(o)}return r.sort(function(a,u){return a-u})}function v(t,e,r){return fe(t,void 0,e,r)}function fe(t,e,r,n){r&&(n=new c(n.metadata),n.selectNumberingPlan(r));var i=n.type(e),o=i&&i.possibleLengths()||n.possibleLengths();if(!o)return"IS_POSSIBLE";if(e==="FIXED_LINE_OR_MOBILE"){if(!n.type("FIXED_LINE"))return fe(t,"MOBILE",r,n);var a=n.type("MOBILE");a&&(o=mt(o,a.possibleLengths()))}else if(e&&!i)return"INVALID_LENGTH";var u=t.length,s=o[0];return s===u?"IS_POSSIBLE":s>u?"TOO_SHORT":o[o.length-1]<u?"TOO_LONG":o.indexOf(u,1)>=0?"IS_POSSIBLE":"INVALID_LENGTH"}function ht(t,e,r){e===void 0&&(e={});var n=new c(r);if(e.v2){if(!t.countryCallingCode)throw new Error("Invalid phone number object passed");n.selectNumberingPlan(t.country||t.countryCallingCode)}else{if(!t.phone)return!1;if(t.country){if(!n.hasCountry(t.country))throw new Error("Unknown country: ".concat(t.country));n.selectNumberingPlan(t.country)}else{if(!t.countryCallingCode)throw new Error("Invalid phone number object passed");n.selectNumberingPlan(t.countryCallingCode)}}if(n.possibleLengths())return pt(t.phone||t.nationalNumber,n);if(t.countryCallingCode&&n.isNonGeographicCallingCode(t.countryCallingCode))return!0;throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.')}function pt(t,e){return v(t,void 0,e)==="IS_POSSIBLE"}function g(t,e){return t=t||"",new RegExp("^(?:"+e+")$").test(t)}function hr(t,e){var r=typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=pr(t))||e&&t&&typeof t.length=="number"){r&&(t=r);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pr(t,e){if(t){if(typeof t=="string")return ce(t,e);var r={}.toString.call(t).slice(8,-1);return r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set"?Array.from(t):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ce(t,e):void 0}}function ce(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}var gr=["MOBILE","PREMIUM_RATE","TOLL_FREE","SHARED_COST","VOIP","PERSONAL_NUMBER","PAGER","UAN","VOICEMAIL"];function E(t,e,r){if(e=e||{},!(!t.country&&!t.countryCallingCode)){var n=new c(r);n.selectNumberingPlan(t.country||t.countryCallingCode);var i=e.v2?t.nationalNumber:t.phone;if(g(i,n.nationalNumberPattern())){if(gt(i,"FIXED_LINE",n))return n.type("MOBILE")&&n.type("MOBILE").pattern()===""||!n.type("MOBILE")||gt(i,"MOBILE",n)?"FIXED_LINE_OR_MOBILE":"FIXED_LINE";for(var o=hr(gr),a;!(a=o()).done;){var u=a.value;if(gt(i,u,n))return u}}}}function gt(t,e,r){var n=r.type(e);return!n||!n.pattern()||n.possibleLengths()&&n.possibleLengths().indexOf(t.length)<0?!1:g(t,n.pattern())}function dt(t,e,r){e=e||{};var n=new c(r);if(n.selectNumberingPlan(t.country||t.countryCallingCode),n.hasTypes())return E(t,e,n.metadata)!==void 0;var i=e.v2?t.nationalNumber:t.phone;return g(i,n.nationalNumberPattern())}var dr=/^[A-Z]{2}$/;function yt(t){return dr.test(t)}var yr=!1;function bt(t,e){var r,n,i=new c(e);return yt(t)?(r=t,i.selectNumberingPlan(r),n=i.countryCallingCode()):(n=t,yr&&i.isNonGeographicCallingCode(n)&&(r="001")),{country:r,callingCode:n}}function Nt(t,e,r){var n=new c(r),i=n.getCountryCodesForCallingCode(t);return i?i.filter(function(o){return br(e,o,r)}):[]}function br(t,e,r){var n=new c(r);return n.selectNumberingPlan(e),n.numberingPlan.possibleLengths().indexOf(t.length)>=0}var M=2,me=17,he=3,d="0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9",Nr="-\u2010-\u2015\u2212\u30FC\uFF0D",Pr="\uFF0F/",vr="\uFF0E.",_r=" \xA0\xAD\u200B\u2060\u3000",Cr="()\uFF08\uFF09\uFF3B\uFF3D\\[\\]",Or="~\u2053\u223C\uFF5E",F="".concat(Nr).concat(Pr).concat(vr).concat(_r).concat(Cr).concat(Or),j="+\uFF0B";var Er=new RegExp("(["+d+"])");function Pt(t,e,r,n){if(e){var i=new c(n);i.selectNumberingPlan(e||r);var o=new RegExp(i.IDDPrefix());if(t.search(o)===0){t=t.slice(t.match(o)[0].length);var a=t.match(Er);if(!(a&&a[1]!=null&&a[1].length>0&&a[1]==="0"))return t}}}function vt(t,e){if(t&&e.numberingPlan.nationalPrefixForParsing()){var r=new RegExp("^(?:"+e.numberingPlan.nationalPrefixForParsing()+")"),n=r.exec(t);if(n){var i,o,a=n.length-1,u=a>0&&n[a];if(e.nationalPrefixTransformRule()&&u)i=t.replace(r,e.nationalPrefixTransformRule()),a>1&&(o=n[1]);else{var s=n[0];i=t.slice(s.length),u&&(o=n[1])}var m;if(u){var h=t.indexOf(n[1]),p=t.slice(0,h);p===e.numberingPlan.nationalPrefix()&&(m=e.numberingPlan.nationalPrefix())}else m=n[0];return{nationalNumber:i,nationalPrefix:m,carrierCode:o}}}return{nationalNumber:t}}function xr(t,e){var r=typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=Ir(t))||e&&t&&typeof t.length=="number"){r&&(t=r);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ir(t,e){if(t){if(typeof t=="string")return pe(t,e);var r={}.toString.call(t).slice(8,-1);return r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set"?Array.from(t):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?pe(t,e):void 0}}function pe(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function _t(t,e,r){for(var n=new c(r),i=xr(e),o;!(o=i()).done;){var a=o.value;if(n.selectNumberingPlan(a),n.leadingDigits()){if(t&&t.search(n.leadingDigits())===0)return a}else if(E({phone:t,country:a},void 0,n.metadata))return a}}var Fr=!1;function G(t,e){var r=e.nationalNumber,n=e.metadata;if(Fr&&n.isNonGeographicCallingCode(t))return"001";var i=n.getCountryCodesForCallingCode(t);if(i)return i.length===1?i[0]:_t(r,i,n.metadata)}function T(t,e,r){var n=vt(t,r),i=n.carrierCode,o=n.nationalNumber;if(o!==t){if(!Tr(t,o,r))return{nationalNumber:t};if(r.numberingPlan.possibleLengths()&&(e||(e=G(r.numberingPlan.callingCode(),{nationalNumber:o,metadata:r})),!Sr(o,e,r)))return{nationalNumber:t}}return{nationalNumber:o,carrierCode:i}}function Tr(t,e,r){return!(g(t,r.nationalNumberPattern())&&!g(e,r.nationalNumberPattern()))}function Sr(t,e,r){switch(v(t,e,r)){case"TOO_SHORT":case"INVALID_LENGTH":return!1;default:return!0}}function Ct(t,e,r,n,i){if(!(e||r||n))return{number:t};var o=e||r?D(e||r,i):n;if(t.indexOf(o)===0){var a=new c(i);a.selectNumberingPlan(e||r||n);var u=t.slice(o.length),s=T(u,void 0,a),m=s.nationalNumber,h=T(t,void 0,a),p=h.nationalNumber;if(!g(p,a.nationalNumberPattern())&&g(m,a.nationalNumberPattern())||v(p,void 0,a)==="TOO_LONG")return{countryCallingCode:o,number:u}}return{number:t}}function k(t,e,r,n,i){if(!t)return{};var o;if(t[0]!=="+"){var a=Pt(t,e||r,n,i);if(a&&a!==t)o=!0,t="+"+a;else{if(e||r||n){var u=Ct(t,e,r,n,i),s=u.countryCallingCode,m=u.number;if(s)return{countryCallingCodeSource:"FROM_NUMBER_WITHOUT_PLUS_SIGN",countryCallingCode:s,number:m}}return{number:t}}}if(t[1]==="0")return{};for(var h=new c(i),p=2;p-1<=he&&p<=t.length;){var N=t.slice(1,p);if(h.hasCallingCode(N))return h.selectNumberingPlan(N),{countryCallingCodeSource:o?"FROM_NUMBER_WITH_IDD":"FROM_NUMBER_WITH_PLUS_SIGN",countryCallingCode:N,number:t.slice(p)};p++}return{}}function Ot(t){return t.replace(new RegExp("[".concat(F,"]+"),"g")," ").trim()}var Ar=/(\$\d)/;function Et(t,e,r){var n=r.useInternationalFormat,i=r.withNationalPrefix,o=r.carrierCode,a=r.metadata,u=t.replace(new RegExp(e.pattern()),n?e.internationalFormat():i&&e.nationalPrefixFormattingRule()?e.format().replace(Ar,e.nationalPrefixFormattingRule()):e.format());return n?Ot(u):u}var Rr=/^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;function xt(t,e,r){var n=new c(r);if(n.selectNumberingPlan(t||e),n.defaultIDDPrefix())return n.defaultIDDPrefix();if(Rr.test(n.IDDPrefix()))return n.IDDPrefix()}var Lr=";ext=",S=function(e){return"([".concat(d,"]{1,").concat(e,"})")};function U(t){var e="20",r="15",n="9",i="6",o="[ \xA0\\t,]*",a="[:\\.\uFF0E]?[ \xA0\\t,-]*",u="#?",s="(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)",m="(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)",h="[- ]+",p="[ \xA0\\t]*",N="(?:,{2}|;)",L=Lr+S(e),O=o+s+a+S(e)+u,w=o+m+a+S(n)+u,Ze=h+S(i)+"#",Qe=p+N+a+S(r)+u,Je=p+"(?:,)+"+a+S(n)+u;return L+"|"+O+"|"+w+"|"+Ze+"|"+Qe+"|"+Je}var wr="["+d+"]{"+M+"}",Dr="["+j+"]{0,1}(?:["+F+"]*["+d+"]){3,}["+F+d+"]*",Mr=new RegExp("^["+j+"]{0,1}(?:["+F+"]*["+d+"]){1,2}$","i"),jr=Dr+"(?:"+U()+")?",Gr=new RegExp("^"+wr+"$|^"+jr+"$","i");function It(t){return t.length>=M&&Gr.test(t)}function ge(t){return Mr.test(t)}function de(t){var e=t.number,r=t.ext;if(!e)return"";if(e[0]!=="+")throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');return"tel:".concat(e).concat(r?";ext="+r:"")}var ye={formatExtension:function(e,r,n){return"".concat(e).concat(n.ext()).concat(r)}};function Tt(t,e,r,n){r?r=Br({},ye,r):r=ye;var i=new c(n);if(t.country&&t.country!=="001"){if(!i.hasCountry(t.country))throw new Error("Unknown country: ".concat(t.country));i.selectNumberingPlan(t.country)}else if(t.countryCallingCode)i.selectNumberingPlan(t.countryCallingCode);else return t.phone||"";var o=i.countryCallingCode(),a=r.v2?t.nationalNumber:t.phone,u;switch(e){case"NATIONAL":return a?(u=nt(a,t.carrierCode,"NATIONAL",i,r),Ft(u,t.ext,i,r.formatExtension)):"";case"INTERNATIONAL":return a?(u=nt(a,null,"INTERNATIONAL",i,r),u="+".concat(o," ").concat(u),Ft(u,t.ext,i,r.formatExtension)):"+".concat(o);case"E.164":return"+".concat(o).concat(a);case"RFC3966":return de({number:"+".concat(o).concat(a),ext:t.ext});case"IDD":if(!r.fromCountry)return;var s=Ur(a,t.carrierCode,o,r.fromCountry,i);return s?Ft(s,t.ext,i,r.formatExtension):void 0;default:throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(e,'"'))}}function nt(t,e,r,n,i){var o=kr(n.formats(),t);return o?Et(t,o,{useInternationalFormat:r==="INTERNATIONAL",withNationalPrefix:!(o.nationalPrefixIsOptionalWhenFormattingInNationalFormat()&&i&&i.nationalPrefix===!1),carrierCode:e,metadata:n}):t}function kr(t,e){return $r(t,function(r){if(r.leadingDigitsPatterns().length>0){var n=r.leadingDigitsPatterns()[r.leadingDigitsPatterns().length-1];if(e.search(n)!==0)return!1}return g(e,r.pattern())})}function Ft(t,e,r,n){return e?n(t,e,r):t}function Ur(t,e,r,n,i){var o=D(n,i.metadata);if(o===r){var a=nt(t,e,"NATIONAL",i);return r==="1"?r+" "+a:a}var u=xt(n,void 0,i.metadata);if(u)return"".concat(u," ").concat(r," ").concat(nt(t,null,"INTERNATIONAL",i))}function Br(){for(var t=1,e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];for(;t<r.length;){if(r[t])for(var i in r[t])r[0][i]=r[t][i];t++}return r[0]}function $r(t,e){for(var r=0;r<t.length;){if(e(t[r]))return t[r];r++}}function B(t){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B(t)}function be(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,n)}return r}function Ne(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?be(Object(r),!0).forEach(function(n){Hr(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):be(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function Hr(t,e,r){return(e=ve(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Wr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Pe(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,ve(n.key),n)}}function Vr(t,e,r){return e&&Pe(t.prototype,e),r&&Pe(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function ve(t){var e=Xr(t,"string");return B(e)=="symbol"?e:e+""}function Xr(t,e){if(B(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(B(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var $=(function(){function t(e,r,n){if(Wr(this,t),!e)throw new TypeError("First argument is required");if(typeof e!="string")throw new TypeError("First argument must be a string");if(e[0]==="+"&&!r)throw new TypeError("`metadata` argument not passed");if(P(r)&&P(r.countries)){n=r;var i=e;if(!Yr.test(i))throw new Error('Invalid `number` argument passed: must consist of a "+" followed by digits');var o=k(i,void 0,void 0,void 0,n),a=o.countryCallingCode,u=o.number;if(r=u,e=a,!r)throw new Error("Invalid `number` argument passed: too short")}if(!r)throw new TypeError("`nationalNumber` argument is required");if(typeof r!="string")throw new TypeError("`nationalNumber` argument must be a string");ct(n);var s=bt(e,n),m=s.country,h=s.callingCode;this.country=m,this.countryCallingCode=h,this.nationalNumber=r,this.number="+"+this.countryCallingCode+this.nationalNumber,this.getMetadata=function(){return n}}return Vr(t,[{key:"setExt",value:function(r){this.ext=r}},{key:"getPossibleCountries",value:function(){return this.country?[this.country]:Nt(this.countryCallingCode,this.nationalNumber,this.getMetadata())}},{key:"isPossible",value:function(){return ht(this,{v2:!0},this.getMetadata())}},{key:"isValid",value:function(){return dt(this,{v2:!0},this.getMetadata())}},{key:"isNonGeographic",value:function(){var r=new c(this.getMetadata());return r.isNonGeographicCallingCode(this.countryCallingCode)}},{key:"isEqual",value:function(r){return this.number===r.number&&this.ext===r.ext}},{key:"getType",value:function(){return E(this,{v2:!0},this.getMetadata())}},{key:"format",value:function(r,n){return Tt(this,r,n?Ne(Ne({},n),{},{v2:!0}):{v2:!0},this.getMetadata())}},{key:"formatNational",value:function(r){return this.format("NATIONAL",r)}},{key:"formatInternational",value:function(r){return this.format("INTERNATIONAL",r)}},{key:"getURI",value:function(r){return this.format("RFC3966",r)}}])})();var Yr=/^\+\d+$/;function A(t){"@babel/helpers - typeof";return A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(t)}function _e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,zr(n.key),n)}}function Kr(t,e,r){return e&&_e(t.prototype,e),r&&_e(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function zr(t){var e=qr(t,"string");return A(e)=="symbol"?e:e+""}function qr(t,e){if(A(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(A(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Zr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Qr(t,e,r){return e=W(e),Jr(t,At()?Reflect.construct(e,r||[],W(t).constructor):e.apply(t,r))}function Jr(t,e){if(e&&(A(e)=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return tn(t)}function tn(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function en(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&H(t,e)}function St(t){var e=typeof Map=="function"?new Map:void 0;return St=function(n){if(n===null||!nn(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(e!==void 0){if(e.has(n))return e.get(n);e.set(n,i)}function i(){return rn(n,arguments,W(this).constructor)}return i.prototype=Object.create(n.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),H(i,n)},St(t)}function rn(t,e,r){if(At())return Reflect.construct.apply(null,arguments);var n=[null];n.push.apply(n,e);var i=new(t.bind.apply(t,n));return r&&H(i,r.prototype),i}function At(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(At=function(){return!!t})()}function nn(t){try{return Function.toString.call(t).indexOf("[native code]")!==-1}catch{return typeof t=="function"}}function H(t,e){return H=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},H(t,e)}function W(t){return W=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},W(t)}var b=(function(t){function e(r){var n;return Zr(this,e),n=Qr(this,e,[r]),Object.setPrototypeOf(n,e.prototype),n.name=n.constructor.name,n}return en(e,t),Kr(e)})(St(Error));var Ce=new RegExp("(?:"+U()+")$","i");function Rt(t){var e=t.search(Ce);if(e<0)return{};for(var r=t.slice(0,e),n=t.match(Ce),i=1;i<n.length;){if(n[i])return{number:r,ext:n[i]};i++}}var on={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uFF10":"0","\uFF11":"1","\uFF12":"2","\uFF13":"3","\uFF14":"4","\uFF15":"5","\uFF16":"6","\uFF17":"7","\uFF18":"8","\uFF19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9"};function Oe(t){return on[t]}function an(t,e){var r=typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=un(t))||e&&t&&typeof t.length=="number"){r&&(t=r);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function un(t,e){if(t){if(typeof t=="string")return Ee(t,e);var r={}.toString.call(t).slice(8,-1);return r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set"?Array.from(t):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Ee(t,e):void 0}}function Ee(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function it(t){for(var e="",r=an(t.split("")),n;!(n=r()).done;){var i=n.value;e+=ln(i,e)||""}return e}function ln(t,e,r){if(t==="+"){if(e){typeof r=="function"&&r("end");return}return"+"}return Oe(t)}var wt="+",sn="[\\-\\.\\(\\)]?",xe="(["+d+"]|"+sn+")",fn="^\\"+wt+xe+"*["+d+"]"+xe+"*$",cn=new RegExp(fn,"g"),Lt=d,mn="["+Lt+"]+((\\-)*["+Lt+"])*",hn="a-zA-Z",pn="["+hn+"]+((\\-)*["+Lt+"])*",gn="^("+mn+"\\.)*"+pn+"\\.?$",dn=new RegExp(gn,"g"),Dt="tel:",ot=";phone-context=",Ie=";isub=";function Mt(t){var e=t.indexOf(ot);if(e<0)return null;var r=e+ot.length;if(r>=t.length)return"";var n=t.indexOf(";",r);return n>=0?t.substring(r,n):t.substring(r)}function Fe(t){return t===null?!0:t.length===0?!1:cn.test(t)||dn.test(t)}function jt(t,e){var r=e.extractFormattedPhoneNumber,n=Mt(t);if(!Fe(n))throw new b("NOT_A_NUMBER");var i;if(n===null)i=r(t)||"";else{i="",n.charAt(0)===wt&&(i+=n);var o=t.indexOf(Dt),a;o>=0?a=o+Dt.length:a=0;var u=t.indexOf(ot);i+=t.substring(a,u)}var s=i.indexOf(Ie);if(s>0&&(i=i.substring(0,s)),i!=="")return i}var yn=250,bn=new RegExp("["+j+d+"]"),Nn=new RegExp("[^"+d+"#]+$"),Pn=!1;function Gt(t,e,r){e=e||{};var n=new c(r);if(e.defaultCountry&&!n.hasCountry(e.defaultCountry))throw e.v2?new b("INVALID_COUNTRY"):new Error("Unknown country: ".concat(e.defaultCountry));var i=_n(t,e.v2,e.extract),o=i.number,a=i.ext,u=i.error;if(!o){if(e.v2)throw u==="TOO_SHORT"?new b("TOO_SHORT"):new b("NOT_A_NUMBER");return{}}var s=On(o,e.defaultCountry,e.defaultCallingCode,n),m=s.country,h=s.nationalNumber,p=s.countryCallingCode,N=s.countryCallingCodeSource,L=s.carrierCode;if(!n.hasSelectedNumberingPlan()){if(e.v2)throw new b("INVALID_COUNTRY");return{}}if(!h||h.length<M){if(e.v2)throw new b("TOO_SHORT");return{}}if(h.length>me){if(e.v2)throw new b("TOO_LONG");return{}}if(e.v2){var O=new $(p,h,n.metadata);return m&&(O.country=m),L&&(O.carrierCode=L),a&&(O.ext=a),O.__countryCallingCodeSource=N,O}var w=(e.extended?n.hasSelectedNumberingPlan():m)?g(h,n.nationalNumberPattern()):!1;return e.extended?{country:m,countryCallingCode:p,carrierCode:L,valid:w,possible:w?!0:!!(e.extended===!0&&n.possibleLengths()&&pt(h,n)),phone:h,ext:a}:w?Cn(m,h,a):{}}function vn(t,e,r){if(t){if(t.length>yn){if(r)throw new b("TOO_LONG");return}if(e===!1)return t;var n=t.search(bn);if(!(n<0))return t.slice(n).replace(Nn,"")}}function _n(t,e,r){var n=jt(t,{extractFormattedPhoneNumber:function(a){return vn(a,r,e)}});if(!n)return{};if(!It(n))return ge(n)?{error:"TOO_SHORT"}:{};var i=Rt(n);return i.ext?i:{number:n}}function Cn(t,e,r){var n={country:t,phone:e};return r&&(n.ext=r),n}function On(t,e,r,n){var i=k(it(t),void 0,e,r,n.metadata),o=i.countryCallingCodeSource,a=i.countryCallingCode,u=i.number,s;if(a)n.selectNumberingPlan(a);else if(u&&(e||r))e?(s=e,n.selectNumberingPlan(e),a=n.numberingPlan.callingCode()):(n.selectNumberingPlan(r),a=r,Pn&&n.isNonGeographicCallingCode(a)&&(s="001"));else return{};if(!u)return{countryCallingCodeSource:o,countryCallingCode:a};var m=T(it(u),void 0,n),h=m.nationalNumber,p=m.carrierCode,N=G(a,{nationalNumber:h,metadata:n});return N&&(s=N,N==="001"||n.selectNumberingPlan(s)),{country:s,countryCallingCode:a,countryCallingCodeSource:o,nationalNumber:h,carrierCode:p}}function V(t){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},V(t)}function Te(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,n)}return r}function Se(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Te(Object(r),!0).forEach(function(n){En(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Te(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function En(t,e,r){return(e=xn(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function xn(t){var e=In(t,"string");return V(e)=="symbol"?e:e+""}function In(t,e){if(V(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(V(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function X(t,e,r){return Gt(t,Se(Se({},e),{},{v2:!0}),r)}function Y(t){"@babel/helpers - typeof";return Y=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Y(t)}function Ae(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,n)}return r}function Fn(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Ae(Object(r),!0).forEach(function(n){Tn(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ae(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function Tn(t,e,r){return(e=Sn(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Sn(t){var e=An(t,"string");return Y(e)=="symbol"?e:e+""}function An(t,e){if(Y(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(Y(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Rn(t,e){return Mn(t)||Dn(t,e)||wn(t,e)||Ln()}function Ln(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function wn(t,e){if(t){if(typeof t=="string")return Re(t,e);var r={}.toString.call(t).slice(8,-1);return r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set"?Array.from(t):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Re(t,e):void 0}}function Re(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function Dn(t,e){var r=t==null?null:typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(r!=null){var n,i,o,a,u=[],s=!0,m=!1;try{if(o=(r=r.call(t)).next,e===0){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=o.call(r)).done)&&(u.push(n.value),u.length!==e);s=!0);}catch(h){m=!0,i=h}finally{try{if(!s&&r.return!=null&&(a=r.return(),Object(a)!==a))return}finally{if(m)throw i}}return u}}function Mn(t){if(Array.isArray(t))return t}function K(t){var e=Array.prototype.slice.call(t),r=Rn(e,4),n=r[0],i=r[1],o=r[2],a=r[3],u,s,m;if(typeof n=="string")u=n;else throw new TypeError("A text for parsing must be a string.");if(!i||typeof i=="string")a?(s=o,m=a):(s=void 0,m=o),i&&(s=Fn({defaultCountry:i},s));else if(P(i))o?(s=i,m=o):m=i;else throw new Error("Invalid second argument: ".concat(i));return{text:u,options:s,metadata:m}}function z(t){"@babel/helpers - typeof";return z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(t)}function Le(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,n)}return r}function we(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Le(Object(r),!0).forEach(function(n){jn(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Le(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function jn(t,e,r){return(e=Gn(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Gn(t){var e=kn(t,"string");return z(e)=="symbol"?e:e+""}function kn(t,e){if(z(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(z(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function kt(t,e,r){e&&e.defaultCountry&&!ue(e.defaultCountry,r)&&(e=we(we({},e),{},{defaultCountry:void 0}));try{return X(t,e,r)}catch(n){if(!(n instanceof b))throw n}}function q(){var t=K(arguments),e=t.text,r=t.options,n=t.metadata;return kt(e,r,n)}function Z(t){"@babel/helpers - typeof";return Z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Z(t)}function De(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,n)}return r}function Me(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?De(Object(r),!0).forEach(function(n){Un(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):De(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function Un(t,e,r){return(e=Bn(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Bn(t){var e=$n(t,"string");return Z(e)=="symbol"?e:e+""}function $n(t,e){if(Z(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(Z(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function at(){var t=K(arguments),e=t.text,r=t.options,n=t.metadata;r=Me(Me({},r),{},{extract:!1});try{var i=X(e,r,n),o=new c(n);o.selectNumberingPlan(i.country||i.countryCallingCode);var a=v(i.nationalNumber,void 0,o);if(a!=="IS_POSSIBLE")return a}catch(u){if(u instanceof b)return u.message;throw u}}var je=new RegExp("\u2008"),Q=" ",Ge=3,Hn=3,ke=/[- ]/,Wn=/^\(?\$1\)?$/,Ut="-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E",Vn=new RegExp("^["+Ut+"]*\\$1["+Ut+"]*(\\$\\d["+Ut+"]*)*$"),Xn=/([0-9])/,Yn=/[^0-9+]/g;function Ue(t){return t.length===0||Wn.test(t)}function Kn(t){return t.replace(Yn,"")}var l,Be,$e,Bt,He,$t,Ht,We,Wt,Ve,Vt,Xe,Ye,Xt,Yt,J,ut,Kt,zt,lt=class{constructor(e){re(this,l);this.metadata=e,this.currentOutput="",this.formattingTemplate="",this.currentFormattingPattern="",this.accruedInput="",this.accruedInputWithoutFormatting="",this.ableToFormat=!0,this.inputHasFormatting=!1,this.isCompleteNumber=!1,this.isExpectingCountryCallingCode=!1,this.lastMatchPosition=0,this.prefixBeforeNationalNumber="",this.shouldAddSpaceAfterNationalPrefix=!1,this.extractedNationalPrefix="",this.nationalNumber="",this.possibleFormats=[]}inputDigit(e){return this.currentOutput=f(this,l,$e).call(this,e),this.currentOutput}};l=new WeakSet,Be=function(e){return Xn.test(e)||this.accruedInput.length===1&&e==="+"},$e=function(e){if(this.accruedInput+=e,f(this,l,Be).call(this,e)?e=f(this,l,He).call(this,e):(this.ableToFormat=!1,this.inputHasFormatting=!0),!this.ableToFormat){if(this.inputHasFormatting)return this.accruedInput;if(f(this,l,$t).call(this)){if(f(this,l,Ht).call(this))return f(this,l,Bt).call(this)}else if(f(this,l,We).call(this))return this.prefixBeforeNationalNumber+=Q,f(this,l,Bt).call(this);return this.accruedInput}switch(this.accruedInputWithoutFormatting.length){case 0:case 1:case 2:return this.accruedInput;case 3:if(f(this,l,$t).call(this))this.isExpectingCountryCallingCode=!0;else return this.extractedNationalPrefix=f(this,l,Wt).call(this),f(this,l,ut).call(this);default:if(this.isExpectingCountryCallingCode)return f(this,l,Ht).call(this)&&(this.isExpectingCountryCallingCode=!1),this.prefixBeforeNationalNumber+this.nationalNumber;if(this.possibleFormats.length>0){let r=f(this,l,zt).call(this,e),n=f(this,l,Yt).call(this);return n.length>0?n:(f(this,l,Vt).call(this,this.nationalNumber),f(this,l,Xt).call(this)?f(this,l,Kt).call(this):this.ableToFormat?f(this,l,J).call(this,r):this.accruedInput)}return f(this,l,ut).call(this)}},Bt=function(){return this.ableToFormat=!0,this.isExpectingCountryCallingCode=!1,this.possibleFormats=[],this.lastMatchPosition=0,this.formattingTemplate="",this.currentFormattingPattern="",f(this,l,ut).call(this)},He=function(e){return e==="+"?this.accruedInputWithoutFormatting+=e:(this.accruedInputWithoutFormatting+=e,this.nationalNumber+=e),e},$t=function(){let e=new RegExp("^(?:\\+|"+this.metadata.internationalPrefix+")"),r=this.accruedInputWithoutFormatting.match(e);if(r&&r[0]&&r[0].length>0){this.isCompleteNumber=!0;let n=r[0].length;return this.nationalNumber=this.accruedInputWithoutFormatting.slice(n),this.prefixBeforeNationalNumber=this.accruedInputWithoutFormatting.slice(0,n),this.accruedInputWithoutFormatting.charAt(0)!=="+"&&(this.prefixBeforeNationalNumber+=Q),!0}return!1},Ht=function(){if(this.nationalNumber.length===0)return!1;let e=this.nationalNumber.length;for(let r=1;r<=Hn&&r<=e;r++){let n=parseInt(this.nationalNumber.slice(0,r),10);if(n===this.metadata.countryCode)return this.nationalNumber=this.nationalNumber.slice(r),this.prefixBeforeNationalNumber+=String(n)+Q,this.extractedNationalPrefix="",!0}return!1},We=function(){if(this.extractedNationalPrefix.length>0){this.nationalNumber=this.extractedNationalPrefix+this.nationalNumber;let e=this.prefixBeforeNationalNumber.lastIndexOf(this.extractedNationalPrefix);this.prefixBeforeNationalNumber=this.prefixBeforeNationalNumber.slice(0,e)}return this.extractedNationalPrefix!==f(this,l,Wt).call(this)},Wt=function(){let e=this.nationalNumber,r=0;if(this.metadata.nationalPrefixForParsing){let n=new RegExp("^(?:"+this.metadata.nationalPrefixForParsing+")"),i=e.match(n);i&&i[0]&&i[0].length>0&&(this.isCompleteNumber=!0,r=i[0].length,this.prefixBeforeNationalNumber+=e.slice(0,r))}return this.nationalNumber=e.slice(r),e.slice(0,r)},Ve=function(e){let n=this.isCompleteNumber&&this.extractedNationalPrefix.length===0&&this.metadata.intlNumberFormat.length>0?this.metadata.intlNumberFormat:this.metadata.numberFormat;this.possibleFormats=[];for(let i of n){let o=i.nationalPrefixFormattingRule||"";this.extractedNationalPrefix.length>0&&Ue(o)&&!i.nationalPrefixOptionalWhenFormatting&&!i.domesticCarrierCodeFormattingRule||this.extractedNationalPrefix.length===0&&!this.isCompleteNumber&&!Ue(o)&&!i.nationalPrefixOptionalWhenFormatting||Vn.test(i.format)&&this.possibleFormats.push(i)}f(this,l,Vt).call(this,e)},Vt=function(e){let r=e.length-Ge;this.possibleFormats=this.possibleFormats.filter(n=>{if(n.leadingDigitsPatterns.length===0)return!0;let i=Math.min(r,n.leadingDigitsPatterns.length-1),o=n.leadingDigitsPatterns[i];return e.search(o)===0})},Xe=function(e){this.formattingTemplate="";let r=f(this,l,Ye).call(this,e.pattern,e.format);return r.length>0?(this.formattingTemplate=r,!0):!1},Ye=function(e,r){let o="999999999999999".match(e)[0];if(o.length<this.nationalNumber.length)return"";let a=o.replace(new RegExp(e,"g"),r);return a=a.replace(/9/g,"\u2008"),a},Xt=function(){for(let e of this.possibleFormats){if(this.currentFormattingPattern===e.pattern)return!1;if(f(this,l,Xe).call(this,e))return this.currentFormattingPattern=e.pattern,this.shouldAddSpaceAfterNationalPrefix=ke.test(e.nationalPrefixFormattingRule||""),this.lastMatchPosition=0,!0}return this.ableToFormat=!1,!1},Yt=function(){for(let e of this.possibleFormats)if(new RegExp("^(?:"+e.pattern+")$").test(this.nationalNumber)){this.shouldAddSpaceAfterNationalPrefix=ke.test(e.nationalPrefixFormattingRule||"");let n=this.nationalNumber.replace(new RegExp(e.pattern,"g"),e.format),i=f(this,l,J).call(this,n);if(Kn(i)===this.accruedInputWithoutFormatting)return i}return""},J=function(e){let r=this.prefixBeforeNationalNumber.length;return this.shouldAddSpaceAfterNationalPrefix&&r>0&&this.prefixBeforeNationalNumber.charAt(r-1)!==Q?this.prefixBeforeNationalNumber+Q+e:this.prefixBeforeNationalNumber+e},ut=function(){if(this.nationalNumber.length>=Ge){f(this,l,Ve).call(this,this.nationalNumber);let e=f(this,l,Yt).call(this);return e.length>0?e:f(this,l,Xt).call(this)?f(this,l,Kt).call(this):this.accruedInput}return f(this,l,J).call(this,this.nationalNumber)},Kt=function(){let e=this.nationalNumber;if(e.length===0)return this.prefixBeforeNationalNumber;let r="";for(let n of e)r=f(this,l,zt).call(this,n);return this.ableToFormat?f(this,l,J).call(this,r):this.accruedInput},zt=function(e){let r=this.formattingTemplate.slice(this.lastMatchPosition).search(je);if(r>=0){let n=this.lastMatchPosition+r;return this.formattingTemplate=this.formattingTemplate.replace(je,e),this.lastMatchPosition=n,this.formattingTemplate.slice(0,this.lastMatchPosition+1)}return this.possibleFormats.length===1&&(this.ableToFormat=!1),this.currentFormattingPattern="",this.accruedInput};var qt={google:{id:"BR",countryCode:55,internationalPrefix:"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)",nationalPrefix:"0",nationalPrefixForParsing:"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?",nationalPrefixTransformRule:"$2",generalDesc:{pattern:"(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",exampleNumber:null,possibleLength:[8,9,10,11],possibleLengthLocalOnly:[]},fixedLine:{pattern:"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",exampleNumber:"1123456789",possibleLength:[10],possibleLengthLocalOnly:[8]},mobile:{pattern:"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}",exampleNumber:"11961234567",possibleLength:[10,11],possibleLengthLocalOnly:[8,9]},tollFree:{pattern:"800\\d{6,7}",exampleNumber:"800123456",possibleLength:[9,10],possibleLengthLocalOnly:[]},premiumRate:{pattern:"300\\d{6}|[59]00\\d{6,7}",exampleNumber:"300123456",possibleLength:[9,10],possibleLengthLocalOnly:[]},sharedCost:{pattern:"(?:30[03]\\d{3}|4(?:0(?:0\\d|20)|370))\\d{4}|300\\d{5}",exampleNumber:"40041234",possibleLength:[8,10],possibleLengthLocalOnly:[]},numberFormat:[{pattern:"(\\d{3,6})",format:"$1",leadingDigitsPatterns:["1(?:1[25-8]|2[357-9]|3[02-68]|4[12568]|5|6[0-8]|8[015]|9[0-47-9])|321|610"],nationalPrefixFormattingRule:null,domesticCarrierCodeFormattingRule:null,nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{4})(\\d{4})",format:"$1-$2",leadingDigitsPatterns:["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"],nationalPrefixFormattingRule:null,domesticCarrierCodeFormattingRule:null,nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{4})(\\d{4})",format:"$1-$2",leadingDigitsPatterns:["[2-57]","[2357]|4(?:[0-24-9]|3(?:[0-689]|7[1-9]))"],nationalPrefixFormattingRule:null,domesticCarrierCodeFormattingRule:null,nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{3})(\\d{2,3})(\\d{4})",format:"$1 $2 $3",leadingDigitsPatterns:["(?:[358]|90)0"],nationalPrefixFormattingRule:"0$1",domesticCarrierCodeFormattingRule:null,nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{5})(\\d{4})",format:"$1-$2",leadingDigitsPatterns:["9"],nationalPrefixFormattingRule:null,domesticCarrierCodeFormattingRule:null,nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{2})(\\d{4})(\\d{4})",format:"$1 $2-$3",leadingDigitsPatterns:["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],nationalPrefixFormattingRule:"($1)",domesticCarrierCodeFormattingRule:"0 $CC ($1)",nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{2})(\\d{5})(\\d{4})",format:"$1 $2-$3",leadingDigitsPatterns:["[16][1-9]|[2-57-9]"],nationalPrefixFormattingRule:"($1)",domesticCarrierCodeFormattingRule:"0 $CC ($1)",nationalPrefixOptionalWhenFormatting:!1}],intlNumberFormat:[{pattern:"(\\d{4})(\\d{4})",format:"$1-$2",leadingDigitsPatterns:["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"],nationalPrefixFormattingRule:null,domesticCarrierCodeFormattingRule:null,nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{3})(\\d{2,3})(\\d{4})",format:"$1 $2 $3",leadingDigitsPatterns:["(?:[358]|90)0"],nationalPrefixFormattingRule:"0$1",domesticCarrierCodeFormattingRule:null,nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{2})(\\d{4})(\\d{4})",format:"$1 $2-$3",leadingDigitsPatterns:["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],nationalPrefixFormattingRule:"($1)",domesticCarrierCodeFormattingRule:"0 $CC ($1)",nationalPrefixOptionalWhenFormatting:!1},{pattern:"(\\d{2})(\\d{5})(\\d{4})",format:"$1 $2-$3",leadingDigitsPatterns:["[16][1-9]|[2-57-9]"],nationalPrefixFormattingRule:"($1)",domesticCarrierCodeFormattingRule:"0 $CC ($1)",nationalPrefixOptionalWhenFormatting:!1}]},lpn:{version:4,country_calling_codes:{"55":["BR"]},countries:{BR:["55","00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",[8,9,10,11],[["(\\d{3,6})","$1",["1(?:1[25-8]|2[357-9]|3[02-68]|4[12568]|5|6[0-8]|8[015]|9[0-47-9])|321|610"]],["(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],["(\\d{4})(\\d{4})","$1-$2",["[2-57]","[2357]|4(?:[0-24-9]|3(?:[0-689]|7[1-9]))"]],["(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],["(\\d{5})(\\d{4})","$1-$2",["9"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)"],["(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)"]],"0",0,"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",0,0,[["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",[10]],["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}",[10,11]],["800\\d{6,7}",[9,10]],["300\\d{6}|[59]00\\d{6,7}",[9,10]],0,0,0,0,0,["(?:30[03]\\d{3}|4(?:0(?:0\\d|20)|370))\\d{4}|300\\d{5}",[8,10]]]]},nonGeographic:{}}};var te=qt.lpn,_=qt.google,Qt={E164:0,INTERNATIONAL:1,NATIONAL:2,RFC3966:3},qn=["E.164","INTERNATIONAL","NATIONAL","RFC3966"],x={FIXED_LINE:0,MOBILE:1,FIXED_LINE_OR_MOBILE:2,TOLL_FREE:3,PREMIUM_RATE:4,SHARED_COST:5,VOIP:6,PERSONAL_NUMBER:7,PAGER:8,UAN:9,VOICEMAIL:10,UNKNOWN:-1},y={IS_POSSIBLE:0,INVALID_COUNTRY_CODE:1,TOO_SHORT:2,TOO_LONG:3,IS_POSSIBLE_LOCAL_ONLY:4,INVALID_LENGTH:5},Jt={FIXED_LINE:_.fixedLine,MOBILE:_.mobile,TOLL_FREE:_.tollFree,PREMIUM_RATE:_.premiumRate,SHARED_COST:_.sharedCost},Zn=Object.fromEntries(Object.entries(Jt).map(([t,e])=>[t,e.possibleLength]));function tt(t){return String(t||"").toLowerCase()==="br"}var ze=new RegExp("^(?:\\+|"+_.internationalPrefix+")"),Zt=_.generalDesc.possibleLength;function qe(t){if(Zt.includes(t.length))return y.IS_POSSIBLE;let e=Math.min(...Zt),r=Math.max(...Zt);return t.length<e?y.TOO_SHORT:t.length>r?y.TOO_LONG:y.INVALID_LENGTH}function Qn(t){if(t.__countryCallingCodeSource!=="FROM_NUMBER_WITHOUT_PLUS_SIGN"||t.nationalNumber.charAt(0)!=="0")return t;let e=t.nationalNumber.replace(/^0+/,""),r=qe(e);return r===y.TOO_SHORT||r===y.INVALID_LENGTH?t:new $("55",e,te)}var Ke=7,Jn=15,ti=/^(?:[1-46-9]|5[0-46-9])/;function R(t,e){let r=String(t).replace(/[^+0-9]/g,""),n;if(r.charAt(0)==="+")n=r.slice(1);else if(tt(e)){let a=r.match(ze);if(!a||a[0].charAt(0)==="+")return null;n=r.slice(a[0].length)}else return null;if(!ti.test(n))return null;let i=n.length>=Ke&&n.length<=Jn,o=i?y.IS_POSSIBLE:n.length<Ke?y.TOO_SHORT:y.TOO_LONG;return{rest:n,plausible:i,lengthError:o}}function C(t,e){if(!tt(e))return null;let r=String(t).replace(/[^+0-9]/g,""),n=r.match(ze);if(n&&n[0].length===r.length)return null;try{let i=q(t,{defaultCountry:"BR"},te);return i?Qn(i):null}catch{return null}}function ei(t,e){try{if(!tt(e))return t;let r=String(t).replace(/[^+0-9]/g,""),n=new lt(_),i="";for(let o of r)i=n.inputDigit(o);return i}catch{return t}}function ri(t,e,r){try{let n=r===void 0?Qt.E164:r,i=R(t,e);if(i)return i.plausible&&n===Qt.E164?"+"+i.rest:t;let o=C(t,e);return!o||!(o.isValid()||o.isPossible())?t:o.format(qn[n])}catch{return t}}function ni(t,e,r,n){if(!tt(t))return"";let i=Object.keys(x).find(s=>x[s]===r),o=i==="FIXED_LINE_OR_MOBILE"?Jt.FIXED_LINE:Jt[i];if(!o||!o.exampleNumber)return"";let a="+"+_.countryCode+o.exampleNumber;if(n)return a;let u=C(a,t);return u?u.format(e?"NATIONAL":"INTERNATIONAL"):""}function ii(t,e){return C(t,e)?null:""}function oi(t,e){if(R(t,e))return x.UNKNOWN;let r=C(t,e);if(!r)return-99;let n=r.getType();return n&&n in x?x[n]:x.UNKNOWN}function ai(t,e){let r=R(t,e);if(r)return r.lengthError;if(!tt(e))return y.INVALID_COUNTRY_CODE;try{switch(at(t,{defaultCountry:"BR"},te)){case void 0:case"TOO_SHORT":case"TOO_LONG":case"INVALID_LENGTH":{let i=C(t,e);return i?qe(i.nationalNumber):y.TOO_SHORT}case"INVALID_COUNTRY":return y.INVALID_COUNTRY_CODE;default:return y.TOO_SHORT}}catch{return y.TOO_SHORT}}function ui(t,e,r){let n=R(t,e);if(n)return n.plausible;let i=C(t,e);if(!i||!i.isValid())return!1;if(!r)return!0;let o=i.getType();return r.includes(o)}function li(t,e,r){let n=R(t,e);if(n)return n.plausible;let i=C(t,e);if(!i)return!1;if(!r)return i.isPossible();let o=r.slice();o.includes("FIXED_LINE_OR_MOBILE")&&(o.includes("MOBILE")||o.push("MOBILE"),o.includes("FIXED_LINE")||o.push("FIXED_LINE"));let a=i.nationalNumber.length;return o.some(u=>(Zn[u]||[]).includes(a))}function si(t,e){if(R(t,e))return"";let r=C(t,e);return r?r.nationalNumber.replace(/^0+(?=\d)/,""):""}var fi={formatNumberAsYouType:ei,formatNumber:ri,getExampleNumber:ni,getExtension:ii,getNumberType:oi,getValidationError:ai,isValidNumber:ui,isPossibleNumber:li,getCoreNumber:si,numberFormat:Qt,numberType:x,validationError:y};window.intlTelInput.attachUtils(()=>Promise.resolve({default:fi}));})();

 
 var elementos_formulario_redirecionamento ={};
 function ValidacaoFormularios (formulario){
 var formulario_passos = formulario.find("fieldset");
 var formulario_validado = true;
 $(formulario_passos).each(function(formulario_passos_total){if (!ValidacaoPasso($(this))){formulario_validado = false;}});
 return formulario_validado;
}
 function ValidacaoPasso (passo){
 var passo_campo = passo.find(".gpc_campos");
 var passo_validado = true;
 if(passo_campo.length){
 $(passo_campo).each(function(passo_campo_total){
 if($(this).find(".gpc_campos-campo-opcao").length){if (!ValidacaoCampos($(this))){passo_validado = false;}}
 else{if (!ValidacaoCampos($(this).find(".gpc_campo"))){passo_validado = false;}}
});
}else{
 var caixa = passo.closest('.gm');
 var passo_campo = passo.find(".admin_campos");
 $(passo_campo).each(function(passo_campo_total){
 if (!ValidacaoCampos($(this).find(".admin_campo"))){
 passo_validado = false;
 
 if (caixa.length){
 if (passo.hasClass('passo_fechado')){
 
 var caixa_andamento = caixa.children('.gmf-andamento');
 var caixa_rodape = caixa.children('.gmf-rodape');
 var formulario = caixa.find('#formulario').find("fieldset.passo");
 var passos_atual = parseInt(passo.attr('passo'));
 var passos_quantidade = parseInt(caixa_andamento.attr('caixa_passos_quantidade'));
 
 $(formulario).each(function(formulario_passos_total){if ($(this).hasClass('passo_aberto')){$(this).removeClass('passo_aberto').addClass('passo_fechado');}});
 
 passo.removeClass('passo_fechado').addClass('passo_aberto');
 
 PosicionarGM(caixa.attr('id'), false);
 
 caixa_andamento.attr('caixa_passos_atual', passos_atual);
 caixa_andamento.children('.gmf-andamento-barra').css({'width':((100/passos_quantidade)*passos_atual)+'%'});
 
 if (passos_quantidade == (passos_atual+1)){
 if (!caixa_rodape.find('.passo_proximo').hasClass('esconder')){caixa_rodape.find('.passo_proximo').addClass('esconder');}
 if (caixa_rodape.find('#enviar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#enviar_formulario_ajax').removeClass('esconder');}
 }else{
 if (caixa_rodape.find('.passo_proximo').hasClass('esconder')){caixa_rodape.find('.passo_proximo').removeClass('esconder');}
 if (!caixa_rodape.find('#enviar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#enviar_formulario_ajax').addClass('esconder');}
 }
 if (passos_atual == 0){
 if (!caixa_rodape.find('.passo_anterior').hasClass('esconder')){caixa_rodape.find('.passo_anterior').addClass('esconder');}
 if (caixa_rodape.find('#cancelar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#cancelar_formulario_ajax').removeClass('esconder');}
 }else{
 if (caixa_rodape.find('.passo_anterior').hasClass('esconder')){caixa_rodape.find('.passo_anterior').removeClass('esconder');}
 if (!caixa_rodape.find('#cancelar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#cancelar_formulario_ajax').addClass('esconder');}
 }
}
}
}
});
}
 if(passo_validado){return true;}
 else{return false;}
}
 function ValidacaoCampos (campo){
 
 if($(campo).hasClass('admin_campo')){
 
 var campo_validado = true;
 var campo_auxiliar = campo.closest('.admin_campos').children('.admin_auxiliar');
 var campo_valor = campo.val();
 var campo_area = campo.closest('.admin_campos');
 if(campo_valor){
 if(campo_valor.substr(0,1) == ' '){
 campo.val(campo_valor.substr(1));
 campo_valor = campo_valor.substr(1);
}
 if(campo_valor.substr(-1) == ' '){
 campo.val(campo_valor.substr(0,(campo_valor.length-1)));
 campo_valor = campo_valor.substr(0,(campo_valor.length-1));
}
}
 
 if (campo_auxiliar.attr('html_original') == '' && campo_auxiliar.html() != ''){campo_auxiliar.attr('html_original',campo_auxiliar.html());}
 
 if (campo.hasClass('required') && campo_valor == ''){
 campo_validado = false;
 if (campo_auxiliar.html() != 'Campo obrigatório.' && campo_auxiliar.html() != ''){campo_auxiliar.attr('html_original',campo_auxiliar.html());}
 campo_auxiliar.html('Campo obrigatório.');
}else{if (campo_auxiliar.html() == 'Campo obrigatório.'){campo_auxiliar.html('');}}
 if ((campo.hasClass('email') || campo.hasClass('email_multiplo') || campo.hasClass('cemail')) && campo_validado && campo_valor != ''){
 campo_valor = campo_valor.replace(/ /g, '');
 campo.val(campo_valor);
 var filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if(campo.hasClass('email_multiplo')){
 var emails = campo_valor.split(',');
 for (var i = 0;i < emails.length;i++){
 if(!filtro.test(emails[i])){
 campo_validado = false;
 campo_auxiliar.html('Informe um endereço de e-mail válido.');
 break;
}
}
}else{
 if(!filtro.test(campo_valor)){
 campo_validado = false;
 campo_auxiliar.html('Informe um endereço de e-mail válido.');
}
}
}
 if(campo.attr('maxlength') != undefined && campo.hasClass('required_max_length') && campo_validado ){
 var total_caracteres = campo_valor.length, tamanho_maximo = campo.attr('maxlength');
 if(tamanho_maximo < total_caracteres){
 campo_validado = false;
 campo_auxiliar.html("Informe no máximo "+tamanho_maximo+" caracteres.");
}else{campo_validado = true;}
 if (campo_validado){
 campo_auxiliar.html('');
 if(campo_auxiliar.attr('html_original') == "Informe no máximo "+tamanho_maximo+" caracteres."){campo_auxiliar.attr('html_original','');}
}
}
 if((campo.attr('min') != undefined || campo.attr('max') != undefined) && campo.hasClass('required') && campo_validado ){
 campo_valor = parseInt(campo_valor);
 if(campo.attr('min') != undefined && campo.attr('max') != undefined){
 var minimo = parseInt(campo.attr('min')), maximo = parseInt(campo.attr('max'));
 if(campo_valor >= minimo && campo_valor <= maximo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.html("Informe um valor entre "+minimo+" e "+maximo+".");
}
}else if(campo.attr('min') != undefined){
 var minimo = parseInt(campo.attr('min'));
 if(campo_valor >= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.html("Informe um valor maior ou igual a "+minimo+".");
}
}else if(campo.attr('max') != undefined){
 var maximo = parseInt(campo.attr('max'));
 if(campo_valor <= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.html("Informe um valor menor ou igual a "+minimo+".");
}
}
 if (campo_validado){
 campo_auxiliar.html('');
 if(campo_auxiliar.attr('html_original') == "Informe um valor menor ou igual a "+minimo+"." || campo_auxiliar.attr('html_original') == "Informe um valor maior ou igual a "+minimo+"."|| campo_auxiliar.attr('html_original') == "Informe um valor entre "+minimo+" e "+maximo+"."){campo_auxiliar.attr('html_original','');}
}
}
 if (campo.hasClass('required_travar_zero') && (campo_valor == 0 || campo_valor == '') && campo_validado){campo_validado = false;campo_auxiliar.html('Campo obrigatório.');}
 if (campo.hasClass('required_telefone_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarTelefone(campo_valor);
 if(campo_validado == false){campo_auxiliar.html('Informe um número de telefone válido.');}
 else{campo_auxiliar.html('');}
}
 if (campo.hasClass('required_cpf_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCpf(campo_valor);
 if(campo_validado == false){campo_auxiliar.html('Informe um CPF válido.');}
 else{campo_auxiliar.html('');}
}
 if (campo.hasClass('required_cnpj_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCnpj(campo_valor);
 if(campo_validado == false){campo_auxiliar.html('Informe um CNPJ válido.');}
 else{campo_auxiliar.html('');}
}
 
 if (campo_validado){
 if (campo_auxiliar.attr('html_original') == 'Campo obrigatório.' || campo_auxiliar.attr('html_original') == 'Link da página informado não é válido.' || campo_auxiliar.attr('html_original') == 'Informe seu domínio no formato do exemplo abaixo.' || campo_auxiliar.attr('html_original') == 'Informe um endereço de e-mail válido.' || campo_auxiliar.attr('html_original') == 'Cartão informado está expirado.' || campo_auxiliar.attr('html_original') == 'Informe um número de telefone válido.' || campo_auxiliar.attr('html_original') == 'Informe um CPF válido.' || campo_auxiliar.attr('html_original') == 'Informe um CNPJ válido.' || campo_auxiliar.attr('html_original') == 'Bandeiras aceitas Visa, MasterCard, Elo e Diners' || campo_auxiliar.attr('html_original') == 'Número do cartão inválido' || campo_auxiliar.attr('html_original') == 'Informe um número de cartão' || campo_auxiliar.attr('html_original') == 'Senha informada não confere com a utilizada.' || campo_auxiliar.attr('html_original') == 'Link de acesso em uso, tente outro.' || campo_auxiliar.attr('html_original') == 'Já cadastrado' || campo_auxiliar.attr('html_original') == 'Informe seu domínio no formato do exemplo abaixo.' || campo_auxiliar.attr('html_original') == 'Subdomínio informado já foi cadastrado.'){campo_auxiliar.attr({'html_original':''});}
 if (campo_area.hasClass('admin_campos-error')){campo_area.removeClass('admin_campos-error');}
 if (campo_auxiliar.attr('html_original') != undefined && campo_auxiliar.attr('html_original') != ''){campo_auxiliar.html(campo_auxiliar.attr('html_original'));bindEvents();}
 else{campo_auxiliar.html('');}
 return true;
}else{
 if (!campo_area.hasClass('admin_campos-error')){campo_area.addClass('admin_campos-error');}
 return false;
}
}else{
 var campo_validado = true;
 var campo_valor = '';
 if($(campo).hasClass('gpc_campos-check') || $(campo).hasClass('gpc_campos-radio') || $(campo).hasClass('gpc_campos-consentimento_lgpd')){
 if(campo.find('.gpc_campos-erro').length == 0){campo.append('<div class="gpc_campos-erro icone_bold-aviso gtt-esquerda" data-gtt=""></div>');bindEvents();}
 var campo_auxiliar = campo.find('.gpc_campos-erro');
 $(campo).find('input').each(function(campo_atual){if($(this).prop('checked')){campo_valor = $(this).val();}});
}else{
 if(campo.closest('.gpc_campos-campo').find('.gpc_campos-erro').length == 0){campo.after('<div class="gpc_campos-erro icone_bold-aviso gtt-esquerda" data-gtt=""></div>');bindEvents();}
 var campo_auxiliar = campo.closest('.gpc_campos').find('.gpc_campos-erro');
 campo_valor = campo.val();
 if($(campo).closest('.gpc_campos').hasClass('gpc_campos-select')){let opcoes = $(campo).find('option');for (var i = 0;i < opcoes.length;i++){if(campo_valor == opcoes[i].value && opcoes[i].disabled){campo_valor = '';}}}
}
 if(campo_valor == null){campo_valor = '';}
 var campo_area = campo.closest('.gpc_campos');
 if(campo_valor && !$(campo).hasClass('gpc_campos-check') && !$(campo).hasClass('gpc_campos-radio') && !$(campo).hasClass('gpc_campos-consentimento_lgpd') && !$(campo).hasClass('gpc_campos-select')){
 campo_valor = campo_valor.trim(true);
}
 
 if ((campo_auxiliar.attr('data-gtt') == '' || campo_auxiliar.attr('data-gtt') == undefined) && campo_auxiliar.html() != ''){campo_auxiliar.attr('data-gtt','');}
 
 if($(campo).hasClass('gpc_campos-check') || $(campo).hasClass('gpc_campos-radio') || $(campo).hasClass('gpc_campos-consentimento_lgpd')){
 if (campo.find('em').length && campo_valor == ''){
 campo_validado = false;
 if (campo_auxiliar.attr('data-gtt') != 'Campo obrigatório.' && campo_auxiliar.attr('data-gtt') != '' && campo_auxiliar.attr('data-gtt') != undefined){campo_auxiliar.attr({'data-gtt':''});}
 campo_auxiliar.attr({'data-gtt':'Campo obrigatório.'});
}else{if (campo_auxiliar.attr('data-gtt') == 'Campo obrigatório.'){campo_auxiliar.attr({'data-gtt':''});}}
}else{
 if (campo.hasClass('obrigatorio') && campo_valor == ''){
 campo_validado = false;
 if (campo_auxiliar.attr('data-gtt') != 'Campo obrigatório.' && campo_auxiliar.attr('data-gtt') != '' && campo_auxiliar.attr('data-gtt') != undefined){campo_auxiliar.attr({'data-gtt':''});}
 campo_auxiliar.attr({'data-gtt':'Campo obrigatório.'});
}else{if (campo_auxiliar.attr('data-gtt') == 'Campo obrigatório.'){campo_auxiliar.attr({'data-gtt':''});}}
 if ((campo.hasClass('email') || campo.hasClass('email_multiplo') || campo.hasClass('cemail')) && campo_validado && campo_valor != ''){
 campo_valor = campo_valor.replace(/ /g, '');
 campo.val(campo_valor);
 var filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if(campo.hasClass('email_multiplo')){
 var emails = campo_valor.split(',');
 for (var i = 0;i < emails.length;i++){
 if(!filtro.test(emails[i])){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':'Informe um endereço de e-mail válido.'});
 break;
 }
}
}else{
 if(!filtro.test(campo_valor)){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':'Informe um endereço de e-mail válido.'});
}
}
}
 if(campo.attr('maxlength') != undefined && campo.hasClass('required_max_length') && campo_validado ){
 var total_caracteres = campo_valor.length, tamanho_maximo = campo.attr('maxlength');
 if(tamanho_maximo < total_caracteres){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe no máximo "+tamanho_maximo+" caracteres."});
}else{campo_validado = true;}
}
 if((campo.attr('min') != undefined || campo.attr('max') != undefined) && campo.hasClass('required') && campo_validado ){
 campo_valor = parseInt(campo_valor);
 if(campo.attr('min') != undefined && campo.attr('max') != undefined){
 var minimo = parseInt(campo.attr('min')), maximo = parseInt(campo.attr('max'));
 if(campo_valor >= minimo && campo_valor <= maximo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe um valor entre "+minimo+" e "+maximo+"."});
}
}else if(campo.attr('min') != undefined){
 var minimo = parseInt(campo.attr('min'));
 if(campo_valor >= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe um valor maior ou igual a "+minimo+"."});
}
}else if(campo.attr('max') != undefined){
 var maximo = parseInt(campo.attr('max'));
 if(campo_valor <= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe um valor menor ou igual a "+minimo+"."});
}
}
}
 if (campo.hasClass('required_travar_zero') && (campo_valor == 0 || campo_valor == '') && campo_validado){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':'Campo obrigatório.'});
}
 if (campo.hasClass('telefone') && (campo.hasClass('obrigatorio') || campo_valor != '') && campo_validado){
 campo_validado = ValidarTelefone(campo,campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um número de telefone válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (campo.hasClass('telefone_ddi') && (campo.hasClass('obrigatorio') || campo_valor != '') && campo_validado){
 campo_validado = ValidarTelefone(campo,campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um número de telefone válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (campo.hasClass('required_cpf_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCpf(campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um CPF válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (campo.hasClass('required_cnpj_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCnpj(campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um CNPJ válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (typeof campo_valor == 'string' && campo_valor.length > 10000 && campo.attr('type') != 'hidden' && campo_validado){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':'Limite de 10.000 caracteres.'});
}
 if (campo.hasClass('personalized_error')){campo_validado = false;}
}
 
 if (campo_validado){
 if (
 campo_auxiliar.attr('data-gtt') == 'Campo obrigatório.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um endereço de e-mail válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um número de telefone válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um CPF válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um CNPJ válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Limite de 10.000 caracteres.' ||
 campo_auxiliar.attr('data-gtt') == 'Já cadastrado'
 ){campo_auxiliar.attr({'data-gtt':''});}
 if (campo_area.hasClass('gpc_campos-error')){campo_area.removeClass('gpc_campos-error');}
 campo_auxiliar.attr({'data-gtt':''});
 return true;
}else{
 if (!campo_area.hasClass('gpc_campos-error')){campo_area.addClass('gpc_campos-error');}
 return false;
}
}
}
 function ValidarTelefone(campo, campo_valor){
 let valor = campo_valor.replace(/\D/g, '');
 if(valor.replace(/9/g,'') == '' || valor.replace(/8/g,'') == '' || valor.replace(/7/g,'') == '' || valor.replace(/6/g,'') == '' || valor.replace(/5/g,'') == '' || valor.replace(/4/g,'') == '' || valor.replace(/3/g,'') == '' || valor.replace(/2/g,'') == '' || valor.replace(/1/g,'') == '' || valor.replace(/0/g,'') == ''){return false;}
 let mascara_telefone = phoneMaskGreat['#'+$(campo).closest('.gpc-e').attr('id')+'#'+$(campo).attr('id')];
 let valor_bruto = ($(campo).val() || '').trim();
 if (valor_bruto.charAt(0) === '+'){mascara_telefone.setNumber(valor_bruto);}
 return mascara_telefone.isValidNumber();
}
 function ValidarCpf(cpf){
 
 cpf = cpf.replace('-', "").replace('.', "").replace('.', "").trim();
 
 var numeros, digitos, soma, i, resultado, digitos_iguais;
 digitos_iguais = 1;
 
 if (cpf.length < 11){return false;}
 
 for (i = 0;i < cpf.length - 1;i++){
 if (cpf.charAt(i) != cpf.charAt(i + 1)){
 digitos_iguais = 0;
 break;
}
}
 if (!digitos_iguais){
 
 numeros = cpf.substring(0,9);
 
 digitos = cpf.substring(9);
 
 soma = 0;
 for (i = 10;i > 1;i--){soma += numeros.charAt(10 - i) * i;}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 
 if (resultado != digitos.charAt(0)){return false;}
 numeros = cpf.substring(0,10);
 soma = 0;
 for (i = 11;i > 1;i--){soma += numeros.charAt(11 - i) * i;}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 if (resultado != digitos.charAt(1)){return false;}
 return true;
}else{return false;}
}
 function ValidarCnpj(cnpj){
 
 cnpj = cnpj.replace(/[^\d]+/g,'');
 
 if (cnpj == ''){return false;}
 if (cnpj.length != 14){return false;}
 
 if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999"){return false;}
 
 tamanho = cnpj.length - 2;
 numeros = cnpj.substring(0,tamanho);
 digitos = cnpj.substring(tamanho);
 soma = 0;
 pos = tamanho - 7;
 for (i = tamanho;i >= 1;i--){
 soma += numeros.charAt(tamanho - i) * pos--;
 if (pos < 2){pos = 9;}
}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 if (resultado != digitos.charAt(0)){return false;}
 tamanho = tamanho + 1;
 numeros = cnpj.substring(0,tamanho);
 soma = 0;
 pos = tamanho - 7;
 for (i = tamanho;i >= 1;i--){
 soma += numeros.charAt(tamanho - i) * pos--;
 if (pos < 2){pos = 9;}
}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 if (resultado != digitos.charAt(1)){return false;}
 return true;
}
 window.tempo_tela_obrigado = 500;
 function hash(string){
 const utf8 = new TextEncoder().encode(string);
 return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) =>{
 return Array.from(new Uint8Array(hashBuffer)).map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
});
}
 function EnviarFormulario(elemento){
 GLoading.carregar({'ativar':true});
 
 var formulario_validado = ValidacaoFormularios(elemento);
 
 if (formulario_validado){
 
 var html_aviso = '<div class="aviso_fundo"></div><div class="aviso_texto"><div class="aviso_texto_carregando"></div></div>';
 $('body').addClass('body_bloquear').append(html_aviso);
 $('.aviso_fundo, .aviso_texto').addClass('mostrar_aviso');
 
 elemento.find('.gpc_botao').css({'pointer-events':'none'});
 GLoading.carregar({'ativar':false});
 var campos = $(elemento).find('.gpc_campos');
 var elemento_envio = elemento.closest('.'+pagina_controle['classe_elemento']).attr('id');
 if(elemento_envio == undefined || elemento_envio == ''){elemento_envio = elemento.closest('.'+pagina_controle['classe_elemento_antigo']).attr('id');}
 var campos = $(elemento).find('.gpc_campos');
 var total_campos = 0;
 var post ={'campos':{},'elemento':elemento_envio};
 campos.each(function(i){
 var id = $(this).find('.gpc_campos-titulo label').attr('for');
 var titulo = $(this).find('.gpc_campos-titulo label').text();
 if(titulo.substr(0,1) == '*'){titulo = titulo.substr(1);}
 if($(this).hasClass('gpc_campos-check') || $(this).hasClass('gpc_campos-radio') || $(this).hasClass('gpc_campos-consentimento_lgpd')){
 var valor ={};
 var posicao = 0;
 if($(this).hasClass('gpc_campos-consentimento_lgpd')){
 valor = false;
 $(this).find('input').each(function(x, campo_atual){valor = $(campo_atual).prop('checked');});
}else if($(this).hasClass('gpc_campos-radio')){
 $(this).find('input').each(function(x, campo_atual){if($(campo_atual).prop('checked')){valor = $(this).val().replace(/\*/g, '');}});
}else{
 $(this).find('input').each(function(x, campo_atual){
 if($(campo_atual).prop('checked')){
 valor[posicao] = $(this).val().replace(/\*/g, '');
 posicao++;
 }
});
}
 if($(this).hasClass('gpc_campos-consentimento_lgpd')){post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':valor};}
 else{post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':valor};}
}else{
 if($(this).find('.gpc_campo').hasClass('telefone')){
 post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':$(this).find('.gpc_campo').val(), 'tipo':'telefone'};
}else if( $(this).find('.gpc_campo').hasClass('telefone_ddi')){
 const mascara_telefone = phoneMaskGreat['#'+elemento_envio+'#'+id];
 let numero_telefone = mascara_telefone.getNumber();
 if (!numero_telefone){numero_telefone = `+${mascara_telefone.getSelectedCountryData().dialCode}${$(this).find('.gpc_campo').val()}`;}
 post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':numero_telefone, 'tipo':'telefone'};
}
 else{post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':$(this).find('.gpc_campo').val()};}
}
 total_campos = i;
});
 total_campos +=1;
 post['campos'][total_campos] ={'id':'input_referral_source', 'titulo':'Referral source', 'valor':(document.referrer == "" ? 'Acesso direto' :document.referrer)};
 total_campos +=1;
 post['campos'][total_campos] ={'id':'input_mobile', 'titulo':'Dispositivo', 'valor':(Mobile() ? 'Mobile' :'Desktop')};
 total_campos +=1;
 post['campos'][total_campos] ={'id':'input_uri', 'titulo':'URL', 'valor':window.location.href}; if(typeof window.gpages_experiment_id!=='undefined' && window.gpages_experiment_id){ total_campos +=1; post['campos'][total_campos] ={'id':'input_experiment_id', 'titulo':'Id do experimento', 'valor':window.gpages_experiment_id}; total_campos +=1; post['campos'][total_campos] ={'id':'input_variation_id', 'titulo':'Id da variação', 'valor':window.gpages_variation_id}; }
 
 let random = Math.random().toString();
 let IdConversion = 'GPages.'+random.substr(random.length-4)+(new Date()).getTime();
 post['eid'] = IdConversion;
 post['enav'] = typeof c == 'undefined' ? '' :c;
 post['eclid'] = typeof fbclid == 'undefined' ? '' :fbclid;
 post['euser'] = typeof u == 'undefined' ? '' :u;
 
 
 AdicionarFilaGQA({
 'verbo' :'POST',
 'uri' :JSON.stringify(post),
 'timeout' :10000,
 'prioridade' :'baixa',
 'carregar' :true,
 'externo' :true,
 'url' :'/conversion',
 'funcao_sucesso' :async function(retorno){
 let phone = '';
 let email = '';
 try{
 let regex = /((?:[a-z0-9!#$%&\'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))/m;
 let regex_resultado;
 for (let index in post['campos']){
 let valor = JSON.stringify(post['campos'][index].valor).toLowerCase();
 if ((regex_resultado = regex.exec(valor)) !== null && email == ''){email = await hash(regex_resultado[0]);}
 if (post['campos'][index]?.tipo == 'telefone' && phone == ''){phone = await hash(valor);}
 if (email != '' && phone != '') break;
}
 document.cookie = 'gpages_conversions=' + JSON.stringify({em:email, ph:phone}) + ';path=/;max-age=' + (6 * 30 * 24 * 60 * 60) + ';secure;samesite=Lax';
}catch (error){console.error('Erro ao processar campos para email/telefone:', error);}
 if(typeof window.fbq == 'function'){
 
 let existe_evento_botao = false;
 let evento_conversao = 'InitiateCheckout';
 let advancedMatching ={'em':email, 'ph':phone, 'ct':(u?.city || '').toLowerCase(), 'st':(u?.state || '').toLowerCase(), 'country':(u?.country || '').toLowerCase(), 'client_ip_address':u?.ip || '', 'client_user_agent':u?.agent || '', 'fbp':c, 'fbc':fbclid};
 if(advancedMatching.ph == ''){delete advancedMatching.ph;}
 if(advancedMatching.em == ''){delete advancedMatching.em;}
 if(advancedMatching.fbc == ''){delete advancedMatching.fbc;}
 if(advancedMatching.fbp == ''){delete advancedMatching.fbp;}
 fbq('init', '1204317727626507', advancedMatching);
 if(elementos_botoes_evento.hasOwnProperty(elemento.closest('.gpc-e').attr('id'))){existe_evento_botao = elementos_botoes_evento[elemento.closest('.gpc-e').attr('id')]['conteudo'].toString().indexOf('fbq') > -1 ? true :false;}
 if(!existe_evento_botao && evento_conversao != 'Empty'){fbq('track','InitiateCheckout',{},{eventID:post['eid']});}
}
 
 if(elementos_botoes_evento.hasOwnProperty(elemento.closest('.gpc-e').attr('id'))){elementos_botoes_evento[elemento.closest('.gpc-e').attr('id')]['conteudo']();}
 setTimeout(function(){
 elemento.find('.gpc_campos').each(function(){
 if(!$(this).hasClass('gpc_campos-hidden')){
 if($(this).hasClass('gpc_campos-check') || $(this).hasClass('gpc_campos-radio') || $(this).hasClass('gpc_campos-consentimento_lgpd')){
 $(this).find('input').each(function(campo_atual){
 if($(this).prop('checked')){$(this).prop({'checked':false});}
});
}else{$(this).find('.gpc_campo').val('');}
 }
});
},800);
 if(elemento.find('.gpc_botao').attr('gpc-link') == undefined || elemento.find('.gpc_botao').attr('gpc-link') == ''){$('.aviso_texto').html((elemento.find('.gpc_botao').attr('gpc-mensagem_parabens') != undefined && elemento.find('.gpc_botao').attr('gpc-mensagem_parabens') != '' ? elemento.find('.gpc_botao').attr('gpc-mensagem_parabens') :"Obrigado!!!"));}
 let link_botao = '';
 if(elemento.find('.gpc_botao').attr('gpc-link') != undefined && elemento.find('.gpc_botao').attr('gpc-link') != ''){
 link_botao = (elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'http://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,8) == 'https://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'sms://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'ftp://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'tel://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'mailto:' ? elemento.find('.gpc_botao').attr('gpc-link') :'https://'+elemento.find('.gpc_botao').attr('gpc-link'));
}
 setTimeout(function(){
 $('body').removeClass('body_bloquear');
 $('.aviso_fundo, .aviso_texto').removeClass('mostrar_aviso');
 setTimeout(function(){$('.aviso_fundo, .aviso_texto').remove();},100);
 if(elemento.find('.gpc_botao').attr('gpc-link') != undefined && elemento.find('.gpc_botao').attr('gpc-link') != ''){
 let id_elemento = elemento.closest('.gpc-e').attr('id');
 let link_usar = '';
 try{
 let link_new = new URL(link_botao);
 if(elementos_formulario_redirecionamento.hasOwnProperty(id_elemento)){
 for (var i = 0;i < total_campos;i++){
 let id = post['campos'][i].id;
 if(elementos_formulario_redirecionamento[id_elemento]['conteudo'].hasOwnProperty(id)){
 if(typeof post['campos'][i].valor == 'string'){if(post['campos'][i].valor.substr(0,1) == '"' && post['campos'][i].valor.substr(-1) == '"'){post['campos'][i].valor = post['campos'][i].valor.substr(1,post['campos'][i].valor.length-2);}}
 link_new.searchParams.set(elementos_formulario_redirecionamento[id_elemento]['conteudo'][id],post['campos'][i].valor);
}
 }
}
 link_usar = link_new.href;
}catch (e){
 var link = '';
 if(elementos_formulario_redirecionamento.hasOwnProperty(id_elemento)){
 for (var i = 0;i < total_campos;i++){
 let id = post['campos'][i].id;
 if(elementos_formulario_redirecionamento[id_elemento]['conteudo'][id] != undefined){
 link += elementos_formulario_redirecionamento[id_elemento]['conteudo'][id]+'='+post['campos'][i].valor+'&';
}
 }
 if(link){link = link.substr(0,(link.length-1));}
}
 let concatenar = elemento.find('.gpc_botao').attr('gpc-link').indexOf('?') ? '&' :'?';
 link_usar = (elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'http://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,8) == 'https://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'sms://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'ftp://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'tel://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'mailto:' ? elemento.find('.gpc_botao').attr('gpc-link') :'https://'+elemento.find('.gpc_botao').attr('gpc-link'))+concatenar+link;
}
 setTimeout(function(){
 GLoading.carregar({'ativar':false});
 window.location.href = link_usar;
},150);
}
 elemento.find('.gpc_botao').css({'pointer-events':''});
},tempo_tela_obrigado);
},
 'funcao_erro' :function(retorno){
 if($('.aviso_fundo').length){
 var html_aviso = 'Não foi possivel fazer seu cadastro, tente novamente.';
 $('.aviso_texto').html(html_aviso);
}else{
 var html_aviso = '<div class="aviso_fundo"></div><div class="aviso_texto">Não foi possivel fazer seu cadastro, tente novamente.</div>';
 $('body').addClass('body_bloquear').append(html_aviso);
 $('.aviso_fundo, .aviso_texto').addClass('mostrar_aviso');
}
 setTimeout(function(){
 $('body').removeClass('body_bloquear');
 $('.aviso_fundo, .aviso_texto').removeClass('mostrar_aviso');
 setTimeout(function(){$('.aviso_fundo, .aviso_texto').remove();},100);
 elemento.find('.gpc_botao').css({'pointer-events':''});
},4000);
}
});
 return true;
}else{
 
 GLoading.carregar({'ativar':false});
 if (window.gScrollSet){window.gScrollSet(0, true);}else{window.scroll({top:0, behavior:"smooth"});}
 return false;
}
}
 $(function(){
 if(typeof window.jQuery == 'undefined'){
 Object.defineProperty(window, 'jQuery',{
 configurable:true,
 set(value){
 value('body').off('submit','form', function (e){e.preventDefault();return false;});
 value('body').on('submit','form', function (e){
 e.preventDefault();
 e.stopPropagation();
 var elemento = $(this).closest('.e_formulario');
 if ($(elemento).length){return EnviarFormulario(elemento);}
 return false;
});
 Object.defineProperty(window, 'jQuery',{
 value,
 writable:true,
 configurable:true,
 enumerable:true
});
}
});
}
 $("body").on('submit', 'form', function(e){
 e.preventDefault();
 var elemento = $(this).closest('.e_formulario');
 if ($(elemento).length){return EnviarFormulario(elemento);}
});
 $('body').on('click','.gpc_campos-campo-opcao',function(e){
 if($(e.target).prop('nodeName') != 'A'){
 e.preventDefault();
 e.stopPropagation();
 if($(this).find('input').first().prop('checked')){$(this).find('input').first().prop('checked',false);}
 else{$(this).find('input').first().prop('checked',true);}
 ValidacaoCampos($(this).closest('.gpc_campos'));
}
});
 $('body').on('click','.gpc_campos-erro',function(e){
 e.preventDefault();
 e.stopPropagation();
 if($(this).closest('.gpc_campos').hasClass('gpc_campos-check') || $(this).closest('.gpc_campos').hasClass('gpc_campos-radio') || $(this).closest('.gpc_campos').hasClass('gpc_campos-consentimento_lgpd')){$(this).closest('.gpc_campos-campo').find('input').first().trigger('click');}
 else if($(this).closest('.gpc_campos').hasClass('gpc_campos-select')){$(this).closest('.gpc_campos-campo').find('select').trigger('click');}
 else{$(this).closest('.gpc_campos-campo').find('.gpc_campo').trigger('focus');}
});
 $('body').on('click','.gpc_botao',function(e){
 
 GLoading.carregar({'ativar':true});
 var formulario_validado = ValidacaoFormularios($(this).closest('form'));
 if(formulario_validado == false){
 e.preventDefault();
 e.stopPropagation();
}else{$(this).closest('form').trigger('submit');}
});
 $('body').on('focusout','.gpc_campo',function(e){
 
 e.preventDefault();
 e.stopPropagation();
 GLoading.carregar({'ativar':true});
 var passo_validado = true;
 if (!ValidacaoCampos($(this))){passo_validado = false;}
 if (passo_validado){return true;}
 else{return false;}
});
 $("body").on('focusin','.admin_campo',function(evento){
 if ($(this).attr('type') != 'hidden'){
 if ($(this).hasClass('readonly') && this.hasAttribute('readonly')){
 if($(this).hasClass('data_calendario') || $(this).hasClass('data_calendario2') || $(this).hasClass('data_calendario3') || $(this).hasClass('data_calendario4') || $(this).hasClass('data_calendario4') || $(this).attr('id') == '#data_vencimento' || $(this).attr('id') == '#data_pagamento' || $(this).attr('id') == '#pagamento_data_inicio' || $(this).attr('id') == '#data_prazo' || $(this).attr('id') == '#data_de' || $(this).attr('id') == '#data_ate' || $(this).attr('id') == '#data_inicio'){$(this).removeClass('readonly').closest('.admin_campos').addClass('admin_campos-focus');}
 else{$(this).removeAttr('readonly').removeClass('readonly').closest('.admin_campos').addClass('admin_campos-focus');}
}else{$(this).closest('.admin_campos').addClass('admin_campos-focus');}
}
}).on('focusout','.admin_campo', function (evento){
 if ($(this).attr('type') != 'hidden'){
 if ($(this).hasClass('readonly') && this.hasAttribute('readonly')){$(this).removeAttr('readonly');}
 else{
 var caixa = $(this).closest('.admin_campos');
 caixa.removeClass('admin_campos-focus');
 if ($(this).val()){if (!caixa.hasClass('admin_campos-valor')){caixa.addClass('admin_campos-valor');}}
 else{if (caixa.hasClass('admin_campos-valor')){caixa.removeClass('admin_campos-valor');}}
 ValidacaoCampos($(this));
}
}
});
});
 
  var ValidarTelefoneBase = ValidarTelefone;
 ValidarTelefone = function(campo, campo_valor){
 if (ValidarTelefoneBase(campo, campo_valor)){return true;}
 var mascara_telefone = phoneMaskGreat['#'+$(campo).closest('.gpc-e').attr('id')+'#'+$(campo).attr('id')];
 var valor_bruto = ($(campo).val() || '').trim();
 if (valor_bruto.charAt(0) === '+' && mascara_telefone && !mascara_telefone.getSelectedCountryData().iso2 && window.intlTelInput.utils){return window.intlTelInput.utils.isPossibleNumber(valor_bruto, 'br', ['MOBILE']);}
 return false;
};
if($('.'+pagina_controle['classe_elemento']+'.e_faq').length){
 setTimeout(function(){
 GAccordion.instalar();
},600);
}
 
 
 let phoneMaskGreat ={}, phoneMaskGreatCampo ={};
 function PhoneMaskIniciado(tel, id_campo){
 if(tel.parentNode && tel.parentNode.classList.contains('iti')){return true;}
 if(typeof phoneMaskGreat[id_campo] == 'object'){
 if(!phoneMaskGreatCampo[id_campo] || !document.contains(phoneMaskGreatCampo[id_campo])){try{phoneMaskGreat[id_campo].destroy();}catch(erro){}}
 delete phoneMaskGreat[id_campo];
 delete phoneMaskGreatCampo[id_campo];
}
 return false;
}
 // lista inline no mobile: enquanto aberta, sobe a linha do campo E o fieldset do passo — o
 // fieldset tem transform (passos do formulario), o que cria stacking context proprio; sem
 // subir o fieldset, o botao de enviar (z-index:50, irmao do fieldset) pinta por cima da lista.
 // Restaura ao fechar para nao interferir na sobreposicao dos passos do formulario.
 function SubirCampoListaDdi(evento){
 if(!Mobile()){return;}
 let campos = $(evento.target).closest('.gpc_campos');
 campos.css('z-index','9999');
 campos.closest('fieldset').css('z-index','9999');
}
 function RestaurarCampoListaDdi(evento){
 if(!Mobile()){return;}
 let campos = $(evento.target).closest('.gpc_campos');
 campos.css('z-index','');
 campos.closest('fieldset').css('z-index','');
}
 function bindEvents(){
 var caixa = $('gmf').last().attr('id');
 if(caixa != undefined){caixa = '#'+caixa+' ';}else{caixa = '';}
 
 let telefone = $(caixa+".gpc_campo.telefone");
 let telefone_ddi = $(caixa+".gpc_campo.telefone_ddi");
 if(telefone.length > 0){
 for (let i = 0;i < telefone.length;i++){
 const tel = telefone[i];
 let id_campo = '#'+$(tel).closest('.gpc-e').attr('id')+'#'+$(tel).attr('id');
 if(PhoneMaskIniciado(tel, id_campo)){continue;}
 phoneMaskGreat[id_campo] = window.intlTelInput(tel,{
 useFullscreenPopup:false,
 autoPlaceholder:"off",
 strictMode:true,
 initialCountry:"BR",
 onlyCountries:["BR"],
 allowDropdown:false,
 showFlags:false,
 utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/25.3.1/build/js/intlTelInputWithUtils.min.js"
});
 phoneMaskGreatCampo[id_campo] = tel;
}
 
}
 if(telefone_ddi.length > 0){
 for (let i = 0;i < telefone_ddi.length;i++){
 const tel = telefone_ddi[i];
 let id_campo = '#'+$(tel).closest('.gpc-e').attr('id')+'#'+$(tel).attr('id');
 if(PhoneMaskIniciado(tel, id_campo)){continue;}
 phoneMaskGreat[id_campo] = window.intlTelInput(tel,{
 initialCountry:"BR",
 separateDialCode:true,
 useFullscreenPopup:false,
 strictMode:true,
 // no mobile a lista fica inline (posicionada pela lib dentro do proprio .iti): mesmo espaco de
 // coordenadas do campo, entao zoom/viewport escalado/teclado nao desalinham, e a lib nem
 // registra o listener que fecha a lista em qualquer scroll da window (so existe com
 // dropdownContainer) — era ele que fechava a lista sozinha no iOS, porque o foco da busca sobe
 // o teclado e o Safari rola a pagina. No desktop a lista segue no body para escapar do
 // overflow dos pop-ups.
 dropdownContainer:Mobile() ? null : document.body,
 utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/25.3.1/build/js/intlTelInputWithUtils.min.js"
});
 phoneMaskGreatCampo[id_campo] = tel;
 tel.addEventListener('open:countrydropdown', SubirCampoListaDdi);
 tel.addEventListener('close:countrydropdown', RestaurarCampoListaDdi);
 $(tel).on('countrychange', function(e){
 
 let countryData = phoneMaskGreat['#'+$(this).closest('.gpc-e').attr('id')+'#'+$(this).attr('id')].getSelectedCountryData();
 if (countryData.dialCode){
 tel.value = tel.value.replace(`+${countryData.dialCode}`, "");
 tel.value = tel.value.replace(`+ ${countryData.dialCode}`, "");
}
 
 ValidacaoCampos($(caixa+'#'+$(this).attr('id')));
});
}
}
 GFM.instalar({'elemento' :'#celular', 'mascara' :'(00) 0000-00009', 'placeholder' :'(__) ____-_____'});
 GFM.instalar({'elemento' :'input.cnpj', 'mascara' :'00.000.000/0000-00', 'placeholder' :'__.___.___/____-__'});
 GFM.instalar({'elemento' :'input.cpf', 'mascara' :'000.000.000-00', 'placeholder' :'___.___.___-__'});
 GFM.instalar({'elemento' :'input.hora', 'mascara' :'00:00', 'placeholder' :'__:__'});
 GFM.instalar({'elemento' :'input.data', 'mascara' :'00/00/0000', 'placeholder' :'__/__/____'});
 GFM.instalar({'elemento' :'input.datahora', 'mascara' :'00/00/0000 00:00', 'placeholder' :'__/__/____ __:__'});
 
 GTooltip.instalar({'elemento' :'.gtt-direita', 'direcao' :'direita'});
 GTooltip.instalar({'elemento' :'.gtt-esquerda', 'direcao' :'esquerda'});
 GTooltip.instalar({'elemento' :'.gtt-cima', 'direcao' :'cima'});
 GTooltip.instalar({'elemento' :'.gtt-baixo', 'direcao' :'baixo'});
 GTooltip.instalar({'elemento' :'.balao_direita', 'direcao' :'direita'});
 GTooltip.instalar({'elemento' :'.balao_esquerda', 'direcao' :'esquerda'});
 GTooltip.instalar({'elemento' :'.balao_cima', 'direcao' :'cima'});
 GTooltip.instalar({'elemento' :'.balao_baixo', 'direcao' :'baixo'});
}
 function Mobile(){
 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){return true;}
 return false;
}
 window.smoothScrollTo = function (endX, endY, duration){
 let startX = window.scrollX || window.pageXOffset,
 startY = window.scrollY || window.pageYOffset,
 distanceX = endX - startX,
 distanceY = endY - startY,
 startTime = new Date().getTime();
 let easeInOutQuart = function (time, from, distance, duration){
 if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
 return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
};
 let timer = window.setInterval(function (){
 let time = new Date().getTime() - startTime,
 newX = easeInOutQuart(time, startX, distanceX, duration),
 newY = easeInOutQuart(time, startY, distanceY, duration);
 if (time >= duration){
 window.clearInterval(timer);
}
 window.scrollTo(newX, newY);
}, 1000 / 60);
};
 // scroller real da página: window por padrão; o <body> (ou container) quando o CSS o torna o que rola
 window.gScrollEl = function(){
 var h = document.documentElement, b = document.body;
 if (b && b.scrollHeight > (b.clientHeight + 1) && h.scrollHeight <= (h.clientHeight + 1)){
 var oy = window.getComputedStyle(b).overflowY;
 if (oy == 'auto' || oy == 'scroll' || oy == 'hidden'){return b;}
}
 return null;
};
 window.gScrollTop = function(){var e = window.gScrollEl();return e ? e.scrollTop : (window.scrollY || window.pageYOffset || 0);};
 window.gScrollSet = function(y, smooth){
 var e = window.gScrollEl();
 if (smooth && ('scrollBehavior' in document.documentElement.style)){
 if (e){e.scrollTo({top:y, behavior:'smooth'});}else{window.scroll({top:y, behavior:'smooth'});}
}else{
 if (e){e.scrollTop = y;}else{window.scroll({top:y, behavior:'auto'});}
}
};
 $(function(){
 
 GLoading.carregar({'ativar':false});
 
 $('body').removeClass('preload');
 
 bindEvents();
 
 // a lista de DDI vive no <body> (dropdownContainer): a lib so fecha no scroll da window,
 // entao repassamos o scroll de qualquer container interno (ex.: .gpc_modal_popup-centro).
 document.addEventListener('scroll', function(evento){
 if(!evento.target || !evento.target.closest || evento.target.closest('.iti--container')){return;}
 if(!document.querySelector('.iti--container .iti__dropdown-content:not(.iti__hide)')){return;}
 window.dispatchEvent(new Event('scroll'));
}, true);
 
 $('.mensagem_fechar').on('click',function(evento){$('.mensagens').removeAttr('style');});
 
 $(document).on('keydown', function(e){
 var tecla = (e.keyCode?e.keyCode:e.which);
 if($('.gm').length){
 var caixa = $('.gm').last().attr('id');
 var caixa_andamento = $('#'+caixa).find('.gmf-andamento');
 if((e.ctrlKey && tecla == 83)){
 e.preventDefault();
 e.stopPropagation();
 if (caixa_andamento.length){
 if (caixa_andamento.attr('caixa_passos_controle') == (caixa_andamento.attr('caixa_passos_quantidade')-1)){$('#'+caixa+' #enviar_formulario_ajax').trigger('click');}
 else{PassosGMF(caixa, 'proximo');}
}else{$('#'+caixa+' #enviar_formulario_ajax').trigger('click');}
 return false;
}else if(tecla == 27){
 e.preventDefault();
 e.stopPropagation();
 if ($('#'+caixa).attr('gm_componente') == 'gsp'){FecharGSP(caixa);}
 else if($('#'+caixa).attr('gm_componente') == 'gmf'){$('#'+caixa+' .gmf-topo-fechar').click();}
 else if($('#'+caixa).attr('gm_componente') == 'guo' || $('#'+caixa).attr('gm_componente') == 'gd'){PulsarGM($('#'+caixa).attr('id'));}
 else if ($('#'+caixa).attr('gm_componente') == 'gmi'){
 
 gmi_caixa['elemento'] = '';
 gmi_caixa_imagem['elemento'] = '';
 gmi_fundo['elemento'] = '';
 
 FecharGM(caixa);
}else{FecharGM(caixa);}
 return false;
}
}else{
 if((e.ctrlKey && tecla == 83)){
 e.preventDefault();
 e.stopPropagation();
 if($('#editar_formulario').length){$('#editar_formulario').trigger('click');}
 else if($('#enviar_formulario').length){$('#enviar_formulario').trigger('click');}
 else if($('.admin_botao-login').length){$('.admin_botao-login').trigger('click');}
 else if($('.admin_botao-esqueci_minha_senha').length){$('.admin_botao-esqueci_minha_senha').trigger('click');}
 return false;
}
}
 if((e.ctrlKey && tecla == 85) || tecla == 123){
 e.preventDefault();
 e.stopPropagation();
 return false;
}
});
 
 $('body').on('click','.botao_evento',function(e){
 
 elementos_botoes_evento[$(this).parent().attr('id')]['conteudo']();
});
 
 $('body').on('click','.link_popup',function(e){
 if($(this).closest('.'+pagina_controle['classe_elemento'])){var elemento = $(this).closest('.'+pagina_controle['classe_elemento']);}
 else{var elemento = $(this).closest('.'+pagina_controle['classe_elemento_antigo']);}
 
 var conteudo = elementos_popup[elemento.attr('id')]['conteudo'];
 if(conteudo == undefined || conteudo == ''){conteudo = '<div></div>';}
 
 gm_quantidade++;
 
 var configuracao ={
 'gm' :{
 'conteudos' :{
 'topo' :{
 'conteudo' :"<div class='gpc_modal_popup-topo-fechar icone-fechar'></div>",
 'estilos' :'',
 'extras' :''
},
 'centro' :{
 'conteudo' :conteudo,
 'estilos' :'',
 'extras' :''
},
 'rodape' :{
 'conteudo' :'<div></div>',
 'estilos' :'',
 'extras' :''
}
},
 'classes' :'gpc_modal',
 'estilos' :elementos_popup[elemento.attr('id')]['estilos'][($(window).width() > 960 ? 'desktop' :'mobile')],
 'extras' :'gpc_id_elemento="'+elemento.attr('id')+'"'
},
 'gm_fundo' :{
 'conteudos' :{'topo' :{'conteudo' :"<div class='gpc_modal_popup-fundo-fechar icone-fechar'></div>"}},
 'classes' :'gpc_modal-fundo',
 'estilos' :'overflow:hidden;',
 'extras' :'gm_fundo_acao="fechar"'
}
};
 
 AbrirGM('gpc_modal_'+gm_quantidade, 'gpc_modal_popup',configuracao);
 
 setTimeout(function(){
 if($('#gpc_modal_'+gm_quantidade+' .'+pagina_controle['classe_elemento']+'.e_slider').length){
 GSlideImage.iniciar();
}
 if($('#gpc_modal_'+gm_quantidade+' .'+pagina_controle['classe_elemento']+'.e_faq').length){
 GAccordion.instalar();
}
 GreatLoader('atualizar');
 GreatFontes(true);
 bindEvents();
},400);
 
 return false;
});
 $('body').on('click','.gpc_modal_popup-topo-fechar, .gpc_modal_popup-fundo-fechar',function(e){FecharGM($('.gpc_modal').last().attr('id'));});
 
 $('body').on('click','.link_interno',function(e){
 if($(this).attr('data-bloco-mobile') !== undefined && $(window).width() < 720){
 var bloco = $(this).attr('data-bloco-mobile');
 if(!$((bloco.substr(0,1) == '#' ? bloco :'#'+bloco)).length){bloco = $(this).attr('data-bloco');}
}else{var bloco = $(this).attr('data-bloco');}
 if(bloco != undefined){
 if($((bloco.substr(0,1) == '#' ? bloco :'#'+bloco)).length){
 var sc = window.gScrollEl ? window.gScrollEl() : null;
 if (sc){
 var bl = $((bloco.substr(0,1) == '#' ? bloco :'#'+bloco))[0];
 var gTopo = (window.gAncoraTopo && window.gAncoraTopo()) || 60;
 var y = sc.scrollTop + (bl.getBoundingClientRect().top - sc.getBoundingClientRect().top) - gTopo;
 window.gScrollSet(y, true);
}else{
 var offset = $((bloco.substr(0,1) == '#' ? bloco :'#'+bloco)).offset();
 var gTopo2 = (window.gAncoraTopo && window.gAncoraTopo()) || 60;
 if ('scrollBehavior' in document.documentElement.style){window.scroll({top:(offset.top-gTopo2), behavior:"smooth"});}
 else{smoothScrollTo(0, (offset.top-gTopo2), 800);}
}
}
}
 return false;
});
 
 $('body').on('click','.link_externo',function(e){
});
 
 
 if(!window.getCrawler()){
 GModalApproval.instalar({
 'barra':{
 'cor':"ffffff",
 'classe':"",
 'texto':"Usamos cookies para personalizar conteúdos e melhorar a sua experiência.",
 'politica':"",
 'tipo':2,
 'fechar':true
},
 'opcoes':[
{'id':'o'},
{'id':'e', 'valor':true, 'codigos':function(){
 
 return scripts_estatisticas;
 }
},
{'id':'m', 'valor':true, 'codigos':function(){
 
 return scripts_marketing;
 }
}
 ],
 'dominio':".reconectasexualidade.com.br",
 'editado':(GModalApproval.preferencias() ? true :false)
});
}
});
 
 'use strict';

var gac_timeout ={}, gac_timeout_resize;
function gacCor(el, attr){
 let v = el.getAttribute(attr);
 return (v && v.indexOf('--') === 0) ? 'var(' + v + ')' :v;
}
var GAccordion = function (){
 return{
 instalar:function (id){
 let instancias;
 if (id != undefined){instancias = document.querySelectorAll('#' + id + ' .gac');}
 else{instancias = document.querySelectorAll('.gac');}
 if (instancias){
 for (var i = 0;i < instancias.length;i++){
 id = instancias[i].closest('.gpc-e, .gpc-blocos_bloco_elemento').getAttribute('id');
 let ja_iniciado = false, abrir_primeiro = false;
 if (instancias[i].getAttribute('gac-abrir_primeiro') == 'true'){abrir_primeiro = true;}
 let itens = instancias[i].querySelectorAll('.gac-item_cabecalho');
 if (instancias[i].parentElement.classList.contains('gpc-e')){
 ja_iniciado = instancias[i].classList.contains('gac-ativo');
 instancias[i].classList.add('gac-ativo');
}
 if (itens){
 if (!ja_iniciado){
 for (var x = 0;x < itens.length;x++){
 let atual = itens[x];
 if (document.getElementById(id).classList.contains('gpc-e')){
 itens[x].addEventListener('click', function (){GAccordion.abrir(atual.closest('.gpc-e').getAttribute('id'), atual);}, false);
 GAccordion.hover(atual);
}
 else{
 atual.closest('.gac-item').classList.remove('gac-aberto');
 let conteudo = atual.closest('.gac-item').querySelector('.gac-item_conteudo');
 conteudo.style.height = '';
 if (atual.closest('.gpc-blocos_bloco_elemento')){
 atual.style.color = gacCor(atual.closest('.gac'), 'data-color');
 atual.style.background = gacCor(atual.closest('.gac'), 'data-background-color');
}
}
}
}
 if (instancias[i].closest('.gpc-e')){
 let visivel = getComputedStyle(instancias[i].closest('.gpc-e'));
 if (abrir_primeiro && visivel.visibility === 'visible' && visivel.display === 'block'){
 GAccordion.abrir(itens[0].closest('.gpc-e').getAttribute('id'), itens[0], true);
}
}
}
}
}
}, hover:function (cab){
 let gac = cab.closest('.gac');
 if (!gac || gac.getAttribute('data-color-hover') === null){return;}
 let pintar = function (hover){
 let item = cab.closest('.gac-item');
 if (!item || item.classList.contains('gac-aberto')){return;}
 cab.style.color = gacCor(gac, hover ? 'data-color-hover' :'data-color');
 cab.style.background = gacCor(gac, hover ? 'data-background-color-hover' :'data-background-color');
};
 cab.addEventListener('pointerenter', function (){pintar(true);}, false);
 cab.addEventListener('pointerleave', function (){pintar(false);}, false);
 cab.addEventListener('click', function (){pintar(true);}, false);
}, abrir:function (id, item, primeiro){
 if (primeiro == undefined){primeiro = false;}
 let instancia = document.querySelector("#" + id);
 if (instancia){
 if (item.closest('.gac-item').classList.contains('gac-aberto') && !primeiro){GAccordion.fechar(id, item);}
 else{
 let abertos = document.querySelectorAll('.gac-aberto');
 if (abertos && !primeiro){
 for (var i = 0;i < abertos.length;i++){
 if (abertos[i].closest('.gpc-e')){
 if (abertos[i].closest('.gpc-b')){
 if (instancia.closest('.gpc-b') && abertos[i].closest('.gpc-b').getAttribute('id') == instancia.closest('.gpc-b').getAttribute('id')){GAccordion.fechar(abertos[i].closest('.gpc-e').getAttribute('id'), abertos[i]);}
}else if (abertos[i].closest('.gpc_modal')){
 GAccordion.fechar(abertos[i].closest('.gpc-e').getAttribute('id'), abertos[i])
}
}
}
}
 item.closest('.gac-item').classList.add('gac-aberto');
 let conteudo = item.closest('.gac-item').querySelector('.gac-item_conteudo');
 let tamanho_conteudo = conteudo.scrollHeight;
 conteudo.style.height = tamanho_conteudo + 'px';
 if (instancia.closest('.gpc-blocos_bloco_elemento')){
 let itens = instancia.querySelectorAll('.gac-item_cabecalho');
 let ativo = item.closest('.gac-item');
 let conteudoEl = itens[0] ? itens[0].closest('.conteudo') :null;
 let temHoverAttrs = conteudoEl && conteudoEl.getAttribute('data-color-hover') !== null;
 for (var x = 0;x < itens.length;x++){
 let gi = itens[x].closest('.gac-item');
 if (gi === ativo){continue;}
 gi.classList.remove('gac-aberto');
 if (temHoverAttrs){
 gi.querySelector('.gac-item_cabecalho').style.color = gacCor(conteudoEl, 'data-color');
 gi.querySelector('.gac-item_cabecalho').style.background = gacCor(conteudoEl, 'data-background-color');
}
 gi.querySelector('.gac-item_conteudo').style.height = '';
}
 if (temHoverAttrs){
 ativo.querySelector('.gac-item_cabecalho').style.color = gacCor(conteudoEl, 'data-color-hover');
 ativo.querySelector('.gac-item_cabecalho').style.background = gacCor(conteudoEl, 'data-background-color-hover');
 ativo.querySelector('.gac-item_conteudo').style.color = gacCor(conteudoEl, 'data-color-texto');
 ativo.querySelector('.gac-item_conteudo').style.background = gacCor(conteudoEl, 'data-background-color-hover');
}
}
 if ((instancia.closest('.gpc-b') || instancia.closest('.gpc_modal')) && !document.querySelectorAll('#admin_centro').length){
 let elemento = instancia.closest('.gpc-e');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 let dif = GAccordion.calcularAjuste(rotacao, tamanho_conteudo);
 elemento.style.transform = `translate(${dif.deltaX}px, ${dif.deltaY}px) rotate(${rotacao}deg)`;
 if(rotacao != 0){conteudo.style.transition = 'none';}
 else{conteudo.style.transition = '';}
 if (instancia.closest('.gpc-blocos_bloco_elemento')){conteudo.style.height = 'auto';}
 GAccordion.reposicionar(elemento);
}else{
 let elemento = instancia.closest('.gpc-blocos_bloco_elemento');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 let dif = GAccordion.calcularAjuste(rotacao, tamanho_conteudo);
 tamanho_conteudo = tamanho_conteudo + dif.deltaY;
 if(rotacao != 0){conteudo.style.transition = 'none';}
 else{conteudo.style.transition = '';}
 elemento.style.transform = `translate(${dif.deltaX}px, ${dif.deltaY}px) rotate(${rotacao}deg)`;
 
 let elementos, bloco;
 if (instancia.closest('.gpc_modal')){
 elementos = instancia.closest('.gpc_modal').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc_modal');
}else{
 elementos = instancia.closest('.gpc-blocos_bloco_interno').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc-blocos_bloco_interno');
}
 if (elementos){
 let total_elementos = elementos.length;
 for (var i = 0;i < total_elementos;i++){
 if (elementos[i].getAttribute('id') != item.closest('.gpc-blocos_bloco_elemento').getAttribute('id')){
 elementos[i].classList.add('gac-movendo');
 if (
 parseFloat(elementos[i].offsetTop) >= (item.closest('.gpc-blocos_bloco_elemento').offsetTop + item.closest('.gpc-blocos_bloco_elemento').offsetHeight) &&
 elementos[i].getAttribute('id') != item.closest('.gpc-blocos_bloco_elemento').getAttribute('id') &&
 elementos[i].offsetParent
 ){elementos[i].style.top = (parseFloat(elementos[i].style.top) + tamanho_conteudo) + 'px';}
}
}
}
 bloco.classList.add('gac-movendo');
 bloco.style.setProperty('height', (parseFloat(bloco.style.height) + tamanho_conteudo) + 'px');
 if (instancia.closest('.gpc_modal')){PosicionarGM(instancia.closest('.gpc_modal').getAttribute('id'), false);}
 for (let i = 0;i < 8;i++){setTimeout(function (){gpc_controle['elementos_iniciados']['elemento'].updateRect();}, 40 * i);}
}
}
}
}, fechar:function (id, item){
 let instancia = document.querySelector("#" + id);
 if (instancia){
 if (gac_timeout.hasOwnProperty(id)){
 clearTimeout(gac_timeout[id]);
 delete gac_timeout[id];
}
 if (instancia.closest('.gpc-blocos_bloco_elemento')){
 let itens = item.closest('.gac').querySelectorAll('.gac-item_cabecalho');
 let gacEl = item.closest('.gac');
 let temHoverAttrs = gacEl && gacEl.getAttribute('data-color-hover') !== null;
 for (var x = 0;x < itens.length;x++){
 itens[x].closest('.gac-item').classList.remove('gac-aberto');
 if (temHoverAttrs){
 itens[x].closest('.gac-item').querySelector('.gac-item_cabecalho').style.color = gacCor(gacEl, 'data-color');
 itens[x].closest('.gac-item').querySelector('.gac-item_cabecalho').style.background = gacCor(gacEl, 'data-background-color');
}
 itens[x].closest('.gac-item').querySelector('.gac-item_conteudo').style.height = '';
}
}
 item.closest('.gac-item').classList.remove('gac-aberto');
 let conteudo = item.closest('.gac-item').querySelector('.gac-item_conteudo');
 conteudo.style.height = '';
 if ((instancia.closest('.gpc-b') || instancia.closest('.gpc_modal')) && !document.querySelectorAll('#admin_centro').length){
 let elemento = instancia.closest('.gpc-e');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 elemento.style.transform = `translate(0px, 0px) rotate(${rotacao}deg)`;
 GAccordion.reposicionar(elemento);
}else{
 let elemento = instancia.closest('.gpc-blocos_bloco_elemento');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 elemento.style.transform = `translate(0px, 0px) rotate(${rotacao}deg)`;
 let versao = '';
 if (document.getElementById('gpc-blocos').classList.contains('mobile')){versao = '_mobile';}
 
 let elementos, bloco;
 if (instancia.closest('.gpc_modal')){
 elementos = instancia.closest('.gpc_modal').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc_modal');
}else{
 elementos = instancia.closest('.gpc-blocos_bloco_interno').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc-blocos_bloco_interno');
}
 if (elementos){
 let total_elementos = elementos.length;
 for (var i = 0;i < total_elementos;i++){
 if (
 parseFloat(elementos[i].style.top) >= (parseFloat(instancia.style.top) + parseFloat(getComputedStyle(instancia)['height'])) &&
 elementos[i].getAttribute('id') != id &&
 elementos[i].offsetParent
 ){elementos[i].setAttribute('style', elementos_pagina[elementos[i].getAttribute('gpc_id_elemento')]['estilos' + versao]);}
}
}
 bloco.setAttribute('style', blocos_pagina[bloco.getAttribute('gpc_id_bloco')]['estilos' + versao]);
 if (instancia.closest('.gpc_modal')){PosicionarGM(instancia.closest('.gpc_modal').getAttribute('id'), false);}
 for (let i = 0;i < 8;i++){setTimeout(function (){gpc_controle['elementos_iniciados']['elemento'].updateRect();}, 40 * i);}
}
 
 let elementos = document.querySelectorAll('.gac-movendo');
 if (elementos){for (var i = 0;i < elementos.length;i++){elementos[i].classList.remove('gac-movendo');}}
}
}, resize:function (id){
 if (document.querySelectorAll('#admin_centro').length){return false;}
 let instancias;
 if (id != undefined){instancias = document.querySelectorAll('#' + id + ' .gac');}
 else{instancias = document.querySelectorAll('.gac');}
 if (instancias){
 let acordeoes = [], blocos = [];
 for (var i = 0;i < instancias.length;i++){
 let elemento = instancias[i].closest('.gpc-e');
 let itens = instancias[i].querySelectorAll('.gac-aberto');
 if (!elemento || !itens.length || !(elemento.closest('.gpc-b') || elemento.closest('.gpc_modal'))){continue;}
 for (var x = 0;x < itens.length;x++){itens[x].querySelector('.gac-item_conteudo').style.height = 'auto';}
 if (blocos.indexOf(elemento.closest('.gpc-b, .gpc_modal')) < 0){blocos.push(elemento.closest('.gpc-b, .gpc_modal'));acordeoes.push(elemento);}
}
 for (var i = 0;i < acordeoes.length;i++){GAccordion.reposicionar(acordeoes[i]);}
}
}, reposicionar:function (elemento){
 let bloco = elemento.closest('.gpc-b, .gpc_modal');
 let id_bloco = (elemento.closest('.gpc-b') ? bloco.getAttribute('id') :bloco.getAttribute('gpc_id_elemento'));
 let versao = 'desktop';
 if (window.innerWidth < 800){versao = 'mobile';}
 let elementos = elemento.closest('.centralizar, .gpc_modal').querySelectorAll('.gpc-e');
 let medidas = [], abertos = [];
 for (var i = 0;i < elementos.length;i++){
 let semente = elementos_posicao[elementos[i].getAttribute('id')];
 if (!semente || !elementos[i].offsetParent){elementos[i].style.top = '';continue;}
 let item = elementos[i].querySelector('.gac-aberto');
 let crescimento = 0, pending = 0;
 if (item){
 let content = item.querySelector('.gac-item_conteudo');
 crescimento = content.scrollHeight;
 pending = Math.max(0, crescimento - content.offsetHeight);
 let rotacao = GAccordion.rotacao(getComputedStyle(elementos[i])['transform']);
 if (rotacao == 90 || rotacao == 270){crescimento = 0;}
 else{crescimento = crescimento + GAccordion.calcularAjuste(rotacao, crescimento).deltaY;}
}
 let medida ={elemento:elementos[i], topo:parseFloat(semente[versao]), altura:elementos[i].offsetHeight + pending, crescimento:crescimento, deslocamento:0};
 medidas.push(medida);
 if (item){abertos.push(medida);}
}
 let fimAntes = 0, fimDepois = 0;
 for (var i = 0;i < medidas.length;i++){
 for (var x = 0;x < abertos.length;x++){
 if (abertos[x] != medidas[i] && medidas[i].topo >= (abertos[x].topo + abertos[x].altura - abertos[x].crescimento) && GAccordion.sobrepoeHorizontal(medidas[i].elemento, abertos[x].elemento)){medidas[i].deslocamento = medidas[i].deslocamento + abertos[x].crescimento;}
}
 fimAntes = Math.max(fimAntes, medidas[i].topo + medidas[i].altura - medidas[i].crescimento);
 fimDepois = Math.max(fimDepois, medidas[i].topo + medidas[i].deslocamento + medidas[i].altura);
 medidas[i].elemento.classList.add('gac-movendo');
 medidas[i].elemento.style.top = (medidas[i].deslocamento ? (medidas[i].topo + medidas[i].deslocamento) + 'px' :'');
}
 bloco.classList.add('gac-movendo');
 if (blocos_posicao[id_bloco]){
 if (abertos.length){bloco.style.setProperty('height', (blocos_posicao[id_bloco][versao] + Math.max(0, fimDepois - fimAntes)) + 'px', 'important');}
 else{bloco.style.height = '';}
}
 if (elemento.closest('.gpc_modal')){PosicionarGM(elemento.closest('.gpc_modal').getAttribute('id'), false);}
}, sobrepoeHorizontal:function (a, b){
 return a.offsetLeft < (b.offsetLeft + b.offsetWidth) && b.offsetLeft < (a.offsetLeft + a.offsetWidth);
}, rotacao:function (transform){
 
 const resultados = transform.match(/matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
 if (!resultados) return 0;
 
 const a = parseFloat(resultados[1]);
 const b = parseFloat(resultados[2]);
 
 let graus = Math.atan2(b, a) * (180 / Math.PI);
 graus = graus % 360;
 if (graus < 0){graus += 360;}
 
 return parseFloat(graus.toFixed(2));
}, calcularAjuste:function (angulo, tamanhoConteudo){
 // Convertendo o ângulo de rotação para radianos
 let radianos = angulo * Math.PI / 180;
 // Calculando os ajustes baseado na expansão do conteúdo e no ângulo de rotação
 let ajusteX = (Math.sin(radianos) * tamanhoConteudo / 2) * -1;
 let ajusteY = ((1 - Math.cos(radianos)) * tamanhoConteudo / 2) * -1;
 // Retornando os ajustes
 return{deltaX:ajusteX, deltaY:ajusteY};
}

}
}();
window.addEventListener('load', function (){GAccordion.instalar();}, false);
window.addEventListener('resize', function (){
 const elementos = document.querySelectorAll('.gac-movendo');
 if (elementos){for (var i = 0;i < elementos.length;i++){elementos[i].classList.remove('gac-movendo');}}
 if (gac_timeout_resize){clearTimeout(gac_timeout_resize);}
 const largura = window.innerWidth;
 gac_timeout_resize = setTimeout(function (){if (largura == window.innerWidth){GAccordion.resize();}}, 50);
}, false);'use strict';

var carregando = false;

var GLoading = function(){
 return{
 instalar :function(){
 
 var gl = document.querySelector('#gloading');
 if (gl == null || gl == undefined){
 var gl_loading = document.createElement("div");
 gl_loading.id = 'gloading';
 gl_loading.className = 'gloading_esconder';
 gl_loading.innerHTML = '<span></span>';
 document.body.appendChild(gl_loading);
}
},
 carregar :function(configuracao){
 
 if (configuracao.hasOwnProperty('ativar') == false){configuracao.ativar = false;}
 if (configuracao.ativar != true && configuracao.ativar != false){configuracao.ativar = false;}
 if (configuracao.hasOwnProperty('tempo') == false){configuracao.tempo = 0;}
 if (configuracao.hasOwnProperty('tipo') == false){configuracao.tipo = 'barra';}
 if (configuracao.tipo != 'barra' && configuracao.tipo != 'tela'){configuracao.tipo = 'barra';}
 
 var gl = document.querySelector('#gloading');
 
 if (gl != null && gl != undefined){
 
 if (configuracao.ativar == true){GLoading.carregar_mostrar(gl, configuracao);}
 
 if (configuracao.ativar == false || configuracao.tempo != 0){GLoading.carregar_esconder(gl, configuracao);}
}
},
 carregar_mostrar :function(gl, configuracao){
 
 carregando = true;
 
 gl.classList.add('gloading_'+configuracao.tipo+'_carregando');
},
 carregar_esconder :function(gl, configuracao){
 (function(gl, configuracao){
 if(configuracao.tempo > 0){
 setTimeout(function(){
 
 if (gl.classList.contains('gloading_tela_carregando')){gl.classList.remove('gloading_tela_carregando');}
 if (gl.classList.contains('gloading_barra_carregando')){gl.classList.remove('gloading_barra_carregando');}
 
 carregando = false;
}, configuracao.tempo);
}else{
 
 if (gl.classList.contains('gloading_tela_carregando')){gl.classList.remove('gloading_tela_carregando');}
 if (gl.classList.contains('gloading_barra_carregando')){gl.classList.remove('gloading_barra_carregando');}
 
 carregando = false;
}
})(gl, configuracao);
}
};
}();




 $(function(){
 $('body').on('click', '.check .check-borda, .check .check-texto',function(evento){
 
 var check = $(this).closest('.check');
 var check_borda = check.find('.check-borda');
 var campo = check.closest('.admin_campos-campo').find('.admin_campo');
 
 if (!check.hasClass('check_selecionado')){
 
 check.addClass('check_selecionado');
 check_borda.addClass('check-borda_efeito').html("<span class='check-borda-bolinha'></span>");
}else{
 
 check.removeClass('check_selecionado');
 check_borda.html("");
}
 var valores = '', opcoes = check.closest('.checks').find('.check_selecionado');
 if(opcoes.length){
 opcoes.each(function(){valores += $(this).attr('id')+',';});
 valores = valores.substr(0,(valores.length-1));
}
 campo.val(valores).trigger('change');
 ValidacaoCampos(campo);
 setTimeout(function(){check_borda.removeClass('check-borda_efeito');},200);
});
});
'use strict';
var GFM = function(){
 return{
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('elemento') == false){configuracao.elemento = '';}
 if (configuracao.hasOwnProperty('mascara') == false){configuracao.mascara = '';}
 if (configuracao.hasOwnProperty('placeholder') == false){configuracao.placeholder = '';}
 
 var elementos = document.querySelectorAll(configuracao.elemento);
 
 for (var i = 0;i < elementos.length;i++){
 (function(configuracao, elemento){
 
 if (elemento !== undefined && elemento !== null){
 
 if (elemento.dataset.gfm_mascara !== undefined && elemento.dataset.gfm_mascara !== null){configuracao.mascara = elemento.dataset.gfm_mascara;}
 if (elemento.dataset.gfm_placeholder !== undefined && elemento.dataset.gfm_placeholder !== null){configuracao.placeholder = elemento.dataset.gfm_placeholder;}
 
 if (elemento.addEventListener){
 elemento.addEventListener("focusin", function (evento){GFM.campo_focusin(configuracao, elemento, evento);});
 elemento.addEventListener("focusout", function (evento){GFM.campo_focusout(configuracao, elemento, evento);});
 elemento.addEventListener('input', function (evento){GFM.campo_digitar(configuracao, elemento, evento);});
}else if (elemento.attachEvent){
 elemento.attachEvent("onfocusin", function (evento){GFM.campo_focusin(configuracao, elemento, evento);});
 elemento.attachEvent("onfocusout", function (evento){GFM.campo_focusout(configuracao, elemento, evento);});
 elemento.attachEvent('oninput', function (evento){GFM.campo_digitar(configuracao, elemento, evento);});
}
}
})(configuracao, elementos[i]);
}
},
 campo_focusin :function(configuracao, elemento, evento){
 
 if (elemento.placeholder){elemento.dataset.gfm_placeholder_anterior = elemento.placeholder;}
 else{elemento.dataset.gfm_placeholder_anterior = ' ';}
 if (configuracao.placeholder){elemento.placeholder = configuracao.placeholder;}
 
 elemento.maxLength = configuracao.mascara.length;
},
 campo_focusout :function(configuracao, elemento, evento){
 
 if (elemento.value.length < configuracao.mascara.replace('9','').replace('Z','').replace('D','').replace('?','').length){elemento.value = '';}
 
 if (elemento.dataset.gfm_placeholder_anterior){elemento.placeholder = elemento.dataset.gfm_placeholder_anterior;}
},
 campo_digitar :function(configuracao, elemento, evento){
 if (evento.inputType && evento.inputType.indexOf('delete') === 0){return;}
 if (evento.data != null){
 var tecla_codigo = evento.data.charCodeAt(0);
 if (tecla_codigo === 8 || tecla_codigo === 46 || tecla_codigo === 16 || tecla_codigo === 17 || tecla_codigo === 18){return;}
 if (tecla_codigo === 37 || tecla_codigo === 38 || tecla_codigo === 39 || tecla_codigo === 40){return;}
}
 evento.preventDefault();
 evento.stopPropagation();
 var texto = elemento.value;
 var posicionar_cursor = false;
 if (typeof elemento.selectionStart == "number" && typeof elemento.selectionEnd == "number"){
 var selecao_inicio = elemento.selectionStart;
 var selecao_fim = elemento.selectionEnd;
 if (selecao_inicio != selecao_fim || elemento.value.length != selecao_fim){
 posicionar_cursor = true;
}
}
 var texto_tamanho = texto.length;
 var texto_novo = '';
 var caractere = '';
 for (var numero_mascara = 0, numero_texto = 0;numero_mascara < configuracao.mascara.length;++numero_mascara){
 caractere = texto.charAt(numero_texto);
 switch (configuracao.mascara.charAt(numero_mascara)){
 case '0' :
 case '9' :
 if (/\d/.test(caractere)){texto_novo += caractere;}
 ++numero_texto;
 break;
 case 'A' :
 case 'Z' :
 if (/[a-z]/i.test(caractere)){texto_novo += caractere;}
 ++numero_texto;
 break;
 case 'C' :
 case 'D' :
 if (/[a-z0-9]/i.test(caractere)){texto_novo += caractere;}
 ++numero_texto;
 break;
 case 'X' :
 case '?' :
 texto_novo += caractere;
 ++numero_texto;
 break;
 default :
 texto_novo += configuracao.mascara.charAt(numero_mascara);
 if (configuracao.mascara.charAt(numero_mascara) == texto.charAt(numero_mascara)){
 ++numero_texto;
}else{if (posicionar_cursor && numero_texto+1 == selecao_inicio){++selecao_inicio;}}
 break;
}
 if (numero_texto == texto_tamanho){break;}
}
 elemento.value = texto_novo;
 if (posicionar_cursor && elemento.setSelectionRange){elemento.setSelectionRange(selecao_inicio, selecao_inicio);}
}
};
}();


 
 var gm_quantidade = 0;
 function AbrirGM(id_gm, componente, configuracao){
 
 var z_index_fundo = 999, z_index_caixa = 1000;
 if($('#gpc-menu').length){
 z_index_fundo = 999999999999902;
 z_index_caixa = 999999999999903;
}
 var gm_conteudos = '';
 if (configuracao['gm']['conteudos']){$.each(configuracao['gm']['conteudos'], function (classe, div){if (div.conteudo){gm_conteudos += "<div class='"+componente+"-"+classe+"' "+div.extras+" style='"+div.estilos+"'>"+div.conteudo+"</div>";}});}
 var gm_fundo_conteudos = '';
 if (configuracao['gm']['conteudos']){$.each(configuracao['gm_fundo']['conteudos'], function (classe, div){if (div.conteudo){gm_fundo_conteudos += "<div class='"+componente+"_fundo-"+classe+"' "+div.extras+" style='"+div.estilos+"'>"+div.conteudo+"</div>";}});}
 var scroll = (window.gScrollTop ? window.gScrollTop() : window.scrollY);
 var tela_altura = $(window).height();
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){
 scroll = (document.getElementById("gpc-blocos").scrollTop-$('#gpc-blocos').offset().top);
 tela_altura = $('#gpc-blocos_editor').height();
}
 
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor').append("<div gm_id='"+id_gm+"' gm_componente='"+componente+"' class='gm_fundo "+id_gm+" "+configuracao['gm_fundo']['classes']+"' "+configuracao['gm_fundo']['extras']+" style='z-index:"+(z_index_fundo+gm_quantidade)+";"+configuracao['gm_fundo']['estilos']+"'>"+gm_fundo_conteudos+"</div>");}
 else{$("body").append("<div gm_id='"+id_gm+"' gm_componente='"+componente+"' class='gm_fundo "+id_gm+" "+configuracao['gm_fundo']['classes']+"' "+configuracao['gm_fundo']['extras']+" style='z-index:"+(z_index_fundo+gm_quantidade)+";"+configuracao['gm_fundo']['estilos']+"'>"+gm_fundo_conteudos+"</div>");}
 
 $("."+id_gm).addClass('gm_fundo_ativo');
 if(!$(".gm").length || $('.gpc_modal').lenght){
 
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor').addClass('body_bloquear');}
 else{
 if(componente == 'gpc_modal_popup'){$("body").addClass('body_bloquear_site');}
 else{
 $("body").addClass('body_bloquear');
 if(componente == 'gpc_modal_imagens'){$("body").css({'overflow':'hidden'});}
}
}
 
 if($('#site').length && componente != 'gma_modal'){$('#site').addClass('site_borrar').css({'top':-scroll+'px','height':($('#site').height()+scroll)+''});}
 else if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor-blocos').addClass('administrador_borrar').css({'top':-(scroll)+'px'});}
 else{$('#administrador').addClass('administrador_borrar').css({'top':-scroll+'px'});}
}
 
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor').append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+tela_altura+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 else if(componente == 'gma_modal'){$("body").append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm gm_efeitos "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+((tela_altura/100)*5)+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 else if(componente == 'gpc_modal_popup'){$("body").append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm gm_esconder "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+(tela_altura+scroll)+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 else{$("body").append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm gm_esconder "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+tela_altura+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 
 if(componente == 'gma_modal'){
 setTimeout(function(){
 $('#'+id_gm).css('opacity', '1');
 PosicionarGM(id_gm);
},250);
}else{setTimeout(function(){PosicionarGM(id_gm);},150);}
 
 window.addEventListener('resize', function(event){
 if(componente != 'gpc_modal'){
 if (componente == 'gmi'){PosicionarGM(id_gm, false);}
 else{PosicionarGM(id_gm);}
}
});
}
 function PosicionarGM(id_gm, efeitos){
 
 if(efeitos === undefined || efeitos === ''){efeitos = true;}
 
 var gm = $("#"+id_gm);
 if (gm.length){
 
 var tela_altura = $(window).height();
 var tela_largura = $(window).width();
 var tela = (window.gScrollTop ? window.gScrollTop() : window.scrollY);
 if($('.gm').length > 1){tela = 0;}
 
 if (gm.attr('gm_componente') == 'gpc_modal'){
 tela = document.getElementById("gpc-blocos").scrollTop;
 tela_altura = $('#gpc-blocos_editor').height();
 gm.find('.gpc_modal-centro').removeAttr('style');
 var gm_fundo = $("."+id_gm);
 var height = 20;
 $('.'+gpc_controle['classe_bloco']).each(function(){height += $(this).height();});
 gm_fundo.css({'height':height+'px'});
}
 if (gm.attr('gm_componente') == 'gpc_modal_formulario'){gm.find('.gpc_modal_formulario-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gml'){gm.find('.gml-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gmf'){gm.find('.gmf-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gm_configurar_dns_completo'){gm.find('.gm_configurar_dns_completo-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'guo'){gm.find('.guo-passos').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gsp'){gm.find('.gmf-opcoes').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gpc_modal_imagens'){gm.find('.gpc_modal_imagens-centro, .gpc_modal_imagens-centro-pastas, .gpc_modal_imagens-centro-fotos').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gmi'){
 
 var imagem = CalcularGMI(gmi_elemento['elemento']);
 
 if (gmi_caixa['elemento']){
 
 gmi_caixa['elemento'].css({'width':imagem['largura']+'px', 'height':imagem['altura']+'px'});
 
 gmi_caixa_imagem['elemento'].css({'width':imagem['largura']+'px', 'height':imagem['altura']+'px'});
}
}
 if (gm.attr('gm_componente') == 'gmi_informacoes'){gm.find('.gmi_informacoes-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gmi_comentarios'){gm.find('.gmi_comentarios-centro').css('height','100%');}
 
 var gm_largura = gm.width();
 
 var gm_altura = 0;
 if (gm.attr('gm_componente') == 'gpc_modal_imagens' || gm.attr('gm_componente') == 'gml'){gm_altura = tela_altura;
}else if (gm.attr('gm_componente') == 'gpc_modal_popup' || gm.attr('gm_componente') == 'gpc_modal'){
 if(gm.attr('gm_componente') == 'gpc_modal_popup'){tela = 0;}
 gm_altura = $('.gpc_modal').height();
 var gm_fundo = $("."+id_gm);
 var height = 20;
 if (gm.attr('gm_componente') == 'gpc_modal_popup'){
 gm_altura = $('.gpc_modal_popup-centro').height();
 $('.gpc-b').each(function(){height += $(this).height();});
}else{$('.'+gpc_controle['classe_bloco']).each(function(){height += $(this).height();});}
 if (gm_altura >= tela_altura){
 $('#site').css({'height':(gm_altura+Math.abs(parseFloat($('#site').css('top')))+70)+'px'});
 gm_fundo.css({'height':(gm_altura+70)+'px'});
}else{
 $('#site').css({'height':(tela_altura+Math.abs(parseFloat($('#site').css('top'))))+'px'});
 if(gm_altura+20 >= (gm_fundo.height()-10)){gm_fundo.css({'height':(tela_altura+10)+'px'});}
 else{gm_fundo.css({'height':tela_altura+'px'});}
}
}else if (gm.attr('gm_componente') == 'gpc_modal_formulario'){gm_altura = $('.gpc_modal_formulario').height();
}else if (gm.attr('gm_componente') == 'gma_modal'){gm_altura = $('#gm-gpages_modal').height();
}else{gm.children().each(function(){gm_altura += $(this).outerHeight(true);});}
 if (gm_altura >= tela_altura){
 if (gm.attr('gm_componente') == 'gpc_modal_formulario'){gm.find('.gpc_modal_formulario-centro').css({'height':$('.gpc_modal_formulario').height()+'px'});}
 if (gm.attr('gm_componente') == 'gpc_modal'){gm.find('.gpc_modal-centro').css({'height':$('.gpc_modal').height()+'px'});}
 if (gm.attr('gm_componente') == 'gpc_modal_popup'){gm.find('.gpc_modal_popup-centro').css({'height':$('.gpc_modal_popup').height()+'px'});}
 if (gm.attr('gm_componente') == 'gml'){
 
 tela += 20;
 gm.find('.gml-centro, .gml-opcoes-lista-lateral, .gml-opcoes-lista-opcoes').css({'height':((tela_altura-(gm.find('.gml-topo').outerHeight()))-50)+'px'});
}
 if (gm.attr('gm_componente') == 'gmf'){gm.find('.gmf-centro').css({'height':((tela_altura-((gm.find('.gmf-topo').outerHeight())+(gm.find('.gmf-rodape').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gm_configurar_dns_completo'){gm.find('.gm_configurar_dns_completo-centro').css({'height':((tela_altura-((gm.find('.gm_configurar_dns_completo-topo').outerHeight())+(gm.find('.gm_configurar_dns_completo-rodape').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gpc_modal_imagens'){
 tela += 50;
 gm.find('.gpc_modal_imagens-centro, .gpc_modal_imagens-centro-pastas, .gpc_modal_imagens-centro-fotos').css({'height':((tela_altura-(gm.find('.gpc_modal_imagens-topo').outerHeight()))-120)+'px'});
}
 if (gm.attr('gm_componente') == 'guo'){gm.find('.guo-passos').css({'height':(gm_altura-(gm_altura-tela_altura)-96)+'px'});}
 if (gm.attr('gm_componente') == 'gsp'){gm.find('.gsp-opcoes').css({'height':((tela_altura-((gm.find('.gsp-topo').outerHeight())+(gm.find('.gsp-rodape').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gmi_informacoes'){gm.find('.gmi_informacoes-centro').css({'height':((tela_altura-((gm.find('.gmi_informacoes-topo').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gmi_comentarios'){gm.find('.gmi_comentarios-centro').css({'height':((tela_altura-((gm.find('.gmi_comentarios-topo').outerHeight())+(gm.find('.gmi_comentarios-rodape').outerHeight())))-20)+'px'});}
 
 if (efeitos){
 if (!gm.hasClass('gm_efeitos')){gm.addClass('gm_efeitos');}
}else{
 if (gm.hasClass('gm_efeitos')){gm.removeClass('gm_efeitos');}
}
 
 if(gm.attr('gm_componente') == 'gpc_modal_popup'){
 setTimeout(function(){
 gm.css({'top':(tela+10)+'px'}).removeClass('gm_esconder');
 $('.'+id_gm).css({'overflow':''});
},25);
}else if (gm.attr('gm_componente') == 'gma_modal'){setTimeout(function(){gm.css({'top':(tela)+'px'}).removeClass('gm_esconder');},25);}
 else{
 setTimeout(function(){
 gm.css({'top':(tela+10)+'px'}).removeClass('gm_esconder');
 if(gm.attr('gm_componente') == 'gpc_modal' && typeof gpc_controle['elementos_iniciados'][id_gm] == 'object'){
 
 if(Object.keys(gpc_controle['elementos_iniciados']).length){
 $.each(gpc_controle['elementos_iniciados'], function (i, elemento_iniciado){
 if(typeof gpc_controle['elementos_iniciados'][i].updateRect == 'function'){gpc_controle['elementos_iniciados'][i].updateRect();}
});
}
}
},25);
}
}else{
 if (gm.attr('gm_componente') == 'gpc_modal_imagens'){gm.find('.gpc_modal_imagens-centro, .gpc_modal_imagens-centro-pastas, .gpc_modal_imagens-centro-fotos').css({'height':((gm_altura-(gm.find('.gpc_modal_imagens-topo').outerHeight()))-120)+'px'});}
 if (gm.attr('gm_componente') == 'gml'){gm.find('.gml-centro, .gml-opcoes-lista-lateral, .gml-opcoes-lista-opcoes').css({'height':((tela_altura-(gm.find('.gml-topo').outerHeight()))-50)+'px'});}
 
 if (efeitos){if (!gm.hasClass('gm_efeitos')){gm.addClass('gm_efeitos');}}else{if (gm.hasClass('gm_efeitos')){gm.removeClass('gm_efeitos');}}
 
 if(gm.attr('gm_componente') == 'gpc_modal_popup'){
 setTimeout(function(){
 gm.css({'top':(((tela_altura-gm_altura)/2)+tela)+'px','bottom':'initial'}).removeClass('gm_esconder');
 $('.'+id_gm).css({'overflow':''});
},25);
}else{
 setTimeout(function(){
 gm.css({'top':(((tela_altura-gm_altura)/2)+tela)+'px','bottom':'initial'}).removeClass('gm_esconder');
 if(gm.attr('gm_componente') == 'gpc_modal' && typeof gpc_controle['elementos_iniciados'][id_gm] == 'object'){gpc_controle['elementos_iniciados'][id_gm].updateRect();}
},25);
}
}
}
}
 function FecharGM(id_gm){
 var gm = $("#"+id_gm);
 if (gm.length){
 var componente = gm.attr('gm_componente');
 if(componente == 'gpc_modal_formulario'){MostrarPreview(false);}
 if(gm.attr('id') == 'gm-plano_alteracao_pagamento' || gm.attr('id') == 'gm-plano_alteracao' || gm.attr('id') == 'gm-plano_contratou'){
 editou = false;
 editou_caixa = false;
 GLoading.carregar({'ativar':false});
 document.location.reload();
}
 if(gm.attr('gm_componente') == 'gpc_modal' && typeof gpc_controle['elementos_iniciados'][id_gm] == 'object'){
 gpc_controle['elementos_iniciados'][id_gm].destroy();
 delete gpc_controle['elementos_iniciados'][id_gm];
}
 
 var gm_fundo = $("."+id_gm);
 var tela = (window.gScrollTop ? window.gScrollTop() : window.scrollY);
 var tela_altura = $(window).height();
 if (componente == 'gpc_modal'){
 tela_largura = $('#gpc-blocos_editor').width();
 tela = document.getElementById("gpc-blocos").scrollTop;
}
 
 if (!gm.hasClass('gm_efeitos')){gm.addClass('gm_efeitos');}
 
 if(componente == 'gma_modal'){gm.css({'opacity':'0'});}
 else{gm.css({'top':(tela_altura+tela)+'px'});}
 
 setTimeout(function(){gm_fundo.removeClass('gm_fundo_ativo');},100);
 
 setTimeout(function(){
 
 if($('.gm_fundo').length == 1){
 if (componente == 'gpc_modal'){
 $('.'+gpc_controle['classe_elemento_adicionar']+'[gpc_tipo="bloco"]').removeClass('esconder');
 var elemento_original = $('.gpc_modal').attr('gpc_id_elemento');
 if(gpc_controle['elementos_selecionados']['elementos_resize'] != ''){
 gpc_controle['elementos_selecionados'] ={'elementos':{}, 'elementos_resize':'', 'total' :0,'helper':{'largura':0,'altura':0,'left_original':'','top_original':'','elemento_left_original':'','elemento_top_original':'','scrollTop':$("#gpc-blocos").offset().top,'scrollLeft':$("#gpc-blocos").scrollLeft()}};
 $('#'+gpc_controle['classe_elementos_selecionados']).remove();
 $('.ui-selected').removeClass('ui-selected');
}
 setTimeout(function(){
 $('#elementos_'+elemento_original).addClass('ativo').trigger('click');
 gpc_controle['elementos_iniciados']['elemento']['target'] = $('#elementos_'+elemento_original)[0];
 gpc_controle['elementos_iniciados']['elemento'].updateRect();
 gpc_controle['elementos_iniciados']['elemento'].selfElement.style.opacity = 1;
},300);
 $('#gpc-blocos_editor-blocos').removeClass('administrador_borrar').removeAttr('style');
 $('.'+gpc_controle['classe_bloco_configurar']).remove();
}else if ($('#site').length){
 if($('#site').closest('.gmf').length){$('#administrador').removeClass('administrador_borrar').removeAttr('style');}
 else{$('#site').removeClass('site_borrar').removeAttr('style');}
}else{$('#administrador').removeClass('administrador_borrar').removeAttr('style');}
}
 
 if($('.gm_fundo').length == 1){
 if (componente == 'gpc_modal'){$('#gpc-blocos_editor').removeClass('body_bloquear');}
 else{$('body').removeClass('body_bloquear body_bloquear_site');}
}
 
 if($('.gm_fundo').length == 1){
 if(componente == 'gpc_modal'){document.getElementById("gpc-blocos").scrollTop = parseFloat(gm.attr('gm_scroll'))+$('#gpc-blocos').offset().top;}
 else if(window.gScrollSet){window.gScrollSet(parseFloat(gm.attr('gm_scroll'))||0, false);}
 else{window.scroll({top:gm.attr('gm_scroll'), behavior:"auto"});}
}
 
 gm.remove();gm_fundo.remove();
 editou = false;
 editou_caixa = false;
 GLoading.carregar({'ativar':false});
 if(componente == 'gpc_modal_imagens'){$("body").css({'overflow':''});}
 if(componente == 'gpc_modal'){
 ElementosBind('todos','reiniciar');
 setTimeout(function(){
 if(typeof gpc_controle['elementos_iniciados']['elemento'] == 'object'){
 
 if(Object.keys(gpc_controle['elementos_iniciados']).length){
 $.each(gpc_controle['elementos_iniciados'], function (i, elemento_iniciado){
 if(typeof gpc_controle['elementos_iniciados'][i].updateRect == 'function'){gpc_controle['elementos_iniciados'][i].updateRect();}
});
}
}
},25);
}
},200);
}
}
 function PulsarGM(id_gm){
 $('#'+id_gm).addClass('gm_pulsar');
 setTimeout(function(){$('#'+id_gm).removeClass('gm_pulsar');},100);
}
 $(function(){
 $('body').on('click','.gm_fundo',function(){if ($(this).attr('gm_fundo_acao') == 'pulsar'){PulsarGM($(this).attr('gm_id'));}else if ($(this).attr('gm_fundo_acao') == 'fechar'){FecharGM($(this).attr('gm_id'));}});
 $('body').on('click','.gm_fechar',function(){FecharGM($(this).attr('gm_id'));});
});
'use strict';

var GModalApproval = function(){
 var _handlerBotaoEditar = null;
 var _handlerBotaoConfigurar = null;
 var _handlerBotaoConfirmar = null;
 var _handlerBotaoRejeitar = null;
 var _handlerBotaoFechar = null;
 var _idModal = null;
 
 var _traducoes ={
 'pt' :{
 'aceitar' :'Entendi e aceito',
 'aceitar_aviso' :'Ok, entendi',
 'rejeitar' :'Rejeitar',
 'configurar' :'Configurar',
 'preferencias' :'Preferências de cookies',
 'modal_titulo' :'Configurações de cookies',
 'modal_texto' :'Você pode escolher quais cookies quer aceitar',
 'modal_confirmar' :'Confirmar configurações',
 'politica' :'Ao navegar nesse site, você está ciente do nosso {link}.',
 'politica_link' :'Aviso de Privacidade',
 'opcoes' :{
 'o' :{'titulo':'Cookies obrigatórios', 'texto':'Eles são cookies para garantir o funcionamento adequado do site.', 'aviso':'Sempre ativo'},
 'e' :{'titulo':'Cookies de estatísticas', 'texto':'São usados para coletar informações para exibir conteúdos específicos para um navegador em particular ao criar diferentes grupos-alvo.'},
 'm' :{'titulo':'Cookies de marketing', 'texto':'Eles são usados para coletar informações para exibir publicidade ou conteúdos específicos para um navegador em particular ao criar diferentes grupos-alvo.'}
}
},
 'en' :{
 'aceitar' :'I understand and accept',
 'aceitar_aviso' :'Ok, got it',
 'rejeitar' :'Reject',
 'configurar' :'Customize',
 'preferencias' :'Cookie preferences',
 'modal_titulo' :'Cookie settings',
 'modal_texto' :'You can choose which cookies you want to accept',
 'modal_confirmar' :'Confirm settings',
 'politica' :'By browsing this site, you acknowledge our {link}.',
 'politica_link' :'Privacy Notice',
 'opcoes' :{
 'o' :{'titulo':'Required cookies', 'texto':'These cookies ensure the proper functioning of the site.', 'aviso':'Always active'},
 'e' :{'titulo':'Statistics cookies', 'texto':'They are used to collect information to display specific content for a particular browser by creating different target groups.'},
 'm' :{'titulo':'Marketing cookies', 'texto':'They are used to collect information to display advertising or specific content for a particular browser by creating different target groups.'}
}
},
 'es' :{
 'aceitar' :'Entiendo y acepto',
 'aceitar_aviso' :'Ok, entendido',
 'rejeitar' :'Rechazar',
 'configurar' :'Configurar',
 'preferencias' :'Preferencias de cookies',
 'modal_titulo' :'Configuración de cookies',
 'modal_texto' :'Puedes elegir qué cookies quieres aceptar',
 'modal_confirmar' :'Confirmar configuración',
 'politica' :'Al navegar por este sitio, usted acepta nuestro {link}.',
 'politica_link' :'Aviso de Privacidad',
 'opcoes' :{
 'o' :{'titulo':'Cookies obligatorias', 'texto':'Son cookies que garantizan el funcionamiento adecuado del sitio.', 'aviso':'Siempre activo'},
 'e' :{'titulo':'Cookies de estadísticas', 'texto':'Se utilizan para recopilar información y mostrar contenidos específicos para un navegador en particular al crear diferentes grupos objetivo.'},
 'm' :{'titulo':'Cookies de marketing', 'texto':'Se utilizan para recopilar información y mostrar publicidad o contenidos específicos para un navegador en particular al crear diferentes grupos objetivo.'}
}
}
};
 
 var _idioma = (navigator.language || navigator.userLanguage || 'en').toLowerCase().substr(0,2);
 var _t = _traducoes[_idioma] || _traducoes['en'];
 return{
 
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('barra') == false){configuracao.barra = '';}
 
 if (configuracao.barra != ''){
 
 if(GModalApproval.preferencias() == null){GModalApproval.barra(configuracao);}
 else{
 GModalApproval.botao(configuracao);
 GModalApproval.instalar_scripts(configuracao,false);
}
 
 setTimeout(function(){GModalApproval.posicionar();}, 500);
}
},
 
 barra :function(configuracao){
 
 if (configuracao.barra.hasOwnProperty('fechar') == false){configuracao.barra.fechar = false;}
 if (configuracao.barra.hasOwnProperty('cor') == false){configuracao.barra.cor = 'ffffff';}
 if (configuracao.barra.hasOwnProperty('classe') == false){configuracao.barra.classe = '';}
 if (configuracao.barra.hasOwnProperty('texto') == false){configuracao.barra.texto = '';}
 
 var consentimento = configuracao.barra.tipo == 2;
 
 var texto = configuracao.barra.texto;
 if(configuracao.barra.politica){
 var ultimo = texto.substr(texto.length-1);
 var link = '<a href="'+configuracao.barra.politica+'" title="'+_t.politica_link+'" target="_blank" class="link_externo">'+_t.politica_link+'</a>';
 texto += (ultimo != '.' && ultimo != '-' ? '.' :'')+'&nbsp;'+_t.politica.replace('{link}', link);
}
 
 var barra = '<div id="gpc-lgpd_texto">'+texto+'</div>';
 barra += '<div id="gpc-lgpd_botoes">';
 if(consentimento){
 barra += '<div id="gpc-lgpd_botoes-configurar" class="gpc-lgpd_botoes-botao">'+_t.configurar+'</div>';
 barra += '<div id="gpc-lgpd_botoes-rejeitar" class="gpc-lgpd_botoes-botao">'+_t.rejeitar+'</div>';
}
 barra += '<div id="gpc-lgpd_botoes-confirmar" class="gpc-lgpd_botoes-botao">'+(consentimento ? _t.aceitar :_t.aceitar_aviso)+'</div>';
 barra += "</div>";
 if(configuracao.barra.fechar){barra += '<div id="gpc-lgpd_fechar"></div>';}
 
 var g_lgpd = document.createElement("div");
 g_lgpd.id = 'gpc-lgpd';
 g_lgpd.className = 'posicionar gpc-lgpd-cor_'+configuracao.barra.cor+' '+(consentimento ? 'botoes' :'botao')+' '+configuracao.barra.classe;
 g_lgpd.innerHTML = barra;
 document.body.appendChild(g_lgpd);
 setTimeout(function(){GModalApproval.configurar(configuracao);}, 300);
},
 botao :function(configuracao){
 
 if(configuracao.barra.hasOwnProperty('editar_consentimento') == false){configuracao.barra.editar_consentimento = true;}
 if(configuracao.barra.editar_consentimento){
 var g_lgpd = document.getElementById("gpc-lgpd_editar");
 if(g_lgpd == null){
 
 g_lgpd = document.createElement("div");
 g_lgpd.id = 'gpc-lgpd_editar';
 g_lgpd.className = 'posicionar gtt-direita gpc-lgpd-cor_'+configuracao.barra.cor+' '+configuracao.barra.classe;
 g_lgpd.setAttribute('data-gtt',_t.preferencias);
 document.body.appendChild(g_lgpd);
 GTooltip.instalar({'elemento' :'.gtt-direita', 'direcao' :'direita'});
 
 setTimeout(function(){GModalApproval.configurar(configuracao);}, 300);
}
}
 
 setTimeout(function(){GModalApproval.posicionar();}, 200);
},
 modal :function(configuracao){
 
 if(document.getElementsByClassName('gm_lgpd').length){return;}
 
 GLoading.carregar({'ativar':true});
 
 var conteudo = '';
 if (configuracao.hasOwnProperty('opcoes') == false){configuracao.opcoes = '';}
 
 conteudo += '<div id="gpc_modal_lgpd-titulo">';
 conteudo += '<div class="gpc_modal_lgpd-titulo-titulo">'+_t.modal_titulo+'</div>';
 conteudo += '<div class="gpc_modal_lgpd-titulo-texto">'+_t.modal_texto+'</div>';
 conteudo += '</div>';
 if(configuracao.opcoes != ''){
 var cookie = GModalApproval.preferencias() || 'o:1&e:0&m:0';
 for (var i = 0;i < configuracao.opcoes.length;i++){
 var opcao = _t.opcoes[configuracao.opcoes[i].id] || {'titulo':'', 'texto':''};
 conteudo += '<div class="gpc_modal_lgpd-opcoes">';
 conteudo += '<div class="gpc_modal_lgpd-opcoes-protecao">';
 conteudo += '<span class="gpc_modal_lgpd-opcoes-titulo">'+opcao.titulo+'</span>';
 if(opcao.aviso){conteudo += '<span class="gpc_modal_lgpd-opcoes-aviso">'+opcao.aviso+'</span>';}
 else{
 if(cookie){configuracao.opcoes[i].valor = (cookie.indexOf(configuracao.opcoes[i].id+':1') !== -1 ? true :false);}
 conteudo += '<span id="'+configuracao.opcoes[i].id+'" class="gpc_modal_lgpd-opcoes-selecao'+(configuracao.opcoes[i].valor ? ' gpc_modal_lgpd-opcoes-selecao_selecionado' :'')+'"><span class="marcador"></span></span>';
}
 conteudo += '</div>';
 conteudo += '<div class="gpc_modal_lgpd-opcoes-texto">'+opcao.texto+'</div>';
 conteudo += '</div>';
}
}
 conteudo += '<div id="gpc_modal_lgpd-confirmar">'+_t.modal_confirmar+'</div>';
 
 var modal ={
 'gm' :{
 'conteudos' :{
 'topo' :{'conteudo' :"<div id='gpc_modal_popup_lgpd-topo-fechar' class='gpc_modal_popup_lgpd-topo-fechar gpc_modal_popup-fechar icone-fechar'></div>", 'estilos' :'', 'extras' :''},
 'centro' :{'conteudo' :conteudo, 'estilos' :'', 'extras' :''}
},
 'classes' :'gm_lgpd',
 'estilos' :'max-width:420px;',
 'extras' :''
},
 'gm_fundo' :{
 'conteudos' :{'topo' :{'conteudo' :"<div id='gpc_modal_popup-fundo-fechar' class='gpc_modal_popup-fundo-fechar gpc_modal_popup-fechar icone-fechar'></div>"}},
 'classes' :'gpc_modal_lgpd-fundo',
 'estilos' :'overflow:hidden;',
 'extras' :'gm_fundo_acao="fechar" id="gpc_modal_lgpd-fundo"'
}
};
 
 gm_quantidade++;
 _idModal = 'gpc_modal_lgpd_'+gm_quantidade;
 AbrirGM(_idModal, 'gpc_modal_popup_lgpd',modal);
 
 GLoading.carregar({'ativar':false});
 var lgpd = document.getElementById("gpc-lgpd");
 if(lgpd == null){lgpd = document.getElementById("gpc-lgpd_editar");}
 lgpd.classList.add('posicionar');
 lgpd.classList.remove('posicionado');
 setTimeout(function(){
 
 var botao_confirmar = document.getElementById("gpc_modal_lgpd-confirmar");
 if(botao_confirmar != null){botao_confirmar.addEventListener("click", function(){GModalApproval.confirmar(configuracao);});}
 var fechar1 = document.getElementById("gpc_modal_popup_lgpd-topo-fechar");
 if(fechar1 != null){
 fechar1.addEventListener("click", function(){
 FecharGM(_idModal);
 GModalApproval.posicionar();
});
}
 var fechar2 = document.getElementById("gpc_modal_popup-fundo-fechar");
 if(fechar2 != null){fechar2.addEventListener("click", function(){GModalApproval.posicionar();});}
 var fechar3 = document.getElementById("gpc_modal_lgpd-fundo");
 if(fechar3 != null){fechar3.addEventListener("click", function(){GModalApproval.posicionar();});}
 var opcoes = document.getElementsByClassName('gpc_modal_lgpd-opcoes-selecao');
 if(opcoes != null){
 for (var i = 0;i < opcoes.length;i++){
 opcoes[i].addEventListener("click", function(e){
 if(this.classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado')){this.classList.remove('gpc_modal_lgpd-opcoes-selecao_selecionado');}
 else{this.classList.add('gpc_modal_lgpd-opcoes-selecao_selecionado');}
});
}
}
},400);
},
 posicionar :function(){
 var g_lgpd = document.getElementById("gpc-lgpd");
 if(g_lgpd == null){g_lgpd = document.getElementById("gpc-lgpd_editar");}
 if(g_lgpd){
 g_lgpd.classList.add('posicionado');
 g_lgpd.classList.remove('posicionar');
}
},
 
 configurar :function(configuracao){
 
 var botao_editar = document.getElementById("gpc-lgpd_editar");
 if(botao_editar){
 if(_handlerBotaoEditar){botao_editar.removeEventListener("click", _handlerBotaoEditar);}
 _handlerBotaoEditar = function(){GModalApproval.modal(configuracao);};
 botao_editar.addEventListener("click", _handlerBotaoEditar);
}
 
 var botao_configurar = document.getElementById("gpc-lgpd_botoes-configurar");
 if(botao_configurar){
 if(_handlerBotaoConfigurar){botao_configurar.removeEventListener("click", _handlerBotaoConfigurar);}
 _handlerBotaoConfigurar = function(){GModalApproval.modal(configuracao);};
 botao_configurar.addEventListener("click", _handlerBotaoConfigurar);
}
 
 var botao_confirmar = document.getElementById("gpc-lgpd_botoes-confirmar");
 if(botao_confirmar){
 if(_handlerBotaoConfirmar){botao_confirmar.removeEventListener("click", _handlerBotaoConfirmar);}
 _handlerBotaoConfirmar = function(){GModalApproval.confirmarTodos(configuracao);};
 botao_confirmar.addEventListener("click", _handlerBotaoConfirmar);
}
 
 var botao_rejeitar = document.getElementById("gpc-lgpd_botoes-rejeitar");
 if(botao_rejeitar){
 if(_handlerBotaoRejeitar){botao_rejeitar.removeEventListener("click", _handlerBotaoRejeitar);}
 _handlerBotaoRejeitar = function(){GModalApproval.cancelarTodos(configuracao);};
 botao_rejeitar.addEventListener("click", _handlerBotaoRejeitar);
}
 
 var botao_fechar = document.getElementById("gpc-lgpd_fechar");
 if(botao_fechar){
 if(_handlerBotaoFechar){botao_fechar.removeEventListener("click", _handlerBotaoFechar);}
 _handlerBotaoFechar = function(){GModalApproval.cancelarTodos(configuracao);};
 botao_fechar.addEventListener("click", _handlerBotaoFechar);
}
},
 confirmar :function(configuracao){
 
 var valor = 'o:1';
 
 var elementos = document.getElementsByClassName('gpc_modal_lgpd-opcoes-selecao');
 let editado = false;
 if (elementos.length){
 for (var i = 0;i < elementos.length;i++){
 valor += '&'+elementos[i].id+':'+(elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado') ? '1' :'0');
 if (elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao') == true){
 for (var x = 0;x < configuracao.opcoes.length;x++){
 if (configuracao.opcoes[x].id == elementos[i].id){
 if(configuracao.opcoes[x].valor != elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado')){editado = true;}
 configuracao.opcoes[x].valor = elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado');
}
}
}
}
}
 configuracao.editado = editado;
 GModalApproval.salvar_preferencias(valor,configuracao.dominio);
 
 
 FecharGM(_idModal);
 
 var elemento = document.getElementById('gpc-lgpd');
 if (elemento != null){
 
 elemento.remove();
 
 GModalApproval.botao(configuracao);
}
 
 GModalApproval.posicionar();
 
 GModalApproval.remover_preferencias(configuracao);
},
 confirmarTodos :function(configuracao){
 
 var valor = 'o:1';
 
 for (var x = 0;x < configuracao.opcoes.length;x++){
 if(configuracao.opcoes[x].hasOwnProperty('valor')){
 configuracao.opcoes[x].valor = true;
 valor += '&'+configuracao.opcoes[x].id+':1';
}
}
 GModalApproval.salvar_preferencias(valor,configuracao.dominio);
 GModalApproval.instalar_scripts(configuracao);
 configuracao.editado = true;
 
 var elemento = document.getElementById('gpc-lgpd');
 if(elemento != null){elemento.remove();}
 
 GModalApproval.botao(configuracao);
},
 cancelarTodos :function(configuracao){
 
 var valor = 'o:1';
 
 for (var x = 0;x < configuracao.opcoes.length;x++){
 if(configuracao.opcoes[x].hasOwnProperty('valor')){
 configuracao.opcoes[x].valor = false;
 valor += '&'+configuracao.opcoes[x].id+':0';
}
}
 configuracao.editado = true;
 GModalApproval.salvar_preferencias(valor,configuracao.dominio);
 GModalApproval.instalar_scripts(configuracao);
 
 var elemento = document.getElementById('gpc-lgpd');
 if(elemento != null){elemento.remove();}
 
 GModalApproval.botao(configuracao);
},
 
 preferencias :function(){
 
 var strNomeIgual = "gpages_cookies=";
 var cookie_array = document.cookie.split(';');
 
 for(var i = 0;i < cookie_array.length;i++){
 var cookie_string = cookie_array[i];
 while (cookie_string.charAt(0) == ' '){cookie_string = cookie_string.substring(1, cookie_string.length);}
 if (cookie_string.indexOf(strNomeIgual) != -1){return cookie_string.substring(strNomeIgual.length, cookie_string.length);}
}
 
 return null;
},
 salvar_preferencias :function(preferencias, dominio){
 
 if (dominio == undefined){dominio = '';}
 var data = new Date();
 
 data.setTime(data.getTime() + (365 * 24 * 60 * 60 * 1000));
 document.cookie = "gpages_cookies=" + preferencias + ";Expires=" + data.toGMTString() + ";Path=/;"+(dominio ? ' Domain='+dominio :'');
 
 return true;
},
 remover_preferencias :function(configuracao){
 
 if(configuracao.editado){
 var cookie_array = document.cookie.split(';');
 var cookies_limpos = '';
 for(var i = 0;i < cookie_array.length;i++){
 var cookie_string = cookie_array[i];
 while (cookie_string.charAt(0) == ' '){cookie_string = cookie_string.substring(1, cookie_string.length);}
 if (cookie_string.indexOf('gpages_') === -1){cookies_limpos += cookie_string.substring(0,cookie_string.indexOf('='))+"=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;Path=/;"+(configuracao.dominio ? ' Domain='+configuracao.dominio :'');}
 else{cookies_limpos += cookie_string;}
}
 document.cookie = cookies_limpos;
 
 setTimeout(function(){document.location.reload(true);},100);
}
},
 
 instalar_scripts :function(configuracao,loader){
 if(loader == undefined){loader = true;}
 
 let cookie = GModalApproval.preferencias() || 'o:1&e:0&m:0';
 
 if(configuracao.opcoes != ''){for (var x = 0;x < configuracao.opcoes.length;x++){configuracao.opcoes[x].valor = (cookie.indexOf(configuracao.opcoes[x].id+':1') !== -1 ? true :false);}}
 if(configuracao.hasOwnProperty('opcoes')){
 let total = Object.entries(configuracao.opcoes).length;
 for (var i = 0;i < total;i++){
 if((configuracao.opcoes[i].valor == true || configuracao.opcoes[i].valor == 'true') && configuracao.opcoes[i].hasOwnProperty('codigos')){
 let scripts = configuracao.opcoes[i]['codigos']();
 let total_scripts = Object.entries(scripts).length;
 if(total_scripts){
 let tipo = '_'+configuracao.opcoes[i]['id'];
 $('.gle_css'+tipo).removeClass('gle_css'+tipo).addClass('gle_css');
 $('.gle_scripts'+tipo).removeClass('gle_scripts'+tipo).addClass('gle_scripts');
 Object.entries(scripts).forEach(([key, value]) =>{
 if(scripts[key].hasOwnProperty('html')){
 let div = document.createElement("div");
 div.innerHTML = scripts[key]['html'];
 document.body.appendChild(div);
}
 setTimeout(function(){
 if(scripts[key].hasOwnProperty('js_interno')){
 let total_js_interno = Object.entries(scripts[key]['js_interno']).length;
 for (let y = 0;y < total_js_interno;y++){
 let script = document.createElement("script"), conteudo = scripts[key]['js_interno'][y].toString();
 conteudo = conteudo.substr(11,conteudo.length);
 conteudo = conteudo.substr(0,(conteudo.length-1));
 script.innerHTML = conteudo;
 document.body.appendChild(script);
}
}
},50);
});
}
}
}
 if(loader){GreatLoader('atualizar');}
}
}
};
}();




'use strict';

var GTooltip = function(){
 return{
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('elemento') == false){configuracao.elemento = '';}
 if (configuracao.hasOwnProperty('direcao') == false){configuracao.direcao = 'cima';}
 if (configuracao.direcao != 'cima' && configuracao.direcao != 'baixo' && configuracao.direcao != 'direita' && configuracao.direcao != 'esquerda'){configuracao.direcao = 'cima';}
 if (configuracao.elemento != ''){
 
 var elementos = document.querySelectorAll(configuracao.elemento);
 
 if (elementos.length){
 for (var i = 0;i < elementos.length;i++){
 elementos[i].addEventListener('mouseenter', function(){GTooltip.adicionar(this, configuracao.direcao);}, false);
 elementos[i].addEventListener('mouseout', function(){GTooltip.remover(this);}, false);
}
}
}
},
 adicionar :function(elemento, direcao){
 if (elemento.dataset.gtt != ''){
 
 var gtt = document.createElement("div");
 gtt.className = 'gtt_caixa gtt_caixa-'+direcao;
 gtt.innerHTML = '<span class="gtt_caixa-seta"></span><span class="gtt_caixa-conteudo">'+elemento.dataset.gtt+'</span>';
 document.body.appendChild(gtt);
 
 var pagina_offset = window.scrollY || window.pageYOffset;
 var elemento_offset = elemento.getBoundingClientRect();
 var gtt_width = parseFloat(getComputedStyle(gtt).width.replace("px", ""));
 var gtt_height = parseFloat(getComputedStyle(gtt).height.replace("px", ""));
 let caixa = document.querySelector('.gmf');
 let drawer = document.querySelector('#gpc-menu');
 let zindex = '';
 if(drawer != null){zindex = 9999999999999+1;}
 if(caixa != null){zindex = caixa.style.zIndex+1;}
 gtt.style.zIndex = zindex;
 
 if (direcao == 'cima'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top-gtt_height))-10+'px';
 gtt.style.left = (elemento_offset.left+(elemento.offsetWidth/2))-(gtt_width/2)+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.bottom = '-10px';
 gtt_seta.style.left = ((gtt_width/2)-5)+'px';
}else if (direcao == 'baixo'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top+elemento.offsetHeight))+10+'px';
 gtt.style.left = (elemento_offset.left+(elemento.offsetWidth/2))-(gtt_width/2)+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.top = '-10px';
 gtt_seta.style.left = ((gtt_width/2)-5)+'px';
}else if (direcao == 'esquerda'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top+(elemento.offsetHeight/2))-(gtt_height/2))+'px';
 gtt.style.left = (elemento_offset.left-gtt_width)-10+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.right = '-10px';
 gtt_seta.style.top = ((gtt_height/2)-5)+'px';
}else if (direcao == 'direita'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top+(elemento.offsetHeight/2))-(gtt_height/2))+'px';
 gtt.style.left = (elemento_offset.left+elemento.offsetWidth)+10+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.left = '-10px';
 gtt_seta.style.top = ((gtt_height/2)-5)+'px';
}
}
},
 remover :function(elemento){
 if (elemento.dataset.gtt != ''){
 
 var gtt = document.body.querySelector('.gtt_caixa');
 
 if(gtt != null || window.navigator.sayswho.toLowerCase().indexOf('ie') !== false){gtt.remove();}
}
}
};
}();gqa_status = false;
var gqa_fila = [];
var gqa_executando = false;

function ControlarFilaGQA(){
 
 if (gqa_executando){clearTimeout(gqa_executando);}
 
 gqa_executando = setInterval(function(){ExecutarFilaGQA();}, (document.hidden) ? 8000 :100);
}



function AdicionarFilaGQA(parametros){
 
 if (parametros.hasOwnProperty('verbo') == false){parametros.verbo = 'POST';}
 if (parametros.hasOwnProperty('url') == false){return false;}
 if (parametros.hasOwnProperty('uri') == false){parametros.uri = '';}
 else{
 if(typeof parametros.uri == 'object' || typeof parametros.uri == 'array'){
 parametros.uri = FormatarUriGQA(parametros.uri);
}
}
 if (parametros.hasOwnProperty('extensao') == false){parametros.extensao = 'json';}
 if (parametros.hasOwnProperty('prioridade') == false){parametros.prioridade = 'baixa';}
 if (parametros.hasOwnProperty('carregar') == false){parametros.carregar = false;}
 if (parametros.hasOwnProperty('timeout') == false){parametros.timeout = 10000;}
 
 if (parametros.prioridade == 'alta'){
 
 EnviarAjaxGQA(parametros);
}else if (parametros.prioridade == 'media'){
 
 gqa_fila.unshift([parametros]);
}else if (parametros.prioridade == 'baixa'){
 
 gqa_fila.push([parametros]);
}
}
function ExecutarFilaGQA(){
 if (gqa_status == false && gqa_fila.length){
 
 var proximo = gqa_fila.shift();
 
 gqa_status = true;
 
 EnviarAjaxGQA(proximo[0])
}
}
function EnviarAjaxGQA(parametros){
 
 if (parametros.hasOwnProperty('verbo') == false){parametros.verbo = 'POST';}
 if (parametros.hasOwnProperty('url') == false){return false;}
 if (parametros.hasOwnProperty('uri') == false){parametros.uri = '';}
 if (parametros.hasOwnProperty('extensao') == false){parametros.extensao = 'json';}
 if (parametros.hasOwnProperty('prioridade') == false){parametros.prioridade = 'baixa';}
 if (parametros.hasOwnProperty('carregar') == false){parametros.carregar = false;}
 if (parametros.hasOwnProperty('timeout') == false){parametros.timeout = 10000;}
 if (parametros.hasOwnProperty('externo') == false){parametros.externo = false;}
 if (parametros.hasOwnProperty('funcao_erro') == false){parametros.funcao_erro = '';}
 if (parametros.hasOwnProperty('funcao_sucesso') == false){parametros.funcao_sucesso = '';}
 
 if (parametros.carregar == true){GLoading.carregar({'ativar':true});}
 
 if (parametros.verbo == 'POST'){
 var url = parametros.url;
 var dados = parametros.uri;
}else{
 if (parametros.uri){
 var url = parametros.url+'?'+parametros.uri;
}else{var url = parametros.url;}
 var dados = '';
}
 
 var requisicao = new XMLHttpRequest();
 requisicao.open(parametros.verbo, url, true);
 requisicao.timeout = parametros.timeout;
 if (parametros.extensao){requisicao.responseType = parametros.extensao;}
 requisicao.withCredentials = true;
 requisicao.overrideMimeType("application/"+parametros.extensao);
 if (parametros.verbo == 'POST'){
 requisicao.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
}
 if (parametros.externo){
 requisicao.withCredentials = false;
 requisicao.setRequestHeader('Content-Type', "application/json");
 requisicao.setRequestHeader('Access-Control-Allow-Origin', '*');
 requisicao.setRequestHeader('Access-Control-Allow-Headers', "*");
 requisicao.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
}
 requisicao.onreadystatechange = function(){
 if (this.readyState == 4){
 if (this.status >= 200 && this.status < 400){
 
 if (this.responseType == 'json'){
 var resposta = this.response;
}else if (this.responseType == 'text' || this.responseType == ''){
 var resposta = this.responseText;
}else{
 var resposta = this.response;
}
 
 if (parametros.funcao_sucesso){parametros.funcao_sucesso(resposta);}
 
 GLoading.carregar({'ativar':false});
 
 gqa_status = false;
}else{
 
 if (parametros.funcao_erro){parametros.funcao_erro(this);}
 
 GLoading.carregar({'ativar':false});
 
 
 
 gqa_status = false;
}
}
};
 requisicao.send(dados);
 requisicao = null;

 

 
}
function FormatarUriGQA(post, prefixo){
 var retorno = [], post_chave, post_valor;
 for(var p in post){
 if (!post.hasOwnProperty(p)){continue;}
 if (~p.indexOf('[')){post_chave = prefixo ? prefixo + "[" + p.substring(0, p.indexOf('[')) + "]" + p.substring(p.indexOf('[')) :p;}
 else{post_chave = prefixo ? prefixo + "[" + p + "]" :p;}
 post_valor = post[p];
 retorno.push(typeof post_valor == "object" ? FormatarUriGQA(post_valor, post_chave) :encodeURIComponent(post_chave) + "=" + encodeURIComponent(post_valor));
}
 return retorno.join("&");
}
$(function(){
 
 if(document.addEventListener){document.addEventListener("visibilitychange", ControlarFilaGQA);}
 
 ControlarFilaGQA();
});'use strict';

var go_elementos = [];

var GObserver = function(){
 return{
 iniciar :function (){
 
 window.addEventListener('resize', function(){GObserver.observar(true);}, false);
 window.addEventListener('scroll', function(){GObserver.observar(true);}, false);
 document.addEventListener('scroll', function(){GObserver.observar(true);}, true);
},
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('elemento') == false){configuracao.elemento = '';}
 if (configuracao.hasOwnProperty('antecipacao') == false){configuracao.antecipacao = 0;}
 if (configuracao.hasOwnProperty('executar') == false){configuracao.executar = '';}
 
 if (configuracao.elemento != ''){
 
 var elementos = document.querySelectorAll(configuracao.elemento);
 
 if (elementos.length){
 for (var i = 0;i < elementos.length;i++){
 if (elementos[i].id){
 
 var instalar ={
 'elemento' :elementos[i],
 'antecipacao' :configuracao.antecipacao,
 'executar' :configuracao.executar
};
 
 go_elementos.push(instalar);
}
}
 
 GObserver.observar(false);
}
}
},
 observar :function(antecipacao){
 
 if (go_elementos.length){
 
 var janela_top = window.scrollY || window.pageYOffset;
 var janela_bottom = janela_top+window.innerHeight;
 for(var i = 0;i < go_elementos.length;i++){
 
 var antecipar = (antecipacao == true ? go_elementos[i].antecipacao :0);
 var elemento = go_elementos[i].elemento;
 if (elemento !== null && elemento !== undefined && elemento.isConnected){
 var elemento_estilo = window.getComputedStyle(elemento);
 if (elemento_estilo.display !== 'none'){
 var elemento_top = elemento.getBoundingClientRect().top+janela_top;
 var elemento_bottom = elemento_top+elemento.clientHeight;
 
 if (elemento_bottom >= janela_top && (elemento_top-antecipar) <= janela_bottom){
 
 (function(index){go_elementos[index].executar(go_elementos[index].elemento);})(i);
 
 go_elementos.splice(i, 1);
 
 this.observar(antecipacao);break;
}
}
}
}
}
}
};
}();


GObserver.iniciar();

 elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596733cd459818078':{'desktop':64.363, 'mobile':79.796}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673699547413895':{'desktop':194.133, 'mobile':175.597}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596736d0274531609':{'desktop':65.164, 'mobile':73.6976}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967370b699659232':{'desktop':531.942, 'mobile':1017.7}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967373d212496099':{'desktop':66.8828, 'mobile':58.8374}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673768828832100':{'desktop':236.234, 'mobile':147.841}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967379f690547265':{'desktop':115.518, 'mobile':101.219}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596737d3167401230':{'desktop':374.974, 'mobile':361.729}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673807174727652':{'desktop':363.134, 'mobile':348.979}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967384b765850064':{'desktop':463.033, 'mobile':420.25}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596738c7739537206':{'desktop':58.4731, 'mobile':53.111}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967393d448441150':{'desktop':901.339, 'mobile':1091.74}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596739aa860053907':{'desktop':1220.35, 'mobile':1467.36}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596739ed961937899':{'desktop':48.4092, 'mobile':40}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673a29711259585':{'desktop':189.385, 'mobile':117.037}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673a61681191823':{'desktop':161.185, 'mobile':181.333}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673af1998786343':{'desktop':65.123, 'mobile':64.677}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673b37349656464':{'desktop':102.32, 'mobile':70.756}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673b7c854976907':{'desktop':268.731, 'mobile':232.31}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673bc7722249447':{'desktop':29.5218, 'mobile':19.8946}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673c02227424116':{'desktop':18.0029, 'mobile':17.49}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673c40901225343':{'desktop':1765.47, 'mobile':1631.19}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673c93459243722':{'desktop':2310.98, 'mobile':2463.44}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673cd5590941938':{'desktop':193.323, 'mobile':145.523}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673d14523620486':{'desktop':220.523, 'mobile':191.257}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673d60472915853':{'desktop':88.231, 'mobile':54.036}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673da5970602401':{'desktop':109.41, 'mobile':53.092}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673ded362692668':{'desktop':185.6, 'mobile':212.385}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673ded362692668_d':{'desktop':185.6, 'mobile':212.385}, 'e_3577146_1_17805121506a20759673ded362692668_m':{'desktop':185.6, 'mobile':212.385}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673e38145055482':{'desktop':240.6, 'mobile':370.387}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673e38145055482_d':{'desktop':240.6, 'mobile':370.387}, 'e_3577146_1_17805121506a20759673e38145055482_m':{'desktop':240.6, 'mobile':370.387}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673e87768113171':{'desktop':240.6, 'mobile':522.293}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673e87768113171_d':{'desktop':240.6, 'mobile':522.293}, 'e_3577146_1_17805121506a20759673e87768113171_m':{'desktop':240.6, 'mobile':522.293}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673ee0139923288':{'desktop':240.6, 'mobile':696.852}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673ee0139923288_d':{'desktop':240.6, 'mobile':696.852}, 'e_3577146_1_17805121506a20759673ee0139923288_m':{'desktop':240.6, 'mobile':696.852}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673f29392582144':{'desktop':5.9648, 'mobile':752.122}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673f86029897042':{'desktop':261.413, 'mobile':201.758}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759673fdd304361229':{'desktop':116.659, 'mobile':87.6466}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674038212361025':{'desktop':59.667, 'mobile':315.718}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674083184817911':{'desktop':244.24, 'mobile':415.037}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596740e4875023653':{'desktop':176.403, 'mobile':224.147}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674169945614980':{'desktop':-51.94, 'mobile':1042.1}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674169945614980_d':{'desktop':-51.94, 'mobile':1042.1}, 'e_3577146_1_17805121506a20759674169945614980_m':{'desktop':-51.94, 'mobile':1042.1}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596741c0154929715':{'desktop':-26, 'mobile':1063.07}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596741c0154929715_d':{'desktop':-26, 'mobile':1063.07}, 'e_3577146_1_17805121506a207596741c0154929715_m':{'desktop':-26, 'mobile':1063.07}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674229584648836':{'desktop':13.276, 'mobile':1219.82}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674229584648836_d':{'desktop':13.276, 'mobile':1219.82}, 'e_3577146_1_17805121506a20759674229584648836_m':{'desktop':13.276, 'mobile':1219.82}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674289195407983':{'desktop':515.082, 'mobile':681.057}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674289195407983_d':{'desktop':515.082, 'mobile':681.057}, 'e_3577146_1_17805121506a20759674289195407983_m':{'desktop':515.082, 'mobile':681.057}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596742dd871877289':{'desktop':535.982, 'mobile':681.057}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596742dd871877289_d':{'desktop':535.982, 'mobile':681.057}, 'e_3577146_1_17805121506a207596742dd871877289_m':{'desktop':535.982, 'mobile':681.057}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674340375758303':{'desktop':273.297, 'mobile':0}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596743af034809987':{'desktop':385.774, 'mobile':294.868}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967440c943610124':{'desktop':381.79, 'mobile':452.868}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967445e412436223':{'desktop':549.448, 'mobile':604.752}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596744c0290270305':{'desktop':554.484, 'mobile':780.635}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967451d086274578':{'desktop':2657.1, 'mobile':2878.63}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674599557638957':{'desktop':2943.32, 'mobile':3300.68}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674616934302420':{'desktop':754.597, 'mobile':948.958}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967466f322531640':{'desktop':483.306, 'mobile':801.874}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596746f0323178739':{'desktop':525.221, 'mobile':513.16}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967474d776276519':{'desktop':677.754, 'mobile':817.19}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596747ad784413298':{'desktop':1063.09, 'mobile':1125.42}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674802665236243':{'desktop':1345.59, 'mobile':1459.59}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967485d941860063':{'desktop':589.434, 'mobile':586.13}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596748ba486785788':{'desktop':741.829, 'mobile':892.621}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674911550740659':{'desktop':1127.74, 'mobile':1188.25}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674978474166711':{'desktop':1270.6, 'mobile':1459.59}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674a18512407075':{'desktop':672.637, 'mobile':1043.34}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674a9a364404327':{'desktop':755.605, 'mobile':1120.29}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674af9874504980':{'desktop':394.15, 'mobile':384.367}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674b5a302284318':{'desktop':671.885, 'mobile':872.495}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674bdf605883370':{'desktop':562.498, 'mobile':772.169}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674c4d504937911':{'desktop':1187.55, 'mobile':471.04}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674cdc960601158':{'desktop':1442.77, 'mobile':774.836}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674d51644195836':{'desktop':1442.77, 'mobile':1080.12}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674dc8592344681':{'desktop':21.78, 'mobile':699.891}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674dc8592344681_d':{'desktop':21.78, 'mobile':699.891}, 'e_3577146_1_17805121506a20759674dc8592344681_m':{'desktop':21.78, 'mobile':699.891}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674e36923514196':{'desktop':39.77, 'mobile':1008.55}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674e36923514196_d':{'desktop':39.77, 'mobile':1008.55}, 'e_3577146_1_17805121506a20759674e36923514196_m':{'desktop':39.77, 'mobile':1008.55}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674e9c771088150':{'desktop':116.75, 'mobile':1317.22}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674e9c771088150_d':{'desktop':116.75, 'mobile':1317.22}, 'e_3577146_1_17805121506a20759674e9c771088150_m':{'desktop':116.75, 'mobile':1317.22}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674efb768736465':{'desktop':98.767, 'mobile':37}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674f6e785469276':{'desktop':250.233, 'mobile':295.023}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759674fe1160743127':{'desktop':711.409, 'mobile':699.857}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675073911536849':{'desktop':1398.74, 'mobile':1536}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596750e0547614053':{'desktop':532.176, 'mobile':590.125}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967517f169345665':{'desktop':532.17, 'mobile':1452.28}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675223135690607':{'desktop':532.094, 'mobile':1890.9}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596752c0931126229':{'desktop':245.22, 'mobile':731.695}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675357416443614':{'desktop':245.453, 'mobile':310.125}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596753e5104655231':{'desktop':245.384, 'mobile':1165.28}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675466752551022':{'desktop':245.32, 'mobile':1603.9}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596754e6504709882':{'desktop':1704.05, 'mobile':1593.81}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596755c7759838188':{'desktop':1261.53, 'mobile':1308.69}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675658325986895':{'desktop':2249.01, 'mobile':2196.55}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596756db868857074':{'desktop':2942.64, 'mobile':3031.14}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675763263199258':{'desktop':2597.16, 'mobile':2611.71}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596757eb448331915':{'desktop':1462.77, 'mobile':1415.97}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675886851815927':{'desktop':1924.58, 'mobile':2016.45}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675914636379635':{'desktop':1900.16, 'mobile':1760.92}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596759af856101203':{'desktop':974, 'mobile':963.633}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675a4d346961641':{'desktop':585.4, 'mobile':668.66}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675ae4316498630':{'desktop':705, 'mobile':2001.19}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675b78656551930':{'desktop':1518, 'mobile':1652.75}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675c0d982982980':{'desktop':915, 'mobile':1712.27}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675c9e221210522':{'desktop':3292.23, 'mobile':3514.05}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675d48078415656':{'desktop':541.766, 'mobile':159.675}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675de2097438438':{'desktop':715.844, 'mobile':404.025}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675e7c669016792':{'desktop':362.875, 'mobile':633.375}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675f21116717739':{'desktop':872.78, 'mobile':879.725}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759675fbf959864631':{'desktop':193.861, 'mobile':1123.08}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759676053481344197':{'desktop':719.439, 'mobile':914.166}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596760ef837406795':{'desktop':793.645, 'mobile':981.106}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a20759676199709275876':{'desktop':601.507, 'mobile':807.457}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967622b470905749':{'desktop':689.479, 'mobile':887.051}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596762b5304626082':{'desktop':517.1, 'mobile':428.337}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967637f947575588':{'desktop':210.065, 'mobile':147.641}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a2075967641f620683758':{'desktop':74.7031, 'mobile':14.379}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_17805121506a207596764de869012036':{'desktop':1009.94, 'mobile':1237.36}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_178051222018029774':{'desktop':544.083, 'mobile':726.204}});elementos_posicao = Object.assign(elementos_posicao,{'e_3577146_1_178353686806398434':{'desktop':483.861, 'mobile':654.147}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a2075967338b':{'desktop':78.0174, 'mobile':74.95}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a2075967339b':{'desktop':1115.58, 'mobile':1097}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a2075967339f':{'desktop':754.257, 'mobile':747.65}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733c9':{'desktop':836.948, 'mobile':1163.25}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733a1':{'desktop':814.83, 'mobile':2077.19}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733a3':{'desktop':1636.23, 'mobile':1731.11}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733a4':{'desktop':1046.75, 'mobile':1808.27}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733a6':{'desktop':3404.79, 'mobile':3604.05}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733a8':{'desktop':1156.75, 'mobile':1387.68}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733ab':{'desktop':1300.85, 'mobile':1543.36}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733be':{'desktop':568.422, 'mobile':615.141}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733c0':{'desktop':628.95, 'mobile':507.325}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733c2':{'desktop':666.987, 'mobile':706.15}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733c4':{'desktop':390, 'mobile':323.112}});blocos_posicao = Object.assign(blocos_posicao,{'b_3577146_1_17805121506a207596733c7':{'desktop':72.969, 'mobile':82.938}});(function(){if(window.__gLinkInterno)return;window.__gLinkInterno=1;var find=function(b){if(!b)return null;var k=String(b).replace(/^bloco_/,'');return document.querySelector('[data-bid="'+k+'"]')||document.getElementById(b)||document.getElementById('b_'+k)||document.getElementById(k);};document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('.link_interno'):null;if(!a)return;e.preventDefault();var d=a.getAttribute('data-bloco'),m=a.getAttribute('data-bloco-mobile');var t=(window.innerWidth<720&&m)?(find(m)||find(d)):find(d);if(!t)return;var y=t.getBoundingClientRect().top+(window.gScrollTop?window.gScrollTop():(window.pageYOffset||0))-60;if(window.gScrollSet){window.gScrollSet(y,true);}else{window.scroll({top:y,behavior:'smooth'});}},true);})();function InserirScriptsInline(){if(!window.getCrawler()){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
let advancedMatching ={'ct':(u?.city || '').toLowerCase(), 'st':(u?.state || '').toLowerCase(), 'country':(u?.country || '').toLowerCase(), 'client_ip_address':u?.ip || '', 'client_user_agent':u?.agent || '', 'fbp':typeof c != 'undefined' ? c :'', 'fbc':typeof fbclid != 'undefined' ? fbclid :''};
if(advancedMatching.fbc == ''){delete advancedMatching.fbc;}
if(advancedMatching.fbp == ''){delete advancedMatching.fbp;}
if(typeof gpages_conversion.em != 'undefined' && gpages_conversion.em != ''){advancedMatching.em = gpages_conversion.em;}
if(typeof gpages_conversion.ph != 'undefined' && gpages_conversion.ph != ''){advancedMatching.ph = gpages_conversion.ph;}
fbq('init','1204317727626507',advancedMatching);
fbq('track','PageView',{},{eventID:eid});
}if(!window.getCrawler()){
var gp_inline = document.createElement('script');gp_inline.type = 'text/javascript';gp_inline.text = "\r\n function URLToArray(url){\r\n var request ={};\r\n if (url.indexOf('?') !== -1){\r\n url = encodeURI(url);\r\n var pairs = url.substring(url.indexOf('?') + 1).split('&');\r\n for (var i = 0;i < pairs.length;i++){\r\n if (!pairs[i]) continue;\r\n var pair = pairs[i].split('=');\r\n if (pair[1] == undefined || pair[1] == ''){request[decodeURIComponent(pair[0])] = '';}\r\n else{\r\n  try{request[decodeURIComponent(pair[0])] = decodeURIComponent(unescape(pair[1]));}\r\n  catch (e){request[decodeURIComponent(pair[0])] = pair[1];}\r\n }\r\n  }\r\n }\r\n return request;\r\n }\r\n \r\n function CamposUTM(modal){\r\n if (modal == undefined){modal = false;}\r\n \r\n let formularios = Array.from(document.querySelectorAll((modal ? '.gpc_modal ' :'') + 'form'));\r\n utm = URLToArray(window.location.href);\r\n let link_usar = '';\r\n if (Object.entries(utm).length){\r\n for (var [key, value] of Object.entries(utm)){link_usar += key + '=' + value + '&';}\r\n if (link_usar.length){link_usar = link_usar.substr(0, (link_usar.length - 1));}\r\n }\r\n formularios.map(formulario =>{\r\n \r\n $(formulario).find('.gpc_campo').each(function (i, campo){\r\n let valor = $(campo).val();\r\n if (valor.indexOf('{') != -1 && valor.indexOf('}') != -1){\r\n  let valor_limpo = valor.replace('{', '').replace('}', '');\r\n  utm.hasOwnProperty(valor_limpo) ? $(campo).val(utm[valor_limpo]) :$(campo).val('');\r\n }\r\n  });\r\n let botao = $(formulario).find('.gpc_botao');\r\n if (botao.attr('gpc-link') !== undefined && botao.attr('gpc-link') !== ''){\r\n try{\r\n  let link_new = new URL(botao.attr('gpc-link'));\r\n  for (var [key, value] of Object.entries(utm)){link_new.searchParams.set(key, value);}\r\n  botao.attr('gpc-link', `${link_new.toString()}`);\r\n }catch (error){\r\n  let concatenar = '?';\r\n  if (botao.attr('gpc-link').indexOf('?') !== -1){concatenar = '&';}\r\n  botao.attr('gpc-link', botao.attr('gpc-link') + concatenar + link_usar);\r\n }\r\n  }\r\n });\r\n \r\n if (link_usar != ''){\r\n \r\n let botoes = Array.from(document.querySelectorAll((modal ? '.gpc_modal ' :'') + '.link_externo'));\r\n botoes.map(link =>{\r\n \r\n $(link).each(function (i, href){\r\n  if ($(href).attr('href') !== undefined && $(href).attr('href') !== ''){\r\n try{\r\n  let link_new = new URL($(href).attr('href'));\r\n  for (var [key, value] of Object.entries(utm)){link_new.searchParams.set(key, value);}\r\n  $(href).attr('href', `${link_new.toString()}`);\r\n  }catch (error){\r\n  let concatenar = '?';\r\n  if ($(href).attr('href').indexOf('?') !== -1){concatenar = '&';}\r\n  $(href).attr('href', $(href).attr('href') + concatenar + link_usar);\r\n  }\r\n  }\r\n });\r\n  });\r\n }\r\n }\r\n CamposUTM();\r\n $('body').on('click', '.link_popup', function (){setTimeout(() =>{CamposUTM(true);}, 200);});\r\n";document.body.appendChild(gp_inline);
}
}var scripts_estatisticas ={}, scripts_marketing ={};
scripts_estatisticas = Object.assign(scripts_estatisticas,{0:{
"js_interno":{0:function(){if(!window.getCrawler()){
 (function(c,l,a,r,i,t,y){
 c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
 t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
 y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
 })(window, document, "clarity", "script", "ugu9ug7gqv");
}}}}});
scripts_estatisticas = Object.assign(scripts_estatisticas,{1:{}});
scripts_marketing = Object.assign(scripts_marketing,{0:{
"html":" ","js_interno":{0:function(){if(!window.getCrawler()){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.lpgt.cidavalcanaia.com.br/2bpzjnsovkp.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','e9gxb8lz=GQ9LKCcjRzQ2UyU5JDwwXAZWREFCSA4UTQgfCxIYCxYTChgOGg9EGR8GWA0B');}}}}});
