"""
URL configuration for solodex project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from server import views, urls # Need this import to get the views with myapp/

urlpatterns = [
    path('api/', include(urls)), # This includes all urls from the server. They are all binned under /api/
    path('admin/', admin.site.urls),
    path('add_person/', views.add_person, name='add_person'), # endpoint for adding a person
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),
        # endpoint for verifying data insertion
    path('verify_person/', views.verify_person, name='verify_person'),
]
