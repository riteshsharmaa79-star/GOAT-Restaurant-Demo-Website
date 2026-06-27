import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BRAND, ASSETS } from "@/lib/brand";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "About Us", to: "/about" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const isActive = (to) => pathname === to;

    return (
        <header
            data-testid="site-navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[#0D0A07]/92 backdrop-blur-xl border-b border-[#C9A96E]/15"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px] md:h-[88px]">
                {/* Logo */}
                <Link
                    to="/"
                    data-testid="nav-logo"
                    className="flex items-center gap-3 group"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <div className="h-10 md:h-12 w-10 md:w-12 overflow-hidden border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors">
                        <img
                            src={ASSETS.logo}
                            alt="G.O.A.T. logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="leading-tight">
                        <div className="font-display text-xl md:text-2xl tracking-wider text-[#C9A96E]">
                            G.O.A.T.
                        </div>
                        <div className="font-accent text-[9px] md:text-[10px] tracking-[0.28em] text-[#F0E6D3]/70">
                            Elevated Dining
                        </div>
                    </div>
                </Link>

                {/* Desktop Links */}
                <nav className="hidden md:flex items-center gap-10">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`font-body text-sm uppercase tracking-[0.22em] transition-colors duration-300 relative py-2 ${
                                isActive(link.to)
                                    ? "text-[#C9A96E]"
                                    : "text-[#F0E6D3]/85 hover:text-[#C9A96E]"
                            }`}
                        >
                            {link.label}
                            <span
                                className={`absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[#C9A96E] transition-transform duration-500 origin-left ${
                                    isActive(link.to) ? "scale-x-100" : "scale-x-0"
                                }`}
                            />
                        </Link>
                    ))}
                </nav>

                {/* Reserve CTA */}
                <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="nav-reserve-cta"
                    className="hidden md:inline-flex items-center px-6 py-3 border border-[#C9A96E] text-[#C9A96E] font-body text-xs uppercase tracking-[0.24em] hover:bg-[#C9A96E] hover:text-[#0D0A07] transition-all duration-400"
                >
                    Reserve a Table
                </a>

                {/* Mobile burger */}
                <button
                    type="button"
                    aria-label="Toggle menu"
                    data-testid="nav-mobile-toggle"
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden text-[#C9A96E] p-2"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile drawer */}
            <div
                className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out bg-[#0D0A07]/98 backdrop-blur-xl border-t border-[#C9A96E]/15 ${
                    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-6 py-8 flex flex-col gap-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`font-display italic text-3xl ${
                                isActive(link.to)
                                    ? "text-[#C9A96E]"
                                    : "text-[#F0E6D3]"
                            }`}
                            onClick={() => {
                                setOpen(false);
                                navigate(link.to);
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href={BRAND.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="nav-mobile-reserve-cta"
                        className="mt-2 inline-flex items-center justify-center px-6 py-3 border border-[#C9A96E] text-[#C9A96E] font-body text-xs uppercase tracking-[0.24em] hover:bg-[#C9A96E] hover:text-[#0D0A07] transition-all"
                    >
                        Reserve a Table
                    </a>
                </div>
            </div>
        </header>
    );
}
