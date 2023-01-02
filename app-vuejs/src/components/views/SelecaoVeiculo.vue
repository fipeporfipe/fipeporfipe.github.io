<template>
    <div class="row">
        <div :id="veiculo" :class="card" data-style="1"></div>
    </div>
</template>

<script>
    export default {
        props: {
            veiculo: String,
            card: String
        }
    }
</script>