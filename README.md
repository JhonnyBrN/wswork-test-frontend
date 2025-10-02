
# 🖥️ WS Work Frontend – Teste Técnico

![Status](https://img.shields.io/badge/status-concluído-green)
![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=black)

Aplicação **Frontend** desenvolvida como parte do processo seletivo da **WS Work**, responsável por consumir os dados de veículos da API (nesse caso JSONs locais) e exibir de forma organizada, reativa e estilizada.


Hospedado utilizando **AWS** S3 + **CloudFront**


---

## 🌐 Demonstração ao Vivo


**[Acessar a Aplicação](https://d1q06w9sqx7kyr.cloudfront.net)**

---

## ✨ Funcionalidades

- 📋 Listagem de veículos com dados de Marca, Modelo, Ano, Combustível, Cor e Valor FIPE.
- 🔎 Filtro de veículos por Marca.
- 🎨 Interface reativa e responsiva utilizando **Tailwind CSS**.
- ⚡ Build otimizado com **Vite**.

---

## 🛠️ Tecnologias Utilizadas

| Frontend (UI) |
| :--- |
| React 18 |
| Vite 5 |
| Tailwind CSS |
| JavaScript (ES6+) |
| PostCSS |
| ESLint |

---

## 📁 Estrutura do Projeto

```

wswork-test-frontend/
├── public/               # Arquivos estáticos
├── src/
│   ├── assets/           # Imagens e ícones
│   ├── components/       # Componentes reutilizáveis
│   ├── data/             # Arquivos JSON simulando API
│   ├── pages/            # Páginas principais
│   ├── App.jsx           # Componente raiz
│   └── main.jsx          # Ponto de entrada
├── index.html
├── package.json
├── tailwind.config.cjs
├── vite.config.js
└── README.md

````

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18 ou superior
- NPM (vem junto com o Node.js)

### Passos

```bash
# Clone o repositório
git clone https://github.com/JhonnyBrN/wswork-test-frontend.git
cd wswork-test-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
````

A aplicação estará disponível em:
👉 `http://localhost:5173`

---

## 📦 Deploy

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos otimizados ficarão na pasta `dist/`, prontos para deploy em serviços como:

* AWS S3
* Vercel
* Netlify
* GitHub Pages

---

## 📌 Observações

* A interface foi construída com foco em clareza e usabilidade.
* O projeto utiliza um **mock de dados (JSON local)** para fallback, caso a API (nesse caso, os json's do /data) não esteja disponível.
* Layout responsivo, adaptado para desktop e mobile.

---

## 👨‍💻 Autor

Desenvolvido por **João Felipe**
Como parte do processo seletivo da **WS Work**.
