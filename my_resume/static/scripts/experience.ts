interface ExperienceParagraph {
    id: number;
    experience_id: number;
    display_order: number;
    paragraph_content: string;
}

interface Experience {
    display_order: number;
    experience_description: string;
    experience_paragraphs: ExperienceParagraph[]
    id: number;
    page_id: number;
    url: string;
}

class ExperiencePage {

    static experiences: Experience[] | null = null;

    static getExperienceParagraphs(experienceParagraphs: ExperienceParagraph[]): string {
        return experienceParagraphs.map(experienceParagraph =>
            `<p>${experienceParagraph.paragraph_content}</p>`
          ).join('');
    }

    static getFormattedContent(experience: Experience): string {

        let formattedContent = `
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <h3>${experience.experience_description}`;

        if (experience.url !== '') {
            formattedContent += `<a class="m-3" href="${experience.url}"><i class="fas fa-external-link-alt lead"></i></a>`;
        }

        formattedContent += `        
        </h3>
        </div>
        </div>
        <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">`;

        formattedContent += ExperiencePage.getExperienceParagraphs(experience.experience_paragraphs); 

        formattedContent += `
        </div>
        </div>
        </div>
        </div>
        <hr>`;

        return formattedContent;
    }

    static async getExperiences(): Promise<Experience[]> {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/experience/');

            if (!response.ok) {
                throw new Error(`Error retrieving experiences: ${response.status} ${response.statusText}`);
            }

            return response.json();
        } catch (error) {
            console.error('Failed to fetch experiences:', error);
            throw error;
        }
    }

    static async initializePage(): Promise<void> {
        this.experiences = await this.getExperiences();
    }
}

ExperiencePage.initializePage().then(() => {
    const experienceContent = document.getElementById('experience') as HTMLDivElement;

    if (ExperiencePage.experiences) {
        const pageContent = ExperiencePage.experiences.map(experience => ExperiencePage.getFormattedContent(experience)).join('');
        experienceContent.innerHTML = `
        <header>
        <h2 class="mb-4">Experience</h2>
        <p class="lead">API JSON
        <a href="./api/experience" class="p-3">
        <i class="fas fa-external-link-alt">
        </i>
        </a>
        </p>
        </header>
        <article>${pageContent}</article>`;
    } else {
        console.error('Experiences not initialized.');
    }
}).catch(error => {
    console.error('An error occurred:', error);
});
