sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel"
], function (ODataModel) {
    "use strict";
    return {
        createHRModel: function () {
            // Create OData Model for HR Attendance Service
            var oHRModel = new ODataModel("/sap/opu/odata/hr/HRService/", {
                defaultBindingMode: "TwoWay",
                defaultCountMode: "Inline",
                refreshAfterChange: true
            });
            return oHRModel;
        }
    };
});