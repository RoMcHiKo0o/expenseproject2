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

    @AuraEnabled(cacheable=false)
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

    @AuraEnabled(cacheable=false)
    public static dmlResult deleteExpenseById(String id){
        try {
            System.debug(Limits.getLimitDMLStatements());
            System.debug(Limits.getLimitQueries());
            ExpenseCard__c exp = [select Id from ExpenseCard__c where Id=:id];
            System.debug(exp);
            Database.DeleteResult res = Database.delete(exp);
            System.debug(res);
                if (res.getErrors().size()==0) {
                    return new dmlResult(res.isSuccess(), '');
                }
                else  {
                    return new dmlResult(res.isSuccess(), res.getErrors().get(0).getMessage());
                }
        }
        catch(Exception e) {
            System.debug(e);
            return new dmlResult(false, e.getMessage());
        }
        
    }

    @AuraEnabled(cacheable=false)
    public static dmlResult createExpense(String email, Decimal amount, String description, Date expDate){
        try {
            Contact cardKeeper = [select Id from Contact where Email=:email limit 1];
            System.debug(cardKeeper);

            ExpenseCard__c newCard = new ExpenseCard__c(CardKeeper__c = cardKeeper.Id,
                                                        Amount__c=amount,
                                                        Description__c=description,
                                                        CardDate__c=expDate);
            
            Database.SaveResult res = Database.insert(newCard);
            return new dmlResult(res.isSuccess(), res.getErrors().get(0).getMessage());
        }
        catch(Exception e) {
            System.debug(e);
            return new dmlResult(false, e.getMessage());
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

    public class dmlResult {
        @AuraEnabled public Boolean success;
        @AuraEnabled public String error;
        public dmlResult(Boolean s, String ers) {
            success=s;
            error=ers;
        }
    }   
}