import React, { useRef, useState } from "react"
import { Input } from "../../components/Input";
import Menu from "../../components/Menu"
import { useFetch } from "../../hooks";

function Contacts() {
  const userRef = useRef(null);
  const { request } = useFetch();
  const [ error, setError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  const handleClickContact = async (event) => {
    event.preventDefault();

    const arr = Array.from(userRef.current.childNodes).filter((node) => {
      return node.name;
    });
    
    const dados = arr.reduce((prev, curr) => Object.assign(prev, {
      [curr.name]: curr.value
    }), {});
    console.log('arr',arr,'dados',dados)
    
    const options = {
      method: "PATCH",
      body: JSON.stringify(
        { 
          nome: dados?.usernome,
          email: dados?.useremail,
          senha: dados?.usersenha,
          foto: dados?.userfoto,
        })
    };
    
    const resp = await request("user", options);
    const { status } = resp.response; 
    
    console.log(resp);

    if(resp.json && status === 200){
      setError(true)
      setErrorMsg('Dados alterados com sucesso!')
    } else if(status === 400) {
      setError(true)
      setErrorMsg('Erro, ao menos um dado obrigatório')
    } else if(status === 409) {
      setError(true)
      setErrorMsg('Erro, email já cadastrado')
    }
  }

  return(
    <div className="container-md">
      <Menu active='contacts'/>  
      <h1>Contatos</h1>
      {error && <h2>{errorMsg}</h2>}

      <form onSubmit={handleClickContact} ref={userRef}>
        <label htmlFor="usernome" className="form-label">Nome</label>
        <Input required name="usernome" className="form-control" id="usernome" type="text" placeholder="Nome" />
        
        <label htmlFor="useremail" className="form-label">Email</label>
        <Input required name="useremail" className="form-control" id="useremail" type="email" placeholder="email@email.com" />

        <label htmlFor="usersenha" className="form-label">Senha</label>
        <Input required name="usersenha" className="form-control mb-3" id="usersenha" type="password" placeholder="******" />

        <button className="btn btn-primary" type="submit" onClick={handleClickContact}>Criar contato</button>
      </form>

      <ul>
        {/* { hasContacts && ( 
          <></>
          contatos?.map((contato) => {
            return (
              <React.Fragment key={contato.id}>
                <li>{contato.id}</li>
                <li>{contato.nome}</li>
                <li>
                  <img src={`data:image/jpeg;base64,${contato.foto}`} alt={contato.nome} />
                </li>
              </React.Fragment>
            )
          })
        )} */}
      </ul>
    </div>
  )
}

export default Contacts

// const contato = {
//   "nome": dados.nome,
//   "apelido": "Professor",
//   "email": "email@dannyel.com",
//   "telefones": [
//     {
//       "tipo": "celular",
//       "numero": "+55 011 91234-5679"
//     },
//     {
//       "tipo": "trabalho",
//       "numero": "+55 011 91234-5670"
//     }
//   ],
//   "endereco": {
//     "logradouro": "Rua 1",
//     "cidade": "Cidade 2",
//     "estado": "SP",
//     "cep": "11025-001",
//     "pais": "string"
//   }
// };