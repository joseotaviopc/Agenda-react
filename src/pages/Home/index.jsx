import React, { useRef, useState } from "react"
import { Input } from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import Contacts from '../Contacts'

function Home() {
  const loginRef = useRef(null);
  // const cadastroRef = useRef(null);

  const { loading, request } = useFetch();
  const [ isLogged, setIsLogged ] = useState(false);
  // const [ newUser, setNewUser ] = useState(false);
  const [ userName, setUserName ] = useState('');
  const [ error, setError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  const handleClickLogin = async (event) => {
    event.preventDefault();

    const arr = Array.from(loginRef.current.childNodes).filter((node) => {
      return node.name;
    });
    
    const dados = arr.reduce((prev, curr) => Object.assign(prev, {
      [curr.name]: curr.value
    }), {});

    
    const options = {
      method: "POST",
      body: JSON.stringify({ email: dados.loginemail, senha: dados.loginsenha })
    };
    
    const resp = await request("auth", options);
    const { status } = resp.response; 
    
    console.log(resp);

    if(resp.json && status === 200){
      setIsLogged(true)
      setUserName(resp.json.data.nome)
    } else if(status === 400) {
      setError(true)
      setErrorMsg('Email e Senha obrigatórios')
    } else if(status === 401) {
      setError(true)
      setErrorMsg('Email ou senha errados')
    }
  }

//   const handleClickCadastro = async (event) => {   
//     event.preventDefault();

//     const arr = Array.from(cadastroRef.current.childNodes).filter((node) => {
//       return node.name;
//     });
    
//     const dados = arr.reduce((prev, curr) => Object.assign(prev, {
//       [curr.name]: curr.value
//     }), {});

//     console.log(dados);

//   const options = {
//     method: "POST",
//     body: JSON.stringify({ email: dados.email, senha: dados.senha, nome: dados.nome })
//   };

//   const resp = await request("user", options);
//   console.log(resp);
// }

  return(
    <div className="container-md">
      {loading && <h1>CARREGANDO...</h1>}
      {!isLogged
      ?(
        <>
        <h1>Agenda - Login</h1>
        {error && <h2>{errorMsg}</h2>}

        <form onSubmit={handleClickLogin} ref={loginRef}>
          <div className="mb-3">
            <label htmlFor="loginemail" className="form-label">Email</label>
            <Input name="loginemail" className="form-control" id="loginemail" type="email" placeholder="email@email.com" required aria-describedby="emailHelp"/>
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>

          <div className="mb-3">
            <label htmlFor="loginsenha" className="form-label">Senha</label>
            <Input name="loginsenha" className="form-control" id="loginsenha" type="password" placeholder="******" required/>
          </div>

          <button className="btn btn-primary" onClick={handleClickLogin}>Entar</button>
{/* onClick={handleClickCadastro} */}
          <button className="btn btn-primary" >Criar conta</button>
        </form>
        </>
      )
      :(
        <>
          <h1>Olá, {userName}</h1>
          <Contacts />
        </>
      )
      }


    </div>
  )
}

export default Home