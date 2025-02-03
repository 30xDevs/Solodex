from django.shortcuts import render
from django.http import JsonResponse
from .models import Person, Description, Relationships, Aspirations
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

from django.middleware.csrf import get_token
from django.http import JsonResponse

from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.handlers.wsgi import WSGIRequest
import json
import global_vars as global_vars

# import sys
# sys.path.append('..')
# from ..manage import ollama_process_object

def get_csrf_token(request):
    csrf_token = get_token(request)  # Generates or retrieves the CSRF token
    return JsonResponse({"csrfToken": csrf_token})


class PersonSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 
                  'gender', 'description',
                  'aspirations']
        
class PersonViewSet(ModelViewSet):
    """ Allows to create or destroy a person object without configuring anything."""
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    def list(self, request, *args, **kwargs):
        """All classes that are derived from ModelViewSet can be equipped with several methods that are called 
        automatically by the viewset. The list method is called when the viewset is accessed using the GET method."""
        # Log the GET request
        persons = Person.objects.all()
        data = [{"first_name": person.first_name, "last_name": person.last_name} for person in persons]
        print(data)
        return super().list(request, *args, **kwargs)
    

@csrf_exempt
def add_person(request):
    """ Add a person to the database when the + button is clicked within the add_person.html page.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        gender = data.get('gender')
        description = data.get('description')
        aspirations = data.get('aspirations')

        person = Person(
            first_name=first_name,
            last_name=last_name,
            gender=gender,
            description=description,
            # description=Description(text=description),
            aspirations=aspirations
        )
        person.save()
        return JsonResponse({'status': 'success', 'message': 'Person added successfully'})

    return JsonResponse({'status': 'error', 'message': f'Invalid request method, method was {request.method}'})


@api_view(['GET'])
def verify_person(request):
    """Ran when the verify button is clicked page."""
    persons = Person.objects.all()
    data = [{"first_name": person.first_name, "last_name": person.last_name} for person in persons]
    print(data)
    return Response(data)


@csrf_exempt
def process_description(request : WSGIRequest):
    """Ran when the save button is clicked on AddPersonButton.tsx"""
    print("clicked")

    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': f"Invalid request method, method was {request.method}"}, status=400)

    # else
    from ast import literal_eval
    data : dict = literal_eval(request.body.decode('utf-8'))
    print(data)
    description = data.get('description', '')

    prompt_engineering = "<---- please take this and write it as semi structured data\
        (i.e.) JSON. Just the description without name. Please just output the json text, nothing else"

    # Send the description to the ollama process
    try:
        if global_vars.ollama_process_object:
            global_vars.ollama_process_object.stdin.write(description + prompt_engineering)
            global_vars.ollama_process_object.stdin.flush()
            print("Description sent to ollama")
            response = global_vars.ollama_process_object.stdout.readline().strip()

            print(response)

            return JsonResponse({'processed_description': response})

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': f'Failed to process description: {e}'}, status=500)
