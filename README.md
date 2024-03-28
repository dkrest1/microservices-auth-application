# Ecommerce Microservices Application

## Overview 
The eCommerce Microservices project is a distributed system architecture composed of several microservices designed to handle various aspects of an eCommerce platform. The system is built using a microservices approach to ensure scalability, flexibility, and maintainability.

## Services
The following microservices are included in the system:

- Order Service: Manages orders, including creation, retrieval, and processing.
- Product Service: Handles product-related operations such as creation, retrieval, and inventory management.
- User Service: Responsible for user management, authentication, and authorization.
- Payment Service: Facilitates payment processing and integrates with external payment gateways.
- API Gateway: Acts as a single entry point for clients to interact with the system, routing requests to the appropriate microservices.

## Technologies

- Node 20.x
- Typescript
- Express
- PostgreSQL
- Typeorm
- amqplib

## Database Model Design

[Click the link to view the ER diagram](https://)

## Getting Started

1. Clone the microservices ecommerce application

```bash
$ git clone repo url
$ cd microservices-ecommerce-application
```

2. Create a .env file in the various folder root directory 

```bash
$ cd order-service 
$ touch .env
```

4. Copy the contents of .env.sample into the .env file

```bash
$ cp .env.sample .env
$ cp .env.sample .env
```

5. Install necessary packages

```bash
$ npm install
```

6. Start or Spin up the server

```bash
$ npm run dev
```

## API documentation
[Notion Link](https://)

## Contributing

Contributions to the eCommerce Microservices project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

## License
This project is licensed under the [MIT LICENSE](https://github.com/dkrest1/microservices-ecommerce-application/blob/main/LICENSE).

## Contact
For questions or support, contact [TWITTER](https://twitter.com/dkrestdev).