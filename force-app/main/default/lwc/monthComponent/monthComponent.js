import { LightningElement,api, track, wire } from 'lwc';

export default class MonthComponent extends LightningElement {

    totalAmount;
    totalIncome;
    @track _months;

    rendered=false;

    @api 
    get months() {
        return this._months;
    }

    set months(value) {
        this._months = value;
        this.calcRollup();
        
    }

    renderedCallback() {
        if(!this.rendered && this.template.querySelectorAll('.data-row')) {
            // let m = new Date();
            // this.selectMonth(m.getMonth());
            this.rendered = true;
        }
    }

    handleMonth(event) {
        let index = event.currentTarget.dataset.id;
        this.selectMonth(index);
        console.log(index);
    }

    selectMonth(index) {
        this.changeMonthColor(index);
        const event = new CustomEvent('selectmonth', {detail: parseInt(index)+1, bubbles: true});
        this.dispatchEvent(event);
    }

    changeMonthColor(index) {
        this.template.querySelectorAll('.data-row').forEach(el => el.classList.remove('selected'))
        this.template.querySelectorAll('.data-row')[index].classList.add('selected');
    }

    calcRollup() {
        this.totalAmount=0;
        this.totalIncome=0;
        this.months.map(el => {
            this.totalAmount +=el.amount||0;
            this.totalIncome +=el.income||0;
        })

        this.totalAmount = Math.round(this.totalAmount*100)/100;

        this.totalIncome = Math.round(this.totalIncome*100)/100;
    }
}