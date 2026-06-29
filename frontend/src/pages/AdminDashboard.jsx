import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LogOut,
    Save,
    RotateCcw,
    Upload,
    Plus,
    Trash2,
    ExternalLink,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { useContent } from "@/lib/ContentContext";
import { logout } from "@/lib/auth";
import { fileToCompressedDataURL } from "@/lib/image";
import { ASSETS } from "@/lib/brand";

const TABS = [
    { id: "hero", label: "Hero" },
    { id: "dishes", label: "Signature Dishes" },
    { id: "menu", label: "Menu Items" },
    { id: "about", label: "About" },
];

function Toast({ kind, text, onClose }) {
    if (!text) return null;
    const Icon = kind === "error" ? AlertCircle : CheckCircle2;
    const color = kind === "error" ? "text-red-300 border-red-500/40" : "text-[#C9A96E] border-[#C9A96E]/40";
    return (
        <div
            data-testid="admin-toast"
            className={`fixed top-6 right-6 z-[60] bg-[#1A1410] border ${color} px-5 py-4 flex items-center gap-3 shadow-2xl`}
        >
            <Icon size={18} />
            <span className="font-body text-sm">{text}</span>
            <button onClick={onClose} className="ml-2 text-[#F0E6D3]/60 hover:text-[#F0E6D3]" aria-label="Dismiss">
                ×
            </button>
        </div>
    );
}

function Field({ label, children, testId }) {
    return (
        <label className="block" data-testid={testId}>
            <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E] uppercase mb-2">
                {label}
            </div>
            {children}
        </label>
    );
}

function TextInput(props) {
    return (
        <input
            {...props}
            className={`w-full bg-[#0D0A07] border border-[#C9A96E]/20 focus:border-[#C9A96E] outline-none px-4 py-3 font-body text-[#F0E6D3] placeholder:text-[#F0E6D3]/30 transition-colors ${props.className || ""}`}
        />
    );
}

function TextArea(props) {
    return (
        <textarea
            {...props}
            className={`w-full bg-[#0D0A07] border border-[#C9A96E]/20 focus:border-[#C9A96E] outline-none px-4 py-3 font-body text-[#F0E6D3] placeholder:text-[#F0E6D3]/30 transition-colors leading-relaxed ${props.className || ""}`}
        />
    );
}

function ImageUploader({ value, onChange, testId }) {
    const inputRef = useRef(null);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    const handleFile = async (file) => {
        if (!file) return;
        setBusy(true);
        setErr("");
        try {
            const dataUrl = await fileToCompressedDataURL(file, { maxDim: 1400, quality: 0.82 });
            onChange(dataUrl);
        } catch (e) {
            setErr(e.message || "Upload failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div data-testid={testId}>
            <div className="aspect-[4/3] w-full bg-[#0D0A07] border border-[#C9A96E]/20 overflow-hidden mb-3 relative">
                {value ? (
                    <img src={value} alt="preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#F0E6D3]/40">
                        <ImageIcon size={28} strokeWidth={1.2} />
                        <span className="font-body text-sm mt-2">No image</span>
                    </div>
                )}
                {busy && (
                    <div className="absolute inset-0 bg-[#0D0A07]/80 flex items-center justify-center text-[#C9A96E] font-body text-sm">
                        Processing…
                    </div>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="hidden"
                data-testid={`${testId}-input`}
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={busy}
                data-testid={`${testId}-button`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#C9A96E]/40 text-[#C9A96E] font-body text-xs uppercase tracking-[0.24em] hover:bg-[#C9A96E] hover:text-[#0D0A07] transition-colors disabled:opacity-60"
            >
                <Upload size={14} /> Upload Image
            </button>
            {err && <div className="mt-2 text-sm text-red-400">{err}</div>}
        </div>
    );
}

export default function AdminDashboard() {
    const { content, update, reset } = useContent();
    const navigate = useNavigate();
    const [tab, setTab] = useState("hero");
    const [draft, setDraft] = useState(content);
    const [toast, setToast] = useState({ kind: "success", text: "" });

    const showToast = (kind, text) => {
        setToast({ kind, text });
        setTimeout(() => setToast({ kind, text: "" }), 2600);
    };

    const dirty = JSON.stringify(draft) !== JSON.stringify(content);

    const onSave = () => {
        update(draft);
        showToast("success", "Changes saved live to the site.");
    };

    const onReset = () => {
        if (!window.confirm("Reset all content to defaults? This cannot be undone.")) return;
        reset();
        setDraft({ ...content }); // will sync via context state update on next render
        setTimeout(() => setDraft((d) => d), 50);
        showToast("success", "Content reset to defaults.");
    };

    const onLogout = () => {
        logout();
        navigate("/admin/login", { replace: true });
    };

    // Helpers to mutate draft immutably
    const patchHero = (patch) => setDraft((d) => ({ ...d, hero: { ...d.hero, ...patch } }));
    const patchAbout = (patch) =>
        setDraft((d) => ({ ...d, about: { ...d.about, ...patch } }));
    const patchDish = (idx, patch) =>
        setDraft((d) => ({
            ...d,
            signatureDishes: d.signatureDishes.map((dish, i) =>
                i === idx ? { ...dish, ...patch } : dish
            ),
        }));
    const patchMenuItem = (group, catIdx, itemIdx, patch) =>
        setDraft((d) => ({
            ...d,
            menu: {
                ...d.menu,
                [group]: d.menu[group].map((cat, ci) =>
                    ci !== catIdx
                        ? cat
                        : {
                              ...cat,
                              items: cat.items.map((it, ii) =>
                                  ii !== itemIdx ? it : { ...it, ...patch }
                              ),
                          }
                ),
            },
        }));
    const addMenuItem = (group, catIdx) =>
        setDraft((d) => ({
            ...d,
            menu: {
                ...d.menu,
                [group]: d.menu[group].map((cat, ci) =>
                    ci !== catIdx ? cat : { ...cat, items: [...cat.items, { name: "", price: "" }] }
                ),
            },
        }));
    const removeMenuItem = (group, catIdx, itemIdx) =>
        setDraft((d) => ({
            ...d,
            menu: {
                ...d.menu,
                [group]: d.menu[group].map((cat, ci) =>
                    ci !== catIdx
                        ? cat
                        : { ...cat, items: cat.items.filter((_, ii) => ii !== itemIdx) }
                ),
            },
        }));

    return (
        <main
            data-testid="page-admin-dashboard"
            className="min-h-screen bg-[#0D0A07] text-[#F0E6D3] pb-24"
        >
            <Toast {...toast} onClose={() => setToast({ ...toast, text: "" })} />

            {/* Top bar */}
            <header className="sticky top-0 z-40 bg-[#0D0A07]/95 backdrop-blur-xl border-b border-[#C9A96E]/20">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 border border-[#C9A96E]/40 overflow-hidden">
                            <img src={ASSETS.logo} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="leading-tight">
                            <div className="font-display text-xl text-[#C9A96E]">G.O.A.T.</div>
                            <div className="font-accent text-[9px] tracking-[0.28em] text-[#F0E6D3]/60 uppercase">
                                Admin Console
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="admin-view-site"
                            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-[#F0E6D3]/25 text-[#F0E6D3]/85 font-body text-xs uppercase tracking-[0.22em] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                        >
                            <ExternalLink size={14} /> View Site
                        </Link>
                        <button
                            type="button"
                            onClick={onLogout}
                            data-testid="admin-logout"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-[#C9A96E]/40 text-[#C9A96E] font-body text-xs uppercase tracking-[0.22em] hover:bg-[#C9A96E] hover:text-[#0D0A07] transition-colors"
                        >
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-12">
                {/* Title row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <div className="font-accent text-[10px] tracking-[0.34em] text-[#C9A96E] uppercase">
                            Content Manager
                        </div>
                        <h1 className="font-display italic text-4xl md:text-5xl mt-2">
                            Curate the <span className="text-[#C9A96E]">Experience</span>
                        </h1>
                        <p className="font-body text-sm text-[#F0E6D3]/65 mt-3 max-w-xl">
                            Every change saves to the live site instantly. Use Reset to restore the
                            original content.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onReset}
                            data-testid="admin-reset"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-[#F0E6D3]/25 text-[#F0E6D3]/80 font-body text-xs uppercase tracking-[0.24em] hover:border-red-400/60 hover:text-red-300 transition-colors"
                        >
                            <RotateCcw size={14} /> Reset
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={!dirty}
                            data-testid="admin-save"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#0D0A07] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#F0E6D3] transition-colors disabled:opacity-50"
                        >
                            <Save size={14} /> {dirty ? "Save Changes" : "Saved"}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div
                    role="tablist"
                    data-testid="admin-tabs"
                    className="flex gap-2 overflow-x-auto border-b border-[#C9A96E]/15 mb-10"
                >
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            role="tab"
                            aria-selected={tab === t.id}
                            data-testid={`admin-tab-${t.id}`}
                            onClick={() => setTab(t.id)}
                            className={`px-5 py-3 font-body text-xs uppercase tracking-[0.24em] whitespace-nowrap transition-colors relative ${
                                tab === t.id
                                    ? "text-[#C9A96E]"
                                    : "text-[#F0E6D3]/60 hover:text-[#F0E6D3]"
                            }`}
                        >
                            {t.label}
                            <span
                                className={`absolute left-3 right-3 -bottom-px h-[2px] bg-[#C9A96E] origin-center transition-transform ${
                                    tab === t.id ? "scale-x-100" : "scale-x-0"
                                }`}
                            />
                        </button>
                    ))}
                </div>

                {/* HERO PANEL */}
                {tab === "hero" && (
                    <section data-testid="admin-panel-hero" className="grid gap-6 max-w-3xl">
                        <Field label="Eyebrow Label" testId="admin-hero-eyebrow-field">
                            <TextInput
                                data-testid="admin-hero-eyebrow"
                                value={draft.hero.eyebrow}
                                onChange={(e) => patchHero({ eyebrow: e.target.value })}
                            />
                        </Field>
                        <Field label="Headline" testId="admin-hero-headline-field">
                            <TextInput
                                data-testid="admin-hero-headline"
                                value={draft.hero.headline}
                                onChange={(e) => patchHero({ headline: e.target.value })}
                            />
                        </Field>
                        <Field label="Subtitle" testId="admin-hero-subtitle-field">
                            <TextArea
                                rows={3}
                                data-testid="admin-hero-subtitle"
                                value={draft.hero.subtitle}
                                onChange={(e) => patchHero({ subtitle: e.target.value })}
                            />
                        </Field>
                    </section>
                )}

                {/* DISHES PANEL */}
                {tab === "dishes" && (
                    <section data-testid="admin-panel-dishes" className="grid gap-10">
                        {draft.signatureDishes.map((dish, idx) => (
                            <div
                                key={dish.id}
                                className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-8 bg-[#1A1410] border border-[#C9A96E]/15 p-6 md:p-8"
                                data-testid={`admin-dish-${idx}`}
                            >
                                <ImageUploader
                                    value={dish.image}
                                    onChange={(image) => patchDish(idx, { image })}
                                    testId={`admin-dish-${idx}-image`}
                                />
                                <div className="grid gap-5">
                                    <Field label="Dish Name">
                                        <TextInput
                                            data-testid={`admin-dish-${idx}-name`}
                                            value={dish.name}
                                            onChange={(e) => patchDish(idx, { name: e.target.value })}
                                        />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-5">
                                        <Field label="Price">
                                            <TextInput
                                                data-testid={`admin-dish-${idx}-price`}
                                                value={dish.price}
                                                onChange={(e) => patchDish(idx, { price: e.target.value })}
                                                placeholder="₹ 480"
                                            />
                                        </Field>
                                        <Field label="Tag">
                                            <TextInput
                                                data-testid={`admin-dish-${idx}-tag`}
                                                value={dish.tag}
                                                onChange={(e) => patchDish(idx, { tag: e.target.value })}
                                                placeholder="House Favourite"
                                            />
                                        </Field>
                                    </div>
                                    <Field label="Description">
                                        <TextArea
                                            rows={4}
                                            data-testid={`admin-dish-${idx}-description`}
                                            value={dish.description}
                                            onChange={(e) =>
                                                patchDish(idx, { description: e.target.value })
                                            }
                                        />
                                    </Field>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* MENU PANEL */}
                {tab === "menu" && (
                    <section data-testid="admin-panel-menu" className="grid gap-12">
                        {["veg", "nonVeg"].map((group) => (
                            <div key={group}>
                                <h2 className="font-display italic text-3xl text-[#F0E6D3] mb-6">
                                    {group === "veg" ? "Veg" : "Non-Veg"} Categories
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {draft.menu[group].map((cat, ci) => (
                                        <div
                                            key={cat.category}
                                            data-testid={`admin-cat-${group}-${ci}`}
                                            className="bg-[#1A1410] border border-[#C9A96E]/15 p-6"
                                        >
                                            <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E] uppercase mb-5">
                                                {cat.category}
                                            </div>
                                            <div className="space-y-3">
                                                {cat.items.map((it, ii) => (
                                                    <div
                                                        key={ii}
                                                        className="grid grid-cols-[1fr,110px,40px] gap-2 items-center"
                                                    >
                                                        <TextInput
                                                            data-testid={`admin-item-${group}-${ci}-${ii}-name`}
                                                            value={it.name}
                                                            onChange={(e) =>
                                                                patchMenuItem(group, ci, ii, {
                                                                    name: e.target.value,
                                                                })
                                                            }
                                                            placeholder="Item name"
                                                        />
                                                        <TextInput
                                                            data-testid={`admin-item-${group}-${ci}-${ii}-price`}
                                                            value={it.price}
                                                            onChange={(e) =>
                                                                patchMenuItem(group, ci, ii, {
                                                                    price: e.target.value,
                                                                })
                                                            }
                                                            placeholder="₹"
                                                        />
                                                        <button
                                                            type="button"
                                                            aria-label="Remove item"
                                                            onClick={() =>
                                                                removeMenuItem(group, ci, ii)
                                                            }
                                                            data-testid={`admin-item-${group}-${ci}-${ii}-remove`}
                                                            className="h-full border border-[#F0E6D3]/15 text-[#F0E6D3]/50 hover:text-red-300 hover:border-red-400/40 transition-colors flex items-center justify-center"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addMenuItem(group, ci)}
                                                    data-testid={`admin-cat-${group}-${ci}-add`}
                                                    className="inline-flex items-center gap-2 mt-3 px-3 py-2 text-[#C9A96E] border border-[#C9A96E]/30 hover:bg-[#C9A96E] hover:text-[#0D0A07] font-body text-[11px] uppercase tracking-[0.22em] transition-colors"
                                                >
                                                    <Plus size={12} /> Add Item
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* ABOUT PANEL */}
                {tab === "about" && (
                    <section data-testid="admin-panel-about" className="grid gap-6 max-w-3xl">
                        <Field label="Eyebrow">
                            <TextInput
                                data-testid="admin-about-eyebrow"
                                value={draft.about.eyebrow}
                                onChange={(e) => patchAbout({ eyebrow: e.target.value })}
                            />
                        </Field>
                        <Field label="Heading">
                            <TextInput
                                data-testid="admin-about-heading"
                                value={draft.about.heading}
                                onChange={(e) => patchAbout({ heading: e.target.value })}
                            />
                        </Field>
                        <Field label="Subheading">
                            <TextInput
                                data-testid="admin-about-subheading"
                                value={draft.about.subheading}
                                onChange={(e) => patchAbout({ subheading: e.target.value })}
                            />
                        </Field>
                        <Field label="Body">
                            <TextArea
                                rows={6}
                                data-testid="admin-about-body"
                                value={draft.about.body}
                                onChange={(e) => patchAbout({ body: e.target.value })}
                            />
                        </Field>
                        <Field label="Footnote (highlighted)">
                            <TextArea
                                rows={2}
                                data-testid="admin-about-footnote"
                                value={draft.about.footnote}
                                onChange={(e) => patchAbout({ footnote: e.target.value })}
                            />
                        </Field>
                    </section>
                )}
            </div>
        </main>
    );
}
