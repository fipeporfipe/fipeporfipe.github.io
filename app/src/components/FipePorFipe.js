import AppDescription from './AppDescription.vue'
import SelecaoVeiculo from './SelecaoVeiculo.vue'
import Util from '@/util/Util';
import Chart from 'chart.js/auto';

export default {
  components: {
    AppDescription,
    SelecaoVeiculo
  },
  props: {
    app: String,
  },
  data() {
    return {
      appVersion: "1.1",
      comparedValue: undefined,
      nome: '',
      maxlength: 60
    };
  },
  mounted() {
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
      let labelA = document.querySelector("#veiculoA > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel").selectedOptions[0].innerText;
      let labelB = document.querySelector("#veiculoB > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel").selectedOptions[0].innerText;
      if (labelA == labelB) {
        let anoA = document.querySelector("#veiculoA > div > div.tfb-div-sel.tfb-div-ano > select.tfb-sel").selectedOptions[0].innerText;
        let anoB = document.querySelector("#veiculoB > div > div.tfb-div-sel.tfb-div-ano > select.tfb-sel").selectedOptions[0].innerText;
        labelA += ` (${anoA})`;
        labelB += ` (${anoB})`;
      }
      const ctx = document.getElementById("fipeChart").getContext("2d");
      const data = {
        labels: [labelA, labelB],
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
