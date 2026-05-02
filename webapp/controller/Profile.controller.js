sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Profile", {
        onInit: function () {
            var oProfileData = {
                Personal: {
                    FullName: "Riya Kedar",
                    Email: "riya.kedar@company.com",
                    Position: "AWS Cloud Architect",
                    Department: "Engineering",
                    Photo: "https://randomuser.me/api/portraits/women/12.jpg",
                    JoinDate: "March 15, 2026"
                },
                Stats: {
                    TotalLeaves: 12,
                    Approved: 8,
                    Pending: 3,
                    Rejected: 1,
                    PerformanceRatings: 5
                }
            };
            var oModel = new JSONModel(oProfileData);
            this.getView().setModel(oModel);

            var oViewModel = new JSONModel({
                editMode: false,
                readMode: true
            });
            this.getView().setModel(oViewModel, "viewMode");
        },

        onEditPress: function () {
            var oViewModel = this.getView().getModel("viewMode");
            oViewModel.setProperty("/editMode", true);
            oViewModel.setProperty("/readMode", false);
        },

        onSavePress: function () {
            var oViewModel = this.getView().getModel("viewMode");
            oViewModel.setProperty("/editMode", false);
            oViewModel.setProperty("/readMode", true);
            MessageToast.show("Profile updated successfully");
        }
    });
});