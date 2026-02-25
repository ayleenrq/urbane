import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ALL_PROPERTIES } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AMENITY_OPTIONS = ["Pool", "Garden", "Garage", "Gym"];
const TYPE_FILTERS = ["All", "House", "Residential", "Apartment", "Villa"];
const CARDS_PER_PAGE = 8;

/* ─────────────────────────────────────
   PropertiesPage
───────────────────────────────────── */
const PropertiesPage = () => {
    const [searchParams] = useSearchParams();

    const [tab, setTab] = useState(searchParams.get("tab") || "Rent");
    const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "All");
    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("price") ? Number(searchParams.get("price")) : 5000
    );
    const [bedsFilter, setBedsFilter] = useState(searchParams.get("rooms") || "Any");
    const [longTerm, setLongTerm] = useState(true);
    const [shortTerm, setShortTerm] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [gridView, setGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState({
        type: searchParams.get("lookingFor") || "",
        location: searchParams.get("location") || "",
    });

    useEffect(() => { window.scrollTo({ top: 0 }); }, []);

    const toggleAmenity = (a) =>
        setSelectedAmenities((prev) =>
            prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
        );
    const resetPage = () => setCurrentPage(1);

    /* ── Filter ── */
    const filtered = useMemo(() => {
        return ALL_PROPERTIES.filter((p) => {
            if (!p.tab.includes(tab)) return false;
            if (typeFilter !== "All" && p.type !== typeFilter) return false;
            if (longTerm || shortTerm) {
                const allowed = [];
                if (longTerm) allowed.push("Long term");
                if (shortTerm) allowed.push("Short term");
                if (!p.rentalPeriod.some((r) => allowed.includes(r))) return false;
            }
            if (p.priceNumeric > maxPrice) return false;
            if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => p.amenities.includes(a))) return false;
            if (bedsFilter !== "Any") {
                if (bedsFilter === "5+") { if (p.beds < 5) return false; }
                else if (p.beds !== parseInt(bedsFilter)) return false;
            }
            if (searchInput.location && !p.location.toLowerCase().includes(searchInput.location.toLowerCase())) return false;
            if (searchInput.type &&
                !p.type.toLowerCase().includes(searchInput.type.toLowerCase()) &&
                !p.title.toLowerCase().includes(searchInput.type.toLowerCase())) return false;
            return true;
        });
    }, [tab, typeFilter, longTerm, shortTerm, maxPrice, selectedAmenities, bedsFilter, searchInput]);

    /* ── Sort ── */
    const sorted = useMemo(() => {
        const arr = [...filtered];
        if (sortBy === "price-asc") arr.sort((a, b) => a.priceNumeric - b.priceNumeric);
        if (sortBy === "price-desc") arr.sort((a, b) => b.priceNumeric - a.priceNumeric);
        return arr;
    }, [filtered, sortBy]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / CARDS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const pageCards = sorted.slice((safePage - 1) * CARDS_PER_PAGE, safePage * CARDS_PER_PAGE);

    const handleReset = () => {
        setTab("Rent"); setTypeFilter("All"); setMaxPrice(5000);
        setBedsFilter("Any"); setLongTerm(true); setShortTerm(false);
        setSelectedAmenities([]); setSortBy("default");
        setSearchInput({ type: "", location: "" });
        resetPage();
    };

    return (
        <div className="min-h-screen bg-background-light">
            <Navbar />

            {/* ── Hero Banner ── */}
            <div className="bg-black text-white py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="material-icons-outlined text-[14px]">chevron_right</span>
                        <span className="text-white font-medium">Properties</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                                Find Your Perfect Property
                            </h1>
                            <p className="text-gray-400 text-base max-w-xl">
                                Browse {ALL_PROPERTIES.length}+ curated listings — filter by type, price, amenities, and more.
                            </p>
                        </div>

                        {/* Inline search inputs */}
                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 max-w-lg w-full">
                            <div className="relative flex-1">
                                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-gray-400" style={{ fontSize: "18px" }}>search</span>
                                </span>
                                <input
                                    value={searchInput.type}
                                    onChange={(e) => { setSearchInput((p) => ({ ...p, type: e.target.value })); resetPage(); }}
                                    placeholder="Search by name or type…"
                                    className="w-full pl-9 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                />
                            </div>
                            <div className="relative flex-1">
                                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-gray-400" style={{ fontSize: "18px" }}>location_on</span>
                                </span>
                                <input
                                    value={searchInput.location}
                                    onChange={(e) => { setSearchInput((p) => ({ ...p, location: e.target.value })); resetPage(); }}
                                    placeholder="City or address…"
                                    className="w-full pl-9 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Type filter chips + result count bar ── */}
            <div className="border-b border-gray-100 bg-white sticky top-[80px] z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3 justify-between">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="flex items-center text-sm font-semibold mr-1 text-gray-700">
                            <span className="material-icons-outlined mr-1 text-[18px]">tune</span> Filter
                        </span>
                        {TYPE_FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => { setTypeFilter(f); resetPage(); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 border ${typeFilter === f
                                    ? "bg-black text-white border-black"
                                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium flex-shrink-0">
                        <strong className="text-black">{sorted.length}</strong> propert{sorted.length !== 1 ? "ies" : "y"} found
                    </span>
                </div>
            </div>

            {/* ── Main layout ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ── Sidebar ── */}
                    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
                        <div className="sticky top-[136px] space-y-7">

                            {/* Buy / Sell / Rent */}
                            <div>
                                <h3 className="font-bold mb-3 text-sm text-gray-800">Listing Type</h3>
                                <div className="flex p-1 bg-surface-light rounded-2xl">
                                    {["Buy", "Sell", "Rent"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => { setTab(t); resetPage(); }}
                                            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${tab === t
                                                ? "bg-black text-white shadow-sm"
                                                : "text-gray-500 hover:text-black"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rental Period */}
                            <div>
                                <h3 className="font-bold mb-3 text-sm text-gray-800">Rental Period</h3>
                                <div className="flex flex-col space-y-2.5">
                                    <label className="flex items-center space-x-2.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={longTerm}
                                            onChange={(e) => { setLongTerm(e.target.checked); resetPage(); }}
                                            className="form-checkbox rounded text-black focus:ring-black h-4 w-4 border-gray-300 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700">Long term rent</span>
                                    </label>
                                    <label className="flex items-center space-x-2.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={shortTerm}
                                            onChange={(e) => { setShortTerm(e.target.checked); resetPage(); }}
                                            className="form-checkbox rounded text-black focus:ring-black h-4 w-4 border-gray-300 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-500">Short term rent</span>
                                    </label>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-bold mb-3 text-sm text-gray-800">Max Price / mo</h3>
                                <input
                                    type="range"
                                    min="300"
                                    max="7000"
                                    step="100"
                                    value={maxPrice}
                                    onChange={(e) => { setMaxPrice(Number(e.target.value)); resetPage(); }}
                                    className="w-full h-1 bg-gray-200 appearance-none rounded-full accent-black cursor-pointer"
                                />
                                <div className="flex justify-between mt-3">
                                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600">$300</span>
                                    <span className="self-center text-gray-400 text-xs">to</span>
                                    <span className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold">${maxPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <h3 className="font-bold mb-3 text-sm text-gray-800">Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {AMENITY_OPTIONS.map((a) => {
                                        const active = selectedAmenities.includes(a);
                                        return (
                                            <button
                                                key={a}
                                                onClick={() => { toggleAmenity(a); resetPage(); }}
                                                className={`px-3.5 py-1.5 border rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer transition-all active:scale-95 ${active
                                                    ? "border-black bg-black text-white"
                                                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                                                    }`}
                                            >
                                                {a}
                                                {active && (
                                                    <span className="material-icons-outlined text-[9px] bg-white text-black rounded-full p-[1px] ml-0.5">check</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bedrooms */}
                            <div>
                                <h3 className="font-bold mb-3 text-sm text-gray-800">Bedrooms</h3>
                                <div className="flex bg-gray-100 rounded-2xl p-1 gap-0.5">
                                    {["Any", "1", "2", "3", "4", "5+"].map((n) => (
                                        <button
                                            key={n}
                                            onClick={() => { setBedsFilter(n); resetPage(); }}
                                            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${bedsFilter === n
                                                ? "bg-white shadow-sm text-black"
                                                : "text-gray-400 hover:text-gray-700"
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Reset */}
                            <button
                                onClick={handleReset}
                                className="w-full py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-500 hover:border-black hover:text-black transition-all active:scale-95"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </aside>

                    {/* ── Main content ── */}
                    <div className="flex-1 min-w-0">

                        {/* Sort / View Bar */}
                        <div className="flex justify-between items-center pb-5 mb-6 border-b border-gray-100">
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => { setSortBy(e.target.value); resetPage(); }}
                                    className="appearance-none pl-4 pr-9 py-2 text-sm font-medium bg-white border border-gray-200 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-black hover:border-gray-400 transition-colors"
                                >
                                    <option value="default">Sort by: Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                                <span className="material-icons-outlined text-sm absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setGridView(true)}
                                    className={`p-1.5 rounded-lg transition-all ${gridView ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-700"}`}
                                    title="Grid view"
                                >
                                    <span className="material-icons-outlined" style={{ fontSize: "20px" }}>grid_view</span>
                                </button>
                                <button
                                    onClick={() => setGridView(false)}
                                    className={`p-1.5 rounded-lg transition-all ${!gridView ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-700"}`}
                                    title="List view"
                                >
                                    <span className="material-icons-outlined" style={{ fontSize: "20px" }}>view_list</span>
                                </button>
                            </div>
                        </div>

                        {/* Cards */}
                        {pageCards.length === 0 ? (
                            <EmptyState onReset={handleReset} />
                        ) : gridView ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                                {pageCards.map((prop) => (
                                    <PropertyCardGrid key={prop.id} {...prop} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                {pageCards.map((prop) => (
                                    <PropertyCardList key={prop.id} {...prop} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {sorted.length > CARDS_PER_PAGE && (
                            <Pagination current={safePage} total={totalPages} onChange={setCurrentPage} />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

/* ─────────────────────────────────────
   Property Card — GRID (large, image 2 style)
───────────────────────────────────── */
const PropertyCardGrid = ({ id, image, title, description, price, priceRange, type, location, beds, baths, area, featured }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const goToDetail = () => navigate(`/properties/${id}`);

    return (
        <div onClick={goToDetail} className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-350 hover:-translate-y-1">
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: "280px" }}>
                <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={image}
                    alt={title}
                />
                {/* Type badge top-left */}
                {type && (
                    <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm ${featured
                        ? "bg-black/80 text-white"
                        : "bg-white/95 text-gray-800"
                        }`}>
                        {type}
                    </span>
                )}
                {/* Heart button top-right */}
                <button
                    onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
                    className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md transition-all hover:scale-110 active:scale-95 z-10 ${liked ? "text-red-500" : "text-gray-400"}`}
                >
                    <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>
                        {liked ? "favorite" : "favorite_border"}
                    </span>
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">{title}</h3>

                {/* Location */}
                {location && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <span className="material-icons-outlined" style={{ fontSize: "14px" }}>location_on</span>
                        {location}
                    </div>
                )}

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{description}</p>

                {/* Stats row */}
                {(beds || baths || area) && (
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-50">
                        {beds && (
                            <span className="flex items-center gap-1">
                                <span className="material-icons-outlined" style={{ fontSize: "14px" }}>bed</span>
                                {beds} Beds
                            </span>
                        )}
                        {baths && (
                            <span className="flex items-center gap-1">
                                <span className="material-icons-outlined" style={{ fontSize: "14px" }}>bathtub</span>
                                {baths} Baths
                            </span>
                        )}
                        {area && (
                            <span className="flex items-center gap-1">
                                <span className="material-icons-outlined" style={{ fontSize: "14px" }}>square_foot</span>
                                {area}
                            </span>
                        )}
                    </div>
                )}

                {/* Price + Book Now */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-base font-bold text-gray-900">{priceRange || price}</span>
                    {beds && <span className="text-xs text-gray-400">{beds} bed{beds !== 1 ? "s" : ""}</span>}
                    <button
                        onClick={(e) => { e.stopPropagation(); goToDetail(); }}
                        className="group/btn flex items-center gap-2 border border-gray-200 hover:bg-black hover:border-black hover:text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                    >
                        Book Now
                        <span className="w-7 h-7 flex items-center justify-center bg-black text-white group-hover/btn:bg-white group-hover/btn:text-black rounded-full flex-shrink-0 transition-colors duration-200">
                            <span className="material-icons-outlined -rotate-45" style={{ fontSize: "14px", lineHeight: 1 }}>arrow_forward</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────
   Property Card — LIST view
───────────────────────────────────── */
const PropertyCardList = ({ id, image, title, description, price, priceRange, type, location, beds, baths, area, featured }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const goToDetail = () => navigate(`/properties/${id}`);

    return (
        <div onClick={goToDetail} className="group flex gap-0 bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            {/* Image */}
            <div className="w-64 flex-shrink-0 relative overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ minHeight: "200px" }}
                    src={image}
                    alt={title}
                />
                {type && (
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${featured ? "bg-black/80 text-white" : "bg-white/95 text-gray-800"}`}>
                        {type}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-gray-900 leading-snug">{title}</h3>
                        <button
                            onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
                            className={`ml-3 flex-shrink-0 transition-all hover:scale-125 active:scale-95 ${liked ? "text-red-500" : "text-gray-300"}`}
                        >
                            <span className="material-icons-outlined" style={{ fontSize: "20px" }}>
                                {liked ? "favorite" : "favorite_border"}
                            </span>
                        </button>
                    </div>
                    {location && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                            <span className="material-icons-outlined" style={{ fontSize: "14px" }}>location_on</span>
                            {location}
                        </div>
                    )}
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{description}</p>

                    {(beds || baths || area) && (
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                            {beds && <span className="flex items-center gap-1"><span className="material-icons-outlined" style={{ fontSize: "14px" }}>bed</span>{beds} Beds</span>}
                            {baths && <span className="flex items-center gap-1"><span className="material-icons-outlined" style={{ fontSize: "14px" }}>bathtub</span>{baths} Baths</span>}
                            {area && <span className="flex items-center gap-1"><span className="material-icons-outlined" style={{ fontSize: "14px" }}>square_foot</span>{area}</span>}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <span className="text-base font-bold text-gray-900">{price}</span>
                    <button
                        onClick={(e) => { e.stopPropagation(); goToDetail(); }}
                        className="group/btn flex items-center gap-2 border border-gray-200 hover:bg-black hover:border-black hover:text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold transition-all active:scale-95"
                    >
                        Book Now
                        <span className="w-7 h-7 flex items-center justify-center bg-black text-white group-hover/btn:bg-white group-hover/btn:text-black rounded-full flex-shrink-0 transition-colors">
                            <span className="material-icons-outlined -rotate-45" style={{ fontSize: "14px", lineHeight: 1 }}>arrow_forward</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Empty State ── */
const EmptyState = ({ onReset }) => (
    <div className="flex flex-col items-center justify-center py-28 text-center bg-gray-50 rounded-3xl">
        <span className="material-icons-outlined text-6xl text-gray-200 mb-4">home_work</span>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties match your filters</h3>
        <p className="text-sm text-gray-400 max-w-xs mb-7">
            Try adjusting the listing type, price range, amenities, or bedroom count.
        </p>
        <button
            onClick={onReset}
            className="px-7 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all"
        >
            Reset Filters
        </button>
    </div>
);

/* ── Pagination ── */
const Pagination = ({ current, total, onChange }) => (
    <div className="flex justify-center pt-12 gap-1.5">
        <button
            onClick={() => onChange(Math.max(1, current - 1))}
            disabled={current === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all border border-gray-200"
        >
            <span className="material-icons-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <button
                key={n}
                onClick={() => onChange(n)}
                className={`w-10 h-10 flex items-center justify-center text-sm rounded-full font-semibold transition-all active:scale-90 ${current === n
                    ? "bg-black text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-100 hover:text-black border border-gray-200"
                    }`}
            >
                {n}
            </button>
        ))}
        <button
            onClick={() => onChange(Math.min(total, current + 1))}
            disabled={current === total}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all border border-gray-200"
        >
            <span className="material-icons-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
        </button>
    </div>
);

export default PropertiesPage;
