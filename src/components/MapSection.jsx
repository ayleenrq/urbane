import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useGsapSlide } from "../hooks/useGsapReveal";

/* ── Import Leaflet CSS once ── */
import "leaflet/dist/leaflet.css";

/* ── South Jakarta properties ── */
const PROPERTIES = [
    {
        id: 1,
        lat: -6.2615,
        lng: 106.8106,
        price: "$780,000",
        title: "Villa Kemang",
        beds: 4,
        featured: true,
    },
    {
        id: 2,
        lat: -6.2898,
        lng: 106.7868,
        price: "$512,000",
        title: "Pondok Indah Residence",
        beds: 3,
        featured: false,
    },
    {
        id: 3,
        lat: -6.2271,
        lng: 106.8087,
        price: "$1.2M",
        title: "SCBD Luxury Suite",
        beds: 2,
        featured: false,
    },
    {
        id: 4,
        lat: -6.2480,
        lng: 106.8220,
        price: "$890,000",
        title: "Kebayoran Estate",
        beds: 5,
        featured: false,
    },
    {
        id: 5,
        lat: -6.2760,
        lng: 106.7940,
        price: "$650,000",
        title: "Cipete Garden Villa",
        beds: 4,
        featured: false,
    },
];

/* ── Build custom Leaflet icons ── */
const makeNumberIcon = (num, featured) =>
    L.divIcon({
        className: "",
        html: featured
            ? `<div style="
                width:44px;height:28px;background:#111;color:#fff;
                border-radius:14px;display:flex;align-items:center;justify-content:center;
                font-size:11px;font-weight:700;font-family:system-ui,sans-serif;
                box-shadow:0 4px 12px rgba(0,0,0,0.22);
                white-space:nowrap;padding:0 10px;letter-spacing:0.01em;
              ">${num}</div>`
            : `<div style="
                width:32px;height:32px;background:#fff;color:#111;
                border-radius:50%;display:flex;align-items:center;justify-content:center;
                font-size:13px;font-weight:700;font-family:system-ui,sans-serif;
                box-shadow:0 3px 10px rgba(0,0,0,0.18);border:2px solid #e5e7eb;
              ">${num}</div>`,
        iconSize: featured ? [44, 28] : [32, 32],
        iconAnchor: featured ? [22, 14] : [16, 16],
        popupAnchor: [0, -20],
    });

/* ── Smooth fly-to on first load ── */
const FlyToCenter = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.2 });
    }, [map, center, zoom]);
    return null;
};

const CENTER = [-6.2600, 106.8050];
const ZOOM = 13;

const MapSection = () => {
    const [requested, setRequested] = useState(false);
    const leftRef = useGsapSlide("left");
    const rightRef = useGsapSlide("right");

    const handleRequest = () => {
        setRequested(true);
        setTimeout(() => setRequested(false), 3000);
    };

    return (
        <section id="map" className="bg-surface-light dark:bg-surface-dark py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* ── Map ── */}
                    <div
                        ref={leftRef}
                        className="relative h-[360px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800"
                    >
                        <MapContainer
                            center={CENTER}
                            zoom={ZOOM}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            style={{ width: "100%", height: "100%" }}
                            attributionControl={false}
                        >
                            {/* CartoDB Voyager — clean, modern tile style */}
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                maxZoom={19}
                            />

                            <FlyToCenter center={CENTER} zoom={ZOOM} />

                            {PROPERTIES.map((p) => (
                                <Marker
                                    key={p.id}
                                    position={[p.lat, p.lng]}
                                    icon={makeNumberIcon(p.featured ? p.price : p.id, p.featured)}
                                >
                                    <Popup
                                        closeButton={false}
                                        className="urbane-popup"
                                        offset={[0, -8]}
                                    >
                                        <div style={{
                                            minWidth: 180,
                                            fontFamily: "system-ui, sans-serif",
                                            padding: "4px 2px",
                                        }}>
                                            <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                                                South Jakarta · {p.beds} beds
                                            </p>
                                            <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px", color: "#111" }}>
                                                {p.title}
                                            </p>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 10px" }}>
                                                {p.price}
                                            </p>
                                            <button
                                                onClick={() => alert(`Enquiring about ${p.title}…`)}
                                                style={{
                                                    background: "#111", color: "#fff",
                                                    border: "none", borderRadius: 999,
                                                    padding: "7px 14px", fontSize: 11,
                                                    fontWeight: 700, cursor: "pointer",
                                                    width: "100%",
                                                }}
                                            >
                                                View Property →
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Attribution badge */}
                        <div className="absolute bottom-2 right-2 z-[1000] bg-white/80 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] text-gray-400 pointer-events-none">
                            © OpenStreetMap · CartoDB
                        </div>

                        {/* Area label */}
                        <div className="absolute top-3 left-3 z-[1000] bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow pointer-events-none">
                            <span className="material-icons-outlined align-middle mr-1" style={{ fontSize: 13 }}>location_on</span>
                            South Jakarta, ID
                        </div>
                    </div>

                    {/* ── CTA ── */}
                    <div ref={rightRef}>
                        <h2 className="text-4xl font-semibold mb-4">
                            Discover Best Properties <br /> Tailored to You
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                            Browse {PROPERTIES.length} available listings in South Jakarta — from modern condos
                            to luxury villas. Click any marker on the map to explore.
                        </p>

                        {/* Mini legend */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="w-5 h-5 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[10px] font-bold text-black">1</span>
                                Property listing
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="px-2 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">$780K</span>
                                Featured listing
                            </div>
                        </div>

                        <button
                            onClick={handleRequest}
                            className={`pl-5 pr-2 py-2 rounded-full font-medium flex items-center gap-3 transition-all duration-300 active:scale-95 ${requested
                                    ? "bg-green-600 text-white"
                                    : "bg-primary hover:bg-primary-hover text-white"
                                }`}
                        >
                            {requested ? (
                                <>
                                    <span className="material-icons-outlined" style={{ fontSize: "18px", lineHeight: 1 }}>check_circle</span>
                                    Request Sent!
                                </>
                            ) : (
                                <>
                                    Send a request
                                    <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-full flex-shrink-0">
                                        <span className="material-icons-outlined -rotate-45" style={{ fontSize: "16px", lineHeight: 1 }}>arrow_forward</span>
                                    </span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MapSection;
