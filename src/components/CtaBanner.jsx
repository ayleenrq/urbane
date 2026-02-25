import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGsapReveal } from "../hooks/useGsapReveal";

const CtaBanner = () => {
    const ref = useGsapReveal({ y: 40, duration: 1 });
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const btnRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        gsap.to(btnRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                setSubmitted(true);
                setEmail("");
                setTimeout(() => setSubmitted(false), 3500);
            },
        });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div
                ref={ref}
                className="relative rounded-[2.5rem] overflow-hidden"
                style={{ minHeight: 400 }}
            >
                {/* Background image */}
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=700&fit=crop&q=85"
                    alt=""
                    aria-hidden="true"
                />

                {/* Layered gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/30" />

                {/* Subtle noise / grain overlay for premium feel */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "repeat",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">

                    {/* Eyebrow badge */}
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                        <span className="material-icons-outlined" style={{ fontSize: "14px", lineHeight: 1 }}>home</span>
                        Dream Home Awaits
                    </span>

                    <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight max-w-2xl">
                        Find Your Dream Home{" "}
                        <span className="italic font-light">Faster</span>
                    </h2>

                    <p className="text-white/70 max-w-md mb-10 text-base leading-relaxed">
                        Explore and discover your ideal home more quickly than ever,
                        with tools designed to streamline every step of your search.
                    </p>

                    {submitted ? (
                        <div className="flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold shadow-lg">
                            <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>check_circle</span>
                            You&apos;re on the list!
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                        >
                            <div className="relative flex-1">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-gray-400" style={{ fontSize: "18px", lineHeight: 1 }}>mail_outline</span>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-11 pr-5 py-3.5 rounded-full text-sm bg-white/95 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
                                    required
                                />
                            </div>

                            <button
                                ref={btnRef}
                                type="submit"
                                className="bg-white text-black pl-6 pr-3 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap active:scale-95 flex items-center gap-3 shadow-sm"
                            >
                                Get Started
                                <span className="w-7 h-7 flex items-center justify-center bg-black text-white rounded-full flex-shrink-0">
                                    <span className="material-icons-outlined -rotate-45" style={{ fontSize: "16px", lineHeight: 1 }}>arrow_forward</span>
                                </span>
                            </button>
                        </form>
                    )}

                    {/* Social proof */}
                    <p className="mt-6 text-white/40 text-xs">
                        Joined by 12,000+ homebuyers · No spam, ever.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CtaBanner;
