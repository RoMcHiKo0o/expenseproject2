import { LightningElement } from 'lwc';

export default class ExpensesComponent extends LightningElement {
    isLogined=true;
    employee = {status: true, employeeName: 'john@star.com', isAdmin: false, office: 1};


    changeLoginStatus(event) {
        this.employee = event.detail;
        this.isLogined = true;
    }
}