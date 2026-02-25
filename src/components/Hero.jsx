import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/* ── 8 slides: each has a large main image + thumbnail preview ── */
const SLIDES = [
    {
        main: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=480&h=300&fit=crop&q=80",
        label: "Exterior",
    },
    {
        main: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=480&h=300&fit=crop&q=80",
        label: "Interior",
    },
    {
        main: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=480&h=300&fit=crop&q=80",
        label: "Living Room",
    },
    {
        main: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=480&h=300&fit=crop&q=80",
        label: "Pool",
    },
    {
        main: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=480&h=300&fit=crop&q=80",
        label: "Garden",
    },
    {
        main: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=480&h=300&fit=crop&q=80",
        label: "Kitchen",
    },
    {
        main: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=480&h=300&fit=crop&q=80",
        label: "Bedroom",
    },
    {
        main: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=700&fit=crop&q=80",
        thumb: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=480&h=300&fit=crop&q=80",
        label: "Terrace",
    },
];

const VISIBLE_THUMBS = 3; // always show 3 thumbnails

const Hero = () => {
    const [active, setActive] = useState(0);
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const agentRef = useRef(null);
    const galleryRef = useRef(null);

    // Two layered img elements for cross-slide animation
    const imgOutRef = useRef(null); // outgoing
    const imgInRef = useRef(null);  // incoming
    const isAnimating = useRef(false);

    /* ── Entrance animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1 })
                .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
                .fromTo(agentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
                .fromTo(galleryRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9 }, "-=0.8");
        });
        return () => ctx.revert();
    }, []);

    /* ── Slide carousel transition ── */
    const goTo = (nextIdx) => {
        if (nextIdx === active || isAnimating.current) return;
        isAnimating.current = true;

        const direction = nextIdx > active ? 1 : -1; // 1 = slide left, -1 = slide right
        const DIST = "100%";

        // imgIn starts off-screen, imgOut is current on-screen
        const outEl = imgOutRef.current;
        const inEl = imgInRef.current;

        // Set incoming image src before animating
        inEl.src = SLIDES[nextIdx].main;

        // Position incoming off-screen
        gsap.set(inEl, { x: direction * parseFloat(DIST.replace("%", "")) + "%", opacity: 1, zIndex: 2 });
        gsap.set(outEl, { zIndex: 1 });

        const tl = gsap.timeline({
            onComplete: () => {
                // After animation swap refs logically: make outEl become the new visible
                setActive(nextIdx);
                // Reset positions for next animation
                gsap.set(outEl, { x: 0, zIndex: 1 });
                gsap.set(inEl, { x: 0, zIndex: 2 });
                isAnimating.current = false;
            },
        });

        tl.to(outEl, { x: -direction * 100 + "%", duration: 0.55, ease: "power2.inOut" }, 0)
            .to(inEl, { x: 0, duration: 0.55, ease: "power2.inOut" }, 0);
    };

    /* ── Compute which 3 thumbnail indices to show ── */
    const thumbWindow = () => {
        let start = Math.max(0, active - 1);
        if (start + VISIBLE_THUMBS > SLIDES.length) start = SLIDES.length - VISIBLE_THUMBS;
        return SLIDES.slice(start, start + VISIBLE_THUMBS).map((s, i) => ({
            ...s,
            index: start + i,
        }));
    };

    return (
        <section id="hero" className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* ── Left Column ── */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                    <div>
                        <h1
                            ref={headingRef}
                            className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6 opacity-0"
                        >
                            Discover Fresh
                            <span className="inline-flex items-center justify-center w-16 h-10 rounded-full overflow-hidden align-middle mx-1 border border-gray-200 dark:border-gray-700">
                                <img
                                    alt="Home preview"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120&h=80&fit=crop&q=80"
                                />
                            </span>
                            Visions of Your Ideal Perfect
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-black rounded-full align-middle mx-1 relative overflow-hidden">
                                <img
                                    alt="World"
                                    className="w-full h-full object-cover opacity-80"
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80&h=80&fit=crop&q=80"
                                />
                                <span className="absolute inset-0 bg-black/20" />
                                <span className="material-icons-outlined text-white absolute text-sm transform -rotate-45">north_east</span>
                            </span>
                            Home
                        </h1>
                        <p
                            ref={subtitleRef}
                            className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md opacity-0"
                        >
                            Discover hand-picked properties, expert agents, and a seamless
                            journey to your perfect place.
                        </p>
                    </div>

                    {/* Agent Card */}
                    <div
                        ref={agentRef}
                        className="bg-surface-light dark:bg-surface-dark p-5 rounded-3xl flex items-stretch gap-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer group opacity-0"
                        onClick={() => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        {/* House thumbnail */}
                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 self-center">
                            <img
                                alt="Property"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=256&h=256&fit=crop&q=80"
                            />
                        </div>

                        {/* Info + Actions */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <p className="text-[11px] text-gray-400 mb-0.5">support@urbane.com</p>
                                <h3 className="font-bold text-base leading-snug">Dianne Russell</h3>
                                <p className="text-xs text-gray-400">Senior Agent</p>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                <button
                                    className="flex-1 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-primary-hover transition-colors active:scale-95"
                                    onClick={(e) => { e.stopPropagation(); alert("Connecting with Dianne…"); }}
                                >
                                    Contact With Me
                                </button>
                                <button
                                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all"
                                    onClick={(e) => { e.stopPropagation(); alert("Opening chat…"); }}
                                    title="Chat"
                                >
                                    <span className="material-icons-outlined" style={{ fontSize: '18px', lineHeight: 1 }}>chat_bubble_outline</span>
                                </button>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all"
                                    onClick={(e) => e.stopPropagation()}
                                    title="LinkedIn"
                                >
                                    <svg aria-hidden="true" className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                                        <path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Column — Gallery ── */}
                <div ref={galleryRef} className="lg:col-span-7 flex flex-col gap-4 opacity-0">

                    {/* Main Image — two layered imgs for slide swap */}
                    <div className="relative rounded-3xl overflow-hidden h-[420px] w-full bg-gray-100 dark:bg-gray-800">
                        {/* Outgoing (base) image */}
                        <img
                            ref={imgOutRef}
                            alt="Property view"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            src={SLIDES[active].main}
                        />
                        {/* Incoming image (sits on top during animation, z-2) */}
                        <img
                            ref={imgInRef}
                            alt="Property view incoming"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            style={{ zIndex: 2 }}
                            src={SLIDES[active].main}   /* same src initially; updated before animation */
                        />

                        {/* Slide label badge */}
                        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                            {SLIDES[active].label}
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 py-1.5 px-3 rounded-full shadow-lg flex items-center space-x-2">
                            <div className="flex -space-x-2 overflow-hidden">
                                {[
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&q=80",
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&q=80",
                                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&q=80",
                                ].map((src, i) => (
                                    <img key={i} alt="" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800 object-cover" src={src} />
                                ))}
                            </div>
                            <div className="flex items-center text-xs font-bold">
                                <span className="text-yellow-500 mr-1">★</span> 4.8{" "}
                                <span className="text-gray-400 font-normal ml-1">(10k Reviews)</span>
                            </div>
                        </div>

                        {/* Left / Right arrow buttons */}
                        <button
                            onClick={() => goTo(Math.max(0, active - 1))}
                            disabled={active === 0}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white dark:hover:bg-black transition-colors disabled:opacity-30"
                            aria-label="Previous"
                        >
                            <span className="material-icons-outlined text-base">chevron_left</span>
                        </button>
                        <button
                            onClick={() => goTo(Math.min(SLIDES.length - 1, active + 1))}
                            disabled={active === SLIDES.length - 1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white dark:hover:bg-black transition-colors disabled:opacity-30"
                            aria-label="Next"
                        >
                            <span className="material-icons-outlined text-base">chevron_right</span>
                        </button>
                    </div>

                    {/* Thumbnail Strip — 3 visible, window follows active */}
                    <div className="flex gap-3">
                        {thumbWindow().map(({ thumb, label, index }) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                style={{
                                    boxShadow: active === index ? "0 0 0 2.5px #000" : "none",
                                }}
                                className={`flex-1 h-28 rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 focus:outline-none ${active === index
                                    ? "opacity-100 scale-[1.02]"
                                    : "opacity-55 hover:opacity-85 hover:scale-[1.01]"
                                    }`}
                                aria-label={`View ${label}`}
                            >
                                <img
                                    className="w-full h-full object-cover object-center"
                                    src={thumb}
                                    alt={label}
                                />
                                {active === index && (
                                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                                        {label}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Pagination — all 8 numbers wired */}
                    <div className="flex items-center justify-between px-1">
                        {SLIDES.map((_, n) => (
                            <button
                                key={n}
                                onClick={() => goTo(n)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 hover:scale-110 active:scale-95 ${active === n
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"
                                    }`}
                                aria-label={`Go to slide ${n + 1}`}
                            >
                                {n + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
