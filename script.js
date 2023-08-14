// Função para adicionar um campo de exceção
function adicionarCampoExcecao() {
    const excecoesContainer = document.getElementById("excecoes-container");
    if (!excecoesContainer) {
        return;
    }

    const novoCampo = document.createElement("div");
    novoCampo.className = "excecao"; // Adicionando a classe "excecao"
    novoCampo.innerHTML = `
        <input type="text" placeholder="Por exemplo: 60-80">
        <button class="remove-excecao">x</button>
    `;
    excecoesContainer.appendChild(novoCampo);

    // Associar a função de remoção ao botão recém-criado
    const removeButton = novoCampo.querySelector(".remove-excecao");
    if (removeButton) {
        removeButton.addEventListener("click", () => removerCampoExcecao(removeButton));
    }
}

// Função para remover um campo de exceção
function removerCampoExcecao(button) {
    button.parentElement.remove();
}

// Função para gerar um número aleatório com exceções
function gerarNumeroAleatorio() {
    const inicioInput = document.getElementById("inicio");
    const fimInput = document.getElementById("fim");
    const excecoesInputs = document.querySelectorAll("#excecoes-container input");
    const resultadoElement = document.getElementById("resultado");
    
    resultadoElement.textContent = "";

    const inicio = parseInt(inicioInput.value);
    const fim = parseInt(fimInput.value);
    const excecoes = [];

    // Validar limites do início e fim
    if (isNaN(inicio) || isNaN(fim) || inicio > fim) {
        alert("Verifique os limites do intervalo.");
        return;
    }

    excecoesInputs.forEach(input => {
        const excecao = input.value.trim();

        if (excecao !== "") {
            const valores = excecao.split("-");
            if (valores.length === 2) {
                const excecaoInicio = parseInt(valores[0]);
                const excecaoFim = parseInt(valores[1]);
                
                // Validar exceções
                if (isNaN(excecaoInicio) || isNaN(excecaoFim) || excecaoInicio > excecaoFim) {
                    alert("Verifique as exceções.");
                    return;
                }
                
                excecoes.push({ inicio: excecaoInicio, fim: excecaoFim });
            } else {
                alert("Formato de exceção inválido.");
            }
        }
    });

    let numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
    } while (excecoes.some(excecao => numeroAleatorio >= excecao.inicio && numeroAleatorio <= excecao.fim));

    resultadoElement.textContent = `Número Aleatório: ${numeroAleatorio}`;
}

// Associar a função de adição a exceções ao botão
document.getElementById("add-excecao").addEventListener("click", adicionarCampoExcecao);

// Associar a função de geração de número aleatório ao botão
document.getElementById("gerar-aleatorio").addEventListener("click", gerarNumeroAleatorio);
