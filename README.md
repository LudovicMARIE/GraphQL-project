📱 Présentation du projet - GraphQL Social Media Project
GraphQL Social Media est une plateforme de réseau social complète permettant aux utilisateurs de partager des publications, d'interagir via des commentaires et des likes. Le projet est composé de deux parties:

- Backend: API GraphQL avec Apollo Server et Prisma
- Frontend: Interface utilisateur interactive construite avec React + Vite

Ce réseau social implémente toutes les fonctionnalités essentielles: authentification sécurisée, gestion de contenu, interactions entre utilisateurs.

.env back 
# JWT
JWT_SECRET=ezlfjQERGergzERGrg
JWT_EXPIRES_IN=604800
# Serveur
PORT=4000


# 🚀 Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)](https://www.apollographql.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

## 📋 Table des matières

- [À propos](#-à-propos)
- [Structure du projet](#-structure-du-projet)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Modèles de données](#-modèles-de-données)
- [API GraphQL](#-api-graphql)
- [Authentification](#-authentification)
- [Scripts](#-scripts)
- [Fonctionnalités à développer](#-fonctionnalités-à-développer)

## 🌐 À propos

Le backend du projet "GraphQL Social Media" est une API GraphQL complète construite avec Apollo Server et Prisma. Cette API permet aux utilisateurs de s'inscrire, de publier des articles, de commenter et d'interagir via un système de "likes".

## 📂 Structure du projet

```
backend/
├── prisma/                # Configuration et migrations Prisma
│   ├── migrations/        # Migrations historiques
│   ├── schema.prisma      # Schéma de la base de données
│   └── dev.db             # Base de données SQLite
├── scripts/               # Scripts utilitaires
│   └── register.js        # Script pour l'enregistrement des utilisateurs
├── src/
│   ├── index.ts           # Point d'entrée de l'application
│   ├── schema.ts          # Schéma GraphQL
│   ├── types.ts           # Types TypeScript
│   ├── context/           # Configuration du contexte
│   ├── datasources/       # Sources de données
│   ├── models/            # Modèles de données
│   ├── modules/           # Modules du serveur (auth, etc.)
│   ├── mutations/         # Mutations GraphQL
│   │   ├── articles/      # Mutations pour les articles
│   │   ├── comments/      # Mutations pour les commentaires
│   │   ├── likes/         # Mutations pour les likes
│   │   └── users/         # Mutations pour les utilisateurs
│   └── resolvers/         # Resolvers GraphQL
└── codegen.ts             # Configuration de GraphQL Codegen
```

## 🛠 Technologies

- **Node.js** - Environnement d'exécution
- **TypeScript (v5.7.3)** - Langage de programmation avec typage strict
- **Apollo Server (v4.11.3)** - Serveur GraphQL
- **Prisma (v6.4.1)** - ORM pour la base de données
- **GraphQL (v16.10.0)** - Langage de requête pour les API
- **JWT (v9.0.2)** - Authentification basée sur les tokens
- **bcrypt (v5.1.1)** - Cryptage de mots de passe

## 📥 Installation

1. Clonez le répertoire du projet

```bash
git clone <url-du-repository>
cd <nom-du-projet>/backend
```

2. Installez les dépendances

```bash
npm install
```

3. Configurez la base de données
```bash
npx prisma migrate dev --name init
```

4. Lancez le serveur
```bash
npm run dev
```

Le serveur sera accessible à l'adresse suivante: `http://localhost:4000/`

## ⚙️ Configuration

Créez un fichier `.env` à la racine du dossier backend avec les variables suivantes:

```env
# Base de données
DATABASE_URL="file:./prisma/dev.db"

# JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN="24h"

# Serveur
PORT=4000
```

## 💾 Modèles de données

Le projet utilise les modèles Prisma suivants:

- **User** - Utilisateurs de l'application
- **Article** - Publications créées par les utilisateurs
- **Comment** - Commentaires sur les articles
- **Like** - Interactions "j'aime" sur les articles

Pour plus de détails, consultez le fichier `prisma/schema.prisma`.

## 📡 API GraphQL

### Principales Queries

```graphql
getAllArticles: [Article!]!
getArticlesByUserId(userId: ID!): [Article!]!
getArticleById(articleId: ID!): Article!
likeCount(articleId: ID!): Int!
```

### Principales Mutations

```graphql
createUser(email: String!, password: String!, username: String!, bio: String): CreateUserResponse
signIn(email: String!, password: String!): SignInResponse
createArticle(title: String!, content: String!, published: Boolean): CreateArticleResponse!
toggleLike(userId: ID!, articleId: ID!): LikeToggleResponse!
createComment(authorId: ID!, articleId: ID!, content: String!): CreateCommentResponse
```

## 🔐 Authentification

Le système d'authentification utilise JWT (JSON Web Tokens):

1. Les utilisateurs s'inscrivent via la mutation `createUser`
2. Connexion via la mutation `signIn` qui renvoie un token JWT
3. Ce token doit être inclus dans l'en-tête HTTP `Authorization` pour les requêtes authentifiées

## 📜 Scripts

- **Dev**: `npm run dev` - Démarrage avec hot-reload pour le développement
- **Prisma Studio**: `npx prisma studio` - Interface visuelle pour la base de données (port 5555)
- **Générer les types**: `npm run generate` - Génère les types TypeScript à partir du schéma GraphQL

## 🚀 Fonctionnalités à développer

### Système de tags pour les articles

Bien que la structure de données pour les tags soit déjà présente dans le schéma Prisma, les fonctionnalités suivantes restent à implémenter:

1. **API GraphQL pour les tags**:
   ```graphql
   type Query {
     getAllTags: [Tag!]!
     getTagById(id: ID!): Tag
     getArticlesByTag(tagId: ID!): [Article!]!
   }

   type Mutation {
     createTag(name: String!): CreateTagResponse!
     addTagToArticle(articleId: ID!, tagId: ID!): AddTagResponse!
     removeTagFromArticle(articleId: ID!, tagId: ID!): RemoveTagResponse!
   }
   ```

2. **Implémentation des resolvers**:
   - Créer les fichiers de resolvers dans `src/resolvers/`
   - Ajouter la logique pour gérer les tags dans les mutations d'articles

3. **Interface utilisateur**:
   - Ajouter la sélection de tags lors de la création d'articles
   - Implémenter un système de filtrage des articles par tag

### Système de follow entre utilisateurs

Le modèle `Follow` est déjà défini dans le schéma Prisma, mais les fonctionnalités associées doivent être développées:

1. **API GraphQL pour les follows**:
   ```graphql
   type Query {
     getFollowers(userId: ID!): [User!]!
     getFollowing(userId: ID!): [User!]!
     isFollowing(followerId: ID!, followingId: ID!): Boolean!
   }

   type Mutation {
     followUser(followerId: ID!, followingId: ID!): FollowResponse!
     unfollowUser(followerId: ID!, followingId: ID!): UnfollowResponse!
   }
   ```

2. **Implémentation des resolvers**:
   - Créer les fichiers nécessaires dans `src/resolvers/` et `src/mutations/`
   - Gérer les relations entre utilisateurs

3. **Flux d'activité**:
   - Développer une requête pour obtenir les articles des utilisateurs suivis
   - Implémenter un système de notifications pour les nouvelles publications

# 🖥️ Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Apollo Client](https://img.shields.io/badge/Apollo%20Client-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)](https://www.apollographql.com/docs/react/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

.env : 
VITE_API_BASE_URL=http://localhost:4000/graphql

## 📋 Table des matières

- [À propos](#-à-propos-1)
- [Structure du projet](#-structure-du-projet-1)
- [Technologies](#-technologies-1)
- [Installation](#-installation-1)
- [Fonctionnalités](#-fonctionnalités)
- [État des composants](#-état-des-composants)
- [Connexion à l'API](#-connexion-à-lapi)
- [Gestion de l'authentification](#-gestion-de-lauthentification)
- [Scripts](#-scripts-1)
- [Problèmes connus](#-problèmes-connus)
- [Fonctionnalités à développer](#-fonctionnalités-à-développer-1)

## 🌐 À propos

Le frontend du projet "GraphQL Social Media" est une interface utilisateur interactive développée avec React et Vite. Cette application permet aux utilisateurs de s'inscrire, se connecter, créer et gérer des publications, ainsi que d'interagir avec les publications d'autres utilisateurs via des commentaires et des likes.

## 📂 Structure du projet

```
frontend/
├── public/                # Fichiers statiques
│   ├── favicon.ico        # Icône du site
│   └── ...                # Autres ressources statiques
├── src/
│   ├── components/        # Composants React réutilisables
│   │   ├── Article/       # Composants liés aux articles
│   │   ├── Auth/          # Composants d'authentification
│   │   ├── Comment/       # Composants de commentaires
│   │   ├── Layout/        # Composants de mise en page
│   │   ├── Profile/       # Composants de profil
│   │   └── UI/            # Composants d'interface utilisateur
│   ├── context/           # Contextes React
│   │   └── AuthContext.tsx # Contexte d'authentification
│   ├── graphql/           # Requêtes et mutations GraphQL
│   │   ├── articles/      # Opérations GraphQL pour les articles
│   │   ├── comments/      # Opérations GraphQL pour les commentaires
│   │   ├── likes/         # Opérations GraphQL pour les likes
│   │   └── users/         # Opérations GraphQL pour les utilisateurs
│   ├── hooks/             # Hooks personnalisés
│   ├── pages/             # Pages de l'application
│   │   ├── ArticlePage.tsx # Page de détail d'un article
│   │   ├── HomePage.tsx   # Page d'accueil
│   │   ├── LoginPage.tsx  # Page de connexion
│   │   ├── ProfilePage.tsx # Page de profil
│   │   └── RegisterPage.tsx # Page d'inscription
│   ├── types/             # Types TypeScript
│   ├── utils/             # Fonctions utilitaires
│   ├── App.tsx            # Composant principal
│   ├── main.tsx           # Point d'entrée de l'application
│   └── apolloClient.ts    # Configuration Apollo Client
├── .eslintrc.js           # Configuration ESLint
├── tsconfig.json          # Configuration TypeScript
├── vite.config.ts         # Configuration Vite
└── package.json           # Dépendances et scripts
```

## 🛠 Technologies

- **React** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **Vite** - Outil de build rapide pour le développement
- **TypeScript** - Langage de programmation avec typage statique
- **Apollo Client** - Client GraphQL pour communiquer avec l'API backend
- **React Router** - Navigation entre les pages
- **CSS Modules** - Styles modulaires pour les composants

## 📥 Installation

1. Clonez le répertoire du projet (si ce n'est pas déjà fait)

```bash
git clone <url-du-repository>
cd <nom-du-projet>/frontend
```

2. Installez les dépendances

```bash
npm install
```

3. Configurez l'environnement

Créez un fichier `.env.local` à la racine du dossier frontend avec les variables suivantes:

```env
VITE_API_URL=http://localhost:4000/graphql
```

4. Lancez l'application en mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse suivante: `http://localhost:5173/`

## ✨ Fonctionnalités

Le frontend implémente les fonctionnalités suivantes:

### 👤 Authentification

- **Inscription**: Créer un nouveau compte utilisateur
- **Connexion**: Se connecter à un compte existant
- **Déconnexion**: Se déconnecter de l'application

### 📝 Gestion des articles

- **Création**: Publier de nouveaux articles
- **Consultation**: Voir tous les articles ou un article spécifique
- **Suppression**: Supprimer ses propres articles

### 💬 Interaction sociale

- **Commentaires**: Ajouter des commentaires aux articles
- **Likes**: Aimer/ne plus aimer des articles

## 🔄 État des composants

L'application utilise plusieurs approches pour la gestion de l'état:

- **Context API**: Pour les données globales comme l'authentification
- **Apollo Client Cache**: Pour les données provenant de l'API GraphQL
- **Local State**: Pour les états de formulaires et les données temporaires

## 🔌 Connexion à l'API

La communication avec le backend se fait via Apollo Client qui est configuré dans `src/apolloClient.ts`:

```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
```

## 🔐 Gestion de l'authentification

L'authentification est gérée via:

1. Un contexte d'authentification (`AuthContext.tsx`) qui stocke l'état de connexion de l'utilisateur
2. Des tokens JWT stockés dans le localStorage
3. L'ajout automatique du token d'authentification aux requêtes GraphQL

Exemple d'implémentation du contexte d'authentification:

```tsx
import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 📜 Scripts

- **Dev**: `npm run dev` - Démarrage en mode développement
- **Build**: `npm run build` - Construction de l'application pour la production
- **Preview**: `npm run preview` - Prévisualisation de la version de production
- **Lint**: `npm run lint` - Vérification du code avec ESLint

## 🐛 Problèmes connus

- L'actualisation de la page peut parfois déconnecter l'utilisateur
- Les formulaires ne conservent pas leur état après une soumission échouée
- L'application n'est pas encore entièrement responsive pour les appareils mobiles

## 🚀 Fonctionnalités à développer

### Interface pour le système de tags

Pour compléter le développement backend des tags, l'interface frontend doit inclure:

1. **Composant de sélection de tags**:
   - Ajout d'un sélecteur de tags lors de la création d'articles
   - Affichage des tags sur les cartes d'articles

2. **Filtrage par tags**:
   - Ajout d'un système de filtrage des articles par tag
   - Création d'une page dédiée aux articles par tag

### Interface pour le système de follow

Pour implémenter le système de follow entre utilisateurs:

1. **Profils utilisateurs**:
   - Amélioration des pages de profil
   - Ajout de boutons "Suivre"/"Ne plus suivre"

2. **Fil d'actualité personnalisé**:
   - Développement d'un fil d'actualité montrant uniquement les publications des utilisateurs suivis
   - Implémentation d'un système de notifications pour les nouvelles publications
