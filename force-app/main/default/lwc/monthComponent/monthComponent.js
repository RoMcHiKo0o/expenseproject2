import { LightningElement, api, track, wire } from 'lwc';
import getMonthlyExpensesData from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmailAndYear';

const monthDataTemplate = [
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' },
    { name: 'December' }
];

export default class MonthComponent extends LightningElement {

    @api
    email;

    totalAmount;
    totalIncome;
    selected;
    rendered = false;

    @api monthChangeHandler;

    monthTableData = [
        { name: 'January' },
        { name: 'February' },
        { name: 'March' },
        { name: 'April' },
        { name: 'May' },
        { name: 'June' },
        { name: 'July' },
        { name: 'August' },
        { name: 'September' },
        { name: 'October' },
        { name: 'November' },
        { name: 'December' }
    ];

    set tempdata(value) {
        this.monthTableData = this.prepareData(value);
        this.calcRollup();
        this.dispatchNewBalance();
        this.selectMonth(this.selected);
    }


    dispatchNewBalance() {
        try {
            const event = new CustomEvent('newbalance', {detail: this.totalIncome-this.totalAmount, bubbles:true, composed: true});
            this.dispatchEvent(event);
        } catch (error) {
            console.log('error dispathing event: ', error);   
        }
        
    }


    // set monthTableData(v) {
    //     console.log('prev data setter', this.monthTableData);
    //     console.log('data setter', v);
    //     this.setAttribute('monthTableData', v);
    //     this.calcRollup();
    // }

    @api
    loadMonthData(year) {
        getMonthlyExpensesData({
            'email': this.email,
            'year': year
        }).then(res => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(data);
            this.tempdata = data;
        }).catch(err => {
            console.log(err);
        })
    }


    connectedCallback() {
        this.loadMonthData(new Date().getFullYear());        
    }

    renderedCallback() {
        if (!this.rendered) {
            this.selected = new Date().getMonth();
            this.selectMonth(this.selected);
            this.rendered = true;
        }
    }

    prepareData(data) {
        try {
            let temp = {};
            data.map(el => { temp[el.month - 1] = el });
            return monthDataTemplate.map((el, index) => {
                return { ...el, ...temp[index] };
            });
        } catch (error) {
            console.log(error);
            return monthDataTemplate;
        }

    }

    calcRollup() {
        this.totalAmount = 0;
        this.totalIncome = 0;
        this.monthTableData.map(el => {
            this.totalAmount += el.amount || 0;
            this.totalIncome += el.income || 0;
        })

        this.totalAmount = Math.round(this.totalAmount * 100) / 100;

        this.totalIncome = Math.round(this.totalIncome * 100) / 100;
    }

    handleMonth(event) {
        let index = event.currentTarget.dataset.id;
        this.selectMonth(index);
    }

    selectMonth(index) {
            this.deselectMonthEffect(this.template.querySelectorAll('.data-row')[this.selected]);
            this.selectMonthEffect(this.template.querySelectorAll('.data-row')[index]);
            this.selected = index;
            console.log(this.selected);
            this.monthChangeHandler(parseInt(this.selected)+1);
    }

    selectMonthEffect(el) {
        el?.classList.add('selected');
    }

    deselectMonthEffect(el) {
        el?.classList.remove('selected');
    }

}