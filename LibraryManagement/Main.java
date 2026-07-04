import java.util.Scanner;

// Main class - menu driven program for the Library Management System
public class Main {
    public static void main(String[] args) {
        Library library = new Library();
        Scanner sc = new Scanner(System.in);
        int choice;

        System.out.println("===== Library Management System =====");

        do {
            System.out.println("\n---------- MENU ----------");
            System.out.println("1. Add Book");
            System.out.println("2. Add Member");
            System.out.println("3. Issue Book");
            System.out.println("4. Return Book");
            System.out.println("5. Display All Books");
            System.out.println("6. Display All Members");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // consume leftover newline

            switch (choice) {
                case 1:
                    System.out.print("Enter book id: ");
                    int bookId = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter title: ");
                    String title = sc.nextLine();
                    System.out.print("Enter author: ");
                    String author = sc.nextLine();
                    library.addBook(new Book(bookId, title, author));
                    break;

                case 2:
                    System.out.print("Enter member id: ");
                    int memberId = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter name: ");
                    String name = sc.nextLine();
                    System.out.print("Member type (1 = Student, 2 = Faculty): ");
                    int type = sc.nextInt();
                    if (type == 1) {
                        library.addMember(new StudentMember(memberId, name));
                    } else if (type == 2) {
                        library.addMember(new FacultyMember(memberId, name));
                    } else {
                        System.out.println("Invalid member type!");
                    }
                    break;

                case 3:
                    System.out.print("Enter book id: ");
                    int issueBookId = sc.nextInt();
                    System.out.print("Enter member id: ");
                    int issueMemberId = sc.nextInt();
                    library.issueBook(issueBookId, issueMemberId);
                    break;

                case 4:
                    System.out.print("Enter book id: ");
                    int returnBookId = sc.nextInt();
                    System.out.print("Enter member id: ");
                    int returnMemberId = sc.nextInt();
                    System.out.print("How many days was the book kept? ");
                    int days = sc.nextInt();
                    library.returnBook(returnBookId, returnMemberId, days);
                    break;

                case 5:
                    library.displayBooks();
                    break;

                case 6:
                    library.displayMembers();
                    break;

                case 7:
                    System.out.println("Thank you for using the Library Management System!");
                    break;

                default:
                    System.out.println("Invalid choice, please try again.");
            }
        } while (choice != 7);

        sc.close();
    }
}
