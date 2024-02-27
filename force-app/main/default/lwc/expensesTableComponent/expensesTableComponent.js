import { LightningElement, api, wire, track } from 'lwc';

import getExpenseData from '@salesforce/apex/notAdminExpenseController.getExpenseData';

const expensesDataTemplate = [
    {
        "Description__c": "protein bar",
        "Amount__c": 1.89,
        "CardDate__c": "2024-02-13",
        "Id": "a01GA00002LhlAwYAJ"
    },
    {
        "Description__c": "curd",
        "Amount__c": 5,
        "CardDate__c": "2024-02-15",
        "Id": "a01GA00002LhlAwYAJ"
    },
    {
        "Description__c": "metro",
        "Amount__c": 0.9,
        "CardDate__c": "2024-02-16",
        "Id": "a01GA00002LhlAwYAJ"
    },
    {
        "Description__c": "party",
        "Amount__c": 25,
        "CardDate__c": "2024-02-16",
        "Id": "a01GA00002LhlAwYAJ"
    },
    {
        "Description__c": "gym",
        "Amount__c": 65,
        "CardDate__c": "2024-02-16",
        "Id": "a01GA00002LhlAwYAJ"
    },
    {
        "Description__c": "taxi",
        "Amount__c": 16.7,
        "CardDate__c": "2024-02-17",
        "Id": "a01GA00002LhlAwYAJ"
    }
]

export default class ExpensesTableComponent extends LightningElement {
    expensesData;


    @api
    loadExpensesMethod(date, email) {
        console.log(expensesDataTemplate);
        this.expensesData = JSON.stringify(expensesDataTemplate);
    }


    // @api monthData = [
    //     {
    //         "Description__c": "protein bar",
    //         "Amount__c": 1.89,
    //         "CardDate__c": "2024-02-13",
    //         "Id": "a01GA00002LhlAwYAJ"
    //     },
    //     {
    //         "Description__c": "curd",
    //         "Amount__c": 5,
    //         "CardDate__c": "2024-02-15",
    //         "Id": "a01GA00002LhlAwYAJ"
    //     },
    //     {
    //         "Description__c": "metro",
    //         "Amount__c": 0.9,
    //         "CardDate__c": "2024-02-16",
    //         "Id": "a01GA00002LhlAwYAJ"
    //     },
    //     {
    //         "Description__c": "party",
    //         "Amount__c": 25,
    //         "CardDate__c": "2024-02-16",
    //         "Id": "a01GA00002LhlAwYAJ"
    //     },
    //     {
    //         "Description__c": "gym",
    //         "Amount__c": 65,
    //         "CardDate__c": "2024-02-16",
    //         "Id": "a01GA00002LhlAwYAJ"
    //     },
    //     {
    //         "Description__c": "taxi",
    //         "Amount__c": 16.7,
    //         "CardDate__c": "2024-02-17",
    //         "Id": "a01GA00002LhlAwYAJ"
    //     }
    // ];


    // expensesesWireResult;
    // email;
    // currentYear;
    // currentMonth;

    // loadData(data) {
    //     this.email = data.email;
    //     this.currentYear = data.year;
    //     this.currentMonth = data.month;
    // }


    // @wire(getExpenseData, { 'email': this?.email, 'year': this?.currentYear, 'monthNumber': this?.currentMonth })
    // getData(result) {
    //     console.log(result);
    //     this.expensesesWireResult = result;
    //     if (result.data) {
    //         this.expensesData = result.data
    //     }

    //     if (result.error) {
    //         console.log(result.error);
    //     }
    // }

    // hasRendered = false;
    // @track newData = {};

    // renderedCallback() {
    //     if (!this.hasRendered && !this.monthdata===undefined) {
    //         console.log('render');
    //         console.log(this.monthdata);

    //         console.log('newData', this.newData);
    //         this.hasRendered = true;
    //     }
    //     console.log(this.newData);
    //     this.newData = 1;

    // }

    // prepareData(value) {
    //     this.newData = {}
    //     value.forEach((el) => {
    //         let temp = value[el.CardDate__c] || [];
    //         this.newData[el.CardDate__c] = [...temp, el];
    //     })
    // }

}