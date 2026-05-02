sap.ui.define([
    "sap/ui/core/util/MockServer"
], function (MockServer) {
    "use strict";
    return {
        init: function () {
            // Create the Mock Server instance
            var oMockServer = new MockServer({
                rootUri: "/sap/opu/odata/hr/HRService/"
            });
            // Configure Mock Server simulation delay
            MockServer.config({
                autoRespond: true,
                autoRespondAfter: 500
            });
            // Point to metadata and mockdata folder
            oMockServer.simulate(
                sap.ui.require.toUrl("com/hr/portal/localService/metadata.xml"),
                {
                    sMockdataBaseUrl: sap.ui.require.toUrl("com/hr/portal/localService/mockdata"),
                    bGenerateMissingMockData: true
                }
            );
            // Start the Mock Server
            oMockServer.start();
            console.log("Mock Server started successfully!");
        }
    };
});