import React, { useRef, useState } from "react";
import Compress from "compress.js";


function NewUser() {
  const contatoRef = useRef(null);
  const [hasContacts, setHasContacts] = useState(false);

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

  const arr = Array.from(contatoRef.current.childNodes).filter((node) => {
    return node.name;
  });

  const dados = arr.reduce((prev, curr) => Object.assign(prev, {
    [curr.name]: curr.value
  }), {});

  const contato = {
      "nome": dados.nome,
      "apelido": "Professor",
      "email": "email@dannyel.com",
      "telefones": [
        {
          "tipo": "celular",
          "numero": "+55 011 91234-5679"
        },
        {
          "tipo": "trabalho",
          "numero": "+55 011 91234-5670"
        }
      ],
      "endereco": {
        "logradouro": "Rua 1",
        "cidade": "Cidade 2",
        "estado": "SP",
        "cep": "11025-001",
        "pais": "string"
      }
    };
    const options = {
      method: "POST",
      body: JSON.stringify(contato)
    };
    // const resp = await request("contact", options);
    // console.log(resp)
}

const handleBuscarContato = async (event) => {
  event.preventDefault();
  
  // const resp = await request("contact");
  // console.log(resp)
}

  return(
    <div className="App">

      <h1>New User</h1>
      
      {/* <form onSubmit={handleClickCadastro} ref={cadastroRef}>
        <label htmlFor="nome" >Nome</label>
        <Input name="nome" id="nome" type="text" placeholder="Nome" required/>
        <br />
        <label htmlFor="email" >E-mail</label>
        <Input name="email" id="email" type="email" placeholder="email@email.com" required/>
        <br />

        <label htmlFor="senha" >Senha</label>
        <Input name="senha" id="senha" type="password" placeholder="******" required/>
        <br />
        <button onClick={handleClickCadastro}>Cadastrar usuário</button>
        <br />
        <br />
      </form> */}

      {/* paddang bang-bang mentawai monkey */}

      <button onClick={handleBuscarContato}>Buscar contatos</button>
      <br />
      <br />

      <form onSubmit={handleCriarContato} ref={contatoRef}>
        <button onClick={handleCriarContato}>Criar contato</button>
        <br />
        <br />
        <input type="file" accept="image/png, image/jpeg" onInput={handleFileInput} />
      </form>

      <hr />

      <ul>
        { hasContacts && ( 
          <></>
          // contatos?.map((contato) => {
          //   return (
          //     <React.Fragment key={contato.id}>
          //       <li>{contato.id}</li>
          //       <li>{contato.nome}</li>
          //       <li>
          //         <img src={`data:image/jpeg;base64,${contato.foto}`} alt={contato.nome} />
          //       </li>
          //     </React.Fragment>
          //   )
          // })
        )}
      </ul>
    </div>
  )
}

export default NewUser