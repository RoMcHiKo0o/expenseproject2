import { LightningElement,api,wire } from 'lwc';

import getMonthlyExpensesByEmail from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmail';
import getMonthlyExpensesByEmailAndYear from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmailAndYear';

const monthDataTemplate = [
    {name: 'January'},
    {name: 'February'},
    {name: 'March'},
    {name: 'April'},
    {name: 'May'},
    {name: 'June'},
    {name: 'July'},
    {name: 'August'},
    {name: 'September'},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'}
];

export default class NotAdminExpenseComponent extends LightningElement {

    @api name;

    @api office='';

    monthData=[];

    yearData=[];

    balance='no info';

    connectedCallback() {
        this.init();
    }

    async init() {
        try {
            if (!this.name) {
                console.log("no name:" + this.name);
            }
            else {
                // let data = await this.fetchMonthExpenseData();
                // this.monthData = this.prepareMonthData(data);
                this.monthData = monthDataTemplate;
                this.yearData = this.getYearData();
            }
        }
        catch(err) {
            console.log(err);
        }
        
    }

    async fetchMonthExpenseData() {
        try {
            return await getMonthlyExpensesByEmail({'email': this.name});
        } catch (error) {
            console.log(error);
        }
    }

    async fetchMonthExpenseDataByYear(year) {
        try {
            return await getMonthlyExpensesByEmailAndYear({'email': this.name, 'year': year});
        } catch (error) {
            console.log(error);
        }
    }

    prepareMonthData(data) {
        let tempData = {};
        data.map(el => {tempData[el.month]=el});
        return monthDataTemplate.map((el, index) => {
            return {...el, ...tempData[index]};
        });
    }

    getYearData() {
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        const lastYearsNumber=4;
        return Array.from({length: lastYearsNumber}, (_,i) => 1+year-(lastYearsNumber-i));
    }

    changeYear(event) {
        console.log('changing year');
        console.log(event.detail);
        this.changeMonthData(event.detail);
    }

    async changeMonthData(year) {
        let data = await this.fetchMonthExpenseDataByYear(year);
        this.monthData = this.prepareMonthData(data);
    }
}