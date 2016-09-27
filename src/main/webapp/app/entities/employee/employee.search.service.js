(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .factory('EmployeeSearch', EmployeeSearch);

    EmployeeSearch.$inject = ['$resource'];

    function EmployeeSearch($resource) {
        var resourceUrl =  'api/_search/employees/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
