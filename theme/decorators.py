from django.http import JsonResponse
from django.conf import settings

def api_key_required(view_func):
    def wrapped_view(request, *args, **kwargs):
        api_key = request.headers.get("X-API-Key")
        if api_key != settings.API_KEY:
            return JsonResponse({"error": "Invalid or missing API key"}, status = 403)
        return view_func(request, *args, **kwargs)
    return wrapped_view