import { LightningElement, api } from 'lwc';

export default class YearComponent extends LightningElement {

    buttonLabels = this.generateButtonLabels();
    buttons;

    @api selected;

    @api yearChangeHandler;

    rendered = false;

    generateButtonLabels() {
        const lastYearsNumber = 4;
        return Array.from({ length: lastYearsNumber }, (_, i) => 1 + (new Date().getFullYear()) - (lastYearsNumber - i));
    }

    renderedCallback() {

        if (!this.rendered && Array.isArray(this.buttonLabels)) {
            this.buttons = this.refs.buttonsContainer.children;
            this.selectStartvalue();
            this.rendered = true;
        }
    }

    selectStartvalue() {
        this.selected = this.buttonLabels.length - 1;
        this.selectButton(this.buttons[this.selected], this.buttonLabels[this.selected]);
    }


    selectButton(b, value) {
        this.selectButtonEffect(b);
        this.yearChangeHandler(value);
    }

    selectButtonEffect(b) {
        b?.classList.add('slds-button_brand');
    }

    deselectButtonEffect(b) {
        b?.classList.remove('slds-button_brand');
    }

    handleButtonClick(event) {
        this.deselectButtonEffect(this.buttons[this.selected])
        this.selected = event.target.dataset.id;
        let value = this.buttonLabels[this.selected];
        this.selectButton(this.buttons[this.selected], value);
    }
}