import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Drumstick, Martini } from "lucide-react";
import Reveal from "@/components/Reveal";
import { BRAND } from "@/lib/brand";
import { useContent } from "@/lib/ContentContext";

const TABS = [
    { id: "food", label: "Food" },
    { id: "beverages", label: "Beverages" },
];

const SUB_TABS = [
    { id: "veg", label: "Veg", Icon: Leaf },
    { id: "non-veg", label: "Non-Veg", Icon: Drumstick },
];

function CategoryCard({ category, items, delay }) {
    return (
        <Reveal delay={delay}>
            <div
                data-testid={`menu-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="card-glow bg-[#0D0A07] border border-[#C9A96E]/15 p-8 md:p-10 h-full"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-[#C9A96E]" />
                    <h3 className="font-accent text-[11px] tracking-[0.34em] text-[#C9A96E] uppercase">
                        {category}
                    </h3>
                </div>
                <ul className="space-y-4">
                    {items.map((item, idx) => (
                        <li
                            key={`${item.name}-${idx}`}
                            data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex items-baseline justify-between gap-4 group"
                        >
                            <span className="font-display text-xl md:text-2xl text-[#F0E6D3] group-hover:text-[#C9A96E] transition-colors">
                                {item.name}
                            </span>
                            <span className="flex-1 border-b border-dotted border-[#C9A96E]/15 mb-2" />
                            <span className="font-display text-base md:text-lg text-[#C9A96E]/85 shrink-0">
                                {item.price?.trim() ? item.price : "Chef's"}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </Reveal>
    );
}

export default function Menu() {
    const { content } = useContent();
    const [tab, setTab] = useState("food");
    const [subTab, setSubTab] = useState("veg");

    const foodList = subTab === "veg" ? content.menu.veg : content.menu.nonVeg;

    return (
        <main data-testid="page-menu" className="bg-[#0D0A07] text-[#F0E6D3] pt-32 pb-24">
            {/* Header */}
            <section className="px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto text-center">
                    <Reveal>
                        <div className="eyebrow mb-5">The Menu</div>
                    </Reveal>
                    <Reveal delay={1}>
                        <h1
                            data-testid="menu-title"
                            className="font-display italic text-5xl md:text-7xl text-[#F0E6D3]"
                        >
                            Crafted With <span className="text-[#C9A96E]">Intention</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={2}>
                        <p className="font-body text-base md:text-lg text-[#F0E6D3]/75 mt-6 max-w-2xl mx-auto">
                            Every dish, every drink — assembled to make an evening
                            unforgettable.
                        </p>
                        <div className="gold-divider mx-auto mt-10" />
                    </Reveal>
                </div>
            </section>

            {/* Tabs */}
            <section className="mt-16 px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <Reveal>
                        <div
                            role="tablist"
                            data-testid="menu-tabs"
                            className="flex justify-center gap-10 md:gap-16 border-b border-[#C9A96E]/15 pb-1"
                        >
                            {TABS.map((t) => (
                                <button
                                    key={t.id}
                                    role="tab"
                                    aria-selected={tab === t.id}
                                    data-testid={`menu-tab-${t.id}`}
                                    onClick={() => setTab(t.id)}
                                    className={`relative pb-4 font-display italic text-2xl md:text-3xl transition-colors ${
                                        tab === t.id
                                            ? "text-[#C9A96E]"
                                            : "text-[#F0E6D3]/55 hover:text-[#F0E6D3]"
                                    }`}
                                >
                                    {t.label}
                                    <span
                                        className={`absolute left-0 right-0 -bottom-px h-[2px] bg-[#C9A96E] transition-transform duration-500 origin-center ${
                                            tab === t.id ? "scale-x-100" : "scale-x-0"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    {tab === "food" && (
                        <Reveal delay={1}>
                            <div
                                data-testid="menu-subtabs"
                                className="flex justify-center gap-6 md:gap-10 mt-10"
                            >
                                {SUB_TABS.map(({ id, label, Icon }) => (
                                    <button
                                        key={id}
                                        data-testid={`menu-subtab-${id}`}
                                        onClick={() => setSubTab(id)}
                                        className={`inline-flex items-center gap-2 px-5 py-2 border text-xs uppercase tracking-[0.24em] transition-all ${
                                            subTab === id
                                                ? "border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/10"
                                                : "border-[#C9A96E]/25 text-[#F0E6D3]/70 hover:border-[#C9A96E]/60 hover:text-[#F0E6D3]"
                                        }`}
                                    >
                                        <Icon size={14} strokeWidth={1.4} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="mt-16 px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    {tab === "food" ? (
                        <div
                            key={subTab}
                            data-testid={`menu-grid-${subTab}`}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {foodList.map((cat, i) => (
                                <CategoryCard
                                    key={cat.category}
                                    category={cat.category}
                                    items={cat.items}
                                    delay={(i % 5) + 1}
                                />
                            ))}
                        </div>
                    ) : (
                        <Reveal>
                            <div
                                data-testid="menu-beverages"
                                className="bg-[#1A1410] border border-[#C9A96E]/15 p-10 md:p-16 text-center max-w-3xl mx-auto"
                            >
                                <Martini
                                    size={36}
                                    strokeWidth={1}
                                    className="mx-auto text-[#C9A96E] mb-6"
                                />
                                <div className="gold-divider mx-auto mb-6" />
                                <h3 className="font-display italic text-3xl md:text-5xl text-[#F0E6D3]">
                                    A Bar Best Tasted in Person
                                </h3>
                                <p className="font-body text-base md:text-lg text-[#F0E6D3]/75 mt-6 max-w-xl mx-auto">
                                    Cocktails, mocktails, wines &amp; more — our bar program is
                                    a living menu, refreshed by the season and the mood of the
                                    night.
                                </p>
                                <a
                                    href={BRAND.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="menu-beverages-reserve"
                                    className="inline-flex items-center mt-10 px-8 py-3.5 bg-[#C9A96E] text-[#0D0A07] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#F0E6D3] transition-colors duration-400"
                                >
                                    Reserve Your Table
                                </a>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="mt-24 md:mt-32 px-6 md:px-10">
                <div className="max-w-[1100px] mx-auto">
                    <Reveal>
                        <div className="border border-[#C9A96E]/40 bg-[#1A1410] p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-center md:text-left">
                            <div>
                                <div className="eyebrow mb-3">Tonight</div>
                                <h3 className="font-display italic text-3xl md:text-5xl text-[#F0E6D3] leading-tight">
                                    Dine with us and let the <br className="hidden md:block" />
                                    menu surprise you.
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-end shrink-0">
                                <a
                                    href={BRAND.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="menu-bottom-reserve"
                                    className="px-7 py-3.5 bg-[#C9A96E] text-[#0D0A07] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#F0E6D3] transition-colors"
                                >
                                    Reserve a Table
                                </a>
                                <Link
                                    to="/about"
                                    data-testid="menu-bottom-about"
                                    className="px-7 py-3.5 border border-[#C9A96E] text-[#C9A96E] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#C9A96E] hover:text-[#0D0A07] transition-colors"
                                >
                                    Our Story
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
