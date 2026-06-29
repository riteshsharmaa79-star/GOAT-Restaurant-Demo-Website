import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { DEFAULT_CONTENT, STORAGE_KEY } from "@/lib/content";

const ContentContext = createContext(null);

function deepMerge(target, source) {
    if (Array.isArray(source)) return source;
    if (source && typeof source === "object") {
        const out = { ...target };
        for (const k of Object.keys(source)) {
            out[k] = deepMerge(target?.[k], source[k]);
        }
        return out;
    }
    return source ?? target;
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_CONTENT;
        const parsed = JSON.parse(raw);
        return deepMerge(DEFAULT_CONTENT, parsed);
    } catch {
        return DEFAULT_CONTENT;
    }
}

function saveToStorage(content) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        return true;
    } catch (e) {
        // Likely storage quota exceeded
        console.error("Save failed:", e);
        return false;
    }
}

export function ContentProvider({ children }) {
    const [content, setContent] = useState(() => loadFromStorage());

    // Cross-tab sync
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === STORAGE_KEY) setContent(loadFromStorage());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const update = useCallback((updater) => {
        setContent((prev) => {
            const next =
                typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
            saveToStorage(next);
            return next;
        });
    }, []);

    const reset = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setContent(DEFAULT_CONTENT);
    }, []);

    const value = useMemo(() => ({ content, update, reset }), [content, update, reset]);

    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error("useContent must be used inside ContentProvider");
    return ctx;
}
