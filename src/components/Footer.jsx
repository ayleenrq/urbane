import { useGsapReveal } from "../hooks/useGsapReveal";

const FOOTER_LINKS = {
    Company: ["Home", "Properties", "About Us", "Services"],
    Information: ["Real Estate", "Properties", "Terms of Use", "Luxury Properties"],
    Community: ["Forum", "Feedback", "Events", "Newsletter"],
    Support: ["FAQ", "Contact Us", "Sponsorship", "Social Media"],
    Resources: ["Blog", "Guides", "Webinars", "Press Releases"],
};

const SOCIAL = [
    { icon: "X", label: "Twitter / X", href: "https://x.com" },
    { icon: "f", label: "Facebook", href: "https://facebook.com" },
    { icon: "in", label: "LinkedIn", href: "https://linkedin.com" },
    { icon: "Ig", label: "Instagram", href: "https://instagram.com" },
];

const SECTION_IDS = {
    Home: "hero",
    Properties: "properties",
    "About Us": "testimonials",
    Services: "discover",
    FAQ: "search",
    "Contact Us": "map",
};

const Footer = () => {
    const ref = useGsapReveal({ y: 20, duration: 0.8 });

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Logo + Tagline */}
                <div className="mb-12">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-2xl font-bold tracking-tight uppercase mb-2 hover:opacity-70 transition-opacity"
                    >
                        Urbane
                    </button>
                    <p className="text-sm text-gray-400 max-w-xs">
                        Modern real estate, reimagined for the way you live.
                    </p>
                </div>

                {/* Link Columns */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {Object.entries(FOOTER_LINKS).map(([title, links], colIdx) => (
                        <div key={title}>
                            <h3 className="font-bold mb-4">{title}</h3>
                            <ul className="space-y-3 text-sm text-gray-500">
                                {links.map((link) => {
                                    const sectionId = SECTION_IDS[link];
                                    return (
                                        <li key={link}>
                                            {sectionId ? (
                                                <button
                                                    onClick={() => scrollTo(sectionId)}
                                                    className="hover:text-black:text-white transition-colors text-left"
                                                >
                                                    {link}
                                                </button>
                                            ) : (
                                                <a href="#" className="hover:text-black:text-white transition-colors">
                                                    {link}
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            {colIdx === Object.keys(FOOTER_LINKS).length - 1 && (
                                <div className="flex space-x-4 mt-6">
                                    {SOCIAL.map(({ icon, label, href }) => (
                                        <a
                                            key={icon}
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={label}
                                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-black:border-white hover:bg-gray-50:bg-gray-800 hover:scale-110 active:scale-95 transition-all"
                                        >
                                            <span className="text-xs font-bold">{icon}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
                    <button
                        onClick={() => alert("Privacy Policy — coming soon")}
                        className="hover:text-black:text-white transition-colors"
                    >
                        Privacy Policy
                    </button>
                    <div>Copyright © Urbane 2025. All rights reserved.</div>
                    <button
                        onClick={() => alert("Terms of Use — coming soon")}
                        className="hover:text-black:text-white transition-colors"
                    >
                        Terms Of Use
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
