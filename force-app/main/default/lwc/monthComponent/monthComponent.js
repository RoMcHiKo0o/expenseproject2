import { LightningElement,api, track, wire } from 'lwc';

export default class MonthComponent extends LightningElement {

    @api totalAmount=0;
    @api totalIncome=0;
    @track _months;

    @api 
    get months() {
        return this._months;
    }

    set months(value) {
        this._months = value;
        this.calcRollup();
        
    }

    handleMonth(event) {
        let index = event.currentTarget.dataset.id;
        this.selectMonth(event, index);
        console.log(index);
    }

    selectMonth(event, index) {
        this.template.querySelectorAll('.data-row').forEach(el => el.classList.remove('selected'))
        this.template.querySelectorAll('.data-row')[index].classList.add('selected');
    }

    calcRollup() {
        this.months.map(el => {
            this.totalAmount +=el.amount||0;
            this.totalIncome +=el.income||0;
        })

        this.totalAmount = Math.round(this.totalAmount*100)/100;

        this.totalIncome = Math.round(this.totalIncome*100)/100;
    }
}