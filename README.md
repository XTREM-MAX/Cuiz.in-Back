# Cuiz.in-Back

### Stack :
 - Angular (Front) 
 - TypeScript (Langage Front/Back)
 - ExpressJS (Proxy API Nutriwi)
 - Sequelize (ORM)
 - NodeJS (Back-End)
 - MySQL (Base de donnée)
 - SCSS (Langage du style) avec préprocsseur SASS
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
 #### /user/connexion
  * email: string;
  * password: string;
  * renvoie un code 200 avec un token
  * renvoie une erreur 451 dans le cas où le mdp/email ne correspond pas ou si il n'y a pas d'utilisateur avec ce mail

 #### /user/register
  * email: string;
  * password: string;
  * name: string;
  * renvoie un code 200 avec un token
  * renvoie une erreur 450 dans le cas où l'email existe déjà
