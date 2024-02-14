public with sharing class notAdminExpenseController {

    @AuraEnabled(cacheable=false)
    public static List<monthlyExpenseData> getMonthlyExpensesByEmailAndYear(String email, Integer year) {
        List<monthlyExpenseData> monthlyExpenseList = new List<monthlyExpenseData>();

        for (monthlyExpense__c me: [select Reminder__c, SpentAmount__c, MonthDate__c from monthlyExpense__c where CALENDAR_YEAR(MonthDate__c)=:year]) {
            monthlyExpenseList.add(new monthlyExpenseData(me.SpentAmount__c, me.Reminder__c, me.MonthDate__c.month()));
        }
        return monthlyExpenseList;
    }  

    @AuraEnabled(cacheable=false)
    public static List<monthlyExpenseData> getMonthlyExpensesByEmail(String email) {
        Integer lastYear = Date.today().year();
        System.debug(lastYear);
        return notAdminExpenseController.getMonthlyExpensesByEmailAndYear(email, lastYear);
    }   

    public class monthlyExpenseData {
        @AuraEnabled public Decimal amount;
        @AuraEnabled public Decimal income;
        @AuraEnabled public Integer month;
        public monthlyExpenseData(Decimal a, Decimal r, Integer m) {
            amount=a;
            income=r;
            month=m;
        }
    }   
}