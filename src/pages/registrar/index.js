import React from 'react';
import './index.css';
import logoAlianca from '../../content/alianca_logo.png';
import { Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { history } from '../../history';
import axios from 'axios';



function Registrar() {
    const handleSubmit = values => {
        axios.post('http://localhost:3335/v1/api/user', values)
            .then(resp => {
                const { data } = resp
                if (data) {
                    // localStorage.setItem('app-token', data)
                    history.push('/login')
                } else{
                    alert('Não foi possível criar usuário. Verifique o Console log.\nObs.: O docker do banco tem que estar UP e o backend também.')
                }
            })
    }

    const validations = yup.object().shape({
        nome: yup.string().min(13).max(90).required('Nome obrigatório.'),
        cnpj: yup.string().min(13).max(15).required('CNPJ obrigatório.'),
        senha_site: yup.string().min(1).max(30).required('Senha obrigatória.')
    })

    return(
        <div className="Registrar">
            <div className="containerLogo">
                <img src={logoAlianca} alt="Logo Aliança aqui"/>
            </div>
        <Formik initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}>
        <Form className="container">
            <div className="containerTexto">
                <h1>Cadastro</h1>
            </div>

            <div className="containerRegistrar">
                <div>
                    <ErrorMessage component="span" name="nome" />
                </div>
                <label>Nome:</label>
                <Field name="nome" placeholder="Digite seu nome completo." />            
            </div>

            <div className="containerRegistrar">
                <div>
                    <ErrorMessage className="errorCNPJ" component="span" name="cnpj" />
                </div>
                <label>CNPJ:</label>
                <Field name="cnpj" placeholder="Somente números." />
                
                {/* <input id="user" type="text" name="cnpj"></input> */}              
            </div>

            <div className="containerSenha">
                <div>
                    <ErrorMessage component="span" name="senha_site" />
                </div>
                <label>Senha:</label>
                <Field name="senha_site" placeholder=""  type="password" />
                
                {/* <input id="password" type="password" name="password"></input> */}
            </div>
            

            <div className="containerButton">
                <Button color="primary" type="submit">Registrar</Button>
            </div>
        </Form>
        </Formik>
        </div>
    )
}

export default Registrar