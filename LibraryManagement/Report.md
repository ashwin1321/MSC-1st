# Library Management System — Report

**Name:** Ashwin
**Assignment:** Library Management System Using OOP (Java)

## Introduction

This project is a console based Library Management System written in Java. It manages books and members of a library and supports adding books, adding members, issuing books, returning books and calculating fines when a book is returned late. The whole program is menu driven, so the user just picks options from a menu.

## Classes Used

**1. Book** — Represents one book with a book id, title, author and an availability status. The `available` variable is private, so no other class can change it directly. It can only be changed through the `issueBook()` and `returnBook()` methods of the class.

**2. Member (abstract)** — The parent class for all members. It stores the member id and name. It declares an abstract method `calculateFine(int daysKept)` because every member type calculates the fine differently, so the child classes are forced to write their own version.

**3. StudentMember** — Extends `Member`. A student can keep a book for 14 days. After that, the fine is Rs. 5 per extra day.

**4. FacultyMember** — Extends `Member`. A faculty member gets more time (30 days) and a lower fine of Rs. 2 per extra day.

**5. Library** — The main class that holds everything together. It keeps an `ArrayList<Book>` and an `ArrayList<Member>` and contains the methods `addBook()`, `addMember()`, `issueBook()`, `returnBook()`, `displayBooks()` and `displayMembers()`.

**6. Main** — Contains the `main()` method and the menu loop using `Scanner`. Based on the user's choice, it calls the matching method of the `Library` object.

## OOP Concepts Demonstrated

**Encapsulation:** All data members in every class are `private`. For example the `available` status of a `Book` cannot be modified from outside; the only way to change it is through the public methods `issueBook()` and `returnBook()`. Other values are read using getter methods like `getTitle()` and `getMemberId()`.

**Inheritance:** `StudentMember` and `FacultyMember` both extend the `Member` class using the `extends` keyword. They reuse the common fields (id, name) and constructor of the parent through `super()`, and only add what is different about them (allowed days and fine rate).

**Polymorphism (Method Overriding):** The `calculateFine()` method is overridden in both subclasses. In `Library.returnBook()`, the fine is calculated by simply calling `member.calculateFine(daysKept)` on a `Member` reference — Java automatically runs the student version or the faculty version depending on which object it actually is at runtime. This is runtime polymorphism.

**Abstraction:** `Member` is an abstract class. We can never create a plain `Member` object, only a `StudentMember` or `FacultyMember`, which makes sense because a real library member is always one of the two.

**Association / Aggregation:** The `Library` class *has* many books and many members. This "has-a" relationship is implemented using two `ArrayList` collections inside the `Library` class.

## Fine Calculation Rules

| Member type | Allowed days | Fine per late day |
|---|---|---|
| Student | 14 | Rs. 5 |
| Faculty | 30 | Rs. 2 |

Example: a student returning a book after 20 days pays (20 − 14) × 5 = Rs. 30, while a faculty member returning after 25 days pays nothing since 25 ≤ 30.

## How to Run

```
javac *.java
java Main
```

## Conclusion

This assignment helped me understand how the four main OOP pillars work together in a real program. Encapsulation protected the book's availability, inheritance avoided repeating member code, and overriding `calculateFine()` showed how one method call can behave differently for different objects.
