import { useRef } from "react";
import { useGsapReveal, useGsapScale, useGsapCounter } from "../hooks/useGsapReveal";

const TESTIMONIALS = [
    {
        text: "Professional, responsive, and genuinely helpful. They made relocating feel easy — even from another state. Very Recommended!",
        name: "Lisa & Marcus T.",
        role: "Couple Clients",
        avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop&q=80",
        dark: true,
    },
    {
        text: "Professional, responsive, and genuinely helpful. They made relocating feel easy — even from another state. Very Recommended!",
        name: "Sarah Johnson",
        role: "Homeowner",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&q=80",
        dark: false,
    },
    {
        text: "Their agent was with us every step of the way, helping us negotiate the best deal. Highly recommended!",
        name: "Kevin Miller",
        role: "Investor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80",
        dark: false,
    },
];

const Testimonials = () => {
    const headerRef = useGsapReveal({ y: 30 });
    const statsRef = useGsapScale();
    const cardsRef = useGsapScale({ selector: ".testimonial-card", delay: 0.2 });

    return (
        <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Header */}
            <div ref={headerRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                <div>
                    <h2 className="text-4xl font-semibold mb-4">What Our Clients Say About Us</h2>
                    <div className="flex items-center space-x-3">
                        <div className="flex -space-x-3 overflow-hidden">
                            {[
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80",
                                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&q=80",
                            ].map((src, i) => (
                                <img key={i} alt="Client" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-background-dark object-cover" src={src} />
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Trusted by hundreds of happy homeowners and sellers
                        </p>
                    </div>
                </div>
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("Loading more stories\u2026"); }}
                    className="bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 pl-5 pr-2 py-2 rounded-full text-sm font-bold flex items-center gap-3 transition-colors active:scale-95 whitespace-nowrap"
                >
                    Show More
                    <span className="w-7 h-7 flex items-center justify-center bg-black text-white rounded-full flex-shrink-0">
                        <span className="material-icons-outlined -rotate-45" style={{ fontSize: '16px', lineHeight: 1 }}>arrow_forward</span>
                    </span>
                </a>
            </div>

            {/* Stats + Hero Quote */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div ref={statsRef} className="lg:col-span-3 bg-surface-light dark:bg-surface-dark p-8 rounded-3xl flex flex-col justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Facts &amp; Numbers</span>
                    <div className="flex flex-col gap-6 mt-8">
                        <StatCounter target={94} suffix="%" label="of clients recommend Urbane" />
                        <StatCounter target={12000} suffix="+" label="happy homeowners served" prefix="" shorthand="12K" />
                        <StatCounter target={4.9} suffix="★" label="average client rating" decimals={1} />
                    </div>
                </div>

                <div className="lg:col-span-9 relative h-[400px] rounded-3xl overflow-hidden group">
                    <img
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop&q=80"
                        alt="Customer story"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <span className="text-white/80 text-xs font-semibold uppercase mb-2 block">Customer Story</span>
                        <blockquote className="text-2xl md:text-3xl text-white font-medium mb-4 leading-relaxed">
                            &ldquo;Urbane made my first home purchase smooth and stress-free.&rdquo;
                        </blockquote>
                        <p className="text-white/80 font-medium">- Amanda Rizky, Jakarta</p>
                    </div>
                </div>
            </div>

            {/* Testimonial Cards */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {TESTIMONIALS.map((t, i) => (
                    <TestimonialCard key={i} {...t} />
                ))}
            </div>
        </section>
    );
};

const TestimonialCard = ({ text, name, role, avatar, dark }) => (
    <div
        className={`testimonial-card p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 cursor-default ${dark
            ? "bg-black text-white"
            : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            }`}
    >
        <p className={`text-base leading-relaxed mb-6 ${dark ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>
            {text}
        </p>
        <div className="flex items-center space-x-3">
            <img alt={name} className="h-10 w-10 rounded-full object-cover ring-2 ring-offset-1 ring-gray-200" src={avatar} />
            <div>
                <h4 className="text-sm font-bold">{name}</h4>
                <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-400"}`}>{role}</p>
            </div>
        </div>
    </div>
);

/* Animated stat — uses useGsapCounter for integer/decimal counting */
const StatCounter = ({ target, suffix = "", label, shorthand = null, decimals = 0 }) => {
    /* For large numbers (12K+) just show the shorthand text directly */
    if (shorthand) {
        const ref = useGsapReveal({ y: 10, blur: false, stagger: 0 });
        return (
            <div ref={ref}>
                <p className="text-4xl font-light mb-1">{shorthand}{suffix}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
            </div>
        );
    }

    const numRef = useGsapCounter(target, {
        duration: 2,
        suffix,
        ease: "power2.out",
    });

    return (
        <div>
            <p ref={numRef} className="text-4xl font-light mb-1">0{suffix}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
    );
};

export default Testimonials;

