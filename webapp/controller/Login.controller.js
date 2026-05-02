sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("com.hr.portal.controller.Login", {
        onInit: function () {
            // Reset role model flags on login page load
            // This ensures clean state every time login page is shown
            var oRoleModel = this.getOwnerComponent().getModel("roleModel");
            if (oRoleModel) {
                oRoleModel.setProperty("/isHR", false);
                oRoleModel.setProperty("/isEmployee", false);
            }
        },
        onLogin: function () {
            var oView = this.getView();
            var sUsername = oView.byId("usernameInput").getValue();
            var sPassword = oView.byId("passwordInput").getValue();
            var oUsernameInput = oView.byId("usernameInput");
            // 1. Check if fields are empty
            if (!sUsername || !sPassword) {
                MessageToast.show("Please fill the fields");
                return;
            }
            // 2. Username Validation
            // Exactly 8 characters must contain both letters and numbers
            var nameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8}$/;
            if (!nameRegex.test(sUsername)) {
                oUsernameInput.setValueState("Error");
                oUsernameInput.setValueStateText("Username must be 8 characters with letters and numbers");
                MessageToast.show("Invalid Username format");
                return;
            } else {
                oUsernameInput.setValueState("None");
            }
            // 3. Get existing role model from component
            // Do not create a new one just update the existing one
            // which was initialized in App.controller.js onInit
            var oRoleModel = this.getOwnerComponent().getModel("roleModel");
            if (!oRoleModel) {
                MessageToast.show("Role model not found!");
                return;
            }
            var oRouter = this.getOwnerComponent().getRouter();
            // 4. Password based Redirection Logic
            if (sPassword === "hr@admin") {
                // Set HR role flags
                oRoleModel.setProperty("/isHR", true);
                oRoleModel.setProperty("/isEmployee", false);
                MessageToast.show("Welcome back, HR Admin");
                oRouter.navTo("RouteDashboard");
            } else {
                // Set Employee role flags
                oRoleModel.setProperty("/isHR", false);
                oRoleModel.setProperty("/isEmployee", true);
                MessageToast.show("Welcome, " + sUsername);
                oRouter.navTo("RouteEmployeeDashboard");
            }
        },
        onForgotPassword: function () {
            MessageToast.show("Please contact HR support to reset your password.");
        }
    });
});