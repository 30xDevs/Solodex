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
import time
import re

from ollama import chat
from ollama import ChatResponse

from ast import literal_eval

# import sys
# sys.path.append('..')
# from ..manage import ollama_process_object

def get_csrf_token(request):
    csrf_token = get_token(request)  # Generates or retrieves the CSRF token
    return JsonResponse({"csrfToken": csrf_token})


class PersonSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'first_name', 'last_name', 
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
    
    async def create(self, request : WSGIRequest, *args, **kwargs):
        """Ran when the save button is clicked on AddPersonButton.tsx
        
        Parameters
        -----------
        request : `WSGIRequest` """

        # recall that `request` has the fields defined in "AddPersonButton.tsx"
        # data : dict = literal_eval(request.body.decode('utf-8'))

        Person.objects.create(
            first_name = request.body.first_name,
            last_name = request.body.last_name,
            gender = request.body.gender,
            information = await _process_information(request.body.information)
        )
        return JsonResponse({'message': f'Person {request.body.first_name} {request.body.last_name}'}, status = 200)



async def _process_information(information_raw : str) -> str:

    if information_raw == '':
        return information_raw
    
    prompt_engineering = "<---- Take this and write it as semi structured data\
        (JSON). Output the json text, nothing else"

    response : ChatResponse = chat(model='llama3.2', messages=[
    {
        'role': 'user',
        'content': information_raw + prompt_engineering,
    },
    ])

    # Access fields directly from the response object
    raw_llm_output : str = response.message.content

    return extract_json_from_string(raw_llm_output)



def extract_json_from_string(large_string) -> dict | None:
    """Extract JSON from raw strings.
    
    For use in LLM responses.
    
    Parameters
    -----------
    large_string : `str` 
        Raw output
        
    Returns
    ---------
    json_dict : `dict`
        Dictionary with the information compiled into
        JSON format
    """
    # Regular expression to find JSON substring
    json_pattern = re.compile(r'\{.*?\}')
    match = json_pattern.search(large_string)
    
    if match:
        json_string = match.group()
        try:
            # Convert JSON string to dictionary
            json_dict = json.loads(json_string)
            return json_dict
        except json.JSONDecodeError as e:
            print(f"Failed to decode JSON: {e}")
            return None
    else:
        print("No JSON substring found")
        return None
    

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


