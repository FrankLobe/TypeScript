from django.contrib import admin

from .models import Certification, Contact, Education, Employment, EmploymentPoint, Experience, ExperienceParagraph, Page, PageParagraph, Skill

admin.site.register([Certification, 
                     Contact, 
                     Education, 
                     Employment, 
                     EmploymentPoint, 
                     Experience, 
                     ExperienceParagraph, 
                     Page, 
                     PageParagraph, 
                     Skill])
