# Django Setup

Within the root of the repo, (with my poetry .venv activated) I ran: `django-admin startproject solodex`

Then the repo looks something like this (using `tree .`):
.
├── README.md
├── manage.py
├── myapp
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
└── solodex
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-313.pyc
    │   └── settings.cpython-313.pyc
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py

Navigate to `./solodex` and run `python manage.py startapp myapp` to create the `./myapp`

# Solodex

Make any necessary migrations with Django and ensure that the server is running (in testing) via `python manage.py runserver`
to expose the Django endpoints for the rest of the application to see (which it does so via localhost in development).

## Setting up the Electron Frontend

1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Navigate to the `frontend` directory:
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

