# task_manager
İşletmeler için basit görev yöneticisi.

## Tasks

![Screenshot 2025-06-05 at 10 48 50](https://github.com/user-attachments/assets/a285a75a-ee94-4b37-a826-461456206ca8)
![Screenshot 2025-06-05 at 10 49 00](https://github.com/user-attachments/assets/41832692-328b-47c6-97c2-4460688217dc)

### Gereksinimler
- Backend
  - Kok dizinde .env dosyasi olusturun. `touch .env`
  - PUBLIC_NODE_DATABASE_URL=[postgreSQLDBURL]
  - PUBLIC_NODE_PORT_NUMBER=[PORTNUMBER]
  - PUBLIC_NODE_JWT_SECRET_KEY=[JWT SECRET KEY]

  - JWT Key olusturmak icin: `openssl rand -hex 32`
  - `npm install`
  - `npx prisma migrate dev`
  - `npm run start`
- Frontend
  - `npm install`
  - `npm run dev`

### Kullandigim Teknolojier
- Backend
  - ExpressJs
  - JWT(Json Web Token)
  - Prisma
  - Morgan (Logging)
  - CORS

- Frontend
  - ReactTS
  - React Router Dom
  - Redux (State Management)
  - Motion (Animation)
  - Toastify (Toast)
  - React Hook Form (Form Management)
  - Zod (Form Validation)
