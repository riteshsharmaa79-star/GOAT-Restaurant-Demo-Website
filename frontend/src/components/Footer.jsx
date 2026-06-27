import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { BRAND, ASSETS } from "@/lib/brand";

export default function Footer() {
    return (
        <footer
            data-testid="site-footer"
            className="bg-[#0D0A07] border-t border-[#C9A96E]/15 pt-20 pb-10 px-6 md:px-10"
        >
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="h-16 w-16 overflow-hidden border border-[#C9A96E]/40">
                        <img
                            src={ASSETS.logo}
                            alt="G.O.A.T. logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-display text-3xl md:text-4xl tracking-wide text-[#C9A96E]">
                            G.O.A.T.
                        </div>
                        <div className="font-accent text-xs tracking-[0.32em] text-[#F0E6D3]/70 mt-1">
                            Elevated Dining and Cocktails — Siliguri
                        </div>
                    </div>

                    <div className="gold-divider my-4" />

                    <nav className="flex flex-wrap items-center justify-center gap-8 text-sm uppercase tracking-[0.22em] text-[#F0E6D3]/85">
                        <Link data-testid="footer-link-home" to="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
                        <span className="text-[#C9A96E]/40">·</span>
                        <Link data-testid="footer-link-menu" to="/menu" className="hover:text-[#C9A96E] transition-colors">Menu</Link>
                        <span className="text-[#C9A96E]/40">·</span>
                        <Link data-testid="footer-link-about" to="/about" className="hover:text-[#C9A96E] transition-colors">About Us</Link>
                    </nav>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 pt-12 border-t border-[#C9A96E]/10">
                    <div className="flex flex-col items-center text-center gap-3">
                        <MapPin size={18} className="text-[#C9A96E]" />
                        <a
                            href={BRAND.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="footer-address"
                            className="text-sm text-[#F0E6D3]/80 leading-relaxed hover:text-[#C9A96E] transition-colors max-w-xs"
                        >
                            {BRAND.address}
                        </a>
                    </div>
                    <div className="flex flex-col items-center text-center gap-3">
                        <Phone size={18} className="text-[#C9A96E]" />
                        <a
                            href={`tel:${BRAND.phoneRaw}`}
                            data-testid="footer-phone"
                            className="text-sm text-[#F0E6D3]/80 hover:text-[#C9A96E] transition-colors"
                        >
                            {BRAND.phone}
                        </a>
                    </div>
                    <div className="flex flex-col items-center text-center gap-3">
                        <Clock size={18} className="text-[#C9A96E]" />
                        <span className="text-sm text-[#F0E6D3]/80">{BRAND.hours}</span>
                    </div>
                </div>

                <div className="text-center text-xs text-[#F0E6D3]/40 font-body tracking-wider mt-14">
                    © 2025 G.O.A.T. Elevated Dining &amp; Cocktails. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
