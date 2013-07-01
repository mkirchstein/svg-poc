(function () {

  // remember: services in angular are singletons!
  angular.module('svgShell.services').service('surfaceService', function () {
    var self = this;

    // div containing svg
    self.svgsketch;

    // svg element
    self.svg;

    // rect that 100% fills the svg
    self.surface;

    // nodes on surface
    self.drawNodes = [];

    // the box that surrounds a selected item
    self.selectionBox;

    // draw settings, set by controller (for now)
    self.drawSettings = {
      shape: '',
      fill: '',
      stroke: '',
      strokeWidth: ''
    };

    self.resetSize = function (width, height) {
      self.svg.configure({
        width: width || $(self.svg._container).width(),
        height: height || $(self.svg._container).height()
      });
    };

    self.clearSelection = function () {
      if (self.start) {
        return;
      }

      if (!self.selectionBox) {
        return;
      }

      self.svg.remove(self.selectionBox);
      self.selectionBox = null;
      self.resetSelectedShape();
    };

    self.setupDrawMouseBindings = function () {
      var start,
        outline;

      $(self.surface)
        .on('mousedown', startDrag)
        .on('mousemove', dragging)
        .on('mouseup', endDrag)
        .on('click', self.clearSelection);

      function startDrag(event) {
        if (!self.isDrawing()) {
          return;
        }

        offset = self.svgsketch.offset();

        offset.left -= document.documentElement.scrollLeft || document.body.scrollLeft;
        offset.top -= document.documentElement.scrollTop || document.body.scrollTop;

        start = {
          X: event.clientX - offset.left,
          Y: event.clientY - offset.top
        };

        event.preventDefault();
      }

      /* Provide feedback as we drag */
      function dragging(event) {
        if (!self.isDrawing()) {
          return;
        }

        if (!start) {
          return;
        }

        if (!outline) {
          outline = self.svg.rect(0, 0, 0, 0, {
            fill: 'none',
            stroke: '#c0c0c0',
            strokeWidth: 1,
            strokeDashArray: '2,2'
          });

          $(outline).mouseup(endDrag);
        }

        self.svg.change(outline, {
          x: Math.min(event.clientX - offset.left, start.X),
          y: Math.min(event.clientY - offset.top, start.Y),
          width: Math.abs(event.clientX - offset.left - start.X),
          height: Math.abs(event.clientY - offset.top - start.Y)
        });

        event.preventDefault();
      }

      /* Draw where we finish */
      function endDrag(event) {
        if (!self.isDrawing()) {
          return;
        }

        if (!start) {
          return;
        }

        $(outline).remove();
        outline = null;

        var shapeGroup = drawShape({
          startX: start.X,
          startY: start.Y,
          endX: event.clientX - offset.left,
          endY: event.clientY - offset.top
        });


        self.drawNodes[self.drawNodes.length] = shapeGroup;

        $(shapeGroup)
          .on('mousedown', startDrag)
          .on('mousemove', dragging)
          .on('mouseup', endDrag)
          .on('click', editShape);


        start = null;

        event.preventDefault();
      }

      /* Draw the selected element on the canvas */
      function drawShape(createShape) {

        var left = Math.min(createShape.startX, createShape.endX);
        var top = Math.min(createShape.startY, createShape.endY);
        var right = Math.max(createShape.startX, createShape.endX);
        var bottom = Math.max(createShape.startY, createShape.endY);

        var settings = _.extend({
          class: 'shape'
        }, self.drawSettings);

        var parentGroup = self.svg.group({});

        var node = null;

        if (settings.shape == 'rect') {
          node = self.svg.rect(parentGroup, left, top, right - left, bottom - top, settings);
        }
        else if (settings.shape == 'circle') {
          var r = Math.min(right - left, bottom - top) / 2;
          node = self.svg.circle(parentGroup, left + r, top + r, r, settings);
        }
        else if (settings.shape == 'ellipse') {
          var rx = (right - left) / 2;
          var ry = (bottom - top) / 2;
          node = self.svg.ellipse(parentGroup, left + rx, top + ry, rx, ry, settings);
        }
        else if (settings.shape == 'line') {
          node = self.svg.line(parentGroup, x1, y1, x2, y2, settings);
        }
        else if (settings.shape == 'polyline') {
          node = self.svg.polyline(parentGroup, [
            [(x1 + x2) / 2, y1],
            [x2, y2],
            [x1, (y1 + y2) / 2],
            [x2, (y1 + y2) / 2],
            [x1, y2],
            [(x1 + x2) / 2, y1]
          ], $.extend(settings, {fill: 'none'}));
        }
        else if (settings.shape == 'polygon') {
          node = self.svg.polygon(parentGroup, [
            [(x1 + x2) / 2, y1],
            [x2, y1],
            [x2, y2],
            [(x1 + x2) / 2, y2],
            [x1, (y1 + y2) / 2]
          ], settings);
        }

        var textSpans = self.svg.createText().string('');

        var text = self.svg.text(parentGroup, 10, 10, textSpans, {
          class: 'text',
          opacity: 0.7,
          fontFamily: 'Verdana',
          fontSize: '10.0',
          fill: 'blue'
        });

        return parentGroup;
      };

      function editShape() {
        if (start) {
          return;
        }

        self.clearSelection();

        var shapeToEdit = this;
        var rect = $(shapeToEdit).find('.shape')[0];
        var bb = rect.getBBox();

        self.selectionBox = self.svg.rect(bb.x - 5, bb.y - 5, bb.width + 10, bb.height + 10, {
          fill: 'none',
          stroke: 'black',
          strokeWidth: 1,
          strokeDashArray: '2,2'
        });

        self.setShapeToEdit(shapeToEdit);

      };

    };

    self.updateShape = function (shape) {
      var shape = $(shape).find('.shape');
      shape.attr(self.drawSettings);
      console.log(shape);
    };


  });
})();