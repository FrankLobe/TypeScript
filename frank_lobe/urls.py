from django.contrib import admin
from django.urls import path
from django.views.generic.base import RedirectView
from my_resume import api_views
from my_resume import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin', RedirectView.as_view(url = '/admin/')),
    path('', views.index),
    path('certification', views.certification),
    path('certification/', RedirectView.as_view(url = '/certification')),
    path('contact', views.contact),
    path('contact/', RedirectView.as_view(url = '/contact')),
    path('coverletter', views.coverletter),
    path('coverletter/', RedirectView.as_view(url = '/coverletter')),
    path('education', views.education),
    path('education/', RedirectView.as_view(url = '/education')),
    path('employment', views.employment),
    path('employment/', RedirectView.as_view(url = '/employment')),
    path('experience', views.experience),
    path('experience/', RedirectView.as_view(url = '/experience')),
    path('home', views.index),
    path('home/', RedirectView.as_view(url = '/home')),
    path('skill', views.skill),
    path('skill/', RedirectView.as_view(url = '/skill')),
    path('api/certification/', api_views.CertificationList.as_view()),
    path('api/education/', api_views.EducationList.as_view()),
    path('api/employment/', api_views.EmploymentList.as_view()),
    path('api/experience/', api_views.ExperienceList.as_view()),
    path('api/page/', api_views.PageList.as_view()),
    path('api/pageparagraph/', api_views.PageParagraphList.as_view()),
    path('api/skill/', api_views.SkillList.as_view()),
]
