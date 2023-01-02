import { useState } from "react";

function Contador() {
  const [myArray, setMyArray] = useState([
    {
      id: 1,
      nome: "João",
      idade: 38,
    },
    {
      id: 2,
      nome: "José",
      idade: 48,
    },
    {
      id: 3,
      nome: "Carlos",
      idade: 58,
    },
    {
      id: 4,
      nome: "Rafael",
      idade: 68,
    },
  ]);

  function adicionarLinha() {
    setMyArray((myArray) => [
      ...myArray,
      {
        id: myArray.length + 1,
        nome: "Esrrevouls",
        idade: myArray.length + 18,
      },
    ]);
  }

  return (
    <div>
      <button onClick={adicionarLinha}>Adicionar Linha</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myArray.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.idade}</td>
                {/* Coluna Status */}
                {item.idade < 50 ? <td>É novin</td> : <td>É véio</td>}
                {/* {item.idade >= 50 && <td>É véio</td>} */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Contador;
