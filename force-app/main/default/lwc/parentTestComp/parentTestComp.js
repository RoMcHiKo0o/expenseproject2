import { LightningElement } from 'lwc';
import getMonthlyExpensesByEmail from '@salesforce/apex/notAdminExpenseController.getMonthlyExpensesByEmail';

export default class ParentTestComp extends LightningElement {


    COLS = [
        {
            label: "Desc",
            fieldName: FIRSTNAME_FIELD.fieldApiName,
            editable: true,
        },
        {
            label: "Last Name",
            fieldName: LASTNAME_FIELD.fieldApiName,
            editable: true,
        },
        { label: "Title", fieldName: TITLE_FIELD.fieldApiName, editable: true },
        {
            label: "Phone",
            fieldName: PHONE_FIELD.fieldApiName,
            type: "phone",
            editable: true,
        },
        {
            label: "Email",
            fieldName: EMAIL_FIELD.fieldApiName,
            type: "email",
            editable: true,
        },
    ];


    data = [
        {
            "date": "2024-02-13",
            "dataList": [
                {
                    "index": 1,
                    "description": "protein bar",
                    "amount": 1.89,
                    "id": "a01GA000sd02LhlAwYAJ"
                }
            ]
        },
        {
            "date": "2024-02-15",
            "dataList": [
                {
                    "index": 1,
                    "description": "curd",
                    "amount": 5,
                    "id": "a01GA000qwe02LhlAwYAJ"
                }
            ]
        },
        {
            "date": "2024-02-16",
            "dataList": [
                {
                    "index": 1,
                    "description": "metro",
                    "amount": 0.9,
                    "id": "a01GA00002bvnLhlAwYAJ"
                },
                {
                    "index": 2,
                    "description": "party",
                    "amount": 25,
                    "id": "a01GA00002werLhlAwYAJ"
                },
                {
                    "index": 3,
                    "description": "gym",
                    "amount": 65,
                    "id": "a01GA00002L1hlAwYAJ"
                }
            ]
        },
        {
            "date": "2024-02-17",
            "dataList": [
                {
                    "index": 1,
                    "description": "taxi",
                    "amount": 16.7,
                    "id": "a01GA00002LhlAwYAJ"
                }
            ]
        }
    ]
}