sap.ui.define([
    "com/hr/portal/localService/mockserver",
    "sap/ui/core/ComponentSupport"
], function (mockserver) {
    "use strict";
    // First start the mock server
    mockserver.init();
    // Then ComponentSupport will load the app automatically
    // because it is imported above
});