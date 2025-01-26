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

