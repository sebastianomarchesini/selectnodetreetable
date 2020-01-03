/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"selectnodetreetable/selectnodetreetable/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"selectnodetreetable/selectnodetreetable/test/integration/pages/View",
	"selectnodetreetable/selectnodetreetable/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "selectnodetreetable.selectnodetreetable.view.",
		autoWait: true
	});
});