# /*

CALCULADORA DE PRESTACIONES LABORALES
El Salvador
===========

*/

// ======================================================
// BOTÓN CALCULAR
// ======================================================

document
.getElementById("btnCalcular")
.addEventListener("click", calcular);

// ======================================================
// FUNCIÓN PARA OBTENER NÚMEROS
// ======================================================

function obtenerNumero(id) {

```
const valor = parseFloat(
    document.getElementById(id).value
);


if (isNaN(valor)) {

    return 0;

}


return valor;
```

}

// ======================================================
// FUNCIÓN PARA FORMATEAR DINERO
// ======================================================

function dinero(valor) {

```
return valor.toLocaleString("en-US", {

    style: "currency",

    currency: "USD"

});
```

}

// ======================================================
// FUNCIÓN PRINCIPAL
// ======================================================

function calcular() {

```
// --------------------------------------------------
// OBTENER DATOS DEL FORMULARIO
// --------------------------------------------------

const salario =
    obtenerNumero("salario");


const anios =
    obtenerNumero("anios");


const meses =
    obtenerNumero("meses");


const horasDiurnas =
    obtenerNumero("horasDiurnas");


const horasNocturnas =
    obtenerNumero("horasNocturnas");


const asuetos =
    obtenerNumero("asuetos");


const descansos =
    obtenerNumero("descansos");


// --------------------------------------------------
// VALIDAR SALARIO
// --------------------------------------------------

if (salario <= 0) {

    alert(
        "Ingrese un salario mensual válido."
    );

    return;
}


// --------------------------------------------------
// VALIDAR MESES
// --------------------------------------------------

if (meses < 0 || meses > 11) {

    alert(
        "Los meses laborados deben estar entre 0 y 11."
    );

    return;
}


// ==================================================
// CÁLCULO DEL SALARIO DIARIO
// ==================================================

const salarioDiario =
    salario / 30;


// ==================================================
// CÁLCULO DEL SALARIO POR HORA
// ==================================================

const salarioHora =
    salarioDiario / 8;


// ==================================================
// ANTIGÜEDAD TOTAL EN AÑOS
// ==================================================

const antiguedad =
    anios + (meses / 12);


// ==================================================
// VACACIÓN PROPORCIONAL
// ==================================================

const vacacion =

    salarioDiario
    *
    15
    *
    (meses / 12)
    *
    1.30;


// ==================================================
// AGUINALDO
// ==================================================

let diasAguinaldo;


if (antiguedad >= 10) {

    diasAguinaldo = 21;

}

else if (antiguedad >= 3) {

    diasAguinaldo = 19;

}

else {

    diasAguinaldo = 15;

}


const aguinaldo =

    salarioDiario
    *
    diasAguinaldo
    *
    (meses / 12);


// ==================================================
// TIPO DE FINALIZACIÓN
// ==================================================

const tipoCierre =

    document.querySelector(
        'input[name="tipoCierre"]:checked'
    ).value;


let indemnizacion = 0;


// ==================================================
// DESPIDO INJUSTIFICADO
// ==================================================

if (tipoCierre === "despido") {


    indemnizacion =

        salarioDiario
        *
        30
        *
        antiguedad;


    document.getElementById(
        "textoIndemnizacion"
    ).textContent =

        "Indemnización por despido:";

}


// ==================================================
// RENUNCIA VOLUNTARIA
// ==================================================

else {


    if (antiguedad >= 2) {


        indemnizacion =

            salarioDiario
            *
            15
            *
            antiguedad;

    }


    else {


        indemnizacion = 0;

    }


    document.getElementById(
        "textoIndemnizacion"
    ).textContent =

        "Compensación por renuncia:";

}


// ==================================================
// HORAS EXTRAS DIURNAS
// ==================================================

const valorHoraDiurna =

    salarioHora * 2;


const totalDiurnas =

    valorHoraDiurna
    *
    horasDiurnas;


// ==================================================
// HORAS EXTRAS NOCTURNAS
// ==================================================

const valorHoraNocturna =

    salarioHora * 2.25;


const totalNocturnas =

    valorHoraNocturna
    *
    horasNocturnas;


// ==================================================
// DÍAS DE ASUETO
// ==================================================

const valorAsueto =

    salarioDiario * 2;


const totalAsuetos =

    valorAsueto
    *
    asuetos;


// ==================================================
// DÍAS DE DESCANSO SEMANAL
// ==================================================

const valorDescanso =

    salarioDiario * 1.50;


const totalDescansos =

    valorDescanso
    *
    descansos;


// ==================================================
// TOTAL DE LA LIQUIDACIÓN
// ==================================================

const total =

    vacacion
    +
    aguinaldo
    +
    indemnizacion
    +
    totalDiurnas
    +
    totalNocturnas
    +
    totalAsuetos
    +
    totalDescansos;


// ==================================================
// MOSTRAR RESULTADOS
// ==================================================

document.getElementById(
    "resultadoVacacion"
).textContent =

    dinero(vacacion);


document.getElementById(
    "resultadoAguinaldo"
).textContent =

    dinero(aguinaldo);


document.getElementById(
    "resultadoIndemnizacion"
).textContent =

    dinero(indemnizacion);


document.getElementById(
    "resultadoDiurnas"
).textContent =

    dinero(totalDiurnas);


document.getElementById(
    "resultadoNocturnas"
).textContent =

    dinero(totalNocturnas);


document.getElementById(
    "resultadoAsuetos"
).textContent =

    dinero(totalAsuetos);


document.getElementById(
    "resultadoDescansos"
).textContent =

    dinero(totalDescansos);


document.getElementById(
    "resultadoTotal"
).textContent =

    dinero(total);


// ==================================================
// DESPLAZARSE A LOS RESULTADOS
// ==================================================

document
    .getElementById("resultados")
    .scrollIntoView({

        behavior: "smooth"

    });
```

}
