import { resgatarDoLocalStorage } from "./src/localStorage.js"
import { catalogoProdutos } from "./src/catalogoDeProdutos.js"


function desenharProdutoNoHistorico(idProduto, containerPedido, quantidadeProduto){
    const produto = catalogoProdutos.find((produto) => produto.id === idProduto)
    const containerCheckout = document.getElementById(containerPedido)
    const htmlCartaoProduto = `
        <article id="produto-historico-${produto.id}" class="bg-slate-200 p-2 rounded-lg">
            <img class = "w-full w-44 m-auto mb-3 rounded-lg" src="./assets/imgs/${produto.imagem}.jpg" alt="" class="h-32 rounded-lg">
            <div class="ml-4">
                <p>${produto.nome}</p>
                <p>R$ ${produto.preco}</p>
                <p id="quantidade-produto-${produto.id}">Quantidade total: ${quantidadeProduto}</p>
            </div>
        </article>   
    `

    containerCheckout.innerHTML += htmlCartaoProduto
}

function criarPedidoHistorico(pedidoComData){
    const containerPedidos = document.getElementById('container-pedidos')
    const htmlPedidos = `
        <p class = 'text-center'>${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-br', {hour: '2-digit', minute: '2-digit'})}</p>
        <section class = "flex flex-col gap-5 w-64" id = 'pedido-${pedidoComData.dataPedido}'>
            
        </section>
    `

    containerPedidos.innerHTML += htmlPedidos

    for(const idProduto in pedidoComData.pedido){
        desenharProdutoNoHistorico(idProduto, `pedido-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto])
    }
}

function renderizarHistoricoPedidos(){
    const historico = resgatarDoLocalStorage('historico')

    for(const pedidoComData of historico){
        criarPedidoHistorico(pedidoComData)
    }
}

renderizarHistoricoPedidos()