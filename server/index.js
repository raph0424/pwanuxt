const mysql = require('mysql')
const bodyParser = require("body-parser")
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
const session = require('express-session')
const connectredis = require('connect-redis')
const RedisStore = connectredis(session)
const redis = require('./utils/redis')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : '3306',
  password : '',
  database : 'student'
});
 

async function start () {
  
    app.use(bodyParser.json ());
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  connection.connect();

  app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
  store: new RedisStore({
    client: redis,
    logErrors: true
  })
}))
  // Give nuxt middleware to express
  app.get('/api/test',function(req,res){
    console.log(req.session)
    res.send({helloword:req.session.email})
  })
  app.post('/api/login', function(req,res){
    connection.query('SELECT * FROM `etudiant` WHERE `email` = ?', [req.body.email], function (error, results, fields) {
      if (results.length && results[0].password == req.body.password){
        res.send({authsuccess:true})
        req.session.email = req.body.email
        //req.session.email ne sauvegarde pas les données dans la session sur plus d'une page
        console.log(req.session)
        return
      }else{
        res.send({authsuccess:false})
      }
    })  
  })
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
