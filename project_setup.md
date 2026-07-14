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
  -  this allows to prisma client to know the new chnages made in checma also

- after changing in schema or model run both migrate and generate commands

# format prisma chema 
  - npx prisma format

# Seeding
  - mechanism by which you add some sample data to start working with it
  - seeders script / prisma seed

# Serilization : process of converting plain object to json like string format
# Desrilization : process of converting json into plain object


# 3 ways to send data in rest conversions
 - req.body | url encoded | form data
 - path params
 - query params

# Zod will help in validate data and also produces types for js/ts
 - If we reecive / send some payload we need represent in valid type definition

# DTO [DATA TRANSFER OBJECT]
 - type definitions have a specific usecase we keep in seperate layer called dto
 ex: class/interface/type

# Problem If we have mobile and web client 
  - we can share small payload form mobile as bandwidth issue
  - what if mob and web wants differents repsonses
  - for web we can 
  - so we can use 2 different version of api or brute force means client type

2 solutions for this condition
  * [backend for fronend | midle-end] bff
     - client - midle server - actual backend
     - q1,q2,q3 [give what necessary propertie required]  -  api 1
  * [graphql] - cleint send query what they want, now do not need different servers or different apis


# route - validate middleware - controller

# 3 kind project repo
 - monolith 
   - ecommerce with all service as a single unit

   * disadvantages
   - problem 1. during sale, catalog or payment traffic will increase here whole server need to increase its scaling which is unecessary for other services
   - problem 2. lot conflict , compile/build time , too much code

   * advantage
     - simple
     - code reuse
     - single deployment

 - monorepo [hybrid]
   - ecommerce , single repo but every service inside is a seperate running server + separte deployable unit , [tingting]

  * disadavantages
    - extreamly big repo

 - microservice
   - ecommerce with different services and can be with d/f db and langauges

   * disadvantages
    - need communication overhead 
    - shared libs
    - distribution system , data inconsistency 

   * advantages
     - language independent , use py for ai/al , js for backend etc
     - scale independently

# Send PR Fork - Clone - Create Branch - Push - Open PR
# Send pr in single - single dont send all together


# When to prefer caching and indexing [ both are mechanism to improve reads]
 - cache brings new infra reuqirements like redis which is overhead to addon , but every project has a bare min db
 - index create a write overhead , whenver write need a new index should be created
 - range query might not be supported by caching key - value stores
   IN THIS CASE B-TREE BASED INDEXES SUPPORT

# LRU (Least Recently Used) and LFU (Least Frequently Used) are cache eviction algorithms used to manage memory when a cache reaches capacity

- LRU: Evicts the item that has not been accessed for the longest time. ex: browser cache
- LFU: Evicts the item that has the lowest total access count
  ex: ecommerce
- TTL : invalids cache data after a specific time frame given

# indexes are storing in disk , copy in ram also


# Slug 
  - The mapping of unquie identifier of a resource to a club of english words
  ex: /blogs/:id
      /blogs/3
      /blogs/how-do-llm-works83731

  advantages
    - Seo
    - human readly
    - security

# load testing tool Grafana k6 | bombardier

# STORE TIMES IN UTC - THEN CONVERT IN CLIENT SIDE REPSECTIVE TIMEZONES


# SETUP TEMPORAL and TEMPORAL UI
 - inside docker container we will be running a temporal instance
 - As temporal manages state , whatever worker or taks are running they have there own state and durable and retry , so it depends on d/f db's
 - we have any db of choice but here we will use pgsql as it is to store its state
 - pg sql is runnig locally in our machine or on seperate container
 - Temporal will depend on pggsql
 - and ui will depend on temporal main server


1. temporal (The Core Engine)
"image": temporalio/auto-setup: This is an all-in-one image that automatically connects to your database, creates the required schemas (temporal and temporal_visibility), and boots the Temporal cluster services (Frontend, History, Matching, Worker).

"extra_hosts": ["host.docker.internal:host-gateway"]: This tells the Temporal container how to find your actual host machine (your physical Windows OS).

"POSTGRES_SEEDS": host.docker.internal: Temporal uses this variable to know where the database lives. Right now, it's correctly aimed at your physical machine instead of inside Docker.

"ports": ["7233:7233"]: This exposes Temporal's default gRPC port. Your Node.js/TypeScript code will use this port to communicate with Temporal.

2. temporal-ui (The Dashboard)
"TEMPORAL_ADDRESS": temporal:7233: It connects internally across the Docker network to the temporal container.

"ports": ["8080:8080"]: You can visit http://localhost:8080 in your web browser to visually see your workflows, track errors, and debug failures.

3. mailhog (Fake SMTP Server)
This captures emails sent by your application (like confirmation emails). You can view them in a fake inbox at http://localhost:8025 without actually spamming real email addresses.


# CORS (CROSS ORIGIN REQUEST) - Browser level security
  * strict-origin-when-cross-origin
  - browser --- server
  - abc.com --- xyz.com [different origin/domains]
  - before main req , browser will send pre-flight req , tries and check whether the other origin is aware of incoming req from this origin/cleint after success return the main req goes , thus protects from malicious orgin
  - origin-a.com --- > origin-b.com [sends req header - 'Origin:https://origin-a.com']
  - origin-b.com --- > origin-a.com [send res headers - 'Access-Control-Allow-Origin:https://origin-a.com']
  - simple req - [get , post] - No check only for [put , patch or delete] - checks happens

