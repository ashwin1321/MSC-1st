// StudentMember inherits from Member
public class StudentMember extends Member {
    private static final int ALLOWED_DAYS = 14;   // students can keep a book for 14 days
    private static final double FINE_PER_DAY = 5; // Rs. 5 per late day

    public StudentMember(int memberId, String name) {
        super(memberId, name);
    }

    // overriding calculateFine() for students
    @Override
    public double calculateFine(int daysKept) {
        if (daysKept <= ALLOWED_DAYS) {
            return 0;
        }
        return (daysKept - ALLOWED_DAYS) * FINE_PER_DAY;
    }

    @Override
    public String getMemberType() {
        return "Student";
    }
}
