# To Do List App ![Firebase CI](https://github.com/akash568/toDoApp/actions/workflows/main.yml/badge.svg?branch=main)

# Specifications

Node Version : 14.21.2
Angular Version : 13

# Description

This project is simple todolist web app built upon angular.
This contains various features such as,
1. Adding toDo list with dueDate, attachments.
2. Updating toDo list item.
3. Deleting toDo list item.

# Run Project

1. Run `npm i`
2. Run `npm run start:json` - starts json server ( no need to install json-server externally as it is added in dev dependency )
3. Run `npm run start` - starts angular server on port 4200

# Run unit tests

- Run `npm run test` - this will run all test cases
- Run `npm run test:watch` - this will run test cases with watch mode

# Project Structure

- app (App module)
    - models (Interfaces)
    - services (Root services)
    - shared (Shared module)
    - store (Root store)
    - toDo (ToDo module)
        - add-update-list (Add or update lists)
        - list (Main list comopnent)
        - list-detail (Shows list details where user can download attachments)
        - models (Interfaces)
        - state (Feature store for toDo module)
    - utility ( Any static functions that could be reused )
