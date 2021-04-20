import React from 'react';
import './index.css';
import logoAlianca from '../../content/alianca_logo.png';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { history } from '../../history';
import axios from 'axios';



function Login() {
    
    const handleSubmit = values => {
            axios.post('http://localhost:3335/v1/api/auth', values)
            .then(resp => {
                const { data } = resp
                if (data) {
                    localStorage.setItem('app-token', data)
                    history.push('/')
                } 
            })
            .catch(() => alert('CNPJ ou Senha Inválida. Tente novamente'))
    }

    const handleClick = () => history.push('/registrar')

    const validations = yup.object().shape({
        cnpj: yup.string().min(13).max(15).required('CNPJ obrigatório.'),
        senha_site: yup.string().min(1).max(30).required('Senha obrigatória.')
    })

    return(
        <div className="login">
            <div className="containerLogo">
                <div className="imgLogo"><img src={logoAlianca} alt="Logo Aliança aqui"/></div>
                <div className="txtLogo"><h1>Integração com Transportadores</h1></div>
            </div>
        <Formik initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}>
        <div className="contBack">
        <Form className="container">
            <div className="containerTexto">
                <h2>Identificação do Transportador</h2>
            </div>

            <div className="containerLogin">
                <div>
                    <ErrorMessage className="errorCNPJ" component="span" name="cnpj" />
                </div>
                <label>CNPJ:</label>
                <Field name="cnpj" placeholder="Somente números." />
                
                {/* <input id="user" type="text" name="cnpj"></input> */}              
            </div>

            <div className="containerSenha">
                <label>Senha:</label>
                <Field className="senha_site" name="senha_site" placeholder="" type="password"/>
                <div>
                    <ErrorMessage component="span" name="senha_site" />
                </div>
                {/* <input id="password" type="password" name="password"></input> */}
            </div>
            

            <div className="containerButton">
                <Button variant="contained" color="primary" type="submit">Fazer Login</Button>
            </div>

            <div className="buttonRegistrar">
                <Button variant="contained" color="secondary" onClick={handleClick}>Cadastre-se</Button>
            </div>
        </Form>
        </div>
        </Formik>
        </div>
    )
}

export default Login