# Deployed URLs
backend URL: http://aacd0444fd390474fa7ef67d6b5b4c4e-2142558196.eu-north-1.elb.amazonaws.com:4500/

frontend URL: http://a53eccdd1d3994a55aeb2075769c0bbc-1010474656.eu-north-1.elb.amazonaws.com:3000/

---

# Steps required to set up and run the application locally

### `backend`

1. npm install (to install dependencies)
2. npm run server (to start the server)
3. URL- http://localhost:4500/

---

### Routes:

- ### Users Routes

| METHOD | ENDPOINT       | WHAT IT DOES                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------- |
| POST   | /user/register | -> Register New User (Requires user details in req.body)                              |
| POST   | /user/login    | -> Login existing user (Requires email and passwords, returns token if login success) |

- ### blog Routes

| METHOD | ENDPOINT                    | WHAT IT DOES                                     |
| ------ | --------------------------- | ------------------------------------------------ |
| GET    | /blog                       | -> get all blogs                                 |
| GET    | /blog/:id                   | -> get single blog by the blog id                |
| GET    | /blog/search/:search        | -> get blogs by keyword for search functionality |
| POST   | /blog/post                  | -> post a blog                                   |
| GET    | /blog/authorblogs/:authorID | -> get the blogs posted by an author             |
| DELETE | /blog/deleteblog/:blogID    | -> Delete a blog by blogID                       |
| UPDATE | /blog/updateblog/:blogID    | -> Update/edit a blog by blogID                  |

- ### Comment Routes

| METHOD | ENDPOINT                     | WHAT IT DOES                                            |
| ------ | ---------------------------- | ------------------------------------------------------- |
| GET    | /comment/:blogID             | -> get the comment posted on a blog by providing blogID |
| POST   | /comment/postVomment/:blogID | -> Post a comment to a blog                             |

### `Frontend`

1. npm install (to install dependencies)
2. npm Start (to start the app)
3. URL- http://localhost:3000/

---

# how to deploy the application on Amazon EKS?

### `Reqirements`

1. create account in Docker
2. create account in AWS
2. Install AWS CLI Tool
3. Install Eksctl Tool
4. Install kubectl Tool

### `Steps`

1. Dockerize the Application (frontend/backend)

   - create a Dockerfile and add the docker commands

   - Build Docker Image (docker build -t <user_name>/<image_name>)

   - run the application as a Docker Container (docker run -p <port>:<port> <user_name>/<image_name>)

   - push the Docker Image to Docker Hub (docker push <user_name>/<image_name>)

2. Create the Amazon EKS Cluster

   - Install the AWS CLI Tool

   - Configure the Amazon Web Service

     - run command- aws configure (provide the inputs asked)

   - Install the Eksctl tool.

     - Create the Amazon EKS Cluster using Eksctl
     - run command- eksctl create cluster --name sample-cluster

   - Write Kubernetes Deployment and Service YAML files for both froentend and backend

   - Deploy the Applications

     - kubectl apply -f <backend/frontend>-deployment.yaml
     - kubectl apply -f <backend/frontend>-service.yaml

   - kubectl get service to access the Application Container
     - Use the external id
     - http://<YOUR_LOAD_BALANCER_ENDPOINT>:< port >/
