import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { useNavigate } from 'react-router-dom';

import Offers from '../../assets/offers.png';
import { useCart } from '../../hooks/CartContext';
import api from '../../services/api';
import formartCurrency from '../../utils/formatCurrency';
import {
  Container,
  CategoryImg,
  ContainerItems,
  Image,
  Button
} from './styles';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const { putProductsInCart } = useCart();

  const handleClickNavigate = link => {
    navigate(link);
  };

  useEffect(() => {
    async function loadOffers() {
      const { data } = await api.get('products');

      const onlyOffers = await data
        .filter(product => product.offer)
        .map(product => {
          return { ...product, fromatedPrice: formartCurrency(product.price) };
        });

      setOffers(onlyOffers);
    }

    loadOffers();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ];

  return (
    <Container>
      <CategoryImg src={Offers} alt="offers-logo" />

      <Carousel
        itemsToShow={4}
        style={{ width: '95%' }}
        breakPoints={breakPoints}
      >
        {offers &&
          offers.map(product => (
            <ContainerItems key={product.id}>
              <Image src={product.url} alt="foto do produto" />
              <p>{product.name}</p>
              <p>{product.fromatedPrice}</p>
              <Button
                onClick={() => {
                  putProductsInCart(product);
                  handleClickNavigate('/carrinho');
                }}
              >
                Peça agora
              </Button>
            </ContainerItems>
          ))}
      </Carousel>
    </Container>
  );
}
