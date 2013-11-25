(function () {
  'use strict';
  var main = angular.module('main', ['ui.router']);

  main.config(function ($stateProvider) {
    $stateProvider.state('main', {
      url: "/",
      templateUrl: "modules/main/main.html",
      controller: 'mainCtrl'
    });
  });

  main.controller('mainCtrl', function ($scope) {

  });

}());
