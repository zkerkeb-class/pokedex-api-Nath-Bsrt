## Concepts à Comprendre
1. REST API
   - Méthodes HTTP (GET, POST, PUT, DELETE)
   - Codes de statut HTTP
   - Structure des URL
   - CORS (Cross-Origin Resource Sharing)

2. Express.js
   - Routing
   - Middleware
   - Gestion des requêtes et réponses
   - Configuration CORS

3. Sécurité de Base
   - Validation des entrées
   - Authentification
   - Gestion des erreurs
   - Politiques CORS

## Configuration CORS
CORS (Cross-Origin Resource Sharing) est un mécanisme qui permet à de nombreuses ressources (polices, JavaScript, etc.) d'une page web d'être demandées à partir d'un autre domaine que celui du domaine d'origine.

Pour utiliser l'API depuis un autre domaine :
1. L'API est configurée avec CORS activé
2. Toutes les origines sont autorisées dans cette version de développement
3. En production, vous devriez restreindre les origines autorisées

Pour une configuration plus restrictive, vous pouvez modifier les options CORS :

```javascript
app.use(cors({
  origin: 'https://votre-domaine.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Ressources Additionnelles
- [Documentation Express.js](https://expressjs.com/fr/)
- [Guide des Status HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)

## Support
Pour toute question ou problème :
1. Vérifiez la documentation
2. Consultez les messages d'erreur dans la console
3. Demandez de l'aide à votre formateur

## Prochaines Étapes
- Ajout d'une base de données (MongoDB)
- Implémentation de tests automatisés
- Déploiement de l'API
- Documentation avec Swagger

## Gestion des Fichiers Statiques
Le serveur expose le dossier `assets` pour servir les images des Pokémon. Les images sont accessibles via l'URL :
```
http://localhost:3000/assets/pokemons/{id}.png
```

Par exemple, pour accéder à l'image de Pikachu (ID: 25) :
```
http://localhost:3000/assets/pokemons/25.png
```

### Configuration
Le middleware `express.static` est utilisé pour servir les fichiers statiques :
```javascript
app.use('/assets', express.static(path.join(__dirname, '../assets')));
```

### Sécurité
- Seuls les fichiers du dossier `assets` sont exposés
- Les autres dossiers du projet restent inaccessibles
- En production, considérez l'utilisation d'un CDN pour les fichiers statiques

# Pokédex Nath-Bsrt

Bienvenue dans le projet **Pokédex Nath-Bsrt** ! 🌟

Cette application web full-stack permet de :

- S’enregistrer et se connecter de manière sécurisée (JWT)
- Parcourir et consulter la liste des Pokémons (données issues de MongoDB)
- **Voir le détail de chaque Pokémon** : nom, types, statistiques, évolutions possibles, et version shiny
- **Ajouter, modifier et supprimer un Pokémon** (authentification requise)
- Ajouter des Pokémons à vos **favoris** et les consulter à tout moment
- Jouer au mini-jeu **"Who’s That Pokémon ?"** :  
  Essayez de deviner un maximum de Pokémon en 1 minute, en accumulant des points.  
  À la fin, votre meilleur score est sauvegardé et visible dans le **leaderboard du jeu**.
- Accéder à un **comparateur de Pokémons** pour visualiser leurs statistiques côte à côte et comparer l'efficacité de leurs types.

---

## 📚 Structure du projet

Le projet est divisé en deux dossiers principaux :

- [`pokedex-api-Nath-Bsrt/`](https://github.com/zkerkeb-class/pokedex-api-Nath-Bsrt.git) : le backend (API REST avec Node.js + Express + MongoDB)
- [`pokedex-starter-Nath-Bsrt/`](https://github.com/zkerkeb-class/pokedex-starter-Nath-Bsrt.git) : le frontend (React.js + Vite)

---

## 🛠️ Instructions d'installation

1. **Cloner les deux dépôts**

    ```bash
    git clone https://github.com/zkerkeb-class/pokedex-api-Nath-Bsrt.git
    git clone https://github.com/zkerkeb-class/pokedex-starter-Nath-Bsrt.git
    ```

2. **Installer les dépendances**

    **Pour l’API :**
    ```bash
    cd pokedex-api-Nath-Bsrt
    npm install
    ```

    **Pour le frontend :**
    ```bash
    cd ../pokedex-starter-Nath-Bsrt
    npm install
    ```

3. **Lancer la base de données**

    Assurez-vous d'avoir MongoDB démarré en local :
    ```bash
    mongod
    ```

4. **Démarrer les serveurs**

    **Backend :**
    ```bash
    cd pokedex-api-Nath-Bsrt
    npm run dev
    ```

    **Frontend :**
    ```bash
    cd ../pokedex-starter-Nath-Bsrt
    npm run dev
    ```

    Accédez à l’application sur : [http://localhost:5173](http://localhost:5173)

---

## 📚 Documentation de l’API

### Authentification

| Méthode | URL                      | Description                                |
|---------|--------------------------|--------------------------------------------|
| POST    | `/api/users/register`    | Inscription d'un nouvel utilisateur        |
| POST    | `/api/users/login`       | Connexion d'un utilisateur                 |

### Pokémons

| Méthode | URL                     | Description                                      |
|---------|-------------------------|--------------------------------------------------|
| GET     | `/api/pokemons`         | Liste de tous les Pokémons                       |
| GET     | `/api/pokemons/:id`     | Détail d'un Pokémon par ID                       |
| POST    | `/api/pokemons`         | **Créer un nouveau Pokémon** (auth requise)      |
| PUT     | `/api/pokemons/:id`     | **Modifier un Pokémon** (auth requise)           |
| DELETE  | `/api/pokemons/:id`     | **Supprimer un Pokémon** (auth requise)          |

### Favoris

| Méthode | URL                             | Description                                   |
|---------|---------------------------------|-----------------------------------------------|
| POST    | `/api/users/favorites`          | Ajouter un Pokémon aux favoris (auth req.)    |
| GET     | `/api/users/favorites`          | Récupérer la liste de ses Pokémons favoris    |
| DELETE  | `/api/users/favorites/:pokemonId`| Retirer un Pokémon de ses favoris             |

### Jeu "Who’s That Pokémon ?"

| Méthode | URL                      | Description                           |
|---------|--------------------------|---------------------------------------|
| POST    | `/api/game/score`        | Enregistrer le score d’une partie     |
| GET     | `/api/game/leaderboard`  | Obtenir le leaderboard du mini-jeu    |

### Comparateur

| Méthode | URL                                 | Description                          |
|---------|-------------------------------------|--------------------------------------|
| POST    | `/api/pokemons/compare`             | Comparer deux Pokémons (statistiques)|

---

## 🎥 Vidéo de démonstration

▶️ [Lien YouTube vers la démo du projet](https://youtu.be/smd7G93yZ8w)

---

💚 Bon visionnage ! 🌟

---


