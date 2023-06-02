
!function (t, e) { if ("function" == typeof define && define.amd) define(["d3-collection", "d3-selection"], e); else if ("object" == typeof module && module.exports) { var n = require("d3-collection"), r = require("d3-selection"); module.exports = e(n, r) } else { var o = t.d3v3; t.d3v3.tip = e(o, o) } }(window, function (l, v) { return function () { var u = function () { return "n" }, a = function () { return [0, 0] }, c = function () { return " " }, p = document.body, n = t(), r = null, s = null, y = null; function d(t) { var e; e = t.node(), (r = e ? "svg" === e.tagName.toLowerCase() ? e : e.ownerSVGElement : null) && (s = r.createSVGPoint(), p.appendChild(n)) } d.show = function () { var t = Array.prototype.slice.call(arguments); t[t.length - 1] instanceof SVGElement && (y = t.pop()); var e, n = c.apply(this, t), r = a.apply(this, t), o = u.apply(this, t), l = x(), i = h.length, f = document.documentElement.scrollTop || p.scrollTop, s = document.documentElement.scrollLeft || p.scrollLeft; for (l.html(n).style("opacity", 1).style("pointer-events", "all"); i--;)l.classed(h[i], !1); return e = m.get(o).apply(this), l.classed(o, !0).style("top", e.top + r[0] + f + "px").style("left", e.left + r[1] + s + "px"), d }, d.hide = function () { return x().style("opacity", 0).style("pointer-events", "none"), d }, d.attr = function (t, e) { if (arguments.length < 2 && "string" == typeof t) return x().attr(t); var n = Array.prototype.slice.call(arguments); return v.selection.prototype.attr.apply(x(), n), d }, d.style = function (t, e) { if (arguments.length < 2 && "string" == typeof t) return x().style(t); var n = Array.prototype.slice.call(arguments); return v.selection.prototype.style.apply(x(), n), d }, d.direction = function (t) { return arguments.length ? (u = null == t ? t : o(t), d) : u }, d.offset = function (t) { return arguments.length ? (a = null == t ? t : o(t), d) : a }, d.html = function (t) { return arguments.length ? (c = null == t ? t : o(t), d) : c }, d.rootElement = function (t) { return arguments.length ? (p = null == t ? t : o(t), d) : p }, d.destroy = function () { return n && (x().remove(), n = null), d }; var m = l.map({ n: function () { var t = e(); return { top: t.n.y - n.offsetHeight, left: t.n.x - n.offsetWidth / 2 } }, s: function () { var t = e(); return { top: t.s.y, left: t.s.x - n.offsetWidth / 2 } }, e: function () { var t = e(); return { top: t.e.y - n.offsetHeight / 2, left: t.e.x } }, w: function () { var t = e(); return { top: t.w.y - n.offsetHeight / 2, left: t.w.x - n.offsetWidth } }, nw: function () { var t = e(); return { top: t.nw.y - n.offsetHeight, left: t.nw.x - n.offsetWidth } }, ne: function () { var t = e(); return { top: t.ne.y - n.offsetHeight, left: t.ne.x } }, sw: function () { var t = e(); return { top: t.sw.y, left: t.sw.x - n.offsetWidth } }, se: function () { var t = e(); return { top: t.se.y, left: t.se.x } } }), h = m.keys(); function t() { var t = v.select(document.createElement("div")); return t.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), t.node() } function x() { return null == n && (n = t(), p.appendChild(n)), v.select(n) } function e() { for (var t = y || v.event.target; null == t.getScreenCTM && null == t.parentNode;)t = t.parentNode; var e = {}, n = t.getScreenCTM(), r = t.getBBox(), o = r.width, l = r.height, i = r.x, f = r.y; return s.x = i, s.y = f, e.nw = s.matrixTransform(n), s.x += o, e.ne = s.matrixTransform(n), s.y += l, e.se = s.matrixTransform(n), s.x -= o, e.sw = s.matrixTransform(n), s.y -= l / 2, e.w = s.matrixTransform(n), s.x += o, e.e = s.matrixTransform(n), s.x -= o / 2, s.y -= l / 2, e.n = s.matrixTransform(n), s.y += l, e.s = s.matrixTransform(n), e } function o(t) { return "function" == typeof t ? t : function () { return t } } return d } });

const countrySelect = d3v3.select('#country-select')
const slider = $('#date-slider')
const playBtn = d3v3.select('#play-button')
const resetBtn = d3v3.select('#reset-button')

let date = 0;
let dateId = 0;
let places = ["grocery_pharmacy", "park", "residential", "retail_recreation", "transit_station", "workplace"];
let placeName = {
    "grocery_pharmacy": "Grocery",
    "park": "Park",
    "residential": "Residential",
    "retail_recreation": "Retail & recreation",
    "transit_station": "Transit station",
    "workplace": "Workplace"
};

{/* <option selected value="all">All</option>
countrySelect.createElement('option') */}


let selectedCountry = ["Switzerland", "France", "Germany"]

// Extract all dates
const dates = Object.keys(data["France"][places[0]]);
dates.sort();

// Extract all countries
const countries = Object.keys(data);
countries.sort();

slider.slider({
    max: dates.length - 1,
    min: 0,
    step: 1,
    slide: (event, ui) => {
        dateId = ui.value
        date = dates[dateId]
        update()
    }
})

let interval = null

const step = () => {
    dateId = dateId + 1 >= dates.length ? 0 : dateId + 1
    update()
    slider.slider('value', dateId)
}

playBtn.on('click', () => {
    if (playBtn.text() === 'Play') {
        playBtn.text('Pause')
        interval = setInterval(step, 100)
    } else {
        playBtn.text('Play')
        clearInterval(interval)
    }
})

resetBtn.on('click', () => {
    dateId = 0
    playBtn.text('Play')
    clearInterval(interval)
    update()
    slider.slider('value', 0)
})


function update() {

    date = dates[dateId]

    var margin = { top: 100, right: 100, bottom: 100, left: 100 },
        width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    var maxValue = 2.0;

    // Contruct data
    var dataToDraw = []
    for (let country of selectedCountry) {
        d = []
        for (let place of places) {
            d.push(
                {
                    axis: placeName[place],
                    value: Math.min(data[country][place][date] + 1, maxValue)
                }
            )
        }
        dataToDraw.push(d)
    }

    // Draw the chart
    var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: maxValue,
        levels: 4,
        roundStrokes: true,
        // color: color
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", dataToDraw, selectedCountry, date, radarChartOptions);
}

// Selection menu is implemented based on https://github.com/TerryZ/v-selectpage

Vue.use(vSelectPage.default, {
    language: 'en'
});

new Vue({
    el: "#selection",
    data() {

        var entries = [];
        countries.forEach((c, i) => {
            entries.push({
                id: i, name: c, desc: c
            })
        })
        var columns = [
            { title: 'id', data: 'id' },
            { title: 'name', data: 'name' },
            { title: 'desc', data: 'desc' },
        ]
        return {
            selectedItems: "",
            countries: entries,
            columns: columns
        };
    },
    methods: {
        handleSelectionChange() {
            selectedCountry = []
            this.selectedItems.split(',').forEach((c, i) => {
                selectedCountry.push(countries[c])
            })

            update()

        },
    }
});
