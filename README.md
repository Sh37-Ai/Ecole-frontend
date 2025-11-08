# 🎓 Ecole - Frontend (Angular + JWT)

Ce dépôt contient la partie **frontend** du projet de gestion d'école.  
Il s'agit d'une application **Angular** qui communique avec le backend Spring Boot et utilise un système **d'authentification JWT** pour sécuriser certaines routes.

---

## 🚀 Fonctionnalités principales

- 🔐 **Authentification JWT**
  - Gestion du login avec token JWT fourni par le backend
  - Protection des routes sensibles avec `AuthGuard`
- 🧩 **Interface web complète**
  - Connexion et navigation principale
  - Gestion des élèves (CRUD)
  - Affichage de tableaux et cartes interactives
- 🌐 **Routage Angular**
  - Organisation des pages avec le module `Router`
  - Routes protégées avec `canActivate` pour les utilisateurs authentifiés

---

## 🧠 Objectif du projet

Le frontend vise à fournir une interface moderne et sécurisée pour interagir avec le backend.  
Il met en œuvre :
- Routage Angular pour navigation fluide  
- Sécurité via JWT pour protéger certaines pages  
- Composants réutilisables et modulaires  
- Intégration complète avec le backend Spring Boot

---

## 🧰 Stack technique

| Technologie | Usage |
|------------|------|
| Angular 15+ | Framework frontend |
| TypeScript | Langage principal |
| HTML / CSS | Templates et style |
| JWT | Authentification sécurisée |
| Angular Router | Navigation et protection des routes |
| Services Angular | Communication avec le backend (HTTP) |

---

## ⚙️ Installation et exécution

### 🧾 Prérequis
- Node.js 18+  
- npm 9+  
- Angular CLI 15+  
- Backend Spring Boot en fonctionnement (`http://localhost:8080`)

### 🔧 Étapes d’installation

```bash
# 1️⃣ Cloner le projet
git clone https://github.com/Sh37-Ai/Ecole-Frontend.git
cd Ecole-Frontend

# 2️⃣ Installer les dépendances
npm install

# 3️⃣ Lancer le serveur de développement
ng serve
