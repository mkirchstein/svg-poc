describe('dataMergeService.js > ', function () {
  beforeEach(module('main.services'));
  beforeEach(module('svgAbstraction'));
  var data, vocabulary,
    shapes = {
      "abc123": {
        "top": 10,
        "left": 10,
        "width": 300,
        "height": 300,
        "rotation": 0,
        "path": "M0,0L300,0L300,300L0,300z",
        "backgroundColor": "rgba(53,99,204,1)",
        "borderColor": "black",
        "borderWidth": 2,
        "image": {
          "url": null,
          "top": 0,
          "left": 0,
          "width": 0,
          "height": 0,
          "rotation": 0
        },
        "order": 0,
        "id": "abc123",
        "text": "",
        "font": "Verdana",
        "fontSize": "12.0",
        "fontColor": "black",
        "wrapTextAround": true,
        "transparency": 1,
        "shadow": {
          "enabled": false,
          "offsetX": 20,
          "offsetY": 20,
          "density": 10
        },
        "fieldBindings": {}
      }
    };

  var shape = shapes['abc123'];

  describe('getMergedShapesWithData >', function () {
    var act, mergedShapes;

    beforeEach(inject(function (dataMergeService) {
      act = function () {
        mergedShapes = dataMergeService.getMergedShapesWithData(shapes, data, vocabulary);
      };
    }));

    describe('when no data to merge with >', function () {
      it('returns a copy of the shapes', function () {
        act();
        expect(JSON.stringify(mergedShapes)).toEqual(JSON.stringify(shapes));
      });
    });

    describe('when has text field binding >', function () {
      beforeEach(function () {
        shape.fieldBindings.text = {
          boundTo: 'First_Name'
        };

        vocabulary = {
          'a1': {field: 'First_Name', type: 'alpha'}
        };

        data = {
          "First_Name": "Marcus",
          "Last_Name": "Jordan",
          "Teacher_Name": "John Madden",
          "Grade": "11",
          "Portrait": "img/CO/Flash5.jpg",
          "School_Name": "Sunnyside High"
        };
      });

      it('should replace shape text with data text', function() {
        act();
        expect(mergedShapes['abc123'].text).toEqual("Marcus");
      })
    })
  });
});