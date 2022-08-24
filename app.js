const express = require('express')

const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const {success , getUniqueId} = require('./helper.js')
const sequelize = require('./src/db/sequelize')


const app = express()
const port = process.env.PORT || 3000






// app.use((req , res , next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// })

app
 .use(favicon(__dirname + "/favicon.ico"))
 .use(bodyParser.json())

sequelize.initDb()

// ici, bnous placerons nos future points de terminaison

app.get('/' ,(req,res) => {

    res.json('Hello, Heroku')
})

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// on ajoute la gestion des erreurs 404.

app.use(({res}) => {

    const message = "impossible de trouver la ressource demandé ! VOus pouvez essayer une autre URL."
    res.status(404).json({message})
})

// app.get('/' , (req,res) => res.send('Hello, Express 2 !'))

// app.get('/api/pokemons' , (req,res) => {

   
//     const nombrePokemons = pokemons.length
//     const message = `La liste des pokemon a été trouvé, il y a ${nombrePokemons} pokemon dans le pokédex.`

//     // res.send(`Il y a ${nombrePokemons} pokemons dans le pokédex pour le moment`)
//     res.json(success(message,pokemons))
    
    
// })

// app.get('/api/pokemons/:id' , (req,res) => {

//     const id = parseInt(req.params.id)
//     const pokemon = pokemons.find(pokemon => pokemon.id === id )
//     const message = "un pokemon a été trouvé."
//     // res.send(`Vous avez demandé le pokemon ${pokemon.name} .`)
//     res.json(success(message,pokemon))

    
// })

// app.post('/api/pokemons' , (req,res) => {

//     const id = getUniqueId(pokemons)
//     const pokemonCreated = {...req.body,...{id : id, created : new Date()}}
//     pokemons.push(pokemonCreated)
//     const message = `le pokemon ${pokemonCreated.name} a été créé. `
//     res.json(success(message,pokemonCreated))
// })

// app.put('/api/pokemons/:id' , (req,res) => {

//     const id = parseInt(req.params.id)
//     const pokemonUpdated = {...req.body,id :id }
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`
//     res.json(success(message,pokemonUpdated))
// })


// app.delete('/api/pokemons/:id' , (req,res) => {
//     const id = parseInt(req.params.id)
//     const pokemonDelete = pokemons.find(pokemon => pokemon.id === id)
//     pokemons.filter(pokemon => pokemon.id !== id)
//     const message = `Le pokemon ${pokemonDelete.name} a bien été supprimé.`
//     res.json(success(message,pokemonDelete))

    
// })

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))