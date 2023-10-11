import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({}); // Dando nome ao nosso contexto

// Função que irá retornar o UseContext
export function UserProvider({ children }) {
  const [userData, setUserData] = useState({});

  // Função responsável por pegar os dados do usuário e adicioná-lo ao estado
  const putUserData = async userInfo => {
    setUserData(userInfo);

    // Salvando dados no localStorage e transformando JSON em String,
    // pois o localStorage só aceita string
    await localStorage.setItem(
      'codeburguer:userData',
      JSON.stringify(userInfo)
    );
  };

  const logout = async () => {
    await localStorage.removeItem('codeburguer:userData');
  };

  // Função que recupera os dados do localStorage caso exista, e os adiciona
  // no estado userData
  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('codeburguer:userData');

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo));
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ putUserData, userData, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Aqui o contexto é criado utilizando o useContext do React.. "e retornado"
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used with UserContext');
  }

  return context;
};

// Tipo de dado que será passado como parâmetro no children
UserProvider.propTypes = {
  children: PropTypes.node
};
