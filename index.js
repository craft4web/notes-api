// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Primera nota',
    date: Date(),
    important: true
  },
  {
    id: 2,
    content: 'Segunda nota',
    date: 'martes',
    important: false
  },
  {
    id: 3,
    content: 'Tercera nota',
    date: 'miercoles',
    important: true
  }

]

// const app = http.createServer((req,res)=>{
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     res.end(JSON.stringify(notes))
// })

app.get('/', (req, res) => {
  res.send('<h1>Hellow World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(notes => notes.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(404).json({
      error: 'note.content is missing'
    })
  }
  const ids = notes.map(notes => notes.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false

  }

  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
