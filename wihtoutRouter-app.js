const {success, error} = require('./functions')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')

//Middleware - catch all url before doing something else with url
/*app.use((req, res, next) => {
    console.log('URL : ' + req.url);
})*/

app.use(morgan('dev'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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


//Deals url requests

app.get('/api/v1/members/:id', ((req, res) => {

    let index = getIndex(req.params.id)

    if(typeof(index) === 'string') {
        res.json(error(index))
    } else {
        res.json(success(members[index]))
    }
}))

app.get('/api/v1/members', ((req, res) => {
    if(req.query.max !== undefined && req.query.max > 0) {
        res.json(success(members.slice(0, req.query.max)))

    } else if(req.query.max !== undefined) {
        res.json(error('Wrong max value !'))

    } else {
        res.json(success(members))
    }
}))

app.post('/api/v1/members/add', (req, res) => {

    let sameName = false
    for(let i = 0; i < members.length; i++) {
        if(members[i].name === req.body.name) {
            sameName = true
        }
    }

    if(sameName) {
        res.json(error('Name already taken !'))

    } else {
        if(req.body.name) {
            let member = {
                id: createId(),
                name: req.body.name
            }

            members.push(member)

            res.json(member)
        }
    }

})

app.put('/api/v1/members/:id', (req, res) => {
    let index = getIndex(req.params.id)

    if(typeof(index) === 'string') {
        res.json(error(index))

    } else {
        let same = false

        for (let i = 0; i < members.length; i++) {
            if(req.body.name == members[i].name && req.params.id != members[i].id) {
                same = true
                break
            }
        }

        if(same) {
            res.json(error('Name already taken'))
        } else {
            members[index].name = req.body.name
            res.json(success(true))
        }

    }
})

app.delete('/api/v1/members/:id', (req, res) => {
    let index = getIndex(req.params.id)

    if(typeof(index) === 'string') {
        res.json(error(index))

    } else {
        members.splice(index, 1)
        res.json(success(members))
    }
})

app.listen(port, () => console.log(`Example of app listening at http://localhost:${port}`))

function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        if(members[i].id === parseInt(id)) {
            return i
        }
    }
    return 'Wrong Id'
}

function createId() {
    return members[members.length-1].id + 1
}