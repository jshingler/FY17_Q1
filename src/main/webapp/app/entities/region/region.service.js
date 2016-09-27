(function() {
    'use strict';
    angular
        .module('fy17Q1App')
        .factory('Region', Region);

    Region.$inject = ['$resource'];

    function Region ($resource) {
        var resourceUrl =  'api/regions/:id';

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
