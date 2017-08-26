angular.module('app').service('spreadsheet.service', ['baseUrl', function (baseUrl) {
    
    this.createTable = function (parameters, callback) {
        var options = {
            url: baseUrl,
            callback: callback
        };
        
        if (!parameters) {
            alert('Parameters are missing');
        };

        if (!parameters.id) {
            parameters.id = 't' + (new Date().getTime());
        }

        var body = angular.element(document).find('body').eq(0);
        body.append('<table id="' + parameters.id + '" style="display:none"></table>');

        //https://developers.google.com/chart/interactive/docs/querylanguage
        if (parameters.query) {
            options.query = parameters.query;
        }

        if (parameters.fetchSize) {
            options.fetchSize = parameters.fetchSize;
        }

        $('#' + parameters.id).sheetrock(options);
    };

    return this;    
}]);
