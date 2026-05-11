package com.example;

public class BankAccount {

    private String accountNumber;
    private String ownerName;
    private double balance;

    public BankAccount(String accountNumber, String ownerName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = initialBalance;
        System.out.println("Account opened with initial balance: $" + initialBalance);
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit amount must be positive.");
            return;
        }
        balance += amount;
        System.out.println("Deposit: +$" + amount + " | Balance: $" + balance);
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Withdrawal amount must be positive.");
            return;
        }
        if (amount > balance) {
            System.out.println("Insufficient funds. Current balance: $" + balance);
            return;
        }
        balance -= amount;
        System.out.println("Withdrawal: -$" + amount + " | Balance: $" + balance);
    }

    public double getBalance() {
        return balance;
    }

    public void getAccountDetails() {
        System.out.println("Name: " + ownerName + " | Account Number: " + accountNumber + " | Balance: $" + balance);
    }
}
