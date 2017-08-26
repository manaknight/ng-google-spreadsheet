angular.module('app').controller('some.controller', [
    '$scope', 'spreadsheet.service', 'sheet.model',
    function ($scope, spreadsheetService, sheetModel) {
    $scope.headers = [];
    $scope.rows = [];
    $scope.mapping = {};
    $scope.model = sheetModel;
    
    spreadsheetService.createTable({}, function (error, options, response) {
        if (error) {
            console.log('ERROR', error);
        } else {
            sheetModel.fillSheet(response, 'id');
            sheetModel.transformRows();

            $scope.$apply(function () {
                $scope.headers = sheetModel.getHeaders();
                $scope.rows = sheetModel.getRows();
                $scope.mapping = sheetModel.getMapping();
            });
        }
    });
}]);
