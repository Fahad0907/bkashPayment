from django.urls import path
from Main import views

urlpatterns = [
    path('bkash/create', views.BkashPay.as_view(), name='bkash_create'),
    path('bkash/payment/callback', views.BkashCallback.as_view(), name='bkash_callback')
]
