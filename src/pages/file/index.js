import './index.css';
import logoAlianca from '../../content/alianca_logo.png';
import zipFile from '../../content/zipPNG.png';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react'
import { history } from '../../history';

function UploadFile() {
  const [filename, setFilename] = useState("");
  
  function validacao(){
    var fileInput = document.getElementById('input-file');
    setFilename(fileInput.files[0].name);

    var arquivoInput = document.getElementById('input-file');
    var caminhoArquivo = arquivoInput.value;
    var extensoesPermitidas = /(.rar|.zip)$/i;
    if(!extensoesPermitidas.exec(caminhoArquivo)){
        document.getElementById("btnSubmit").disabled = true;
        setFilename('Arquivo não válido');
        alert('Por favor envie um arquivo que tenha as extensões .rar ou .zip');
        arquivoInput.value = '';
        return false;
    }else{
        document.getElementById("btnSubmit").disabled = false;
        if (arquivoInput.files && arquivoInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                // console.log('Esses números ai de cima são');
            };
            reader.readAsDataURL(arquivoInput.files[0]);
//  console.log(arquivoInput.files[0].size / 1024 / 1024 / 1024 / 1024/ 1024);
//  console.log(arquivoInput.files[0].size);
 if (arquivoInput.files[0].size > 5242880) { 
                alert("Tamanho do arquivo deve ser menor que 5 MB!");
                window.location.reload();
                return false;
            }
        }
    }
}
  //
  function enviou() {
    if (filename) {
    alert('Arquivo Enviado com sucesso!')
    history.push('./concluido')
  } else{
    alert('Erro no envio do arquivo')
  }
  }

  function sairToken() {
    localStorage.removeItem('app-token')
    history.push('/login')
}
  return (
    <div className="UploadFile">
      <img src={logoAlianca} alt="Imagem"/>
      <form className="containerUpload" action="http://localhost:3030/file" method="post" encType="multipart/form-data">
      <div class='input-wrapper'>
        <label for='input-file' className="botaoFile">Selecionar um arquivo</label>
        <input id='input-file' type='file' accept=".rar, .zip" onChange={validacao} name="arquivo"/>
      </div>

      <div className="containerImagem">
        <img src={zipFile} alt="zip here"/>
      </div>

       <p>{filename}</p>

      <div className="containerButton">
        <Button id="btnSubmit" variant="contained" color="secondary" type="submit" onClick={enviou}>Enviar</Button>
      </div>
      <div>
          <Button className="buttonLink" variant="contained" color="primary" onClick={sairToken}>Sair</Button>
      </div>
      </form>
    </div>
  );
}

export default UploadFile;
