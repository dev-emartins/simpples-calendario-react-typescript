# Projeto Calendário em React com TypeScript

Este projeto é um exemplo de um componente de calendário, construído utilizando React com TypeScript. Demonstrando assim a criação de um calendário dinâmico com navegação entre meses e exibição de dias. 

## Estrutura do Projeto

A estrutura do projeto segue o modelo padrão de uma aplicação React.

```
/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   └── Calendar.tsx 
│   ├── styles/
│   │   ├── Calendar.css 
│   │   └── index.css          
│   └── index.tsx               
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json              
```

## Instalação

### Pré-requisitos

- Node.js
- npm ou yarn

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/Everaldo-Martins/simpples-calendario-react-typescript.git
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

   ou, se você estiver usando yarn:

   ```bash
   yarn install
   ```

3. Inicie o projeto:

   ```bash
   npm start
   ```

   ou com yarn:

   ```bash
   yarn start
   ```

A aplicação executará no endereço [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

No diretório do projeto, você pode executar:

- **`npm start`**: Inicia a aplicação no modo de desenvolvimento.
- **`npm test`**: Executa os testes configurados.
- **`npm run build`**: Cria a versão de produção da aplicação.

## Componentes

### Calendar.tsx

Este é o componente principal do calendário. Ele exibe os dias do mês atual e permite a navegação entre os meses. O componente utiliza hooks como `useState` e `useEffect` para controlar o estado do mês e ano, bem como para gerar dinamicamente os dias do mês.

### Estilos

- **Calendar.css**: Contém os estilos específicos para o layout e comportamento do calendário.
- **index.css**: Estilos globais para a aplicação.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **CSS**: Para estilização da aplicação.

## Personalização

Você pode modificar o estilo do calendário alterando os arquivos `Calendar.css` e `index.css`. Também é possível adicionar novas funcionalidades ao componente `Calendar.tsx`, como exibição de eventos ou integração com uma API de calendário.

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).