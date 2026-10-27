// Types globaux pour la vérification (npm run typecheck) des fichiers marqués // @ts-check.
// L'espace MF regroupe les modules de l'application (scripts classiques, voir js/loader.js).
declare var MF: any;
interface Window { MF: any; }
declare function importScripts(...urls: string[]): void;
// setAttribute convertit la valeur en texte : on accepte aussi les nombres
interface Element { setAttribute(qualifiedName: string, value: string | number): void; }
