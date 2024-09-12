# Spotify Explorer

Este projeto é uma aplicação web que utiliza a API do Spotify para consultar informações sobre artistas, como seus álbuns, músicas populares e artistas relacionados. Ele foi desenvolvido como requisito final da disciplina **Programação para Internet II**.

## Funcionalidades

- **Buscar artistas:** Permite ao usuário procurar por um artista específico.
- **Listar álbuns:** Exibe todos os álbuns do artista selecionado.
- **Músicas populares:** Mostra as músicas mais populares do artista.
- **Artistas relacionados:** Lista outros artistas similares ao pesquisado.

## Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces.
- **Vite:** Ferramenta para desenvolvimento rápido de aplicações.
- **Tailwind CSS:** Framework de CSS utilitário para estilização.
- **Express:** Framework para construção da API backend.
- **Anime.js:** Biblioteca para animações.
- **React Router Dom:** Navegação entre as páginas da aplicação.
- **Spotify Web API:** API do Spotify usada para consultas de dados.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/react-spotfy-api.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd react-spotfy-api
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API do Spotify:

   ```env
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Acesse a aplicação no navegador em `http://localhost:3000`.

## Scripts

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Compila o projeto para produção.
- **`npm run lint`**: Executa o linter do código.
- **`npm run preview`**: Pré-visualiza o projeto em produção.

## Licença

Este projeto está licenciado sob a licença **ISC**.
