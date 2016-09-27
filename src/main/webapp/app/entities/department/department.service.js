(function() {
    'use strict';
    angular
        .module('fy17Q1App')
        .factory('Department', Department);

    Department.$inject = ['$resource'];

    function Department ($resource) {
        var resourceUrl =  'api/departments/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
