//Título de componente é semre em letra m
import './UserCard.css'
import { useRef , useState } from 'react'
function UserCard({user, onDelete, onUpdate}){
  const confirmacao = useRef(null)
  const edicao = useRef(null)

const [nomeEditado, setNomeEditado] = useState(user.nome)
const [emailEditado, setEmailEditado] = useState(user.email)
const [idadeEditada, setIdadeEditada] = useState(user.idade)
const [erroEdicao, setErroEdicao] = useState('')

function abrirEdicao() {
  setNomeEditado(user.nome)
  setEmailEditado(user.email)
  setIdadeEditada(user.idade)
  setErroEdicao('')

  edicao.current.showModal()
}

async function salvarEdicao(event) {
  event.preventDefault()

  if (!nomeEditado.trim() || !emailEditado.trim() || idadeEditada === ''){
    setErroEdicao('Insira todas as informações')
    return
  }

  try {
    await onUpdate(user._id, {
      nome: nomeEditado.trim(),
      email: emailEditado.trim(),
      idade: idadeEditada
    })
    edicao.current.close()
  }catch {
       setErroEdicao('Não foi possível salvar. Confira os dados e tente novamente.')
  }
}


    return(
        <div className='user-card'>
        <img className='user-avatar'
           src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${user._id}`}
           alt={`Avatar do usuário ${user.id}`}
        /> 
        <div className='user-info'>

<p>Nome: {user.nome}</p>
<p>E-Mail: {user.email}</p>
<p>Idade: {user.idade}</p>
        </div>


<button 
type='button' 
className='edit-button'
onClick={abrirEdicao}>
  Editar
</button>  

<button
   className="delete-button"
  type="button"
  onClick={() => confirmacao.current.showModal()}
  aria-label={`Excluir ${user.nome}`}
>
  Deletar
</button>

<dialog ref={confirmacao} className='delete-dialog'>
  <h2>Excuir usuário</h2>

   <p>Deseja deletar o usuário {user.nome}?</p>

   <div className='dialog-actions'>

    <button
    type='button'
    className='cancel-button'
    onClick={() => confirmacao.current.close()}
    >
      Cancelar
    </button>

<button
    type='button'
    className='confirm-button'
    onClick={() => onDelete(user._id)}
    >
      Confirmar
    </button>



   </div>

</dialog>

<dialog ref={edicao} className="delete-dialog">
  {/* Usei "delete-dialog" pra herdar o estilo 
  daquela pagina. Não deleta nada aqui!!! */}
  <h2>Editar usuário</h2>

  <form onSubmit={salvarEdicao}>
    <label>
    Nome
    <input
        type="text"
        value={nomeEditado}
        onChange={evento => setNomeEditado(evento.target.value)}
          required
      />
    </label>

    <label>
    E-mail
    <input
        type="email"
        value={emailEditado}
        onChange={evento => setEmailEditado(evento.target.value)}
          required
      />
    </label>

    <label>
    Idade
    <input
        type="number"
        value={idadeEditada}
        onChange={evento => setIdadeEditada(evento.target.value)}
          required
      />
    </label>

    {erroEdicao && (
      <p className="aviso-erro" role="alert">
        {erroEdicao}
      </p>
    )}

    <div className="dialog-actions">
      <button type="button" onClick={() => edicao.current.close()}>
        Cancelar
      </button>

      <button type="submit">
        Salvar
      </button>
    </div>
  </form>
</dialog>

</div>

    )
}

export default UserCard