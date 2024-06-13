# Project Name

- Meeting Room Booking System

# Live URL

# How to run the project in locally

To run the project locally, follow these steps:

- Please clone the repository and open terminal in the root directory of project.
- Install node module using `npm install` and setup environment variables and MongoDB and ensure MongoDB instance is running suceessfully.
- To start the application in development mode using `npm run start:dev`.

# Features

- User Registration and Login:

* Users can register and login to the system using their email and password.

- Room Management:

* Admin can add, edit, and delete meeting rooms.
* user can access all romms.

- Booking Slots:

* Admin can set available booking slots for each room.
* User can book a room for a specific time slot.

- Manage Bookings:

* User can add their bookings and check their own bookings.
* Admin can view all bookings, also can update and delete any single booking.

- Technologies Used

* Backend: Node.js, Express.js, Mongoose
* Authentication: JWT (JSON Web Token)
* Environment Management: dotenv
* Validation: Zod
