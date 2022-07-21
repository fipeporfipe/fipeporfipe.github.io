<template>
  <div>
    <!-- Table Data -->
    <table v-if="datasource.length > 0">
        <thead>
            <tr>
                <th v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in datasource" :key="datasource.indexOf(row)">
                <td v-for="col in Object.keys(row)" :key="col">{{ row[col] }}</td>
            </tr>
        </tbody>
    </table>
    <!-- Pagination -->
    <div v-if="paging && (datasource.length > this.pageSize)">
        <button>Pri</button>
        <button>Ant</button>
        <p>Página {{ page }} de {{ pageCount }}</p>
        <button>Pró</button>
        <button>Últ</button>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        paging: Boolean
    },
    mounted() {
        if (this.datasource.length > this.pageSize) {
            this.pageCount = this.datasource.length / this.pageSize;
            this.pagedData.slice(0, this.pageSize);
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 2,
            pageCount: undefined,
            headers: ["ID","NOME","NASCIMENTO","PRATELEIRA","CAIXA","SELECIONADO","CÓDIGO"],
            datasource: [
                {
                    id: 1,
                    nome: "JOAO",
                    nascimento: "jdfksjdkfjkdjsfkl",
                    prateleira: "A",
                    caixa: "00001",
                    selecionado: false,
                    codigo: "45645489"
                },
                {
                    id: 2,
                    nome: "JOAO 2",
                    nascimento: "jdfksjdkfjkdjsfkl",
                    prateleira: "A",
                    caixa: "00002",
                    selecionado: true,
                    codigo: "797987988"
                },
                {
                    id: 3,
                    nome: "JOAO 3",
                    nascimento: "jdfksjdkfjkdjsfkl",
                    prateleira: "A",
                    caixa: "00003",
                    selecionado: false,
                    codigo: "654654564"
                },
                {
                    id: 4,
                    nome: "JOAO 4",
                    nascimento: "jdfksjdkfjkdjsfkl",
                    prateleira: "A",
                    caixa: "00004",
                    selecionado: true,
                    codigo: "213212313"
                }
            ],
            pagedData: []
        }
    },
    methods: {
        first() {
            this.mounted();        
        },
        previous() {

        },
        next() {

        },
        last() {

        }
    }
}
</script>

<style>

</style>