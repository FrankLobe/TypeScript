interface iContactField {
    getContactField: string;
    getContactLabel: string;
    getContactValue: string;
    getMandatory: boolean;
}

class ContactField implements iContactField {

    private readonly contactField: string;
    private readonly contactLabel: string;
    private readonly contactValue: string;
    private readonly mandatory: boolean;

    get getContactField(): string {
        return this.contactField;
    }

    get getContactLabel(): string {
        return this.contactLabel;
    }

    get getContactValue(): string {
        return this.contactValue;
    }

    get getMandatory(): boolean {
        return this.mandatory;
    }

    constructor(contactField: string, contactLabel: string, contactValue: string, mandatory: boolean) {
        this.contactField = contactField;
        this.contactLabel = contactLabel;
        this.contactValue = contactValue;
        this.mandatory = mandatory;
    }
}

interface iErrorMessage {
    getContactField: ContactField;
    getErrorMessageContent: string;
    getFormattedMessageContent: string;
}

class ErrorMessage implements iErrorMessage {

    private readonly contactField: ContactField;

    get getContactField(): ContactField {
        return this.contactField;
    }

    get getErrorMessageContent() {
        return `ERROR: ${this.contactField.getContactLabel} is a required value.`;
    }

    get getFormattedMessageContent() {
        return `<p class="alert alert-danger mb-2">${this.getErrorMessageContent}</p>`;
    }

    constructor(contactField: ContactField) {
        this.contactField = contactField;
    }
}

interface iContactInformation {

    getErrorMessages(): ErrorMessage[];
    getErrorMessage(contactField: string): string;
}

class ContactInformation implements iContactInformation {

    private readonly contactFields: ContactField[];

    getErrorMessages(): ErrorMessage[] {

        const errorMessages: ErrorMessage[] = [];

        for (const contactField of this.contactFields) {

            if (contactField.getMandatory) {
                if (contactField.getContactField === 'email_address') {
                    if (this.contactFields.find(contactField => contactField.getContactField === 'telephone_number' && contactField.getContactValue !== '')) {
                        continue;
                    }
                }

                if (contactField.getContactField === 'telephone_number') {
                    if (this.contactFields.find(contactField => contactField.getContactField === 'email_address' && contactField.getContactValue !== '')) {
                        continue;
                    }
                }

                if (contactField.getContactValue === '') {
                    errorMessages.push(new ErrorMessage(contactField));
                }
            }
        }

        return errorMessages;
    }

    getErrorMessage(contactField: string): string {

        let errorMessage = '';

        if (this.getErrorMessages().length > 0) {
            const messageContent = this.getErrorMessages().find(
                (errorMessage) => errorMessage.getContactField.getContactField === contactField
            );

            errorMessage = messageContent.getFormattedMessageContent;
        }

        return errorMessage;
    }

    constructor(contactFields: ContactField[]) {
        this.contactFields = contactFields;
    }
}

class ContactPage {
    static initializePage() {

        const countryName = document.getElementById('country') as HTMLSelectElement;

        countryName.addEventListener('change', () => {
            const selectedCountry = countryName.value;

            const provinceLabel = document.getElementById('province_label') as HTMLLabelElement;
            const postalCodeLabel = document.getElementById('postal_code_label') as HTMLLabelElement; 

            if (selectedCountry === 'Canada') {
                provinceLabel.innerHTML = 'Province';
                postalCodeLabel.innerHTML = 'Postal Code';
            }
            else if (selectedCountry === 'United States') {
                provinceLabel.innerHTML = 'State';
                postalCodeLabel.innerHTML = 'ZIP Code';
            }
        });

        const contact = document.getElementById('contact') as HTMLFormElement;

        contact.addEventListener('submit', event => {
            event.preventDefault();

            const contactFields: ContactField[] = [];

            contact.querySelectorAll("input, select").forEach(element => {

                let formElement = (document.getElementById(element.id) as HTMLInputElement);

                if (formElement) {
                    let mandatory = false;

                    if (['email_address', 'first_name', 'telephone_number', 'company_name'].includes(formElement.id)) {
                        mandatory = true;
                    }

                    let formElementLabel = (document.getElementById(formElement.id + '_label') as HTMLLabelElement);
                    contactFields.push(new ContactField(formElement.id, formElementLabel.innerHTML, formElement.value, mandatory));
                }
            });

            const contactInformation = new ContactInformation(contactFields);

            const contactErrors = (document.getElementById('errors') as HTMLInputElement);

            contactErrors.innerHTML = '';

            if (contactInformation.getErrorMessages().length != 0) {
                for (const errorMessage of contactInformation.getErrorMessages()) {
                    contactErrors.innerHTML += errorMessage.getFormattedMessageContent;
                }
            }
            else {
                contact.submit();
            }
        });
    }
}

ContactPage.initializePage();
