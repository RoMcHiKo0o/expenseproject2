// import getMonthlyExpensesByEmail from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmail';
import { LightningElement, api, wire } from 'lwc';
// import getMonthlyExpensesByEmailAndDay from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmailAndDay';

import deleteExpenseById from '@salesforce/apex/notAdminExpenseController.deleteExpenseById';

import refreshApex from '@salesforce/apex';

export default class OneDayExpenseComponent extends LightningElement {

    sortingConfig = {
        'sortingColumn': 'index',
        'asc': true
    }

    @api
    expenses

    @api notifyAboutChanges;

    rendered = false;

    totalAmount = 0;

    // get expensesView() {

    //     let result = this.expenses;

    //     this.totalAmount = this.calcTotalAmount();

    //     result = this.prepareData(result);
    //     // result = this.sortData(result);
    //     return result;
    // }

    // @wire(getMonthlyExpensesByEmailAndDay, {'email': this.email, 'expenseDate': this.day})
    // expenses


    renderedCallback() {
        if (!this.rendered && this.expenses !== undefined) {
            this.rewriteIndexes();
            this.rendered = true;
        }
        this.calcTotalAmount();
    }

    rewriteIndexes() {
        this.expenses = this.expenses.map((el, ind) => {
            return { ...el, index: ind + 1 };
        });
    }


    handleDeleteClick(event) {
        console.log(event?.target?.dataset.id);
        this.expenseDeleteHandler(event?.target?.dataset.id);
    }

    expenseDeleteHandler(id) {
        deleteExpenseById({'id': id}).then(res => {
            console.log('del', res);
            if (res?.success) {
                console.log('до',this.expenses);
                this.expenses = [...this.expenses.filter((el) => el.id != id)];
                console.log('после',this.expenses);
                this.rewriteIndexes();
                this.calcTotalAmount();
                this.notifyAboutChanges();
            }
            else {
                console.log(res.error);
            }
            
        }).catch(error => {
            console.log(error);
        })

    }

    calcTotalAmount() {
        let res = 0;
        this.expenses.map(el => { res += parseFloat(el?.amount) });
        this.totalAmount = res;
    }

    handleSort(event) {
        event.preventDefault();
        let col = event.target.dataset.column;
        try {
            this.sortingConfig.asc = (this.sortingConfig.sortingColumn == col) ?
                !(this.sortingConfig.asc) : true;
            this.sortingConfig.sortingColumn = col;
            console.log(this.sortingConfig);
            this.sortData();
        } catch (error) {
            console.log('handle sort', error);
        }


    }

    sortData() {
        console.log('sorting', this.expenses);
        try {
            let res = [...this.expenses].sort((el1, el2) => {
                return this.sortingConfig.asc &&
                    (el1[this.sortingConfig.sortingColumn] > el2[this.sortingConfig.sortingColumn]) ? 1 : -1;
            });
            this.expenses = res;
        } catch (error) {
            console.log('sortdata', error);
            // return data;
        }

    }
}