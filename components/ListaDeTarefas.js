// ============================================================
// ListaDeTarefas.js — Componente "cérebro" da lista de tarefas
// ============================================================
// Este componente é o DONO do estado das tarefas. Ele guarda a
// lista e define as funções que a modificam (adicionar e concluir).
// Os componentes filhos (FormTarefa e TarefaItem) apenas exibem
// dados e chamam essas funções recebidas via props.

// Client Component: necessário porque usamos useState.
"use client";

import { useState } from "react";
import { tarefasIniciais } from "./dados"; // export nomeado → usa chaves
import TarefaItem from "./TarefaItem"; // export default → sem chaves
import FormTarefa from "./FormTarefa";

export default function ListaDeTarefas() {
  // Estado com a lista de tarefas. Começa com os dados de dados.js.
  // Sempre que chamarmos setTarefas(...), o React redesenha a lista.
  const [tarefas, setTarefas] = useState(tarefasIniciais);

  // ----------------------------------------------------------
  // Marca/desmarca uma tarefa como concluída
  // ----------------------------------------------------------
  // REGRA DE OURO do React: NUNCA alterar o estado diretamente
  // (ex.: tarefa.concluida = true). Devemos sempre criar um NOVO
  // array/objeto e entregá-lo ao setTarefas. Isso é IMUTABILIDADE.
  const concluir = (id) => {
    setTarefas(
      // map() percorre a lista e devolve um NOVO array
      tarefas.map((tarefa) =>
        // Operador ternário: condição ? seVerdadeiro : seFalso
        tarefa.id === id
          ? // É a tarefa clicada: criamos uma CÓPIA dela ({ ...tarefa })
            // com `concluida` invertido (! troca true↔false).
            { ...tarefa, concluida: !tarefa.concluida }
          : // Não é a tarefa clicada: devolvemos ela sem mudanças.
            tarefa,
      ),
    );
  };

  const excluir = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  // ----------------------------------------------------------
  // Adiciona uma nova tarefa ao final da lista
  // ----------------------------------------------------------
  const adicionar = (descricao) => {
    // Date.now() retorna os milissegundos atuais — um jeito simples
    // de gerar um id (praticamente) único para a nova tarefa.
    const nova = { id: Date.now(), descricao: descricao, concluida: false };

    // SPREAD (...tarefas) copia todos os itens antigos para um novo
    // array, e colocamos a tarefa nova no final.
    setTarefas([...tarefas, nova]);
  };

  return (
    <section>
      {/* Passamos a FUNÇÃO `adicionar` como prop para o formulário.
          Quando o usuário enviar o form, FormTarefa chamará
          aoAdicionar(texto), que executa a nossa `adicionar`. */}
      <FormTarefa aoAdicionar={adicionar} />

      <ul>
        {/* RENDERIZANDO LISTAS: usamos map() para transformar cada
            objeto de tarefa em um componente <TarefaItem />.

            A prop `key` é OBRIGATÓRIA em listas. Ela ajuda o React a
            identificar qual item mudou, entrou ou saiu, para atualizar
            só o necessário. Deve ser única e estável (por isso o id). */}
        {tarefas.map((tarefa) => (
          <TarefaItem
            key={tarefa.id}
            tarefa={tarefa}
            aoConcluir={concluir}
            aoExcluir={excluir}
          />
        ))}
      </ul>
    </section>
  );
}
