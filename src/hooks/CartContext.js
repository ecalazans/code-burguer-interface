import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({}); // Dando nome ao nosso contexto

// Função que irá retornar o UseContext
export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const updateLocalStorage = async products => {
    await localStorage.setItem(
      'codeburguer:cartInfo',
      JSON.stringify(products)
    );
  };

  const putProductsInCart = async product => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id);

    // findIndex >= 0 é igual a verdadeiro, < 0 é falso
    let newCartProducts = [];
    if (cartIndex >= 0) {
      newCartProducts = cartProducts;

      // eslint-disable-next-line operator-assignment
      newCartProducts[cartIndex].quantity =
        newCartProducts[cartIndex].quantity + 1;

      setCartProducts(newCartProducts);
    } else {
      product.quantity = 1;
      newCartProducts = [...cartProducts, product];
      setCartProducts(newCartProducts);
    }

    await updateLocalStorage(newCartProducts);
  };

  const deleteProducts = async productId => {
    const newCart = cartProducts.filter(product => product.id !== productId);

    setCartProducts(newCart);

    await updateLocalStorage(newCart);
  };

  const increaseProducts = async productId => {
    const newCart = cartProducts.map(product => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    });

    setCartProducts(newCart);

    await updateLocalStorage(newCart);
  };

  const decreaseProducts = async productId => {
    const cartIndex = cartProducts.findIndex(pd => pd.id === productId);

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map(product => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });

      setCartProducts(newCart);

      await updateLocalStorage(newCart);
    } else {
      deleteProducts(productId);
    }
  };

  // Função que recupera os dados do localStorage caso exista, e os adiciona
  // no estado cartProducts
  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('codeburguer:cartInfo');

      if (clientCartData) {
        setCartProducts(JSON.parse(clientCartData));
      }
    };

    loadUserData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        putProductsInCart,
        cartProducts,
        increaseProducts,
        decreaseProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Aqui o contexto é criado utilizando o useContext do React.. "e retornado"
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used with UserContext');
  }

  return context;
};

// Tipo de dado que será passado como parâmetro no children
CartProvider.propTypes = {
  children: PropTypes.node
};
