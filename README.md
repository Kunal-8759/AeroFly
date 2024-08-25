# AeroFly-Flyways

## Overview

AeroFly is a comprehensive airline booking system that leverages microservices architecture to manage flights, bookings, user authentication, and notifications. The system is designed to be scalable, secure, and efficient, handling everything from flight scheduling to real-time seat reservations.

## Engineering Problems Solved

1. Booking Expiry and Seat Reallocation : If the payment is not successful within 5 minutes after the booking is created, the system automatically increases the seat count, and the booking status is updated to "canceled." If the user attempts to book the same seat after this period, the system prevents it.

2. Flight Search and Filtering : Implemented advanced filtration criteria to allow users to search for flights based on various parameters such as departure time, arrival time, price, and more.

3. Race Condition Handling : When there is only one seat left on a flight, the system effectively manages concurrent booking attempts by multiple users. It ensures that only one booking is successful, preventing overbooking and ensuring data consistency.

4. Idempotency in Payments : The system ensures that once a payment is successful, the user cannot mistakenly make the payment again. This is achieved by using an idempotency key with Redis cache, safeguarding against duplicate payments.

## Features

- Flight Management : Create and manage flights, including seat availability, departure and arrival times, and more.
- Booking System : Users can search for flights, book seats, and manage their reservations.
- User Authentication & Authorization : Secure user management with JWT-based authentication and role-based authorization.
- Rate Limiting : Ensures the API is protected from abuse by limiting the number of requests from clients.
- Caching with Redis : Improves performance with Redis-based caching for frequently accessed data.
- Message Queue : Uses RabbitMQ to handle asynchronous tasks and improve the scalability of the system.
- Email Confirmation : Sends confirmation emails to users when a booking is successfully completed using Nodemailer.

 ## Technologies Used :
 
  JavaScript(Node.js) , Express , Sequelize(SQL) , Redis-Cache , RabbitMQ Message Queue , JWT , Nodemailer , Rate Limiting (express-rate-limit) , Reverse Proxy(http-proxy-middleware).

 ## High Level Design and models Used in the Project : 
 ![AeroFly (1)](https://github.com/user-attachments/assets/8debad2d-85d2-4118-aa63-21c8f02bad50)

