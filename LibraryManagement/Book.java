// Book class - represents a single book in the library
public class Book {
    private int bookId;
    private String title;
    private String author;
    private boolean available;   // book availability is kept private (encapsulation)

    public Book(int bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.available = true;   // a new book is available by default
    }

    // getters
    public int getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public boolean isAvailable() {
        return available;
    }

    // availability can only be changed through these methods
    public void issueBook() {
        available = false;
    }

    public void returnBook() {
        available = true;
    }

    public void displayInfo() {
        String status = available ? "Available" : "Issued";
        System.out.println(bookId + "\t" + title + "\t" + author + "\t" + status);
    }
}
