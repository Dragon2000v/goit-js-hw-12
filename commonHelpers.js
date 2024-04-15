import{a as R,S,i as m}from"./assets/vendor-CpoIZ0zF.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const B="43342378-f760c13e6ac2de41c368148af",k="https://pixabay.com/api/";async function U(r,o){try{return(await R.get(k,{params:{key:B,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:200}})).data}catch(n){throw n}}function x(r){const o=document.querySelector(".gallery");if(!o){console.error("Error: Gallery container not found");return}r.forEach(n=>{const s=document.createElement("li");s.classList.add("gallery-item");const e=document.createElement("a");e.classList.add("gallery-link"),e.href=n.largeImageURL;const t=document.createElement("img");t.classList.add("gallery-image"),t.src=n.webformatURL,t.dataset.source=n.largeImageURL,t.alt=n.tags,t.width="360px",t.height="auto",e.appendChild(t);const i={Likes:n.likes,Views:n.views,Comments:n.comments,Downloads:n.downloads},p=document.createElement("ul");p.classList.add("gallery-desc-list");for(let E in i){const f=document.createElement("li");f.classList.add("gallery-desc-item");const h=document.createElement("p");h.classList.add("gallery-desc-ttl"),h.textContent=E;const A=document.createElement("p");A.classList.add("gallery-desc-text"),A.textContent=i[E],f.append(h,A),p.append(f)}s.append(e,p),o.appendChild(s)}),r.length===0&&(iziToast.error({theme:"dark",position:"topRight",message:"An error occurred while fetching images. Please try again later.",backgroundColor:"#ef4040",iconUrl:errorPng,maxWidth:"432px",timeout:2e3}),l(!1)),r.length>0&&new S(".gallery a",{captionsData:"alt",captionDelay:250})}function l(r){const o=document.querySelector(".load-button");r?o.classList.remove("is-hidden"):o.classList.add("is-hidden")}const C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEZSURBVHgBrZVRDoMgDIar0fi6m2xH2Y3Ek2w3cFfZXXwBljFQCai0xemfoCaU/xNpKwAirXWrlDY5w8ViPhVmbgwIO14A3zeQKq/2IuwaqOu6A07+zaVUT8iUi+V28rd5NuSIOQs5wxyFUOZKqRtnmIpZQCZz3acWcgcXUjkF0b2bmwFSpAxskMAgYecaWSsFC8AgnHkMqIBR09TCGrnHsZic5iLs3By3ngWsITMgy9yphEyVJZjUM6esHUS9yfea7N7DAmJz/1niM2EhVBZR2UKl8DS/SFO80OhUnCBkoYWgz2MdNAx8q0jFOK/Fy1GQvdqYe50BQc3PgLDmRyCU+aYOfFsoCtPa+yXvp2/ue9rHqLATflCf5QflVUcNIrzeSwAAAABJRU5ErkJggg==",c=document.createElement("span");c.classList.add("loader");const y=document.createElement("div");y.classList.add("container");const L=document.createElement("form"),d=document.createElement("input");d.setAttribute("type","text");d.setAttribute("name","query");d.placeholder="Search images...";const w=document.createElement("button");w.setAttribute("type","submit");w.textContent="Search";const b=document.createElement("ul");b.classList.add("gallery");const a=document.createElement("button");a.setAttribute("type","button");a.classList.add("search-button");a.classList.add("load-button");a.classList.add("is-hidden");a.textContent="Load more";L.append(d,w);y.append(L);document.body.append(y);document.body.append(b,c,a);L.addEventListener("submit",I);let g=1,u="";async function I(r){if(r.preventDefault(),u=r.currentTarget.elements.query.value.trim(),u.trim()===""){m.warning({title:"Caution",message:"Type what you want to find!",backgroundColor:"#FFA000",position:"topRight",theme:"dark",iconUrl:"",timeout:2e3});return}g=1,b.innerHTML="",c.classList.add("isVisible");try{const o=await U(u,g);if(o.hits.length===0){m.error({theme:"dark",position:"topRight",message:"An error occurred while fetching images. Please try again later..",backgroundColor:"#ef4040",iconUrl:C,maxWidth:"432px",timeout:2e3}),l(!1);return}x(o.hits),d.value="",l(o.totalHits)}catch(o){m.error({theme:"dark",position:"topRight",message:`An error occurred while fetching images. ${o}`,backgroundColor:"#ef4040",iconUrl:C,maxWidth:"432px",timeout:2e3})}finally{c.classList.remove("isVisible")}}a.addEventListener("click",v);async function v(){g++,c.classList.add("isVisible");try{const r=await U(u,g);x(r.hits),l(r.totalHits),window.scrollBy({top:window.innerHeight,behavior:"smooth"})}catch{m.warning({title:"Caution",message:"No more images found.",backgroundColor:"#FFA000",position:"topRight",theme:"dark",iconUrl:"",timeout:2e3}),l(!1)}finally{c.classList.remove("isVisible")}}
//# sourceMappingURL=commonHelpers.js.map
