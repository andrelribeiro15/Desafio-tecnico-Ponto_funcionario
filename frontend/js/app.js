
const api = axios.create({
    baseURL: 'http://localhost:3001'  
  });
  
  let token = null;
  
  function login() {
    const matricula = document.getElementById('matricula').value.trim();
    const senha = document.getElementById('senha').value.trim();
  
    if (!matricula || !senha) {
      alert('Preencha matrícula e senha');
      return;
    }
  
    api.post('/login', { matricula, senha })
      .then(res => {
        token = res.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('perfil', res.data.perfil);
        mostrarTela(res.data.perfil);
      })
      .catch(() => alert('Login inválido'));
  }
  
  
  function mostrarTela(perfil) {
    document.getElementById('login').classList.add('d-none');
  
    if (perfil === 'admin') {
      document.getElementById('admin').classList.remove('d-none');
      document.getElementById('registro').classList.add('d-none');
    } else {
      document.getElementById('registro').classList.remove('d-none');
      document.getElementById('admin').classList.add('d-none');
    }
  }
  

  function cadastrarFuncionario() {
    const matricula = document.getElementById('newMatricula').value.trim();
    const nome = document.getElementById('newNome').value.trim();
    const senha = document.getElementById('newSenha').value.trim();
  
    if (!matricula || !nome || !senha) {
      alert('Preencha todos os campos');
      return;
    }
  
    api.post('/cadastrar-funcionario', { matricula, nome, senha }, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(() => {
        alert('Funcionário cadastrado com sucesso!');
        document.getElementById('newMatricula').value = '';
        document.getElementById('newNome').value = '';
        document.getElementById('newSenha').value = '';
      })
      .catch(() => alert('Erro ao cadastrar funcionário'));
  }
  
  
  function gerarRelatorio() {
    window.open('http://localhost:3001/relatorio-pdf', '_blank');
  }
  
  
  function registrar(tipo) {
    const hora = new Date().toTimeString().slice(0, 5);
  
    api.post('/registrar-ponto', { tipo, hora }, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(() => alert('Registro feito com sucesso'))
      .catch(e => alert(e.response?.data?.erro || 'Erro ao registrar'));
} 