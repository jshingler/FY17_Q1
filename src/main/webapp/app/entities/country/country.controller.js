(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('CountryController', CountryController);

    CountryController.$inject = ['$scope', '$state', 'Country', 'CountrySearch'];

    function CountryController ($scope, $state, Country, CountrySearch) {
        var vm = this;
        vm.countries = [];
        vm.loadAll = function() {
            Country.query(function(result) {
                vm.countries = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CountrySearch.query({query: vm.searchQuery}, function(result) {
                vm.countries = result;
            });
        };
        vm.loadAll();
        
    }
})();
