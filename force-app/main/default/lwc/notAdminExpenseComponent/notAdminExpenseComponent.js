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

    connectedCallback() {
        this.init();
    }

    async init() {
        if (!this.name) {
            console.log("no name:" + this.name);
        }
        else {
            let data = await this.fetchMonthExpenseData();
            this.monthData = this.prepareMonthData(data);
        }
    }

    async fetchMonthExpenseData() {
        try {
            return await getMonthlyExpensesByEmail({email: this.name});
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
}