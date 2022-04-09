import React, { useEffect } from 'react';
import Compress from 'compress.js';

import './App.css';
import { useContatos } from './contexts/contatos';
import useFetch from './hooks/useFetch';

function App() {

  const { loading, request } = useFetch();
  const contatosContext = useContatos();
  const {
    alterarContato,
    buscarContatos,
    contatos,
    criarContato
  } = contatosContext;

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
      <button onClick={buscarContatos}>Buscar contatos</button>
      <br />
      <button onClick={criarContato}>Criar contato</button>
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
