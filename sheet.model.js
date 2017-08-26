angular.module('app').service('sheet.model', [function () {
    this.headers = [];
    this.rows = [];
    this.mapping = {};
    this.numRows = 0;

    this.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    this.fillSheet = function (model, idField) {
        var self = this;
        var i = 0;
        var length = 0;

        this.headers = model.attributes.labels;
        this.numRows = model.attributes.last;
        if (model.rows.length > 1) {
            var rawRows = model.rows;
            rawRows.splice(0, 1);
            rawRows.map(function(row){
                length = row.cellsArray.length;
                var newRow = {};
                for(i = 0; i < length; i++) {
                    newRow[row.labels[i]] = self.isNumeric(row.cellsArray[i]) ? Number(row.cellsArray[i]) : row.cellsArray[i];
                }
                self.rows.push(newRow);
            });
            self.rows.map(function(row, index){
                self.mapping[row[idField]] = index;
            });
        }
    };

    this.tableToJson = function (tableId, idField) {
        var tableObject = $('#' + tableId),
        rows = [],
        header = [];
    
        tableObject.find('thead th').each(function () {
            header.push($(this).html());
        });
        
        tableObject.find('tbody tr').each(function () {
            var row = {};
        
            $(this).find('td').each(function (i) {
                var key = header[i],
                    value = $(this).html();
        
                row[key] = value;
            });
        
            rows.push(row);
        });
        
        rows.map(function(row, index){
            self.mapping[row[idField]] = index;
        });

        this.headers = header;
        this.rows = rows;
        this.numRows = rows.length;
    };

    this.getHeaders = function () {
        return this.headers;
    };

    this.getRows = function () {
        return this.rows;
    };

    this.getNumRows = function () {
        return this.numRows;
    };

    this.getMapping = function () {
        return this.mapping;
    };

    this.transformRows = function () {
        for (var i = 0; i < this.rows.length; i++) {
            this.rows[i]['inStock'] = -1;
            this.rows[i]['priceChanged'] = false;
            
        }
    };

    this.getDebugInfo = function () {
        console.log('Rows:', this.getRows());
        console.log('Headers:', this.getHeaders());
        console.log('# Rows', this.getNumRows());
    };

    return this;    
}]);
