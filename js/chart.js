import { formataNumero } from "./formata-numero.js";

const sobraCampo = document.querySelector("[data-sobra]");
const inputBruto = document.querySelector("[data-bruto]");
const inputCorSobra = document.querySelector("[data-cor-sobra]");
const inputCampo = document.querySelector("[data-input-personalizados]");
const inputNovoCampo = document.querySelector("[data-novo-campo]");
const botaoCriarCampo = document.querySelector("[data-criar-campo]");
const inputAdicionarCampo = document.querySelector("#input_adicionar-campo");
const botaoAdicionarCampo = document.querySelector("#adicionar-campo");

var chart = new Chart("chart_dinheiro-porcentagem");

var botoesDeletarCampo;
var inputEtiquetas;
var porcentagens;
var inputValores;
var inputCores;

let sobra;

atualizaElementos();
atualizaChart();

botaoAdicionarCampo.addEventListener("click", () => {
    botaoAdicionarCampo.style.display = "none";
    inputNovoCampo.style.display = "grid";
});
inputBruto.addEventListener("blur", () => {
    inputBruto.value = formataNumero(inputBruto);
    atualizaSobra();
    atualizaPorcentagem();
});
inputCorSobra.addEventListener("change", () => {atualizaChart()});
botaoCriarCampo.addEventListener("click", () => {criarCampo()});

function atualizaElementos() {
    botoesDeletarCampo = document.querySelectorAll("[data-deletar-campo]");
    inputEtiquetas = document.querySelectorAll("[data-etiquetas]");
    porcentagens = document.querySelectorAll("[data-porcentagem]");
    inputValores = document.querySelectorAll("[data-valores]");
    inputCores = document.querySelectorAll("[data-cores]");

    inputCores.forEach(cor => {
        cor.addEventListener("change", () => {atualizaChart()});
    });
    inputValores.forEach(valor => {
        valor.addEventListener("click", () => {valor.value = ""});
        valor.addEventListener("blur", () => {
            valor.value = formataNumero(valor);
            atualizaChart();
            atualizaSobra();
            atualizaPorcentagem();
        });
    });

    botoesDeletarCampo.forEach(botao => {
        botao.addEventListener("click", () => {deletarCampo(botao)})
    })

    atualizaSobra();
    atualizaChart();
}

function atualizaPorcentagem() {
    porcentagens.forEach(porcentagem => {
        const valorCampo = porcentagem.parentNode.querySelector(".campo_valores").value;
        let valorPorcentagem = valorCampo * 100 / inputBruto.value;
        porcentagem.innerHTML = `${valorPorcentagem.toFixed(1)}%`;
    });
}

function atualizaChart() {
    var chartEtiquetas = [];
    var chartValores = [];
    var chartCores = [];

    if (sobra >= 0) {
        chartEtiquetas.push("sobra");
        chartValores.push(sobra);
        chartCores.push(inputCorSobra.value);
    }

    inputEtiquetas.forEach(etiqueta => {
        chartEtiquetas.push(etiqueta.innerHTML);
    });
    inputValores.forEach(valor => {
        chartValores.push(valor.value);
    });
    inputCores.forEach(cor => {
        chartCores.push(cor.value);
    });

    const data = {
        labels: chartEtiquetas,
        datasets: [
            {
                data: chartValores,
                backgroundColor:  chartCores
            }
        ]
    }
    
    chart.destroy();

    chart = new Chart("chart_dinheiro-porcentagem", {
        type: "doughnut",
        data: data,
        options: {
            legend: {
                display: false
            },
            datasets: {
                doughnut: {
                    borderWidth: 0,
                    borderColor: "#ffffff",
                    hoverBorderWidth: 2
                }
            }
        }
    });

    chart.update();
}

function criarCampo() {
    const novoCampo = document.createElement("fieldset");
    novoCampo.className = "input_campo";
    novoCampo.innerHTML = `
        <label class="input_etiqueta" for="${inputAdicionarCampo.value}" data-etiquetas>${inputAdicionarCampo.value}</label>
        <p class="porcentagem" data-porcentagem>0%</p>
        <input class="campo_valores" id="${inputAdicionarCampo.value}" type="text" name="${inputAdicionarCampo.value}" data-valores>
        <button class="deletar-campo" data-deletar-campo><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
        <input class="input_cor" type="color" value="#ffffff" data-cores>
    `
    inputCampo.appendChild(novoCampo);

    atualizaElementos();
    botaoAdicionarCampo.style.display = "block";
    inputNovoCampo.style.display = "none";
}

function deletarCampo(botao) {
    console.log(botao)
    const campo = botao.parentNode;
    campo.remove();
    atualizaChart();
    atualizaElementos();
}

function atualizaSobra() {
    sobra = inputBruto.value;
    inputValores.forEach(gasto => {
        sobra -= gasto.value;
    });
    sobraCampo.innerHTML = `R$${sobra.toFixed(2)} - ${(sobra * 100 / inputBruto.value).toFixed(1)}%`;

    if (sobra < 0) {
        sobraCampo.style.color = "var(--cor-negativo)";
    } else {
        sobraCampo.style.color = "var(--cor-positivo)";
    }
    atualizaChart();
}
