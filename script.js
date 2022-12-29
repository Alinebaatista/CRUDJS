const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSetor = document.querySelector('#m-setor')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sNome.value = itens[index].nome
        sFuncao.value = itens[index].funcao
        sSetor.value = itens[index].setor
        sSalario.value = itens[index].salario
        id = index
    } else {
        sNome.value = ''
        sFuncao.value = ''
        sSetor.value = ''
        sSalario.value = ''
    }
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
     <td>${item.nome}</td>
     <td>${item.funcao}</td>
     <td>${item.setor}</td>
     <td>R$ ${item.salario}</td>
     <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
    if (sNome.value == '' || sFuncao.value == '' ||  sSetor.value == '' ||  sSalario.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].funcao = sFuncao.value
        itens[id].setor = sSetor.value
        itens[id].salario = sSalario.value
    } else {
        itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'setor': sSetor.value, 'salario': sSalario.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
     
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ??[]
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


