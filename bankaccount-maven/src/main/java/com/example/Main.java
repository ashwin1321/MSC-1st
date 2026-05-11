package com.example;

public class Main {

    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACCOUNT-123", "Ram", 1000.00);

        account.deposit(500.00);
        account.withdraw(200.00);
        account.withdraw(2000.00);
        account.deposit(-50.00);
        account.deposit(100.00);

        account.getAccountDetails();
    }
}
