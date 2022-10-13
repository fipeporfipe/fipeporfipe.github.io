<template>
    <div>
        <div class="row">
            <h3>{{ app }}</h3>
        </div>

        <!-- <DataTable paging="true"/> -->

        <!-- <div class="row">
            <input type="text" id="qrcode" v-model="codigo" @keyup.enter="enterCode" placeholder="QR Code / Código de Barras" />
        </div> -->

        <AppDescription />

        <SelecaoVeiculo veiculo="veiculoA" card="tfb-query card blue" />

        <div class="row">
            <!-- banner FPF Web -->
            <ins class="adsbygoogle" style="display: block" data-ad-client="ca-pub-9289897309652492"
                data-ad-slot="6569207733" data-ad-format="auto" data-full-width-responsive="true"></ins>
        </div>

        <SelecaoVeiculo veiculo="veiculoB" card="tfb-query card red" />

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

<script src="../controllers/FipePorFipe.js" />

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>