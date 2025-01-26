from django.shortcuts import render
from django.http import JsonResponse
from .models import Person, Description, Relationships, Aspirations
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

from django.middleware.csrf import get_token
from django.http import JsonResponse

def get_csrf_token(request):
    csrf_token = get_token(request)  # Generates or retrieves the CSRF token
    return JsonResponse({"csrfToken": csrf_token})


@csrf_exempt
def add_person(request):
    """ Add a person to the database when the + button is clicked within the add_person.html page.
    """
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        gender = request.POST.get('gender')
        description_id = request.POST.get('description_id')
        relationships_id = request.POST.get('relationships_id')
        aspirations_id = request.POST.get('aspirations_id')

        description = Description.objects.get(id=description_id)  # pylint: disable=no-member
        relationships = Relationships.objects.get(id=relationships_id)  # pylint: disable=no-member
        aspirations = Aspirations.objects.get(id=aspirations_id)  # pylint: disable=no-member

        person = Person(
            first_name=first_name,
            last_name=last_name,
            gender=gender,
            description=description,
            relationships=relationships,
            aspirations=aspirations
        )
        person.save()
        return JsonResponse({'status': 'success', 'message': 'Person added successfully'})

    return JsonResponse({'status': 'error', 'message': f'Invalid request method, method was {request.method}'})
