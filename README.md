# KN-Group Consulting — Site vitrine

Site web statique (HTML/CSS/JS vanilla, sans dépendance externe hormis
Google Fonts) pour KN-Group Consulting, cabinet multidisciplinaire
d'architecture, d'ingénierie, d'urbanisme et d'aménagement du territoire,
fondé en 2026 à Douala, Cameroun par Chavany Kemjio.

Contenu rédigé à partir de la brochure fournie par le client
(`KN-group__BROCHURE.pdf`).

## Lancer le site

Aucune installation n'est nécessaire.

1. Ouvrez `index.html` dans votre navigateur (double-clic, ou glisser-déposer
   le fichier dans une fenêtre de navigateur).
2. Pour une expérience optimale, vous pouvez aussi servir le dossier avec un
   petit serveur local :

   ```bash
   cd kn-group-consulting
   python3 -m http.server 8000
   ```

   puis ouvrez `http://localhost:8000`.

## Structure du projet

```
kn-group-consulting/
├── index.html          Page d'accueil : présentation, valeurs, aperçu des
│                        échelles de projet et de l'expertise, statistiques
├── projets.html         Domaines d'intervention : typologies de projets
│                        (bâtiments, infrastructures, urbanisme, espaces
│                        publics), filtrables par catégorie
├── expertise.html       Les 8 domaines d'expertise détaillés avec prestations
├── bureau.html           Vision, trajectoire, valeurs, équipe, culture,
│                        clients & partenaires, recrutement
├── contact.html          Formulaire de contact + coordonnées
├── css/
│   ├── reset.css
│   ├── variables.css     Palette africaine, typographie, échelle d'espacement
│   ├── layout.css
│   ├── components.css     Filtres, timeline, fondateur, rôles, prestations
│   └── animations.css
├── js/
│   ├── main.js
│   ├── animations.js
│   └── counter.js
└── README.md
```

## Notes de contenu

- **Aucun projet fictif n'est présenté comme une réalisation existante.**
  KN-Group Consulting étant une jeune structure fondée en 2026, la page
  « Domaines d'intervention » présente les *typologies* de projets couvertes
  par le cabinet (tours, aéroports, musées, plans directeurs...) illustrées
  par des photographies génériques, plutôt que de faux projets livrés.
- **Aucun portrait fictif n'est attribué à une personne réelle.** L'équipe
  est présentée par discipline (architectes, urbanistes, ingénieurs...) avec
  des icônes, et seul le fondateur, Chavany Kemjio, est nommé — sans photo
  inventée, via un monogramme typographique.
- Les statistiques (10+ collaborateurs, 8 domaines d'expertise, fondation en
  2026) reprennent les chiffres exacts de la brochure fournie.
- Les coordonnées de contact (email, ville) reprennent celles de la
  brochure ; aucun numéro de téléphone n'y figurant, aucun n'a été inventé.
- Le formulaire de contact simule un envoi côté client ; branchez-le à votre
  service d'envoi d'e-mail ou d'API préféré pour un usage en production.
- Testé pour un rendu fluide sur mobile (< 768px), tablette (≥ 768px) et
  desktop (≥ 1200px).
