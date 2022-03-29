const express = require('express')
const router = express.Router()

router.use(express.static('public'))

const actorRoutes = require('./routes/actorRoutes')
//Create actorRoutes.js inside of/ routes
const filmRoutes = requies('./routes/filmRoutes')

router.use('/actor', actorRoutes)
router.use('/film', filmRoutes)

router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'Home',
        name: 'Sakila Home Page'
    })
})

router.get('*', (req, res)=> {
    if(req.url == '/favion.ico/') {
        res.end()
    } else {
        res.send('<h1>404 ERROR This page does not exist!</h1>')
    }
})

module.exports = router;