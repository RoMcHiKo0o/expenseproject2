// import getMonthlyExpensesByEmail from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmail';
import { LightningElement, api, wire } from 'lwc';
// import getMonthlyExpensesByEmailAndDay from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmailAndDay';

import deleteExpenseById from '@salesforce/apex/notAdminExpenseController.deleteExpenseById'

export default class OneDayExpenseComponent extends LightningElement {

    sortingConfig = {
        'sortingColumn': 'amount',
        'asc': true
    }

    @api
    expenses

    rendered = false;

    totalAmount=0;

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
        if(!this.rendered && this.expenses !== undefined) {
            this.calcTotalAmount();
            this.rewriteIndexes();
            this.rendered = true;
        }
    }

    rewriteIndexes() {
        this.expenses =  this.expenses.map((el,ind) => {
            return {...el, index: ind+1};
        });
    }


    handleDeleteClick(event) {
        this.expenseDeleteHandler(parseInt(event?.target?.dataset.id)-1);
    }

    expenseDeleteHandler(index) {
        // deleteExpenseById({'id': this.expenses[index].id});
        this.expenses = this.expenses.filter((_, ind)=> ind!=index );
        this.rewriteIndexes();
        this.calcTotalAmount();
    }

    calcTotalAmount() {
        let res = 0;
        this.expenses.map(el => {res+=parseFloat(el?.amount)});
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
            this.expenses = this.sortData(this.expenses);
        } catch (error) {
            console.log(error);
        }
        

    }
    
    sortData(data) {
        try {
            let res = data.sort((el1,el2) => {
                return this.sortingConfig.asc &&
                (el1[this.sortingConfig.sortingColumn] > el2[this.sortingConfig.sortingColumn]) ? 1: -1;
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return data;
        }
        
    }
}