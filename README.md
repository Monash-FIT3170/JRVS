# DorAI-The-Explorer #
### Project 4 - FIT3170 - 2024 ###
DorAI is an educational app that makes AI easy to understand and exciting to learn through interactive learning paths and modifiable content.
### Team: ###
- Max Verhoef, 32497342, Release Train Engineer, mver0017@student.monash.edu
- Jasraj Bhasin, 32522118, Software Architect, jbha0006@student.monash.edu
- Daniel Ding, 31483216, Release Train Engineer, ddin0018@student.monash.edu
- Jackson Nguyen, 32487991, Release Train Engineer, jngu0076@student.monash.edu
- Maily Butel, 32469713, Release Train Engineer, mbut0011@student.monash.edu
- Huong Wen Cheng, 32022905, Release Train Engineer, whuo0004@student.monash.edu
- Edward Griffith, 32475101, Software Architect, egri0018@student.monash.edu
- Rowan ALbert Alex 33157294, Systems Architect, ralb0005@student.monash.edu
- Brendan Nguyen, 30711037, System Architect, bngu0037@student.monash.edu
- Chris Patrick, 32595948, Release Train Engineer, cpat0024@student.monash.edu
- Caleb Smith, 32526865, Product Manager, csmi0037@student.monash.edu
- Hasee Weerasinghe Meegahawattage, 32543964, Product Manager, hwee0010@student.monash.edu
- Thomas Doyle, 31503969, Product Manager, tdoy0001@student.monash.edu
- Selina Tang, 31493238, Product Manager, stan0146@student.monash.edu
- Glenn Kurniawan, 33109249, Product Manager, gkur0003@student.monash.edu
- Vivian Pham, 31475477, Product Manager, vpha0021@student.monash.edu

### Running the app ###
- To install dependencies: npm install
- Add .env file to server directory with the following:
```
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://mver0017:<password>@doraicluster.yrznyo1.mongodb.net/?retryWrites=true&w=majority&appName=DorAICluster
```
- Make sure that your IP is added to the mongodb database, by going to network access in the database, 'add current IP address'
- run server: run run server
- run client: npm start

Inside that directory, you can run several commands:

&nbsp;&nbsp;&nbsp;&nbsp;npm start\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starts the development server.

&nbsp;&nbsp;&nbsp;&nbsp;npm run build\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bundles the app into static files for production.

&nbsp;&nbsp;&nbsp;&nbsp;npm test\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starts the test runner.

&nbsp;&nbsp;&nbsp;&nbsp;npm run eject\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Removes this tool and copies build dependencies, configuration files\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and scripts into the app directory. If you do this, you can’t go back!
