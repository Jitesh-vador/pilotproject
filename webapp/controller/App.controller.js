sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/library",
    "sap/m/ResponsivePopover",
    "sap/m/List",
    "sap/m/StandardListItem"
], function (Controller, JSONModel, mobileLibrary, ResponsivePopover, List, StandardListItem) {
    "use strict";
    // Shortcut for placement type
    var PlacementType = mobileLibrary.PlacementType;
    return Controller.extend("com.hr.portal.controller.App", {
        // --------------------------------------------------------
        // On Init - Initialize Role Model
        // --------------------------------------------------------
        onInit: function () {
            // Initialize role model with both flags as false
            // This ensures nothing is visible before login
            var oRoleModel = new JSONModel({
                isHR: false,
                isEmployee: false
            });
            // Set the model on the component
            // so all views can access it
            this.getOwnerComponent().setModel(oRoleModel, "roleModel");
        },
        // --------------------------------------------------------
        // Side Nav Toggle
        // --------------------------------------------------------
        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },
        // --------------------------------------------------------
        // Navigation Item Select
        // --------------------------------------------------------
        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            var sKey = oItem.getKey();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(sKey);
        },
        // --------------------------------------------------------
        // Logout
        // --------------------------------------------------------
        onLogout: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            var oRoleModel = this.getOwnerComponent().getModel("roleModel");
            if (oRoleModel) {
                // Reset both flags to false on logout
                // This hides the sidebar and header buttons
                oRoleModel.setProperty("/isHR", false);
                oRoleModel.setProperty("/isEmployee", false);
            }
            // Navigate back to login page
            oRouter.navTo("RouteLogin");
        },
        // --------------------------------------------------------
        // Notification Popover
        // --------------------------------------------------------
        onNotificationPress: function (oEvent) {
            var oButton = oEvent.getSource();
            if (!this._oPopover) {
                this._oPopover = new ResponsivePopover({
                    title: "Pending Notifications",
                    placement: PlacementType.Bottom,
                    contentWidth: "300px",
                    content: new List({
                        items: [
                            new StandardListItem({
                                title: "Leave Request",
                                description: "Sarah Jenkins: Sick Leave (3 days)",
                                icon: "sap-icon://appointment-2",
                                type: "Navigation"
                            }),
                            new StandardListItem({
                                title: "Document Uploaded",
                                description: "Alex Rivera uploaded Passport Copy",
                                icon: "sap-icon://doc-attachment",
                                type: "Navigation"
                            })
                        ]
                    })
                });
                this.getView().addDependent(this._oPopover);
            }
            this._oPopover.openBy(oButton);
        }
    });
});