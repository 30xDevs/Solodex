from django.shortcuts import render
from django.http import JsonResponse
from .models import Person, Description, Relationships, Aspirations

def add_person(request):
    """ Add a person to the database when the + button is clicked 
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

    return render(request, 'add_person.html')
