from django.urls import path, include
from rest_framework import routers
from .views import PersonViewSet
from . import views

# Routers provide an easy way of automatically determining the URL conf. 
router = routers.DefaultRouter()
router.register(r'person', PersonViewSet)

urlpatterns = [
    # endpoint for person management
    path('', include(router.urls)),
    # API testing and admin,
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # endpoint for adding a person
    path('add_person/', views.add_person, name='add_person'), 

]
