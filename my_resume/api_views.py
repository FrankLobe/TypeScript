from rest_framework.generics import ListAPIView
from .serializers import CertificationSerializer, EducationSerializer, EmploymentSerializer, ExperienceSerializer, PageSerializer, PageParagraphSerializer, SkillSerializer
from .models import Certification, Education, Employment, Experience, Page, PageParagraph, Skill

class CertificationList(ListAPIView):
    
    page = Page.objects.get(page_name = 'certification')

    queryset = Certification.objects.filter(page_id = page.id).order_by('display_order')
    serializer_class = CertificationSerializer
    
class EducationList(ListAPIView):
    
    page = Page.objects.get(page_name = 'education')

    queryset = Education.objects.filter(page_id = page.id).order_by('display_order')
    serializer_class = EducationSerializer

class EmploymentList(ListAPIView):
    
    page = Page.objects.get(page_name = 'employment')

    queryset = Employment.objects.filter(page_id = page.id).order_by('display_order')
    serializer_class = EmploymentSerializer    

class ExperienceList(ListAPIView):
    
    page = Page.objects.get(page_name = 'experience')

    queryset = Experience.objects.filter(page_id = page.id).order_by('display_order')
    serializer_class = ExperienceSerializer

class PageList(ListAPIView):
    
    queryset = Page.objects.all()
    serializer_class = PageSerializer    

class PageParagraphList(ListAPIView):
    
    page = Page.objects.get(page_name = 'index')

    queryset = PageParagraph.objects.filter(page_id = page.id).order_by('display_order')
    serializer_class = PageParagraphSerializer

class SkillList(ListAPIView):
    
    page = Page.objects.get(page_name = 'skill')

    queryset = Skill.objects.filter(page_id = page.id).order_by('display_order')
    serializer_class = SkillSerializer    