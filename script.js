// Função para adicionar um campo de exceção
function adicionarCampoExcecao() {
    const excecoesContainer = document.getElementById("excecoes-container");
    if (!excecoesContainer) {
        return;
    }

    const novoCampo = document.createElement("div");
    novoCampo.className = "excecao"; // Adicionando a classe "excecao"
    novoCampo.innerHTML = `
        <input type="text" class="form-control">
        <div class="invalid-feedback"></div>
        <button class="remove-excecao add-remove">-</button>
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
    const container = button.parentElement.parentElement;
    container.removeChild(button.parentElement);

    // Limpar alertas após a remoção do campo exceção
    limparAlertas();
}

// Função para validar os campos de entrada
function validarCampos(inicio, fim, excecoesInputs) {
    const excecoes = [];

    // Validar limites do início e fim
    if (isNaN(inicio) || isNaN(fim) || inicio > fim) {
        // Adicionar classe "is-invalid" e exibir mensagem no campo de início e fim
        document.getElementById("inicio").classList.add("is-invalid");
        document.getElementById("fim").classList.add("is-invalid");
        document.getElementById("inicio-feedback").textContent = "Verifique os limites do intervalo.";
        document.getElementById("fim-feedback").textContent = "Verifique os limites do intervalo.";

        return null;
    }

    excecoesInputs.forEach(input => {
        const excecao = input.value.trim();

        if (excecao !== "") {
            const valores = excecao.split("-");
            if (valores.length === 1) {
                const excecaoNumero = parseInt(valores[0]);

                // Validar exceção única
                if (isNaN(excecaoNumero) || excecaoNumero < inicio || excecaoNumero > fim) {

                    // Adicionar classe "is-invalid" e exibir mensagem no campo de exceção
                    input.classList.add("is-invalid");

                    return null;
                }

                excecoes.push({ inicio: excecaoNumero, fim: excecaoNumero });
            } else if (valores.length === 2) {
                const excecaoInicio = parseInt(valores[0]);
                const excecaoFim = parseInt(valores[1]);

                // Validar exceções
                if (isNaN(excecaoInicio) || isNaN(excecaoFim) || excecaoInicio > excecaoFim) {
                    return null;
                }

                excecoes.push({ inicio: excecaoInicio, fim: excecaoFim });
            } else {

                // Adicionar classe "is-invalid" e exibir mensagem no campo de exceção
                input.classList.add("is-invalid");
                input.nextElementSibling.textContent = "Formato de exceção inválido.";
            }
        }
    });

    return excecoes;
}

// Função para gerar um número aleatório com exceções
function gerarNumeroAleatorio() {
    const inicioInput = document.getElementById("inicio");
    const fimInput = document.getElementById("fim");
    const excecoesInputs = document.querySelectorAll("#excecoes-container input");
    const resultadoElement = document.getElementById("resultado");

    resultadoElement.textContent = "";

    // Limpar alertas antes de validar
    limparAlertas();

    const inicio = parseInt(inicioInput.value);
    const fim = parseInt(fimInput.value);

    const excecoes = validarCampos(inicio, fim, excecoesInputs);

    if (excecoes === null) {
        return; // Saia se houver erros na validação
    }

    let numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
    } while (excecoes.some(excecao => numeroAleatorio >= excecao.inicio && numeroAleatorio <= excecao.fim));

    resultadoElement.textContent = `${numeroAleatorio}`;
    console.log(numeroAleatorio);
    var consoleList = document.getElementById('consoleList');
    var listItem = document.createElement('li');
    listItem.textContent = numeroAleatorio;
    consoleList.appendChild(listItem);
}


// Função para limpar alertas e adicionar classes is-valid
function limparAlertas() {
    const inputs = document.querySelectorAll("#excecoes-container input:not(.remove-excecao)");
    inputs.forEach(input => {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        input.nextElementSibling.textContent = "+";
    });

    const inicioInput = document.getElementById("inicio");
    const fimInput = document.getElementById("fim");

    if (inicioInput) {
        inicioInput.classList.remove("is-invalid");
        inicioInput.classList.add("is-valid");
        document.getElementById("inicio-feedback").textContent = "";
    }

    if (fimInput) {
        fimInput.classList.remove("is-invalid");
        fimInput.classList.add("is-valid");
        document.getElementById("fim-feedback").textContent = "";
    }
}