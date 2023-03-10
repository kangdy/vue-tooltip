import { defineComponent as gt, ref as yt, onMounted as bt, openBlock as wt, createElementBlock as xt, renderSlot as Ot } from "vue";
var k = "top", N = "bottom", L = "right", T = "left", we = "auto", ce = [k, N, L, T], Z = "start", fe = "end", Et = "clippingParents", rt = "viewport", ae = "popper", At = "reference", Xe = /* @__PURE__ */ ce.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + fe]);
}, []), nt = /* @__PURE__ */ [].concat(ce, [we]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + fe]);
}, []), Pt = "beforeRead", St = "read", Dt = "afterRead", Rt = "beforeMain", jt = "main", kt = "afterMain", Tt = "beforeWrite", Bt = "write", Ct = "afterWrite", De = [Pt, St, Dt, Rt, jt, kt, Tt, Bt, Ct];
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
function ke(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = $(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Nt(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var n = e.styles[r] || {}, o = e.attributes[r] || {}, i = e.elements[r];
    !C(i) || !I(i) || (Object.assign(i.style, n), Object.keys(o).forEach(function(p) {
      var f = o[p];
      f === !1 ? i.removeAttribute(p) : i.setAttribute(p, f === !0 ? "" : f);
    }));
  });
}
function Lt(t) {
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
const $t = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Nt,
  effect: Lt,
  requires: ["computeStyles"]
};
function _(t) {
  return t.split("-")[0];
}
var J = Math.max, be = Math.min, ee = Math.round;
function Re() {
  var t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ot() {
  return !/^((?!chrome|android).)*safari/i.test(Re());
}
function te(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(), o = 1, i = 1;
  e && C(t) && (o = t.offsetWidth > 0 && ee(n.width) / t.offsetWidth || 1, i = t.offsetHeight > 0 && ee(n.height) / t.offsetHeight || 1);
  var p = K(t) ? $(t) : window, f = p.visualViewport, s = !ot() && r, c = (n.left + (s && f ? f.offsetLeft : 0)) / o, a = (n.top + (s && f ? f.offsetTop : 0)) / i, l = n.width / o, h = n.height / i;
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
function Te(t) {
  var e = te(t), r = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: n
  };
}
function at(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && ke(r)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function V(t) {
  return $(t).getComputedStyle(t);
}
function Mt(t) {
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
    (ke(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    H(t)
  );
}
function Ye(t) {
  return !C(t) || // https://github.com/popperjs/popper-core/issues/837
  V(t).position === "fixed" ? null : t.offsetParent;
}
function _t(t) {
  var e = /firefox/i.test(Re()), r = /Trident/i.test(Re());
  if (r && C(t)) {
    var n = V(t);
    if (n.position === "fixed")
      return null;
  }
  var o = xe(t);
  for (ke(o) && (o = o.host); C(o) && ["html", "body"].indexOf(I(o)) < 0; ) {
    var i = V(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function le(t) {
  for (var e = $(t), r = Ye(t); r && Mt(r) && V(r).position === "static"; )
    r = Ye(r);
  return r && (I(r) === "html" || I(r) === "body" && V(r).position === "static") ? e : r || _t(t) || e;
}
function Be(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ie(t, e, r) {
  return J(t, be(e, r));
}
function Vt(t, e, r) {
  var n = ie(t, e, r);
  return n > r ? r : n;
}
function it() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function st(t) {
  return Object.assign({}, it(), t);
}
function ft(t, e) {
  return e.reduce(function(r, n) {
    return r[n] = t, r;
  }, {});
}
var It = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, st(typeof e != "number" ? e : ft(e, ce));
};
function qt(t) {
  var e, r = t.state, n = t.name, o = t.options, i = r.elements.arrow, p = r.modifiersData.popperOffsets, f = _(r.placement), s = Be(f), c = [T, L].indexOf(f) >= 0, a = c ? "height" : "width";
  if (!(!i || !p)) {
    var l = It(o.padding, r), h = Te(i), u = s === "y" ? k : T, b = s === "y" ? N : L, g = r.rects.reference[a] + r.rects.reference[s] - p[s] - r.rects.popper[a], m = p[s] - r.rects.reference[s], x = le(i), A = x ? s === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, E = g / 2 - m / 2, v = l[u], y = A - h[a] - l[b], d = A / 2 - h[a] / 2 + E, O = ie(v, d, y), P = s;
    r.modifiersData[n] = (e = {}, e[P] = O, e.centerOffset = O - d, e);
  }
}
function Wt(t) {
  var e = t.state, r = t.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  if (o != null && !(typeof o == "string" && (o = e.elements.popper.querySelector(o), !o))) {
    if (process.env.NODE_ENV !== "production" && (C(o) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !at(e.elements.popper, o)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    e.elements.arrow = o;
  }
}
const Ht = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: qt,
  effect: Wt,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function re(t) {
  return t.split("-")[1];
}
var Ft = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Xt(t) {
  var e = t.x, r = t.y, n = window, o = n.devicePixelRatio || 1;
  return {
    x: ee(e * o) / o || 0,
    y: ee(r * o) / o || 0
  };
}
function Ue(t) {
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
    if (d === $(r) && (d = H(r), V(d).position !== "static" && f === "absolute" && (O = "scrollHeight", P = "scrollWidth")), d = d, o === k || (o === T || o === L) && i === fe) {
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
  }, c && Ft), R = a === !0 ? Xt({
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
function Yt(t) {
  var e = t.state, r = t.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, i = r.adaptive, p = i === void 0 ? !0 : i, f = r.roundOffsets, s = f === void 0 ? !0 : f;
  if (process.env.NODE_ENV !== "production") {
    var c = V(e.elements.popper).transitionProperty || "";
    p && ["transform", "top", "right", "bottom", "left"].some(function(l) {
      return c.indexOf(l) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var a = {
    placement: _(e.placement),
    variation: re(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Ue(Object.assign({}, a, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: p,
    roundOffsets: s
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ue(Object.assign({}, a, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Ut = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Yt,
  data: {}
};
var ge = {
  passive: !0
};
function zt(t) {
  var e = t.state, r = t.instance, n = t.options, o = n.scroll, i = o === void 0 ? !0 : o, p = n.resize, f = p === void 0 ? !0 : p, s = $(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && c.forEach(function(a) {
    a.addEventListener("scroll", r.update, ge);
  }), f && s.addEventListener("resize", r.update, ge), function() {
    i && c.forEach(function(a) {
      a.removeEventListener("scroll", r.update, ge);
    }), f && s.removeEventListener("resize", r.update, ge);
  };
}
const Gt = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: zt,
  data: {}
};
var Jt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ye(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Jt[e];
  });
}
var Kt = {
  start: "end",
  end: "start"
};
function ze(t) {
  return t.replace(/start|end/g, function(e) {
    return Kt[e];
  });
}
function Ce(t) {
  var e = $(t), r = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Ne(t) {
  return te(H(t)).left + Ce(t).scrollLeft;
}
function Qt(t, e) {
  var r = $(t), n = H(t), o = r.visualViewport, i = n.clientWidth, p = n.clientHeight, f = 0, s = 0;
  if (o) {
    i = o.width, p = o.height;
    var c = ot();
    (c || !c && e === "fixed") && (f = o.offsetLeft, s = o.offsetTop);
  }
  return {
    width: i,
    height: p,
    x: f + Ne(t),
    y: s
  };
}
function Zt(t) {
  var e, r = H(t), n = Ce(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, i = J(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), p = J(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), f = -n.scrollLeft + Ne(t), s = -n.scrollTop;
  return V(o || r).direction === "rtl" && (f += J(r.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: p,
    x: f,
    y: s
  };
}
function Le(t) {
  var e = V(t), r = e.overflow, n = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function pt(t) {
  return ["html", "body", "#document"].indexOf(I(t)) >= 0 ? t.ownerDocument.body : C(t) && Le(t) ? t : pt(xe(t));
}
function se(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = pt(t), o = n === ((r = t.ownerDocument) == null ? void 0 : r.body), i = $(n), p = o ? [i].concat(i.visualViewport || [], Le(n) ? n : []) : n, f = e.concat(p);
  return o ? f : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    f.concat(se(xe(p)))
  );
}
function je(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function er(t, e) {
  var r = te(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function Ge(t, e, r) {
  return e === rt ? je(Qt(t, r)) : K(e) ? er(e, r) : je(Zt(H(t)));
}
function tr(t) {
  var e = se(xe(t)), r = ["absolute", "fixed"].indexOf(V(t).position) >= 0, n = r && C(t) ? le(t) : t;
  return K(n) ? e.filter(function(o) {
    return K(o) && at(o, n) && I(o) !== "body";
  }) : [];
}
function rr(t, e, r, n) {
  var o = e === "clippingParents" ? tr(t) : [].concat(e), i = [].concat(o, [r]), p = i[0], f = i.reduce(function(s, c) {
    var a = Ge(t, c, n);
    return s.top = J(a.top, s.top), s.right = be(a.right, s.right), s.bottom = be(a.bottom, s.bottom), s.left = J(a.left, s.left), s;
  }, Ge(t, p, n));
  return f.width = f.right - f.left, f.height = f.bottom - f.top, f.x = f.left, f.y = f.top, f;
}
function ct(t) {
  var e = t.reference, r = t.element, n = t.placement, o = n ? _(n) : null, i = n ? re(n) : null, p = e.x + e.width / 2 - r.width / 2, f = e.y + e.height / 2 - r.height / 2, s;
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
  var c = o ? Be(o) : null;
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
  var r = e, n = r.placement, o = n === void 0 ? t.placement : n, i = r.strategy, p = i === void 0 ? t.strategy : i, f = r.boundary, s = f === void 0 ? Et : f, c = r.rootBoundary, a = c === void 0 ? rt : c, l = r.elementContext, h = l === void 0 ? ae : l, u = r.altBoundary, b = u === void 0 ? !1 : u, g = r.padding, m = g === void 0 ? 0 : g, x = st(typeof m != "number" ? m : ft(m, ce)), A = h === ae ? At : ae, E = t.rects.popper, v = t.elements[b ? A : h], y = rr(K(v) ? v : v.contextElement || H(t.elements.popper), s, a, p), d = te(t.elements.reference), O = ct({
    reference: d,
    element: E,
    strategy: "absolute",
    placement: o
  }), P = je(Object.assign({}, E, O)), S = h === ae ? P : d, D = {
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
function nr(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, o = r.boundary, i = r.rootBoundary, p = r.padding, f = r.flipVariations, s = r.allowedAutoPlacements, c = s === void 0 ? nt : s, a = re(n), l = a ? f ? Xe : Xe.filter(function(b) {
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
    })[_(g)], b;
  }, {});
  return Object.keys(u).sort(function(b, g) {
    return u[b] - u[g];
  });
}
function or(t) {
  if (_(t) === we)
    return [];
  var e = ye(t);
  return [ze(t), e, ze(e)];
}
function ar(t) {
  var e = t.state, r = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var o = r.mainAxis, i = o === void 0 ? !0 : o, p = r.altAxis, f = p === void 0 ? !0 : p, s = r.fallbackPlacements, c = r.padding, a = r.boundary, l = r.rootBoundary, h = r.altBoundary, u = r.flipVariations, b = u === void 0 ? !0 : u, g = r.allowedAutoPlacements, m = e.options.placement, x = _(m), A = x === m, E = s || (A || !b ? [ye(m)] : or(m)), v = [m].concat(E).reduce(function(Q, q) {
      return Q.concat(_(q) === we ? nr(e, {
        placement: q,
        boundary: a,
        rootBoundary: l,
        padding: c,
        flipVariations: b,
        allowedAutoPlacements: g
      }) : q);
    }, []), y = e.rects.reference, d = e.rects.popper, O = /* @__PURE__ */ new Map(), P = !0, S = v[0], D = 0; D < v.length; D++) {
      var w = v[D], R = _(w), j = re(w) === Z, F = [k, N].indexOf(R) >= 0, X = F ? "width" : "height", B = pe(e, {
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
const ir = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ar,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Je(t, e, r) {
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
function Ke(t) {
  return [k, L, N, T].some(function(e) {
    return t[e] >= 0;
  });
}
function sr(t) {
  var e = t.state, r = t.name, n = e.rects.reference, o = e.rects.popper, i = e.modifiersData.preventOverflow, p = pe(e, {
    elementContext: "reference"
  }), f = pe(e, {
    altBoundary: !0
  }), s = Je(p, n), c = Je(f, o, i), a = Ke(s), l = Ke(c);
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
const fr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: sr
};
function pr(t, e, r) {
  var n = _(t), o = [T, k].indexOf(n) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, e, {
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
function cr(t) {
  var e = t.state, r = t.options, n = t.name, o = r.offset, i = o === void 0 ? [0, 0] : o, p = nt.reduce(function(a, l) {
    return a[l] = pr(l, e.rects, i), a;
  }, {}), f = p[e.placement], s = f.x, c = f.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += s, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = p;
}
const lr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: cr
};
function ur(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = ct({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const vr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ur,
  data: {}
};
function dr(t) {
  return t === "x" ? "y" : "x";
}
function hr(t) {
  var e = t.state, r = t.options, n = t.name, o = r.mainAxis, i = o === void 0 ? !0 : o, p = r.altAxis, f = p === void 0 ? !1 : p, s = r.boundary, c = r.rootBoundary, a = r.altBoundary, l = r.padding, h = r.tether, u = h === void 0 ? !0 : h, b = r.tetherOffset, g = b === void 0 ? 0 : b, m = pe(e, {
    boundary: s,
    rootBoundary: c,
    padding: l,
    altBoundary: a
  }), x = _(e.placement), A = re(e.placement), E = !A, v = Be(x), y = dr(v), d = e.modifiersData.popperOffsets, O = e.rects.reference, P = e.rects.popper, S = typeof g == "function" ? g(Object.assign({}, e.rects, {
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
      var j, F = v === "y" ? k : T, X = v === "y" ? N : L, B = v === "y" ? "height" : "width", M = d[v], ue = M + m[F], Y = M - m[X], ve = u ? -P[B] / 2 : 0, Oe = A === Z ? O[B] : P[B], ne = A === Z ? -P[B] : -O[B], de = e.elements.arrow, Q = u && de ? Te(de) : {
        width: 0,
        height: 0
      }, q = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : it(), oe = q[F], he = q[X], U = ie(0, O[B], Q[B]), Ee = E ? O[B] / 2 - ve - U - oe - D.mainAxis : Oe - U - oe - D.mainAxis, lt = E ? -O[B] / 2 + ve + U + he + D.mainAxis : ne + U + he + D.mainAxis, Ae = e.elements.arrow && le(e.elements.arrow), ut = Ae ? v === "y" ? Ae.clientTop || 0 : Ae.clientLeft || 0 : 0, $e = (j = w == null ? void 0 : w[v]) != null ? j : 0, vt = M + Ee - $e - ut, dt = M + lt - $e, Me = ie(u ? be(ue, vt) : ue, M, u ? J(Y, dt) : Y);
      d[v] = Me, R[v] = Me - M;
    }
    if (f) {
      var _e, ht = v === "x" ? k : T, mt = v === "x" ? N : L, z = d[y], me = y === "y" ? "height" : "width", Ve = z + m[ht], Ie = z - m[mt], Pe = [k, T].indexOf(x) !== -1, qe = (_e = w == null ? void 0 : w[y]) != null ? _e : 0, We = Pe ? Ve : z - O[me] - P[me] - qe + D.altAxis, He = Pe ? z + O[me] + P[me] - qe - D.altAxis : Ie, Fe = u && Pe ? Vt(We, z, He) : ie(u ? We : Ve, z, u ? He : Ie);
      d[y] = Fe, R[y] = Fe - z;
    }
    e.modifiersData[n] = R;
  }
}
const mr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: hr,
  requiresIfExists: ["offset"]
};
function gr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function yr(t) {
  return t === $(t) || !C(t) ? Ce(t) : gr(t);
}
function br(t) {
  var e = t.getBoundingClientRect(), r = ee(e.width) / t.offsetWidth || 1, n = ee(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function wr(t, e, r) {
  r === void 0 && (r = !1);
  var n = C(e), o = C(e) && br(e), i = H(e), p = te(t, o, r), f = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((I(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Le(i)) && (f = yr(e)), C(e) ? (s = te(e, !0), s.x += e.clientLeft, s.y += e.clientTop) : i && (s.x = Ne(i))), {
    x: p.left + f.scrollLeft - s.x,
    y: p.top + f.scrollTop - s.y,
    width: p.width,
    height: p.height
  };
}
function xr(t) {
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
function Or(t) {
  var e = xr(t);
  return De.reduce(function(r, n) {
    return r.concat(e.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Er(t) {
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
var G = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Ar = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', Qe = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Pr(t) {
  t.forEach(function(e) {
    [].concat(Object.keys(e), Qe).filter(function(r, n, o) {
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
          De.indexOf(e.phase) < 0 && console.error(W(G, e.name, '"phase"', "either " + De.join(", "), '"' + String(e.phase) + '"'));
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
          console.error('PopperJS: an invalid property has been provided to the "' + e.name + '" modifier, valid properties are ' + Qe.map(function(n) {
            return '"' + n + '"';
          }).join(", ") + '; but "' + r + '" was provided.');
      }
      e.requires && e.requires.forEach(function(n) {
        t.find(function(o) {
          return o.name === n;
        }) == null && console.error(W(Ar, String(e.name), n, n));
      });
    });
  });
}
function Sr(t, e) {
  var r = /* @__PURE__ */ new Set();
  return t.filter(function(n) {
    var o = e(n);
    if (!r.has(o))
      return r.add(o), !0;
  });
}
function Dr(t) {
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
var Ze = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", Rr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", et = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function tt() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function jr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, n = r === void 0 ? [] : r, o = e.defaultOptions, i = o === void 0 ? et : o;
  return function(f, s, c) {
    c === void 0 && (c = i);
    var a = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, et, i),
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
        var E = Or(Dr([].concat(n, a.options.modifiers)));
        if (a.orderedModifiers = E.filter(function(w) {
          return w.enabled;
        }), process.env.NODE_ENV !== "production") {
          var v = Sr([].concat(E, a.options.modifiers), function(w) {
            var R = w.name;
            return R;
          });
          if (Pr(v), _(a.options.placement) === we) {
            var y = a.orderedModifiers.find(function(w) {
              var R = w.name;
              return R === "flip";
            });
            y || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var d = V(s), O = d.marginTop, P = d.marginRight, S = d.marginBottom, D = d.marginLeft;
          [O, P, S, D].some(function(w) {
            return parseFloat(w);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return b(), u.update();
      },
      // Sync update ??? it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!h) {
          var x = a.elements, A = x.reference, E = x.popper;
          if (!tt(A, E)) {
            process.env.NODE_ENV !== "production" && console.error(Ze);
            return;
          }
          a.rects = {
            reference: wr(A, le(E), a.options.strategy === "fixed"),
            popper: Te(E)
          }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach(function(w) {
            return a.modifiersData[w.name] = Object.assign({}, w.data);
          });
          for (var v = 0, y = 0; y < a.orderedModifiers.length; y++) {
            if (process.env.NODE_ENV !== "production" && (v += 1, v > 100)) {
              console.error(Rr);
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
      // Async and optimistically optimized update ??? it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Er(function() {
        return new Promise(function(m) {
          u.forceUpdate(), m(a);
        });
      }),
      destroy: function() {
        g(), h = !0;
      }
    };
    if (!tt(f, s))
      return process.env.NODE_ENV !== "production" && console.error(Ze), u;
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
var kr = [Gt, vr, Ut, $t, lr, ir, mr, Ht, fr], Tr = /* @__PURE__ */ jr({
  defaultModifiers: kr
});
const Br = /* @__PURE__ */ gt({
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
    const n = yt(null);
    bt(() => {
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
      }), Tr(a, r, {
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
    return (a, l) => (wt(), xt("div", {
      ref_key: "tooltipRef",
      ref: n,
      class: "v-tooltip-ref",
      onMouseenter: o,
      onMouseleave: i
    }, [
      Ot(a.$slots, "default", {}, void 0, !0)
    ], 544));
  }
});
const Cr = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, o] of e)
    r[n] = o;
  return r;
}, Se = /* @__PURE__ */ Cr(Br, [["__scopeId", "data-v-e6d1441f"]]);
Se.install = (t) => {
  t.component(Se.__name, Se);
};
export {
  Se as default
};
(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('#v-tooltip{max-width:300px;background:#212121;box-shadow:0 -2px 4px #00000005,0 2px 6px 6px #00000005,0 2px 6px #0000000a;color:#fff;padding:4px 8px;font-size:14px;border-radius:4px;word-wrap:break-word;display:none}#v-tooltip.light{background:#fff;color:#000000d6}#v-arrow,#v-arrow:before{position:absolute;width:8px;height:8px;background:inherit}#v-arrow{visibility:hidden}#v-arrow:before{visibility:visible;content:"";transform:rotate(45deg)}#v-tooltip[data-popper-placement^=top]>#v-arrow{bottom:-4px}#v-tooltip[data-popper-placement^=bottom]>#v-arrow{top:-4px}#v-tooltip[data-popper-placement^=left]>#v-arrow{right:-4px}#v-tooltip[data-popper-placement^=right]>#v-arrow{left:-4px}.v-tooltip-ref[data-v-e6d1441f]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;word-break:break-all}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
