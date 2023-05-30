export function formataNumero(campo) {
    let valorSemNumeros = campo.value.replace(/[^[0-9],.]/g, "");
    let valorReal = valorSemNumeros.replace(",", ".");
    let valor = Number(valorReal).toFixed(2);
    return valor;

}