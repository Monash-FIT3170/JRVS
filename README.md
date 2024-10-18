# JRVS

### Project 4 - FIT3170 - 2024

JRVS is an educational app that makes AI easy to understand and exciting to learn through interactive learning paths and modifiable content.

### Team:

- Max Verhoef, 32497342, Release Train Engineer, mver0017@student.monash.edu
- Jasraj Bhasin, 32522118, System Architect, jbha0006@student.monash.edu
- Daniel Ding, 31483216, Release Train Engineer, ddin0018@student.monash.edu
- Jackson Nguyen, 32487991, Release Train Engineer, jngu0076@student.monash.edu
- Maily Butel, 32469713, Release Train Engineer, mbut0011@student.monash.edu
- Huong Wen Cheng, 32022905, Release Train Engineer, whuo0004@student.monash.edu
- Edward Griffith, 32475101, System Architect, egri0018@student.monash.edu
- Rowan ALbert Alex 33157294, System Architect, ralb0005@student.monash.edu
- Brendan Nguyen, 30711037, System Architect, bngu0037@student.monash.edu
- Chris Patrick, 32595948, Release Train Engineer, cpat0024@student.monash.edu
- Caleb Smith, 32526865, Product Manager, csmi0037@student.monash.edu
- Hasee Weerasinghe Meegahawattage, 32543964, Product Manager, hwee0010@student.monash.edu
- Thomas Doyle, 31503969, Product Manager, tdoy0001@student.monash.edu
- Selina Tang, 31493238, Product Manager, stan0146@student.monash.edu
- Glenn Kurniawan, 33109249, Product Manager, gkur0003@student.monash.edu
- Vivian Pham, 31475477, Product Manager, vpha0021@student.monash.edu
- Riordan Alfredo, Mentor, riordan.alfredo@monash.edu

## Table of Contents

- [Software/Hardware](#item-one)
- [Instructions](#item-two)
- [MongoDB Instructions](#item-three)
- [Deployment/Railway Instructions](#item-four)
- [Docker Instructions](#item-five)
- [Gemini & getimg.ai Instructions](#item-six)
- [PR/Versioning Strategy](#item-seven)
- [Additional Notes](#item-eight)

<a id="item-one"></a>

## Software/Hardware

The JRVS software can be run on Windows and Mac, meeting minimum hardware requirements to effectively code and display web applications using any chosen IDE and browser. JRVS requires installing Node.js and NPM, ensuring to install the newest version (at least above version 18). Make sure the most up-to-date Docker Desktop is installed on your device.

**Node.js installer (includes NPM):**
- https://nodejs.org/en/download/package-manager

**Docker Desktop:**
- https://www.docker.com/
- https://docs.docker.com/desktop/install/windows-install/

**MongoDB:**
- https://www.mongodb.com/products/platform/atlas-database

**Railway:** 
- https://railway.app/
- http://jrvs-server-production.up.railway.app/
- https://jrvs-client-production.up.railway.app/

**Gemini & getimg.ai:**
- https://getimg.ai/
- https://getimg.ai/tools/api#pricing (using Stable Diffusion XL model)
- https://ai.google.dev/
- https://aistudio.google.com/app/apikey

<a id="item-two"></a>

## Instructions

1. Make sure that your current IP address is added to the MongoDB database, by logging in to MongoDB Atlas, under network access and “add current IP address”.
2. Update the .env file in the server directory, with the correct “MONGO_URI” password, “ENCRYPTION_KEY”, “ENCRYPTION_IV”, and “JWT_SECRET” (see example .env in parent directory.
3. Add/update .env file in client/ with REACT_APP_BACKEND_URL
4. In your console (parent directory), run the dependency installation script with the command: ```npm run install-all-mac``` for mac users, or ```npm run install-all-win``` for windows users.
5. In your console (parent directory), you can run the software with the command: ```npm run dev``` or ```npm run start``` in client/ and server/ separately.

<a id="item-three"></a>

### MongoDB Instructions

1. Access the mongoDB cluster via the url or request access: https://cloud.mongodb.com/v2/661f0a7f7cfcc2462dc7dda4#/overview
2. Project settings can be accessed via the kebab menu in the top left:
   
![mongodb1](https://github.com/user-attachments/assets/47fdcd86-4386-46c8-b616-c05014ec6c90)
 
4. To connect to the database from an application simply select the “get connection string” button and follow the instruction popup for whatever you are trying to connect to:
   
![mongodb2](https://github.com/user-attachments/assets/86826f33-a8f5-4915-b7d0-7bfc7bf931dd)
 
6. Users can be added and removed from a project via the “access manager” tab:

![mongodb3](https://github.com/user-attachments/assets/67bd3cc5-278c-4467-82ee-c7e31b002acc)

8. If you want additional guidance on interacting with the mongo db cluster or project configurations refer to the MongoDB Atlas documentation: https://www.mongodb.com/docs/atlas/

<a id="item-four"></a>

### Deployment/Railway Instructions

1. Access railway via the following url or request access: https://railway.app/project/4ac6402b-ec80-48d2-9460-51c978894308
2. There are two separate deployments one for the JRVS Server (jrvs-server-production.up.railway.app) and one for the JRVS Client (jrvs-client-production.up.railway.app) application both of these are under the same railway project (JRVS) seen below.

![railway1](https://github.com/user-attachments/assets/c837cc7b-eed7-4e51-9eeb-068b1a8d70f2)

3. Both application should automatically redeploy whenever changes are made to the “main” branch in the JRVS git repository (https://github.com/Monash-FIT3170/JRVS)
4. If changes need to be made to either application's configuration simply select one from the main project window to expand it.
5. In the “Deployments” tab you can select view logs to explore in more detail and potentially debug issues for active deployments:

![railway2](https://github.com/user-attachments/assets/0c1b14a1-863d-40bb-b30b-e081ac96690c)

6. If environment variable need to be updated simply select the “Variables” tab and current environment variable can be easily viewed and updated from that tab:

![railway3](https://github.com/user-attachments/assets/7ffc3c77-8635-4232-a084-e1882d80e341)

7. Other settings such as root directory, deployment branch and the build details can be modified via the settings tab:

![railway4](https://github.com/user-attachments/assets/46bcf70c-0f01-4178-a606-3146b7a841de)

8. Currently the deployment utilises the Nixpacks tool to automatically build and deploy both the client and server with its own custom docker image. Further information can be found in the Nixpacks documentation page: https://nixpacks.com/docs/getting-started
9. Additional information about setting up deployment in railway can be found in the railway docs: https://docs.railway.app/

<a id="item-five"></a>

### Docker Instructions

1. Make sure you have Docker Desktop installed on your device.
2. Make sure you have the .env file correctly set up in the root of the server/ directory and client/ directory.
3. Navigate to the root directory of the project in the terminal and run ```docker-compose up --build```.
4. You should now be able to access the application from http://localhost domain.

<a id="item-six"></a>

### Gemini & getimg.ai Instructions

1. JRVS integrates Gemini AI and getimg.ai for A.I. generation.
2. Create a getimg.ai account, go to ‘API Keys’ and create a new API key.
3. Add this new API key to the .env server file, and into environmental variables on railway deployment
4. Create a google account and log into google AI for Developers
5. Go to Google AI Studio, and create a new API key.
6. Add this new API key to the .env server file, and into environmental variables on railway deployment.

<a id="item-seven"></a>

## PR/Versioning Strategy

1. The pull request should be clear and illustrate the changes made to the repository, as well as any notes for any additional information/possible issues that they may have.
2. A second different team member should finalise the review and merge the pull request where possible to ensure the code and the review are thorough and without errors.
3. The pull request should be in relation to one atomic feature/fix addition.
4. Versioning should use the “major.minor.patch” strategy.
5. Major is incremented for large changes .
6. Minor is incremented for additions that do not break existing functionality.
7. Patch is incremented for bug fixes and improvements.
8. Versioning example: 1.0.1 adds bug fixes.

<a id="item-eight"></a>

## Additional Notes

- If any issues occur with running the JRVS software, ensure that the .env file (in server and client directories) is updated with the correct keys, and refer back to the instructions above.
- When running the development environment, warnings may appear in your console, these can be ignored when running the software, but be aware to fix these warnings where possible for final deployment.
- If logging in issues occur when running the development environment, this is more than likely due to your current IP address not being added to the MongoDB database, ensure to add your current IP.
- If the dependency installation scripts are not working, you can manually install dependencies by going into every directory level, and running the command: “npm install”.
- When running the docker, if you are having problems logging in to JRVS, make sure that the front-end url is correct/updated in server.js and docker config, and all ‘hrefs’ within the software code are not hardcoded.
- When installing and requiring dependencies, make sure to install/require them in the required directory (server or client), avoid installing in the parent directory or in directories that do not need them.
- getimg.ai starts off with a balance of $0.25 which is enough for approx. 400 images of 512x512 size using Stable Diffusion XL model.
