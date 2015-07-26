
Ext.define('MyApp.view.main.UserGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'UserGrid',

    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*'
    ],

    title: 'Grid Users',
    frame: true,
    multiColumnSort: true,

    initComponent: function() {

        // Plagin for edit coll:
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        
        // Get data for table:
        this.store = new Ext.data.Store({
            fields: [
               {name: 'user'},
               {name: 'education'},
               {name: 'city'}
            ],
            proxy: {
                type: 'jsonp',
                url : 'http://cognitive.disonans/moduls/index.php',
                callbackKey: 'callback'
            }
        });
        
        Ext.apply(this, {
            height: 900,
            width : 800,
            // Include plagin:
            plugins: [this.cellEditing],
            store: this.store,
            
            // Colls data:
            columns: [{
                header: 'User',
                dataIndex: 'user',
                width: 250,
                // Coll edition:
                editor: new Ext.form.field.ComboBox({
                    displayField: 'name',
                    valueField: 'name',
                    // Get data for edition:
                    store: {
                        fields: ['name'],
                        proxy: { 
                            type: 'jsonp',
                            url : 'http://cognitive.disonans/moduls/index.php?get=users',
                            callbackKey: 'callback'
                        }
                    }
                })
            }, {
                header: 'Education ',
                dataIndex: 'education',
                flex: 1,
                editor: new Ext.form.field.ComboBox({
                    displayField: 'name',
                    valueField: 'name',
                    store: {
                        fields: ['name'],
                        proxy: { 
                            type: 'jsonp',
                            url : 'http://cognitive.disonans/moduls/index.php?get=education',
                            callbackKey: 'callback'
                        }
                    }
                })
            }, {
                header: 'City',
                dataIndex: 'city',
                width: 150,
                editor: new Ext.form.field.ComboBox({
                    displayField: 'city',
                    valueField: 'city',
                    store: {
                        fields: ['city'],
                        proxy: { 
                            type: 'jsonp',
                            url : 'http://cognitive.disonans/moduls/index.php?get=citys',
                            callbackKey: 'callback'
                        }
                    }
                })
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'http://dev.sencha.com/ext/5.1.0/examples/kitchensink/resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Plant',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],

            // ToolBar Block:
            tbar: [{
                text: 'Save',
                scope: this,
                handler: this.onSaveClick,
                items: [{
                    xtype: 'component',
                    itemId: 'order'
                }]
            }]
            
        });

        this.callParent();
        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });
    },

    loadStore: function() {
        this.getStore().load();
    },

    onSaveClick: function(){
        // Save function
    },

    onRemoveClick: function(grid, rowIndex){
        this.getStore().removeAt(rowIndex);
        // Delete string function
    }
});