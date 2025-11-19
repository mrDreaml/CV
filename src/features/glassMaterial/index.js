const DEFAULT_PARAMS = {
    isShadow: false,
    style: {
        borderRadius: '1em'
    }
}

export const useGlassMaterial = async (rootEl, { isShadow, style } = DEFAULT_PARAMS) => {
    const shadowRoot = isShadow ? rootEl.shadowRoot : rootEl
  shadowRoot.innerHTML += `
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
              border-radius: ${style.borderRadius};
            }
      </style>
      <div class="__temp-shape-wrapper" data-id="temp-shape-wrapper">
        <div data-id="temp-shape-displacement" class='__temp-shape-displacement'></div>
      </div>
    `;

    const tempDieplacementShapeEl = shadowRoot.querySelector(
      "[data-id=temp-shape-displacement]"
    );

    const displacementImgBlob = await htmlToImage.toBlob(tempDieplacementShapeEl);
    const displacementImgLink = URL.createObjectURL(displacementImgBlob);

    shadowRoot.querySelector("[data-id=temp-shape-wrapper]").remove();
    shadowRoot.querySelector("[data-id=temp-style]").remove();
    const imageId = displacementImgLink.split("/").at(-1);

    rootEl.style.backdropFilter = `url(#${imageId})`;

    const { width, height } = rootEl.getBoundingClientRect();

    rootEl.insertAdjacentHTML(
      "afterend",
      `
    <svg color-interpolation-filters="sRGB" style="display:none" >
              <defs>
                  <filter id="${imageId}">
                  <feImage href="./src/features/glassMaterial/magnifying-map.png" x="0" y="0" preserveAspectRatio="none" result="magnifying_displacement_map"></feImage>
                      <feDisplacementMap in="SourceGraphic" in2="magnifying_displacement_map" scale="9"
                          xChannelSelector="R" yChannelSelector="G" result="magnified_source"></feDisplacementMap>
                      <feGaussianBlur in="magnified_source" stdDeviation="0" result="blurred_source"></feGaussianBlur>
                      <feImage href="${displacementImgLink}" x="0" y="0" width="${width}"
                          height="${height}" result="displacement_map"></feImage>
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
    `
    );

    setTimeout(() => {
      rootEl.style.opacity = "0";
      setTimeout(() => {
        rootEl.style.removeProperty("opacity");
      }, 100);
    });
}