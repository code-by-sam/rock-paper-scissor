document.addEventListener("DOMContentLoaded", () => {
  const choices = ["piedra", "papel", "tijeras"];
  const resultado = document.getElementById("resultado");
  const resultDisplay = document.getElementById("result-display");

  const elementos = {
    piedra: document.getElementById("piedra"),
    papel: document.getElementById("papel"),
    tijeras: document.getElementById("tijeras"),
  };

  // Audio setup
  const sonidos = {
    piedra: new Audio("sounds/piedra.mp3"),
    papel: new Audio("sounds/papel.mp3"),
    tijeras: new Audio("sounds/tijeras.mp3"),
    win: new Audio("sounds/win.mp3"),
    lose: new Audio("sounds/lose.mp3"),
    empate: new Audio("sounds/empate.mp3"),
  };

  const resetearSonidos = () => {
    Object.values(sonidos).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  };

  const elegirOpcion = (eleccionUsuario) => {
    resetearSonidos();

    const eleccionComputadora =
      choices[Math.floor(Math.random() * choices.length)];
    let resultadoTexto = "";
    let ganador = "";

    if (eleccionUsuario === eleccionComputadora) {
      resultadoTexto = `¡Empate! Ambos eligieron ${eleccionUsuario}`;
      ganador = "empate";
    } else if (
      (eleccionUsuario === "piedra" && eleccionComputadora === "tijeras") ||
      (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
      (eleccionUsuario === "tijeras" && eleccionComputadora === "papel")
    ) {
      resultadoTexto = `¡Ganaste! ${eleccionUsuario} vence a ${eleccionComputadora}`;
      ganador = "win";
    } else {
      resultadoTexto = `Perdiste. ${eleccionComputadora} vence a ${eleccionUsuario}`;
      ganador = "lose";
    }

    // Actualizar texto con animación
    resultado.textContent = resultadoTexto;
    resultado.classList.remove("animate");
    void resultado.offsetWidth;
    resultado.classList.add("animate");

    // Mostrar imágenes de elección
    resultDisplay.innerHTML = `
      <div aria-label="Tu elección: ${eleccionUsuario}" role="img">
        <img src="img/${eleccionUsuario}.png" alt="${eleccionUsuario}" />
        <p>Tú</p>
      </div>
      <div aria-label="Elección de la computadora: ${eleccionComputadora}" role="img">
        <img src="img/${eleccionComputadora}.png" alt="${eleccionComputadora}" />
        <p>Computadora</p>
      </div>
    `;

    // Sonidos
    sonidos[eleccionUsuario].play();
    if (ganador === "win") sonidos.win.play();
    else if (ganador === "lose") sonidos.lose.play();
    else if (ganador === "empate") sonidos.empate.play();

    // Visual feedback: resaltar la opción seleccionada
    Object.values(elementos).forEach((el) => el.classList.remove("selected"));
    elementos[eleccionUsuario].classList.add("selected");

    // Actualizar aria-checked para accesibilidad
    Object.keys(elementos).forEach((key) => {
      elementos[key].setAttribute(
        "aria-checked",
        key === eleccionUsuario ? "true" : "false"
      );
      elementos[key].setAttribute(
        "tabindex",
        key === eleccionUsuario ? "0" : "-1"
      );
    });

    // Poner foco en la opción seleccionada para mejor experiencia teclado
    elementos[eleccionUsuario].focus();
  };

  // Añadir listeners
  Object.keys(elementos).forEach((key) => {
    elementos[key].addEventListener("click", () => elegirOpcion(key));
    elementos[key].addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        elegirOpcion(key);
      }
      // Navegación por flechas
      const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      if (keys.includes(e.key)) {
        e.preventDefault();
        const currentIndex = choices.indexOf(key);
        let nextIndex;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % choices.length;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + choices.length) % choices.length;
        }
        elementos[choices[nextIndex]].focus();
      }
    });
  });
});
