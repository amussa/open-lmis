function StockOnHandAllProductsAllFacilitiesController($scope, $filter, $controller, NewReportService,
                                          FeatureToggleService, $cacheFactory, $timeout,
                                          $window, messageService, DateFormatService,
                                          ReportGroupSortAndFilterService, ReportExportExcelService) {
  $controller('BaseProductReportController', {$scope: $scope});
  
  $scope.filterList = [];
  $scope.filterText = '';
  $scope.hasSyncTimeColumn = false;

  var SELECTION_CHECKBOX_NOT_SELECT_STYLES = 'selection-checkbox__not-select';
  var SELECTION_CHECKBOX_ALL_STYLES = 'selection-checkbox__all';
  var SELECTION_CHECKBOX_HALF_STYLES = 'selection-checkbox__half';

  var CMM_STATUS = {
    'STOCK OUT': 'stock-out',
    'REGULAR STOCK': 'regular-stock',
    'OVER STOCK': 'over-stock',
    'LOW STOCK': 'low-stock'
  };
  
  var STATUS = {
    'STOCK_OUT': messageService.get("stock.cmm.stock.out"),
    'REGULAR_STOCK': messageService.get("stock.cmm.regular.stock"),
    'OVER_STOCK': messageService.get("stock.cmm.over.stock"),
    'LOW_STOCK': messageService.get("stock.cmm.low.stock")
  };
  
  if ($cacheFactory.get('keepHistoryInStockOnHandPage') === undefined) {
    $scope.cache = $cacheFactory('keepHistoryInStockOnHandPage', {capacity: 10});
  }
  else {
    $scope.cache = $cacheFactory.get('keepHistoryInStockOnHandPage');
    if ($scope.cache.get('saveDataOfStockOnHand') === 'yes') {
      $timeout(function waitHistorySelectShow() {
        if ($('.select2-container .select2-choice .select2-chosen').html() !== undefined) {
          $scope.reportParams.facilityId = $scope.cache.get('dataOfStockOnHandReport').facilityId;
          $scope.reportParams.provinceId = $scope.cache.get('dataOfStockOnHandReport').provinceId;
          $scope.reportParams.districtId = $scope.cache.get('dataOfStockOnHandReport').districtId;
          $scope.reportParams.endTime = $filter('date')($scope.cache.get('dataOfStockOnHandReport').endTime, 'yyyy-MM-dd');
          loadReportAction();
        } else {
          $timeout(waitHistorySelectShow, 1000);
        }
      }, 1000);
    }
  }
  
  $scope.$on('$viewContentLoaded', function () {
    FeatureToggleService.get({key: 'view.stock.movement'}, function (result) {
      $scope.viewStockMovementToggle = result.key;
    });
    
    FeatureToggleService.get({key: 'lot.expiry.dates.report'}, function (result) {
      $scope.isLotExpiryDatesToggleOn = result.key;
    });
    
    $scope.loadHealthFacilities();

    $scope.selectedFacilityNames = [];
    $scope.selectedFacilityIds = [];
    $scope.showFacilityList = false;
    $scope.selectedAll = false;
    $scope.allFacilityIds = [];
    $scope.selectedFacilityClass = SELECTION_CHECKBOX_NOT_SELECT_STYLES;
    $scope.selectedFacilityAllClass = SELECTION_CHECKBOX_NOT_SELECT_STYLES;
  });
  
  var sortList = ['lotNumber', 'stockOnHandOfLot'];
  var ignoreSearchList = ['expiryDate', 'facilityName', 'facilityCode', 'expiryDateLocalTime'];
  var timeFieldList = ['expiry_date', 'syncDate'];
  $scope.filterAndSort = function () {
    $scope.filterList = ReportGroupSortAndFilterService.search($scope.originData, $scope.filterText, 'lotList', timeFieldList, ignoreSearchList);
    $scope.filterList = ReportGroupSortAndFilterService.groupSort($scope.filterList, $scope.sortType, $scope.sortReverse, sortList);
    $scope.reportData = formatAllProductList($scope.filterList);
  };
  
  $scope.loadReport = loadReportAction;
  
  $scope.cmmStatusStyle = function (status) {
    return CMM_STATUS[status];
  };
  
  $scope.saveHistory = function () {
    $scope.cache.put('dataOfStockOnHandReport', $scope.reportParams);
  };
  
  $scope.generateRedirectToExpiryDateReportURL = function (facilityId,districtId,provinceId, productCode) {
    var date = $filter('date')($scope.reportParams.endTime, 'yyyy-MM-dd');
    
    return '/public/pages/reports/mozambique/index.html#/lot-expiry-dates' + '?' +
        "facilityId=" + facilityId + "&" + "districtId=" + districtId + "&" + "provinceId=" + provinceId +
        '&' + 'date=' + date + '&' + 'drugCode=' + productCode;
  };
  
  $scope.redirectToLotExpiryDateReport = function (facilityId,districtId,provinceId,productCode) {
    $window.location.href = $scope.generateRedirectToExpiryDateReportURL(facilityId,districtId,provinceId,productCode);
  };
  
  $scope.exportXLSX = function () {
    var reportParams = $scope.reportParams;
  
    var data = {
      endTime: $filter('date')(reportParams.endTime, "yyyy-MM-dd") + " 23:59:59",
      provinceId: reportParams.provinceId.toString(),
      districtId: reportParams.districtId.toString(),
      facilityId: reportParams.facilityId.toString(),
      reportType: 'stockOnHandAll'
    };
  
    ReportExportExcelService.exportAsXlsxBackend(
      utils.pickEmptyObject(data), messageService.get('report.file.single.facility.soh.report'));
  };

  $scope.validateMultipleFacilities = function () {
    $scope.invalidFacilities = _.isEmpty($scope.selectedFacilityIds);
    return !$scope.invalidFacilities;
  };

  function loadReportAction() {
    if ($scope.validateMultipleFacilities()) {
      var reportParams = $scope.reportParams;
      
      var allProductParams = {
        endTime: $filter('date')(reportParams.endTime, 'yyyy-MM-dd') + ' 23:59:59',
        selectedFacilityIds: $scope.selectedFacilityIds,
        reportType: 'stockOnHandAll'
      };
      
      $scope.formattedOverStockList = [];
      
      NewReportService.get(utils.pickEmptyObject(allProductParams))
        .$promise.then(function (allProductResponse) {
        $scope.originData = allProductResponse.data;
        $scope.originData = formatAllProductListForSearch($scope.originData);
        $scope.reportData = formatAllProductList($scope.originData);
        $scope.filterAndSort();
      });
    }
  }
  
  function formatAllProductListForSearch(data) {
    var formattedSingleProductList = [];
    _.forEach(data, function (item) {
      var formatItem = {
        facilityId: item.facilityId,
        districtId: item.districtId,
        provinceId: item.provinceId,
        facilityCode: item.facilityCode,
        facilityName: item.facilityName,
        productCode: item.productCode,
        productName: item.productName,
        name: item.productName + ' [' + item.productCode + ']',
        stockOnHandStatusPT: STATUS[item.stockOnHandStatus],
        stockOnHandStatus: item.stockOnHandStatus.replace('_', ' '),
        sumStockOnHand: item.sumStockOnHand,
        mos: utils.toFixedNumber(item.mos, true),
        cmm: utils.toFixedNumber(item.cmm, true)
      };
      
      var lotList = _.sortBy(item.lotList, function (o) {
        return o.expiryDate;
      });
      
      formatItem.expiry_date = formatItem.sumStockOnHand === 0 ? '' : lotList[0].expiryDate;
      formatItem.soonest_expiring_loh = formatItem.sumStockOnHand === 0 ? '' :
        DateFormatService.formatDateWithLocale(lotList[0].expiryDate) +
        '(' + messageService.get('report.stock.on.hand.amount') +
        lotList[0].stockOnHandOfLot + ')';
      formatItem.lotList = lotList;
      formattedSingleProductList.push(formatItem);
    });
    
    return formattedSingleProductList;
  }
  
  function formatAllProductList(data) {
    var formattedSingleProductList = [];
    _.forEach(data, function (item) {
      _.forEach(item.lotList, function (lot, index) {
        var formatItem = {
          facilityId: item.facilityId,
          districtId: item.districtId,
          provinceId: item.provinceId,
          facilityCode: item.facilityCode,
          facilityName: item.facilityName,
          productCode: item.productCode,
          productName: item.productName,
          stockOnHandStatus: item.stockOnHandStatus,
          expiry_date: DateFormatService.formatDateWithLocale(item.expiry_date),
          soonest_expiring_loh: item.soonest_expiring_loh,
          lotNumber: lot.lotNumber,
          stockOnHandOfLot: lot.stockOnHandOfLot,
          sumStockOnHand: item.sumStockOnHand,
          cmm: utils.toFixedNumber(item.cmm, true),
          estimated_months: utils.toFixedNumber(item.mos, true),
          rowSpan: item.lotList.length,
          isFirst: index === 0
        };
        
        formattedSingleProductList.push(formatItem);
      });
    });
    
    return formattedSingleProductList;
  }

  $scope.closeFacilityListDialog = function () {
    console.log("closeFacilityListDialog");
    $scope.showFacilityList = false;
  };

  $scope.clickFacilitySelection = function () {
    $scope.showFacilityList = !$scope.showFacilityList;
    console.log("clickFacilityListDialog");
  };

  $scope.selectFacility = function (facilityId) {
    $scope.facilities = _.map($scope.facilities, function (facility) {
      if (facilityId === facility.id) {
        facility.isSelected = !facility.isSelected;
        updateSelectedFacilityIdsAndNames(facility);
      }
      return facility;
    });
  };

  var updateSelectedFacilityIdsAndNames = function (facility) {
    if (facility.isSelected) {
      $scope.selectedFacilityIds.push(facility.id);
      $scope.selectedFacilityNames.push(facility.name);
    } else {
      $scope.selectedFacilityIds = _.filter($scope.selectedFacilityIds, function (facilityId) {
        return facilityId !== facility.id;
      });

      $scope.selectedFacilityNames = _.filter($scope.selectedFacilityNames, function (facilityName) {
        return facilityName !== facility.name;
      });
    }
    updateSelectAllOptionStyle();
  };

  var updateSelectAllOptionStyle = function () {
    setAllFacilityIds();
    var selectedFacilityIds = $scope.selectedFacilityIds;
    var allFacilityIds = $scope.allFacilityIds;
    var intersectionIds = _.intersection(allFacilityIds, selectedFacilityIds);

    if (intersectionIds.length === allFacilityIds.length) {
      $scope.selectedFacilityAllClass = SELECTION_CHECKBOX_ALL_STYLES;
      $scope.selectedAll = true;
      $scope.selectedFacilityNames = [messageService.get('report.option.all')];
    }

    if (intersectionIds.length > 0 && intersectionIds.length < allFacilityIds.length) {
      $scope.selectedFacilityAllClass = SELECTION_CHECKBOX_HALF_STYLES;
      $scope.selectedAll = false;
      $scope.selectedFacilityNames = _.filter(_.map($scope.facilities, function (facility) {
        if (_.include(selectedFacilityIds, facility.id)) {
          return facility.name;
        }
      }));
    }

    if (intersectionIds.length === 0) {
      $scope.selectedFacilityAllClass = SELECTION_CHECKBOX_NOT_SELECT_STYLES;
      $scope.selectedAll = false;
      $scope.selectedFacilityNames = [];
    }
  };

  var setAllFacilityIds = function () {
    $scope.allFacilityIds = _.map($scope.facilities, function (facility) {
      return facility.id;
    });
  };

  $scope.selectALL = function () {
    $scope.selectedAll = !$scope.selectedAll;

    if ($scope.selectedAll) {
      $scope.selectedFacilityAllClass = SELECTION_CHECKBOX_ALL_STYLES;
      $scope.selectedFacilityClass = _.map($scope.facilities, function (facility) {
        facility.isSelected = true;
        return facility;
      });
      $scope.selectedFacilityIds = _.map($scope.facilities, function (facility) {
        return facility.id;
      });

      $scope.selectedFacilityNames = [messageService.get('report.option.all')];

    } else {
      $scope.selectedFacilityClass = _.map($scope.facilities, function (facility) {
        facility.isSelected = false;
        return facility;
      });
      $scope.selectedFacilityAllClass = SELECTION_CHECKBOX_NOT_SELECT_STYLES;
      $scope.selectedFacilityIds = [];

      $scope.selectedFacilityNames = [];
    }
  };
}
