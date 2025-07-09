# 🛰️ Star Wars - Système de recherche de l'Alliance Rebelle

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

#### Variables d'environnement (CORS, etc.)

Le backend utilise [dotenv](https://www.npmjs.com/package/dotenv) pour charger les variables d'environnement depuis un fichier `.env` à la racine du dossier `backend`.

Exemple de fichier `backend/.env` pour le développement local :

```
ORIGIN_URL=http://localhost:5173
```

En production (ex : Render), ne pas oublier de définir la variable d'environnement `ORIGIN_URL` dans le dashboard Render pour autoriser le frontend déployé (ex : `https://swapi-search-hdy.netlify.app`).

Dans la configuration CORS du backend, la valeur utilisée est :

```js
origin: [process.env.ORIGIN_URL || "http://localhost:5173"];
```

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
- **dotenv** : Gestion des variables d'environnement
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
