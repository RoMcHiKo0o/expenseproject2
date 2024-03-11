import { LightningElement, api, wire, track } from 'lwc';

import getExpenseData from '@salesforce/apex/notAdminExpenseController.getExpenseData';
// import getMonthDates from '@salesforce/apex/notAdminExpenseController.getExpensesDaysMyEmailAndDate';
import DESCRIPTION from '@salesforce/schema/ExpenseCard__c.Description__c';
import AMOUNT from '@salesforce/schema/ExpenseCard__c.Amount__c';

import createExpense from '@salesforce/apex/notAdminExpenseController.createExpense';

import { RefreshEvent } from 'lightning/refresh';

const expensesDataTemplate = [
    {
        "date": "2024-03-03",
        "dataList": [
            {
                // "index": 1,
                "description": "Exponenta",
                "amount": "3.00",
                "id": "a01GA00002MLtHhYAL"
            },
            {
                // "index": 2,
                "description": "цветы",
                "amount": "60.00",
                "id": "a01GA00002MLtI1YAL"
            },
            {
                // "index": 3,
                "description": "Gym",
                "amount": "65.00",
                "id": "a01GA00002MLtHcYAL"
            },
            {
                // "index": 4,
                "description": "metro",
                "amount": "0.90",
                "id": "a01GA00002MLtHOYA1"
            }
        ]
    },
    {
        "date": "2024-03-02",
        "dataList": [
            {
                // "index": 1,
                "description": "Продукты",
                "amount": "10.00",
                "id": "a01GA00002MLtHNYA1"
            }
        ]
    }
];

export default class ExpensesTableComponent extends LightningElement {
    expensesData;

    FIELDS = [DESCRIPTION, AMOUNT];
    email;

    showModal = false;

    set tempData(v) {
        this.expensesData = this.prepareData(v);
    }

    get noRecords() {
        return this.expensesData == [];

    }

    // connectedCallback() {
    //     this.loadExpensesMethod(1,1);
    // }

    @api
    loadExpensesMethod(date, email) {
        console.log(email);
        this.email = email;
        console.log(email);
        this.tempData = [];
        // this.expensesData = expensesDataTemplate;


        getExpenseData({ 'email': email, 'year': date.year, 'monthNumber': date.month }).then(data => {
            this.apexData = data;
            console.log(data);
            this.tempData = JSON.parse(JSON.stringify(data));
        }).catch(err => {
            console.log(err);
        })
    }

    @api newExpenseHandler(email) {
        this.showModal = true;
    }

    closeModal = () => {
        try {
            this.showModal = false;
        } catch (error) {
            console.log(error);
        }
    }

    @api
    notifyAboutChanges;

    @api refreshData() {
        
        // this.loadExpensesMethod();
        // this.dispatchEvent(new RefreshEvent());
    }

    saveModalHandle = (data) => {
        console.log('started saving');
        try {

            // createExpense(data).then(res => {
            //     if (res.success) {
            //         console.log('ok!');

                    this.notifyAboutChanges();
            //         // showToastEvent
            //         this.showModal = false;
            //     }
            //     else {
            //         console.log(res.error);
            //         // showToastEvent
            //     }

            // })
            this.showModal = false;
            
        } catch (error) {
            console.log(error);
            // showToastEvent
        }
    }

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

    prepareData = (value) => {
        let result = [];
        let dateIndexMap = {};
        value.forEach((el) => {
            if (el.CardDate__c in dateIndexMap) {
                let value = result[dateIndexMap[el.CardDate__c]];
                value.dataList = [...value.dataList, { 'index': value.dataList.length + 1, "description": el.Description__c, "amount": Number.parseFloat(el.Amount__c).toFixed(2), "id": el.Id }]
            }
            else {
                result.push({ 'date': el.CardDate__c, dataList: [{ 'index': 1, "description": el.Description__c, "amount": Number.parseFloat(el.Amount__c).toFixed(2), "id": el.Id }] });
                dateIndexMap[el.CardDate__c] = result.length - 1;
            }
        })
        console.log(result);
        return result;
    }

}