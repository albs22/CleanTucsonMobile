Ext.define('CleanTucson.controller.List', {
	extend: 'Ext.app.Controller',
	
	routes: {
		'mess/:id': 'onBtnBackTap',
		'list': 'onBtnBackTap'
	},
	
	config: {
		refs: {	
      		listView: 			'violist',
      		listNavView: 		'listNavView',
      		btnBack: 			'button[action=listBack]',
      		btnUpdate:     		'button[action=detailUpdate]',
      		btnListHome:		'button[action=toolBarListHome]',
      		btnListRefresh:		'button[action=listRefresh]',
      		btnListFilter:		'button[action=listFilter]',
      		dateEnteredField:	'#enteredDateDetail',
      		latField: 			'#latFieldDetail',
      		lngField: 			'#lngFieldDetail',
      		addressField:		'#addressFieldDetail',
      		descriptionField: 	'#descriptionFieldDetail',
      		selectField:		'#selectFieldDetail',
      		toggleField:		'#toggleFieldDetail',
      		imageBeforePanel: 	'#beforeImgPanel',
      		imageAfterPanel: 	'#afterImgPanel',
      		img:				'#fimg'
      		
		},
		
		control: {
      		'list' : {
       			 disclose: 'onListItemTap'
      		},
      		'#btnDetailBack': {
      			tap: 'onBtnBackTap'
      		},
      		btnUpdate: {
      			tap: 'onBtnDetailUpdateTap'
      		},
      		
      		'button[action=showFullImage]': {
      			tap: 'onShowFullImage'	
      		},
      		btnListHome: {
           		tap: 'goHome'
            },
            btnListRefresh: {
            	tap: 'refreshList'
            },
            btnListFilter: {
            	tap: 'filterList'
            },
            "picker[itemId=vioPicker]": {
        		change: 'onFilterChanged'
    		}
      		
		}
	},
	
	 goHome: function() {
    	console.log('Go Home');
    	 Ext.Viewport.setActiveItem('home');
    	 
    },
	
	//Show detail page
	onListItemTap: function(list, record) {
		console.log('List Item Tap');
	
		this.getBtnBack().setHidden(false);
		this.getBtnUpdate().setHidden(false);
		this.getBtnListHome().setHidden(true);
		this.getBtnListRefresh().setHidden(true);
		this.getBtnListFilter().setHidden(true);
		
		if (record.get('status') == 'closed') {
    		this.getBtnUpdate().setHidden(true);
    	} else {
    		this.getBtnUpdate().setHidden(false);
    	}
    	
	
		console.log("Record urlId: " + record.get('id'));
		
	
		var history = this.getApplication().getHistory();
    	history.add(new Ext.app.Action({
    		url: "mess/" + record.get('id')
    	}), true);
	
	
    	this.getListNavView().push({
      		xtype: 'violationDetail',
      		title: 'Details',
      		data: 	record.getData(),
      		messId: record.get('id')
   		});
   		
   		this.currentViolationId = record.get('id');
   		//this.getDateEnteredField().setValue(record.get('dateEntered'));
   		//this.getLatField().setValue(record.get('lat'));
   		//this.getLngField().setValue(record.get('lng'));
   		//this.getAddressField().setValue(record.get('violation_address'));
   		//this.getDescriptionField().setValue(record.get('description'));
   		//this.getSelectField().setValue(record.get('type'));	
	},
	
	onBtnBackTap: function() {
		console.log('Back tap');
		
		if (this.getListNavView()) {
			var viewId = this.getListNavView().getActiveItem().getId();
			console.log(viewId);
			if (viewId.indexOf("violationDetail") != -1) {
				this.getBtnUpdate().setHidden(true);
				this.getBtnBack().setHidden(true);
				this.getBtnListHome().setHidden(false);
				this.getBtnListRefresh().setHidden(false);
				this.getBtnListFilter().setHidden(false);
				
			} else if (viewId.indexOf("fullimg" != -1)) {
				console.log("img view");
				this.getBtnListFilter().setHidden(true);
				this.getBtnListRefresh().setHidden(true);
				this.getBtnUpdate().setHidden(false);
			} else {
				consol.log('else');
				this.getBtnListRefresh().setHidden(false);
				this.getBtnListFilter().setHidden(false);
				this.getBtnUpdate().setHidden(true);
			}

			
			this.getListNavView().pop();
		}
	},
	
	onBtnDetailUpdateTap: function() {
		console.log("Detail Update");
		
		//var formValues = this.getFormRef().getValues();
		//console.log(formValues);
		/*	
		var updatedVio = Ext.create('CleanTucson.model.Violation', {
				lat: formValues.latitude,
				lng: formValues.longitude,
				violation_type: formValues.type,
				description: formValues.description,
				violation_address: formValues.address,
				status: formValues.status
		});
		*/
		
		
		var curId = this.currentViolationId;
		//this.currentViolationId = "";
		
		var store = Ext.getStore('Violations');
		console.log(store);
		
		console.log('Current ID: ' + curId);
		var index = store.findExact('id', curId);
		var record = store.getAt(index);
		console.log(record);
		
		var statusValue = this.getToggleField().getValue();
		console.log(statusValue);
		
		if (statusValue == 0) {
			statusValue = 'open';
		}		
		else {
			statusValue = 'closed';
		}
		
		record.set({status: statusValue});
		//console.log(store);
		//store.getProxy().setExtraParams = {
		//	id: this.currentViolationId
		//};
		
		var curUrl;
		console.log(this.apiUrl);
		if (this.apiUrl) {
			curUrl = this.apiUrl;
		} else {
			curUrl = store.getProxy().getUrl();
			curUrl = curUrl + '/' + curId;
			this.apiUrl = curUrl;
		}
		
		//var curUrl = store.getProxy().getUrl();
		//console.log("init url: " + curUrl);
		//curUrl = curUrl + '/' + curId;
		console.log(curUrl);
		store.getProxy().setUrl(curUrl);
		
	
		
		store.sync({
			success: function (rec, op){
				console.log('Sync was successful');
				console.log(op);
				//var msg = op.request.scope.reader.jsonData["msg"];
				//var msg = rec.operations[0].request.scope.reader.jsonData["msg"];
				//console.log(msg);
				Ext.Msg.alert('Update', 'Update was Successful');
			},
			failure: function (rec, op){
				console.log('Sync failed');
				Ext.Msg.alert('Update', 'Update Failed');
				//console.log(op.operations[0].request.scope.reader.jsonData["msg"]);
			},
			callback: function (batch){
				
				console.log('Always called after sync is complete whether it succeeded or not');
				
				
			}
		});
		
	},
	
	refreshList: function() {
		Ext.StoreMgr.get('Violations').load();
	},
	
	filterList: function() {
		if (!this.picker) {
			this.picker = Ext.Viewport.add([Ext.create('CleanTucson.view.FilterSelector')]);
			this.picker.show();
		} else {
			this.picker.show();
		}
	},
	
	onFilterChanged: function() {
		console.log('it changed');
	}
	
});
