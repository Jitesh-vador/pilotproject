sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/library",
    "sap/m/ResponsivePopover",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/ui/core/Configuration"
], function (Controller, JSONModel, mobileLibrary, ResponsivePopover, List, StandardListItem, Configuration) {
    "use strict";
    
    var PlacementType = mobileLibrary.PlacementType;
    
    return Controller.extend("com.hr.portal.controller.App", {
        
        onInit: function () {
            var oRoleModel = new JSONModel({
                isHR: false,
                isEmployee: false
            });
            this.getOwnerComponent().setModel(oRoleModel, "roleModel");
        },
        
        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },
        
        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            var sKey = oItem.getKey();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(sKey);
        },

        onChangeLanguage: function (oEvent) {
            var sSelectedLanguage = oEvent.getParameter("selectedItem").getKey();
            Configuration.setLanguage(sSelectedLanguage);
        },
        
        onLogout: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            var oRoleModel = this.getOwnerComponent().getModel("roleModel");
            
            if (oRoleModel) {
                oRoleModel.setProperty("/isHR", false);
                oRoleModel.setProperty("/isEmployee", false);
            }
            
            oRouter.navTo("RouteLogin");
        },
        
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