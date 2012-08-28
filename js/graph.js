(function (global) {
  var isGrids = false;

  function Graph(container) {
    this._container = container;
    this._data = new Array();
    /* Default */
    this._type = 'line';
    this._color = '#444';
    this._xScale = 50;
    this._yScale = 50;
    this._pointSize = 3;
    this._lineWidth = 2;
    this._barWidth = 30;
    this._leftOffset = 50;
    this._topOffset = 20;
    this._labelMargin = 10;

    this._containerWidth = this._container.width;
    this._containerHeight = this._container.height;

    this._left = this._leftOffset;
    this._right = this._containerWidth - this._leftOffset;
    this._top = this._topOffset;
    this._bottom = this._containerHeight - this._topOffset;

    /* Draw axes */
    this.drawAxes = function () {
      var ctx = this._container.getContext('2d');

      ctx.beginPath();
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.moveTo(this._left, this._top);
      ctx.lineTo(this._left, this._bottom);
      ctx.lineTo(this._right, this._bottom);
      ctx.lineTo(this._right, this._top);
      ctx.closePath();
      ctx.stroke();
    };

    /* Draw grids */
    this.drawGrids = function () {
      var ctx = this._container.getContext('2d');
      var i;

      ctx.beginPath();
      ctx.fillStyle = '#444';  // for Scales
      ctx.strokeStyle = '#bbb';  // for Grids
      ctx.lineWidth = .5;
      for (i = 0; i < (this._right - this._left) / this._xScale; i++) {
        ctx.fillText(i, this._left + i * this._xScale, this._bottom + this._labelMargin);
        ctx.moveTo(this._left + i * this._xScale,
                   this._top);
        ctx.lineTo(this._left + i * this._xScale,
                   this._bottom);
      }
      for (i = 0; i < (this._bottom - this._top) / this._yScale; i++) {
        ctx.fillText(i, this._left - this._labelMargin, this._bottom - i * this._yScale);
        ctx.moveTo(this._left,
                   this._bottom - i * this._yScale);
        ctx.lineTo(this._right,
                   this._bottom - i * this._yScale);
      }
      ctx.stroke();
    };

    /* Draw graph*/
    this.draw = function () {
      var ctx = this._container.getContext('2d');
      var i;

      if (!isGrids) {
        this.drawAxes();
        this.drawGrids();
        isGrids = true;
      }

      /* Point */
      if (this._type.match(/point/ig)) {
        ctx.beginPath();
        ctx.fillStyle = this._color;
        for (i = 0; this._data[i]; ++i) {
          ctx.arc(this._left + this._data[i][0] * this._xScale,
                  this._bottom - this._data[i][1] * this._yScale,
                  this._pointSize, 0, Math.PI*2, false);
        }
        ctx.fill();
      }
      /* Line */
      if (this._type.match(/line/ig)) {
        ctx.beginPath();
        ctx.strokeStyle = this._color;
        ctx.lineWidth = this._lineWidth;
        ctx.moveTo(this._left + this._data[0][0] * this._xScale,
                   this._bottom - this._data[0][1] * this._yScale);
        for (i = 1; this._data[i]; ++i) {
          ctx.lineTo(this._left + this._data[i][0] * this._xScale,
                     this._bottom - this._data[i][1] * this._yScale);
        }
        ctx.stroke();
      }
      /* Bar */
      if (this._type.match(/bar/ig)) {
        ctx.fillStyle = this._color;
        for (i = 0; this._data[i]; ++i) {
          ctx.fillRect((this._left + this._data[i][0] * this._xScale) - this._barWidth / 2,
                       this._bottom - this._data[i][1] * this._yScale,
                       this._barWidth,
                       this._data[i][1] * this._yScale);
        }
      }
    };

    /* Clear canvas */
    this.clear = function () {
      var ctx = this._container.getContext('2d');
      ctx.clearRect(0, 0, this._containerWidth, this._containerHeight);
      this.drawAxes();
      this.drawGrids();
      isGrids = true;
    };

    this.setData = function (data) {
      this._data = data;
    };
    this.setType = function (type) {
      this._type = type;
    };
    this.setColor = function (color) {
      this._color = color;
    };
    this.setXScale = function (xScale) {
      this._xScale = xScale;
    };
    this.setYScale = function (yScale) {
      this._yScale = yScale;
    };
    this.setPointSize = function (poinsSize) {
      this._pointSize = poinsSize;
    };
    this.setBarWidth = function (barWidth) {
      this._barWidth = barWidth;
    };
  };

  var resizeCanvas = function (container, width, height) {
    container.width = width;
    container.height = height;
  };

  global.Graph = Graph;
  global.resizeCanvas = resizeCanvas;
})(window);
