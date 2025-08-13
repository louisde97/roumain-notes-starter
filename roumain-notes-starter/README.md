# Roumain Notes — Starter (MVP ultra-simple)

Ce projet te permet d'uploader des fichiers **.docx** (Word) et **.pptx** (PowerPoint) contenant tes cours de roumain. 
Il extrait le texte, détecte les **notions** (vocabulaire, conjugaison, prononciation, grammaire, expressions, orthographe, culture), 
marque les **révisions** (si déjà vues), et expose ces données à l'interface web.

## Pile technique
- Frontend : Next.js + Tailwind (déployable sur Vercel — gratuit).
- Backend : FastAPI Python (déployable sur Render — gratuit).
- Base de données : Postgres géré (Render Postgres gratuit) — optionnel: Neon (gratuit).

> Pas d'auth pour l'instant (usage personnel). Tu pourras l'ajouter ensuite.

---

## Déploiement le plus simple (gratuit)
### 1) Crée les comptes
- GitHub (requis pour Vercel/Render)
- Vercel (héberge le frontend)
- Render (héberge le backend + Postgres gratuit)

### 2) Mets ce code sur GitHub
- Sur GitHub → **New repository** → nomme-le `roumain-notes-starter` (public).
- Cliquer **Add file** → **Upload files** → glisse **ce ZIP** décompressé (le dossier entier), puis **Commit**.

### 3) Déploie le **backend** (Render)
- Sur Render → **New** → **Blueprint** → choisis le fichier `render.yaml` de ce repo (Render lira la config).
- Render va créer : un service web (FastAPI) + une base Postgres gratuite.
- Dans le service backend, ajoute la variable d'env **CORS_ORIGINS** avec l'URL de ton frontend (tu l'auras à l'étape 4).
- Attends que Render affiche **✅ Live** et note l'URL publique (ex: `https://roumain-backend.onrender.com`).

### 4) Déploie le **frontend** (Vercel)
- Sur Vercel → **Add New...** → **Project** → importe le repo GitHub.
- Dans **Environment Variables**, ajoute : 
  - `NEXT_PUBLIC_API_BASE_URL` = URL du backend Render (ex: `https://roumain-backend.onrender.com`).
- Lance le déploiement. Note l'URL (ex: `https://roumain-notes.vercel.app`).

### 5) Test
- Ouvre l'URL Vercel → `Importer un fichier` → choisis un .docx ou .pptx de cours.
- La page affiche les **Notions du jour** regroupées par catégorie, avec le badge **Révision** si déjà vues.

---

## Développement local (optionnel)
- Backend : `cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload`
- Frontend : `cd frontend && npm i && npm run dev`
- Par défaut, backend utilise SQLite si `DATABASE_URL` n'est pas défini.

---

## Variables d'environnement
Backend (`backend/.env`):
- `DATABASE_URL` : chaîne Postgres (Render la crée automatiquement). Sinon, SQLite local.
- `CORS_ORIGINS` : liste d'origines autorisées (séparées par virgule), ex: `https://roumain-notes.vercel.app`

Frontend (`frontend/.env.local`):
- `NEXT_PUBLIC_API_BASE_URL` : URL publique du backend.

---

## Limitations MVP
- Extraction **.docx** et **.pptx** uniquement (Google Docs → télécharge en .docx).
- Catégorisation basée sur des **règles heuristiques** (pas de LLM, donc 100% gratuit). Ça marche bien si tes documents suivent une mise en forme simple (titres / listes / "RO - FR" pour vocabulaire, tableaux de conjugaison avec "eu/tu/el/..." etc.).
- Pas d'authentification (usage perso).

---

## Roadmap rapide
- Auth (magic link) + export CSV/Anki
- Import Google Drive direct
- Audio TTS & IPA améliorée
- Algorithme SM-2 de révision (endpoints déjà présents pour l'étendre)

Bon apprentissage 🇷🇴!
