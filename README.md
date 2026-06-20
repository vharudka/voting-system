# Voting System
A simple voting application built with JavaScript and Node.js 

## Prerequisites
- Node.js

## Run the Server
```
cd "voting-system\src"
node server.js
```

Then open your browser and go to:
```
http://localhost:3000/login.html
```

## Login With Seeded Users
Application comes with pre‑created users and votings.
These accounts allow you to explore the system immediately without registering new users

| Role	| Username | Password|
|-------|----------|---------|
| Admin	| admin	   | 123123  |
| User	| user1	   | 123123  |

## User Roles
After logging in with one of the seeded accounts, the application allows different actions depending on your role

### Admin
- Create new votings
- Edit votings
- View all votings
- View all users
- Cast Vote (only if assigned to the voting)
- View Charts

### User
- View all assigned votings
- Cast Vote (only if assigned to the voting)

## How to Use the Application

### Registration
Allows new users to create an account. Every newly registered user is automatically assigned the User role
- Enter login - must be at least 3 chars long
- Enter password - must be at least 6 chars long

### Login
Allows existing users to access application
- Enter login - must be at least 3 chars long
- Enter password - must be at least 6 chars long

### Votings Page (Home Page)
After logging in, the app provides a list of available votings based on role:
- Admin - can see all votings in the application
- User - can only see votings that are assigned to the user

### Create Voting (Admin Only)
Admins can create new votings using this page
- Enter a voting title - must be at least 3 chars long
- Add options - must have at least 2
- Select users that will be assigned - must have at least 2

### Update Voting (Admin Only)
Admins can update existing votings
- Update voting title - must be at least 3 chars long
- Add or remove options - must have at least 2
- Select or unselect users that will be assigned - must have at least 2

### Voting Page
On this page app provides a different options based on role:
#### User
- See voting title, options and assigned users (only if user assigned to the voting)
- Cast a vote (user can only cast vote once and only if he is assigned to it)
#### Admin
- See voting title, options, assigned users and result with charts (charts are displayed only if at least 2 users have voted)
- Cast a vote (admin can only cast vote once and only if he is assigned to it)
