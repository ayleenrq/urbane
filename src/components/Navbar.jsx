import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";

const NAV_LINKS = ["Home", "Services", "Properties", "About Us", "Blog"];

/* Each nav link maps to a section id */
const SECTION_IDS = ["hero", "search", "properties", "testimonials", "map"];

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [authOpen, setAuthOpen] = useState(false);
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);

    /* ── Entrance animation ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                navRef.current,
                { y: -80, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
        });
        return () => ctx.revert();
    }, []);

    /* ── Scroll shadow ── */
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    /* ── Active section tracking via IntersectionObserver ── */
    useEffect(() => {
        const observers = [];

        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                {
                    // Fire when the section occupies ≥ 30% of the viewport
                    threshold: 0.3,
                    rootMargin: "-80px 0px 0px 0px", // offset for sticky navbar height
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    /* ── Mobile menu slide ── */
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (mobileOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    }, [mobileOpen]);

    const scrollTo = (id) => {
        if (!isHome) {
            navigate("/");
            // After navigation the home page mounts; let it render before scrolling
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 400);
        } else {
            setActiveSection(id);
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`sticky top-0 z-50 bg-background-light/90 backdrop-blur-md border-b border-border-light transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <button
                            onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="flex-shrink-0 text-2xl font-bold tracking-tight uppercase hover:opacity-70 transition-opacity"
                        >
                            Urbane
                        </button>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex space-x-1 bg-surface-light rounded-full px-2 py-1 items-center">
                            {NAV_LINKS.map((link, i) => {
                                const sectionId = SECTION_IDS[i] ?? "hero";
                                const isActive = activeSection === sectionId;

                                return (
                                    <button
                                        key={link}
                                        onClick={() => scrollTo(sectionId)}
                                        className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-black text-white shadow-sm"
                                            : "text-gray-500 hover:text-black:text-white hover:bg-white:bg-gray-700"
                                            }`}
                                    >
                                        {link}
                                        {(link === "Properties" || link === "Blog") && (
                                            <span
                                                className="material-icons-outlined align-middle ml-0.5"
                                                style={{ fontSize: "16px", lineHeight: 1 }}
                                            >
                                                expand_more
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-3">

                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-light transition-colors"
                                title="Language"
                            >
                                <span className="material-icons-outlined" style={{ fontSize: "20px", lineHeight: 1 }}>language</span>
                            </button>

                            <button
                                onClick={() => setAuthOpen(true)}
                                className="group/btn hidden sm:flex items-center gap-2 bg-black text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95"
                            >
                                Sign Up
                                <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full flex-shrink-0">
                                    <span className="material-icons-outlined" style={{ fontSize: '15px', lineHeight: 1 }}>arrow_forward</span>
                                </span>
                            </button>

                            {/* Mobile Hamburger */}
                            <button
                                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-light transition-colors"
                                onClick={() => setMobileOpen((o) => !o)}
                                aria-label="Toggle menu"
                            >
                                <span className="material-icons-outlined" style={{ fontSize: "20px", lineHeight: 1 }}>
                                    {mobileOpen ? "close" : "menu"}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div ref={mobileMenuRef} className="overflow-hidden h-0 opacity-0 md:hidden">
                        <div className="pb-4 flex flex-col space-y-1">
                            {NAV_LINKS.map((link, i) => {
                                const sectionId = SECTION_IDS[i] ?? "hero";
                                const isActive = activeSection === sectionId;
                                return (
                                    <button
                                        key={link}
                                        onClick={() => scrollTo(sectionId)}
                                        className={`text-left px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${isActive
                                            ? "bg-black text-white"
                                            : "hover:bg-surface-light:bg-surface-dark"
                                            }`}
                                    >
                                        {link}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                                className="group/btn flex items-center gap-2 bg-black text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold w-full justify-between mt-2 active:scale-95 transition-all"
                            >
                                Sign Up
                                <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full flex-shrink-0">
                                    <span className="material-icons-outlined" style={{ fontSize: '15px', lineHeight: 1 }}>arrow_forward</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Auth Modal */}
            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        </>
    );
};

export default Navbar;
