import { createContext, useContext, useReducer } from "react";
import reducer, { BUSCAR_CONTATO, INSERIR_CONTATO } from "../reducers/contacts";
import useFetch from "../hooks/useFetch";

const ContatosContext = createContext();

const ContatosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const { request } = useFetch();
  const buscarContatos = async () => {
    const resp = await request("contact");
    
    dispatch({
      type: BUSCAR_CONTATO,
      payload: resp.json.data || []
    });
  };
  const criarContato = async () => {
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
    };
    const options = {
      method: "POST",
      body: JSON.stringify(contato)
    };
    const resp = await request("contact", options);
    
    dispatch({
      type: INSERIR_CONTATO,
      payload: resp.json
    });
  };
  const alterarContato = async (dados) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ ...dados })
    };
    const resp = await request("contact", options);
    
    dispatch({
      type: INSERIR_CONTATO,
      payload: resp.json
    });
  };
  const provisions = { contatos: state, buscarContatos, criarContato, alterarContato };

  return (
    <ContatosContext.Provider value={provisions}>
      {children}
    </ContatosContext.Provider>
  );
};

export default ContatosProvider;
export const useContatos = () => useContext(ContatosContext);
