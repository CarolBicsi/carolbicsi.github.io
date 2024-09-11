window.addEventListener("load",()=>{let t=!1,l=[],a=document.getElementById("search-mask"),e=()=>{var e=document.body.style;e.width="100%",e.overflow="hidden",btf.animateIn(a,"to_show 0.5s"),btf.animateIn(document.querySelector("#local-search .search-dialog"),"titleScale 0.5s"),setTimeout(()=>{document.querySelector("#local-search-input input").focus()},100),t||(s(),t=!0),document.addEventListener("keydown",function e(t){"Escape"===t.code&&(n(),document.removeEventListener("keydown",e))})},n=()=>{var e=document.body.style;e.width="",e.overflow="",btf.animateOut(document.querySelector("#local-search .search-dialog"),"search_close .5s"),btf.animateOut(a,"to_hide 0.5s")},r=()=>{document.querySelector("#search-button > .search").addEventListener("click",e)};let c=e=>/\.json$/.test(e),o=async e=>{let t=[];var a=await fetch(e);return t=c(e)?await a.json():(e=await a.text(),[...(await await(new window.DOMParser).parseFromString(e,"text/xml")).querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content")&&e.querySelector("content").textContent,url:e.querySelector("url").textContent}))),a.ok&&((e=document.getElementById("loading-database")).nextElementSibling.style.display="block",e.remove()),t},s=()=>{GLOBAL_CONFIG.localSearch.preload||(l=o(GLOBAL_CONFIG.localSearch.path));var e=document.querySelector("#local-search-input input");let t=document.getElementById("local-search-results"),a=document.getElementById("loading-status");e.addEventListener("input",function(){let d=this.value.trim().toLowerCase().split(/[\s]+/),u=(""!==d[0]&&(a.innerHTML='<i class="fas fa-spinner fa-pulse"></i>'),t.innerHTML="",'<div class="search-result-list">');if(!(d.length<=0)){let i=0;l.then(e=>{e.forEach(r=>{let a=!0,c=r.title?r.title.trim().toLowerCase():"",o=r.content?r.content.trim().replace(/<[^>]+>/g,"").toLowerCase():"";r=r.url.startsWith("/")?r.url:GLOBAL_CONFIG.root+r.url;let l,n=-1,s=-1;if(""!==c||""!==o?d.forEach((e,t)=>{l=c.indexOf(e),n=o.indexOf(e),l<0&&n<0?a=!1:(n<0&&(n=0),0===t&&(s=n))}):a=!1,a){if(0<=s){let e=s-30,t=s+100,a="",l="",n=(0===(e=e<0?0:e)?t=100:a="...",t>o.length?t=o.length:l="...",o.substring(e,t));d.forEach(e=>{var t=new RegExp(e,"gi");n=n.replace(t,'<span class="search-keyword">'+e+"</span>"),c=c.replace(t,'<span class="search-keyword">'+e+"</span>")}),u+='<div class="local-search__hit-item"><a href="'+r+'" class="search-result-title">'+c+"</a>",i+=1,""!==o&&(u+='<p class="search-result">'+a+n+l+"</p>")}u+="</div>"}}),0===i&&(u+='<div id="local-search__hits-empty">'+GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/,this.value.trim())+"</div>"),u+="</div>",t.innerHTML=u,""!==d[0]&&(a.innerHTML=""),window.pjax&&window.pjax.refresh(t)})}})};r(),document.querySelector("#local-search .search-close-button").addEventListener("click",n),a.addEventListener("click",n),GLOBAL_CONFIG.localSearch.preload&&(l=o(GLOBAL_CONFIG.localSearch.path)),window.addEventListener("pjax:complete",()=>{btf.isHidden(a)||n(),r()})});