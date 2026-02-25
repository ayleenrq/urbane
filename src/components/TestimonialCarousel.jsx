import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGsapReveal } from "../hooks/useGsapReveal";

const REVIEWS = [
    {
        text: "Urbane made our home purchase feel effortless. Their team guided us through every step with patience and expertise. Truly world-class service.",
        name: "Amanda & Ryan K.",
        role: "First-Time Buyers · Jakarta",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80",
        rating: 5,
    },
    {
        text: "From listing to closing in under 3 weeks. The agent knew exactly what we needed and the platform made tracking everything so easy.",
        name: "Marcus T.",
        role: "Property Seller · Bali",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&q=80",
        rating: 5,
    },
    {
        text: "I've worked with many agencies — Urbane stands apart. Genuinely responsive, transparent pricing, and they found us our dream villa in Kemang.",
        name: "Sarah Johnson",
        role: "Homeowner · South Jakarta",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&q=80",
        rating: 5,
    },
    {
        text: "The investment advice was spot-on. ROI exceeded expectations. I trust Urbane completely with my property portfolio.",
        name: "Kevin Miller",
        role: "Investor · Surabaya",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80",
        rating: 5,
    },
    {
        text: "Relocating internationally is stressful — Urbane made it seamless. Virtual tours, digital contracts, smooth handover. I couldn't ask for more.",
        name: "Priya Sharma",
        role: "Expat Client · BSD City",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&q=80",
        rating: 5,
    },
    {
        text: "Their map-based search tool is brilliant. Found properties within my budget in the exact neighborhoods I wanted. Highly recommend!",
        name: "Daniel Cruz",
        role: "Young Professional · Menteng",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&q=80",
        rating: 5,
    },
];

/* ── Star row ── */
const Stars = ({ count = 5 }) => (
    <div className="flex gap-0.5 mb-3">
        {Array.from({ length: count }).map((_, i) => (
            <span key={i} className="material-icons-outlined text-amber-400" style={{ fontSize: "16px", lineHeight: 1 }}>
                star
            </span>
        ))}
    </div>
);

/* ── Single review card ── */
const ReviewCard = ({ text, name, role, avatar, rating }) => (
    <div
        className="flex-shrink-0 w-[340px] bg-white border border-gray-100 rounded-3xl p-7 mx-3 select-none"
        style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
    >
        <Stars count={rating} />
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
            &ldquo;{text}&rdquo;
        </p>
        <div className="flex items-center gap-3">
            <img
                src={avatar}
                alt={name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
            />
            <div>
                <p className="text-sm font-bold leading-tight">{name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{role}</p>
            </div>
        </div>
    </div>
);

/* ── Infinite marquee row ── */
const MarqueeRow = ({ items, reversed = false, speed = 40 }) => {
    const trackRef = useRef(null);
    const tweenRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        /* Duplicate so we can loop seamlessly */
        const totalWidth = track.scrollWidth / 2;
        const dir = reversed ? totalWidth : 0;
        const endX = reversed ? 0 : -totalWidth;

        gsap.set(track, { x: dir });

        tweenRef.current = gsap.to(track, {
            x: endX,
            duration: totalWidth / speed,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: (x) => {
                    const px = parseFloat(x);
                    const mod = ((px % totalWidth) + totalWidth) % totalWidth;
                    return reversed ? `${mod}px` : `${px % totalWidth <= 0 ? px % totalWidth + totalWidth : px % totalWidth - totalWidth}px`;
                },
            },
        });

        /* Simpler reliable approach: just restart at boundary */
        tweenRef.current.kill();

        const dur = totalWidth / speed;

        tweenRef.current = gsap.fromTo(
            track,
            { x: reversed ? -totalWidth : 0 },
            {
                x: reversed ? 0 : -totalWidth,
                duration: dur,
                ease: "none",
                repeat: -1,
            }
        );

        /* Pause on hover */
        const parent = track.parentElement;
        const pause = () => tweenRef.current?.pause();
        const resume = () => tweenRef.current?.resume();
        parent.addEventListener("mouseenter", pause);
        parent.addEventListener("mouseleave", resume);

        return () => {
            tweenRef.current?.kill();
            parent.removeEventListener("mouseenter", pause);
            parent.removeEventListener("mouseleave", resume);
        };
    }, [reversed, speed]);

    return (
        <div className="overflow-hidden">
            <div ref={trackRef} className="flex" style={{ width: "max-content" }}>
                {/* Render twice for seamless loop */}
                {[...items, ...items].map((item, i) => (
                    <ReviewCard key={i} {...item} />
                ))}
            </div>
        </div>
    );
};

/* ── Main section ── */
const TestimonialCarousel = () => {
    const headerRef = useGsapReveal({ y: 30, stagger: 0.08 });

    return (
        <section className="py-20 overflow-hidden bg-surface-light">
            {/* Header */}
            <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <span className="inline-flex items-center gap-1.5 bg-black/5 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                    <span className="material-icons-outlined" style={{ fontSize: "13px", lineHeight: 1 }}>format_quote</span>
                    Client Stories
                </span>
                <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                    Loved by Thousands
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    Real stories from homebuyers, sellers, and investors who found their perfect property with Urbane.
                </p>
            </div>

            {/* Row 1 — scrolls left */}
            <div className="mb-6">
                <MarqueeRow items={REVIEWS} reversed={false} speed={38} />
            </div>

            {/* Row 2 — scrolls right (offset halfway) */}
            <MarqueeRow items={[...REVIEWS.slice(3), ...REVIEWS.slice(0, 3)]} reversed={true} speed={32} />

            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-light to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-light to-transparent z-10" />
        </section>
    );
};

export default TestimonialCarousel;
