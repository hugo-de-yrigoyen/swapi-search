# 🛰️ Star Wars Rebels Alliance Search System

Bienvenue dans l'Alliance Rebelle ! Ce projet permet de rechercher dans la base de données impériale Star Wars via une interface moderne et immersive.

## 🚀 Installation & Lancement

### Prérequis

- Node.js (v18+ recommandé)
- npm

### Backend

```bash
cd backend
npm install
npm run build
npm start
```

Le backend démarre sur `http://localhost:3001` (modifiable via la variable d'environnement `PORT`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173`.

> **Identifiants de connexion démo :**
>
> - **Username :** Luke
> - **Password :** DadSucks

## ⚙️ Choix Techniques Principaux

### Backend

- **Hapi.js** : Framework Node.js rapide et sécurisé
- **TypeScript** : Typage statique pour robustesse
- **JWT** : Authentification sécurisée
- **Axios** : Requêtes HTTP vers SWAPI
- **Architecture modulaire** : Séparation claire (routes, contrôleurs, services)
- **Déploiement** : Compatible Render, Railway, Heroku

### Frontend

- **React + TypeScript** : UI moderne et typée
- **Vite** : Build ultra-rapide
- **React Query** : Gestion efficace des requêtes et du cache
- **React Router** : Navigation SPA
- **Tailwind CSS** : Design responsive et thématique Star Wars
- **React Hook Form** : Gestion des formulaires
- **Déploiement** : Netlify, Vercel

## ✨ Fonctionnalités Clés

- Authentification JWT (login obligatoire)
- Recherche unifiée sur toutes les catégories SWAPI
- Filtres par type (personnages, vaisseaux, etc.)
- Résultats détaillés avec liens internes
- Design immersif Star Wars (fond animé, polices, effets)
- Responsive mobile (fixe les problèmes de viewport)
- Gestion des erreurs et des états de chargement
- Tests unitaires (Jest) pour backend et frontend

## 🛠️ Lancer les tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 🧑‍💻 Améliorations Possibles

- Pagination des résultats
- Favoris utilisateur
- Mode sombre/clair
- Recherche avancée (facettes, suggestions)
- Notifications push
- Passage à GraphQL
- Monitoring et analytics
- Internationalisation (i18n)

## 📂 Structure du projet

```
backend/
  src/
    controllers/
    middleware/
    routes/
    services/
    types/
    index.ts
frontend/
  src/
    components/
    contexts/
    hooks/
    lib/
    pages/
    types/
    App.tsx
```

## 📝 Contribution

1. Fork du repo
2. Crée une branche (`feature/ma-fonctionnalite`)
3. Commit & push
4. Ouvre une Pull Request

## 📜 Licence

MIT

---

Que la Force soit avec vous !
