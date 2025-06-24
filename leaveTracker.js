function createLeaveTracker(empId) {
  let totalLeaveDays = 0;

  return {
    applyLeave: function (leaveType, fromDate, toDate, status) {
      if (status !== "Approved") {
        console.log(`Leave not approved for ${empId}. Skipping.`);
        return;
      }

      const from = new Date(fromDate);
      const to = new Date(toDate);
      const timeDiff = Math.abs(to - from);
      const daysTaken = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

      totalLeaveDays += daysTaken;
      console.log(`Employee ${empId} took ${daysTaken} day(s) of ${leaveType} leave.`);
    },

    getTotalLeaves: function () {
      return totalLeaveDays;
    }
  };
}

// Example usage
const emp101Tracker = createLeaveTracker("E101");

emp101Tracker.applyLeave("Sick", "2025-06-01", "2025-06-03", "Approved");
emp101Tracker.applyLeave("Casual", "2025-06-10", "2025-06-10", "Pending"); // Should be ignored
emp101Tracker.applyLeave("Casual", "2025-06-11", "2025-06-12", "Approved");

console.log("Total Leaves Taken:", emp101Tracker.getTotalLeaves());
