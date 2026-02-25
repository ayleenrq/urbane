import { useState } from "react";
import { useGsapSlide } from "../hooks/useGsapReveal";

const FAQ_ITEMS = [
    { question: "Can I sell my home?", answer: "Absolutely. We offer listing support, home valuation, and expert negotiation." },
    { question: "How do I start?", answer: "Sign up, list your property, and get matched with qualified buyers instantly." },
    { question: "Is financing available?", answer: "We partner with top lenders to offer competitive mortgage options tailored to you." },
];

const DiscoverCities = () => {
    const [saved, setSaved] = useState(false);
    const leftRef = useGsapSlide("left");
    const rightRef = useGsapSlide("right");

    return (
        <section id="discover" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div ref={leftRef}>
                    <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-8">
                        Discover and book <br /> Beautiful
                        <span className="inline-flex items-center justify-center w-16 h-10 bg-gray-100 rounded-full align-middle mx-1">
                            <img
                                alt="city icon"
                                className="w-full h-full object-cover rounded-full opacity-80"
                                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=128&h=80&fit=crop&q=80"
                            />
                        </span>
                        City&apos;s
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {["Cleanliness", "Honest", "Trusted", "Luxury"].map((tag) => (
                            <span key={tag} className="px-4 py-2 rounded-full bg-gray-100 text-sm flex items-center cursor-default select-none hover:bg-gray-200:bg-gray-700 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-black mr-2" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Banner */}
                    <div className="bg-surface-light py-3 px-4 rounded-full flex items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="material-icons-outlined text-[18px] leading-none">info</span>
                            </span>
                            <span className="text-sm font-medium">Some info has been automatically translated</span>
                        </div>
                        <button
                            className="flex-shrink-0 bg-white pl-4 pr-3 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow active:scale-95 whitespace-nowrap"
                            onClick={() => alert("Showing full details…")}
                        >
                            Show More
                            <span className="w-5 h-5 flex items-center justify-center bg-black text-white rounded-full">
                                <span className="material-icons-outlined text-[12px] transform -rotate-45 leading-none">arrow_forward</span>
                            </span>
                        </button>
                    </div>

                    {/* FAQ Cards — equal height via items-stretch */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                        {FAQ_ITEMS.map((item, idx) => (
                            <FaqCard key={idx} item={item} delay={idx * 0.1} />
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div ref={rightRef} className="relative h-[600px] rounded-3xl overflow-hidden group">
                    <img
                        alt="Modern white house with palm trees"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=1000&fit=crop&q=80"
                    />
                    <div className="absolute bottom-6 left-6 right-6 bg-white backdrop-blur-sm p-6 rounded-3xl shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold mb-1">Sunny Meadows Estate</h3>
                                <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                                    <span className="flex items-center"><span className="material-icons-outlined text-sm mr-1">bed</span> 4 Beds</span>
                                    <span className="flex items-center"><span className="material-icons-outlined text-sm mr-1">bathtub</span> 2 Baths</span>
                                    <span className="flex items-center"><span className="material-icons-outlined text-sm mr-1">square_foot</span> 250 m²</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSaved((s) => !s)}
                                className={`w-10 h-10 flex items-center justify-center border rounded-full transition-all hover:scale-110 active:scale-95 ${saved ? "border-black bg-black text-white" : "border-gray-200 hover:bg-gray-50:bg-gray-800"
                                    }`}
                                title={saved ? "Saved" : "Save property"}
                            >
                                <span className="material-icons-outlined" style={{ fontSize: '20px', lineHeight: 1 }}>{saved ? "bookmark" : "bookmark_border"}</span>
                            </button>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-2xl font-bold">$10,000 <span className="text-sm text-gray-400 font-normal">/mo</span></span>
                            <button
                                className="bg-black text-white pl-5 pr-2 py-2 rounded-full text-sm font-medium flex items-center gap-3 hover:bg-gray-800 active:scale-95 transition-all"
                                onClick={() => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                Show more
                                <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full flex-shrink-0">
                                    <span className="material-icons-outlined -rotate-45" style={{ fontSize: '16px', lineHeight: 1 }}>arrow_forward</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FaqCard = ({ item }) => {
    const [open, setOpen] = useState(false);

    return (
        <button
            onClick={() => setOpen((o) => !o)}
            className="w-full h-full bg-surface-light p-6 rounded-3xl text-left hover:shadow-md transition-shadow duration-300 group flex flex-col"
        >
            <div className="w-8 h-8 flex-shrink-0 rounded-full border border-gray-300 flex items-center justify-center mb-4 text-gray-500 text-sm font-medium group-hover:border-black group-hover:text-black:border-white:text-white transition-colors">
                {open ? "–" : "?"}
            </div>
            <h3 className="font-semibold text-sm leading-snug mb-2">{item.question}</h3>
            <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open ? "80px" : "0px", opacity: open ? 1 : 0 }}
            >
                <p className="text-xs text-gray-500 leading-relaxed pt-1">{item.answer}</p>
            </div>
        </button>
    );
};

export default DiscoverCities;
