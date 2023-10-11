import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Logo from '../../assets/logo.svg';
import ImgRegister from '../../assets/reister-image.svg';
import { Button } from '../../components';
import api from '../../services/api';
import {
  Container,
  RegisterImg,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  ErrorMessage
} from './styles';

export function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 digitos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const dataSubmit = async clientData => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        {
          validateStatus: () => true
        }
      );

      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso');
      } else if (status === 409) {
        toast.error('E-mail já cadastrado');
      } else {
        throw new Error(); // Dentro do try, quando tem um throw cai direto no cath
      }
    } catch (err) {
      toast.error('Falha no sistema! Tente novamente');
    }
  };

  return (
    <Container>
      <RegisterImg
        src={ImgRegister}
        style={{ height: '90%' }}
        alt="image-register"
      />
      <ContainerItens style={{ height: '90%' }}>
        <img src={Logo} alt="logo-code-burguer" />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(dataSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>
            Sign Up
          </Button>
          <SignInLink>
            Já possui conta ? <Link to="/login">Sign In</Link>
          </SignInLink>
        </form>
      </ContainerItens>
    </Container>
  );
}
