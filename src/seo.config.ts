// Search and AI-answer-engine settings for this app, written by MonstarX's SEO/GEO settings.
//
// Change them in Preview → SEO/GEO or through the authorized builder SEO tools, not here: every save replaces this file. The managed helper
// src/lib/monstarx/seo.ts turns them into the <head> of every page, /robots.txt, /sitemap.xml and /llms.txt.

import type { SeoConfig } from '@/lib/monstarx/seo'

export const seo: SeoConfig = {
  "siteUrl": "",
  "siteName": "E-scooter",
  "defaultTitle": "E-scooter — Location électrique à Dakar",
  "titleTemplate": "%s · E-scooter",
  "defaultDescription": "Loue une moto ou une trottinette électrique à Dakar. Paiement Wave, recharge solaire.",
  "keywords": [],
  "locale": "en",
  "themeColor": "",
  "image": null,
  "imageAlt": "",
  "twitterSite": "",
  "twitterCard": "summary_large_image",
  "indexable": false,
  "robots": {
    "mode": "allow",
    "disallow": [],
    "aiCrawlers": "allow",
    "custom": ""
  },
  "sitemap": {
    "enabled": true,
    "exclude": [],
    "extra": []
  },
  "llms": {
    "enabled": true,
    "summary": "",
    "notes": ""
  },
  "organization": {
    "name": "E-scooter",
    "type": "Organization",
    "logo": null,
    "sameAs": [],
    "email": "",
    "phone": "",
    "address": ""
  },
  "verification": {
    "google": "",
    "bing": "",
    "yandex": "",
    "pinterest": ""
  },
  "faq": [],
  "pages": [
    {
      "path": "/",
      "title": "Démarrer — E-scooter"
    },
    {
      "path": "/acces",
      "title": "Choisis ton parcours — E-scooter"
    },
    {
      "path": "/accueil",
      "title": "Accueil — E-scooter"
    },
    {
      "path": "/accueil-trottinette"
    },
    {
      "path": "/aide",
      "title": "Assistance — E-scooter"
    },
    {
      "path": "/aller-trottinette"
    },
    {
      "path": "/associer",
      "title": "Associer la zone — E-scooter"
    },
    {
      "path": "/aucune-moto"
    },
    {
      "path": "/code-incorrect"
    },
    {
      "path": "/compte",
      "title": "Compte — E-scooter"
    },
    {
      "path": "/confirmee/$id",
      "title": "Réservation confirmée — E-scooter"
    },
    {
      "path": "/connexion",
      "title": "Se connecter — E-scooter"
    },
    {
      "path": "/connexion-code",
      "title": "Confirme l’accès — E-scooter"
    },
    {
      "path": "/depot",
      "title": "Dépôt dans la zone — E-scooter"
    },
    {
      "path": "/documents/$id",
      "title": "Documents — E-scooter"
    },
    {
      "path": "/envoye",
      "title": "Assistance envoyée — E-scooter"
    },
    {
      "path": "/facture-trottinette"
    },
    {
      "path": "/filtres",
      "title": "Filtres — E-scooter"
    },
    {
      "path": "/fin",
      "title": "Contrôle de fin — E-scooter"
    },
    {
      "path": "/impact",
      "title": "Impact — E-scooter"
    },
    {
      "path": "/incident",
      "title": "Incident — E-scooter"
    },
    {
      "path": "/inscription-code",
      "title": "Vérifie ton numéro — E-scooter"
    },
    {
      "path": "/inscription-profil",
      "title": "Ton profil — E-scooter"
    },
    {
      "path": "/inscription-telephone",
      "title": "Créer un compte — E-scooter"
    },
    {
      "path": "/itineraire/$zoneId",
      "title": "Itinéraire — E-scooter"
    },
    {
      "path": "/llms.txt"
    },
    {
      "path": "/merci",
      "title": "Merci — E-scooter"
    },
    {
      "path": "/orange-money/$id"
    },
    {
      "path": "/paiement-echec"
    },
    {
      "path": "/paiement/$id",
      "title": "Paiement — E-scooter"
    },
    {
      "path": "/photo-document"
    },
    {
      "path": "/prete",
      "title": "Moto prête — E-scooter"
    },
    {
      "path": "/profil-etudiant"
    },
    {
      "path": "/profil-incomplet"
    },
    {
      "path": "/reservation-trottinette"
    },
    {
      "path": "/reservation/$id",
      "title": "Réservation — E-scooter"
    },
    {
      "path": "/robots.txt"
    },
    {
      "path": "/scanner-trottinette"
    },
    {
      "path": "/sitemap.xml"
    },
    {
      "path": "/telephone-invalide"
    },
    {
      "path": "/termine-trottinette"
    },
    {
      "path": "/trajet",
      "title": "Location en cours — E-scooter"
    },
    {
      "path": "/trajet-trottinette"
    },
    {
      "path": "/trajets",
      "title": "Trajets — E-scooter"
    },
    {
      "path": "/trouver",
      "title": "Choisir un véhicule — E-scooter"
    },
    {
      "path": "/vehicule/$id",
      "title": "Détail véhicule — E-scooter"
    },
    {
      "path": "/wave/$id",
      "title": "Confirmer Wave — E-scooter"
    },
    {
      "path": "/zone-pleine"
    },
    {
      "path": "/zones",
      "title": "Zones solaires — E-scooter"
    }
  ],
  "paths": [
    "/",
    "/acces",
    "/accueil",
    "/accueil-trottinette",
    "/aide",
    "/aller-trottinette",
    "/associer",
    "/aucune-moto",
    "/code-incorrect",
    "/compte",
    "/confirmee/$id",
    "/connexion",
    "/connexion-code",
    "/depot",
    "/documents/$id",
    "/envoye",
    "/facture-trottinette",
    "/filtres",
    "/fin",
    "/impact",
    "/incident",
    "/inscription-code",
    "/inscription-profil",
    "/inscription-telephone",
    "/itineraire/$zoneId",
    "/llms.txt",
    "/merci",
    "/orange-money/$id",
    "/paiement-echec",
    "/paiement/$id",
    "/photo-document",
    "/prete",
    "/profil-etudiant",
    "/profil-incomplet",
    "/reservation-trottinette",
    "/reservation/$id",
    "/robots.txt",
    "/scanner-trottinette",
    "/sitemap.xml",
    "/telephone-invalide",
    "/termine-trottinette",
    "/trajet",
    "/trajet-trottinette",
    "/trajets",
    "/trouver",
    "/vehicule/$id",
    "/wave/$id",
    "/zone-pleine",
    "/zones"
  ],
  "privatePaths": [
    "/trouver"
  ]
}

export default seo
