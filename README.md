# Financial Microservice

it's a simple micro service that has two basic router. transaction & analytics. A transaction can be created and retrieved from the transaction route.
analytics route can return the reports of the transaction.

Transaction can be created in SAR currency but there will be an currency conversion happen to USD while creating the transaction.

### Stack used

    - Node.js & Express
    - Mysql
    - Sequelize ORM

### Setup steps

    - Run Mysql Server on PORT 3306 in your local machine
    - Create a database named db_airwrk
    - Go into the src/orm/config/config.json and give the development database credentials
    - Now go into the root directory and run **npm run bootstrap**
    - This will install all the dependencies and create the tables onto the database **db_airwrk**
    - Now either run **npm run watch** to start with nodemon
    - Or run **npm start** to run without nodemon

### Route transaction:

#### POST api/transaction [Public]

Creates the transaction.

example input-

```
 {
    amount: 25, This is in SAR Currency
 }
```

example response-

```
{
	"status": 200,
	"trxID": 7,
	"msg": "Transaction created successfully"
}
```

#### GET api/transaction/:id [Public]

returns a single transaction detail based on ID
example response-

```
{
	"status": 200,
	"data": {
		"id": 7,
		"sar_amount": 20.56,
		"usd_amount": 5.4827,
		"createdAt": "2023-08-26T14:16:37.000Z"
	}
}
```

#### GET api/analytics [Public]

returns the count of the transactions and the sum amount of total USD and SAR currency
example response-

```
 {
	"status": 200,
	"data": [
		{
			"totalTransaction": 3,
			"totalSARAmount": 61.12,
			"totalUSDAmount": 46.0427
		}
	]
}
```

For Currency conversion a third party api was being used https://currency.getgeoapi.com

Project Documentation Link: https://docs.google.com/document/d/102VQvVd_m3g0h1Tb6wwppCFj02-Ueo-dvO33Uord6ho/edit?usp=sharing
