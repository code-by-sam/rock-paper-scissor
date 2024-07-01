document.addEventListener('DOMContentLoaded', () => {
    const choices = ['piedra', 'papel', 'tijeras'];
    const resultado = document.getElementById('resultado');
    const resultDisplay = document.getElementById('result-display');

    const sonidos = {
        piedra: new Audio('sounds/piedra.mp3'),
        papel: new Audio('sounds/papel.mp3'),
        tijeras: new Audio('sounds/tijeras.mp3'),
        win: new Audio('sounds/win.mp3'),
        lose: new Audio('sounds/lose.mp3'),
        empate: new Audio('sounds/empate.mp3')
    };

    const elementos = {
        piedra: document.getElementById('piedra'),
        papel: document.getElementById('papel'),
        tijeras: document.getElementById('tijeras')
    };

    const elegirOpcion = (eleccionUsuario) => {
        const eleccionComputadora = choices[Math.floor(Math.random() * choices.length)];
        let resultadoTexto = '';
        let ganador = '';

        if (eleccionUsuario === eleccionComputadora) {
            resultadoTexto = `Empate! Ambos eligieron ${eleccionUsuario}`;
            ganador = 'empate';
        } else if (
            (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijeras') ||
            (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
            (eleccionUsuario === 'tijeras' && eleccionComputadora === 'papel')
        ) {
            resultadoTexto = `Ganaste! ${eleccionUsuario} vence a ${eleccionComputadora}`;
            ganador = 'usuario';
        } else {
            resultadoTexto = `Perdiste! ${eleccionComputadora} vence a ${eleccionUsuario}`;
            ganador = 'computadora';
        }

        resultado.textContent = resultadoTexto;
        mostrarResultado(eleccionUsuario, eleccionComputadora, ganador);
        reproducirSonidos(eleccionUsuario, eleccionComputadora, ganador);
    };

    const mostrarResultado = (eleccionUsuario, eleccionComputadora, ganador) => {
        const usuarioImg = `<img src="img/${eleccionUsuario}.png" alt="${eleccionUsuario}">`;
        const computadoraImg = `<img src="img/${eleccionComputadora}.png" alt="${eleccionComputadora}">`;
        let resultadoHtml = `
            ${usuarioImg}
            <p>VS</p>
            ${computadoraImg}
        `;
        
        if (ganador === 'usuario') {
            resultadoHtml += `<p>=</p>${usuarioImg}`;
        } else if (ganador === 'computadora') {
            resultadoHtml += `<p>=</p>${computadoraImg}`;
        } else {
            resultadoHtml += `<p>=</p>${usuarioImg}`; // Para empate, muestra la imagen del usuario
        }

        resultDisplay.innerHTML = resultadoHtml;
    };

    const reproducirSonidos = (eleccionUsuario, eleccionComputadora, ganador) => {
        if (ganador === 'usuario') {
            sonidos.win.play();
            sonidos[eleccionUsuario].play();
        } else if (ganador === 'computadora') {
            sonidos.lose.play();
            sonidos[eleccionComputadora].play();
        } else if (ganador === 'empate') {
            sonidos.empate.play();
        }
    };

    const resetearSonidos = () => {
        Object.values(sonidos).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    };

    Object.keys(elementos).forEach(key => {
        elementos[key].addEventListener('click', () => {
            resetearSonidos();
            elegirOpcion(key);
        });
    });
});
