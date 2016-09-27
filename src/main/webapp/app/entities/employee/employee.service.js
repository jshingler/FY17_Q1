(function() {
    'use strict';
    angular
        .module('fy17Q1App')
        .factory('Employee', Employee);

    Employee.$inject = ['$resource', 'DateUtils'];

    function Employee ($resource, DateUtils) {
        var resourceUrl =  'api/employees/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.hireDate = DateUtils.convertDateTimeFromServer(data.hireDate);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
