export const createResponsibleData = () => {
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    name: `Automação ${uniqueId}`,
    email: `automacao.${uniqueId}@teste.com`,
    phone: "(85) 99999-9999",
  };
};
