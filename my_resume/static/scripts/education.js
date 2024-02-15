"use strict";
class EducationPage {
    static educations = null;
    static getFormattedContent(education) {
        return `
        <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12">
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <p>${education.year}</p>
        </div>
        </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12">
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <h3>${education.program}</h3>
        </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <a class="text-primary align-middle pt-5" href="${education.url}" target="_blank">
        <img class="img-fluid mt-3" alt="logo" src="/static/images/${education.logo}" />
        </a>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
        </div>
        </div>
        </div>`;
    }
    static async getEducations() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/education/');
            if (!response.ok) {
                throw new Error(`Error retrieving educations: ${response.status} ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Failed to fetch educations:', error);
            throw error;
        }
    }
    static async initializePage() {
        this.educations = await this.getEducations();
    }
}
EducationPage.initializePage().then(() => {
    const educationContent = document.getElementById('education');
    if (EducationPage.educations) {
        const pageContent = EducationPage.educations.map(education => EducationPage.getFormattedContent(education)).join('');
        educationContent.innerHTML = `
        <header>
        <h2 class="mb-4">Education</h2>
        <p class="lead">API JSON
        <a href="./api/education" class="p-3">
        <i class="fas fa-external-link-alt">
        </i>
        </a>
        </p>
        </header>
        <article>${pageContent}</article>`;
    }
    else {
        console.error('Educations not initialized.');
    }
}).catch(error => {
    console.error('An error occurred:', error);
});
