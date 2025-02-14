# Django Root

This directory, `solodex/` is the Django project associated with the repo. 

Within the root of the repo, (with my poetry .venv activated) I ran: `django-admin startproject solodex`

Then the repo looks something like this (using `tree . -L 1`):
``` {bash}
.
├── README.md # The readme
├── __pycache__
├── db.sqlite3 # The local DB, not to be used in production. Use postgres in production
├── frontend # Legacy frontend
├── frontend-tauri # Frontend
├── global_vars.py # Global variables for ollama use
├── manage.py # Handles running of the DB server
├── package-lock.json # Handles packages for frontend
├── server # The Django server. Contains information that is used in the DB
└── solodex-conf # Configuration for the `solodex/` project
```


# Solodex

Make any necessary migrations with Django and ensure that the server is running (in testing) via `python manage.py runserver`
to expose the Django endpoints for the rest of the application to see (which it does so via localhost in development).

## Setting up the Electron Frontend

1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Navigate to the `frontend-tauri` directory:
    ```sh
    cd frontend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the Electron app:
    ```sh
    npm start
    ```

