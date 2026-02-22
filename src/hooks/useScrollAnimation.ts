import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.3, rootMargin = "-100px 0px") => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    setRef(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref: setRef, isInView };
};
