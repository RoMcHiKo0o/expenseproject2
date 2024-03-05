public with sharing class notAdminExpenseController {

    @AuraEnabled(cacheable=true)
    public static List<monthlyExpenseData> getMonthlyExpensesByEmailAndYear(String email, Integer year) {
        List<monthlyExpenseData> monthlyExpenseList = new List<monthlyExpenseData>();

        for (monthlyExpense__c me: [select Reminder__c, SpentAmount__c, MonthDate__c from monthlyExpense__c where CALENDAR_YEAR(MonthDate__c)=:year and Keeper__r.Email=:email]) {
            monthlyExpenseList.add(new monthlyExpenseData(me.SpentAmount__c, me.Reminder__c, me.MonthDate__c.month()));
        }
        System.debug(monthlyExpenseList);
        return monthlyExpenseList;
    }  

    @AuraEnabled(cacheable=true)
    public static List<monthlyExpenseData> getMonthlyExpensesByEmail(String email) {
        Integer lastYear = Date.today().year();
        System.debug(lastYear);
        return notAdminExpenseController.getMonthlyExpensesByEmailAndYear(email, lastYear);
    }  
    
    @AuraEnabled(cacheable=true)
    public static List<ExpenseCard__c> getExpenseData(String email, Integer year, Integer monthNumber){
        List<ExpenseCard__c> res = new List<ExpenseCard__c>();
        res = [select             
                Description__c,
                Amount__c,
                CardDate__c
                from ExpenseCard__c
                where CardKeeper__r.Email=:email and
                CALENDAR_MONTH(CardDate__c)=:monthNumber and
                CALENDAR_YEAR(CardDate__c)=:year
        ];
        System.debug(res);
        return res;
    }

    // @AuraEnabled(cacheable=true)
    // public static List<ExpenseCard__c> getExpensesDaysMyEmailAndDate(String email, Date date){
    //     try {
    //         List<ExpenseCard__c> res = new List<ExpenseCard__c>();
    //         res = [select             
    //                 Description__c,
    //                 Amount__c,
    //                 CardDate__c
    //                 from ExpenseCard__c
    //                 where CardKeeper__r.Email=:email and
    //                 CardDate__c=:expenseDate
    //         ];
    //         System.debug(res);
    //         return res;
    //     }
    //     catch(Exception e) {
    //         System.debug(e);
    //         return new List<ExpenseCard__c>();
    //     }
    // }

    @AuraEnabled(cacheable=true)
    public static void deleteExpenseById(String id){
        try {
            System.debug(Limits.getLimitDMLStatements());
            System.debug(Limits.getLimitQueries());
            List<ExpenseCard__c> deleteList = [select Id from ExpenseCard__c where Id=:id];
            System.debug(deleteList);
            delete deleteList;
        }
        catch(Exception e) {
            System.debug(e);
        }
        
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