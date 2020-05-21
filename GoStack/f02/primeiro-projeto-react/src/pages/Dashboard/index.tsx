import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore Repositorios no Github</Title>

      <Form action="">
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/25598984?s=460&u=8d6221e23892bab267a8ed47acfc13de0c72e4b2&v=4"
            alt="Marcus Marcelino"
          />
          <div>
            <strong>rocketseat</strong>
            <p>Projetos Rocketseat</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/25598984?s=460&u=8d6221e23892bab267a8ed47acfc13de0c72e4b2&v=4"
            alt="Marcus Marcelino"
          />
          <div>
            <strong>rocketseat</strong>
            <p>Projetos Rocketseat</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/25598984?s=460&u=8d6221e23892bab267a8ed47acfc13de0c72e4b2&v=4"
            alt="Marcus Marcelino"
          />
          <div>
            <strong>rocketseat</strong>
            <p>Projetos Rocketseat</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
