# 📇 Meus Cards - rogerio.bueno

> Meus cards de estudo sempre na palma da minha mão.

---

## 💡 Origem do projeto

Durante meus estudos, eu tinha o hábito de escrever perguntas e respostas em pedaços de papel, dobrar e guardar no bolso para revisar ao longo do dia. Funcionava, mas era trabalhoso, fácil de perder e difícil de organizar.

Aí veio a ideia: **por que não ter isso no celular, sempre comigo, sem papel nenhum?**

Foi assim que nasceu o **Meus Cards** — um site simples, responsivo e direto ao ponto, que replica a dinâmica dos cards físicos mas roda no navegador. Desenvolvido por mim, para o meu próprio estudo, com o objetivo de ter minhas revisões na palma da mão a qualquer hora.

---

## ✨ Funcionalidades

- 🃏 Cartas com animação de flip 3D
- ✅ Avalie cada carta como **Acertei** ou **Errei**
- 📊 Placar em tempo real (acertos, erros, vistos)
- 🔍 Filtro por categoria
- 🔀 Embaralhar as cartas
- 📱 100% responsivo — celular e desktop
- ⌨️ Atalhos de teclado (desktop)

---

## 🚀 Como rodar

1. Clone ou baixe o repositório
2. Abra a pasta no VS Code
3. Inicie com o **Live Server** (extensão do VS Code) no arquivo `index.html`
4. Ou simplesmente abra o `index.html` direto no navegador

> ⚠️ O arquivo `perguntas.json` é carregado via `fetch`, então é necessário um servidor local (Live Server) para evitar erro de CORS.

---

## 📁 Estrutura de pastas

```
meuscards
├── assets/
│   ├── css/
│   │   └── styles.css          ← Todos os estilos e responsividade
│   ├── data/
│   │   └── perguntas.json      ← Perguntas e respostas (edite aqui!)
│   └── js/
│       └── script.js           ← Toda a lógica da aplicação
├── index.html                  ← Página principal
└── README.md
```

---

## ✏️ Editando as perguntas

Abra `assets/data/perguntas.json` e adicione seus cards seguindo o padrão:

```json
[
  {
    "id": 1,
    "categoria": "Minha Matéria",
    "pergunta": "Qual é a pergunta?",
    "resposta": "Esta é a resposta completa."
  },
  {
    "id": 2,
    "categoria": "Outra Matéria",
    "pergunta": "Segunda pergunta?",
    "resposta": "Segunda resposta."
  }
]
```

- **`id`** — número único de cada card (não repita)
- **`categoria`** — vira um botão de filtro automaticamente
- **`pergunta`** — texto exibido na frente da carta
- **`resposta`** — texto revelado ao virar

---

## ⌨️ Atalhos de teclado

| Tecla         | Ação               |
|---------------|--------------------|
| `Espaço`      | Virar carta        |
| `← →`         | Navegar            |
| `↑`           | Marcar como acerto |
| `↓`           | Marcar como erro   |

---

## 🔧 Personalizando com seu nome (Fork)

Este projeto é **livre para uso e replicação**. Basta fazer um fork ou download e adaptá-lo para o seu estudo.

### Passo a passo para deixar com a sua cara:

**1. Fork ou download**
- No GitHub, clique em **Fork** para criar uma cópia no seu perfil
- Ou clique em **Code → Download ZIP** para baixar direto

**2. Renomeie o repositório**
- Acesse **Settings** (⚙️) do seu repositório forkado
- No campo **Repository name**, troque `meuscards` pelo nome que quiser
- Clique em **Rename**

**3. Atualize o título do site**

Abra `index.html` e localize as linhas:

```html
<title>Meus Cards - rogerio.bueno</title>

<h1><span class="h1-accent">Meus Cards</span><span class="h1-pos"> - rogerio.bueno</span></h1>
```

Troque o texto dentro das tags pelo nome que desejar.

> 💡 O `.h1-accent` é a parte colorida (roxa). O `.h1-pos` fica oculto no mobile e aparece apenas no desktop — você pode ajustar essa lógica em `assets/css/styles.css`, na regra `.h1-pos`.

**4. Substitua as perguntas**

Edite `assets/data/perguntas.json` com os seus próprios cards de estudo (veja o formato acima).

**5. Opcional — Ajuste as cores**

As cores ficam nas variáveis no topo de `assets/css/styles.css`:

```css
:root {
  --accent:  #7c6af7;   /* cor principal (roxo) */
  --accent2: #f76a8a;   /* cor secundária (rosa) */
  --bg:      #0f0f13;   /* fundo da página */
  --surface: #1a1a24;   /* fundo dos cards */
}
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura da página |
| CSS3 | Estilos, animações, responsividade |
| JavaScript (ES6+) | Lógica dos flashcards |
| Bootstrap 5.3 | Grid e utilitários de layout |
| Google Fonts | Tipografia (Syne + DM Sans) |

---

## 📄 Licença

Projeto de uso livre. Faça o fork, adapte e use à vontade. Nenhuma atribuição é obrigatória — mas se quiser dar os créditos, será sempre bem-vindo. 🤝
