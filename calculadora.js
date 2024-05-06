var calculadora = [[{ Id: 'eliminar', Clase: 'borrador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "CE", Texto: "CE", Columnas: '4' }, { Id: 'resetear', Clase: 'borrador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "C", Texto: "C", Columnas: '4' }, { Id: 'borrar', Clase: 'borrador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "back", Texto: "", Columnas: '4' }],
[{ Id: '7', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "7", Texto: "7", Columnas: '3' }, { Id: '8', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "8", Texto: "8", Columnas: '3' }, { Id: '9', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "9", Texto: "9", Columnas: '3' }, { Id: '/', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "/", Texto: "/", Columnas: '3' }],
[{ Id: '4', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "4", Texto: "4", Columnas: '3' }, { Id: '5', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "5", Texto: "5", Columnas: '3' }, { Id: '6', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "6", Texto: "6", Columnas: '3' }, { Id: '-', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "-", Texto: "-", Columnas: '3' }],
[{ Id: '1', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "1", Texto: "1", Columnas: '3' }, { Id: '2', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "2", Texto: "2", Columnas: '3' }, { Id: '3', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "3", Texto: "3", Columnas: '3' }, { Id: '+', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "+", Texto: "+", Columnas: '3' }],
[{ Id: '0', Clase: 'numero', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "0", Texto: "0", Columnas: '9' }, { Id: '*', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "*", Texto: "*", Columnas: '3' }],
[{ Id: '=', Clase: 'operador', Estilos: 'btn btn-light btn-outline-secondary p-3 w-100', Valor: "=", Texto: "=", Columnas: '12' }]];
var tipoOperador = 0;
var resultado = 0;
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
    $('#eliminar').on('click', eliminar);
    $('#resetear').on('click', resetear);
    $('#borrar').on('click', borrarUno);
    $('.numero').on('click', setNumero)
    $('.operador').on('click', manejarOperacion)


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
    if (numero === 'resul' || esIgual === true) {
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
    esIgual = false;
    $('#operacion').text('');
    $('#resultado').text(numero)
    $('.operador').each((index, element) => {
        $(element).val() !== '=' && $(element).prop('disabled', false);

    })
}
async function manejarOperacion(e) {

    if ($(e.target).val() === '=') {
        if (resultado === 'inviable') {
            manejarInviable();
        } else {
            if (numero === 'resul') {
                numero = resultado;
            }

            if (tipoOperador !== 0) {
                $('#operacion').text(resultado + ' ' + tipoOperador + ' ' + numero + '=');
                esIgual = true;
            } else {
                $('#operacion').text(numero + '=');
            }
            operar();
        }

    } else {
        if (esIgual == true) {
            numero = 'resul';
        } else if (numero != 'resul') {
            operar();
        }
        esIgual = false;


        tipoOperador = $(e.target).val();
        if (resultado !== 'inviable') {
            $('#operacion').text(resultado + ' ' + tipoOperador);
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