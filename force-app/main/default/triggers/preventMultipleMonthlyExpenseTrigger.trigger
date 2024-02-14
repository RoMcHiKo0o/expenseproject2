trigger preventMultipleMonthlyExpenseTrigger on monthlyExpense__c (before insert) {
    for (monthlyExpense__c me: trigger.new) {
        if ([select Id from monthlyExpense__c where monthDate__c=:me.monthDate__c.toStartOfMonth()].size()>0) {
            me.addError('You can\'t create multiple monthly expenses for one month');
        }
        else if(!me.monthDate__c.isSameDay(me.monthDate__c.toStartOfMonth())) {
            me.addError('Month date must be date of the start of the month');
        }
    }
}