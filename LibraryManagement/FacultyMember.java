// FacultyMember inherits from Member
public class FacultyMember extends Member {
    private static final int ALLOWED_DAYS = 30;   // faculty can keep a book for 30 days
    private static final double FINE_PER_DAY = 2; // Rs. 2 per late day (lower rate)

    public FacultyMember(int memberId, String name) {
        super(memberId, name);
    }

    // overriding calculateFine() for faculty
    @Override
    public double calculateFine(int daysKept) {
        if (daysKept <= ALLOWED_DAYS) {
            return 0;
        }
        return (daysKept - ALLOWED_DAYS) * FINE_PER_DAY;
    }

    @Override
    public String getMemberType() {
        return "Faculty";
    }
}
