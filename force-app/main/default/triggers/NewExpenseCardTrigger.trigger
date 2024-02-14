trigger NewExpenseCardTrigger on ExpenseCard__c (before insert) {
    System.debug(trigger.new);
    for(ExpenseCard__c e: trigger.new) {
        Integer month = e.CardDate__c.month();
        System.debug(month);
        List<monthlyExpense__c> meList = new List<monthlyExpense__c>();
        meList = [select Name from monthlyExpense__c where Keeper__c=:e.CardKeeper__c and MonthDate__c=:e.CardDate__c.toStartOfMonth()];

        if (meList.size()==1) {
            System.debug('1');
            e.monthlyExpense__c = meList.get(0).Id;
        }
        else if (meList.size()==0) {
            System.debug('0');
            monthlyExpense__c newMe = new monthlyExpense__c(Keeper__c=e.CardKeeper__c, monthDate__c=e.CardDate__c.toStartOfMonth());
            insert newMe;
            e.monthlyExpense__c = newMe.Id;
        }
        else {
            System.debug('there are mulitple monthly Expenses');
            System.debug(meList);
        }
    }
    System.debug(trigger.new);
}