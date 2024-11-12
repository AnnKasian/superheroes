# Superheroes

Collect and analyze developers activity on projects.

## How to Run

1. Create and fill all .env files, use .env.example files as references. These files are:

- apps/frontend/.env
- apps/backend/.env

You should use .env.example files as a reference.

1. Install dependencies: `npm install`.

2. Build shared: `npm run build:shared`

3. Run database. `cd apps/backend` , `docker-compose up -d`

4. Apply migrations: `npm run migration:run -w apps/backend`

5. Run backend: `npm run start:dev -w apps/backend`

6. Run frontend: `npm run start:dev -w apps/frontend`

7. Cache Redis run: `docker run --name redis -p 6379:6379 -d redis`

8. Cache check: `docker exec -it redis redis-cli get <key>` - replase key by cacheKey from cached data
