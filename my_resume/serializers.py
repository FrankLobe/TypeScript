from rest_framework import serializers

from .models import Certification, Education, Employment, EmploymentPoint, Experience, ExperienceParagraph, Page, PageParagraph, Skill

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ('id', 'page_id', 'display_order', 'certification_description', 'certification_institution', 'url', 'year')

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ('id', 'page_id', 'display_order', 'logo', 'program', 'url', 'year') 

class EmploymentPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentPoint
        fields = ('id', 'employment_id', 'display_order', 'point_content')

class EmploymentSerializer(serializers.ModelSerializer):
    
    employment_points = EmploymentPointSerializer(many = True, source='employmentpoint_set')
    
    class Meta:
        model = Employment
        fields = ('id', 'page_id', 'display_order', 'attachment', 'attachment_description', 'company_name', 'date_range', 'logo', 'title', 'url', 'telephone', 'employment_points')

class ExperienceParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceParagraph
        fields = ('id', 'experience_id', 'display_order', 'paragraph_content')

class ExperienceSerializer(serializers.ModelSerializer):
    
    experience_paragraphs = ExperienceParagraphSerializer(many = True, source='experienceparagraph_set')
    
    class Meta:
        model = Experience
        fields = ('id', 'page_id', 'display_order', 'experience_description', 'url', 'experience_paragraphs') 

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('id', 'page_name', 'page_title')

class PageParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageParagraph
        fields = ('id', 'page_id', 'display_order', 'paragraph_content')

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'page_id', 'display_order', 'skill_content', 'job_type')                                
