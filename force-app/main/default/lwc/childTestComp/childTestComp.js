import { LightningElement,api } from 'lwc';

export default class ChildTestComp extends LightningElement {

    @api chData;
    rendered=1;
    start;
    constructor() {
        console.log('child constructor');
        
        super();
        this.start = new Date().getTime();
    }

    connectedCallback() {
        console.log('now this data in ccc', this.chData, (new Date().getTime()-this.start)/1000);
        console.log('child connected callback');
    }

    renderedCallback() {
        if(this.rendered-->0) {
            console.log('now this data in crc', this.chData, (new Date().getTime()-this.start)/1000);
            console.log('child rendered callback');   
            this.chData = this.prepareData(this.chData);
        }
    }

    prepareData(data) {
        console.log('getting data in prepareData()', (new Date().getTime()-this.start)/1000);
        let temp = data + ' child prep';
        console.log(temp);
        return temp;
    }
}