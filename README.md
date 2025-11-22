# Bean & Bite Cafe – Next.js App

Quick-start cafe & restaurant ordering site built with Next.js App Router, SQLite, Prisma, NextAuth, and Tailwind CSS.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

3. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

4. Generate Prisma client (optional if migrate already did it):

```bash
npx prisma generate
```

5. Create an admin user (you can adapt a seeding script or create manually via Prisma Studio):

```bash
npx prisma studio
```

Set `role` to `ADMIN` and `passwordHash` to a bcrypt hash.

6. Start dev server:

```bash
npm run dev
```

Visit:

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin (will redirect to /auth/signin if not logged in)
