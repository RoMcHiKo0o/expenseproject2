import { LightningElement } from 'lwc';

export default class YearComponent extends LightningElement {

    buttonStatefulState = false;
    buttonIconStatefulState = false;

    handleButtonStatefulClick() {
        this.buttonStatefulState = !this.buttonStatefulState;
    }
}