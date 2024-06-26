var calculadora = [[{ Id: 'porciento', Clase: 'porciento', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "%", Texto: "%", Columnas: "3" }, { Id: 'eliminar', Clase: 'borrador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "CE", Texto: "CE", Columnas: '3' }, { Id: 'resetear', Clase: 'borrador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "C", Texto: "C", Columnas: '3' }, { Id: 'borrar', Clase: 'borrador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "back", Texto: "", Columnas: '3' }],
[{ Id: 'potencia', Clase: 'potencia', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: 'ptn', Texto: 'x^2', Columnas: '6' }, { Id: '/', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "/", Texto: "/", Columnas: '6' }],
[{ Id: '7', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "7", Texto: "7", Columnas: '3' }, { Id: '8', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "8", Texto: "8", Columnas: '3' }, { Id: '9', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "9", Texto: "9", Columnas: '3' }, { Id: '*', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "*", Texto: "*", Columnas: '3' }],
[{ Id: '4', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "4", Texto: "4", Columnas: '3' }, { Id: '5', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "5", Texto: "5", Columnas: '3' }, { Id: '6', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "6", Texto: "6", Columnas: '3' }, { Id: '-', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "-", Texto: "-", Columnas: '3' }],
[{ Id: '1', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "1", Texto: "1", Columnas: '3' }, { Id: '2', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "2", Texto: "2", Columnas: '3' }, { Id: '3', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "3", Texto: "3", Columnas: '3' }, { Id: '+', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "+", Texto: "+", Columnas: '3' }],
[{ Id: '0', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "0", Texto: "0", Columnas: '6' }, { Id: '=', Clase: 'operador', Estilos: 'btn btn-primary text-white p-3 w-100', Valor: "=", Texto: "=", Columnas: '6' }]];
var tipoOperador = 0;
var resultado = 0;
var resultadoTexto = '';
var numeroTexto = '';
var numero = 0;
var esIgual = false;

calculadora.forEach(fila => {
    fila.forEach(columna => {
        var boton = $(`<div class="col-${columna.Columnas}"></div>`);
        $(boton).append(`<button type="button" id="${columna.Id}" class="${columna.Clase} ${columna.Estilos}" value="${columna.Valor}">${columna.Texto}</button>`)
        $('#teclado').append(boton)
    })

})
$('#borrar').append('<i class="bi bi-backspace"></i>');

function cargarPagina() {
    $('#resultado').text(numero);
    $('#eliminar').click(eliminar);
    $('#resetear').click(resetear);
    $('#borrar').click(borrarUno);
    $('#porciento').click(porcentaje);
    $('#potencia').click(potenciaCuadrado);
    $('.numero').on('click', setNumero);
    $('.operador').on('click', manejarOperacion);


}

function potenciaCuadrado() {
    if (numero == 'resul' || numero == 'potencia') {
        if (tipoOperador == 0 || esIgual) {
            resultadoTexto = `sqr(${resultadoTexto})`;
        } else {
            numeroTexto = `sqr(${numero == 'potencia' ? numeroTexto : $('#resultado').text()})`;
        }
        numero = parseFloat($('#resultado').text());
    } else if (esIgual) {
        resultadoTexto = `sqr(${resultado})`;
    } else if (tipoOperador == 0) {
        resultadoTexto = `sqr(${numero})`;
    } else {
        numeroTexto = `sqr(${numero})`
    }
    if (tipoOperador == 0 || esIgual) {
        resultado = Math.pow((esIgual ? resultado : numero), 2);
        $('#operacion').text(`${resultadoTexto}`);
        $('#resultado').text(`${resultado}`);
        numero = 'potencia';
    } else {
        $('#operacion').text(`${resultadoTexto} + ${numeroTexto}`);
        numero = Math.pow(numero, 2);
        $('#resultado').text(`${numero}`);
        numero = 'potencia';
    }
}

function porcentaje() {
    if (esIgual) {
        resultado = resultado / 100 * resultado;
        $('#operacion').text(`${resultado}`);
        $('#resultado').text(`${resultado}`)
    }
    else if (tipoOperador == 0) {
        numero = 0
        $('#operacion').text(`${numero}`);
        $('#resultado').text(`${numero}`)
    } else {
        if (numero == 'resul' || numero == 'porcentaje') {
            numero = parseFloat($('#resultado').text());
        }
        numero = resultado / 100 * numero;
        $('#operacion').text(`${resultado} + ${numero}`);
        $('#resultado').text(`${numero}`)
        numero = 'porcentaje';
    }
}


const sumar = (resultado, numero) => {
    return parseFloat(resultado) + parseFloat(numero);
}

const multiplicar = (resultado, numero) => {
    return parseFloat(resultado) * parseFloat(numero);
}

const dividir = (resultado, numero) => {
    if (numero != 0) {
        return parseFloat(resultado) / parseFloat(numero);
    } else {
        return 'inviable';
    }
}

const restar = (resultado, numero) => {
    return parseFloat(resultado) - parseFloat(numero);
}

const calculo = (resultado, numero, operador) => {
    switch (operador) {
        case '-':
            return restar(resultado, numero);
        case '+':
            return sumar(resultado, numero);
        case '*':
            return multiplicar(resultado, numero);
        case '/':
            return dividir(resultado, numero);
        default:
            return parseFloat(numero);
    }
}




function setNumero(e) {
    numeroTexto = '';
    if (numero === 'resul' || esIgual === true || numero === 'porcentaje' || numero === 'potencia') {
        if (numero == 'porcentaje') {
            $('#operacion').text(`${resultado} ${tipoOperador}`)
        } else if (numero == 'potencia') {
            $('#operacion').text(`${resultadoTexto} `)
        }
        numero = 0;

    }
    if (resultado == 'inviable') {
        manejarInviable();
    } else if (esIgual === true) {
        esIgual = false;
        $('#operacion').text('');
        resultado = 0;
        tipoOperador = 0;
    }
    numero = numero + $(e.target).val();
    numero = parseFloat(numero);
    $('#resultado').text(numero)
}

function borrarUno() {
    if (resultado == 'inviable') {
        resetear();
    } else if (esIgual == true) {
        $('#operacion').text('');
        operacdor = 0;
    }
    else if (esIgual !== true && !$('#operacion').text().includes('=')) {
        numero = numero.toString();
        if (numero.length > 1 && numero !== 'resul') {
            numero = numero.substr(0, numero.length - 1);
            numero = parseInt(numero);
        } else {
            numero = 0
        }
        $('#resultado').text(numero)
    }
}

function eliminar() {
    if (resultado === 'inviable') {
        manejarInviable();
    } else {
        numero = 0;
        $('#resultado').text(numero);
        if (esIgual == true) {
            resultado = 0;
            $('#operacion').text('');
        }
    }

}

function resetear() {
    numero = 0;
    manejarInviable();

}

function manejarInviable() {
    resultado = 0;
    tipoOperador = 0;
    resultadoTexto = '';
    numeroTexto = '';
    esIgual = false;
    $('#operacion').text('');
    $('#resultado').text(numero)
    $('.operador').each((index, element) => {
        $(element).val() !== '=' && $(element).prop('disabled', false);

    })
}
function manejarOperacion(e) {


    if ($(e.target).val() === '=') {
        if (resultado === 'inviable') {
            manejarInviable();
        } else {
            if (numero === 'resul') {
                numero = resultado;

            } else if (numero === 'porcentaje' || numero === 'potencia') {
                numero = parseFloat($('#resultado').text());
            }
            if (esIgual) {
                resultadoTexto = resultado;
                numeroTexto = numero
            } else {
                if (numeroTexto == '') {
                    numeroTexto = numero
                }
                if (resultadoTexto == '') {
                    resultadoTexto = resultado;
                }

            };
            if (tipoOperador !== 0) {
                $('#operacion').text(resultadoTexto + ' ' + tipoOperador + ' ' + numeroTexto + '=');
                esIgual = true;
            } else {
                $('#operacion').text(resultadoTexto + '=');
            }

            operar();
        }

    } else {
        if (tipoOperador == 0 && numero != 'potencia') {
            resultadoTexto = $('#resultado').text();
        }
        if (esIgual == true) {
            numero = 'resul';
        } else if (numero != 'resul') {
            if (numero === 'porcentaje' || numero === 'potencia') {
                numero = parseFloat($('#resultado').text());
            }
            operar();
        }
        if (tipoOperador != 0) {
            resultadoTexto = resultado;
        }
        esIgual = false;


        tipoOperador = $(e.target).val();
        if (resultado !== 'inviable') {
            $('#operacion').text(resultadoTexto + ' ' + tipoOperador);
        }
    }
}




function operar() {

    resultado = calculo(resultado, numero, tipoOperador);
    if (resultado !== 'inviable') {
        if (esIgual === false) {
            numero = 'resul';
        }
        $('#resultado').text(resultado);


    } else {
        $('#resultado').text('No es posible dividir entre 0');
        numero = 0;
        $('.operador').each((index, element) => {
            $(element).val() !== '=' && $(element).prop('disabled', true);

        })
    }
}

$(window).on('load', cargarPagina);