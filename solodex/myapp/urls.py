from django.urls import path
from . import views

urlpatterns = [
    path('add_person/', views.add_person, name='add_person'), 
    # endpoint for adding a person
    path('submit_form/', views.submit_form, name='submit_form'), 
    # endpoint for the add_person.html submission. New person to DB
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),

]
