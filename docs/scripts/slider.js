
!function (t, e) { if ("function" == typeof define && define.amd) define(["d3-collection", "d3-selection"], e); else if ("object" == typeof module && module.exports) { var n = require("d3-collection"), r = require("d3-selection"); module.exports = e(n, r) } else { var o = t.d3; t.d3.tip = e(o, o) } }(window, function (l, v) { return function () { var u = function () { return "n" }, a = function () { return [0, 0] }, c = function () { return " " }, p = document.body, n = t(), r = null, s = null, y = null; function d(t) { var e; e = t.node(), (r = e ? "svg" === e.tagName.toLowerCase() ? e : e.ownerSVGElement : null) && (s = r.createSVGPoint(), p.appendChild(n)) } d.show = function () { var t = Array.prototype.slice.call(arguments); t[t.length - 1] instanceof SVGElement && (y = t.pop()); var e, n = c.apply(this, t), r = a.apply(this, t), o = u.apply(this, t), l = x(), i = h.length, f = document.documentElement.scrollTop || p.scrollTop, s = document.documentElement.scrollLeft || p.scrollLeft; for (l.html(n).style("opacity", 1).style("pointer-events", "all"); i--;)l.classed(h[i], !1); return e = m.get(o).apply(this), l.classed(o, !0).style("top", e.top + r[0] + f + "px").style("left", e.left + r[1] + s + "px"), d }, d.hide = function () { return x().style("opacity", 0).style("pointer-events", "none"), d }, d.attr = function (t, e) { if (arguments.length < 2 && "string" == typeof t) return x().attr(t); var n = Array.prototype.slice.call(arguments); return v.selection.prototype.attr.apply(x(), n), d }, d.style = function (t, e) { if (arguments.length < 2 && "string" == typeof t) return x().style(t); var n = Array.prototype.slice.call(arguments); return v.selection.prototype.style.apply(x(), n), d }, d.direction = function (t) { return arguments.length ? (u = null == t ? t : o(t), d) : u }, d.offset = function (t) { return arguments.length ? (a = null == t ? t : o(t), d) : a }, d.html = function (t) { return arguments.length ? (c = null == t ? t : o(t), d) : c }, d.rootElement = function (t) { return arguments.length ? (p = null == t ? t : o(t), d) : p }, d.destroy = function () { return n && (x().remove(), n = null), d }; var m = l.map({ n: function () { var t = e(); return { top: t.n.y - n.offsetHeight, left: t.n.x - n.offsetWidth / 2 } }, s: function () { var t = e(); return { top: t.s.y, left: t.s.x - n.offsetWidth / 2 } }, e: function () { var t = e(); return { top: t.e.y - n.offsetHeight / 2, left: t.e.x } }, w: function () { var t = e(); return { top: t.w.y - n.offsetHeight / 2, left: t.w.x - n.offsetWidth } }, nw: function () { var t = e(); return { top: t.nw.y - n.offsetHeight, left: t.nw.x - n.offsetWidth } }, ne: function () { var t = e(); return { top: t.ne.y - n.offsetHeight, left: t.ne.x } }, sw: function () { var t = e(); return { top: t.sw.y, left: t.sw.x - n.offsetWidth } }, se: function () { var t = e(); return { top: t.se.y, left: t.se.x } } }), h = m.keys(); function t() { var t = v.select(document.createElement("div")); return t.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), t.node() } function x() { return null == n && (n = t(), p.appendChild(n)), v.select(n) } function e() { for (var t = y || v.event.target; null == t.getScreenCTM && null == t.parentNode;)t = t.parentNode; var e = {}, n = t.getScreenCTM(), r = t.getBBox(), o = r.width, l = r.height, i = r.x, f = r.y; return s.x = i, s.y = f, e.nw = s.matrixTransform(n), s.x += o, e.ne = s.matrixTransform(n), s.y += l, e.se = s.matrixTransform(n), s.x -= o, e.sw = s.matrixTransform(n), s.y -= l / 2, e.w = s.matrixTransform(n), s.x += o, e.e = s.matrixTransform(n), s.x -= o / 2, s.y -= l / 2, e.n = s.matrixTransform(n), s.y += l, e.s = s.matrixTransform(n), e } function o(t) { return "function" == typeof t ? t : function () { return t } } return d } });

// const dataUrl = 'https://github.com/com-480-data-visualization/project-2023-ikun/blob/qiyuand-graph-2/docs/data/mobility_country_place_date.json'
// const dataUrl = 'https://raw.githubusercontent.com/adamjanes/udemy-d3/master/05/5.10.1/data/data.json'
const dataUrl = './data/mobility_country_place_date.json'



const playBtn = d3.select('#play-button')
const resetBtn = d3.select('#reset-button')
const continentSelect = d3.select('#continent-select')
const slider = $('#date-slider')

let date = 0;
let places = ["grocery_pharmacy", "park", "residential", "retail_recreation", "transit_station", "workplace"];

let selectedCountry = ["France", "Italy", "Germany"]

// Extract all dates
const dates = Object.keys(data["France"][places[0]]);
dates.sort();

slider.slider({
    max: dates.length - 1,
    min: 0,
    step: 1,
    slide: (event, ui) => {
        date = dates[ui.value]
        update()
    }
})

update()


function update() {

    var margin = { top: 100, right: 100, bottom: 100, left: 100 },
        width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    // Contruct data
    var dataToDraw = []
    for (let country of selectedCountry) {
        d = []
        for (let place of places) {
            d.push(
                {
                    axis: place,
                    value: data[country][place][date] + 1
                }
            )
        }
        dataToDraw.push(d)
    }



    // Draw the chart

    // var color = d3.scale.ordinal()
    //     .range(["#EDC951", "#CC333F", "#00A0B0"]);

    var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 3,
        levels: 3,
        roundStrokes: true,
        // color: color
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", dataToDraw, radarChartOptions);

    slider.slider('value', date)
}
