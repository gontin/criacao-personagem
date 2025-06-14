# Criador de Personagens

Este projeto é uma aplicação fullstack para criação e personalização de personagens, com autenticação de usuários. Feito com **React**, **Node.js**, **Express**, **Prisma** e **MySQL**.

---

## 🌟 Objetivo

Permitir que usuários criem contas, façam login e personalizem seus personagens com atributos como força, inteligência, cor de pele, cabelo, etc.

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/gontin/criacao-personagem.git
```

### 2. Configure o banco de dados

* Use MySQL.
* Crie um banco de dados.
* O `.env` do backend utiliza-se:

```
DATABASE_URL="mysql://root:SENHA@localhost:3306/nome_do_banco"
```

---

### 3. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npx prisma studio # (opcional: abre visualizador dos dados)
npm run dev
```

---

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 5. Cloudinary (Upload de imagens)

Este projeto usa **Cloudinary** para hospedar imagens.

---

## 📦 Tecnologias utilizadas

* React
* Node.js
* Express
* Prisma ORM
* MySQL
* Cloudinary
* CSS Grid/Flexbox

---

## ✅ Funcionalidades

* Registro e login de usuários com senha criptografada
* Criação, edição e exclusão de personagens
* Upload de imagem do personagem via Cloudinary
* Interface visual e responsiva com cards
* Detalhes dos personagens ao passar o mouse

---

## 📝 Observações

* As informações de personalização ficam associadas ao usuário.
* Os atributos seguem escala fixa.
* Interface adaptada com modais e animações suaves.

---

Feito com 💻 e ☕ por \gontin
