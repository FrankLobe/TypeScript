"use strict";
class IndexPage {
    static pageParagraphs = null;
    static async getPageParagraphs() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/pageparagraph/');
            if (!response.ok) {
                throw new Error(`Error retrieving page paragraphs: ${response.status} ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Failed to fetch page paragraphs:', error);
            throw error;
        }
    }
    static async initializePage() {
        this.pageParagraphs = await this.getPageParagraphs();
    }
}
IndexPage.initializePage().then(() => {
    const indexContent = document.getElementById('index');
    if (IndexPage.pageParagraphs) {
        const pageContent = IndexPage.pageParagraphs.map(pageParagraph => `<p>${pageParagraph.paragraph_content}</p>`).join('');
        indexContent.innerHTML = `<article>${pageContent}</article>`;
    }
    else {
        console.error('Page paragraphs not initialized.');
    }
}).catch(error => {
    console.error('An error occurred:', error);
});
