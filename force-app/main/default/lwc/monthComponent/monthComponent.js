import { LightningElement,api } from 'lwc';

export default class MonthComponent extends LightningElement {

    @api totalAmount=0;
    @api totalIncome=0;
    _months;
    rolluped = false;

    @api 
    get months() {
        return this._months;
    }

    set months(value) {
        this._months = value;
        this.calcRollup();
        console.log('setter');
        
    }

    handleMonth(event) {
        let index = event.currentTarget.dataset.id;
        console.log(index);

    }

    calcRollup() {
        console.log(this.months);
        this.months.map(el => {
            this.totalAmount +=el.amount||0;
            this.totalIncome +=el.income||0;
        })

        this.totalAmount = Math.round(this.totalAmount*100)/100;

        this.totalIncome = Math.round(this.totalIncome*100)/100;
    }
}