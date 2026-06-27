import { Link } from "react-router-dom";
import { ChevronDown, UtensilsCrossed, Wine, Building2, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { BRAND, ASSETS } from "@/lib/brand";

export default function Home() {
    return (
        <main data-testid="page-home" className="bg-[#0D0A07] text-[#F0E6D3]">
            {/* HERO */}
            <section
                data-testid="hero-section"
                className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            >
                <div
                    className="hero-parallax absolute inset-0"
                    style={{ backgroundImage: `url(${ASSETS.heroBg})` }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-[#0D0A07]/55" aria-hidden="true" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 70%, rgba(201,169,110,0.18), transparent 60%)",
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 max-w-[1100px] mx-auto px-6 text-center pt-24">
                    <Reveal>
                        <div className="eyebrow mb-6">Siliguri's Finest Rooftop Dining</div>
                    </Reveal>
                    <Reveal delay={1}>
                        <h1
                            data-testid="hero-title"
                            className="font-display italic font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[110px] leading-[1.02] tracking-tight text-[#F0E6D3]"
                        >
                            Where Every <br className="hidden sm:block" />
                            <span className="text-[#C9A96E]">Evening Ascends</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={2}>
                        <p className="mt-8 max-w-2xl mx-auto font-body text-base md:text-lg text-[#F0E6D3]/85 leading-relaxed">
                            Elevated cuisine, handcrafted cocktails, and an ambiance that
                            transforms a night out into a memory.
                        </p>
                    </Reveal>
                    <Reveal delay={3}>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/menu"
                                data-testid="hero-cta-menu"
                                className="px-8 py-3.5 bg-[#C9A96E] text-[#0D0A07] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#F0E6D3] transition-colors duration-400"
                            >
                                Explore Menu
                            </Link>
                            <Link
                                to="/about"
                                data-testid="hero-cta-story"
                                className="px-8 py-3.5 border border-[#F0E6D3]/40 text-[#F0E6D3] font-body text-xs uppercase tracking-[0.26em] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-400"
                            >
                                Our Story
                            </Link>
                        </div>
                    </Reveal>
                </div>

                <a
                    href="#feature-strip"
                    aria-label="Scroll down"
                    data-testid="hero-scroll-indicator"
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#C9A96E] animate-chevron-bounce"
                >
                    <ChevronDown size={28} strokeWidth={1.2} />
                </a>
            </section>

            {/* FEATURE STRIP */}
            <section
                id="feature-strip"
                data-testid="feature-strip"
                className="bg-[#1A1410] border-t border-[#C9A96E]/30 border-b border-[#C9A96E]/10"
            >
                <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {[
                            { Icon: UtensilsCrossed, label: "Elevated Cuisine", sub: "Tandoor · Continental · Chinese" },
                            { Icon: Wine, label: "Signature Cocktails", sub: "Clarified · Balanced · Intentional" },
                            { Icon: Building2, label: "Rooftop Ambiance", sub: "Skyline · Live Music · Fairy Lights" },
                        ].map(({ Icon, label, sub }, i) => (
                            <Reveal key={label} delay={i + 1}>
                                <div className="flex flex-col items-center text-center group">
                                    <div className="h-14 w-14 border border-[#C9A96E]/40 flex items-center justify-center mb-5 group-hover:border-[#C9A96E] transition-colors">
                                        <Icon size={22} className="text-[#C9A96E]" strokeWidth={1.2} />
                                    </div>
                                    <h3 className="font-display text-2xl md:text-3xl text-[#F0E6D3]">
                                        {label}
                                    </h3>
                                    <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E]/80 mt-3">
                                        {sub}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* AMBIANCE GALLERY */}
            <section
                data-testid="ambiance-gallery"
                className="bg-[#0D0A07] py-24 md:py-32 px-6 md:px-10"
            >
                <div className="max-w-[1200px] mx-auto">
                    <Reveal>
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="eyebrow mb-4">The Atmosphere</div>
                            <h2 className="font-display italic text-4xl md:text-6xl text-[#F0E6D3]">
                                An Experience Beyond the Plate
                            </h2>
                            <div className="gold-divider mt-8" />
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-5 auto-rows-[180px] md:auto-rows-[240px]">
                        {ASSETS.gallery.map((img, i) => (
                            <Reveal
                                key={img.url + i}
                                delay={(i % 4) + 1}
                                className={`img-zoom border border-[#C9A96E]/15 ${
                                    i === 0 ? "row-span-2 col-span-2 md:col-span-2" : ""
                                } ${i === 3 ? "row-span-2 md:row-span-2 col-span-2 md:col-span-2" : ""}`}
                            >
                                <img
                                    src={img.url}
                                    alt={img.alt}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SIGNATURE DISHES */}
            <section
                data-testid="signature-dishes"
                className="bg-[#1A1410] py-24 md:py-32 px-6 md:px-10"
            >
                <div className="max-w-[1200px] mx-auto">
                    <Reveal>
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="eyebrow mb-4">Signature Plates</div>
                            <h2 className="font-display italic text-4xl md:text-6xl text-[#F0E6D3]">
                                Cooked With Intention
                            </h2>
                            <div className="gold-divider mt-8" />
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {[
                            {
                                img: ASSETS.gheeRoastChicken,
                                name: "Ghee Roast Chicken",
                                desc: "Golden, cheesy, and kissed with the right heat. Pure comfort, elevated.",
                                tag: "House Favourite",
                                testId: "dish-ghee-roast-chicken",
                            },
                            {
                                img: ASSETS.paneerTikkaPizza,
                                name: "Paneer Tikka Pizza",
                                desc: "Where desi spice meets Italian craft. A signature you won't forget.",
                                tag: "Crowd-Picked",
                                testId: "dish-paneer-tikka-pizza",
                            },
                        ].map((dish, i) => (
                            <Reveal key={dish.name} delay={i + 1}>
                                <article
                                    data-testid={dish.testId}
                                    className="card-glow bg-[#0D0A07] border border-[#C9A96E]/15"
                                >
                                    <div className="img-zoom aspect-[4/3] overflow-hidden">
                                        <img
                                            src={dish.img}
                                            alt={dish.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-8 md:p-10">
                                        <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E]/85 mb-3">
                                            {dish.tag}
                                        </div>
                                        <h3 className="font-display text-3xl md:text-4xl text-[#F0E6D3] mb-4">
                                            {dish.name}
                                        </h3>
                                        <p className="font-body text-[#F0E6D3]/75 leading-relaxed">
                                            {dish.desc}
                                        </p>
                                        <Link
                                            to="/menu"
                                            data-testid={`${dish.testId}-link`}
                                            className="gold-link inline-block mt-6 font-body text-xs uppercase tracking-[0.26em]"
                                        >
                                            View Full Menu →
                                        </Link>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* COCKTAIL SPOTLIGHT */}
            <section
                data-testid="cocktail-spotlight"
                className="bg-[#0D0A07] py-24 md:py-32 px-6 md:px-10"
            >
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <Reveal className="img-zoom border border-[#C9A96E]/25">
                        <img
                            src={ASSETS.rejuvenate}
                            alt="Rejuvenate — clarified plum and gin"
                            loading="lazy"
                            className="w-full h-[420px] md:h-[600px] object-cover"
                        />
                    </Reveal>
                    <Reveal delay={2}>
                        <div className="md:pl-6">
                            <div className="eyebrow mb-5">Bar Program</div>
                            <h2 className="font-display italic text-4xl md:text-6xl text-[#F0E6D3] leading-tight">
                                Craft in <br />
                                <span className="text-[#C9A96E]">Every Pour</span>
                            </h2>
                            <div className="gold-divider my-8" />
                            <p className="font-body text-base md:text-lg text-[#F0E6D3]/80 leading-relaxed max-w-md">
                                Our bar team treats every cocktail as a composition —
                                clarified, balanced, and finished with intention. Explore
                                our cocktail menu for sessions that linger.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    to="/menu"
                                    data-testid="cocktail-cta-menu"
                                    className="px-7 py-3 border border-[#C9A96E] text-[#C9A96E] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#C9A96E] hover:text-[#0D0A07] transition-colors duration-400"
                                >
                                    See the Bar
                                </Link>
                                <a
                                    href={BRAND.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="cocktail-cta-reserve"
                                    className="px-7 py-3 bg-[#C9A96E] text-[#0D0A07] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#F0E6D3] transition-colors duration-400"
                                >
                                    Reserve a Table
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* VIBE QUOTE */}
            <section
                data-testid="vibe-quote"
                className="bg-[#1A1410] py-24 md:py-28 px-6 md:px-10 relative overflow-hidden"
            >
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 50%, #C9A96E, transparent 60%)",
                    }}
                />
                <div className="max-w-[900px] mx-auto text-center relative">
                    <Reveal>
                        <Quote
                            size={32}
                            strokeWidth={1}
                            className="text-[#C9A96E] mx-auto mb-6 opacity-70"
                        />
                        <div className="gold-divider mx-auto mb-10" />
                        <blockquote className="font-display italic text-3xl md:text-5xl text-[#F0E6D3] leading-[1.2]">
                            "Rooftop views. Live music. Innovative cocktails.
                            <br className="hidden md:block" />
                            <span className="text-[#C9A96E]"> This is G.O.A.T."</span>
                        </blockquote>
                        <div className="gold-divider mx-auto mt-10" />
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
