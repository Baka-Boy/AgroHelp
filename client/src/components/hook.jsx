import {useState, useEffect, useRef} from 'react';

export default function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  function enter() {
    setIsHovered(true);
  }

  function leave() {
    setIsHovered(false);
  }

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', enter);
      node.addEventListener('mouseleave', leave);
      return () => {
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
      };
    }
  }, [ref]);

  return [ref, isHovered];
}

// Hook for animation check
export function useIntersectionObserver(
  elementRef,
  {threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false},
) {
  const [entry, setEntry] = useState();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]) => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = {threshold, root, rootMargin};
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}
