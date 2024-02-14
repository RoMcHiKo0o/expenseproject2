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
        if (!this.name) {
            console.log("no name:" + this.name);
        }
        else {
            this.fetchMonthExpenseData();
        }
    }

    fetchMonthExpenseData() {
        console.log('fetching...');
        getMonthlyExpensesByEmail({email: this.name}).then(data => {
            console.log(data);
            this.monthData = this.prepareMonthData(data);
            console.log(this.monthData);
            
        }).catch(err => {
            console.log(err);
        })
    }

    prepareMonthData(data) {
        let tempData = {};
        
        data.map(el => {tempData[el.month]=el});
        console.log(tempData);
        return monthDataTemplate.map((el, index) => {
            return {...el, ...tempData[index]};
        });
    }
}