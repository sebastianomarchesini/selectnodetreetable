sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("selectnodetreetable.selectnodetreetable.controller.View", {
		onInit: function () {
			var that = this;
			var oModel = new JSONModel("model/Clothing.json");
			oModel.attachRequestCompleted(function (oEvent) {
				that.addSelectOnModel();
			});
			this.getView().setModel(oModel);
		},

		onCollapseAll: function () {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},

		onCollapseSelection: function () {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapse(oTreeTable.getSelectedIndices());
		},

		onExpandFirstLevel: function () {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expandToLevel(1);
		},

		onExpandSelection: function () {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expand(oTreeTable.getSelectedIndices());
		},

		addSelectOnModel: function () {
			var oModel = this.getView().getModel();
			var oData = oModel.getData();
			var aCategories = oData.catalog.clothing.categories;
			var fSetSelect = function (aArray) {
				for (var i = 0; i < aArray.length; i++) {
					aArray[i].selected = false;
					if (aArray[i].categories) fSetSelect(aArray[i].categories);
				}
			}(aCategories);
			oModel.setData(oData);
			return oModel;
		},

		onSelectCheckBoxTreeTable: function (oEvent) {
			var oObject = {};
			var oModel = oEvent.getSource().getParent().getModel();
			oObject.path = oEvent.getSource().getBindingContext().sPath;
			oObject.object = oModel.getObject(oObject.path);
			if (oObject.object.categories !== undefined) {
				//if is not leef
				this.selectedModel(oObject);
				if (!oObject.object.selected) {
					var sPath = oObject.path;
					this.unselectedModel(oObject, sPath);
				}
			} else {
				//if is leef
				var sPath = oObject.path;
				this.unselectedModel(oObject, sPath);
			}
		},

		selectedModel: function (oObject) {
			var bSelected = oObject.object.selected;
			var aElement = oObject.object.categories;
			for (var i = 0; i < aElement.length; i++) {
				if (aElement[i].edit || aElement[i].edit === undefined)
					aElement[i].selected = bSelected;
				if (aElement[i].categories !== undefined) {
					var oElementObject = {
						object: aElement[i]
					};
					this.selectedModel(oElementObject);
				}
			}
		},
		unselectedModel: function (oObject, sPath) {
			var oModel = this.getView().getModel();
			var aSplitPath = sPath.split("/");
			aSplitPath.pop();
			aSplitPath.pop();
			sPath = aSplitPath.join('/');
			var oParetnObject = oModel.getObject(sPath);
			if (oParetnObject.selected && !oObject.selected) {
				oParetnObject.selected = false;
				this.unselectedModel(oParetnObject, sPath);
			}
		}
	});
});