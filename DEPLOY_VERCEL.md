## Deploy do front-end `artifacts/sst-consultoria` na Vercel (passo a passo)

### Resumo em 2 minutos
1) No dashboard da Vercel, clique **Add New → Project** e escolha “Import Git Repository”.  
2) Selecione `tassiadossantos/escudo-consultoria-v1`.  
3) Deixe o **Framework** como **Vite**.  
4) Build command: `pnpm -C artifacts/sst-consultoria run build`  
5) Output dir: `artifacts/sst-consultoria/dist/public`  
6) Clique **Deploy**. Cada push/PR gera um preview automático.

> O `vercel.json` na raiz já cobre build/output; mesmo se deixar os campos em branco, a Vercel lerá esse arquivo e usará as opções corretas.

---

### Detalhado, passo a passo

1. **Preparar o repositório (já pronto)**  
   - O projeto está na branch `main` e inclui `vercel.json` com:  
     - `installCommand`: `pnpm install`  
     - `buildCommand`: `pnpm -C artifacts/sst-consultoria run build`  
     - `outputDirectory`: `artifacts/sst-consultoria/dist/public`  
     - `rewrites`: SPA `/(.*) → /index.html`

2. **Conectar o GitHub**  
   - Acesse https://vercel.com → **Add New** → **Project** → **Import Git Repository**.  
   - Autorize acesso ao repositório `tassiadossantos/escudo-consultoria-v1` (se ainda não estiver autorizado).

3. **Configurar o projeto**  
   - Framework: selecione **Vite** (auto-detectado).  
   - Build Command: `pnpm -C artifacts/sst-consultoria run build`  
   - Output Directory: `artifacts/sst-consultoria/dist/public`  
   - Root Directory: deixe a raiz (o `vercel.json` está na raiz e aponta para a app).  
   - Variáveis de ambiente: se necessário, adicione aqui (veja a seção “Variáveis de ambiente” abaixo).

4. **Deploy**  
   - Clique **Deploy**. A Vercel irá:  
     - Rodar `pnpm install` (usa cache automática).  
     - Executar o build do front-end conforme `vercel.json`.  
     - Publicar o conteúdo de `dist/public`.  
   - Ao finalizar, você recebe uma URL de produção e uma URL de preview para cada PR/push.

5. **Previews automáticos**  
   - Cada push ou Pull Request gera um deployment preview com URL única.  
   - Comentários no GitHub (Vercel bot) mostram status e link de preview.

6. **Produção**  
   - Por padrão, merges na branch `main` publicam em produção.  
   - Pode apontar outro branch para produção em **Settings → Git → Production Branch**.

7. **Rollback rápido**  
   - Em **Deployments**, escolha um deploy anterior e clique **Promote to Production** para revertê-lo instantaneamente.

8. **Variáveis de ambiente (se precisar)**  
   - Em **Settings → Environment Variables**, crie as chaves necessárias.  
   - Para copiar do local: `vercel env add` ou `vercel env pull .env.vercel.local`.  
   - Lembre de marcar os ambientes `Production`, `Preview` e `Development` conforme o caso.

9. **Teste local do build**  
   - `pnpm -C artifacts/sst-consultoria install`  
   - `pnpm -C artifacts/sst-consultoria run build`  
   - `pnpm -C artifacts/sst-consultoria run preview` (abre um servidor local com o artefato do build).

10. **Logs e observabilidade**  
    - Em cada deploy, a aba **Logs** mostra `install`, `build` e `output`.  
    - Use **Analytics** da Vercel se quiser métricas de performance (necessita habilitar no dashboard).

11. **Boas práticas para este projeto**  
    - Use PNPM (já definido).  
    - Evite dependências globais; a Vercel instala conforme `package.json`.  
    - Se adicionar rotas que não são SPA, ajuste `rewrites`/`redirects` em `vercel.json`.  
    - Para back-end/API, crie um projeto separado ou use serverless functions numa pasta `api/` (não existe hoje neste front).

---

### Checklist rápido antes de cada deploy
- [ ] `pnpm -C artifacts/sst-consultoria run typecheck` (já passa).  
- [ ] `pnpm -C artifacts/sst-consultoria run build` local (opcional, mas recomendado).  
- [ ] Commits na branch correta (`main` é produção por padrão).  
- [ ] Variáveis de ambiente atualizadas na Vercel (se aplicável).

---

### Referências úteis
- Vercel docs (Vite): https://vercel.com/guides/deploying-vite-with-vercel  
- Config `vercel.json`: https://vercel.com/docs/projects/project-configuration  
- SPA rewrites: https://vercel.com/docs/edge-network/rewrites
