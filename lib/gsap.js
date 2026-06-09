import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // On a cold (uncached) first load, the triggers are built *after* hydration —
  // often after `load` has already fired — so ScrollTrigger's built-in
  // refresh-on-load is missed and some start positions are stale. The reveal
  // tweens then never fire and sections stay stuck at opacity:0 until a reload.
  // Recalculate once the document and fonts have actually settled so the cold
  // load matches a warm reload.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  if (document.readyState === "complete") refresh();
  else window.addEventListener("load", refresh, { once: true });
}

export { gsap, ScrollTrigger, SplitText };
