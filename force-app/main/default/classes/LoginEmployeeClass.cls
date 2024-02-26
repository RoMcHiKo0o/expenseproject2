public with sharing class LoginEmployeeClass {
    @AuraEnabled(cacheable=false)
    public static Map<String, Object> checkEmployee(String login, String password) {
        Map<String, Object> result = new Map<String, Object>();
        List<Contact> employeeList = new List<Contact>();
        employeeList = [select Email, Password__c, Admin__c, Office__c from Contact where Email=:login and Password__c=:password limit 1];
        
        System.debug(employeeList);
        
        if (employeeList.size()==1) {
            result.put('status', true);
            result.put('email', employeeList.get(0).Email);
            result.put('office', employeeList.get(0).Office__c);
            System.debug(employeeList.get(0).Office__c);
            result.put('isAdmin', employeeList.get(0).Admin__c);
        }
        
        else {
            result.put('status', false);
        }

        System.debug(result);
    	return result;
    }
    
}