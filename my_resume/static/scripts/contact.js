"use strict";
class ContactField {
    contactField;
    contactLabel;
    contactValue;
    mandatory;
    get getContactField() {
        return this.contactField;
    }
    get getContactLabel() {
        return this.contactLabel;
    }
    get getContactValue() {
        return this.contactValue;
    }
    get getMandatory() {
        return this.mandatory;
    }
    constructor(contactField, contactLabel, contactValue, mandatory) {
        this.contactField = contactField;
        this.contactLabel = contactLabel;
        this.contactValue = contactValue;
        this.mandatory = mandatory;
    }
}
class ErrorMessage {
    contactField;
    get getContactField() {
        return this.contactField;
    }
    get getErrorMessageContent() {
        return `ERROR: ${this.contactField.getContactLabel} is a required value.`;
    }
    get getFormattedMessageContent() {
        return `<p class="alert alert-danger mb-2">${this.getErrorMessageContent}</p>`;
    }
    constructor(contactField) {
        this.contactField = contactField;
    }
}
class ContactInformation {
    contactFields;
    getErrorMessages() {
        const errorMessages = [];
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
    getErrorMessage(contactField) {
        let errorMessage = '';
        if (this.getErrorMessages().length > 0) {
            const messageContent = this.getErrorMessages().find((errorMessage) => errorMessage.getContactField.getContactField === contactField);
            errorMessage = messageContent.getFormattedMessageContent;
        }
        return errorMessage;
    }
    constructor(contactFields) {
        this.contactFields = contactFields;
    }
}
class ContactPage {
    static initializePage() {
        const countryName = document.getElementById('country');
        countryName.addEventListener('change', () => {
            const selectedCountry = countryName.value;
            const provinceLabel = document.getElementById('province_label');
            const postalCodeLabel = document.getElementById('postal_code_label');
            if (selectedCountry === 'Canada') {
                provinceLabel.innerHTML = 'Province';
                postalCodeLabel.innerHTML = 'Postal Code';
            }
            else if (selectedCountry === 'United States') {
                provinceLabel.innerHTML = 'State';
                postalCodeLabel.innerHTML = 'ZIP Code';
            }
        });
        const contact = document.getElementById('contact');
        contact.addEventListener('submit', event => {
            event.preventDefault();
            const contactFields = [];
            contact.querySelectorAll("input, select").forEach(element => {
                let formElement = document.getElementById(element.id);
                if (formElement) {
                    let mandatory = false;
                    if (['email_address', 'first_name', 'telephone_number', 'company_name'].includes(formElement.id)) {
                        mandatory = true;
                    }
                    let formElementLabel = document.getElementById(formElement.id + '_label');
                    contactFields.push(new ContactField(formElement.id, formElementLabel.innerHTML, formElement.value, mandatory));
                }
            });
            const contactInformation = new ContactInformation(contactFields);
            const contactErrors = document.getElementById('errors');
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
