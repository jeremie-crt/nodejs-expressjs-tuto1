const config = require('./config.json')
const {success, error} = require('./functions')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const morgan = require('morgan')
//Middleware - catch all url before doing something else with url
/*app.use((req, res, next) => {
    console.log('URL : ' + req.url);
})*/

//gives info about the request url
app.use(morgan('dev'))

//Parse the data
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

const members = [
    {
        id: 1,
        name: 'Bob'
    },
    {
        id: 2,
        name: 'Carl'
    },
    {
        id: 3,
        name: 'Michael'
    },
]

let membersRouter = express.Router()

membersRouter.route('/:id')

    //Get one element member
    .get(((req, res) => {

        let index = getIndex(req.params.id)

        if (typeof (index) === 'string') {
            res.json(error(index))
        } else {
            res.json(success(members[index]))
        }
    }))

    //Update one element member
    .put((req, res) => {
        let index = getIndex(req.params.id)

        if (typeof (index) === 'string') {
            res.json(error(index))

        } else {
            let same = false

            for (let i = 0; i < members.length; i++) {
                if (req.body.name == members[i].name && req.params.id != members[i].id) {
                    same = true
                    break
                }
            }

            if (same) {
                res.json(error('Name already taken'))
            } else {
                members[index].name = req.body.name
                res.json(success(true))
            }

        }
    })

    //Delete one element member
    .delete((req, res) => {
        let index = getIndex(req.params.id)

        if (typeof (index) === 'string') {
            res.json(error(index))

        } else {
            members.splice(index, 1)
            res.json(success(members))
        }
    })

membersRouter.route('/')
    //Get all elements members
    .get(((req, res) => {
        if (req.query.max !== undefined && req.query.max > 0) {
            res.json(success(members.slice(0, req.query.max)))

        } else if (req.query.max !== undefined) {
            res.json(error('Wrong max value !'))

        } else {
            res.json(success(members))
        }
    }))

    //Create one element member
    .post((req, res) => {

        let sameName = false
        for (let i = 0; i < members.length; i++) {
            if (members[i].name === req.body.name) {
                sameName = true
            }
        }

        if (sameName) {
            res.json(error('Name already taken !'))

        } else {
            if (req.body.name) {
                let member = {
                    id: createId(),
                    name: req.body.name
                }

                members.push(member)

                res.json(member)
            }
        }

    })

//Call members router manager
app.use(config.rootAPI + 'members', membersRouter)

//Opens the server
app.listen(config.port, () => console.log(`Example of app listening at http://localhost:${config.port}`))


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