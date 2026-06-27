# G.O.A.T. Elevated Dining & Cocktails — PRD

## Original Problem Statement
Premium, fully-frontend, single-page responsive React website for G.O.A.T. — a fine-dining rooftop restaurant in Siliguri, West Bengal. Three pages/routes (Home, Menu, About Us) with a sticky top nav. Sneak-peek demo showcasing brand, ambiance, and menu. No backend, no CMS, no database. Tagline: "Where Every Evening Ascends".

## User Choices (locked-in)
- Implementation: React SPA (Tailwind, react-router-dom)
- Reserve a Table CTA: opens WhatsApp / phone dialer (https://wa.me/919144408801, tel:+919144408801)
- Missing dish images: Unsplash/Pexels stock photos as placeholders for Ghee Roast Chicken & Paneer Tikka Pizza

## Personas
- Date-night couples planning a special evening in Siliguri
- Family/group diners looking for an elevated experience
- Cocktail enthusiasts seeking a curated bar program
- Tourists searching "best rooftop restaurant Siliguri" on Google Maps

## Core Static Requirements
- Dark luxury aesthetic (bg #0D0A07, surface #1A1410, gold #C9A96E, ivory #F0E6D3, terracotta #7A4C35)
- Typography: Cormorant Garamond (display), DM Sans (body), Playfair Display SC (accent labels)
- Sticky navbar with logo, links, Reserve CTA
- Full-viewport parallax hero
- Feature strip (3 icons)
- Ambiance gallery (4-image bento grid)
- Signature dishes (2 cards)
- Cocktail spotlight (split layout, Rejuvenate)
- Vibe quote
- Menu page: Food/Beverages tabs, Veg/Non-Veg sub-tabs, category cards
- About: brand story, stats (4.5, 700+, One-of-a-Kind), values, accessibility pills, visit info strip
- Footer

## Implemented (Dec 2025)
- React Router with 3 routes (/, /menu, /about) + ScrollToTop
- Sticky responsive Navbar with mobile hamburger drawer
- Footer with address (Google Maps link), phone (tel:), hours, copyright
- Home: hero with parallax + scroll indicator, feature strip, ambiance bento gallery, 2 signature dish cards (Ghee Roast Chicken, Paneer Tikka Pizza), cocktail spotlight (real Rejuvenate image), vibe quote
- Menu: Food/Beverages tabs, Veg/Non-Veg sub-tabs, dotted-leader category cards with all items per spec, Beverages placeholder with Reserve CTA, bottom CTA banner
- About: brand story + image, 3-column stats with divider, 3 values cards, 6 accessibility pills, visit info strip with Directions/Call/WhatsApp CTAs
- IntersectionObserver-based fade-in-up reveal animations (prefers-reduced-motion respected)
- All key elements have data-testid; lint clean; testing agent 100% pass on 15 flows

## Backlog (P1/P2)
- P1: Add proper Open Graph / Twitter card meta tags + favicon using G.O.A.T. logo
- P1: Convert .heic source ambiance photos to .webp for additional gallery slots
- P2: Add a small "reservation" modal (date/time/guests) that pre-fills the WhatsApp message
- P2: Live Instagram/Google Reviews embed for social proof
- P2: Image lightbox for ambiance gallery
- P2: Sitemap.xml + robots.txt for SEO

## Tech Notes
- Frontend env unchanged; REACT_APP_BACKEND_URL still present (unused — site is frontend-only)
- No backend modifications. Backend remains as-is.
- No third-party integrations, no auth, no DB.
