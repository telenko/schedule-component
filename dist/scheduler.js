/*!
 * Built with http://stenciljs.com
 * 2019-01-13T13:13:46
 */
!function(e,t,r,s,n,c,i,o,u,l,d,a,h,p){for(d=e.scheduler=e.scheduler||{},(a=t.createElement("style")).innerHTML=u+"{visibility:hidden}.hydrated{visibility:inherit}",a.setAttribute("data-styles",""),h=t.head.querySelector("meta[charset]"),t.head.insertBefore(a,h?h.nextSibling:t.head.firstChild),function(e,t,r){(e["s-apps"]=e["s-apps"]||[]).push("scheduler"),r.componentOnReady||(r.componentOnReady=function(){var t=this;function r(r){if(t.nodeName.indexOf("-")>0){for(var s=e["s-apps"],n=0,c=0;c<s.length;c++)if(e[s[c]].componentOnReady){if(e[s[c]].componentOnReady(t,r))return;n++}if(n<s.length)return void(e["s-cr"]=e["s-cr"]||[]).push([t,r])}r(null)}return e.Promise?new e.Promise(r):{then:r}})}(e,0,l),n=n||d.resourcesUrl,a=(h=t.querySelectorAll("script")).length-1;a>=0&&!(p=h[a]).src&&!p.hasAttribute("data-resources-url");a--);h=p.getAttribute("data-resources-url"),!n&&h&&(n=h),!n&&p.src&&(n=(h=p.src.split("/").slice(0,-1)).join("/")+(h.length?"/":"")+"scheduler/"),a=t.createElement("script"),function(e,t,r,s){return!(t.search.indexOf("core=esm")>0)&&(!(!(t.search.indexOf("core=es5")>0||"file:"===t.protocol)&&e.customElements&&e.customElements.define&&e.fetch&&e.CSS&&e.CSS.supports&&e.CSS.supports("color","var(--c)")&&"noModule"in r)||function(e){try{return new Function('import("")'),!1}catch(e){}return!0}())}(e,e.location,a)?a.src=n+"scheduler.wr9xxslr.js":(a.src=n+"scheduler.lownfuq8.js",a.setAttribute("type","module"),a.setAttribute("crossorigin",!0)),a.setAttribute("data-resources-url",n),a.setAttribute("data-namespace","scheduler"),t.head.appendChild(a)}(window,document,0,0,0,0,0,0,"schedule-container,schedule-day,schedule-day-board,schedule-day-event,schedule-resource",HTMLElement.prototype);