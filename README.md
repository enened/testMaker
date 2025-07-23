# TestMaker
A simple web application where users can manually create, share, and take tests. Won best overall project at the Rock Hacks hackathon.

## Features
* Create custom multiple choice tests with the answer choices
* Search for other created tests 
* Take tests and view results

## Built With
* Node.js/Express
* React.js
* MySQL database

 ## Getting Started

1. Clone repository
```bash
git clone https://github.com/enened/testMaker.git
```

2. Start React
```bash
cd test_maker
npm install
npm start
```

3. Set up MySQL database by running the sqlScript.sql file
4. Enter database credentials in a .env file
```env
DB_HOST = localhost
DB_USER = youruser
DB_PASSWORD = yourpassword
```

5. Start express server

 ```bash
npm install
node index.js
```

## Notes
This project was created during a hackathon in limited time and focuses on the core functions. Limitations include:
* Limited input validation and error handling
* Basic styling
* No session persistence


