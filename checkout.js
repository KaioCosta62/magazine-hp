import { catalogoProdutos } from "./src/catalogoDeProdutos.js"
import { resgatarDoLocalStorage, salvarNoLocalStorage, removerDoLocalStorage } from "./src/localStorage.js"

const idsProdutoCarrinhoComQuantidade = resgatarDoLocalStorage('carrinho') ?? {}


function atualizarPrecoCarrinhoCheckout(){
   
    let valorTotal = 0
    let precoTotalCarrinho = document.getElementById('preco-total-checkout')

    precoTotalCarrinho.innerText = `Valor total: R$ ${valorTotal},00`

    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        valorTotal += catalogoProdutos.find((produto) => produto.id === idProduto).preco * idsProdutoCarrinhoComQuantidade[idProduto]
    }

    precoTotalCarrinho.innerText = `Valor total: R$ ${valorTotal},00`

    salvarNoLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade)
}


function desenharProdutoNoCheckout(idProduto){
    const produto = catalogoProdutos.find((produto) => produto.id === idProduto)
    const containerCheckout = document.getElementById('container-produtos-checkout')
    const htmlCartaoProduto = `
        <article id="produto-checkout-${produto.id}" class="flex bg-white p-2 rounded-lg relative">
            <img src="./assets/imgs/${produto.imagem}.jpg" alt="" class="h-32 rounded-lg">
            <div class="ml-4">
                <p>${produto.nome}</p>
                <p>R$ ${produto.preco}</p>
            </div>
            <div class="flex text-slate-950 absolute bottom-2 right-2 text-lg">
                <p id="quantidade-produto-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
            </div>
        </article>   
    `

    containerCheckout.innerHTML += htmlCartaoProduto
    atualizarPrecoCarrinhoCheckout()
}

function renderizarProdutosCheckout(){
    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCheckout(idProduto)
    }
}

function finalizarCompra(e){
    e.preventDefault()

    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return
    }

    const data = new Date()

    const pedidoFeito = {
        dataPedido: data,
        pedido: idsProdutoCarrinhoComQuantidade
    }

    const historicoDePedidos = resgatarDoLocalStorage('historico') ?? []

    const historicoDePedidosAtualizados = [pedidoFeito, ...historicoDePedidos]

    salvarNoLocalStorage('historico', historicoDePedidosAtualizados)

    removerDoLocalStorage('carrinho')

    window.location.href = window.location.origin + '/historico.html'
}

renderizarProdutosCheckout()

document.addEventListener('submit', finalizarCompra)