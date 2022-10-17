export default {
    getMoney(value) {
        return parseInt(value.replace(/[\D]+/g, "")) / 100;
    }
}