# Projeto: Criador de Personagens

## 🧐 Descrição

Este projeto é uma aplicação fullstack onde usuários podem se registrar, fazer login e criar personagens personalizados com diversos atributos como força, inteligência, cor da pele, cabelo e mais.

Feito com:

* React (Frontend)
* Node.js + Express (Backend)
* Prisma ORM + MySQL (Banco de dados)
* Cloudinary (upload de imagens)

---

## ✨ Como Rodar o Projeto

1. Clone o repositório:

   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

2. Acesse as pastas:

   * Frontend:

     ```
     cd frontend
     npm install
     npm run dev
     ```

   * Backend:

     ```
     cd backend
     npm install
     npx prisma generate
     npx prisma migrate dev
     npm run dev
     ```

3. Rode os dois ao mesmo tempo: **frontend e backend devem estar ativos para o projeto funcionar.**

---

## 💾 Banco de Dados (MySQL)

* Configure a URL do banco no arquivo `.env` na pasta `backend`:

  ```
  DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
  ```

  > Se o MySQL estiver **sem senha**, a URL fica assim:

  ```
  DATABASE_URL="mysql://root@localhost:3306/nome_do_banco"
  ```

* Rode o Prisma Studio para visualizar os dados:

  ```
  npx prisma studio
  ```

---

## ☁️ Cloudinary

Este projeto usa o [Cloudinary](https://cloudinary.com/) para upload de imagens dos personagens.

* As `API Keys` estão incluídas **temporariamente** no backend **apenas para fins de correção**.
* Em um ambiente de produção, essas chaves devem ser protegidas com variáveis de ambiente.

---

## 🔐 Segurança

* As senhas dos usuários são armazenadas com hash usando `bcrypt`.
* Apenas usuários logados podem acessar, criar, editar ou excluir personagens.

---

## ✅ Funcionalidades

* Registro e login de usuário
* Criação e personalização de personagens
* Upload de imagem (via Cloudinary)
* Edição e exclusão de personagens
* Visualização de personagens por usuário
* Interface moderna com efeitos visuais interativos

---

## 📦 Estrutura do Projeto

```
.
├── backend
│   ├── prisma
│   ├── src
│   └── .env
├── frontend
│   ├── src
│   └── public
```

---

## 🛠️ Requisitos para rodar

* Node.js
* MySQL
* NPM
* (Opcional) Workbench para visualizar o banco
* Conta no Cloudinary (opcional, caso deseje mudar as keys)

---

## 💙 Subir no GitHub

1. Crie um repositório no GitHub.
2. No terminal:

```
git init
git add .
git commit -m "Projeto inicial"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin main
```

---

## 📧 Contato

Em caso de dúvidas, sugestões ou bugs, entre em contato comigo!
