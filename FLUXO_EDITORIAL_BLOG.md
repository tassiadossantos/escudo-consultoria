# Fluxo Editorial Ideal para o Blog

Este documento descreve o fluxo editorial recomendado para criar, revisar, publicar e manter artigos do blog da SST Consultoria.

A ideia é simples: transformar a produção de conteúdo em um processo previsível, repetível e escalável, sem depender de memória, improviso ou retrabalho.

---

## 1. Objetivo do fluxo

O objetivo deste fluxo é garantir que cada artigo:

- tenha boa qualidade editorial
- esteja tecnicamente correto
- siga o padrão visual do blog
- esteja otimizado para SEO
- seja fácil de manter no futuro
- não quebre a aplicação no build

Em termos de arquitetura, o blog deixa de ser apenas uma pasta de arquivos e passa a ser um pequeno sistema editorial.

---

## 2. Princípio de funcionamento

O fluxo ideal deve seguir esta lógica:

1. ideia nasce
2. pauta é definida
3. artigo é escrito
4. artigo é revisado
5. artigo é validado tecnicamente e visualmente
6. artigo é publicado
7. artigo é monitorado
8. artigo é atualizado quando necessário

Isso evita que conteúdo ruim ou inconsistente chegue ao ar.

---

## 3. Etapas do fluxo editorial

### Etapa 1: Definição da pauta

Nesta etapa, você decide o tema do artigo.

Perguntas úteis:

- qual dor o artigo resolve?
- qual dúvida ele responde?
- ele atrai lead, educa ou fortalece autoridade?
- ele conversa com qual serviço da empresa?
- ele tem potencial de SEO?

### Saída esperada

- tema definido
- objetivo do artigo definido
- categoria definida
- palavra-chave principal definida

---

### Etapa 2: Briefing

Antes de escrever, o ideal é montar um briefing curto.

Campos recomendados:

- título provisório
- público-alvo
- objetivo do texto
- categoria
- slug sugerido
- referências técnicas
- imagem de capa sugerida
- CTA final desejado
- autor responsável

### Saída esperada

- direção editorial clara
- menos risco de escrever fora do foco

---

### Etapa 3: Rascunho

Aqui o artigo é escrito sem preocupação excessiva com polimento final.

O foco é:

- organização da ideia
- fluxo de leitura
- clareza técnica
- sequência lógica

### Estrutura recomendada do rascunho

1. abertura forte
2. contexto
3. desenvolvimento técnico
4. exemplos ou casos
5. riscos ou erros comuns
6. solução ou passo a passo
7. conclusão
8. chamada final

### Saída esperada

- texto completo em Markdown
- sem dependência de design ou publicação

---

### Etapa 4: Revisão editorial

A revisão editorial verifica se o texto está bom para leitura humana.

Confira:

- ortografia
- fluidez
- repetição de ideias
- clareza dos subtítulos
- tamanho dos parágrafos
- consistência do tom
- força da abertura
- qualidade da conclusão

### Saída esperada

- artigo mais limpo
- leitura mais agradável
- narrativa mais forte

---

### Etapa 5: Revisão técnica

Aqui o foco é a precisão.

Verifique:

- normas citadas corretamente
- siglas explicadas
- datas coerentes
- categorias corretas
- termos técnicos sem erro
- ausência de afirmações duvidosas

Se o artigo for regulatório ou de SST, essa etapa é crítica.

### Saída esperada

- redução de risco de erro técnico
- artigo confiável

---

### Etapa 6: Preparação do arquivo

O artigo precisa ser transformado no formato que o blog entende.

Isso significa:

- criar o arquivo `.md`
- preencher o frontmatter
- definir `title`
- definir `slug`
- definir `excerpt`
- definir `coverImage`
- definir `author`
- definir `publishedAt`
- definir `category`
- definir `readingTime`
- definir `metaTitle`
- definir `metaDescription`

### Saída esperada

- arquivo pronto para entrar no sistema

---

### Etapa 7: Validação visual

Depois de salvar o arquivo, o artigo precisa ser conferido no navegador.

Verifique:

- card aparece na listagem
- capa carrega
- slug abre a página correta
- título aparece corretamente
- autoria está correta
- markdown renderiza bem
- referências não quebram layout

### Saída esperada

- artigo validado visualmente

---

### Etapa 8: Build

Antes de considerar o artigo pronto, rode o build do frontend.

Objetivo:

- garantir que não há erro de sintaxe
- garantir que a leitura do conteúdo funciona
- garantir que a aplicação continua compilando corretamente

### Saída esperada

- build aprovado
- artigo pronto para uso

---

### Etapa 9: Publicação

Depois de validado, o artigo entra oficialmente no blog.

### O que deve estar certo antes da publicação

- slug único
- imagem existente
- metadados completos
- autor correto
- texto revisado
- build aprovado

---

### Etapa 10: Monitoramento pós-publicação

Depois que o artigo entra no ar, observe:

- desempenho no blog
- cliques no artigo
- tempo de leitura
- posicionamento no SEO
- eventuais ajustes de texto
- eventuais links quebrados

O conteúdo não termina quando publica. Ele continua vivo.

---

## 4. Fluxo por tipo de autoria

### Quando o artigo é seu

Fluxo recomendado:

1. escrever o artigo
2. preencher `author: "Tassia dos Santos"`
3. deixar o componente do artigo renderizar a assinatura
4. não duplicar a assinatura no corpo do texto

### Quando o artigo não é seu

Fluxo recomendado:

1. escrever ou receber o conteúdo
2. ajustar o `author` para o nome correto
3. revisar se o tom combina com o autor
4. não usar a assinatura de Tassia dos Santos

---

## 5. Fluxo ideal em termos de arquitetura

Se eu desenhasse isso como sistema, o fluxo teria quatro camadas:

### Camada 1: Conteúdo

- ideia
- pauta
- briefing
- rascunho
- revisão

### Camada 2: Estrutura

- Markdown
- frontmatter
- imagem
- categorias
- SEO

### Camada 3: Validação

- revisão editorial
- revisão técnica
- build
- teste no navegador

### Camada 4: Distribuição

- publicação no blog
- monitoramento
- atualização futura

Isso é importante porque separa criação, validação e entrega.

---

## 6. O que escalar no futuro

Se o volume de artigos crescer, o processo pode evoluir para:

- gerador automático de artigo novo
- checklist de revisão automatizado
- validação de slug duplicado
- verificação de imagem inexistente
- preview antes da publicação
- painel editorial simples
- workflow de aprovação

A lógica é sair do manual puro e ir para um fluxo editorial assistido por ferramenta.

---

## 7. Processo mínimo recomendado hoje

Se você quiser uma versão simples e eficiente, siga este ciclo:

1. definir tema
2. escrever rascunho
3. revisar conteúdo
4. preencher frontmatter
5. validar autoria
6. testar no navegador
7. rodar build
8. publicar

Isso já resolve 80% do problema.

---

## 8. Processo ideal para um blog maduro

Para um blog mais maduro, o ideal é que cada artigo passe por:

- pauta
- briefing
- redação
- revisão editorial
- revisão técnica
- validação visual
- build
- publicação
- monitoramento
- atualização

Esse modelo reduz risco e aumenta consistência.

---

## 9. Regras simples que evitam erro

- nunca publicar sem frontmatter completo
- nunca usar slug duplicado
- nunca deixar imagem quebrada
- nunca repetir autoria manualmente se o componente já renderiza isso
- nunca pular build antes de publicar
- nunca confiar só na leitura visual do arquivo

---

## 10. Resumo executivo

O fluxo editorial ideal para o blog é este:

- a ideia nasce
- a pauta é definida
- o artigo é escrito
- o conteúdo é revisado
- os metadados são preenchidos
- o arquivo é salvo no formato correto
- o artigo é testado
- o build é executado
- o conteúdo é publicado
- o artigo é monitorado e atualizado

Em outras palavras: o blog precisa funcionar como um processo, não como improviso.

---

## 11. Regra final

Se o artigo for seu, mantenha `author: "Tassia dos Santos"` e deixe a autoria ser tratada pelo sistema.

Se não for seu, troque o autor e preserve a identidade correta do conteúdo.

Se o build passar e a página abrir corretamente, o artigo está pronto.
