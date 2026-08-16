// ======================================================
// CALCULADORA DE PRESTACIONES LABORALES
// El Salvador
// ======================================================


// ======================================================
// ESPERAR A QUE CARGUE COMPLETAMENTE EL HTML
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const botonCalcular = document.getElementById("btnCalcular");
    const checkboxNoAplica = document.getElementById("noAplica");

    // Comprobar que el botón existe
    if (!botonCalcular) {
        console.error("No se encontró el botón btnCalcular.");
        return;
    }

    // Evento del botón Calcular
    botonCalcular.addEventListener("click", calcular);

    // Evento del checkbox "No aplica"
    if (checkboxNoAplica) {

        checkboxNoAplica.addEventListener("change", function () {

            const campos = [
                "horasDiurnas",
                "horasNocturnas",
                "asuetos",
                "descansos"
            ];

            campos.forEach(function (id) {

                const campo = document.getElementById(id);

                if (campo) {
                    campo.disabled = checkboxNoAplica.checked;

                    if (checkboxNoAplica.checked) {
                        campo.value = 0;
                    }
                }

            });

        });

    }

});


// ======================================================
// FUNCIÓN PARA OBTENER NÚMEROS
// ======================================================

function obtenerNumero(id) {

    const elemento = document.getElementById(id);

    if (!elemento) {
        console.error("No se encontró el elemento:", id);
        return 0;
    }

    const valor = parseFloat(elemento.value);

    if (isNaN(valor)) {
        return 0;
    }

    return valor;
}


// ======================================================
// FUNCIÓN PARA FORMATEAR DINERO
// ======================================================

function dinero(valor) {

    return valor.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

}


// ======================================================
// FUNCIÓN PRINCIPAL
// ======================================================

function calcular() {

    try {

        // --------------------------------------------------
        // OBTENER DATOS
        // --------------------------------------------------

        const salario = obtenerNumero("salario");
        const anios = obtenerNumero("anios");
        const meses = obtenerNumero("meses");

        const horasDiurnas = obtenerNumero("horasDiurnas");
        const horasNocturnas = obtenerNumero("horasNocturnas");
        const asuetos = obtenerNumero("asuetos");
        const descansos = obtenerNumero("descansos");


        // --------------------------------------------------
        // VALIDAR SALARIO
        // --------------------------------------------------

        if (salario <= 0) {

            alert("Ingrese un salario mensual válido.");

            document.getElementById("salario").focus();

            return;
        }


        // --------------------------------------------------
        // VALIDAR AÑOS
        // --------------------------------------------------

        if (anios < 0) {

            alert("Los años laborados no pueden ser negativos.");

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
        // SALARIO DIARIO
        // ==================================================

        const salarioDiario = salario / 30;


        // ==================================================
        // SALARIO POR HORA
        // ==================================================

        const salarioHora = salarioDiario / 8;


        // ==================================================
        // ANTIGÜEDAD TOTAL
        // ==================================================

        const antiguedad =
            anios + (meses / 12);


        // ==================================================
        // VACACIÓN PROPORCIONAL
        // ==================================================

        const vacacion =
            salarioDiario *
            15 *
            (meses / 12) *
            1.30;


        // ==================================================
        // AGUINALDO
        // ==================================================

        let diasAguinaldo;

        if (antiguedad >= 10) {

            diasAguinaldo = 21;

        } else if (antiguedad >= 3) {

            diasAguinaldo = 19;

        } else {

            diasAguinaldo = 15;

        }


        const aguinaldo =
            salarioDiario *
            diasAguinaldo *
            (meses / 12);


        // ==================================================
        // TIPO DE FINALIZACIÓN
        // ==================================================

        const tipoCierreElemento =
            document.querySelector(
                'input[name="tipoCierre"]:checked'
            );


        if (!tipoCierreElemento) {

            alert(
                "Seleccione una causa de finalización."
            );

            return;
        }


        const tipoCierre =
            tipoCierreElemento.value;


        // ==================================================
        // INDEMNIZACIÓN
        // ==================================================

        let indemnizacion = 0;


        if (tipoCierre === "despido") {

            indemnizacion =
                salarioDiario *
                30 *
                antiguedad;


            document.getElementById(
                "textoIndemnizacion"
            ).textContent =
                "Indemnización por despido:";


        } else {

            if (antiguedad >= 2) {

                indemnizacion =
                    salarioDiario *
                    15 *
                    antiguedad;

            } else {

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
            valorHoraDiurna *
            horasDiurnas;


        // ==================================================
        // HORAS EXTRAS NOCTURNAS
        // ==================================================

        const valorHoraNocturna =
            salarioHora * 2.25;

        const totalNocturnas =
            valorHoraNocturna *
            horasNocturnas;


        // ==================================================
        // DÍAS DE ASUETO
        // ==================================================

        const valorAsueto =
            salarioDiario * 2;

        const totalAsuetos =
            valorAsueto *
            asuetos;


        // ==================================================
        // DÍAS DE DESCANSO
        // ==================================================

        const valorDescanso =
            salarioDiario * 1.50;

        const totalDescansos =
            valorDescanso *
            descansos;


        // ==================================================
        // TOTAL
        // ==================================================

        const total =
            vacacion +
            aguinaldo +
            indemnizacion +
            totalDiurnas +
            totalNocturnas +
            totalAsuetos +
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
        // MOSTRAR RESULTADOS
        // ==================================================

        document.getElementById(
            "resultados"
        ).scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error(
            "Error al calcular:",
            error
        );

        alert(
            "Ocurrió un error al realizar el cálculo. " +
            "Presione F12 y revise la consola para más detalles."
        );

    }

}