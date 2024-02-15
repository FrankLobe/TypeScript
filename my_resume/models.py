from django.db import models

class Page(models.Model):
    page_name = models.CharField(max_length=15, default='', blank=True)
    page_title = models.CharField(max_length=30, default='Frank Lobe')

    def __str__(self):
        return self.page_name

class Certification(models.Model):
    page_id = models.ForeignKey(Page, on_delete=models.CASCADE)
    display_order = models.IntegerField(default=0)
    certification_description = models.CharField(max_length=100, default='')
    certification_institution = models.CharField(max_length=50, default='')
    url = models.CharField(max_length=100, default='', blank=True)
    year = models.IntegerField(default=0)

    def __str__(self):

        display_string = '{} - {} - {}'.format(self.certification_institution, self.year, self.display_order)

        return display_string

class Contact(models.Model):

    first_name = models.CharField(max_length=50, default='', blank=True)
    last_name = models.CharField(max_length=50, default='', blank=True)
    title = models.CharField(max_length=50, default='', blank=True)
    online_profile = models.CharField(max_length=50, default='', blank=True)
    email_address = models.CharField(max_length=50, default='', blank=True)
    telephone_number = models.CharField(max_length=50, default='', blank=True)
    company_name = models.CharField(max_length=50, default='', blank=True)
    company_website = models.CharField(max_length=50, default='', blank=True)
    company_address = models.CharField(max_length=50, default='', blank=True)
    city = models.CharField(max_length=50, default='', blank=True)
    province = models.CharField(max_length=50, default='', blank=True)
    postal_code = models.CharField(max_length=50, default='', blank=True)
    position_title = models.CharField(max_length=50, default='', blank=True)
    country = models.CharField(max_length=50, default='', blank=True)
    job_posting = models.CharField(max_length=50, default='', blank=True)
    job_type = models.CharField(max_length=50, default='', blank=True)

    def __str__(self):

        display_string = '{} {}'.format(self.first_name, self.last_name)

        return display_string

class Education(models.Model):
    page_id = models.ForeignKey(Page, on_delete=models.CASCADE)
    display_order = models.IntegerField(default=0)
    logo = models.CharField(max_length=30, default='', blank=True)
    program = models.CharField(max_length=30, default='', blank=True)
    url = models.CharField(max_length=100, default='', blank=True)
    year = models.IntegerField(default=0)

    def __str__(self):
        return self.program

class Employment(models.Model):
    page_id = models.IntegerField(default=0)
    attachment = models.CharField(max_length=50, default='', blank=True)
    attachment_description = models.CharField(max_length=100, default='', blank=True)
    company_name = models.CharField(max_length=50, default='', blank=True)
    date_range = models.CharField(max_length=30, default='', blank=True)
    display_order = models.IntegerField(default=0)
    logo = models.CharField(max_length=30, default='', blank=True)
    title = models.CharField(max_length=100, default='', blank=True)
    url = models.CharField(max_length=100, default='', blank=True)
    telephone = models.CharField(max_length=30, default='', blank=True)

    def __str__(self):
        return self.company_name

class EmploymentPoint(models.Model):
    employment_id = models.ForeignKey(Employment, on_delete=models.CASCADE)
    display_order = models.IntegerField(default=0)
    point_content = models.TextField(default='', blank=True)

    def __str__(self):

        display_string = '{} - {}'.format(self.employment_id, self.display_order)

        return display_string

class Experience(models.Model):
    page_id = models.ForeignKey(Page, on_delete=models.CASCADE)
    display_order = models.IntegerField(default=0)
    experience_description = models.CharField(max_length=100, default='')
    url = models.CharField(max_length=100, default='', blank=True)
    
    def __str__(self):

        display_string = '{} - {}'.format(self.experience_description, self.display_order)

        return display_string

class ExperienceParagraph(models.Model):
    experience_id = models.ForeignKey(Experience, on_delete=models.CASCADE)
    display_order = models.IntegerField(default=0)
    paragraph_content = models.TextField(default='', blank=True)

    def __str__(self):

        display_string = '{} - {}'.format(self.experience_id, self.display_order)

        return display_string

class PageParagraph(models.Model):
    page_id = models.ForeignKey(Page, on_delete=models.CASCADE)
    display_order = models.IntegerField(default=0)
    paragraph_content = models.TextField(default='', blank=True)

    def __str__(self):

        display_string = '{} - {}'.format(self.page_id, self.display_order)

        return display_string

class Skill(models.Model):
    page_id = models.ForeignKey(Page, on_delete=models.CASCADE)
    display_order = models.IntegerField(default=0)
    skill_content = models.CharField(max_length=30, default='', blank=True)
    job_type = models.CharField(max_length=50, default='', blank=True)

    def __str__(self):

        display_string = '{} - {} - {}'.format(self.skill_content, self.job_type, self.display_order)

        return display_string
