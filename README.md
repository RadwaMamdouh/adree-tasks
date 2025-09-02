# TaskDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.

## Description

This is a simple Angular application for task management. It allows users to add, edit, and delete tasks, with tasks being saved in local storage. The app features:

- CRUD operations on tasks
- Task categories (Dev, Test, UI, Db)
- Task statuses (New, Active, Closed)
- A responsive and user-friendly interface

This application was built using Angular and follows a modular architecture for scalability.

## Features:

- **Add Task**: Create new tasks with details like title, description, due date, etc.
- **Edit Task**: Modify existing tasks.
- **Delete Task**: Remove tasks from the list.
- **Task Status**: Update task status (New, Active, Closed).
- **Local Storage**: Task data is stored in the browser's local storage to persist after page refresh.

## Project Setup

Clone the repository to your local machine:

```bash
 git clone https://github.com/your-username/task-management-angular.git
 cd task-management-angular
```

## Install

Install the project dependencies:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Architecture and Design Decisions

This Angular application follows a **component-based** architecture. Key decisions include:

- **TaskService**:

  - Responsible for managing the tasks. It uses `BehaviorSubject` to ensure the application state is reactive and can be subscribed to by any component.
  - Task data is persisted to **local storage** to ensure that the tasks remain available even after the app is refreshed.

- **Task Component**:

  - Responsible for rendering the tasks in a table and providing the functionality to add, edit, or delete tasks.
  - Uses Angular's reactive forms for task creation and editing.

- **Responsive Design**:

  - The app uses **PrimeNG** for UI components, which provides a set of pre-styled components.
  - The layout is made responsive using Flexbox and other CSS strategies to work well on both desktop and mobile devices.

- **Local Storage**:

  - Tasks are saved to the browser's local storage, allowing the data to persist between sessions.

- **State Management**:
  - We use a simple in-memory state management system (via `BehaviorSubject` in the service) to maintain the state of tasks.

## Screenshots

## Task List:

![Task List Screenshot](./img/task-list-screenshot.png)

## Task Edit Dialog:

![Task Edit Screenshot](./img/task-edit-screenshot.png)

## Dashboard:

![Task Edit Screenshot](./img/dashboard-screenshot.png)ß

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
