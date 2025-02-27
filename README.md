📱 Présentation du projet - GraphQL Social Media Project
GraphQL Social Media est une plateforme de réseau social complète permettant aux utilisateurs de partager des publications, d'interagir via des commentaires et des likes. Le projet est composé de deux parties:

- Backend: API GraphQL avec Apollo Server et Prisma
- Frontend: Interface utilisateur interactive construite avec React + Vite

Ce réseau social implémente toutes les fonctionnalités essentielles: authentification sécurisée, gestion de contenu, interactions entre utilisateurs.


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
