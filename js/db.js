const DEFAULT_SETTINGS = {
    store_name: "Luxe & Minimaliste",
    contact_email: "vorniere.antoine@gmail.com",
    accent_color: "#d4af37",
    currency: "EUR",
    logo_url: ""
};

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        title: "Chronographe Onyx",
        description: "Une montre d'exception alliant précision suisse et design contemporain. Boîtier en acier brossé et bracelet en cuir véritable.",
        price: 1250,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
        category: "Horlogerie",
        tags: ["Luxe", "Précision", "Noir"],
        stock: 5
    },
    {
        id: 2,
        title: "Essence de Nuit",
        description: "Un parfum envoûtant aux notes de bois de santal et de bergamote. Flacon minimaliste en verre soufflé.",
        price: 185,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
        category: "Parfumerie",
        tags: ["Élégance", "Soirée"],
        stock: 12
    },
    {
        id: 3,
        title: "Portefeuille Horizon",
        description: "Cuir de veau pleine fleur, tannage végétal. Compartiments optimisés pour une finesse absolue.",
        price: 95,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
        category: "Accessoires",
        tags: ["Cuir", "Minimaliste"],
        stock: 20
    },
    {
        id: 4,
        title: "Lunettes Stellar",
        description: "Monture en titane ultra-légère. Verres polarisants haute définition avec protection UV400.",
        price: 320,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
        category: "Accessoires",
        tags: ["Design", "Protection"],
        stock: 8
    },
    {
        id: 5,
        title: "Sac de Voyage Atlas",
        description: "Toile canevas imperméable et finitions en cuir. Le compagnon idéal pour vos escapades d'un week-end.",
        price: 450,
        image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
        category: "Maroquinerie",
        tags: ["Voyage", "Durable"],
        stock: 4
    },
    {
        id: 6,
        title: "Stylo Plume Signature",
        description: "Plume en or 18 carats. Corps en résine précieuse noire et attributs argentés.",
        price: 580,
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
        category: "Écriture",
        tags: ["Classique", "Artisanat"],
        stock: 3
    },
    {
        id: 7,
        title: "Bougie Ambre Grise",
        description: "Cire végétale naturelle parfumée. Temps de brûlage d'environ 60 heures. Verre artisanal.",
        price: 65,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
        category: "Maison",
        tags: ["Ambiance", "Cadeau"],
        stock: 15
    },
    {
        id: 8,
        title: "Écouteurs Nebula",
        description: "Réduction de bruit active, son spatial immersif. Finition mate premium et autonomie de 30 heures.",
        price: 299,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        category: "Technologie",
        tags: ["Audio", "Innovant"],
        stock: 10
    },
    {
        id: 9,
        title: "Boutons de Manchette Éclat",
        description: "Argent massif brossé avec insertion d'onyx véritable. Un détail qui fait toute la différence.",
        price: 145,
        image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&w=800&q=80",
        category: "Horlogerie",
        tags: ["Détail", "Sartorial"],
        stock: 7
    },
    {
        id: 10,
        title: "Vase Sculptural",
        description: "Céramique façonnée à la main. Une pièce d'art minimaliste pour sublimer votre intérieur.",
        price: 210,
        image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80",
        category: "Maison",
        tags: ["Art", "Décoration"],
        stock: 6
    }
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('boutique_products')) {
            localStorage.setItem('boutique_products', JSON.stringify(DEFAULT_PRODUCTS));
        }
        if (!localStorage.getItem('boutique_settings')) {
            localStorage.setItem('boutique_settings', JSON.stringify(DEFAULT_SETTINGS));
        }
    }

    getProducts() {
        return JSON.parse(localStorage.getItem('boutique_products'));
    }

    saveProducts(products) {
        localStorage.setItem('boutique_products', JSON.stringify(products));
    }

    getSettings() {
        return JSON.parse(localStorage.getItem('boutique_settings'));
    }

    saveSettings(settings) {
        localStorage.setItem('boutique_settings', JSON.stringify(settings));
        this.applyTheme(settings);
    }

    applyTheme(settings) {
        document.documentElement.style.setProperty('--accent', settings.accent_color);
        if (document.querySelector('.logo')) {
            document.querySelector('.logo').innerText = settings.store_name;
        }
        if (document.querySelector('.hero h1')) {
            document.querySelector('.hero h1').innerText = settings.store_name;
        }
    }
}

const db = new Database();
