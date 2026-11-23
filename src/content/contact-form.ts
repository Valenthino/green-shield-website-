import type { Locale } from "./site";

// Web3Forms access key. It is designed to be public (it only lets the form
// send to the inbox it was created for). While it is null the form opens the
// visitor's email app with the message filled in instead.
export const contactFormKey: string | null = null;
export const contactFormEndpoint = "https://api.web3forms.com/submit";

export const formCopy: Record<Locale, {
  label: string; title: string; text: string;
  name: string; company: string; email: string; phone: string; product: string; message: string;
  optional: string; products: string[]; send: string; sending: string;
  success: string; error: string; mailtoNote: string; subject: string;
}> = {
  en: {
    label: "SEND A MESSAGE",
    title: "Write to us\nfrom this page.",
    text: "Your message goes straight to our inbox. We reply by email.",
    name: "Your name", company: "Company", email: "Your email", phone: "Phone / WhatsApp", product: "Product",
    message: "Your requirements (grade, quantity, destination, timing)", optional: "optional",
    products: ["Cocoa beans", "Raw cashew nuts", "Coffee", "Other"],
    send: "Send message", sending: "Sending…",
    success: "Thank you. Your message has been sent and we will reply by email.",
    error: "Sorry, the message could not be sent. Please email contact@baooreagritrade.com or call us.",
    mailtoNote: "Your email app will open with your message ready to send.",
    subject: "Website enquiry",
  },
  fr: {
    label: "ENVOYER UN MESSAGE",
    title: "Écrivez-nous\ndepuis cette page.",
    text: "Votre message arrive directement dans notre boîte de réception. Nous vous répondons par e-mail.",
    name: "Votre nom", company: "Entreprise", email: "Votre e-mail", phone: "Téléphone / WhatsApp", product: "Produit",
    message: "Vos besoins (qualité, quantité, destination, délai)", optional: "facultatif",
    products: ["Fèves de cacao", "Noix de cajou brutes", "Café", "Autre"],
    send: "Envoyer le message", sending: "Envoi…",
    success: "Merci. Votre message a bien été envoyé et nous vous répondrons par e-mail.",
    error: "Désolé, le message n’a pas pu être envoyé. Écrivez à contact@baooreagritrade.com ou appelez-nous.",
    mailtoNote: "Votre messagerie va s’ouvrir avec votre message prêt à être envoyé.",
    subject: "Demande depuis le site",
  },
};
