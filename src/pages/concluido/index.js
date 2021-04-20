import React from 'react';
import { Alert, Button } from 'reactstrap';
import { history } from '../../history';
import './index.css';

function Concluido() {
    const handleClick = () => history.push('/')

    function sairToken() {
        localStorage.removeItem('app-token')
        history.push('/login')
    }
  return (
    <div className="containerConcluido">
      <div className="container">
        <h1>Arquivo enviado com sucesso!</h1>
      </div>
      <div className="divBotao">
        <Button className="botao1" color="primary" onClick={handleClick}>Voltar</Button>
        <Button className="botao2" color="danger" onClick={sairToken}>Sair</Button>
      </div>
    </div>
  );
};

export default Concluido;