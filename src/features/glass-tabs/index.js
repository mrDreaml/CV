import { useGlassMaterial } from "../glassMaterial";

class GlassTabs extends HTMLElement {
  static observedAttributes = ["active-tab"];

  constructor() {
    super();
    this.tabsNavigationEl = this.shadowRoot.querySelector(
      "[data-id='tabs-navigation']"
    );
    useGlassMaterial(this.tabsNavigationEl, {
      isShadow: false,
      style: { borderRadius: "1em" },
    });
    this.activeIndicatorEl = this.shadowRoot.querySelector(
      "[data-id='active-indicator']"
    );
  }

  connectedCallback() {
    this.#selectActiveTabNavigation(this.getAttribute("active-tab"));

    this.shadowRoot.addEventListener("click", (event) => {
      const slotEl = event.target.closest('[slot="tab-header"]');
      if (slotEl) {
        const activeTabName = slotEl.getAttribute("data-tab-name");
        this.setAttribute("active-tab", activeTabName);
        this.dispatchEvent(
          new CustomEvent("change", {
            detail: { value: activeTabName },
          })
        );
      }
    });
  }

  #renderActiveTabContent(activeTab) {
    const tabElements = this.shadowRoot
      .querySelector("slot[name='tab-content']")
      .assignedElements();

    let hasActiveTabContent = false;
    tabElements.forEach((tab, index) => {
      if (tab.getAttribute("name") === activeTab) {
        tab.style.removeProperty("display");
        tab.style.animation = `glass-tabs--show-tab var(--animation-show-tab, 1s) ease-in-out forwards`;
        tab.addEventListener(
          "animationend",
          () => {
            tab.style.animation = "";
          },
          { once: true }
        );
        hasActiveTabContent = true;
      } else {
        tab.style.display = "none";
      }
    });

    if (!hasActiveTabContent) {
      console.warn("glass-tabs: No active tab content found");
    }
  }

  #setupActiveIndicator() {
    const tabNavigationEl = this.tabsNavigationEl
      .querySelector("slot[name=tab-header]")
      .assignedNodes();
    const currentTabNavigationEl = tabNavigationEl.find(
      (tabNavigationEl) =>
        tabNavigationEl.getAttribute("data-tab-name") ===
        this.getAttribute("active-tab")
    );
    const navigationRect = this.tabsNavigationEl.getBoundingClientRect();
    const tabNavigationRect = currentTabNavigationEl.getBoundingClientRect();
    const leftPos = tabNavigationRect.left - navigationRect.left;
    this.activeIndicatorEl.style.setProperty(
      "--indicator-left-to",
      `${leftPos}px`
    );
    this.activeIndicatorEl.style.setProperty(
      "--indicator-width-to",
      `${tabNavigationRect.width}px`
    );

    this.activeIndicatorEl.style.animation =
      "move-indicator var(--move-animation-duration, 1s) ease-in-out forwards";

    this.activeIndicatorEl.addEventListener(
      "animationend",
      () => {
        this.activeIndicatorEl.style.animation = "";
        this.activeIndicatorEl.style.setProperty(
          "--indicator-left-from",
          this.activeIndicatorEl.style.getPropertyValue("--indicator-left-to")
        );
        this.activeIndicatorEl.style.setProperty(
          "--indicator-width-from",
          this.activeIndicatorEl.style.getPropertyValue("--indicator-width-to")
        );
        this.activeIndicatorEl.style.width =
          this.activeIndicatorEl.style.getPropertyValue("--indicator-width-to");
        this.activeIndicatorEl.style.transform =
          "translateX(var(--indicator-left-from)) scale(var(--tab-indicator-scale, 1.25))";
      },
      { once: true }
    );
  }

  #selectActiveTabNavigation(activeTab) {
    const tabNavigationEl = this.tabsNavigationEl
      .querySelector("slot[name=tab-header]")
      .assignedNodes();

    tabNavigationEl.forEach((tabNavigationEl) => {
      if (tabNavigationEl.getAttribute("data-tab-name") === activeTab) {
        tabNavigationEl.classList.add("tabs__header-item__active");
      } else {
        tabNavigationEl.classList.remove("tabs__header-item__active");
      }
    });
    this.#setupActiveIndicator();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active-tab" && oldValue !== newValue) {
      this.#renderActiveTabContent(newValue);
      this.#selectActiveTabNavigation(newValue);
    }
  }
}

customElements.define("glass-tabs", GlassTabs);
