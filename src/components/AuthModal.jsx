import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TABS = ["Sign In", "Sign Up"];

const AuthModal = ({ onClose }) => {
    const [tab, setTab] = useState("Sign Up");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const overlayRef = useRef(null);
    const cardRef = useRef(null);

    /* ── Entrance animation ── */
    useEffect(() => {
        gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: "power2.out" }
        );
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "expo.out" }
        );
    }, []);

    /* ── Close with animation ── */
    const handleClose = () => {
        gsap.to(cardRef.current, { opacity: 0, y: 24, scale: 0.96, duration: 0.25, ease: "power2.in" });
        gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: onClose,
        });
    };

    /* ── Tab switch ── */
    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
        );
        setDone(false);
    }, [tab]);

    /* ── Submit ── */
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDone(true);
            setTimeout(handleClose, 2000);
        }, 1800);
    };

    /* ── Close on Escape ── */
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div
                ref={cardRef}
                className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-black" />

                <div className="px-8 pt-8 pb-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <span className="text-2xl font-bold tracking-tight">Urbane</span>
                            <p className="text-xs text-gray-400 mt-0.5">Premium Real Estate</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <span className="material-icons-outlined" style={{ fontSize: "20px", lineHeight: 1 }}>close</span>
                        </button>
                    </div>

                    {/* Tab toggle */}
                    <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
                        {TABS.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${tab === t
                                        ? "bg-white shadow-sm text-black"
                                        : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {done ? (
                        /* ── Success ── */
                        <div className="flex flex-col items-center justify-center py-8 gap-4">
                            <span className="w-16 h-16 flex items-center justify-center bg-black text-white rounded-full text-3xl">
                                <span className="material-icons-outlined" style={{ fontSize: "32px" }}>check</span>
                            </span>
                            <p className="text-lg font-bold">
                                {tab === "Sign Up" ? "Account created!" : "Welcome back!"}
                            </p>
                            <p className="text-sm text-gray-400 text-center">
                                {tab === "Sign Up"
                                    ? "Your Urbane account is ready. Explore your dream home."
                                    : "Redirecting you to your dashboard…"}
                            </p>
                        </div>
                    ) : (
                        /* ── Form ── */
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {tab === "Sign Up" && (
                                <div className="grid grid-cols-2 gap-3">
                                    <InputField icon="person" placeholder="First name" type="text" required />
                                    <InputField icon="person" placeholder="Last name" type="text" required />
                                </div>
                            )}

                            <InputField icon="mail_outline" placeholder="Email address" type="email" required />

                            {/* Password with show toggle */}
                            <div className="relative">
                                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                    <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>lock_outline</span>
                                </span>
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    minLength={8}
                                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-50 border border-gray-150 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((v) => !v)}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-black transition-colors"
                                >
                                    <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>
                                        {showPass ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>

                            {tab === "Sign In" && (
                                <div className="text-right -mt-1">
                                    <button type="button" className="text-xs text-gray-400 hover:text-black transition-colors underline underline-offset-2">
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {tab === "Sign Up" && (
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" required className="mt-0.5 accent-black w-4 h-4 flex-shrink-0" />
                                    <span className="text-xs text-gray-500 leading-relaxed">
                                        I agree to Urbane's{" "}
                                        <span className="underline text-black cursor-pointer">Terms of Service</span>{" "}
                                        and{" "}
                                        <span className="underline text-black cursor-pointer">Privacy Policy</span>
                                    </span>
                                </label>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group/btn mt-2 flex items-center justify-between bg-black text-white pl-6 pr-2 py-2 rounded-full font-semibold text-sm hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-60"
                            >
                                {loading ? (
                                    <span className="mx-auto flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Processing…
                                    </span>
                                ) : (
                                    <>
                                        {tab}
                                        <span className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full flex-shrink-0 transition-colors">
                                            <span className="material-icons-outlined" style={{ fontSize: "16px", lineHeight: 1 }}>
                                                {tab === "Sign Up" ? "arrow_forward" : "login"}
                                            </span>
                                        </span>
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-1">
                                <div className="flex-1 h-px bg-gray-100" />
                                <span className="text-xs text-gray-400">or continue with</span>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>

                            {/* Social buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <SocialBtn icon="G" label="Google" />
                                <SocialBtn icon="f" label="Facebook" />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── Reusable field ── */
const InputField = ({ icon, placeholder, type, required }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>{icon}</span>
        </span>
        <input
            type={type}
            placeholder={placeholder}
            required={required}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-150 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-gray-400"
        />
    </div>
);

/* ── Social button ── */
const SocialBtn = ({ icon, label }) => (
    <button
        type="button"
        className="flex items-center justify-center gap-2 border border-gray-200 rounded-2xl py-3 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
    >
        <span className="font-bold text-base">{icon}</span>
        {label}
    </button>
);

export default AuthModal;
