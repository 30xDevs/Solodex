"""
    Description: Storing the schema of each of our tables in the DB.
"""

from django.db import models

# Create your models here.


class personalityTraits(models.Model):
    """Schema for personality traits."""
    id = models.CharField(max_length=10, primary_key=True)
    text = models.CharField(max_length=100)


class Description(models.Model):
    """Schema for the description of a person."""
    id = models.CharField(max_length=10, primary_key=True)
    text = models.TextField()
    physicalCharacteristics = models.TextField() #TODO: Discuss to detmerine multiple columns
    personalityTraits = models.ForeignKey(personalityTraits, on_delete=models.CASCADE, null=True, default=None)

class RelationshipType(models.Model):
    """Schema for the type of relationship."""
    name = models.CharField(max_length=100)
    id = models.CharField(max_length=10, primary_key=True)
    positivity = models.FloatField()

class Areas(models.Model):
    """Schema for the area/sphere of one's life."""
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=100)

class Relationships(models.Model):
    """Schema for the relationships between people."""
    id_in = models.CharField(max_length=10)
    id_out = models.CharField(max_length=10)
    relationship_type = models.ForeignKey(RelationshipType, on_delete=models.CASCADE)
    areas = models.ForeignKey(Areas, on_delete=models.CASCADE, null=True, default=None)

class Aspirations(models.Model):
    """Schema for the aspirations of a person."""
    id = models.CharField(max_length=10, primary_key=True)
    aspiration_type = None # TODO: Add AspirationType model
    aspiration_drive = None #TODO: Add AspirationDrive model which is a float/integer that represent how mucha person wants this aspiration

class Person(models.Model):
    """Schema for a person."""
    id = models.CharField(max_length=10, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.BooleanField()
    description = models.ForeignKey(Description, on_delete=models.CASCADE)
    relationships = models.ForeignKey(Relationships, on_delete=models.CASCADE)
    # age = models.IntegerField()
    # email = models.EmailField()
    # phone = models.CharField(max_length=15)
    # address = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    aspirations = models.ForeignKey(Aspirations, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.first_name} {self.last_name}"
