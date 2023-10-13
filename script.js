let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

let alunoParaEditar = null;

function renderizarLista() {
    const listaAlunos = document.getElementById('listaAlunos');
    listaAlunos.innerHTML = '';

    alunos.forEach((aluno, index) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = `${aluno.nome}, ${aluno.idade} anos`;

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() {
            excluirAluno(index);
        };


        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() {
            carregarParaEdiçao(index);
        };
        
        itemLista.appendChild(btnExcluir);
        itemLista.appendChild(btnEditar);
        listaAlunos.appendChild(itemLista);
        });
}

function salvarAluno() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;



    // Verifica se está em modo de edição 
    if(alunoParaEditar !== null){
        alunos[alunoParaEditar] = {nome, idade};
        alunoParaEditar = null;
        document.getElementById('btnAtualizar').style.display = 'nome';
    } else {
        alunos.push({nome, idade});
    };
    
    localStorage.setItem('alunos', JSON.stringify(alunos));

    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    renderizarLista();
};

function excluirAluno(index) {
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    renderizarLista();

}

function carregarParaEdiçao(index) {
    alunoParaEditar = index;
    document.getElementById('nome').value = alunos[index].nome;
    document.getElementById('idade').value = alunos[index].idade;


    document.getElementById('btnAtualizar').style.display = 'inline-block';
}

function atualizarAluno() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;

    alunos[alunoParaEditar] = {nome, idade};
    localStorage.setItem('alunos', JSON.stringify(alunos));
    

    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('btnAtualizar').value = 'none';
    

    alunoParaEditar = null;
    renderizarLista();
};


renderizarLista();
     
