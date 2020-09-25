# Lead creation App

App using, node.js with the Express.JS framework, mongodb,REST API.

## System Requirement
* Node.js 8+
* MongoDB

## Dependency
* mongoose
* express
* joi
* body-parser

## Note
* User can create leads, copy the body from https://run.mocky.io/v3/d026e567-47a8-4cee-b9ac-23d9123603ba
   * Since the body is in Array I have implemented 2 post api
   * One for creating many leads at time (use same response of above link).
   * Another one for creating single lead ( use single object as input).
* user can list all leads created
* User can get leads by Id
* Swagger documentation added

## Note 
* Basic features and validation are implemented
* find the Swagger UI at http://localhost:3004/api-docs/
* Specify Developent(dev) and production(prod) Environment while running the app (by default dev)

## API-Docs
* POST http://localhost:3004/api/leads Plese refer the json body from the above link
* GET  http://localhost:3004/api/leads
* GET  http://localhost:3004/api/leads/:leadId

* POST http://localhost:3004/api/lead/single (use sigle object from the the data array)
* 

## Running in Local

	git clone https://github.com/Gaonkar121632/leads-BE
	cd leads-BE
	npm install
	npm start 
	or
	NODE_ENV=dev node server.js
	
	Open http://localhost:3004/api-docs/
