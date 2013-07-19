describe('draggable', function() {
  var htmlToRender,
    act,
    element,
    scope,
    timeout;

  beforeEach(module('svgAbstraction'));

  beforeEach(inject(function($rootScope, $compile, $timeout){
    timeout = $timeout;

    act = function () {
      element = angular.element(htmlToRender);
      scope = $rootScope;
      $compile(element)(scope);
    };
  }));

  describe('when shape is draggable', function () {
    beforeEach(function () {
      htmlToRender =
        '<ng-svg style="height: 600px">' +
          '<shape top="shape.top"' +
          ' left="shape.left"' +
          ' mid-point-x="shape.middleX"' +
          ' mid-point-y="shape.middleY"' +
          ' d="shape.path"' +
          ' fill="shape.backgroundColor"' +
          ' stroke="shape.borderColor"' +
          ' stroke-width="shape.borderWidth"' +
          ' draggable="true"' +
          ' svg-element="shape.svgElement"' +
          ' when-click="setSelectedShape(shape)"' +
          '></shape>' +
          '</ng-svg>';

      act();

      scope.shape = {
        top:0,
        left:0,
        path:'M0,0L100,0L100,100L0,100z',
        backgroundColor:'green',
        borderColor:'blue',
        borderWidth:12
      };

      scope.$digest();
      timeout.flush();

      var mouseDown = $.Event('mousedown', {
        which: 1,
        pageX: 50,
        pageY: 50
      });

      var mousemove = $.Event("mousemove.draggable", {
        pageX: 60,
        pageY: 60
      });

      var mouseup = $.Event("mouseup.draggable", {
        pageX: 60,
        pageY: 60
      });

      var parentGroup = element.find('g');
      parentGroup.trigger(mouseDown);

      $(document).trigger(mousemove);
      $(document).trigger(mouseup);
      $(document).trigger($.Event("mouseup"));
    });

    it('moves shape top', function() {
      expect(scope.shape.top).toEqual(10);
    });

    it('moves shape left', function() {
      expect(scope.shape.left).toEqual(10);
    });
  });

  beforeEach(function () {
    htmlToRender =
      '<ng-svg style="height: 600px">' +
        '<shape top="shape.top"' +
        ' left="shape.left"' +
        ' mid-point-x="shape.middleX"' +
        ' mid-point-y="shape.middleY"' +
        ' d="shape.path"' +
        ' fill="shape.backgroundColor"' +
        ' stroke="shape.borderColor"' +
        ' stroke-width="shape.borderWidth"' +
        ' draggable="false"' +
        ' svg-element="shape.svgElement"' +
        ' when-click="setSelectedShape(shape)"' +
        '></shape>' +
        '</ng-svg>';

    act();

    scope.shape = {
      top:0,
      left:0,
      path:'M0,0L100,0L100,100L0,100z',
      backgroundColor:'green',
      borderColor:'blue',
      borderWidth:12
    };

    scope.$digest();

    var mouseDown = $.Event('mousedown', {
      which: 1,
      pageX: 50,
      pageY: 50
    });

    var mousemove = $.Event("mousemove.draggable", {
      pageX: 60,
      pageY: 60
    });

    var mouseup = $.Event("mouseup.draggable", {
      pageX: 60,
      pageY: 60
    });

    var parentGroup = element.find('g');
    parentGroup.trigger(mouseDown);

    $(document).trigger(mousemove);
    $(document).trigger(mouseup);
    $(document).trigger($.Event("mouseup"));
  });

  it('moves shape top', function() {
    expect(scope.shape.top).toEqual(0);
  });

  it('moves shape left', function() {
    expect(scope.shape.left).toEqual(0);
  });
});