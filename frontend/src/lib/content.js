import { MENU } from "@/lib/brand";

// Default editable content. Live content is loaded from localStorage and falls back here.
export const DEFAULT_CONTENT = {
    hero: {
        eyebrow: "Siliguri's Finest Rooftop Dining",
        headline: "Where Every Evening Ascends",
        subtitle:
            "Elevated cuisine, handcrafted cocktails, and an ambiance that transforms a night out into a memory.",
    },
    about: {
        eyebrow: "Our Story",
        heading: "Born to Be the Greatest",
        subheading: "G.O.A.T. isn't just a name — it's a promise.",
        body:
            "Nestled atop Siliguri's Time Square Building, G.O.A.T. Elevated Dining & Cocktails is where rooftop ambiance meets culinary ambition. From soothing live music to handcrafted cocktails and dishes that blend global technique with bold local flavor, every visit is designed to exceed expectation.",
        footnote:
            "Rated 4.5 by over 700 guests — this is Siliguri's finest elevated dining experience.",
    },
    signatureDishes: [
        {
            id: "ghee-roast-chicken",
            name: "Ghee Roast Chicken",
            price: "₹ 480",
            description:
                "Golden, cheesy, and kissed with the right heat. Pure comfort, elevated.",
            tag: "House Favourite",
            image:
                "https://images.unsplash.com/photo-1633237308525-cd587cf71926?auto=format&fit=crop&w=1400&q=80",
        },
        {
            id: "paneer-tikka-pizza",
            name: "Paneer Tikka Pizza",
            price: "₹ 520",
            description:
                "Where desi spice meets Italian craft. A signature you won't forget.",
            tag: "Crowd-Picked",
            image:
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80",
        },
    ],
    menu: {
        veg: MENU.veg.map((c) => ({
            category: c.category,
            items: c.items.map((i) => ({ name: i, price: "" })),
        })),
        nonVeg: MENU.nonVeg.map((c) => ({
            category: c.category,
            items: c.items.map((i) => ({ name: i, price: "" })),
        })),
    },
};

export const STORAGE_KEY = "goat_site_content_v1";
