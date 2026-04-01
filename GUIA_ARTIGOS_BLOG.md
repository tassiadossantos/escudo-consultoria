# Guia para Criar Novos Artigos do Blog

Este documento explica como criar novos artigos para o blog da SST Consultoria, de forma padronizada, consistente e fácil de manter.

## 1. Onde os artigos ficam

Os artigos do blog estão em:

`artifacts/sst-consultoria/src/blog-posts`

Cada artigo é um arquivo `.md` com:

- frontmatter no topo
- conteúdo em Markdown abaixo
- metadados que alimentam a lista do blog e a página do artigo

## 2. Como começar um novo artigo

O jeito mais seguro é copiar um artigo já existente e adaptar.

Passo a passo:

1. Escolha um artigo parecido com o tema novo.
2. Copie o arquivo para um novo nome.
3. Troque o conteúdo e os metadados.
4. Ajuste título, slug, imagem, categoria e data.
5. Revise o texto final.
6. Teste no blog e rode o build.

## 3. Estrutura obrigatória do arquivo

Todo artigo precisa seguir esta estrutura:

```md
---
title: "Título do artigo"
slug: "slug-unico-do-artigo"
excerpt: "Resumo curto e objetivo do artigo."
coverImage: "/images/blog/minha-imagem.jpg"
author: "Nome do autor"
publishedAt: "2026-04-01"
category: "Categoria"
readingTime: 8
metaTitle: "Título SEO"
metaDescription: "Descrição SEO curta e clara."
---

# Título do artigo

Texto do artigo...
```

## 4. O que cada campo significa

### title
É o título principal do artigo.

### slug
É a parte da URL do artigo.
Exemplo:
- `fiscalizacao-mte-checklist-completo`
- `nr1-riscos-psicossociais-burnout`

Regras:
- sem espaço
- sem acento
- sem caracteres especiais
- único
- curto e claro

### excerpt
É o resumo que aparece no card do blog.
Deve responder rapidamente:
- sobre o que é o artigo
- para quem ele é
- por que importa

### coverImage
É o caminho da imagem de capa.
Precisa apontar para uma imagem existente no projeto.

### author
É o nome de quem escreveu o artigo.

### publishedAt
É a data de publicação.
Formato recomendado:
- `YYYY-MM-DD`

### category
É a categoria editorial do artigo.
Exemplos:
- Fiscalização
- Legislação
- EPI
- Ergonomia
- Cultura
- Comunicação
- Gestão de Riscos
- Treinamentos e NRs

### readingTime
Tempo estimado de leitura, em minutos.

### metaTitle
Título para SEO e buscadores.

### metaDescription
Descrição para SEO e buscadores.

## 5. Quando você for a autora

Se o artigo for seu:

- preencha `author: "Tassia dos Santos"`
- não precisa escrever a assinatura completa no corpo do artigo
- o componente da página já mostra a autoria de forma automática

Exemplo:

```md
---
author: "Tassia dos Santos"
---
```

## 6. Quando o artigo não for seu

Se o artigo for de outra pessoa:

- use o nome correto no campo `author`
- mantenha a autoria fiel ao conteúdo
- não use a assinatura de Tassia dos Santos se não for o caso

Exemplo:

```md
---
author: "Nome da Pessoa"
---
```

## 7. Como escrever o corpo do artigo

O corpo do artigo deve ser escrito em Markdown.

Você pode usar:

- `#` para título principal
- `##` para subtítulos
- listas com `-`
- citações com `>`
- parágrafos curtos
- negrito e itálico

### Estrutura recomendada

1. Abertura com problema real ou contexto forte
2. Explicação do tema
3. Parte técnica ou educativa
4. Exemplos práticos
5. Consequências ou riscos
6. Passo a passo ou solução
7. Conclusão com reforço da ideia principal
8. Chamada final

## 8. Boas práticas de escrita

- escreva com clareza
- use subtítulos para quebrar o texto
- evite blocos muito grandes
- explique siglas na primeira vez que aparecerem
- pense no leitor leigo primeiro
- mantenha o tom consistente com o restante do blog

## 9. Imagem de capa

A capa precisa existir no projeto.

Boas práticas:
- usar imagem coerente com o tema
- manter boa qualidade visual
- usar caminho correto
- evitar links quebrados

Se a imagem estiver em `/public/images/blog`, o caminho no frontmatter normalmente começa com:

```md
coverImage: "/images/blog/minha-imagem.jpg"
```

## 10. Checklist antes de salvar

Antes de considerar o artigo pronto, confira:

- o slug é único
- o título está claro
- o resumo está curto e útil
- a categoria está correta
- a imagem existe
- a data está certa
- o tempo de leitura faz sentido
- o texto está bem dividido
- não há erro de português
- a autoria está correta
- o arquivo está no local certo

## 11. O que testar depois

Depois de criar o artigo:

1. Abra o blog no navegador.
2. Veja se o card aparece.
3. Clique no artigo.
4. Confirme se a capa carrega.
5. Confirme se o conteúdo renderiza bem.
6. Verifique se a autoria está correta.
7. Rode o build do frontend.

Comandos úteis:

```sh
cd artifacts/sst-consultoria
pnpm dev
```

ou, pela raiz:

```sh
pnpm --filter @workspace/sst-consultoria dev
```

Para build:

```sh
pnpm --filter @workspace/sst-consultoria build
```

## 12. Fluxo ideal resumido

### Se o artigo for seu

1. criar o arquivo `.md`
2. preencher o frontmatter
3. escrever o conteúdo
4. deixar `author` como `Tassia dos Santos`
5. revisar e testar
6. rodar build

### Se o artigo não for seu

1. criar o arquivo `.md`
2. preencher o frontmatter
3. escrever o conteúdo
4. definir o autor correto
5. revisar e testar
6. rodar build

## 13. Regra prática final

Se estiver em dúvida, siga esta regra:

- copiar um artigo semelhante
- adaptar o conteúdo
- revisar metadados
- confirmar imagem
- confirmar autoria
- testar no navegador
- validar com build

---

Este arquivo serve como guia interno para manter o blog organizado, padronizado e fácil de evoluir.
