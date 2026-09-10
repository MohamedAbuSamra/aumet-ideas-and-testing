
export function bindLandingCarousel() {
  const root = document.querySelector(".screen.active [data-landing-carousel]");
  if (!root) return;

  const shots = [...root.querySelectorAll(".ca-landing-shot")];
  const dots = [...root.querySelectorAll("[data-landing-dot]")];
  const swipe = root.querySelector("[data-landing-swipe]");
  if (!shots.length) return;

  let index = Math.max(
    0,
    shots.findIndex((s) => s.classList.contains("is-active"))
  );

  const show = (next) => {
    index = ((next % shots.length) + shots.length) % shots.length;
    shots.forEach((shot, i) => {
      const on = i === index;
      shot.classList.toggle("is-active", on);
      shot.hidden = !on;
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };

  dots.forEach((dot) => {
    dot.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(Number(dot.dataset.landingDot));
    };
  });

  const bindSwipe = (el) => {
    if (!el) return;
    let startX = 0;
    let tracking = false;
    el.ontouchstart = (e) => {
      tracking = true;
      startX = e.changedTouches[0].clientX;
    };
    el.ontouchend = (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 36) return;
      show(index + (dx < 0 ? 1 : -1));
    };
    el.onmousedown = (e) => {
      tracking = true;
      startX = e.clientX;
    };
    el.onmouseup = (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) < 36) return;
      show(index + (dx < 0 ? 1 : -1));
    };
  };

  bindSwipe(swipe);
  show(index);
}
