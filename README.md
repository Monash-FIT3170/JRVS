# JRVS

### Project 4 - FIT3170 - 2024

JRVS is an educational app that makes AI easy to understand and exciting to learn through interactive learning paths and modifiable content.

### Team:

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
- Riordan Alfredo, Mentor, riordan.alfredo@monash.edu

### Running the app

Pre-requisites:

- Make sure that your IP is added to the mongodb database, by going to network access in the database, 'add current IP address'
- Ensure node version is >= 18

1. delete all yarn.lock files, node_modules and package-lock.json files
2. add/update .env file in the server/ directory with mongo_uri password, encryption_key, encrpytion_iv and jwt_secret, gemini_api_key, getimgai_api_key (see example .env)
3. add/update .env file in client/ with REACT_APP_BACKEND_URL
4. `npm run install-all-mac` or `npm run install-all-win` (if on mac or windows)
5. `npm run dev` to run the dev app or run the server and client seperately.

## Hosting the app through docker

1. make sure you have docker desktop installed from https://www.docker.com/
2. make sure you have the .env correctly setup in the root of the parent directory, and client/ directory
3. navigate to the root directory of the project in the terminal and run `docker-compose up --build`
4. you should now be able to access the application from http://localhost domain!
