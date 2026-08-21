# Procédures

## Lancer le projet
```bash
cd back2mboa
npm install
npm run dev
```
Ouvrir http://localhost:3000

## Ajouter une section (session d’un développeur)
1. Créer `components/sections/<nom>/XxxSection.tsx`
2. Mettre les mocks dans `data/<nom>.ts`
3. Déclarer les types partagés dans `types/`
4. Importer et monter **uniquement** dans `app/(event)/page.tsx`
5. Ne pas modifier le markup des autres dossiers `components/sections/*`

## Conflits Git
- Travailler uniquement dans son dossier de section
- `page.tsx` : n’ajouter que l’import + le composant, dans l’ordre des sections
