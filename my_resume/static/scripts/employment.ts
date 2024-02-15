interface EmploymentPoint {
    id: number;
    employment_id: number;
    display_order: number;
    point_content: string;
}

interface Employment {
    attachment: string;
    attachment_description: string;
    company_name: string;
    date_range: string;
    display_order: number;
    employment_points: EmploymentPoint[]
    id: number;
    logo: string;
    page_id: number;
    telephone: string;
    title: string;
    url: string;
}

class EmploymentPage {

    static employments: Employment[] | null = null;

    static getEmploymentPoints(employmentPoints: EmploymentPoint[]): string {
        return employmentPoints.map(employmentPoint =>
            `<li class="list-group-item">${employmentPoint.point_content}</li>`
          ).join('');
    }

    static getFormattedContent(employment: Employment): string {

        let formattedContent = `
        <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12">
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <p>${ employment.date_range }</p>
        </div>
        </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12">
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <h3>${ employment.title }</h3>
        </div>
        </div>`;

        if (employment.url !== '') {
            formattedContent += `
            <div class="row">
            <div class="lead mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <a class="text-primary align-middle" href="${employment.url}" target="_blank">
            <img class="img-fluid mt-3" alt="logo" src="/static/images/${employment.logo}" />
            </a>
            </div>
            </div>`;
        }
        else {
            formattedContent += `
            <div class="row">
            <div class="lead mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <img class="img-fluid mt-3" alt="logo" src="/static/images/${employment.logo}" />
            </div>
            </div>`;
        }

        if (employment.telephone !== '') {
            formattedContent += `
            <address>
            <div class="row">
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 font-weight-bold text-lg-right text-md-right text-sm-left text-xl-right">
            <p>Telephone:</p>
            </div>
            <div class="col-xl-10 col-lg-9 col-md-8 col-sm-7">
            <p>${employment.telephone}</p>
            </div>
            </div>
            </address>`;
        }

        formattedContent += `
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <ul class="list-group">`;

        formattedContent += EmploymentPage.getEmploymentPoints(employment.employment_points); 

        formattedContent += `
        </ul>`;

        if (employment.attachment !== '') {
            formattedContent += `
            <br />
            <p>
            <a class="lead text-secondary" href="/static/${employment.attachment}" target="_blank">${employment.attachment_description}</a>
            </p>`;
        }

        formattedContent += `
        </div>
        </div>
        </div>
        </div>
        <hr>`;

        return formattedContent;
    }

    static async getEmployments(): Promise<Employment[]> {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/employment/');

            if (!response.ok) {
                throw new Error(`Error retrieving employments: ${response.status} ${response.statusText}`);
            }

            return response.json();
        } catch (error) {
            console.error('Failed to fetch employments:', error);
            throw error;
        }
    }

    static async initializePage(): Promise<void> {
        this.employments = await this.getEmployments();
    }
}

EmploymentPage.initializePage().then(() => {
    const employmentContent = document.getElementById('employment') as HTMLDivElement;

    if (EmploymentPage.employments) {
        const pageContent = EmploymentPage.employments.map(employment => EmploymentPage.getFormattedContent(employment)).join('');
        employmentContent.innerHTML = `
        <header>
        <h2 class="mb-4">Employment</h2>
        <p class="lead">API JSON
        <a href="./api/employment" class="p-3">
        <i class="fas fa-external-link-alt">
        </i>
        </a>
        </p>
        </header>
        <article>${pageContent}</article>`;
    } else {
        console.error('Employments not initialized.');
    }
}).catch(error => {
    console.error('An error occurred:', error);
});
