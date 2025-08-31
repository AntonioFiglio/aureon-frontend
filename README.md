# 🌐 Aureon Frontend

Frontend do projeto **Aureon**, desenvolvido em **React + Vite + TailwindCSS** e integrado em tempo real com o backend
via **WebSocket**.

## 📖 Descrição

Este projeto tem como objetivo fornecer uma interface moderna, responsiva e performática, garantindo **experiência em
tempo real** para os usuários.
A arquitetura foi pensada para rodar de forma **eficiente em Edge Devices** (Qualcomm Snapdragon X, Elite, etc.),
priorizando baixa latência e alta compatibilidade técnica.

💡 Nota Importante: Este projeto foi uma das iniciativas em que identificamos limitações de arquitetura ao tentar rodar Machine Learning e modelos como LLaMA diretamente em dispositivos de borda (Edge).
O Nick se juntou ao time neste momento para investigar a fundo e confirmar que, de fato, havia um problema de compatibilidade arquitetural para esse tipo de workload em Edge.
Isso acabou limitando o projeto, já que não foi possível integrar o nosso machine learning com o frontend, uma vez que a API não conseguia fornecer a resposta esperada de forma consistente.
---

## 👥 Membros

* [Antonio Filho](https://www.linkedin.com/in/antoniofiglio/) — Developer
* [Isabelle Lopes](https://www.linkedin.com/in/isabelle-da-costa-lopes-198978305/) — UI/UX
* [Rebeca Boa Sorte](https://www.linkedin.com/in/rebecaboasorte/) — Product
* [Hugo Rzepian Teixeira](https://www.linkedin.com/in/hugo-rzepian-teixeira-56b963a4/) — IA Developer
* [Rafael Ferres](https://www.linkedin.com/in/rafael-ferres/) — IA Developer

---

## 🚀 Tecnologias Utilizadas

* ⚛️ [React](https://react.dev/)
* ⚡ [Vite](https://vitejs.dev/)
* 🎨 [Tailwind CSS](https://tailwindcss.com/)
* 🔌 WebSocket para comunicação em tempo real

---

## 📦 Instalação e Uso

### Pré-requisitos

* [Node.js](https://nodejs.org/) v18 ou superior
* [npm](https://www.npmjs.com/)

### Clonar o repositório

```bash
git clone https://github.com/AntonioFiglio/aureon-frontend.git
cd aureon-frontend
```

### Instalar Dependências

```bash
npm install
```

### Rodar em ambiente de desenvolvimento

```bash
npm run dev
```

---

## 📑 Boas Práticas de Commits

Este projeto segue o padrão de **Conventional Commits** para manter um histórico organizado e fácil de entender.
Alguns exemplos de tipos de commit aceitos:

* `feat:` ➝ nova funcionalidade (ex: `feat: adicionar componente de login`)
* `fix:` ➝ correção de bug (ex: `fix: corrigir erro de autenticação`)
* `docs:` ➝ mudanças na documentação (ex: `docs: atualizar README com instruções de instalação`)
* `style:` ➝ alterações que não afetam a lógica (espaços, formatação, etc.)
* `refactor:` ➝ mudanças de código que não alteram comportamento (ex: refatorar componente para melhor legibilidade)
* `test:` ➝ adição ou correção de testes
* `chore:` ➝ alterações em tarefas de build, dependências ou configs

💡 Sempre escreva commits curtos, claros e em português/inglês consistente, descrevendo o que foi alterado e o porquê.

---

📄 **Licença**
Este projeto está licenciado sob a licença **MIT**.

---

Quer que eu adicione também **um exemplo de fluxo de branches** (ex: `main`, `develop`, `feature/*`, `fix/*`) para
complementar as boas práticas de commits? Isso pode dar um nível a mais de profissionalismo no README.
