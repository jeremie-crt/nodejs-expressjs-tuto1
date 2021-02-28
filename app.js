const config = require('./config.json')
const {success, error} = require('./functions')

const express = require('express')

const bodyParser = require('body-parser')
const morgan = require('morgan')

const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    database: 'nodejsudemy',
    user: 'root',
    password: 'root'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack)
        return

    } else {
        console.log('Connection database as id :' + db.threadId);

        const app = express()
        //Middleware - catch all url before doing something else with url
        /*app.use((req, res, next) => {
            console.log('URL : ' + req.url);
        })*/

//gives info about the request url
        app.use(morgan('dev'))

//Parse the data
        app.use(bodyParser.json()) // for parsing application/json
        app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

        let membersRouter = express.Router()

        membersRouter.route('/:id')
            //Get one element member
            .get(((req, res) => {

                db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
                    if(err) {
                        res.json(error(err.message))

                    } else {
                        if(result[0] !== undefined) {
                            res.json(success(result[0]))
                        } else {
                            res.json(error('Wrong Id !'))
                        }
                    }
                })
            }))

            //Update one element member
            .put((req, res) => {

                if(req.body.name) {
                    db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
                        if(err) {
                            res.json(error(err.message))

                        } else {
                            if(result[0] !== undefined) {
                                db.query('SELECT * FROM members WHERE name = ? AND id != ?', [
                                    req.body.name,
                                    req.params.id], (err, result) => {
                                    if(err) {
                                        res.json(error(err.message))
                                    } else {
                                        if(result[0] !== undefined) {
                                            res.json(error('Name already taken !'))
                                        } else {
                                            db.query('UPDATE members SET name = ? WHERE id = ?', [
                                                req.body.name,
                                                req.params.id], (err, result) => {

                                                if(err) {
                                                    res.json(error(err.message))
                                                } else {
                                                    res.json(success(true))
                                                }
                                            })
                                        }
                                    }
                                })

                            } else {
                                res.json(error('Wrong Id !'))
                            }
                        }
                    })
                } else {
                    res.json(error('No name value'))
                }
            })

            //Delete one element member
            .delete((req, res) => {

                db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
                    if(err) {
                        res.json(error(err.message))
                    } else {
                        if(result[0] !== undefined) {

                            db.query('DELETE FROM members WHERE id = ?', [req.params.id], (err, result) => {
                                if(err) {
                                    res.json(error(err.message))
                                } else {
                                    res.json(success(true))
                                }
                            })

                        } else {
                            res.json(error('Wrong Id !'))
                        }
                    }
                })
            })

        membersRouter.route('/')
            //Get all members
            .get(((req, res) => {
                if (req.query.max !== undefined && req.query.max > 0) {
                    db.query('SELECT * FROM members LIMIT 0, ?', [req.query.max], (err, result) => {
                        if(err) {
                            res.json(error(err.message))

                        } else {
                            res.json(success(result))
                        }
                    })

                } else if (req.query.max !== undefined) {
                    res.json(error('Wrong max value !'))

                } else {
                    db.query('SELECT * FROM members', (err, result) => {
                        if(err) {
                            res.json(error(err.message))

                        } else {
                            res.json(success(result))
                        }
                    })
                }
            }))

            //Create one element member
            .post((req, res) => {

                if(req.body.name) {

                    db.query('SELECT * FROM members WHERE name = ?', [req.body.name], (err, result) => {

                        if(err) {
                            res.json(error(err.message))
                        } else {

                            if(result[0] !== undefined) {
                                res.json(error('Name already taken !'))
                            } else {
                                db.query('INSERT INTO members(name) VALUES(?)', [req.body.name], (err, result) => {
                                    if(err) {
                                        res.json(error(err.message))
                                    } else {
                                        db.query('SELECT * FROM members WHERE name = ?', [req.body.name], (err, result) => {
                                            if(err) {
                                                res.json(error(err.message))
                                            } else {
                                                res.json(success({
                                                    id: result[0].id,
                                                    name: result[0].name,
                                                }))
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })

                } else {
                    res.json(error('No name value'))
                }
            })

        //Call members router manager
        app.use(config.rootAPI + 'members', membersRouter)

        //Opens the server
        app.listen(config.port, () => console.log(`Example of app listening at http://localhost:${config.port}`))

    }
})


function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id === parseInt(id)) {
            return i
        }
    }
    return 'Wrong Id'
}

function createId() {
    return members[members.length - 1].id + 1
}