Ext.define('CleanTucson.controller.Home', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.util.GeoLocation'],

	config: {
		routes: {
			
			
		'': 'goHome',
		'mess/:id': 'onMapDetailBack',
		'map': 'onMapDetailBack'
		
		//'submit': 'onSubmitVioTap'
		
		},
		
		refs: {
			mapNavView: 'mapNavView',
			btnMapHome: 'button[action=toolBarMapHome]',
			storeButton: 'button[action=testStore]',
			mapInfoContainer: {selector: 'mapContainer #mapDetail'},
			testPanel:  {selector: 'homePanel2 #testPanel'},
			homeTitleBar: {selector:'homePanel2 #mainBar' },
			btnShowDetail: '#btnMapDetail',
			btnMapBack: 'button[action=mapBack]',
			submitContain: 'submitContainer',
			mapDetail: 'violationMapDetail',
			dateEnteredField:		'#enteredDateMapDetail',
      		latField: 		'#latFieldMapDetail',
      		lngField: 		'#lngFieldMapDetail',
      		addressField:	'#addressFieldMapDetail',
      		descriptionField: '#descriptionFieldMapDetail',
      		selectField:	'#selectFieldMapDetail',
      		toggleField:	'#toggleFieldMapDetail',
      		btnUpdateMap: 	'button[action=detailUpdateMap]',
      		btnRefreshMap:	'button[action=mapRefresh]',
      		map:			'#googlemap'
		},
		
	    control: {
	    	
	    	'#btnMap': {
                // On the tap event, call onNewTap
                tap: 'onNewTap'
           },
           '#btnVioList': {
           		tap: 'onVioListTap'
           },
           '#btnSubmitVio': {
           		tap: 'onSubmitVioTap'
           },
           btnMapHome: {
           		tap: 'goHome'
           },
           
           storeButton: {
           		tap: 'onStoreTest'
           },
           '#btnMapDetail': {
           		tap: 'onBtnShowDetailTap'
           },
           mapDetail: {
           		show: 'onMapDetailShow'
           },
           'button[action=mapBack]': {
           		tap: 'onMapDetailBack'
           },
           btnRefreshMap: {
           		tap: 'onRefreshMapTap'
           }
           /*
           'button[action=showFullImage]': {
           		tap: 'onShowFullImageMap'
           }
           */
      }
	},
		
	 //launch: function() {
    	//console.log('Launch');
        // When our controller is launched, create an instance of our User view and add it to the viewport
        // which has a card layout
       // Ext.Viewport.add(Ext.create('CleanTucson.view.Main'));
        
        /* Not used !!
        var geo = Ext.create('Ext.util.Geolocation', {
    autoUpdate: true,
    listeners: {
        locationupdate: function(geo) {
            alert('New latitude: ' + geo.getLatitude());
        },
        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
            if(bTimeout){
                alert('Timeout occurred.');
            } else {
                alert('Error occurred.');
            }
        }
    }
});
*/

//console.log('Location');
//geo.updateLocation();
        
        
        
    //},

    onNewTap: function() {
    	console.log('Test Button');
        
        //Add page to history for browser and android back button functionality
        var history = this.getApplication().getHistory();
    	history.add(new Ext.app.Action({
    		url: 'map'
    	}), true);
        
         //The map view is being auto created so it only has to set active here
        Ext.Viewport.setActiveItem('mapNavView');
        
        console.log('Map Shown');
    },
    
    mapController: function(googlemap) {    	
    	
    	//console.log(googlemap);
    	
    	//if (googlemap == null) {
    	//	console.log("Map Refresh");
    		//googlemap = this.getMap();
    	
    	this.gmap  = googlemap;
    	
    	//}
    	console.log(googlemap);
    	
    	console.log("Load Map");
    	//Ext.ComponentQuery.query('#mapDetail').setHtml("Detail Says Hello");
    	//Ext.getCmp("#mapDetail").setHtml("Shit");
    	//var mi = CleanTucson.view.Map.items.get(1);
    	//mi.update("Wow");
    	
    	//console.log(this);
    	//var p = this.getMapInfoContainer()
    	//console.log(p);
    	//p.setHtml("Why??")
    	
    	var cmarker = new google.maps.Marker({
    			position: new google.maps.LatLng(32.264237, -110.960283), 
    			map: googlemap,
    			icon: 'resources/images/location.png'
    		});
    	
    	//Uncomment to enable geolocation
    	
    	
    	 var geo = Ext.create('Ext.util.Geolocation', {
		    autoUpdate: true,
		    listeners: {
		        locationupdate: function(geo) {
		        	var latLngCenter = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
		        	
		            console.log('New latitude: ' + geo.getLatitude());
		            cmarker.setPosition(latLngCenter);
		            
		           // googlemap.setCenter(latLngCenter);
		        },
		        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
		            if(bTimeout){
		                console.log('Timeout occurred.');
		            } else {
		                console.log('Error occurred.');
		            }
		        }
		    }
		});
		geo.updateLocation();
		
		
		
	
		
    	/*
    	
    	Ext.device.Geolocation.watchPosition({
		    frequency: 3000, // Update every 3 seconds
		    callback: function(position) {
		        console.log('Position updated!', position.coords);
		       // var latLng = new google.maps.LatLng(violation.get('lat'), violation.get('lng'));
		        googlemap.setCenter(position.coords);
		    },
		    failure: function() {
		        console.log('something went wrong!');
		    }
		});
		
		/*
			Ext.device.Geolocation.watchPosition({
			    frequency: 3000, // Update every 3 seconds
			    callback: function(position) {
			        console.log('Position updated!', position.coords);
			    },
			    failure: function() {
			        console.log('something went wrong!');
			    }
			});
			*/
			
			
			
    	
    	
    	this.test1 = 42;
    	var panelRef = this.getMapInfoContainer();
    	//console.log(panelRef);
    	var btnShowDetailRef = this.getBtnShowDetail();
    	
    	
    	console.log('map control');
    	var violationList = Ext.getStore('Violations');
    	//violationList.load();
    	
    	for (var i = 0, ln = violationList.getCount(); i < ln; i++) {
    		//console.log(violationList[i].data);
    		console.log(violationList.getAt(i));
    		console.log(violationList.getAt(i).get('status'));
    		
    		//Only display open messes on map
    		if (violationList.getAt(i).get('status') == 'open') {
    			addMarker(violationList.getAt(i));
    		}
    	}
    	
    	//var currentViolationRef = this.getController('CleanTucson.controller.Home').getInternalVar();
    	var scopeRef = this;

    	function addMarker(violation) {
    		console.log('Add Marker');
    		var latLng = new google.maps.LatLng(violation.get('lat'), violation.get('lng'));
    		
    		var vtype = violation.get('violation_type').toLowerCase();
   		
	   		console.log(vtype);
	   		
	   		var image = 'resources/images/';
	   		
	   		if (vtype.indexOf('mess') != -1) {
	   			
	   			image += 'messi.png';
	   		}
	   		
	   		if (vtype.indexOf('bigitem') != -1) {
	   			image += 'bigi.png';
	   		}
	   		
	   		if(vtype.indexOf('weeds') != -1) {
	   			image += 'weedsi.png';
	   		}
    		
    		
    		//create new marker
    		var marker = new google.maps.Marker({
    			position: latLng,
    			map: googlemap,
    			title: violation.get('violation_type'),
    			icon: image
    		});
    		
    		var popup;
    		
    		var infoWindowConent = '<div class="infowindow-content">' +
    			'<ul>' +
    				'<li>Type: ' + violation.get('type') + '</li>' +
    			'</ul> </div>';
    				
    		//mapInfoContainer.html = "Hello Map World"
    		
    		
    		
    		//Create popup on marker click
    		google.maps.event.addListener(marker, 'click', function() {
    			//context.getmapInfoContainer().setHtml('Hello Map World');
    			
    			//Ext.ComponentQuery.query('#mapDetail').update("Detail Says Hello");
    			//md.update('Hellp Map Detail');
    			//var me = this; 
				//var labelfield = me.getmapInfoContainer(); 
				//labelfield.setHtml('it is changing');
				
        			var mapDetailHtml = 
        				"<div id='map-vio-detail-container'>" +
						"<table class='vio-table'>" +
    					"  <tr class='vio-row'>" +
      					"	<td class='vio-type'>Address</td>" +
      					"   <td class='vio-data-left'>"+ violation.get('violation_address') + "</td>" +
      					"  	<td class='vio-type'>Status</td>" +
      					"	<td class='vio-data-right'>" + violation.get('status') + "</td>" +
      					"  </tr>" +
      					"  <tr class='vio-row'>" +
      					"	<td class='vio-type'>Description</td>" +
      					"	<td class='vio-data-left'>" + violation.get('description') + "</td>" +
      					"	<td class='vio-type'>Type</td>" +
      					"   <td class='vio-data-right'>" + violation.get('violation_type') + "</td>" +
      					"  </tr>" +
      					"</table>" +
      					"</div>";
				
				
				scopeRef.currentViolation = violation;
    			btnShowDetailRef.setDisabled(false);
    			panelRef.setHtml(mapDetailHtml);
    			
    			//popup.setContent(infoWindowConent);
    			//popup.open(googlemap, marker);
    		});
    		
    		//popup = new google.maps.InfoWindow();
    	}
    	
    	
    	
          //adding a marker to the map
        //var marker = new google.maps.Marker({
                 //   position: new google.maps.LatLng(32.2800, -111.01),
                  //  title : 'testing',
                 //   map: googlemap,
                 //   animation: google.maps.Animation.BOUNCE
              //  });
                
         //add all violations to map
                
               
        //setting the center of map, in this case: LatLng(20.5167, 46.2167)
       // googlemap.setCenter(new google.maps.LatLng(20.5167, 46.2167));
    },
    
    
    goHome: function() {
    	console.log('Go Home');
    	 Ext.Viewport.setActiveItem('home');
    	 
    },
    
    onStoreTest: function() {
    	console.log('Store Test');
    	
    	//testPanel.setHtml('WHYYY');
    	//Ext.ComponentQuery.query('homePanel2 #testPanel').pdate('Hello');
    	//console.log(CleanTucson.view.Main.items.get(1));
    	console.log(this);
    	var p = this.getTestPanel();
    	p.setHtml("Why??");
    	
    	var vioStore = Ext.getStore("Violations");
    	console.log('Number of Violations: ' + vioStore.getCount()); 
    	var firstRecord = vioStore.getAt(0);
  
    	console.log('Violation #1: ' + firstRecord.get('description'));
    },
    
    onVioListTap: function() {
    	console.log("Show violation list");
    	
    	//Only show open messes on initial load
    	Ext.StoreMgr.get('Violations').filter('status', "open");
 
    	var history = this.getApplication().getHistory();
    	history.add(new Ext.app.Action({
    		url: 'list'
    	}), true);
    	
    	Ext.Viewport.setActiveItem('listNavView');
    },
    
    onSubmitVioTap: function() {
    	console.log('Show violation submit');
    	//Add page to history for browser and android back functionality
    	var history = this.getApplication().getHistory();
    	history.add(new Ext.app.Action({
    		url: 'submit'
    	}), true);
    	
    	Ext.Viewport.setActiveItem('submitContainer');
    },
    
    onBtnShowDetailTap: function() {
    	console.log('Push Map Detail');
    	console.log(this.currentViolation);
    	
    	
    	var history = this.getApplication().getHistory();
    	history.add(new Ext.app.Action({
    		url: 'mess/' + this.currentViolation.get('id')
    	}), true);
    	
	
    	
    	//Push shared Detail view to the mapNavView
    	this.getMapNavView().push({
    		xtype: 'violationDetail',
    		title: 'Details',
    		data: this.currentViolation.getData()
    	});
    	
    	console.log(this.currentViolation.get('status'));
    	if (this.currentViolation.get('status') == 'closed') {
    		this.getBtnUpdateMap().setHidden(true);
    	} else {
    		this.getBtnUpdateMap().setHidden(false);
    	}
    	
    	
    	
    	//Hide detail button when in Detail view
    	this.getBtnShowDetail().setHidden(true);
    	
    	//Hide home button when idetailUpdateMapn Detail view
    	this.getBtnMapHome().setHidden(true);
   
    	//Show back button when in Detail view
    	this.getBtnMapBack().setHidden(false);
    },
    
    onMapDetailBack: function() {
    	if (this.getMapNavView()) {
			var viewId = this.getMapNavView().getActiveItem().getId();
			console.log(viewId);
			if (viewId.indexOf("violationDetail") != -1) {
				this.getBtnMapBack().setHidden(true);
				this.getBtnMapHome().setHidden(false);
				this.getBtnShowDetail().setHidden(false);
				this.getBtnUpdateMap().setHidden(true);
			}
	
			//this.getBtnUpdate().setHidden(true);
			this.getMapNavView().pop();
		}	
	},
	
	onRefreshMapTap: function() {
		console.log("Refresh Map");
		console.log(this.gmap);
		//mapController(this.gmap);
		CleanTucson.app.getController('Home').mapController(this.gmap);
		
	}
	
   	
});
