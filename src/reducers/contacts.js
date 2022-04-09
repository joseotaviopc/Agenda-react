export const INSERIR_CONTATO = 'INSERIR_CONTATO';
export const BUSCAR_CONTATO = 'BUSCAR_CONTATO';

const inserirContato = (state, { data }) => {
  const hasUser = state.some((user) => user.email === data.email);

  return hasUser ? state : [...state, data];
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case INSERIR_CONTATO:
      return inserirContato(state, payload);
    case BUSCAR_CONTATO:
      return [...payload];
    default:
      return state;
  }
};

export default reducer;
