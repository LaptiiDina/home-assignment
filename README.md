
# home-assignment

## Description
Technologies used, such as React, TypeScript, Redux, Node.js with Nest.js, Prisma ORM, and PostgreSQL, all containerized with Docker.

## Prerequisites
- Docker
- Docker Compose
- npm
- node.js
- VS Code/WebStorm

  ### Installation
1. Clone the repository: https://github.com/LaptiiDina/home-assignment.git
2. run command:
  cd ./apps/client
3. run npm install
4. cd ../server
5. run npm install
6. cd ../ (go to folder apps)
7. run all containers and rebuild them:
   docker-compose up --build 
8. client side locate in http://localhost:4000/
9. stop all containers
   docker-compose down
10. run all containers without build
   docker-compose up

