# 🚀 NestJS GraphQL API  

### 💡 Description  
A full-featured **backend API** built with **NestJS** and **GraphQL** for an academic organization in Sulaymaniyah.  
The system is designed to manage dynamic data models, provide secure APIs, and support efficient queries and mutations through GraphQL.  
It focuses on scalability, modular structure, and strong role-based access control to ensure performance and data integrity.

---

### ⚙️ Tech Stack  
- **Framework:** NestJS (GraphQL + TypeORM)  
- **Language:** TypeScript  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Token)  
- **Tools:** VS Code / Postman / pgAdmin  

---

### 📦 Features  
✅ Modular architecture with clean service-layer structure  
✅ Secure authentication and authorization using JWT  
✅ GraphQL queries, mutations, and resolvers for all entities  
✅ Database relationships with TypeORM  
✅ Centralized error handling and validation  
✅ Ready for integration with frontend (Next.js or React)  

---

### 🧠 How to Run  
```bash
# install dependencies
npm install

# setup environment variables
cp .env.example .env

# run database migrations (if using TypeORM CLI)
npm run migration:run

# start development server
npm run start:dev
