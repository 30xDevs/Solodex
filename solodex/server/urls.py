from django.urls import path, include
from rest_framework import routers
from .views import PersonViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'person', PersonViewSet) #

urlpatterns = [
    # endpoint for person management
    path('', include(router.urls)),
    # API testing and admin,
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # endpoint for adding a person
    path('add_person/', views.add_person, name='add_person'), 
    # endpoint for the add_person.html submission. New person to DB
    # path('submit_form/', views.submit_form, name='submit_form'), 
    
    # endpoint for fetching the csrf token, since it may not be stored in cookies using electron
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),

    # endpoint for verifying data insertion
    path('verify_person/', views.verify_person, name='verify_person'),
]
