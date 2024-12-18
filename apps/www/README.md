## Setting Up Your Environment

To set up your environment for the project, follow these steps:

1. **Create a `.env` file** in the root of your project. You can use the following template:
   ```bash
   # Required: Your Supabase URL
   SUPABASE_URL=your_supabase_url
   
   # Required: Your Supabase API Key
   SUPABASE_KEY=your_supabase_key
   
   # Required: PostgreSQL connection string
   DATABASE_URL=postgresql://user:password@localhost:5432/mydb
   
   # Required: Upstash Redis configuration (https://upstash.com)
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   ```

2. **Install Prisma** and set up your database:
   ```bash
   pnpm install @prisma/client
   npx prisma init
  ```

3. **Configure your Prisma schema** in `prisma/schema.prisma` to connect to your Supabase database:
  ```prisma
   datasource db {
     provider = "postgresql"
    url      = env("DATABASE_URL")
  }
   ```

4. **Run the Prisma migrations** to set up your database:
   ```bash
   pnpm prisma migrate dev --name init
   ```

5. **Testing the Setup**:
- You can test your setup by running the development server:
   ```bash
   pnpm dev
   ```
   - Access your application at [Login](http://localhost:3003/auth).

    - Access your application at [Upastash](http://localhost:3001/api/health).
   
## Need Help?
- Check our [Contributing Guide](../../CONTRIBUTING.md)
- Join our [Discord Community](https://discord.gg/XtybuwJV)

