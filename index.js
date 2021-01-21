const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())


let persons =[
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
]

const generateId = () => {
    min = 0;
    max = 100000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length}</p>
        ${new Date()}`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(202).end()
})

app.post('/api/persons', (request,response) => {
    const body = request.body

    if(!body.name || !body.number){
        response.send(400).json({
            error: 'Number or name is missing'
        })
    }
    if(persons.find(person => person.name === body.name)){
        response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
