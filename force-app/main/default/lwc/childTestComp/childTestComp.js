import { LightningElement, api } from 'lwc';

export default class ChildTestComp extends LightningElement {

    columns = [
        {
            label: "Number",
            fieldApiName: "index",
            hideLabel: true
        },
        {
            label: "Description",
            type: "text",
            fieldApiName: 'description',
            hideDefaultActions: "true",
            sortable: true,
            editable: true
        },
        {
            label: "Amount",
            fieldApiName: 'amount',
            type: "currency",
            typeAttributes: {
                currencyCode: "USD",
                step: '0.01'
            },
            hideDefaultActions: "true",
            sortable: true,
            editable: true
        }
    ];


    data = [
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
}