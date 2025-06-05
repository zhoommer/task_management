# task_manager
İşletmeler için basit görev yöneticisi.

## Tasks
![Screenshot 2025-06-05 at 15 34 08](https://github.com/user-attachments/assets/bb6d4675-3bfd-4ac1-a045-6a6ad921b955)
![Screenshot 2025-06-05 at 15 34 18](https://github.com/user-attachments/assets/f4484c15-fb6e-49bc-9e3e-21bff5f820ed)



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
