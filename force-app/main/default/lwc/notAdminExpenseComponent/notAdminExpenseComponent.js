import { LightningElement, api, wire } from 'lwc';

import getMonthlyExpensesByEmail from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmail';
import getMonthlyExpensesByEmailAndYear from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmailAndYear';
import getExpenseData from '@salesforce/apex/notAdminExpenseController.getExpenseData';

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

export default class NotAdminExpenseComponent extends LightningElement {


    @api employee;
    balance;

    dateChangeHandler = (date) => {
        console.log('not admin', date);
    }

    // @api email;

    // @api office = '';

    // selectedYear;

    // selectedMonthNumber;

    // monthData = [];

    // yearData = [];

    // expenseData = [];

    // balance
    // // get() {
    // //     return "$123"+this.balance;
    // // };

    // connectedCallback() {
    //     this.init();
    // }

    // async init() {
    //     try {
    //         if (!this.email) {
    //             console.log("no name:" + this.email);
    //         }
    //         else {
    //             // let data = await this.fetchMonthExpenseData();
    //             // this.monthData = this.prepareMonthData(data);
    //             // getExpenseData({'email': 'john@star.com', 'year': 2024, 'monthNumber': 2}).then(data => {console.log(data);})
    //             this.monthData = monthDataTemplate;
    //             this.yearData = this.getYearData();
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }

    // }

    // async fetchMonthExpenseData() {
    //     try {
    //         return await getMonthlyExpensesByEmail({ 'email': this.email });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async fetchMonthExpenseDataByYear(year) {
    //     try {
    //         return await getMonthlyExpensesByEmailAndYear({ 'email': this.email, 'year': year });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // prepareMonthData(data) {
    //     let tempData = {};
    //     data.map(el => { tempData[el.month - 1] = el });
    //     return monthDataTemplate.map((el, index) => {
    //         return { ...el, ...tempData[index] };
    //     });
    // }

    // getYearData() {
    //     let nowDate = new Date();
    //     let year = nowDate.getFullYear();
    //     const lastYearsNumber = 4;
    //     return Array.from({ length: lastYearsNumber }, (_, i) => 1 + year - (lastYearsNumber - i));
    // }

    // handleChangeYear(event) {
    //     console.log('changing year');
    //     console.log(event.detail);
    //     this.selectedYear = event.detail;
    //     this.changeMonthData(event.detail);
    // }

    // async changeMonthData(year) {
    //     try {
    //         let data = await this.fetchMonthExpenseDataByYear(year);
    //         this.monthData = this.prepareMonthData(data);
    //         console.log(this.monthData);
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    // handleChangeMonth(event) {
    //     try {
    //         event.prevent.default();
    //         console.log(event);
    //         this.selectedMonthNumber = event.detail;
    //         this.refs.mainExpenseComp.loadData({ email: this.email, year: this.selectedYear, month: this.selectedMonthNumber });
    //     } catch (error) {
    //         console.log(error);
    //     }



    //     // this.fetchExpenseDataByYearAndMonth(this.selectedYear, this.selectedMonthNumber);
    // }

    // async fetchExpenseDataByYearAndMonth(year, month) {
    //     try {
    //         console.log(`${year}, ${month}`);
    //         let temp = await getExpenseData({ email: this.email, year: year, monthNumber: month });
    //         let data = JSON.parse(JSON.stringify(temp));
    //         console.log('fetched');
    //         this.expenseData = this.prepareExpenseData(data);
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }

    // }

    // prepareExpenseData(data) {
    //     return data;
    // }

    // handleNewExpense() {
    //     console.log(this.expenseData);
    // }
}