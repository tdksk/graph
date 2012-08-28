$(function () {
  var container = document.getElementById('canvas');

  var example1 = function () {
    var g1 = new Graph(container);
    var d1 = [[1, 2], [2, 3], [3, 2.5], [5, 3.5]];
    g1.setData(d1);
    g1.setType('bar');
    g1.setColor('#ffc423');
    g1.draw();
  };

  var example2 = function () {
    var g2 = new Graph(container);
    var d2 = [];
    for (var i = 0; i < 12; i += 0.1) {
      d2.push([i, Math.sin(i) + 2]);
    }
    g2.setData(d2);
    g2.setType('line');
    g2.setColor('#007aff');
    g2.draw();
  };

  var example3 = function () {
    var g3 = new Graph(container);
    var d3 = [[6, 5], [8, 7], [9, 4], [10, 6]];
    g3.setData(d3);
    g3.setType('point, line');
    g3.setColor('#eb1552');
    g3.draw();
  };

  var example4 = function () {
    var g4 = new Graph(container);
    var d4 = [[1.5, 5], [2, 6], [2.5, 4.5], [3, 6.5]];
    g4.setData(d4);
    g4.setType('point');
    g4.setPointSize(8);
    g4.setColor('#6cbe6e');
    g4.draw();
  };

  $('button#example1').click(function () {
    example1();
  });

  $('button#example2').click(function () {
    example2();
  });

  $('button#example3').click(function () {
    example3();
  });

  $('button#example4').click(function () {
    example4();
  });
});
