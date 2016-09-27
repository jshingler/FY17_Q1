(function() {
    'use strict';
    angular
        .module('fy17Q1App')
        .factory('Country', Country);

    Country.$inject = ['$resource'];

    function Country ($resource) {
        var resourceUrl =  'api/countries/:id';

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
