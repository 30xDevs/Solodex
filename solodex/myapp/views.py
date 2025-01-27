"""
    Description: Views (which are functions) are the endpoints that are called when a user makes a request to the server.
"""
from django.shortcuts import render # pylint: disable=unused-import
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie # pylint: disable=unused-import
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.core.exceptions import ObjectDoesNotExist

from .models import Person, Description, Relationships, Aspirations, RelationshipType, personalityTraits # pylint: disable=unused-import

def get_csrf_token(request):
    """ Get the CSRF token for the current session."""
    csrf_token = get_token(request)  # Generates or retrieves the CSRF token
    return JsonResponse({"csrfToken": csrf_token})


@csrf_exempt
def add_person(request):
    """ Add a person to the database when the + button is clicked within the add_person.html page.
    """
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        gender : int = 1 if request.POST.get('gender') == 'M' else 0

        description_id = request.POST.get('description_id')
        description_text = request.POST.get('description_text')
        physical_characteristics = request.POST.get('physical_characteristics')
        # personality_traits_id = request.POST.get('personality_traits')

        relationship_id = request.POST.get('relationship_id')
        relationship_name = request.POST.get('relationship_name')
        relationship_positivity = request.POST.get('relationship_positivity')

        aspirations_id = request.POST.get('aspirations')

        try:
            # personality_traits = personalityTraits.objects.get(id=personality_traits_id)  # pylint: disable=no-member
            description = Description.objects.create(
                id=description_id,
                text=description_text,
                physicalCharacteristics=physical_characteristics,
                personalityTraits=None
            )  # pylint: disable=no-member

            relationship_type = RelationshipType.objects.create(
                id=relationship_id,
                name=relationship_name,
                positivity=relationship_positivity
            )  # pylint: disable=no-member

            relationships = Relationships.objects.create(
                id_in=relationship_id,
                id_out=relationship_id,
                relationship_type=relationship_type,
                areas=None  # TODO: Add appropriate area handling
            )  # pylint: disable=no-member

            # TODO: Flesh this out in the add_person.html form as well as making the class here
            aspirations = Aspirations.objects.create(id=aspirations_id)  # pylint: disable=no-member

        except ObjectDoesNotExist as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

        person = Person(
            first_name=first_name,
            last_name=last_name,
            gender=bool(gender),
            description=description,
            relationships=relationships,
            aspirations=aspirations
        )

        # Use bulk_create to add the person instance to the database
        Person.objects.bulk_create([person]) # pylint: disable=no-member

        return JsonResponse({'status': 'success', 'message': 'Person added successfully'})

    return JsonResponse({'status': 'error', 'message': f'Invalid request method, method was {request.method}'})
