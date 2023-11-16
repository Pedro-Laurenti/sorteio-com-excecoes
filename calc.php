<link rel="stylesheet" href="sortcalc/style.css">
<link rel="stylesheet" href="root/custom.css">

<?php require_once 'background-hover.php'; ?>

<div id="wrapper-calc">
    
    <div class="card text-white bg-primary mb-3 sortcalc">
        <div class="card-header">
            <h2 class="titulo-card-sem-animacao">Sorteio com Exceções</h2>
        </div>
        <div class="card-body">
            <div id="conteudo-body-card">

                <div class="form-group">
                    <fieldset>
                        <legend for="inicio">Início do Intervalo</legend>
                        <input type="number" class="form-control" id="inicio" min="1" max="1000" value="1">
                        <div id="inicio-feedback" class="invalid-feedback"></div>

                        <legend for="fim">Fim do Intervalo</legend>
                        <input type="number" class="form-control" id="fim" min="1" max="1000" value="1000">
                        <div id="fim-feedback" class="invalid-feedback"></div>

                    </fieldset>
                </div>

                <div id="excecoes-container">
                    <legend for="excecoes">Exceções</legend>
                    <div class="excecao">
                        <input type="text" class="form-control" id="excecoes" placeholder="Por exemplo: 60-80">
                        <button class="add-excecao add-remove" onclick="adicionarCampoExcecao()">+</button>
                    </div>
                </div>

                <div id="submit-class">
                    <button class="btn btn-lg btn-secondary" type="button" id="submit" onclick="gerarNumeroAleatorio()">Gerar</button>
                </div>

                <p id="resultado"></p>

            </div>

        </div>
    </div>

    <div class="card text-white bg-primary mb-3 sortcalc sortcalc2 ">
        <div class="card-header">
            <h2 class="titulo-card-sem-animacao">Resultados</h2>
        </div>
        <div class="card-body">
            <div id="conteudo-body-card">

            <div id="consoleList"></div>

            </div>

        </div>
    </div>

</div>




<script src="sortcalc/script.js"></script>
