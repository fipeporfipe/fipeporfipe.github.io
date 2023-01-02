import AppTitle from '../views/AppTitle.vue'
import AppDescription from '../views/AppDescription.vue'
import SelecaoVeiculo from '../views/SelecaoVeiculo.vue'
import ChartCanvas from '../views/ChartCanvas.vue'
import GooglePlayBadge from '../views/GooglePlayBadge.vue'

import DataTable from '../views/DataTable.vue'

import Util from '@/util/Util'
import Chart from 'chart.js/auto'

//import api from '@/api/fipeapi';

export default {
  components: {
    AppTitle,
    AppDescription,
    SelecaoVeiculo,
    ChartCanvas,
    GooglePlayBadge,
    DataTable
  },
  data() {
    return {
      appVersion: "1.1",
      comparedValue: undefined,
      codigo: undefined,
      maxlength: 60
    };
  },
  mounted() {
    //api.ConsultarTabelaDeReferencia();
    setTimeout(function () {
      let comboA = document.querySelector("#veiculoA > div > div.tfb-div-sel.tfb-div-ano > select.tfb-sel");
      // let comboB = document.querySelector("#veiculoB > div > div.tfb-div-sel.tfb-div-ano > select.tfb-sel");

      comboA.oninput = () => {
        console.log(comboA.selectedOptions[0].value);
      };
      
      // comboB.oninput = () => {
      //   console.log(comboB.selectedOptions[0].value);
      // };
    }, 5000);
  },
  methods: {
    enterCode() {
      console.log(this.codigo);
      setTimeout(() => {
        this.codigo = "";
      }, 2000)
    },
    compareVehicles() {
      let values = []; //clear the array
      document.querySelectorAll(".tfb-price").forEach((p) => {
        values.push(p.textContent);
      });
      //validate if any is empty
      if (values.find((v) => v === "") == "") {
        alert("Selecione os dois veículos para fazer a comparação.");
        return;
      }
      this.compareValues(values);
    },
    compareValues(values) {
      //compare values
      let val = {
        a: Util.getMoney(values[0]),
        b: Util.getMoney(values[1])
      }
      let diffValue = Math.max(val.a, val.b) - Math.min(val.a, val.b);
      this.comparedValue = diffValue.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      console.log(`Diferença de valores: ${this.comparedValue}`);
      this.generateChart(val.a, val.b);
    },    
    generateChart(val1, val2) {
      let label = {
        a: document.querySelector("#veiculoA > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel").selectedOptions[0].innerText,
        b: document.querySelector("#veiculoB > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel").selectedOptions[0].innerText
      };
      if (label.a == label.b) {
        label.anoA = document.querySelector("#veiculoA > div > div.tfb-div-sel.tfb-div-ano > select.tfb-sel").selectedOptions[0].innerText;
        label.anoB = document.querySelector("#veiculoB > div > div.tfb-div-sel.tfb-div-ano > select.tfb-sel").selectedOptions[0].innerText;
        label.a += ` (${ label.anoA })`;
        label.b += ` (${ label.anoB })`;
      }
      const ctx = document.getElementById("fipeChart").getContext("2d");
      const data = {
        labels: [label.a, label.b],
        datasets: [
          {
            label: "Comparativo de valores",
            data: [val1, val2],
            backgroundColor: ["#4895FF", "#B3404A"],
            hoverOffset: 4,
          }
        ]
      };

      let chartStatus = Chart.getChart("fipeChart");
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      // eslint-disable-next-line no-unused-vars
      const fipeChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Gráfico de valores",
            },
          },
          layout: {
            padding: 20,
          }
        }
      });
    }
  }
};
