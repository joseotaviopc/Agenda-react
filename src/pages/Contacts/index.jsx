import React, { useEffect, useRef, useState } from "react"
import { Input } from "../../components/Input";
import Menu from "../../components/Menu"
import { useFetch, useStorage } from "../../hooks";

function Contacts() {
  const contactRef = useRef(null);
  const { request } = useFetch();
  const [ userAuth, setUserAuth ] = useStorage('token')
  const [ isLogged, setIsLogged ] = useState(false);
  const [ error, setError ] = useState(true);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ showNewContact, setShowNewContact ] = useState(false);
  const [contatos, setContatos] = useState([]);

  const handleClickContact = async (event) => {
    event.preventDefault();

    const arr = Array.from(contactRef.current.childNodes).filter((node) => {
      return node.name;
    });
    
    const dados = arr.reduce((prev, curr) => Object.assign(prev, {
      [curr.name]: curr.value
    }), {});
    // console.log('arr',arr,'dados',dados)
    
    const contato = {
      "nome": dados.contactnome,
      "apelido": dados?.contactapelido,
      "email": dados?.contactemail,
      "telefones": [
      {
      "tipo": "celular",
      "numero": dados?.contactcel,
      },
      {
      "tipo": "trabalho",
      "numero": dados?.contacttel,
      }
      ],
      "endereco": {
      "logradouro": dados?.contactaddress,
      "cidade": dados?.contactcity,
      "estado": dados?.contactstate,
      "cep": dados?.contactcep,
      "pais": dados?.contactcountry
      }
      };

    // console.log('contato==',contato)
    const options = {
      method: "POST",
      body: JSON.stringify(contato)
    };
    
    const resp = await request("contact", options);
    const { status } = resp.response; 
    
    // console.log('resp==',resp);

    if(resp.json && status === 200){
      setError(true)
      setErrorMsg('Contato criado com sucesso!')
      setShowNewContact(true)
    } else if(status === 400) {
      setError(true)
      setErrorMsg('Erro, nome obrigatório')
    } else if(status === 409) {
      setError(true)
      setErrorMsg('Erro, nome já cadastrado')
    }

    getContacts();
  }

  const getContacts = async () => {
    const resp = await request("contact");
    setContatos(resp.json.data);
  };
  
  useEffect(() => {
    getContacts()
    // console.log('contatos==',contatos)
  },[])

  return(
    <div className="container-md">
      <Menu active='contacts' auth={userAuth} setIsLogged={setIsLogged}/>  
      <h1>Contatos</h1>
      {error && <h2>{errorMsg}</h2>}

      <button className="btn btn-primary my-3" type="submit" onClick={() => !showNewContact ? setShowNewContact(true) : setShowNewContact(false)}>Novo contato</button>
      {showNewContact &&

      <form onSubmit={handleClickContact} ref={contactRef}>
        <label htmlFor="contactnome" className="form-label">Nome</label>
        <Input 
          required 
          className="form-control w-50" 
          name="contactnome" 
          id="contactnome" 
          type="text" 
          placeholder="Nome" 
        />
        
        <label htmlFor="contactapelido" className="form-label">Apelido</label>
        <Input 
          className="form-control w-50" 
          name="contactapelido" 
          id="contactapelido" 
          type="text" 
          placeholder="Apelido"
        />
        
        <label htmlFor="contactemail" className="form-label">Email</label>
        <Input 
          className="form-control w-50" 
          name="contactemail" 
          id="contactemail" 
          type="email" 
          placeholder="email@email.com"
        />

        <label htmlFor="contactcel" className="form-label">Celular</label>
        <Input 
          className="form-control w-50" 
          name="contactcel" 
          id="contactcel" 
          type="tel" 
          placeholder="(00) 99999-9999" 
        />

        <label htmlFor="contacttel" className="form-label">Trabalho</label>
        <Input 
          className="form-control w-50" 
          name="contacttel" 
          id="contacttel" 
          type="tel" 
          placeholder="(00) 22222-2222" 
        />

        <label htmlFor="contactcep" className="form-label">CEP</label>
        <Input 
          className="form-control w-50" 
          name="contactcep" 
          id="contactcep" 
          type="number" 
          placeholder="22.222-222" 
        />

        <label htmlFor="contactaddress" className="form-label">Endereço</label>
        <Input 
          className="form-control w-50" 
          name="contactaddress" 
          id="contactaddress" 
          type="text" 
          placeholder="Rua..." 
        />

        <label htmlFor="contactcity" className="form-label">Cidade</label>
        <Input 
          className="form-control w-50" 
          name="contactcity" 
          id="contactcity" 
          type="text" 
          placeholder="Cidade" 
        />

        <label htmlFor="contactstate" className="form-label">Estado</label>
        <Input 
          className="form-control w-50" 
          name="contactstate" 
          id="contactstate" 
          type="text" 
          placeholder="Estado" 
        />

        <label htmlFor="contactcountry" className="form-label">País</label>
        <Input 
          className="form-control w-50" 
          name="contactcountry" 
          id="contactcountry" 
          type="text" 
          placeholder="País" 
        />

        <button 
          className="btn btn-primary mt-3" 
          type="submit" 
          onClick={handleClickContact}
        >
          Criar contato
        </button>

        {/* const contato = {
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
        }; */}

      </form>
      }
      <hr />
      <ul>
        {contatos.length > 0 && 
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
        }
      </ul>
    </div>
  )
}

export default Contacts