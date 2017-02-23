Payment Form App
========

_This is the test task for junior WEB-dev._

## Introduction

The goal of this application - is to simulate payment with credit card. 

Task conditions and restrictions:
* use Angular (>1.3) for Front-end
* use Nodejs for Back-end with one of the frameworks (express/totaljs/sailsjs/hapi/koajs)
* can't use external Angular modules
* can't use external librarys like jQuery and etc.
* create many validation interfaces 

I've added a Mongoose to improve presentation of the data that used in payment transfers and etc.

Because of all this dependences, I chose **MEAN** template for this app.

## Description

### Angular
Used to control all user's actions, form validations, for manipulating user's data and etc.
### Node 
Used to create WEB server with JavaScript
### Express
Provides a layer of fundamental web application features
### Mongoose
The user's data, that used in application, is contained in 3 models:
* User - represents a bank account (account currency - euro). Example:
```
{
    "bank_account_value": 999943573,
    "type": "visa",
    "nameOnCard": "MARK ZUCKERBERG",
    "cardNumber": 4444444444444444,
    "expiryDate": "0444",
    "securityCode": 444
}
```
* Payment Transfers - represents a history of payment transfers. Example:
```
{
    "bank_account_value_before": 999948017,
    "bank_account_value_after": 999943573,
    "cardNumber": 4444444444444444,
    "nameOnCard": "MARK ZUCKERBERG",
    "amount": 4444,
    "currency": "euro",
    "createdAt": 1473629151733
}
```
* Card - represents a data of different kinds of credit cards. Example:
```
{
    "type": "mastercard",
    "first_number": 5,
    "card_number_length": 16,
    "security_code_lenght": 3,
    "logo": "https://s26.postimg.org/iw2z5i4tx/mastercard.png",
    "hint": "../images/card_tooltips/nonamex.png",
    "regex": "^5[1-5][0-9]{14}$"
}
```
Of course, this data applicable only for presentation, but it helps to understand how app is working. 

P.S.

Also for security improvement I used `HTTPS` protocol, with own created sertificate that can be found in dir `/ssl` catalogue.

Available card types can be found at `https://localhost/api/cards`.

All Angular code placed into modules.

## Installation

```bash
git clone https://github.com/eugrdn/payment-form-app.git
cd payment-form-app
npm install
npm start
# in browser
https://localhost:3000
```
*Attention*

Don't forget to change userURI
```
{
    "mongoose": {
        "options": {
            "config": {
                "autoIndex": false
            },
            "server": {
                "socketOptions": {
                    "keepAlive": 1
                }
            }
        },
        "userURI": "YOUR MONGOLAB USER CONNECTION"
    }
}
```

## Using
I've created two bank accounts to demonstrate different results of payment processes:

* The first user
```
	bank account value: 999943573 € (or less)
	name: Mark Zuckerberg
	card type: visa
	card number: 4444 4444 4444 4444
	expiry date: 04/44
	security code: 444
```
* The second user
```
	bank account value: 83 € (or less)
	name: Pavel Tech
	card type: amex
	card number: 3733 3333 3333 3333
	expiry date: 03/33
	security code: 333
```

### Preview:

![alt tag](https://github.com/eugrdn/screenshots/blob/master/payment-form.png)