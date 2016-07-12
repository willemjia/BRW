/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.10.1
 */
FusionCharts.register("module", ["private", "modules.renderer.js-charts", function () {
    function Ka(a) {
        var n = {left: a.offsetLeft, top: a.offsetTop};
        for (a = a.offsetParent; a;)n.left += a.offsetLeft, n.top += a.offsetTop, a !== Ta.body && a !== Ta.documentElement && (n.left -= a.scrollLeft, n.top -= a.scrollTop), a = a.offsetParent;
        return n
    }

    function Aa(a, n) {
        for (var e = [], d = 0, v = a.length; d < v; d++)e[d] = n.call(a[d], a[d], d, a);
        return e
    }

    function oa(a, n) {
        var e = n ? 360 : xa;
        a = (a || 0) % e;
        return 0 > a ? e + a : a
    }

    function Va(a, n) {
        return a <= Q ? a : n <= Q ? n : n > a ? 0 :
            n
    }

    function Ua(a, n, e, d, v) {
        return r((n - e[1] - d.top) / v, a - e[0] - d.left)
    }

    function Wa(a, n, e, d, v, b, w, c, V, u) {
        "object" === typeof a && (n = a.y, e = a.r, d = a.innerR, v = a.radiusYFactor, b = a.depth, w = a.seriesGroup, c = a.renderer, a = a.x);
        if (0 > v || 1 <= v)v = .6;
        a = a || 0;
        n = n || 0;
        e = e || 1;
        d = d || 0;
        b = b || 0;
        this.renderer = c;
        this.hasOnePoint = V;
        this.use3DLighting = u;
        this.cx = a;
        this.cy = n;
        this.rx = e;
        this.ry = e * v;
        this.radiusYFactor = v;
        this.isDoughnut = 0 < d;
        this.innerRx = d;
        this.innerRy = d * v;
        this.depth = b;
        this.leftX = a - e;
        this.rightX = a + e;
        this.leftInnerX = a - d;
        this.rightInnerX =
            a + d;
        this.depthY = n + b;
        this.topY = n - this.ry;
        this.bottomY = this.depthY + this.ry;
        this.bottomBorderGroup = c.group("bottom-border", w).attr({transform: "t0," + b});
        this.outerBackGroup = c.group("outer-back-Side", w);
        this.slicingWallsBackGroup = c.group("slicingWalls-back-Side", w);
        this.innerBackGroup = c.group("inner-back-Side", w);
        this.innerFrontGroup = c.group("inner-front-Side", w);
        this.slicingWallsFrontGroup = c.group("slicingWalls-front-Side", w);
        this.topGroup = c.group("top-Side", w);
        this.moveCmdArr = ["M"];
        this.lineCmdArr = ["L"];
        this.closeCmdArr = ["Z"];
        this.centerPoint = [a, n];
        this.leftPoint = [this.leftX, n];
        this.topPoint = [a, this.topY];
        this.rightPoint = [this.rightX, n];
        this.bottomPoint = [a, n + this.ry];
        this.leftDepthPoint = [this.leftX, this.depthY];
        this.rightDepthPoint = [this.rightX, this.depthY];
        this.leftInnerPoint = [this.leftInnerX, n];
        this.rightInnerPoint = [this.rightInnerX, n];
        this.leftInnerDepthPoint = [this.leftInnerX, this.depthY];
        this.rightInnerDepthPoint = [this.rightInnerX, this.depthY];
        this.pointElemStore = [];
        this.slicingWallsArr = [];
        a =
            ["A", this.rx, this.ry, 0, 0, 1, this.rightX, n];
        e = ["A", this.rx, this.ry, 0, 0, 1, this.leftX, n];
        d = ["A", this.rx, this.ry, 0, 0, 0, this.rightX, this.depthY];
        v = ["A", this.rx, this.ry, 0, 0, 0, this.leftX, this.depthY];
        b = ["A", this.innerRx, this.innerRy, 0, 0, 0, this.rightInnerX, n];
        n = ["A", this.innerRx, this.innerRy, 0, 0, 0, this.leftInnerX, n];
        w = ["A", this.innerRx, this.innerRy, 0, 0, 1, this.rightInnerX, this.depthY];
        c = ["A", this.innerRx, this.innerRy, 0, 0, 1, this.leftInnerX, this.depthY];
        this.isDoughnut ? (this.topBorderPath = this.moveCmdArr.concat(this.leftPoint,
            a, e, this.moveCmdArr, this.leftInnerPoint, b, n), this.topPath = this.moveCmdArr.concat(this.leftPoint, a, e, this.lineCmdArr, this.leftInnerPoint, b, n, this.closeCmdArr), this.innerFrontPath = this.moveCmdArr.concat(this.leftInnerPoint, b, this.lineCmdArr, this.rightInnerDepthPoint, c, this.closeCmdArr), this.innerBackPath = this.moveCmdArr.concat(this.rightInnerPoint, n, this.lineCmdArr, this.leftInnerDepthPoint, w, this.closeCmdArr)) : this.topBorderPath = this.topPath = this.moveCmdArr.concat(this.leftPoint, a, e, this.closeCmdArr);
        this.outerBackPath = this.moveCmdArr.concat(this.leftPoint, a, this.lineCmdArr, this.rightDepthPoint, v, this.closeCmdArr);
        this.outerFrontPath = this.moveCmdArr.concat(this.rightPoint, e, this.lineCmdArr, this.leftDepthPoint, d, this.closeCmdArr);
        this.clipPathforOuter = ["M", this.leftX, this.topY, "L", this.rightX, this.topY, this.rightX, this.bottomY, this.leftX, this.bottomY, "Z"];
        this.clipPathforInner = ["M", this.leftInnerX, this.topY, "L", this.rightInnerX, this.topY, this.rightInnerX, this.bottomY, this.leftInnerX, this.bottomY,
            "Z"];
        this.clipPathforNoClip = ["M", this.leftInnerX, this.topY, "L", this.leftInnerX, this.bottomY, "Z"];
        this.colorObjs = []
    }

    var va = this, L = va.hcLib, ka = L.Raphael, z = va.window, Ta = z.document, ca = L.BLANKSTRING, $a = L.createTrendLine, q = L.pluck, Fa = L.getValidValue, Na = L.parseTooltext, k = L.pluckNumber, Oa = L.getFirstValue, ab = L.getDefinedColor, pa = L.parseUnsafeString, ta = L.FC_CONFIG_STRING, Ba = L.extend2, La = L.getDashStyle, P = L.toRaphaelColor, Ha = L.toPrecision, Ma = L.stubFN, qa = L.hasSVG, Ea = L.each, Da = L.TOUCH_THRESHOLD_PIXELS, Ya = L.CLICK_THRESHOLD_PIXELS,
        Ca = L.plotEventHandler, b = L.hasTouch ? Da : Ya, c = "rgba(192,192,192," + (L.isIE ? .002 : 1E-6) + ")", f = 8 === z.document.documentMode ? "visible" : "", h = Math, R = h.sin, U = h.cos, r = h.atan2, x = h.round, A = h.min, l = h.max, E = h.abs, da = h.PI, I = h.ceil, t = h.floor, g = h.sqrt, G = da / 180, N = 180 / da, Q = Math.PI, Pa = Q / 2, xa = 2 * Q, ba = Q + Pa, ra = L.graphics.getColumnColor, ma = L.getFirstColor, ha = L.setLineHeight, Xa = L.pluckFontSize, ua = L.getFirstAlpha, ea = L.graphics.getDarkColor, ga = L.graphics.getLightColor, aa = L.graphics.convertColor, ia = L.COLOR_TRANSPARENT, W = L.POSITION_CENTER,
        B = L.POSITION_TOP, fa = L.POSITION_BOTTOM, Ga = L.POSITION_RIGHT, la = L.POSITION_LEFT, db = L.parsexAxisStyles, cb = L.hashify, p = L.chartAPI, eb = L.graphics.mapSymbolName, Da = p.singleseries, Y = L.COMMASTRING, Ia = L.ZEROSTRING, ya = L.ONESTRING, Qa = L.HUNDREDSTRING, Za = L.PXSTRING, fb = L.COMMASPACE, na = !/fusioncharts\.com$/i.test(z.location.hostname);
    p("column2d", {standaloneInit: !0, friendlyName: "Column Chart", creditLabel: na, rendererId: "cartesian"}, p.column2dbase);
    p("column3d", {friendlyName: "3D Column Chart", defaultSeriesType: "column3d",
        defaultPlotShadow: 1, is3D: !0, fireGroupEvent: !0, defaultZeroPlaneHighlighted: !1}, p.column2d);
    p("bar2d", {friendlyName: "Bar Chart", isBar: !0, defaultSeriesType: "bar", spaceManager: p.barbase}, p.column2d);
    p("bar3d", {friendlyName: "3D Bar Chart", defaultSeriesType: "bar3d", defaultPlotShadow: 1, fireGroupEvent: !0, is3D: !0, defaultZeroPlaneHighlighted: !1}, p.bar2d);
    p("line", {friendlyName: "Line Chart", standaloneInit: !0, creditLabel: na, rendererId: "cartesian"}, p.linebase);
    p("area2d", {friendlyName: "Area Chart", standaloneInit: !0,
        creditLabel: na, rendererId: "cartesian"}, p.area2dbase);
    p("pie2d", {friendlyName: "Pie Chart", standaloneInit: !0, defaultSeriesType: "pie", defaultPlotShadow: 1, reverseLegend: 1, alignCaptionWithCanvas: 0, sliceOnLegendClick: !0, rendererId: "pie", point: function (a, n, e, d, v) {
        a = v[ta];
        var b = this.colorManager, w = a.is3d, c = k(d.plotborderthickness), V = k(c, w ? .1 : 1), u = k(d.enablemultislicing, 1), X = k(d.use3dlighting, 1), m = X ? k(d.radius3d, d["3dradius"], 90) : 100, f = k(d.showzeropies, 1), p = k(d.showpercentintooltip, 1), Ra = k(d.showlabels, 1),
            C = k(d.showvalues, 1), h = k(d.showpercentvalues, d.showpercentagevalues, 0), F = q(d.tooltipsepchar, d.hovercapsepchar, fb), wa = q(d.labelsepchar, F), sa = q(d.plotbordercolor, d.piebordercolor), ja = v[ta].numberFormatter, za = e.length, R = k(d.plotborderdashed, 0), J = k(d.plotborderdashlen, 5), D = k(d.plotborderdashgap, 4), H = k(d.showvalueinlegend, 0), Sa = k(d.showlabelinlegend, 1), g = k(d.valuebeforelabelinlegend, 0), U = k(d.showvalueaspercentinlegend, 1), K = k(d.reverseplotorder, 0), S = q(d.legendsepchar, ", "), T = v.plotOptions.series.dataLabels.style,
            x = 0, t = [], M, y, O, l, A, Z, W, z, I, G, N, fa, Q, B, r, P, E, L, ea, da = -1, ba;
        E = n.centerLabelConfig = {label: pa(q(d.defaultcenterlabel, "")), font: q(d.centerlabelfont, T.fontFamily), fontSize: k(d.centerlabelfontsize, parseInt(T.fontSize, 10)), color: ma(q(d.centerlabelcolor, d.valuefontcolor, a.inCanvasStyle.color, "555555")), alpha: k(d.centerlabelalpha, 100), bold: k(d.centerlabelbold, T.fontWeight), italic: k(d.centerlabelitalic, T.style), bgColor: q(d.centerlabelbgcolor, ""), bgAlpha: k(d.centerlabelbgalpha, 100), borderColor: q(d.centerlabelbordercolor,
            T.borderColor), borderAlpha: k(d.centerlabelborderalpha, 100), borderThickness: k(d.centerlabelborderthickness, T.borderThickness), borderRadius: k(d.centerlabelborderradius, T.borderRadius), textPadding: k(d.centerlabeltextpadding, T.borderPadding), padding: k(d.centerlabelpadding, 2), bgOval: k(d.centerlabelbgoval, 0), shadow: k(d.showcenterlabelshadow, 0), hoverColor: d.centerlabelhovercolor && ma(q(d.centerlabelhovercolor)), hoverAlpha: k(d.centerlabelhoveralpha), toolText: pa(q(d.centerlabeltooltext, ""))};
        100 < m && (m = 100);
        0 > m && (m = 0);
        k(d.showlegend, 0) && (v.legend.enabled = !0, v.legend.reversed = !Boolean(k(d.reverselegend, 0)), n.showInLegend = !0);
        for (y = 0; y < za; y += 1)l = e[y], O = ja.getCleanValue(l.value, !0), null === O || !f && 0 === O || (t.push(l), x += O);
        0 === x && (t = []);
        n.enableRotation = 1 < t.length ? k(d.enablerotation, 1) : 0;
        n.alphaAnimation = k(d.alphaanimation, 1);
        n.is3D = w;
        n.placeLabelsInside = d.placevaluesinside;
        n.use3DLighting = X;
        n.pieYScale = k(d.pieyscale, 40);
        1 > n.pieYScale && (n.pieYScale = 1);
        100 <= n.pieYScale && (n.pieYScale = 80);
        n.pieYScale /= 100;
        n.pieSliceDepth =
            k(d.pieslicedepth, 15);
        1 > n.pieSliceDepth && (n.pieSliceDepth = 1);
        n.managedPieSliceDepth = n.pieSliceDepth;
        n.enableMultiSlicing = !!u;
        w && d.showplotborder != ya && !c && (n.showBorderEffect = 1);
        for (y = t.length - 1; 0 <= y; --y) {
            l = t[y];
            O = ja.getCleanValue(l.value, !0);
            M = pa(q(l.label, l.name, ca));
            za = q(l.color, b.getPlotColor(y));
            Z = q(l.alpha, d.plotfillalpha);
            W = q(l.bordercolor, sa);
            z = q(l.borderalpha, d.plotborderalpha, d.pieborderalpha);
            w && (W || void 0 !== z) && (n.showBorderEffect = 0);
            W = q(W, ga(za, w ? 90 : 25)).split(Y)[0];
            z = d.showplotborder ==
                Ia ? Ia : q(z, Z, "80");
            Z = q(Z, Qa);
            f = {opacity: Math.max(Z, z) / 100};
            if (e = Boolean(k(l.issliced, d.issliced, 0)))u || (-1 !== da && (n.data[t.length - da - 1].sliced = !1), da = y), a.preSliced = e;
            c = (r = k(l.dashed, R)) ? La(q(l.dashlen, J), q(l.dashgap, D), V) : "none";
            A = Fa(pa(q(l.tooltext, a.tooltext)));
            N = ja.percentValue(O / x * 100);
            fa = ja.dataLabels(O) || ca;
            G = 1 === k(l.showlabel, Ra) ? M : ca;
            I = 1 === (Q = k(l.showvalue, C)) ? 1 === h ? N : fa : ca;
            B = Fa(pa(l.displayvalue));
            ba = q(B, M + wa + (h ? N : fa), ca);
            I = void 0 !== B && Q ? B : I !== ca && G !== ca ? G + wa + I : q(G, I);
            void 0 !== A ? A = Na(A, [1,
                2, 3, 5, 6, 7, 14, 24, 25], {formattedValue: fa, label: M, yaxisName: pa(d.yaxisname), xaxisName: pa(d.xaxisname), percentValue: N, sum: ja.dataLabels(x), unformattedSum: x}, l, d) : (A = M, Q = p ? N : fa, A = A != ca ? A + F + Q : Q);
            Q = Sa ? M : ca;
            H && (P = U ? ja.legendPercentValue(O / x * 100) : ja.legendValue(O), Q = g ? P + (Q && S + Q) : (Q && Q + S) + P);
            r = this.pointHoverOptions(l, n, {plotType: "pie", use3DLighting: X, color: za, alpha: Z, borderWidth: V, borderColor: W, borderAlpha: z, borderDashed: r, borderDashGap: q(l.dashgap, D), borderDashLen: k(l.dashlen, J), radius3D: m, shadow: f});
            M = {label: q((L =
                l.centerlabel || d.centerlabel) && this.replaceMacros(L, ["\\$value", "\\$percentValue", "\\$displayValue", "\\$label"], [fa, N, void 0 === B ? "" : B, M]), ""), font: E.font, fontSize: k(l.centerlabelfontsize, E.fontSize), color: ma(q(l.centerlabelcolor, E.color)), alpha: k(l.centerlabelalpha, E.alpha), bold: k(l.centerlabelbold, E.bold), italic: k(l.centerlabelitalic, E.italic), bgColor: q(l.centerlabelbgcolor, E.bgColor), bgAlpha: k(l.centerlabelbgalpha, E.bgAlpha), borderColor: q(l.centerlabelbordercolor, E.borderColor), borderAlpha: k(l.centerlabelborderalpha,
                E.borderAlpha), borderThickness: E.borderThickness, borderRadius: E.borderRadius, textPadding: E.textPadding, padding: E.padding, bgOval: E.bgOval, shadow: E.shadow, hoverColor: (ea = q(l.centerlabelhovercolor, E.hoverColor)) && ma(ea), hoverAlpha: k(l.centerlabelhoveralpha, E.hoverAlpha), toolText: q(l.centerlabeltooltext, "")};
            n.data.push({displayValue: I, displayValueArgs: ba, style: db(l, {}, d, T, za), categoryLabel: G, showInLegend: Q !== ca, y: O, name: Q, legendCosmetics: this.parseLegendOptions(d, l), shadow: f, toolText: A, color: this.getPointColor(za,
                Z, m), _3dAlpha: Z, borderColor: aa(W, z), borderWidth: V, link: Fa(l.link), sliced: e, dashStyle: c, doNotSlice: q(d.enableslicing, ya) != ya, hoverEffects: r.enabled && r.options, rolloverProperties: r.enabled && r.rolloverOptions, centerLabelConfig: M, radius3D: m})
        }
        K && (n.reversePlotOrder = !0, n.data && n.data.reverse());
        n.valueTotal = x;
        v.legend.enabled = d.showlegend === ya ? !0 : !1;
        n.startAngle = k(d.startingangle, 0);
        v.chart.startingAngle = q(1 < t.length ? d.startingangle : 0, 0);
        return n
    }, replaceMacros: function (a, n, e) {
        for (var d = n.length || 0, v; d--;)v =
            new RegExp(n[d], "gi"), a = a.replace(v, e[d]);
        return a
    }, containsMacro: function (a, n) {
        for (var e = n.length || 0, d; e--;)if (d = new RegExp(n[e], "gi"), d = a.match(d))return!0;
        return!1
    }, getPointColor: function (a, n, e) {
        var d, v;
        a = ma(a);
        n = ua(n);
        100 > e && qa ? (d = Math.floor(85 * (100 - .35 * e)) / 100, d = ea(a, d), v = Math.floor(50 * (100 + e)) / 100, a = ga(a, v), n = {FCcolor: {color: a + Y + d, alpha: n + Y + n, ratio: e + "," + (100 - e), radialGradient: !0, gradientUnits: "userSpaceOnUse"}}) : n = {FCcolor: {color: a + Y + a, alpha: n + Y + n, ratio: "0,100"}};
        return n
    }, configureAxis: function (a, n) {
        var e = 0, d = a[ta], v = n.chart, b = a.xAxis.labels.style, w, c;
        w = (w = Oa(v.valuebordercolor, ca)) ? aa(w, k(v.valueborderalpha, v.valuealpha, 100)) : ca;
        b = {fontFamily: q(v.valuefont, b.fontFamily), fontSize: q(v.valuefontsize, parseInt(b.fontSize, 10)) + Za, lineHeight: b.lineHeight, color: aa(q(v.valuefontcolor, b.color), k(v.valuefontalpha, v.valuealpha, 100)), fontWeight: k(v.valuefontbold) ? "bold" : "normal", fontStyle: k(v.valuefontitalic) ? "italic" : "normal", border: w || v.valuebgcolor ? k(v.valueborderthickness, 1) + "px solid" : void 0, borderColor: w,
            borderThickness: k(v.valueborderthickness, 1), borderPadding: k(v.valueborderpadding, 2), borderRadius: k(v.valueborderradius, 0), backgroundColor: v.valuebgcolor ? aa(v.valuebgcolor, k(v.valuebgalpha, v.valuealpha, 100)) : ca, borderDash: k(v.valueborderdashed, 0) ? La(k(v.valueborderdashlen, 4), k(v.valueborderdashgap, 2), k(v.valueborderthickness, 1)) : "none"};
        a.plotOptions.series.dataLabels.style = b;
        delete d.x;
        delete d[0];
        delete d[1];
        a.chart.plotBorderColor = a.chart.plotBackgroundColor = ia;
        d = d.pieDATALabels = [];
        if (1 === a.series.length &&
            (c = a.series[0].data) && 0 < (e = a.series[0].data.length) && a.plotOptions.series.dataLabels.enabled)for (; e--;)c[e] && void 0 !== Fa(c[e].displayValue) && d.push({text: c[e].displayValue, style: c[e].style})
    }, spaceManager: function (a, n, e, d) {
        var v = a[ta], b = v.is3d, w = this.name, c = this.colorManager, V = this.smartLabel || v.smartLabel, u = k(v.pieDATALabels && v.pieDATALabels.length, 0), X = 0, m = n.chart, f = k(m.managelabeloverflow, 0), p = k(m.slicingdistance), Ra = v.preSliced || m.enableslicing !== Ia || m.showlegend === ya && m.interactivelegend !== Ia ?
            E(k(p, 20)) : 0, C = k(m.pieradius, 0), h = k(m.enablesmartlabels, m.enablesmartlabel, 1), F = h ? k(m.skipoverlaplabels, m.skipoverlaplabel, 1) : 0, wa = k(m.issmartlineslanted, 1), sa = u ? k(m.labeldistance, m.nametbdistance, 5) : Ra, ja = k(m.smartlabelclearance, 5);
        e -= a.chart.marginRight + a.chart.marginLeft;
        var za = d - (a.chart.marginTop + a.chart.marginBottom);
        d = A(za, e);
        var R = q(m.smartlinecolor, c.getColor("plotFillColor")), J = k(m.smartlinealpha, 100), D = k(m.smartlinethickness, .7), c = a.plotOptions.series.dataLabels, H = c.style, Sa = u ? k(parseInt(H.lineHeight,
            10), 12) : 0, H = a.series[0] || {}, g = H.pieYScale, U = H.pieSliceDepth;
        d = 0 === C ? .15 * d : C;
        var K = 0, K = 2 * d;
        c.placeLabelsInside = /doughnut2d/.test(w) ? 0 : 1 === u && 1;
        c.connectorWidth = D;
        c.connectorPadding = k(m.connectorpadding, 5);
        c.connectorColor = aa(R, J);
        u && (h && (sa = ja), sa += Ra);
        ja = K + 2 * (Sa + sa);
        za -= this.titleSpaceManager(a, n, e, l(ja < za ? za - ja : za / 2, parseFloat(a.title.style.lineHeight, 10)));
        m.showlegend === ya && (q(m.legendposition, fa).toLowerCase() !== Ga ? za -= this.placeLegendBlockBottom(a, n, e, za / 2, !0) : e -= this.placeLegendBlockRight(a,
            n, e / 3, za, !0));
        if (1 !== u)for (; u--;)V.setStyle(v.pieDATALabels[u].style), n = V.getOriSize(v.pieDATALabels[u].text), X = l(X, n.width);
        0 === C && (b ? (za -= U, K = A(e / 2 - X - Ra, (za / 2 - Sa) / g) - sa) : K = A(e / 2 - X - Ra, za / 2 - Sa) - sa, K >= d ? d = K : p || (Ra = sa = l(A(sa - (d - K), Ra), 10)));
        b && (u = za - 2 * (d * g + Sa), U > u && (H.managedPieSliceDepth = U - u));
        a.plotOptions.pie3d.slicedOffset = a.plotOptions.pie.slicedOffset = Ra;
        a.plotOptions.pie3d.size = a.plotOptions.pie.size = 2 * d;
        c.distance = sa;
        c.isSmartLineSlanted = wa;
        c.enableSmartLabels = h;
        c.skipOverlapLabels = F;
        c.manageLabelOverflow =
            f;
        if ("doughnut2d" === w || "doughnut3d" === w)if (w = k(m.doughnutradius, 0), u = (u = k(m.use3dlighting, 1)) ? k(m.radius3d, m["3dradius"], 50) : 100, 100 < u && (u = 100), 0 > u && (u = 0), m = 0 === w || w >= d ? d / 2 : w, a.plotOptions.pie3d.innerSize = a.plotOptions.pie.innerSize = 2 * m, 0 < u && qa && (m = parseInt(m / d * 100, 10), w = (100 - m) / 2, u = parseInt(w * u / 100, 10), m = m + Y + u + Y + 2 * (w - u) + Y + u, a.series[0] && a.series[0].data))for (f = a.series[0].data, a = 0, u = f.length; a < u; a += 1)w = f[a], w.color.FCcolor && (w.color.FCcolor.ratio = m, w.rolloverProperties.color && (w.rolloverProperties.color.FCcolor.ratio =
            m))
    }, creditLabel: na, eiMethods: {isPlotItemSliced: function (a) {
        var n = this.jsVars.hcObj, e, d, v;
        return n && n.datasets && n.datasets[0] && (e = n.datasets[0].data) && (v = e.length) && e[a = v - a - 1] && (d = e[a].plot) && d.sliced
    }, slicePlotItem: function (a, n) {
        var e = this.jsVars.hcObj, d, v, b, w;
        return e && e.datasets && (d = e.datasets[0]) && (v = d.data) && (w = v.length) && v[a = d.reversePlotOrder ? a : w - a - 1] && (b = v[a].plot) && ((!!n !== b.sliced || void 0 === n) && e.plotGraphicClick.call(b) || b.sliced)
    }, centerLabel: function (a, n) {
        var e = this.jsVars.hcObj, d = e.options,
            v = d.series[0], d = d.plotOptions.pie.innerSize, b = e.canvasLeft + .5 * e.canvasWidth, w = e.canvasTop + .5 * e.canvasHeight, c = v.centerLabelConfig, V;
        if ("object" !== typeof n)n = c; else for (V in c)void 0 === n[V] && (n[V] = c[V]);
        n.label = a;
        v.centerLabelConfig = n;
        d && e.drawDoughnutCenterLabel(a || "", b, w, d, d, n, !0)
    }, startingAngle: function (a, n) {
        var e = this.jsVars.hcObj, d = e.datasets[0].plot, v = "pie" === e.options.chart.defaultSeriesType, b, w = (b = e.datasets[0].startAngle) * (v ? -N : 1) + (0 > (v ? -1 : 1) * b ? 360 : 0);
        if (!isNaN(a)) {
            if (d.singletonCase || d.isRotating)return;
            a += n ? w : 0;
            v ? ((v = e.options.series[0]).startAngle = -a * G, e.rotate(d, v)) : e.rotate(a);
            w = a
        }
        return x(100 * ((w %= 360) + (0 > w ? 360 : 0))) / 100
    }}}, Da);
    p.pie2d.eiMethods.togglePieSlice = p.pie2d.eiMethods.sliceDataItem = p.pie2d.eiMethods.slicePlotItem;
    p.pie2d.eiMethods.enableSlicingMovement = p.pie2d.eiMethods.enablelink = function () {
        va.raiseWarning(this, "1301081430", "run", "JSRenderer~enablelink()", "Method deprecated.")
    };
    p("pie3d", {friendlyName: "3D Pie Chart", defaultSeriesType: "pie3d", rendererId: "pie3d", creditLabel: na, fireGroupEvent: !0,
        getPointColor: function (a) {
            return a
        }, defaultPlotShadow: 0}, p.pie2d);
    p("doughnut2d", {friendlyName: "Doughnut Chart", getPointColor: function (a, n, e) {
        var d;
        a = ma(a);
        n = ua(n);
        100 > e && qa ? (d = ea(a, t(100 * (85 - .2 * (100 - e))) / 100), a = ga(a, t(100 * (100 - .5 * e)) / 100), n = {FCcolor: {color: d + "," + a + "," + a + "," + d, alpha: n + "," + n + "," + n + "," + n, radialGradient: !0, gradientUnits: "userSpaceOnUse", r: e}}) : n = {FCcolor: {color: a + "," + a, alpha: n + "," + n, ratio: "0,100"}};
        return n
    }}, p.pie2d);
    p("doughnut3d", {friendlyName: "3D Doughnut Chart", defaultSeriesType: "pie3d",
        rendererId: "pie3d", fireGroupEvent: !0, getPointColor: p.pie3d, defaultPlotShadow: 0}, p.doughnut2d);
    p("pareto2d", {standaloneInit: !0, friendlyName: "Pareto Chart", point: function (a, n, e, d, v) {
        a = e.length;
        var b = 0, w = 0, c = {}, V = this.colorManager, u = /3d$/.test(v.chart.defaultSeriesType), X = this.isBar, m = q(360 - d.plotfillangle, 90), f = q(d.showplotborder, u ? Ia : ya) === ya ? u ? 1 : k(d.plotborderthickness, 1) : 0, h = v.chart.useRoundEdges, p = q(d.tooltipsepchar, ", "), C = q(d.plotbordercolor, V.getColor("plotBorderColor")).split(Y)[0], l = d.showplotborder ==
            Ia ? Ia : q(d.plotborderalpha, d.plotfillalpha, Qa), F = v.xAxis, wa = k(d.showcumulativeline, 1), sa = v[ta], ja = sa.axisGridManager, za = sa.x, U = d.showtooltip != Ia, J = [], D = k(d.use3dlighting, 1), H = v[ta].numberFormatter, Sa = k(d.showlinevalues, d.showvalues), g = k(d.plotborderdashed, 0), R, K = k(d.plotborderdashlen, 5), x = k(d.plotborderdashgap, 4), t = pa(d.xaxisname), A = pa(d.yaxisname), W = sa.numberFormatter, M = n, y, O, E, Q, Z, z, I, G, N, fa, r, B, P, L, ea, da, ba, xa, aa, ga, la, ia, Pa, ha, Ga, l = u ? d.showplotborder ? l : Ia : l, C = u ? q(d.plotbordercolor, "#FFFFFF") : C;
        E = k(d.useplotgradientcolor, 1) ? ab(d.plotgradientcolor, V.getColor("plotGradientColor")) : ca;
        for (ea = O = 0; O < a; O += 1)la = e[O], e[O].vline ? ja.addVline(F, la, ea, v) : (y = H.getCleanValue(la.value, !0), null !== y && (w += la.value = y, J.push(la), ea += 1));
        a = J.length;
        J.sort(function (a, e) {
            return e.value - a.value
        });
        wa && 0 < w ? (fa = k(d.linedashed, 0), da = ma(q(d.linecolor, V.getColor("plotBorderColor"))), c = q(d.linealpha, 100), r = k(d.linedashlen, 5), P = k(d.linedashgap, 4), O = k(d.linethickness, 2), L = {opacity: c / 100}, ga = q(d.valueposition, "auto"), ia =
            k(d.drawanchors, d.showanchors), void 0 === ia && (ia = c != Ia), y = k(d.anchorborderthickness, 1), R = k(d.anchorsides, 0), aa = k(d.anchorradius, 3), xa = ma(q(d.anchorbordercolor, da)), e = ma(q(d.anchorbgcolor, V.getColor("anchorBgColor"))), ba = ua(q(d.anchoralpha, Qa)), ea = ua(q(d.anchorbgalpha, ba)) * ba / 100, fa = fa ? La(r, P, O) : "none", P = Boolean(k(la.anchorshadow, d.anchorshadow, 0)), r = this.pointHoverOptions(la, n, {plotType: "anchor", anchorBgColor: e, anchorAlpha: ba, anchorBgAlpha: ea, anchorAngle: q(d.anchorstartangle, 90), anchorBorderThickness: y,
            anchorBorderColor: xa, anchorBorderAlpha: ba, anchorSides: R, anchorRadius: aa, shadow: B}), c = {yAxis: 1, data: [], type: "line", color: {FCcolor: {color: da, alpha: c}}, lineWidth: O, marker: {enabled: ia, shadow: P && 1 <= aa ? {opacity: ba / 100} : !1, fillColor: {FCcolor: {color: e, alpha: ea}}, lineColor: {FCcolor: {color: xa, alpha: ba}}, lineWidth: y, radius: aa, symbol: eb(R), startAngle: q(d.anchorstartangle, 90)}}, M = [M, c], sa[1] || (sa[1] = {}), sa[1].stacking100Percent = !0) : ("1" !== d.showsecondarylimits && (d.showsecondarylimits = "0"), "1" !== d.showdivlinesecondaryvalue &&
            (d.showdivlinesecondaryvalue = "0"));
        sa[1] || (sa[1] = {});
        sa[1].stacking100Percent = !0;
        for (O = 0; O < a; O += 1)la = J[O], B = k(la.showlabel, d.showlabels, 1), e = pa(B ? Oa(la.label, la.name) : ca), I = q(la.color, V.getPlotColor()), ja.addXaxisCat(F, O, O, e, la, {}, d, I), b += y = la.value, Q = k(la.dashed, g), Z = q(la.dashgap, x), z = q(la.dashlen, K), G = q(la.alpha, d.plotfillalpha, Qa), N = q(la.ratio, d.plotfillratio), B = {opacity: G / 100}, Pa = q(la.alpha, l) + ca, ia = ra(I + Y + E.replace(/,+?$/, ""), G, N, m, h, C + ca, Pa + ca, X, u), R = Q ? La(z, Z, f) : "none", ea = b / w * 100, xa = H.percentValue(ea),
            ba = null === y ? y : W.dataLabels(y), da = Fa(pa(la.displayvalue)), aa = k(la.showvalue, sa.showValues) ? void 0 !== da ? da : ba : ca, P = q(da, ba, ca), sa.showTooltip ? void 0 !== (da = Fa(pa(q(la.tooltext, sa.tooltext)))) ? (ha = {formattedValue: ba, label: e, yaxisName: A, xaxisName: t, cumulativeValue: b, cumulativeDataValue: W.dataLabels(b), cumulativePercentValue: xa, sum: W.dataLabels(w), unformattedSum: w}, Ga = [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25], da = Na(da, Ga, ha, la, d)) : da = null === ba ? !1 : e !== ca ? e + sa.tooltipSepChar + ba : ba : da = ca, Z = this.pointHoverOptions(la,
            n, {plotType: "column", is3d: u, isBar: X, use3DLighting: D, isRoundEdged: h, color: I, gradientColor: E, alpha: G, ratio: N, angle: m, borderWidth: f, borderColor: C, borderAlpha: Pa, borderDashed: Q, borderDashGap: Z, borderDashLen: z, shadow: B}), Q = q(la.link), n.data.push({link: Q, toolText: da, displayValue: aa, displayValueArgs: P, categoryLabel: e, y: y, shadow: B, color: ia[0], borderColor: ia[1], borderWidth: f, use3DLighting: D, dashStyle: R, tooltipConstraint: this.tooltipConstraint, hoverEffects: Z.enabled && Z.options, rolloverProperties: Z.enabled &&
            Z.rolloverOptions}), this.pointValueWatcher(v, y), wa && (y = Fa(pa(q(la.cumulativeplottooltext, d.cumulativeplottooltext))), B = 1 == Sa ? xa : 0 === Sa || aa === ca ? ca : xa, aa = xa, da = U ? void 0 !== y ? Na(y, Ga || [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25], ha || {formattedValue: ba, label: e, yaxisName: A, xaxisName: t, cumulativeValue: b, cumulativeDataValue: W.dataLabels(b), cumulativePercentValue: xa, sum: W.dataLabels(w), unformattedSum: w}, la, d) : (e !== ca ? e + p : ca) + xa : ca, c.data.push({shadow: L, color: c.color, marker: c.marker, y: ea, toolText: da, displayValue: B, displayValueArgs: aa,
            valuePosition: ga, categoryLabel: e, link: Q, dashStyle: fa, hoverEffects: r.enabled && r.options, rolloverProperties: r.enabled && r.rolloverOptions}));
        za.catCount = a;
        return M
    }, defaultSeriesType: "column", isDual: !0, creditLabel: na, rendererId: "cartesian"}, Da);
    p("pareto3d", {friendlyName: "3D Pareto Chart", defaultSeriesType: "column3d", fireGroupEvent: !0, defaultPlotShadow: 1, is3D: !0}, p.pareto2d);
    p("_mscolumn2d", {standaloneInit: !0, friendlyName: "Multi-series Column Chart", creditLabel: na, rendererId: "cartesian"}, p.mscolumn2dbase);
    p("mscolumn2d", {standaloneInit: !0, friendlyName: "Multi-series Column Chart", creditLabel: na, newArchitecture: !0, rendererId: "newcartesian"}, p.mscolumn2dbase);
    p("mscolumn3d", {defaultSeriesType: "column3d", friendlyName: "Multi-series 3D Column Chart", defaultPlotShadow: 1, fireGroupEvent: !0, is3D: !0, defaultZeroPlaneHighlighted: !1}, p.mscolumn2d);
    p("msbar2d", {friendlyName: "Multi-series Bar Chart", isBar: !0, newArchitecture: !0, defaultSeriesType: "bar", spaceManager: p.barbase}, p.mscolumn2d);
    p("msbar3d", {defaultSeriesType: "bar3d",
        friendlyName: "Multi-series 3D Bar Chart", fireGroupEvent: !0, defaultPlotShadow: 1, is3D: !0, defaultZeroPlaneHighlighted: !1}, p.msbar2d);
    p("_msline", {standaloneInit: !0, friendlyName: "Multi-series Line Chart", creditLabel: na, rendererId: "cartesian"}, p.mslinebase);
    p("_msarea", {standaloneInit: !0, friendlyName: "Multi-series Area Chart", creditLabel: na, rendererId: "cartesian"}, p.msareabase);
    p("msarea", {standaloneInit: !0, friendlyName: "Multi-series Area Chart", creditLabel: na, newArchitecture: !0, rendererId: "newareacartesian"},
        p.msareabase);
    p("msline", {standaloneInit: !0, friendlyName: "Multi-series Line Chart", creditLabel: na, newArchitecture: !0, rendererId: "newlinecartesian"}, p.mslinebase);
    p("stackedarea2d", {friendlyName: "New Stacked Area Chart", isStacked: !0, areaAlpha: 100, rendererId: "newareacartesian", newArchitecture: !0}, p.msarea);
    p("_stackedcolumn2d", {friendlyName: "Stacked Column Chart", isStacked: !0}, p._mscolumn2d);
    p("stackedcolumn2d", {friendlyName: "Stacked Column Chart", isStacked: !0, rendererId: "newcartesian", newArchitecture: !0},
        p.mscolumn2d);
    p("stackedcolumn3d", {friendlyName: "3D Stacked Column Chart", isStacked: !0}, p.mscolumn3d);
    p("stackedbar2d", {friendlyName: "Stacked Bar Chart", isStacked: !0, newArchitecture: !0}, p.msbar2d);
    p("stackedbar3d", {friendlyName: "3D Stacked Bar Chart", isStacked: !0, newArchitecture: !0}, p.msbar3d);
    p("_stackedarea2d", {friendlyName: "Stacked Area Chart", isStacked: !0, areaAlpha: 100, showSum: 0}, p._msarea);
    p("marimekko", {friendlyName: "Marimekko Chart", isValueAbs: !0, distributedColumns: !0, isStacked: !0, xAxisMinMaxSetter: Ma,
            postSeriesAddition: function (a, n) {
                var e = a[ta], d = 0, v = a.xAxis, b = 100 / e.marimekkoTotal, w = [], c = a.series, V = 0, u = Ba({}, a.plotOptions.series.dataLabels.style), X = parseInt(u.fontSize, 10), m = k(n.chart.plotborderthickness, 1), f = a.chart.rotateValues, h = k(n.chart.rotatexaxispercentvalues, 0), p = -.5 * m - (m % 2 + (h ? 1 : 0) + !a.chart.plotBorderWidth), C = h ? X / 2 * 1.2 : 0, l = f ? 270 : 0, F = e[0], wa = F.stacking100Percent, sa = !wa, ja = e.inCanvasStyle, q = this.numberFormatter, R = n.categories && n.categories[0] && n.categories[0].category || [], J = 0, D = [], H, U, g,
                    A, K, S, T, Q, E, M, m = [];
                e.isXYPlot = !0;
                e.distributedColumns = !0;
                v.min = 0;
                v.max = 100;
                v.labels.enabled = !1;
                v.gridLineWidth = 0;
                v.alternateGridColor = ia;
                H = F.stack;
                n.chart.interactivelegend = "0";
                F = 0;
                for (U = a.xAxis.plotLines.length; F < U; F += 1)g = v.plotLines[F], g.isGrid && (g.isCat = !0, w[g.value] = g, g._hideLabel = !0);
                for (F = U = 0; F < R.length; F += 1)R[F].vline || (J += D[U] = q.getCleanValue(R[F].widthpercent || 0), U += 1);
                g = H.floatedcolumn && H.floatedcolumn[0] || [];
                if (100 === J && (g && g.length) !== U)for (; U--;)g[U] || (g[U] = {p: null});
                J = x(J);
                if (g)for (K =
                               0, U = g.length; K < U;) {
                    M = g[K];
                    d += A = M && M.p || 0;
                    T = 100 === J ? D[K] : A * b;
                    S = V + T / 2;
                    Q = V + T;
                    m.push(Q);
                    for (F = 0; F < c.length; F += 1)if (a.series[F].visible = !0, R = a.series[F].data[K], R._FCX = V, R._FCW = T, E = q.percentValue(R.y / A * 100), R.toolText = Na(R.toolText, [14, 24, 25, 111, 112], {xAxisPercentValue: q.percentValue(T), percentValue: E, sum: q.dataLabels(A), unformattedSum: A}), wa) {
                        if (R.y || 0 === R.y)H = R.y / A * 100, R.y = H, R.showPercentValues && (R.displayValue = E), e.showPercentValues && (R.displayValueArgs = E);
                        if (R.previousY || 0 === R.previousY)R.previousY =
                            R.previousY / A * 100
                    }
                    e.showStackTotal && a.xAxis.plotLines.push({value: S, width: 0, isVline: sa, isTrend: !sa, _isStackSum: 1, zIndex: 4, label: {align: W, textAlign: W, rotation: l, style: u, verticalAlign: B, offsetScale: sa ? 0 > A ? M.n : M.p : void 0, offsetScaleIndex: 0, y: 0 > A ? 270 === f ? 4 : X : -4, x: 0, text: q.yAxis(Ha(A, 10))}});
                    w[K] && (w[K].value = S, w[K]._weight = T, w[K]._hideLabel = !1);
                    K += 1;
                    e.showXAxisPercentValues && K < U && a.xAxis.plotLines.push({value: Q, width: 0, isVine: !0, label: {align: W, textAlign: h ? la : W, rotation: h ? 270 : 0, backgroundColor: "#ffffff",
                        backgroundOpacity: 1, borderWidth: "1px", borderType: "solid", borderColor: ja.color, style: {color: ja.color, fontSize: ja.fontSize, fontFamily: ja.fontFamily, lineHeight: ja.lineHeight}, verticalAlign: fa, y: p, x: C, text: this.numberFormatter.percentValue(Q)}, zIndex: 5});
                    V = Q
                }
                K = 0;
                for (U = w.length; K < U; K += 1)w[K] && w[K]._hideLabel && (w[K].value = null);
                F = 0;
                for (U = a.xAxis.plotLines.length; F < U; F += 1)if (g = v.plotLines[F], g.isVline && !g._isStackSum && (e = g.value))e -= .5, d = m[t(e)], b = m[I(e)], g.value = d + (b - d) * (e - t(e))
            }, defaultSeriesType: "floatedcolumn"},
        p._stackedcolumn2d);
    p("msstackedcolumn2d", {friendlyName: "Multi-series Stacked Column Chart", msstackedcolumn2d: !0, series: function (a, n, e) {
        var d, v, b, w, c = n[ta], V = 0, u, X;
        u = [];
        var m;
        n.legend.enabled = Boolean(k(a.chart.showlegend, 1));
        if (a.dataset && 0 < a.dataset.length) {
            this.categoryAdder(a, n);
            d = 0;
            for (v = a.dataset.length; d < v; d += 1)if (m = a.dataset[d].dataset)for (b = 0, w = m.length; b < w; b += 1, V += 1)u = {__positiionIndex: d, __stackIndex: b, hoverEffects: this.parseSeriesHoverOptions(a, n, m[b], e), visible: !k(m[b].initiallyhidden,
                0), data: [], numColumns: v, columnPosition: d}, X = Math.min(c.oriCatTmp.length, m[b].data && m[b].data.length), u = this.point(e, u, m[b], a.chart, n, X, V, d), n.series.push(u);
            if (this.isDual && a.lineset && 0 < a.lineset.length)for (b = 0, w = a.lineset.length; b < w; b += 1, V += 1)d = a.lineset[b], u = {hoverEffects: this.parseSeriesHoverOptions(a, n, d, e), visible: !k(d.initiallyhidden, 0), data: [], yAxis: 1, type: "line"}, X = Math.min(c.oriCatTmp.length, d.data && d.data.length), n.series.push(p.msline.point.call(this, "msline", u, d, a.chart, n, X, V));
            this.configureAxis(n,
                a);
            a.trendlines && $a(a.trendlines, n.yAxis, n[ta], this.isDual, this.isBar)
        }
    }, postSpaceManager: function (a, n, e) {
        var d = a[ta], b, c, w;
        p.base.postSpaceManager.call(this);
        if (this.isStacked && d.showStackTotal && (b = a.chart, a = (n = a.xAxis) && n.plotLines, b = e - b.marginLeft - b.marginRight, e = d.plotSpacePercent, d = d[0].stack, d = d.column && d.column.length, c = (1 - 2 * e) / d, n = b / (n.max - n.min), 50 < n * c && .1 == e))for (n = 50 / n, e = a && a.length, d = -((d - 1) / 2) * n, w = 0; w < e; w += 1)c = a[w], c._isStackSum && (b = c._catPosition + (d + n * c._stackIndex), c.value = b)
    }}, p.stackedcolumn2d);
    p("_msstackedcolumn2d", {friendlyName: "Multi-series Stacked Column Chart", series: function (a, n, e) {
        var d, b, c, w, f = n[ta], V = 0, u, X;
        u = [];
        var m;
        n.legend.enabled = Boolean(k(a.chart.showlegend, 1));
        if (a.dataset && 0 < a.dataset.length) {
            this.categoryAdder(a, n);
            d = 0;
            for (b = a.dataset.length; d < b; d += 1)if (m = a.dataset[d].dataset)for (c = 0, w = m.length; c < w; c += 1, V += 1)u = {hoverEffects: this.parseSeriesHoverOptions(a, n, m[c], e), visible: !k(m[c].initiallyhidden, 0), data: [], numColumns: b, columnPosition: d}, X = Math.min(f.oriCatTmp.length, m[c].data &&
                m[c].data.length), u = this.point(e, u, m[c], a.chart, n, X, V, d), n.series.push(u);
            if (this.isDual && a.lineset && 0 < a.lineset.length)for (c = 0, w = a.lineset.length; c < w; c += 1, V += 1)d = a.lineset[c], u = {hoverEffects: this.parseSeriesHoverOptions(a, n, d, e), visible: !k(d.initiallyhidden, 0), data: [], yAxis: 1, type: "line"}, X = Math.min(f.oriCatTmp.length, d.data && d.data.length), n.series.push(p.msline.point.call(this, "msline", u, d, a.chart, n, X, V));
            this.configureAxis(n, a);
            a.trendlines && $a(a.trendlines, n.yAxis, n[ta], this.isDual, this.isBar)
        }
    },
        postSpaceManager: function (a, n, e) {
            var d = a[ta], b, c, w;
            p.base.postSpaceManager.call(this);
            if (this.isStacked && d.showStackTotal && (b = a.chart, a = (n = a.xAxis) && n.plotLines, b = e - b.marginLeft - b.marginRight, e = d.plotSpacePercent, d = d[0].stack, d = d.column && d.column.length, c = (1 - 2 * e) / d, n = b / (n.max - n.min), 50 < n * c && .1 == e))for (n = 50 / n, e = a && a.length, d = -((d - 1) / 2) * n, w = 0; w < e; w += 1)c = a[w], c._isStackSum && (b = c._catPosition + (d + n * c._stackIndex), c.value = b)
        }}, p._stackedcolumn2d);
    p("mscombi2d", {friendlyName: "Multi-series Combination Chart",
        standaloneInit: !0, creditLabel: na, newArchitecture: !0, rendererId: "newmscombi2d"}, p.mscombibase);
    p("_mscombi2d", {friendlyName: "Multi-series Combination Chart", standaloneInit: !0, creditLabel: na, rendererId: "cartesian"}, p.mscombibase);
    p("mscombi3d", {friendlyName: "Multi-series 3D Combination Chart", series: p.mscombi2d.series, rendererId: "newmscombi2d", eiMethods: function (a) {
        var n = {};
        Ea(a.split(","), function (a) {
            n[a] = function () {
                va.raiseWarning(this, "1301081430", "run", "JSRenderer~" + a + "()", "Method not applicable.")
            }
        });
        return n
    }("view2D,view3D,resetView,rotateView,getViewAngles,fitToStage")}, p.mscolumn3d);
    p("mscolumnline3d", {friendlyName: "Multi-series Column and Line Chart", use3dlineshift: 1}, p.mscombi3d);
    p("stackedcolumn2dline", {friendlyName: "Stacked Column and Line Chart", isStacked: !0, stack100percent: 0, newArchitecture: !0}, p.mscombi2d);
    p("stackedcolumn3dline", {friendlyName: "Stacked 3D Column and Line Chart", isStacked: !0, use3dlineshift: 1, stack100percent: 0}, p.mscombi3d);
    p("mscombidy2d", {friendlyName: "Multi-series Dual Y-Axis Combination Chart",
        isDual: !0, secondarySeriesType: void 0}, p.mscombi2d);
    p("mscolumn3dlinedy", {friendlyName: "Multi-series 3D Column and Line Chart", isDual: !0, secondarySeriesType: "line"}, p.mscolumnline3d);
    p("stackedcolumn3dlinedy", {friendlyName: "Stacked 3D Column and Line Chart", isDual: !0, secondarySeriesType: "line"}, p.stackedcolumn3dline);
    p("msstackedcolumn2dlinedy", {friendlyName: "Multi-series Dual Y-Axis Stacked Column and Line Chart", isDual: !0, stack100percent: 0, secondarySeriesType: "line", rendererId: "msstackedcolumn2dlinedy"},
        p.msstackedcolumn2d);
    p("_msstackedcolumn2dlinedy", {friendlyName: "Multi-series Dual Y-Axis Stacked Column and Line Chart", isDual: !0, stack100percent: 0, secondarySeriesType: "line"}, p._msstackedcolumn2d);
    p("scrollcolumn2d", {friendlyName: "Scrollable Multi-series Column Chart", postSeriesAddition: p.scrollbase.postSeriesAddition, tooltipConstraint: "plot", canvasborderthickness: 1, avgScrollPointWidth: 40}, p.mscolumn2d);
    p("scrollline2d", {friendlyName: "Scrollable Multi-series Line Chart", postSeriesAddition: p.scrollbase.postSeriesAddition,
        tooltipConstraint: "plot", canvasborderthickness: 1, avgScrollPointWidth: 75}, p.msline);
    p("scrollarea2d", {friendlyName: "Scrollable Multi-series Area Chart", postSeriesAddition: p.scrollbase.postSeriesAddition, tooltipConstraint: "plot", canvasborderthickness: 1, avgScrollPointWidth: 75}, p.msarea);
    p("scrollstackedcolumn2d", {friendlyName: "Scrollable Stacked Column Chart", postSeriesAddition: function (a, n, e, d) {
        p.base.postSeriesAddition.call(this, a, n, e, d);
        p.scrollbase.postSeriesAddition.call(this, a, n, e, d)
    }, canvasborderthickness: 1,
        tooltipConstraint: "plot", avgScrollPointWidth: 75}, p.stackedcolumn2d);
    p("scrollcombi2d", {friendlyName: "Scrollable Combination Chart", postSeriesAddition: p.scrollbase.postSeriesAddition, tooltipConstraint: "plot", canvasborderthickness: 1, avgScrollPointWidth: 40}, p.mscombi2d);
    p("scrollcombidy2d", {friendlyName: "Scrollable Dual Y-Axis Combination Chart", postSeriesAddition: p.scrollbase.postSeriesAddition, tooltipConstraint: "plot", canvasborderthickness: 1, avgScrollPointWidth: 40}, p.mscombidy2d);
    p("scatter", {friendlyName: "Scatter Chart",
        isXY: !0, standaloneInit: !0, defaultSeriesType: "scatter", defaultZeroPlaneHighlighted: !1, creditLabel: na}, p.scatterbase);
    Ba(L.eventList, {zoomedOut: "FC_ZoomedOut"});
    p("bubble", {friendlyName: "Bubble Chart", standaloneInit: !0, standaloneInut: !0, defaultSeriesType: "bubble", rendererId: "bubble", point: function (a, n, e, d, b) {
        a = k(d.ignoreemptydatasets, 0);
        var c = !1, w = this.colorManager, f, V, u, X, m, bb, h, p, C, R, F, wa, l, g, U, x, J = k(e.showvalues, b[ta].showValues);
        f = k(d.bubblescale, 1);
        var D = q(d.negativecolor, "FF0000");
        V = k(d.minbubbleradius);
        var H = b.plotOptions.bubble, A = this.numberFormatter, t = n._showRegression = k(e.showregressionline, d.showregressionline, 0), Q, K, S, T;
        n.name = Fa(e.seriesname);
        u = Boolean(k(e.drawanchors, e.showanchors, d.drawanchors, 1));
        p = q(e.plotfillalpha, e.bubblefillalpha, d.plotfillalpha, Qa);
        C = k(e.showplotborder, d.showplotborder, 1);
        R = ma(q(e.plotbordercolor, d.plotbordercolor, "666666"));
        F = q(e.plotborderthickness, d.plotborderthickness, 1);
        wa = q(e.plotborderalpha, d.plotborderalpha, "95");
        C = 1 === C ? F : 0;
        w = q(e.color, e.plotfillcolor, d.plotfillcolor,
            w.getPlotColor());
        n.marker = {enabled: u, fillColor: this.getPointColor(w, Qa), lineColor: aa(R, C ? wa : 0), lineWidth: C, symbol: "circle"};
        n.getPointColor = this.getPointColor;
        if (F = e.data) {
            x = F.length;
            H.bubbleScale = f;
            H.minBubbleRadius = V;
            if (0 === k(e.includeinlegend) || void 0 === n.name)n.showInLegend = !1;
            t && (n.events = {hide: this.hideRLine, show: this.showRLine}, Q = {sumX: 0, sumY: 0, sumXY: 0, sumXsqure: 0, sumYsqure: 0, xValues: [], yValues: []}, K = k(e.showyonx, d.showyonx, 1), S = ma(q(e.regressionlinecolor, d.regressionlinecolor, w)), T = k(e.regressionlinethickness,
                d.regressionlinethickness, 1), f = ua(k(e.regressionlinealpha, d.regressionlinealpha, 100)), S = aa(S, f));
            for (V = 0; V < x; V += 1)(X = F[V]) ? (f = A.getCleanValue(X.y), l = A.getCleanValue(X.x), g = A.getCleanValue(X.z, !0), null === f ? n.data.push({y: null, x: l}) : (c = !0, h = 0 !== k(d.use3dlighting, X.is3d, e.is3d, d.is3d), m = ma(q(X.color, 0 > X.z ? D : w)), bb = q(X.alpha, p), U = this.getPointStub(X, f, l, b, e, J), m = h ? this.getPointColor(m, bb) : {FCcolor: {color: m, alpha: bb}}, null !== g && (H.zMax = H.zMax > g ? H.zMax : g, H.zMin = H.zMin < g ? H.zMin : g), X = this.pointHoverOptions(X,
                n, {plotType: "bubble", is3d: h, seriesAnchorSymbol: "circle", color: m, negativeColor: D, alpha: bb, borderWidth: C, borderColor: R, borderAlpha: wa, shadow: !1}), n.is3d = h, n.data.push({y: f, x: l, z: g, displayValue: U.displayValue, displayValueArgs: U.displayValueArgs, toolText: U.toolText, link: U.link, hoverEffects: X.enabled && X.options, rolloverProperties: X.enabled && X.rolloverOptions, marker: {enabled: u, fillColor: m, lineColor: {FCcolor: {color: R, alpha: wa}}, lineWidth: C, symbol: "circle"}}), this.pointValueWatcher(b, f, l, t && Q))) : n.data.push({y: null});
            t && (e = {type: "line", color: S, showInLegend: !1, lineWidth: T, enableMouseTracking: !1, marker: {enabled: !1}, data: this.getRegressionLineSeries(Q, K, x), zIndex: 0}, n = [n, e])
        }
        a && !c && (n.showInLegend = !1);
        return n
    }, getPointStub: function (a, n, e, d, b, c) {
        var w = this.dataObj.chart;
        d = d[ta];
        n = null === n ? n : d.numberFormatter.dataLabels(n);
        var f, V = d.tooltipSepChar, u = Fa(pa(q(a.tooltext, b.plottooltext, d.tooltext)));
        d.showTooltip ? void 0 !== u ? b = Na(u, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 118], {yDataValue: n, xDataValue: d.numberFormatter.xAxis(e), yaxisName: pa(w.yaxisname),
            xaxisName: pa(w.xaxisname), zDataValue: d.numberFormatter.dataLabels(a.z)}, a, w, b) : null === n ? b = !1 : (d.seriesNameInToolTip && (f = q(b && b.seriesname)), b = f ? f + V : ca, b += e ? d.numberFormatter.xAxis(e) + V : ca, b = b + n + (a.z ? V + d.numberFormatter.dataLabels(a.z) : ca)) : b = ca;
        e = k(a.showvalue, c, d.showValues) ? void 0 !== q(a.displayvalue, a.name, a.label) ? pa(q(a.displayvalue, a.name, a.label)) : n : ca;
        c = q(pa(q(a.displayvalue, a.name, a.label)), n, ca);
        a = Fa(a.link);
        return{displayValue: e, displayValueArgs: c, toolText: b, link: a}
    }}, p.scatter);
    p("ssgrid",
        {friendlyName: "Grid Component", standaloneInit: !0, defaultSeriesType: "ssgrid", rendererId: "ssgrid", chart: function (a, b) {
            var e = this.containerElement, d = Ba({}, this.dataObj), v = d.chart || (d.chart = d.graph || {}), c = this.chartInstance, w = 0, f = [], V = d.data, u = V && V.length, X = this.smartLabel, m = this.numberFormatter, h = e.offsetHeight, R = e.offsetWidth, l = this.colorManager, C, g, F, wa, U, ja, x, A, J, D, H, t, Q, E, K, S, T, W, z, M, y, O, I, G, Z, fa = 0;
            g = 0;
            var e = {_FCconf: {0: {stack: {}}, 1: {stack: {}}, x: {stack: {}}, noWrap: !1, marginLeftExtraSpace: 0, marginRightExtraSpace: 0,
                marginBottomExtraSpace: 0, marginTopExtraSpace: 0, marimekkoTotal: 0}, chart: {ignoreHiddenSeries: !1, events: {}, spacingTop: 0, spacingRight: 0, spacingBottom: 0, spacingLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0, borderRadius: 0, borderColor: "#000000", borderWidth: 1, defaultSeriesType: "ssgrid", textDirection: "1" === v.hasrtltext ? "rtl" : "", style: {fontFamily: q(v.basefont, "Verdana,sans"), fontSize: Xa(v.basefontsize, 20) + Za, color: q(v.basefontcolor, l.getColor("baseFontColor")).replace(/^#?([a-f0-9]+)/ig, "#$1")},
                plotBackgroundColor: ia}, labels: {smartLabel: X}, colors: "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), credits: {href: L.CREDIT_HREF, text: L.CREDIT_STRING, enabled: na}, legend: {enabled: !1}, series: [], subtitle: {text: ca}, title: {text: ca}, tooltip: {enabled: !1}, exporting: {buttons: {exportButton: {}, printButton: {enabled: !1}}}}, N = e[ta], B = C = g = fa = 0, r = w = E = 0;
            Z = c.jsVars.cfgStore;
            c = e.chart;
            U = c.toolbar =
            {button: {}};
            ja = U.button;
            delete d.graph;
            ha(e.chart.style);
            c.events.click = this.linkClickFN;
            ja.scale = k(v.toolbarbuttonscale, 1.15);
            ja.width = k(v.toolbarbuttonwidth, 15);
            ja.height = k(v.toolbarbuttonheight, 15);
            ja.radius = k(v.toolbarbuttonradius, 2);
            ja.spacing = k(v.toolbarbuttonspacing, 5);
            ja.fill = aa(q(v.toolbarbuttoncolor, "ffffff"));
            ja.labelFill = aa(q(v.toolbarlabelcolor, "cccccc"));
            ja.symbolFill = aa(q(v.toolbarsymbolcolor, "ffffff"));
            ja.hoverFill = aa(q(v.toolbarbuttonhovercolor, "ffffff"));
            ja.stroke = aa(q(v.toolbarbuttonbordercolor,
                "bbbbbb"));
            ja.symbolStroke = aa(q(v.toolbarsymbolbordercolor, "9a9a9a"));
            ja.strokeWidth = k(v.toolbarbuttonborderthickness, 1);
            ja.symbolStrokeWidth = k(v.toolbarsymbolborderthickness, 1);
            d = ja.symbolPadding = k(v.toolbarsymbolpadding, 5);
            ja.symbolHPadding = k(v.toolbarsymbolhpadding, d);
            ja.symbolVPadding = k(v.toolbarsymbolvpadding, d);
            ja = U.position = q(v.toolbarposition, "tr").toLowerCase();
            switch (ja) {
                case "tr":
                case "tl":
                case "br":
                case "bl":
                    break;
                default:
                    ja = "tr"
            }
            d = U.hAlign = "left" === (ca + v.toolbarhalign).toLowerCase() ?
                "l" : ja.charAt(1);
            ja = U.vAlign = "bottom" === (ca + v.toolbarvalign).toLowerCase() ? "b" : ja.charAt(0);
            U.hDirection = k(v.toolbarhdirection, "r" === d ? -1 : 1);
            U.vDirection = k(v.toolbarvdirection, "b" === ja ? -1 : 1);
            U.vMargin = k(v.toolbarvmargin, 6);
            U.hMargin = k(v.toolbarhmargin, 10);
            U.x = k(v.toolbarx, "l" === d ? 0 : a);
            U.y = k(v.toolbary, "t" === ja ? 0 : b);
            void 0 !== q(v.clickurl) && (c.link = v.clickurl, c.style.cursor = "pointer");
            C = k(Z.showpercentvalues, v.showpercentvalues, 0);
            g = q(Z.numberitemsperpage, v.numberitemsperpage);
            k(Z.showshadow, v.showshadow,
                0);
            w = q(Z.basefont, v.basefont, "Verdana,sans");
            F = Xa(Z.basefontsize, v.basefontsize, 10);
            F += Za;
            wa = ma(q(Z.basefontcolor, v.basefontcolor, l.getColor("baseFontColor")));
            d = ma(q(Z.alternaterowbgcolor, v.alternaterowbgcolor, l.getColor("altHGridColor")));
            U = q(Z.alternaterowbgalpha, v.alternaterowbgalpha, l.getColor("altHGridAlpha")) + ca;
            ja = k(Z.listrowdividerthickness, v.listrowdividerthickness, 1);
            x = ma(q(Z.listrowdividercolor, v.listrowdividercolor, l.getColor("borderColor")));
            A = k(Z.listrowdivideralpha, v.listrowdivideralpha,
                l.getColor("altHGridAlpha")) + 15 + ca;
            J = k(Z.colorboxwidth, v.colorboxwidth, 8);
            D = k(Z.colorboxheight, v.colorboxheight, 8);
            H = k(Z.navbuttonradius, v.navbuttonradius, 7);
            t = ma(q(Z.navbuttoncolor, v.navbuttoncolor, l.getColor("canvasBorderColor")));
            Q = ma(q(Z.navbuttonhovercolor, v.navbuttonhovercolor, l.getColor("altHGridColor")));
            E = k(Z.textverticalpadding, v.textverticalpadding, 3);
            K = k(Z.navbuttonpadding, v.navbuttonpadding, 5);
            S = k(Z.colorboxpadding, v.colorboxpadding, 10);
            T = k(Z.valuecolumnpadding, v.valuecolumnpadding, 10);
            W = k(Z.namecolumnpadding, v.namecolumnpadding, 5);
            z = k(Z.borderthickness, v.borderthickness, 1);
            M = ma(q(Z.bordercolor, v.bordercolor, l.getColor("borderColor")));
            y = q(Z.borderalpha, v.borderalpha, l.getColor("borderAlpha")) + ca;
            O = q(Z.bgcolor, v.bgcolor, "FFFFFF");
            I = q(Z.bgalpha, v.bgalpha, Qa);
            G = q(Z.bgratio, v.bgratio, Qa);
            Z = q(Z.bgangle, v.bgangle, Ia);
            c.borderRadius = z / 16;
            c.borderWidth = z;
            c.borderColor = P({FCcolor: {color: M, alpha: y}});
            c.backgroundColor = {FCcolor: {color: O, alpha: I, ratio: G, angle: Z}};
            c.borderRadius = k(v.borderradius,
                0);
            Z = {fontFamily: w, fontSize: F, color: wa};
            ha(Z);
            X.setStyle(Z);
            for (w = 0; w < u; w += 1)if (F = V[w], z = m.getCleanValue(F.value), M = pa(Oa(F.label, F.name)), wa = ma(q(F.color, l.getPlotColor())), q(F.alpha, v.plotfillalpha, Qa), M != ca || null != z)f.push({value: z, label: M, color: wa}), fa += z, r += 1;
            for (w = 0; w < r; w += 1)F = f[w], z = F.value, F.dataLabel = F.label, F.displayValue = C ? m.percentValue(z / fa * 100) : m.dataLabels(z), V = X.getOriSize(F.displayValue), B = Math.max(B, V.width + T);
            g ? g >= r ? (C = h / r, g = r) : (m = h - 2 * (K + H), C = m / g) : (fa = parseInt(Z.lineHeight, 10),
                fa = Math.max(fa + 2 * E, D), g = h / fa, g >= r ? (C = h / r, g = r) : (m = h - 2 * (K + H), g = Math.floor(m / fa), C = m / g));
            E = R - S - J - W - B - T;
            w = S + J + W;
            m = q(v.basefont, "Verdana,sans");
            B = Xa(v.basefontsize, 10);
            l = q(v.basefontcolor, l.getColor("baseFontColor"));
            V = q(v.outcnvbasefont, m);
            F = Xa(v.outcnvbasefontsize, B);
            u = F + Za;
            v = q(v.outcnvbasefontcolor, l).replace(/^#?([a-f0-9]+)/ig, "#$1");
            B += Za;
            l = l.replace(/^#?([a-f0-9]+)/ig, "#$1");
            N.trendStyle = N.outCanvasStyle = {fontFamily: V, color: v, fontSize: u};
            ha(N.trendStyle);
            N.inCanvasStyle = {fontFamily: m, fontSize: B,
                color: l};
            e.tooltip.style = {fontFamily: m, fontSize: B, lineHeight: void 0, color: l};
            e.tooltip.shadow = !1;
            c.height = h;
            c.width = R;
            c.rowHeight = C;
            c.labelX = w;
            c.colorBoxWidth = J;
            c.colorBoxHeight = D;
            c.colorBoxX = S;
            c.valueX = S + J + W + E + T;
            c.valueColumnPadding = T;
            c.textStyle = Z;
            c.listRowDividerAttr = {"stroke-width": ja, stroke: {FCcolor: {color: x, alpha: A}}};
            c.alternateRowColor = {FCcolor: {color: d, alpha: U}};
            c.navButtonRadius = H;
            c.navButtonPadding = K;
            c.navButtonColor = t;
            c.navButtonHoverColor = Q;
            c.lineHeight = parseInt(Z.lineHeight, 10);
            h = [];
            v = 0;
            N = !0;
            for (w = 0; w < r & 0 !== g; w += 1)0 === w % g && (h.push({data: [], visible: N}), N = !1, v += 1), F = f[w], R = X.getSmartText(F.dataLabel, E, C), h[v - 1].data.push({label: R.text, originalText: R.tooltext, displayValue: F.displayValue, y: F.value, color: F.color});
            e.series = h;
            p.base.parseExportOptions.call(this, e);
            e.tooltip.enabled = !!e.exporting.enabled;
            return e
        }, creditLabel: na}, p.base);
    p("renderer.bubble", {drawPlotBubble: function (a, n) {
        var e = this, d = e.options, v = d.chart, f = d.plotOptions.series, w = f.dataLabels && f.dataLabels.style || {}, h =
            {fontFamily: w.fontFamily, fontSize: w.fontSize, lineHeight: w.lineHeight, fontWeight: w.fontWeight, fontStyle: w.fontStyle}, w = e.paper, V = e.elements, u = a.items, X = a.graphics = a.graphics || [], m = e.xAxis[n.xAxis || 0], p = e.yAxis[n.yAxis || 0], U = a.data, R = !1 !== (d.tooltip || {}).enabled, C, q, f = isNaN(+f.animation) && f.animation.duration || 1E3 * f.animation, F = !1 === n.visible ? "hidden" : "visible", wa = d.plotOptions.bubble, sa = wa.zMax, d = wa.bubbleScale, wa = wa.minBubbleRadius, ja = A(e.canvasHeight, e.canvasWidth) / 8, sa = g(sa), t, Q, J, D, H, E, W, z, K, S,
            T;
        t = e.layers;
        Q = t.dataset = t.dataset || w.group("dataset-orphan");
        var fa = t.tracker, r, M, y = function (a) {
            Ca.call(this, e, a)
        }, O = function (a, d, b) {
            return function (n) {
                a.attr(d);
                Ca.call(this, e, n, b)
            }
        };
        e.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", h);
        t.datalabels ? t.datalabels.attr("class", "fusioncharts-datalabels") : t.datalabels = w.group({"class": "fusioncharts-datalabels"}, "datalables").insertAfter(Q);
        h = Q.bubble = Q.bubble || w.group("bubble", Q);
        v.clipBubbles && !h.attrs["clip-rect"] && h.attr({"clip-rect": V["clip-canvas"]});
        t = 0;
        for (Q = U.length; t < Q; t += 1) {
            J = U[t];
            S = T = M = null;
            K = J.marker;
            if (null !== J.y && K && K.enabled) {
                D = J.link;
                v = J.toolText;
                H = k(J.x, t);
                E = J.y;
                V = {index: t, link: D, value: E, y: E, x: H, z: J.z, displayValue: J.displayValueArgs, toolText: J.toolText, id: a.userID, datasetIndex: a.index, datasetName: a.name, visible: a.visible};
                z = p.getAxisPosition(E);
                W = m.getAxisPosition(H);
                q = g(J.z);
                r = x(q * ja / sa) * d || 0;
                wa && (r = l(r, wa));
                q = C = {};
                J.hoverEffects && (q = {fill: P(K.fillColor), "stroke-width": K.lineWidth, stroke: P(K.lineColor), r: r}, C = J.rolloverProperties,
                    C = {fill: P(C.fillColor), "stroke-width": C.lineWidth, stroke: P(C.lineColor), r: r * C.scale});
                S = w.circle(W, z, 0, h).attr({fill: P(K.fillColor), ishot: !R, "stroke-width": K.lineWidth, stroke: P(K.lineColor), visibility: F}).animate({r: r || 0}, f, "easeOut", e.getAnimationCompleteFn());
                if (D || R)r < b && (r = b), T = w.circle(W, z, r, fa).attr({cursor: D ? "pointer" : "", stroke: c, "stroke-width": K.lineWidth, fill: c, ishot: !!D, visibility: F});
                (T || S).data("eventArgs", V).click(y).hover(O(S, C, "DataPlotRollOver"), O(S, q, "DataPlotRollOut")).tooltip(v);
                u[t] = {index: t, x: H, y: E, z: J.z, value: E, graphic: S, dataLabel: M, tracker: T};
                M = e.drawPlotLineLabel(a, n, t, W, z)
            } else u[t] = {index: t, x: H, y: E};
            M && X.push(M);
            S && X.push(S);
            T && X.push(T)
        }
        a.visible = !1 !== n.visible;
        return a
    }}, p["renderer.cartesian"]);
    p("renderer.ssgrid", {drawGraph: function () {
        var a = this.options.series, b = this.elements, e = b.plots, d = a.length, c;
        e || (e = this.plots = this.plots || [], b.plots = e);
        this.drawSSGridNavButton();
        for (c = 0; c < d; c++)(b = e[c]) || e.push(b = {items: [], data: a[c].data}), a[c].data && a[c].data.length && this.drawPlot(b,
            a[c]);
        1 < d && this.nenagitePage(0)
    }, drawPlot: function (a) {
        var b = a.data, e = this.paper, d = this.options.chart, c = d.colorBoxHeight, f = d.colorBoxWidth, w = d.colorBoxX, k = d.labelX, V = d.valueX, u = d.rowHeight, X = d.width, m = d.listRowDividerAttr, h = m["stroke-width"], m = P(m.stroke), l = h % 2 / 2, g = d.textStyle, C = this.layers, C = C.dataset = C.dataset || e.group("dataset-orphan"), U = P(d.alternateRowColor);
        a = a.items;
        var F = 0, p, R, q, t;
        b && b.length || (b = []);
        m = {stroke: m, "stroke-width": h};
        t = 0;
        for (h = b.length; t < h; t += 1)q = b[t], R = q.y, p = a[t] = {index: t, value: R,
            graphic: null, dataLabel: null, dataValue: null, alternateRow: null, listRowDivider: null, hot: null}, null !== R && void 0 !== R && (0 === t % 2 && (p.alternateRow = e.rect(0, F, X, u, 0, C).attr({fill: U, "stroke-width": 0})), R = x(F) + l, p.listRowDivider = e.path(["M", 0, R, "L", X, R], C).attr(m), p.graphic = e.rect(w, F + u / 2 - c / 2, f, c, 0, C).attr({fill: q.color, "stroke-width": 0, stroke: "#000000"}), R = p.dataLabel = e.text().attr({text: q.label, title: q.originalText || "", x: k, y: F + u / 2, fill: g.color, direction: d.textDirection, "text-anchor": "start"}).css(g), C.appendChild(R),
            p = p.dataValue = e.text().attr({text: q.displayValue, title: q.originalText || "", x: V, y: F + u / 2, fill: g.color, direction: d.textDirection, "text-anchor": "start"}).css(g), C.appendChild(p), F += u);
        R = x(F) + l;
        e.path(["M", 0, R, "L", X, R], C).attr(m)
    }, drawSSGridNavButton: function () {
        var a = this, b = a.paper, e = a.options, d = e.chart, c = e.series, f = d.navButtonColor, w = d.navButtonHoverColor, e = d.navButtonRadius, h = .67 * e, V = d.navButtonPadding + h + (c && c[0].data && c[0].data.length * d.rowHeight) + .5 * e, d = d.width - 20, u, X, m, k;
        1 < c.length && (k = a.naviigator =
            b.group("navigation"), a.navElePrv = c = b.group(k), u = b.path(["M", 20, V, "L", 20 + e + h, V - h, 20 + e, V, 20 + e + h, V + h, "Z"]).attr({fill: f, "stroke-width": 0, cursor: "pointer"}), c.appendChild(u), m = b.circle(20 + e, V, e).attr({fill: ia, "stroke-width": 0, cursor: "pointer"}).mouseover(function () {
            u.attr({fill: w, cursor: "pointer"})
        }).mouseout(function () {
            u.attr({fill: f})
        }).click(function () {
            a.nenagitePage(-1)
        }), c.appendChild(m), a.navEleNxt = c = b.group(k), X = b.path(["M", d, V, "L", d - e - h, V - h, d - e, V, d - e - h, V + h, "Z"]).attr({fill: f, "stroke-width": 0,
            cursor: "pointer"}), c.appendChild(X), b = b.circle(d - e, V, e).attr({fill: ia, "stroke-width": 0, cursor: "pointer"}).mouseover(function () {
            X.attr({fill: w})
        }).mouseout(function () {
            X.attr({fill: f})
        }).click(function () {
            a.nenagitePage(1)
        }), c.appendChild(b))
    }, nenagitePage: function (a) {
        var b = this.plots, e = b.length;
        a = (this.currentSeriesIndex || 0) + (a || 0);
        var d, c = function (a) {
            a.graphic && a.graphic.hide();
            a.dataLabel && a.dataLabel.hide();
            a.dataValue && a.dataValue.hide();
            a.alternateRow && a.alternateRow.hide();
            a.listRowDivider && a.listRowDivider.hide()
        };
        if (b[a]) {
            for (d = e; d--;)Ea(b[d].items, c);
            Ea(b[a].items, function (a) {
                a.graphic && a.graphic.show();
                a.dataLabel && a.dataLabel.show();
                a.dataValue && a.dataValue.show();
                a.alternateRow && a.alternateRow.show();
                a.listRowDivider && a.listRowDivider.show()
            });
            this.currentSeriesIndex = a;
            va.raiseEvent("pageNavigated", {pageId: a, data: this.options.series[a].data}, this.logic.chartInstance);
            0 === a ? this.navElePrv.hide() : this.navElePrv.show();
            a === e - 1 ? this.navEleNxt.hide() : this.navEleNxt.show()
        }
    }}, p["renderer.root"]);
    Wa.prototype =
    {getArcPath: function (a, b, e, d, c, f, w, h, V, u) {
        return e == c && d == f ? [] : ["A", w, h, 0, u, V, c, f]
    }, parseColor: function (a, b) {
        var e, d, c, f, w, h, V, u, X, m, k = b / 2, R, l, C, p, g;
        g = 3;
        this.use3DLighting ? (e = ea(a, 80), d = ea(a, 75), h = ga(a, 85), V = ga(a, 70), u = ga(a, 40), X = ga(a, 50), ga(a, 30), m = ga(a, 65), ea(a, 85), c = ea(a, 69), f = ea(a, 75), w = ea(a, 95)) : (g = 10, e = ea(a, 90), d = ea(a, 87), h = ga(a, 93), V = ga(a, 87), u = ga(a, 80), m = X = ga(a, 85), ga(a, 80), w = ea(a, 85), c = ea(a, 75), f = ea(a, 80));
        R = d + Y + h + Y + V + Y + h + Y + d;
        C = b + Y + b + Y + b + Y + b + Y + b;
        l = d + Y + a + Y + h + Y + a + Y + d;
        p = k + Y + k + Y + k + Y + k + Y + k;
        u =
            d + Y + a + Y + u + Y + a + Y + d;
        c = f + Y + h + Y + X + Y + h + Y + c;
        f = "FFFFFF" + Y + "FFFFFF" + Y + "FFFFFF" + Y + "FFFFFF" + Y + "FFFFFF";
        g = 0 + Y + k / g + Y + b / g + Y + k / g + Y + 0;
        return{frontOuter: {FCcolor: {gradientUnits: "userSpaceOnUse", x1: this.leftX, y1: 0, x2: this.rightX, y2: 0, color: c, alpha: C, angle: 0, ratio: "0,20,15,15,50"}}, backOuter: {FCcolor: {gradientUnits: "userSpaceOnUse", x1: this.leftX, y1: 0, x2: this.rightX, y2: 0, color: u, alpha: p, angle: 0, ratio: "0,62,8,8,22"}}, frontInner: {FCcolor: {gradientUnits: "userSpaceOnUse", x1: this.leftInnerX, y1: 0, x2: this.rightInnerX, y2: 0,
            color: l, alpha: p, angle: 0, ratio: "0,25,5,5,65"}}, backInner: {FCcolor: {gradientUnits: "userSpaceOnUse", x1: this.leftInnerX, y1: 0, x2: this.rightInnerX, y2: 0, color: R, alpha: C, angle: 0, ratio: "0,62,8,8,22"}}, topBorder: {FCcolor: {gradientUnits: "userSpaceOnUse", x1: this.leftX, y1: 0, x2: this.rightX, y2: 0, color: f, alpha: g, angle: 0, ratio: "0,20,15,15,50"}}, topInnerBorder: {FCcolor: {gradientUnits: "userSpaceOnUse", x1: this.leftInnerX, y1: 0, x2: this.rightInnerX, y2: 0, color: f, alpha: g, angle: 0, ratio: "0,50,15,15,20"}}, top: qa ? {FCcolor: {gradientUnits: "userSpaceOnUse",
            radialGradient: !0, cx: this.cx, cy: this.cy, r: this.rx, fx: this.cx - .3 * this.rx, fy: this.cy + 1.2 * this.ry, color: m + Y + w, alpha: b + Y + b, ratio: "0,100"}} : {FCcolor: {gradientUnits: "objectBoundingBox", color: V + Y + V + Y + h + Y + d, alpha: b + Y + b + Y + b + Y + b, angle: -72, ratio: "0,8,15,77"}}, bottom: P(aa(a, k)), startSlice: P(aa(e, b)), endSlice: P(aa(e, b))}
    }, rotate: function (a) {
        if (!this.hasOnePoint) {
            for (var b = this.pointElemStore, e = 0, d = b.length, c; e < d; e += 1)c = b[e], c = c._confObject, c.start += a, c.end += a, this.updateSliceConf(c);
            this.refreshDrawing()
        }
    }, refreshDrawing: function () {
        return function () {
            var a =
                this.slicingWallsArr, b = 0, e, d = a.length, c, f, w, h, k = this.slicingWallsFrontGroup, u = this.slicingWallsBackGroup;
            a:{
                var X = a[0] && a[0]._conf.index, m, g;
                h = X <= Q;
                c = 1;
                for (e = a.length; c < e; c += 1)if (g = a[c]._conf.index, m = g <= Q, m != h || g < X)break a;
                c = 0
            }
            for (; b < d; b += 1, c += 1)c === d && (c = 0), e = a[c], h = e._conf.index, h < Pa ? k.appendChild(e) : h <= Q ? (f ? e.insertBefore(f) : k.appendChild(e), f = e) : h < ba ? (w ? e.insertBefore(w) : u.appendChild(e), w = e) : u.appendChild(e)
        }
    }(), updateSliceConf: function (a, b) {
        var e = this.getArcPath, d = a.start, c = a.end, f = oa(d), w =
            oa(c), h, k, u, X, m, g, p, l, C, q, F, t, x, A, E, W, J = this.cx, D = this.cy, H = this.rx, r = this.ry, z = H + (qa ? -1 : 2), fa = r + (qa ? -1 : 2), K = this.innerRx, S = this.innerRy, T = this.depth, B = this.depthY, N = a.elements, M, y, O, I, G, Z, P;
        h = U(f);
        k = R(f);
        u = U(w);
        X = R(w);
        m = J + H * h;
        g = D + r * k;
        p = J + z * h;
        l = D + fa * k;
        M = g + T;
        y = J + H * u;
        O = D + r * X;
        C = J + z * u;
        q = D + fa * X;
        I = O + T;
        this.isDoughnut ? (F = J + K * h, t = D + S * k, E = t + T, x = J + K * u, A = D + S * X, W = A + T, a.startSlice = ["M", m, g, "L", m, M, F, E, F, t, "Z"], a.endSlice = ["M", y, O, "L", y, I, x, W, x, A, "Z"]) : (a.startSlice = ["M", m, g, "L", m, M, J, B, J, D, "Z"], a.endSlice = ["M",
            y, O, "L", y, I, J, B, J, D, "Z"]);
        qa ? (e = (f > w ? xa : 0) + w - f, a.clipTopPath = this.isDoughnut ? ["M", m, g, "A", H, r, 0, e > Q ? 1 : 0, 1, y, O, "L", x, A, "A", K, S, 0, e > Q ? 1 : 0, 0, F, t, "Z"] : ["M", m, g, "A", H, r, 0, e > Q ? 1 : 0, 1, y, O, "L", this.cx, this.cy, "Z"], a.clipOuterFrontPath1 = this.clipPathforNoClip, a.clipTopBorderPath = ["M", p, l, "A", z, fa, 0, e > Q ? 1 : 0, 1, C, q, "L", y, O, y, O + 1, "A", H, r, 0, e > Q ? 1 : 0, 0, m, g + 1, "L", m, g, "Z"], d != c ? f > w ? f < Q ? (a.clipOuterFrontPath = ["M", this.rightX, D, "A", H, r, 0, 0, 1, y, O, "v", T, "A", H, r, 0, 0, 0, this.rightX, D + T, "Z"], a.clipOuterFrontPath1 = ["M", this.leftX,
            D, "A", H, r, 0, 0, 0, m, g, "v", T, "A", H, r, 0, 0, 1, this.leftX, D + T, "Z"], a.clipOuterBackPath = ["M", this.rightX, D, "A", H, r, 0, 1, 0, this.leftX, D, "v", T, "A", H, r, 0, 1, 1, this.rightX, D + T, "Z"], this.isDoughnut && (a.clipInnerBackPath = ["M", this.rightInnerX, D, "A", K, S, 0, 1, 0, this.leftInnerX, D, "v", T, "A", K, S, 0, 1, 1, this.rightInnerX, D + T, "Z"], a.clipInnerFrontPath = ["M", this.rightInnerX, D, "A", K, S, 0, 0, 1, x, A, "v", T, "A", K, S, 0, 0, 0, this.rightInnerX, D + T, "Z", "M", this.leftInnerX, D, "A", K, S, 0, 0, 0, F, t, "v", T, "A", K, S, 0, 0, 1, this.leftInnerX, D + T, "Z"])) :
                w > Q ? (a.clipOuterFrontPath = ["M", this.rightX, D, "A", H, r, 0, 1, 1, this.leftX, D, "v", T, "A", H, r, 0, 1, 0, this.rightX, D + T, "Z"], a.clipOuterBackPath = ["M", this.leftX, D, "A", H, r, 0, 0, 1, y, O, "v", T, "A", H, r, 0, 0, 0, this.leftX, D + T, "Z", "M", this.rightX, D, "A", H, r, 0, 0, 0, m, g, "v", T, "A", H, r, 0, 0, 1, this.rightX, D + T, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", this.rightInnerX, D, "A", K, S, 0, 1, 1, this.leftInnerX, D, "v", T, "A", K, S, 0, 1, 0, this.rightInnerX, D + T, "Z"], a.clipInnerBackPath = ["M", this.leftInnerX, D, "A", K, S, 0, 0, 1, x, A, "v", T, "A", K, S,
            0, 0, 0, this.leftInnerX, D + T, "Z", "M", this.rightInnerX, D, "A", K, S, 0, 0, 0, F, t, "v", T, "A", K, S, 0, 0, 1, this.rightInnerX, D + T, "Z"])) : (a.clipOuterFrontPath = ["M", this.rightX, D, "A", H, r, 0, 0, 1, y, O, "v", T, "A", H, r, 0, 0, 0, this.rightX, D + T, "Z"], a.clipOuterBackPath = ["M", m, g, "A", H, r, 0, 0, 1, this.rightX, D, "v", T, "A", H, r, 0, 0, 0, m, M, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", this.rightInnerX, D, "A", K, S, 0, 0, 1, x, A, "v", T, "A", K, S, 0, 0, 0, this.rightInnerX, D + T, "Z"], a.clipInnerBackPath = ["M", F, t, "A", K, S, 0, 0, 1, this.rightInnerX, D, "v", T, "A",
            K, S, 0, 0, 0, F, E, "Z"])) : f < Q ? w > Q ? (a.clipOuterFrontPath = ["M", m, g, "A", H, r, 0, 0, 1, this.leftX, D, "v", T, "A", H, r, 0, 0, 0, m, M, "Z"], a.clipOuterBackPath = ["M", this.leftX, D, "A", H, r, 0, 0, 1, y, O, "v", T, "A", H, r, 0, 0, 0, this.leftX, D + T, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", F, t, "A", K, S, 0, 0, 1, this.leftInnerX, D, "v", T, "A", K, S, 0, 0, 0, F, E, "Z"], a.clipInnerBackPath = ["M", this.leftInnerX, D, "A", K, S, 0, 0, 1, x, A, "v", T, "A", K, S, 0, 0, 0, this.leftInnerX, D + T, "Z"])) : (a.clipOuterFrontPath = ["M", m, g, "A", H, r, 0, 0, 1, y, O, "v", T, "A", H, r, 0, 0, 0, m, M,
            "Z"], a.clipOuterBackPath = this.clipPathforNoClip, this.isDoughnut && (a.clipInnerFrontPath = ["M", F, t, "A", K, S, 0, 0, 1, x, A, "v", T, "A", K, S, 0, 0, 0, F, E, "Z"], a.clipInnerBackPath = this.clipPathforNoClip)) : (a.clipOuterFrontPath = this.clipPathforNoClip, a.clipOuterBackPath = ["M", m, g, "A", H, r, 0, 0, 1, y, O, "v", T, "A", H, r, 0, 0, 0, m, M, "Z"], this.isDoughnut && (a.clipInnerFrontPath = this.clipPathforNoClip, a.clipInnerBackPath = ["M", F, t, "A", K, S, 0, 0, 1, x, A, "v", T, "A", K, S, 0, 0, 0, F, E, "Z"])) : a.clipOuterFrontPath = a.clipOuterBackPath = a.clipInnerBackPath =
            a.clipInnerFrontPath = this.clipPathforNoClip, b || (a.elements.startSlice._conf.index = f, a.elements.endSlice._conf.index = w, a.elements.frontOuter._conf.index = Va(w, f), a.elements.frontOuter1 && (a.elements.frontOuter1._conf.index = f, a.elements.frontOuter1.attr("litepath", [a.clipOuterFrontPath1])), a.thisElement.attr("litepath", [a.clipTopPath]), a.elements.bottom.attr("litepath", [a.clipTopPath]), a.elements.bottomBorder.attr("litepath", [a.clipTopPath]), a.elements.topBorder && a.elements.topBorder.attr("litepath",
            [a.clipTopBorderPath]), a.elements.frontOuter.attr("litepath", [a.clipOuterFrontPath]), a.elements.backOuter.attr("litepath", [a.clipOuterBackPath]), this.isDoughnut && (a.elements.backInner.attr("litepath", [a.clipInnerBackPath]), a.elements.frontInner.attr("litepath", [a.clipInnerFrontPath]), a.elements.backInner._conf.index = Va(w, f)), this.hasOnePoint ? (a.elements.startSlice.hide(), a.elements.endSlice.hide()) : (a.elements.startSlice.attr("litepath", [a.startSlice]).show(), a.elements.endSlice.attr("litepath", [a.endSlice]).show()))) :
            (p = this.moveCmdArr, l = this.lineCmdArr, C = this.closeCmdArr, G = this.centerPoint, q = this.leftPoint, z = this.topPoint, fa = this.rightPoint, T = this.bottomPoint, Z = this.leftDepthPoint, P = this.rightDepthPoint, h = this.leftInnerPoint, k = this.rightInnerPoint, u = this.leftInnerDepthPoint, X = this.rightInnerDepthPoint, a.clipOuterFrontPath1 = [], d != c ? (f > w ? f < Q ? (d = e(J, D, m, g, this.leftX, D, H, r, 1, 0), c = e(J, D, this.leftX, D, this.rightX, D, H, r, 1, 0), O = e(J, D, this.rightX, D, y, O, H, r, 1, 0), a.clipOuterBackPath = p.concat(q, c, l, P, e(J, B, this.rightX, B,
                this.leftX, B, H, r, 0, 0), C), a.clipOuterFrontPath1 = p.concat([m, g], d, l, Z, e(J, B, this.leftX, B, m, M, H, r, 0, 0), C), a.clipOuterFrontPath = p.concat(fa, O, l, [y, I], e(J, B, y, I, this.rightX, B, H, r, 0, 0), C), a.clipTopBorderPath = p.concat([m, g], d, c, O), this.isDoughnut ? (m = e(J, D, x, A, this.rightInnerX, D, K, S, 0, 0), g = e(J, D, this.rightInnerX, D, this.leftInnerX, D, K, S, 0, 0), t = e(J, D, this.leftInnerX, D, F, t, K, S, 0, 0), a.clipInnerBackPath = p.concat(k, g, l, u, e(J, B, this.leftInnerX, B, this.rightInnerX, B, K, S, 1, 0), C), a.clipInnerFrontPath = p.concat(h, t, l,
                [F, E], e(J, B, F, E, this.leftInnerX, B, K, S, 1, 0), C, p, [x, A], m, l, X, e(J, B, this.rightInnerX, B, x, W, K, S, 1, 0), C), a.clipTopPath = a.clipTopBorderPath.concat(l, [x, A], m, g, t, C), a.clipTopBorderPath = a.clipTopBorderPath.concat(p, [x, A], m, g, t)) : a.clipTopPath = a.clipTopBorderPath.concat(l, G, C)) : w > Q ? (d = e(J, D, m, g, this.rightX, D, H, r, 1, 0), c = e(J, D, this.rightX, D, this.leftX, D, H, r, 1, 0), O = e(J, D, this.leftX, D, y, O, H, r, 1, 0), a.clipOuterFrontPath = p.concat(fa, c, l, Z, e(J, B, this.leftX, B, this.rightX, B, H, r, 0, 0), C), a.clipOuterBackPath = p.concat([m,
                g], d, l, P, e(J, B, this.rightX, B, m, M, H, r, 0, 0), C, p, q, O, l, [y, I], e(J, B, y, I, this.leftX, B, H, r, 0, 0), C), a.clipTopBorderPath = p.concat([m, g], d, c, O), this.isDoughnut ? (m = e(J, D, x, A, this.leftInnerX, D, K, S, 0, 0), g = e(J, D, this.leftInnerX, D, this.rightInnerX, D, K, S, 0, 0), t = e(J, D, this.rightInnerX, D, F, t, K, S, 0, 0), a.clipInnerFrontPath = p.concat(h, g, l, X, e(J, B, this.rightInnerX, B, this.leftInnerX, B, K, S, 1, 0), C), a.clipInnerBackPath = p.concat(k, t, l, [F, E], e(J, B, F, E, this.rightInnerX, B, K, S, 1, 0), C, p, [x, A], m, l, u, e(J, B, this.leftInnerX, B, x, W,
                K, S, 1, 0), C), a.clipTopPath = a.clipTopBorderPath.concat(l, [x, A], m, g, t, C), a.clipTopBorderPath = a.clipTopBorderPath.concat(p, [x, A], m, g, t)) : a.clipTopPath = a.clipTopBorderPath.concat(l, G, C)) : (d = e(J, D, m, g, this.rightX, D, H, r, 1, 0), c = e(J, D, this.rightX, D, y, O, H, r, 1, 0), a.clipOuterFrontPath = p.concat(fa, c, l, [y, I], e(J, B, y, I, this.rightX, B, H, r, 0, 0), C), a.clipOuterBackPath = p.concat([m, g], d, l, P, e(J, B, this.rightX, B, m, M, H, r, 0, 0), C), a.clipTopBorderPath = p.concat([m, g], d, c), this.isDoughnut ? (m = e(J, D, x, A, this.rightInnerX, D, K, S,
                0, 0), g = e(J, D, this.rightInnerX, D, F, t, K, S, 0, 0), a.clipInnerFrontPath = p.concat([x, A], m, l, X, e(J, B, this.rightInnerX, B, x, W, K, S, 1, 0), C), a.clipInnerBackPath = p.concat(k, g, l, [F, E], e(J, B, F, E, this.rightInnerX, B, K, S, 1, 0), C), a.clipTopPath = a.clipTopBorderPath.concat(l, [x, A], m, g, C), a.clipTopBorderPath = a.clipTopBorderPath.concat(p, [x, A], m, g)) : a.clipTopPath = a.clipTopBorderPath.concat(l, G, C)) : f < Q ? w > Q ? (d = e(J, D, m, g, this.leftX, D, H, r, 1, 0), c = e(J, D, this.leftX, D, y, O, H, r, 1, 0), a.clipOuterBackPath = p.concat(q, c, l, [y, I], e(J, B, y,
                I, this.leftX, B, H, r, 0, 0), C), a.clipOuterFrontPath = p.concat([m, g], d, l, Z, e(J, B, this.leftX, B, m, M, H, r, 0, 0), C), a.clipTopBorderPath = p.concat([m, g], d, c), this.isDoughnut ? (m = e(J, D, x, A, this.leftInnerX, D, K, S, 0, 0), g = e(J, D, this.leftInnerX, D, F, t, K, S, 0, 0), a.clipInnerBackPath = p.concat([x, A], m, l, u, e(J, B, this.leftInnerX, B, x, W, K, S, 1, 0), C), a.clipInnerFrontPath = p.concat(h, g, l, [F, E], e(J, B, F, E, this.leftInnerX, B, K, S, 1, 0), C), a.clipTopPath = a.clipTopBorderPath.concat(l, [x, A], m, g, C), a.clipTopBorderPath = a.clipTopBorderPath.concat(p,
                [x, A], m, g)) : a.clipTopPath = a.clipTopBorderPath.concat(l, G, C)) : (d = e(J, D, m, g, y, O, H, r, 1, 0), a.clipOuterBackPath = p.concat([m, g]), a.clipTopBorderPath = a.clipOuterBackPath.concat(d), a.clipOuterFrontPath = a.clipTopBorderPath.concat(l, [y, I], e(J, B, y, I, m, M, H, r, 0, 0), C), this.isDoughnut ? (m = e(J, D, x, A, F, t, K, S, 0, 0), a.clipInnerBackPath = p.concat([x, A]), a.clipTopPath = a.clipTopBorderPath.concat(l, [x, A], m, C), a.clipTopBorderPath = a.clipTopBorderPath.concat(p, [x, A], m), a.clipInnerFrontPath = a.clipInnerBackPath.concat(m, l, [F, E],
                e(J, B, F, E, x, W, K, S, 1, 0), C)) : a.clipTopPath = a.clipTopBorderPath.concat(l, G, C)) : (d = e(J, D, m, g, y, O, H, r, 1, 0), a.clipOuterFrontPath = p.concat([m, g]), a.clipTopBorderPath = a.clipOuterFrontPath.concat(d), a.clipOuterBackPath = a.clipTopBorderPath.concat(l, [y, I], e(J, B, y, I, m, M, H, r, 0, 0), C), this.isDoughnut ? (m = e(J, D, x, A, F, t, K, S, 0, 0), a.clipInnerFrontPath = p.concat([x, A]), a.clipTopPath = a.clipTopBorderPath.concat(l, [x, A], m, C), a.clipTopBorderPath = a.clipTopBorderPath.concat(a.clipInnerFrontPath, m), a.clipInnerBackPath = a.clipInnerFrontPath.concat(m,
                l, [F, E], e(J, B, F, E, x, W, K, S, 1, 0), C)) : a.clipTopPath = a.clipTopBorderPath.concat(l, G, C)), d = p.concat(q, l, fa), m = p.concat(z, l, T), a.clipTopPath = a.clipTopPath.concat(d, m), a.clipOuterFrontPath = a.clipOuterFrontPath.concat(d), a.clipOuterFrontPath1 = a.clipOuterFrontPath1.concat(d), a.clipOuterBackPath = a.clipOuterBackPath.concat(d), this.isDoughnut && (m = p.concat(h, l, k), a.clipInnerFrontPath = a.clipInnerFrontPath.concat(m), a.clipInnerBackPath = a.clipInnerBackPath.concat(m))) : (a.clipTopPath = a.clipOuterFrontPath = a.clipOuterBackPath =
                [], this.isDoughnut && (a.clipInnerFrontPath = a.clipInnerBackPath = [])), b || (a.elements.startSlice._conf.index = f, a.elements.endSlice._conf.index = w, a.elements.frontOuter._conf.index = Va(w, f), a.elements.frontOuter1 && (a.elements.frontOuter1._conf.index = f, N.frontOuter1.attr({path: a.clipOuterFrontPath1})), a.thisElement.attr({path: a.clipTopPath}), N.topBorder.attr({path: a.clipTopBorderPath}), N.bottom.attr({path: a.clipTopPath}), N.bottomBorder.attr({path: a.clipTopBorderPath}), N.frontOuter.attr({path: a.clipOuterFrontPath}),
                N.backOuter.attr({path: a.clipOuterBackPath}), this.isDoughnut && (N.frontInner.attr({path: a.clipInnerFrontPath}), N.backInner.attr({path: a.clipInnerBackPath})), this.hasOnePoint ? (a.elements.startSlice.hide(), a.elements.endSlice.hide()) : (a.elements.startSlice.attr({path: a.startSlice}).show(), a.elements.endSlice.attr({path: a.endSlice}).show())))
    }, onPlotHover: function (a, b) {
        var e = this.pointElemStore[a]._confObject, d = e.thisElement, c = e.elements, f = this.colorObjs[a], w = f.hoverProps, g = b ? w.hoverColorObj : f.color,
            h = f.showBorderEffect, u = b ? w.borderColor : f.borderColor, f = b ? w.borderWidth : f.borderWidth;
        qa ? (w = {fill: P(g.top), "stroke-width": 0}, 1 !== h && (w.stroke = u, w["stroke-width"] = f), d._attr(w), h && c.topBorder.attr({fill: P(g.topBorder), "stroke-width": 0})) : (d._attr({fill: P(g.top), "stroke-width": 0}), c.topBorder.attr({stroke: u, "stroke-width": f}));
        c.bottom.attr({fill: P(g.bottom), "stroke-width": 0});
        c.bottomBorder.attr({stroke: u, "stroke-width": f});
        c.frontOuter.attr({fill: P(g.frontOuter), "stroke-width": 0});
        c.backOuter.attr({fill: P(g.backOuter),
            "stroke-width": 0});
        c.startSlice.attr({fill: P(g.startSlice), stroke: u, "stroke-width": f});
        c.endSlice.attr({fill: P(g.endSlice), stroke: u, "stroke-width": f});
        d = oa(e.start);
        e = oa(e.end);
        (d > e ? xa : 0) + e - d > Q && c.frontOuter1.attr({fill: P(g.frontOuter), "stroke-width": 0});
        this.isDoughnut && (c.frontInner.attr({fill: P(g.frontInner), "stroke-width": 0}), c.backInner.attr({fill: P(g.backInner), "stroke-width": 0}))
    }, setAttrs: function (a, b, e, d) {
        var c = a._confObject;
        a = c.thisElement;
        var c = c.elements, f = d ? this.parseColor(q(e.color,
            b.color), q(e.alpha, b._3dAlpha)) : this.parseColor(b.color, b._3dAlpha);
        e = d ? L.graphics.convertColor(e.bordercolor || b.borderColor, q(e.alpha, b._3dAlpha)) : b.borderColor;
        b = b.borderWidth;
        qa ? (d = {fill: P(f.top), "stroke-width": 0}, d.stroke = e, d["stroke-width"] = b, a._attr(d)) : (a._attr({fill: P(f.top), "stroke-width": 0}), c.topBorder.attr({stroke: e, "stroke-width": b}));
        c.bottom.attr({fill: P(f.bottom), "stroke-width": 0});
        c.bottomBorder.attr({stroke: e, "stroke-width": b});
        c.frontOuter.attr({fill: P(f.frontOuter), "stroke-width": 0});
        c.backOuter.attr({fill: P(f.backOuter), "stroke-width": 0});
        c.startSlice.attr({fill: P(f.startSlice), stroke: e, "stroke-width": b});
        c.endSlice.attr({fill: P(f.endSlice), stroke: e, "stroke-width": b});
        this.isDoughnut && (c.frontInner.attr({fill: P(f.frontInner), "stroke-width": 0}), c.backInner.attr({fill: P(f.backInner), "stroke-width": 0}))
    }, createSlice: function () {
        var a = {stroke: !0, strokeWidth: !0, "stroke-width": !0, dashstyle: !0, "stroke-dasharray": !0, translateX: !0, translateY: !0, "stroke-opacity": !0, transform: !0, fill: !0,
            opacity: !0, ishot: !0, start: !0, end: !0, cursor: !0}, b = function (b, e) {
            var d, c, n = this, f = n._confObject, v, g = f.elements, h, l, p = f.Pie3DManager;
            "string" === typeof b && void 0 !== e && null !== e && (d = b, b = {}, b[d] = e);
            if (b && "string" !== typeof b) {
                void 0 !== b.cx && (b.start = b.cx);
                void 0 !== b.cy && (b.end = b.cy);
                for (d in b)if (c = b[d], a[d])if (f[d] = c, "ishot" === d || "cursor" === d) {
                    v = {};
                    v[d] = c;
                    for (h in g)g[h].attr(v);
                    n._attr(v)
                } else if ("transform" === d) {
                    for (h in g)g[h].attr({transform: b[d]});
                    n._attr({transform: b[d]})
                } else"stroke" === d || "strokeWidth" ===
                    d || "stroke-width" === d || "dashstyle" === d || "stroke-dasharray" === d ? (v = {}, v[d] = c, g.topBorder && g.topBorder.attr(v), g.startSlice.attr(v), g.endSlice.attr(v), g.bottomBorder.attr(v)) : "fill" === d || "start" !== d && "end" !== d || (l = !0); else n._attr(d, c);
                l && (p.updateSliceConf(f), p.refreshDrawing())
            } else n = n._attr(b);
            return n
        }, e = function (a, b, d, e) {
            var c = this._confObject.elements, n;
            for (n in c)if (d)c[n].drag(b, d, e); else c[n].on(a, b);
            return d ? this.drag(b, d, e) : this._on(a, b)
        }, d = function () {
            var a = this._confObject.elements, b;
            for (b in a)a[b].hide();
            return this._hide()
        }, c = function () {
            var a = this._confObject.elements, b;
            for (b in a)a[b].show();
            return this._show()
        }, f = function () {
            var a = this._confObject, b = a.elements, d;
            for (d in b)b[d].destroy();
            qa && (a.clipTop.destroy(), a.clipOuterFront.destroy(), a.clipOuterBack.destroy(), a.clipOuterFront1 && a.clipOuterFront1.destroy(), a.clipInnerFront && a.clipInnerFront.destroy(), a.clipInnerBack && a.clipInnerBack.destroy());
            return this._destroy()
        };
        return function (a, g, h, u, l, m, p, k, R, C) {
            var t = this.renderer;
            h = this.parseColor(h,
                u);
            a = {start: a, end: g, elements: {}, Pie3DManager: this};
            g = this.slicingWallsArr;
            u = a.elements;
            var U, r = qa ? "litepath" : "path";
            C && (this.colorObjs[p] = {color: h, borderColor: l, borderWidth: m, showBorderEffect: !1}, C.hoverColorObj = this.parseColor(C.color, C.alpha), this.colorObjs[p].hoverProps = C);
            this.updateSliceConf(a, !0);
            qa ? (C = {fill: P(h.top), "stroke-width": 0}, 1 !== R && (C.stroke = l, C["stroke-width"] = m), C = t[r](a.clipTopPath, this.topGroup).attr(C), R && (u.topBorder = t[r](a.clipTopBorderPath, this.topGroup).attr({fill: P(h.topBorder),
                "stroke-width": 0}))) : (C = t[r](a.clipTopPath, this.topGroup).attr({fill: P(h.top), "stroke-width": 0}), u.topBorder = t[r](a.clipTopBorderPath, this.topGroup).attr({stroke: l, "stroke-width": m}));
            u.bottom = t[r](a.clipTopPath, this.bottomBorderGroup).attr({fill: P(h.bottom), "stroke-width": 0});
            u.bottomBorder = t[r](qa ? a.clipTopPath : a.clipTopBorderPath, this.bottomBorderGroup).attr({stroke: l, "stroke-width": m});
            u.frontOuter = t[r](a.clipOuterFrontPath, this.slicingWallsFrontGroup).attr({fill: P(h.frontOuter), "stroke-width": 0});
            u.backOuter = t[r](a.clipOuterBackPath, this.outerBackGroup).attr({fill: P(h.backOuter), "stroke-width": 0});
            u.startSlice = t[r](a.startSlice, this.slicingWallsFrontGroup).attr({fill: P(h.startSlice), stroke: l, "stroke-width": m});
            u.endSlice = t[r](a.endSlice, this.slicingWallsFrontGroup).attr({fill: P(h.endSlice), stroke: l, "stroke-width": m});
            l = oa(a.start);
            m = oa(a.end);
            R = (l > m ? xa : 0) + m - l;
            R > Q && (u.frontOuter1 = t[r](a.clipOuterFrontPath1, this.slicingWallsFrontGroup).attr({fill: P(h.frontOuter), "stroke-width": 0}), u.frontOuter1._conf =
            {index: l, isStart: .5, pIndex: p}, qa && (a.clipOuterFront1 = a.clipOuterFrontPath1));
            u.frontOuter._conf = {index: Va(m, l), isStart: .5, pIndex: p};
            u.startSlice._conf = {index: l, isStart: 0, pIndex: p};
            u.endSlice._conf = {index: m, isStart: 1, pIndex: p};
            this.hasOnePoint && (u.startSlice.hide(), u.endSlice.hide());
            this.isDoughnut ? (u.frontInner = t[r](a.clipInnerFrontPath, this.innerFrontGroup).attr({fill: P(h.frontInner), "stroke-width": 0}), u.backInner = t[r](a.clipInnerBackPath, this.innerBackGroup).attr({fill: P(h.backInner), "stroke-width": 0}),
                u.backInner._conf = {index: Va(m, l), isStart: .5, pIndex: p}, R > Q ? qa ? g.push(u.startSlice, u.frontOuter1, u.frontOuter, u.backInner, u.endSlice) : g.push(u.startSlice, u.frontOuter1, u.frontOuter, u.endSlice) : qa ? g.push(u.startSlice, u.frontOuter, u.backInner, u.endSlice) : g.push(u.startSlice, u.frontOuter, u.endSlice)) : R > Q ? g.push(u.startSlice, u.frontOuter1, u.frontOuter, u.endSlice) : g.push(u.startSlice, u.frontOuter, u.endSlice);
            if (void 0 !== k) {
                for (U in u)u[U].tooltip(k);
                C.tooltip(k)
            }
            qa && (a.clipTop = a.clipTopPath, a.clipOuterFront =
                a.clipOuterFrontPath, a.clipOuterBack = a.clipOuterBackPath, this.isDoughnut && (a.clipInnerFront = a.clipInnerFrontPath, a.clipInnerBack = a.clipInnerBackPath));
            C._confObject = a;
            a.thisElement = C;
            C._destroy = C.destroy;
            C.destroy = f;
            C._show = C.show;
            C.show = c;
            C._hide = C.hide;
            C.hide = d;
            C._on = C.on;
            C.on = e;
            C._attr = C.attr;
            C.attr = b;
            this.pointElemStore.push(C);
            return C
        }
    }()};
    Wa.prototype.constructor = Wa;
    p("renderer.pie3d", {type: "pie3d", isHovered: !1, translate: function () {
        var a = 0, b = this.options, e = b.series[0], d = b.plotOptions.series.dataLabels,
            c = b.plotOptions.pie3d, f = q(e.startAngle, 0) % 360, g = e.managedPieSliceDepth, l = e.slicedOffset = c.slicedOffset, p = this.canvasWidth, u = this.canvasHeight, r = [this.canvasLeft + .5 * p, this.canvasTop + .5 * u - .5 * g], m, B, E, W, C, b = e.data, Q, F = A(p, u), z, fa, I, N = d.distance, P = e.pieYScale, J = e.pieSliceDepth, D = e.slicedOffsetY = l * P;
        r.push(c.size, c.innerSize || 0);
        r = Aa(r, function (a, b) {
            return(z = /%$/.test(a)) ? [p, u - g, F, F][b] * parseInt(a, 10) / 100 : a
        });
        r[2] /= 2;
        r[3] /= 2;
        r.push(r[2] * P);
        r.push((r[2] + r[3]) / 2);
        r.push(r[5] * P);
        e.getX = function (a, b) {
            E = h.asin((a -
                r[1]) / (r[2] + N));
            return r[0] + (b ? -1 : 1) * U(E) * (r[2] + N)
        };
        e.center = r;
        Ea(b, function (b) {
            a += b.y
        });
        e.labelsRadius = r[2] + N;
        e.labelsRadiusY = e.labelsRadius * P;
        e.quadrantHeight = (u - g) / 2;
        e.quadrantWidth = p / 2;
        W = -f * G;
        W = x(1E3 * W) / 1E3;
        C = W + xa;
        c = k(parseInt(d.style.fontSize, 10), 10) + 4;
        e.maxLabels = t(e.quadrantHeight / c);
        e.labelFontSize = c;
        e.connectorPadding = k(d.connectorPadding, 5);
        e.isSmartLineSlanted = q(d.isSmartLineSlanted, !0);
        e.connectorWidth = k(d.connectorWidth, 1);
        e.enableSmartLabels = d.enableSmartLabels;
        e.Pie3DManager || (e.Pie3DManager =
            new Wa(r[0], r[1], r[2], r[3], P, J, this.layers.dataset, this.paper, 1 === e.data.length, e.use3DLighting));
        Ea(b, function (b) {
            m = W;
            Q = a ? b.y / a : 0;
            W = x(1E3 * (W + Q * xa)) / 1E3;
            W > C && (W = C);
            B = W;
            b.shapeArgs = {start: x(1E3 * m) / 1E3, end: x(1E3 * B) / 1E3};
            b.centerAngle = E = (B + m) / 2 % xa;
            b.slicedTranslation = [x(U(E) * l), x(R(E) * D)];
            fa = U(E) * r[2];
            e.radiusY = I = R(E) * r[4];
            b.tooltipPos = [r[0] + .7 * fa, r[1] + I];
            b.percentage = 100 * Q;
            b.total = a
        })
    }, drawPlotPie3d: function (a, b) {
        this.translate();
        var c = this, d = a.items, f = a.data, g = c.options, h = g.plotOptions, l = h.series,
            p = c.layers, u = c.elements.plots[0], r = c.datasets[0], h = h.series.dataLabels, m = l.dataLabels.style, l = k(a.moveDuration, l.animation.duration), t = c.paper, x = g.tooltip || {}, x = x && !1 !== x.enabled, q = r.slicedOffset, C = r.slicedOffsetY, A = c.plotDragMove, F = c.plotDragStart, B = c.plotDragEnd, E = c.plotRollOver, W = c.plotRollOut, Q = !!c.datasets[0].enableRotation, z = b.showBorderEffect, J = f.length, D = g.chart, g = D.usePerPointLabelColor, D = D.textDirection, H = {fontFamily: m.fontFamily, fontSize: m.fontSize, lineHeight: m.lineHeight, fontWeight: m.fontWeight,
                fontStyle: m.fontStyle}, fa = function (a) {
                return function () {
                    c.legendClick(a, !0, !1)
                }
            }, I = function (a) {
                return function () {
                    return c.getEventArgs(a)
                }
            }, N = function (a) {
                return function (b, d, c, e, n) {
                    A.call(a, b, d, c, e, n)
                }
            }, K = function (a) {
                return function (b, d, c) {
                    F.call(a, b, d, c)
                }
            }, S = function (a) {
                return function (b) {
                    B.call(a, b)
                }
            }, T = function (a) {
                return function (b) {
                    W.call(a, b)
                }
            }, G = function (a) {
                return function (b) {
                    E.call(a, b)
                }
            }, da, M, y, O, ba, ea, Z, la, L, Y;
        f && J || (f = []);
        u.singletonCase = 1 === J;
        u.chartPosition = Ka(c.container);
        u.pieCenter =
            r.center;
        u.timerThreshold = 30;
        for (Y = -1; ++Y < J;)y = f[Y], m = y.y, O = y.displayValue, H = y.sliced, la = y.shapeArgs, da = y.centerAngle, L = y.toolText, ea = (ba = !!y.link) || Q || !y.doNotSlice, null === m || void 0 === m || (M = d[Y]) || (b.data[Y].plot = M = d[Y] = {chart: c, index: Y, seriesData: u, value: m, angle: da, link: y.link, shapeArgs: la, slicedX: H && !u.singletonCase ? U(da) * q : 0, slicedY: H && !u.singletonCase ? R(da) * C : 0, sliced: H, labelText: O, name: y.name, label: y.name, percentage: y.percentage, toolText: L, originalIndex: J - Y - 1, style: y.style, graphic: r.Pie3DManager.createSlice(la.start,
            la.end, y.color, y._3dAlpha, y.borderColor, y.borderWidth, Y, x ? L : "", z, y.rolloverProperties)}, b.data[Y].legendClick = fa(M), b.data[Y].getEventArgs = I(M), M.graphic.plotItem = M, M.graphic.data("plotItem", M), M.transX = U(da) * q, M.transY = R(da) * C, M.slicedTranslation = "t" + M.transX + "," + M.transY, da = {index: b.reversePlotOrder ? Y : J - 1 - Y, link: y.link, value: y.y, displayValue: y.displayValueArgs, categoryLabel: y.categoryLabel, isSliced: y.sliced, toolText: y.toolText}, M.graphic.attr({transform: "t" + M.slicedX + "," + M.slicedY, ishot: ea, cursor: ba ?
            "pointer" : ""}).drag(N(M), K(M), S(M)).data("groupId", Y).data("eventArgs", da).mouseover(G(M)).mouseout(T(M)), void 0 !== O && (m = y.style, H = {fontFamily: m.fontFamily, fontSize: m.fontSize, lineHeight: m.lineHeight, fontWeight: m.fontWeight, fontStyle: m.fontStyle}, M.dataLabel = t.text(p.dataset).css(H).attr({text: O, title: y.originalText || "", fill: (g ? P(y.color) : m.color) || "#000000", "text-bound": [m.backgroundColor, m.borderColor, m.borderThickness, m.borderPadding, m.borderRadius, m.borderDash], visibility: "hidden", direction: D,
            ishot: ea, cursor: ba ? "pointer" : ""}).data("eventArgs", da).hover(G(M), T(M)).drag(N(M), K(M), S(M)).data("plotItem", M), 0 < h.distance && (Z = h.connectorWidth) && h.enableSmartLabels && (M.connector = t.path("M 0 0 l 0 0", p.dataset).attr({"stroke-width": Z, stroke: h.connectorColor || "#606060", visibility: "hidden", ishot: ea, cursor: ba ? "pointer" : ""}).data("eventArgs", da).hover(G(M), T(M)).drag(N(M), K(M), S(M)).data("plotItem", M))));
        r.Pie3DManager.refreshDrawing();
        0 < l ? c.animate(d, l) : c.placeDataLabels(!1, d)
    }, rotate: function (a) {
        var b =
            this.datasets[0], c = this.elements.plots[0].items, d = b.slicedOffset, f = b.slicedOffsetY, g = b.startAngle, h;
        a = isNaN(a) ? -b._lastAngle : a;
        h = (a - g) % 360;
        b.startAngle = k(a, b.startAngle) % 360;
        h = -(h * da) / 180;
        b.Pie3DManager && b.Pie3DManager.rotate(h);
        Ea(c, function (a) {
            var b = a.graphic, c = a.shapeArgs, e = c.start += h, c = c.end += h, n = a.angle = oa((e + c) / 2), e = a.sliced, c = U(n), n = R(n);
            a.slicedTranslation = [x(c * d), x(n * f)];
            a.transX = a.slicedTranslation[0];
            a.transY = a.slicedTranslation[1];
            a.slicedX = e ? U(h) * d : 0;
            a.slicedY = e ? R(h) * f : 0;
            b && e && a.graphic.attr({transform: "t" +
                a.slicedTranslation[0] + "," + a.slicedTranslation[1]})
        });
        this.placeDataLabels(!0, c)
    }, plotRollOver: function (a) {
        var b = this.chart, c = b.datasets[0].Pie3DManager;
        this.seriesData.isRotating || (Ca.call(this.graphic, b, a, "DataPlotRollOver"), c.colorObjs[this.index] && c.onPlotHover(this.index, !0));
        b.isHovered = !0
    }, plotRollOut: function (a) {
        var b = this.chart, c = b.datasets[0].Pie3DManager;
        this.seriesData.isRotating || (Ca.call(this.graphic, b, a, "DataPlotRollOut"), c.colorObjs[this.index] && c.onPlotHover(this.index, !1));
        b.isHovered = !1
    }, plotDragStart: function (a, b, c) {
        var d = this.seriesData, f = this.chart.datasets[0];
        d.isRotating = !1;
        f.enableRotation && (a = Ua.call(c, a, b, d.pieCenter, d.chartPosition, f.pieYScale), f.dragStartAngle = a, f._lastAngle = -f.startAngle, f.startingAngleOnDragStart = f.startAngle)
    }, plotDragEnd: function (a) {
        var b = this.chart, c = b.datasets[0], d = c.Pie3DManager, f = c.startAngle, g = this.seriesData, h = {hcJSON: {series: [
            {startAngle: f}
        ]}};
        b.disposed || Ba(b.logic.chartInstance.jsVars._reflowData, h, !0);
        !g.isRotating && b.plotGraphicClick.call(this,
            a);
        g.isRotating && (setTimeout(function () {
            g.isRotating = !1
        }, 0), va.raiseEvent("rotationEnd", {startingAngle: oa(f, !0), changeInAngle: f - c.startingAngleOnDragStart}, b.logic.chartInstance), !b.isHovered && d.colorObjs[this.index] && d.onPlotHover(this.index, !1))
    }, plotDragMove: function (a, b, c, d, f) {
        var g = this.chart;
        a = g.datasets[0];
        b = this.seriesData;
        g.options.series[0].enableRotation && !b.singletonCase && (c = Ua.call(f, c, d, b.pieCenter, b.chartPosition, a.pieYScale), b.isRotating || (a.dragStartAngle !== c && (b.isRotating = !0), va.raiseEvent("rotationStart",
            {startingAngle: oa(a.startAngle, !0)}, g.logic.chartInstance)), d = c - a.dragStartAngle, a.dragStartAngle = c, b.moveDuration = 0, a._lastAngle += 180 * d / da, c = (new Date).getTime(), !a._lastTime || a._lastTime + b.timerThreshold < c) && (a._lastTime || g.rotate(), b.timerId = setTimeout(function () {
            g.disposed && g.disposing || g.rotate()
        }, b.timerThreshold), a._lastTime = c)
    }, animate: function (a, b) {
        var c, d, f, g = a.length, h, l, p, u = this, k, m = function () {
            u.disposed || u.disposing || u.placeDataLabels(!1, a)
        };
        if (u.datasets[0].alphaAnimation)u.layers.dataset.attr({opacity: 0}),
            u.layers.dataset.animate({opacity: 1}, b, "ease-in", function () {
                u.disposed || u.disposing || u.placeDataLabels(!1, a)
            }); else for (c = 0; c < g; c++)h = a[c], l = h.graphic, p = h.shapeArgs, h = 2 * da, l && (l.attr({start: h, end: h}), k = p.start, p = p.end, d ? l.animateWith(d, f, {cx: k - h, cy: p - h}, b, "ease-in") : (f = ka.animation({cx: k - h, cy: p - h}, b, "ease-in", m), d = l.animate(f)))
    }, placeDataLabels: function () {
        var a = function (a, b) {
                return a.point.value - b.point.value
            }, b = function (a, b) {
                return a.angle - b.angle
            }, c = ["start", "start", "end", "end"], d = [-1, 1, 1, -1],
            g = [1, 1, -1, -1];
        return function (p, r) {
            var t = this.datasets[0], q = this.smartLabel, u = this.options.plotOptions.series.dataLabels, B = u.style, m = k(I(parseFloat(B.lineHeight)), 12), W = Oa(u.placeInside, !1), z = u.skipOverlapLabels, fa = u.manageLabelOverflow, C = u.connectorPadding, N = u.connectorWidth, F, G, P = 0 < u.distance, da = t.center, Y = da[1], ea = da[0], J = da[2], D = da[4], H = [
                    [],
                    [],
                    [],
                    []
                ], la, L, aa, K = this.canvasLeft, S = this.canvasTop, T = this.canvasWidth, ca, ia, M, y, O, ga, ra, Z, ua, ma, ha, Ga = t.labelsRadius, ka = x(100 * t.labelsRadiusY) / 100, oa = t.labelFontSize,
                Ja = oa, pa = Ja / 2, C = [C, C, -C, -C], qa = t.maxLabels, ya = t.isSmartLineSlanted, Xa = t.enableSmartLabels, na, t = t.pieSliceDepth / 2;
            p || q.setStyle(B);
            if (1 == r.length)y = r[0], na = y.dataLabel, y.slicedTranslation = [K, S], na && (na.attr({visibility: f, "text-anchor": "middle", x: ea, y: Y + pa - 2}), na.x = ea); else if (W)Ea(r, function (a) {
                if (na = a.dataLabel) {
                    ha = a.angle;
                    ma = Y + da[6] * R(ha) + pa - 2;
                    ra = ea + da[5] * U(ha);
                    na.x = ra;
                    na._x = ra;
                    na.y = ma;
                    if (a.sliced) {
                        a = a.slicedTranslation;
                        var b = a[1] - S;
                        ra += a[0] - K;
                        ma += b
                    }
                    na.attr({visibility: f, align: "middle", x: ra, y: ma})
                }
            });
            else {
                Ea(r, function (a) {
                    if (na = a.dataLabel)ha = a.angle, 0 > ha && (ha = xa + ha), la = 0 <= ha && ha < Pa ? 1 : ha < Q ? 2 : ha < ba ? 3 : 0, H[la].push({point: a, angle: ha})
                });
                for (aa = W = 4; aa--;) {
                    if (z && (y = H[aa].length - qa, 0 < y))for (H[aa].sort(a), L = H[aa].splice(0, y), ia = 0, M = L.length; ia < M; ia += 1)y = L[ia].point, y.dataLabel.attr({visibility: "hidden"}), y.connector && y.connector.attr({visibility: "hidden"});
                    H[aa].sort(b)
                }
                aa = l(H[0].length, H[1].length, H[2].length, H[3].length);
                ka = l(A(aa, qa) * Ja, ka + Ja);
                H[1].reverse();
                H[3].reverse();
                for (q.setStyle(B); W--;) {
                    ia =
                        H[W];
                    M = ia.length;
                    z || (Ja = M > qa ? ka / M : oa, pa = Ja / 2);
                    y = M * Ja;
                    B = ka;
                    for (aa = 0; aa < M; aa += 1, y -= Ja)G = E(ka * R(ia[aa].angle)), B < G ? G = B : G < y && (G = y), B = (ia[aa].oriY = G) - Ja;
                    L = c[W];
                    M = ka - (M - 1) * Ja;
                    B = 0;
                    for (aa = ia.length - 1; 0 <= aa; --aa, M += Ja)y = ia[aa].point, ha = ia[aa].angle, O = y.sliced, na = y.dataLabel, G = E(ka * R(ha)), G < B ? G = B : G > M && (G = M), B = G + Ja, Z = (G + ia[aa].oriY) / 2, G = ea + g[W] * Ga * U(h.asin(Z / ka)), Z *= d[W], Z += Y, ua = Y + D * R(ha), ga = ea + J * U(ha), (2 > W && G < ga || 1 < W && G > ga) && (G = ga), ra = G + C[W], ma = Z + pa - 2, F = ra + C[W], na.x = F, na._x = F, fa && (ca = 1 < W ? F - this.canvasLeft :
                        this.canvasLeft + T - F, q.setStyle(y.style), m = k(I(parseFloat(y.style.lineHeight)), 12) + (2 * I(parseFloat(y.style.border), 12) || 0), m = q.getSmartText(y.labelText, ca, m), na.attr({text: m.text}).tooltip(m.tooltext)), ha < Q && (Z += t, ua += t, ma += t), na.y = ma, O && (m = y.transX, O = y.transY, ra += m, G += m, ga += m, ua += O, F += m), na.attr({visibility: f, "text-anchor": L, x: F, y: Z}), P && N && Xa && (F = y.connector, y.connectorPath = G = ["M", ga, ua, "L", ya ? G : ga, Z, ra, Z], F ? (F.attr({path: G}), F.attr("visibility", f)) : y.connector = F = this.paper.path(G).attr({"stroke-width": N,
                        stroke: u.connectorColor || "#606060", visibility: f}))
                }
            }
        }
    }()}, p["renderer.piebase"]);
    p("renderer.pie", {drawDoughnutCenterLabel: function (a, b, c, d, g, h, l) {
        var p = this.options.series[0];
        h = h || p.lastCenterLabelConfig;
        var k = this.paper, u = this.smartLabel, r = this.layers.dataset, m = this.elements, t = h.padding, R = 2 * h.textPadding, U = {fontFamily: h.font, fontSize: h.fontSize + "px", lineHeight: 1.2 * h.fontSize + "px", fontWeight: h.bold ? "bold" : "", fontStyle: h.italic ? "italic" : ""}, C = 1.414 * (.5 * d - t) - R;
        g = 1.414 * (.5 * g - t) - R;
        var x;
        u.setStyle(U);
        u = u.getSmartText(a, C, g);
        (g = m.doughnutCenterLabel) ? (g.attr("text") !== a && this.centerLabelChange(a), x = m.centerLabelOvalBg) : (h.bgOval && (m.centerLabelOvalBg = x = k.circle(b, c, .5 * d - t, r)), g = m.doughnutCenterLabel = k.text(r).hover(this.centerLabelRollover, this.centerLabelRollout).click(this.centerLabelClick), g.chart = this);
        a ? (g.css(U).attr({x: b, y: c, text: u.text, visibility: f, direction: this.options.chart.textDirection, fill: P({FCcolor: {color: h.color, alpha: h.alpha}}), "text-bound": h.bgOval ? "none" : [P({FCcolor: {color: h.bgColor,
            alpha: h.bgAlpha}}), P({FCcolor: {color: h.borderColor, alpha: h.borderAlpha}}), h.borderThickness, h.textPadding, h.borderRadius]}).tooltip(h.toolText || u.tooltext), h.bgOval && x && x.attr({visibility: f, fill: cb(h.bgColor), "fill-opacity": h.bgAlpha / 100, stroke: cb(h.borderColor), "stroke-width": h.borderThickness, "stroke-opacity": h.borderAlpha / 100})) : (g.attr("visibility", "hidden"), x && x.attr("visibility", "hidden"));
        l && (p.lastCenterLabelConfig = h)
    }, centerLabelRollover: function () {
        var a = this.chart, b = a.fusionCharts, c = a.options.series[0].lastCenterLabelConfig,
            b = {height: b.args.height, width: b.args.width, pixelHeight: b.ref.offsetHeight, pixelWidth: b.ref.offsetWidth, id: b.args.id, renderer: b.args.renderer, container: b.options.containerElement, centerLabelText: c && c.label};
        this.attr("text") && va.raiseEvent("centerLabelRollover", b, a.logic.chartInstance, this, a.hoverOnCenterLabel)
    }, centerLabelRollout: function () {
        var a = this.chart, b = a.fusionCharts, c = a.options.series[0].lastCenterLabelConfig, b = {height: b.args.height, width: b.args.width, pixelHeight: b.ref.offsetHeight, pixelWidth: b.ref.offsetWidth,
            id: b.args.id, renderer: b.args.renderer, container: b.options.containerElement, centerLabelText: c && c.label};
        this.attr("text") && va.raiseEvent("centerLabelRollout", b, a.logic.chartInstance, this, a.hoverOffCenterLabel)
    }, centerLabelClick: function () {
        var a = this.chart, b = a.fusionCharts, c = a.options.series[0].lastCenterLabelConfig, b = {height: b.args.height, width: b.args.width, pixelHeight: b.ref.offsetHeight, pixelWidth: b.ref.offsetWidth, id: b.args.id, renderer: b.args.renderer, container: b.options.containerElement, centerLabelText: c &&
            c.label};
        this.attr("text") && va.raiseEvent("centerLabelClick", b, a.logic.chartInstance)
    }, centerLabelChange: function (a) {
        var b = this.fusionCharts;
        va.raiseEvent("centerLabelChanged", {height: b.args.height, width: b.args.width, pixelHeight: b.ref.offsetHeight, pixelWidth: b.ref.offsetWidth, id: b.args.id, renderer: b.args.renderer, container: b.options.containerElement, centerLabelText: a}, this.logic.chartInstance)
    }, hoverOnCenterLabel: function () {
        var a = this.chart.options.series[0].lastCenterLabelConfig;
        (a.hoverColor || a.hoverAlpha) &&
        this.attr({fill: P({FCcolor: {color: a.hoverColor || a.color, alpha: a.hoverAlpha || a.alpha}})})
    }, hoverOffCenterLabel: function () {
        var a = this.chart.options.series[0].lastCenterLabelConfig;
        (a.hoverColor || a.hoverAlpha) && this.attr({fill: P({FCcolor: {color: a.color, alpha: a.alpha}})})
    }, drawPlotPie: function (a, b) {
        var c = this, d = a.items, h = a.data, g = c.options, l = g.series[0], p = g.plotOptions, r = p.pie, u = p.series, t = c.layers, m = t.dataset, x = c.elements.plots[0], p = p.series.dataLabels, B = u.dataLabels.style, q = u.shadow, u = k(a.moveDuration,
            u.animation.duration), C = c.paper, A = g.tooltip || {}, A = A && !1 !== A.enabled, F = ((b.startAngle *= -Q / 180) || 0) % xa, E = r.slicedOffset, W = b.valueTotal, G = xa / W, z = c.canvasLeft + .5 * c.canvasWidth, fa = c.canvasTop + .5 * c.canvasHeight, J = .5 * r.size, r = .5 * (r.innerSize || 0), D = c.plotDragMove, H = c.plotDragStart, N = c.plotDragEnd, I = c.plotRollOver, da = c.plotRollOut, K = !!c.datasets[0].enableRotation, S = h.length, T = g.chart, g = T.usePerPointLabelColor, T = T.textDirection, Y = l.centerLabelConfig, ea = Y.label, M = {fontFamily: B.fontFamily, fontSize: B.fontSize,
            lineHeight: B.lineHeight, fontWeight: B.fontWeight, fontStyle: B.fontStyle}, y, O, L, aa, Z, la, ba, ia, ha, ra, ca = a.shadowGroup, ga, ma, ua, na, Ga, Pa = function (a) {
            return function () {
                c.legendClick(a, !0, !1)
            }
        }, pa = function (a) {
            return function () {
                return c.getEventArgs(a)
            }
        }, oa = function () {
            c.disposed || c.disposing || c.paper.ca.redrawDataLabels || (c.placeDataLabels(!1, d, a), c.paper.ca.redrawDataLabels = c.redrawDataLabels)
        };
        h && S || (h = []);
        ca || (ca = a.shadowGroup = C.group(m).toBack());
        x.singletonCase = 1 === S;
        x.chartPosition || (x.chartPosition =
            Ka(c.container));
        x.pieCenter = [z, fa];
        x.timerThreshold = 30;
        ha = ia = F;
        for (ga = S; ga--;)O = h[ga], M = O.y, L = O.displayValue, Z = O.sliced, B = O.toolText, la = (aa = !!O.link) || K || !O.doNotSlice, null !== M && void 0 !== M && (y = O.color.FCcolor, y.r = J, y.cx = z, y.cy = fa, O.rolloverProperties && (y = O.rolloverProperties.color.FCcolor, y.r = J, y.cx = z, y.cy = fa), ha = ia, ia -= x.singletonCase ? xa : M * G, ba = .5 * (ia + ha), u ? na = Ga = F : (na = ia, Ga = ha), (y = d[ga]) || (b.data[ga].plot = y = d[ga] = {chart: c, index: ga, seriesData: x, value: M, angle: ba, slicedX: U(ba) * E, slicedY: R(ba) * E, sliced: Z,
            labelText: L, toolText: B, label: O.name, link: O.link, percentage: W ? M * W / 100 : 0, originalIndex: S - ga - 1, style: O.style, color: O.color, borderColor: O.borderColor, borderWidth: O.borderWidth, rolloverProperties: O.rolloverProperties, center: [z, fa], innerDiameter: 2 * r, centerLabelConfig: O.centerLabelConfig, graphic: C.ringpath(z, fa, J, r, na, Ga, t.dataset).attr({"stroke-width": O.borderWidth, "stroke-linejoin": "round", stroke: O.borderColor, fill: P(O.color), "stroke-dasharray": O.dashStyle, redrawDataLabels: F, ishot: la, cursor: aa ? "pointer" :
                ""}).shadow(q && O.shadow, ca).drag(D, H, N).hover(I, da)}, A && y.graphic.tooltip(B), b.data[ga].legendClick = Pa(y), b.data[ga].getEventArgs = pa(y), y.graphic.data("plotItem", y), aa = {index: b.reversePlotOrder ? ga : S - 1 - ga, link: O.link, value: O.y, displayValue: O.displayValueArgs, categoryLabel: O.categoryLabel, isSliced: O.sliced, toolText: O.toolText}, y.graphic.data("eventArgs", aa), void 0 !== L && (B = O.style, M = {fontFamily: B.fontFamily, fontSize: B.fontSize, lineHeight: B.lineHeight, fontWeight: B.fontWeight, fontStyle: B.fontStyle}, y.dataLabel =
            C.text(m).css(M).attr({text: L, fill: (g ? P(O.color) : B.color) || "#000000", "text-bound": [B.backgroundColor, B.borderColor, B.borderThickness, B.borderPadding, B.borderRadius, B.borderDash], ishot: la, direction: T, visibility: "hidden"}).drag(D, H, N).hover(I, da).data("eventArgs", aa).hide(), y.dataLabel.data("plotItem", y), 0 < p.distance && (ra = p.connectorWidth) && p.enableSmartLabels && (y.connector = C.path("M 0 0 l 0 0", m).attr({"stroke-width": ra, stroke: p.connectorColor || "#606060", visibility: f, ishot: !0}).data("eventArgs", aa).drag(D,
            H, N).hover(I, da), y.connector.data("plotItem", y)))), y.angle = ba, y.transX = U(ba) * E, y.transY = R(ba) * E, y.slicedTranslation = "t" + U(ba) * E + "," + R(ba) * E, u ? ma ? y.graphic.animateWith(ma, ua, {ringpath: [z, fa, J, r, ia, ha], transform: y.sliced ? y.slicedTranslation : ""}, u, "easeIn") : (ua = ka.animation({ringpath: [z, fa, J, r, ia, ha], redrawDataLabels: c, transform: y.sliced ? y.slicedTranslation : ""}, u, "easeIn", oa), ma = y.graphic.animate(ua)) : y.graphic.attr({transform: y.sliced ? y.slicedTranslation : ""}));
        ea && r && c.drawDoughnutCenterLabel(ea, z,
            fa, 2 * r, 2 * r, Y, !0);
        l.lastCenterLabelConfig = Y;
        u ? l.doughnutCenterLabel && l.doughnutCenterLabel.attr({"fill-opacity": 0}).animate(ka.animation({"fill-opacity": 100}, 100).delay(100 < u ? u - 100 : 0)) : c.placeDataLabels(!1, d, a)
    }, rotate: function (a, b) {
        var c = a.items, d = a.data, f = this.options.plotOptions.pie, h = f.slicedOffset, g = xa / b.valueTotal, l = this.canvasLeft + .5 * this.canvasWidth, p = this.canvasTop + .5 * this.canvasHeight, r = .5 * f.size, f = .5 * (f.innerSize || 0), k, m, t, B, x;
        t = (b.startAngle || 0) % xa;
        for (x = d.length; x--;)k = d[x], m = k.y, null !==
            m && void 0 !== m && (k = c[x], B = t, t -= k.seriesData.singletonCase ? xa : m * g, m = .5 * (t + B), k.angle = m, k.transX = U(m) * h, k.transY = R(m) * h, k.slicedTranslation = "t" + U(m) * h + "," + R(m) * h, k.graphic.attr({ringpath: [l, p, r, f, t, B], transform: k.sliced ? k.slicedTranslation : ""}));
        this.placeDataLabels(!0, c, a)
    }}, p["renderer.piebase"])
}, [3, 2, 2, "sr4"]]);
FusionCharts.register("module", ["private", "modules.renderer.js-zoomline", function () {
    var Ka = this, Aa = Ka.hcLib, oa = Ka.window, Va = /msie/i.test(oa.navigator.userAgent) && !oa.opera, Ua = Aa.chartAPI, Wa = Aa.chartAPI, va = Aa.extend2, L = Aa.raiseEvent, ka = Aa.pluck, z = Aa.pluckNumber, Ta = Aa.getFirstColor, ca = Aa.graphics.convertColor, $a = Aa.bindSelectionEvent, q = Aa.createTrendLine, Fa = Aa.parseUnsafeString, Na = Aa.regescape, k = Aa.Raphael, Oa = Aa.hasTouch, ab = Aa.getMouseCoordinate, pa = Aa.FC_CONFIG_STRING, ta = "rgba(192,192,192," + (Va ? .002 :
        1E-6) + ")", Ba = oa.Math, La = Ba.ceil, P = Ba.floor, Ha = Ba.max, Ma = Ba.min, qa = Ba.cos, Ea = Ba.sin, Da = oa.parseFloat, Ya = oa.parseInt, Ca;
    va(Aa.eventList, {zoomed: "FC_Zoomed", pinned: "FC_Pinned", resetzoomchart: "FC_ResetZoomChart"});
    Ua("zoomline", {friendlyName: "Zoomable and Panable Multi-series Line Chart", rendererId: "zoomline", standaloneInit: !0, hasVDivLine: !0, defaultSeriesType: "stepzoom", canvasborderthickness: 1, defaultPlotShadow: 1, chart: function () {
        for (var b = Ua.msline.chart.apply(this, arguments), c = b[pa], f = this.dataObj.chart,
                 h = this.colorManager.getColor("canvasBorderColor"), k = b.chart, U = 0, r = b.series, x = r && r.length || 0, q; x--;)q = r[x], U = Ha(U, q && q.showAnchors && q.attrs && q.attrs.anchors && (q.attrs.anchors.r || 0) + (q.attrs.anchors["stroke-width"] || 0) || 0);
        va(k, {animation: !1, zoomType: "x", canvasPadding: Ha(U, z(f.canvaspadding, 0)), overFlowingMarkerWidth: U, scrollColor: Ta(ka(f.scrollcolor, this.colorManager.getColor("altHGridColor"))), scrollShowButtons: !!z(f.scrollshowbuttons, 1), scrollHeight: z(f.scrollheight, 16) || 16, scrollBarFlat: c.flatScrollBars,
            allowPinMode: z(f.allowpinmode, 1), skipOverlapPoints: z(f.skipoverlappoints, 1), showToolBarButtonTooltext: z(f.showtoolbarbuttontooltext, 1), btnResetChartTooltext: ka(f.btnresetcharttooltext, "Reset Chart"), btnZoomOutTooltext: ka(f.btnzoomouttooltext, "Zoom out one level"), btnSwitchToZoomModeTooltext: ka(f.btnswitchtozoommodetooltext, "<strong>Switch to Zoom Mode</strong><br/>Select a subset of data to zoom into it for detailed view"), btnSwitchToPinModeTooltext: ka(f.btnswitchtopinmodetooltext, "<strong>Switch to Pin Mode</strong><br/>Select a subset of data and compare with the rest of the view"),
            pinPaneFill: ca(ka(f.pinpanebgcolor, h), z(f.pinpanebgalpha, 15)), zoomPaneFill: ca(ka(f.zoompanebgcolor, "#b9d5f1"), z(f.zoompanebgalpha, 30)), zoomPaneStroke: ca(ka(f.zoompanebordercolor, "#3399ff"), z(f.zoompaneborderalpha, 80)), showPeakData: z(f.showpeakdata, 0), maxPeakDataLimit: z(f.maxpeakdatalimit, f.maxpeaklimit, null), minPeakDataLimit: z(f.minpeakdatalimit, f.minpeaklimit, null), crossline: {enabled: z(f.showcrossline, 1), line: {"stroke-width": z(f.crosslinethickness, 1), stroke: Ta(ka(f.crosslinecolor, "#000000")), "stroke-opacity": z(f.crosslinealpha,
                20) / 100}, labelEnabled: z(f.showcrosslinelabel, f.showcrossline, 1), labelstyle: {fontSize: Da(f.crosslinelabelsize) ? Da(f.crosslinelabelsize) + "px" : c.outCanvasStyle.fontSize, fontFamily: ka(f.crosslinelabelfont, c.outCanvasStyle.fontFamily)}, valueEnabled: z(f.showcrosslinevalues, f.showcrossline, 1), valuestyle: {fontSize: Da(f.crosslinevaluesize) ? Da(f.crosslinevaluesize) + "px" : c.inCanvasStyle.fontSize, fontFamily: ka(f.crosslinevaluefont, c.inCanvasStyle.fontFamily)}}, useCrossline: z(f.usecrossline, 1), tooltipSepChar: ka(f.tooltipsepchar,
                ", "), showTerminalValidData: z(f.showterminalvaliddata, 0)});
        return b
    }, preSeriesAddition: function () {
        var b = this.dataObj, c = b.chart, f = this.hcJSON, h = f[pa], k = this.smartLabel, q = z(c.compactdatamode, 0), r = ka(c.dataseparator, "|"), x = z(c.showlabels, 1), A = c.labeldisplay && c.labeldisplay.toLowerCase(), l = x && z(c.labelheight), E = "rotate" === A ? 270 : z(c.rotatelabels, 1) ? 270 : 0, da = f.xAxis.labels.style, I = Da(da.lineHeight), t = f.chart.labelPadding = z(c.labelpadding, .2 * I) + f.chart.plotBorderWidth, g, G, N, Q = 0, P = -1, L, ba, ra;
        0 > l && (l = void 0);
        0 > t && (t = (f.chart.plotBorderWidth || 0) + 2);
        g = (g = b.categories) && g[0] || {};
        b = g.category;
        delete g.category;
        f.categories = A = va({data: G = q && b && b.split && b.split(r) || b || [], rotate: E, wrap: "none" !== A}, g);
        void 0 !== b && (g.category = b);
        g = G.length || 0;
        if (L = !q && x && 0 !== l && g || 0) {
            for (; L--;)G[L] = G[L] && (N = G[L].label || "") && ((ba = N.length) > Q && (Q = ba, P = L, N) || N) || "";
            Q && (N = G[P])
        } else if (q && g && !l)if (E) {
            q = oa.document.createElement("div");
            l = oa.document.createElement("span");
            q.setAttribute("class", "fusioncharts-zoomline-localsmartlabel");
            q.style.cssText = "display:block;width:1px;position:absolute;";
            for (ra in da)q.style[ra] = da[ra];
            l.innerHTML = b.replace(/\s*/g, "").replace(/\{br\}/ig, "<br />").replace(new RegExp(Na(r), "g"), " ");
            q.appendChild(l);
            oa.document.body.appendChild(q);
            l = l.offsetWidth || void 0;
            q.parentNode.removeChild(q)
        } else N = G[g - 1] || G[0];
        void 0 !== l && 0 !== l || !x || (N ? (k.setStyle(da), N = k.getSmartText(N), l = E ? N.width : N.height) : l = I * (E && 3 || 1));
        l > .3 * h.height && (l = .3 * h.height);
        A.labelHeight = l && l + 6 || 0;
        A.show = l && x || 0;
        A.css = va({}, da);
        E ? (A.css.rotation =
            E, A.css["text-anchor"] = "end") : A.css["vertical-align"] = "top";
        f.xAxis.min = 0;
        f.xAxis.max = g && g - 1 || 0;
        l += z(c.scrollheight, 16) || 16;
        f.chart.marginBottom += t;
        h.marginBottomExtraSpace += l;
        ka(c.caption, c.subcaption) || (h.marginTopExtraSpace += 16)
    }, series: function () {
        var b = this.dataObj, c = b.chart, f = b.dataset, h = this.hcJSON, k = h[pa], U = k[0], r = k[1], x = h.series, A = k.isDual, l = z(c.yaxismaxvalue), E = z(c.yaxisminvalue), da = z(c.syaxismaxvalue), I = z(c.syaxisminvalue), t = z(c.pyaxismaxvalue), g = z(c.pyaxisminvalue), G = z(c.forceyaxislimits,
            0), N = z(c.forcepyaxislimits, 0), Q = z(c.forcesyaxislimits, 0), L = z(c.compactdatamode, 0), P = ka(c.dataseparator, "|"), ba = Na(c.indecimalseparator), ra = Na(c.inthousandseparator), ca = !1, ha = z(c.drawanchors, c.showanchors, 1), oa = !!z(c.showlegend, 1), ua, ea = Infinity, ga = -Infinity, aa = Infinity, ia = -Infinity, W;
        ua = h.categories.data.length;
        if (f && f.length && ua) {
            ba && (ba = new RegExp(ba, "g"));
            ra && (ra = new RegExp(ra, "g"));
            !ra && !ba && L && G && (A ? void 0 !== t && void 0 !== g && void 0 !== da && void 0 !== I : void 0 !== l && void 0 !== E) ? A ? (ia = Ha(da, I), aa = Ma(da,
                I), ga = Ha(t, g), ea = Ma(g, t)) : (G = !0, ga = Ha(l, E), ea = Ma(E, l)) : G = !1;
            !ra && !ba && L && Q && void 0 !== da && void 0 !== I ? (Q = !0, ia = Ha(da, I), aa = Ma(da, I)) : Q = !1;
            !ra && !ba && L && N && void 0 !== t && void 0 !== g ? (N = !0, ga = Ha(t, g), ea = Ma(g, t)) : N = !1;
            E = 0;
            for (da = f.length; E < da; E++) {
                l = f[E];
                I = l.data;
                delete l.data;
                L ? (t = I || "", ra && (t = t.replace(ra, "")), ba && (t = t.replace(ba, ".")), t = t.split(P)) : t = I || [];
                t.length > ua && (t.length = ua);
                "s" === ka(l.parentyaxis, "p").toLowerCase() && (ca = !0);
                W = t.length;
                if (L)if (!(G || N || "p" !== ka(l.parentyaxis, "p").toLowerCase() &&
                    A))for (; W--;)g = Da(t[W]), isNaN(g) && (g = void 0), g > ga && (ga = g), g <= ea && (ea = g), t[W] = g; else {
                    if (!(G || Q || "s" !== ka(l.parentyaxis, "p").toLowerCase() && A))for (; W--;)g = Da(t[W]), isNaN(g) && (g = void 0), g > ia && (ia = g), g <= aa && (aa = g), t[W] = g
                } else if (!(G || N || "p" !== ka(l.parentyaxis, "p").toLowerCase() && A))for (; W--;)g = t[W] && t[W].value || "", ra && (g = g.replace(ra, "")), ba && (g = g.replace(ba, ".")), g = Da(g), isNaN(g) && (g = void 0), g > ga && (ga = g), g <= ea && (ea = g), t[W] = g; else if (!(G || Q || "s" !== ka(l.parentyaxis, "p").toLowerCase() && A))for (; W--;)g = t[W] &&
                    t[W].value || "", ra && (g = g.replace(ra, "")), ba && (g = g.replace(ba, ".")), g = Da(g), isNaN(g) && (g = void 0), g > ia && (ia = g), g <= aa && (aa = g), t[W] = g;
                x.push(g = {index: E, type: "zoomline", data: t, name: l.seriesname || "", showInLegend: l.seriesname && z(l.includeinlegend, 1) && oa || !1, showAnchors: z(l.drawanchors, l.showanchors, ha), visible: !z(l.initiallyhidden, 0), lineWidth: 2, yAxis: A && "s" === ka(l.parentyaxis, "p").toLowerCase() ? 1 : 0});
                t.length = ua;
                void 0 !== I && (l.data = I);
                g.attrs = this.seriesGraphicsAttrs(l);
                I = g.attrs.anchors;
                g.color = g.attrs.graphics.stroke;
                g.ancorRadius = I.r + I["stroke-width"] / 2;
                g.marker = {enabled: !!z(l.drawanchors, l.showanchors, ha), fillColor: I.fill, lineColor: I.stroke, lineWidth: 1, symbol: "circle"}
            }
            !ca && A && (k.isDual = !1, c.yaxismaxvalue = c.pyaxismaxvalue, c.yaxisminvalue = c.pyaxisminvalue);
            -Infinity !== ga && Infinity !== ea || (ga = ea = void 0);
            A = Ya(z(c.displaystartindex, 1), 10) - 1;
            G = Ya(z(c.displayendindex, ua || 2), 10) - 1;
            1 > (f = z(c.pixelsperpoint, 15)) && (f = 1);
            (x = z(c.pixelsperlabel, c.xaxisminlabelwidth, h.categories.rotate ? 20 : 60)) < f && (x = f);
            (0 > A || A >= (ua - 1 || 1)) &&
            (A = 0);
            (G <= A || G > (ua - 1 || 1)) && (G = ua - 1 || 1);
            h.stepZoom = {cnd: z(c.connectnulldata, 0), amrd: z(c.anchorminrenderdistance, 20), nvl: z(c.numvisiblelabels, 0), cdm: L, oppp: f, oppl: x, dsi: A, dei: G, vdl: G - A, dmax: U.max = ga, dmin: U.min = ea, dsecondarymax: r.max = ia, dsecondarymin: r.min = aa, clen: ua, offset: 0, step: 1, llen: 0, alen: 0, ddsi: A, ddei: G, ppc: 0};
            this.configureAxis(h, b);
            b.trendlines && q(b.trendlines, h.yAxis, k, !1, this.isBar)
        }
    }, seriesGraphicsAttrs: function (b) {
        var c = this.dataObj.chart, f = "0" != (b.dashed || c.linedashed || "0"), h, q, f = {"stroke-width": z(b.linethickness,
            c.linethickness, 2), stroke: Ta(ka(b.color, c.linecolor, this.colorManager.getPlotColor())), "stroke-opacity": z(b.alpha, c.linealpha, 100) / 100, "stroke-dasharray": f ? [z(b.linedashlen, c.linedashlen, 5), z(b.linedashgap, c.linedashgap, 4)] : "none", "stroke-linejoin": "round", "stroke-linecap": "round"};
        h = va({}, f);
        q = f["stroke-width"] + z(c.pinlinethicknessdelta, 1);
        h["stroke-width"] = 0 < q && q || 0;
        h["stroke-dasharray"] = [3, 2];
        return{graphics: f, pin: h, shadow: {opacity: f["stroke-opacity"], apply: z(c.showshadow, +!k.vml)}, anchors: {"stroke-linejoin": "round",
            "stroke-linecap": "round", r: z(b.anchorradius, c.anchorradius, f["stroke-width"] + 2), stroke: Ta(ka(b.anchorbordercolor, c.anchorbordercolor, f.stroke)), "stroke-opacity": z(b.anchorborderalpha, c.anchorborderalpha, 100) / 100, "stroke-width": z(b.anchorborderthickness, c.anchorborderthickness, f["stroke-width"]), fill: Ta(ka(b.anchorbgcolor, c.anchorbgcolor, "#ffffff")), "fill-opacity": z(b.anchorbgalpha, c.anchorbgalpha, 100) / 100, opacity: z(b.anchoralpha, c.anchoralpha, 100) / 100}, anchorShadow: z(c.anchorshadow, c.showshadow, +!k.vml) &&
        {apply: !0, opacity: z(b.anchoralpha, c.anchoralpha, 100) / 100}}
    }, eiMethods: {zoomOut: function () {
        var b = this.jsVars, c;
        if (b && (c = b.hcObj))return c.zoomOut && b.hcObj.zoomOut()
    }, zoomTo: function (b, c) {
        var f = this.jsVars, h;
        if (f && (h = f.hcObj))return h.zoomRange && f.hcObj.zoomRange(b, c)
    }, resetChart: function () {
        var b = this.jsVars, c;
        b && (c = b.hcObj) && (c.pinRangePixels && b.hcObj.pinRangePixels(), c.resetZoom && b.hcObj.resetZoom())
    }, setZoomMode: function (b) {
        var c = this.jsVars, f;
        c && (f = c.hcObj) && f.activatePin && f.activatePin(!b)
    }, getViewStartIndex: function () {
        var b =
            this.jsVars, c;
        if (b && b.hcObj && (c = b.hcObj._zoominfo))return c.ddsi
    }, getViewEndIndex: function () {
        var b = this.jsVars, c;
        if (b && b.hcObj && (c = b.hcObj._zoominfo))return b = c.ddei - 1, (b >= c.clen ? c.clen : b) - 1
    }}}, Ua.msline);
    Ua("zoomlinedy", {rendererId: "zoomline", isDual: !0, friendlyName: "Zoomable and Panable Multi-series Dual-axis Line Chart"}, Ua.zoomline);
    Wa("renderer.zoomline", {resetZoom: function () {
        var b = this._zoomhistory, c = this.options.stepZoom;
        if (!b.length)return!1;
        b.length = 0;
        this.zoomTo(c.dsi, c.dei) && L("zoomReset",
            this._zoomargs, this.fusionCharts, [this.fusionCharts.id]);
        return!0
    }, zoomOut: function () {
        var b = this._zoomhistory.pop(), c = this.options.stepZoom, f, h, k;
        b ? (f = b.dsi, h = b.dei) : this._prezoomed && (f = 0, h = c.clen - 1);
        (k = this.zoomTo(f, h)) && Ka.raiseEvent("zoomedout", k, this.fusionCharts);
        return!0
    }, zoomRangePixels: function (b, c) {
        var f = this._zoomhistory, h = this._zoominfo, k = h.ppp, h = h.ddsi, q;
        f.push(this._zoominfo);
        (q = this.zoomTo(h + P(b / k), h + P(c / k))) ? Ka.raiseEvent("zoomedin", q, this.fusionCharts) : f.pop()
    }, zoomRange: function (b, c) {
        var f = this._zoomhistory, h;
        f.push(this._zoominfo);
        (h = this.zoomTo(+b, +c)) ? Ka.raiseEvent("zoomedin", h, this.fusionCharts) : f.pop()
    }, zoomTo: function (b, c) {
        var f = this.xlabels.data, h = this._zoominfo, k = this._zoomhistory, q = h.clen;
        0 > b && (b = 0);
        b >= q - 1 && (b = q - 1);
        c <= b && (c = b + 1);
        c > q - 1 && (c = q - 1);
        if (b === c || b === h.dsi && c === h.dei)return!1;
        this.pinRangePixels();
        h = va({}, h);
        h.dsi = b;
        h.dei = c;
        h = this._zoominfo = h;
        this.updatePlotZoomline();
        this.zoomOutButton[h.vdl === h.clen - 1 ? "hide" : "show"]();
        this.resetButton[k.length ? "show" : "hide"]();
        this.elements.zoomscroller.attr({"scroll-ratio": h.vdl / (q - !!q), "scroll-position": [h.dsi / (q - h.vdl - 1), !0]});
        f = {level: k.length + 1, startIndex: b, startLabel: f[b], endIndex: c, endLabel: f[c]};
        L("zoomed", f, this.fusionCharts, [this.fusionCharts.id, b, c, f.startLabel, f.endLabel, f.level]);
        return f
    }, activatePin: function (b) {
        var c = this._zoominfo, f = this.options.chart, h = this.pinButton;
        if (h && c.pinned ^ (b = !!b))return b || this.pinRangePixels(), L("zoomModeChanged", {pinModeActive: b}, this.fusionCharts, []), f.showToolBarButtonTooltext &&
            h.tooltip(f[b && "btnSwitchToZoomModeTooltext" || "btnSwitchToPinModeTooltext"] || ""), h.attr("button-active", b), c.pinned = b
    }, pinRangePixels: function (b, c) {
        var f = this.paper, h = this.elements, k = this.xlabels.data, q = this._zoominfo, r = this.layers.zoompin, x = h.pinrect, A = h["clip-pinrect"], l = this._pingrouptransform, E = this.plots, z = c - b, I, t;
        if (q && r && x) {
            if (b === c)return r.hide(), h.pintracker.hide(), this.pinButton.attr("button-active", !1), q.pinned = !1;
            for (t = E.length; t--;)x = E[t], I = x.pinline, I || (I = x.pinline = f.path(void 0, r).attr(x.attrPin)),
                I.attr("path", x.graphic.attrs.path);
            A[0] = b + this.canvasLeft;
            A[2] = z;
            r.attr({"clip-rect": A, transform: l}).show();
            h.pintracker.__pindragdelta = 0;
            h.pintracker.show().attr({transform: l, x: b, width: z});
            b = this.getValuePixel(b);
            c = this.getValuePixel(c);
            L("pinned", {startIndex: b, endIndex: c, startLabel: k[b], endLabel: k[c]}, this.fusionCharts, [this.fusionCharts.id, b, c, k[b], k[c]]);
            return q.pinned = !0
        }
    }, getValuePixel: function (b) {
        var c = this._zoominfo;
        return c.ddsi + P(b / c.ppp)
    }, getParsedLabel: function (b) {
        var c = this.xlabels;
        return c.parsed[b] || (c.parsed[b] = Fa(c.data[b] || ""))
    }, drawGraph: function () {
        var b = this, c = b.paper, f = b.canvasLeft, h = b.canvasTop, q = b.canvasWidth, U = b.canvasHeight, r = b.options, x = r.chart, A = x.plotBorderWidth, l = x.useRoundEdges, E = x.showToolBarButtonTooltext, z = x.crossline, I = b.layers, t = b.toolbar, g = b.elements, G = x.allowPinMode, N = r.categories, Q = !1, L, P, ba, ca, ma, ha, ka;
        ha = b._zoominfo = va({}, r.stepZoom);
        b._zoomhistory = [];
        ha.clen && (Q = b._prezoomed = ha.dei - ha.dsi < ha.clen - 1, ma = b._visw = b.canvasWidth - 2 * x.canvasPadding, ca = b._visx =
            b.canvasLeft + x.canvasPadding, b._visout = -(b.chartHeight + b.canvasHeight + 1E3), b.base.drawGraph.apply(b, arguments), b._ypvr = b.yAxis[0] && b.yAxis[0].pixelValueRatio || 0, ka = b._ymin || (b._ymin = b.yAxis[0].endY), b._yminValue = b.yAxis[0].min, r = I.dataset.attr("clip-rect", [b._visx - x.overFlowingMarkerWidth, b.canvasTop, b._visw + 2 * x.overFlowingMarkerWidth, b.canvasHeight]), ba = I.scroll || (I.scroll = c.group("scroll").insertAfter(I.layerAboveDataset)), b.xlabels = [], b.xlabels.show = N.show, b.xlabels.height = N.labelHeight, b.xlabels.wrap =
            N.wrap, b.xlabels.rotate = N.rotate, b.xlabels.data = N.data || [], b.xlabels.parsed = [], b.xlabels.css = N.css, b.xlabels.group = c.group("zoomline-plot-xlabels", I.datalabels), I.datalabels.transform(["T", ca, h + U + x.scrollHeight + x.labelPadding]), b._lcmd = N.rotate ? "y" : "x", G && (G = k.crispBound(0, h - ka, 0, U, A), L = g["clip-pinrect"] = [G.x, h, G.width, G.height], P = I.zoompin = c.group("zoompin").insertBefore(r).transform(b._pingrouptransform = ["T", ca, ka]).hide(), g.pinrect = c.rect(0, h - ka, b._visw, U, I.zoompin).attr({"stroke-width": 0, stroke: "none",
            fill: x.pinPaneFill, "shape-rendering": "crisp", ishot: !0}), g.pintracker = c.rect(I.tracker).attr({transform: P.transform(), x: 0, y: h - ka, width: 0, height: U, stroke: "none", fill: ta, ishot: !0, cursor: k.svg && "ew-resize" || "e-resize"}).drag(function (b) {
            var c = ca + b + this.__pindragdelta, f = this.__pinboundleft, h = this.__pinboundright, l = this.data("cliprect").slice(0);
            c < f ? c = f : c > h && (c = h);
            P.transform(["T", c, ka]);
            g.pintracker.transform(P.transform());
            k.svg || (l[0] = l[0] + c - ca - this.__pindragdelta, P.attr("clip-rect", l));
            this.__pindragoffset =
                b
        }, function () {
            this.__pinboundleft = 0 - L[0] + ca + f;
            this.__pinboundright = this.__pinboundleft + ma - L[2];
            this.data("cliprect", P.attr("clip-rect"));
            P._.clipispath = !0
        }, function () {
            P._.clipispath = !1;
            this.__pindragdelta = this.__pindragoffset;
            delete this.__pindragoffset;
            delete this.__pinboundleft;
            delete this.__pinboundright
        }), b.pinButton = t.add("pinModeIcon", function () {
            b.activatePin(!b._zoominfo.pinned)
        }, {tooltip: E && x.btnSwitchToPinModeTooltext || ""})), A++, G = k.crispBound(f - A, h + U + A, q + A + A, x.scrollHeight, A), A--, g.zoomscroller =
            c.scroller(G.x + (l && -1 || A % 2), G.y - (l && 4 || 2), G.width - (!l && 2 || 0), G.height, !0, {showButtons: x.scrollShowButtons, scrollRatio: ha.vdl / (ha.clen - !!ha.clen), scrollPosition: [ha.dsi / (ha.clen - ha.vdl - 1), !1], displayStyleFlat: x.scrollBarFlat}, ba).attr({fill: x.scrollColor, r: l && 2 || 0}).scroll(b.updatePlotZoomline, b), l && g.zoomscroller.shadow(!0), function () {
            var c;
            k.eve.on("raphael.scroll.start." + g.zoomscroller.id, function (f) {
                c = f;
                b.crossline && b.crossline.disable(!0);
                Ka.raiseEvent("scrollstart", {scrollPosition: f}, b.logic.chartInstance)
            });
            k.eve.on("raphael.scroll.end." + g.zoomscroller.id, function (f) {
                b.crossline && b.crossline.disable(!1);
                Ka.raiseEvent("scrollend", {prevScrollPosition: c, scrollPosition: f}, b.logic.chartInstance)
            })
        }(), $a(b, {attr: {stroke: x.zoomPaneStroke, fill: x.zoomPaneFill, strokeWidth: 0}, selectionStart: function () {
        }, selectionEnd: function (c) {
            var h = c.selectionLeft - f;
            c = h + c.selectionWidth;
            b.crossline && b.crossline.hide();
            b[b._zoominfo.pinned ? "pinRangePixels" : "zoomRangePixels"](h, c)
        }}), b.zoomOutButton = t.add("zoomOutIcon", function () {
                b.zoomOut()
            },
            {tooltip: E && x.btnZoomOutTooltext || ""})[Q && "show" || "hide"](), b.resetButton = t.add("resetIcon", function () {
            b.resetZoom()
        }, {tooltip: E && x.btnResetChartTooltext || ""}).hide(), G = b.resetButton.attr("fill"), G[2] = "rgba(255,255,255,0)", b.resetButton.attr("fill", [G[0], G[1], G[2], G[3]]), z && 0 !== z.enabled && 1 === x.useCrossline && (b.crossline = new Ca(b, z)), b.updatePlotZoomline())
    }, drawPlotZoomline: function (b, c) {
        var f = this.paper, h = c.attrs, k = c.visible, q = k ? "show" : "hide", r = this.layers.dataset, x = b.group || (b.group = f.group("plot-zoomline-dataset",
            r)), r = b.anchorGroup || (b.anchorGroup = f.group("plot-zoomline-anchors", r)), f = b.graphic || (b.graphic = f.path(void 0, x)), A = ["T", this._visx, this._ymin || (this._ymin = this.yAxis[0].endY)];
        b.yAxis = c.yAxis;
        x.transform(A)[q]();
        r.transform(A)[q]();
        b.graphic = f.attr(h.graphics).shadow(h.shadow);
        b.attrPin = h.pin;
        b.visible = k;
        b.anchors = [];
        b.anchors.show = c.showAnchors;
        b.anchors.attrs = h.anchors;
        b.anchors.attrsShadow = h.anchorShadow;
        b.anchors.left = -(h.anchors.r + .5 * h.anchors["stroke-width"]);
        b.anchors.right = this._visw - b.anchors.right
    },
        updatePlotZoomline: function (b, c) {
            var f = this.paper, h = this._ypvr, k = this._visw, q = this.xlabels, r = q.css, x = q.group, A = this.plots, l = this.options.chart.textDirection, E, z, I, t, g, G, N, Q;
            !c && (c = this._zoominfo);
            t = c.oppp;
            g = c.vdl = c.dei - c.dsi;
            G = c.ppl = c.nvl ? k / c.nvl : c.oppl;
            k = c.step = (I = c.ppp = k / g) < t ? La(t / I) : 1;
            t = c.lskip = La(Ha(G, Da(r.lineHeight)) / I / k);
            void 0 !== b ? (G = (c.clen - g - 1) * b, c.offset = (G - (G = Ya(G))) * I, g = G + g) : (G = c.dsi, g = c.dei, c.offset = 0);
            N = c.norm = G % k;
            c.ddsi = G -= N;
            c.ddei = g = g + 2 * k - N;
            c.pvr = h;
            c._ymin = this._ymin;
            c._yminValue =
                this._yminValue;
            h = q.show ? La((g - G) / k / t) : 0;
            N = c.llen - 1;
            c.llen = h;
            Q = c.ppc = I * t * k;
            x.trackTooltip(!0);
            if (h > N)for (t = N, N = h; t < N; t++)(E = q[t]) && E.show() || (q[t] = f.text(0, 0, "", x).css(r).attr({direction: l})); else for (t = h, N += 1; t < N; t++)q[t].hide();
            h = I * k < c.amrd ? 0 : La((g - G) / k);
            r = h - c.alen;
            c.alen = h;
            q.wrap && (q.rotate ? (q._width = q.height, q._height = Q) : (q._width = Q, q._height = q.height));
            for (E = A.length; E--;) {
                x = A[E];
                c.plotName = x.name || "";
                l = x.anchors;
                I = this.yAxis[x.yAxis];
                c.pvr = I.pixelValueRatio;
                c._yminValue = I.min;
                if (l.show && r) {
                    z =
                        l.attrs;
                    t = 0;
                    for (N = h; t < N; t++)l[t] = l[t] && l[t].show() || f.circle(z, x.anchorGroup);
                    t = h;
                    for (N = l.length; t < N; t++)l[t] && l[t].hide()
                }
                this.drawPlotZoomlineGraphics(c, x.data, x.graphic, l, !E && q, z, x.anchorGroup)
            }
            oa.FC_DEV_ENVIRONMENT && oa.jQuery && (FusionCharts["debugger"].enable() ? (this.debug = this.debug || (oa.jQuery("#fc-zoominfo").length || oa.jQuery("body").append('<pre id="fc-zoominfo">'), oa.jQuery("#fc-zoominfo").css({position: "absolute", left: "10px", top: "0", "pointer-events": "none", opacity: .7, width: "250px", zIndex: "999",
                border: "1px solid #cccccc", "box-shadow": "1px 1px 3px #cccccc", background: "#ffffff"})), this.debug.text(JSON.stringify(c, 0, 2))) : (this.debug && oa.jQuery("#fc-zoominfo").remove(), delete this.debug))
        }, drawPlotZoomlineGraphics: function (b, c, f, h, k, q, r) {
            var x = this.smartLabel, A = this.paper, l = this.numberFormatter, E = this.options.chart, z = E.useCrossline, I = E.showTerminalValidData, t = E.showPeakData, g = E.maxPeakDataLimit, G = E.minPeakDataLimit, N = [], Q = !b.cnd, L = b.ddei, P = b.clen, ba = b.step, ca = b.lskip, ma = b.ppp, ha = b.offset, ka =
                b.pvr, ua = this._visw, ea = this._visout, ga = this._lcmd, aa, ia = "M", W, B, fa = k && k[0], Ga, la, oa = h[0], pa = {}, p = {}, qa, Y, va, ya = 0, Aa, ta, Ca, na = -b.norm, a = b.ddsi, n = 0, e, d, v = E.tooltipSepChar, Da, w, Ea = c.length, V = !1, u = !1, X, m = !1, Ba = !1, Fa;
            fa && (k.group.transform(["T", -ha, 0]), Ca = k.wrap, Ga = k._height, la = k._width, Ca && x.setStyle(k.css));
            k = function (a, b) {
                var c = a && a.length, d = Math.max.apply(Math, a), e = Math.min.apply(Math, a), f = 0;
                if (d > g || e < G)for (; f < c;) {
                    e = a[f];
                    if (e > g || e < G)d = b + f, Da(e, d, d, !0);
                    f += 1
                }
            };
            for (Da = function (a, f, g, k) {
                var m = void 0, p =
                    void 0, t = void 0;
                z || (d = e + v + l.yAxis(a), d = b.plotName && b.plotName + v + d || d);
                Aa = ya / 3 + n;
                Y = g * ma;
                aa = Y - ha;
                if (void 0 === (W = c[f])) {
                    if (Q)ia = "M", qa = ea, aa = Y - ha, va = ea; else {
                        if (0 === Aa) {
                            for (m = f; 0 < m && (--m, p = c[m], void 0 === p););
                            p && (Y = m * ma * -1, qa = ea, N[ya++] = ia, N[ya++] = Y, N[ya++] = va = (p - b._yminValue) * ka, ia = "L")
                        }
                        if (f === L) {
                            for (m = f; m < P && (m += 1, t = c[m], void 0 === t););
                            t && (Y = m * ma, qa = ea, N[ya++] = ia, N[ya++] = Y, N[ya++] = va = (t - b._yminValue) * ka, ia = "L")
                        }
                    }
                    n++
                } else N[ya++] = ia, V ? (V = !1, N[ya++] = qa = aa = X * ma / (ba * w) * f) : u ? (u = !1, ba >= f - X && (N[ya - 1] = "L"), b.pppCopy =
                    b.pppCopy || ma, N[ya++] = qa = aa = b.pppCopy * f) : N[ya++] = qa = aa = Y - ha, N[ya++] = va = (W - b._yminValue) * ka, ia = "L";
                if (void 0 === qa || void 0 === va)qa = va = ea;
                oa && (oa = oa.attr((pa.cx = qa, pa.cy = va, pa)).next);
                k && h.push(A.circle(q, r))
            }; a <= L; a += ba, na += ba) {
                e = this.getParsedLabel(a);
                ta = c[a];
                Fa = a;
                if (I)if (0 === a && void 0 === c[a]) {
                    w = 0;
                    for (B = X = a; B < Ea;)if (void 0 !== c[B] || m ? m = !0 : B++, void 0 === c[X] && !Ba && X <= Ea ? (X += ba, w++) : Ba = !0, m && Ba) {
                        m = Ba = !1;
                        break
                    }
                    0 !== B % ba && (V = !0, ta = c[B], Fa = B)
                } else if (a >= Ea && void 0 === c[a]) {
                    for (B = X = a; 0 < B && (void 0 !== c[B] || m ?
                        m = !0 : B--, void 0 === c[X] && !Ba && 0 <= X ? X -= ba : Ba = !0, !m || !Ba););
                    0 !== B % ba && (u = !0, ta = c[B], Fa = B)
                }
                Da(ta, Fa, na);
                !fa || Aa % ca || (ta = fa.attrs, B = e, aa = 0 > aa || aa > ua ? ea : Y, fa._prevtext === B ? delete p.text : p.text = fa._prevtext = B, ta[ga] === aa ? delete p[ga] : p[ga] = aa, Ca && B && (p.text = x.getSmartText(B, la, Ga).text), fa.tooltip(x.getSmartText(B, la, Ga).tooltext), fa = fa.attr(p).next);
                t && 1 < ba && (B = Ma(a + 1, L), ta = Ma(B + ba, L), ta = ta === L ? c.slice(B) : c.slice(B, ta), k(ta, B))
            }
            L >= P && oa && oa.attr((pa.cx = ea, pa.cy = ea, pa));
            f.attr("path", N);
            z || function (a, b, c) {
                var e = c.plotName;
                f.tooltipListenerAttached || (f.tooltipListenerAttached = !0, f.mousemove(function (c) {
                    var h = a._zoominfo, g = a._visx, k = h.step, m = h.ppp * k;
                    c = ab(a.container, c).chartX - g;
                    var n, g = E.tooltipSepChar;
                    c = (c += m / 2 + h.offset) - c % m;
                    n = (n = a.getValuePixel(c)) + n % k;
                    d = a.getParsedLabel(n) + g + l.yAxis(b[n]);
                    d = e && e + g + d || d;
                    f.tooltip(d)
                }))
            }(this, c, b)
        }, legendClick: function (b) {
            var c = !b.visible, f = c ? "show" : "hide";
            b.group[f]();
            b.anchorGroup[f]();
            this.base.legendClick.apply(this, arguments);
            return b.visible = c
        }, dispose: function () {
            var b;
            this.crossline && (this.crossline.dispose(), delete this.crossline);
            (b = this.elements.pintracker) && (b.undrag(), delete this.elements.pintracker);
            delete this.zoomOutButton;
            delete this.resetButton;
            delete this.pinButton;
            this.xlabels && (this.xlabels.length = 0);
            delete this.xlabels;
            this.base.dispose.apply(this)
        }}, Wa["renderer.cartesian"]);
    Ca = function (b, c) {
        var f = b.paper, h = b.options.chart, k = this.left = b._visx, q = this.width = b._visw, r = this.top = b.canvasTop, x = this.height = b.canvasHeight, A = this._visout = b._visout, l = this.plots =
            b.plots, E = b.layers.dataset, z, I = c.labelstyle, t = c.valuestyle, g = b.yAxis[0], G = b.yAxis[1];
        z = this.group = f.group("crossline-labels", E).attr({transform: ["T", k, b._ymin]});
        this.tracker = f.rect(k, r, q, x, E).attr({stroke: "none", "stroke-width": 0, fill: ta}).toFront().mousedown(this.onMouseDown, this).mouseup(this.onMouseUp, this, !0).mouseout(this.onMouseOut, this).mousemove(this.onMouseMove, this);
        Oa && this.tracker.touchstart(this.onMouseMove, this);
        this.container = b.container;
        this.line = f.path(void 0, E).attr(va({path: ["M",
            k, r, "l", 0, x]}, c.line)).toBack();
        k = this.labels = c.valueEnabled && f.set();
        c.labelEnabled && (this.positionLabel = f.text(A, r + x + (h.scrollHeight || 0) + 2.5, "").insertAfter(b.xlabels.group.parent).css(I).attr({"vertical-align": "top", direction: h.textDirection, "text-bound": ["rgba(255,255,255,1)", "rgba(0,0,0,1)", 1, 2.5]}));
        this.hide();
        this.ppixelRatio = b.yAxis[0].pixelValueRatio;
        this.spixelRatio = b.yAxis[1].pixelValueRatio;
        this.yminValue = b._yminValue;
        this.pyaxisminvalue = g.min;
        this.pyaxismaxvalue = g.max;
        this.syaxisminvalue =
            G.min;
        this.syaxismaxvalue = G.max;
        this.positionLabels = b.xlabels || {data: [], parsed: []};
        this.getZoomInfo = function () {
            return b._zoominfo
        };
        this.getDataIndexFromPixel = function (c) {
            return b.getValuePixel(c)
        };
        this.getPositionLabel = function (c) {
            return b.getParsedLabel(c)
        };
        if (c.valueEnabled) {
            r = 0;
            for (x = l.length; r < x; r++)I = l[r], I = I.graphic.attrs.stroke, k.push(f.text(0, A, "", z).css(t).attr({fill: I, direction: h.textDirection, "text-bound": ["rgba(255,255,255,0.8)", "rgba(0,0,0,0.2)", 1, 2.5]}));
            this.numberFormatter = b.numberFormatter
        }
    };
    Ca.prototype.disable = function (b) {
        void 0 !== b && (this.disabled = !!b) && this.visible && this.hide();
        return this.disabled
    };
    Ca.prototype.onMouseOut = function () {
        this.hide()
    };
    Ca.prototype.onMouseDown = function () {
        !Oa && this.hide();
        this._mouseIsDown = !0
    };
    Ca.prototype.onMouseUp = function () {
        !Oa && this.hide();
        delete this._mouseIsDown
    };
    Ca.prototype.onMouseMove = function (b) {
        if (!(this.disabled || this._mouseIsDown && !Oa)) {
            var c = this.getZoomInfo(), f = this.line, h = this.left, k = c.step, q = c.ppp * k;
            b = ab(this.container, b).chartX - h;
            var r;
            b = (b += q / 2 + c.offset) - b % q;
            r = (r = this.getDataIndexFromPixel(La(b))) + r % k;
            b -= c.offset;
            f.transform(["T", P(b), 0]);
            this.hidden && this.show();
            if (r !== this.position || this.hidden)this.position = r, this.lineX = b, this.updateLabels()
        }
    };
    Ca.prototype.updateLabels = function () {
        var b = this, c = b.labels, f = b.plots, h = b.width, k = b.position, q = b.lineX, r = P(q), x = b.ppixelRatio, A = b.spixelRatio, l = b.yminValue, E = b._visout, z = b.numberFormatter, I = b.pyaxisminvalue, t = b.pyaxismaxvalue, g = b.syaxisminvalue, G = b.syaxismaxvalue, N = function () {
            function c() {
                this.y =
                    0;
                this.lRef = void 0;
                this.__index = this.__shift = 0
            }

            function f(b) {
                for (var c = 0; c < b;)this.push(c++);
                return this
            }

            function h(b) {
                var c, f, g, k, l = Number.POSITIVE_INFINITY;
                for (c = 0; c < this.length; c++)f = this[c] - b, 0 > f ? g = I.NEG : g = I.POS, f = G(f), f <= l && (l = f, k = {absValue: f, noScaleSide: g});
                return k
            }

            function g(b) {
                this.holes = f.call([], b)
            }

            var k = -1 * b.height, q = l * x, r = 0, t, A = {}, z, G = Math.abs, R = Math.floor, I = {};
            "function" != typeof Object.create && (Object.create = function () {
                function b() {
                }

                var c = Object.prototype.hasOwnProperty;
                return function (f) {
                    var h,
                        g, k;
                    if ("object" != typeof f)throw new TypeError("Object prototype may only be an Object or null");
                    b.prototype = f;
                    k = new b;
                    b.prototype = null;
                    if (1 < arguments.length)for (g in h = Object(arguments[1]), h)c.call(h, g) && (k[g] = h[g]);
                    return k
                }
            }());
            Array.prototype.indexOf || (Array.prototype.indexOf = function (b, c) {
                var f, h, g;
                if (null == this)throw new TypeError('"this" is null or not defined');
                h = Object(this);
                g = h.length >>> 0;
                if (0 === g)return-1;
                f = +c || 0;
                Infinity === Math.abs(f) && (f = 0);
                if (f >= g)return-1;
                for (f = Math.max(0 <= f ? f : g - Math.abs(f),
                    0); f < g;) {
                    if (f in h && h[f] === b)return f;
                    f++
                }
                return-1
            });
            Array.prototype.forEach || (Array.prototype.forEach = function (b, c) {
                var f, h, g, k, l;
                if (null == this)throw new TypeError(" this is null or not defined");
                g = Object(this);
                k = g.length >>> 0;
                if ("function" !== typeof b)throw new TypeError(b + " is not a function");
                1 < arguments.length && (f = c);
                for (h = 0; h < k;)h in g && (l = g[h], b.call(f, l, h, g)), h++
            });
            c.prototype.constructor = c;
            c.prototype.applyShift = function (b) {
                this.__shift = b;
                this.lRef.calcY = this.y += b * r
            };
            c.prototype.applyDirectIndex =
                function (b) {
                    this.__index = b;
                    this.lRef.calcY = this.y = k - b * r * -1
                };
            try {
                Object.defineProperty(I, "POS", {enumerable: !1, configurable: !1, get: function () {
                    return 1
                }}), Object.defineProperty(I, "NEG", {enumerable: !1, configurable: !1, get: function () {
                    return-1
                }})
            } catch (W) {
                I.POS = 1, I.NEG = -1
            }
            g.prototype = Object.create(Array.prototype);
            g.prototype.constructor = g;
            g.prototype.repositionHoles = function () {
                var b, c = 0, f;
                for (b = this.holes.length = 0; b < this.length; b++)f = this[b], !f && (this.holes[c++] = b)
            };
            g.prototype.attachShift = function (b, f, g) {
                var k, l = this.length;
                if (b === E)g.calcY = E; else if (l = f > l - 1 ? l - 1 : f, k = this[l], f = new c, f.y = b, f.lRef = g, k) {
                    b = h.call(this.holes, l);
                    g = l + b.absValue * b.noScaleSide;
                    if (b.noScaleSide === I.POS)return f.applyDirectIndex(g), this.splice(g, 1, f), this.holes.splice(this.holes.indexOf(g), 1), g;
                    if (b.noScaleSide === I.NEG) {
                        b = this.splice(g + 1, this.length - 1);
                        this.pop();
                        b.forEach(function (b) {
                            b && b.applyShift(-1)
                        });
                        for ([].push.apply(this, b); this[g];)g++;
                        this.push(0);
                        this.repositionHoles();
                        b = h.call(this.holes, g);
                        g += b.absValue * b.noScaleSide;
                        f.applyDirectIndex(g);
                        this.splice(g, 1, f);
                        this.repositionHoles();
                        return this.length - 1
                    }
                } else f.applyDirectIndex(l), this.splice(l, 1, f), this.holes.splice(this.holes.indexOf(l), 1)
            };
            try {
                Object.defineProperty(A, "top", {enumerable: !1, configurable: !1, get: function () {
                    return k
                }}), Object.defineProperty(A, "bottom", {enumerable: !1, configurable: !1, get: function () {
                    return q
                }})
            } catch (W) {
                A.top = k, A.bottom = q
            }
            A.init = function (b, c) {
                var f;
                r = b + 2;
                k += r / 2;
                z = R(G(k) / r);
                t = new g(z);
                for (f = 0; f < z; f++)t.push(0)
            };
            A.occupy = function (b, c) {
                var f =
                    R(G(k - b) / r);
                t.attachShift(b, f, c)
            };
            return A
        }();
        c && (c[0].attr({text: z.yAxis("0")}), N.init(c[0].getBBox().height, c.length), c.forEach(function (b, c) {
            var h = f[c], l = h.data[k], q = h.yAxis;
            N.occupy(void 0 === l || !h.visible || (q ? l > G || l < g : l > t || l < I) ? E : q ? (l - g) * A : (l - I) * x, b)
        }));
        c && c.forEach(function (b, c) {
            var g;
            b.attr({text: z.yAxis(f[c].data[k])});
            g = .5 * b.getBBox().width + 10;
            b.attr({x: Ha(0, Ma(r, h)), y: b.calcY, "text-anchor": q <= g && "start" || q + g >= h && "end" || "middle"})
        });
        b.positionLabel && b.positionLabel.attr({x: q + b.left, text: b.getPositionLabel(k)})
    };
    Ca.prototype.show = function () {
        this.disabled || (this.hidden = !1, this.group.attr("visibility", "visible"), this.line.attr("visibility", "visible"), this.positionLabel && this.positionLabel.attr("visibility", "visible"))
    };
    Ca.prototype.hide = function () {
        this.hidden = !0;
        this.group.attr("visibility", "hidden");
        this.line.attr("visibility", "hidden");
        this.positionLabel && this.positionLabel.attr("visibility", "hidden")
    };
    Ca.prototype.dispose = function () {
        for (var b in this)this.hasOwnProperty(b) && delete this[b]
    };
    k.addSymbol({pinModeIcon: function (b, c, f) {
        var h = .5 * f, k = b - f, q = b + f, r = b - h, x = b + h, A = b + .5, l = A + 1, z = A + 1.5, L = c - f, I = c + h, t = c - h, h = c + (f - h);
        return["M", k, L, "L", r, t, r, h, k, I, b - .5, I, b, c + f + .5, A, I, q, I, x, h, x, t, q, L, z, L, z, t, z, h, l, h, l, t, z, t, z, L, "Z"]
    }, zoomOutIcon: function (b, c, f) {
        b -= .2 * f;
        c -= .2 * f;
        var h = .8 * f, q = k.rad(43), z = k.rad(48), r = b + h * qa(q), q = c + h * Ea(q), x = b + h * qa(z), z = c + h * Ea(z), A = k.rad(45), l = r + f * qa(A), E = q + f * Ea(A), L = x + f * qa(A);
        f = z + f * Ea(A);
        return["M", r, q, "A", h, h, 0, 1, 0, x, z, "Z", "M", r + 1, q + 1, "L", l, E, L, f, x + 1, z + 1, "Z", "M", b - 2, c, "L", b + 2, c, "Z"]
    }, resetIcon: function (b, c, f) {
        var h =
            b - f, k = (Ba.PI / 2 + Ba.PI) / 2;
        b += f * qa(k);
        var k = c + f * Ea(k), q = 2 * f / 3;
        return["M", h, c, "A", f, f, 0, 1, 1, b, k, "L", b + q, k - 1, b + 2, k + q - .5, b, k]
    }})
}]);
