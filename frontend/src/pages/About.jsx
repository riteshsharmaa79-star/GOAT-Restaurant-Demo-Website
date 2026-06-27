import {
    Star,
    Users,
    Building2,
    UtensilsCrossed,
    Wine,
    Sparkles,
    MapPin,
    Phone,
    Clock,
    Accessibility,
    Wifi,
    Heart,
    CreditCard,
    Music4,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { BRAND, ASSETS } from "@/lib/brand";

const STATS = [
    { Icon: Star, value: "4.5", label: "Google Rating" },
    { Icon: Users, value: "700+", label: "Happy Guests" },
    { Icon: Building2, value: "One-of-a-Kind", label: "Rooftop Experience" },
];

const VALUES = [
    {
        Icon: UtensilsCrossed,
        title: "Elevated Cuisine",
        body: "A multi-cuisine menu spanning Tandoor, Chinese, Continental, and signature creations — each plate composed with intent.",
    },
    {
        Icon: Wine,
        title: "Handcrafted Cocktails",
        body: "A bar program built around balance, creativity, and a local-meets-global spirit — clarified, layered, finished with intention.",
    },
    {
        Icon: Sparkles,
        title: "Rooftop Ambiance",
        body: "Open-air seating, live music evenings, fairy lights, and a skyline view that makes every visit feel a little more cinematic.",
    },
];

const ACCESS_PILLS = [
    { Icon: Heart, label: "LGBTQ+ Friendly" },
    { Icon: Accessibility, label: "Wheelchair Accessible" },
    { Icon: Wifi, label: "Free Wi-Fi" },
    { Icon: Users, label: "Family Friendly" },
    { Icon: CreditCard, label: "All Major Payments" },
    { Icon: Music4, label: "Live Music Evenings" },
];

export default function About() {
    return (
        <main data-testid="page-about" className="bg-[#0D0A07] text-[#F0E6D3] pt-32 pb-24">
            {/* Hero / Brand Story */}
            <section className="px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-7">
                        <Reveal>
                            <div className="eyebrow mb-5">Our Story</div>
                        </Reveal>
                        <Reveal delay={1}>
                            <h1
                                data-testid="about-title"
                                className="font-display italic text-5xl md:text-7xl text-[#F0E6D3] leading-[1.05]"
                            >
                                Born to Be the <br />
                                <span className="text-[#C9A96E]">Greatest</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={2}>
                            <h2 className="font-display text-2xl md:text-3xl text-[#F0E6D3]/80 mt-6">
                                G.O.A.T. isn't just a name — it's a promise.
                            </h2>
                        </Reveal>
                        <Reveal delay={3}>
                            <div className="gold-divider my-8" />
                            <p className="font-body text-base md:text-lg text-[#F0E6D3]/80 leading-relaxed max-w-xl">
                                Nestled atop Siliguri's Time Square Building, G.O.A.T.
                                Elevated Dining &amp; Cocktails is where rooftop ambiance
                                meets culinary ambition. From soothing live music to
                                handcrafted cocktails and dishes that blend global
                                technique with bold local flavor, every visit is designed
                                to exceed expectation.
                            </p>
                            <p className="font-body text-base md:text-lg text-[#C9A96E]/90 leading-relaxed max-w-xl mt-5">
                                Rated 4.5 by over 700 guests — this is Siliguri's finest
                                elevated dining experience.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={2} className="md:col-span-5">
                        <div className="img-zoom border border-[#C9A96E]/25 aspect-[4/5]">
                            <img
                                src={ASSETS.heroBg}
                                alt="G.O.A.T. rooftop golden hour"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Stats */}
            <section
                data-testid="about-stats"
                className="mt-24 md:mt-32 px-6 md:px-10"
            >
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#C9A96E]/20 divide-y md:divide-y-0 md:divide-x divide-[#C9A96E]/15">
                        {STATS.map(({ Icon, value, label }, i) => (
                            <Reveal key={label} delay={i + 1}>
                                <div className="py-12 md:py-16 px-8 flex flex-col items-center text-center">
                                    <Icon
                                        size={22}
                                        strokeWidth={1.2}
                                        className="text-[#C9A96E] mb-5"
                                    />
                                    <div
                                        data-testid={`about-stat-${i}`}
                                        className="font-display italic text-5xl md:text-7xl text-[#C9A96E] leading-none"
                                    >
                                        {value}
                                    </div>
                                    <div className="font-accent text-[10px] tracking-[0.34em] text-[#F0E6D3]/70 mt-4 uppercase">
                                        {label}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="mt-24 md:mt-32 px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <Reveal>
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="eyebrow mb-4">What Sets Us Apart</div>
                            <h2 className="font-display italic text-4xl md:text-6xl text-[#F0E6D3]">
                                Three Pillars, One Promise
                            </h2>
                            <div className="gold-divider mt-8" />
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {VALUES.map(({ Icon, title, body }, i) => (
                            <Reveal key={title} delay={i + 1}>
                                <article
                                    data-testid={`about-value-${i}`}
                                    className="card-glow bg-[#1A1410] border border-[#C9A96E]/15 p-8 md:p-10 h-full"
                                >
                                    <div className="h-12 w-12 border border-[#C9A96E]/40 flex items-center justify-center mb-6">
                                        <Icon size={20} className="text-[#C9A96E]" strokeWidth={1.2} />
                                    </div>
                                    <h3 className="font-display text-2xl md:text-3xl text-[#F0E6D3] mb-4">
                                        {title}
                                    </h3>
                                    <p className="font-body text-[#F0E6D3]/75 leading-relaxed">
                                        {body}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accessibility & Info Pills */}
            <section className="mt-24 md:mt-32 px-6 md:px-10">
                <div className="max-w-[1100px] mx-auto bg-[#1A1410] border border-[#C9A96E]/15 p-10 md:p-14">
                    <Reveal>
                        <div className="text-center">
                            <div className="eyebrow mb-4">Made for Everyone</div>
                            <h3 className="font-display italic text-3xl md:text-5xl text-[#F0E6D3]">
                                Welcoming, Always
                            </h3>
                        </div>
                    </Reveal>
                    <Reveal delay={1}>
                        <div
                            data-testid="about-access-pills"
                            className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10"
                        >
                            {ACCESS_PILLS.map(({ Icon, label }) => (
                                <span
                                    key={label}
                                    className="inline-flex items-center gap-2 border border-[#7A4C35]/70 text-[#F0E6D3]/90 px-4 py-2 rounded-full text-xs md:text-sm font-body tracking-wide hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                                >
                                    <Icon size={14} strokeWidth={1.4} className="text-[#C9A96E]" />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Visit Info Strip */}
            <section className="mt-24 md:mt-32 px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <Reveal>
                        <div className="border border-[#C9A96E]/40 bg-gradient-to-b from-[#1A1410] to-[#0D0A07] p-10 md:p-14">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                                <div className="flex items-start gap-4">
                                    <MapPin size={22} className="text-[#C9A96E] mt-1 shrink-0" strokeWidth={1.3} />
                                    <div>
                                        <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E] uppercase mb-2">
                                            Find Us
                                        </div>
                                        <a
                                            href={BRAND.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-testid="about-address-link"
                                            className="font-display text-xl md:text-2xl text-[#F0E6D3] hover:text-[#C9A96E] transition-colors leading-snug"
                                        >
                                            {BRAND.address}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone size={22} className="text-[#C9A96E] mt-1 shrink-0" strokeWidth={1.3} />
                                    <div>
                                        <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E] uppercase mb-2">
                                            Call Ahead
                                        </div>
                                        <a
                                            href={`tel:${BRAND.phoneRaw}`}
                                            data-testid="about-phone-link"
                                            className="font-display text-xl md:text-2xl text-[#F0E6D3] hover:text-[#C9A96E] transition-colors"
                                        >
                                            {BRAND.phone}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock size={22} className="text-[#C9A96E] mt-1 shrink-0" strokeWidth={1.3} />
                                    <div>
                                        <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E] uppercase mb-2">
                                            Hours
                                        </div>
                                        <div className="font-display text-xl md:text-2xl text-[#F0E6D3]">
                                            {BRAND.hours}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="gold-divider mx-auto my-10" />

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href={BRAND.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="about-cta-directions"
                                    className="px-8 py-3.5 border border-[#C9A96E] text-[#C9A96E] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#C9A96E] hover:text-[#0D0A07] transition-colors"
                                >
                                    Get Directions
                                </a>
                                <a
                                    href={`tel:${BRAND.phoneRaw}`}
                                    data-testid="about-cta-call"
                                    className="px-8 py-3.5 bg-[#C9A96E] text-[#0D0A07] font-body text-xs uppercase tracking-[0.26em] hover:bg-[#F0E6D3] transition-colors"
                                >
                                    Call Now
                                </a>
                                <a
                                    href={BRAND.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="about-cta-whatsapp"
                                    className="px-8 py-3.5 border border-[#F0E6D3]/40 text-[#F0E6D3] font-body text-xs uppercase tracking-[0.26em] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                                >
                                    WhatsApp Reserve
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
