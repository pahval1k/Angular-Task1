'use strict';

// declaring a module that contains angular datepicker as dependency
var myAppModule = angular.module('myApp', [
  '720kb.datepicker'
 ]);

//declaring controller for the form 
myAppModule.controller('formController',['$scope', function($scope) { 

	//declaring default values
	$scope.userName = "Peter Parker";
	$scope.ageNumber = 21;
	$scope.date = "2016/01/12";
	$scope.greetingField = "Привет";
	$scope.submittedInformation = {};

	// actions after form submitting
	$scope.submit = function() { 
		if ($scope.myForm.$valid) { // if form is valid
			$scope.submittedInformation = { 
				userName : $scope.userName,
				ageNumber : $scope.ageNumber,
				date : $scope.date,
				greetingText : $scope.greetingField
			}
		} else { // otherwise
			$scope.submittedInformation = "Your form is not valid"
		}
	}
}]);