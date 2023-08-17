var bloco = 25;
var linha = 20;
var coluna= 20;
var area;
var contexto; 

var cobraX = bloco * 5;
var cobraY = bloco * 5;

var velocidadeX = 0;
var velocidadeY = 0;

var corpoCobra = [];

var comidaX;
var comidaY;

var fimJogo = false;

window.onload = function() {
    area = document.getElementById("area");
    area.height = linha * bloco;
    area.width = coluna * bloco;
    contexto = area.getContext("2d");

    spawnComida();
    document.addEventListener("keyup", mudarDireção);
    setInterval(update, 1000/10);
}

function update() {
    if (fimJogo) {
        return;
    }

    contexto.fillStyle="#003300";
    contexto.fillRect(0, 0, area.width, area.height);

    contexto.fillStyle="#cc3300";
    contexto.fillRect(comidaX, comidaY, bloco, bloco);

    if (cobraX == comidaX && cobraY == comidaY) {
        corpoCobra.push([comidaX, comidaY]);
        spawnComida();
    }

    for (let i = corpoCobra.length-1; i > 0; i--) {
        corpoCobra[i] = corpoCobra[i-1];
    }

    if (corpoCobra.length) {
        corpoCobra[0] = [cobraX, cobraY];
    }

    contexto.fillStyle="#0000cc";
    cobraX += velocidadeX * bloco;
    cobraY += velocidadeY * bloco;
    contexto.fillRect(cobraX, cobraY, bloco, bloco);
    for (let i = 0; i < corpoCobra.length; i++) {
        contexto.fillRect(corpoCobra[i][0], corpoCobra[i][1], bloco, bloco);
    }

    if (cobraX < 0 || cobraX > coluna*bloco || cobraY < 0 || cobraY > linha*bloco) {
        fimJogo = true;
        alert("Fim de Jogo");
    }

    for (let i = 0; i < corpoCobra.length; i++) {
        if (cobraX == corpoCobra[i][0] && cobraY == corpoCobra[i][1]) {
            fimJogo = true;
            alert("Fim de Jogo");
        }
    }
}

function mudarDireção(e) {
    if (e.code == "ArrowUp" && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if (e.code == "ArrowDown" && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if (e.code == "ArrowLeft" && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    }
    else if (e.code == "ArrowRight" && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}


function spawnComida() {
    comidaX = Math.floor(Math.random() * coluna) * bloco;
    comidaY = Math.floor(Math.random() * linha) * bloco;
}