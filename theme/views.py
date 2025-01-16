from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import PaidMember
from django.conf import settings
from .decorators import api_key_required
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .forms import CustomLoginForm

def home(request):
    print(settings.API_KEY)
    return render(request, 'home.html', {}) 


# GET View
@api_key_required
def get_paid_members(request):
    if request.method == 'GET':
        members = list(PaidMember.objects.values())
        return JsonResponse({"members": members}, status = 200)
    return JsonResponse({"error": "Method not allowed"}, status = 405)

# POST View
@csrf_exempt
@api_key_required
def create_paid_member(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            member = PaidMember.objects.create(
                email = data["email"],
                renewal_date = data["renewal_date"],
                canceled = False,
            )
            return JsonResponse({"id": member.id, "message": "Member created"}, status = 201)
        except Exception as e:
            return JsonResponse({"error": "Method not allowed"}, status = 405)
        
# DELETE View
@csrf_exempt
@api_key_required
def delete_paid_member(request, email):
    if request.method == "DELETE":
        try:
            member = PaidMember.objects.get(email=email)
            member.delete()
            return JsonResponse({"message": f"Member {email} deleted"}, status = 200)
        except PaidMember.DoesNotExist:
            return JsonResponse({"error": "Member not found"}, status = 404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status = 400)
    return JsonResponse({"error": "Method not allowed"}, status = 405)

@csrf_exempt
@api_key_required
def patch_paid_member(request):
    if request.method == "PATCH":
        try:
            data = json.loads(request.body)
            email = data["email"]
            canceled = data["canceled"]
            failedPayment = data["failed_payment"]
            if not email:
                return JsonResponse({"error": "Email is required"}, status = 400)
            if not canceled and not failedPayment:
                return JsonResponse({"error": "Boolean field required"}, status = 400)
            member = PaidMember.objects.get(email=email)
            if canceled:
                member.canceled = canceled
            if failedPayment:
                member.failed_payment = failedPayment
            member.save()
            return JsonResponse({"message": f"Member {email} updated"}, status = 200)
        except PaidMember.DoesNotExist:
            return JsonResponse({"error": "Member not found"}, status = 404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status = 400)
    return JsonResponse({"error": "Method not allowed"}, status = 405)

@login_required
def adminpanel(request):
    return render(request, 'adminpanel.html', {})


def login_view(request):
    if request.method == 'POST':
        form = CustomLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('/adminconsole')
    else:
        form = CustomLoginForm()

    return render(request, 'login.html', {'form': form})


def privacy(request):
    return render(request, 'privacy.html')

def terms(request):
    return render(request, 'terms.html')