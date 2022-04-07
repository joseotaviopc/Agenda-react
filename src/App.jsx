import React, { useState } from 'react';
import Compress from 'compress.js';

import './App.css';
import useFetch from './hooks/useFetch';

function App() {

  const { loading, request } = useFetch();
  const [contatos, setContatos] = useState([]);

  const handleClickLogin = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: "email@email.com", senha: "12345678" })
    };

    await request("auth", options);
  }

  const handleClickCadastro = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: "email@email.com", senha: "12345678", nome: "Dannyel Kayke" })
    };

    const resp = await request("user", options);
    console.log(resp);
  }

  const handleClickBuscarContatos = async () => {
    // const options = {
    //   method: "GET"
    // };
    const resp = await request("contact");
    setContatos(resp.json.data || []);
  }

  const handleClickCriarContato = async () => {

    const contato = {
      "nome": "Dannyel",
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
    }

    const options = {
      method: "POST",
      body: JSON.stringify(contato)
    };
    const resp = await request("contact", options);
    console.log(resp.json);
  }

  const handleAlterarFotoContato = async (ev, idContato, foto) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ idContato, foto })
    };

    const resp = await request("contact", options);
    console.log(resp);
    handleClickBuscarContatos();
  }

  const alterarContato = async (dados) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ ...dados })
    };

    const resp = await request("contact", options);
    console.log(resp);

    handleClickBuscarContatos();
  }


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

      const contato = {...contatos[0], idContato: contatos[0].id, foto: result[0].data, banana:  true }
      alterarContato(contato)

      // returns an array of compressed images
    });

  }


  return (
    <div className="App">
      <h1>Aula 07</h1>
      {loading && <h1>CARREGANDO...</h1>}
      <button onClick={handleClickLogin}>Login</button>
      <br />
      <button onClick={handleClickCadastro}>Cadastro</button>
      <br />
      <button onClick={handleClickBuscarContatos}>Buscar contatos</button>
      <br />
      <button onClick={handleClickCriarContato}>Criar contato</button>
      <br />
      <button onClick={handleAlterarFotoContato}>Alterar contato</button>
      <br />
      <input type="file" accept="image/png, image/jpeg" onInput={handleFileInput} />

      <hr />

      <ul>
        {
          contatos.map((contato) => {
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
        }
      </ul>

    </div>
  );
}

export default App;
