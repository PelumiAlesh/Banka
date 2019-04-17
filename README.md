[![Build Status](https://travis-ci.org/PelumiAlesh/Banka.svg?branch=Develop)](https://travis-ci.org/PelumiAlesh/Banka)
[![Coverage Status](https://coveralls.io/repos/github/PelumiAlesh/Banka/badge.svg)](https://coveralls.io/github/PelumiAlesh/Banka)
[![Maintainability](https://api.codeclimate.com/v1/badges/206cd63a9bb2e454c26e/maintainability)](https://codeclimate.com/github/PelumiAlesh/Banka/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/206cd63a9bb2e454c26e/test_coverage)](https://codeclimate.com/github/PelumiAlesh/Banka/test_coverage)
# Banka
BBanka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money
## Prerequisites
To run this application, you should have the following:
- Node
- NPM/Yarn (NPM comes with Node)
## Installation
Follow the instructions to have the app up and run:
- clone the repo: RUN THE COMMAND
```shell
>> git clone https://github.com/PelumiAlesh/Banka.git
```
- Install the production depency: RUN THE COMMAND
```shell
>> npm i --prod
```
- Transpile the code: RUN THE COMMAND
```shell
>> npm run build
```
- Start the server: RUN THE COMMAND
```shell
>> npm run start
```
- You should use ```localhost:5000``` as your base url

## Features

* User (client) can sign up.
* User (client) can login.
* User (client) can create an account.
* User (client) can view account transaction history.
* User (client) can view a specific account transaction.
* Staff (cashier) can debit user (client) account.
* Staff (cashier) can credit user (client) account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific user account.
* Admin can create staff and admin user accounts.
* User can reset password.
* User can upload a photo to their profile.

## Running the test
To run the test USE the following command
```shell
>> npm run test
```
#### What does this test covers?
The test covers all the endpoints and requests sent to them.

## Deployments
This application was deployed to the following:
- [Heroku](https://pelumi-banka.heroku.com) : For API endpoints.
- [Github Pages](http) : UI template for this application.
- [Pivot Tracker](https://www.pivotaltracker.com/n/projects/2320851) : Pivot Tracker stories

## API Endpoints
| METHOD | DESCRIPTION                             | ENDPOINTS                 
| ------ | --------------------------------------- | ------------------------- 
| POST   | User's Sign up                 | `/api/v1/auth/signup`  
| POST   | User's Sign in                  | `/api/v1/auth/signin`  
| POST   | Create a bank account                   | `/api/v1/accounts`      
| PATCH | Activate or deactive an account          | `/api/v1/accounts/:accountNumber`| 
| DELETE   | Delete an account                     | `/api/v1/accounts/:accountNumber`|
| POST     | Perform a debit transaction           | `/api/v1/transactions/:accountNumber/debit`
| POST     | Perform a credit transaction           | `/api/v1/transactions/:accountNumber/credit`

## Acknowledgments
[Andela](https://www.andela.com)