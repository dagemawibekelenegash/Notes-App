from django.http import HttpResponse


def home_view(request):
    return HttpResponse("<h1> <center> This is Notes-App Backend <center/><h1/>")
