<template>
    <div>
        <div class="row">
            <h3>{{ app }}</h3>
        </div>

        <div class="row">
            <div id="appDescription" class="card">
                <p>
                    O aplicativo Fipe por Fipe foi desenvolvido para quem quer pesquisar
                    os valores de veículos da tabela Fipe e fazer comparações entre
                    esses valores.
                    <br />
                    <br />
                    O processamento do aplicativo gera dois resultados:
                    <br />
                    - O valor da diferença entre os preços dos veículos (maior - menor)
                    <br />
                    - Um gráfico com os valores para melhor visualização
                    <br />
                    <br />
                    O comparativo é um diferencial exclusivo do app Fipe por Fipe, que
                    foi feito pensando nos negociadores de veículos novos e usados, onde
                    é comum ouvir a expressão "Fipe por Fipe", quando os valores da
                    tabela oficial da Fipe serão considerados numa negociação de
                    veículos.
                    <br />
                    <br />
                    O aplicativo utiliza a API disponibilizada pelo site <a href="https://www.tabelafipebrasil.com/api/"
                        target="_blank">TabelaFipeBrasil</a>, o
                    que garante os preços atualizados em tempo real com a última tabela
                    disponível no <a href="https://veiculos.fipe.org.br/" target="_blank">site oficial da Fipe</a>.
                </p>
            </div>
        </div>

        <div class="row">
            <div id="veiculoA" class="tfb-query card blue" data-style="1"></div>
        </div>

        <div class="row">
            <!-- banner FPF Web -->
            <ins class="adsbygoogle" style="display: block" data-ad-client="ca-pub-9289897309652492"
                data-ad-slot="6569207733" data-ad-format="auto" data-full-width-responsive="true"></ins>
        </div>

        <div class="row">
            <div id="veiculoB" class="tfb-query card red" data-style="1"></div>
        </div>

        <div class="row">
            <button @click="compareVehicles()">Comparar Veículos</button>
        </div>

        <div class="row" v-if="comparedValue">
            <p>Diferença de valor: {{ comparedValue }}</p>
        </div>

        <div class="row">
            <canvas class="chart" width="400" height="400" id="fipeChart"></canvas>
        </div>

        <div class="row">
            <a href="https://play.google.com/store/apps/details?id=br.com.alloy.android.fipeporfipe" target="_blank">
                <img src="../assets/google-play-badge.png" alt="Android App" />
            </a>
        </div>
        <div class="row">
            <p>Versão do app: {{ appVersion }}</p>
        </div>
    </div>
</template>

<script src="./FipePorFipe.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>