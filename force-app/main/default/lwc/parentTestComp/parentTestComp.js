import { LightningElement } from 'lwc';
import getMonthlyExpensesByEmail from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmail';

export default class ParentTestComp extends LightningElement {


    myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("foo");
        }, 2000);
      });

    testData;
    rendered=1;
    start;



    constructor() {
        console.log('parent constructor');
        super();
        this.start = new Date().getTime();
        
    }

    connectedCallback() {
        console.log('parent connected callback');
        console.log('now this data in pcc', this.testData, (new Date().getTime()-this.start)/1000);
        this.myPromise.then(data => {
            console.log('getting data in parent connected callback', (new Date().getTime()-this.start)/1000);
            console.log(data);
            this.testData = this.prepareData(data);
        }).catch(err => {
            console.log(err);
        })
    }

    prepareData(v) {
        console.log('getting data in prepareData()', (new Date().getTime()-this.start)/1000);
        let temp = JSON.stringify(v) + ' parent prep';
        console.log(temp);
        return temp
    }

    renderedCallback() {
        if(this.rendered-->0) {
            console.log('parent rendered callback', (new Date().getTime()-this.start)/1000);
            console.log('now this data in prc');
        }
    }
}