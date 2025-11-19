(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const d={isShadow:!1,style:{borderRadius:"1em"}},m=async(n,{isShadow:a,style:s}=d)=>{const t=a?n.shadowRoot:n;t.innerHTML+=`
          <style data-id="temp-style">
            .__temp-shape-wrapper {
              position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  opacity: 0;
            }
            .__temp-shape-displacement {
              width: 100%;
              height: 100%;
              background-color: #808000;
              position: absolute;
              left: 0;
              top: 0;
              box-shadow: inset .5em 0 .5em -.5em #ff8500, inset 0 -.5em .5em -.5em #800000, inset 0 .5em .5em -.5em #80ff00, inset -.5em 0 .5em -.5em #008400;
              border-radius: ${s.borderRadius};
            }
      </style>
      <div class="__temp-shape-wrapper" data-id="temp-shape-wrapper">
        <div data-id="temp-shape-displacement" class='__temp-shape-displacement'></div>
      </div>
    `;const e=t.querySelector("[data-id=temp-shape-displacement]"),i=await htmlToImage.toBlob(e),o=URL.createObjectURL(i);t.querySelector("[data-id=temp-shape-wrapper]").remove(),t.querySelector("[data-id=temp-style]").remove();const r=o.split("/").at(-1);n.style.backdropFilter=`url(#${r})`;const{width:l,height:c}=n.getBoundingClientRect();n.insertAdjacentHTML("afterend",`
    <svg color-interpolation-filters="sRGB" style="display:none" >
              <defs>
                  <filter id="${r}">
                  <feImage href="/src/features/theme/glass/assets/magnifying-map.png" x="0" y="0" preserveAspectRatio="none" result="magnifying_displacement_map"></feImage>
                      <feDisplacementMap in="SourceGraphic" in2="magnifying_displacement_map" scale="9"
                          xChannelSelector="R" yChannelSelector="G" result="magnified_source"></feDisplacementMap>
                      <feGaussianBlur in="magnified_source" stdDeviation="0" result="blurred_source"></feGaussianBlur>
                      <feImage href="${o}" x="0" y="0" width="${l}"
                          height="${c}" result="displacement_map"></feImage>
                      <feDisplacementMap in="blurred_source" in2="displacement_map" scale="90"
                          xChannelSelector="R" yChannelSelector="G" result="displaced"></feDisplacementMap>
                      <feImage href="" x="0" y="0" width="210"
                          height="150" result="specular_layer"></feImage>
                      <feComposite in="displaced_saturated" in2="specular_layer" operator="in"
                          result="specular_saturated"></feComposite>
                      <feComponentTransfer in="specular_layer" result="specular_faded">
                          <feFuncA type="linear" slope="0.5"></feFuncA>
                      </feComponentTransfer>
                      <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation">
                      </feBlend>
                      <feBlend in="specular_faded" in2="withSaturation" mode="normal"></feBlend>
                  </filter>
              </defs>
          </svg>
    `),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>{n.style.removeProperty("opacity")},100)})};class u extends HTMLElement{static observedAttributes=["active-tab"];constructor(){super(),this.tabsNavigationEl=this.shadowRoot.querySelector("[data-id='tabs-navigation']"),m(this.tabsNavigationEl,{isShadow:!1,style:{borderRadius:"1em"}}),this.activeIndicatorEl=this.shadowRoot.querySelector("[data-id='active-indicator']")}connectedCallback(){this.#t(this.getAttribute("active-tab")),this.shadowRoot.addEventListener("click",a=>{const s=a.target.closest('[slot="tab-header"]');if(s){const t=s.getAttribute("data-tab-name");this.setAttribute("active-tab",t),this.dispatchEvent(new CustomEvent("change",{detail:{value:t}}))}})}#e(a){const s=this.shadowRoot.querySelector("slot[name='tab-content']").assignedElements();let t=!1;s.forEach((e,i)=>{e.getAttribute("name")===a?(e.style.removeProperty("display"),e.style.animation="glass-tabs--show-tab var(--animation-show-tab, 1s) ease-in-out forwards",e.addEventListener("animationend",()=>{e.style.animation=""},{once:!0}),t=!0):e.style.display="none"}),t||console.warn("glass-tabs: No active tab content found")}#a(){const s=this.tabsNavigationEl.querySelector("slot[name=tab-header]").assignedNodes().find(o=>o.getAttribute("data-tab-name")===this.getAttribute("active-tab")),t=this.tabsNavigationEl.getBoundingClientRect(),e=s.getBoundingClientRect(),i=e.left-t.left;this.activeIndicatorEl.style.setProperty("--indicator-left-to",`${i}px`),this.activeIndicatorEl.style.setProperty("--indicator-width-to",`${e.width}px`),this.activeIndicatorEl.style.animation="move-indicator var(--move-animation-duration, 1s) ease-in-out forwards",this.activeIndicatorEl.addEventListener("animationend",()=>{this.activeIndicatorEl.style.animation="",this.activeIndicatorEl.style.setProperty("--indicator-left-from",this.activeIndicatorEl.style.getPropertyValue("--indicator-left-to")),this.activeIndicatorEl.style.setProperty("--indicator-width-from",this.activeIndicatorEl.style.getPropertyValue("--indicator-width-to")),this.activeIndicatorEl.style.width=this.activeIndicatorEl.style.getPropertyValue("--indicator-width-to"),this.activeIndicatorEl.style.transform="translateX(var(--indicator-left-from)) scale(var(--tab-indicator-scale, 1.25))"},{once:!0})}#t(a){this.tabsNavigationEl.querySelector("slot[name=tab-header]").assignedNodes().forEach(t=>{t.getAttribute("data-tab-name")===a?t.classList.add("tabs__header-item__active"):t.classList.remove("tabs__header-item__active")}),this.#a()}attributeChangedCallback(a,s,t){a==="active-tab"&&s!==t&&(this.#e(t),this.#t(t))}}customElements.define("glass-tabs",u);class h extends HTMLElement{constructor(){super(),this.slidesEl=this.shadowRoot.querySelector("[data-id=slides]")}get deltaX(){return this.hasAttribute("delta-x")?Number(this.getAttribute("delta-x")):100}connectedCallback(){this.shadowRoot.addEventListener("click",a=>{const{target:s}=a,t=s.closest("[data-control]");if(!t)return;const{control:e}=t.dataset;e==="next"?this.#e(this.deltaX):e==="prev"?this.#e(-this.deltaX):console.error("Invalid control value")})}#e(a){this.slidesEl.scrollTo({behavior:"smooth",left:this.slidesEl.scrollLeft+a})}}customElements.define("custom-slider",h);class p extends HTMLElement{constructor(){super()}}customElements.define("page-scroll",p);const f=async()=>{await customElements.whenDefined("glass-tabs");const n=document.getElementById("main-tabs"),a=new URL(window.location.href);if(a.searchParams.has("tab")){const s=a.searchParams.get("tab");n.setAttribute("active-tab",s)}n.addEventListener("change",s=>{if(!s.detail)return;const{value:t}=s.detail,e=new URL(window.location.href);e.searchParams.set("tab",t),window.history.replaceState({},"",e)})};document.addEventListener("DOMContentLoaded",f);
