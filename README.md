# SO PEKOCKO
Ce dépôt contient le site web pour le P6 du parcours **DEVELOPPEUR WEB**, intitulé **SoPekocko - Piquante**.


## Technologies

**100% JavaScript & Typescript**, ce projet a été réalisé à partir de l'IDE Visual Studio Code.


## Objectif

SoPecocko souhaite lancer une application web de gestion et notation de sauce piquante.
L'objectif de ce projet consistait en la création de la partie back-end sécurisée de l'application, en Javascript & Typescript.
L'utilisation d'Express.js était requise par le client.
Le stockage des données devait être réalisé en utilisant une base NoSQL MongoDB
La partie front-end avait été développée via Angular.


## Langue

L'application devait uniquement être disponible en **Français**.


## Éléments fournis par l'entreprise

- Spécifications fonctionnelles de l'API
- Modèles de données implémentés en Front-End
- Notes de cadrage de la product owner


## Cahier des charges et contraintes

### Sécurité

- L’API doit respecter le RGPD et les standards OWASP
- Le mot de passe des utilisateurs doit être chiffré
- 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données
- La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine
- L’authentification est renforcée sur les routes requises
- Les mots de passe sont stockés de manière sécurisée
- Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs
- Toutes les routes utilisées doivent exiger un jeton d'authentification (Token)


### Spécificités et fonctionnalités

- Le développeur back-end doit créer la base de données et y intégrer un catalogue de produits
- Le développeur back-end devra implémenter les fonctionnalités du CRUD (Create / Read / Update / Delete)
- Les utilisateurs doivent pouvoir créer un compte sécurisé et s'authentifier
- Les utilisateurs authentifiés peuvent créer une fiche produit détaillée avec ses caractéristiques
- Les utilisateurs de l'application doivent pouvoir afficher le catalogue des produits
- Les utilisateurs doivent pouvoir consulter la fiche détaillée de chaque produit
- Les utilisateurs authentifiés peuvent liker ou disliker les produits de leur choix
- Le créateur d'un produit doit pouvoir le modifier et/ou le supprimer
- L'appréciation des utilisateurs est enregistrée dans une base de données
- L'appréciation d'un utilisateur donné est visible lorsqu'il consulte la fiche produit depuis son compte
  

### Technologies à utiliser

- Framework : Express
- Serveur : NodeJS
- Base de données : MongoDB
- Plugin ORM : Mongoose
- Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts


### Qualité de code

- Le code doit être correctement indenté
- Le code doit contenir des commentaires
- Les promesses Javascript doivent être utilisées lors des appels ajax


## Captures d'écran

### Accueil / Catalogue

![Visuel Index](https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/54c9165c-5173-4d97-b0a3-7aa93a2da342)


### Fiche produit
![Fiche produit](https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/0a97a987-0bb6-4b84-9d06-abfa4ffd9383)



## Démonstration vidéo

### Inscription utilisateur

https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/33d94378-1880-4c36-af90-7ead8ae97a51


### Authentification utilisateur

https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/3fa27647-4912-411a-b1a3-28a80186dec6


### Création d'un produit

https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/f2b50f1b-9a9e-46ca-960d-e078619ded3f


### Like / Dislike d'un produit

https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/533c03af-fa41-49f4-a977-d5b1a8333ee9



https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/584d0931-60b1-4d16-89f4-9fe51296bdb4


### Modification d'un produit

https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/c4050ff6-3e63-4979-bbcb-b808dff7e4a6

https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/e184131d-4115-43a5-a00c-44f3b5a76554


### Suppression d'un produit 

https://github.com/benlinux1/BenoitVINCENT_6_21012021/assets/78255467/4be881f2-d805-4966-be3f-a10286c8f956












