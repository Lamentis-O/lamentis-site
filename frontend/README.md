# Lamentis Frontend

Ein simples Next.js App-Setup (App Router, TypeScript, Tailwind) für `lamentis.de`.

## Lokal starten

```bash
cd frontend
npm install
npm run dev
```

Öffne dann: [http://localhost:3000](http://localhost:3000)

## Build & lint

```bash
cd frontend
npm run lint
npm run build
```

## Vercel Setup für `lamentis.de`

1. Vercel CLI installieren (falls noch nicht vorhanden):

```bash
npm i -g vercel
```

2. Zum Frontend-Verzeichnis wechseln und Projekt verknüpfen:

```bash
cd /Users/elias/Documents/Development/lamentis-site/frontend
vercel login --global-config ./.vercel
vercel link --global-config ./.vercel
```

Im Link-Prompt den bestehenden Scope/Team und das Projekt auswählen (oder neu anlegen).
Die Projektstruktur bleibt damit automatisch auf diesem `frontend`-Ordner.

3. Optional: Login im Projektordner mit Token (falls Login-UI nicht geht):

```bash
export VERCEL_TOKEN="dein_token"
vercel --global-config ./.vercel --token "$VERCEL_TOKEN" link
```

4. Erste Deployment:

```bash
vercel --global-config ./.vercel deploy --prod
```

5. Domain `lamentis.de` in Vercel hinterlegen:

```bash
vercel --global-config ./.vercel domains add lamentis.de
vercel --global-config ./.vercel alias set <dein-vercel-projekt>.vercel.app lamentis.de
```

Im Vercel-Dashboard zusätzlich prüfen:
- `Settings -> Domains -> Add` und DNS-Einträge für die Zone setzen.

Wenn du möchtest, ergänze ich dir als Nächstes direkt die gewünschten Inhalte (Hero, Kontaktformular, Datenschutztext, etc.).
