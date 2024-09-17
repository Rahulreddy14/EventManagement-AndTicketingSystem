# 🚀 Event Management and Ticketing System

## Overview

Welcome to the **Event Management and Ticketing System**, a scalable solution built using a microservices architecture. This project allows users to create events, manage tickets, and receive notifications seamlessly.

## 🛠️ Technology Stack

This project is built using the **MERN Stack**:

- **MongoDB**: A NoSQL database used for storing user, event, and ticket information.
- **Express.js**: A web application framework for Node.js, used to build the backend services.
- **React**: A JavaScript library for building the user interface of the frontend application.
- **Node.js**: A JavaScript runtime used to build the backend services.

## Architecture

The system is divided into multiple microservices, each responsible for a specific domain:

- **User Service**: Manages user registration, authentication, and profiles.
- **Event Service**: Handles event creation, updates, and listings.
- **Ticket Service**: Manages ticket sales, availability, and reservations.
- **Notification Service**: Sends notifications to users about events and ticket purchases.

## Frontend

The frontend is a single-page application built with **React** that interacts with the backend services via RESTful APIs.

## Backend

Each microservice is an independent application with its own database and API endpoints. The services communicate with each other over HTTP or messaging queues.

## 🌐 API Endpoints

### User Service

- `POST /users/register`: Register a new user.
- `POST /users/login`: Authenticate a user.
- `GET /users/profile`: Retrieve user profile information.

### Event Service

- `POST /events`: Create a new event.
- `GET /events`: List all events.
- `GET /events/{id}`: Retrieve details of a specific event.

### Ticket Service

- `POST /tickets`: Purchase a ticket.
- `GET /tickets/{eventId}`: List tickets for a specific event.

### Notification Service

- `POST /notifications/send`: Send a notification to a user.
- `GET /api/notifications/{userId}:` Retrieve all notifications for a specific user.

## 🚀 Getting Started

1. **Clone the Repository:**
   ```bash
   git clone [repository-url]
