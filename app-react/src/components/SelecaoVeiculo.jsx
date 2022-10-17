function SelecaoVeiculo(props) {
    return (
        <div className="row">
            <div id={props.veiculo} className={props.card} data-style="1"></div>
        </div>
    )
}

export default SelecaoVeiculo