const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((el) =>{
    criaElemento(el)
})

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const nome = event.target.elements['nome']
    const quantidade = event.target.elements['quantidade']

    const existe = itens.find((el) => el.nome === nome.value)
    console.log(existe)
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(el => el.id === existe.id)] = itemAtual

    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1].id +1) : 0

        criaElemento(itemAtual)
    
        itens.push(itemAtual)
    }
    localStorage.setItem("itens", JSON.stringify(itens))
    
    nome.value = ''
    quantidade.value = ''
})

function criaElemento(item){
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')
    
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    const texto = document.createElement('p')
    texto.innerHTML = item.nome
    novoItem.appendChild(numeroItem)
    novoItem.appendChild(texto)

    novoItem.appendChild(botaoDeleta(item.id))
    lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const botao = document.createElement('button')
    botao.innerText = "X"

    botao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })
    return botao;
}

function deletaElemento(elemento, id){
    elemento.remove()
    itens.splice(itens.findIndex((el) => el.id === id),1)
    localStorage.setItem("itens", JSON.stringify(itens))

}