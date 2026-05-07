export const isIOSDevice =
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // iPad on iOS 13+ reports as MacIntel but has touch
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
