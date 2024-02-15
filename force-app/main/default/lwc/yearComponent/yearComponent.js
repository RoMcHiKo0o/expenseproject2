import { LightningElement } from 'lwc';

export default class YearComponent extends LightningElement {

    buttons = [2021,2022,2023,2024];

    handleButtonClick(event) {
        let index = console.log(event.target.dataset.id);
        let value = this.buttons.index;

        this.template.querySelectorAll('.button-element').forEach(el => el.classList.remove('slds-button_brand'));
        event.target.classList.add('slds-button_brand');
        
    }
}