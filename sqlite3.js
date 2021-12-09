// import
const sqlite3 = require('sqlite3').verbose()

let cabecalho = "<tr class=\"dbTitle\"><th>id</th><th>host</th><th>name</th></tr>"

let errorMsg = '<p>Invalid Path, Please try again</p>'


// export
module.exports = {
// conection function
    conecta(conexao,el){
        let db = new sqlite3.Database(conexao, sqlite3.OPEN_READWRITE, (error)=>{
            if(error){
                console.log(error.message)
                el.innerHTML = errorMsg + `<p>error => ${error.message}</p>`
            }
            else{
                console.log('Conected to datbase successfully')
            }
        })
        return db
    },
//calls the conection function and run the query 
    busca(conexao, q, el){
        el.innerHTML = cabecalho
        let db = this.conecta(conexao,el).all(q, [], (error, row)=>{
            if(error){
                console.log(error)
            }
            let linhas = Object.values(row)           
            this.render(el, linhas)
        })

        db.close((error)=>{
            if(error){
                console.log(error)
            }
        })

    },

    // renderiza na tela
    render(el, list){
        return new Promise((resolve, reject)=>{

            for(let i = 0; i < list.length; i++){
    
                el.innerHTML +=  `<tr><td>${list[i].id}</td><td>${list[i].host}</td><td>${list[i].name}</td></tr>`
        
            }

        }) 
    },
    

}