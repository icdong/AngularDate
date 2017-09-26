/**
 * Angular date (Icdong) Plug-in v1.0
 * Created by: Icdong-柴少 
 * Home : http://www.icdong.com
 * last update : 2017-09-26 10:48:00
 * QQ ： 619822251 
 * Mail : i@icdong.com
 * Address : China zhenghzou
 *
 * Copyright 2017 | www.icdong.com
 * MIT、GPL2、GNU.
 * http://www.icdong.com 
 *
**/

angular.module("icdong",[])
.controller("icdongCtrl",["$scope",function($scope){
	//配置年、月、周
	$scope.year = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
	$scope.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	$scope.week = [
		{ 'value': '周日', 'class': 'weekend' },
		{ 'value': '周一', 'class': '' },
		{ 'value': '周二', 'class': '' },
		{ 'value': '周三', 'class': '' },
		{ 'value': '周四', 'class': '' },
		{ 'value': '周五', 'class': '' },
		{ 'value': '周六', 'class': 'weekend' }
	];
	var date = new Date()
		,year = date.getFullYear()
		,month = date.getMonth() + 1
		,dayInMonth = date.getDate()
		,dayInWeek = date.getDay()
		,selected = [year, month, dayInMonth]
		,days = [];
	//判断是否是闰年
	var isLeapYear = function(y){
	  	return y % 400 == 0 || (y % 4 == 0 && y % 100 != 0);
	};
	//判断是否是今天
	var isToday = function (y, m, d) {
	  	return y == year && m == month && d == dayInMonth;
	};
	//判断是否是周末
	var isWeekend = function (emptyGrids, d) {
	  	return (emptyGrids + d) % 7 == 0 || (emptyGrids + d - 1) % 7 == 0
	};
	//判断某月的第一天是周几
	var calEmptyGrid = function (y, m) {
	  	return new Date(`${y}/${m}/01 00:00:00`).getUTCDay();
	};
	//确定某月有几天
	var calDaysInMonth = function(year, month) {
		var leapYear = isLeapYear(year);
		if (month == 2 && leapYear){
			return 29;
		}
		if (month == 2 && !leapYear){
			return 28;
		}
		if([4,6,9,11].includes(month)){
			return 30;
		}
		return 31;
	};
	//获取每月天数
	var calDays = function(y, m) {
		var emptyGrids = calEmptyGrid(y, m);
		var days = [];
		for (var i = 1; i <= 31; i++) {
			var ifToday = isToday(y, m ,i); 
			var isSelected = selected[0] == y && selected[1] == m && selected[2] == i;
		    var today = ifToday ? 'today' : '';
		    var weekend = isWeekend(emptyGrids, i + 1) ? 'weekend' : '';
		    var todaySelected = ifToday && isSelected ? 'today-selected' : '';
			var day = {
			  'value': i,
			  'class': `date-bg ${weekend} ${today}  ${todaySelected}`,
			}
			days.push(day);
		}
		return days.slice(0, calDaysInMonth(y, m));
	}
	//根据年月获取每个月前的空格子
	var emptyGridsArray = function(year, month) {
		var emptyGrids = calEmptyGrid(year, month);
		switch(emptyGrids)
		{
			case 0:
			  	return [{}];
			case 1:
			  	return [{},{}];
			case 2:
			  	return [{},{},{}];
			case 3:
			  	return [{},{},{},{}];
			case 4:
			  	return [{},{},{},{},{}];
			case 5:
			  	return [{},{},{},{},{},{}];
			default:
			  	return [];
		}
	};
	//左右按钮选择月份
	$scope.changeMonth = function(e){
	    var id = e.target.id;
	    var currYear = $scope.currYear;
	    var currMonth = $scope.currMonth;
	    currMonth = id == 'prev' ? currMonth - 1 : currMonth + 1;
	    if(id == 'prev' && currMonth < 1){
	      	currYear -= 1;
	      	currMonth = 12;
	    }
	    if(id == 'next' && currMonth > 12){
	      	currYear += 1;
	      	currMonth = 1;
	    }
		$scope.emptyGrids = emptyGridsArray(currYear, currMonth);
		$scope.days = calDays(currYear, currMonth);
		$scope.currYear = currYear;
		$scope.currMonth = currMonth;
	};
	//由选择框选择年份
	$scope.isChangeYear = function () {
		var currYear = $scope.selectYear;
		$scope.currYear = currYear;
	    return currYear;
	}
	//由选择框选择月份
	$scope.isChangeMonth = function () {
		var currYear = $scope.isChangeYear();
	    var currMonth = $scope.selectMonth;
	    $scope.emptyGrids = emptyGridsArray(currYear, currMonth);
		$scope.days = calDays(currYear, currMonth);
		$scope.currYear = currYear;
		$scope.currMonth = currMonth;
	}
	//初始化
	$scope.emptyGrids = emptyGridsArray(year, month);
	$scope.days = calDays(year, month);
	$scope.currYear = year;
	$scope.currMonth = month;
}]);