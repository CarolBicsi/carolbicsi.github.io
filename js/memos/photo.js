function whenDOMReady(){"/photos/"==location.pathname&&photos("相册")}function photos(t){var e="https://memos.meuicat.com/api/v1/memo?creatorId=2572769996&tag="+相册;fetch(e).then(t=>t.json()).then(t=>{let n="",o=[];t.forEach(t=>{var e=t.content.match(/\!\[.*?\]\(.*?\)/g);e&&(o=o.concat(e)),t.resourceList.length&&t.resourceList.forEach(t=>{t.externalLink?o.push(`![](${t.externalLink})`):o.push(`![](${url}/o/r/${t.id}/${t.publicId}/${t.filename})`)})}),o&&o.forEach(t=>{let e=t.replace(/!\[.*?\]\((.*?)\)/g,"$1"),o,a,l=t.replace(/!\[(.*?)\]\(.*?\)/g,"$1");a=-1!=l.indexOf(" ")?(o=l.split(" ")[0],l.split(" ")[1]):l,n+=`<div class="gallery-photo"><a href="${e}" data-fancybox="gallery" class="fancybox" data-thumb="${e}"><img class="no-lazyload photo-img" loading='lazy' decoding="async" src="${e}"></a>`,a&&(n+=`<span class="photo-title">${a}</span>`),o&&(n+=`<span class="photo-time">${o}</span>`),n+="</div>"}),document.querySelector(".gallery-photos.page").innerHTML=n,imgStatus.watch(".photo-img",()=>{waterfall(".gallery-photos")}),window.Lately&&Lately.init({target:".photo-time"})}).catch(),document.querySelector(".icat-status-bar")&&((e=document.querySelectorAll(".status-bar-item"))[1].classList.add("selected"),Array.from(e).forEach(function(o){o.onclick=function(t){var e=document.querySelectorAll(".status-bar-item.selected");return Array.from(e).forEach(function(t){t.classList.remove("selected")}),o.classList.add("selected"),t.stopPropagation(),t.preventDefault(),!1}}))}function statusbar(){var e,o=document.getElementById("bar-box"),a=document.getElementById("status-bar-button"),t=o.clientWidth;o&&(o.scrollLeft+o.clientWidth>=o.scrollWidth-8?o.scroll({left:0,behavior:"smooth"}):o.scrollBy({left:t,behavior:"smooth"}),o.addEventListener("scroll",function t(){clearTimeout(e),e=setTimeout(function(){a.style.transform=o.scrollLeft+o.clientWidth>=o.scrollWidth-8?"rotate(180deg)":"",o.removeEventListener("scroll",t)},150)}))}whenDOMReady(),document.addEventListener("pjax:complete",whenDOMReady),window.onresize=()=>{"/photos/"==location.pathname&&waterfall(".gallery-photos")};