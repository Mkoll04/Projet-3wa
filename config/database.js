import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "mariusmoura", // identifiant BDD
    password: "ee7871e8385a7fd08fb4e0851ac8e552", // le password
    database: "mariusmoura_", // nom de la base de donnée
});