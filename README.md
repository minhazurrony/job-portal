## Getting Started:

 - clone this repo.
 - go to project's root directory and run `pnpm install` to install all the dependencies.
 - add .env files into `apps > backend` & `apps > frontend`. i have added .env.example files in the both apps.
 - didn't implemented database migration, so use this `postgresql://neondb_owner:rE0hHXt5jCsp@ep-ancient-base-a100dtyg.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` database url into your .env file for local development.
 - run `pnpm run dev` to start development server.

**Deployed Link:** [Job-Portal](https://job-portal-nogebxb6q-minhazur-rahmans-projects.vercel.app/)

## Improvement areas:
- used inline styles most of the placed to just speed up the development time, if i get enough time then i would use separate stylesheet.
- frontend input validation not implement due to lack of time.
- not implemented any kind of loading or skeleton component in case of waiting for api response. i tried to make it functional first.
- types are not implemented strictly. 
