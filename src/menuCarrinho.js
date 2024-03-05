import { catalogoProdutos } from "./catalogoDeProdutos.js"

const buttonsCarrinho = {
    btnAbrirCarrinho:  document.getElementById('abrir-carrinho'),
    btnFecharCarrinho: document.getElementById('fechar-carrinho')
}

const containerCarrinho = document.getElementById('carrinho')

function abrirCarrinho(){
    containerCarrinho.classList.remove('right-[-360px]')
    containerCarrinho.classList.add('right-[0]')
}

function fecharCarrinho(){
    containerCarrinho.classList.remove('right-[0]')
    containerCarrinho.classList.add('right-[-360px]')
}

export function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogoProdutos.find((produto) => produto.id === idProduto)
    const containerProdutoCarrinho = document.getElementById('produtos-carrinho')

    const htmlProdutoCarrinho = `
        <article class="relative flex bg-slate-700 rounded-lg p-1">
            <img src="./assets/imgs/${produto.imagem}.jpg" alt="" class="h-24 rounded-lg">
            <button class="remover-produto-${produto.id} absolute top-0 right-2 text-slate-200">
            <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="p-2 flex flex-col justify-between gap-2">
            <p class="text-slate-200 text-sm">Zara</p>
            <p class="text-slate-200 text-sm">Camisa Larga com Bolsos</p>
            <p class="text-lg text-green-700 font-bold">R$ 70,00</p>
            </div>
        </article>
    `

    containerProdutoCarrinho.innerHTML += htmlProdutoCarrinho

}


export function inicializarOCarrinho(){
    const {btnAbrirCarrinho, btnFecharCarrinho} = buttonsCarrinho
    btnAbrirCarrinho.addEventListener('click', abrirCarrinho)
    btnFecharCarrinho.addEventListener('click', fecharCarrinho)
}