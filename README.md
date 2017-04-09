### CMPT 470 Final Project
# TrueNorth: Stock.io

### Demo Accounts

    1. Shawn
        username | jansepar@sfu.ca
        password | password
                
    2. Abhinav 
        username | sood@sfu.ca
        password | password

### Demo Steps

1. Run 'vagrant up' in this directory
2. Navigate to http://localhost:8080
3. The portfolio "Technology" is shared between the above accounts
    3.1. With a window open for each user, click "edit" and try removing "AAPL"
    3.2. The change should be reflected on both screens
    3.3. Try re-adding "AAPL", note it appearing at the end of the list on both screens

4. Try adding a new portfolio
    4.1. Click the '+' button in the bottom-right of the dashboard
    4.2. Give the portfolio a name
    4.3. Add a stock, for example, "CSCO"
    4.4. Add the other account listed above using their username/email
    4.5. Note the portfolio appearing on their dashboard
    4.6. Repeat with a different level of access permission, note the differences

### Important Implementation Details

1. Stock prices are updated when the app is first launched, unable to update in real-time as it was prohibitively expensive for a school projet
2. Stock graph is purely for aesthetics, the data is not dynamic

### Technologies Used

- UI: React + Webpack + Hot Modules
- Backend: Express + NodeJS + Passport + Socket.io
- ORM: Sequelize
- Database: PostgreSQL
- HTTP server: NGINX
- Deploy: Vagrant

### Project Directory (Root)
    - Vagrantfile
    - /chef
    - /scripts
    - /web-app
        - app.js
        - /client
        - /db
        - /server
        - /static