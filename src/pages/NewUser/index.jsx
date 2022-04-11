import React, { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Input } from "../../components/Input";
import Menu from "../../components/Menu"
import Compress from "compress.js";


function NewUser() {
  const newUserRef = useRef(null);
  const { request } = useFetch();
  const [ error, setError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');
  // const [hasContacts, setHasContacts] = useState(false);

const handleFileInput = (event) => {

  const compress = new Compress();

  const files = [...event.target.files];
  
  compress.compress(files, {
    size: 4, // the max size in MB, defaults to 2MB
    quality: .75, // the quality of the image, max is 1,
    maxWidth: 300, // the max width of the output image, defaults to 1920px
    maxHeight: 300, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
    rotate: false, // See the rotation section below
  })
  .then((result) => {
    console.log(result);
    // handleAlterarFotoContato(null, contatos[0].id, result[0].data)

    // const contato = {...contatos[0], idContato: contatos[0].id, foto: result[0].data, banana:  true }
    // alterarContato(contato)

    // returns an array of compressed images
  });

}

const handleCriarContato = async (event) => {
  event.preventDefault();

  const arr = Array.from(newUserRef.current.childNodes).filter((node) => {
    return node.name;
  });

  const dados = arr.reduce((prev, curr) => Object.assign(prev, {
    [curr.name]: curr.value
  }), {});

    const options = {
      method: "POST",
      body: JSON.stringify({
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
      setErrorMsg('Usuário criado com sucesso!')
    } else if(status === 400) {
      setError(true)
      setErrorMsg('Erro, ao menos um dado obrigatório')
    } else if(status === 401) {
      setError(true)
      setErrorMsg('Erro, dados errados')
    }
}

// const handleBuscarContato = async (event) => {
//   event.preventDefault();
  
//   const resp = await request("contact");
//   console.log(resp)
// }

  return(
    <div className="container-md">
    <Menu active='userprofile'/>  
    <h1>Novo usuário</h1>
    {error && <h2>{errorMsg}</h2>}

    <form onSubmit={handleCriarContato} ref={newUserRef}>
      <label htmlFor="usernome" className="form-label">Nome</label>
      <Input name="usernome" className="form-control" id="usernome" type="text" placeholder="Nome" />
            
      <label htmlFor="useremail" className="form-label">Email</label>
      <Input name="useremail" className="form-control" id="useremail" type="email" placeholder="email@email.com" />

      <label htmlFor="usersenha" className="form-label">Senha</label>
      <Input name="usersenha" className="form-control mb-3" id="usersenha" type="password" placeholder="******" />

      <input type="file" accept="image/png, image/jpeg" onInput={handleFileInput} />
      <button className="btn btn-primary" type="submit" onClick={handleCriarContato}>Criar conta</button>
    </form>
  </div>
  )
}

export default NewUser
