import AppDescription from './AppDescription'
import SelecaoVeiculo from './SelecaoVeiculo'
import { useState } from "react";
import Util from '../util/Util'
import Chart from 'chart.js/auto'

function mounted() {
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
}

function FipePorFipe(props) {
    
    let appVersion = "1.1"

    const [comparedValue, setComparedValue] = useState(undefined)

    function compareVehicles() {
        let values = []; //clear the array
      document.querySelectorAll(".tfb-price").forEach((p) => {
        values.push(p.textContent);
      });
      //validate if any is empty
      if (values.find((v) => v === "") === "") {
        alert("Selecione os dois veículos para fazer a comparação.");
        return;
      }
      compareValues(values);
    }

    function compareValues(values) {
        //compare values
        let val = {
          a: Util.getMoney(values[0]),
          b: Util.getMoney(values[1])
        }
        let diffValue = Math.max(val.a, val.b) - Math.min(val.a, val.b);
        setComparedValue(diffValue.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }));
        console.log(`Diferença de valores: ${comparedValue}`);
        generateChart(val.a, val.b);
    }

    function generateChart(val1, val2) {
        let label = {
          a: document.querySelector("#veiculoA > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel").selectedOptions[0].innerText,
          b: document.querySelector("#veiculoB > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel").selectedOptions[0].innerText
        };
        if (label.a === label.b) {
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
        if (chartStatus !== undefined) {
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

    mounted()

    return (
        <div>
        <div className="row">
            <h3>{props.app}</h3>
        </div>

        {/* <DataTable paging="true"/> */}

        {/* <div class="row">
            <input type="text" id="qrcode" v-model="codigo" @keyup.enter="enterCode" placeholder="QR Code / Código de Barras" />
        </div> */}

        <AppDescription />

        <SelecaoVeiculo veiculo="veiculoA" card="tfb-query card blue" />
        
        <div className="row">
            <ins className="adsbygoogle" style={{display: 'block'}} data-ad-client="ca-pub-9289897309652492"
                data-ad-slot="6569207733" data-ad-format="auto" data-full-width-responsive="true"></ins>
        </div>

        <SelecaoVeiculo veiculo="veiculoB" card="tfb-query card red" />

        <div className="row">
            <button onClick={compareVehicles}>Comparar Veículos</button>
        </div>

        { comparedValue && 
            <div className="row">
                <p>Diferença de valor: {comparedValue}</p>
            </div>
        }

        <div className="row">
            <canvas className="chart" width="400" height="400" id="fipeChart"></canvas>
        </div>

        <div className="row">
            <a href="https://play.google.com/store/apps/details?id=br.com.alloy.android.fipeporfipe" target="_blank" rel="noreferrer">
                <img src="./assets/google-play-badge.png" alt="Android App" />
            </a>
        </div>
        <div className="row">
            <p>Versão do app: {appVersion}</p>
        </div>
    </div>
    )

}

export default FipePorFipe