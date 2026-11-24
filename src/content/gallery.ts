// "Our work" page: real photographs taken on site, and what a buyer can check.
// Photographs: Monrovia, Liberia, 23 November 2026, taken by Valentin. See PHOTO-SOURCES.md.
// Never name the founder in full here: "Valentin" only.

export type GalleryPhoto = {
  name: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

type GalleryCopy = {
  navShort: string;
  title: string;
  lead: string;
  proofLabel: string;
  proofTitle: string;
  proofText: string;
  proofs: { title: string; text: string }[];
  proofNote: string;
  groups: { label: string; title: string; text: string; photos: GalleryPhoto[] }[];
  homeLabel: string;
  homeTitle: string;
  homeText: string;
  homeLink: string;
  place: string;
};

const P = (name: string, portrait: boolean) => ({ name, width: 1280, height: portrait ? 1707 : 960 });

export const gallery: Record<"en" | "fr", GalleryCopy> = {
  en: {
    navShort: "Our work",
    title: "Our work,\nseen on the ground.",
    lead: "Photographs from a cocoa warehouse and a container loading in Monrovia, Liberia, in November 2026. Valentin took them himself on site. No stock images.",
    proofLabel: "WHAT YOU CAN CHECK",
    proofTitle: "Don’t take our word for it.\nAsk to see it.",
    proofText: "Trust in a new supplier is built on things you can check. Before and during a shipment, ask us for any of these.",
    proofs: [
      { title: "Photos and video of your lot", text: "Recent photos, or a WhatsApp video call from the warehouse, before you commit." },
      { title: "Samples and a cut test", text: "We discuss samples, moisture and a cut test for your lot before the contract." },
      { title: "An inspector of your choice", text: "Your own surveyor can check weight and quality before the container is closed." },
      { title: "Loading you can follow", text: "Photos of each container: lining, sacks, loading and the seal number." },
    ],
    proofNote: "Terms, documents and inspection costs are agreed in the quotation.",
    groups: [
      {
        label: "01 · AT THE WAREHOUSE",
        title: "Bagged, sewn and stored.",
        text: "Cocoa beans in jute sacks, sewn shut and stacked off the ground.",
        photos: [
          { ...P("field-sacks-sewn", true), alt: "Rows of jute sacks of cocoa beans with blue stripes in a warehouse, a bag-sewing machine resting on top.", caption: "Sacks sewn shut and ready · Monrovia" },
          { ...P("field-open-sack", true), alt: "An open jute sack full of dried brown cocoa beans.", caption: "Dried cocoa beans in a jute sack · Monrovia" },
          { ...P("field-founder-warehouse", true), alt: "Valentin standing in front of a tall stack of cocoa sacks inside a warehouse.", caption: "Valentin at the warehouse · November 2026" },
        ],
      },
      {
        label: "02 · CHECKING THE BEANS",
        title: "Quality starts with a handful.",
        text: "We look at the beans by hand: size, colour, dryness and foreign matter.",
        photos: [
          { ...P("field-beans-hand", false), alt: "A hand holding dried cocoa beans over an open jute sack.", caption: "Checking a handful of beans · Monrovia" },
          { ...P("field-beans-check", true), alt: "A hand picking up cocoa beans from a large drying and sorting bed.", caption: "Beans on the drying and sorting bed · Monrovia" },
          { ...P("field-drying-bed", true), alt: "A wide bed of dried cocoa beans in a warehouse, with sacks along the wall.", caption: "Beans spread out before bagging · Monrovia" },
        ],
      },
      {
        label: "03 · LOADING THE CONTAINER",
        title: "A clean, lined container.",
        text: "The container is lined with kraft paper and a liner against moisture before the sacks go in.",
        photos: [
          { ...P("field-container-loading", true), alt: "Inside a shipping container lined with kraft paper, sacks of cocoa stacked at the far end.", caption: "Container lined with kraft paper, loading under way · Monrovia" },
          { ...P("field-container-liner", true), alt: "A plastic liner hung inside a container door before loading.", caption: "Liner fitted against moisture · Monrovia" },
          { ...P("field-founder-container", true), alt: "Valentin inside a container, with stacked cocoa sacks behind him.", caption: "Valentin at the container loading · November 2026" },
        ],
      },
    ],
    homeLabel: "RECENT · MONROVIA, NOVEMBER 2026",
    homeTitle: "See the product\nbefore you buy it.",
    homeText: "Real photographs from a cocoa warehouse and a container loading, taken on site by Valentin. Ask for photos or a video call of your own lot.",
    homeLink: "See our work",
    place: "Monrovia, Liberia",
  },
  fr: {
    navShort: "Terrain",
    title: "Notre travail,\nvu sur le terrain.",
    lead: "Photos prises dans un entrepôt de cacao et lors d’un empotage de conteneur à Monrovia, au Liberia, en novembre 2026. Valentin les a prises lui-même sur place. Aucune photo de banque d’images.",
    proofLabel: "CE QUE VOUS POUVEZ VÉRIFIER",
    proofTitle: "Ne nous croyez pas sur parole.\nDemandez à voir.",
    proofText: "La confiance avec un nouveau fournisseur se construit sur ce que l’on peut vérifier. Avant et pendant une expédition, demandez-nous :",
    proofs: [
      { title: "Photos et vidéo de votre lot", text: "Des photos récentes, ou un appel vidéo WhatsApp depuis l’entrepôt, avant de vous engager." },
      { title: "Échantillons et cut test", text: "Échantillons, humidité et cut test de votre lot sont discutés avant le contrat." },
      { title: "L’inspecteur de votre choix", text: "Votre propre contrôleur peut vérifier poids et qualité avant la fermeture du conteneur." },
      { title: "Un empotage que vous suivez", text: "Photos de chaque conteneur : doublage, sacs, chargement et numéro de plomb." },
    ],
    proofNote: "Conditions, documents et frais d’inspection sont fixés dans le devis.",
    groups: [
      {
        label: "01 · À L’ENTREPÔT",
        title: "Ensaché, cousu, stocké.",
        text: "Des fèves de cacao en sacs de jute, cousus et empilés au-dessus du sol.",
        photos: [
          { ...P("field-sacks-sewn", true), alt: "Rangées de sacs de jute à rayures bleues remplis de fèves de cacao dans un entrepôt, une machine à coudre les sacs posée dessus.", caption: "Sacs cousus et prêts · Monrovia" },
          { ...P("field-open-sack", true), alt: "Un sac de jute ouvert rempli de fèves de cacao brunes et sèches.", caption: "Fèves de cacao séchées en sac de jute · Monrovia" },
          { ...P("field-founder-warehouse", true), alt: "Valentin devant une haute pile de sacs de cacao dans un entrepôt.", caption: "Valentin à l’entrepôt · novembre 2026" },
        ],
      },
      {
        label: "02 · CONTRÔLE DES FÈVES",
        title: "La qualité commence\npar une poignée.",
        text: "Nous regardons les fèves à la main : taille, couleur, séchage et corps étrangers.",
        photos: [
          { ...P("field-beans-hand", false), alt: "Une main tenant des fèves de cacao séchées au-dessus d’un sac de jute ouvert.", caption: "Contrôle d’une poignée de fèves · Monrovia" },
          { ...P("field-beans-check", true), alt: "Une main prenant des fèves de cacao sur une grande aire de séchage et de tri.", caption: "Fèves sur l’aire de séchage et de tri · Monrovia" },
          { ...P("field-drying-bed", true), alt: "Une large aire de fèves de cacao séchées dans un entrepôt, des sacs le long du mur.", caption: "Fèves étalées avant l’ensachage · Monrovia" },
        ],
      },
      {
        label: "03 · EMPOTAGE DU CONTENEUR",
        title: "Un conteneur propre\net doublé.",
        text: "Le conteneur est doublé de papier kraft et d’une housse contre l’humidité avant l’entrée des sacs.",
        photos: [
          { ...P("field-container-loading", true), alt: "Intérieur d’un conteneur doublé de papier kraft, des sacs de cacao empilés au fond.", caption: "Conteneur doublé de kraft, empotage en cours · Monrovia" },
          { ...P("field-container-liner", true), alt: "Une housse plastique suspendue à l’entrée d’un conteneur avant le chargement.", caption: "Housse posée contre l’humidité · Monrovia" },
          { ...P("field-founder-container", true), alt: "Valentin dans un conteneur, des sacs de cacao empilés derrière lui.", caption: "Valentin à l’empotage · novembre 2026" },
        ],
      },
    ],
    homeLabel: "RÉCENT · MONROVIA, NOVEMBRE 2026",
    homeTitle: "Voyez le produit\navant de l’acheter.",
    homeText: "De vraies photos d’un entrepôt de cacao et d’un empotage de conteneur, prises sur place par Valentin. Demandez des photos ou un appel vidéo de votre propre lot.",
    homeLink: "Voir notre travail",
    place: "Monrovia, Liberia",
  },
};
