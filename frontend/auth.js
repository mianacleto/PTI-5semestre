document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  const tipo = sessionStorage.getItem("tipoUsuario");
  const header = document.querySelector(".cabecalho .loginCadastro");

  function atualizarCabecalho() {
    if (!header) return;

    if (usuario && tipo) {
      header.innerHTML = `
        <a href="${tipo}.html">Olá, ${usuario.nome?.split(" ")[0] || "Usuário"}</a>
        <a href="#" id="logout"><i class="fas fa-sign-out-alt"></i> Sair</a>
      `;
      document.getElementById("logout").addEventListener("click", logout);
    } else {
      header.innerHTML = `
        <a href="login.html" class="loginCadastro login"><i class="fas fa-sign-in-alt"></i> Entrar</a>
        <a href="cadastro.html" class="loginCadastro cadastro"><i class="fas fa-user-plus"></i> Cadastrar</a>
      `;
    }
  }

  function verificarAcesso() {
    const pagina = window.location.pathname;

    if (tipo === "fornecedor" && (pagina.includes("carrinho") || pagina.includes("farmacia"))) {
      alert("Fornecedores não podem acessar esta página.");
      window.location.href = "index.html";
      return;
    }

    if (tipo === "cliente" && pagina.includes("fornecedor")) {
      alert("Clientes não podem acessar esta página.");
      window.location.href = "index.html";
      return;
    }

    if (pagina.includes("checkout") && tipo !== "cliente") {
      window.location.href = "login.html";
      return;
    }

    if (!usuario && (pagina.includes("cliente") || pagina.includes("fornecedor"))) {
      alert("Acesso restrito! Faça login para continuar.");
      window.location.href = "login.html";
    }
  }


  function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
  window.logout = logout;

  atualizarCabecalho();
  verificarAcesso();
});
