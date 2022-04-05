import './App.css';
import useFetch from './hooks/useFetch';

function App() {

  const { loading, request } = useFetch();

  const handleClickLogin = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: "email@email.com", senha: "12345678" })
    };

    const resp = await request("auth", options);
    console.log(resp);
  }

  const handleClickCadastro = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: "email@email.com", senha: "12345678", nome: "Dannyel Kayke" })
    };

    const resp = await request("user", options);
    console.log(resp);
  }


  return (
    <div className="App">
      <h1>Aula 07</h1>
      {loading && <h1>CARREGANDO...</h1>}
      <button onClick={handleClickLogin}>Login</button>
      <br />
      <button onClick={handleClickCadastro}>Cadastro</button>
    </div>
  );
}

export default App;
