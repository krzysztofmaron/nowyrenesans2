from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import PaidMember
from django.conf import settings
from .decorators import api_key_required

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
def delete_paid_member(request, pk):
    if request.method == "DELETE":
        try:
            member = PaidMember.objects.get(pk=pk)
            member.delete()
            return JsonResponse({"message": f"Member {pk} deleted"}, status = 200)
        except PaidMember.DoesNotExist:
            return JsonResponse({"error": "Member not found"}, status = 404)
    return JsonResponse({"error": "Method not allowed"}, status = 405)