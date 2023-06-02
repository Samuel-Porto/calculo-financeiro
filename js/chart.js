const valorBruto = document.querySelector("[data-bruto]");
const sobra = document.querySelector("[data-sobra]")
const chartCanvas = document.querySelector(".chart_canvas");

var etiquetas;
var valores;
var cores;
var etiquetasLista;
var valoresLista;
var coresLista;

var chart = new Chart(chartCanvas)

export function atualizaChart() {
    let soma = 0;

    etiquetas = document.querySelectorAll("[data-etiquetas]");
    valores = document.querySelectorAll("[data-valores]");
    cores = document.querySelectorAll("[data-jscolor]");

    etiquetasLista = [];
    valoresLista = [];
    coresLista = [];

    etiquetas.forEach(etiqueta => {etiquetasLista.push(etiqueta.innerHTML);});
    cores.forEach(cor => {coresLista.push(cor.value);});
    valores.forEach(valor => {
        valoresLista.push(valor.value);
        soma += Number(valor.value);
    });

    if (soma < valorBruto.value) {
        etiquetasLista.push("Sobra");
        valoresLista.push(valorBruto.value - soma);
        sobra.style.color = "var(--cor-positivo)";
    } else if (soma > valorBruto.value) {
        sobra.style.color = "var(--cor-negativo)";
    }

    if (valorBruto.value > 0) {
        sobra.innerHTML = `R$${(valorBruto.value - soma).toFixed(2)} | ${((valorBruto.value-soma)*100/valorBruto.value).toFixed(2)}%`;
    }
    else {
        sobra.innerHTML = "Adicione um valor bruto";
        sobra.style.color = "var(--cor-fonte-claro)"
    }

    chart.destroy();
    chart = new Chart(chartCanvas, {
        type: "doughnut",
        data: {
            labels: etiquetasLista,
            datasets: [{
                label: "Titulo do doughnut",
                data: valoresLista,
                backgroundColor: coresLista
            }]
        },
        options: {
            legend: {
                display: false
            },
            datasets: {
                doughnut: {
                    borderWidth: 0,
                    hoverBorderWidth: 2
                }
            }
        }
    });
}
