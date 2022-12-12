# How to deploy CampManager-frontend

* [Windows](#windows)

* [Ubuntu](#ubuntu)

## Windows
1- In order to deploy the front-end in docker once we have cloned the repository inside the folder we must execute the command:
```
docker compose up
```
If this command does not work, try this one:
```
docker-compose run --rm app npm install
```
<br/>

## Ubuntu
1. Install docker engine on Ubuntu. Please follow the instructions that are provided in the official website:
```
https://docs.docker.com/engine/install/ubuntu/
```
2. Install docker on Ubuntu. Please follow the instructions that are provided in the official website:
```
https://docs.docker.com/desktop/install/ubuntu/
```
3. Once docker desktop and docker engine have been installed in Ubuntu, you have to give docker user permission so that it can correctly build the containers with:
```
sudo usermod -a -G docker $USER
```
4. Then you have to give permissions to the entire repository folder with:
```
sudo chmod -R 777 .
```
5. In order to deploy the back-end in docker once we have cloned the repository inside the folder we must execute the command:
```
docker compose run --rm app npm install
```