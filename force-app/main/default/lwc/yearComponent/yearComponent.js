import { LightningElement,api } from 'lwc';

export default class YearComponent extends LightningElement {

    @api buttonLabels;

    @api selected;

    @api email;

    rendered = false;

    renderedCallback() {
        // if (this.counter--) {
        //     this.selectStartvalue();
        // }        
        console.log(this.buttonLabels);
        if (!this.rendered && Array.isArray(this.buttonLabels)) {

            // this.selectStartvalue();
            this.rendered = true;
        }
    }

    selectStartvalue() {
        this.selected = this.buttonLabels.length-1;
        console.log(this.selected);
        console.log(this.template.querySelectorAll('.button-element')[this.selected]);
        this.selectButton(this.template.querySelectorAll('.button-element')[this.selected]);
    }
    

    selectButton(b) {
        b.classList.add('slds-button_brand');
    }

    deselectButton(b) {
        b.classList.remove('slds-button_brand');
    }

    handleButtonClick(event) {
        this.selected = console.log(event.target.dataset.id);
        let value = this.buttonLabels[this.selected];
        this.selectButton(event.target);
        
    }

    handleBlur(event) {
        this.deselectButton(event.target);
    }
}