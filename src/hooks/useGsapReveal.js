import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────
   useGsapReveal
   Fade + slide up with optional blur dissolve.
   options: { y, duration, delay, stagger, ease, blur, selector }
───────────────────────────────────────────────── */
export function useGsapReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const {
            y = 48,
            duration = 0.9,
            delay = 0,
            stagger = 0.12,
            ease = "power4.out",
            blur = true,
            selector = null,
        } = options;

        const targets = selector ? el.querySelectorAll(selector) : [el];

        const ctx = gsap.context(() => {
            gsap.fromTo(
                targets,
                {
                    opacity: 0,
                    y,
                    filter: blur ? "blur(8px)" : "none",
                    willChange: "transform, opacity, filter",
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration,
                    delay,
                    stagger,
                    ease,
                    clearProps: "willChange",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return ref;
}

/* ─────────────────────────────────────────────────
   useGsapSlide
   Slide in from left or right with clip-path.
───────────────────────────────────────────────── */
export function useGsapSlide(direction = "left", options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const { duration = 1, delay = 0, x = 70 } = options;
        const fromX = direction === "left" ? -x : x;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                {
                    opacity: 0,
                    x: fromX,
                    filter: "blur(4px)",
                    willChange: "transform, opacity, filter",
                },
                {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    duration,
                    delay,
                    ease: "expo.out",
                    clearProps: "willChange",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return ref;
}

/* ─────────────────────────────────────────────────
   useGsapScale
   Scale + fade in with stagger for child elements.
───────────────────────────────────────────────── */
export function useGsapScale(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const {
            duration = 0.75,
            delay = 0,
            scale = 0.88,
            stagger = 0.1,
            selector = null,
        } = options;

        const targets = selector ? el.querySelectorAll(selector) : [el];

        const ctx = gsap.context(() => {
            gsap.fromTo(
                targets,
                {
                    opacity: 0,
                    scale,
                    filter: "blur(4px)",
                    willChange: "transform, opacity, filter",
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration,
                    delay,
                    stagger,
                    ease: "back.out(1.4)",
                    clearProps: "willChange",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return ref;
}

/* ─────────────────────────────────────────────────
   useGsapCounter
   Animate a number from 0 to target when in view.
   options: { target, duration, suffix, prefix }
───────────────────────────────────────────────── */
export function useGsapCounter(target = 100, options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const {
            duration = 2,
            delay = 0,
            suffix = "",
            prefix = "",
            ease = "power2.out",
        } = options;

        const obj = { val: 0 };

        const ctx = gsap.context(() => {
            gsap.to(obj, {
                val: target,
                duration,
                delay,
                ease,
                roundProps: "val",
                onUpdate: () => {
                    el.textContent = `${prefix}${obj.val.toLocaleString()}${suffix}`;
                },
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            });
        }, el);

        return () => ctx.revert();
    }, [target]);

    return ref;
}

/* ─────────────────────────────────────────────────
   useGsapParallax
   Gentle vertical parallax on scroll.
   options: { speed (0–1), direction }
───────────────────────────────────────────────── */
export function useGsapParallax(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const { speed = 0.3 } = options;

        const ctx = gsap.context(() => {
            gsap.to(el, {
                yPercent: -15 * speed * 10,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return ref;
}
