let botaoJogar = document.getElementById("btn-play");
let campoJogador = document.getElementById("input-jogador");
let campoBot = document.getElementById("input-bot");
let campoMensagens = document.getElementById("mensagem");
let placarJogador = document.getElementById("vitoria-jogador");
let PlacarBotHTML = document.getElementById("vitoria-computador");
let moedasJogador = document.getElementById("moedas");
let botaoLoja = document.getElementById("btn-shop"); //botao loja
let lojaAvatares = document.getElementById("loja-avatares");
let botaoFecharLoja = document.getElementById("fechar");
let avatarJogador = document.getElementById("avatar-player") //ATENÇÃO AVATAR PLAYER PARA MUDAR AO APLICAR
let preVisualizador = document.querySelectorAll(".pre-visu");
let avataresDaLoja = document.querySelectorAll(".avatar-loja");
let avataresDaLojaPreco = document.querySelectorAll(".preco-avatar");
let botaoComprar = document.querySelectorAll(".comprar"); //botao de comprar, selecionar enfim
let botaoComprarSelecionado = null;
let avatarSelecionado = null; //variavel q vai receber qual foi o avatar selecionado
let valorCompra = null;
let avatarAplicado = null; //variavel q vai aplicar o avatar

botaoJogar.addEventListener("click", jogo);

campoJogador.addEventListener("input", habilitarBotao);

botaoLoja.addEventListener("click", abrirLoja);

botaoFecharLoja.addEventListener("click", fecharLoja);

let compraConfirmada = [1, 0, 0, 0];

// variaveis de funcoes aaaa dor de cabeça :p

let campoValorTexto;
let campoValorNumero;
let opcoesBot;
let sorteio;
let apostaTextoBot;
let apostaNumeroBot;
let placarPlayer = 0;
let placarBot = 0;
let moedasPlayer = 0;

let moedasMensagem = document.createElement("h5");
moedasMensagem.innerHTML = "Você ganhou +5 moedas &#x1FA99;";

let jogarNovamente = document.createElement("button");
jogarNovamente.innerHTML = "Jogar novamente";
jogarNovamente.addEventListener("click", playAgain);

for(let i=0;i<4;i++){
    avataresDaLoja[i].addEventListener("click", selecionarAvatar);
    botaoComprar[i].addEventListener("click", comprarAvatar);
}

function habilitarBotao(){
    if(campoJogador.value!=""){
        botaoJogar.disabled=false;

        campoValorTexto = campoJogador.value;
        campoValorNumero = parseInt(campoJogador.value);

        if(campoValorNumero<0 || campoValorNumero>10){
            alert("Por favor, digite um número de 0 a 10! >:(");
            campoJogador.value = "";
            botaoJogar.disabled = true;
        }
    }else{
        botaoJogar.disabled=true;
    }
}

function jogo(){
    botaoJogar.disabled = true;
    opcoesBot = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    sorteio = Math.floor(Math.random()*11);
    apostaTextoBot = opcoesBot[sorteio];
    apostaNumeroBot = parseInt(apostaTextoBot);
    campoBot.value = apostaNumeroBot;
    somaNumeros = campoValorNumero + apostaNumeroBot;
    campoJogador.disabled = true;

    if(somaNumeros%2==0){
        campoMensagens.innerHTML = "<h4>Você venceu! &#x1F973;</h4>";
        placarPlayer++;
        placarJogador.innerHTML = placarPlayer;
        if(placarPlayer%3==0){
            moedasPlayer+=5;
            moedasJogador.innerHTML = moedasPlayer;
            campoMensagens.appendChild(moedasMensagem);
        }
    }else{
        campoMensagens.innerHTML = "<h4>Vocè perdeu... Tenha determinação &#x1F61E;</h4>";
        placarBot++;
        PlacarBotHTML.innerHTML = placarBot;
    }
    campoMensagens.appendChild(jogarNovamente);
}

function playAgain(){
    campoJogador.value = null;
    campoBot.value = null;
    campoJogador.disabled = false;
    campoMensagens.innerHTML = ""
}

function abrirLoja(){
    lojaAvatares.classList.add("mostrar")
}

function fecharLoja(){
    lojaAvatares.classList.remove("mostrar");
}

function selecionarAvatar(evento){
    let elemento = evento.target;
    avatarSelecionado = elemento.dataset.opcao;

    switch(avatarSelecionado){
        case "avatar-padrão":
            for(let i=0;i<4;i++){
                preVisualizador[i].classList.remove("mostrar");
            }
            preVisualizador[0].classList.add("mostrar");
            break;
        case "avatar-aranha_romantica":
            for(let i=0;i<4;i++){
                preVisualizador[i].classList.remove("mostrar");
            }
            preVisualizador[1].classList.add("mostrar");
            break;
        case "avatar-coelho_cobain":
            for(let i=0;i<4;i++){
                preVisualizador[i].classList.remove("mostrar");
            }
            preVisualizador[2].classList.add("mostrar");
            break;
        case "avatar-fantasma_depressivo":
            for(let i=0;i<4;i++){
                preVisualizador[i].classList.remove("mostrar");
            }
            preVisualizador[3].classList.add("mostrar");
        break;
    }
}

function comprarAvatar(evento){
    let elemento;
    elemento = evento.target;
    botaoComprarSelecionado = elemento.dataset.avatar;
    switch(botaoComprarSelecionado){

        case "avatar-aranha_romantica":
                if(moedasPlayer>=15){
                        valorCompra = moedasPlayer - 15;
                        moedasPlayer = valorCompra;
                        moedasJogador.innerHTML = valorCompra;
                        botaoComprar[1].innerHTML="Aplicar";
                        avataresDaLojaPreco[1].innerHTML="Disponível";
                        botaoComprar[1].removeEventListener("click", comprarAvatar);
                        botaoComprar[1].addEventListener("click", aplicarAvatar);
                        compraConfirmada[1] = 1;
                    }else{
                        alert("Você não tem moedas o suficiente");
                    }
        break;

        case "avatar-coelho_cobain":
            if(moedasPlayer>=25){
                    valorCompra = moedasPlayer - 25;
                    moedasPlayer = valorCompra;
                    moedasJogador.innerHTML = valorCompra;
                    botaoComprar[2].innerHTML = "Aplicar";
                    avataresDaLojaPreco[2].innerHTML="Disponível";
                    botaoComprar[2].removeEventListener("click", comprarAvatar);
                    botaoComprar[2].addEventListener("click", aplicarAvatar);
                    compraConfirmada[2] = 1;
                }else{
                    alert("Você não tem moedas o suficiente");
                }
        break;

        case "avatar-fantasma_depressivo":
            if(moedasPlayer>=35){
                    valorCompra = moedasPlayer - 35;
                    moedasPlayer = valorCompra;
                    moedasJogador.innerHTML = valorCompra;
                    botaoComprar[3].innerHTML = "Aplicar";
                    avataresDaLojaPreco[3].innerHTML="Disponível";
                    botaoComprar[3].removeEventListener("click", comprarAvatar);
                    botaoComprar[3].addEventListener("click", aplicarAvatar);
                    compraConfirmada[3] = 1;
                }else{
                    alert("Você não tem moedas o suficiente");
            }
            break;
    }
}

    botaoComprar[0].removeEventListener("click", comprarAvatar);
    botaoComprar[0].addEventListener("click", aplicarAvatar);
function aplicarAvatar(evento){
    
    let elemento;
    elemento = evento.target;
    avatarAplicado = elemento.dataset.avatar;
    switch(avatarAplicado){

        case "avatar-abobora_diabetica":
            for(let i=0;i<4;i++){
                if(compraConfirmada[i]==1){
                    botaoComprar[i].innerHTML="Aplicar";
                    avataresDaLojaPreco[i].innerHTML="Disponível";
                }
            }

                avatarJogador.setAttribute('src', 'img/avatar-abobora_diabetica.jpg');
                avataresDaLojaPreco[0].innerHTML = "&#x2714; Em uso";
                botaoComprar[0].innerHTML = "&#x2714; Em uso";
        break;
        case "avatar-aranha_romantica":
            for(let i=0;i<4;i++){
                if(compraConfirmada[i]==1){
                    botaoComprar[i].innerHTML="Aplicar";
                    avataresDaLojaPreco[i].innerHTML="Disponível";
                }
            }

                avatarJogador.setAttribute('src', 'img/avatar-aranha_romantica.jpg');
                avataresDaLojaPreco[1].innerHTML = "&#x2714; Em uso";
                botaoComprar[1].innerHTML = "&#x2714; Em uso";
        break;

        case "avatar-coelho_cobain":  

            for(let i=0;i<4;i++){
                if(compraConfirmada[i]==1){
                    botaoComprar[i].innerHTML="Aplicar";
                    avataresDaLojaPreco[i].innerHTML="Disponível";
                }
            }

            avatarJogador.setAttribute('src', 'img/avatar-coelhinho_cobain.jpg');
            avataresDaLojaPreco[2].innerHTML = "&#x2714; Em uso";
            botaoComprar[2].innerHTML = "&#x2714; Em uso";
        break;

        case "avatar-fantasma_depressivo":

            for(let i=0;i<4;i++){
                if(compraConfirmada[i]==1){
                    botaoComprar[i].innerHTML="Aplicar";
                    avataresDaLojaPreco[i].innerHTML="Disponível";
                }
            }

            avatarJogador.setAttribute('src', 'img/avatar-fantasminha_depressivo.jpg');
            avataresDaLojaPreco[3].innerHTML = "&#x2714; Em uso";
            botaoComprar[3].innerHTML = "&#x2714; Em uso";
        break;
        
    }
}



