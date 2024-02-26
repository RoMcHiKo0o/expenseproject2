import { LightningElement } from 'lwc';

export default class ExpensesComponent extends LightningElement {
    isLogined=true;
    // employee;
    employee = {status: true, email: 'john@star.com', isAdmin: false, office: 'Office 1'};


    changeLoginStatus(event) {
        this.employee = event.detail;
        this.isLogined = true;
    }
}