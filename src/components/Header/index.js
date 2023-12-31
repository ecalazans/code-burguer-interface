import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Cart from '../../assets/cart.svg';
import Person from '../../assets/person.svg';
import { useUser } from '../../hooks/UserContext';
import {
  Container,
  ContainerLeft,
  ContainerRight,
  ContainerText,
  PageLink,
  Line,
  PageLinkExit
} from './styles';

export function Header() {
  const { logout, userData } = useUser();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  setTimeout(() => {
    // console.log(userData.name);
  }, 1000);

  const logoutUser = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => navigate('/')} isActive={pathname === '/'}>
          Home
        </PageLink>
        <PageLink
          onClick={() => navigate('/produtos')}
          isActive={pathname.includes('produtos')}
        >
          Ver Produtos
        </PageLink>
      </ContainerLeft>
      <ContainerRight>
        <PageLink onClick={() => navigate('/carrinho')}>
          <img src={Cart} alt="Carrinho" />
        </PageLink>

        <Line> </Line>

        <PageLink>
          <img src={Person} alt="Pessoa" />
        </PageLink>

        <ContainerText>
          <p>Olá, {userData.name}</p>
          <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
        </ContainerText>
      </ContainerRight>
    </Container>
  );
}
