# Cuiz.in-Back

### Stack :
 - Angular (Front) 
 - TypeScript (Langage Front/Back)
 - ExpressJS (API)
 - Sequelize (ORM)
 - NodeJS (Back-End)
 - MySQL (Base de donnée)
 - SCSS (Langage du style) avec préprocesseur SASS
 - Socket.io (Communication en temps réel Back-Front)
 - Bcrypt (hash des mots de passe avec salt)

### API Utilisée :
 - Nutriwi (API pour obtenir les recettes de cuisine)

### Services utilisés pour le développement :
 - Figma (pour créer les interfaces)
 - GitHub (pour partager le code)

### Technologies utilisées pour l’environnement de production :
 - Nginx (Reverse-proxy)
 - Docker (Conteneurisation des programmes)
 - Linux (Système d’exploitation du vps)

### Routes, Paramètres et réponses HTTP :
 * Toutes les requêtes renvoient du JSON
 * Toutes les requêtes renvoient un code 500 en cas d'erreur serveur
 * Toutes les requêtes renvoient un code 400 si tous les paramètres obligatoires ne sont pas spécifiés
 * Toutes les requêtes POST doivent comporter des paramètres en JSON
 * Toutes les requêtes avec (Authorization: token) doivent avoir dans leurs Header un champs Authorization avec le token d'accès utilisateur

 #### /user/connexion POST
  * [Fichier](./src/routers/user/routeConnexion/RouteConnexion.ts)
  * Description : Connecte un nouvel utilisateur et renvoie un token de connexion
  * Paramètres : email, password
  * renvoie un code 200 avec un token, l'email et le nom de l'utilisateur en JSON
  * renvoie une erreur 451 dans le cas où le mdp n'existe pas
  * renvoie une erreur 452 dans le cas où le mail n'existe pas

 #### /user/register POST
  * [Fichier](./src/routers/user/routeRegister/RouteRegister.ts)
  * Description : Inscrit un nouvel utilisateur et renvoie un token de connexion
  * Paramètres : email, password, name
  * renvoie un code 200 avec un token, l'email et le nom de l'utilisateur en JSON
  * renvoie une erreur 450 dans le cas où l'email existe déjà

 #### /recipe/random GET
  * [Fichier](./src/routers/recipe/routeRandomRecipe/RouteRandomRecipe.ts))
  * Description : Renvoie une recette aléatoire
  * [Réponse](./src/routers/recipe/routeRandomRecipe/RouteRandomRecipeResponse.ts)

 #### /recipe/:recipe_id/details GET
  * [Fichier](./src/routers/recipe/routeGetRecipeDetails/routeGetRecipeDetails.ts)
  * Description : Récupère tous les détails d'une recette depuis son ID
  * [Réponse](./src/interfaces/ProxyRecipeDetails.ts)
 
 #### /recipe/search POST
  * [Fichier](./src/routers/recipe/routeSearchRecipe/RouteSearchRecipe.ts)
  * Description : Renvoie une liste de recettes répondant aux critères de recherche suivant :
  * [Paramètres](./src/routers/recipe/routeSearchRecipe/RouteSearchRecipeRequest.ts)
  * [Réponse](./src/routers/recipe/routeSearchRecipe/RouteSearchRecipeResponse.ts)

 #### /recipe/all/ GET (Authorization: token)
  * [Fichier](./src/routers/recipe/routeGetAllLikedRecipes/RouteGetAllLikedRecipes.ts)
  * Description : Renvoie toutes les recettes de l'utilisateur
  * [Réponse](./src/database/models/likedRecipe/LikedRecipeModel.ts)

 #### /recipe/add GET (Authorization: token)
  * [Fichier](./src/routers/recipe/routeAddLikedRecipe/RouteAddLikedRecipe.ts)
  * Description : Ajoute un recette depuis son id et renvoie la recette ajoutée
  * Paramètre : recipe_id
  * Renvoie une erreur 460 si cette recette est déjà enregistrée pour cet utilisateur
  * [Réponse](./src/database/models/likedRecipe/LikedRecipeModel.ts)

 #### /recipe/:recipe_id/ GET (Authorization: token)
  * [Fichier](./src/routers/recipe/routeGetLikedRecipe/RouteGetLikedRecipe.ts)
  * Description : Renvoie une recette depuis son ID
  * Renvoie une erreur 430 si il n'y a pas de recette avec cet ID
  * [Réponse](./src/database/models/likedRecipe/LikedRecipeModel.ts)
 
 #### /recipe/:recipe_id/remove GET (Authorization: token)
  * [Fichier](./src/routers/recipe/routeRemoveLikedRecipe/routeRemoveLikedRecipe.ts)
  * Description : Supprime une recette de l'utilisateur depuis son id
  * Ne fais rien si l'ID n'existe pas

 #### /user/update POST (Authorization: token)
  * [Fichier](./src/routers/user/routeUpdate/RouteUpdate.ts)
  * Description : Met à jour un nouvel utilisateur, génère un nouveau 'salt' pour le token si le mot de passe est mis à jour ce qui rend invalide tous les anciens tokens
  * Paramètres : email, password, name (met à jour un ou plusieurs champs (optionels))
  * Renvoie une erreur 460 si l'email est spécifié et qu'il existe déjà
  * Renvoie un code 200 avec le nouveau token en cas de nouveau mot de passe ou l'ancien token

 #### /user/get GET (Authorization: token)
  * [Fichier](./src/routers/user/routeGet/RouteGet.ts)
  * Description : Récupère toute les informations sur l'utilisateur actuel (email, name, createdTimestamp)

 #### /user/remove GET (Authorization: token)
  * [Fichier](./src/routers/user/routeRemove/RouteRemove.ts)
  * Description : Supprime un utilisateur
