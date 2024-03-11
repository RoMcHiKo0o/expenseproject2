import { LightningElement, api } from 'lwc';

export default class NewExpenseModalPopupComponent extends LightningElement {

    @api
    closeModal;

    @api
    saveModal;

    @api
    email;

    handleCancel(event) {
        event.preventDefault();
        this.closeModal();
    }

    handleSave(event) {
        event.preventDefault();
        console.log('click handled');
        let data = {email: 'john@star.com', description: "new purshase", amount: 9.99, expDate: "2024-03-06"};
        this.saveModal(data);
        

    }

}