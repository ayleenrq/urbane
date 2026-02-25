import { useState } from "react";
import { useGsapReveal, useGsapScale } from "../hooks/useGsapReveal";

const PROPERTY_IMAGES_DETAIL = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop&q=80",
];

const FEATURED_LISTINGS = [
    {
        id: "f1",
        title: "Villa Pondok Tanjung",
        description: "A stunning villa nestled in a lush tropical setting. Buy, sell, or rent with Urbane\u2019s expert guidance.",
        features: ["Equipped kitchen", "Swimming pool", "Garden", "Smart home", "2-car parking"],
        price: "$512",
        period: "Month",
        location: "Emerald Heights Condo N.09100",
        area: "64 m\u00b2",
        beds: 3,
        baths: 2,
        agentName: "Maddie Molina",
        agentImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=64&h=64&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=500&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=200&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=200&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300&h=200&fit=crop&q=80",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop&q=80",
        ],
    },
    {
        id: "f2",
        title: "Sunset Ridge Estate",
        description: "A panoramic hilltop estate with sweeping views, private infinity pool, and resort-style landscaping.",
        features: ["Home cinema", "Infinity pool", "Wine cellar", "Golf access", "Guest house"],
        price: "$1,200",
        period: "Month",
        location: "Sunset Ridge, Bintaro Sector 9",
        area: "210 m\u00b2",
        beds: 5,
        baths: 4,
        agentName: "Kevin Hartman",
        agentImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=500&fit=crop&q=80",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&q=80",
            "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=300&h=200&fit=crop&q=80",
        ],
    },
];

const ALL_PAGES = [
    // Page 1
    [
        { id: 1, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80", title: "Villa Pondok Indah", description: "A spacious villa with a private pool, three bedrooms, and lush tropical gardens.", price: "$640–$950/mo", featured: false },
        { id: 2, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80", title: "Villa Pondok Tanjung", description: "Modern living at its finest — open-plan kitchen, high ceilings, and double-car garage.", price: "$840–$950/mo", featured: true },
    ],
    // Page 2
    [
        { id: 3, image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop&q=80", title: "Emerald Heights Condo", description: "City-view condo with modern amenities, gym access, and rooftop terrace in the heart of downtown.", price: "$512–$720/mo", featured: false },
        { id: 4, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&q=80", title: "Sunset Ridge Estate", description: "Panoramic hilltop estate with 5 bedrooms, infinity pool, and panoramic sunset views.", price: "$1,200–$1,800/mo", featured: true },
    ],
    // Page 3
    [
        { id: 5, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&q=80", title: "Garden View Residence", description: "Charming suburban home with wraparound porch, 4 bedrooms, and a beautifully landscaped garden.", price: "$780–$1,100/mo", featured: false },
        { id: 6, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80", title: "The Lakefront Pavilion", description: "Exclusive lakefront property with private dock, expansive decks, and floor-to-ceiling glass walls.", price: "$2,400–$3,000/mo", featured: true },
    ],
    // Page 4
    [
        { id: 7, image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop&q=80", title: "Urban Loft Studio", description: "Stylish exposed-brick loft in the arts district — perfect for young professionals and creatives.", price: "$480–$600/mo", featured: false },
        { id: 8, image: "https://images.unsplash.com/photo-1546874177-9e664107314e?w=600&h=400&fit=crop&q=80", title: "Coastal Breeze Villa", description: "Beachfront villa steps from the shore, complete with summer kitchen, 6 beds, and a private beach.", price: "$3,200–$4,000/mo", featured: true },
    ],
];

const PropertyGrid = () => {
    const [activeBedroom, setActiveBedroom] = useState("1");
    const [priceMin] = useState(140);
    const [priceMax] = useState(500);
    const [longTerm, setLongTerm] = useState(true);
    const [shortTerm, setShortTerm] = useState(false);
    const [gridView, setGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const headingRef = useGsapReveal({ y: 30 });
    const cardsRef = useGsapScale({ selector: ".property-card" });

    const pageCards = ALL_PAGES[currentPage - 1] ?? ALL_PAGES[0];

    return (
        <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div ref={headingRef} className="text-center mb-16">
                <h2 className="text-4xl font-semibold mb-4">
                    Discover Best Properties Tailored to You
                </h2>
                <p className="text-gray-500">
                    Explore our curated listings this month, with options for every lifestyle.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <Sidebar
                    activeBedroom={activeBedroom}
                    setActiveBedroom={setActiveBedroom}
                    longTerm={longTerm}
                    setLongTerm={setLongTerm}
                    shortTerm={shortTerm}
                    setShortTerm={setShortTerm}
                    priceMin={priceMin}
                    priceMax={priceMax}
                />

                {/* Main */}
                <div className="flex-1 space-y-8">
                    {/* Featured Listings */}
                    {FEATURED_LISTINGS.map((listing, i) => (
                        <div key={listing.id}>
                            <FeaturedListing {...listing} />
                            {i < FEATURED_LISTINGS.length - 1 && (
                                <div className="border-t border-gray-100 my-2" />
                            )}
                        </div>
                    ))}

                    {/* Sort Bar */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                        <div className="flex items-center text-sm font-medium cursor-pointer hover:opacity-70">
                            Sort by: Price <span className="material-icons-outlined text-sm ml-1">expand_more</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setGridView(true)}
                                className={`p-1.5 rounded-lg transition-colors ${gridView ? "text-black bg-gray-100" : "text-gray-400"} hover:bg-gray-100:bg-gray-800`}
                            >
                                <span className="material-icons-outlined">grid_view</span>
                            </button>
                            <button
                                onClick={() => setGridView(false)}
                                className={`p-1.5 rounded-lg transition-colors ${!gridView ? "text-black bg-gray-100" : "text-gray-400"} hover:bg-gray-100:bg-gray-800`}
                            >
                                <span className="material-icons-outlined">view_list</span>
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div ref={cardsRef} className={`${gridView ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}`}>
                        {pageCards.map((prop) =>
                            prop.featured ? (
                                <PropertyCardFeatured key={prop.id} {...prop} />
                            ) : (
                                <PropertyCard key={prop.id} {...prop} />
                            )
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination current={currentPage} total={ALL_PAGES.length} onChange={setCurrentPage} />
                </div>
            </div>
        </section>
    );
};

/* ── Sidebar ── */
const Sidebar = ({ activeBedroom, setActiveBedroom, longTerm, setLongTerm, shortTerm, setShortTerm }) => {
    const ref = useGsapReveal({ y: 20, delay: 0.1 });

    return (
        <div ref={ref} className="w-full lg:w-1/4 flex-shrink-0 space-y-8">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold">256 Results</span>
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                    <span>Show Map</span>
                    <div className="relative inline-block">
                        <input type="checkbox" className="sr-only peer" id="map-toggle" />
                        <div className="w-8 h-4 bg-gray-200 peer-checked:bg-black rounded-full transition-colors cursor-pointer" />
                        <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                    </div>
                </label>
            </div>

            {/* Rent / Buy / Sell */}
            <SidebarTabs />

            {/* Rental Period */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Rental Period</h3>
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={longTerm} onChange={(e) => setLongTerm(e.target.checked)} className="form-checkbox rounded text-black focus:ring-black h-4 w-4 border-gray-300" />
                        <span className="text-sm">Long term rent</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={shortTerm} onChange={(e) => setShortTerm(e.target.checked)} className="form-checkbox rounded text-black focus:ring-black h-4 w-4 border-gray-300" />
                        <span className="text-sm text-gray-500">Short term rent</span>
                    </label>
                </div>
            </div>

            {/* Price Range (visual) */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Range Price</h3>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    defaultValue="500"
                    className="w-full h-1 bg-gray-200 appearance-none rounded-full accent-black cursor-pointer"
                />
                <div className="flex justify-between mt-3">
                    <div className="bg-surface-light px-4 py-2 rounded-full text-sm font-medium">$140</div>
                    <span className="self-center text-gray-400 text-xs">To</span>
                    <div className="bg-surface-light px-4 py-2 rounded-full text-sm font-medium">$500</div>
                </div>
            </div>

            {/* Amenities */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                    {["Pool", "Garden", "Garage", "Gym"].map((a, i) => (
                        <AmenityChip key={a} label={a} defaultChecked={i < 2} />
                    ))}
                </div>
            </div>

            {/* Bedrooms */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Bedrooms</h3>
                <div className="flex bg-surface-light rounded-2xl p-1">
                    {["1", "2", "3", "4", "5+"].map((n) => (
                        <button
                            key={n}
                            onClick={() => setActiveBedroom(n)}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${activeBedroom === n
                                ? "bg-white shadow-sm font-bold"
                                : "text-gray-500 hover:text-black:text-white"
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ── Sidebar Tab Toggle (Buy / Sell / Rent) ── */
const SidebarTabs = () => {
    const [active, setActive] = useState("Rent");
    return (
        <div className="flex p-1 bg-surface-light rounded-2xl">
            {["Buy", "Sell", "Rent"].map((t) => (
                <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`flex-1 py-2 text-xs font-medium rounded-full transition-all ${active === t
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-500 hover:text-black:text-white"
                        }`}
                >
                    {t}
                </button>
            ))}
        </div>
    );
};

const AmenityChip = ({ label, defaultChecked }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <button
            onClick={() => setChecked((c) => !c)}
            className={`px-3 py-1.5 border rounded-full text-xs flex items-center gap-1 cursor-pointer transition-all ${checked
                ? "border-black bg-black text-white"
                : "border-gray-200 hover:border-black:border-white"
                }`}
        >
            {label}
            <span className={`material-icons-outlined text-[10px] ${checked ? "bg-white text-black" : ""} rounded-full p-[1px]`}>check</span>
        </button>
    );
};

/* ── Featured Listing ── */
const FeaturedListing = ({
    title, description, features, price, period,
    location, area, beds, baths,
    agentName, agentImg, images,
}) => {
    const [liked, setLiked] = useState(false);
    const [shareMsg, setShareMsg] = useState(false);

    const handleShare = () => {
        navigator.clipboard?.writeText(window.location.href);
        setShareMsg(true);
        setTimeout(() => setShareMsg(false), 2000);
    };

    return (
        <div className="bg-white overflow-hidden mb-8 property-card">
            {/* Image gallery: 1 large left + 2×2 grid right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-64 md:h-80 rounded-2xl overflow-hidden">
                    <img
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        src={images[0]}
                        alt={title}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 h-64 md:h-80">
                    {images.slice(1).map((src, idx) => (
                        <div key={idx} className="rounded-2xl overflow-hidden">
                            <img
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                src={src}
                                alt={`${title} detail ${idx + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <div>
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 max-w-lg mb-4">{description}</p>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-xs text-gray-500 mb-6">
                        {features.map((f) => (
                            <span key={f} className="flex items-center">
                                <span className="material-icons-outlined text-sm mr-1 text-green-600">check</span> {f}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Price + Stats row */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                    <div>
                        <div className="flex items-end gap-1 mb-1">
                            <span className="text-3xl font-bold">{price}</span>
                            <span className="text-gray-400 text-sm mb-1">/{period}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                            <span className="material-icons-outlined text-sm mr-1">location_on</span>
                            {location}
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4 text-sm font-medium">
                            <span>{area}</span>
                            <span className="flex items-center"><strong className="mr-1 text-lg">{beds}</strong> beds</span>
                            <span className="flex items-center"><strong className="mr-1 text-lg">{baths}</strong> baths</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleShare}
                                className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors active:scale-95"
                            >
                                <span className="material-icons-outlined text-lg">share</span>
                                <span>{shareMsg ? "Copied!" : "Share"}</span>
                            </button>
                            <button
                                onClick={() => setLiked((l) => !l)}
                                className={`transition-all hover:scale-125 active:scale-95 ${liked ? "text-red-500" : ""}`}
                            >
                                <span className="material-icons-outlined text-lg">{liked ? "favorite" : "favorite_border"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Agent + CTA */}
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-3 bg-surface-light pr-4 py-1.5 rounded-full pl-1.5">
                        <img className="w-8 h-8 rounded-full object-cover" src={agentImg} alt={agentName} />
                        <span className="text-xs font-bold">Agent: {agentName}</span>
                    </div>
                    <button
                        className="bg-black text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold flex items-center gap-3 hover:bg-gray-800 active:scale-95 transition-all"
                        onClick={() => alert(`Request sent! ${agentName} will contact you shortly.`)}
                    >
                        Send a request
                        <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full flex-shrink-0">
                            <span className="material-icons-outlined -rotate-45" style={{ fontSize: "16px", lineHeight: 1 }}>arrow_forward</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Property Card (standard) ── */
const PropertyCard = ({ image, title, description, price }) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className="property-card group cursor-pointer">
            <div className="h-64 rounded-2xl overflow-hidden mb-4 relative">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={image} alt={title} />
                <button
                    onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
                    className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md transition-all hover:scale-110 active:scale-95 ${liked ? "text-red-500" : ""}`}
                >
                    <span className="material-icons-outlined" style={{ fontSize: '18px', lineHeight: 1 }}>{liked ? "favorite" : "favorite_border"}</span>
                </button>
            </div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold text-gray-900">{price}</span>
                <button
                    onClick={() => alert(`Booking ${title}\u2026`)}
                    className="group/btn flex items-center gap-2 border border-gray-200 hover:bg-black hover:border-black hover:text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                >
                    Book Now
                    <span className="w-7 h-7 flex items-center justify-center bg-black text-white group-hover/btn:bg-white group-hover/btn:text-black rounded-full flex-shrink-0 transition-colors duration-200">
                        <span className="material-icons-outlined -rotate-45" style={{ fontSize: '15px', lineHeight: 1 }}>arrow_forward</span>
                    </span>
                </button>
            </div>
        </div>
    );
};

/* ── Property Card (featured / dark) ── */
const PropertyCardFeatured = ({ image, title, description, price }) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className="property-card group cursor-pointer">
            <div className="h-64 rounded-2xl overflow-hidden mb-4 relative">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={image} alt={title} />
                <button
                    onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
                    className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md transition-all hover:scale-110 active:scale-95 ${liked ? "text-red-500" : ""}`}
                >
                    <span className="material-icons-outlined" style={{ fontSize: '18px', lineHeight: 1 }}>{liked ? "favorite" : "favorite_border"}</span>
                </button>
            </div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold text-gray-900">{price}</span>
                <button
                    onClick={() => alert(`Booking ${title}\u2026`)}
                    className="group/btn flex items-center gap-2 border border-gray-200 hover:bg-black hover:border-black hover:text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                >
                    Book Now
                    <span className="w-7 h-7 flex items-center justify-center bg-black text-white group-hover/btn:bg-white group-hover/btn:text-black rounded-full flex-shrink-0 transition-colors duration-200">
                        <span className="material-icons-outlined -rotate-45" style={{ fontSize: '15px', lineHeight: 1 }}>arrow_forward</span>
                    </span>
                </button>
            </div>
        </div>
    );
};

/* ── Pagination ── */
const Pagination = ({ current, total, onChange }) => {
    return (
        <div className="flex justify-end pt-8">
            <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                    onClick={() => onChange(Math.max(1, current - 1))}
                    disabled={current === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
                    aria-label="Previous page"
                >
                    <span className="material-icons-outlined" style={{ fontSize: '18px', lineHeight: 1 }}>chevron_left</span>
                </button>

                {/* Page numbers */}
                {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                    <button
                        key={n}
                        onClick={() => onChange(n)}
                        className={`w-8 h-8 flex items-center justify-center text-xs rounded-full font-semibold transition-all active:scale-90 ${current === n
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-400 hover:bg-gray-100:bg-gray-800 hover:text-black:text-white"
                            }`}
                    >
                        {n}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={() => onChange(Math.min(total, current + 1))}
                    disabled={current === total}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
                    aria-label="Next page"
                >
                    <span className="material-icons-outlined" style={{ fontSize: '18px', lineHeight: 1 }}>chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default PropertyGrid;
