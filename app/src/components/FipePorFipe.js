import {Chart} from "chart.js";

export default {
  props: {
    app: String,
  },
  data() {
    return {
      appVersion: "1.1",
      comparedValue: undefined,
    };
  },
  mounted() {
    setTimeout(function () {
      let comboA = document.querySelector(
        "#veiculoA > div > div.tfb-div-sel.tfb-div-ano > select.tfb-sel"
      );
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
      let valueA = this.getMoney(values[0]);
      let valueB = this.getMoney(values[1]);
      let diffValue = Math.max(valueA, valueB) - Math.min(valueA, valueB);
      this.comparedValue = diffValue.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      console.log(`Diferença de valores: ${this.comparedValue}`);
      this.generateChart(valueA, valueB);
    },
    getMoney(value) {
      return parseInt(value.replace(/[\D]+/g, "")) / 100;
    },
    generateChart(val1, val2) {
      let labelA = document.querySelector(
        "#veiculoA > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel"
      ).selectedOptions[0].innerText;
      let labelB = document.querySelector(
        "#veiculoB > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel"
      ).selectedOptions[0].innerText;
      if (labelA == labelB) {
        labelA += " (A)";
        labelB += " (B)";
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
          },
        ],
      };

      let chartStatus = Chart.getChart("fipeChart");
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      // eslint-disable-next-line no-unused-vars
      const chart = new Chart(ctx, {
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
          },
        },
      });
    },
  },
};
