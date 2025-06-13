PROJETO FULLSTACK - CRIAÇÃO DE PERSONAGENS

Este projeto foi desenvolvido com:
- React no frontend
- Node.js com Express no backend
- Prisma como ORM
- MySQL como banco de dados
- Cloudinary para hospedagem de imagens

------------------------------------------------
PASSO A PASSO PARA RODAR O PROJETO LOCALMENTE:
------------------------------------------------

1. Instale as dependências

   > node.js 18.18 ou superior necessario por conta do prisma

   No terminal, vá até a pasta do backend:
   > cd backend
   > npm install

   Em outro terminal, vá até a pasta do frontend:
   > cd frontend
   > npm install

2. Configure o banco de dados

   Configure o arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo do mysql:

   DATABASE_URL="mysql://usuario:senha@localhost:3306/nomedobanco"
   coloque os dados do seu bd lá

   Obs: As chaves da Cloudinary estão incluídas no repositório apenas por fins de correção.

3. Rode as migrações do Prisma no backend:

   > npx prisma migrate dev

   Para visualizar os dados do banco em uma interface visual, use:
   > npx prisma studio

4. Inicie o backend

   > npm start

5. Inicie o frontend (em outro terminal)

   > npm start

6. Acesse no navegador:
   > http://localhost:3000

   O backend estará ouvindo em:
   > http://localhost:3000

------------------------------------------------
FUNCIONALIDADES:
------------------------------------------------

- Cadastro e login de usuários
- Criação, edição e exclusão de personagens
- Upload de imagem para Cloudinary
- Interface responsiva com hover, modais, animações e radar chart

------------------------------------------------
OBSERVAÇÕES FINAIS:
------------------------------------------------

- O projeto foi feito usando CSS puro com Flexbox e Grid.
- É necessário rodar frontend e backend simultaneamente.
- Se quiser testar visualmente o banco de dados, use o Prisma Studio.
 > npx prisma studio
- A conexão com o banco precisa ser ajustada no arquivo `.env`.

Feito com React, Node, Express, Prisma, MySQL, Cloudinary, café e carinho :)

Autor: https://github.com/gontin
*nao coloquei o projeto em um repositorio do github ainda (ou talvez tenha caso demore a correção)
