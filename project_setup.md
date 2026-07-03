# npm install -g typescript

# npm init -y || pnpm init -y
- use pnpm for fater installs and less disk space

# npm i express zod dotenv 
- zod to type validations

# npm i -D typescript tsx @types/express @types/node nodemon
- contains types for corresponding packages
- tsx - typescript execute to executes code directly
- tsc - typecript complier while production we will transpile means converting one language to another language [ts-js]
- npx - runs/execute a package/comamnds


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
