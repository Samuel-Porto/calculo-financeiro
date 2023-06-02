import { atualizaChart } from "./chart.js";
import { removeCampo } from "./modifica-campo.js";

var valorBruto;
var etiquetas;
var porcentagens;
var valores;
var cores;

var botoesRemoverCampo;

export function atualizaDados() {

    valorBruto = document.querySelector("[data-bruto]");
    etiquetas = document.querySelectorAll("[data-etiquetas]");
    valores = document.querySelectorAll("[data-valores]");
    cores = document.querySelectorAll("[data-jscolor]");
    porcentagens = document.querySelectorAll("[data-porcentagem]");

    botoesRemoverCampo = document.querySelectorAll("[data-deletar-campo]");

    valorBruto.addEventListener("click", () => {valorBruto.value = ""});
    valorBruto.addEventListener("blur", () => {
        valorBruto.value = formataNumero(valorBruto.value);
        atualizaChart();
        atualizaDados();
    });

    valores.forEach(valor => {
        valor.addEventListener("click", () => {valor.value = ""});
        valor.addEventListener("blur", () => {
            valor.value = formataNumero(valor.value);
            atualizaChart();
            atualizaDados();
        });
    });

    porcentagens.forEach(porcentagem => {
        const campo = porcentagem.parentNode.querySelector(".campo_valores");
        let porcentagemNumero = campo.value*100/valorBruto.value;
        if (porcentagemNumero != Infinity) {
            porcentagem.innerHTML = `${(porcentagemNumero).toFixed(1)}%`;
        } else {
            porcentagem.innerHTML = "";
        }
    });

    cores.forEach(cor => {
        cor.addEventListener("change", () => {
            atualizaChart();
            atualizaDados();
        });
    });

    botoesRemoverCampo.forEach(botao => {
        botao.addEventListener("click", () => {
            atualizaChart();
            atualizaDados();
            removeCampo(botao);
        });
    });
}

function formataNumero(valor) {
    valor = valor.replace(/[^0-9.,]/g, "");
    valor = valor.replace(",", ".");
    return Number(valor).toFixed(2);

}