function createLeaveTracker(empId) {
  let totalLeaveDays = 0;
  const leaveRecords = [];

  return {
    applyLeave: function (leaveType, fromDate, toDate, status) {
      const record = { leaveType, fromDate, toDate, status };

      const from = new Date(fromDate);
      const to = new Date(toDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time for accurate comparison

      // 🛑 Date validation
      if (from > to) {
        console.log("❌ From date is after To date. Invalid leave.");
        alert("From date cannot be after To date.");
        return;
      }

      if (from < today) {
        console.log("❌ Leave cannot be applied for past dates.");
        alert("Cannot apply leave for past dates.");
        return;
      }

      if (status === "Approved") {
        const daysTaken = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
        totalLeaveDays += daysTaken;
        record.daysTaken = daysTaken;
        console.log(`✅ Leave approved: ${daysTaken} day(s)`);
      } else {
        record.daysTaken = 0;
        console.log(`ℹ️ Leave status is '${status}'. Not counted.`);
      }

      leaveRecords.push(record);
      console.log("📦 Leave record added:", record);
    },

    getTotalLeaves: function () {
      console.log("📊 Getting total leaves:", totalLeaveDays);
      return totalLeaveDays;
    },

    getLeaveDetails: function () {
      console.log("📋 All leave records:", leaveRecords);
      return leaveRecords;
    }
  };
}

const trackers = {};

document.getElementById("leaveForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const empId = document.getElementById("empId").value.trim();
  const leaveType = document.getElementById("leaveType").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const status = document.getElementById("status").value;

  if (!trackers[empId]) {
    trackers[empId] = createLeaveTracker(empId);
    console.log(`👤 Created tracker for employee: ${empId}`);
  }

  trackers[empId].applyLeave(leaveType, fromDate, toDate, status);

  const total = trackers[empId].getTotalLeaves();
  const details = trackers[empId].getLeaveDetails();

  let output = `Total leaves taken by ${empId}: ${total}<br/><br/>Leave History:<ul>`;
  details.forEach(d => {
    output += `<li>${d.leaveType} leave from ${d.fromDate} to ${d.toDate} — ${d.status} (${d.daysTaken} days)</li>`;
  });
  output += "</ul>";

  document.getElementById("output").innerHTML = output;
  document.getElementById("leaveForm").reset();
});
