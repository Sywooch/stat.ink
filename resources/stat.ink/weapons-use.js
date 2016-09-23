/*! Copyright (C) 2016 AIZAWA Hina | MIT License */
"use strict";
(($, undefined) => {
  var stack = false;
  const update = () => {
    const formatDate = date => {
      const zero = n => {
        n = n + "";
        return n.length == 1 ? "0" + n : n;
      };
      return date.getUTCFullYear() + "-" + zero(date.getUTCMonth() + 1) + "-" + zero(date.getUTCDate());
    };

    const date2unixTime = date => new Date(date + "T00:00:00Z").getTime();

    const $graphs = $("#graph-trends");
    $graphs.height($graphs.width() * 9 / 16);
    $graphs.each(function(i, el) {
      const $graph = $(el);
      const $legends = $graph.attr('data-legends') ? $('#' + $graph.attr('data-legends')) : null;
      const legendColumns = (() => {
        const width = $(window).width();
        if (!$legends) {
          return 1;
        } else if (width < 768) { // xs
          return 1;
        } else if (width < 992) { // sm
          return 2;
        } else if (width < 1200) { // md
          return 4;
        } else { // lg
          return 5;
        }
      })();
      const json = JSON.parse($("#" + $graph.attr('data-refs')).text());
      let data = [];
      $.each(json.data, (i, value) => {
        data.push({
          label: value.legend,
          data: value.data.map(row => {
            return [
              date2unixTime(row[0]),
              row[1],
            ];
          }),
        });
      });
      const size = Math.max(18, Math.ceil($graph.height() * 0.075));
      data.push({
        icons: {
          show: true,
          tooltip: (x, $this, userData) => {
            if (typeof userData === 'string') {
              $this
                .attr('title', userData)
                .tooltip({'container': 'body'})
                .css('opacity', '0.4');
            }
          },
        },
        data: json.events.map(item => {
          return [
            $graph
              .attr('data-icon')
              .replace(/\/dummy\.png.*/, () => '/' + item[2] + '.png'),
            date2unixTime(item[0]),
            size,
            size,
            item[1]
          ];
        }),
      });
      $.plot($graph, data, {
        xaxis: {
          mode: "time",
          minTickSize: [ 7, "day" ],
          tickFormatter: v => formatDate(new Date(v)),
        },
        yaxis: {
          min: 0,
          tickFormatter: v => v.toFixed(1) + "%",
        },
        series: {
          stack: stack,
          points: {
            show: !stack,
          },
          lines: {
            show: true,
            fill: stack,
            steps: false,
          }
        },
        legend: {
          sorted: stack ? "reverse" : false,
          position: "nw",
          container: $legends,
          noColumns: legendColumns,
        },
        grid: {
          markingsLineWidth: 2,
          markings: json.events.map(item => {
            const t = date2unixTime(item[0]);
            return {
              xaxis: { from: t, to: t },
              color: "rgba(255,200,200,0.6)",
            };
          }),
        },
      });
      if ($legends) {
        window.setTimeout(() => {
          const $labels = $('td.legendLabel', $legends);
          $labels.width(
            Math.max.apply(null, $labels.map(
              (i, el) => $(el).width('').width()
            )) + 12
          );
        }, 1);
      }
    });
  }

  let timerId = null;
  $(window).resize(() => {
    if (timerId !== null) {
      window.clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      timerId = null;
      update();
    }, 33);
  }).resize();
  $("#stack-trends").click(() => {
      stack = !!$(this).prop("checked");
      $(window).resize();
  });
})(jQuery);
