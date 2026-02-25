import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Buy"); // Buy | Sell | Rent
    const [searchValues, setSearchValues] = useState({
        type: "",
        location: "",
        price: "",
        rooms: "",
    });
    const [activeFilter, setActiveFilter] = useState("All");
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return next;
        });
    };

    return (
        <AppContext.Provider
            value={{
                mobileMenuOpen,
                setMobileMenuOpen,
                activeTab,
                setActiveTab,
                searchValues,
                setSearchValues,
                activeFilter,
                setActiveFilter,
                darkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
