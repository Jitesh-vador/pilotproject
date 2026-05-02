sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Dashboard", {
        onInit: function () {
            this._loadMockData();
        },

        _loadMockData: function () {
            var oMockData = {
                TotalHeadcount: 10,
                PendingCount: 2,
                AttendanceAlerts: 1,
                OnTimeRate: 92, // Changed from Open Positions to an Attendance metric
                DeptDistribution: [
                    { Dept: "Engineering", Count: 5 },
                    { Dept: "Maintenance", Count: 1 },
                    { Dept: "Operations", Count: 1 },
                    { Dept: "Human Resources", Count: 2 },
                    { Dept: "Aviation", Count: 1 }
                ],
                MonthlyLeaveTrend: [
                    { Month: "Jan", Count: 2 },
                    { Month: "Feb", Count: 5 },
                    { Month: "Mar", Count: 1 },
                    { Month: "Apr", Count: 4 },
                    { Month: "May", Count: 1 }
                ],
                RecentActivity: [
                    { EmpName: "Clark Kent", Action: "Called in Sick", Date: "Today, 08:30 AM", Status: "Absent", State: "Error", Icon: "sap-icon://decline" },
                    { EmpName: "Diana Prince", Action: "Vacation Approved", Date: "Yesterday, 14:15 PM", Status: "Approved", State: "Success", Icon: "sap-icon://accept" },
                    { EmpName: "Barry Allen", Action: "Submitted Leave Request", Date: "Yesterday, 09:00 AM", Status: "Pending", State: "Warning", Icon: "sap-icon://sys-enter-2" }
                ],
                LeaveRequests: [
                    { EmpName: "BRUCE WAYNE", LeaveType: "Vacation", LeaveReason: "TRIP TO GOTHAM", Status: "Pending" },
                    { EmpName: "PETER PARKER", LeaveType: "Sick Leave", LeaveReason: "FEELING WEBBY", Status: "Pending" }
                ]
            };

            var oDashModel = new JSONModel(oMockData);
            this.getView().setModel(oDashModel, "dashLocal");
        }
    });
});