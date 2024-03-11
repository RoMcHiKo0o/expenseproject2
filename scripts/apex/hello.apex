// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

// string tempvar = 'Enter_your_name_here';
// System.debug('Hello World!');
// System.debug(notAdminExpenseController.getExpenseData('john@star.com', 2024, 2));

Database.insert(new ExpenseCard__c(Amount__c=12, Description__c='pcclub', CardKeeper__c='003GA000043NNNeYAO', CardDate__c = Date.today()));
Database.insert(new ExpenseCard__c(Amount__c=10, Description__c='pivo', CardKeeper__c='003GA000043NNNeYAO', CardDate__c = Date.today()));
Database.insert(new ExpenseCard__c(Amount__c=0.9, Description__c='metro', CardKeeper__c='003GA000043NNNeYAO', CardDate__c = Date.today()));
Database.insert(new ExpenseCard__c(Amount__c=65, Description__c='gym', CardKeeper__c='003GA000043NNNeYAO', CardDate__c = Date.today()));
Database.insert(new ExpenseCard__c(Amount__c=5, Description__c='gym food', CardKeeper__c='003GA000043NNNeYAO', CardDate__c = Date.today()));
String email = 'john@star.com';
system.debug([select Id,Email from Contact where Email=:email]);