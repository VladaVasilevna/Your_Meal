from django import forms
from .models import Order

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = [
            'name', 'phone', 'email', 'street', 'house', 'building',
            'apartment', 'entrance', 'floor', 'comment'
        ]
        widgets = {
            'comment': forms.Textarea(attrs={'rows': 2}),
        }
