import stripe
from django.conf import settings
from django.shortcuts import render, redirect
from .forms import OrderForm
from .models import Order
import json

stripe.api_key = settings.STRIPE_SECRET_KEY

def order_create(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        cart_json = request.POST.get('cart_json', '[]')
        try:
            cart = json.loads(cart_json)
        except Exception:
            cart = []
        total = sum(item.get('price', 0) * item.get('count', 1) for item in cart)
        if form.is_valid():
            order = form.save(commit=False)
            order.total = total
            order.delivery = 149 if total < 599 else 0
            order.save()
            # Stripe Checkout Session
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'rub',
                        'product_data': {
                            'name': 'Заказ №%d' % order.id,
                        },
                        'unit_amount': int((order.total + order.delivery) * 100),
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=request.build_absolute_uri('/success/'),
                cancel_url=request.build_absolute_uri('/order/'),
                metadata={'order_id': order.id}
            )
            return redirect(session.url)
    else:
        form = OrderForm()
        total = 0
        delivery = 0
    return render(request, 'orders/order_form.html', {
        'form': form,
        'STRIPE_PUBLISHABLE_KEY': settings.STRIPE_PUBLISHABLE_KEY,
        'total': total,
        'delivery': delivery,
        'total_with_delivery': total + delivery,
    })

def success(request):
    return render(request, 'orders/success.html')
