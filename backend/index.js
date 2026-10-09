import express, { json } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
//     request      ->     response
//frontend(request) -> backend(response)
const app = express()

const userSchema =  new mongoose.Schema({
 nome: {type: String, required: true},
 email: {type: String, required: true, unique: true},
 idade: {type: Number, required: true}
}, {timestamps: true}) //id é criado automaticamente

const Usuario = mongoose.model('Usuario', userSchema)


const allowedOrigins = [
  'http://localhost:5173'
]

app.use(cors({
  origin: allowedOrigins
}))

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then( () => console.log("Conectado ao MongoDB!"))
.catch( (error) => console.log(error))


//Retorna usuários
app.get('/usuarios', async(req, res) => {

  const usuariosDB = await Usuario.find()
  res.json(usuariosDB  )

})  

//Criar usuarios
//Promisse -> Quanto tempo o DB demora para responder? = async / await
app.post('/usuarios', async (req, res) => {
 
  try{
const userCriado = await Usuario.create(req.body)
res.status(201).json(userCriado)
  } catch(error) {
     if (error.code === 11000) {
      return res.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.'
      })
    }
    res.status(500).json({
      mensagem: 'Não foi possível cadastrar. Tente novamente.'
    })
    }
})  

app.delete('/usuarios/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id)

  res.status(204).send()
  })
app.put('/usuarios/:id', async (req, res) => {
const {nome, email, idade} = req.body

const userAtualizado = await Usuario.findByIdAndUpdate(
  req.params.id,
  {nome, email, idade},
  { new: true, runValidators: true } 
  //true = banco devolce user já atual.
  // runValidators = Verifica as regras do meu modelo
)
  if (!userAtualizado){
    return res.status(404).json({
      mensagem: 'Usuário não encontrado'
    })
  }
  res.json(userAtualizado)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  
})