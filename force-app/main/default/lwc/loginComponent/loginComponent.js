import { LightningElement ,api} from 'lwc';
import ExpensesLogo from "@salesforce/resourceUrl/ExpensesLogo";

import checkEmployee from "@salesforce/apex/LoginEmployeeClass.checkEmployee";

export default class LoginComponent extends LightningElement {
    logo = ExpensesLogo; 
    
    @api
    loginData = '';
    @api
    passwordData = '';
    error = '';

    loginChangeHandle(e) {
        this.loginData = e.target.value;
    }

    passwordChangeHandle(e) {
        this.passwordData = e.target.value;
    }

    
    validate(login, pass) {
        if (login==='' || pass==='') {
            return {status: false, message: 'Login and password can\'t be empty.'}
        }

        return {status: true, message: ''};
    }

    loginEmployee(login, pass) {
        console.log('before logining');
        return checkEmployee({'login': login, 'password': pass}).then(data => {
            return data;
        }).catch(error => {
            console.log(error);
            return {"status": false, "message": error};
        })        

    }


    login(data) {
        return this.dispatchEvent(new CustomEvent("login", {detail: data,bubbles: true}));
    }


    loginHandle() {
        this.error='';
        console.log(this.loginData, this.passwordData);
        let {status, message} = this.validate(this.loginData, this.passwordData);
        console.log(status,message);
        if (!status) {
            this.error = message;
            return
        }

        // const data = async () => {
        //     try {
        //         const result = await checkEmployee({'login': this.loginData, 'password': this.passwordData});
        //         if (result.status) {
        //             this.empl = {...result};
        //             this.dispatchLoginInfo({...result});
        //         }
        //     }
        //     catch (e) {
        //         console.log(e);
        //     }
        // }
        checkEmployee({'login': this.loginData, 'password': this.passwordData}).then(data => {
            console.log(data);
            if (data.status) {
                return this.login(data);
            }
            else {
                this.error = 'Login or password is invalid.';
            }
            
        }).catch(err => {
            console.log(err);
        })
    }

}