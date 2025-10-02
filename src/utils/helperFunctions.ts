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

export const calculateShipping = (subtotal: number): number => {
  let shipping = 0;

  if (subtotal < 300) shipping = 50;
  else if (subtotal < 600) shipping = 100;
  else if (subtotal < 1000) shipping = 150;
  else if (subtotal < 2000) shipping = 200;
  else shipping = 250;

  return shipping;
};

export function calculateDiscountAmount(
  discountValue: string | null,
  subtotal: number
): number {
  if (!discountValue || subtotal <= 0) return 0;

  let discountAmount = 0;

  if (discountValue.includes("%")) {
    const percent = parseFloat(discountValue.replace("%", ""));
    discountAmount = Math.floor((subtotal * percent) / 100);
  } else {
    discountAmount = Number(discountValue) || 0;
  }

  return discountAmount;
}
