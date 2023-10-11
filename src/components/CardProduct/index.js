import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../../hooks/CartContext';
import { Button } from '../Button';
import { Container, Image, ProductName, ProductPrice } from './style';

export function CardProduct({ product }) {
  const { putProductsInCart } = useCart();
  const navigate = useNavigate();

  const handleClickNavigate = link => {
    navigate(link);
  };

  return (
    <Container>
      <Image src={product.url} alt="imagem do produto" />
      <div>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.fromatedPrice}</ProductPrice>
        <Button
          onClick={() => {
            putProductsInCart(product);
            handleClickNavigate('/carrinho');
          }}
        >
          Adicionar
        </Button>
      </div>
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.oneOfType([PropTypes.object])
};
