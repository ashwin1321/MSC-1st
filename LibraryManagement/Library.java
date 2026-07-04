import java.util.ArrayList;

// Library class - contains the collection of books and members (association)
public class Library {
    private ArrayList<Book> books;
    private ArrayList<Member> members;

    public Library() {
        books = new ArrayList<>();
        members = new ArrayList<>();
    }

    public void addBook(Book book) {
        books.add(book);
        System.out.println("Book \"" + book.getTitle() + "\" added successfully.");
    }

    public void addMember(Member member) {
        members.add(member);
        System.out.println("Member \"" + member.getName() + "\" added successfully.");
    }

    // helper methods to search by id
    public Book findBook(int bookId) {
        for (Book b : books) {
            if (b.getBookId() == bookId) {
                return b;
            }
        }
        return null;
    }

    public Member findMember(int memberId) {
        for (Member m : members) {
            if (m.getMemberId() == memberId) {
                return m;
            }
        }
        return null;
    }

    public void issueBook(int bookId, int memberId) {
        Book book = findBook(bookId);
        Member member = findMember(memberId);

        if (book == null) {
            System.out.println("Book with id " + bookId + " not found!");
            return;
        }
        if (member == null) {
            System.out.println("Member with id " + memberId + " not found!");
            return;
        }
        if (!book.isAvailable()) {
            System.out.println("Sorry, \"" + book.getTitle() + "\" is already issued.");
            return;
        }

        book.issueBook();
        System.out.println("Book \"" + book.getTitle() + "\" issued to " + member.getName() + ".");
    }

    public void returnBook(int bookId, int memberId, int daysKept) {
        Book book = findBook(bookId);
        Member member = findMember(memberId);

        if (book == null) {
            System.out.println("Book with id " + bookId + " not found!");
            return;
        }
        if (member == null) {
            System.out.println("Member with id " + memberId + " not found!");
            return;
        }
        if (book.isAvailable()) {
            System.out.println("This book was not issued.");
            return;
        }

        book.returnBook();
        // polymorphism - the correct calculateFine() runs depending on member type
        double fine = member.calculateFine(daysKept);
        System.out.println("Book \"" + book.getTitle() + "\" returned by " + member.getName() + ".");
        if (fine > 0) {
            System.out.println("Late return! Fine to pay: Rs. " + fine);
        } else {
            System.out.println("Returned on time. No fine.");
        }
    }

    public void displayBooks() {
        if (books.isEmpty()) {
            System.out.println("No books in the library yet.");
            return;
        }
        System.out.println("ID\tTitle\tAuthor\tStatus");
        System.out.println("--------------------------------------------");
        for (Book b : books) {
            b.displayInfo();
        }
    }

    public void displayMembers() {
        if (members.isEmpty()) {
            System.out.println("No members registered yet.");
            return;
        }
        System.out.println("ID\tName\tType");
        System.out.println("--------------------------------------------");
        for (Member m : members) {
            m.displayInfo();
        }
    }
}
