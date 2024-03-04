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

export function inicializarOCarrinho(){
    const {btnAbrirCarrinho, btnFecharCarrinho} = buttonsCarrinho
    btnAbrirCarrinho.addEventListener('click', abrirCarrinho)
    btnFecharCarrinho.addEventListener('click', fecharCarrinho)
}