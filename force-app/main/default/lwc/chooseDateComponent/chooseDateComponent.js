import { LightningElement, api } from 'lwc';

export default class ChooseDateComponent extends LightningElement {

    @api dateChangeHandler;
    @api email;


    currentDate = {
        'year': new Date().getFullYear(),
        'month': new Date().getMonth()
    };

    connectedCallback(){
        this.dateChangeHandler(this.currentDate);
    }

    yearChangeHandler = (year) => {
        this.currentDate.year = year;
        this.refs.monthComp.loadMonthData(this.currentDate.year);
        this.dateChangeHandler(this.currentDate);
    }

    monthChangeHandler = (month) => {
        this.currentDate.month = month;
        console.log('choose date', this.currentDate);
        this.dateChangeHandler(this.currentDate);
    }
}