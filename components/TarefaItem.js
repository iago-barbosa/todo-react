// ============================================================
// TarefaItem.js — Exibe UMA tarefa da lista
// ============================================================
// Este é um componente de "apresentação": ele não tem estado
// próprio. Só mostra os dados que recebe e avisa o pai quando
// algo acontece.
//
// Props recebidas:
//   - tarefa:     o objeto { id, descricao, concluida }
//   - aoConcluir: função do pai (ListaDeTarefas) para marcar/desmarcar
//
// Obs.: este arquivo não tem "use client", mas como ele é importado
// por ListaDeTarefas (que é Client Component), ele também roda no
// navegador — por isso o onChange funciona aqui.
export default function TarefaItem({ tarefa, aoConcluir, aoExcluir }) {
  return (
    // CLASSE CONDICIONAL com operador ternário:
    // se a tarefa estiver concluída, recebe as classes
    // "tarefa concluida" (que riscam o texto no CSS);
    // senão, apenas "tarefa".
    <li className={tarefa.concluida ? "tarefa concluida" : "tarefa"}>
      <input
        type="checkbox"
        // O checkbox fica marcado de acordo com o dado da tarefa
        // (checkbox CONTROLADO pelo estado).
        checked={tarefa.concluida}
        // Ao clicar, chamamos a função do pai passando o id.
        // Usamos uma arrow function () => ... para que a função só
        // seja executada NO CLIQUE. Se escrevêssemos
        // onChange={aoConcluir(tarefa.id)}, ela rodaria na hora em
        // que o componente fosse desenhado!
        onChange={() => aoConcluir(tarefa.id)}
      />
      <span>{tarefa.descricao}</span>
      <button
        type="button"
        className="botao-secundario"
        onClick={() => aoExcluir(tarefa.id)}
      >
        Excluir
      </button>
    </li>
  );
}
