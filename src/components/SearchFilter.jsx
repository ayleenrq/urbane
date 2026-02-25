import { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useGsapReveal } from "../hooks/useGsapReveal";

const TABS = ["Buy", "Sell", "Rent"];
const FILTERS = ["All", "House", "Residential", "Apartment", "Villa"];

const SearchFilter = () => {
    const { activeTab, setActiveTab, activeFilter, setActiveFilter } = useAppContext();
    const [formValues, setFormValues] = useState({ type: "", location: "", price: "", rooms: "" });
    const [submitted, setSubmitted] = useState(false);
    const containerRef = useGsapReveal({ y: 30, duration: 0.8 });

    const handleChange = (field) => (e) =>
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Animate the button
        setTimeout(() => setSubmitted(false), 2000);
        const section = document.getElementById("properties");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="search" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div
                ref={containerRef}
                className="bg-surface-light rounded-3xl p-6 shadow-sm border border-border-light"
            >
                {/* Buy / Sell / Rent Toggle */}
                <div className="flex space-x-2 bg-white rounded-full p-1.5 w-fit border border-gray-100 mb-4">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                                ? "bg-primary text-white shadow-sm scale-105"
                                : "text-gray-500 hover:text-black:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Inputs + Submit inline */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 items-end">
                        {[
                            { label: "Looking for", icon: "home", key: "type", placeholder: "Enter type" },
                            { label: "Location", icon: "location_on", key: "location", placeholder: "City or address" },
                            { label: "Price", icon: "attach_money", key: "price", placeholder: "Max price" },
                            { label: "Bedrooms", icon: "bed", key: "rooms", placeholder: "No. of rooms" },
                        ].map(({ label, icon, key, placeholder }) => (
                            <div key={key} className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide ml-3">{label}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <span className="material-icons-outlined text-gray-400" style={{ fontSize: '20px' }}>{icon}</span>
                                    </span>
                                    <input
                                        value={formValues[key]}
                                        onChange={handleChange(key)}
                                        className="block w-full pl-10 pr-4 py-3 border-none rounded-full bg-white focus:ring-2 focus:ring-primary text-sm placeholder-gray-400 transition-shadow"
                                        placeholder={placeholder}
                                        type="text"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Submit — aligns to bottom of inputs row */}
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 ${submitted
                                        ? "bg-green-600 text-white"
                                        : "bg-primary hover:bg-primary-hover text-white"
                                    }`}
                            >
                                {submitted ? (
                                    <><span className="material-icons-outlined text-sm">check_circle</span> Done!</>
                                ) : (
                                    <><span className="material-icons-outlined text-sm">search</span> Find</>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2 mt-5 items-center">
                    <span className="flex items-center text-sm font-semibold mr-2">
                        <span className="material-icons-outlined mr-1 text-[18px]">tune</span> Filter
                    </span>
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 border ${activeFilter === f
                                    ? "bg-black text-white border-black"
                                    : "border-gray-200 hover:border-black:border-white hover:bg-gray-50:bg-gray-800"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SearchFilter;
