import './App.css'
import { useState, useEffect, use } from 'react'
import UserCard from './components/UserCard'
import axios from 'axios'

function App() {  
 
  const[name, setName] = useState()
   const[email, setEmail] = useState()
    const[age, setAge] = useState()
     const[users, setUsers] = useState([]) // Não pode começar vazio
//Se eu quiser colocar algo dentro de users, eu preciso usar o setUsers (para todos)
const [erro, setErro] = useState('')

//Todo componente do React é:
//1. Uma função(código antigo pode ser classe)
//2. Tem um return
 //Fora do return = javascript
 //Dentro do return = html -> Mas se eu colocar {}, alí dentro será js

useEffect( () =>{
   async function buscarUsers(){
    const resposta = await axios.get('https://cadastro-de-usuarios-api-7ukh.onrender.com/usuarios')     
      
     setUsers(resposta.data) 
    }

    buscarUsers()
}, [])

 async function handleSubmit(event){
  event.preventDefault()

  if(!name?.trim() || !email?.trim() || !age){
    setErro('Insira todas as informações')
    return
  }
  setErro('')
  
  try{
    const resposta = await axios.post('https://cadastro-de-usuarios-api-7ukh.onrender.com/usuarios', {
      nome: name,
      email: email,
      idade: age
    })

    setUsers(usuariosAtuais => [...usuariosAtuais, resposta.data])
  } catch(error){
    setErro(
      error.response?.data?.mensagem || 
      'Não foi possível cadastrar. Tente novamente.'
    )
  }
 }
async function deletarUser (id) {
  
  await axios.delete(`https://cadastro-de-usuarios-api-7ukh.onrender.com/usuarios/${id}`)

  setUsers(usuariosAtuais =>
    usuariosAtuais.filter(user => user._id !== id)
  )
}

async function atualizarUser(id, dados) {
  const resposta = await axios.put(
    `https://cadastro-de-usuarios-api-7ukh.onrender.com/usuarios/${id}`,
    dados
  )

  setUsers(usuariosAtuais =>
  usuariosAtuais.map(user =>
    user._id === id ? resposta.data : user
)
)
}


 console.log(users)
  return (

    <div className='app'>
      <h1 className='title'>Cadastro de Usuários</h1>

        <form onSubmit={handleSubmit}> 
           <input placeholder="nome"
           type='text'
           value={name}
           onChange={event => setName(event.target.value)}
           />

           <input placeholder="email"
           type='email'
           value={email}
           onChange={event => setEmail(event.target.value)}
           />

           <input placeholder="idade"
           type='number'
           value={age}
           onChange={event => setAge(event.target.value)}
           />

             <button type='submit'>Cadastrar</button>
             {erro && <p className='aviso-erro' role='alert'>{erro}</p>}

        </form>
        <div className='users'>

          {users.map( (user) => (
            <UserCard
             key={user._id}
             user={user}
             onDelete={deletarUser}
             onUpdate={atualizarUser}
/>
            // Usa-se 'user={user}' para pegar os dados dentro do UserCard.jsx

          ))} 
  

        </div>
    </div>
      )
    }

export default App

/*No React nada fica solto.
<p>Exemplo</p> 
<p>Exemplo</p>
Isso é estar solto. para isso, tem a <div>. Dentro dela, pode!
*/