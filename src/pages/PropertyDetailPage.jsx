import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ALL_PROPERTIES } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─────────────────────────────────────
   PropertyDetailPage
   Matches design from image 3:
   – Gallery: 1 large + 2×2 grid
   – Title, description, feature checklist
   – Price / area / beds / baths bar
   – Agent chip + Send a request button
───────────────────────────────────── */
const PropertyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const property = ALL_PROPERTIES.find((p) => p.id === Number(id));

    const [liked, setLiked] = useState(false);
    const [shareMsg, setShareMsg] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => { window.scrollTo({ top: 0 }); }, [id]);

    if (!property) {
        return (
            <div className="min-h-screen bg-background-light">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-40">
                    <span className="material-icons-outlined text-6xl text-gray-200 mb-4">home_work</span>
                    <h2 className="text-2xl font-bold mb-2 text-gray-700">Property not found</h2>
                    <p className="text-gray-400 mb-8">This listing may have been removed or doesn't exist.</p>
                    <Link
                        to="/properties"
                        className="px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all"
                    >
                        Browse All Properties
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const {
        title, description, features, price, period, priceRange,
        location, area, beds, baths, type,
        agentName, agentImg, images, amenities,
    } = property;

    const handleShare = () => {
        navigator.clipboard?.writeText(window.location.href);
        setShareMsg(true);
        setTimeout(() => setShareMsg(false), 2000);
    };

    const handleRequest = () => {
        setRequestSent(true);
        setTimeout(() => setRequestSent(false), 3000);
    };

    // Related listings (same type, different id)
    const related = ALL_PROPERTIES.filter((p) => p.type === type && p.id !== property.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <span className="material-icons-outlined text-[14px]">chevron_right</span>
                    <Link to="/properties" className="hover:text-black transition-colors">Properties</Link>
                    <span className="material-icons-outlined text-[14px]">chevron_right</span>
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">{title}</span>
                </div>

                {/* ── Photo Gallery ── */}
                <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-4 mb-8">
                    {/* Main large image */}
                    <div
                        className="rounded-3xl overflow-hidden cursor-zoom-in group"
                        style={{ height: "420px" }}
                    >
                        <img
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={images[activeImg]}
                            alt={title}
                        />
                    </div>

                    {/* 2×2 small grid */}
                    <div className="grid grid-cols-2 gap-4" style={{ height: "420px" }}>
                        {images.slice(1, 5).map((src, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveImg(idx + 1)}
                                className={`rounded-2xl overflow-hidden cursor-pointer group relative ${activeImg === idx + 1 ? "ring-2 ring-black ring-offset-2" : ""
                                    }`}
                            >
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    src={src}
                                    alt={`${title} view ${idx + 2}`}
                                />
                                {/* Photo counter on last thumb */}
                                {idx === 3 && images.length > 5 && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                                        <span className="text-white text-sm font-bold">+{images.length - 5} more</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
                    {images.map((src, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImg(idx)}
                            className={`flex-shrink-0 w-16 h-14 rounded-xl overflow-hidden transition-all ${activeImg === idx ? "ring-2 ring-black ring-offset-1 opacity-100" : "opacity-50 hover:opacity-80"}`}
                        >
                            <img className="w-full h-full object-cover" src={src} alt="" />
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
                    {/* ── Left: details ── */}
                    <div>
                        {/* Type badge + title */}
                        <div className="flex items-center gap-3 mb-2">
                            {type && (
                                <span className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-600">{type}</span>
                            )}
                            {amenities?.map((a) => (
                                <span key={a} className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">{a}</span>
                            ))}
                        </div>
                        <h1 className="text-4xl font-bold mb-3 leading-tight">{title}</h1>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-sm text-gray-400 mb-6">
                            <span className="material-icons-outlined text-base">location_on</span>
                            {location}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-2xl">{description}</p>

                        {/* Features checklist */}
                        {features?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-base font-bold mb-4 text-gray-800">Key Features</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-sm text-gray-600">
                                    {features.map((f) => (
                                        <span key={f} className="flex items-center gap-2">
                                            <span className="material-icons-outlined text-green-600" style={{ fontSize: "18px" }}>check_circle</span>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stats bar */}
                        <div className="flex flex-wrap items-center gap-6 py-5 border-y border-gray-100 mb-8 text-sm font-medium">
                            {area && (
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="material-icons-outlined text-gray-400" style={{ fontSize: "18px" }}>square_foot</span>
                                    {area}
                                </span>
                            )}
                            {beds && (
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="material-icons-outlined text-gray-400" style={{ fontSize: "18px" }}>bed</span>
                                    <strong>{beds}</strong> Bedrooms
                                </span>
                            )}
                            {baths && (
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="material-icons-outlined text-gray-400" style={{ fontSize: "18px" }}>bathtub</span>
                                    <strong>{baths}</strong> Bathrooms
                                </span>
                            )}
                            <div className="ml-auto flex items-center gap-4">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors active:scale-95"
                                >
                                    <span className="material-icons-outlined" style={{ fontSize: "18px" }}>share</span>
                                    {shareMsg ? "Link Copied!" : "Share"}
                                </button>
                                <button
                                    onClick={() => setLiked((l) => !l)}
                                    className={`flex items-center gap-1.5 text-sm transition-all hover:scale-110 active:scale-95 ${liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
                                >
                                    <span className="material-icons-outlined" style={{ fontSize: "18px" }}>{liked ? "favorite" : "favorite_border"}</span>
                                    {liked ? "Saved" : "Save"}
                                </button>
                            </div>
                        </div>

                        {/* Back + Browse links */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-black hover:text-black transition-all active:scale-95"
                            >
                                <span className="material-icons-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
                                Go Back
                            </button>
                            <Link
                                to="/properties"
                                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-black hover:text-black transition-all active:scale-95"
                            >
                                Browse all listings
                            </Link>
                        </div>
                    </div>

                    {/* ── Right: sticky price + CTA card ── */}
                    <div className="lg:sticky lg:top-28 self-start">
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                            {/* Price header */}
                            <div className="bg-black text-white px-7 py-6">
                                <div className="flex items-end gap-1.5 mb-1">
                                    <span className="text-4xl font-bold">{price}</span>
                                    <span className="text-gray-400 text-sm mb-1">/{period}</span>
                                </div>
                                <p className="text-gray-400 text-xs">Price range: {priceRange}</p>
                            </div>

                            {/* Body */}
                            <div className="px-7 py-6">
                                <div className="flex items-center gap-4 mb-6">
                                    {area && (
                                        <div className="flex-1 text-center py-3 bg-gray-50 rounded-2xl">
                                            <p className="text-xs text-gray-400 mb-0.5">Area</p>
                                            <p className="text-sm font-bold">{area}</p>
                                        </div>
                                    )}
                                    {beds && (
                                        <div className="flex-1 text-center py-3 bg-gray-50 rounded-2xl">
                                            <p className="text-xs text-gray-400 mb-0.5">Beds</p>
                                            <p className="text-sm font-bold">{beds}</p>
                                        </div>
                                    )}
                                    {baths && (
                                        <div className="flex-1 text-center py-3 bg-gray-50 rounded-2xl">
                                            <p className="text-xs text-gray-400 mb-0.5">Baths</p>
                                            <p className="text-sm font-bold">{baths}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Agent */}
                                <div className="flex items-center gap-3 mb-6 bg-gray-50 rounded-2xl px-4 py-3">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                        src={agentImg}
                                        alt={agentName}
                                    />
                                    <div>
                                        <p className="text-xs text-gray-400">Your Agent</p>
                                        <p className="text-sm font-bold">{agentName}</p>
                                    </div>
                                    <button className="ml-auto w-8 h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 active:scale-95 transition-all flex-shrink-0">
                                        <span className="material-icons-outlined" style={{ fontSize: "16px" }}>chat_bubble_outline</span>
                                    </button>
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={handleRequest}
                                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95 ${requestSent
                                        ? "bg-green-600 text-white"
                                        : "bg-black text-white hover:bg-gray-800"
                                        }`}
                                >
                                    <span>{requestSent ? "Request Sent! ✓" : "Send a request"}</span>
                                    {!requestSent && (
                                        <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full flex-shrink-0">
                                            <span className="material-icons-outlined -rotate-45" style={{ fontSize: "15px", lineHeight: 1 }}>arrow_forward</span>
                                        </span>
                                    )}
                                </button>

                                <p className="text-xs text-gray-400 text-center mt-3">
                                    Free consultation · No commitment required
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related Properties ── */}
                {related.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-gray-100">
                        <h2 className="text-2xl font-bold mb-8">Similar {type} Properties</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((p) => (
                                <RelatedCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

/* ── Related Property Card ── */
const RelatedCard = ({ id, image, title, priceRange, location, beds, type, featured }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);

    return (
        <div
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => navigate(`/properties/${id}`)}
        >
            <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={image}
                    alt={title}
                />
                {type && (
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${featured ? "bg-black/80 text-white" : "bg-white/90 text-gray-800"}`}>
                        {type}
                    </span>
                )}
                <button
                    onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm transition-all hover:scale-110 ${liked ? "text-red-500" : "text-gray-400"}`}
                >
                    <span className="material-icons-outlined" style={{ fontSize: "15px" }}>{liked ? "favorite" : "favorite_border"}</span>
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-base font-bold mb-1 truncate">{title}</h3>
                {location && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <span className="material-icons-outlined" style={{ fontSize: "13px" }}>location_on</span>
                        {location}
                    </div>
                )}
                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                    <span className="text-sm font-bold">{priceRange}</span>
                    {beds && <span className="text-xs text-gray-400">{beds} bed{beds !== 1 ? "s" : ""}</span>}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
