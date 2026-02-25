import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGsapReveal, useGsapScale } from "../hooks/useGsapReveal";
import { useAppContext } from "../context/AppContext";

const CARDS_PER_PAGE = 4;

const PropertyGrid = () => {
    const {
        filteredProperties,
        sidebarTab, setSidebarTab,
        longTerm, setLongTerm,
        shortTerm, setShortTerm,
        priceRange, setPriceRange,
        selectedAmenities, toggleAmenity,
        activeBedroom, setActiveBedroom,
    } = useAppContext();

    const [gridView, setGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("default");
    const headingRef = useGsapReveal({ y: 30 });
    const cardsRef = useGsapScale({ selector: ".property-card" });

    // Split: featured cards go to the big listings at top, rest paginate below
    const featuredCards = useMemo(
        () => filteredProperties.filter((p) => p.featured).slice(0, 2),
        [filteredProperties]
    );

    const sortedProperties = useMemo(() => {
        const arr = [...filteredProperties];
        if (sortBy === "price-asc") arr.sort((a, b) => a.priceNumeric - b.priceNumeric);
        if (sortBy === "price-desc") arr.sort((a, b) => b.priceNumeric - a.priceNumeric);
        return arr;
    }, [filteredProperties, sortBy]);

    const totalPages = Math.max(1, Math.ceil(sortedProperties.length / CARDS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const pageCards = sortedProperties.slice((safePage - 1) * CARDS_PER_PAGE, safePage * CARDS_PER_PAGE);

    const handlePageChange = (n) => setCurrentPage(n);

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
                    sidebarTab={sidebarTab}
                    setSidebarTab={setSidebarTab}
                    longTerm={longTerm}
                    setLongTerm={setLongTerm}
                    shortTerm={shortTerm}
                    setShortTerm={setShortTerm}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedAmenities={selectedAmenities}
                    toggleAmenity={toggleAmenity}
                    activeBedroom={activeBedroom}
                    setActiveBedroom={setActiveBedroom}
                    resultCount={sortedProperties.length}
                    onFilterChange={() => setCurrentPage(1)}
                />

                {/* Main */}
                <div className="flex-1 space-y-8">
                    {/* Featured Listings — driven by filteredProperties */}
                    {featuredCards.length > 0 ? (
                        featuredCards.map((listing, i) => (
                            <div key={listing.id}>
                                <FeaturedListing {...listing} />
                                {i < featuredCards.length - 1 && (
                                    <div className="border-t border-gray-100 my-2" />
                                )}
                            </div>
                        ))
                    ) : (
                        sortedProperties.length === 0 ? null : (
                            /* If no featured items match, show the top 2 regular ones as featured */
                            sortedProperties.slice(0, 2).map((listing, i) => (
                                <div key={listing.id}>
                                    <FeaturedListing {...listing} />
                                    {i < 1 && sortedProperties.length > 1 && (
                                        <div className="border-t border-gray-100 my-2" />
                                    )}
                                </div>
                            ))
                        )
                    )}

                    {/* Sort Bar */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                                className="appearance-none pl-3 pr-8 py-1.5 text-sm font-medium bg-transparent border border-gray-200 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-black hover:border-black transition-colors"
                            >
                                <option value="default">Sort by: Default</option>
                                <option value="price-asc">Sort by: Price ↑</option>
                                <option value="price-desc">Sort by: Price ↓</option>
                            </select>
                            <span className="material-icons-outlined text-sm absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setGridView(true)}
                                className={`p-1.5 rounded-lg transition-colors ${gridView ? "text-black bg-gray-100" : "text-gray-400"} hover:bg-gray-100`}
                            >
                                <span className="material-icons-outlined">grid_view</span>
                            </button>
                            <button
                                onClick={() => setGridView(false)}
                                className={`p-1.5 rounded-lg transition-colors ${!gridView ? "text-black bg-gray-100" : "text-gray-400"} hover:bg-gray-100`}
                            >
                                <span className="material-icons-outlined">view_list</span>
                            </button>
                        </div>
                    </div>

                    {/* Cards or Empty State */}
                    {pageCards.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div ref={cardsRef} className={`${gridView ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}`}>
                            {pageCards.map((prop) => (
                                <PropertyCard key={prop.id} {...prop} />
                            ))}
                        </div>
                    )}

                    {sortedProperties.length > CARDS_PER_PAGE && (
                        <Pagination current={safePage} total={totalPages} onChange={handlePageChange} />
                    )}
                </div>
            </div>
        </section>
    );
};

/* ── Empty State ── */
const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 text-center bg-surface-light rounded-3xl">
        <span className="material-icons-outlined text-5xl text-gray-300 mb-4">home_work</span>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
        <p className="text-sm text-gray-400 max-w-xs">
            Try adjusting your filters — change the rental period, price range, amenities, or bedroom count.
        </p>
    </div>
);

/* ── Sidebar ── */
const Sidebar = ({
    sidebarTab, setSidebarTab,
    longTerm, setLongTerm,
    shortTerm, setShortTerm,
    priceRange, setPriceRange,
    selectedAmenities, toggleAmenity,
    activeBedroom, setActiveBedroom,
    resultCount,
    onFilterChange,
}) => {
    const ref = useGsapReveal({ y: 20, delay: 0.1 });

    return (
        <div ref={ref} className="w-full lg:w-1/4 flex-shrink-0 space-y-8">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold">
                    {resultCount} Result{resultCount !== 1 ? "s" : ""}
                </span>
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                    <span>Show Map</span>
                    <div className="relative inline-block">
                        <input type="checkbox" className="sr-only peer" id="map-toggle" />
                        <div className="w-8 h-4 bg-gray-200 peer-checked:bg-black rounded-full transition-colors cursor-pointer" />
                        <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                    </div>
                </label>
            </div>

            {/* Buy / Sell / Rent */}
            <div className="flex p-1 bg-surface-light rounded-2xl">
                {["Buy", "Sell", "Rent"].map((t) => (
                    <button
                        key={t}
                        onClick={() => { setSidebarTab(t); onFilterChange(); }}
                        className={`flex-1 py-2 text-xs font-medium rounded-full transition-all ${sidebarTab === t
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-500 hover:text-black"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Rental Period */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Rental Period</h3>
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={longTerm}
                            onChange={(e) => { setLongTerm(e.target.checked); onFilterChange(); }}
                            className="form-checkbox rounded text-black focus:ring-black h-4 w-4 border-gray-300"
                        />
                        <span className="text-sm">Long term rent</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={shortTerm}
                            onChange={(e) => { setShortTerm(e.target.checked); onFilterChange(); }}
                            className="form-checkbox rounded text-black focus:ring-black h-4 w-4 border-gray-300"
                        />
                        <span className="text-sm text-gray-500">Short term rent</span>
                    </label>
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Range Price</h3>
                <input
                    type="range"
                    min="300"
                    max="7000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => { setPriceRange(Number(e.target.value)); onFilterChange(); }}
                    className="w-full h-1 bg-gray-200 appearance-none rounded-full accent-black cursor-pointer"
                />
                <div className="flex justify-between mt-3">
                    <div className="bg-surface-light px-4 py-2 rounded-full text-sm font-medium">$300</div>
                    <span className="self-center text-gray-400 text-xs">To</span>
                    <div className="bg-surface-light px-4 py-2 rounded-full text-sm font-medium">${priceRange.toLocaleString()}</div>
                </div>
            </div>

            {/* Amenities */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                    {["Pool", "Garden", "Garage", "Gym"].map((a) => (
                        <AmenityChip
                            key={a}
                            label={a}
                            checked={selectedAmenities.includes(a)}
                            onChange={() => { toggleAmenity(a); onFilterChange(); }}
                        />
                    ))}
                </div>
            </div>

            {/* Bedrooms */}
            <div>
                <h3 className="font-bold mb-4 text-sm">Bedrooms</h3>
                <div className="flex bg-surface-light rounded-2xl p-1">
                    {["Any", "1", "2", "3", "4", "5+"].map((n) => (
                        <button
                            key={n}
                            onClick={() => { setActiveBedroom(n); onFilterChange(); }}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${activeBedroom === n
                                ? "bg-white shadow-sm font-bold"
                                : "text-gray-500 hover:text-black"
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

/* ── Amenity Chip ── */
const AmenityChip = ({ label, checked, onChange }) => (
    <button
        onClick={onChange}
        className={`px-3 py-1.5 border rounded-full text-xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 ${checked
            ? "border-black bg-black text-white"
            : "border-gray-200 hover:border-black"
            }`}
    >
        {label}
        <span className={`material-icons-outlined text-[10px] ${checked ? "bg-white text-black" : ""} rounded-full p-[1px]`}>check</span>
    </button>
);

/* ── Featured Listing (large, detail-preview card) ── */
const FeaturedListing = ({
    id, title, description, features, price, period,
    location, area, beds, baths,
    agentName, agentImg, images,
}) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [shareMsg, setShareMsg] = useState(false);

    const handleShare = (e) => {
        e.stopPropagation();
        navigator.clipboard?.writeText(window.location.origin + `/properties/${id}`);
        setShareMsg(true);
        setTimeout(() => setShareMsg(false), 2000);
    };

    const goToDetail = () => navigate(`/properties/${id}`);

    return (
        <div
            className="bg-white overflow-hidden mb-8 property-card cursor-pointer group"
            onClick={goToDetail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToDetail()}
        >
            {/* Photo gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-64 md:h-80 rounded-2xl overflow-hidden">
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={images[0]}
                        alt={title}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 h-64 md:h-80">
                    {images.slice(1, 5).map((src, idx) => (
                        <div key={idx} className="rounded-2xl overflow-hidden">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src={src}
                                alt={`${title} detail ${idx + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-700 transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 max-w-lg mb-4">{description}</p>
                <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-xs text-gray-500 mb-6">
                    {features.map((f) => (
                        <span key={f} className="flex items-center">
                            <span className="material-icons-outlined text-sm mr-1 text-green-600">check</span> {f}
                        </span>
                    ))}
                </div>

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
                                onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
                                className={`transition-all hover:scale-125 active:scale-95 ${liked ? "text-red-500" : ""}`}
                            >
                                <span className="material-icons-outlined text-lg">{liked ? "favorite" : "favorite_border"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-3 bg-surface-light pr-4 py-1.5 rounded-full pl-1.5">
                        <img className="w-8 h-8 rounded-full object-cover" src={agentImg} alt={agentName} />
                        <span className="text-xs font-bold">Agent: {agentName}</span>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); goToDetail(); }}
                        className="bg-black text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold flex items-center gap-3 hover:bg-gray-800 active:scale-95 transition-all"
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

/* ── Property Card (small grid card) ── */
const PropertyCard = ({ id, image, title, description, priceRange, type, location, beds, featured }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);

    const goToDetail = () => navigate(`/properties/${id}`);

    return (
        <div
            className="property-card group cursor-pointer"
            onClick={goToDetail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToDetail()}
        >
            <div className="h-64 rounded-2xl overflow-hidden mb-4 relative">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={image}
                    alt={title}
                />
                <button
                    onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
                    className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md transition-all hover:scale-110 active:scale-95 ${liked ? "text-red-500" : ""}`}
                >
                    <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>{liked ? "favorite" : "favorite_border"}</span>
                </button>
                {type && (
                    <span className={`absolute top-3 left-3 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full ${featured ? "bg-black/80 text-white" : "bg-white/90 text-gray-700"}`}>
                        {type}
                    </span>
                )}
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-gray-700 transition-colors">{title}</h3>
            {location && (
                <div className="flex items-center text-xs text-gray-400 mb-1">
                    <span className="material-icons-outlined text-sm mr-1">location_on</span> {location}
                </div>
            )}
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{description}</p>
            <div className="flex justify-between items-center mt-3">
                <div>
                    <span className="text-sm font-bold text-gray-900">{priceRange}</span>
                    {beds && <span className="ml-2 text-xs text-gray-400">{beds} bed{beds !== 1 ? "s" : ""}</span>}
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); goToDetail(); }}
                    className="group/btn flex items-center gap-2 border border-gray-200 hover:bg-black hover:border-black hover:text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                >
                    Book Now
                    <span className="w-7 h-7 flex items-center justify-center bg-black text-white group-hover/btn:bg-white group-hover/btn:text-black rounded-full flex-shrink-0 transition-colors duration-200">
                        <span className="material-icons-outlined -rotate-45" style={{ fontSize: "15px", lineHeight: 1 }}>arrow_forward</span>
                    </span>
                </button>
            </div>
        </div>
    );
};

/* ── Pagination ── */
const Pagination = ({ current, total, onChange }) => (
    <div className="flex justify-end pt-8">
        <div className="flex items-center gap-1">
            <button
                onClick={() => onChange(Math.max(1, current - 1))}
                disabled={current === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
            >
                <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>chevron_left</span>
            </button>
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <button
                    key={n}
                    onClick={() => onChange(n)}
                    className={`w-8 h-8 flex items-center justify-center text-xs rounded-full font-semibold transition-all active:scale-90 ${current === n
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-400 hover:bg-gray-100 hover:text-black"
                        }`}
                >
                    {n}
                </button>
            ))}
            <button
                onClick={() => onChange(Math.min(total, current + 1))}
                disabled={current === total}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
            >
                <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>chevron_right</span>
            </button>
        </div>
    </div>
);

export default PropertyGrid;
