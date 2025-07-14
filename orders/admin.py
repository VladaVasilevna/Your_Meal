from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'phone', 'email', 'street', 'house', 'building',
        'apartment', 'entrance', 'floor', 'total', 'delivery', 'created_at'
    )
    search_fields = ('name', 'phone', 'email', 'street')
    list_filter = ('created_at',)
    readonly_fields = ('total', 'delivery', 'created_at')
