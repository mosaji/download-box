# download-box
Manage your downloads with raspberry pi Download Box


All of you need to set up your raspberry pi as a download box. download-box is a project to help you turn your raspberry pi into a download manager. In technical words, the download box is aria2c WebUI. So you can control your downloads online, with WebUI and a hybrid mobile application.


## we have few steps
1. set up and configure download-box-base on your server.
2. set up and configure download-box-engine on your raspberry.
3. build download-box-mobile to better control your downloads on your phone.

## 1. setup and configure your server
you can use local computer to test this project Anyway you need to install dependencies
- git ([installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
- node.js ([installation guide](https://nodejs.dev/learn/how-to-install-nodejs))
- **yarn ([installation guide](https://classic.yarnpkg.com/en/docs/install))**


After you are sure of installing these you can continue, open a new Terminal/CMD and continue.
```sh
git clone
cd download-box-base
yarn install
cd frontend
yarn install
```

### Setting IP and port in config files
make share port 8585 is open. we need this port for a running server. but you can change the port on this file.
```sh
download-box-base/config.js
```
then you need to IP and port server on the frontend config.
```sh
download-box-base/frontend/config.js
```

### Run the servers
Make sure you are on this path download-box-base/
```sh
node server.js
```
if you want to use development mode in the frontend
```sh
cd frontend/
yarn dev
```
if you want to use production mode
```sh
cd frontend/
yarn build
```

## 2. set up and configure download-box-engine on your raspberry
we are going to install dependencies on raspberry pi. Any way you want, just connect to your raspberry pi and open the new terminal

```sh
sudo apt-get update
sudo apt-get upgrade
curl -sL https://deb.nodesource.com/setup_15.x | sudo bash -
sudo apt-get install git aria2 tmux nodejs
sudo npm install -g yarn
```

make sure to installed dependencies and then
```sh
git clone
cd download-box-engine
yarn install
```

### set your server IP and port on your raspberry
To connect raspberry pi to the server you need to edit the ip and port in this file.
```
download-box-engine/app/config.js
```
then, you can run Engine to connect the server. you must be in the download-box-engine folder.
```sh
chmod -R 777 ./scripts
./scripts/run.sh
```
If you have done everything right, you can open the application with your ip:port in your browser. you can monitor aria2 with tmux
```sh
tmux a -t session_aria2
```
you can add to startup with pm2

```sh
npm run startup
```

## 3. build download-box-mobile for better control of your downloads on your phone.
download download-box-mobile and run
```sh
cordova build 
```
see cordova [documentation](https://cordova.apache.org/docs/en/latest/)
