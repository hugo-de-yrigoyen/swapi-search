# 🛰️ Star Wars Rebels Alliance Search System

Bienvenue dans l'Alliance Rebelle, jeune Padawan ! Ce système permet de rechercher dans la base de données impériale pour contrecarrer les plans de l'Empire.

## 🚀 Fonctionnalités

### Backend
- **API REST** avec Node.js + TypeScript
- **Authentification** avec JWT (Luke/DadSucks)
- **Recherche unifiée** dans toutes les catégories SWAPI
- **Architecture modulaire** avec services, routes et contrôleurs
- **Gestion d'erreurs** robuste avec codes HTTP appropriés

### Frontend
- **Interface React** avec TypeScript
- **React Query** pour la gestion des données
- **Authentification** intégrée avec redirection
- **Recherche en temps réel** avec debounce
- **Filtres par type** de données
- **Fiches détaillées** pour chaque élément
- **Design responsive** et thématique Star Wars

## 🛠️ Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation Backend
```bash
cd backend
npm install
npm run dev
```

Le backend démarre sur `http://localhost:3001`

### Installation Frontend
```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173`

## 🔐 Authentification

Utilisez les identifiants suivants pour accéder au système :
- **Username:** Luke
- **Password:** DadSucks

## 🏗️ Architecture

### Backend
```
backend/
├── src/
│   ├── controllers/     # Contrôleurs des routes
│   ├── middleware/      # Middleware d'authentification
│   ├── routes/          # Définition des routes
│   ├── services/        # Services métier
│   ├── types/           # Types TypeScript
│   └── index.ts         # Point d'entrée
├── package.json
└── tsconfig.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── contexts/        # Contextes React
│   ├── hooks/           # Hooks personnalisés
│   ├── lib/             # Utilitaires et API
│   ├── pages/           # Pages de l'application
│   ├── types/           # Types TypeScript
│   └── App.tsx          # Composant principal
├── package.json
└── tailwind.config.js
```

## 🎯 Choix Techniques

### Backend
- **Hapi.js** : Framework web rapide et minimaliste
- **TypeScript** : Typage statique pour une meilleure maintenabilité
- **JWT** : Authentification stateless et sécurisée
- **Axios** : Client HTTP pour les appels SWAPI
- **Architecture modulaire** : Séparation claire des responsabilités

### Frontend
- **React** : Bibliothèque UI avec écosystème riche
- **TypeScript** : Typage statique côté client
- **React Query** : Gestion optimisée des données distantes
- **React Router** : Navigation côté client
- **Tailwind CSS** : Framework CSS utilitaire
- **React Hook Form** : Gestion optimisée des formulaires

## 🔍 Fonctionnalités Avancées

### Recherche Intelligente
- **Debounce** pour limiter les appels API
- **Recherche unifiée** dans toutes les catégories
- **Filtres par type** pour affiner les résultats
- **Gestion des états** (loading, erreur, vide)

### Expérience Utilisateur
- **Design responsive** adapté à tous les écrans
- **Thème Star Wars** immersif
- **Animations fluides** et micro-interactions
- **Navigation intuitive** avec historique

### Sécurité
- **Authentification JWT** avec middleware
- **Protection des routes** côté backend
- **Gestion des erreurs** avec codes HTTP appropriés
- **Validation des données** d'entrée

## 🚀 Améliorations Possibles

### Court terme
- [ ] Tests unitaires avec Jest
- [ ] Pagination des résultats
- [ ] Cache local avec localStorage
- [ ] Mode sombre/clair

### Moyen terme
- [ ] Base de données pour le cache
- [ ] Recherche par facettes avancée
- [ ] Favoris utilisateur
- [ ] Notifications push

### Long terme
- [ ] Microservices architecture
- [ ] GraphQL API
- [ ] Progressive Web App
- [ ] Monitoring et analytics

## 📦 Déploiement

### Backend
Déployable sur :
- Railway
- Render
- Heroku
- AWS Lambda

### Frontend
Déployable sur :
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

## 🧪 Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📜 Licence

Ce projet est sous licence MIT.

## 🖖 Remerciements

Que la Force soit avec vous !

*"Help us, Obi-Wan Kenobi. You're our only hope."*