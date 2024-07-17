from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from django.http import HttpResponseRedirect
import global_vars


class BkashPay(APIView):
    def post(self, request):
        req_data = request.data
        id_token = None
        data = {
                "app_key": '4f6o0cjiki2rfm34kfdadl1eqq',
                "app_secret": '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b'
            }
        headers =  {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'username': 'sandboxTokenizedUser02',
                'password': 'sandboxTokenizedUser02@12345'
            }
        url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant'
        result = requests.post(
            url,json=data, headers=headers
        )
        reponse_data = result.json()
        
        
        payment_url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create'
        global_vars.id_token = reponse_data['id_token']
        create_header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': reponse_data['id_token'],
            'X-App-Key': '4f6o0cjiki2rfm34kfdadl1eqq'
        }
        data = {
            'mode': '0011',
            'payerReference': ' ',
            'callbackURL': 'http://127.0.0.1:8000/api/bkash/payment/callback',
            'amount': req_data["amount"],
            'currency': 'BDT',
            'intent': 'sale',
            'merchantInvoiceNumber': 'inv12345'
        }
        create = requests.post(payment_url, json=data, headers=create_header)
        # print(create.json())
        return Response(data=create.json(),status=status.HTTP_200_OK)



class BkashCallback(APIView):
    def get(self, request):
        paymentId = request.GET.get("paymentID")
        status = request.GET.get("status")
       
        if status == 'cancel' or status == 'failure':
            url = 'http://127.0.0.1:5173/error' + '?message=' + status
            return HttpResponseRedirect(url)
        elif status == 'success':
             headers =  {
                'Accept': 'application/json',
                'Authorization': global_vars.id_token,
                'X-App-Key': '4f6o0cjiki2rfm34kfdadl1eqq'
            }
             data = {
                 "paymentID": paymentId
             }
             execute_payment = requests.post('https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute',
                                json=data, headers=headers)
             execute_payment = execute_payment.json()
             if execute_payment['statusCode'] == '0000':
                 return HttpResponseRedirect('http://127.0.0.1:5173/success')
             