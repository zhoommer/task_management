# task_manager
Simple task manager for business.

## Tasks

![Screenshot 2025-05-24 at 14 19 44](https://github.com/user-attachments/assets/d87f87e9-a6e3-4642-8514-8292c28b7641)

### Gereksinimler
- Backend
  - Oncelikle bir .env dosyasi olusturun.
  - PUBLIC_NODE_DATABASE_URL=[postgreSQLDBURL]
  - PUBLIC_NODE_PORT_NUMBER=[PORTNUMBER]
  - PUBLIC_NODE_JWT_SECRET_KEY=[JWT SECRET KEY]

- JWT Key olusturmak icin: `openssl rand -hex 32`
- `npm install`
- `npx prisma migrate dev`
- `npm run start`
