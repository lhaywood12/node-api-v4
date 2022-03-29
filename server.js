//Build Server
const express = require('express')
const res = require('express/lib/response')
const server = express()
const PORT = process.env.PORT || 3000

//Connect to router.js
const router = require('./router')

//Create Connection
const mysql = require('mysql')
const con = mysql.createconnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

//Connect to database
con.connect((error) => {
    if(!error) {
        console.log('The database is connected, yo...Keitron')
    } else {
        console.log('ERROR', error)
    }
})

//Create all route
server.get('/api', (req, res)=> {
    res.json({
        'All Categories': `http://localhost:${PORT}/api/category`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Films': `http://localhost:${PORT}/api/film`,
    })
})

server.get('/api/:table', (req, res)=> {
    const table = req.params.table
    con.query(
        `SELECT * FROM ${table}`,
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('ERROR', error)
            }
        }
    )
})

server.get('/api/:table_id', (req, res)=> {
    const table = req.params.table
    const id = req.params.id

    let sq;

    if (table == 'actor') {
        sql = `SELECT * FROM actor ORDER BY last_name, first_name`
    } else {
        sql = `SELECT * FROM ${table}`
    }

    con.query(
        `SELECT * FROM ${table} WHERE ${table}_id = ${id}`,
        (error, rows) => {
            if(!error) {
            if(rows.length === 1) {
                res.json(...rows)
            } else {
                res.json(rows)
            }
        } else { 
        
        console.log('ERROR', error)
        }
      } 
    )
})

//Set View Engine
server.set('view engine', 'ejs')

server.use('/', router)

server.listen(PORT, ()=> console.log(`Port: ${PORT}`))
