# npm install -g typescript

# npm init -y || pnpm init -y
- use pnpm for fater installs and less disk space

# npm i express zod dotenv pg
- zod to type validations

# npm i -D typescript tsx @types/express @types/node  @types/pg nodemon
- contains types for corresponding packages
- tsx - typescript execute to executes code directly
- tsc - typecript complier while production we will transpile means converting one language to another language [ts-js]
- npx - runs/execute a package in cli , ex: npx primsa  migrate dev


# npm i @prisma/client @prisma/adapter-pg
- prisma - The Prisma CLI for running commands like prisma init, prisma migrate, and prisma generate
- @prisma/client - The Prisma Client library for querying your database
- @prisma/adapter-pg - The node-postgres driver adapter that connects Prisma Client to your database

# npm i -D prisma @types/node

# npx prisma init --output ../generated/prisma
  - initilize
  - Creates a prisma/ directory with a schema.prisma file containing your database connection and schema models
  - Creates a .env file in the root directory for environment variables
  - Generates the Prisma Client in the generated/prisma/ directory
  - Creates a prisma.config.ts file for Prisma configuration


# 2 ways to eexceute typescript code
  * convert [tsc] ts - js , which is followed in production with type check , converts code 
  * directly execute ts code [tsx], which is followed in developement without type check , doesnot convert code


# tsc init 
  - creates tsconfig.json

# tsconfig.json is a configuration file used in TypeScript projects. It sits at the root directory of your project and does two main things:
 - Marks the directory as the root of a TypeScript project.
 - Instructs the TypeScript compiler (tsc) exactly how to compile your TypeScript code into standard JavaScript code

# tpye = "module" as es moduling enbales
# nodenext , will allow to use .js import , while complilation and while importing in code also

- setting up env variables in linux/mac is different than windows
- in mac/linux - 
export [per terminal session]
 zshrc [permanment]
 so we have dotenv - 5 process runs , just env all get updated or any particular process

# script
  - "dev" : "nodemon --watch src --ext ts --exec tsx src/server.ts",
    watch src folder changes in ts extension file and run src/server.ts file


# orm and odm is a library

# orm
  - obejct relaional mapper for rdms
  - ORM maps a database table to a Class, and a row to an Instance of  that class
  - Prisma, Sequelize, TypeORM

# odm
  - odjecct deocument mapper for nosql
  - An ODM maps these documents to Objects 
  - Mongoose

# Disadavantage of orm
  - complex query does not work well
  - raw query is better in complex

# Adavantage
  - write code in any programming lang it will convert to specific db query
  - migration is easy 
  - caching some provides

# ORM USES DB DRINVER AND TAKES A TS OR ANY LANG CODE CONVERTS TO RESPECTIVE DB QUERY

          gui || cli
- mysql - mysql workbench
- pqsql - pgadmin
- mongodb - mongodb compass

# Migrations
  - MEANS our databses will be continously evolving , like adding more tables or updating tables or modifying tables or deleting tables
  - project should apdat the change , like other developers and in production aslo , not just locally in your machine
  - versionize it , like github same we need do to db and for everthing we need .
  - so that we can roll back also+

# advatanges of migrations
  - visualize db changes as code
  - track these changes by git
  - get latest version of table 
  - create new table if not exists
  - in a team , after a pull the migration framework will check as they will have table for version control of tables and the above changes and roll back option by figuring out the opposite of a change
  ex : added a column - remove the column = rollback

# migrate 
  - npx prisma migrate dev add_users_table

# npx prisma generate 
  - command that reads your schema.prisma file and builds a custom, type-safe database client specifically tailored to your database structure

- after changing in schema or model run both migrate and generate commands

# Seeding
  - mechanism by which you add some sample data to start working with it
  - seeders script / prisma seed