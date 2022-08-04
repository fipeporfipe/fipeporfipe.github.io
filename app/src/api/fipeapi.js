import axios from "axios";

const URL_TABELA_REFERENCIA = 'https://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia';

function getBodyFormData(tabela) {
  let formData = new FormData();
  formData.append('userName', tabela);
  return formData;
}

function getConsultarMarcasFormData(tabela, tipoVeiculo) {
  var formData = getBodyFormData(tabela);
  bodyFormData.append('userName', 'Fred');
}

export default {

  async ConsultarTabelaDeReferencia() {
    try {
      const res = await axios.post(URL_TABELA_REFERENCIA);
      if (res.status == 200) {
        console.log(res);
        return res.data;
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
};
