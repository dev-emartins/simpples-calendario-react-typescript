# Projeto Calendário em React com TypeScript

Este projeto é um componente de calendário, construído utilizando Vite, React com TypeScript. Demonstrando assim a criação de um calendário dinâmico com navegação entre meses, exibição de dias e feriados nacionais. 

## Estrutura do Projeto

A estrutura do projeto segue o modelo padrão de uma aplicação React.

```
/
├── public/
│   └── Calendar.gif
├── src/
│   ├── pages/
│   │   └── Calendar.tsx 
│   ├── styles/
│   │   └── main.css
│   ├── App.tsx
│   ├── main.tsx          
│   └── vite-env.d.ts             
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts              
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
   npm run dev
   ```

   ou com yarn:

   ```bash
   yarn run dev
   ```

A aplicação executará no endereço [http://localhost:5173](http://localhost:5173).

## Scripts Disponíveis

No diretório do projeto, você pode executar:

- **`npm run dev`**: Inicia a aplicação no modo de desenvolvimento.
- **`npm run test`**: Executa os testes configurados.
- **`npm run build`**: Cria a versão de produção da aplicação.

## Componentes

### Calendar.tsx

Este é o componente principal do calendário. Ele exibe os dias do mês atual e permite a navegação entre os meses. O componente utiliza hooks como `useState` e `useEffect` para controlar o estado do mês e ano, bem como para gerar dinamicamente os dias do mês.

### Estilo

- **main.css**: Estilos globais para a aplicação, concentrando toda estlização do calendário.

## Tecnologias Utilizadas

- **Vite**: Biblioteca que resolve os problemas comuns enfrentados no desenvolvimento JavaScript e TypeScript.
- **React**: Biblioteca para construção da interface de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **CSS**: Para estilização da aplicação.

## Personalização

Você pode modificar o estilo do calendário alterando os arquivos `main.css`. Também é possível adicionar novas funcionalidades ao componente `Calendar.tsx`, como exibição de eventos ou integração com uma API de calendário.

## Imagem

![Calenário](/public/Calendar.gif)

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).