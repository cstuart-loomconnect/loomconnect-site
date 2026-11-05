// Plays short brand animations (video[data-play-once]) once, when they scroll into view.
// People who have asked their device for reduced motion just see the still poster.
export function setUpPlayOnce() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('video[data-play-once]').forEach((video) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          video.play().catch(() => {}); // the browser may block it; the poster stays, which is fine
          observer.disconnect();
        }
      },
      { threshold: 0.6 } // start when most of the video is on screen
    );
    observer.observe(video);
  });
}
