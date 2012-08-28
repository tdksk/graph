$(function () {
  var container = document.getElementById('canvas');
  resizeCanvas(container, 700, 400);

  var clearCanvas = function () {
    var g0 = new Graph(container);
    g0.clear();
  };
  clearCanvas();

  $('button#clear').click(function () {
    clearCanvas();
  });

  var d = "1, 2.5\n3, 6\n6.5, 3\n9, 4.5";
  $('textarea#data').val(d);

  $('button#draw').click(function () {
    var str = $('textarea#data').val();
    str = str.replace(/\r\n/g, "\n");
    str = str.replace(/^(\n+)|(\n+)$/g, "");
    var arr = str.split(/\n/g);

    var data = [];
    var reg = /[,\t]/g;
    for (var i = 0, l = arr.length; i < l; i++) {
      data[i] = arr[i].split(reg);
      for (var j = 0, m = data[i].length; j < m ; j++) {
        data[i][j] = data[i][j].replace(/(^\s+)|(\s+$)/g, "" );
      }
    }

    var type = '';
    type += $('#line').attr('checked') ? 'line' : '';
    type += $('#point').attr('checked') ? 'point' : '';
    type += $('#bar').attr('checked') ? 'bar' : '';

    var color = $('#color').val();

    var g = new Graph(container);
    g.setType(type);
    g.setColor(color);
    g.setData(data);
    g.draw();
  });
});
