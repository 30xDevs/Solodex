from django.urls import path
from . import views

urlpatterns = [
    # endpoint for adding a person
    path('add_person/', views.add_person, name='add_person'), 
    # endpoint for the add_person.html submission. New person to DB
    path('submit_form/', views.submit_form, name='submit_form'), 
    # endpoint for fetching the csrf token, since it may not be stored in cookies using electron
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),
]
