const Util = {
    getMoney (value) {
        return parseInt(value.replace(/[\D]+/g, "")) / 100;
    }
}

export default Util