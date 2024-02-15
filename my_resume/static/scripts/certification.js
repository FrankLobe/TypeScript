"use strict";
class CertificationPage {
    static certifications = null;
    static getFormattedContent(certification) {
        let formattedContent = `
        <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12">
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <p>${certification.year}</p>
        </div>
        </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <p class="h4">${certification.certification_institution}</p>
        </div>
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <p class="lead">${certification.certification_description}`;
        if (certification.url !== '') {
            formattedContent += `
            <a href="${certification.url}">
            <i class="fas fa-external-link-alt">
            </i>
            </a>`;
        }
        formattedContent += `
        </p>
        </div>
        </div>
        </div>
        </div>`;
        return formattedContent;
    }
    static async getCertifications() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/certification/');
            if (!response.ok) {
                throw new Error(`Error retrieving certifications: ${response.status} ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Failed to fetch certifications:', error);
            throw error;
        }
    }
    static async initializePage() {
        this.certifications = await this.getCertifications();
    }
}
CertificationPage.initializePage().then(() => {
    const certificationContent = document.getElementById('certification');
    if (CertificationPage.certifications) {
        const pageContent = CertificationPage.certifications.map(certification => CertificationPage.getFormattedContent(certification)).join('');
        certificationContent.innerHTML = `
        <header>
        <h2 class="mb-4">Certification</h2>
        <p class="lead">API JSON
        <a href="./api/certification" class="p-3">
        <i class="fas fa-external-link-alt"></i>
        </a>
        </p>
        </header>
        <article>${pageContent}</article>`;
    }
    else {
        console.error('Certifications not initialized.');
    }
}).catch(error => {
    console.error('An error occurred:', error);
});
