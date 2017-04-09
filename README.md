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
2. Navigate to http://localhost:8080 (for best effect, use Safari web-browser)
3. Portfolios:
    1. The portfolio "Technology" is shared between the above accounts
    2. Each account has another portfolio shared with other users
4. View stock information
    1. Click on the first tile, for "AAPL" to view details for Apple Inc.
    2. Hit the "Done" button or esc key to close the modal
4. Edit a portfolio
    2. With a window open for each user, click the "edit" button beside the Technology header
    3. Change the name from "Technology" to "Technologies", and then hit update
    4. Use the 'x' button beside "AAPL" to remove it from the list
    4. Try re-adding "AAPL", note it appearing at the end of the list on both screens (you may need to scroll)
5. Add a new portfolio
    1. Click the '+' button in the bottom-right of the dashboard
    2. Give the portfolio a name
    3. Add a stock, for example, "CSCO"
    4. Add the other account listed above using their username/email
    5. Note the portfolio appearing on their dashboard
    6. Repeat with a different level of access permission, note the differences

### Important Implementation Details

1. Stock prices are updated when the app is first launched, unable to update in real-time as it was prohibitively expensive for a school project
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