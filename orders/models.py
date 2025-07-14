from django.db import models

class Order(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    street = models.CharField(max_length=100)
    house = models.CharField(max_length=10)
    building = models.CharField(max_length=10, blank=True, null=True)
    apartment = models.CharField(max_length=10, blank=True, null=True)
    entrance = models.CharField(max_length=10, blank=True, null=True)
    floor = models.CharField(max_length=10, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    total = models.DecimalField(max_digits=8, decimal_places=2)
    delivery = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
