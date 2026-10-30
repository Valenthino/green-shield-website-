/**
 * A saved explicit choice wins. A French browser only prompts; it never
 * silently changes an unsaved visitor's language. Unknown values fall back
 * to English. This runs only at the root entry point, not explicit /en/ or /fr/.
 * @param {string | null} saved
 * @param {readonly string[]} browserLanguages
 * @returns {'redirect-fr' | 'suggest-fr' | 'english'}
 */
export function languageDecision(saved, browserLanguages) {
  if (saved === "fr") return "redirect-fr";
  if (saved === "en") return "english";
  return (browserLanguages[0] || "").toLowerCase().startsWith("fr")
    ? "suggest-fr"
    : "english";
}
