const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// All Actor
router.get('/', (req, res)=> {
    const url = 'http://localhost:3000/api/actor'
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/actor', {
            title: 'Actors',
            name: 'Actors',
            data
        })
    })
})

//Single Actor
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const url = `http://localhost:3000/api/actor/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/actor_single', {
            title: `${data.first_name} ${data.last_name}`,
            name:`${data.first_name} ${data.last_name}`,
            data            
        })
    })
})

module.exports = router