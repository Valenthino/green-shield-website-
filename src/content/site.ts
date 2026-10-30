export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const pages = ["home", "about", "cocoa", "contact"] as const;
export type Page = (typeof pages)[number];
export function href(locale: Locale, page: Page = "home") {
  return `/${locale}/${page === "home" ? "" : `${page}/`}`;
}

// Keep unknown commercial facts null. A value here is displayed as a claim.
export const business = {
  brand: "Green Shield",
  founder: "Valentin Sawadogo" as string | null,
  email: null as string | null,
  founderBase: "Vancouver, Canada",
  phones: [
    { en: "Canada", fr: "Canada", display: "+1 778 513 7503", tel: "+17785137503" },
    { en: "Côte d’Ivoire", fr: "Côte d’Ivoire", display: "+225 07 15 43 17 75", tel: "+2250715431775" },
  ],
  legalName: null as string | null,
  location: null as string | null,
  registration: null as string | null,
  role: null as string | null,
  product: null as string | null,
  origins: null as string | null,
  capacity: null as string | null,
  documents: null as string | null,
  founderPhoto: null as string | null,
  introductionVideo: null as string | null,
};

export const copy = {
  en: {
    locale: "English",
    language: "Language",
    cocoaTrading: "COFFEE · COCOA · CASHEW",
    nav: {
      home: "Home",
      about: "About",
      cocoa: "Products & sourcing",
      contact: "Contact",
    },
    draft: "Website preview",
    draftNotes: "Draft notes",
    skip: "Skip to content",
    getInTouch: "Get in touch",
    readAbout: "About Green Shield",
    seeCocoa: "Discuss your requirements",
    homeEyebrow: "GREEN SHIELD / A PERSONAL INTRODUCTION",
    homeTitle: "Let’s talk trade.",
    homeTitleEm: "Person to person.",
    homeLead:
      "A straightforward conversation about your coffee, cocoa or cashew requirements starts with knowing who you’re speaking to.",
    homeNote:
      "If you arrived here from my email, welcome. Here’s a little more about the person and business behind it.",
    homeImageLabel: "COCOA / CÔTE D’IVOIRE",
    fieldCaption: "From earlier field visits in Côte d’Ivoire.",
    fieldCaution:
      "Historical photographs. Not evidence of current stock, ownership, or supply in Liberia.",
    fieldAlt:
      "A person handling a cocoa pod on a tree during an earlier field visit in Côte d’Ivoire.",
    fieldVisitAlt:
      "A person examining a cocoa pod among trees during an earlier visit in Côte d’Ivoire.",
    cocoaPodsAlt:
      "Cocoa pods in a user-supplied photograph from an earlier visit in Côte d’Ivoire.",
    homeIntroLabel: "A BUSINESS INTRODUCTION",
    homeIntroTitle: "The person. The business.\nThe details.",
    homeIntroText:
      "Before a commercial discussion moves forward, you should know who is involved and which details still need to be established.",
    homeLinks: [
      {
        title: "Meet the person behind the email",
        text: "A founder introduction and company information.",
        page: "about",
      },
      {
        title: "Discuss your product requirements",
        text: "Product, origin, volume and delivery details.",
        page: "cocoa",
      },
      {
        title: "Continue the conversation",
        text: "A direct email, without a complicated enquiry process.",
        page: "contact",
      },
    ],
    aboutEyebrow: "ABOUT GREEN SHIELD",
    aboutTitle: "A proper introduction.",
    aboutLead:
      "A family background in the trade, and a new business conversation.",
    founderLabel: "THE PERSON BEHIND THE EMAIL",
    founderPlaceholder: "[Founder name]",
    founderIntro:
      "I’m {founder}, the person behind Green Shield and the email you received.",
    founderText:
      "Before we discuss a possible trade, I’d like you to have a clear picture of who I am and what the business can offer.",
    bioPlaceholder:
      "Add a short factual introduction: your background, where you are based, your exact role and why you started Green Shield.",
    familyTitle: "A family background in cocoa.",
    familyText:
      "My family has been involved in the cocoa trade for more than 30 years. My father’s business has focused on local trading. Green Shield is a separate venture, building on that background.",
    familyNote:
      "Family history is distinct from Green Shield’s age or export record. Historical local volumes are not presented as current export capacity.",
    portraitTitle: "Your photograph\nbelongs here.",
    portraitSmall: "REAL PERSON. SIMPLE SETTING.",
    portraitAlt:
      "Placeholder for the founder’s real photograph; no founder portrait has been confirmed.",
    founderRole: "Founder · Green Shield",
    toAdd: "TO ADD",
    videoTitle: "In my own words.",
    videoLabel: "OPTIONAL PERSONAL VIDEO",
    videoButton: "A short personal introduction",
    videoNote: "No video has been added. The site also works without one.",
    companyTitle: "Company information",
    companyIntro:
      "The legal details should identify the entity you will actually be dealing with.",
    facts: {
      legalName: "Legal company name",
      location: "Based in",
      registration: "Company registration",
      role: "Trading role",
      product: "Product offered",
      origins: "Origin coverage",
      capacity: "Volumes & availability",
      documents: "Documentation",
    },
    pending: {
      legalName: "[Registered company name]",
      location: "[City, country]",
      registration: "[Number and official registry link]",
      role: "[Confirm: trader, broker or exporter]",
      product: "Coffee, cocoa or cashew — form and grade to agree",
      origins: "Confirmed for each product and quotation",
      capacity: "[Confirm actual supply capacity]",
      documents: "[Verified documents available]",
    },
    companyCaution:
      "Registration and operating details remain to be confirmed. A planned registration is not presented as completed.",
    cocoaEyebrow: "PRODUCTS & SOURCING",
    cocoaTitle: "Start with\nyour requirements.",
    cocoaLead:
      "Product and origin are only the start. A useful discussion also needs specifications, quantities, delivery terms and the right documents.",
    supplyTitle: "Coffee, cocoa and cashew.",
    supplyIntro:
      "Green Shield focuses on coffee, cocoa and cashew trading. Form, grade, origin, availability and documents are confirmed for each enquiry. Cocoa supplier relationships support our developing operations in Liberia; some began in Côte d’Ivoire.",
    supplyCaution:
      "Draft placeholders, not supply or certification claims. Availability and terms must be confirmed for each enquiry.",
    shippingTitle: "Shipment discussions",
    shippingLocations: [
      { country: "Côte d’Ivoire", port: "Port to be agreed" },
      { country: "Liberia", port: "Monrovia" },
      { country: "Togo", port: "Lomé" },
    ],
    shippingNote: "Product, origin, availability and loading point are confirmed case by case. Not every product is available from every location. Trade terms are agreed in the quotation.",
    operationsTitle: "Cashew, beyond the field.",
    operationsIntro: "Earlier visits to cashew warehousing and handling operations in Côte d’Ivoire.",
    operationsCaution: "Historical photographs, not a claim of facility ownership, current stock or operations in Liberia.",
    warehouseAlt: "A raised container-handling lift beside a warehouse during an earlier visit to cashew operations in Côte d’Ivoire.",
    warehouseCaption: "Cashew warehousing and handling · Côte d’Ivoire, earlier visit.",
    yardAlt: "Cashew nuts spread across an operations yard, with workers and warehouse buildings, during an earlier visit in Côte d’Ivoire.",
    yardCaption: "Cashew operations in an outdoor yard · Côte d’Ivoire, earlier visit.",
    requirementsTitle: "A useful first conversation",
    requirements: [
      {
        title: "What are you looking for?",
        text: "Product, origin, grade and any required standards or specifications.",
      },
      {
        title: "How much, and when?",
        text: "Indicative volume, shipment timing and whether the requirement is one-off or ongoing.",
      },
      {
        title: "Where does it need to go?",
        text: "Destination, proposed delivery terms and documents your team requires.",
      },
    ],
    photographsTitle: "From the field.",
    photographsIntro:
      "A selection from earlier visits in Côte d’Ivoire, shared as background to the conversation.",
    contactEyebrow: "CONTACT",
    contactTitle: "A simple email\nis a good start.",
    contactLead:
      "Use the business phone numbers below, or reply to the email you received.",
    directEmail: "DIRECT EMAIL",
    emailPlaceholder: "[Business email address]",
    emailHelp:
      "A verified business email will replace this placeholder before launch.",
    emailCta: "Write an email",
    copyTemplate: "Copy an enquiry template",
    copyIdle: "Copies a draft only. Nothing is sent.",
    copySuccess: "Copied. Paste into your email and fill in your requirements.",
    copyFailure: "Copying is unavailable. Select and copy the template below.",
    viewTemplate: "View the enquiry template",
    enquiry: `Hello Valentin,\n\nI’m getting in touch about a possible coffee, cocoa or cashew requirement.\n\nCompany:\nProduct / grade:\nPreferred origin:\nRequired specifications:\nIndicative quantity:\nShipment timing:\nDestination:\nProposed delivery terms:\nRequired documents:\n\nPlease let me know whether this is something we can discuss.\n\nKind regards,\nYour name`,
    contactAsideTitle: "A few details are enough.",
    contactAside:
      "Share an outline of what you need. This site does not collect enquiries or ask you to upload commercial documents.",
    footerDraft: "Website preview · Business details under review",
    beforeLaunch: "Before launch",
    close: "Close",
    notesTitle: "Make it yours.",
    notesText:
      "A credibility website for buyers coming from your outreach. Bracketed details still need your confirmation.",
    checklist: [
      {
        title: "Company & identity",
        text: "Legal name, location, registration, and the entity’s exact trading role remain to be confirmed.",
      },
      {
        title: "Founder introduction",
        text: "Your name, a real portrait, a brief biography and approved wording about the family’s business history.",
      },
      {
        title: "Verified capabilities",
        text: "Products, confirmed origins, actual availability, and documents require review. Supplier relationships do not establish legal export readiness or guaranteed capacity.",
      },
      {
        title: "Contact details",
        text: "The country-labelled business phone numbers are provided. A working business email remains to be added.",
      },
      {
        title: "Photographs & optional video",
        text: "Confirm captions, rights and permission for public use. Historical Côte d’Ivoire photographs must not imply present Liberia stock. Add your own 30–60 second introduction if useful.",
      },
      {
        title: "Hosting & final review",
        text: "This is an online preview. Review both languages and complete the remaining business details before using it with buyers.",
      },
    ],
    privacyNote:
      "No enquiries are submitted or stored. The language preference is stored only in your browser; copying the template uses your clipboard. No analytics, advertising pixels or external fonts are included.",
    videoDialogTitle: "Keep it simple.\nKeep it personal.",
    videoDialogText:
      "A short introduction in your own words. This is a placement preview; no video has been added.",
    videoOutline: [
      {
        title: "Introduce yourself.",
        text: "Your name, company and actual role.",
      },
      {
        title: "Explain the business.",
        text: "What you do, based only on confirmed capabilities.",
      },
      {
        title: "Invite a conversation.",
        text: "Ask buyers to reply with their coffee, cocoa or cashew requirements.",
      },
    ],
    videoTip:
      "Aim for 30–60 seconds, clear sound, a simple background and captions.",
  },
  fr: {
    locale: "Français",
    language: "Langue",
    cocoaTrading: "CAFÉ · CACAO · ANACARDE",
    nav: {
      home: "Accueil",
      about: "À propos",
      cocoa: "Produits & approvisionnement",
      contact: "Contact",
    },
    draft: "Aperçu du site",
    draftNotes: "Notes de la maquette",
    skip: "Aller au contenu",
    getInTouch: "Nous contacter",
    readAbout: "À propos de Green Shield",
    seeCocoa: "Parlons de votre besoin",
    homeEyebrow: "GREEN SHIELD / FAISONS CONNAISSANCE",
    homeTitle: "Parlons négoce.",
    homeTitleEm: "En toute simplicité.",
    homeLead:
      "Pour échanger sur vos besoins en café, cacao ou anacarde, il est utile de savoir à qui vous vous adressez.",
    homeNote:
      "Vous avez reçu mon e-mail ? Bienvenue. Voici quelques informations sur la personne et l’entreprise qui vous ont contacté.",
    homeImageLabel: "CACAO / CÔTE D’IVOIRE",
    fieldCaption: "Photographies de précédentes visites en Côte d’Ivoire.",
    fieldCaution:
      "Photographies d’archives. Elles ne prouvent ni un stock actuel, ni sa propriété, ni une capacité d’approvisionnement au Liberia.",
    fieldAlt:
      "Une personne manipule une cabosse sur un cacaoyer lors d’une précédente visite en Côte d’Ivoire.",
    fieldVisitAlt:
      "Une personne examine une cabosse parmi des cacaoyers lors d’une précédente visite en Côte d’Ivoire.",
    cocoaPodsAlt:
      "Cabosses de cacao photographiées lors d’une précédente visite en Côte d’Ivoire, image fournie par le fondateur.",
    homeIntroLabel: "PRÉSENTATION DE L’ENTREPRISE",
    homeIntroTitle:
      "Un interlocuteur. Une entreprise.\nDes informations claires.",
    homeIntroText:
      "Avant d’avancer dans une discussion commerciale, vous devez savoir qui intervient et quels points restent à préciser.",
    homeLinks: [
      {
        title: "Découvrir votre interlocuteur",
        text: "Une présentation du fondateur et de l’entreprise.",
        page: "about",
      },
      {
        title: "Préciser votre besoin",
        text: "Produit, origine, volumes et conditions de livraison.",
        page: "cocoa",
      },
      {
        title: "Poursuivre la conversation",
        text: "Un échange direct par e-mail, sans formulaire compliqué.",
        page: "contact",
      },
    ],
    aboutEyebrow: "À PROPOS DE GREEN SHIELD",
    aboutTitle: "Faisons connaissance.",
    aboutLead:
      "Une histoire familiale dans le commerce, et une nouvelle conversation professionnelle.",
    founderLabel: "LA PERSONNE DERRIÈRE L’E-MAIL",
    founderPlaceholder: "[Nom du fondateur]",
    founderIntro:
      "Je suis {founder}, à l’origine de Green Shield et de l’e-mail que vous avez reçu.",
    founderText:
      "Avant de discuter d’une éventuelle transaction, je souhaite vous donner une vision claire de mon parcours et de ce que l’entreprise peut proposer.",
    bioPlaceholder:
      "Ajouter une courte présentation factuelle : votre parcours, votre lieu d’activité, votre rôle exact et les raisons de la création de Green Shield.",
    familyTitle: "Une histoire familiale dans le cacao.",
    familyText:
      "Ma famille est présente dans le commerce du cacao depuis plus de 30 ans. L’activité de mon père s’est concentrée sur le négoce local. Green Shield est une entreprise distincte, qui s’appuie sur ce parcours.",
    familyNote:
      "L’histoire familiale ne correspond ni à l’ancienneté de Green Shield, ni à des références à l’export. Les volumes locaux historiques ne sont pas présentés comme une capacité actuelle d’exportation.",
    portraitTitle: "Votre photographie\na sa place ici.",
    portraitSmall: "UNE VRAIE PERSONNE. UN CADRE SIMPLE.",
    portraitAlt:
      "Emplacement pour une véritable photographie du fondateur ; aucun portrait n’a encore été confirmé.",
    founderRole: "Fondateur · Green Shield",
    toAdd: "À AJOUTER",
    videoTitle: "Avec mes propres mots.",
    videoLabel: "VIDÉO PERSONNELLE FACULTATIVE",
    videoButton: "Une courte présentation personnelle",
    videoNote:
      "Aucune vidéo n’a encore été ajoutée. Le site fonctionne aussi sans vidéo.",
    companyTitle: "Informations sur l’entreprise",
    companyIntro:
      "Les informations légales doivent identifier l’entité avec laquelle vous échangerez réellement.",
    facts: {
      legalName: "Dénomination sociale",
      location: "Implantation",
      registration: "Immatriculation",
      role: "Rôle commercial",
      product: "Produit proposé",
      origins: "Origines couvertes",
      capacity: "Volumes & disponibilité",
      documents: "Documentation",
    },
    pending: {
      legalName: "[Dénomination enregistrée]",
      location: "[Ville, pays]",
      registration: "[Numéro et lien vers le registre officiel]",
      role: "[À confirmer : négociant, courtier ou exportateur]",
      product: "Café, cacao ou anacarde — forme et qualité à convenir",
      origins: "À confirmer par produit et par devis",
      capacity: "[Capacité réelle à confirmer]",
      documents: "[Documents disponibles vérifiés]",
    },
    companyCaution:
      "Les informations d’immatriculation et d’activité restent à confirmer. Une immatriculation prévue n’est pas présentée comme acquise.",
    cocoaEyebrow: "PRODUITS & APPROVISIONNEMENT",
    cocoaTitle: "Commençons par\nvotre besoin.",
    cocoaLead:
      "Le produit et l’origine ne suffisent pas. Un échange utile précise aussi les spécifications, les quantités, les conditions de livraison et les documents nécessaires.",
    supplyTitle: "Café, cacao et anacarde.",
    supplyIntro:
      "Green Shield se consacre au négoce de café, cacao et anacarde. La forme, la qualité, l’origine, la disponibilité et les documents sont confirmés pour chaque demande. Des relations fournisseurs dans le cacao accompagnent le développement au Liberia ; certaines sont nées en Côte d’Ivoire.",
    supplyCaution:
      "Champs provisoires, sans déclaration de capacité ni de certification. La disponibilité et les conditions doivent être confirmées pour chaque demande.",
    shippingTitle: "Possibilités d’expédition à discuter",
    shippingLocations: [
      { country: "Côte d’Ivoire", port: "Port à convenir" },
      { country: "Liberia", port: "Monrovia" },
      { country: "Togo", port: "Lomé" },
    ],
    shippingNote: "Le produit, l’origine, la disponibilité et le point de chargement sont confirmés au cas par cas. Chaque produit n’est pas nécessairement disponible depuis chaque lieu. Les conditions commerciales sont fixées dans le devis.",
    operationsTitle: "L’anacarde, au-delà des plantations.",
    operationsIntro: "De précédentes visites d’opérations de stockage et de manutention d’anacarde en Côte d’Ivoire.",
    operationsCaution: "Photographies d’archives, sans déclaration de propriété des installations, de stock actuel ou d’activité au Liberia.",
    warehouseAlt: "Un engin de manutention de conteneurs devant un entrepôt lors d’une précédente visite d’opérations sur l’anacarde en Côte d’Ivoire.",
    warehouseCaption: "Stockage et manutention d’anacarde · précédente visite en Côte d’Ivoire.",
    yardAlt: "Des noix de cajou étalées dans une cour, avec des travailleurs et des bâtiments de stockage, lors d’une précédente visite en Côte d’Ivoire.",
    yardCaption: "Opérations sur l’anacarde en extérieur · précédente visite en Côte d’Ivoire.",
    requirementsTitle: "Un premier échange utile",
    requirements: [
      {
        title: "Que recherchez-vous ?",
        text: "Produit, origine, qualité et éventuelles normes ou spécifications requises.",
      },
      {
        title: "Quel volume, et quand ?",
        text: "Quantité indicative, calendrier d’expédition et caractère ponctuel ou régulier du besoin.",
      },
      {
        title: "Vers quelle destination ?",
        text: "Destination, conditions de livraison envisagées et documents demandés par votre équipe.",
      },
    ],
    photographsTitle: "Sur le terrain.",
    photographsIntro:
      "Une sélection de précédentes visites en Côte d’Ivoire, pour apporter un peu de contexte à notre échange.",
    contactEyebrow: "CONTACT",
    contactTitle: "Un simple e-mail\npour commencer.",
    contactLead:
      "Utilisez les numéros professionnels ci-dessous, ou répondez à l’e-mail que vous avez reçu.",
    directEmail: "E-MAIL DIRECT",
    emailPlaceholder: "[Adresse e-mail professionnelle]",
    emailHelp:
      "Une adresse professionnelle vérifiée remplacera cet emplacement avant publication.",
    emailCta: "Écrire un e-mail",
    copyTemplate: "Copier un modèle de demande",
    copyIdle: "Copie un brouillon uniquement. Rien n’est envoyé.",
    copySuccess:
      "Copié. Collez le texte dans votre e-mail et précisez votre besoin.",
    copyFailure:
      "La copie automatique est indisponible. Sélectionnez et copiez le modèle ci-dessous.",
    viewTemplate: "Voir le modèle de demande",
    enquiry: `Bonjour Valentin,\n\nJe vous contacte au sujet d’un éventuel besoin en café, cacao ou anacarde.\n\nEntreprise :\nProduit / qualité :\nOrigine souhaitée :\nSpécifications requises :\nQuantité indicative :\nPériode d’expédition :\nDestination :\nConditions de livraison envisagées :\nDocuments nécessaires :\n\nMerci de me préciser si ce besoin peut faire l’objet d’un échange.\n\nCordialement,\nVotre nom`,
    contactAsideTitle: "Quelques informations suffisent.",
    contactAside:
      "Présentez les grandes lignes de votre besoin. Ce site ne collecte pas de demandes et ne vous invite pas à téléverser de documents commerciaux.",
    footerDraft: "Aperçu du site · Informations à valider",
    beforeLaunch: "Avant publication",
    close: "Fermer",
    notesTitle: "À personnaliser.",
    notesText:
      "Un site de présentation pour les acheteurs contactés par e-mail. Les éléments entre crochets restent à confirmer.",
    checklist: [
      {
        title: "Entreprise & identité",
        text: "Dénomination sociale, implantation, immatriculation et rôle exact de l’entité restent à confirmer.",
      },
      {
        title: "Présentation du fondateur",
        text: "Votre nom, un vrai portrait, une courte biographie et le texte validé sur l’histoire commerciale de la famille.",
      },
      {
        title: "Capacités vérifiées",
        text: "Produits, origines confirmées, disponibilité réelle et documents restent à vérifier. Les relations fournisseurs ne prouvent ni la capacité juridique à exporter ni une capacité garantie.",
      },
      {
        title: "Coordonnées",
        text: "Les téléphones professionnels sont indiqués avec leur pays. Un e-mail professionnel valide reste à ajouter.",
      },
      {
        title: "Photographies & vidéo facultative",
        text: "Confirmer les légendes, les droits et les autorisations de diffusion. Les photographies historiques de Côte d’Ivoire ne doivent pas suggérer un stock actuel au Liberia. Ajouter une présentation personnelle de 30 à 60 secondes si utile.",
      },
      {
        title: "Hébergement & relecture",
        text: "Ceci est un aperçu en ligne. Relire les deux langues et compléter les informations commerciales avant de le présenter aux acheteurs.",
      },
    ],
    privacyNote:
      "Aucune demande n’est envoyée ni enregistrée. La préférence de langue est conservée uniquement dans votre navigateur ; le modèle utilise votre presse-papiers. Aucun outil d’analyse, pixel publicitaire ou police externe n’est intégré.",
    videoDialogTitle: "Simple.\nEt personnel.",
    videoDialogText:
      "Une courte présentation avec vos propres mots. Cet emplacement est une maquette ; aucune vidéo n’a été ajoutée.",
    videoOutline: [
      {
        title: "Présentez-vous.",
        text: "Votre nom, votre entreprise et votre rôle réel.",
      },
      {
        title: "Expliquez votre activité.",
        text: "Ce que vous faites, sur la base de capacités confirmées.",
      },
      {
        title: "Proposez un échange.",
        text: "Invitez les acheteurs à préciser leurs besoins en café, cacao ou anacarde.",
      },
    ],
    videoTip:
      "Visez 30 à 60 secondes, un son clair, un cadre simple et des sous-titres.",
  },
} as const;

export type Copy = (typeof copy)[Locale];
