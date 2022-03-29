const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// All Film
router.get('/', (req, res)=> {
    const url = 'http://localhost:3000/api/film'
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/film', {
            title: 'Films',
            name: 'Films',
            data
        })
    })
})

//Single Film
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const url = `http://localhost:3000/api/film/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/film_single', {
            title: `${data.title}`,
            name:`${data.title}`,
            data            
        })
    })
})

module.exports = router