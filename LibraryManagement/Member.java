// Member class - base (parent) class for all library members
public abstract class Member {
    private int memberId;
    private String name;

    public Member(int memberId, String name) {
        this.memberId = memberId;
        this.name = name;
    }

    public int getMemberId() {
        return memberId;
    }

    public String getName() {
        return name;
    }

    // each type of member has its own allowed days and fine rate,
    // so subclasses must give their own implementation (method overriding)
    public abstract double calculateFine(int daysKept);

    public abstract String getMemberType();

    public void displayInfo() {
        System.out.println(memberId + "\t" + name + "\t" + getMemberType());
    }
}
