const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");
      sidebarToggle2 = body.querySelector(".sidebar-toggle2");

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
});

sidebarToggle2.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
});


// Modal perfil

function menuToggle(){
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
}

const divUserButtonAndDropdown = document.querySelector('.actionimg');
const dropdown = document.querySelector('.menu');

document.addEventListener('click', function (event) {
    if (!divUserButtonAndDropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
})

'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const openModal2 = () => document.getElementById('modal2').classList.add('active')

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_aluno')) ?? []
const setLocalStorage = (dbAluno) => localStorage.setItem("db_aluno", JSON.stringify(dbAluno))

// CRUD - create read update delete
const deleteAluno = (index) => {
    const dbAluno = readAluno()
    dbAluno.splice(index, 1)
    setLocalStorage(dbAluno)
}

const updateAluno = (index, aluno) => {
    const dbAluno = readAluno()
    dbAluno[index] = aluno
    setLocalStorage(dbAluno)
}

const readAluno = () => getLocalStorage()

const createAluno = (aluno) => {
    const dbAluno = getLocalStorage()
    dbAluno.push (aluno)
    setLocalStorage(dbAluno)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

//Campos para serem salvos
const saveAluno = () => {
    debugger
    if (isValidFields()) {
        const aluno = {
            nome: document.getElementById('nome').value,
            matricula: document.getElementById('matricula').value,
            telefone: document.getElementById('telefone').value,
            celular: document.getElementById('celular').value,
            email: document.getElementById('email').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            curso: document.getElementById('curso').value,
            serie: document.getElementById('serie').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createAluno(aluno)
            updateTable()
            closeModal()
        } else {
            updateAluno(index, aluno)
            updateTable()
            closeModal()
        }
    }
}

//Tabela de Apresentação
const createRow = (aluno, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.serie}</td>
        <td>${aluno.celular}</td>
        <td>${aluno.email}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableAluno>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableAluno>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbAluno = readAluno()
    clearTable()
    dbAluno.forEach(createRow)
}

//Apresentação tabela modal
const fillFields = (aluno) => {
    document.getElementById('nome').value = aluno.nome
    document.getElementById('matricula').value = aluno.matricula
    document.getElementById('telefone').value = aluno.telefone
    document.getElementById('celular').value = aluno.celular
    document.getElementById('email').value = aluno.email
    document.getElementById('rua').value = aluno.rua
    document.getElementById('numero').value = aluno.numero
    document.getElementById('complemento').value = aluno.complemento
    document.getElementById('cidade').value = aluno.cidade
    document.getElementById('estado').value = aluno.estado
    document.getElementById('curso').value = aluno.curso
    document.getElementById('serie').value = aluno.serie   

    document.getElementById('nome').dataset.index = aluno.index
}

const editAluno = (index) => {
    const aluno = readAluno()[index]
    aluno.index = index
    fillFields(aluno)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editAluno(index)
        } else {
            const aluno = readAluno()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `Deseja realmente excluir o aluno ${aluno.nome}`
            openModal2()

        // APAGAR O REGISTRO
            document.getElementById('apagar').addEventListener('click', () => {
                deleteAluno(index)
                updateTable()
                closeModal2()
            })
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarAluno')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('modalClose2')
    .addEventListener('click', closeModal2)

document.getElementById('salvar')
    .addEventListener('click', saveAluno)

document.querySelector('#tableAluno>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('cancelar2')
    .addEventListener('click', closeModal2)

    'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const openModal2 = () => document.getElementById('modal2').classList.add('active')

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_funcionario')) ?? []
const setLocalStorage = (dbFuncionario) => localStorage.setItem("db_funcionario", JSON.stringify(dbFuncionario))

// CRUD - create read update delete
const deleteFuncionario = (index) => {
    const dbFuncionario = readFuncionario()
    dbFuncionario.splice(index, 1)
    setLocalStorage(dbFuncionario)
}

const updateFuncionario = (index, funcionario) => {
    const dbFuncionario = readFuncionario()
    dbFuncionario[index] = funcionario
    setLocalStorage(dbFuncionario)
}

const readFuncionario = () => getLocalStorage()

const createFuncionario = (funcionario) => {
    const dbFuncionario = getLocalStorage()
    dbFuncionario.push (funcionario)
    setLocalStorage(dbFuncionario)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

//Campos para serem salvos
const saveFuncionario = () => {
    debugger
    if (isValidFields()) {
        const funcionario = {
            nome: document.getElementById('nome').value,
            matricula: document.getElementById('matricula').value,
            telefone: document.getElementById('telefone').value,
            celular: document.getElementById('celular').value,
            email: document.getElementById('email').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            cpf: document.getElementById('cpf').value,
            funcao: document.getElementById('funcao').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createFuncionario(funcionario)
            updateTable()
            closeModal()
        } else {
            updateFuncionario(index, funcionario)
            updateTable()
            closeModal()
        }
    }
}

//Tabela de Apresentação
const createRow = (funcionario, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${funcionario.matricula}</td>
        <td>${funcionario.cpf}</td>
        <td>${funcionario.funcao}</td>
        <td>${funcionario.celular}</td>
        <td>${funcionario.email}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableFuncionario>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableFuncionario>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbFuncionario = readFuncionario()
    clearTable()
    dbFuncionario.forEach(createRow)
}

//Apresentação tabela modal
const fillFields = (funcionario) => {
    document.getElementById('nome').value = funcionario.nome
    document.getElementById('matricula').value = funcionario.matricula
    document.getElementById('telefone').value = funcionario.telefone
    document.getElementById('celular').value = funcionario.celular
    document.getElementById('email').value = funcionario.email
    document.getElementById('rua').value = funcionario.rua
    document.getElementById('numero').value = funcionario.numero
    document.getElementById('complemento').value = funcionario.complemento
    document.getElementById('cidade').value = funcionario.cidade
    document.getElementById('estado').value = funcionario.estado
    document.getElementById('cpf').value = funcionario.cpf
    document.getElementById('funcao').value = funcionario.funcao   

    document.getElementById('nome').dataset.index = funcionario.index
}

const editFuncionario = (index) => {
    const funcionario = readFuncionario()[index]
    funcionario.index = index
    fillFields(funcionario)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editFuncionario(index)
        } else {
            const funcionario = readFuncionario()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `Deseja realmente excluir o funcionario ${funcionario.nome}`
            openModal2()

        // APAGAR O REGISTRO
            document.getElementById('apagar').addEventListener('click', () => {
                deleteFuncionario(index)
                updateTable()
                closeModal2()
            })
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarFuncionario')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('modalClose2')
    .addEventListener('click', closeModal2)

document.getElementById('salvar')
    .addEventListener('click', saveFuncionario)

document.querySelector('#tableFuncionario>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

// modal apagar
document.getElementById('cancelar2')
    .addEventListener('click', closeModal2)

    'use strict'

    const openModal = () => document.getElementById('modal').classList.add('active')
    const openModal2 = () => document.getElementById('modal2').classList.add('active')
    
    const closeModal2 = () => {
        document.getElementById('modal2').classList.remove('active')
    }
    
    const closeModal = () => {
        clearFields()
        document.getElementById('modal').classList.remove('active')
    }
    
    const getLocalStorage = () => JSON.parse(localStorage.getItem('db_editora')) ?? []
    const setLocalStorage = (dbEditora) => localStorage.setItem("db_editora", JSON.stringify(dbEditora))
    
    // CRUD - create read update delete
    const deleteEditora = (index) => {
        const dbEditora = readEditora()
        dbEditora.splice(index, 1)
        setLocalStorage(dbEditora)
    }
    
    const updateEditora = (index, editora) => {
        const dbEditora = readEditora()
        dbEditora[index] = editora
        setLocalStorage(dbEditora)
    }
    
    const readEditora = () => getLocalStorage()
    
    const createEditora = (editora) => {
        const dbEditora = getLocalStorage()
        dbEditora.push (editora)
        setLocalStorage(dbEditora)
    }
    
    const isValidFields = () => {
        return document.getElementById('form').reportValidity()
    }
    
    //Interação com o layout
    const clearFields = () => {
        const fields = document.querySelectorAll('.modal-field')
        fields.forEach(field => field.value = "")
        document.getElementById('nome').dataset.index = 'new'
    }
    
    //Campos para serem salvos
    const saveEditora = () => {
        debugger
        if (isValidFields()) {
            const editora = {
                nome: document.getElementById('nome').value,
                gerente: document.getElementById('gerente').value,
                email: document.getElementById('email').value,
                endereco: document.getElementById('endereco').value,
                celular: document.getElementById('celular').value,
                telefone: document.getElementById('telefone').value
            }
            const index = document.getElementById('nome').dataset.index
            if (index == 'new') {
                createEditora(editora)
                updateTable()
                closeModal()
            } else {
                updateEditora(index, editora)
                updateTable()
                closeModal()
            }
        }
    }
    
    //Tabela de Apresentação
    const createRow = (editora, index) => {
        const newRow = document.createElement('tr')
        newRow.innerHTML = `
            <td>${editora.nome}</td>
            <td>${editora.gerente}</td>
            <td>${editora.email}</td>
            <td>${editora.celular}</td>
            <td>${editora.telefone}</td>
            <td>
                <button type="button" class="button green" id="edit-${index}">Editar</button>
                <button type="button" class="button red" id="delete-${index}" >Excluir</button>
            </td>
        `
        document.querySelector('#tableEditora>tbody').appendChild(newRow)
    }
    
    const clearTable = () => {
        const rows = document.querySelectorAll('#tableEditora>tbody tr')
        rows.forEach(row => row.parentNode.removeChild(row))
    }
    
    const updateTable = () => {
        const dbEditora = readEditora()
        clearTable()
        dbEditora.forEach(createRow)
    }
    
    //Apresentação tabela modal e edição
    const fillFields = (editora) => {
        document.getElementById('nome').value = editora.nome
        document.getElementById('gerente').value = editora.gerente
        document.getElementById('email').value = editora.email
        document.getElementById('endereco').value = editora.endereco
        document.getElementById('celular').value = editora.celular
        document.getElementById('telefone').value = editora.telefone 
        document.getElementById('nome').dataset.index = editora.index
    }
    
    const editEditora = (index) => {
        const editora = readEditora()[index]
        editora.index = index
        fillFields(editora)
        openModal()
    }
    
    const editDelete = (event) => {
        if (event.target.type == 'button') {
    
            const [action, index] = event.target.id.split('-')
    
            if (action == 'edit') {
                editEditora(index)
            } else {
                const editora = readEditora()[index]
                let avisoDelete = document.querySelector('#avisoDelete')
    
                avisoDelete.textContent = `Deseja realmente excluir o editora ${editora.nome}`
                openModal2()
    
            // APAGAR O REGISTRO
                document.getElementById('apagar').addEventListener('click', () => {
                    deleteEditora(index)
                    updateTable()
                    closeModal2()
                })
            }
        }
    }
    
    updateTable()
    
    // Eventos
    document.getElementById('cadastrarEditora')
        .addEventListener('click', openModal)
    
    document.getElementById('modalClose')
        .addEventListener('click', closeModal)
    
    // modal apagar
    document.getElementById('modalClose2')
        .addEventListener('click', closeModal2)
    
    document.getElementById('salvar')
        .addEventListener('click', saveEditora)
    
    document.querySelector('#tableEditora>tbody')
        .addEventListener('click', editDelete)
    
    document.getElementById('cancelar')
        .addEventListener('click', closeModal)
    
    // modal apagar
    document.getElementById('cancelar2')
        .addEventListener('click', closeModal2)

        'use strict'

        const openModal = () => document.getElementById('modal').classList.add('active')
        const openModal2 = () => document.getElementById('modal2').classList.add('active')
        
        const closeModal2 = () => {
            document.getElementById('modal2').classList.remove('active')
        }
        
        const closeModal = () => {
            clearFields()
            document.getElementById('modal').classList.remove('active')
        }
        
        const getLocalStorage = () => JSON.parse(localStorage.getItem('db_livro')) ?? []
        const setLocalStorage = (dbLivro) => localStorage.setItem("db_livro", JSON.stringify(dbLivro))
        
        // CRUD - create read update delete
        const deleteLivro = (index) => {
            const dbLivro = readLivro()
            dbLivro.splice(index, 1)
            setLocalStorage(dbLivro)
        }
        
        const updateLivro = (index, livro) => {
            const dbLivro = readLivro()
            dbLivro[index] = livro
            setLocalStorage(dbLivro)
        }
        
        const readLivro = () => getLocalStorage()
        
        const createLivro = (livro) => {
            const dbLivro = getLocalStorage()
            dbLivro.push (livro)
            setLocalStorage(dbLivro)
        }
        
        const isValidFields = () => {
            return document.getElementById('form').reportValidity()
        }
        
        //Interação com o layout
        const clearFields = () => {
            const fields = document.querySelectorAll('.modal-field')
            fields.forEach(field => field.value = "")
            document.getElementById('nome').dataset.index = 'new'
        }
        
        //Campos para serem salvos
        const saveLivro = () => {
            debugger
            if (isValidFields()) {
                const livro = {
                    codigo: document.getElementById('codigo').value,
                    nome: document.getElementById('nome').value,
                    ano: document.getElementById('ano').value,
                    categoria: document.getElementById('categoria').value,
                    editora: document.getElementById('editora').value,
                    isbn: document.getElementById('isbn').value,
                    autor: document.getElementById('autor').value
        
                }
                const index = document.getElementById('nome').dataset.index
                if (index == 'new') {
                    createLivro(livro)
                    updateTable()
                    closeModal()
                } else {
                    updateLivro(index, livro)
                    updateTable()
                    closeModal()
                }
            }
        }
        
        //Tabela de Apresentação
        const createRow = (livro, index) => {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
                <td>${livro.codigo}</td>
                <td>${livro.nome}</td>
                <td>${livro.categoria}</td>
                <td>${livro.editora}</td>
                <td>${livro.autor}</td>
              
                <td>
                    <button type="button" class="button green" id="edit-${index}">Editar</button>
                    <button type="button" class="button red" id="delete-${index}" >Excluir</button>
                </td>
            `
            document.querySelector('#tableLivro>tbody').appendChild(newRow)
        }
        
        const clearTable = () => {
            const rows = document.querySelectorAll('#tableLivro>tbody tr')
            rows.forEach(row => row.parentNode.removeChild(row))
        }
        
        const updateTable = () => {
            const dbLivro = readLivro()
            clearTable()
            dbLivro.forEach(createRow)
        }
        
        //Apresentação tabela modal
        const fillFields = (livro) => {
            document.getElementById('codigo').value = livro.codigo
            document.getElementById('nome').value = livro.nome
            document.getElementById('ano').value = livro.ano
            document.getElementById('categoria').value = livro.categoria
            document.getElementById('editora').value = livro.editora 
            document.getElementById('isbn').value = livro.isbn 
            document.getElementById('autor').value = livro.autor 
            document.getElementById('nome').dataset.index = livro.index
        }
        
        const editLivro = (index) => {
            const livro = readLivro()[index]
            livro.index = index
            fillFields(livro)
            openModal()
        }
        
        const editDelete = (event) => {
            if (event.target.type == 'button') {
        
                const [action, index] = event.target.id.split('-')
        
                if (action == 'edit') {
                    editLivro(index)
                } else {
                    const livro = readLivro()[index]
                    let avisoDelete = document.querySelector('#avisoDelete')
        
                    avisoDelete.textContent = `Deseja realmente excluir o livro ${livro.nome}`
                    openModal2()
        
                // APAGAR O REGISTRO
                    document.getElementById('apagar').addEventListener('click', () => {
                        deleteLivro(index)
                        updateTable()
                        closeModal2()
                    })
                }
            }
        }
        
        updateTable()
        
        // Eventos
        document.getElementById('cadastrarLivro')
            .addEventListener('click', openModal)
        
        document.getElementById('modalClose')
            .addEventListener('click', closeModal)
        
        // modal apagar
        document.getElementById('modalClose2')
            .addEventListener('click', closeModal2)
        
        document.getElementById('salvar')
            .addEventListener('click', saveLivro)
        
        document.querySelector('#tableLivro>tbody')
            .addEventListener('click', editDelete)
        
        document.getElementById('cancelar')
            .addEventListener('click', closeModal)
        
        // modal apagar
        document.getElementById('cancelar2')
            .addEventListener('click', closeModal2)

            'use strict'

            const openModal = () => document.getElementById('modal').classList.add('active')
            const openModal2 = () => document.getElementById('modal2').classList.add('active')
            
            const closeModal2 = () => {
                document.getElementById('modal2').classList.remove('active')
            }
            
            const closeModal = () => {
                clearFields()
                document.getElementById('modal').classList.remove('active')
            }
            
            const getLocalStorage = () => JSON.parse(localStorage.getItem('db_emprestimo')) ?? []
            const setLocalStorage = (dbEmprestimo) => localStorage.setItem("db_emprestimo", JSON.stringify(dbEmprestimo))
            
            // CRUD - create read update delete
            const deleteEmprestimo = (index) => {
                const dbEmprestimo = readEmprestimo()
                dbEmprestimo.splice(index, 1)
                setLocalStorage(dbEmprestimo)
            }
            
            const updateEmprestimo = (index, emprestimo) => {
                const dbEmprestimo = readEmprestimo()
                dbEmprestimo[index] = emprestimo
                setLocalStorage(dbEmprestimo)
            }
            
            const readEmprestimo = () => getLocalStorage()
            
            const createEmprestimo = (emprestimo) => {
                const dbEmprestimo = getLocalStorage()
                dbEmprestimo.push (emprestimo)
                setLocalStorage(dbEmprestimo)
            }
            
            const isValidFields = () => {
                return document.getElementById('form').reportValidity()
            }
            
            //Interação com o layout
            const clearFields = () => {
                const fields = document.querySelectorAll('.modal-field')
                fields.forEach(field => field.value = "")
                document.getElementById('nome').dataset.index = 'new'
            }
            
            //Campos para serem salvos
            const saveEmprestimo = () => {
                debugger
                if (isValidFields()) {
                    const emprestimo = {
                        codigo: document.getElementById('codigo').value,
                        tipo: document.getElementById('tipo').value,
                        nome: document.getElementById('nome').value,
                        livro: document.getElementById('livro').value,
                        dtemprestimo: document.getElementById('dtemprestimo').value,
                        dtdevolucao: document.getElementById('dtdevolucao').value
                       
                    }
                    const index = document.getElementById('nome').dataset.index
                    if (index == 'new') {
                        createEmprestimo(emprestimo)
                        updateTable()
                        closeModal()
                    } else {
                        updateEmprestimo(index, emprestimo)
                        updateTable()
                        closeModal()
                    }
                }
            }
            
            //Tabela de Apresentação
            const createRow = (emprestimo, index) => {
                const newRow = document.createElement('tr')
                newRow.innerHTML = `
                    <td>${emprestimo.codigo}</td>
                    <td>${emprestimo.nome}</td>
                    <td>${emprestimo.livro}</td>
                    <td>${emprestimo.dtemprestimo}</td>
                    <td>${emprestimo.dtdevolucao}</td>
                  
                    <td>
                        <button type="button" class="button green" id="edit-${index}">Editar</button>
                        <button type="button" class="button red" id="delete-${index}" >Excluir</button>
                    </td>
                `
                document.querySelector('#tableEmprestimo>tbody').appendChild(newRow)
            }
            
            const clearTable = () => {
                const rows = document.querySelectorAll('#tableEmprestimo>tbody tr')
                rows.forEach(row => row.parentNode.removeChild(row))
            }
            
            const updateTable = () => {
                const dbEmprestimo = readEmprestimo()
                clearTable()
                dbEmprestimo.forEach(createRow)
            }
            
            //Apresentação tabela modal
            const fillFields = (emprestimo) => {
                document.getElementById('codigo').value = emprestimo.codigo
                document.getElementById('tipo').value = emprestimo.tipo
                document.getElementById('nome').value = emprestimo.nome
                document.getElementById('livro').value = emprestimo.livro
                document.getElementById('dtemprestimo').value = emprestimo.editora 
                document.getElementById('dtdevolucao').value = emprestimo.isbn 
            }
            
            const editEmprestimo = (index) => {
                const emprestimo = readEmprestimo()[index]
                emprestimo.index = index
                fillFields(emprestimo)
                openModal()
            }
            
            const editDelete = (event) => {
                if (event.target.type == 'button') {
            
                    const [action, index] = event.target.id.split('-')
            
                    if (action == 'edit') {
                        editEmprestimo(index)
                    } else {
                        const emprestimo = readEmprestimo()[index]
                        let avisoDelete = document.querySelector('#avisoDelete')
            
                        avisoDelete.textContent = `Deseja realmente excluir o emprestimo ${emprestimo.nome}`
                        openModal2()
            
                    // APAGAR O REGISTRO
                        document.getElementById('apagar').addEventListener('click', () => {
                            deleteEmprestimo(index)
                            updateTable()
                            closeModal2()
                        })
                    }
                }
            }
            
            updateTable()
            
            // Eventos
            document.getElementById('cadastrarEmprestimo')
                .addEventListener('click', openModal)
            
            document.getElementById('modalClose')
                .addEventListener('click', closeModal)
            
            // modal apagar
            document.getElementById('modalClose2')
                .addEventListener('click', closeModal2)
            
            document.getElementById('salvar')
                .addEventListener('click', saveEmprestimo)
            
            document.querySelector('#tableEmprestimo>tbody')
                .addEventListener('click', editDelete)
            
            document.getElementById('cancelar')
                .addEventListener('click', closeModal)
            
            // modal apagar
            document.getElementById('cancelar2')
                .addEventListener('click', closeModal2)

                const body = document.querySelector("body"),
                modeToggle = body.querySelector(".mode-toggle");
                sidebar = body.querySelector("nav");
                sidebarToggle = body.querySelector(".sidebar-toggle");
                sidebarToggle2 = body.querySelector(".sidebar-toggle2");
          
          let getStatus = localStorage.getItem("status");
          if(getStatus && getStatus ==="close"){
              sidebar.classList.toggle("close");
          }
          
          sidebarToggle.addEventListener("click", () => {
              sidebar.classList.toggle("close");
              if(sidebar.classList.contains("close")){
                  localStorage.setItem("status", "close");
              }else{
                  localStorage.setItem("status", "open");
              }
          });
          
          sidebarToggle2.addEventListener("click", () => {
              sidebar.classList.toggle("close");
              if(sidebar.classList.contains("close")){
                  localStorage.setItem("status", "close");
              }else{
                  localStorage.setItem("status", "open");
              }
          });
          
          
          // Modal perfil
          
          function menuToggle(){
              const toggleMenu = document.querySelector('.menu');
              toggleMenu.classList.toggle('active');
          }
          
          const divUserButtonAndDropdown = document.querySelector('.actionimg');
          const dropdown = document.querySelector('.menu');
          
          document.addEventListener('click', function (event) {
              if (!divUserButtonAndDropdown.contains(event.target)) {
                  dropdown.classList.remove('active');
              }
          })

          