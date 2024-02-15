from django.shortcuts import render
from .models import Certification, Contact, Education, Employment, Experience, Page, PageParagraph, Skill
from datetime import datetime

def certification(request):    
    
    page = Page.objects.get(page_name = 'certification')
    
    certifications = Certification.objects.filter(page_id = page.id).order_by('display_order')

    return render(request, 'certification.html', {'page_title' : page.page_title, 
                                                  'certifications': certifications})

def contact(request):

    page = Page.objects.get(page_name = 'contact')
    
    contact = Contact()

    error_messages = []

    if request.method == 'POST':

        contact.first_name = request.POST['first_name']
        contact.last_name = request.POST['last_name']
        contact.title = request.POST['title']
        contact.online_profile = request.POST['online_profile']
        contact.email_address = request.POST['email_address']
        contact.telephone_number = request.POST['telephone_number']
        contact.company_name = request.POST['company_name']
        contact.company_website = request.POST['company_website']
        contact.company_address = request.POST['company_address']
        contact.city = request.POST['city']
        contact.province = request.POST['province']
        contact.position_title = request.POST['position_title']
        contact.postal_code = request.POST['postal_code']
        contact.country = request.POST['country']
        contact.job_posting = request.POST['job_posting']
        contact.job_type = request.POST['job_type']

        if contact.company_name == '':
            error_messages.append('Company name is a required value.')
        
        if contact.first_name == '':
            error_messages.append('First name  is a required value.')

        if contact.email_address == '' and contact.telephone_number == '':
            error_messages.append('Email address or telephone number is a required value.')                     

        if len(error_messages) == 0:

            if contact.company_address == '' and \
               contact.city == '' and \
               contact.province == '' and \
               contact.postal_code == '':
               contact.country = ''

            contact.save()

            if contact.job_type == 'Progress OpenEdge 4GL/ABL Application Development':
                resume = 'FrankLobeOE.pdf'
            elif contact.job_type == 'Machine Learning Engineering':
                resume = 'FrankLobeML.pdf'
            elif contact.job_type == 'Website Development':
                resume = 'FrankLobeWD.pdf'

            if contact.company_name == '':
                contact.company_name = 'your company'

            request.session['job_type'] = request.POST['job_type']

            page = Page.objects.get(page_name = 'coverletter')

            return render(request, 'coverletter.html', {'contact' : contact, 
                                                        'page_title': page.page_title, 
                                                        'date' : datetime.now().strftime("%B %d, %Y"),
                                                        'resume' : resume}
                                                        )

    return render(request, 'contact.html', {'contact' : contact, 
                                            'page_title': page.page_title, 
                                            'date' : datetime.now().strftime("%B %d, %Y"),
                                            'error_messages' : error_messages})

def coverletter(request):

    page = Page.objects.get(page_name = 'coverletter')

    return render(request, 'coverletter.html', {'page_title' : page.page_title})

def education(request):

    page = Page.objects.get(page_name = 'education')

    educational_programs = Education.objects.filter(page_id = page.id).order_by('display_order')

    return render(request, 'education.html', {'page_title' : page.page_title, 
                                              'educational_programs' : educational_programs})

def employment(request):

    page = Page.objects.get(page_name = 'employment')

    employments = Employment.objects.filter(page_id = page.id).order_by('display_order')
    
    return render(request, 'employment.html', {'page_title' : page.page_title, 
                                               'employments' : employments})

def experience(request):

    page = Page.objects.get(page_name = 'experience')

    experiences = Experience.objects.filter(page_id = page.id).order_by('display_order')

    return render(request, 'experience.html', {'page_title' : page.page_title, 
                                               'experiences' : experiences})

def index(request):

    page = Page.objects.get(page_name = 'index')

    page_paragraphs = PageParagraph.objects.filter(page_id = page.id).order_by('display_order')

    return render(request, 'index.html', {'page_title' : page.page_title, 
                                          'page_paragraphs': page_paragraphs})

def skill(request):

    page = Page.objects.get(page_name = 'skill')

    session_job_type = request.session.get('job_type')

    if session_job_type == None:
        skills = Skill.objects.filter(page_id = page.id).order_by('display_order')
    else:
        skills = Skill.objects.filter(page_id = page.id, 
                                      job_type = session_job_type).order_by('display_order')

    return render(request, 'skill.html', {'page_title' : page.page_title, 
                                          'skills': skills,
                                          'job_type': session_job_type})
