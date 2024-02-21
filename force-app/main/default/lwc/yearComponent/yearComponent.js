import { LightningElement,api } from 'lwc';

export default class YearComponent extends LightningElement {

    @api buttonLabels;

    @api selected;

    @api email;

    rendered = false;

    renderedCallback() {

        if (!this.rendered && Array.isArray(this.buttonLabels) && this.template.querySelectorAll('.button-element')) {

            this.selectStartvalue();
            this.rendered = true;
        }
    }

    selectStartvalue() {
        this.selected = this.buttonLabels.length-1;
        this.selectButton(this.template.querySelectorAll('.button-element')[this.selected], this.buttonLabels[this.selected]);

        // console.log(this.template.querySelectorAll('.button-element'));
    }
    

    selectButton(b, value) {
        this.selectButtonEffect(b);
        console.log(value);
        this.dispatchEvent(new CustomEvent('yearchange', {detail: value, bubbles:true}));
    }

    selectButtonEffect(b) {
        b?.classList.add('slds-button_brand');
    }

    deselectButtonEffect(b) {
        b?.classList.remove('slds-button_brand');
    }

    handleButtonClick(event) {
        this.template.querySelectorAll('.button-element').forEach(el => this.deselectButtonEffect(el));
        this.selected = event.target.dataset.id;
        let value = this.buttonLabels[this.selected];
        this.selectButton(event.target, value);
        
    }

//     handleBlur(event) {
//         event.preventDefault();
//         event.stopPropogation();
//         this.deselectButtonEffect(event.target);
//     }
}