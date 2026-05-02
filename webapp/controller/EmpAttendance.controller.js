sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";
    return Controller.extend("com.hr.portal.controller.EmpAttendance", {
        onInit: function () {
            // Get HRModel from component
            var oHRModel = this.getOwnerComponent().getModel("HRModel");
            // Check if model is available
            if (!oHRModel) {
                MessageToast.show("HR Model not found!");
                return;
            }
            // Set the model on the view
            this.getView().setModel(oHRModel, "HRModel");
            // Load attendance data
            this._loadAttendanceData();
        },
        // --------------------------------------------------------
        // Load Attendance Data from Mock Server
        // --------------------------------------------------------
        _loadAttendanceData: function () {
            var oHRModel = this.getView().getModel("HRModel");
            // Read PersonalRecords from Mock Server
            oHRModel.read("/PersonalRecords", {
                success: function (oData) {
                    console.log("Attendance data loaded successfully!");
                    console.log(oData);
                },
                error: function (oError) {
                    console.log("Error loading attendance data!");
                    MessageToast.show("Error loading attendance data!");
                }
            });
        },
        // --------------------------------------------------------
        // Open Leave Dialog
        // --------------------------------------------------------
        onOpenLeaveDialog: function () {
            // Get the dialog from the view
            var oDialog = this.byId("idLeaveDialog");
            // Clear all fields before opening
            this.byId("idLeaveType").setValue("");
            this.byId("idLeaveDate").setValue("");
            this.byId("idLeaveReason").setValue("");
            // Open the dialog
            oDialog.open();
        },
        // --------------------------------------------------------
        // Validate Leave Fields
        // --------------------------------------------------------
        _validateLeaveFields: function () {
            var bValid = true;
            // Get field values
            var oLeaveType = this.byId("idLeaveType");
            var oLeaveDate = this.byId("idLeaveDate");
            var oLeaveReason = this.byId("idLeaveReason");
            // Validate Leave Type
            if (!oLeaveType.getValue()) {
                oLeaveType.setValueState("Error");
                oLeaveType.setValueStateText("Leave Type is required");
                bValid = false;
            } else {
                oLeaveType.setValueState("None");
            }
            // Validate Date Range
            if (!oLeaveDate.getValue()) {
                oLeaveDate.setValueState("Error");
                oLeaveDate.setValueStateText("Date Range is required");
                bValid = false;
            } else {
                oLeaveDate.setValueState("None");
            }
            // Validate Reason
            if (!oLeaveReason.getValue()) {
                oLeaveReason.setValueState("Error");
                oLeaveReason.setValueStateText("Reason is required");
                bValid = false;
            } else {
                oLeaveReason.setValueState("None");
            }
            return bValid;
        },
        // --------------------------------------------------------
        // Submit Leave Request
        // --------------------------------------------------------
        onSubmitLeave: function () {
            // First validate all fields
            if (!this._validateLeaveFields()) {
                MessageToast.show("Please fill all required fields!");
                return;
            }
            var oHRModel = this.getView().getModel("HRModel");
            // Build the new leave request object
            var oNewLeaveRequest = {
                LeaveId: "LR" + new Date().getTime(),
                LeaveType: this.byId("idLeaveType").getValue(),
                DateRange: this.byId("idLeaveDate").getValue(),
                Reason: this.byId("idLeaveReason").getValue(),
                Status: "Pending"
            };
            // Save Leave Request to Mock Server
            oHRModel.create("/LeaveRequests", oNewLeaveRequest, {
                success: function () {
                    console.log("Leave request submitted successfully!");
                    // Update Attendance Table with Leave Pending status
                    this._updateAttendanceTable(oNewLeaveRequest.DateRange);
                    // Show success message
                    MessageToast.show("Leave request submitted successfully!");
                    // Close the dialog
                    this.byId("idLeaveDialog").close();
                }.bind(this),
                error: function (oError) {
                    console.log("Error submitting leave request!");
                    MessageBox.error("Error submitting leave request. Please try again!");
                }
            });
        },
        // --------------------------------------------------------
        // Update Attendance Table after Leave Submission
        // --------------------------------------------------------
        _updateAttendanceTable: function (sDateRange) {
            var oHRModel = this.getView().getModel("HRModel");
            // Build new attendance record with Leave Pending status
            var oNewAttendanceRecord = {
                Date: sDateRange,
                Status: "Leave Pending",
                CheckIn: "-",
                CheckOut: "-",
                TotalHours: "0h"
            };
            // Create new record in PersonalRecords
            oHRModel.create("/PersonalRecords", oNewAttendanceRecord, {
                success: function () {
                    console.log("Attendance table updated successfully!");
                    // Refresh the attendance table
                    oHRModel.refresh();
                },
                error: function (oError) {
                    console.log("Error updating attendance table!");
                }
            });
        },
        // --------------------------------------------------------
        // Cancel Leave Dialog
        // --------------------------------------------------------
        onCancelLeave: function () {
            // Clear all fields
            this.byId("idLeaveType").setValue("");
            this.byId("idLeaveDate").setValue("");
            this.byId("idLeaveReason").setValue("");
            // Reset value states
            this.byId("idLeaveType").setValueState("None");
            this.byId("idLeaveDate").setValueState("None");
            this.byId("idLeaveReason").setValueState("None");
            // Close the dialog
            this.byId("idLeaveDialog").close();
        }
    });
});