interface Skill {
  display_order: number;
  id: number;
  job_type: string;
  page_id: number;
  skill_content: string;
}

class SkillPage {
  static skills: Skill[] | null = null;

  static async getSkills(): Promise<Skill[]> {
      try {
          const response = await fetch('http://127.0.0.1:8000/api/skill/');

          if (!response.ok) {
              throw new Error(`Error retrieving skills: ${response.status} ${response.statusText}`);
          }

          return response.json();
      } catch (error) {
          console.error('Failed to fetch skills:', error);
          throw error;
      }
  }

  static async initializePage(): Promise<void> {
      this.skills = await this.getSkills();
  }
}

SkillPage.initializePage().then(() => {
  
  const indexContent = document.getElementById('skill') as HTMLDivElement;

  let job_type = window.sessionStorage.getItem('jobType');

  if (job_type === 'None') {
    job_type = '';
  }

  if (SkillPage.skills) {
    const pageContent = SkillPage.skills
      .filter(skill => skill.job_type === job_type)
      .map(skill => `
      <span class="badge rounded-pill bg-primary col-xl-3 col-lg-3 col-md-5 col-sm-5 m-2 p-2">
      ${skill.skill_content}
      </span>`)
      .join('');
    indexContent.innerHTML = `
      <article>
      <header>
      <h2 class="mb-4">Skill</h2>
      <p class="lead">API JSON
      <a href="./api/skill" class="p-3">
      <i class="fas fa-external-link-alt">
      </i>
      </a>
      </p>
      </header>
      <div class="row">
      <p>      
      ${pageContent}
      </p>
      </div>
      </article>`;
  } else {
    console.error('Skills not initialized.');
  }
}).catch(error => {
  console.error('An error occurred:', error);
});
