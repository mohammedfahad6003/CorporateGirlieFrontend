export function smoothScrollToTop() {
  const start = window.scrollY;
  const duration = 600; // ms
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 → 1
    const easeOut = 1 - Math.pow(1 - progress, 3); // cubic ease-out

    window.scrollTo(0, start * (1 - easeOut));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
