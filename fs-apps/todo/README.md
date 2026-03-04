# MERN Todo Application with Docker, Nginx, and HTTPS

## Project Overview
This is a full-stack Todo application built using the MERN stack (MongoDB, Express, React, Node.js). The project is containerized using Docker and uses Nginx for serving the frontend, proxying API requests, and HTTPS termination. It supports load balancing (least connections) for multiple frontend instances.

## Features
- React frontend (Create React App)
- Express backend with MongoDB
- Dockerized services
- Nginx as HTTPS reverse proxy and load balancer
- Environment variable support via .env files
- Self-signed SSL for local HTTPS

## Setup Instructions

### 1. Clone the repository and navigate to the todo app folder
```
cd /path/to/your/workspace/fs-applications-repo/fs-apps/todo
```

### 2. Generate SSL Certificate for HTTPS
```
mkdir -p frontend/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout frontend/ssl/nginx.key -out frontend/ssl/nginx.crt -subj "/CN=localhost"
```

### 3. Build and Start the Application with Docker Compose
```
docker-compose up --build
```

### 4. Access the Application
- Open your browser and go to: https://localhost
- Accept the self-signed certificate warning (for local development)

### 5. Local Development (without Docker)
#### Backend
```
cd backend
npm install
npm start
```
- Ensure backend/.env has correct MONGO_URL and PORT

#### Frontend
```
cd frontend
npm install
npm start
```
- Ensure frontend/.env has REACT_APP_API_URL pointing to your backend

## Prompts & Instructions from Chat

### Prompts Received
- Create a working MERN todo application in the fs-apps/todo folder. Added nginx and docker for the application.
- add .env files as well. Also, use any hardcoded details to these file and read it from here.
- mongodb://mongo:27017/tododb is not replaced with .env file properties
- Will this application works e2e?. How to start and launch the application?
- want to run locally without Docker
- After docker-compose up build. The below error it comes.
arget frontend: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
- yes
- still same issue
- least connections
- i want to use https connection without port. make those changes
- These certificates can be used for other projects as well?
- frontend2-1  | nginx: [emerg] cannot load certificate "/etc/nginx/ssl/nginx.crt": BIO_new_file() failed (SSL: error:80000002:system library::No such file or directory:calling fopen(/etc/nginx/ssl/nginx.crt, r) error:10000080:BIO routines::no such file)
frontend1-1 exited with code 1 (restarting)
frontend2-1 exited with code 1 (restarting)
- The code is given by u only. So, it's not validated before? Make sure i can able to run the application in https mode as well.
- Now a different error. 
nginx-1      | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
- https://localhost says The site can't be reached
- I don't see /etc/nginx folder in my mac.
- nginx-1      | 2026/03/03 23:19:38 [emerg] 1#1: cannot load certificate "/etc/nginx/ssl/nginx.crt": PEM_read_bio_X509_AUX() failed (SSL: error:0480006C:PEM routines::no start line:Expecting: TRUSTED CERTIFICATE)
- req: Can't open "frontend/ssl/nginx.key" for writing, No such file or directory
- It's just created ssl folder. there are no files in it.

### Instructions Given
- Use .env files for all configuration and avoid hardcoding.
- For HTTPS, generate a self-signed certificate and mount it in the nginx container.
- Only nginx should handle SSL termination; frontend containers use plain HTTP.
- For load balancing, use nginx upstream with least_conn and run multiple frontend containers.
- For local development, run backend and frontend separately and update .env files accordingly.
- Accept self-signed certificate warning in browser for local HTTPS.

## Common Errors & Solutions

### Error: npm run build fails in frontend
**Solution:**
- Ensure react-scripts is installed and App.js/index.js are in src/ folder.
- Update package.json scripts for Create React App.

### Error: nginx cannot load certificate
**Solution:**
- Make sure frontend/ssl/nginx.crt and frontend/ssl/nginx.key exist and are valid PEM files.
- Regenerate with openssl if needed.

### Error: https://localhost not reachable
**Solution:**
- Ensure nginx container is running and port 443 is exposed in docker-compose.yml.
- Check nginx logs for certificate errors.

### Error: frontend/ssl directory exists but no files
**Solution:**
- Run openssl command to generate cert and key files in the correct directory.

### Error: /etc/nginx/ssl not found on Mac
**Solution:**
- This path is inside the nginx container, not your Mac. Just ensure files are mounted via docker-compose.

## Contact & Support
If you encounter issues, check the error messages and follow the solutions above. For further help, review the chat prompts and instructions or reach out for support.
