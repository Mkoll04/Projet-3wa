import mysql from "mysql";

class BDD {
    constructor(){
        this.pool = mysql.createPool({
            connectionLimit : 10000,
            host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
            user: "mariusmoura", // identifiant BDD
            password: "ee7871e8385a7fd08fb4e0851ac8e552", // le password
            database: "mariusmoura_projet", // nom de la base de donnée
        });
    }
    
    async asyncQuery(sql, params = []){
        return new Promise((resolve, reject)=>{
            this.pool.query(sql,params, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }
}

export default BDD