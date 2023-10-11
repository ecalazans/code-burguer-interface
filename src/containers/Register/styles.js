import styled from 'styled-components';

import Background from '../../assets/background.svg';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${Background}');

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterImg = styled.img`
  height: 70%;
`;

export const ContainerItens = styled.div`
  background: #373737;
  border-radius: 0 10px 10px 0;
  height: 70%;

  padding: 25px 75px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-family: Roboto;
    font-size: 24px;
    font-weight: 500;

    color: #ffffff;

    margin-top: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const Label = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;

  color: #ffffff;

  margin-top: ${props => (props.error ? '5px' : '15px')};
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 260.42px;
  height: 38.32px;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);

  background: #ffffff;

  border: none;
  padding-left: 10px;

  border: ${props => (props.error ? '2px solid #CC1717' : 'none')};
`;

export const SignInLink = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  color: #ffffff;

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #cc1717;
`;
