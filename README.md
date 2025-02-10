# Sessionize Auth

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/seu-usuario/sessionize-auth)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)  
[![npm version](https://img.shields.io/npm/v/sessionize-auth.svg)](https://www.npmjs.com/package/sessionize-auth)

A **Sessionize Auth** é uma biblioteca open source para gerenciamento de sessões em aplicações React. Ela integra o gerenciamento de estado com [Zustand](https://github.com/pmndrs/zustand) e a persistência de dados através de [js-cookie](https://github.com/js-cookie/js-cookie).  
Com ela, você pode armazenar o estado da sessão do usuário em diferentes _storages_ (`localStorage`, `sessionStorage` ou `cookies`) e proteger rotas utilizando um componente Provider que redireciona usuários não autenticados.

---

## Índice

- [Introdução](#introdução)
- [Recursos](#recursos)
- [Instalação](#instalação)
- [Documentação](#documentação)
  - [1. Criando a Session Store](#1-criando-a-session-store)
  - [2. Utilizando o SessionProvider](#2-utilizando-o-sessionprovider)
- [Exemplo de Aplicação Real](#exemplo-de-aplicação-real)
- [Testes](#testes)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Contato](#contato)
- [Agradecimentos](#agradecimentos)

---

## Introdução

A **Sessionize Auth** simplifica o gerenciamento de sessões em aplicações React. Ela combina o poder do gerenciamento de estado reativo do [Zustand](https://github.com/pmndrs/zustand) com a persistência de dados por meio de `localStorage`, `sessionStorage` ou `cookies` (usando [js-cookie](https://github.com/js-cookie/js-cookie)).  
Além disso, o componente `SessionProvider` permite que você defina áreas protegidas na sua aplicação, redirecionando automaticamente os usuários que não estão autenticados para uma rota pré-definida.

---

## Recursos

- **Fácil de usar:** Gerencie sessões com métodos simples e diretos.
- **Multi-storage:** Escolha entre `localStorage`, `sessionStorage` ou `cookies` para persistência.
- **Estado reativo com Zustand:** Atualize e compartilhe o estado da sessão de forma eficiente.
- **Proteção de rotas:** Utilize o `SessionProvider` para redirecionar usuários não autenticados.
- **Customizável e Open Source:** Adapte a biblioteca às necessidades do seu projeto e contribua para o seu aprimoramento.

---

## Instalação

Instale a biblioteca via npm ou yarn:

```bash
# Usando npm
npm install sessionize-auth

# Usando yarn
yarn add sessionize-auth
```

<!--
> **Atenção:** Caso ainda não tenha o Zustand e o js-cookie instalados, adicione-os também:
>
> ```bash
> npm install zustand js-cookie
> # ou
> yarn add zustand js-cookie
> ``` -->

---

## Documentação

### 1. Criando a Session Store

A função `createSessionStore` permite criar uma _store_ que gerencia o estado da sessão do usuário, definindo o tipo de armazenamento que deseja usar.

#### Exemplo de Definição e Criação

```tsx
import { createSessionStore } from "sessionize-auth";

interface Account {
  id: string;
  name: string;
}

const useSessionStore = createSessionStore<Account>({
  storageType: "localStorage", // Outras opções: "sessionStorage" ou "cookies"
});
```

#### Métodos Disponíveis

- **startSession(account: T): void**  
  Inicia a sessão: armazena os dados do usuário no storage escolhido e atualiza o estado da _store_.

- **closeSession(): void**  
  Encerra a sessão: remove os dados do usuário do storage e atualiza o estado da _store_.

#### Como Usar

Você pode acessar os métodos diretamente a partir da _store_. Por exemplo:

```tsx
// Iniciando a sessão
useSessionStore.getState().startSession({ id: "123", name: "João" });

// Encerrando a sessão
useSessionStore.getState().closeSession();
```

> **Dica:** Para acessar o estado reativo em componentes, basta usar o hook `useSessionStore` normalmente.

---

### 2. Utilizando o SessionProvider

O `SessionProvider` é um componente React que envolve áreas da aplicação que necessitam de autenticação. Ele monitora a _store_ de sessão e, caso não encontre um usuário autenticado, redireciona para o caminho especificado.

#### Propriedades do SessionProvider

- **children:**  
  Componentes que serão renderizados quando a sessão estiver ativa.

- **useSessionStore:**  
  A _store_ criada pela função `createSessionStore`.

- **redirectPath:**  
  Caminho para onde o usuário será redirecionado se não houver uma sessão ativa.

#### Exemplo de Uso

```tsx
import React from "react";
import { SessionProvider } from "sessionize-auth";
import { useSessionStore } from "./stores/sessionStore"; // Exemplo de importação da sua store
import AppRoutes from "./routes/AppRoutes"; // Suas rotas ou componentes protegidos

const App = () => {
  return (
    <SessionProvider useSessionStore={useSessionStore} redirectPath="/login">
      <AppRoutes />
    </SessionProvider>
  );
};

export default App;
```

> **Observação:**  
> O `SessionProvider` utiliza o hook `useEffect` para monitorar a sessão. Se o `account` for nulo, o usuário será redirecionado automaticamente para a rota definida em `redirectPath`.

---

## Exemplo de Aplicação Real

Imagine uma aplicação simples onde o usuário precisa estar autenticado para acessar o dashboard. A seguir, um passo a passo:

### Passo 1: Configuração da Store

Crie uma _store_ para gerenciar a sessão do usuário:

```tsx
// src/stores/session.ts

import { createSessionStore } from "sessionize-auth";

interface Account {
  id: string;
  email: string;
}

export const useSessionStore = createSessionStore<Account>({
  storageType: "cookies", // Alternativas: "localStorage" ou "sessionStorage"
});
```

### Passo 2: Configuração do SessionProvider

Envolva as rotas protegidas com o `SessionProvider`:

```tsx
// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "sessionize-auth";
import { useSessionStore } from "./stores/sessionStore";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <SessionProvider useSessionStore={useSessionStore} redirectPath="/login">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
};

export default App;
```

### Passo 3: Gerenciando a Sessão nos Componentes

#### Página de Login

Após a autenticação, inicie a sessão:

```tsx
// src/pages/Login.tsx
import React from "react";
import { useSessionStore } from "../stores/session";

const Login = () => {
  const { startSession } = useSessionStore();

  const handleLogin = () => {
    // Simulação de autenticação bem-sucedida
    const userData = { id: "001", email: "usuario@example.com" };
    startSession(userData);
    window.location.pathname = "/dashboard"; // Redirecionamento após login
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
```

#### Página de Dashboard

Permita que o usuário visualize informações e encerre a sessão:

```tsx
// src/pages/Dashboard.tsx
import React from "react";
import { useSessionStore } from "../stores/sessionStore";

const Dashboard = () => {
  const { account, closeSession } = useSessionStore();

  const handleLogout = () => {
    closeSession();
    window.location.pathname = "/login"; // Redirecionamento após logout
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {account && <p>Bem-vindo, {account.email}</p>}
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Dashboard;
```

---

## Testes

A biblioteca já conta com testes unitários que cobrem:

- A inicialização da sessão a partir de diferentes _storages_ (`localStorage`, `sessionStorage` e `cookies`).
- O funcionamento dos métodos `startSession` e `closeSession`.
- O redirecionamento automático do `SessionProvider` quando não há uma sessão ativa.

### Executando os Testes

Para rodar os testes utilizando o Jest, execute:

```bash
npm run test
# ou
yarn test
```

---

## Contribuições

Contribuições são muito bem-vindas! Siga os passos abaixo para contribuir:

1. **Fork** este repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Realize os commits com suas alterações:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie a branch para o repositório remoto:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request neste repositório.

---

## Licença

Distribuído sob a [Licença MIT](./LICENSE). Veja o arquivo para mais detalhes.

---

## Contato

Caso tenha dúvidas, sugestões ou encontre algum problema, sinta-se à vontade para abrir uma _issue_ ou entrar em contato:

- **Email:** [ja3328173@gmail.com](mailto:ja3328173@gmail.com)
- **GitHub:** [github.com/katumbela](https://github.com/katumbela)

---

## Agradecimentos

- **[Zustand](https://github.com/pmndrs/zustand):** Por fornecer um gerenciamento de estado leve e eficiente.
- **[js-cookie](https://github.com/js-cookie/js-cookie):** Pela facilidade na manipulação de cookies.
- A comunidade open source, que contribui para um ecossistema cada vez melhor!

<div align="center">
  <img src="https://img.shields.io/badge/feito_com_amor-❤️-red" alt="Feito com amor" />
</div>
