import { defineComponent as mt, ref as gt, onMounted as yt, openBlock as bt, createElementBlock as wt, renderSlot as xt } from "vue";
var k = "top", N = "bottom", L = "right", T = "left", we = "auto", ce = [k, N, L, T], Z = "start", fe = "end", Ot = "clippingParents", tt = "viewport", ae = "popper", Et = "reference", Fe = /* @__PURE__ */ ce.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + fe]);
}, []), rt = /* @__PURE__ */ [].concat(ce, [we]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + fe]);
}, []), At = "beforeRead", Pt = "read", St = "afterRead", Dt = "beforeMain", Rt = "main", jt = "afterMain", kt = "beforeWrite", Tt = "write", Bt = "afterWrite", Se = [At, Pt, St, Dt, Rt, jt, kt, Tt, Bt];
function I(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function $(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function K(t) {
  var e = $(t).Element;
  return t instanceof e || t instanceof Element;
}
function C(t) {
  var e = $(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function je(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = $(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Ct(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var n = e.styles[r] || {}, o = e.attributes[r] || {}, i = e.elements[r];
    !C(i) || !I(i) || (Object.assign(i.style, n), Object.keys(o).forEach(function(p) {
      var f = o[p];
      f === !1 ? i.removeAttribute(p) : i.setAttribute(p, f === !0 ? "" : f);
    }));
  });
}
function Nt(t) {
  var e = t.state, r = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow), function() {
    Object.keys(e.elements).forEach(function(n) {
      var o = e.elements[n], i = e.attributes[n] || {}, p = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : r[n]), f = p.reduce(function(s, c) {
        return s[c] = "", s;
      }, {});
      !C(o) || !I(o) || (Object.assign(o.style, f), Object.keys(i).forEach(function(s) {
        o.removeAttribute(s);
      }));
    });
  };
}
const Lt = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ct,
  effect: Nt,
  requires: ["computeStyles"]
};
function V(t) {
  return t.split("-")[0];
}
var J = Math.max, be = Math.min, ee = Math.round;
function De() {
  var t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function nt() {
  return !/^((?!chrome|android).)*safari/i.test(De());
}
function te(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(), o = 1, i = 1;
  e && C(t) && (o = t.offsetWidth > 0 && ee(n.width) / t.offsetWidth || 1, i = t.offsetHeight > 0 && ee(n.height) / t.offsetHeight || 1);
  var p = K(t) ? $(t) : window, f = p.visualViewport, s = !nt() && r, c = (n.left + (s && f ? f.offsetLeft : 0)) / o, a = (n.top + (s && f ? f.offsetTop : 0)) / i, l = n.width / o, h = n.height / i;
  return {
    width: l,
    height: h,
    top: a,
    right: c + l,
    bottom: a + h,
    left: c,
    x: c,
    y: a
  };
}
function ke(t) {
  var e = te(t), r = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: n
  };
}
function ot(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && je(r)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function _(t) {
  return $(t).getComputedStyle(t);
}
function $t(t) {
  return ["table", "td", "th"].indexOf(I(t)) >= 0;
}
function H(t) {
  return ((K(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function xe(t) {
  return I(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (je(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    H(t)
  );
}
function Xe(t) {
  return !C(t) || // https://github.com/popperjs/popper-core/issues/837
  _(t).position === "fixed" ? null : t.offsetParent;
}
function Mt(t) {
  var e = /firefox/i.test(De()), r = /Trident/i.test(De());
  if (r && C(t)) {
    var n = _(t);
    if (n.position === "fixed")
      return null;
  }
  var o = xe(t);
  for (je(o) && (o = o.host); C(o) && ["html", "body"].indexOf(I(o)) < 0; ) {
    var i = _(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function le(t) {
  for (var e = $(t), r = Xe(t); r && $t(r) && _(r).position === "static"; )
    r = Xe(r);
  return r && (I(r) === "html" || I(r) === "body" && _(r).position === "static") ? e : r || Mt(t) || e;
}
function Te(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ie(t, e, r) {
  return J(t, be(e, r));
}
function Vt(t, e, r) {
  var n = ie(t, e, r);
  return n > r ? r : n;
}
function at() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function it(t) {
  return Object.assign({}, at(), t);
}
function st(t, e) {
  return e.reduce(function(r, n) {
    return r[n] = t, r;
  }, {});
}
var _t = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, it(typeof e != "number" ? e : st(e, ce));
};
function It(t) {
  var e, r = t.state, n = t.name, o = t.options, i = r.elements.arrow, p = r.modifiersData.popperOffsets, f = V(r.placement), s = Te(f), c = [T, L].indexOf(f) >= 0, a = c ? "height" : "width";
  if (!(!i || !p)) {
    var l = _t(o.padding, r), h = ke(i), u = s === "y" ? k : T, b = s === "y" ? N : L, g = r.rects.reference[a] + r.rects.reference[s] - p[s] - r.rects.popper[a], m = p[s] - r.rects.reference[s], x = le(i), A = x ? s === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, E = g / 2 - m / 2, v = l[u], y = A - h[a] - l[b], d = A / 2 - h[a] / 2 + E, O = ie(v, d, y), P = s;
    r.modifiersData[n] = (e = {}, e[P] = O, e.centerOffset = O - d, e);
  }
}
function qt(t) {
  var e = t.state, r = t.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  if (o != null && !(typeof o == "string" && (o = e.elements.popper.querySelector(o), !o))) {
    if (process.env.NODE_ENV !== "production" && (C(o) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !ot(e.elements.popper, o)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    e.elements.arrow = o;
  }
}
const Wt = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: It,
  effect: qt,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function re(t) {
  return t.split("-")[1];
}
var Ht = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ft(t) {
  var e = t.x, r = t.y, n = window, o = n.devicePixelRatio || 1;
  return {
    x: ee(e * o) / o || 0,
    y: ee(r * o) / o || 0
  };
}
function Ye(t) {
  var e, r = t.popper, n = t.popperRect, o = t.placement, i = t.variation, p = t.offsets, f = t.position, s = t.gpuAcceleration, c = t.adaptive, a = t.roundOffsets, l = t.isFixed, h = p.x, u = h === void 0 ? 0 : h, b = p.y, g = b === void 0 ? 0 : b, m = typeof a == "function" ? a({
    x: u,
    y: g
  }) : {
    x: u,
    y: g
  };
  u = m.x, g = m.y;
  var x = p.hasOwnProperty("x"), A = p.hasOwnProperty("y"), E = T, v = k, y = window;
  if (c) {
    var d = le(r), O = "clientHeight", P = "clientWidth";
    if (d === $(r) && (d = H(r), _(d).position !== "static" && f === "absolute" && (O = "scrollHeight", P = "scrollWidth")), d = d, o === k || (o === T || o === L) && i === fe) {
      v = N;
      var S = l && d === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        d[O]
      );
      g -= S - n.height, g *= s ? 1 : -1;
    }
    if (o === T || (o === k || o === N) && i === fe) {
      E = L;
      var D = l && d === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        d[P]
      );
      u -= D - n.width, u *= s ? 1 : -1;
    }
  }
  var w = Object.assign({
    position: f
  }, c && Ht), R = a === !0 ? Ft({
    x: u,
    y: g
  }) : {
    x: u,
    y: g
  };
  if (u = R.x, g = R.y, s) {
    var j;
    return Object.assign({}, w, (j = {}, j[v] = A ? "0" : "", j[E] = x ? "0" : "", j.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + g + "px)" : "translate3d(" + u + "px, " + g + "px, 0)", j));
  }
  return Object.assign({}, w, (e = {}, e[v] = A ? g + "px" : "", e[E] = x ? u + "px" : "", e.transform = "", e));
}
function Xt(t) {
  var e = t.state, r = t.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, i = r.adaptive, p = i === void 0 ? !0 : i, f = r.roundOffsets, s = f === void 0 ? !0 : f;
  if (process.env.NODE_ENV !== "production") {
    var c = _(e.elements.popper).transitionProperty || "";
    p && ["transform", "top", "right", "bottom", "left"].some(function(l) {
      return c.indexOf(l) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var a = {
    placement: V(e.placement),
    variation: re(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Ye(Object.assign({}, a, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: p,
    roundOffsets: s
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ye(Object.assign({}, a, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Yt = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Xt,
  data: {}
};
var ge = {
  passive: !0
};
function Ut(t) {
  var e = t.state, r = t.instance, n = t.options, o = n.scroll, i = o === void 0 ? !0 : o, p = n.resize, f = p === void 0 ? !0 : p, s = $(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && c.forEach(function(a) {
    a.addEventListener("scroll", r.update, ge);
  }), f && s.addEventListener("resize", r.update, ge), function() {
    i && c.forEach(function(a) {
      a.removeEventListener("scroll", r.update, ge);
    }), f && s.removeEventListener("resize", r.update, ge);
  };
}
const zt = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ut,
  data: {}
};
var Gt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ye(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Gt[e];
  });
}
var Jt = {
  start: "end",
  end: "start"
};
function Ue(t) {
  return t.replace(/start|end/g, function(e) {
    return Jt[e];
  });
}
function Be(t) {
  var e = $(t), r = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Ce(t) {
  return te(H(t)).left + Be(t).scrollLeft;
}
function Kt(t, e) {
  var r = $(t), n = H(t), o = r.visualViewport, i = n.clientWidth, p = n.clientHeight, f = 0, s = 0;
  if (o) {
    i = o.width, p = o.height;
    var c = nt();
    (c || !c && e === "fixed") && (f = o.offsetLeft, s = o.offsetTop);
  }
  return {
    width: i,
    height: p,
    x: f + Ce(t),
    y: s
  };
}
function Qt(t) {
  var e, r = H(t), n = Be(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, i = J(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), p = J(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), f = -n.scrollLeft + Ce(t), s = -n.scrollTop;
  return _(o || r).direction === "rtl" && (f += J(r.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: p,
    x: f,
    y: s
  };
}
function Ne(t) {
  var e = _(t), r = e.overflow, n = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function ft(t) {
  return ["html", "body", "#document"].indexOf(I(t)) >= 0 ? t.ownerDocument.body : C(t) && Ne(t) ? t : ft(xe(t));
}
function se(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = ft(t), o = n === ((r = t.ownerDocument) == null ? void 0 : r.body), i = $(n), p = o ? [i].concat(i.visualViewport || [], Ne(n) ? n : []) : n, f = e.concat(p);
  return o ? f : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    f.concat(se(xe(p)))
  );
}
function Re(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Zt(t, e) {
  var r = te(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ze(t, e, r) {
  return e === tt ? Re(Kt(t, r)) : K(e) ? Zt(e, r) : Re(Qt(H(t)));
}
function er(t) {
  var e = se(xe(t)), r = ["absolute", "fixed"].indexOf(_(t).position) >= 0, n = r && C(t) ? le(t) : t;
  return K(n) ? e.filter(function(o) {
    return K(o) && ot(o, n) && I(o) !== "body";
  }) : [];
}
function tr(t, e, r, n) {
  var o = e === "clippingParents" ? er(t) : [].concat(e), i = [].concat(o, [r]), p = i[0], f = i.reduce(function(s, c) {
    var a = ze(t, c, n);
    return s.top = J(a.top, s.top), s.right = be(a.right, s.right), s.bottom = be(a.bottom, s.bottom), s.left = J(a.left, s.left), s;
  }, ze(t, p, n));
  return f.width = f.right - f.left, f.height = f.bottom - f.top, f.x = f.left, f.y = f.top, f;
}
function pt(t) {
  var e = t.reference, r = t.element, n = t.placement, o = n ? V(n) : null, i = n ? re(n) : null, p = e.x + e.width / 2 - r.width / 2, f = e.y + e.height / 2 - r.height / 2, s;
  switch (o) {
    case k:
      s = {
        x: p,
        y: e.y - r.height
      };
      break;
    case N:
      s = {
        x: p,
        y: e.y + e.height
      };
      break;
    case L:
      s = {
        x: e.x + e.width,
        y: f
      };
      break;
    case T:
      s = {
        x: e.x - r.width,
        y: f
      };
      break;
    default:
      s = {
        x: e.x,
        y: e.y
      };
  }
  var c = o ? Te(o) : null;
  if (c != null) {
    var a = c === "y" ? "height" : "width";
    switch (i) {
      case Z:
        s[c] = s[c] - (e[a] / 2 - r[a] / 2);
        break;
      case fe:
        s[c] = s[c] + (e[a] / 2 - r[a] / 2);
        break;
    }
  }
  return s;
}
function pe(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, o = n === void 0 ? t.placement : n, i = r.strategy, p = i === void 0 ? t.strategy : i, f = r.boundary, s = f === void 0 ? Ot : f, c = r.rootBoundary, a = c === void 0 ? tt : c, l = r.elementContext, h = l === void 0 ? ae : l, u = r.altBoundary, b = u === void 0 ? !1 : u, g = r.padding, m = g === void 0 ? 0 : g, x = it(typeof m != "number" ? m : st(m, ce)), A = h === ae ? Et : ae, E = t.rects.popper, v = t.elements[b ? A : h], y = tr(K(v) ? v : v.contextElement || H(t.elements.popper), s, a, p), d = te(t.elements.reference), O = pt({
    reference: d,
    element: E,
    strategy: "absolute",
    placement: o
  }), P = Re(Object.assign({}, E, O)), S = h === ae ? P : d, D = {
    top: y.top - S.top + x.top,
    bottom: S.bottom - y.bottom + x.bottom,
    left: y.left - S.left + x.left,
    right: S.right - y.right + x.right
  }, w = t.modifiersData.offset;
  if (h === ae && w) {
    var R = w[o];
    Object.keys(D).forEach(function(j) {
      var F = [L, N].indexOf(j) >= 0 ? 1 : -1, X = [k, N].indexOf(j) >= 0 ? "y" : "x";
      D[j] += R[X] * F;
    });
  }
  return D;
}
function rr(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, o = r.boundary, i = r.rootBoundary, p = r.padding, f = r.flipVariations, s = r.allowedAutoPlacements, c = s === void 0 ? rt : s, a = re(n), l = a ? f ? Fe : Fe.filter(function(b) {
    return re(b) === a;
  }) : ce, h = l.filter(function(b) {
    return c.indexOf(b) >= 0;
  });
  h.length === 0 && (h = l, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var u = h.reduce(function(b, g) {
    return b[g] = pe(t, {
      placement: g,
      boundary: o,
      rootBoundary: i,
      padding: p
    })[V(g)], b;
  }, {});
  return Object.keys(u).sort(function(b, g) {
    return u[b] - u[g];
  });
}
function nr(t) {
  if (V(t) === we)
    return [];
  var e = ye(t);
  return [Ue(t), e, Ue(e)];
}
function or(t) {
  var e = t.state, r = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var o = r.mainAxis, i = o === void 0 ? !0 : o, p = r.altAxis, f = p === void 0 ? !0 : p, s = r.fallbackPlacements, c = r.padding, a = r.boundary, l = r.rootBoundary, h = r.altBoundary, u = r.flipVariations, b = u === void 0 ? !0 : u, g = r.allowedAutoPlacements, m = e.options.placement, x = V(m), A = x === m, E = s || (A || !b ? [ye(m)] : nr(m)), v = [m].concat(E).reduce(function(Q, q) {
      return Q.concat(V(q) === we ? rr(e, {
        placement: q,
        boundary: a,
        rootBoundary: l,
        padding: c,
        flipVariations: b,
        allowedAutoPlacements: g
      }) : q);
    }, []), y = e.rects.reference, d = e.rects.popper, O = /* @__PURE__ */ new Map(), P = !0, S = v[0], D = 0; D < v.length; D++) {
      var w = v[D], R = V(w), j = re(w) === Z, F = [k, N].indexOf(R) >= 0, X = F ? "width" : "height", B = pe(e, {
        placement: w,
        boundary: a,
        rootBoundary: l,
        altBoundary: h,
        padding: c
      }), M = F ? j ? L : T : j ? N : k;
      y[X] > d[X] && (M = ye(M));
      var ue = ye(M), Y = [];
      if (i && Y.push(B[R] <= 0), f && Y.push(B[M] <= 0, B[ue] <= 0), Y.every(function(Q) {
        return Q;
      })) {
        S = w, P = !1;
        break;
      }
      O.set(w, Y);
    }
    if (P)
      for (var ve = b ? 3 : 1, Oe = function(q) {
        var oe = v.find(function(he) {
          var U = O.get(he);
          if (U)
            return U.slice(0, q).every(function(Ee) {
              return Ee;
            });
        });
        if (oe)
          return S = oe, "break";
      }, ne = ve; ne > 0; ne--) {
        var de = Oe(ne);
        if (de === "break")
          break;
      }
    e.placement !== S && (e.modifiersData[n]._skip = !0, e.placement = S, e.reset = !0);
  }
}
const ar = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: or,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ge(t, e, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - r.y,
    right: t.right - e.width + r.x,
    bottom: t.bottom - e.height + r.y,
    left: t.left - e.width - r.x
  };
}
function Je(t) {
  return [k, L, N, T].some(function(e) {
    return t[e] >= 0;
  });
}
function ir(t) {
  var e = t.state, r = t.name, n = e.rects.reference, o = e.rects.popper, i = e.modifiersData.preventOverflow, p = pe(e, {
    elementContext: "reference"
  }), f = pe(e, {
    altBoundary: !0
  }), s = Ge(p, n), c = Ge(f, o, i), a = Je(s), l = Je(c);
  e.modifiersData[r] = {
    referenceClippingOffsets: s,
    popperEscapeOffsets: c,
    isReferenceHidden: a,
    hasPopperEscaped: l
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": a,
    "data-popper-escaped": l
  });
}
const sr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ir
};
function fr(t, e, r) {
  var n = V(t), o = [T, k].indexOf(n) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, p = i[0], f = i[1];
  return p = p || 0, f = (f || 0) * o, [T, L].indexOf(n) >= 0 ? {
    x: f,
    y: p
  } : {
    x: p,
    y: f
  };
}
function pr(t) {
  var e = t.state, r = t.options, n = t.name, o = r.offset, i = o === void 0 ? [0, 0] : o, p = rt.reduce(function(a, l) {
    return a[l] = fr(l, e.rects, i), a;
  }, {}), f = p[e.placement], s = f.x, c = f.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += s, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = p;
}
const cr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: pr
};
function lr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = pt({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const ur = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: lr,
  data: {}
};
function vr(t) {
  return t === "x" ? "y" : "x";
}
function dr(t) {
  var e = t.state, r = t.options, n = t.name, o = r.mainAxis, i = o === void 0 ? !0 : o, p = r.altAxis, f = p === void 0 ? !1 : p, s = r.boundary, c = r.rootBoundary, a = r.altBoundary, l = r.padding, h = r.tether, u = h === void 0 ? !0 : h, b = r.tetherOffset, g = b === void 0 ? 0 : b, m = pe(e, {
    boundary: s,
    rootBoundary: c,
    padding: l,
    altBoundary: a
  }), x = V(e.placement), A = re(e.placement), E = !A, v = Te(x), y = vr(v), d = e.modifiersData.popperOffsets, O = e.rects.reference, P = e.rects.popper, S = typeof g == "function" ? g(Object.assign({}, e.rects, {
    placement: e.placement
  })) : g, D = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), w = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (d) {
    if (i) {
      var j, F = v === "y" ? k : T, X = v === "y" ? N : L, B = v === "y" ? "height" : "width", M = d[v], ue = M + m[F], Y = M - m[X], ve = u ? -P[B] / 2 : 0, Oe = A === Z ? O[B] : P[B], ne = A === Z ? -P[B] : -O[B], de = e.elements.arrow, Q = u && de ? ke(de) : {
        width: 0,
        height: 0
      }, q = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : at(), oe = q[F], he = q[X], U = ie(0, O[B], Q[B]), Ee = E ? O[B] / 2 - ve - U - oe - D.mainAxis : Oe - U - oe - D.mainAxis, ct = E ? -O[B] / 2 + ve + U + he + D.mainAxis : ne + U + he + D.mainAxis, Ae = e.elements.arrow && le(e.elements.arrow), lt = Ae ? v === "y" ? Ae.clientTop || 0 : Ae.clientLeft || 0 : 0, Le = (j = w == null ? void 0 : w[v]) != null ? j : 0, ut = M + Ee - Le - lt, vt = M + ct - Le, $e = ie(u ? be(ue, ut) : ue, M, u ? J(Y, vt) : Y);
      d[v] = $e, R[v] = $e - M;
    }
    if (f) {
      var Me, dt = v === "x" ? k : T, ht = v === "x" ? N : L, z = d[y], me = y === "y" ? "height" : "width", Ve = z + m[dt], _e = z - m[ht], Pe = [k, T].indexOf(x) !== -1, Ie = (Me = w == null ? void 0 : w[y]) != null ? Me : 0, qe = Pe ? Ve : z - O[me] - P[me] - Ie + D.altAxis, We = Pe ? z + O[me] + P[me] - Ie - D.altAxis : _e, He = u && Pe ? Vt(qe, z, We) : ie(u ? qe : Ve, z, u ? We : _e);
      d[y] = He, R[y] = He - z;
    }
    e.modifiersData[n] = R;
  }
}
const hr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: dr,
  requiresIfExists: ["offset"]
};
function mr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function gr(t) {
  return t === $(t) || !C(t) ? Be(t) : mr(t);
}
function yr(t) {
  var e = t.getBoundingClientRect(), r = ee(e.width) / t.offsetWidth || 1, n = ee(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function br(t, e, r) {
  r === void 0 && (r = !1);
  var n = C(e), o = C(e) && yr(e), i = H(e), p = te(t, o, r), f = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((I(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ne(i)) && (f = gr(e)), C(e) ? (s = te(e, !0), s.x += e.clientLeft, s.y += e.clientTop) : i && (s.x = Ce(i))), {
    x: p.left + f.scrollLeft - s.x,
    y: p.top + f.scrollTop - s.y,
    width: p.width,
    height: p.height
  };
}
function wr(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function o(i) {
    r.add(i.name);
    var p = [].concat(i.requires || [], i.requiresIfExists || []);
    p.forEach(function(f) {
      if (!r.has(f)) {
        var s = e.get(f);
        s && o(s);
      }
    }), n.push(i);
  }
  return t.forEach(function(i) {
    r.has(i.name) || o(i);
  }), n;
}
function xr(t) {
  var e = wr(t);
  return Se.reduce(function(r, n) {
    return r.concat(e.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Or(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function W(t) {
  for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    r[n - 1] = arguments[n];
  return [].concat(r).reduce(function(o, i) {
    return o.replace(/%s/, i);
  }, t);
}
var G = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Er = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', Ke = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Ar(t) {
  t.forEach(function(e) {
    [].concat(Object.keys(e), Ke).filter(function(r, n, o) {
      return o.indexOf(r) === n;
    }).forEach(function(r) {
      switch (r) {
        case "name":
          typeof e.name != "string" && console.error(W(G, String(e.name), '"name"', '"string"', '"' + String(e.name) + '"'));
          break;
        case "enabled":
          typeof e.enabled != "boolean" && console.error(W(G, e.name, '"enabled"', '"boolean"', '"' + String(e.enabled) + '"'));
          break;
        case "phase":
          Se.indexOf(e.phase) < 0 && console.error(W(G, e.name, '"phase"', "either " + Se.join(", "), '"' + String(e.phase) + '"'));
          break;
        case "fn":
          typeof e.fn != "function" && console.error(W(G, e.name, '"fn"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "effect":
          e.effect != null && typeof e.effect != "function" && console.error(W(G, e.name, '"effect"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "requires":
          e.requires != null && !Array.isArray(e.requires) && console.error(W(G, e.name, '"requires"', '"array"', '"' + String(e.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(e.requiresIfExists) || console.error(W(G, e.name, '"requiresIfExists"', '"array"', '"' + String(e.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + e.name + '" modifier, valid properties are ' + Ke.map(function(n) {
            return '"' + n + '"';
          }).join(", ") + '; but "' + r + '" was provided.');
      }
      e.requires && e.requires.forEach(function(n) {
        t.find(function(o) {
          return o.name === n;
        }) == null && console.error(W(Er, String(e.name), n, n));
      });
    });
  });
}
function Pr(t, e) {
  var r = /* @__PURE__ */ new Set();
  return t.filter(function(n) {
    var o = e(n);
    if (!r.has(o))
      return r.add(o), !0;
  });
}
function Sr(t) {
  var e = t.reduce(function(r, n) {
    var o = r[n.name];
    return r[n.name] = o ? Object.assign({}, o, n, {
      options: Object.assign({}, o.options, n.options),
      data: Object.assign({}, o.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(e).map(function(r) {
    return e[r];
  });
}
var Qe = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", Dr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", Ze = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function et() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Rr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, n = r === void 0 ? [] : r, o = e.defaultOptions, i = o === void 0 ? Ze : o;
  return function(f, s, c) {
    c === void 0 && (c = i);
    var a = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ze, i),
      modifiersData: {},
      elements: {
        reference: f,
        popper: s
      },
      attributes: {},
      styles: {}
    }, l = [], h = !1, u = {
      state: a,
      setOptions: function(x) {
        var A = typeof x == "function" ? x(a.options) : x;
        g(), a.options = Object.assign({}, i, a.options, A), a.scrollParents = {
          reference: K(f) ? se(f) : f.contextElement ? se(f.contextElement) : [],
          popper: se(s)
        };
        var E = xr(Sr([].concat(n, a.options.modifiers)));
        if (a.orderedModifiers = E.filter(function(w) {
          return w.enabled;
        }), process.env.NODE_ENV !== "production") {
          var v = Pr([].concat(E, a.options.modifiers), function(w) {
            var R = w.name;
            return R;
          });
          if (Ar(v), V(a.options.placement) === we) {
            var y = a.orderedModifiers.find(function(w) {
              var R = w.name;
              return R === "flip";
            });
            y || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var d = _(s), O = d.marginTop, P = d.marginRight, S = d.marginBottom, D = d.marginLeft;
          [O, P, S, D].some(function(w) {
            return parseFloat(w);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return b(), u.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!h) {
          var x = a.elements, A = x.reference, E = x.popper;
          if (!et(A, E)) {
            process.env.NODE_ENV !== "production" && console.error(Qe);
            return;
          }
          a.rects = {
            reference: br(A, le(E), a.options.strategy === "fixed"),
            popper: ke(E)
          }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach(function(w) {
            return a.modifiersData[w.name] = Object.assign({}, w.data);
          });
          for (var v = 0, y = 0; y < a.orderedModifiers.length; y++) {
            if (process.env.NODE_ENV !== "production" && (v += 1, v > 100)) {
              console.error(Dr);
              break;
            }
            if (a.reset === !0) {
              a.reset = !1, y = -1;
              continue;
            }
            var d = a.orderedModifiers[y], O = d.fn, P = d.options, S = P === void 0 ? {} : P, D = d.name;
            typeof O == "function" && (a = O({
              state: a,
              options: S,
              name: D,
              instance: u
            }) || a);
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Or(function() {
        return new Promise(function(m) {
          u.forceUpdate(), m(a);
        });
      }),
      destroy: function() {
        g(), h = !0;
      }
    };
    if (!et(f, s))
      return process.env.NODE_ENV !== "production" && console.error(Qe), u;
    u.setOptions(c).then(function(m) {
      !h && c.onFirstUpdate && c.onFirstUpdate(m);
    });
    function b() {
      a.orderedModifiers.forEach(function(m) {
        var x = m.name, A = m.options, E = A === void 0 ? {} : A, v = m.effect;
        if (typeof v == "function") {
          var y = v({
            state: a,
            name: x,
            instance: u,
            options: E
          }), d = function() {
          };
          l.push(y || d);
        }
      });
    }
    function g() {
      l.forEach(function(m) {
        return m();
      }), l = [];
    }
    return u;
  };
}
var jr = [zt, ur, Yt, Lt, cr, ar, hr, Wt, sr], kr = /* @__PURE__ */ Rr({
  defaultModifiers: jr
});
const Tr = /* @__PURE__ */ mt({
  __name: "tooltip",
  props: {
    text: null,
    placement: { default: "auto" },
    tooltipStyle: null,
    theme: { default: "dark" },
    line: { default: 1 }
  },
  setup(t) {
    const e = t;
    let r = null;
    const n = gt(null);
    yt(() => {
      var a;
      if (r = document.querySelector("#v-tooltip"), !r) {
        r = document.createElement("div"), r.setAttribute("id", "v-tooltip"), r.addEventListener("mouseenter", s), r.addEventListener("mouseleave", f);
        const l = document.querySelector("body");
        l == null || l.appendChild(r);
      }
      (a = n.value) == null || a.style.setProperty("-webkit-line-clamp", String(e.line));
    });
    function o(a) {
      const l = a.target, h = document.createRange();
      h.setStart(l, 0), h.setEnd(l, l.childNodes.length);
      const u = h.getBoundingClientRect(), b = l.getBoundingClientRect();
      (u.width > b.width || u.height > b.height) && p(l);
    }
    function i() {
      f();
    }
    function p(a) {
      s(), r.classList.remove("light", "dark"), r.classList.add(e.theme), r.innerHTML = `${e.text ?? a.innerText}<div id="v-arrow" data-popper-arrow></div>`, e.tooltipStyle && Object.entries(e.tooltipStyle).forEach((l) => {
        c(r, ...l);
      }), kr(a, r, {
        placement: e.placement
      });
    }
    function f() {
      r.style.display = "none";
    }
    function s() {
      r.style.display = "block";
    }
    function c(a, l, h) {
      a.style[l] = h;
    }
    return (a, l) => (bt(), wt("div", {
      ref_key: "tooltipRef",
      ref: n,
      class: "v-tooltip-ref",
      onMouseenter: o,
      onMouseleave: i
    }, [
      xt(a.$slots, "default", {}, void 0, !0)
    ], 544));
  }
});
const Br = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, o] of e)
    r[n] = o;
  return r;
}, Nr = /* @__PURE__ */ Br(Tr, [["__scopeId", "data-v-e6d1441f"]]);
export {
  Nr as default
};
(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('#v-tooltip{max-width:300px;background:#212121;box-shadow:0 -2px 4px #00000005,0 2px 6px 6px #00000005,0 2px 6px #0000000a;color:#fff;padding:4px 8px;font-size:14px;border-radius:4px;word-wrap:break-word;display:none}#v-tooltip.light{background:#fff;color:#000000d6}#v-arrow,#v-arrow:before{position:absolute;width:8px;height:8px;background:inherit}#v-arrow{visibility:hidden}#v-arrow:before{visibility:visible;content:"";transform:rotate(45deg)}#v-tooltip[data-popper-placement^=top]>#v-arrow{bottom:-4px}#v-tooltip[data-popper-placement^=bottom]>#v-arrow{top:-4px}#v-tooltip[data-popper-placement^=left]>#v-arrow{right:-4px}#v-tooltip[data-popper-placement^=right]>#v-arrow{left:-4px}.v-tooltip-ref[data-v-e6d1441f]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;word-break:break-all}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
