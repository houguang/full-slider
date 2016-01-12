jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0), function(e, t, n) {
	function r(n) {
		var r = t.console;
		i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute && (r.warn("JQMIGRATE: " + n), e.migrateTrace && r.trace && r.trace()))
	}
	function a(t, a, i, o) {
		if (Object.defineProperty) try {
			return Object.defineProperty(t, a, {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return r(o), i
				},
				set: function(e) {
					r(o), i = e
				}
			}), n
		} catch (s) {}
		e._definePropertyBroken = !0, t[a] = i
	}
	var i = {};
	e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function() {
		i = {}, e.migrateWarnings.length = 0
	}, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
	var o = e("<input/>", {
		size: 1
	}).attr("size") && e.attrFn,
		s = e.attr,
		u = e.attrHooks.value && e.attrHooks.value.get ||
	function() {
		return null
	}, c = e.attrHooks.value && e.attrHooks.value.set ||
	function() {
		return n
	}, l = /^(?:input|button)$/i, d = /^[238]$/, p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, f = /^(?:checked|selected)$/i;
	a(e, "attrFn", o || {}, "jQuery.attrFn is deprecated"), e.attr = function(t, a, i, u) {
		var c = a.toLowerCase(),
			g = t && t.nodeType;
		return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ? e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
			get: function(t, r) {
				var a, i = e.prop(t, r);
				return i === !0 || "boolean" != typeof i && (a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n
			},
			set: function(t, n, r) {
				var a;
				return n === !1 ? e.removeAttr(t, r) : (a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r
			}
		}, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, i))
	}, e.attrHooks.value = {
		get: function(e, t) {
			var n = (e.nodeName || "").toLowerCase();
			return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
		},
		set: function(e, t) {
			var a = (e.nodeName || "").toLowerCase();
			return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n)
		}
	};
	var g, h, v = e.fn.init,
		m = e.parseJSON,
		y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
	e.fn.init = function(t, n, a) {
		var i;
		return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] && r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments)
	}, e.fn.init.prototype = e.fn, e.parseJSON = function(e) {
		return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
	}, e.uaMatch = function(e) {
		e = e.toLowerCase();
		var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
		return {
			browser: t[1] || "",
			version: t[2] || "0"
		}
	}, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function() {
		function t(e, n) {
			return new t.fn.init(e, n)
		}
		e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(r, a) {
			return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n)
		}, t.fn.init.prototype = t.fn;
		var n = t(document);
		return r("jQuery.sub() is deprecated"), t
	}, e.ajaxSetup({
		converters: {
			"text json": e.parseJSON
		}
	});
	var b = e.fn.data;
	e.fn.data = function(t) {
		var a, i, o = this[0];
		return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i)
	};
	var j = /\/(java|ecma)script/i,
		w = e.fn.andSelf || e.fn.addBack;
	e.fn.andSelf = function() {
		return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
	}, e.clean || (e.clean = function(t, a, i, o) {
		a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
		var s, u, c, l, d = [];
		if (e.merge(d, e.buildFragment(t, a).childNodes), i) for (c = function(e) {
			return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n
		}, s = 0; null != (u = d[s]); s++) e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n && (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
		return d
	});
	var Q = e.event.add,
		x = e.event.remove,
		k = e.event.trigger,
		N = e.fn.toggle,
		T = e.fn.live,
		M = e.fn.die,
		S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
		C = RegExp("\\b(?:" + S + ")\\b"),
		H = /(?:^|\s)hover(\.\S+|)\b/,
		A = function(t) {
			return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"))
		};
	e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function(e, t, n, a, i) {
		e !== document && C.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, i)
	}, e.event.remove = function(e, t, n, r, a) {
		x.call(this, e, A(t) || "", n, r, a)
	}, e.fn.error = function() {
		var e = Array.prototype.slice.call(arguments, 0);
		return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
	}, e.fn.toggle = function(t, n) {
		if (!e.isFunction(t) || !e.isFunction(n)) return N.apply(this, arguments);
		r("jQuery.fn.toggle(handler, handler...) is deprecated");
		var a = arguments,
			i = t.guid || e.guid++,
			o = 0,
			s = function(n) {
				var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;
				return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1
			};
		for (s.guid = i; a.length > o;) a[o++].guid = i;
		return this.click(s)
	}, e.fn.live = function(t, n, a) {
		return r("jQuery.fn.live() is deprecated"), T ? T.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this)
	}, e.fn.die = function(t, n) {
		return r("jQuery.fn.die() is deprecated"), M ? M.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
	}, e.event.trigger = function(e, t, n, a) {
		return n || C.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a)
	}, e.each(S.split("|"), function(t, n) {
		e.event.special[n] = {
			setup: function() {
				var t = this;
				return t !== document && (e.event.add(document, n + "." + e.guid, function() {
					e.event.trigger(n, null, t, !0)
				}), e._data(this, n, e.guid++)), !1
			},
			teardown: function() {
				return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1
			}
		}
	})
}(jQuery, window);
!
function(t, e) {
	function i(e, i) {
		var n, o, a, r = e.nodeName.toLowerCase();
		return "area" === r ? (n = e.parentNode, o = n.name, e.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap=#" + o + "]")[0], !! a && s(a)) : !1) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : "a" === r ? e.href || i : i) && s(e)
	}
	function s(e) {
		return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
			return "hidden" === t.css(this, "visibility")
		}).length
	}
	var n = 0,
		o = /^ui-id-\d+$/;
	t.ui = t.ui || {}, t.extend(t.ui, {
		version: "1.10.3",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), t.fn.extend({
		focus: function(e) {
			return function(i, s) {
				return "number" == typeof i ? this.each(function() {
					var e = this;
					setTimeout(function() {
						t(e).focus(), s && s.call(e)
					}, i)
				}) : e.apply(this, arguments)
			}
		}(t.fn.focus),
		scrollParent: function() {
			var e;
			return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
				return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
			}).eq(0) : this.parents().filter(function() {
				return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
			}).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
		},
		zIndex: function(i) {
			if (i !== e) return this.css("zIndex", i);
			if (this.length) for (var s, n, o = t(this[0]); o.length && o[0] !== document;) {
				if (s = o.css("position"), ("absolute" === s || "relative" === s || "fixed" === s) && (n = parseInt(o.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
				o = o.parent()
			}
			return 0
		},
		uniqueId: function() {
			return this.each(function() {
				this.id || (this.id = "ui-id-" + ++n)
			})
		},
		removeUniqueId: function() {
			return this.each(function() {
				o.test(this.id) && t(this).removeAttr("id")
			})
		}
	}), t.extend(t.expr[":"], {
		data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
			return function(i) {
				return !!t.data(i, e)
			}
		}) : function(e, i, s) {
			return !!t.data(e, s[3])
		},
		focusable: function(e) {
			return i(e, !isNaN(t.attr(e, "tabindex")))
		},
		tabbable: function(e) {
			var s = t.attr(e, "tabindex"),
				n = isNaN(s);
			return (n || s >= 0) && i(e, !n)
		}
	}), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(i, s) {
		function n(e, i, s, n) {
			return t.each(o, function() {
				i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), n && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
			}), i
		}
		var o = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"],
			a = s.toLowerCase(),
			r = {
				innerWidth: t.fn.innerWidth,
				innerHeight: t.fn.innerHeight,
				outerWidth: t.fn.outerWidth,
				outerHeight: t.fn.outerHeight
			};
		t.fn["inner" + s] = function(i) {
			return i === e ? r["inner" + s].call(this) : this.each(function() {
				t(this).css(a, n(this, i) + "px")
			})
		}, t.fn["outer" + s] = function(e, i) {
			return "number" != typeof e ? r["outer" + s].call(this, e) : this.each(function() {
				t(this).css(a, n(this, e, !0, i) + "px")
			})
		}
	}), t.fn.addBack || (t.fn.addBack = function(t) {
		return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
	}), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
		return function(i) {
			return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
		}
	}(t.fn.removeData)), t.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
		disableSelection: function() {
			return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
				t.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	}), t.extend(t.ui, {
		plugin: {
			add: function(e, i, s) {
				var n, o = t.ui[e].prototype;
				for (n in s) o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]])
			},
			call: function(t, e, i) {
				var s, n = t.plugins[e];
				if (n && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType) for (s = 0; s < n.length; s++) t.options[n[s][0]] && n[s][1].apply(t.element, i)
			}
		},
		hasScroll: function(e, i) {
			if ("hidden" === t(e).css("overflow")) return !1;
			var s = i && "left" === i ? "scrollLeft" : "scrollTop",
				n = !1;
			return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
		}
	})
}(jQuery), function(t, e) {
	var i = 0,
		s = Array.prototype.slice,
		n = t.cleanData;
	t.cleanData = function(e) {
		for (var i, s = 0; null != (i = e[s]); s++) try {
			t(i).triggerHandler("remove")
		} catch (o) {}
		n(e)
	}, t.widget = function(e, i, s) {
		var n, o, a, r, h = {},
			l = e.split(".")[0];
		e = e.split(".")[1], n = l + "-" + e, s || (s = i, i = t.Widget), t.expr[":"][n.toLowerCase()] = function(e) {
			return !!t.data(e, n)
		}, t[l] = t[l] || {}, o = t[l][e], a = t[l][e] = function(t, e) {
			return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new a(t, e)
		}, t.extend(a, o, {
			version: s.version,
			_proto: t.extend({}, s),
			_childConstructors: []
		}), r = new i, r.options = t.widget.extend({}, r.options), t.each(s, function(e, s) {
			return t.isFunction(s) ? (h[e] = function() {
				var t = function() {
						return i.prototype[e].apply(this, arguments)
					},
					n = function(t) {
						return i.prototype[e].apply(this, t)
					};
				return function() {
					var e, i = this._super,
						o = this._superApply;
					return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e
				}
			}(), void 0) : (h[e] = s, void 0)
		}), a.prototype = t.widget.extend(r, {
			widgetEventPrefix: o ? r.widgetEventPrefix : e
		}, h, {
			constructor: a,
			namespace: l,
			widgetName: e,
			widgetFullName: n
		}), o ? (t.each(o._childConstructors, function(e, i) {
			var s = i.prototype;
			t.widget(s.namespace + "." + s.widgetName, a, i._proto)
		}), delete o._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a)
	}, t.widget.extend = function(i) {
		for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++) for (n in a[r]) o = a[r][n], a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
		return i
	}, t.widget.bridge = function(i, n) {
		var o = n.prototype.widgetFullName || i;
		t.fn[i] = function(a) {
			var r = "string" == typeof a,
				h = s.call(arguments, 1),
				l = this;
			return a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a, r ? this.each(function() {
				var s, n = t.data(this, o);
				return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : void 0) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + a + "'")
			}) : this.each(function() {
				var e = t.data(this, o);
				e ? e.option(a || {})._init() : t.data(this, o, new n(a, this))
			}), l
		}
	}, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(e, s) {
			s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(t) {
					t.target === s && this.destroy()
				}
			}), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: t.noop,
		_getCreateEventData: t.noop,
		_create: t.noop,
		_init: t.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: t.noop,
		widget: function() {
			return this.element
		},
		option: function(i, s) {
			var n, o, a, r = i;
			if (0 === arguments.length) return t.widget.extend({}, this.options);
			if ("string" == typeof i) if (r = {}, n = i.split("."), i = n.shift(), n.length) {
				for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; a < n.length - 1; a++) o[n[a]] = o[n[a]] || {}, o = o[n[a]];
				if (i = n.pop(), s === e) return o[i] === e ? null : o[i];
				o[i] = s
			} else {
				if (s === e) return this.options[i] === e ? null : this.options[i];
				r[i] = s
			}
			return this._setOptions(r), this
		},
		_setOptions: function(t) {
			var e;
			for (e in t) this._setOption(e, t[e]);
			return this
		},
		_setOption: function(t, e) {
			return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_on: function(e, i, s) {
			var n, o = this;
			"boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function(s, a) {
				function r() {
					return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
				}
				"string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
				var h = s.match(/^(\w+)\s*(.*)$/),
					l = h[1] + o.eventNamespace,
					c = h[2];
				c ? n.delegate(c, l, r) : i.bind(l, r)
			})
		},
		_off: function(t, e) {
			e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
		},
		_delay: function(t, e) {
			function i() {
				return ("string" == typeof t ? s[t] : t).apply(s, arguments)
			}
			var s = this;
			return setTimeout(i, e || 0)
		},
		_hoverable: function(e) {
			this.hoverable = this.hoverable.add(e), this._on(e, {
				mouseenter: function(e) {
					t(e.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(e) {
					t(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(e) {
			this.focusable = this.focusable.add(e), this._on(e, {
				focusin: function(e) {
					t(e.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(e) {
					t(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(e, i, s) {
			var n, o, a = this.options[e];
			if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]);
			return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
		}
	}, t.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(e, i) {
		t.Widget.prototype["_" + e] = function(s, n, o) {
			"string" == typeof n && (n = {
				effect: n
			});
			var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
			n = n || {}, "number" == typeof n && (n = {
				duration: n
			}), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
				t(this)[e](), o && o.call(s[0]), i()
			})
		}
	})
}(jQuery), function(t) {
	var e = !1;
	t(document).mouseup(function() {
		e = !1
	}), t.widget("ui.mouse", {
		version: "1.10.3",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var e = this;
			this.element.bind("mousedown." + this.widgetName, function(t) {
				return e._mouseDown(t)
			}).bind("click." + this.widgetName, function(i) {
				return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(i) {
			if (!e) {
				this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
				var s = this,
					n = 1 === i.which,
					o = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
				return n && !o && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
					s.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
					return s._mouseMove(t)
				}, this._mouseUpDelegate = function(t) {
					return s._mouseUp(t)
				}, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
			}
		},
		_mouseMove: function(e) {
			return t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
		},
		_mouseUp: function(e) {
			return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
		},
		_mouseDistanceMet: function(t) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return !0
		}
	})
}(jQuery), function(t) {
	t.widget("ui.draggable", t.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1,
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
			"original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
		},
		_destroy: function() {
			this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
		},
		_mouseCapture: function(e) {
			var i = this.options;
			return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
				t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1e3
				}).css(t(this).offset()).appendTo("body")
			}), !0) : !1)
		},
		_mouseStart: function(e) {
			var i = this.options;
			return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, this.offset.scroll = !1, t.extend(this.offset, {
				click: {
					left: e.pageX - this.offset.left,
					top: e.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
		},
		_mouseDrag: function(e, i) {
			if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
				var s = this._uiHash();
				if (this._trigger("drag", e, s) === !1) return this._mouseUp({}), !1;
				this.position = s.position
			}
			return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
		},
		_mouseStop: function(e) {
			var i = this,
				s = !1;
			return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				i._trigger("stop", e) !== !1 && i._clear()
			}) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1
		},
		_mouseUp: function(e) {
			return t("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			}), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function(e) {
			return this.options.handle ? !! t(e.target).closest(this.element.find(this.options.handle)).length : !0
		},
		_createHelper: function(e) {
			var i = this.options,
				s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
			return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
		},
		_adjustOffsetFromHelper: function(e) {
			"string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
				left: +e[0],
				top: +e[1] || 0
			}), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			var e = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
				top: 0,
				left: 0
			}), {
				top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" === this.cssPosition) {
				var t = this.element.position();
				return {
					top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var e, i, s, n = this.options;
			return n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), void 0) : (this.containment = null, void 0)
		},
		_convertPositionTo: function(e, i) {
			i || (i = this.position);
			var s = "absolute" === e ? 1 : -1,
				n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
			return this.offset.scroll || (this.offset.scroll = {
				top: n.scrollTop(),
				left: n.scrollLeft()
			}), {
				top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
				left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
			}
		},
		_generatePosition: function(e) {
			var i, s, n, o, a = this.options,
				r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				h = e.pageX,
				l = e.pageY;
			return this.offset.scroll || (this.offset.scroll = {
				top: r.scrollTop(),
				left: r.scrollLeft()
			}), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, h = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o)), {
				top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
				left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
		},
		_trigger: function(e, i, s) {
			return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, s)
		},
		plugins: {},
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), t.ui.plugin.add("draggable", "connectToSortable", {
		start: function(e, i) {
			var s = t(this).data("ui-draggable"),
				n = s.options,
				o = t.extend({}, i, {
					item: s.element
				});
			s.sortables = [], t(n.connectToSortable).each(function() {
				var i = t.data(this, "ui-sortable");
				i && !i.options.disabled && (s.sortables.push({
					instance: i,
					shouldRevert: i.options.revert
				}), i.refreshPositions(), i._trigger("activate", e, o))
			})
		},
		stop: function(e, i) {
			var s = t(this).data("ui-draggable"),
				n = t.extend({}, i, {
					item: s.element
				});
			t.each(s.sortables, function() {
				this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, n))
			})
		},
		drag: function(e, i) {
			var s = t(this).data("ui-draggable"),
				n = this;
			t.each(s.sortables, function() {
				var o = !1,
					a = this;
				this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, t.each(s.sortables, function() {
					return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== a && this.instance._intersectsWith(this.instance.containerCache) && t.contains(a.instance.element[0], this.instance.element[0]) && (o = !1), o
				})), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
					return i.helper[0]
				}, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", e), s.dropped = !1)
			})
		}
	}), t.ui.plugin.add("draggable", "cursor", {
		start: function() {
			var e = t("body"),
				i = t(this).data("ui-draggable").options;
			e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
		},
		stop: function() {
			var e = t(this).data("ui-draggable").options;
			e._cursor && t("body").css("cursor", e._cursor)
		}
	}), t.ui.plugin.add("draggable", "opacity", {
		start: function(e, i) {
			var s = t(i.helper),
				n = t(this).data("ui-draggable").options;
			s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity)
		},
		stop: function(e, i) {
			var s = t(this).data("ui-draggable").options;
			s._opacity && t(i.helper).css("opacity", s._opacity)
		}
	}), t.ui.plugin.add("draggable", "scroll", {
		start: function() {
			var e = t(this).data("ui-draggable");
			e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
		},
		drag: function(e) {
			var i = t(this).data("ui-draggable"),
				s = i.options,
				n = !1;
			i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))), n !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
		}
	}), t.ui.plugin.add("draggable", "snap", {
		start: function() {
			var e = t(this).data("ui-draggable"),
				i = e.options;
			e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
				var i = t(this),
					s = i.offset();
				this !== e.element[0] && e.snapElements.push({
					item: this,
					width: i.outerWidth(),
					height: i.outerHeight(),
					top: s.top,
					left: s.left
				})
			})
		},
		drag: function(e, i) {
			var s, n, o, a, r, h, l, c, u, d, p = t(this).data("ui-draggable"),
				f = p.options,
				g = f.snapTolerance,
				m = i.offset.left,
				v = m + p.helperProportions.width,
				_ = i.offset.top,
				b = _ + p.helperProportions.height;
			for (u = p.snapElements.length - 1; u >= 0; u--) r = p.snapElements[u].left, h = r + p.snapElements[u].width, l = p.snapElements[u].top, c = l + p.snapElements[u].height, r - g > v || m > h + g || l - g > b || _ > c + g || !t.contains(p.snapElements[u].item.ownerDocument, p.snapElements[u].item) ? (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {
				snapItem: p.snapElements[u].item
			})), p.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (s = Math.abs(l - b) <= g, n = Math.abs(c - _) <= g, o = Math.abs(r - v) <= g, a = Math.abs(h - m) <= g, s && (i.position.top = p._convertPositionTo("relative", {
				top: l - p.helperProportions.height,
				left: 0
			}).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
				top: c,
				left: 0
			}).top - p.margins.top), o && (i.position.left = p._convertPositionTo("relative", {
				top: 0,
				left: r - p.helperProportions.width
			}).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", {
				top: 0,
				left: h
			}).left - p.margins.left)), d = s || n || o || a, "outer" !== f.snapMode && (s = Math.abs(l - _) <= g, n = Math.abs(c - b) <= g, o = Math.abs(r - m) <= g, a = Math.abs(h - v) <= g, s && (i.position.top = p._convertPositionTo("relative", {
				top: l,
				left: 0
			}).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
				top: c - p.helperProportions.height,
				left: 0
			}).top - p.margins.top), o && (i.position.left = p._convertPositionTo("relative", {
				top: 0,
				left: r
			}).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", {
				top: 0,
				left: h - p.helperProportions.width
			}).left - p.margins.left)), !p.snapElements[u].snapping && (s || n || o || a || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {
				snapItem: p.snapElements[u].item
			})), p.snapElements[u].snapping = s || n || o || a || d)
		}
	}), t.ui.plugin.add("draggable", "stack", {
		start: function() {
			var e, i = this.data("ui-draggable").options,
				s = t.makeArray(t(i.stack)).sort(function(e, i) {
					return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
				});
			s.length && (e = parseInt(t(s[0]).css("zIndex"), 10) || 0, t(s).each(function(i) {
				t(this).css("zIndex", e + i)
			}), this.css("zIndex", e + s.length))
		}
	}), t.ui.plugin.add("draggable", "zIndex", {
		start: function(e, i) {
			var s = t(i.helper),
				n = t(this).data("ui-draggable").options;
			s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex)
		},
		stop: function(e, i) {
			var s = t(this).data("ui-draggable").options;
			s._zIndex && t(i.helper).css("zIndex", s._zIndex)
		}
	})
}(jQuery), function(t) {
	function e(t, e, i) {
		return t > e && e + i > t
	}
	t.widget("ui.droppable", {
		version: "1.10.3",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: !1,
			addClasses: !0,
			greedy: !1,
			hoverClass: !1,
			scope: "default",
			tolerance: "intersect",
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {
			var e = this.options,
				i = e.accept;
			this.isover = !1, this.isout = !0, this.accept = t.isFunction(i) ? i : function(t) {
				return t.is(i)
			}, this.proportions = {
				width: this.element[0].offsetWidth,
				height: this.element[0].offsetHeight
			}, t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [], t.ui.ddmanager.droppables[e.scope].push(this), e.addClasses && this.element.addClass("ui-droppable")
		},
		_destroy: function() {
			for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; e < i.length; e++) i[e] === this && i.splice(e, 1);
			this.element.removeClass("ui-droppable ui-droppable-disabled")
		},
		_setOption: function(e, i) {
			"accept" === e && (this.accept = t.isFunction(i) ? i : function(t) {
				return t.is(i)
			}), t.Widget.prototype._setOption.apply(this, arguments)
		},
		_activate: function(e) {
			var i = t.ui.ddmanager.current;
			this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
		},
		_deactivate: function(e) {
			var i = t.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
		},
		_over: function(e) {
			var i = t.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
		},
		_out: function(e) {
			var i = t.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
		},
		_drop: function(e, i) {
			var s = i || t.ui.ddmanager.current,
				n = !1;
			return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
				var e = t.data(this, "ui-droppable");
				return e.options.greedy && !e.options.disabled && e.options.scope === s.options.scope && e.accept.call(e.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e, {
					offset: e.element.offset()
				}), e.options.tolerance) ? (n = !0, !1) : void 0
			}), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1
		},
		ui: function(t) {
			return {
				draggable: t.currentItem || t.element,
				helper: t.helper,
				position: t.position,
				offset: t.positionAbs
			}
		}
	}), t.ui.intersect = function(t, i, s) {
		if (!i.offset) return !1;
		var n, o, a = (t.positionAbs || t.position.absolute).left,
			r = a + t.helperProportions.width,
			h = (t.positionAbs || t.position.absolute).top,
			l = h + t.helperProportions.height,
			c = i.offset.left,
			u = c + i.proportions.width,
			d = i.offset.top,
			p = d + i.proportions.height;
		switch (s) {
		case "fit":
			return a >= c && u >= r && h >= d && p >= l;
		case "intersect":
			return c < a + t.helperProportions.width / 2 && r - t.helperProportions.width / 2 < u && d < h + t.helperProportions.height / 2 && l - t.helperProportions.height / 2 < p;
		case "pointer":
			return n = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, o = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, e(o, d, i.proportions.height) && e(n, c, i.proportions.width);
		case "touch":
			return (h >= d && p >= h || l >= d && p >= l || d > h && l > p) && (a >= c && u >= a || r >= c && u >= r || c > a && r > u);
		default:
			return !1
		}
	}, t.ui.ddmanager = {
		current: null,
		droppables: {
			"default": []
		},
		prepareOffsets: function(e, i) {
			var s, n, o = t.ui.ddmanager.droppables[e.options.scope] || [],
				a = i ? i.type : null,
				r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
			t: for (s = 0; s < o.length; s++) if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
				for (n = 0; n < r.length; n++) if (r[n] === o[s].element[0]) {
					o[s].proportions.height = 0;
					continue t
				}
				o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions = {
					width: o[s].element[0].offsetWidth,
					height: o[s].element[0].offsetHeight
				})
			}
		},
		drop: function(e, i) {
			var s = !1;
			return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
				this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
			}), s
		},
		dragStart: function(e, i) {
			e.element.parentsUntil("body").bind("scroll.droppable", function() {
				e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
			})
		},
		drag: function(e, i) {
			e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var s, n, o, a = t.ui.intersect(e, this, this.options.tolerance),
						r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
					r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
						return t.data(this, "ui-droppable").options.scope === n
					}), o.length && (s = t.data(o[0], "ui-droppable"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
				}
			})
		},
		dragStop: function(e, i) {
			e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
		}
	}
}(jQuery), function(t) {
	function e(t) {
		return parseInt(t, 10) || 0
	}
	function i(t) {
		return !isNaN(parseInt(t, 10))
	}
	t.widget("ui.resizable", t.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_create: function() {
			var e, i, s, n, o, a = this,
				r = this.options;
			if (this.element.addClass("ui-resizable"), t.extend(this, {
				_aspectRatio: !! r.aspectRatio,
				aspectRatio: r.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
			}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			})), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			}), this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			})), this.originalElement.css({
				margin: this.originalElement.css("margin")
			}), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			} : "e,s,se"), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; i < e.length; i++) s = t.trim(e[i]), o = "ui-resizable-" + s, n = t("<div class='ui-resizable-handle " + o + "'></div>"), n.css({
				zIndex: r.zIndex
			}), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
			this._renderAxis = function(e) {
				var i, s, n, o;
				e = e || this.element;
				for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), t(this.handles[i]).length
			}, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
				a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : "se")
			}), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
				r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
			}).mouseleave(function() {
				r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
			})), this._mouseInit()
		},
		_destroy: function() {
			this._mouseDestroy();
			var e, i = function(e) {
					t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
				};
			return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
				position: e.css("position"),
				width: e.outerWidth(),
				height: e.outerHeight(),
				top: e.css("top"),
				left: e.css("left")
			}).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
		},
		_mouseCapture: function(e) {
			var i, s, n = !1;
			for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
			return !this.options.disabled && n
		},
		_mouseStart: function(i) {
			var s, n, o, a = this.options,
				r = this.element.position(),
				h = this.element;
			return this.resizing = !0, /absolute/.test(h.css("position")) ? h.css({
				position: "absolute",
				top: h.css("top"),
				left: h.css("left")
			}) : h.is(".ui-draggable") && h.css({
				position: "absolute",
				top: r.top,
				left: r.left
			}), this._renderProxy(), s = e(this.helper.css("left")), n = e(this.helper.css("top")), a.containment && (s += t(a.containment).scrollLeft() || 0, n += t(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: s,
				top: n
			}, this.size = this._helper ? {
				width: h.outerWidth(),
				height: h.outerHeight()
			} : {
				width: h.width(),
				height: h.height()
			}, this.originalSize = this._helper ? {
				width: h.outerWidth(),
				height: h.outerHeight()
			} : {
				width: h.width(),
				height: h.height()
			}, this.originalPosition = {
				left: s,
				top: n
			}, this.sizeDiff = {
				width: h.outerWidth() - h.width(),
				height: h.outerHeight() - h.height()
			}, this.originalMousePosition = {
				left: i.pageX,
				top: i.pageY
			}, this.aspectRatio = "number" == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === o ? this.axis + "-resize" : o), h.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
		},
		_mouseDrag: function(e) {
			var i, s = this.helper,
				n = {},
				o = this.originalMousePosition,
				a = this.axis,
				r = this.position.top,
				h = this.position.left,
				l = this.size.width,
				c = this.size.height,
				u = e.pageX - o.left || 0,
				d = e.pageY - o.top || 0,
				p = this._change[a];
			return p ? (i = p.apply(this, [e, u, d]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== r && (n.top = this.position.top + "px"), this.position.left !== h && (n.left = this.position.left + "px"), this.size.width !== l && (n.width = this.size.width + "px"), this.size.height !== c && (n.height = this.size.height + "px"), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || this._trigger("resize", e, this.ui()), !1) : !1
		},
		_mouseStop: function(e) {
			this.resizing = !1;
			var i, s, n, o, a, r, h, l = this.options,
				c = this;
			return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && t.ui.hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = {
				width: c.helper.width() - o,
				height: c.helper.height() - n
			}, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, h = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(a, {
				top: h,
				left: r
			})), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
		},
		_updateVirtualBoundaries: function(t) {
			var e, s, n, o, a, r = this.options;
			a = {
				minWidth: i(r.minWidth) ? r.minWidth : 0,
				maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0,
				minHeight: i(r.minHeight) ? r.minHeight : 0,
				maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0
			}, (this._aspectRatio || t) && (e = a.minHeight * this.aspectRatio, n = a.minWidth / this.aspectRatio, s = a.maxHeight * this.aspectRatio, o = a.maxWidth / this.aspectRatio, e > a.minWidth && (a.minWidth = e), n > a.minHeight && (a.minHeight = n), s < a.maxWidth && (a.maxWidth = s), o < a.maxHeight && (a.maxHeight = o)), this._vBoundaries = a
		},
		_updateCache: function(t) {
			this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), i(t.width) && (this.size.width = t.width)
		},
		_updateRatio: function(t) {
			var e = this.position,
				s = this.size,
				n = this.axis;
			return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (s.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (s.height - t.height), t.left = e.left + (s.width - t.width)), t
		},
		_respectSize: function(t) {
			var e = this._vBoundaries,
				s = this.axis,
				n = i(t.width) && e.maxWidth && e.maxWidth < t.width,
				o = i(t.height) && e.maxHeight && e.maxHeight < t.height,
				a = i(t.width) && e.minWidth && e.minWidth > t.width,
				r = i(t.height) && e.minHeight && e.minHeight > t.height,
				h = this.originalPosition.left + this.originalSize.width,
				l = this.position.top + this.size.height,
				c = /sw|nw|w/.test(s),
				u = /nw|ne|n/.test(s);
			return a && (t.width = e.minWidth), r && (t.height = e.minHeight), n && (t.width = e.maxWidth), o && (t.height = e.maxHeight), a && c && (t.left = h - e.minWidth), n && c && (t.left = h - e.maxWidth), r && u && (t.top = l - e.minHeight), o && u && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
		},
		_proportionallyResize: function() {
			if (this._proportionallyResizeElements.length) {
				var t, e, i, s, n, o = this.helper || this.element;
				for (t = 0; t < this._proportionallyResizeElements.length; t++) {
					if (n = this._proportionallyResizeElements[t], !this.borderDif) for (this.borderDif = [], i = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], e = 0; e < i.length; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(s[e], 10) || 0);
					n.css({
						height: o.height() - this.borderDif[0] - this.borderDif[2] || 0,
						width: o.width() - this.borderDif[1] - this.borderDif[3] || 0
					})
				}
			}
		},
		_renderProxy: function() {
			var e = this.element,
				i = this.options;
			this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++i.zIndex
			}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
		},
		_change: {
			e: function(t, e) {
				return {
					width: this.originalSize.width + e
				}
			},
			w: function(t, e) {
				var i = this.originalSize,
					s = this.originalPosition;
				return {
					left: s.left + e,
					width: i.width - e
				}
			},
			n: function(t, e, i) {
				var s = this.originalSize,
					n = this.originalPosition;
				return {
					top: n.top + i,
					height: s.height - i
				}
			},
			s: function(t, e, i) {
				return {
					height: this.originalSize.height + i
				}
			},
			se: function(e, i, s) {
				return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
			},
			sw: function(e, i, s) {
				return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
			},
			ne: function(e, i, s) {
				return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
			},
			nw: function(e, i, s) {
				return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
			}
		},
		_propagate: function(e, i) {
			t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), t.ui.plugin.add("resizable", "animate", {
		stop: function(e) {
			var i = t(this).data("ui-resizable"),
				s = i.options,
				n = i._proportionallyResizeElements,
				o = n.length && /textarea/i.test(n[0].nodeName),
				a = o && t.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
				r = o ? 0 : i.sizeDiff.width,
				h = {
					width: i.size.width - r,
					height: i.size.height - a
				},
				l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
				c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
			i.element.animate(t.extend(h, c && l ? {
				top: c,
				left: l
			} : {}), {
				duration: s.animateDuration,
				easing: s.animateEasing,
				step: function() {
					var s = {
						width: parseInt(i.element.css("width"), 10),
						height: parseInt(i.element.css("height"), 10),
						top: parseInt(i.element.css("top"), 10),
						left: parseInt(i.element.css("left"), 10)
					};
					n && n.length && t(n[0]).css({
						width: s.width,
						height: s.height
					}), i._updateCache(s), i._propagate("resize", e)
				}
			})
		}
	}), t.ui.plugin.add("resizable", "containment", {
		start: function() {
			var i, s, n, o, a, r, h, l = t(this).data("ui-resizable"),
				c = l.options,
				u = l.element,
				d = c.containment,
				p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
			p && (l.containerElement = t(p), /document/.test(d) || d === document ? (l.containerOffset = {
				left: 0,
				top: 0
			}, l.containerPosition = {
				left: 0,
				top: 0
			}, l.parentData = {
				element: t(document),
				left: 0,
				top: 0,
				width: t(document).width(),
				height: t(document).height() || document.body.parentNode.scrollHeight
			}) : (i = t(p), s = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
				s[t] = e(i.css("padding" + n))
			}), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {
				height: i.innerHeight() - s[3],
				width: i.innerWidth() - s[1]
			}, n = l.containerOffset, o = l.containerSize.height, a = l.containerSize.width, r = t.ui.hasScroll(p, "left") ? p.scrollWidth : a, h = t.ui.hasScroll(p) ? p.scrollHeight : o, l.parentData = {
				element: p,
				left: n.left,
				top: n.top,
				width: r,
				height: h
			}))
		},
		resize: function(e) {
			var i, s, n, o, a = t(this).data("ui-resizable"),
				r = a.options,
				h = a.containerOffset,
				l = a.position,
				c = a._aspectRatio || e.shiftKey,
				u = {
					top: 0,
					left: 0
				},
				d = a.containerElement;
			d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (a._helper ? h.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - h.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio), a.position.left = r.helper ? h.left : 0), l.top < (a._helper ? h.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - h.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio), a.position.top = a._helper ? h.top : 0), a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top, i = Math.abs((a._helper ? a.offset.left - u.left : a.offset.left - u.left) + a.sizeDiff.width), s = Math.abs((a._helper ? a.offset.top - u.top : a.offset.top - h.top) + a.sizeDiff.height), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o && (i -= a.parentData.left), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio))
		},
		stop: function() {
			var e = t(this).data("ui-resizable"),
				i = e.options,
				s = e.containerOffset,
				n = e.containerPosition,
				o = e.containerElement,
				a = t(e.helper),
				r = a.offset(),
				h = a.outerWidth() - e.sizeDiff.width,
				l = a.outerHeight() - e.sizeDiff.height;
			e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
				left: r.left - n.left - s.left,
				width: h,
				height: l
			}), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
				left: r.left - n.left - s.left,
				width: h,
				height: l
			})
		}
	}), t.ui.plugin.add("resizable", "alsoResize", {
		start: function() {
			var e = t(this).data("ui-resizable"),
				i = e.options,
				s = function(e) {
					t(e).each(function() {
						var e = t(this);
						e.data("ui-resizable-alsoresize", {
							width: parseInt(e.width(), 10),
							height: parseInt(e.height(), 10),
							left: parseInt(e.css("left"), 10),
							top: parseInt(e.css("top"), 10)
						})
					})
				};
			"object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : t.each(i.alsoResize, function(t) {
				s(t)
			})
		},
		resize: function(e, i) {
			var s = t(this).data("ui-resizable"),
				n = s.options,
				o = s.originalSize,
				a = s.originalPosition,
				r = {
					height: s.size.height - o.height || 0,
					width: s.size.width - o.width || 0,
					top: s.position.top - a.top || 0,
					left: s.position.left - a.left || 0
				},
				h = function(e, s) {
					t(e).each(function() {
						var e = t(this),
							n = t(this).data("ui-resizable-alsoresize"),
							o = {},
							a = s && s.length ? s : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
						t.each(a, function(t, e) {
							var i = (n[e] || 0) + (r[e] || 0);
							i && i >= 0 && (o[e] = i || null)
						}), e.css(o)
					})
				};
			"object" != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : t.each(n.alsoResize, function(t, e) {
				h(t, e)
			})
		},
		stop: function() {
			t(this).removeData("resizable-alsoresize")
		}
	}), t.ui.plugin.add("resizable", "ghost", {
		start: function() {
			var e = t(this).data("ui-resizable"),
				i = e.options,
				s = e.size;
			e.ghost = e.originalElement.clone(), e.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: s.height,
				width: s.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
		},
		resize: function() {
			var e = t(this).data("ui-resizable");
			e.ghost && e.ghost.css({
				position: "relative",
				height: e.size.height,
				width: e.size.width
			})
		},
		stop: function() {
			var e = t(this).data("ui-resizable");
			e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
		}
	}), t.ui.plugin.add("resizable", "grid", {
		resize: function() {
			var e = t(this).data("ui-resizable"),
				i = e.options,
				s = e.size,
				n = e.originalSize,
				o = e.originalPosition,
				a = e.axis,
				r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
				h = r[0] || 1,
				l = r[1] || 1,
				c = Math.round((s.width - n.width) / h) * h,
				u = Math.round((s.height - n.height) / l) * l,
				d = n.width + c,
				p = n.height + u,
				f = i.maxWidth && i.maxWidth < d,
				g = i.maxHeight && i.maxHeight < p,
				m = i.minWidth && i.minWidth > d,
				v = i.minHeight && i.minHeight > p;
			i.grid = r, m && (d += h), v && (p += l), f && (d -= h), g && (p -= l), /^(se|s|e)$/.test(a) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.top = o.top - u) : /^(sw)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.left = o.left - c) : (e.size.width = d, e.size.height = p, e.position.top = o.top - u, e.position.left = o.left - c)
		}
	})
}(jQuery), function(t) {
	t.widget("ui.selectable", t.ui.mouse, {
		version: "1.10.3",
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch",
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function() {
			var e, i = this;
			this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
				e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
					var e = t(this),
						i = e.offset();
					t.data(this, "selectable-item", {
						element: this,
						$element: e,
						left: i.left,
						top: i.top,
						right: i.left + e.outerWidth(),
						bottom: i.top + e.outerHeight(),
						startselected: !1,
						selected: e.hasClass("ui-selected"),
						selecting: e.hasClass("ui-selecting"),
						unselecting: e.hasClass("ui-unselecting")
					})
				})
			}, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
		},
		_destroy: function() {
			this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
		},
		_mouseStart: function(e) {
			var i = this,
				s = this.options;
			this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
				left: e.pageX,
				top: e.pageY,
				width: 0,
				height: 0
			}), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
				var s = t.data(this, "selectable-item");
				s.startselected = !0, e.metaKey || e.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {
					unselecting: s.element
				}))
			}), t(e.target).parents().addBack().each(function() {
				var s, n = t.data(this, "selectable-item");
				return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, {
					selecting: n.element
				}) : i._trigger("unselecting", e, {
					unselecting: n.element
				}), !1) : void 0
			}))
		},
		_mouseDrag: function(e) {
			if (this.dragged = !0, !this.options.disabled) {
				var i, s = this,
					n = this.options,
					o = this.opos[0],
					a = this.opos[1],
					r = e.pageX,
					h = e.pageY;
				return o > r && (i = r, r = o, o = i), a > h && (i = h, h = a, a = i), this.helper.css({
					left: o,
					top: a,
					width: r - o,
					height: h - a
				}), this.selectees.each(function() {
					var i = t.data(this, "selectable-item"),
						l = !1;
					i && i.element !== s.element[0] && ("touch" === n.tolerance ? l = !(i.left > r || i.right < o || i.top > h || i.bottom < a) : "fit" === n.tolerance && (l = i.left > o && i.right < r && i.top > a && i.bottom < h), l ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {
						selecting: i.element
					}))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {
						unselecting: i.element
					}))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {
						unselecting: i.element
					})))))
				}), !1
			}
		},
		_mouseStop: function(e) {
			var i = this;
			return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
				var s = t.data(this, "selectable-item");
				s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {
					unselected: s.element
				})
			}), t(".ui-selecting", this.element[0]).each(function() {
				var s = t.data(this, "selectable-item");
				s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {
					selected: s.element
				})
			}), this._trigger("stop", e), this.helper.remove(), !1
		}
	})
}(jQuery), function(t) {
	function e(t, e, i) {
		return t > e && e + i > t
	}
	function i(t) {
		return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
	}
	t.widget("ui.sortable", t.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "> *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3,
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
		_create: function() {
			var t = this.options;
			this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
		},
		_destroy: function() {
			this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
			for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
			return this
		},
		_setOption: function(e, i) {
			"disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !! i)) : t.Widget.prototype._setOption.apply(this, arguments)
		},
		_mouseCapture: function(e, i) {
			var s = null,
				n = !1,
				o = this;
			return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
				return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : void 0
			}), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function() {
				this === e.target && (n = !0)
			}), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
		},
		_mouseStart: function(e, i, s) {
			var n, o, a = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, t.extend(this.offset, {
				click: {
					left: e.pageX - this.offset.left,
					top: e.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
				prev: this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this));
			return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
		},
		_mouseDrag: function(e) {
			var i, s, n, o, a = this.options,
				r = !1;
			for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - t(document).scrollTop() < a.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < a.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e.pageX - t(document).scrollLeft() < a.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
				if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
				this._rearrange(e, s), this._trigger("change", e, this._uiHash());
				break
			}
			return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
		},
		_mouseStop: function(e, i) {
			if (e) {
				if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
					var s = this,
						n = this.placeholder.offset(),
						o = this.options.axis,
						a = {};
					o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
						s._clear(e)
					})
				} else this._clear(e, i);
				return !1
			}
		},
		cancel: function() {
			if (this.dragging) {
				this._mouseUp({
					target: null
				}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
				for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
		},
		serialize: function(e) {
			var i = this._getItemsAsjQuery(e && e.connected),
				s = [];
			return e = e || {}, t(i).each(function() {
				var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
				i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
			}), !s.length && e.key && s.push(e.key + "="), s.join("&")
		},
		toArray: function(e) {
			var i = this._getItemsAsjQuery(e && e.connected),
				s = [];
			return e = e || {}, i.each(function() {
				s.push(t(e.item || this).attr(e.attribute || "id") || "")
			}), s
		},
		_intersectsWith: function(t) {
			var e = this.positionAbs.left,
				i = e + this.helperProportions.width,
				s = this.positionAbs.top,
				n = s + this.helperProportions.height,
				o = t.left,
				a = o + t.width,
				r = t.top,
				h = r + t.height,
				l = this.offset.click.top,
				c = this.offset.click.left,
				u = "x" === this.options.axis || s + l > r && h > s + l,
				d = "y" === this.options.axis || e + c > o && a > e + c,
				p = u && d;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < h
		},
		_intersectsWithPointer: function(t) {
			var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
				s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
				n = i && s,
				o = this._getDragVerticalDirection(),
				a = this._getDragHorizontalDirection();
			return n ? this.floating ? a && "right" === a || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : !1
		},
		_intersectsWithSides: function(t) {
			var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
				s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
				n = this._getDragVerticalDirection(),
				o = this._getDragHorizontalDirection();
			return this.floating && o ? "right" === o && s || "left" === o && !s : n && ("down" === n && i || "up" === n && !i)
		},
		_getDragVerticalDirection: function() {
			var t = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== t && (t > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function() {
			var t = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== t && (t > 0 ? "right" : "left")
		},
		refresh: function(t) {
			return this._refreshItems(t), this.refreshPositions(), this
		},
		_connectWith: function() {
			var t = this.options;
			return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
		},
		_getItemsAsjQuery: function(e) {
			var i, s, n, o, a = [],
				r = [],
				h = this._connectWith();
			if (h && e) for (i = h.length - 1; i >= 0; i--) for (n = t(h[i]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && r.push([t.isFunction(o.options.items) ? o.options.items.call(o.element) : t(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);
			for (r.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item: this.currentItem
			}) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = r.length - 1; i >= 0; i--) r[i][0].each(function() {
				a.push(this)
			});
			return t(a)
		},
		_removeCurrentsFromItems: function() {
			var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = t.grep(this.items, function(t) {
				for (var i = 0; i < e.length; i++) if (e[i] === t.item[0]) return !1;
				return !0
			})
		},
		_refreshItems: function(e) {
			this.items = [], this.containers = [this];
			var i, s, n, o, a, r, h, l, c = this.items,
				u = [
					[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
						item: this.currentItem
					}) : t(this.options.items, this.element), this]
				],
				d = this._connectWith();
			if (d && this.ready) for (i = d.length - 1; i >= 0; i--) for (n = t(d[i]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
				item: this.currentItem
			}) : t(o.options.items, o.element), o]), this.containers.push(o));
			for (i = u.length - 1; i >= 0; i--) for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({
				item: h,
				instance: a,
				width: 0,
				height: 0,
				left: 0,
				top: 0
			})
		},
		refreshPositions: function(e) {
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			var i, s, n, o;
			for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
			else for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			return this
		},
		_createPlaceholder: function(e) {
			e = e || this;
			var i, s = e.options;
			s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
				element: function() {
					var s = e.currentItem[0].nodeName.toLowerCase(),
						n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
					return "tr" === s ? e.currentItem.children().each(function() {
						t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(n)
					}) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
				},
				update: function(t, n) {
					(!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
				}
			}), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
		},
		_contactContainers: function(s) {
			var n, o, a, r, h, l, c, u, d, p, f = null,
				g = null;
			for (n = this.containers.length - 1; n >= 0; n--) if (!t.contains(this.currentItem[0], this.containers[n].element[0])) if (this._intersectsWith(this.containers[n].containerCache)) {
				if (f && t.contains(this.containers[n].element[0], f.element[0])) continue;
				f = this.containers[n], g = n
			} else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)), this.containers[n].containerCache.over = 0);
			if (f) if (1 === this.containers.length) this.containers[g].containerCache.over || (this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1);
			else {
				for (a = 1e4, r = null, p = f.floating || i(this.currentItem), h = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[h] + this.offset.click[h], o = this.items.length - 1; o >= 0; o--) t.contains(this.containers[g].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (u = this.items[o].item.offset()[h], d = !1, Math.abs(u - c) > Math.abs(u + this.items[o][l] - c) && (d = !0, u += this.items[o][l]), Math.abs(u - c) < a && (a = Math.abs(u - c), r = this.items[o], this.direction = d ? "up" : "down"));
				if (!r && !this.options.dropOnEmpty) return;
				if (this.currentContainer === this.containers[g]) return;
				r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[g].element, !0), this._trigger("change", s, this._uiHash()), this.containers[g]._trigger("change", s, this._uiHash(this)), this.currentContainer = this.containers[g], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1
			}
		},
		_createHelper: function(e) {
			var i = this.options,
				s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
			return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			}), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
		},
		_adjustOffsetFromHelper: function(e) {
			"string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
				left: +e[0],
				top: +e[1] || 0
			}), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var e = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
				top: 0,
				left: 0
			}), {
				top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" === this.cssPosition) {
				var t = this.currentItem.position();
				return {
					top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var e, i, s, n = this.options;
			"parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
		},
		_convertPositionTo: function(e, i) {
			i || (i = this.position);
			var s = "absolute" === e ? 1 : -1,
				n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				o = /(html|body)/i.test(n[0].tagName);
			return {
				top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
				left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
			}
		},
		_generatePosition: function(e) {
			var i, s, n = this.options,
				o = e.pageX,
				a = e.pageY,
				r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				h = /(html|body)/i.test(r[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
				top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
				left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
			}
		},
		_rearrange: function(t, e, i, s) {
			i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
			var n = this.counter;
			this._delay(function() {
				n === this.counter && this.refreshPositions(!s)
			})
		},
		_clear: function(t, e) {
			this.reverting = !1;
			var i, s = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else this.currentItem.show();
			for (this.fromOutside && !e && s.push(function(t) {
				this._trigger("receive", t, this._uiHash(this.fromOutside))
			}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
				this._trigger("update", t, this._uiHash())
			}), this !== this.currentContainer && (e || (s.push(function(t) {
				this._trigger("remove", t, this._uiHash())
			}), s.push(function(t) {
				return function(e) {
					t._trigger("receive", e, this._uiHash(this))
				}
			}.call(this, this.currentContainer)), s.push(function(t) {
				return function(e) {
					t._trigger("update", e, this._uiHash(this))
				}
			}.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) e || s.push(function(t) {
				return function(e) {
					t._trigger("deactivate", e, this._uiHash(this))
				}
			}.call(this, this.containers[i])), this.containers[i].containerCache.over && (s.push(function(t) {
				return function(e) {
					t._trigger("out", e, this._uiHash(this))
				}
			}.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
				if (!e) {
					for (this._trigger("beforeStop", t, this._uiHash()), i = 0; i < s.length; i++) s[i].call(this, t);
					this._trigger("stop", t, this._uiHash())
				}
				return this.fromOutside = !1, !1
			}
			if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
				for (i = 0; i < s.length; i++) s[i].call(this, t);
				this._trigger("stop", t, this._uiHash())
			}
			return this.fromOutside = !1, !0
		},
		_trigger: function() {
			t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
		},
		_uiHash: function(e) {
			var i = e || this;
			return {
				helper: i.helper,
				placeholder: i.placeholder || t([]),
				position: i.position,
				originalPosition: i.originalPosition,
				offset: i.positionAbs,
				item: i.currentItem,
				sender: e ? e.element : null
			}
		}
	})
}(jQuery), function(t, e) {
	var i = "ui-effects-";
	t.effects = {
		effect: {}
	}, function(t, e) {
		function i(t, e, i) {
			var s = u[e.type] || {};
			return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : s.max < t ? s.max : t)
		}
		function s(e) {
			var i = l(),
				s = i._rgba = [];
			return e = e.toLowerCase(), f(h, function(t, n) {
				var o, a = n.re.exec(e),
					r = a && n.parse(a),
					h = n.space || "rgba";
				return r ? (o = i[h](r), i[c[h].cache] = o[c[h].cache], s = i._rgba = o._rgba, !1) : void 0
			}), s.length ? ("0,0,0,0" === s.join() && t.extend(s, o.transparent), i) : o[e]
		}
		function n(t, e, i) {
			return i = (i + 1) % 1, 1 > 6 * i ? t + (e - t) * i * 6 : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
		}
		var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
			r = /^([\-+])=\s*(\d+\.?\d*)/,
			h = [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(t) {
					return [t[1], t[2], t[3], t[4]]
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(t) {
					return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
				}
			}, {
				re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse: function(t) {
					return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
				}
			}, {
				re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse: function(t) {
					return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space: "hsla",
				parse: function(t) {
					return [t[1], t[2] / 100, t[3] / 100, t[4]]
				}
			}],
			l = t.Color = function(e, i, s, n) {
				return new t.Color.fn.parse(e, i, s, n)
			},
			c = {
				rgba: {
					props: {
						red: {
							idx: 0,
							type: "byte"
						},
						green: {
							idx: 1,
							type: "byte"
						},
						blue: {
							idx: 2,
							type: "byte"
						}
					}
				},
				hsla: {
					props: {
						hue: {
							idx: 0,
							type: "degrees"
						},
						saturation: {
							idx: 1,
							type: "percent"
						},
						lightness: {
							idx: 2,
							type: "percent"
						}
					}
				}
			},
			u = {
				"byte": {
					floor: !0,
					max: 255
				},
				percent: {
					max: 1
				},
				degrees: {
					mod: 360,
					floor: !0
				}
			},
			d = l.support = {},
			p = t("<p>")[0],
			f = t.each;
		p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
			e.cache = "_" + t, e.props.alpha = {
				idx: 3,
				type: "percent",
				def: 1
			}
		}), l.fn = t.extend(l.prototype, {
			parse: function(n, a, r, h) {
				if (n === e) return this._rgba = [null, null, null, null], this;
				(n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
				var u = this,
					d = t.type(n),
					p = this._rgba = [];
				return a !== e && (n = [n, a, r, h], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
					p[e.idx] = i(n[e.idx], e)
				}), this) : "object" === d ? (n instanceof l ? f(c, function(t, e) {
					n[e.cache] && (u[e.cache] = n[e.cache].slice())
				}) : f(c, function(e, s) {
					var o = s.cache;
					f(s.props, function(t, e) {
						if (!u[o] && s.to) {
							if ("alpha" === t || null == n[t]) return;
							u[o] = s.to(u._rgba)
						}
						u[o][e.idx] = i(n[t], e, !0)
					}), u[o] && t.inArray(null, u[o].slice(0, 3)) < 0 && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])))
				}), this) : void 0
			},
			is: function(t) {
				var e = l(t),
					i = !0,
					s = this;
				return f(c, function(t, n) {
					var o, a = e[n.cache];
					return a && (o = s[n.cache] || n.to && n.to(s._rgba) || [], f(n.props, function(t, e) {
						return null != a[e.idx] ? i = a[e.idx] === o[e.idx] : void 0
					})), i
				}), i
			},
			_space: function() {
				var t = [],
					e = this;
				return f(c, function(i, s) {
					e[s.cache] && t.push(i)
				}), t.pop()
			},
			transition: function(t, e) {
				var s = l(t),
					n = s._space(),
					o = c[n],
					a = 0 === this.alpha() ? l("transparent") : this,
					r = a[o.cache] || o.to(a._rgba),
					h = r.slice();
				return s = s[o.cache], f(o.props, function(t, n) {
					var o = n.idx,
						a = r[o],
						l = s[o],
						c = u[n.type] || {};
					null !== l && (null === a ? h[o] = l : (c.mod && (l - a > c.mod / 2 ? a += c.mod : a - l > c.mod / 2 && (a -= c.mod)), h[o] = i((l - a) * e + a, n)))
				}), this[n](h)
			},
			blend: function(e) {
				if (1 === this._rgba[3]) return this;
				var i = this._rgba.slice(),
					s = i.pop(),
					n = l(e)._rgba;
				return l(t.map(i, function(t, e) {
					return (1 - s) * n[e] + s * t
				}))
			},
			toRgbaString: function() {
				var e = "rgba(",
					i = t.map(this._rgba, function(t, e) {
						return null == t ? e > 2 ? 1 : 0 : t
					});
				return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
			},
			toHslaString: function() {
				var e = "hsla(",
					i = t.map(this.hsla(), function(t, e) {
						return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
					});
				return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
			},
			toHexString: function(e) {
				var i = this._rgba.slice(),
					s = i.pop();
				return e && i.push(~~ (255 * s)), "#" + t.map(i, function(t) {
					return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
				}).join("")
			},
			toString: function() {
				return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
			}
		}), l.fn.parse.prototype = l.fn, c.hsla.to = function(t) {
			if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
			var e, i, s = t[0] / 255,
				n = t[1] / 255,
				o = t[2] / 255,
				a = t[3],
				r = Math.max(s, n, o),
				h = Math.min(s, n, o),
				l = r - h,
				c = r + h,
				u = .5 * c;
			return e = h === r ? 0 : s === r ? 60 * (n - o) / l + 360 : n === r ? 60 * (o - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a]
		}, c.hsla.from = function(t) {
			if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
			var e = t[0] / 360,
				i = t[1],
				s = t[2],
				o = t[3],
				a = .5 >= s ? s * (1 + i) : s + i - s * i,
				r = 2 * s - a;
			return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o]
		}, f(c, function(s, n) {
			var o = n.props,
				a = n.cache,
				h = n.to,
				c = n.from;
			l.fn[s] = function(s) {
				if (h && !this[a] && (this[a] = h(this._rgba)), s === e) return this[a].slice();
				var n, r = t.type(s),
					u = "array" === r || "object" === r ? s : arguments,
					d = this[a].slice();
				return f(o, function(t, e) {
					var s = u["object" === r ? t : e.idx];
					null == s && (s = d[e.idx]), d[e.idx] = i(s, e)
				}), c ? (n = l(c(d)), n[a] = d, n) : l(d)
			}, f(o, function(e, i) {
				l.fn[e] || (l.fn[e] = function(n) {
					var o, a = t.type(n),
						h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s,
						l = this[h](),
						c = l[i.idx];
					return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
				})
			})
		}), l.hook = function(e) {
			var i = e.split(" ");
			f(i, function(e, i) {
				t.cssHooks[i] = {
					set: function(e, n) {
						var o, a, r = "";
						if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
							if (n = l(o || n), !d.rgba && 1 !== n._rgba[3]) {
								for (a = "backgroundColor" === i ? e.parentNode : e;
								("" === r || "transparent" === r) && a && a.style;) try {
									r = t.css(a, "backgroundColor"), a = a.parentNode
								} catch (h) {}
								n = n.blend(r && "transparent" !== r ? r : "_default")
							}
							n = n.toRgbaString()
						}
						try {
							e.style[i] = n
						} catch (h) {}
					}
				}, t.fx.step[i] = function(e) {
					e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
				}
			})
		}, l.hook(a), t.cssHooks.borderColor = {
			expand: function(t) {
				var e = {};
				return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
					e["border" + s + "Color"] = t
				}), e
			}
		}, o = t.Color.names = {
			aqua: "#00ffff",
			black: "#000000",
			blue: "#0000ff",
			fuchsia: "#ff00ff",
			gray: "#808080",
			green: "#008000",
			lime: "#00ff00",
			maroon: "#800000",
			navy: "#000080",
			olive: "#808000",
			purple: "#800080",
			red: "#ff0000",
			silver: "#c0c0c0",
			teal: "#008080",
			white: "#ffffff",
			yellow: "#ffff00",
			transparent: [null, null, null, 0],
			_default: "#ffffff"
		}
	}(jQuery), function() {
		function i(e) {
			var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
				o = {};
			if (n && n.length && n[0] && n[n[0]]) for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]);
			else for (i in n)"string" == typeof n[i] && (o[i] = n[i]);
			return o
		}
		function s(e, i) {
			var s, n, a = {};
			for (s in i) n = i[s], e[s] !== n && (o[s] || (t.fx.step[s] || !isNaN(parseFloat(n))) && (a[s] = n));
			return a
		}
		var n = ["add", "remove", "toggle"],
			o = {
				border: 1,
				borderBottom: 1,
				borderColor: 1,
				borderLeft: 1,
				borderRight: 1,
				borderTop: 1,
				borderWidth: 1,
				margin: 1,
				padding: 1
			};
		t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
			t.fx.step[i] = function(t) {
				("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
			}
		}), t.fn.addBack || (t.fn.addBack = function(t) {
			return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
		}), t.effects.animateClass = function(e, o, a, r) {
			var h = t.speed(o, a, r);
			return this.queue(function() {
				var o, a = t(this),
					r = a.attr("class") || "",
					l = h.children ? a.find("*").addBack() : a;
				l = l.map(function() {
					var e = t(this);
					return {
						el: e,
						start: i(this)
					}
				}), o = function() {
					t.each(n, function(t, i) {
						e[i] && a[i + "Class"](e[i])
					})
				}, o(), l = l.map(function() {
					return this.end = i(this.el[0]), this.diff = s(this.start, this.end), this
				}), a.attr("class", r), l = l.map(function() {
					var e = this,
						i = t.Deferred(),
						s = t.extend({}, h, {
							queue: !1,
							complete: function() {
								i.resolve(e)
							}
						});
					return this.el.animate(this.diff, s), i.promise()
				}), t.when.apply(t, l.get()).done(function() {
					o(), t.each(arguments, function() {
						var e = this.el;
						t.each(this.diff, function(t) {
							e.css(t, "")
						})
					}), h.complete.call(a[0])
				})
			})
		}, t.fn.extend({
			addClass: function(e) {
				return function(i, s, n, o) {
					return s ? t.effects.animateClass.call(this, {
						add: i
					}, s, n, o) : e.apply(this, arguments)
				}
			}(t.fn.addClass),
			removeClass: function(e) {
				return function(i, s, n, o) {
					return arguments.length > 1 ? t.effects.animateClass.call(this, {
						remove: i
					}, s, n, o) : e.apply(this, arguments)
				}
			}(t.fn.removeClass),
			toggleClass: function(i) {
				return function(s, n, o, a, r) {
					return "boolean" == typeof n || n === e ? o ? t.effects.animateClass.call(this, n ? {
						add: s
					} : {
						remove: s
					}, o, a, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
						toggle: s
					}, n, o, a)
				}
			}(t.fn.toggleClass),
			switchClass: function(e, i, s, n, o) {
				return t.effects.animateClass.call(this, {
					add: i,
					remove: e
				}, s, n, o)
			}
		})
	}(), function() {
		function s(e, i, s, n) {
			return t.isPlainObject(e) && (i = e, e = e.effect), e = {
				effect: e
			}, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
		}
		function n(e) {
			return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
		}
		t.extend(t.effects, {
			version: "1.10.3",
			save: function(t, e) {
				for (var s = 0; s < e.length; s++) null !== e[s] && t.data(i + e[s], t[0].style[e[s]])
			},
			restore: function(t, s) {
				var n, o;
				for (o = 0; o < s.length; o++) null !== s[o] && (n = t.data(i + s[o]), n === e && (n = ""), t.css(s[o], n))
			},
			setMode: function(t, e) {
				return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
			},
			getBaseline: function(t, e) {
				var i, s;
				switch (t[0]) {
				case "top":
					i = 0;
					break;
				case "middle":
					i = .5;
					break;
				case "bottom":
					i = 1;
					break;
				default:
					i = t[0] / e.height
				}
				switch (t[1]) {
				case "left":
					s = 0;
					break;
				case "center":
					s = .5;
					break;
				case "right":
					s = 1;
					break;
				default:
					s = t[1] / e.width
				}
				return {
					x: s,
					y: i
				}
			},
			createWrapper: function(e) {
				if (e.parent().is(".ui-effects-wrapper")) return e.parent();
				var i = {
					width: e.outerWidth(!0),
					height: e.outerHeight(!0),
					"float": e.css("float")
				},
					s = t("<div></div>").addClass("ui-effects-wrapper").css({
						fontSize: "100%",
						background: "transparent",
						border: "none",
						margin: 0,
						padding: 0
					}),
					n = {
						width: e.width(),
						height: e.height()
					},
					o = document.activeElement;
				try {
					o.id
				} catch (a) {
					o = document.body
				}
				return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).focus(), s = e.parent(), "static" === e.css("position") ? (s.css({
					position: "relative"
				}), e.css({
					position: "relative"
				})) : (t.extend(i, {
					position: e.css("position"),
					zIndex: e.css("z-index")
				}), t.each(["top", "left", "bottom", "right"], function(t, s) {
					i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
				}), e.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				})), e.css(n), s.css(i).show()
			},
			removeWrapper: function(e) {
				var i = document.activeElement;
				return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
			},
			setTransition: function(e, i, s, n) {
				return n = n || {}, t.each(i, function(t, i) {
					var o = e.cssUnit(i);
					o[0] > 0 && (n[i] = o[0] * s + o[1])
				}), n
			}
		}), t.fn.extend({
			effect: function() {
				function e(e) {
					function s() {
						t.isFunction(o) && o.call(n[0]), t.isFunction(e) && e()
					}
					var n = t(this),
						o = i.complete,
						r = i.mode;
					(n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), s()) : a.call(n[0], i, s)
				}
				var i = s.apply(this, arguments),
					n = i.mode,
					o = i.queue,
					a = t.effects.effect[i.effect];
				return t.fx.off || !a ? n ? this[n](i.duration, i.complete) : this.each(function() {
					i.complete && i.complete.call(this)
				}) : o === !1 ? this.each(e) : this.queue(o || "fx", e)
			},
			show: function(t) {
				return function(e) {
					if (n(e)) return t.apply(this, arguments);
					var i = s.apply(this, arguments);
					return i.mode = "show", this.effect.call(this, i)
				}
			}(t.fn.show),
			hide: function(t) {
				return function(e) {
					if (n(e)) return t.apply(this, arguments);
					var i = s.apply(this, arguments);
					return i.mode = "hide", this.effect.call(this, i)
				}
			}(t.fn.hide),
			toggle: function(t) {
				return function(e) {
					if (n(e) || "boolean" == typeof e) return t.apply(this, arguments);
					var i = s.apply(this, arguments);
					return i.mode = "toggle", this.effect.call(this, i)
				}
			}(t.fn.toggle),
			cssUnit: function(e) {
				var i = this.css(e),
					s = [];
				return t.each(["em", "px", "%", "pt"], function(t, e) {
					i.indexOf(e) > 0 && (s = [parseFloat(i), e])
				}), s
			}
		})
	}(), function() {
		var e = {};
		t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
			e[i] = function(e) {
				return Math.pow(e, t + 2)
			}
		}), t.extend(e, {
			Sine: function(t) {
				return 1 - Math.cos(t * Math.PI / 2)
			},
			Circ: function(t) {
				return 1 - Math.sqrt(1 - t * t)
			},
			Elastic: function(t) {
				return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
			},
			Back: function(t) {
				return t * t * (3 * t - 2)
			},
			Bounce: function(t) {
				for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
				return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
			}
		}), t.each(e, function(e, i) {
			t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
				return 1 - i(1 - t)
			}, t.easing["easeInOut" + e] = function(t) {
				return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
			}
		})
	}()
}(jQuery), function(t) {
	var e = 0,
		i = {},
		s = {};
	i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", s.height = s.paddingTop = s.paddingBottom = s.borderTopWidth = s.borderBottomWidth = "show", t.widget("ui.accordion", {
		version: "1.10.3",
		options: {
			active: 0,
			animate: {},
			collapsible: !1,
			event: "click",
			header: "> li > :first-child,> :not(li):even",
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},
			activate: null,
			beforeActivate: null
		},
		_create: function() {
			var e = this.options;
			this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), e.active < 0 && (e.active += this.headers.length), this._refresh()
		},
		_getCreateEventData: function() {
			return {
				header: this.active,
				panel: this.active.length ? this.active.next() : t(),
				content: this.active.length ? this.active.next() : t()
			}
		},
		_createIcons: function() {
			var e = this.options.icons;
			e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
		},
		_destroyIcons: function() {
			this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
		},
		_destroy: function() {
			var t;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
				/^ui-accordion/.test(this.id) && this.removeAttribute("id")
			}), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
				/^ui-accordion/.test(this.id) && this.removeAttribute("id")
			}), "content" !== this.options.heightStyle && t.css("height", "")
		},
		_setOption: function(t, e) {
			return "active" === t ? (this._activate(e), void 0) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !! e), void 0)
		},
		_keydown: function(e) {
			if (!e.altKey && !e.ctrlKey) {
				var i = t.ui.keyCode,
					s = this.headers.length,
					n = this.headers.index(e.target),
					o = !1;
				switch (e.keyCode) {
				case i.RIGHT:
				case i.DOWN:
					o = this.headers[(n + 1) % s];
					break;
				case i.LEFT:
				case i.UP:
					o = this.headers[(n - 1 + s) % s];
					break;
				case i.SPACE:
				case i.ENTER:
					this._eventHandler(e);
					break;
				case i.HOME:
					o = this.headers[0];
					break;
				case i.END:
					o = this.headers[s - 1]
				}
				o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), e.preventDefault())
			}
		},
		_panelKeyDown: function(e) {
			e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
		},
		refresh: function() {
			var e = this.options;
			this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
		},
		_processPanels: function() {
			this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
		},
		_refresh: function() {
			var i, s = this.options,
				n = s.heightStyle,
				o = this.element.parent(),
				a = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
			this.active = this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(e) {
				var i = t(this),
					s = i.attr("id"),
					n = i.next(),
					o = n.attr("id");
				s || (s = a + "-header-" + e, i.attr("id", s)), o || (o = a + "-panel-" + e, n.attr("id", o)), i.attr("aria-controls", o), n.attr("aria-labelledby", s)
			}).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
				"aria-selected": "false",
				tabIndex: -1
			}).next().attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			}).hide(), this.active.length ? this.active.attr({
				"aria-selected": "true",
				tabIndex: 0
			}).next().attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(s.event), "fill" === n ? (i = o.height(), this.element.siblings(":visible").each(function() {
				var e = t(this),
					s = e.css("position");
				"absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
			}), this.headers.each(function() {
				i -= t(this).outerHeight(!0)
			}), this.headers.next().each(function() {
				t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
			}).css("overflow", "auto")) : "auto" === n && (i = 0, this.headers.next().each(function() {
				i = Math.max(i, t(this).css("height", "").height())
			}).height(i))
		},
		_activate: function(e) {
			var i = this._findActive(e)[0];
			i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
				target: i,
				currentTarget: i,
				preventDefault: t.noop
			}))
		},
		_findActive: function(e) {
			return "number" == typeof e ? this.headers.eq(e) : t()
		},
		_setupEvents: function(e) {
			var i = {
				keydown: "_keydown"
			};
			e && t.each(e.split(" "), function(t, e) {
				i[e] = "_eventHandler"
			}), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
				keydown: "_panelKeyDown"
			}), this._hoverable(this.headers), this._focusable(this.headers)
		},
		_eventHandler: function(e) {
			var i = this.options,
				s = this.active,
				n = t(e.currentTarget),
				o = n[0] === s[0],
				a = o && i.collapsible,
				r = a ? t() : n.next(),
				h = s.next(),
				l = {
					oldHeader: s,
					oldPanel: h,
					newHeader: a ? t() : n,
					newPanel: r
				};
			e.preventDefault(), o && !i.collapsible || this._trigger("beforeActivate", e, l) === !1 || (i.active = a ? !1 : this.headers.index(n), this.active = o ? t() : n, this._toggle(l), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), o || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")))
		},
		_toggle: function(e) {
			var i = e.newPanel,
				s = this.prevShow.length ? this.prevShow : e.oldPanel;
			this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			}), s.prev().attr("aria-selected", "false"), i.length && s.length ? s.prev().attr("tabIndex", -1) : i.length && this.headers.filter(function() {
				return 0 === t(this).attr("tabIndex")
			}).attr("tabIndex", -1), i.attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			}).prev().attr({
				"aria-selected": "true",
				tabIndex: 0
			})
		},
		_animate: function(t, e, n) {
			var o, a, r, h = this,
				l = 0,
				c = t.length && (!e.length || t.index() < e.index()),
				u = this.options.animate || {},
				d = c && u.down || u,
				p = function() {
					h._toggleComplete(n)
				};
			return "number" == typeof d && (r = d), "string" == typeof d && (a = d), a = a || d.easing || u.easing, r = r || d.duration || u.duration, e.length ? t.length ? (o = t.show().outerHeight(), e.animate(i, {
				duration: r,
				easing: a,
				step: function(t, e) {
					e.now = Math.round(t)
				}
			}), t.hide().animate(s, {
				duration: r,
				easing: a,
				complete: p,
				step: function(t, i) {
					i.now = Math.round(t), "height" !== i.prop ? l += i.now : "content" !== h.options.heightStyle && (i.now = Math.round(o - e.outerHeight() - l), l = 0)
				}
			}), void 0) : e.animate(i, r, a, p) : t.animate(s, r, a, p)
		},
		_toggleComplete: function(t) {
			var e = t.oldPanel;
			e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
		}
	})
}(jQuery), function(t) {
	var e = 0;
	t.widget("ui.autocomplete", {
		version: "1.10.3",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},
		pending: 0,
		_create: function() {
			var e, i, s, n = this.element[0].nodeName.toLowerCase(),
				o = "textarea" === n,
				a = "input" === n;
			this.isMultiLine = o ? !0 : a ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
				keydown: function(n) {
					if (this.element.prop("readOnly")) return e = !0, s = !0, i = !0, void 0;
					e = !1, s = !1, i = !1;
					var o = t.ui.keyCode;
					switch (n.keyCode) {
					case o.PAGE_UP:
						e = !0, this._move("previousPage", n);
						break;
					case o.PAGE_DOWN:
						e = !0, this._move("nextPage", n);
						break;
					case o.UP:
						e = !0, this._keyEvent("previous", n);
						break;
					case o.DOWN:
						e = !0, this._keyEvent("next", n);
						break;
					case o.ENTER:
					case o.NUMPAD_ENTER:
						this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
						break;
					case o.TAB:
						this.menu.active && this.menu.select(n);
						break;
					case o.ESCAPE:
						this.menu.element.is(":visible") && (this._value(this.term), this.close(n), n.preventDefault());
						break;
					default:
						i = !0, this._searchTimeout(n)
					}
				},
				keypress: function(s) {
					if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0;
					if (!i) {
						var n = t.ui.keyCode;
						switch (s.keyCode) {
						case n.PAGE_UP:
							this._move("previousPage", s);
							break;
						case n.PAGE_DOWN:
							this._move("nextPage", s);
							break;
						case n.UP:
							this._keyEvent("previous", s);
							break;
						case n.DOWN:
							this._keyEvent("next", s)
						}
					}
				},
				input: function(t) {
					return s ? (s = !1, t.preventDefault(), void 0) : (this._searchTimeout(t), void 0)
				},
				focus: function() {
					this.selectedItem = null, this.previous = this._value()
				},
				blur: function(t) {
					return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(t), this._change(t), void 0)
				}
			}), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
				role: null
			}).hide().data("ui-menu"), this._on(this.menu.element, {
				mousedown: function(e) {
					e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
						delete this.cancelBlur
					});
					var i = this.menu.element[0];
					t(e.target).closest(".ui-menu-item").length || this._delay(function() {
						var e = this;
						this.document.one("mousedown", function(s) {
							s.target === e.element[0] || s.target === i || t.contains(i, s.target) || e.close()
						})
					})
				},
				menufocus: function(e, i) {
					if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
						t(e.target).trigger(e.originalEvent)
					}), void 0;
					var s = i.item.data("ui-autocomplete-item");
					!1 !== this._trigger("focus", e, {
						item: s
					}) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value)
				},
				menuselect: function(t, e) {
					var i = e.item.data("ui-autocomplete-item"),
						s = this.previous;
					this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function() {
						this.previous = s, this.selectedItem = i
					})), !1 !== this._trigger("select", t, {
						item: i
					}) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
				}
			}), this.liveRegion = t("<span>", {
				role: "status",
				"aria-live": "polite"
			}).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_destroy: function() {
			clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
		},
		_setOption: function(t, e) {
			this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
		},
		_appendTo: function() {
			var e = this.options.appendTo;
			return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
		},
		_initSource: function() {
			var e, i, s = this;
			t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, s) {
				s(t.ui.autocomplete.filter(e, i.term))
			}) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, n) {
				s.xhr && s.xhr.abort(), s.xhr = t.ajax({
					url: i,
					data: e,
					dataType: "json",
					success: function(t) {
						n(t)
					},
					error: function() {
						n([])
					}
				})
			}) : this.source = this.options.source
		},
		_searchTimeout: function(t) {
			clearTimeout(this.searching), this.searching = this._delay(function() {
				this.term !== this._value() && (this.selectedItem = null, this.search(null, t))
			}, this.options.delay)
		},
		search: function(t, e) {
			return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
		},
		_search: function(t) {
			this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
				term: t
			}, this._response())
		},
		_response: function() {
			var t = this,
				i = ++e;
			return function(s) {
				i === e && t.__response(s), t.pending--, t.pending || t.element.removeClass("ui-autocomplete-loading")
			}
		},
		__response: function(t) {
			t && (t = this._normalize(t)), this._trigger("response", null, {
				content: t
			}), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
		},
		close: function(t) {
			this.cancelSearch = !0, this._close(t)
		},
		_close: function(t) {
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
		},
		_change: function(t) {
			this.previous !== this._value() && this._trigger("change", t, {
				item: this.selectedItem
			})
		},
		_normalize: function(e) {
			return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
				return "string" == typeof e ? {
					label: e,
					value: e
				} : t.extend({
					label: e.label || e.value,
					value: e.value || e.label
				}, e)
			})
		},
		_suggest: function(e) {
			var i = this.menu.element.empty();
			this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
				of: this.element
			}, this.options.position)), this.options.autoFocus && this.menu.next()
		},
		_resizeMenu: function() {
			var t = this.menu.element;
			t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(e, i) {
			var s = this;
			t.each(i, function(t, i) {
				s._renderItemData(e, i)
			})
		},
		_renderItemData: function(t, e) {
			return this._renderItem(t, e).data("ui-autocomplete-item", e)
		},
		_renderItem: function(e, i) {
			return t("<li>").append(t("<a>").text(i.label)).appendTo(e)
		},
		_move: function(t, e) {
			return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), this.menu.blur(), void 0) : (this.menu[t](e), void 0) : (this.search(null, e), void 0)
		},
		widget: function() {
			return this.menu.element
		},
		_value: function() {
			return this.valueMethod.apply(this.element, arguments)
		},
		_keyEvent: function(t, e) {
			(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
		}
	}), t.extend(t.ui.autocomplete, {
		escapeRegex: function(t) {
			return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		},
		filter: function(e, i) {
			var s = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
			return t.grep(e, function(t) {
				return s.test(t.label || t.value || t)
			})
		}
	}), t.widget("ui.autocomplete", t.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function(t) {
					return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
				}
			}
		},
		__response: function(t) {
			var e;
			this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e))
		}
	})
}(jQuery), function(t) {
	var e, i, s, n, o = "ui-button ui-widget ui-state-default ui-corner-all",
		a = "ui-state-hover ui-state-active ",
		r = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
		h = function() {
			var e = t(this);
			setTimeout(function() {
				e.find(":ui-button").button("refresh")
			}, 1)
		},
		l = function(e) {
			var i = e.name,
				s = e.form,
				n = t([]);
			return i && (i = i.replace(/'/g, "\\'"), n = s ? t(s).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function() {
				return !this.form
			})), n
		};
	t.widget("ui.button", {
		version: "1.10.3",
		defaultElement: "<button>",
		options: {
			disabled: null,
			text: !0,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, h), "boolean" != typeof this.options.disabled ? this.options.disabled = !! this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !! this.buttonElement.attr("title");
			var a = this,
				r = this.options,
				c = "checkbox" === this.type || "radio" === this.type,
				u = c ? "" : "ui-state-active",
				d = "ui-state-focus";
			null === r.label && (r.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(o).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
				r.disabled || this === e && t(this).addClass("ui-state-active")
			}).bind("mouseleave" + this.eventNamespace, function() {
				r.disabled || t(this).removeClass(u)
			}).bind("click" + this.eventNamespace, function(t) {
				r.disabled && (t.preventDefault(), t.stopImmediatePropagation())
			}), this.element.bind("focus" + this.eventNamespace, function() {
				a.buttonElement.addClass(d)
			}).bind("blur" + this.eventNamespace, function() {
				a.buttonElement.removeClass(d)
			}), c && (this.element.bind("change" + this.eventNamespace, function() {
				n || a.refresh()
			}), this.buttonElement.bind("mousedown" + this.eventNamespace, function(t) {
				r.disabled || (n = !1, i = t.pageX, s = t.pageY)
			}).bind("mouseup" + this.eventNamespace, function(t) {
				r.disabled || (i !== t.pageX || s !== t.pageY) && (n = !0)
			})), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
				return r.disabled || n ? !1 : void 0
			}) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
				if (r.disabled || n) return !1;
				t(this).addClass("ui-state-active"), a.buttonElement.attr("aria-pressed", "true");
				var e = a.element[0];
				l(e).not(e).map(function() {
					return t(this).button("widget")[0]
				}).removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
				return r.disabled ? !1 : (t(this).addClass("ui-state-active"), e = this, a.document.one("mouseup", function() {
					e = null
				}), void 0)
			}).bind("mouseup" + this.eventNamespace, function() {
				return r.disabled ? !1 : (t(this).removeClass("ui-state-active"), void 0)
			}).bind("keydown" + this.eventNamespace, function(e) {
				return r.disabled ? !1 : ((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"), void 0)
			}).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
				t(this).removeClass("ui-state-active")
			}), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
				e.keyCode === t.ui.keyCode.SPACE && t(this).click()
			})), this._setOption("disabled", r.disabled), this._resetButton()
		},
		_determineButtonType: function() {
			var t, e, i;
			this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
		},
		widget: function() {
			return this.buttonElement
		},
		_destroy: function() {
			this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(o + " " + a + " " + r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
		},
		_setOption: function(t, e) {
			return this._super(t, e), "disabled" === t ? (e ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), void 0) : (this._resetButton(), void 0)
		},
		refresh: function() {
			var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
			e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? l(this.element[0]).each(function() {
				t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
		},
		_resetButton: function() {
			if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
			var e = this.buttonElement.removeClass(r),
				i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
				s = this.options.icons,
				n = s.primary && s.secondary,
				o = [];
			s.primary || s.secondary ? (this.options.text && o.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (o.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : o.push("ui-button-text-only"), e.addClass(o.join(" "))
		}
	}), t.widget("ui.buttonset", {
		version: "1.10.3",
		options: {
			items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
		},
		_create: function() {
			this.element.addClass("ui-buttonset")
		},
		_init: function() {
			this.refresh()
		},
		_setOption: function(t, e) {
			"disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
		},
		refresh: function() {
			var e = "rtl" === this.element.css("direction");
			this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
				return t(this).button("widget")[0]
			}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
		},
		_destroy: function() {
			this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
				return t(this).button("widget")[0]
			}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
		}
	})
}(jQuery), function(t, e) {
	function i() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, t.extend(this._defaults, this.regional[""]), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
	}
	function s(e) {
		var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return e.delegate(i, "mouseout", function() {
			t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
		}).delegate(i, "mouseover", function() {
			t.datepicker._isDisabledDatepicker(o.inline ? e.parent()[0] : o.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
		})
	}
	function n(e, i) {
		t.extend(e, i);
		for (var s in i) null == i[s] && (e[s] = i[s]);
		return e
	}
	t.extend(t.ui, {
		datepicker: {
			version: "1.10.3"
		}
	});
	var o, a = "datepicker";
	t.extend(i.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(t) {
			return n(this._defaults, t || {}), this
		},
		_attachDatepicker: function(e, i) {
			var s, n, o;
			s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o)
		},
		_newInst: function(e, i) {
			var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id: n,
				input: e,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: i,
				dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function(e, i) {
			var s = t(e);
			i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, a, i), i.settings.disabled && this._disableDatepicker(e))
		},
		_attachments: function(e, i) {
			var s, n, o, a = this._get(i, "appendText"),
				r = this._get(i, "isRTL");
			i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
				src: o,
				alt: n,
				title: n
			}) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
				src: o,
				alt: n,
				title: n
			}) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.click(function() {
				return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
			}))
		},
		_autoSize: function(t) {
			if (this._get(t, "autoSize") && !t.inline) {
				var e, i, s, n, o = new Date(2009, 11, 20),
					a = this._get(t, "dateFormat");
				a.match(/[DM]/) && (e = function(t) {
					for (i = 0, s = 0, n = 0; n < t.length; n++) t[n].length > i && (i = t[n].length, s = n);
					return s
				}, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
			}
		},
		_inlineDatepicker: function(e, i) {
			var s = t(e);
			s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, a, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(e, i, s, o, r) {
			var h, l, c, u, d, p = this._dialogInst;
			return p || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], a, p)), n(p.settings, o || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = r ? r.length ? r : [r.pageX, r.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], a, p), this
		},
		_destroyDatepicker: function(e) {
			var i, s = t(e),
				n = t.data(e, a);
			s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, a), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
		},
		_enableDatepicker: function(e) {
			var i, s, n = t(e),
				o = t.data(e, a);
			n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
				return t === e ? null : t
			}))
		},
		_disableDatepicker: function(e) {
			var i, s, n = t(e),
				o = t.data(e, a);
			n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
				return t === e ? null : t
			}), this._disabledInputs[this._disabledInputs.length] = e)
		},
		_isDisabledDatepicker: function(t) {
			if (!t) return !1;
			for (var e = 0; e < this._disabledInputs.length; e++) if (this._disabledInputs[e] === t) return !0;
			return !1
		},
		_getInst: function(e) {
			try {
				return t.data(e, a)
			} catch (i) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(i, s, o) {
			var a, r, h, l, c = this._getInst(i);
			return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? t.extend({}, t.datepicker._defaults) : c ? "all" === s ? t.extend({}, c.settings) : this._get(c, s) : null : (a = s || {}, "string" == typeof s && (a = {}, a[s] = o), c && (this._curInst === c && this._hideDatepicker(), r = this._getDateDatepicker(i, !0), h = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), n(c.settings, a), null !== h && a.dateFormat !== e && a.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && a.dateFormat !== e && a.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), "disabled" in a && (a.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c), this._autoSize(c), this._setDate(c, r), this._updateAlternate(c), this._updateDatepicker(c)), void 0)
		},
		_changeDatepicker: function(t, e, i) {
			this._optionDatepicker(t, e, i)
		},
		_refreshDatepicker: function(t) {
			var e = this._getInst(t);
			e && this._updateDatepicker(e)
		},
		_setDateDatepicker: function(t, e) {
			var i = this._getInst(t);
			i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
		},
		_getDateDatepicker: function(t, e) {
			var i = this._getInst(t);
			return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
		},
		_doKeyDown: function(e) {
			var i, s, n, o = t.datepicker._getInst(e.target),
				a = !0,
				r = o.dpDiv.is(".ui-datepicker-rtl");
			if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
			case 9:
				t.datepicker._hideDatepicker(), a = !1;
				break;
			case 13:
				return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;
			case 27:
				t.datepicker._hideDatepicker();
				break;
			case 33:
				t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
				break;
			case 34:
				t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
				break;
			case 35:
				(e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
				break;
			case 36:
				(e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
				break;
			case 37:
				(e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
				break;
			case 38:
				(e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
				break;
			case 39:
				(e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
				break;
			case 40:
				(e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
				break;
			default:
				a = !1
			} else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
			a && (e.preventDefault(), e.stopPropagation())
		},
		_doKeyPress: function(e) {
			var i, s, n = t.datepicker._getInst(e.target);
			return t.datepicker._get(n, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0
		},
		_doKeyUp: function(e) {
			var i, s = t.datepicker._getInst(e.target);
			if (s.input.val() !== s.lastVal) try {
				i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
			} catch (n) {}
			return !0
		},
		_showDatepicker: function(e) {
			if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
				var i, s, o, a, r, h, l;
				i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(i, "beforeShow"), o = s ? s.apply(e, [e, i]) : {}, o !== !1 && (n(i.settings, o), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function() {
					return a |= "fixed" === t(this).css("position"), !a
				}), r = {
					left: t.datepicker._pos[0],
					top: t.datepicker._pos[1]
				}, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				}), t.datepicker._updateDatepicker(i), r = t.datepicker._checkOffset(i, r, a), i.dpDiv.css({
					position: t.datepicker._inDialog && t.blockUI ? "static" : a ? "fixed" : "absolute",
					display: "none",
					left: r.left + "px",
					top: r.top + "px"
				}), i.inline || (h = t.datepicker._get(i, "showAnim"), l = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
			}
		},
		_updateDatepicker: function(e) {
			this.maxRows = 4, o = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
			var i, s = this._getNumberOfMonths(e),
				n = s[1],
				a = 17;
			e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
				i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function(t) {
			return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
		},
		_checkOffset: function(e, i, s) {
			var n = e.dpDiv.outerWidth(),
				o = e.dpDiv.outerHeight(),
				a = e.input ? e.input.outerWidth() : 0,
				r = e.input ? e.input.outerHeight() : 0,
				h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
				l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
			return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + o > l && l > o ? Math.abs(o + r) : 0), i
		},
		_findPos: function(e) {
			for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? "previousSibling" : "nextSibling"];
			return i = t(e).offset(), [i.left, i.top]
		},
		_hideDatepicker: function(e) {
			var i, s, n, o, r = this._curInst;
			!r || e && r !== t.data(e, a) || this._datepickerShowing && (i = this._get(r, "showAnim"), s = this._get(r, "duration"), n = function() {
				t.datepicker._tidyDialog(r)
			}, t.effects && (t.effects.effect[i] || t.effects[i]) ? r.dpDiv.hide(i, t.datepicker._get(r, "showOptions"), s, n) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(r, "onClose"), o && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function(t) {
			t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(e) {
			if (t.datepicker._curInst) {
				var i = t(e.target),
					s = t.datepicker._getInst(i[0]);
				(i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function(e, i, s) {
			var n = t(e),
				o = this._getInst(n[0]);
			this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o))
		},
		_gotoToday: function(e) {
			var i, s = t(e),
				n = this._getInst(s[0]);
			this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
		},
		_selectMonthYear: function(e, i, s) {
			var n = t(e),
				o = this._getInst(n[0]);
			o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n)
		},
		_selectDay: function(e, i, s, n) {
			var o, a = t(e);
			t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
		},
		_clearDate: function(e) {
			var i = t(e);
			this._selectDate(i, "")
		},
		_selectDate: function(e, i) {
			var s, n = t(e),
				o = this._getInst(n[0]);
			i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(e) {
			var i, s, n, o = this._get(e, "altField");
			o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).each(function() {
				t(this).val(n)
			}))
		},
		noWeekends: function(t) {
			var e = t.getDay();
			return [e > 0 && 6 > e, ""]
		},
		iso8601Week: function(t) {
			var e, i = new Date(t.getTime());
			return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
		},
		parseDate: function(e, i, s) {
			if (null == e || null == i) throw "Invalid arguments";
			if (i = "object" == typeof i ? i.toString() : i + "", "" === i) return null;
			var n, o, a, r, h = 0,
				l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				c = "string" != typeof l ? l : (new Date).getFullYear() % 100 + parseInt(l, 10),
				u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
				d = (s ? s.dayNames : null) || this._defaults.dayNames,
				p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
				f = (s ? s.monthNames : null) || this._defaults.monthNames,
				g = -1,
				m = -1,
				v = -1,
				_ = -1,
				b = !1,
				y = function(t) {
					var i = n + 1 < e.length && e.charAt(n + 1) === t;
					return i && n++, i
				},
				w = function(t) {
					var e = y(t),
						s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
						n = new RegExp("^\\d{1," + s + "}"),
						o = i.substring(h).match(n);
					if (!o) throw "Missing number at position " + h;
					return h += o[0].length, parseInt(o[0], 10)
				},
				k = function(e, s, n) {
					var o = -1,
						a = t.map(y(e) ? n : s, function(t, e) {
							return [[e, t]]
						}).sort(function(t, e) {
							return -(t[1].length - e[1].length)
						});
					if (t.each(a, function(t, e) {
						var s = e[1];
						return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (o = e[0], h += s.length, !1) : void 0
					}), -1 !== o) return o + 1;
					throw "Unknown name at position " + h
				},
				x = function() {
					if (i.charAt(h) !== e.charAt(n)) throw "Unexpected literal at position " + h;
					h++
				};
			for (n = 0; n < e.length; n++) if (b)"'" !== e.charAt(n) || y("'") ? x() : b = !1;
			else switch (e.charAt(n)) {
			case "d":
				v = w("d");
				break;
			case "D":
				k("D", u, d);
				break;
			case "o":
				_ = w("o");
				break;
			case "m":
				m = w("m");
				break;
			case "M":
				m = k("M", p, f);
				break;
			case "y":
				g = w("y");
				break;
			case "@":
				r = new Date(w("@")), g = r.getFullYear(), m = r.getMonth() + 1, v = r.getDate();
				break;
			case "!":
				r = new Date((w("!") - this._ticksTo1970) / 1e4), g = r.getFullYear(), m = r.getMonth() + 1, v = r.getDate();
				break;
			case "'":
				y("'") ? x() : b = !0;
				break;
			default:
				x()
			}
			if (h < i.length && (a = i.substr(h), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
			if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c >= g ? 0 : -100)), _ > -1) for (m = 1, v = _;;) {
				if (o = this._getDaysInMonth(g, m - 1), o >= v) break;
				m++, v -= o
			}
			if (r = this._daylightSavingAdjust(new Date(g, m - 1, v)), r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== v) throw "Invalid date";
			return r
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
		formatDate: function(t, e, i) {
			if (!e) return "";
			var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
				o = (i ? i.dayNames : null) || this._defaults.dayNames,
				a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
				r = (i ? i.monthNames : null) || this._defaults.monthNames,
				h = function(e) {
					var i = s + 1 < t.length && t.charAt(s + 1) === e;
					return i && s++, i
				},
				l = function(t, e, i) {
					var s = "" + e;
					if (h(t)) for (; s.length < i;) s = "0" + s;
					return s
				},
				c = function(t, e, i, s) {
					return h(t) ? s[e] : i[e]
				},
				u = "",
				d = !1;
			if (e) for (s = 0; s < t.length; s++) if (d)"'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;
			else switch (t.charAt(s)) {
			case "d":
				u += l("d", e.getDate(), 2);
				break;
			case "D":
				u += c("D", e.getDay(), n, o);
				break;
			case "o":
				u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
				break;
			case "m":
				u += l("m", e.getMonth() + 1, 2);
				break;
			case "M":
				u += c("M", e.getMonth(), a, r);
				break;
			case "y":
				u += h("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + e.getYear() % 100;
				break;
			case "@":
				u += e.getTime();
				break;
			case "!":
				u += 1e4 * e.getTime() + this._ticksTo1970;
				break;
			case "'":
				h("'") ? u += "'" : d = !0;
				break;
			default:
				u += t.charAt(s)
			}
			return u
		},
		_possibleChars: function(t) {
			var e, i = "",
				s = !1,
				n = function(i) {
					var s = e + 1 < t.length && t.charAt(e + 1) === i;
					return s && e++, s
				};
			for (e = 0; e < t.length; e++) if (s)"'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
			else switch (t.charAt(e)) {
			case "d":
			case "m":
			case "y":
			case "@":
				i += "0123456789";
				break;
			case "D":
			case "M":
				return null;
			case "'":
				n("'") ? i += "'" : s = !0;
				break;
			default:
				i += t.charAt(e)
			}
			return i
		},
		_get: function(t, i) {
			return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
		},
		_setDateFromField: function(t, e) {
			if (t.input.val() !== t.lastVal) {
				var i = this._get(t, "dateFormat"),
					s = t.lastVal = t.input ? t.input.val() : null,
					n = this._getDefaultDate(t),
					o = n,
					a = this._getFormatConfig(t);
				try {
					o = this.parseDate(i, s, a) || n
				} catch (r) {
					s = e ? "" : s
				}
				t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t)
			}
		},
		_getDefaultDate: function(t) {
			return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
		},
		_determineDate: function(e, i, s) {
			var n = function(t) {
					var e = new Date;
					return e.setDate(e.getDate() + t), e
				},
				o = function(i) {
					try {
						return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
					} catch (s) {}
					for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
						switch (l[2] || "d") {
						case "d":
						case "D":
							r += parseInt(l[1], 10);
							break;
						case "w":
						case "W":
							r += 7 * parseInt(l[1], 10);
							break;
						case "m":
						case "M":
							a += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
							break;
						case "y":
						case "Y":
							o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
						}
						l = h.exec(i)
					}
					return new Date(o, a, r)
				},
				a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
			return a = a && "Invalid Date" === a.toString() ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
		},
		_daylightSavingAdjust: function(t) {
			return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
		},
		_setDate: function(t, e, i) {
			var s = !e,
				n = t.selectedMonth,
				o = t.selectedYear,
				a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
			t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
		},
		_getDate: function(t) {
			var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
			return e
		},
		_attachHandlers: function(e) {
			var i = this._get(e, "stepMonths"),
				s = "#" + e.id.replace(/\\\\/g, "\\");
			e.dpDiv.find("[data-handler]").map(function() {
				var e = {
					prev: function() {
						t.datepicker._adjustDate(s, -i, "M")
					},
					next: function() {
						t.datepicker._adjustDate(s, +i, "M")
					},
					hide: function() {
						t.datepicker._hideDatepicker()
					},
					today: function() {
						t.datepicker._gotoToday(s)
					},
					selectDay: function() {
						return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return t.datepicker._selectMonthYear(s, this, "M"), !1
					},
					selectYear: function() {
						return t.datepicker._selectMonthYear(s, this, "Y"), !1
					}
				};
				t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(t) {
			var e, i, s, n, o, a, r, h, l, c, u, d, p, f, g, m, v, _, b, y, w, k, x, D, C, I, P, T, M, S, z, A, H, W, E, N, O, F, R, L = new Date,
				j = this._daylightSavingAdjust(new Date(L.getFullYear(), L.getMonth(), L.getDate())),
				Y = this._get(t, "isRTL"),
				B = this._get(t, "showButtonPanel"),
				K = this._get(t, "hideIfNoPrevNext"),
				U = this._get(t, "navigationAsDateFormat"),
				q = this._getNumberOfMonths(t),
				V = this._get(t, "showCurrentAtPos"),
				Q = this._get(t, "stepMonths"),
				X = 1 !== q[0] || 1 !== q[1],
				$ = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
				G = this._getMinMaxDate(t, "min"),
				J = this._getMinMaxDate(t, "max"),
				Z = t.drawMonth - V,
				te = t.drawYear;
			if (0 > Z && (Z += 12, te--), J) for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - q[0] * q[1] + 1, J.getDate())), e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--);
			for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = U ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - Q, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : K ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = U ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + Q, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : K ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? $ : j, a = U ? this.formatDate(a, r, this._getFormatConfig(t)) : a, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; k < q[0]; k++) {
				for (x = "", this.maxRows = 4, D = 0; D < q[1]; D++) {
					if (C = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), I = " ui-corner-all", P = "", X) {
						if (P += "<div class='ui-datepicker-group", q[1] > 1) switch (D) {
						case 0:
							P += " ui-datepicker-group-first", I = " ui-corner-" + (Y ? "right" : "left");
							break;
						case q[1] - 1:
							P += " ui-datepicker-group-last", I = " ui-corner-" + (Y ? "left" : "right");
							break;
						default:
							P += " ui-datepicker-group-middle", I = ""
						}
						P += "'>"
					}
					for (P += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + I + "'>" + (/all|left/.test(I) && 0 === k ? Y ? o : s : "") + (/all|right/.test(I) && 0 === k ? Y ? s : o : "") + this._generateMonthYearHeader(t, Z, te, G, J, k > 0 || D > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead><tr>", T = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) M = (w + c) % 7, T += "<th" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[M] + "'>" + p[M] + "</span></th>";
					for (P += T + "</tr></thead><tbody>", S = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, S)), z = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, A = Math.ceil((z + S) / 7), H = X ? this.maxRows > A ? this.maxRows : A : A, this.maxRows = H, W = this._daylightSavingAdjust(new Date(te, Z, 1 - z)), E = 0; H > E; E++) {
						for (P += "<tr>", N = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(W) + "</td>" : "", w = 0; 7 > w; w++) O = m ? m.apply(t.input ? t.input[0] : null, [W]) : [!0, ""], F = W.getMonth() !== Z, R = F && !_ || !O[0] || G && G > W || J && W > J, N += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (W.getTime() === C.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === W.getTime() && b.getTime() === C.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !v ? "" : " " + O[1] + (W.getTime() === $.getTime() ? " " + this._currentClass : "") + (W.getTime() === j.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + W.getMonth() + "' data-year='" + W.getFullYear() + "'") + ">" + (F && !v ? "&#xa0;" : R ? "<span class='ui-state-default'>" + W.getDate() + "</span>" : "<a class='ui-state-default" + (W.getTime() === j.getTime() ? " ui-state-highlight" : "") + (W.getTime() === $.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + W.getDate() + "</a>") + "</td>", W.setDate(W.getDate() + 1), W = this._daylightSavingAdjust(W);
						P += N + "</tr>"
					}
					Z++, Z > 11 && (Z = 0, te++), P += "</tbody></table>" + (X ? "</div>" + (q[0] > 0 && D === q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += P
				}
				y += x
			}
			return y += l, t._keyEvent = !1, y
		},
		_generateMonthYearHeader: function(t, e, i, s, n, o, a, r) {
			var h, l, c, u, d, p, f, g, m = this._get(t, "changeMonth"),
				v = this._get(t, "changeYear"),
				_ = this._get(t, "showMonthAfterYear"),
				b = "<div class='ui-datepicker-title'>",
				y = "";
			if (o || !m) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
			else {
				for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!h || c >= s.getMonth()) && (!l || c <= n.getMonth()) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
				y += "</select>"
			}
			if (_ || (b += y + (!o && m && v ? "" : "&#xa0;")), !t.yearshtml) if (t.yearshtml = "", o || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
			else {
				for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
					var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
					return isNaN(e) ? d : e
				}, f = p(u[0]), g = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
				t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
			}
			return b += this._get(t, "yearSuffix"), _ && (b += (!o && m && v ? "" : "&#xa0;") + y), b += "</div>"
		},
		_adjustInstDate: function(t, e, i) {
			var s = t.drawYear + ("Y" === i ? e : 0),
				n = t.drawMonth + ("M" === i ? e : 0),
				o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
				a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
			t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
		},
		_restrictMinMax: function(t, e) {
			var i = this._getMinMaxDate(t, "min"),
				s = this._getMinMaxDate(t, "max"),
				n = i && i > e ? i : e;
			return s && n > s ? s : n
		},
		_notifyChange: function(t) {
			var e = this._get(t, "onChangeMonthYear");
			e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
		},
		_getNumberOfMonths: function(t) {
			var e = this._get(t, "numberOfMonths");
			return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
		},
		_getMinMaxDate: function(t, e) {
			return this._determineDate(t, this._get(t, e + "Date"), null)
		},
		_getDaysInMonth: function(t, e) {
			return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
		},
		_getFirstDayOfMonth: function(t, e) {
			return new Date(t, e, 1).getDay()
		},
		_canAdjustMonth: function(t, e, i, s) {
			var n = this._getNumberOfMonths(t),
				o = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
			return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
		},
		_isInRange: function(t, e) {
			var i, s, n = this._getMinMaxDate(t, "min"),
				o = this._getMinMaxDate(t, "max"),
				a = null,
				r = null,
				h = this._get(t, "yearRange");
			return h && (i = h.split(":"), s = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || e.getFullYear() <= r)
		},
		_getFormatConfig: function(t) {
			var e = this._get(t, "shortYearCutoff");
			return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
				shortYearCutoff: e,
				dayNamesShort: this._get(t, "dayNamesShort"),
				dayNames: this._get(t, "dayNames"),
				monthNamesShort: this._get(t, "monthNamesShort"),
				monthNames: this._get(t, "monthNames")
			}
		},
		_formatDate: function(t, e, i, s) {
			e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
			var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
			return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
		}
	}), t.fn.datepicker = function(e) {
		if (!this.length) return this;
		t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
		var i = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
			"string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
		}) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
	}, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.3"
}(jQuery), function(t) {
	var e = {
		buttons: !0,
		height: !0,
		maxHeight: !0,
		maxWidth: !0,
		minHeight: !0,
		minWidth: !0,
		width: !0
	},
		i = {
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0
		};
	t.widget("ui.dialog", {
		version: "1.10.3",
		options: {
			appendTo: "body",
			autoOpen: !0,
			buttons: [],
			closeOnEscape: !0,
			closeText: "close",
			dialogClass: "",
			draggable: !0,
			hide: null,
			height: "auto",
			maxHeight: null,
			maxWidth: null,
			minHeight: 150,
			minWidth: 150,
			modal: !1,
			position: {
				my: "center",
				at: "center",
				of: window,
				collision: "fit",
				using: function(e) {
					var i = t(this).css(e).offset().top;
					0 > i && t(this).css("top", e.top - i)
				}
			},
			resizable: !0,
			show: null,
			title: null,
			width: 300,
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null
		},
		_create: function() {
			this.originalCss = {
				display: this.element[0].style.display,
				width: this.element[0].style.width,
				minHeight: this.element[0].style.minHeight,
				maxHeight: this.element[0].style.maxHeight,
				height: this.element[0].style.height
			}, this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.parent().children().index(this.element)
			}, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1
		},
		_init: function() {
			this.options.autoOpen && this.open()
		},
		_appendTo: function() {
			var e = this.options.appendTo;
			return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
		},
		_destroy: function() {
			var t, e = this.originalPosition;
			this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
		},
		widget: function() {
			return this.uiDialog
		},
		disable: t.noop,
		enable: t.noop,
		close: function(e) {
			var i = this;
			this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || t(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
				i._trigger("close", e)
			}))
		},
		isOpen: function() {
			return this._isOpen
		},
		moveToTop: function() {
			this._moveToTop()
		},
		_moveToTop: function(t, e) {
			var i = !! this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
			return i && !e && this._trigger("focus", t), i
		},
		open: function() {
			var e = this;
			return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
				e._focusTabbable(), e._trigger("focus")
			}), this._trigger("open"), void 0)
		},
		_focusTabbable: function() {
			var t = this.element.find("[autofocus]");
			t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
		},
		_keepFocus: function(e) {
			function i() {
				var e = this.document[0].activeElement,
					i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
				i || this._focusTabbable()
			}
			e.preventDefault(), i.call(this), this._delay(i)
		},
		_createWrapper: function() {
			this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
				tabIndex: -1,
				role: "dialog"
			}).appendTo(this._appendTo()), this._on(this.uiDialog, {
				keydown: function(e) {
					if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), void 0;
					if (e.keyCode === t.ui.keyCode.TAB) {
						var i = this.uiDialog.find(":tabbable"),
							s = i.filter(":first"),
							n = i.filter(":last");
						e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (n.focus(1), e.preventDefault()) : (s.focus(1), e.preventDefault())
					}
				},
				mousedown: function(t) {
					this._moveToTop(t) && this._focusTabbable()
				}
			}), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
				"aria-describedby": this.element.uniqueId().attr("id")
			})
		},
		_createTitlebar: function() {
			var e;
			this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
				mousedown: function(e) {
					t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
				}
			}), this.uiDialogTitlebarClose = t("<button></button>").button({
				label: this.options.closeText,
				icons: {
					primary: "ui-icon-closethick"
				},
				text: !1
			}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
				click: function(t) {
					t.preventDefault(), this.close(t)
				}
			}), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({
				"aria-labelledby": e.attr("id")
			})
		},
		_title: function(t) {
			this.options.title || t.html("&#160;"), t.text(this.options.title)
		},
		_createButtonPane: function() {
			this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
		},
		_createButtons: function() {
			var e = this,
				i = this.options.buttons;
			return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0) : (t.each(i, function(i, s) {
				var n, o;
				s = t.isFunction(s) ? {
					click: s,
					text: i
				} : s, s = t.extend({
					type: "button"
				}, s), n = s.click, s.click = function() {
					n.apply(e.element[0], arguments)
				}, o = {
					icons: s.icons,
					text: s.showText
				}, delete s.icons, delete s.showText, t("<button></button>", s).button(o).appendTo(e.uiButtonSet)
			}), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
		},
		_makeDraggable: function() {
			function e(t) {
				return {
					position: t.position,
					offset: t.offset
				}
			}
			var i = this,
				s = this.options;
			this.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function(s, n) {
					t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n))
				},
				drag: function(t, s) {
					i._trigger("drag", t, e(s))
				},
				stop: function(n, o) {
					s.position = [o.position.left - i.document.scrollLeft(), o.position.top - i.document.scrollTop()], t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o))
				}
			})
		},
		_makeResizable: function() {
			function e(t) {
				return {
					originalPosition: t.originalPosition,
					originalSize: t.originalSize,
					position: t.position,
					size: t.size
				}
			}
			var i = this,
				s = this.options,
				n = s.resizable,
				o = this.uiDialog.css("position"),
				a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
			this.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: this.element,
				maxWidth: s.maxWidth,
				maxHeight: s.maxHeight,
				minWidth: s.minWidth,
				minHeight: this._minHeight(),
				handles: a,
				start: function(s, n) {
					t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n))
				},
				resize: function(t, s) {
					i._trigger("resize", t, e(s))
				},
				stop: function(n, o) {
					s.height = t(this).height(), s.width = t(this).width(), t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o))
				}
			}).css("position", o)
		},
		_minHeight: function() {
			var t = this.options;
			return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
		},
		_position: function() {
			var t = this.uiDialog.is(":visible");
			t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
		},
		_setOptions: function(s) {
			var n = this,
				o = !1,
				a = {};
			t.each(s, function(t, s) {
				n._setOption(t, s), t in e && (o = !0), t in i && (a[t] = s)
			}), o && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", a)
		},
		_setOption: function(t, e) {
			var i, s, n = this.uiDialog;
			"dialogClass" === t && n.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
				label: "" + e
			}), "draggable" === t && (i = n.is(":data(ui-draggable)"), i && !e && n.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (s = n.is(":data(ui-resizable)"), s && !e && n.resizable("destroy"), s && "string" == typeof e && n.resizable("option", "handles", e), s || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
		},
		_size: function() {
			var t, e, i, s = this.options;
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				maxHeight: "none",
				height: 0
			}), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({
				height: "auto",
				width: s.width
			}).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({
				minHeight: e,
				maxHeight: i,
				height: "auto"
			}) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
		},
		_blockFrames: function() {
			this.iframeBlocks = this.document.find("iframe").map(function() {
				var e = t(this);
				return t("<div>").css({
					position: "absolute",
					width: e.outerWidth(),
					height: e.outerHeight()
				}).appendTo(e.parent()).offset(e.offset())[0]
			})
		},
		_unblockFrames: function() {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_allowInteraction: function(e) {
			return t(e.target).closest(".ui-dialog").length ? !0 : !! t(e.target).closest(".ui-datepicker").length
		},
		_createOverlay: function() {
			if (this.options.modal) {
				var e = this,
					i = this.widgetFullName;
				t.ui.dialog.overlayInstances || this._delay(function() {
					t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(s) {
						e._allowInteraction(s) || (s.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
					})
				}), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
					mousedown: "_keepFocus"
				}), t.ui.dialog.overlayInstances++
			}
		},
		_destroyOverlay: function() {
			this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
		}
	}), t.ui.dialog.overlayInstances = 0, t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, {
		_position: function() {
			var e, i = this.options.position,
				s = [],
				n = [0, 0];
			i ? (("string" == typeof i || "object" == typeof i && "0" in i) && (s = i.split ? i.split(" ") : [i[0], i[1]], 1 === s.length && (s[1] = s[0]), t.each(["left", "top"], function(t, e) {
				+s[t] === s[t] && (n[t] = s[t], s[t] = e)
			}), i = {
				my: s[0] + (n[0] < 0 ? n[0] : "+" + n[0]) + " " + s[1] + (n[1] < 0 ? n[1] : "+" + n[1]),
				at: s.join(" ")
			}), i = t.extend({}, t.ui.dialog.prototype.options.position, i)) : i = t.ui.dialog.prototype.options.position, e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(i), e || this.uiDialog.hide()
		}
	})
}(jQuery), function(t) {
	var e = /up|down|vertical/,
		i = /up|left|vertical|horizontal/;
	t.effects.effect.blind = function(s, n) {
		var o, a, r, h = t(this),
			l = ["position", "top", "bottom", "left", "right", "height", "width"],
			c = t.effects.setMode(h, s.mode || "hide"),
			u = s.direction || "up",
			d = e.test(u),
			p = d ? "height" : "width",
			f = d ? "top" : "left",
			g = i.test(u),
			m = {},
			v = "show" === c;
		h.parent().is(".ui-effects-wrapper") ? t.effects.save(h.parent(), l) : t.effects.save(h, l), h.show(), o = t.effects.createWrapper(h).css({
			overflow: "hidden"
		}), a = o[p](), r = parseFloat(o.css(f)) || 0, m[p] = v ? a : 0, g || (h.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
			position: "absolute"
		}), m[f] = v ? r : a + r), v && (o.css(p, 0), g || o.css(f, r + a)), o.animate(m, {
			duration: s.duration,
			easing: s.easing,
			queue: !1,
			complete: function() {
				"hide" === c && h.hide(), t.effects.restore(h, l), t.effects.removeWrapper(h), n()
			}
		})
	}
}(jQuery), function(t) {
	t.effects.effect.bounce = function(e, i) {
		var s, n, o, a = t(this),
			r = ["position", "top", "bottom", "left", "right", "height", "width"],
			h = t.effects.setMode(a, e.mode || "effect"),
			l = "hide" === h,
			c = "show" === h,
			u = e.direction || "up",
			d = e.distance,
			p = e.times || 5,
			f = 2 * p + (c || l ? 1 : 0),
			g = e.duration / f,
			m = e.easing,
			v = "up" === u || "down" === u ? "top" : "left",
			_ = "up" === u || "left" === u,
			b = a.queue(),
			y = b.length;
		for ((c || l) && r.push("opacity"), t.effects.save(a, r), a.show(), t.effects.createWrapper(a), d || (d = a["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (o = {
			opacity: 1
		}, o[v] = 0, a.css("opacity", 0).css(v, _ ? 2 * -d : 2 * d).animate(o, g, m)), l && (d /= Math.pow(2, p - 1)), o = {}, o[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (_ ? "-=" : "+=") + d, a.animate(n, g, m).animate(o, g, m), d = l ? 2 * d : d / 2;
		l && (n = {
			opacity: 0
		}, n[v] = (_ ? "-=" : "+=") + d, a.animate(n, g, m)), a.queue(function() {
			l && a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
		}), y > 1 && b.splice.apply(b, [1, 0].concat(b.splice(y, f + 1))), a.dequeue()
	}
}(jQuery), function(t) {
	t.effects.effect.clip = function(e, i) {
		var s, n, o, a = t(this),
			r = ["position", "top", "bottom", "left", "right", "height", "width"],
			h = t.effects.setMode(a, e.mode || "hide"),
			l = "show" === h,
			c = e.direction || "vertical",
			u = "vertical" === c,
			d = u ? "height" : "width",
			p = u ? "top" : "left",
			f = {};
		t.effects.save(a, r), a.show(), s = t.effects.createWrapper(a).css({
			overflow: "hidden"
		}), n = "IMG" === a[0].tagName ? s : a, o = n[d](), l && (n.css(d, 0), n.css(p, o / 2)), f[d] = l ? o : 0, f[p] = l ? 0 : o / 2, n.animate(f, {
			queue: !1,
			duration: e.duration,
			easing: e.easing,
			complete: function() {
				l || a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
			}
		})
	}
}(jQuery), function(t) {
	t.effects.effect.drop = function(e, i) {
		var s, n = t(this),
			o = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
			a = t.effects.setMode(n, e.mode || "hide"),
			r = "show" === a,
			h = e.direction || "left",
			l = "up" === h || "down" === h ? "top" : "left",
			c = "up" === h || "left" === h ? "pos" : "neg",
			u = {
				opacity: r ? 1 : 0
			};
		t.effects.save(n, o), n.show(), t.effects.createWrapper(n), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === c ? -s : s), u[l] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(u, {
			queue: !1,
			duration: e.duration,
			easing: e.easing,
			complete: function() {
				"hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
			}
		})
	}
}(jQuery), function(t) {
	t.effects.effect.explode = function(e, i) {
		function s() {
			b.push(this), b.length === u * d && n()
		}
		function n() {
			p.css({
				visibility: "visible"
			}), t(b).remove(), g || p.hide(), i()
		}
		var o, a, r, h, l, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
			d = u,
			p = t(this),
			f = t.effects.setMode(p, e.mode || "hide"),
			g = "show" === f,
			m = p.show().css("visibility", "hidden").offset(),
			v = Math.ceil(p.outerWidth() / d),
			_ = Math.ceil(p.outerHeight() / u),
			b = [];
		for (o = 0; u > o; o++) for (h = m.top + o * _, c = o - (u - 1) / 2, a = 0; d > a; a++) r = m.left + a * v, l = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
			position: "absolute",
			visibility: "visible",
			left: -a * v,
			top: -o * _
		}).parent().addClass("ui-effects-explode").css({
			position: "absolute",
			overflow: "hidden",
			width: v,
			height: _,
			left: r + (g ? l * v : 0),
			top: h + (g ? c * _ : 0),
			opacity: g ? 0 : 1
		}).animate({
			left: r + (g ? 0 : l * v),
			top: h + (g ? 0 : c * _),
			opacity: g ? 1 : 0
		}, e.duration || 500, e.easing, s)
	}
}(jQuery), function(t) {
	t.effects.effect.fade = function(e, i) {
		var s = t(this),
			n = t.effects.setMode(s, e.mode || "toggle");
		s.animate({
			opacity: n
		}, {
			queue: !1,
			duration: e.duration,
			easing: e.easing,
			complete: i
		})
	}
}(jQuery), function(t) {
	t.effects.effect.fold = function(e, i) {
		var s, n, o = t(this),
			a = ["position", "top", "bottom", "left", "right", "height", "width"],
			r = t.effects.setMode(o, e.mode || "hide"),
			h = "show" === r,
			l = "hide" === r,
			c = e.size || 15,
			u = /([0-9]+)%/.exec(c),
			d = !! e.horizFirst,
			p = h !== d,
			f = p ? ["width", "height"] : ["height", "width"],
			g = e.duration / 2,
			m = {},
			v = {};
		t.effects.save(o, a), o.show(), s = t.effects.createWrapper(o).css({
			overflow: "hidden"
		}), n = p ? [s.width(), s.height()] : [s.height(), s.width()], u && (c = parseInt(u[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(d ? {
			height: 0,
			width: c
		} : {
			height: c,
			width: 0
		}), m[f[0]] = h ? n[0] : c, v[f[1]] = h ? n[1] : 0, s.animate(m, g, e.easing).animate(v, g, e.easing, function() {
			l && o.hide(), t.effects.restore(o, a), t.effects.removeWrapper(o), i()
		})
	}
}(jQuery), function(t) {
	t.effects.effect.highlight = function(e, i) {
		var s = t(this),
			n = ["backgroundImage", "backgroundColor", "opacity"],
			o = t.effects.setMode(s, e.mode || "show"),
			a = {
				backgroundColor: s.css("backgroundColor")
			};
		"hide" === o && (a.opacity = 0), t.effects.save(s, n), s.show().css({
			backgroundImage: "none",
			backgroundColor: e.color || "#ffff99"
		}).animate(a, {
			queue: !1,
			duration: e.duration,
			easing: e.easing,
			complete: function() {
				"hide" === o && s.hide(), t.effects.restore(s, n), i()
			}
		})
	}
}(jQuery), function(t) {
	t.effects.effect.pulsate = function(e, i) {
		var s, n = t(this),
			o = t.effects.setMode(n, e.mode || "show"),
			a = "show" === o,
			r = "hide" === o,
			h = a || "hide" === o,
			l = 2 * (e.times || 5) + (h ? 1 : 0),
			c = e.duration / l,
			u = 0,
			d = n.queue(),
			p = d.length;
		for ((a || !n.is(":visible")) && (n.css("opacity", 0).show(), u = 1), s = 1; l > s; s++) n.animate({
			opacity: u
		}, c, e.easing), u = 1 - u;
		n.animate({
			opacity: u
		}, c, e.easing), n.queue(function() {
			r && n.hide(), i()
		}), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, l + 1))), n.dequeue()
	}
}(jQuery), function(t) {
	t.effects.effect.puff = function(e, i) {
		var s = t(this),
			n = t.effects.setMode(s, e.mode || "hide"),
			o = "hide" === n,
			a = parseInt(e.percent, 10) || 150,
			r = a / 100,
			h = {
				height: s.height(),
				width: s.width(),
				outerHeight: s.outerHeight(),
				outerWidth: s.outerWidth()
			};
		t.extend(e, {
			effect: "scale",
			queue: !1,
			fade: !0,
			mode: n,
			complete: i,
			percent: o ? a : 100,
			from: o ? h : {
				height: h.height * r,
				width: h.width * r,
				outerHeight: h.outerHeight * r,
				outerWidth: h.outerWidth * r
			}
		}), s.effect(e)
	}, t.effects.effect.scale = function(e, i) {
		var s = t(this),
			n = t.extend(!0, {}, e),
			o = t.effects.setMode(s, e.mode || "effect"),
			a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === o ? 0 : 100),
			r = e.direction || "both",
			h = e.origin,
			l = {
				height: s.height(),
				width: s.width(),
				outerHeight: s.outerHeight(),
				outerWidth: s.outerWidth()
			},
			c = {
				y: "horizontal" !== r ? a / 100 : 1,
				x: "vertical" !== r ? a / 100 : 1
			};
		n.effect = "size", n.queue = !1, n.complete = i, "effect" !== o && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = e.from || ("show" === o ? {
			height: 0,
			width: 0,
			outerHeight: 0,
			outerWidth: 0
		} : l), n.to = {
			height: l.height * c.y,
			width: l.width * c.x,
			outerHeight: l.outerHeight * c.y,
			outerWidth: l.outerWidth * c.x
		}, n.fade && ("show" === o && (n.from.opacity = 0, n.to.opacity = 1), "hide" === o && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
	}, t.effects.effect.size = function(e, i) {
		var s, n, o, a = t(this),
			r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
			h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
			l = ["width", "height", "overflow"],
			c = ["fontSize"],
			u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
			d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
			p = t.effects.setMode(a, e.mode || "effect"),
			f = e.restore || "effect" !== p,
			g = e.scale || "both",
			m = e.origin || ["middle", "center"],
			v = a.css("position"),
			_ = f ? r : h,
			b = {
				height: 0,
				width: 0,
				outerHeight: 0,
				outerWidth: 0
			};
		"show" === p && a.show(), s = {
			height: a.height(),
			width: a.width(),
			outerHeight: a.outerHeight(),
			outerWidth: a.outerWidth()
		}, "toggle" === e.mode && "show" === p ? (a.from = e.to || b, a.to = e.from || s) : (a.from = e.from || ("show" === p ? b : s), a.to = e.to || ("hide" === p ? b : s)), o = {
			from: {
				y: a.from.height / s.height,
				x: a.from.width / s.width
			},
			to: {
				y: a.to.height / s.height,
				x: a.to.width / s.width
			}
		}, ("box" === g || "both" === g) && (o.from.y !== o.to.y && (_ = _.concat(u), a.from = t.effects.setTransition(a, u, o.from.y, a.from), a.to = t.effects.setTransition(a, u, o.to.y, a.to)), o.from.x !== o.to.x && (_ = _.concat(d), a.from = t.effects.setTransition(a, d, o.from.x, a.from), a.to = t.effects.setTransition(a, d, o.to.x, a.to))), ("content" === g || "both" === g) && o.from.y !== o.to.y && (_ = _.concat(c).concat(l), a.from = t.effects.setTransition(a, c, o.from.y, a.from), a.to = t.effects.setTransition(a, c, o.to.y, a.to)), t.effects.save(a, _), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), m && (n = t.effects.getBaseline(m, s), a.from.top = (s.outerHeight - a.outerHeight()) * n.y, a.from.left = (s.outerWidth - a.outerWidth()) * n.x, a.to.top = (s.outerHeight - a.to.outerHeight) * n.y, a.to.left = (s.outerWidth - a.to.outerWidth) * n.x), a.css(a.from), ("content" === g || "both" === g) && (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), l = r.concat(u).concat(d), a.find("*[width]").each(function() {
			var i = t(this),
				s = {
					height: i.height(),
					width: i.width(),
					outerHeight: i.outerHeight(),
					outerWidth: i.outerWidth()
				};
			f && t.effects.save(i, l), i.from = {
				height: s.height * o.from.y,
				width: s.width * o.from.x,
				outerHeight: s.outerHeight * o.from.y,
				outerWidth: s.outerWidth * o.from.x
			}, i.to = {
				height: s.height * o.to.y,
				width: s.width * o.to.x,
				outerHeight: s.height * o.to.y,
				outerWidth: s.width * o.to.x
			}, o.from.y !== o.to.y && (i.from = t.effects.setTransition(i, u, o.from.y, i.from), i.to = t.effects.setTransition(i, u, o.to.y, i.to)), o.from.x !== o.to.x && (i.from = t.effects.setTransition(i, d, o.from.x, i.from), i.to = t.effects.setTransition(i, d, o.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
				f && t.effects.restore(i, l)
			})
		})), a.animate(a.to, {
			queue: !1,
			duration: e.duration,
			easing: e.easing,
			complete: function() {
				0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, _), f || ("static" === v ? a.css({
					position: "relative",
					top: a.to.top,
					left: a.to.left
				}) : t.each(["top", "left"], function(t, e) {
					a.css(e, function(e, i) {
						var s = parseInt(i, 10),
							n = t ? a.to.left : a.to.top;
						return "auto" === i ? n + "px" : s + n + "px"
					})
				})), t.effects.removeWrapper(a), i()
			}
		})
	}
}(jQuery), function(t) {
	t.effects.effect.shake = function(e, i) {
		var s, n = t(this),
			o = ["position", "top", "bottom", "left", "right", "height", "width"],
			a = t.effects.setMode(n, e.mode || "effect"),
			r = e.direction || "left",
			h = e.distance || 20,
			l = e.times || 3,
			c = 2 * l + 1,
			u = Math.round(e.duration / c),
			d = "up" === r || "down" === r ? "top" : "left",
			p = "up" === r || "left" === r,
			f = {},
			g = {},
			m = {},
			v = n.queue(),
			_ = v.length;
		for (t.effects.save(n, o), n.show(), t.effects.createWrapper(n), f[d] = (p ? "-=" : "+=") + h, g[d] = (p ? "+=" : "-=") + 2 * h, m[d] = (p ? "-=" : "+=") + 2 * h, n.animate(f, u, e.easing), s = 1; l > s; s++) n.animate(g, u, e.easing).animate(m, u, e.easing);
		n.animate(g, u, e.easing).animate(f, u / 2, e.easing).queue(function() {
			"hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
		}), _ > 1 && v.splice.apply(v, [1, 0].concat(v.splice(_, c + 1))), n.dequeue()
	}
}(jQuery), function(t) {
	t.effects.effect.slide = function(e, i) {
		var s, n = t(this),
			o = ["position", "top", "bottom", "left", "right", "width", "height"],
			a = t.effects.setMode(n, e.mode || "show"),
			r = "show" === a,
			h = e.direction || "left",
			l = "up" === h || "down" === h ? "top" : "left",
			c = "up" === h || "left" === h,
			u = {};
		t.effects.save(n, o), n.show(), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(n).css({
			overflow: "hidden"
		}), r && n.css(l, c ? isNaN(s) ? "-" + s : -s : s), u[l] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(u, {
			queue: !1,
			duration: e.duration,
			easing: e.easing,
			complete: function() {
				"hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
			}
		})
	}
}(jQuery), function(t) {
	t.effects.effect.transfer = function(e, i) {
		var s = t(this),
			n = t(e.to),
			o = "fixed" === n.css("position"),
			a = t("body"),
			r = o ? a.scrollTop() : 0,
			h = o ? a.scrollLeft() : 0,
			l = n.offset(),
			c = {
				top: l.top - r,
				left: l.left - h,
				height: n.innerHeight(),
				width: n.innerWidth()
			},
			u = s.offset(),
			d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
				top: u.top - r,
				left: u.left - h,
				height: s.innerHeight(),
				width: s.innerWidth(),
				position: o ? "fixed" : "absolute"
			}).animate(c, e.duration, e.easing, function() {
				d.remove(), i()
			})
	}
}(jQuery), function(t) {
	t.widget("ui.menu", {
		version: "1.10.3",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-carat-1-e"
			},
			menus: "ul",
			position: {
				my: "left top",
				at: "right top"
			},
			role: "menu",
			blur: null,
			focus: null,
			select: null
		},
		_create: function() {
			this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length).attr({
				role: this.options.role,
				tabIndex: 0
			}).bind("click" + this.eventNamespace, t.proxy(function(t) {
				this.options.disabled && t.preventDefault()
			}, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
				"mousedown .ui-menu-item > a": function(t) {
					t.preventDefault()
				},
				"click .ui-state-disabled > a": function(t) {
					t.preventDefault()
				},
				"click .ui-menu-item:has(a)": function(e) {
					var i = t(e.target).closest(".ui-menu-item");
					!this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(e), i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
				},
				"mouseenter .ui-menu-item": function(e) {
					var i = t(e.currentTarget);
					i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function(t, e) {
					var i = this.active || this.element.children(".ui-menu-item").eq(0);
					e || this.focus(t, i)
				},
				blur: function(e) {
					this._delay(function() {
						t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
					})
				},
				keydown: "_keydown"
			}), this.refresh(), this._on(this.document, {
				click: function(e) {
					t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1
				}
			})
		},
		_destroy: function() {
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
				var e = t(this);
				e.data("ui-menu-submenu-carat") && e.remove()
			}), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
		},
		_keydown: function(e) {
			function i(t) {
				return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
			}
			var s, n, o, a, r, h = !0;
			switch (e.keyCode) {
			case t.ui.keyCode.PAGE_UP:
				this.previousPage(e);
				break;
			case t.ui.keyCode.PAGE_DOWN:
				this.nextPage(e);
				break;
			case t.ui.keyCode.HOME:
				this._move("first", "first", e);
				break;
			case t.ui.keyCode.END:
				this._move("last", "last", e);
				break;
			case t.ui.keyCode.UP:
				this.previous(e);
				break;
			case t.ui.keyCode.DOWN:
				this.next(e);
				break;
			case t.ui.keyCode.LEFT:
				this.collapse(e);
				break;
			case t.ui.keyCode.RIGHT:
				this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
				break;
			case t.ui.keyCode.ENTER:
			case t.ui.keyCode.SPACE:
				this._activate(e);
				break;
			case t.ui.keyCode.ESCAPE:
				this.collapse(e);
				break;
			default:
				h = !1, n = this.previousFilter || "", o = String.fromCharCode(e.keyCode), a = !1, clearTimeout(this.filterTimer), o === n ? a = !0 : o = n + o, r = new RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
					return r.test(t(this).children("a").text())
				}), s = a && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (o = String.fromCharCode(e.keyCode), r = new RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
					return r.test(t(this).children("a").text())
				})), s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = o, this.filterTimer = this._delay(function() {
					delete this.previousFilter
				}, 1e3)) : delete this.previousFilter) : delete this.previousFilter
			}
			h && e.preventDefault()
		},
		_activate: function(t) {
			this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
		},
		refresh: function() {
			var e, i = this.options.icons.submenu,
				s = this.element.find(this.options.menus);
			s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).each(function() {
				var e = t(this),
					s = e.prev("a"),
					n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
				s.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", s.attr("id"))
			}), e = s.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
				tabIndex: -1,
				role: this._itemRole()
			}), e.children(":not(.ui-menu-item)").each(function() {
				var e = t(this);
				/[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
			}), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
		},
		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[this.options.role]
		},
		_setOption: function(t, e) {
			"icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e)
		},
		focus: function(t, e) {
			var i, s;
			this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
				this._close()
			}, this.delay), i = e.children(".ui-menu"), i.length && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
				item: e
			})
		},
		_scrollIntoView: function(e) {
			var i, s, n, o, a, r;
			this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r))
		},
		blur: function(t, e) {
			e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
				item: this.active
			}))
		},
		_startOpening: function(t) {
			clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
				this._close(), this._open(t)
			}, this.delay))
		},
		_open: function(e) {
			var i = t.extend({
				of: this.active
			}, this.options.position);
			clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
		},
		collapseAll: function(e, i) {
			clearTimeout(this.timer), this.timer = this._delay(function() {
				var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
				s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s
			}, this.delay)
		},
		_close: function(t) {
			t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
		},
		collapse: function(t) {
			var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			e && e.length && (this._close(), this.focus(t, e))
		},
		expand: function(t) {
			var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
			e && e.length && (this._open(e.parent()), this._delay(function() {
				this.focus(t, e)
			}))
		},
		next: function(t) {
			this._move("next", "first", t)
		},
		previous: function(t) {
			this._move("prev", "last", t)
		},
		isFirstItem: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		isLastItem: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		_move: function(t, e, i) {
			var s;
			this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, s)
		},
		nextPage: function(e) {
			var i, s, n;
			return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
				return i = t(this), i.offset().top - s - n < 0
			}), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), void 0) : (this.next(e), void 0)
		},
		previousPage: function(e) {
			var i, s, n;
			return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
				return i = t(this), i.offset().top - s + n > 0
			}), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), void 0) : (this.next(e), void 0)
		},
		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop("scrollHeight")
		},
		select: function(e) {
			this.active = this.active || t(e.target).closest(".ui-menu-item");
			var i = {
				item: this.active
			};
			this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
		}
	})
}(jQuery), function(t, e) {
	function i(t, e, i) {
		return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
	}
	function s(e, i) {
		return parseInt(t.css(e, i), 10) || 0
	}
	function n(e) {
		var i = e[0];
		return 9 === i.nodeType ? {
			width: e.width(),
			height: e.height(),
			offset: {
				top: 0,
				left: 0
			}
		} : t.isWindow(i) ? {
			width: e.width(),
			height: e.height(),
			offset: {
				top: e.scrollTop(),
				left: e.scrollLeft()
			}
		} : i.preventDefault ? {
			width: 0,
			height: 0,
			offset: {
				top: i.pageY,
				left: i.pageX
			}
		} : {
			width: e.outerWidth(),
			height: e.outerHeight(),
			offset: e.offset()
		}
	}
	t.ui = t.ui || {};
	var o, a = Math.max,
		r = Math.abs,
		h = Math.round,
		l = /left|center|right/,
		c = /top|center|bottom/,
		u = /[\+\-]\d+(\.[\d]+)?%?/,
		d = /^\w+/,
		p = /%$/,
		f = t.fn.position;
	t.position = {
		scrollbarWidth: function() {
			if (o !== e) return o;
			var i, s, n = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
				a = n.children()[0];
			return t("body").append(n), i = a.offsetWidth, n.css("overflow", "scroll"), s = a.offsetWidth, i === s && (s = n[0].clientWidth), n.remove(), o = i - s
		},
		getScrollInfo: function(e) {
			var i = e.isWindow ? "" : e.element.css("overflow-x"),
				s = e.isWindow ? "" : e.element.css("overflow-y"),
				n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
				o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
			return {
				width: o ? t.position.scrollbarWidth() : 0,
				height: n ? t.position.scrollbarWidth() : 0
			}
		},
		getWithinInfo: function(e) {
			var i = t(e || window),
				s = t.isWindow(i[0]);
			return {
				element: i,
				isWindow: s,
				offset: i.offset() || {
					left: 0,
					top: 0
				},
				scrollLeft: i.scrollLeft(),
				scrollTop: i.scrollTop(),
				width: s ? i.width() : i.outerWidth(),
				height: s ? i.height() : i.outerHeight()
			}
		}
	}, t.fn.position = function(e) {
		if (!e || !e.of) return f.apply(this, arguments);
		e = t.extend({}, e);
		var o, p, g, m, v, _, b = t(e.of),
			y = t.position.getWithinInfo(e.within),
			w = t.position.getScrollInfo(y),
			k = (e.collision || "flip").split(" "),
			x = {};
		return _ = n(b), b[0].preventDefault && (e.at = "left top"), p = _.width, g = _.height, m = _.offset, v = t.extend({}, m), t.each(["my", "at"], function() {
			var t, i, s = (e[this] || "").split(" ");
			1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : c.test(s[0]) ? ["center"].concat(s) : ["center", "center"]), s[0] = l.test(s[0]) ? s[0] : "center", s[1] = c.test(s[1]) ? s[1] : "center", t = u.exec(s[0]), i = u.exec(s[1]), x[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]]
		}), 1 === k.length && (k[1] = k[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += g : "center" === e.at[1] && (v.top += g / 2), o = i(x.at, p, g), v.left += o[0], v.top += o[1], this.each(function() {
			var n, l, c = t(this),
				u = c.outerWidth(),
				d = c.outerHeight(),
				f = s(this, "marginLeft"),
				_ = s(this, "marginTop"),
				D = u + f + s(this, "marginRight") + w.width,
				C = d + _ + s(this, "marginBottom") + w.height,
				I = t.extend({}, v),
				P = i(x.my, c.outerWidth(), c.outerHeight());
			"right" === e.my[0] ? I.left -= u : "center" === e.my[0] && (I.left -= u / 2), "bottom" === e.my[1] ? I.top -= d : "center" === e.my[1] && (I.top -= d / 2), I.left += P[0], I.top += P[1], t.support.offsetFractions || (I.left = h(I.left), I.top = h(I.top)), n = {
				marginLeft: f,
				marginTop: _
			}, t.each(["left", "top"], function(i, s) {
				t.ui.position[k[i]] && t.ui.position[k[i]][s](I, {
					targetWidth: p,
					targetHeight: g,
					elemWidth: u,
					elemHeight: d,
					collisionPosition: n,
					collisionWidth: D,
					collisionHeight: C,
					offset: [o[0] + P[0], o[1] + P[1]],
					my: e.my,
					at: e.at,
					within: y,
					elem: c
				})
			}), e.using && (l = function(t) {
				var i = m.left - I.left,
					s = i + p - u,
					n = m.top - I.top,
					o = n + g - d,
					h = {
						target: {
							element: b,
							left: m.left,
							top: m.top,
							width: p,
							height: g
						},
						element: {
							element: c,
							left: I.left,
							top: I.top,
							width: u,
							height: d
						},
						horizontal: 0 > s ? "left" : i > 0 ? "right" : "center",
						vertical: 0 > o ? "top" : n > 0 ? "bottom" : "middle"
					};
				u > p && r(i + s) < p && (h.horizontal = "center"), d > g && r(n + o) < g && (h.vertical = "middle"), h.important = a(r(i), r(s)) > a(r(n), r(o)) ? "horizontal" : "vertical", e.using.call(this, t, h)
			}), c.offset(t.extend(I, {
				using: l
			}))
		})
	}, t.ui.position = {
		fit: {
			left: function(t, e) {
				var i, s = e.within,
					n = s.isWindow ? s.scrollLeft : s.offset.left,
					o = s.width,
					r = t.left - e.collisionPosition.marginLeft,
					h = n - r,
					l = r + e.collisionWidth - o - n;
				e.collisionWidth > o ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - o - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + o - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = a(t.left - r, t.left)
			},
			top: function(t, e) {
				var i, s = e.within,
					n = s.isWindow ? s.scrollTop : s.offset.top,
					o = e.within.height,
					r = t.top - e.collisionPosition.marginTop,
					h = n - r,
					l = r + e.collisionHeight - o - n;
				e.collisionHeight > o ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - o - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + o - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = a(t.top - r, t.top)
			}
		},
		flip: {
			left: function(t, e) {
				var i, s, n = e.within,
					o = n.offset.left + n.scrollLeft,
					a = n.width,
					h = n.isWindow ? n.scrollLeft : n.offset.left,
					l = t.left - e.collisionPosition.marginLeft,
					c = l - h,
					u = l + e.collisionWidth - a - h,
					d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
					p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
					f = -2 * e.offset[0];
				0 > c ? (i = t.left + d + p + f + e.collisionWidth - a - o, (0 > i || i < r(c)) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || r(s) < u) && (t.left += d + p + f))
			},
			top: function(t, e) {
				var i, s, n = e.within,
					o = n.offset.top + n.scrollTop,
					a = n.height,
					h = n.isWindow ? n.scrollTop : n.offset.top,
					l = t.top - e.collisionPosition.marginTop,
					c = l - h,
					u = l + e.collisionHeight - a - h,
					d = "top" === e.my[1],
					p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
					f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
					g = -2 * e.offset[1];
				0 > c ? (s = t.top + p + f + g + e.collisionHeight - a - o, t.top + p + f + g > c && (0 > s || s < r(c)) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - h, t.top + p + f + g > u && (i > 0 || r(i) < u) && (t.top += p + f + g))
			}
		},
		flipfit: {
			left: function() {
				t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
			},
			top: function() {
				t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
			}
		}
	}, function() {
		var e, i, s, n, o, a = document.getElementsByTagName("body")[0],
			r = document.createElement("div");
		e = document.createElement(a ? "div" : "body"), s = {
			visibility: "hidden",
			width: 0,
			height: 0,
			border: 0,
			margin: 0,
			background: "none"
		}, a && t.extend(s, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
		for (o in s) e.style[o] = s[o];
		e.appendChild(r), i = a || document.documentElement, i.insertBefore(e, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", n = t(r).offset().left, t.support.offsetFractions = n > 10 && 11 > n, e.innerHTML = "", i.removeChild(e)
	}()
}(jQuery), function(t, e) {
	t.widget("ui.progressbar", {
		version: "1.10.3",
		options: {
			max: 100,
			value: 0,
			change: null,
			complete: null
		},
		min: 0,
		_create: function() {
			this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
				role: "progressbar",
				"aria-valuemin": this.min
			}), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
		},
		_destroy: function() {
			this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
		},
		value: function(t) {
			return t === e ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), void 0)
		},
		_constrainedValue: function(t) {
			return t === e && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
		},
		_setOptions: function(t) {
			var e = t.value;
			delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
		},
		_setOption: function(t, e) {
			"max" === t && (e = Math.max(this.min, e)), this._super(t, e)
		},
		_percentage: function() {
			return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
		},
		_refreshValue: function() {
			var e = this.options.value,
				i = this._percentage();
			this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
				"aria-valuemax": this.options.max,
				"aria-valuenow": e
			}), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
		}
	})
}(jQuery), function(t) {
	var e = 5;
	t.widget("ui.slider", t.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null,
			change: null,
			slide: null,
			start: null,
			stop: null
		},
		_create: function() {
			this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
		},
		_refresh: function() {
			this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
		},
		_createHandles: function() {
			var e, i, s = this.options,
				n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
				o = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
				a = [];
			for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) a.push(o);
			this.handles = n.add(t(a.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
				t(this).data("ui-slider-handle-index", e)
			})
		},
		_createRange: function() {
			var e = this.options,
				i = "";
			e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
				left: "",
				bottom: ""
			}) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : this.range = t([])
		},
		_setupEvents: function() {
			var t = this.handles.add(this.range).filter("a");
			this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
		},
		_destroy: function() {
			this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
		},
		_mouseCapture: function(e) {
			var i, s, n, o, a, r, h, l, c = this,
				u = this.options;
			return u.disabled ? !1 : (this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, this.elementOffset = this.element.offset(), i = {
				x: e.pageX,
				y: e.pageY
			}, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
				var i = Math.abs(s - c.values(e));
				(n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, o = t(this), a = e)
			}), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, o.addClass("ui-state-active").focus(), h = o.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
				left: 0,
				top: 0
			} : {
				left: e.pageX - h.left - o.width() / 2,
				top: e.pageY - h.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
			}, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0))
		},
		_mouseStart: function() {
			return !0
		},
		_mouseDrag: function(t) {
			var e = {
				x: t.pageX,
				y: t.pageY
			},
				i = this._normValueFromMouse(e);
			return this._slide(t, this._handleIndex, i), !1
		},
		_mouseStop: function(t) {
			return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
		},
		_detectOrientation: function() {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(t) {
			var e, i, s, n, o;
			return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
		},
		_start: function(t, e) {
			var i = {
				handle: this.handles[e],
				value: this.value()
			};
			return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
		},
		_slide: function(t, e, i) {
			var s, n, o;
			this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, o = this._trigger("slide", t, {
				handle: this.handles[e],
				value: i,
				values: n
			}), s = this.values(e ? 0 : 1), o !== !1 && this.values(e, i, !0))) : i !== this.value() && (o = this._trigger("slide", t, {
				handle: this.handles[e],
				value: i
			}), o !== !1 && this.value(i))
		},
		_stop: function(t, e) {
			var i = {
				handle: this.handles[e],
				value: this.value()
			};
			this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
		},
		_change: function(t, e) {
			if (!this._keySliding && !this._mouseSliding) {
				var i = {
					handle: this.handles[e],
					value: this.value()
				};
				this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
			}
		},
		value: function(t) {
			return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value()
		},
		values: function(e, i) {
			var s, n, o;
			if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), void 0;
			if (!arguments.length) return this._values();
			if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
			for (s = this.options.values, n = arguments[0], o = 0; o < s.length; o += 1) s[o] = this._trimAlignValue(n[o]), this._change(null, o);
			this._refreshValue()
		},
		_setOption: function(e, i) {
			var s, n = 0;
			switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
			case "orientation":
				this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
				break;
			case "value":
				this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
				break;
			case "values":
				for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
				this._animateOff = !1;
				break;
			case "min":
			case "max":
				this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
				break;
			case "range":
				this._animateOff = !0, this._refresh(), this._animateOff = !1
			}
		},
		_value: function() {
			var t = this.options.value;
			return t = this._trimAlignValue(t)
		},
		_values: function(t) {
			var e, i, s;
			if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
			if (this.options.values && this.options.values.length) {
				for (i = this.options.values.slice(), s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(i[s]);
				return i
			}
			return []
		},
		_trimAlignValue: function(t) {
			if (t <= this._valueMin()) return this._valueMin();
			if (t >= this._valueMax()) return this._valueMax();
			var e = this.options.step > 0 ? this.options.step : 1,
				i = (t - this._valueMin()) % e,
				s = t - i;
			return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.options.max
		},
		_refreshValue: function() {
			var e, i, s, n, o, a = this.options.range,
				r = this.options,
				h = this,
				l = this._animateOff ? !1 : r.animate,
				c = {};
			this.options.values && this.options.values.length ? this.handles.each(function(s) {
				i = (h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin()) * 100, c["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[l ? "animate" : "css"](c, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
					left: i + "%"
				}, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
					width: i - e + "%"
				}, {
					queue: !1,
					duration: r.animate
				})) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
					bottom: i + "%"
				}, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
					height: i - e + "%"
				}, {
					queue: !1,
					duration: r.animate
				}))), e = i
			}) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? (s - n) / (o - n) * 100 : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
				width: i + "%"
			}, r.animate), "max" === a && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({
				width: 100 - i + "%"
			}, {
				queue: !1,
				duration: r.animate
			}), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
				height: i + "%"
			}, r.animate), "max" === a && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({
				height: 100 - i + "%"
			}, {
				queue: !1,
				duration: r.animate
			}))
		},
		_handleEvents: {
			keydown: function(i) {
				var s, n, o, a, r = t(i.target).data("ui-slider-handle-index");
				switch (i.keyCode) {
				case t.ui.keyCode.HOME:
				case t.ui.keyCode.END:
				case t.ui.keyCode.PAGE_UP:
				case t.ui.keyCode.PAGE_DOWN:
				case t.ui.keyCode.UP:
				case t.ui.keyCode.RIGHT:
				case t.ui.keyCode.DOWN:
				case t.ui.keyCode.LEFT:
					if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), s = this._start(i, r), s === !1)) return
				}
				switch (a = this.options.step, n = o = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) {
				case t.ui.keyCode.HOME:
					o = this._valueMin();
					break;
				case t.ui.keyCode.END:
					o = this._valueMax();
					break;
				case t.ui.keyCode.PAGE_UP:
					o = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
					break;
				case t.ui.keyCode.PAGE_DOWN:
					o = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
					break;
				case t.ui.keyCode.UP:
				case t.ui.keyCode.RIGHT:
					if (n === this._valueMax()) return;
					o = this._trimAlignValue(n + a);
					break;
				case t.ui.keyCode.DOWN:
				case t.ui.keyCode.LEFT:
					if (n === this._valueMin()) return;
					o = this._trimAlignValue(n - a)
				}
				this._slide(i, r, o)
			},
			click: function(t) {
				t.preventDefault()
			},
			keyup: function(e) {
				var i = t(e.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
			}
		}
	})
}(jQuery), function(t) {
	function e(t) {
		return function() {
			var e = this.element.val();
			t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
		}
	}
	t.widget("ui.spinner", {
		version: "1.10.3",
		defaultElement: "<input>",
		widgetEventPrefix: "spin",
		options: {
			culture: null,
			icons: {
				down: "ui-icon-triangle-1-s",
				up: "ui-icon-triangle-1-n"
			},
			incremental: !0,
			max: null,
			min: null,
			numberFormat: null,
			page: 10,
			step: 1,
			change: null,
			spin: null,
			start: null,
			stop: null
		},
		_create: function() {
			this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_getCreateOptions: function() {
			var e = {},
				i = this.element;
			return t.each(["min", "max", "step"], function(t, s) {
				var n = i.attr(s);
				void 0 !== n && n.length && (e[s] = n)
			}), e
		},
		_events: {
			keydown: function(t) {
				this._start(t) && this._keydown(t) && t.preventDefault()
			},
			keyup: "_stop",
			focus: function() {
				this.previous = this.element.val()
			},
			blur: function(t) {
				return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0)
			},
			mousewheel: function(t, e) {
				if (e) {
					if (!this.spinning && !this._start(t)) return !1;
					this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
						this.spinning && this._stop(t)
					}, 100), t.preventDefault()
				}
			},
			"mousedown .ui-spinner-button": function(e) {
				function i() {
					var t = this.element[0] === this.document[0].activeElement;
					t || (this.element.focus(), this.previous = s, this._delay(function() {
						this.previous = s
					}))
				}
				var s;
				s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
					delete this.cancelBlur, i.call(this)
				}), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
			},
			"mouseup .ui-spinner-button": "_stop",
			"mouseenter .ui-spinner-button": function(e) {
				return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0
			},
			"mouseleave .ui-spinner-button": "_stop"
		},
		_draw: function() {
			var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
			this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
		},
		_keydown: function(e) {
			var i = this.options,
				s = t.ui.keyCode;
			switch (e.keyCode) {
			case s.UP:
				return this._repeat(null, 1, e), !0;
			case s.DOWN:
				return this._repeat(null, -1, e), !0;
			case s.PAGE_UP:
				return this._repeat(null, i.page, e), !0;
			case s.PAGE_DOWN:
				return this._repeat(null, -i.page, e), !0
			}
			return !1
		},
		_uiSpinnerHtml: function() {
			return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
		},
		_buttonHtml: function() {
			return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
		},
		_start: function(t) {
			return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
		},
		_repeat: function(t, e, i) {
			t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
				this._repeat(40, e, i)
			}, t), this._spin(e * this.options.step, i)
		},
		_spin: function(t, e) {
			var i = this.value() || 0;
			this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
				value: i
			}) === !1 || (this._value(i), this.counter++)
		},
		_increment: function(e) {
			var i = this.options.incremental;
			return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
		},
		_precision: function() {
			var t = this._precisionOf(this.options.step);
			return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
		},
		_precisionOf: function(t) {
			var e = t.toString(),
				i = e.indexOf(".");
			return -1 === i ? 0 : e.length - i - 1
		},
		_adjustValue: function(t) {
			var e, i, s = this.options;
			return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && t < s.min ? s.min : t
		},
		_stop: function(t) {
			this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
		},
		_setOption: function(t, e) {
			if ("culture" === t || "numberFormat" === t) {
				var i = this._parse(this.element.val());
				return this.options[t] = e, this.element.val(this._format(i)), void 0
			}("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (e ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
		},
		_setOptions: e(function(t) {
			this._super(t), this._value(this.element.val())
		}),
		_parse: function(t) {
			return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
		},
		_format: function(t) {
			return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
		},
		_refresh: function() {
			this.element.attr({
				"aria-valuemin": this.options.min,
				"aria-valuemax": this.options.max,
				"aria-valuenow": this._parse(this.element.val())
			})
		},
		_value: function(t, e) {
			var i;
			"" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
		},
		_destroy: function() {
			this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
		},
		stepUp: e(function(t) {
			this._stepUp(t)
		}),
		_stepUp: function(t) {
			this._start() && (this._spin((t || 1) * this.options.step), this._stop())
		},
		stepDown: e(function(t) {
			this._stepDown(t)
		}),
		_stepDown: function(t) {
			this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
		},
		pageUp: e(function(t) {
			this._stepUp((t || 1) * this.options.page)
		}),
		pageDown: e(function(t) {
			this._stepDown((t || 1) * this.options.page)
		}),
		value: function(t) {
			return arguments.length ? (e(this._value).call(this, t), void 0) : this._parse(this.element.val())
		},
		widget: function() {
			return this.uiSpinner
		}
	})
}(jQuery), function(t, e) {
	function i() {
		return ++n
	}
	function s(t) {
		return t.hash.length > 1 && decodeURIComponent(t.href.replace(o, "")) === decodeURIComponent(location.href.replace(o, ""))
	}
	var n = 0,
		o = /#.*$/;
	t.widget("ui.tabs", {
		version: "1.10.3",
		delay: 300,
		options: {
			active: null,
			collapsible: !1,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
		_create: function() {
			var e = this,
				i = this.options;
			this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
				t(this).is(".ui-state-disabled") && e.preventDefault()
			}).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
				t(this).closest("li").is(".ui-state-disabled") && this.blur()
			}), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
				return e.tabs.index(t)
			}))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
		},
		_initialActive: function() {
			var e = this.options.active,
				i = this.options.collapsible,
				s = location.hash.substring(1);
			return null === e && (s && this.tabs.each(function(i, n) {
				return t(n).attr("aria-controls") === s ? (e = i, !1) : void 0
			}), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e
		},
		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: this.active.length ? this._getPanelForTab(this.active) : t()
			}
		},
		_tabKeydown: function(e) {
			var i = t(this.document[0].activeElement).closest("li"),
				s = this.tabs.index(i),
				n = !0;
			if (!this._handlePageNav(e)) {
				switch (e.keyCode) {
				case t.ui.keyCode.RIGHT:
				case t.ui.keyCode.DOWN:
					s++;
					break;
				case t.ui.keyCode.UP:
				case t.ui.keyCode.LEFT:
					n = !1, s--;
					break;
				case t.ui.keyCode.END:
					s = this.anchors.length - 1;
					break;
				case t.ui.keyCode.HOME:
					s = 0;
					break;
				case t.ui.keyCode.SPACE:
					return e.preventDefault(), clearTimeout(this.activating), this._activate(s), void 0;
				case t.ui.keyCode.ENTER:
					return e.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active ? !1 : s), void 0;
				default:
					return
				}
				e.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), e.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function() {
					this.option("active", s)
				}, this.delay))
			}
		},
		_panelKeydown: function(e) {
			this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
		},
		_handlePageNav: function(e) {
			return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
		},
		_findNextTab: function(e, i) {
			function s() {
				return e > n && (e = 0), 0 > e && (e = n), e
			}
			for (var n = this.tabs.length - 1; - 1 !== t.inArray(s(), this.options.disabled);) e = i ? e + 1 : e - 1;
			return e
		},
		_focusNextTab: function(t, e) {
			return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
		},
		_setOption: function(t, e) {
			return "active" === t ? (this._activate(e), void 0) : "disabled" === t ? (this._setupDisabled(e), void 0) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e), void 0)
		},
		_tabId: function(t) {
			return t.attr("aria-controls") || "ui-tabs-" + i()
		},
		_sanitizeSelector: function(t) {
			return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
		},
		refresh: function() {
			var e = this.options,
				i = this.tablist.children(":has(a[href])");
			e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
				return i.index(t)
			}), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
		},
		_refresh: function() {
			this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
				"aria-selected": "false",
				tabIndex: -1
			}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
				"aria-selected": "true",
				tabIndex: 0
			}), this._getPanelForTab(this.active).show().attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			})) : this.tabs.eq(0).attr("tabIndex", 0)
		},
		_processTabs: function() {
			var e = this;
			this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
				role: "tab",
				tabIndex: -1
			}), this.anchors = this.tabs.map(function() {
				return t("a", this)[0]
			}).addClass("ui-tabs-anchor").attr({
				role: "presentation",
				tabIndex: -1
			}), this.panels = t(), this.anchors.each(function(i, n) {
				var o, a, r, h = t(n).uniqueId().attr("id"),
					l = t(n).closest("li"),
					c = l.attr("aria-controls");
				s(n) ? (o = n.hash, a = e.element.find(e._sanitizeSelector(o))) : (r = e._tabId(l), o = "#" + r, a = e.element.find(o), a.length || (a = e._createPanel(r), a.insertAfter(e.panels[i - 1] || e.tablist)), a.attr("aria-live", "polite")), a.length && (e.panels = e.panels.add(a)), c && l.data("ui-tabs-aria-controls", c), l.attr({
					"aria-controls": o.substring(1),
					"aria-labelledby": h
				}), a.attr("aria-labelledby", h)
			}), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
		},
		_getList: function() {
			return this.element.find("ol,ul").eq(0)
		},
		_createPanel: function(e) {
			return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
		},
		_setupDisabled: function(e) {
			t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
			for (var i, s = 0; i = this.tabs[s]; s++) e === !0 || -1 !== t.inArray(s, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
			this.options.disabled = e
		},
		_setupEvents: function(e) {
			var i = {
				click: function(t) {
					t.preventDefault()
				}
			};
			e && t.each(e.split(" "), function(t, e) {
				i[e] = "_eventHandler"
			}), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
				keydown: "_tabKeydown"
			}), this._on(this.panels, {
				keydown: "_panelKeydown"
			}), this._focusable(this.tabs), this._hoverable(this.tabs)
		},
		_setupHeightStyle: function(e) {
			var i, s = this.element.parent();
			"fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
				var e = t(this),
					s = e.css("position");
				"absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
			}), this.element.children().not(this.panels).each(function() {
				i -= t(this).outerHeight(!0)
			}), this.panels.each(function() {
				t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
			}).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
				i = Math.max(i, t(this).height("").height())
			}).height(i))
		},
		_eventHandler: function(e) {
			var i = this.options,
				s = this.active,
				n = t(e.currentTarget),
				o = n.closest("li"),
				a = o[0] === s[0],
				r = a && i.collapsible,
				h = r ? t() : this._getPanelForTab(o),
				l = s.length ? this._getPanelForTab(s) : t(),
				c = {
					oldTab: s,
					oldPanel: l,
					newTab: r ? t() : o,
					newPanel: h
				};
			e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(o), e), this._toggle(e, c))
		},
		_toggle: function(e, i) {
			function s() {
				o.running = !1, o._trigger("activate", e, i)
			}
			function n() {
				i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, s) : (a.show(), s())
			}
			var o = this,
				a = i.newPanel,
				r = i.oldPanel;
			this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
				i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n()
			}) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			}), i.oldTab.attr("aria-selected", "false"), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
				return 0 === t(this).attr("tabIndex")
			}).attr("tabIndex", -1), a.attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			}), i.newTab.attr({
				"aria-selected": "true",
				tabIndex: 0
			})
		},
		_activate: function(e) {
			var i, s = this._findActive(e);
			s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({
				target: i,
				currentTarget: i,
				preventDefault: t.noop
			}))
		},
		_findActive: function(e) {
			return e === !1 ? t() : this.tabs.eq(e)
		},
		_getIndex: function(t) {
			return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
		},
		_destroy: function() {
			this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
				t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
			}), this.tabs.each(function() {
				var e = t(this),
					i = e.data("ui-tabs-aria-controls");
				i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
			}), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
		},
		enable: function(i) {
			var s = this.options.disabled;
			s !== !1 && (i === e ? s = !1 : (i = this._getIndex(i), s = t.isArray(s) ? t.map(s, function(t) {
				return t !== i ? t : null
			}) : t.map(this.tabs, function(t, e) {
				return e !== i ? e : null
			})), this._setupDisabled(s))
		},
		disable: function(i) {
			var s = this.options.disabled;
			if (s !== !0) {
				if (i === e) s = !0;
				else {
					if (i = this._getIndex(i), -1 !== t.inArray(i, s)) return;
					s = t.isArray(s) ? t.merge([i], s).sort() : [i]
				}
				this._setupDisabled(s)
			}
		},
		load: function(e, i) {
			e = this._getIndex(e);
			var n = this,
				o = this.tabs.eq(e),
				a = o.find(".ui-tabs-anchor"),
				r = this._getPanelForTab(o),
				h = {
					tab: o,
					panel: r
				};
			s(a[0]) || (this.xhr = t.ajax(this._ajaxSettings(a, i, h)), this.xhr && "canceled" !== this.xhr.statusText && (o.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function(t) {
				setTimeout(function() {
					r.html(t), n._trigger("load", i, h)
				}, 1)
			}).complete(function(t, e) {
				setTimeout(function() {
					"abort" === e && n.panels.stop(!1, !0), o.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), t === n.xhr && delete n.xhr
				}, 1)
			})))
		},
		_ajaxSettings: function(e, i, s) {
			var n = this;
			return {
				url: e.attr("href"),
				beforeSend: function(e, o) {
					return n._trigger("beforeLoad", i, t.extend({
						jqXHR: e,
						ajaxSettings: o
					}, s))
				}
			}
		},
		_getPanelForTab: function(e) {
			var i = t(e).attr("aria-controls");
			return this.element.find(this._sanitizeSelector("#" + i))
		}
	})
}(jQuery), function(t) {
	function e(e, i) {
		var s = (e.attr("aria-describedby") || "").split(/\s+/);
		s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
	}
	function i(e) {
		var i = e.data("ui-tooltip-id"),
			s = (e.attr("aria-describedby") || "").split(/\s+/),
			n = t.inArray(i, s); - 1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
	}
	var s = 0;
	t.widget("ui.tooltip", {
		version: "1.10.3",
		options: {
			content: function() {
				var e = t(this).attr("title") || "";
				return t("<a>").text(e).html()
			},
			hide: !0,
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: !0,
			tooltipClass: null,
			track: !1,
			close: null,
			open: null
		},
		_create: function() {
			this._on({
				mouseover: "open",
				focusin: "open"
			}), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
		},
		_setOption: function(e, i) {
			var s = this;
			return "disabled" === e ? (this[i ? "_disable" : "_enable"](), this.options[e] = i, void 0) : (this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
				s._updateContent(e)
			}), void 0)
		},
		_disable: function() {
			var e = this;
			t.each(this.tooltips, function(i, s) {
				var n = t.Event("blur");
				n.target = n.currentTarget = s[0], e.close(n, !0)
			}), this.element.find(this.options.items).addBack().each(function() {
				var e = t(this);
				e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "")
			})
		},
		_enable: function() {
			this.element.find(this.options.items).addBack().each(function() {
				var e = t(this);
				e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
			})
		},
		open: function(e) {
			var i = this,
				s = t(e ? e.target : this.element).closest(this.options.items);
			s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function() {
				var e, s = t(this);
				s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
					element: this,
					title: s.attr("title")
				}, s.attr("title", ""))
			}), this._updateContent(s, e))
		},
		_updateContent: function(t, e) {
			var i, s = this.options.content,
				n = this,
				o = e ? e.type : null;
			return "string" == typeof s ? this._open(e, t, s) : (i = s.call(t[0], function(i) {
				t.data("ui-tooltip-open") && n._delay(function() {
					e && (e.type = o), this._open(e, t, i)
				})
			}), i && this._open(e, t, i), void 0)
		},
		_open: function(i, s, n) {
			function o(t) {
				l.of = t, a.is(":hidden") || a.position(l)
			}
			var a, r, h, l = t.extend({}, this.options.position);
			if (n) {
				if (a = this._find(s), a.length) return a.find(".ui-tooltip-content").html(n), void 0;
				s.is("[title]") && (i && "mouseover" === i.type ? s.attr("title", "") : s.removeAttr("title")), a = this._tooltip(s), e(s, a.attr("id")), a.find(".ui-tooltip-content").html(n), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
					mousemove: o
				}), o(i)) : a.position(t.extend({
					of: s
				}, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
					a.is(":visible") && (o(l.of), clearInterval(h))
				}, t.fx.interval)), this._trigger("open", i, {
					tooltip: a
				}), r = {
					keyup: function(e) {
						if (e.keyCode === t.ui.keyCode.ESCAPE) {
							var i = t.Event(e);
							i.currentTarget = s[0], this.close(i, !0)
						}
					},
					remove: function() {
						this._removeTooltip(a)
					}
				}, i && "mouseover" !== i.type || (r.mouseleave = "close"), i && "focusin" !== i.type || (r.focusout = "close"), this._on(!0, s, r)
			}
		},
		close: function(e) {
			var s = this,
				n = t(e ? e.currentTarget : this.element),
				o = this._find(n);
			this.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && n.attr("title", n.data("ui-tooltip-title")), i(n), o.stop(!0), this._hide(o, this.options.hide, function() {
				s._removeTooltip(t(this))
			}), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
				t(i.element).attr("title", i.title), delete s.parents[e]
			}), this.closing = !0, this._trigger("close", e, {
				tooltip: o
			}), this.closing = !1)
		},
		_tooltip: function(e) {
			var i = "ui-tooltip-" + s++,
				n = t("<div>").attr({
					id: i,
					role: "tooltip"
				}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
			return t("<div>").addClass("ui-tooltip-content").appendTo(n), n.appendTo(this.document[0].body), this.tooltips[i] = e, n
		},
		_find: function(e) {
			var i = e.data("ui-tooltip-id");
			return i ? t("#" + i) : t()
		},
		_removeTooltip: function(t) {
			t.remove(), delete this.tooltips[t.attr("id")]
		},
		_destroy: function() {
			var e = this;
			t.each(this.tooltips, function(i, s) {
				var n = t.Event("blur");
				n.target = n.currentTarget = s[0], e.close(n, !0), t("#" + i).remove(), s.data("ui-tooltip-title") && (s.attr("title", s.data("ui-tooltip-title")), s.removeData("ui-tooltip-title"))
			})
		}
	})
}(jQuery);
!
function(t, e) {
	var i = 0,
		n = Array.prototype.slice,
		s = t.cleanData;
	t.cleanData = function(e) {
		for (var i, n = 0; null != (i = e[n]); n++) try {
			t(i).triggerHandler("remove")
		} catch (o) {}
		s(e)
	}, t.widget = function(e, i, n) {
		var s, o, a, r, u = {},
			d = e.split(".")[0];
		e = e.split(".")[1], s = d + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
			return !!t.data(e, s)
		}, t[d] = t[d] || {}, o = t[d][e], a = t[d][e] = function(t, e) {
			return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new a(t, e)
		}, t.extend(a, o, {
			version: n.version,
			_proto: t.extend({}, n),
			_childConstructors: []
		}), r = new i, r.options = t.widget.extend({}, r.options), t.each(n, function(e, n) {
			return t.isFunction(n) ? (u[e] = function() {
				var t = function() {
						return i.prototype[e].apply(this, arguments)
					},
					s = function(t) {
						return i.prototype[e].apply(this, t)
					};
				return function() {
					var e, i = this._super,
						o = this._superApply;
					return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = o, e
				}
			}(), void 0) : (u[e] = n, void 0)
		}), a.prototype = t.widget.extend(r, {
			widgetEventPrefix: o ? r.widgetEventPrefix || e : e
		}, u, {
			constructor: a,
			namespace: d,
			widgetName: e,
			widgetFullName: s
		}), o ? (t.each(o._childConstructors, function(e, i) {
			var n = i.prototype;
			t.widget(n.namespace + "." + n.widgetName, a, i._proto)
		}), delete o._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a)
	}, t.widget.extend = function(i) {
		for (var s, o, a = n.call(arguments, 1), r = 0, u = a.length; u > r; r++) for (s in a[r]) o = a[r][s], a[r].hasOwnProperty(s) && o !== e && (i[s] = t.isPlainObject(o) ? t.isPlainObject(i[s]) ? t.widget.extend({}, i[s], o) : t.widget.extend({}, o) : o);
		return i
	}, t.widget.bridge = function(i, s) {
		var o = s.prototype.widgetFullName || i;
		t.fn[i] = function(a) {
			var r = "string" == typeof a,
				u = n.call(arguments, 1),
				d = this;
			return a = !r && u.length ? t.widget.extend.apply(null, [a].concat(u)) : a, r ? this.each(function() {
				var n, s = t.data(this, o);
				return s ? t.isFunction(s[a]) && "_" !== a.charAt(0) ? (n = s[a].apply(s, u), n !== s && n !== e ? (d = n && n.jquery ? d.pushStack(n.get()) : n, !1) : void 0) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + a + "'")
			}) : this.each(function() {
				var e = t.data(this, o);
				e ? e.option(a || {})._init() : t.data(this, o, new s(a, this))
			}), d
		}
	}, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(e, n) {
			n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(t) {
					t.target === n && this.destroy()
				}
			}), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: t.noop,
		_getCreateEventData: t.noop,
		_create: t.noop,
		_init: t.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: t.noop,
		widget: function() {
			return this.element
		},
		option: function(i, n) {
			var s, o, a, r = i;
			if (0 === arguments.length) return t.widget.extend({}, this.options);
			if ("string" == typeof i) if (r = {}, s = i.split("."), i = s.shift(), s.length) {
				for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; a < s.length - 1; a++) o[s[a]] = o[s[a]] || {}, o = o[s[a]];
				if (i = s.pop(), 1 === arguments.length) return o[i] === e ? null : o[i];
				o[i] = n
			} else {
				if (1 === arguments.length) return this.options[i] === e ? null : this.options[i];
				r[i] = n
			}
			return this._setOptions(r), this
		},
		_setOptions: function(t) {
			var e;
			for (e in t) this._setOption(e, t[e]);
			return this
		},
		_setOption: function(t, e) {
			return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_on: function(e, i, n) {
			var s, o = this;
			"boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, a) {
				function r() {
					return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
				}
				"string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
				var u = n.match(/^(\w+)\s*(.*)$/),
					d = u[1] + o.eventNamespace,
					h = u[2];
				h ? s.delegate(h, d, r) : i.bind(d, r)
			})
		},
		_off: function(t, e) {
			e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
		},
		_delay: function(t, e) {
			function i() {
				return ("string" == typeof t ? n[t] : t).apply(n, arguments)
			}
			var n = this;
			return setTimeout(i, e || 0)
		},
		_hoverable: function(e) {
			this.hoverable = this.hoverable.add(e), this._on(e, {
				mouseenter: function(e) {
					t(e.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(e) {
					t(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(e) {
			this.focusable = this.focusable.add(e), this._on(e, {
				focusin: function(e) {
					t(e.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(e) {
					t(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(e, i, n) {
			var s, o, a = this.options[e];
			if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (s in o) s in i || (i[s] = o[s]);
			return this.element.trigger(i, n), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
		}
	}, t.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(e, i) {
		t.Widget.prototype["_" + e] = function(n, s, o) {
			"string" == typeof s && (s = {
				effect: s
			});
			var a, r = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
			s = s || {}, "number" == typeof s && (s = {
				duration: s
			}), a = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), a && t.effects && t.effects.effect[r] ? n[e](s) : r !== e && n[r] ? n[r](s.duration, s.easing, o) : n.queue(function(i) {
				t(this)[e](), o && o.call(n[0]), i()
			})
		}
	})
}(jQuery);
!
function(t, e) {
	function i() {
		return ++s
	}
	function a(t) {
		return t = t.cloneNode(!1), t.hash.length > 1 && decodeURIComponent(t.href.replace(n, "")) === decodeURIComponent(location.href.replace(n, ""))
	}
	var s = 0,
		n = /#.*$/;
	t.widget("ui.tabs", {
		version: "1.10.4",
		delay: 300,
		options: {
			active: null,
			collapsible: !1,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
		_create: function() {
			var e = this,
				i = this.options;
			this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
				t(this).is(".ui-state-disabled") && e.preventDefault()
			}).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
				t(this).closest("li").is(".ui-state-disabled") && this.blur()
			}), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
				return e.tabs.index(t)
			}))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
		},
		_initialActive: function() {
			var e = this.options.active,
				i = this.options.collapsible,
				a = location.hash.substring(1);
			return null === e && (a && this.tabs.each(function(i, s) {
				return t(s).attr("aria-controls") === a ? (e = i, !1) : void 0
			}), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e
		},
		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: this.active.length ? this._getPanelForTab(this.active) : t()
			}
		},
		_tabKeydown: function(e) {
			var i = t(this.document[0].activeElement).closest("li"),
				a = this.tabs.index(i),
				s = !0;
			if (!this._handlePageNav(e)) {
				switch (e.keyCode) {
				case t.ui.keyCode.RIGHT:
				case t.ui.keyCode.DOWN:
					a++;
					break;
				case t.ui.keyCode.UP:
				case t.ui.keyCode.LEFT:
					s = !1, a--;
					break;
				case t.ui.keyCode.END:
					a = this.anchors.length - 1;
					break;
				case t.ui.keyCode.HOME:
					a = 0;
					break;
				case t.ui.keyCode.SPACE:
					return e.preventDefault(), clearTimeout(this.activating), this._activate(a), void 0;
				case t.ui.keyCode.ENTER:
					return e.preventDefault(), clearTimeout(this.activating), this._activate(a === this.options.active ? !1 : a), void 0;
				default:
					return
				}
				e.preventDefault(), clearTimeout(this.activating), a = this._focusNextTab(a, s), e.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(a).attr("aria-selected", "true"), this.activating = this._delay(function() {
					this.option("active", a)
				}, this.delay))
			}
		},
		_panelKeydown: function(e) {
			this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
		},
		_handlePageNav: function(e) {
			return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
		},
		_findNextTab: function(e, i) {
			function a() {
				return e > s && (e = 0), 0 > e && (e = s), e
			}
			for (var s = this.tabs.length - 1; - 1 !== t.inArray(a(), this.options.disabled);) e = i ? e + 1 : e - 1;
			return e
		},
		_focusNextTab: function(t, e) {
			return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
		},
		_setOption: function(t, e) {
			return "active" === t ? (this._activate(e), void 0) : "disabled" === t ? (this._setupDisabled(e), void 0) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e), void 0)
		},
		_tabId: function(t) {
			return t.attr("aria-controls") || "ui-tabs-" + i()
		},
		_sanitizeSelector: function(t) {
			return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
		},
		refresh: function() {
			var e = this.options,
				i = this.tablist.children(":has(a[href])");
			e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
				return i.index(t)
			}), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
		},
		_refresh: function() {
			this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
				"aria-selected": "false",
				tabIndex: -1
			}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
				"aria-selected": "true",
				tabIndex: 0
			}), this._getPanelForTab(this.active).show().attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			})) : this.tabs.eq(0).attr("tabIndex", 0)
		},
		_processTabs: function() {
			var e = this;
			this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
				role: "tab",
				tabIndex: -1
			}), this.anchors = this.tabs.map(function() {
				return t("a", this)[0]
			}).addClass("ui-tabs-anchor").attr({
				role: "presentation",
				tabIndex: -1
			}), this.panels = t(), this.anchors.each(function(i, s) {
				var n, r, o, h = t(s).uniqueId().attr("id"),
					l = t(s).closest("li"),
					c = l.attr("aria-controls");
				a(s) ? (n = s.hash, r = e.element.find(e._sanitizeSelector(n))) : (o = e._tabId(l), n = "#" + o, r = e.element.find(n), r.length || (r = e._createPanel(o), r.insertAfter(e.panels[i - 1] || e.tablist)), r.attr("aria-live", "polite")), r.length && (e.panels = e.panels.add(r)), c && l.data("ui-tabs-aria-controls", c), l.attr({
					"aria-controls": n.substring(1),
					"aria-labelledby": h
				}), r.attr("aria-labelledby", h)
			}), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
		},
		_getList: function() {
			return this.tablist || this.element.find("ol,ul").eq(0)
		},
		_createPanel: function(e) {
			return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
		},
		_setupDisabled: function(e) {
			t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
			for (var i, a = 0; i = this.tabs[a]; a++) e === !0 || -1 !== t.inArray(a, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
			this.options.disabled = e
		},
		_setupEvents: function(e) {
			var i = {
				click: function(t) {
					t.preventDefault()
				}
			};
			e && t.each(e.split(" "), function(t, e) {
				i[e] = "_eventHandler"
			}), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
				keydown: "_tabKeydown"
			}), this._on(this.panels, {
				keydown: "_panelKeydown"
			}), this._focusable(this.tabs), this._hoverable(this.tabs)
		},
		_setupHeightStyle: function(e) {
			var i, a = this.element.parent();
			"fill" === e ? (i = a.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
				var e = t(this),
					a = e.css("position");
				"absolute" !== a && "fixed" !== a && (i -= e.outerHeight(!0))
			}), this.element.children().not(this.panels).each(function() {
				i -= t(this).outerHeight(!0)
			}), this.panels.each(function() {
				t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
			}).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
				i = Math.max(i, t(this).height("").height())
			}).height(i))
		},
		_eventHandler: function(e) {
			var i = this.options,
				a = this.active,
				s = t(e.currentTarget),
				n = s.closest("li"),
				r = n[0] === a[0],
				o = r && i.collapsible,
				h = o ? t() : this._getPanelForTab(n),
				l = a.length ? this._getPanelForTab(a) : t(),
				c = {
					oldTab: a,
					oldPanel: l,
					newTab: o ? t() : n,
					newPanel: h
				};
			e.preventDefault(), n.hasClass("ui-state-disabled") || n.hasClass("ui-tabs-loading") || this.running || r && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = o ? !1 : this.tabs.index(n), this.active = r ? t() : n, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(n), e), this._toggle(e, c))
		},
		_toggle: function(e, i) {
			function a() {
				n.running = !1, n._trigger("activate", e, i)
			}
			function s() {
				i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), r.length && n.options.show ? n._show(r, n.options.show, a) : (r.show(), a())
			}
			var n = this,
				r = i.newPanel,
				o = i.oldPanel;
			this.running = !0, o.length && this.options.hide ? this._hide(o, this.options.hide, function() {
				i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s()
			}) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), o.hide(), s()), o.attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			}), i.oldTab.attr("aria-selected", "false"), r.length && o.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() {
				return 0 === t(this).attr("tabIndex")
			}).attr("tabIndex", -1), r.attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			}), i.newTab.attr({
				"aria-selected": "true",
				tabIndex: 0
			})
		},
		_activate: function(e) {
			var i, a = this._findActive(e);
			a[0] !== this.active[0] && (a.length || (a = this.active), i = a.find(".ui-tabs-anchor")[0], this._eventHandler({
				target: i,
				currentTarget: i,
				preventDefault: t.noop
			}))
		},
		_findActive: function(e) {
			return e === !1 ? t() : this.tabs.eq(e)
		},
		_getIndex: function(t) {
			return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
		},
		_destroy: function() {
			this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
				t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
			}), this.tabs.each(function() {
				var e = t(this),
					i = e.data("ui-tabs-aria-controls");
				i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
			}), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
		},
		enable: function(i) {
			var a = this.options.disabled;
			a !== !1 && (i === e ? a = !1 : (i = this._getIndex(i), a = t.isArray(a) ? t.map(a, function(t) {
				return t !== i ? t : null
			}) : t.map(this.tabs, function(t, e) {
				return e !== i ? e : null
			})), this._setupDisabled(a))
		},
		disable: function(i) {
			var a = this.options.disabled;
			if (a !== !0) {
				if (i === e) a = !0;
				else {
					if (i = this._getIndex(i), -1 !== t.inArray(i, a)) return;
					a = t.isArray(a) ? t.merge([i], a).sort() : [i]
				}
				this._setupDisabled(a)
			}
		},
		load: function(e, i) {
			e = this._getIndex(e);
			var s = this,
				n = this.tabs.eq(e),
				r = n.find(".ui-tabs-anchor"),
				o = this._getPanelForTab(n),
				h = {
					tab: n,
					panel: o
				};
			a(r[0]) || (this.xhr = t.ajax(this._ajaxSettings(r, i, h)), this.xhr && "canceled" !== this.xhr.statusText && (n.addClass("ui-tabs-loading"), o.attr("aria-busy", "true"), this.xhr.success(function(t) {
				setTimeout(function() {
					o.html(t), s._trigger("load", i, h)
				}, 1)
			}).complete(function(t, e) {
				setTimeout(function() {
					"abort" === e && s.panels.stop(!1, !0), n.removeClass("ui-tabs-loading"), o.removeAttr("aria-busy"), t === s.xhr && delete s.xhr
				}, 1)
			})))
		},
		_ajaxSettings: function(e, i, a) {
			var s = this;
			return {
				url: e.attr("href"),
				beforeSend: function(e, n) {
					return s._trigger("beforeLoad", i, t.extend({
						jqXHR: e,
						ajaxSettings: n
					}, a))
				}
			}
		},
		_getPanelForTab: function(e) {
			var i = t(e).attr("aria-controls");
			return this.element.find(this._sanitizeSelector("#" + i))
		}
	})
}(jQuery);
!
function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function(e) {
	function t(t) {
		var s = t || window.event,
			a = h.call(arguments, 1),
			u = 0,
			r = 0,
			d = 0,
			f = 0;
		if (t = e.event.fix(s), t.type = "mousewheel", "detail" in s && (d = -1 * s.detail), "wheelDelta" in s && (d = s.wheelDelta), "wheelDeltaY" in s && (d = s.wheelDeltaY), "wheelDeltaX" in s && (r = -1 * s.wheelDeltaX), "axis" in s && s.axis === s.HORIZONTAL_AXIS && (r = -1 * d, d = 0), u = 0 === d ? r : d, "deltaY" in s && (d = -1 * s.deltaY, u = d), "deltaX" in s && (r = s.deltaX, 0 === d && (u = -1 * r)), 0 !== d || 0 !== r) {
			if (1 === s.deltaMode) {
				var c = e.data(this, "mousewheel-line-height");
				u *= c, d *= c, r *= c
			} else if (2 === s.deltaMode) {
				var m = e.data(this, "mousewheel-page-height");
				u *= m, d *= m, r *= m
			}
			return f = Math.max(Math.abs(d), Math.abs(r)), (!l || l > f) && (l = f, i(s, f) && (l /= 40)), i(s, f) && (u /= 40, r /= 40, d /= 40), u = Math[u >= 1 ? "floor" : "ceil"](u / l), r = Math[r >= 1 ? "floor" : "ceil"](r / l), d = Math[d >= 1 ? "floor" : "ceil"](d / l), t.deltaX = r, t.deltaY = d, t.deltaFactor = l, t.deltaMode = 0, a.unshift(t, u, r, d), o && clearTimeout(o), o = setTimeout(n, 200), (e.event.dispatch || e.event.handle).apply(this, a)
		}
	}
	function n() {
		l = null
	}
	function i(e, t) {
		return r.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0
	}
	var o, l, s = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
		a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
		h = Array.prototype.slice;
	if (e.event.fixHooks) for (var u = s.length; u;) e.event.fixHooks[s[--u]] = e.event.mouseHooks;
	var r = e.event.special.mousewheel = {
		version: "3.1.9",
		setup: function() {
			if (this.addEventListener) for (var n = a.length; n;) this.addEventListener(a[--n], t, !1);
			else this.onmousewheel = t;
			e.data(this, "mousewheel-line-height", r.getLineHeight(this)), e.data(this, "mousewheel-page-height", r.getPageHeight(this))
		},
		teardown: function() {
			if (this.removeEventListener) for (var e = a.length; e;) this.removeEventListener(a[--e], t, !1);
			else this.onmousewheel = null
		},
		getLineHeight: function(t) {
			return parseInt(e(t)["offsetParent" in e.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
		},
		getPageHeight: function(t) {
			return e(t).height()
		},
		settings: {
			adjustOldDeltas: !0
		}
	};
	e.fn.extend({
		mousewheel: function(e) {
			return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
		},
		unmousewheel: function(e) {
			return this.unbind("mousewheel", e)
		}
	})
});
Modernizr.addTest("cssvhunit", function() {
	var e;
	return Modernizr.testStyles("#modernizr { height: 50vh; }", function(t) {
		var n = parseInt(window.innerHeight / 2, 10),
			r = parseInt((window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).height, 10);
		e = r == n
	}), e
});
!
function(e) {
	"use strict";

	function t(e) {
		return (e || "").toLowerCase()
	}
	var i = "2.1.0";
	e.fn.cycle = function(i) {
		var n;
		return 0 !== this.length || e.isReady ? this.each(function() {
			var n, s, o, c, r = e(this),
				l = e.fn.cycle.log;
			if (!r.data("cycle.opts")) {
				(r.data("cycle-log") === !1 || i && i.log === !1 || s && s.log === !1) && (l = e.noop), l("--c2 init--"), n = r.data();
				for (var a in n) n.hasOwnProperty(a) && /^cycle[A-Z]+/.test(a) && (c = n[a], o = a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), l(o + ":", c, "(" + typeof c + ")"), n[o] = c);
				s = e.extend({}, e.fn.cycle.defaults, n, i || {}), s.timeoutId = 0, s.paused = s.paused || !1, s.container = r, s._maxZ = s.maxZ, s.API = e.extend({
					_container: r
				}, e.fn.cycle.API), s.API.log = l, s.API.trigger = function(e, t) {
					return s.container.trigger(e, t), s.API
				}, r.data("cycle.opts", s), r.data("cycle.API", s.API), s.API.trigger("cycle-bootstrap", [s, s.API]), s.API.addInitialSlides(), s.API.preInitSlideshow(), s.slides.length && s.API.initSlideshow()
			}
		}) : (n = {
			s: this.selector,
			c: this.context
		}, e.fn.cycle.log("requeuing slideshow (dom not ready)"), e(function() {
			e(n.s, n.c).cycle(i)
		}), this)
	}, e.fn.cycle.API = {
		opts: function() {
			return this._container.data("cycle.opts")
		},
		addInitialSlides: function() {
			var t = this.opts(),
				i = t.slides;
			t.slideCount = 0, t.slides = e(), i = i.jquery ? i : t.container.find(i), t.random && i.sort(function() {
				return Math.random() - .5
			}), t.API.add(i)
		},
		preInitSlideshow: function() {
			var t = this.opts();
			t.API.trigger("cycle-pre-initialize", [t]);
			var i = e.fn.cycle.transitions[t.fx];
			i && e.isFunction(i.preInit) && i.preInit(t), t._preInitialized = !0
		},
		postInitSlideshow: function() {
			var t = this.opts();
			t.API.trigger("cycle-post-initialize", [t]);
			var i = e.fn.cycle.transitions[t.fx];
			i && e.isFunction(i.postInit) && i.postInit(t)
		},
		initSlideshow: function() {
			var t, i = this.opts(),
				n = i.container;
			i.API.calcFirstSlide(), "static" == i.container.css("position") && i.container.css("position", "relative"), e(i.slides[i.currSlide]).css("opacity", 1).css("visibility", "visible"), i.API.stackSlides(i.slides[i.currSlide], i.slides[i.nextSlide], !i.reverse), i.pauseOnHover && (i.pauseOnHover !== !0 && (n = e(i.pauseOnHover)), n.hover(function() {
				i.API.pause(!0)
			}, function() {
				i.API.resume(!0)
			})), i.timeout && (t = i.API.getSlideOpts(i.currSlide), i.API.queueTransition(t, t.timeout + i.delay)), i._initialized = !0, i.API.updateView(!0), i.API.trigger("cycle-initialized", [i]), i.API.postInitSlideshow()
		},
		pause: function(t) {
			var i = this.opts(),
				n = i.API.getSlideOpts(),
				s = i.hoverPaused || i.paused;
			t ? i.hoverPaused = !0 : i.paused = !0, s || (i.container.addClass("cycle-paused"), i.API.trigger("cycle-paused", [i]).log("cycle-paused"), n.timeout && (clearTimeout(i.timeoutId), i.timeoutId = 0, i._remainingTimeout -= e.now() - i._lastQueue, (i._remainingTimeout < 0 || isNaN(i._remainingTimeout)) && (i._remainingTimeout = void 0)))
		},
		resume: function(e) {
			var t = this.opts(),
				i = !t.hoverPaused && !t.paused;
			e ? t.hoverPaused = !1 : t.paused = !1, i || (t.container.removeClass("cycle-paused"), 0 === t.slides.filter(":animated").length && t.API.queueTransition(t.API.getSlideOpts(), t._remainingTimeout), t.API.trigger("cycle-resumed", [t, t._remainingTimeout]).log("cycle-resumed"))
		},
		add: function(t, i) {
			var n, s = this.opts(),
				o = s.slideCount,
				c = !1;
			"string" == e.type(t) && (t = e.trim(t)), e(t).each(function() {
				var t, n = e(this);
				i ? s.container.prepend(n) : s.container.append(n), s.slideCount++, t = s.API.buildSlideOpts(n), s.slides = i ? e(n).add(s.slides) : s.slides.add(n), s.API.initSlide(t, n, --s._maxZ), n.data("cycle.opts", t), s.API.trigger("cycle-slide-added", [s, t, n])
			}), s.API.updateView(!0), c = s._preInitialized && 2 > o && s.slideCount >= 1, c && (s._initialized ? s.timeout && (n = s.slides.length, s.nextSlide = s.reverse ? n - 1 : 1, s.timeoutId || s.API.queueTransition(s)) : s.API.initSlideshow())
		},
		calcFirstSlide: function() {
			var e, t = this.opts();
			e = parseInt(t.startingSlide || 0, 10), (e >= t.slides.length || 0 > e) && (e = 0), t.currSlide = e, t.reverse ? (t.nextSlide = e - 1, t.nextSlide < 0 && (t.nextSlide = t.slides.length - 1)) : (t.nextSlide = e + 1, t.nextSlide == t.slides.length && (t.nextSlide = 0))
		},
		calcNextSlide: function() {
			var e, t = this.opts();
			t.reverse ? (e = t.nextSlide - 1 < 0, t.nextSlide = e ? t.slideCount - 1 : t.nextSlide - 1, t.currSlide = e ? 0 : t.nextSlide + 1) : (e = t.nextSlide + 1 == t.slides.length, t.nextSlide = e ? 0 : t.nextSlide + 1, t.currSlide = e ? t.slides.length - 1 : t.nextSlide - 1)
		},
		calcTx: function(t, i) {
			var n, s = t;
			return i && s.manualFx && (n = e.fn.cycle.transitions[s.manualFx]), n || (n = e.fn.cycle.transitions[s.fx]), n || (n = e.fn.cycle.transitions.fade, s.API.log('Transition "' + s.fx + '" not found. Using fade.')), n
		},
		prepareTx: function(e, t) {
			var i, n, s, o, c, r = this.opts();
			return r.slideCount < 2 ? (r.timeoutId = 0, void 0) : (!e || r.busy && !r.manualTrump || (r.API.stopTransition(), r.busy = !1, clearTimeout(r.timeoutId), r.timeoutId = 0), r.busy || (0 !== r.timeoutId || e) && (n = r.slides[r.currSlide], s = r.slides[r.nextSlide], o = r.API.getSlideOpts(r.nextSlide), c = r.API.calcTx(o, e), r._tx = c, e && void 0 !== o.manualSpeed && (o.speed = o.manualSpeed), r.nextSlide != r.currSlide && (e || !r.paused && !r.hoverPaused && r.timeout) ? (r.API.trigger("cycle-before", [o, n, s, t]), c.before && c.before(o, n, s, t), i = function() {
				r.busy = !1, r.container.data("cycle.opts") && (c.after && c.after(o, n, s, t), r.API.trigger("cycle-after", [o, n, s, t]), r.API.queueTransition(o), r.API.updateView(!0))
			}, r.busy = !0, c.transition ? c.transition(o, n, s, t, i) : r.API.doTransition(o, n, s, t, i), r.API.calcNextSlide(), r.API.updateView()) : r.API.queueTransition(o)), void 0)
		},
		doTransition: function(t, i, n, s, o) {
			var c = t,
				r = e(i),
				l = e(n),
				a = function() {
					l.animate(c.animIn || {
						opacity: 1
					}, c.speed, c.easeIn || c.easing, o)
				};
			l.css(c.cssBefore || {}), r.animate(c.animOut || {}, c.speed, c.easeOut || c.easing, function() {
				r.css(c.cssAfter || {}), c.sync || a()
			}), c.sync && a()
		},
		queueTransition: function(t, i) {
			var n = this.opts(),
				s = void 0 !== i ? i : t.timeout;
			return 0 === n.nextSlide && 0 === --n.loop ? (n.API.log("terminating; loop=0"), n.timeout = 0, s ? setTimeout(function() {
				n.API.trigger("cycle-finished", [n])
			}, s) : n.API.trigger("cycle-finished", [n]), n.nextSlide = n.currSlide, void 0) : (s && (n._lastQueue = e.now(), void 0 === i && (n._remainingTimeout = t.timeout), n.paused || n.hoverPaused || (n.timeoutId = setTimeout(function() {
				n.API.prepareTx(!1, !n.reverse)
			}, s))), void 0)
		},
		stopTransition: function() {
			var e = this.opts();
			e.slides.filter(":animated").length && (e.slides.stop(!1, !0), e.API.trigger("cycle-transition-stopped", [e])), e._tx && e._tx.stopTransition && e._tx.stopTransition(e)
		},
		advanceSlide: function(e) {
			var t = this.opts();
			return clearTimeout(t.timeoutId), t.timeoutId = 0, t.nextSlide = t.currSlide + e, t.nextSlide < 0 ? t.nextSlide = t.slides.length - 1 : t.nextSlide >= t.slides.length && (t.nextSlide = 0), t.API.prepareTx(!0, e >= 0), !1
		},
		buildSlideOpts: function(i) {
			var n, s, o = this.opts(),
				c = i.data() || {};
			for (var r in c) c.hasOwnProperty(r) && /^cycle[A-Z]+/.test(r) && (n = c[r], s = r.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), o.API.log("[" + (o.slideCount - 1) + "]", s + ":", n, "(" + typeof n + ")"), c[s] = n);
			c = e.extend({}, e.fn.cycle.defaults, o, c), c.slideNum = o.slideCount;
			try {
				delete c.API, delete c.slideCount, delete c.currSlide, delete c.nextSlide, delete c.slides
			} catch (l) {}
			return c
		},
		getSlideOpts: function(t) {
			var i = this.opts();
			void 0 === t && (t = i.currSlide);
			var n = i.slides[t],
				s = e(n).data("cycle.opts");
			return e.extend({}, i, s)
		},
		initSlide: function(t, i, n) {
			var s = this.opts();
			i.css(t.slideCss || {}), n > 0 && i.css("zIndex", n), isNaN(t.speed) && (t.speed = e.fx.speeds[t.speed] || e.fx.speeds._default), t.sync || (t.speed = t.speed / 2), i.addClass(s.slideClass)
		},
		updateView: function(e, t) {
			var i = this.opts();
			if (i._initialized) {
				var n = i.API.getSlideOpts(),
					s = i.slides[i.currSlide];
				!e && t !== !0 && (i.API.trigger("cycle-update-view-before", [i, n, s]), i.updateView < 0) || (i.slideActiveClass && i.slides.removeClass(i.slideActiveClass).eq(i.currSlide).addClass(i.slideActiveClass), e && i.hideNonActive && i.slides.filter(":not(." + i.slideActiveClass + ")").css("visibility", "hidden"), 0 === i.updateView && setTimeout(function() {
					i.API.trigger("cycle-update-view", [i, n, s, e])
				}, n.speed / (i.sync ? 2 : 1)), 0 !== i.updateView && i.API.trigger("cycle-update-view", [i, n, s, e]), e && i.API.trigger("cycle-update-view-after", [i, n, s]))
			}
		},
		getComponent: function(t) {
			var i = this.opts(),
				n = i[t];
			return "string" == typeof n ? /^\s*[\>|\+|~]/.test(n) ? i.container.find(n) : e(n) : n.jquery ? n : e(n)
		},
		stackSlides: function(t, i, n) {
			var s = this.opts();
			t || (t = s.slides[s.currSlide], i = s.slides[s.nextSlide], n = !s.reverse), e(t).css("zIndex", s.maxZ);
			var o, c = s.maxZ - 2,
				r = s.slideCount;
			if (n) {
				for (o = s.currSlide + 1; r > o; o++) e(s.slides[o]).css("zIndex", c--);
				for (o = 0; o < s.currSlide; o++) e(s.slides[o]).css("zIndex", c--)
			} else {
				for (o = s.currSlide - 1; o >= 0; o--) e(s.slides[o]).css("zIndex", c--);
				for (o = r - 1; o > s.currSlide; o--) e(s.slides[o]).css("zIndex", c--)
			}
			e(i).css("zIndex", s.maxZ - 1)
		},
		getSlideIndex: function(e) {
			return this.opts().slides.index(e)
		}
	}, e.fn.cycle.log = function() {
		window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "))
	}, e.fn.cycle.version = function() {
		return "Cycle2: " + i
	}, e.fn.cycle.transitions = {
		custom: {},
		none: {
			before: function(e, t, i, n) {
				e.API.stackSlides(i, t, n), e.cssBefore = {
					opacity: 1,
					visibility: "visible"
				}
			}
		},
		fade: {
			before: function(t, i, n, s) {
				var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
				t.API.stackSlides(i, n, s), t.cssBefore = e.extend(o, {
					opacity: 0,
					visibility: "visible"
				}), t.animIn = {
					opacity: 1
				}, t.animOut = {
					opacity: 0
				}
			}
		},
		fadeout: {
			before: function(t, i, n, s) {
				var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
				t.API.stackSlides(i, n, s), t.cssBefore = e.extend(o, {
					opacity: 1,
					visibility: "visible"
				}), t.animOut = {
					opacity: 0
				}
			}
		},
		scrollHorz: {
			before: function(e, t, i, n) {
				e.API.stackSlides(t, i, n);
				var s = e.container.css("overflow", "hidden").width();
				e.cssBefore = {
					left: n ? s : -s,
					top: 0,
					opacity: 1,
					visibility: "visible"
				}, e.cssAfter = {
					zIndex: e._maxZ - 2,
					left: 0
				}, e.animIn = {
					left: 0
				}, e.animOut = {
					left: n ? -s : s
				}
			}
		}
	}, e.fn.cycle.defaults = {
		allowWrap: !0,
		autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]",
		delay: 0,
		easing: null,
		fx: "fade",
		hideNonActive: !0,
		loop: 0,
		manualFx: void 0,
		manualSpeed: void 0,
		manualTrump: !0,
		maxZ: 100,
		pauseOnHover: !1,
		reverse: !1,
		slideActiveClass: "cycle-slide-active",
		slideClass: "cycle-slide",
		slideCss: {
			position: "absolute",
			top: 0,
			left: 0
		},
		slides: "> img",
		speed: 500,
		startingSlide: 0,
		sync: !0,
		timeout: 4e3,
		updateView: 0
	}, e(document).ready(function() {
		e(e.fn.cycle.defaults.autoSelector).cycle()
	})
}(jQuery), function(e) {
	"use strict";

	function t(t, n) {
		var s, o, c, r = n.autoHeight;
		if ("container" == r) o = e(n.slides[n.currSlide]).outerHeight(), n.container.height(o);
		else if (n._autoHeightRatio) n.container.height(n.container.width() / n._autoHeightRatio);
		else if ("calc" === r || "number" == e.type(r) && r >= 0) {
			if (c = "calc" === r ? i(t, n) : r >= n.slides.length ? 0 : r, c == n._sentinelIndex) return;
			n._sentinelIndex = c, n._sentinel && n._sentinel.remove(), s = e(n.slides[c].cloneNode(!0)), s.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), s.css({
				position: "static",
				visibility: "hidden",
				display: "block"
			}).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), s.find("*").css("visibility", "hidden"), n._sentinel = s
		}
	}
	function i(t, i) {
		var n = 0,
			s = -1;
		return i.slides.each(function(t) {
			var i = e(this).height();
			i > s && (s = i, n = t)
		}), n
	}
	function n(t, i, n, s) {
		var o = e(s).outerHeight();
		i.container.animate({
			height: o
		}, i.autoHeightSpeed, i.autoHeightEasing)
	}
	function s(i, o) {
		o._autoHeightOnResize && (e(window).off("resize orientationchange", o._autoHeightOnResize), o._autoHeightOnResize = null), o.container.off("cycle-slide-added cycle-slide-removed", t), o.container.off("cycle-destroyed", s), o.container.off("cycle-before", n), o._sentinel && (o._sentinel.remove(), o._sentinel = null)
	}
	e.extend(e.fn.cycle.defaults, {
		autoHeight: 0,
		autoHeightSpeed: 250,
		autoHeightEasing: null
	}), e(document).on("cycle-initialized", function(i, o) {
		function c() {
			t(i, o)
		}
		var r, l = o.autoHeight,
			a = e.type(l),
			d = null;
		("string" === a || "number" === a) && (o.container.on("cycle-slide-added cycle-slide-removed", t), o.container.on("cycle-destroyed", s), "container" == l ? o.container.on("cycle-before", n) : "string" === a && /\d+\:\d+/.test(l) && (r = l.match(/(\d+)\:(\d+)/), r = r[1] / r[2], o._autoHeightRatio = r), "number" !== a && (o._autoHeightOnResize = function() {
			clearTimeout(d), d = setTimeout(c, 50)
		}, e(window).on("resize orientationchange", o._autoHeightOnResize)), setTimeout(c, 30))
	})
}(jQuery), function(e) {
	"use strict";
	e.extend(e.fn.cycle.defaults, {
		caption: "> .cycle-caption",
		captionTemplate: "{{slideNum}} / {{slideCount}}",
		overlay: "> .cycle-overlay",
		overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>",
		captionModule: "caption"
	}), e(document).on("cycle-update-view", function(t, i, n, s) {
		if ("caption" === i.captionModule) {
			e.each(["caption", "overlay"], function() {
				var e = this,
					t = n[e + "Template"],
					o = i.API.getComponent(e);
				o.length && t ? (o.html(i.API.tmpl(t, n, i, s)), o.show()) : o.hide()
			})
		}
	}), e(document).on("cycle-destroyed", function(t, i) {
		var n;
		e.each(["caption", "overlay"], function() {
			var e = this,
				t = i[e + "Template"];
			i[e] && t && (n = i.API.getComponent("caption"), n.empty())
		})
	})
}(jQuery), function(e) {
	"use strict";
	var t = e.fn.cycle;
	e.fn.cycle = function(i) {
		var n, s, o, c = e.makeArray(arguments);
		return "number" == e.type(i) ? this.cycle("goto", i) : "string" == e.type(i) ? this.each(function() {
			var r;
			return n = i, o = e(this).data("cycle.opts"), void 0 === o ? (t.log('slideshow must be initialized before sending commands; "' + n + '" ignored'), void 0) : (n = "goto" == n ? "jump" : n, s = o.API[n], e.isFunction(s) ? (r = e.makeArray(c), r.shift(), s.apply(o.API, r)) : (t.log("unknown command: ", n), void 0))
		}) : t.apply(this, arguments)
	}, e.extend(e.fn.cycle, t), e.extend(t.API, {
		next: function() {
			var e = this.opts();
			if (!e.busy || e.manualTrump) {
				var t = e.reverse ? -1 : 1;
				e.allowWrap === !1 && e.currSlide + t >= e.slideCount || (e.API.advanceSlide(t), e.API.trigger("cycle-next", [e]).log("cycle-next"))
			}
		},
		prev: function() {
			var e = this.opts();
			if (!e.busy || e.manualTrump) {
				var t = e.reverse ? 1 : -1;
				e.allowWrap === !1 && e.currSlide + t < 0 || (e.API.advanceSlide(t), e.API.trigger("cycle-prev", [e]).log("cycle-prev"))
			}
		},
		destroy: function() {
			this.stop();
			var t = this.opts(),
				i = e.isFunction(e._data) ? e._data : e.noop;
			clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stop(), t.API.trigger("cycle-destroyed", [t]).log("cycle-destroyed"), t.container.removeData(), i(t.container[0], "parsedAttrs", !1), t.retainStylesOnDestroy || (t.container.removeAttr("style"), t.slides.removeAttr("style"), t.slides.removeClass(t.slideActiveClass)), t.slides.each(function() {
				e(this).removeData(), i(this, "parsedAttrs", !1)
			})
		},
		jump: function(e) {
			var t, i = this.opts();
			if (!i.busy || i.manualTrump) {
				var n = parseInt(e, 10);
				if (isNaN(n) || 0 > n || n >= i.slides.length) return i.API.log("goto: invalid slide index: " + n), void 0;
				if (n == i.currSlide) return i.API.log("goto: skipping, already on slide", n), void 0;
				i.nextSlide = n, clearTimeout(i.timeoutId), i.timeoutId = 0, i.API.log("goto: ", n, " (zero-index)"), t = i.currSlide < i.nextSlide, i.API.prepareTx(!0, t)
			}
		},
		stop: function() {
			var t = this.opts(),
				i = t.container;
			clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stopTransition(), t.pauseOnHover && (t.pauseOnHover !== !0 && (i = e(t.pauseOnHover)), i.off("mouseenter mouseleave")), t.API.trigger("cycle-stopped", [t]).log("cycle-stopped")
		},
		reinit: function() {
			var e = this.opts();
			e.API.destroy(), e.container.cycle()
		},
		remove: function(t) {
			for (var i, n, s = this.opts(), o = [], c = 1, r = 0; r < s.slides.length; r++) i = s.slides[r], r == t ? n = i : (o.push(i), e(i).data("cycle.opts").slideNum = c, c++);
			n && (s.slides = e(o), s.slideCount--, e(n).remove(), t == s.currSlide ? s.API.advanceSlide(1) : t < s.currSlide ? s.currSlide-- : s.currSlide++, s.API.trigger("cycle-slide-removed", [s, t, n]).log("cycle-slide-removed"), s.API.updateView())
		}
	}), e(document).on("click.cycle", "[data-cycle-cmd]", function(t) {
		t.preventDefault();
		var i = e(this),
			n = i.data("cycle-cmd"),
			s = i.data("cycle-context") || ".cycle-slideshow";
		e(s).cycle(n, i.data("cycle-arg"))
	})
}(jQuery), function(e) {
	"use strict";

	function t(t, i) {
		var n;
		return t._hashFence ? (t._hashFence = !1, void 0) : (n = window.location.hash.substring(1), t.slides.each(function(s) {
			if (e(this).data("cycle-hash") == n) {
				if (i === !0) t.startingSlide = s;
				else {
					var o = t.currSlide < s;
					t.nextSlide = s, t.API.prepareTx(!0, o)
				}
				return !1
			}
		}), void 0)
	}
	e(document).on("cycle-pre-initialize", function(i, n) {
		t(n, !0), n._onHashChange = function() {
			t(n, !1)
		}, e(window).on("hashchange", n._onHashChange)
	}), e(document).on("cycle-update-view", function(e, t, i) {
		i.hash && "#" + i.hash != window.location.hash && (t._hashFence = !0, window.location.hash = i.hash)
	}), e(document).on("cycle-destroyed", function(t, i) {
		i._onHashChange && e(window).off("hashchange", i._onHashChange)
	})
}(jQuery), function(e) {
	"use strict";
	e.extend(e.fn.cycle.defaults, {
		loader: !1
	}), e(document).on("cycle-bootstrap", function(t, i) {
		function n(t, n) {
			function o(t) {
				var o;
				"wait" == i.loader ? (r.push(t), 0 === a && (r.sort(c), s.apply(i.API, [r, n]), i.container.removeClass("cycle-loading"))) : (o = e(i.slides[i.currSlide]), s.apply(i.API, [t, n]), o.show(), i.container.removeClass("cycle-loading"))
			}
			function c(e, t) {
				return e.data("index") - t.data("index")
			}
			var r = [];
			if ("string" == e.type(t)) t = e.trim(t);
			else if ("array" === e.type(t)) for (var l = 0; l < t.length; l++) t[l] = e(t[l])[0];
			t = e(t);
			var a = t.length;
			a && (t.css("visibility", "hidden").appendTo("body").each(function(t) {
				function c() {
					0 === --l && (--a, o(d))
				}
				var l = 0,
					d = e(this),
					u = d.is("img") ? d : d.find("img");
				return d.data("index", t), u = u.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'), u.length ? (l = u.length, u.each(function() {
					this.complete ? c() : e(this).load(function() {
						c()
					}).on("error", function() {
						0 === --l && (i.API.log("slide skipped; img not loaded:", this.src), 0 === --a && "wait" == i.loader && s.apply(i.API, [r, n]))
					})
				}), void 0) : (--a, r.push(d), void 0)
			}), a && i.container.addClass("cycle-loading"))
		}
		var s;
		i.loader && (s = i.API.add, i.API.add = n)
	})
}(jQuery), function(e) {
	"use strict";

	function t(t, i, n) {
		var s, o = t.API.getComponent("pager");
		o.each(function() {
			var o = e(this);
			if (i.pagerTemplate) {
				var c = t.API.tmpl(i.pagerTemplate, i, t, n[0]);
				s = e(c).appendTo(o)
			} else s = o.children().eq(t.slideCount - 1);
			s.on(t.pagerEvent, function(e) {
				e.preventDefault(), t.API.page(o, e.currentTarget)
			})
		})
	}
	function i(e, t) {
		var i = this.opts();
		if (!i.busy || i.manualTrump) {
			var n = e.children().index(t),
				s = n,
				o = i.currSlide < s;
			i.currSlide != s && (i.nextSlide = s, i.API.prepareTx(!0, o), i.API.trigger("cycle-pager-activated", [i, e, t]))
		}
	}
	e.extend(e.fn.cycle.defaults, {
		pager: "> .cycle-pager",
		pagerActiveClass: "cycle-pager-active",
		pagerEvent: "click.cycle",
		pagerTemplate: "<span>&bull;</span>"
	}), e(document).on("cycle-bootstrap", function(e, i, n) {
		n.buildPagerLink = t
	}), e(document).on("cycle-slide-added", function(e, t, n, s) {
		t.pager && (t.API.buildPagerLink(t, n, s), t.API.page = i)
	}), e(document).on("cycle-slide-removed", function(t, i, n) {
		if (i.pager) {
			var s = i.API.getComponent("pager");
			s.each(function() {
				var t = e(this);
				e(t.children()[n]).remove()
			})
		}
	}), e(document).on("cycle-update-view", function(t, i) {
		var n;
		i.pager && (n = i.API.getComponent("pager"), n.each(function() {
			e(this).children().removeClass(i.pagerActiveClass).eq(i.currSlide).addClass(i.pagerActiveClass)
		}))
	}), e(document).on("cycle-destroyed", function(e, t) {
		var i = t.API.getComponent("pager");
		i && (i.children().off(t.pagerEvent), t.pagerTemplate && i.empty())
	})
}(jQuery), function(e) {
	"use strict";
	e.extend(e.fn.cycle.defaults, {
		next: "> .cycle-next",
		nextEvent: "click.cycle",
		disabledClass: "disabled",
		prev: "> .cycle-prev",
		prevEvent: "click.cycle",
		swipe: !1
	}), e(document).on("cycle-initialized", function(e, t) {
		if (t.API.getComponent("next").on(t.nextEvent, function(e) {
			e.preventDefault(), t.API.next()
		}), t.API.getComponent("prev").on(t.prevEvent, function(e) {
			e.preventDefault(), t.API.prev()
		}), t.swipe) {
			var i = t.swipeVert ? "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle",
				n = t.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle";
			t.container.on(i, function() {
				t.API.next()
			}), t.container.on(n, function() {
				t.API.prev()
			})
		}
	}), e(document).on("cycle-update-view", function(e, t) {
		if (!t.allowWrap) {
			var i = t.disabledClass,
				n = t.API.getComponent("next"),
				s = t.API.getComponent("prev"),
				o = t._prevBoundry || 0,
				c = void 0 !== t._nextBoundry ? t._nextBoundry : t.slideCount - 1;
			t.currSlide == c ? n.addClass(i).prop("disabled", !0) : n.removeClass(i).prop("disabled", !1), t.currSlide === o ? s.addClass(i).prop("disabled", !0) : s.removeClass(i).prop("disabled", !1)
		}
	}), e(document).on("cycle-destroyed", function(e, t) {
		t.API.getComponent("prev").off(t.nextEvent), t.API.getComponent("next").off(t.prevEvent), t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")
	})
}(jQuery), function(e) {
	"use strict";
	e.extend(e.fn.cycle.defaults, {
		progressive: !1
	}), e(document).on("cycle-pre-initialize", function(t, i) {
		if (i.progressive) {
			var n, s, o = i.API,
				c = o.next,
				r = o.prev,
				l = o.prepareTx,
				a = e.type(i.progressive);
			if ("array" == a) n = i.progressive;
			else if (e.isFunction(i.progressive)) n = i.progressive(i);
			else if ("string" == a) {
				if (s = e(i.progressive), n = e.trim(s.html()), !n) return;
				if (/^(\[)/.test(n)) try {
					n = e.parseJSON(n)
				} catch (d) {
					return o.log("error parsing progressive slides", d), void 0
				} else n = n.split(new RegExp(s.data("cycle-split") || "\n")), n[n.length - 1] || n.pop()
			}
			l && (o.prepareTx = function(e, t) {
				var s, o;
				return e || 0 === n.length ? (l.apply(i.API, [e, t]), void 0) : (t && i.currSlide == i.slideCount - 1 ? (o = n[0], n = n.slice(1), i.container.one("cycle-slide-added", function(e, t) {
					setTimeout(function() {
						t.API.advanceSlide(1)
					}, 50)
				}), i.API.add(o)) : t || 0 !== i.currSlide ? l.apply(i.API, [e, t]) : (s = n.length - 1, o = n[s], n = n.slice(0, s), i.container.one("cycle-slide-added", function(e, t) {
					setTimeout(function() {
						t.currSlide = 1, t.API.advanceSlide(-1)
					}, 50)
				}), i.API.add(o, !0)), void 0)
			}), c && (o.next = function() {
				var e = this.opts();
				if (n.length && e.currSlide == e.slideCount - 1) {
					var t = n[0];
					n = n.slice(1), e.container.one("cycle-slide-added", function(e, t) {
						c.apply(t.API), t.container.removeClass("cycle-loading")
					}), e.container.addClass("cycle-loading"), e.API.add(t)
				} else c.apply(e.API)
			}), r && (o.prev = function() {
				var e = this.opts();
				if (n.length && 0 === e.currSlide) {
					var t = n.length - 1,
						i = n[t];
					n = n.slice(0, t), e.container.one("cycle-slide-added", function(e, t) {
						t.currSlide = 1, t.API.advanceSlide(-1), t.container.removeClass("cycle-loading")
					}), e.container.addClass("cycle-loading"), e.API.add(i, !0)
				} else r.apply(e.API)
			})
		}
	})
}(jQuery), function(e) {
	"use strict";
	e.extend(e.fn.cycle.defaults, {
		tmplRegex: "{{((.)?.*?)}}"
	}), e.extend(e.fn.cycle.API, {
		tmpl: function(t, i) {
			var n = new RegExp(i.tmplRegex || e.fn.cycle.defaults.tmplRegex, "g"),
				s = e.makeArray(arguments);
			return s.shift(), t.replace(n, function(t, i) {
				var n, o, c, r, l = i.split(".");
				for (n = 0; n < s.length; n++) if (c = s[n]) {
					if (l.length > 1) for (r = c, o = 0; o < l.length; o++) c = r, r = r[l[o]] || i;
					else r = c[i];
					if (e.isFunction(r)) return r.apply(c, s);
					if (void 0 !== r && null !== r && r != i) return r
				}
				return i
			})
		}
	})
}(jQuery);
!
function(t) {
	"use strict";
	var e = function(t) {
			this.messages = {
				defaultMessage: "This value seems to be invalid.",
				type: {
					email: "This value should be a valid email.",
					url: "This value should be a valid url.",
					urlstrict: "This value should be a valid url.",
					number: "This value should be a valid number.",
					digits: "This value should be digits.",
					dateIso: "This value should be a valid date (YYYY-MM-DD).",
					alphanum: "This value should be alphanumeric.",
					phone: "This value should be a valid phone number."
				},
				notnull: "This value should not be null.",
				notblank: "This value should not be blank.",
				required: "This value is required.",
				regexp: "This value seems to be invalid.",
				min: "This value should be greater than or equal to %s.",
				max: "This value should be lower than or equal to %s.",
				range: "This value should be between %s and %s.",
				minlength: "This value is too short. It should have %s characters or more.",
				maxlength: "This value is too long. It should have %s characters or less.",
				rangelength: "This value length is invalid. It should be between %s and %s characters long.",
				mincheck: "You must select at least %s choices.",
				maxcheck: "You must select %s choices or less.",
				rangecheck: "You must select between %s and %s choices.",
				equalto: "This value should be the same."
			}, this.init(t)
		};
	e.prototype = {
		constructor: e,
		validators: {
			notnull: function(t) {
				return t.length > 0
			},
			notblank: function(t) {
				return "string" == typeof t && "" !== t.replace(/^\s+/g, "").replace(/\s+$/g, "")
			},
			required: function(t) {
				if ("object" == typeof t) {
					for (var e in t) if (this.required(t[e])) return !0;
					return !1
				}
				return this.notnull(t) && this.notblank(t)
			},
			type: function(t, e) {
				var i;
				switch (e) {
				case "number":
					i = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
					break;
				case "digits":
					i = /^\d+$/;
					break;
				case "alphanum":
					i = /^\w+$/;
					break;
				case "email":
					i = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
					break;
				case "url":
					t = new RegExp("(https?|s?ftp|git)", "i").test(t) ? t : "http://" + t;
				case "urlstrict":
					i = /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
					break;
				case "dateIso":
					i = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;
					break;
				case "phone":
					i = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
					break;
				default:
					return !1
				}
				return "" !== t ? i.test(t) : !1
			},
			regexp: function(t, e, i) {
				return new RegExp(e, i.options.regexpFlag || "").test(t)
			},
			minlength: function(t, e) {
				return t.length >= e
			},
			maxlength: function(t, e) {
				return t.length <= e
			},
			rangelength: function(t, e) {
				return this.minlength(t, e[0]) && this.maxlength(t, e[1])
			},
			min: function(t, e) {
				return Number(t) >= e
			},
			max: function(t, e) {
				return Number(t) <= e
			},
			range: function(t, e) {
				return t >= e[0] && t <= e[1]
			},
			equalto: function(e, i, s) {
				return s.options.validateIfUnchanged = !0, e === t(i).val()
			},
			remote: function(e, i, s) {
				var n = null,
					r = {},
					a = {};
				r[s.$element.attr("name")] = e, "undefined" != typeof s.options.remoteDatatype && (a = {
					dataType: s.options.remoteDatatype
				});
				var o = function(e, i) {
						"undefined" != typeof i && "undefined" != typeof s.Validator.messages.remote && i !== s.Validator.messages.remote && t(s.ulError + " .remote").remove(), s.updtConstraint({
							name: "remote",
							valid: e
						}, i), s.manageValidationResult()
					},
					u = function(e) {
						if ("object" == typeof e) return e;
						try {
							e = t.parseJSON(e)
						} catch (i) {}
						return e
					},
					h = function(t) {
						return "object" == typeof t && null !== t ? "undefined" != typeof t.error ? t.error : "undefined" != typeof t.message ? t.message : null : null
					};
				return t.ajax(t.extend({}, {
					url: i,
					data: r,
					type: s.options.remoteMethod || "GET",
					success: function(t) {
						t = u(t), o(1 === t || !0 === t || "object" == typeof t && null !== t && "undefined" != typeof t.success, h(t))
					},
					error: function(t) {
						t = u(t), o(!1, h(t))
					}
				}, a)), n
			},
			mincheck: function(t, e) {
				return this.minlength(t, e)
			},
			maxcheck: function(t, e) {
				return this.maxlength(t, e)
			},
			rangecheck: function(t, e) {
				return this.rangelength(t, e)
			}
		},
		init: function(t) {
			var e, i = t.validators,
				s = t.messages;
			for (e in i) this.addValidator(e, i[e]);
			for (e in s) this.addMessage(e, s[e])
		},
		formatMesssage: function(t, e) {
			if ("object" == typeof e) {
				for (var i in e) t = this.formatMesssage(t, e[i]);
				return t
			}
			return "string" == typeof t ? t.replace(new RegExp("%s", "i"), e) : ""
		},
		addValidator: function(t, e) {
			this.validators[t] = e
		},
		addMessage: function(t, e, i) {
			if ("undefined" != typeof i && !0 === i) return this.messages.type[t] = e, void 0;
			if ("type" !== t) this.messages[t] = e;
			else for (var s in e) this.messages.type[s] = e[s]
		}
	};
	var i = function(t, i, s) {
			return this.options = i, this.Validator = new e(i), "ParsleyFieldMultiple" === s ? this : (this.init(t, s || "ParsleyField"), void 0)
		};
	i.prototype = {
		constructor: i,
		init: function(e, i) {
			this.type = i, this.valid = !0, this.element = e, this.validatedOnce = !1, this.$element = t(e), this.val = this.$element.val(), this.isRequired = !1, this.constraints = {}, "undefined" == typeof this.isRadioOrCheckbox && (this.isRadioOrCheckbox = !1, this.hash = this.generateHash(), this.errorClassHandler = this.options.errors.classHandler(e, this.isRadioOrCheckbox) || this.$element), this.ulErrorManagement(), this.bindHtml5Constraints(), this.addConstraints(), this.hasConstraints() && this.bindValidationEvents()
		},
		setParent: function(e) {
			this.$parent = t(e)
		},
		getParent: function() {
			return this.$parent
		},
		bindHtml5Constraints: function() {
			(this.$element.hasClass("required") || this.$element.prop("required")) && (this.options.required = !0), "undefined" != typeof this.$element.attr("type") && new RegExp(this.$element.attr("type"), "i").test("email url number range") && (this.options.type = this.$element.attr("type"), new RegExp(this.options.type, "i").test("number range") && (this.options.type = "number", "undefined" != typeof this.$element.attr("min") && this.$element.attr("min").length && (this.options.min = this.$element.attr("min")), "undefined" != typeof this.$element.attr("max") && this.$element.attr("max").length && (this.options.max = this.$element.attr("max")))), "string" == typeof this.$element.attr("pattern") && this.$element.attr("pattern").length && (this.options.regexp = this.$element.attr("pattern"))
		},
		addConstraints: function() {
			for (var t in this.options) {
				var e = {};
				e[t] = this.options[t], this.addConstraint(e, !0)
			}
		},
		addConstraint: function(t, e) {
			for (var i in t) i = i.toLowerCase(), "function" == typeof this.Validator.validators[i] && (this.constraints[i] = {
				name: i,
				requirements: t[i],
				valid: null
			}, "required" === i && (this.isRequired = !0), this.addCustomConstraintMessage(i));
			"undefined" == typeof e && this.bindValidationEvents()
		},
		updateConstraint: function(t, e) {
			for (var i in t) this.updtConstraint({
				name: i,
				requirements: t[i],
				valid: null
			}, e)
		},
		updtConstraint: function(e, i) {
			this.constraints[e.name] = t.extend(!0, this.constraints[e.name], e), "string" == typeof i && (this.Validator.messages[e.name] = i), this.bindValidationEvents()
		},
		removeConstraint: function(t) {
			var t = t.toLowerCase();
			return delete this.constraints[t], "required" === t && (this.isRequired = !1), this.hasConstraints() ? (this.bindValidationEvents(), void 0) : "ParsleyForm" == typeof this.getParent() ? (this.getParent().removeItem(this.$element), void 0) : (this.destroy(), void 0)
		},
		addCustomConstraintMessage: function(t) {
			var e = t + ("type" === t && "undefined" != typeof this.options[t] ? this.options[t].charAt(0).toUpperCase() + this.options[t].substr(1) : "") + "Message";
			"undefined" != typeof this.options[e] && this.Validator.addMessage("type" === t ? this.options[t] : t, this.options[e], "type" === t)
		},
		bindValidationEvents: function() {
			this.valid = null, this.$element.addClass("parsley-validated"), this.$element.off("." + this.type), this.options.remote && !new RegExp("change", "i").test(this.options.trigger) && (this.options.trigger = this.options.trigger ? " change" : "change");
			var e = (this.options.trigger ? this.options.trigger : "") + (new RegExp("key", "i").test(this.options.trigger) ? "" : " keyup");
			this.$element.is("select") && (e += new RegExp("change", "i").test(e) ? "" : " change"), e = e.replace(/^\s+/g, "").replace(/\s+$/g, ""), this.$element.on((e + " ").split(" ").join("." + this.type + " "), !1, t.proxy(this.eventValidation, this))
		},
		generateHash: function() {
			return "parsley-" + (Math.random() + "").substring(2)
		},
		getHash: function() {
			return this.hash
		},
		getVal: function() {
			return this.$element.data("value") || this.$element.val()
		},
		eventValidation: function(t) {
			var e = this.getVal();
			return "keyup" !== t.type || /keyup/i.test(this.options.trigger) || this.validatedOnce ? "change" !== t.type || /change/i.test(this.options.trigger) || this.validatedOnce ? !this.isRadioOrCheckbox && e.length < this.options.validationMinlength && !this.validatedOnce ? !0 : (this.validate(), void 0) : !0 : !0
		},
		isValid: function() {
			return this.validate(!1)
		},
		hasConstraints: function() {
			for (var t in this.constraints) return !0;
			return !1
		},
		validate: function(t) {
			var e = this.getVal(),
				i = null;
			return this.hasConstraints() ? this.options.listeners.onFieldValidate(this.element, this) || "" === e && !this.isRequired ? (this.reset(), null) : this.needsValidation(e) ? (i = this.applyValidators(), ("undefined" != typeof t ? t : this.options.showErrors) && this.manageValidationResult(), i) : this.valid : null
		},
		needsValidation: function(t) {
			return !this.options.validateIfUnchanged && null !== this.valid && this.val === t && this.validatedOnce ? !1 : (this.val = t, this.validatedOnce = !0)
		},
		applyValidators: function() {
			var t = null;
			for (var e in this.constraints) {
				var i = this.Validator.validators[this.constraints[e].name](this.val, this.constraints[e].requirements, this);
				!1 === i ? (t = !1, this.constraints[e].valid = t, this.options.listeners.onFieldError(this.element, this.constraints, this)) : !0 === i && (this.constraints[e].valid = !0, t = !1 !== t, this.options.listeners.onFieldSuccess(this.element, this.constraints, this))
			}
			return t
		},
		manageValidationResult: function() {
			var t = null;
			for (var e in this.constraints)!1 === this.constraints[e].valid ? (this.manageError(this.constraints[e]), t = !1) : !0 === this.constraints[e].valid && (this.removeError(this.constraints[e].name), t = !1 !== t);
			return this.valid = t, !0 === this.valid ? (this.removeErrors(), this.errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass), !0) : !1 === this.valid ? (this.errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass), !1) : t
		},
		ulErrorManagement: function() {
			this.ulError = "#" + this.hash, this.ulTemplate = t(this.options.errors.errorsWrapper).attr("id", this.hash).addClass("parsley-error-list")
		},
		removeError: function(e) {
			var i = this.ulError + " ." + e,
				s = this;
			this.options.animate ? t(i).fadeOut(this.options.animateDuration, function() {
				t(this).remove(), s.ulError && 0 === t(s.ulError).children().length && s.removeErrors()
			}) : t(i).remove(), this.ulError && 0 === t(this.ulError).children().length && this.removeErrors()
		},
		addError: function(e) {
			for (var i in e) {
				var s = t(this.options.errors.errorElem).addClass(i);
				t(this.ulError).append(this.options.animate ? t(s).html(e[i]).hide().fadeIn(this.options.animateDuration) : t(s).html(e[i]))
			}
		},
		removeErrors: function() {
			this.options.animate ? t(this.ulError).fadeOut(this.options.animateDuration, function() {
				t(this).remove()
			}) : t(this.ulError).remove()
		},
		reset: function() {
			this.valid = null, this.removeErrors(), this.validatedOnce = !1, this.errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
			for (var t in this.constraints) this.constraints[t].valid = null;
			return this
		},
		manageError: function(e) {
			if (t(this.ulError).length || this.manageErrorContainer(), !("required" === e.name && null !== this.getVal() && this.getVal().length > 0 || this.isRequired && "required" !== e.name && (null === this.getVal() || 0 === this.getVal().length))) {
				var i = e.name,
					s = !1 !== this.options.errorMessage ? "custom-error-message" : i,
					n = {},
					r = !1 !== this.options.errorMessage ? this.options.errorMessage : "type" === e.name ? this.Validator.messages[i][e.requirements] : "undefined" == typeof this.Validator.messages[i] ? this.Validator.messages.defaultMessage : this.Validator.formatMesssage(this.Validator.messages[i], e.requirements);
				t(this.ulError + " ." + s).length || (n[s] = r, this.addError(n))
			}
		},
		manageErrorContainer: function() {
			var e = this.options.errorContainer || this.options.errors.container(this.element, this.isRadioOrCheckbox),
				i = this.options.animate ? this.ulTemplate.show() : this.ulTemplate;
			return "undefined" != typeof e ? (t(e).append(i), void 0) : (this.isRadioOrCheckbox ? this.$element.parent().after(i) : this.$element.after(i), void 0)
		},
		addListener: function(t) {
			for (var e in t) this.options.listeners[e] = t[e]
		},
		destroy: function() {
			this.$element.removeClass("parsley-validated"), this.reset().$element.off("." + this.type).removeData(this.type)
		}
	};
	var s = function(t, i, s) {
			this.initMultiple(t, i), this.inherit(t, i), this.Validator = new e(i), this.init(t, s || "ParsleyFieldMultiple")
		};
	s.prototype = {
		constructor: s,
		initMultiple: function(e, i) {
			this.element = e, this.$element = t(e), this.group = i.group || !1, this.hash = this.getName(), this.siblings = this.group ? '[data-group="' + this.group + '"]' : 'input[name="' + this.$element.attr("name") + '"]', this.isRadioOrCheckbox = !0, this.isRadio = this.$element.is("input[type=radio]"), this.isCheckbox = this.$element.is("input[type=checkbox]"), this.errorClassHandler = i.errors.classHandler(e, this.isRadioOrCheckbox) || this.$element.parent()
		},
		inherit: function(t, e) {
			var s = new i(t, e, "ParsleyFieldMultiple");
			for (var n in s)"undefined" == typeof this[n] && (this[n] = s[n])
		},
		getName: function() {
			if (this.group) return "parsley-" + this.group;
			if ("undefined" == typeof this.$element.attr("name")) throw "A radio / checkbox input must have a data-group attribute or a name to be Parsley validated !";
			return "parsley-" + this.$element.attr("name").replace(/(:|\.|\[|\])/g, "")
		},
		getVal: function() {
			if (this.isRadio) return t(this.siblings + ":checked").val() || "";
			if (this.isCheckbox) {
				var e = [];
				return t(this.siblings + ":checked").each(function() {
					e.push(t(this).val())
				}), e
			}
		},
		bindValidationEvents: function() {
			this.valid = null, this.$element.addClass("parsley-validated"), this.$element.off("." + this.type);
			var e = this,
				i = (this.options.trigger ? this.options.trigger : "") + (new RegExp("change", "i").test(this.options.trigger) ? "" : " change");
			i = i.replace(/^\s+/g, "").replace(/\s+$/g, ""), t(this.siblings).each(function() {
				t(this).on(i.split(" ").join("." + e.type + " "), !1, t.proxy(e.eventValidation, e))
			})
		}
	};
	var n = function(t, e, i) {
			this.init(t, e, i || "parsleyForm")
		};
	n.prototype = {
		constructor: n,
		init: function(e, i, s) {
			this.type = s, this.items = [], this.$element = t(e), this.options = i;
			var n = this;
			this.$element.find(i.inputs).each(function() {
				n.addItem(this)
			}), this.$element.on("submit." + this.type, !1, t.proxy(this.validate, this))
		},
		addListener: function(t) {
			for (var e in t) if (new RegExp("Field").test(e)) for (var i = 0; i < this.items.length; i++) this.items[i].addListener(t);
			else this.options.listeners[e] = t[e]
		},
		addItem: function(e) {
			if (t(e).is(this.options.excluded)) return !1;
			var i = t(e).parsley(this.options);
			i.setParent(this), this.items.push(i)
		},
		removeItem: function(e) {
			for (var i = t(e).parsley(), s = 0; s < this.items.length; s++) if (this.items[s].hash === i.hash) return this.items[s].destroy(), this.items.splice(s, 1), !0;
			return !1
		},
		validate: function(t) {
			var e = !0;
			this.focusedField = !1;
			for (var i = 0; i < this.items.length; i++)"undefined" != typeof this.items[i] && !1 === this.items[i].validate() && (e = !1, (!this.focusedField && "first" === this.options.focus || "last" === this.options.focus) && (this.focusedField = this.items[i].$element));
			return this.focusedField && !e && this.focusedField.focus(), this.options.listeners.onFormSubmit(e, t, this), e
		},
		isValid: function() {
			for (var t = 0; t < this.items.length; t++) if (!1 === this.items[t].isValid()) return !1;
			return !0
		},
		removeErrors: function() {
			for (var t = 0; t < this.items.length; t++) this.items[t].parsley("reset")
		},
		destroy: function() {
			for (var t = 0; t < this.items.length; t++) this.items[t].destroy();
			this.$element.off("." + this.type).removeData(this.type)
		},
		reset: function() {
			for (var t = 0; t < this.items.length; t++) this.items[t].reset()
		}
	}, t.fn.parsley = function(e, r) {
		function a(a, u) {
			var h = t(a).data(u);
			if (!h) {
				switch (u) {
				case "parsleyForm":
					h = new n(a, o, "parsleyForm");
					break;
				case "parsleyField":
					h = new i(a, o, "parsleyField");
					break;
				case "parsleyFieldMultiple":
					h = new s(a, o, "parsleyFieldMultiple");
					break;
				default:
					return
				}
				t(a).data(u, h)
			}
			if ("string" == typeof e && "function" == typeof h[e]) {
				var l = h[e](r);
				return "undefined" != typeof l ? l : t(a)
			}
			return h
		}
		var o = t.extend(!0, {}, t.fn.parsley.defaults, "undefined" != typeof window.ParsleyConfig ? window.ParsleyConfig : {}, e, this.data()),
			u = null;
		return t(this).is("form") ? u = a(t(this), "parsleyForm") : t(this).is(o.inputs) && !t(this).is(o.excluded) && (u = a(t(this), t(this).is("input[type=radio], input[type=checkbox]") ? "parsleyFieldMultiple" : "parsleyField")), "function" == typeof r ? r() : u
	}, t.fn.parsley.Constructor = n, t.fn.parsley.defaults = {
		inputs: "input, textarea, select",
		excluded: "input[type=hidden], :disabled",
		trigger: !1,
		animate: !0,
		animateDuration: 300,
		focus: "first",
		validationMinlength: 3,
		successClass: "parsley-success",
		errorClass: "parsley-error",
		errorMessage: !1,
		validators: {},
		showErrors: !0,
		messages: {},
		validateIfUnchanged: !1,
		errors: {
			classHandler: function() {},
			container: function() {},
			errorsWrapper: "<ul></ul>",
			errorElem: "<li></li>"
		},
		listeners: {
			onFieldValidate: function() {
				return !1
			},
			onFormSubmit: function() {},
			onFieldError: function() {},
			onFieldSuccess: function() {}
		}
	}, t(window).on("load", function() {
		t('[data-validate="parsley"]').each(function() {
			t(this).parsley()
		})
	})
}(window.jQuery || window.Zepto);
!
function(t, e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : t.jQuery ? e(t.jQuery) : e(t.Zepto)
}(this, function(t, e) {
	t.fn.jPlayer = function(s) {
		var i = "jPlayer",
			a = "string" == typeof s,
			n = Array.prototype.slice.call(arguments, 1),
			o = this;
		return s = !a && n.length ? t.extend.apply(null, [!0, s].concat(n)) : s, a && "_" === s.charAt(0) ? o : (a ? this.each(function() {
			var a = t(this).data(i),
				r = a && t.isFunction(a[s]) ? a[s].apply(a, n) : a;
			return r !== a && r !== e ? (o = r, !1) : void 0
		}) : this.each(function() {
			var e = t(this).data(i);
			e ? e.option(s || {}) : t(this).data(i, new t.jPlayer(s, this))
		}), o)
	}, t.jPlayer = function(e, s) {
		if (arguments.length) {
			this.element = t(s), this.options = t.extend(!0, {}, this.options, e);
			var i = this;
			this.element.bind("remove.jPlayer", function() {
				i.destroy()
			}), this._init()
		}
	}, "function" != typeof t.fn.stop && (t.fn.stop = function() {}), t.jPlayer.emulateMethods = "load play pause", t.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate", t.jPlayer.emulateOptions = "muted volume", t.jPlayer.reservedEvent = "ready flashreset resize repeat error warning", t.jPlayer.event = {}, t.each(["ready", "flashreset", "resize", "repeat", "click", "error", "warning", "loadstart", "progress", "suspend", "abort", "emptied", "stalled", "play", "pause", "loadedmetadata", "loadeddata", "waiting", "playing", "canplay", "canplaythrough", "seeking", "seeked", "timeupdate", "ended", "ratechange", "durationchange", "volumechange"], function() {
		t.jPlayer.event[this] = "jPlayer_" + this
	}), t.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough"], t.jPlayer.pause = function() {
		t.each(t.jPlayer.prototype.instances, function(t, e) {
			e.data("jPlayer").status.srcSet && e.jPlayer("pause")
		})
	}, t.jPlayer.timeFormat = {
		showHour: !1,
		showMin: !0,
		showSec: !0,
		padHour: !1,
		padMin: !0,
		padSec: !0,
		sepHour: ":",
		sepMin: ":",
		sepSec: ""
	};
	var s = function() {
			this.init()
		};
	s.prototype = {
		init: function() {
			this.options = {
				timeFormat: t.jPlayer.timeFormat
			}
		},
		time: function(t) {
			t = t && "number" == typeof t ? t : 0;
			var e = new Date(1e3 * t),
				s = e.getUTCHours(),
				i = this.options.timeFormat.showHour ? e.getUTCMinutes() : e.getUTCMinutes() + 60 * s,
				a = this.options.timeFormat.showMin ? e.getUTCSeconds() : e.getUTCSeconds() + 60 * i,
				n = this.options.timeFormat.padHour && 10 > s ? "0" + s : s,
				o = this.options.timeFormat.padMin && 10 > i ? "0" + i : i,
				r = this.options.timeFormat.padSec && 10 > a ? "0" + a : a,
				l = "";
			return l += this.options.timeFormat.showHour ? n + this.options.timeFormat.sepHour : "", l += this.options.timeFormat.showMin ? o + this.options.timeFormat.sepMin : "", l += this.options.timeFormat.showSec ? r + this.options.timeFormat.sepSec : ""
		}
	};
	var i = new s;
	t.jPlayer.convertTime = function(t) {
		return i.time(t)
	}, t.jPlayer.uaBrowser = function(t) {
		var e = t.toLowerCase(),
			s = /(webkit)[ \/]([\w.]+)/,
			i = /(opera)(?:.*version)?[ \/]([\w.]+)/,
			a = /(msie) ([\w.]+)/,
			n = /(mozilla)(?:.*? rv:([\w.]+))?/,
			o = s.exec(e) || i.exec(e) || a.exec(e) || e.indexOf("compatible") < 0 && n.exec(e) || [];
		return {
			browser: o[1] || "",
			version: o[2] || "0"
		}
	}, t.jPlayer.uaPlatform = function(t) {
		var e = t.toLowerCase(),
			s = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/,
			i = /(ipad|playbook)/,
			a = /(android)/,
			n = /(mobile)/,
			o = s.exec(e) || [],
			r = i.exec(e) || !n.exec(e) && a.exec(e) || [];
		return o[1] && (o[1] = o[1].replace(/\s/g, "_")), {
			platform: o[1] || "",
			tablet: r[1] || ""
		}
	}, t.jPlayer.browser = {}, t.jPlayer.platform = {};
	var a = t.jPlayer.uaBrowser(navigator.userAgent);
	a.browser && (t.jPlayer.browser[a.browser] = !0, t.jPlayer.browser.version = a.version);
	var n = t.jPlayer.uaPlatform(navigator.userAgent);
	n.platform && (t.jPlayer.platform[n.platform] = !0, t.jPlayer.platform.mobile = !n.tablet, t.jPlayer.platform.tablet = !! n.tablet), t.jPlayer.getDocMode = function() {
		var e;
		return t.jPlayer.browser.msie && (document.documentMode ? e = document.documentMode : (e = 5, document.compatMode && "CSS1Compat" === document.compatMode && (e = 7))), e
	}, t.jPlayer.browser.documentMode = t.jPlayer.getDocMode(), t.jPlayer.nativeFeatures = {
		init: function() {
			var t, e, s, i = document,
				a = i.createElement("video"),
				n = {
					w3c: ["fullscreenEnabled", "fullscreenElement", "requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenerror"],
					moz: ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror"],
					webkit: ["", "webkitCurrentFullScreenElement", "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", ""],
					webkitVideo: ["webkitSupportsFullscreen", "webkitDisplayingFullscreen", "webkitEnterFullscreen", "webkitExitFullscreen", "", ""]
				},
				o = ["w3c", "moz", "webkit", "webkitVideo"];
			for (this.fullscreen = t = {
				support: {
					w3c: !! i[n.w3c[0]],
					moz: !! i[n.moz[0]],
					webkit: "function" == typeof i[n.webkit[3]],
					webkitVideo: "function" == typeof a[n.webkitVideo[2]]
				},
				used: {}
			}, e = 0, s = o.length; s > e; e++) {
				var r = o[e];
				if (t.support[r]) {
					t.spec = r, t.used[r] = !0;
					break
				}
			}
			if (t.spec) {
				var l = n[t.spec];
				t.api = {
					fullscreenEnabled: !0,
					fullscreenElement: function(t) {
						return t = t ? t : i, t[l[1]]
					},
					requestFullscreen: function(t) {
						return t[l[2]]()
					},
					exitFullscreen: function(t) {
						return t = t ? t : i, t[l[3]]()
					}
				}, t.event = {
					fullscreenchange: l[4],
					fullscreenerror: l[5]
				}
			} else t.api = {
				fullscreenEnabled: !1,
				fullscreenElement: function() {
					return null
				},
				requestFullscreen: function() {},
				exitFullscreen: function() {}
			}, t.event = {}
		}
	}, t.jPlayer.nativeFeatures.init(), t.jPlayer.focus = null, t.jPlayer.keyIgnoreElementNames = "INPUT TEXTAREA";
	var o = function(e) {
			var s, i = t.jPlayer.focus;
			i && (t.each(t.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(t, i) {
				return e.target.nodeName.toUpperCase() === i.toUpperCase() ? (s = !0, !1) : void 0
			}), s || t.each(i.options.keyBindings, function(s, a) {
				return a && e.which === a.key && t.isFunction(a.fn) ? (e.preventDefault(), a.fn(i), !1) : void 0
			}))
		};
	t.jPlayer.keys = function(e) {
		var s = "keydown.jPlayer";
		t(document.documentElement).unbind(s), e && t(document.documentElement).bind(s, o)
	}, t.jPlayer.keys(!0), t.jPlayer.prototype = {
		count: 0,
		version: {
			script: "2.5.4",
			needFlash: "2.5.2",
			flash: "unknown"
		},
		options: {
			swfPath: "js",
			solution: "html, flash",
			supplied: "mp3",
			preload: "metadata",
			volume: .8,
			muted: !1,
			playbackRate: 1,
			defaultPlaybackRate: 1,
			minPlaybackRate: .5,
			maxPlaybackRate: 4,
			wmode: "opaque",
			backgroundColor: "#000000",
			cssSelectorAncestor: "#jp_container_1",
			cssSelector: {
				videoPlay: ".jp-video-play",
				play: ".jp-play",
				pause: ".jp-pause",
				stop: ".jp-stop",
				seekBar: ".jp-seek-bar",
				playBar: ".jp-play-bar",
				mute: ".jp-mute",
				unmute: ".jp-unmute",
				volumeBar: ".jp-volume-bar",
				volumeBarValue: ".jp-volume-bar-value",
				volumeMax: ".jp-volume-max",
				playbackRateBar: ".jp-playback-rate-bar",
				playbackRateBarValue: ".jp-playback-rate-bar-value",
				currentTime: ".jp-current-time",
				duration: ".jp-duration",
				fullScreen: ".jp-full-screen",
				restoreScreen: ".jp-restore-screen",
				repeat: ".jp-repeat",
				repeatOff: ".jp-repeat-off",
				gui: ".jp-gui",
				noSolution: ".jp-no-solution"
			},
			smoothPlayBar: !1,
			fullScreen: !1,
			fullWindow: !1,
			autohide: {
				restored: !1,
				full: !0,
				fadeIn: 200,
				fadeOut: 600,
				hold: 1e3
			},
			loop: !1,
			repeat: function(e) {
				e.jPlayer.options.loop ? t(this).unbind(".jPlayerRepeat").bind(t.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
					t(this).jPlayer("play")
				}) : t(this).unbind(".jPlayerRepeat")
			},
			nativeVideoControls: {},
			noFullWindow: {
				msie: /msie [0-6]\./,
				ipad: /ipad.*?os [0-4]\./,
				iphone: /iphone/,
				ipod: /ipod/,
				android_pad: /android [0-3]\.(?!.*?mobile)/,
				android_phone: /android.*?mobile/,
				blackberry: /blackberry/,
				windows_ce: /windows ce/,
				iemobile: /iemobile/,
				webos: /webos/
			},
			noVolume: {
				ipad: /ipad/,
				iphone: /iphone/,
				ipod: /ipod/,
				android_pad: /android(?!.*?mobile)/,
				android_phone: /android.*?mobile/,
				blackberry: /blackberry/,
				windows_ce: /windows ce/,
				iemobile: /iemobile/,
				webos: /webos/,
				playbook: /playbook/
			},
			timeFormat: {},
			keyEnabled: !1,
			audioFullScreen: !1,
			keyBindings: {
				play: {
					key: 32,
					fn: function(t) {
						t.status.paused ? t.play() : t.pause()
					}
				},
				fullScreen: {
					key: 13,
					fn: function(t) {
						(t.status.video || t.options.audioFullScreen) && t._setOption("fullScreen", !t.options.fullScreen)
					}
				},
				muted: {
					key: 8,
					fn: function(t) {
						t._muted(!t.options.muted)
					}
				},
				volumeUp: {
					key: 38,
					fn: function(t) {
						t.volume(t.options.volume + .1)
					}
				},
				volumeDown: {
					key: 40,
					fn: function(t) {
						t.volume(t.options.volume - .1)
					}
				}
			},
			verticalVolume: !1,
			verticalPlaybackRate: !1,
			globalVolume: !1,
			idPrefix: "jp",
			noConflict: "jQuery",
			emulateHtml: !1,
			consoleAlerts: !0,
			errorAlerts: !1,
			warningAlerts: !1
		},
		optionsAudio: {
			size: {
				width: "0px",
				height: "0px",
				cssClass: ""
			},
			sizeFull: {
				width: "0px",
				height: "0px",
				cssClass: ""
			}
		},
		optionsVideo: {
			size: {
				width: "480px",
				height: "270px",
				cssClass: "jp-video-270p"
			},
			sizeFull: {
				width: "100%",
				height: "100%",
				cssClass: "jp-video-full"
			}
		},
		instances: {},
		status: {
			src: "",
			media: {},
			paused: !0,
			format: {},
			formatType: "",
			waitForPlay: !0,
			waitForLoad: !0,
			srcSet: !1,
			video: !1,
			seekPercent: 0,
			currentPercentRelative: 0,
			currentPercentAbsolute: 0,
			currentTime: 0,
			duration: 0,
			videoWidth: 0,
			videoHeight: 0,
			readyState: 0,
			networkState: 0,
			playbackRate: 1,
			ended: 0
		},
		internal: {
			ready: !1
		},
		solution: {
			html: !0,
			flash: !0
		},
		format: {
			mp3: {
				codec: 'audio/mpeg; codecs="mp3"',
				flashCanPlay: !0,
				media: "audio"
			},
			m4a: {
				codec: 'audio/mp4; codecs="mp4a.40.2"',
				flashCanPlay: !0,
				media: "audio"
			},
			m3u8a: {
				codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
				flashCanPlay: !1,
				media: "audio"
			},
			m3ua: {
				codec: "audio/mpegurl",
				flashCanPlay: !1,
				media: "audio"
			},
			oga: {
				codec: 'audio/ogg; codecs="vorbis, opus"',
				flashCanPlay: !1,
				media: "audio"
			},
			flac: {
				codec: "audio/x-flac",
				flashCanPlay: !1,
				media: "audio"
			},
			wav: {
				codec: 'audio/wav; codecs="1"',
				flashCanPlay: !1,
				media: "audio"
			},
			webma: {
				codec: 'audio/webm; codecs="vorbis"',
				flashCanPlay: !1,
				media: "audio"
			},
			fla: {
				codec: "audio/x-flv",
				flashCanPlay: !0,
				media: "audio"
			},
			rtmpa: {
				codec: 'audio/rtmp; codecs="rtmp"',
				flashCanPlay: !0,
				media: "audio"
			},
			m4v: {
				codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				flashCanPlay: !0,
				media: "video"
			},
			m3u8v: {
				codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
				flashCanPlay: !1,
				media: "video"
			},
			m3uv: {
				codec: "audio/mpegurl",
				flashCanPlay: !1,
				media: "video"
			},
			ogv: {
				codec: 'video/ogg; codecs="theora, vorbis"',
				flashCanPlay: !1,
				media: "video"
			},
			webmv: {
				codec: 'video/webm; codecs="vorbis, vp8"',
				flashCanPlay: !1,
				media: "video"
			},
			flv: {
				codec: "video/x-flv",
				flashCanPlay: !0,
				media: "video"
			},
			rtmpv: {
				codec: 'video/rtmp; codecs="rtmp"',
				flashCanPlay: !0,
				media: "video"
			}
		},
		_init: function() {
			var s = this;
			if (this.element.empty(), this.status = t.extend({}, this.status), this.internal = t.extend({}, this.internal), this.options.timeFormat = t.extend({}, t.jPlayer.timeFormat, this.options.timeFormat), this.internal.cmdsIgnored = t.jPlayer.platform.ipad || t.jPlayer.platform.iphone || t.jPlayer.platform.ipod, this.internal.domNode = this.element.get(0), this.options.keyEnabled && !t.jPlayer.focus && (t.jPlayer.focus = this), this.formats = [], this.solutions = [], this.require = {}, this.htmlElement = {}, this.html = {}, this.html.audio = {}, this.html.video = {}, this.flash = {}, this.css = {}, this.css.cs = {}, this.css.jq = {}, this.ancestorJq = [], this.options.volume = this._limitValue(this.options.volume, 0, 1), t.each(this.options.supplied.toLowerCase().split(","), function(e, i) {
				var a = i.replace(/^\s+|\s+$/g, "");
				if (s.format[a]) {
					var n = !1;
					t.each(s.formats, function(t, e) {
						return a === e ? (n = !0, !1) : void 0
					}), n || s.formats.push(a)
				}
			}), t.each(this.options.solution.toLowerCase().split(","), function(e, i) {
				var a = i.replace(/^\s+|\s+$/g, "");
				if (s.solution[a]) {
					var n = !1;
					t.each(s.solutions, function(t, e) {
						return a === e ? (n = !0, !1) : void 0
					}), n || s.solutions.push(a)
				}
			}), this.internal.instance = "jp_" + this.count, this.instances[this.internal.instance] = this.element, this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count), this.internal.self = t.extend({}, {
				id: this.element.attr("id"),
				jq: this.element
			}), this.internal.audio = t.extend({}, {
				id: this.options.idPrefix + "_audio_" + this.count,
				jq: e
			}), this.internal.video = t.extend({}, {
				id: this.options.idPrefix + "_video_" + this.count,
				jq: e
			}), this.internal.flash = t.extend({}, {
				id: this.options.idPrefix + "_flash_" + this.count,
				jq: e,
				swf: this.options.swfPath + (".swf" !== this.options.swfPath.toLowerCase().slice(-4) ? (this.options.swfPath && "/" !== this.options.swfPath.slice(-1) ? "/" : "") + "Jplayer.swf" : "")
			}), this.internal.poster = t.extend({}, {
				id: this.options.idPrefix + "_poster_" + this.count,
				jq: e
			}), t.each(t.jPlayer.event, function(t, i) {
				s.options[t] !== e && (s.element.bind(i + ".jPlayer", s.options[t]), s.options[t] = e)
			}), this.require.audio = !1, this.require.video = !1, t.each(this.formats, function(t, e) {
				s.require[s.format[e].media] = !0
			}), this.options = this.require.video ? t.extend(!0, {}, this.optionsVideo, this.options) : t.extend(!0, {}, this.optionsAudio, this.options), this._setSize(), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow), this.status.noVolume = this._uaBlocklist(this.options.noVolume), t.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled && this._fullscreenAddEventListeners(), this._restrictNativeVideoControls(), this.htmlElement.poster = document.createElement("img"), this.htmlElement.poster.id = this.internal.poster.id, this.htmlElement.poster.onload = function() {
				(!s.status.video || s.status.waitForPlay) && s.internal.poster.jq.show()
			}, this.element.append(this.htmlElement.poster), this.internal.poster.jq = t("#" + this.internal.poster.id), this.internal.poster.jq.css({
				width: this.status.width,
				height: this.status.height
			}), this.internal.poster.jq.hide(), this.internal.poster.jq.bind("click.jPlayer", function() {
				s._trigger(t.jPlayer.event.click)
			}), this.html.audio.available = !1, this.require.audio && (this.htmlElement.audio = document.createElement("audio"), this.htmlElement.audio.id = this.internal.audio.id, this.html.audio.available = !! this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio)), this.html.video.available = !1, this.require.video && (this.htmlElement.video = document.createElement("video"), this.htmlElement.video.id = this.internal.video.id, this.html.video.available = !! this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video)), this.flash.available = this._checkForFlash(10.1), this.html.canPlay = {}, this.flash.canPlay = {}, t.each(this.formats, function(t, e) {
				s.html.canPlay[e] = s.html[s.format[e].media].available && "" !== s.htmlElement[s.format[e].media].canPlayType(s.format[e].codec), s.flash.canPlay[e] = s.format[e].flashCanPlay && s.flash.available
			}), this.html.desired = !1, this.flash.desired = !1, t.each(this.solutions, function(e, i) {
				if (0 === e) s[i].desired = !0;
				else {
					var a = !1,
						n = !1;
					t.each(s.formats, function(t, e) {
						s[s.solutions[0]].canPlay[e] && ("video" === s.format[e].media ? n = !0 : a = !0)
					}), s[i].desired = s.require.audio && !a || s.require.video && !n
				}
			}), this.html.support = {}, this.flash.support = {}, t.each(this.formats, function(t, e) {
				s.html.support[e] = s.html.canPlay[e] && s.html.desired, s.flash.support[e] = s.flash.canPlay[e] && s.flash.desired
			}), this.html.used = !1, this.flash.used = !1, t.each(this.solutions, function(e, i) {
				t.each(s.formats, function(t, e) {
					return s[i].support[e] ? (s[i].used = !0, !1) : void 0
				})
			}), this._resetActive(), this._resetGate(), this._cssSelectorAncestor(this.options.cssSelectorAncestor), this.html.used || this.flash.used ? this.css.jq.noSolution.length && this.css.jq.noSolution.hide() : (this._error({
				type: t.jPlayer.error.NO_SOLUTION,
				context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
				message: t.jPlayer.errorMsg.NO_SOLUTION,
				hint: t.jPlayer.errorHint.NO_SOLUTION
			}), this.css.jq.noSolution.length && this.css.jq.noSolution.show()), this.flash.used) {
				var i, a = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
				if (t.jPlayer.browser.msie && (Number(t.jPlayer.browser.version) < 9 || t.jPlayer.browser.documentMode < 9)) {
					var n = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>',
						o = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + a + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
					i = document.createElement(n);
					for (var r = 0; r < o.length; r++) i.appendChild(document.createElement(o[r]))
				} else {
					var l = function(t, e, s) {
							var i = document.createElement("param");
							i.setAttribute("name", e), i.setAttribute("value", s), t.appendChild(i)
						};
					i = document.createElement("object"), i.setAttribute("id", this.internal.flash.id), i.setAttribute("name", this.internal.flash.id), i.setAttribute("data", this.internal.flash.swf), i.setAttribute("type", "application/x-shockwave-flash"), i.setAttribute("width", "1"), i.setAttribute("height", "1"), i.setAttribute("tabindex", "-1"), l(i, "flashvars", a), l(i, "allowscriptaccess", "always"), l(i, "bgcolor", this.options.backgroundColor), l(i, "wmode", this.options.wmode)
				}
				this.element.append(i), this.internal.flash.jq = t(i)
			}
			this.status.playbackRateEnabled = this.html.used && !this.flash.used ? this._testPlaybackRate("audio") : !1, this._updatePlaybackRate(), this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio), this.element.append(this.htmlElement.audio), this.internal.audio.jq = t("#" + this.internal.audio.id)), this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video), this.element.append(this.htmlElement.video), this.internal.video.jq = t("#" + this.internal.video.id), this.status.nativeVideoControls ? this.internal.video.jq.css({
				width: this.status.width,
				height: this.status.height
			}) : this.internal.video.jq.css({
				width: "0px",
				height: "0px"
			}), this.internal.video.jq.bind("click.jPlayer", function() {
				s._trigger(t.jPlayer.event.click)
			}))), this.options.emulateHtml && this._emulateHtmlBridge(), this.html.used && !this.flash.used && setTimeout(function() {
				s.internal.ready = !0, s.version.flash = "n/a", s._trigger(t.jPlayer.event.repeat), s._trigger(t.jPlayer.event.ready)
			}, 100), this._updateNativeVideoControls(), this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), t.jPlayer.prototype.count++
		},
		destroy: function() {
			this.clearMedia(), this._removeUiClass(), this.css.jq.currentTime.length && this.css.jq.currentTime.text(""), this.css.jq.duration.length && this.css.jq.duration.text(""), t.each(this.css.jq, function(t, e) {
				e.length && e.unbind(".jPlayer")
			}), this.internal.poster.jq.unbind(".jPlayer"), this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer"), this._fullscreenRemoveEventListeners(), this === t.jPlayer.focus && (t.jPlayer.focus = null), this.options.emulateHtml && this._destroyHtmlBridge(), this.element.removeData("jPlayer"), this.element.unbind(".jPlayer"), this.element.empty(), delete this.instances[this.internal.instance]
		},
		enable: function() {},
		disable: function() {},
		_testCanPlayType: function(t) {
			try {
				return t.canPlayType(this.format.mp3.codec), !0
			} catch (e) {
				return !1
			}
		},
		_testPlaybackRate: function(t) {
			var e, s = .5;
			t = "string" == typeof t ? t : "audio", e = document.createElement(t);
			try {
				return "playbackRate" in e ? (e.playbackRate = s, e.playbackRate === s) : !1
			} catch (i) {
				return !1
			}
		},
		_uaBlocklist: function(e) {
			var s = navigator.userAgent.toLowerCase(),
				i = !1;
			return t.each(e, function(t, e) {
				return e && e.test(s) ? (i = !0, !1) : void 0
			}), i
		},
		_restrictNativeVideoControls: function() {
			this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1, this.status.noFullWindow = !0)
		},
		_updateNativeVideoControls: function() {
			this.html.video.available && this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls, this._updateAutohide(), this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(), this.internal.video.jq.css({
				width: this.status.width,
				height: this.status.height
			})) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(), this.internal.video.jq.css({
				width: "0px",
				height: "0px"
			})))
		},
		_addHtmlEventListeners: function(e, s) {
			var i = this;
			e.preload = this.options.preload, e.muted = this.options.muted, e.volume = this.options.volume, this.status.playbackRateEnabled && (e.defaultPlaybackRate = this.options.defaultPlaybackRate, e.playbackRate = this.options.playbackRate), e.addEventListener("progress", function() {
				s.gate && (i.internal.cmdsIgnored && this.readyState > 0 && (i.internal.cmdsIgnored = !1), i._getHtmlStatus(e), i._updateInterface(), i._trigger(t.jPlayer.event.progress))
			}, !1), e.addEventListener("timeupdate", function() {
				s.gate && (i._getHtmlStatus(e), i._updateInterface(), i._trigger(t.jPlayer.event.timeupdate))
			}, !1), e.addEventListener("durationchange", function() {
				s.gate && (i._getHtmlStatus(e), i._updateInterface(), i._trigger(t.jPlayer.event.durationchange))
			}, !1), e.addEventListener("play", function() {
				s.gate && (i._updateButtons(!0), i._html_checkWaitForPlay(), i._trigger(t.jPlayer.event.play))
			}, !1), e.addEventListener("playing", function() {
				s.gate && (i._updateButtons(!0), i._seeked(), i._trigger(t.jPlayer.event.playing))
			}, !1), e.addEventListener("pause", function() {
				s.gate && (i._updateButtons(!1), i._trigger(t.jPlayer.event.pause))
			}, !1), e.addEventListener("waiting", function() {
				s.gate && (i._seeking(), i._trigger(t.jPlayer.event.waiting))
			}, !1), e.addEventListener("seeking", function() {
				s.gate && (i._seeking(), i._trigger(t.jPlayer.event.seeking))
			}, !1), e.addEventListener("seeked", function() {
				s.gate && (i._seeked(), i._trigger(t.jPlayer.event.seeked))
			}, !1), e.addEventListener("volumechange", function() {
				s.gate && (i.options.volume = e.volume, i.options.muted = e.muted, i._updateMute(), i._updateVolume(), i._trigger(t.jPlayer.event.volumechange))
			}, !1), e.addEventListener("ratechange", function() {
				s.gate && (i.options.defaultPlaybackRate = e.defaultPlaybackRate, i.options.playbackRate = e.playbackRate, i._updatePlaybackRate(), i._trigger(t.jPlayer.event.ratechange))
			}, !1), e.addEventListener("suspend", function() {
				s.gate && (i._seeked(), i._trigger(t.jPlayer.event.suspend))
			}, !1), e.addEventListener("ended", function() {
				s.gate && (t.jPlayer.browser.webkit || (i.htmlElement.media.currentTime = 0), i.htmlElement.media.pause(), i._updateButtons(!1), i._getHtmlStatus(e, !0), i._updateInterface(), i._trigger(t.jPlayer.event.ended))
			}, !1), e.addEventListener("error", function() {
				s.gate && (i._updateButtons(!1), i._seeked(), i.status.srcSet && (clearTimeout(i.internal.htmlDlyCmdId), i.status.waitForLoad = !0, i.status.waitForPlay = !0, i.status.video && !i.status.nativeVideoControls && i.internal.video.jq.css({
					width: "0px",
					height: "0px"
				}), i._validString(i.status.media.poster) && !i.status.nativeVideoControls && i.internal.poster.jq.show(), i.css.jq.videoPlay.length && i.css.jq.videoPlay.show(), i._error({
					type: t.jPlayer.error.URL,
					context: i.status.src,
					message: t.jPlayer.errorMsg.URL,
					hint: t.jPlayer.errorHint.URL
				})))
			}, !1), t.each(t.jPlayer.htmlEvent, function(a, n) {
				e.addEventListener(this, function() {
					s.gate && i._trigger(t.jPlayer.event[n])
				}, !1)
			})
		},
		_getHtmlStatus: function(t, e) {
			var s = 0,
				i = 0,
				a = 0,
				n = 0;
			isFinite(t.duration) && (this.status.duration = t.duration), s = t.currentTime, i = this.status.duration > 0 ? 100 * s / this.status.duration : 0, "object" == typeof t.seekable && t.seekable.length > 0 ? (a = this.status.duration > 0 ? 100 * t.seekable.end(t.seekable.length - 1) / this.status.duration : 100, n = this.status.duration > 0 ? 100 * t.currentTime / t.seekable.end(t.seekable.length - 1) : 0) : (a = 100, n = i), e && (s = 0, n = 0, i = 0), this.status.seekPercent = a, this.status.currentPercentRelative = n, this.status.currentPercentAbsolute = i, this.status.currentTime = s, this.status.videoWidth = t.videoWidth, this.status.videoHeight = t.videoHeight, this.status.readyState = t.readyState, this.status.networkState = t.networkState, this.status.playbackRate = t.playbackRate, this.status.ended = t.ended
		},
		_resetStatus: function() {
			this.status = t.extend({}, this.status, t.jPlayer.prototype.status)
		},
		_trigger: function(e, s, i) {
			var a = t.Event(e);
			a.jPlayer = {}, a.jPlayer.version = t.extend({}, this.version), a.jPlayer.options = t.extend(!0, {}, this.options), a.jPlayer.status = t.extend(!0, {}, this.status), a.jPlayer.html = t.extend(!0, {}, this.html), a.jPlayer.flash = t.extend(!0, {}, this.flash), s && (a.jPlayer.error = t.extend({}, s)), i && (a.jPlayer.warning = t.extend({}, i)), this.element.trigger(a)
		},
		jPlayerFlashEvent: function(e, s) {
			if (e === t.jPlayer.event.ready) if (this.internal.ready) {
				if (this.flash.gate) {
					if (this.status.srcSet) {
						var i = this.status.currentTime,
							a = this.status.paused;
						this.setMedia(this.status.media), this.volumeWorker(this.options.volume), i > 0 && (a ? this.pause(i) : this.play(i))
					}
					this._trigger(t.jPlayer.event.flashreset)
				}
			} else this.internal.ready = !0, this.internal.flash.jq.css({
				width: "0px",
				height: "0px"
			}), this.version.flash = s.version, this.version.needFlash !== this.version.flash && this._error({
				type: t.jPlayer.error.VERSION,
				context: this.version.flash,
				message: t.jPlayer.errorMsg.VERSION + this.version.flash,
				hint: t.jPlayer.errorHint.VERSION
			}), this._trigger(t.jPlayer.event.repeat), this._trigger(e);
			if (this.flash.gate) switch (e) {
			case t.jPlayer.event.progress:
				this._getFlashStatus(s), this._updateInterface(), this._trigger(e);
				break;
			case t.jPlayer.event.timeupdate:
				this._getFlashStatus(s), this._updateInterface(), this._trigger(e);
				break;
			case t.jPlayer.event.play:
				this._seeked(), this._updateButtons(!0), this._trigger(e);
				break;
			case t.jPlayer.event.pause:
				this._updateButtons(!1), this._trigger(e);
				break;
			case t.jPlayer.event.ended:
				this._updateButtons(!1), this._trigger(e);
				break;
			case t.jPlayer.event.click:
				this._trigger(e);
				break;
			case t.jPlayer.event.error:
				this.status.waitForLoad = !0, this.status.waitForPlay = !0, this.status.video && this.internal.flash.jq.css({
					width: "0px",
					height: "0px"
				}), this._validString(this.status.media.poster) && this.internal.poster.jq.show(), this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show(), this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media), this._updateButtons(!1), this._error({
					type: t.jPlayer.error.URL,
					context: s.src,
					message: t.jPlayer.errorMsg.URL,
					hint: t.jPlayer.errorHint.URL
				});
				break;
			case t.jPlayer.event.seeking:
				this._seeking(), this._trigger(e);
				break;
			case t.jPlayer.event.seeked:
				this._seeked(), this._trigger(e);
				break;
			case t.jPlayer.event.ready:
				break;
			default:
				this._trigger(e)
			}
			return !1
		},
		_getFlashStatus: function(t) {
			this.status.seekPercent = t.seekPercent, this.status.currentPercentRelative = t.currentPercentRelative, this.status.currentPercentAbsolute = t.currentPercentAbsolute, this.status.currentTime = t.currentTime, this.status.duration = t.duration, this.status.videoWidth = t.videoWidth, this.status.videoHeight = t.videoHeight, this.status.readyState = 4, this.status.networkState = 0, this.status.playbackRate = 1, this.status.ended = !1
		},
		_updateButtons: function(t) {
			t === e ? t = !this.status.paused : this.status.paused = !t, this.css.jq.play.length && this.css.jq.pause.length && (t ? (this.css.jq.play.hide(), this.css.jq.pause.show()) : (this.css.jq.play.show(), this.css.jq.pause.hide())), this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.hide()) : this.options.fullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(), this.css.jq.restoreScreen.hide())), this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(), this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(), this.css.jq.repeatOff.hide()))
		},
		_updateInterface: function() {
			this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%"), this.css.jq.playBar.length && (this.options.smoothPlayBar ? this.css.jq.playBar.stop().animate({
				width: this.status.currentPercentAbsolute + "%"
			}, 250, "linear") : this.css.jq.playBar.width(this.status.currentPercentRelative + "%")), this.css.jq.currentTime.length && this.css.jq.currentTime.text(this._convertTime(this.status.currentTime)), this.css.jq.duration.length && this.css.jq.duration.text(this._convertTime(this.status.duration))
		},
		_convertTime: s.prototype.time,
		_seeking: function() {
			this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg")
		},
		_seeked: function() {
			this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg")
		},
		_resetGate: function() {
			this.html.audio.gate = !1, this.html.video.gate = !1, this.flash.gate = !1
		},
		_resetActive: function() {
			this.html.active = !1, this.flash.active = !1
		},
		_escapeHtml: function(t) {
			return t.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")
		},
		_qualifyURL: function(t) {
			var e = document.createElement("div");
			return e.innerHTML = '<a href="' + this._escapeHtml(t) + '">x</a>', e.firstChild.href
		},
		_absoluteMediaUrls: function(e) {
			var s = this;
			return t.each(e, function(t, i) {
				i && s.format[t] && (e[t] = s._qualifyURL(i))
			}), e
		},
		setMedia: function(e) {
			var s = this,
				i = !1,
				a = this.status.media.poster !== e.poster;
			this._resetMedia(), this._resetGate(), this._resetActive(), e = this._absoluteMediaUrls(e), t.each(this.formats, function(a, n) {
				var o = "video" === s.format[n].media;
				return t.each(s.solutions, function(t, a) {
					if (s[a].support[n] && s._validString(e[n])) {
						var r = "html" === a;
						return o ? (r ? (s.html.video.gate = !0, s._html_setVideo(e), s.html.active = !0) : (s.flash.gate = !0, s._flash_setVideo(e), s.flash.active = !0), s.css.jq.videoPlay.length && s.css.jq.videoPlay.show(), s.status.video = !0) : (r ? (s.html.audio.gate = !0, s._html_setAudio(e), s.html.active = !0) : (s.flash.gate = !0, s._flash_setAudio(e), s.flash.active = !0), s.css.jq.videoPlay.length && s.css.jq.videoPlay.hide(), s.status.video = !1), i = !0, !1
					}
				}), i ? !1 : void 0
			}), i ? (this.status.nativeVideoControls && this.html.video.gate || this._validString(e.poster) && (a ? this.htmlElement.poster.src = e.poster : this.internal.poster.jq.show()), this.status.srcSet = !0, this.status.media = t.extend({}, e), this._updateButtons(!1), this._updateInterface()) : this._error({
				type: t.jPlayer.error.NO_SUPPORT,
				context: "{supplied:'" + this.options.supplied + "'}",
				message: t.jPlayer.errorMsg.NO_SUPPORT,
				hint: t.jPlayer.errorHint.NO_SUPPORT
			})
		},
		_resetMedia: function() {
			this._resetStatus(), this._updateButtons(!1), this._updateInterface(), this._seeked(), this.internal.poster.jq.hide(), clearTimeout(this.internal.htmlDlyCmdId), this.html.active ? this._html_resetMedia() : this.flash.active && this._flash_resetMedia()
		},
		clearMedia: function() {
			this._resetMedia(), this.html.active ? this._html_clearMedia() : this.flash.active && this._flash_clearMedia(), this._resetGate(), this._resetActive()
		},
		load: function() {
			this.status.srcSet ? this.html.active ? this._html_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
		},
		focus: function() {
			this.options.keyEnabled && (t.jPlayer.focus = this)
		},
		play: function(t) {
			t = "number" == typeof t ? t : 0 / 0, this.status.srcSet ? (this.focus(), this.html.active ? this._html_play(t) : this.flash.active && this._flash_play(t)) : this._urlNotSetError("play")
		},
		videoPlay: function() {
			this.play()
		},
		pause: function(t) {
			t = "number" == typeof t ? t : 0 / 0, this.status.srcSet ? this.html.active ? this._html_pause(t) : this.flash.active && this._flash_pause(t) : this._urlNotSetError("pause")
		},
		tellOthers: function(e, s) {
			var i = this,
				a = "function" == typeof s,
				n = Array.prototype.slice.call(arguments);
			"string" == typeof e && (a && n.splice(1, 1), t.each(this.instances, function() {
				i.element !== this && (!a || s.call(this.data("jPlayer"), i)) && this.jPlayer.apply(this, n)
			}))
		},
		pauseOthers: function(t) {
			this.tellOthers("pause", function() {
				return this.status.srcSet
			}, t)
		},
		stop: function() {
			this.status.srcSet ? this.html.active ? this._html_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
		},
		playHead: function(t) {
			t = this._limitValue(t, 0, 100), this.status.srcSet ? this.html.active ? this._html_playHead(t) : this.flash.active && this._flash_playHead(t) : this._urlNotSetError("playHead")
		},
		_muted: function(t) {
			this.mutedWorker(t), this.options.globalVolume && this.tellOthers("mutedWorker", function() {
				return this.options.globalVolume
			}, t)
		},
		mutedWorker: function(e) {
			this.options.muted = e, this.html.used && this._html_setProperty("muted", e), this.flash.used && this._flash_mute(e), this.html.video.gate || this.html.audio.gate || (this._updateMute(e), this._updateVolume(this.options.volume), this._trigger(t.jPlayer.event.volumechange))
		},
		mute: function(t) {
			t = t === e ? !0 : !! t, this._muted(t)
		},
		unmute: function(t) {
			t = t === e ? !0 : !! t, this._muted(!t)
		},
		_updateMute: function(t) {
			t === e && (t = this.options.muted), this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(), this.css.jq.unmute.hide()) : t ? (this.css.jq.mute.hide(), this.css.jq.unmute.show()) : (this.css.jq.mute.show(), this.css.jq.unmute.hide()))
		},
		volume: function(t) {
			this.volumeWorker(t), this.options.globalVolume && this.tellOthers("volumeWorker", function() {
				return this.options.globalVolume
			}, t)
		},
		volumeWorker: function(e) {
			e = this._limitValue(e, 0, 1), this.options.volume = e, this.html.used && this._html_setProperty("volume", e), this.flash.used && this._flash_volume(e), this.html.video.gate || this.html.audio.gate || (this._updateVolume(e), this._trigger(t.jPlayer.event.volumechange))
		},
		volumeBar: function(e) {
			if (this.css.jq.volumeBar.length) {
				var s = t(e.currentTarget),
					i = s.offset(),
					a = e.pageX - i.left,
					n = s.width(),
					o = s.height() - e.pageY + i.top,
					r = s.height();
				this.options.verticalVolume ? this.volume(o / r) : this.volume(a / n)
			}
			this.options.muted && this._muted(!1)
		},
		_updateVolume: function(t) {
			t === e && (t = this.options.volume), t = this.options.muted ? 0 : t, this.status.noVolume ? (this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(), this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(), this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(), this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(), this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](100 * t + "%")), this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
		},
		volumeMax: function() {
			this.volume(1), this.options.muted && this._muted(!1)
		},
		_cssSelectorAncestor: function(e) {
			var s = this;
			this.options.cssSelectorAncestor = e, this._removeUiClass(), this.ancestorJq = e ? t(e) : [], e && 1 !== this.ancestorJq.length && this._warning({
				type: t.jPlayer.warning.CSS_SELECTOR_COUNT,
				context: e,
				message: t.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
				hint: t.jPlayer.warningHint.CSS_SELECTOR_COUNT
			}), this._addUiClass(), t.each(this.options.cssSelector, function(t, e) {
				s._cssSelector(t, e)
			}), this._updateInterface(), this._updateButtons(), this._updateAutohide(), this._updateVolume(), this._updateMute()
		},
		_cssSelector: function(e, s) {
			var i = this;
			if ("string" == typeof s) if (t.jPlayer.prototype.options.cssSelector[e]) {
				if (this.css.jq[e] && this.css.jq[e].length && this.css.jq[e].unbind(".jPlayer"), this.options.cssSelector[e] = s, this.css.cs[e] = this.options.cssSelectorAncestor + " " + s, this.css.jq[e] = s ? t(this.css.cs[e]) : [], this.css.jq[e].length && this[e]) {
					var a = function(s) {
							s.preventDefault(), i[e](s), t(this).blur()
						};
					this.css.jq[e].bind("click.jPlayer", a)
				}
				s && 1 !== this.css.jq[e].length && this._warning({
					type: t.jPlayer.warning.CSS_SELECTOR_COUNT,
					context: this.css.cs[e],
					message: t.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[e].length + " found for " + e + " method.",
					hint: t.jPlayer.warningHint.CSS_SELECTOR_COUNT
				})
			} else this._warning({
				type: t.jPlayer.warning.CSS_SELECTOR_METHOD,
				context: e,
				message: t.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
				hint: t.jPlayer.warningHint.CSS_SELECTOR_METHOD
			});
			else this._warning({
				type: t.jPlayer.warning.CSS_SELECTOR_STRING,
				context: s,
				message: t.jPlayer.warningMsg.CSS_SELECTOR_STRING,
				hint: t.jPlayer.warningHint.CSS_SELECTOR_STRING
			})
		},
		seekBar: function(e) {
			if (this.css.jq.seekBar.length) {
				var s = t(e.currentTarget),
					i = s.offset(),
					a = e.pageX - i.left,
					n = s.width(),
					o = 100 * a / n;
				this.playHead(o)
			}
		},
		playbackRate: function(t) {
			this._setOption("playbackRate", t)
		},
		playbackRateBar: function(e) {
			if (this.css.jq.playbackRateBar.length) {
				var s, i, a = t(e.currentTarget),
					n = a.offset(),
					o = e.pageX - n.left,
					r = a.width(),
					l = a.height() - e.pageY + n.top,
					h = a.height();
				s = this.options.verticalPlaybackRate ? l / h : o / r, i = s * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate, this.playbackRate(i)
			}
		},
		_updatePlaybackRate: function() {
			var t = this.options.playbackRate,
				e = (t - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
			this.status.playbackRateEnabled ? (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.show(), this.css.jq.playbackRateBarValue.length && (this.css.jq.playbackRateBarValue.show(), this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"](100 * e + "%"))) : (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.hide(), this.css.jq.playbackRateBarValue.length && this.css.jq.playbackRateBarValue.hide())
		},
		repeat: function() {
			this._loop(!0)
		},
		repeatOff: function() {
			this._loop(!1)
		},
		_loop: function(e) {
			this.options.loop !== e && (this.options.loop = e, this._updateButtons(), this._trigger(t.jPlayer.event.repeat))
		},
		option: function(s, i) {
			var a = s;
			if (0 === arguments.length) return t.extend(!0, {}, this.options);
			if ("string" == typeof s) {
				var n = s.split(".");
				if (i === e) {
					for (var o = t.extend(!0, {}, this.options), r = 0; r < n.length; r++) {
						if (o[n[r]] === e) return this._warning({
							type: t.jPlayer.warning.OPTION_KEY,
							context: s,
							message: t.jPlayer.warningMsg.OPTION_KEY,
							hint: t.jPlayer.warningHint.OPTION_KEY
						}), e;
						o = o[n[r]]
					}
					return o
				}
				a = {};
				for (var l = a, h = 0; h < n.length; h++) h < n.length - 1 ? (l[n[h]] = {}, l = l[n[h]]) : l[n[h]] = i
			}
			return this._setOptions(a), this
		},
		_setOptions: function(e) {
			var s = this;
			return t.each(e, function(t, e) {
				s._setOption(t, e)
			}), this
		},
		_setOption: function(e, s) {
			var i = this;
			switch (e) {
			case "volume":
				this.volume(s);
				break;
			case "muted":
				this._muted(s);
				break;
			case "globalVolume":
				this.options[e] = s;
				break;
			case "cssSelectorAncestor":
				this._cssSelectorAncestor(s);
				break;
			case "cssSelector":
				t.each(s, function(t, e) {
					i._cssSelector(t, e)
				});
				break;
			case "playbackRate":
				this.options[e] = s = this._limitValue(s, this.options.minPlaybackRate, this.options.maxPlaybackRate), this.html.used && this._html_setProperty("playbackRate", s), this._updatePlaybackRate();
				break;
			case "defaultPlaybackRate":
				this.options[e] = s = this._limitValue(s, this.options.minPlaybackRate, this.options.maxPlaybackRate), this.html.used && this._html_setProperty("defaultPlaybackRate", s), this._updatePlaybackRate();
				break;
			case "minPlaybackRate":
				this.options[e] = s = this._limitValue(s, .1, this.options.maxPlaybackRate - .1), this._updatePlaybackRate();
				break;
			case "maxPlaybackRate":
				this.options[e] = s = this._limitValue(s, this.options.minPlaybackRate + .1, 16), this._updatePlaybackRate();
				break;
			case "fullScreen":
				if (this.options[e] !== s) {
					var a = t.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
					(!a || a && !this.status.waitForPlay) && (a || (this.options[e] = s), s ? this._requestFullscreen() : this._exitFullscreen(), a || this._setOption("fullWindow", s))
				}
				break;
			case "fullWindow":
				this.options[e] !== s && (this._removeUiClass(), this.options[e] = s, this._refreshSize());
				break;
			case "size":
				this.options.fullWindow || this.options[e].cssClass === s.cssClass || this._removeUiClass(), this.options[e] = t.extend({}, this.options[e], s), this._refreshSize();
				break;
			case "sizeFull":
				this.options.fullWindow && this.options[e].cssClass !== s.cssClass && this._removeUiClass(), this.options[e] = t.extend({}, this.options[e], s), this._refreshSize();
				break;
			case "autohide":
				this.options[e] = t.extend({}, this.options[e], s), this._updateAutohide();
				break;
			case "loop":
				this._loop(s);
				break;
			case "nativeVideoControls":
				this.options[e] = t.extend({}, this.options[e], s), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this._restrictNativeVideoControls(), this._updateNativeVideoControls();
				break;
			case "noFullWindow":
				this.options[e] = t.extend({}, this.options[e], s), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow), this._restrictNativeVideoControls(), this._updateButtons();
				break;
			case "noVolume":
				this.options[e] = t.extend({}, this.options[e], s), this.status.noVolume = this._uaBlocklist(this.options.noVolume), this._updateVolume(), this._updateMute();
				break;
			case "emulateHtml":
				this.options[e] !== s && (this.options[e] = s, s ? this._emulateHtmlBridge() : this._destroyHtmlBridge());
				break;
			case "timeFormat":
				this.options[e] = t.extend({}, this.options[e], s);
				break;
			case "keyEnabled":
				this.options[e] = s, s || this !== t.jPlayer.focus || (t.jPlayer.focus = null);
				break;
			case "keyBindings":
				this.options[e] = t.extend(!0, {}, this.options[e], s);
				break;
			case "audioFullScreen":
				this.options[e] = s
			}
			return this
		},
		_refreshSize: function() {
			this._setSize(), this._addUiClass(), this._updateSize(), this._updateButtons(), this._updateAutohide(), this._trigger(t.jPlayer.event.resize)
		},
		_setSize: function() {
			this.options.fullWindow ? (this.status.width = this.options.sizeFull.width, this.status.height = this.options.sizeFull.height, this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width, this.status.height = this.options.size.height, this.status.cssClass = this.options.size.cssClass), this.element.css({
				width: this.status.width,
				height: this.status.height
			})
		},
		_addUiClass: function() {
			this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
		},
		_removeUiClass: function() {
			this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
		},
		_updateSize: function() {
			this.internal.poster.jq.css({
				width: this.status.width,
				height: this.status.height
			}), !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({
				width: this.status.width,
				height: this.status.height
			}) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
				width: this.status.width,
				height: this.status.height
			})
		},
		_updateAutohide: function() {
			var t = this,
				e = "mousemove.jPlayer",
				s = ".jPlayerAutohide",
				i = e + s,
				a = function() {
					t.css.jq.gui.fadeIn(t.options.autohide.fadeIn, function() {
						clearTimeout(t.internal.autohideId), t.internal.autohideId = setTimeout(function() {
							t.css.jq.gui.fadeOut(t.options.autohide.fadeOut)
						}, t.options.autohide.hold)
					})
				};
			this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0), clearTimeout(this.internal.autohideId), this.element.unbind(s), this.css.jq.gui.unbind(s), this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored ? (this.element.bind(i, a), this.css.jq.gui.bind(i, a), this.css.jq.gui.hide()) : this.css.jq.gui.show())
		},
		fullScreen: function() {
			this._setOption("fullScreen", !0)
		},
		restoreScreen: function() {
			this._setOption("fullScreen", !1)
		},
		_fullscreenAddEventListeners: function() {
			var e = this,
				s = t.jPlayer.nativeFeatures.fullscreen;
			s.api.fullscreenEnabled && s.event.fullscreenchange && ("function" != typeof this.internal.fullscreenchangeHandler && (this.internal.fullscreenchangeHandler = function() {
				e._fullscreenchange()
			}), document.addEventListener(s.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1))
		},
		_fullscreenRemoveEventListeners: function() {
			var e = t.jPlayer.nativeFeatures.fullscreen;
			this.internal.fullscreenchangeHandler && document.addEventListener(e.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1)
		},
		_fullscreenchange: function() {
			this.options.fullScreen && !t.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement() && this._setOption("fullScreen", !1)
		},
		_requestFullscreen: function() {
			var e = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
				s = t.jPlayer.nativeFeatures.fullscreen;
			s.used.webkitVideo && (e = this.htmlElement.video), s.api.fullscreenEnabled && s.api.requestFullscreen(e)
		},
		_exitFullscreen: function() {
			var e, s = t.jPlayer.nativeFeatures.fullscreen;
			s.used.webkitVideo && (e = this.htmlElement.video), s.api.fullscreenEnabled && s.api.exitFullscreen(e)
		},
		_html_initMedia: function(e) {
			var s = t(this.htmlElement.media).empty();
			t.each(e.track || [], function(t, e) {
				var i = document.createElement("track");
				i.setAttribute("kind", e.kind ? e.kind : ""), i.setAttribute("src", e.src ? e.src : ""), i.setAttribute("srclang", e.srclang ? e.srclang : ""), i.setAttribute("label", e.label ? e.label : ""), e.def && i.setAttribute("default", e.def), s.append(i)
			}), this.htmlElement.media.src = this.status.src, "none" !== this.options.preload && this._html_load(), this._trigger(t.jPlayer.event.timeupdate)
		},
		_html_setFormat: function(e) {
			var s = this;
			t.each(this.formats, function(t, i) {
				return s.html.support[i] && e[i] ? (s.status.src = e[i], s.status.format[i] = !0, s.status.formatType = i, !1) : void 0
			})
		},
		_html_setAudio: function(t) {
			this._html_setFormat(t), this.htmlElement.media = this.htmlElement.audio, this._html_initMedia(t)
		},
		_html_setVideo: function(t) {
			this._html_setFormat(t), this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(t.poster) ? t.poster : ""), this.htmlElement.media = this.htmlElement.video, this._html_initMedia(t)
		},
		_html_resetMedia: function() {
			this.htmlElement.media && (this.htmlElement.media.id !== this.internal.video.id || this.status.nativeVideoControls || this.internal.video.jq.css({
				width: "0px",
				height: "0px"
			}), this.htmlElement.media.pause())
		},
		_html_clearMedia: function() {
			this.htmlElement.media && (this.htmlElement.media.src = "about:blank", this.htmlElement.media.load())
		},
		_html_load: function() {
			this.status.waitForLoad && (this.status.waitForLoad = !1, this.htmlElement.media.load()), clearTimeout(this.internal.htmlDlyCmdId)
		},
		_html_play: function(t) {
			var e = this,
				s = this.htmlElement.media;
			if (this._html_load(), isNaN(t)) s.play();
			else {
				this.internal.cmdsIgnored && s.play();
				try {
					if (s.seekable && !("object" == typeof s.seekable && s.seekable.length > 0)) throw 1;
					s.currentTime = t, s.play()
				} catch (i) {
					return this.internal.htmlDlyCmdId = setTimeout(function() {
						e.play(t)
					}, 250), void 0
				}
			}
			this._html_checkWaitForPlay()
		},
		_html_pause: function(t) {
			var e = this,
				s = this.htmlElement.media;
			if (t > 0 ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId), s.pause(), !isNaN(t)) try {
				if (s.seekable && !("object" == typeof s.seekable && s.seekable.length > 0)) throw 1;
				s.currentTime = t
			} catch (i) {
				return this.internal.htmlDlyCmdId = setTimeout(function() {
					e.pause(t)
				}, 250), void 0
			}
			t > 0 && this._html_checkWaitForPlay()
		},
		_html_playHead: function(t) {
			var e = this,
				s = this.htmlElement.media;
			this._html_load();
			try {
				if ("object" == typeof s.seekable && s.seekable.length > 0) s.currentTime = t * s.seekable.end(s.seekable.length - 1) / 100;
				else {
					if (!(s.duration > 0) || isNaN(s.duration)) throw "e";
					s.currentTime = t * s.duration / 100
				}
			} catch (i) {
				return this.internal.htmlDlyCmdId = setTimeout(function() {
					e.playHead(t)
				}, 250), void 0
			}
			this.status.waitForLoad || this._html_checkWaitForPlay()
		},
		_html_checkWaitForPlay: function() {
			this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.video.jq.css({
				width: this.status.width,
				height: this.status.height
			})))
		},
		_html_setProperty: function(t, e) {
			this.html.audio.available && (this.htmlElement.audio[t] = e), this.html.video.available && (this.htmlElement.video[t] = e)
		},
		_flash_setAudio: function(e) {
			var s = this;
			try {
				t.each(this.formats, function(t, i) {
					if (s.flash.support[i] && e[i]) {
						switch (i) {
						case "m4a":
						case "fla":
							s._getMovie().fl_setAudio_m4a(e[i]);
							break;
						case "mp3":
							s._getMovie().fl_setAudio_mp3(e[i]);
							break;
						case "rtmpa":
							s._getMovie().fl_setAudio_rtmp(e[i])
						}
						return s.status.src = e[i], s.status.format[i] = !0, s.status.formatType = i, !1
					}
				}), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
			} catch (i) {
				this._flashError(i)
			}
		},
		_flash_setVideo: function(e) {
			var s = this;
			try {
				t.each(this.formats, function(t, i) {
					if (s.flash.support[i] && e[i]) {
						switch (i) {
						case "m4v":
						case "flv":
							s._getMovie().fl_setVideo_m4v(e[i]);
							break;
						case "rtmpv":
							s._getMovie().fl_setVideo_rtmp(e[i])
						}
						return s.status.src = e[i], s.status.format[i] = !0, s.status.formatType = i, !1
					}
				}), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
			} catch (i) {
				this._flashError(i)
			}
		},
		_flash_resetMedia: function() {
			this.internal.flash.jq.css({
				width: "0px",
				height: "0px"
			}), this._flash_pause(0 / 0)
		},
		_flash_clearMedia: function() {
			try {
				this._getMovie().fl_clearMedia()
			} catch (t) {
				this._flashError(t)
			}
		},
		_flash_load: function() {
			try {
				this._getMovie().fl_load()
			} catch (t) {
				this._flashError(t)
			}
			this.status.waitForLoad = !1
		},
		_flash_play: function(t) {
			try {
				this._getMovie().fl_play(t)
			} catch (e) {
				this._flashError(e)
			}
			this.status.waitForLoad = !1, this._flash_checkWaitForPlay()
		},
		_flash_pause: function(t) {
			try {
				this._getMovie().fl_pause(t)
			} catch (e) {
				this._flashError(e)
			}
			t > 0 && (this.status.waitForLoad = !1, this._flash_checkWaitForPlay())
		},
		_flash_playHead: function(t) {
			try {
				this._getMovie().fl_play_head(t)
			} catch (e) {
				this._flashError(e)
			}
			this.status.waitForLoad || this._flash_checkWaitForPlay()
		},
		_flash_checkWaitForPlay: function() {
			this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.flash.jq.css({
				width: this.status.width,
				height: this.status.height
			})))
		},
		_flash_volume: function(t) {
			try {
				this._getMovie().fl_volume(t)
			} catch (e) {
				this._flashError(e)
			}
		},
		_flash_mute: function(t) {
			try {
				this._getMovie().fl_mute(t)
			} catch (e) {
				this._flashError(e)
			}
		},
		_getMovie: function() {
			return document[this.internal.flash.id]
		},
		_getFlashPluginVersion: function() {
			var t, e = 0;
			if (window.ActiveXObject) try {
				if (t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
					var s = t.GetVariable("$version");
					s && (s = s.split(" ")[1].split(","), e = parseInt(s[0], 10) + "." + parseInt(s[1], 10))
				}
			} catch (i) {} else navigator.plugins && navigator.mimeTypes.length > 0 && (t = navigator.plugins["Shockwave Flash"], t && (e = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1")));
			return 1 * e
		},
		_checkForFlash: function(t) {
			var e = !1;
			return this._getFlashPluginVersion() >= t && (e = !0), e
		},
		_validString: function(t) {
			return t && "string" == typeof t
		},
		_limitValue: function(t, e, s) {
			return e > t ? e : t > s ? s : t
		},
		_urlNotSetError: function(e) {
			this._error({
				type: t.jPlayer.error.URL_NOT_SET,
				context: e,
				message: t.jPlayer.errorMsg.URL_NOT_SET,
				hint: t.jPlayer.errorHint.URL_NOT_SET
			})
		},
		_flashError: function(e) {
			var s;
			s = this.internal.ready ? "FLASH_DISABLED" : "FLASH", this._error({
				type: t.jPlayer.error[s],
				context: this.internal.flash.swf,
				message: t.jPlayer.errorMsg[s] + e.message,
				hint: t.jPlayer.errorHint[s]
			}), this.internal.flash.jq.css({
				width: "1px",
				height: "1px"
			})
		},
		_error: function(e) {
			this._trigger(t.jPlayer.event.error, e), this.options.errorAlerts && this._alert("Error!" + (e.message ? "\n" + e.message : "") + (e.hint ? "\n" + e.hint : "") + "\nContext: " + e.context)
		},
		_warning: function(s) {
			this._trigger(t.jPlayer.event.warning, e, s), this.options.warningAlerts && this._alert("Warning!" + (s.message ? "\n" + s.message : "") + (s.hint ? "\n" + s.hint : "") + "\nContext: " + s.context)
		},
		_alert: function(t) {
			var e = "jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + t;
			this.options.consoleAlerts ? window.console && window.console.log && window.console.log(e) : alert(e)
		},
		_emulateHtmlBridge: function() {
			var e = this;
			t.each(t.jPlayer.emulateMethods.split(/\s+/g), function(t, s) {
				e.internal.domNode[s] = function(t) {
					e[s](t)
				}
			}), t.each(t.jPlayer.event, function(s, i) {
				var a = !0;
				t.each(t.jPlayer.reservedEvent.split(/\s+/g), function(t, e) {
					return e === s ? (a = !1, !1) : void 0
				}), a && e.element.bind(i + ".jPlayer.jPlayerHtml", function() {
					e._emulateHtmlUpdate();
					var t = document.createEvent("Event");
					t.initEvent(s, !1, !0), e.internal.domNode.dispatchEvent(t)
				})
			})
		},
		_emulateHtmlUpdate: function() {
			var e = this;
			t.each(t.jPlayer.emulateStatus.split(/\s+/g), function(t, s) {
				e.internal.domNode[s] = e.status[s]
			}), t.each(t.jPlayer.emulateOptions.split(/\s+/g), function(t, s) {
				e.internal.domNode[s] = e.options[s]
			})
		},
		_destroyHtmlBridge: function() {
			var e = this;
			this.element.unbind(".jPlayerHtml");
			var s = t.jPlayer.emulateMethods + " " + t.jPlayer.emulateStatus + " " + t.jPlayer.emulateOptions;
			t.each(s.split(/\s+/g), function(t, s) {
				delete e.internal.domNode[s]
			})
		}
	}, t.jPlayer.error = {
		FLASH: "e_flash",
		FLASH_DISABLED: "e_flash_disabled",
		NO_SOLUTION: "e_no_solution",
		NO_SUPPORT: "e_no_support",
		URL: "e_url",
		URL_NOT_SET: "e_url_not_set",
		VERSION: "e_version"
	}, t.jPlayer.errorMsg = {
		FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
		FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
		NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
		NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
		URL: "Media URL could not be loaded.",
		URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
		VERSION: "jPlayer " + t.jPlayer.prototype.version.script + " needs Jplayer.swf version " + t.jPlayer.prototype.version.needFlash + " but found "
	}, t.jPlayer.errorHint = {
		FLASH: "Check your swfPath option and that Jplayer.swf is there.",
		FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
		NO_SOLUTION: "Review the jPlayer options: support and supplied.",
		NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
		URL: "Check media URL is valid.",
		URL_NOT_SET: "Use setMedia() to set the media URL.",
		VERSION: "Update jPlayer files."
	}, t.jPlayer.warning = {
		CSS_SELECTOR_COUNT: "e_css_selector_count",
		CSS_SELECTOR_METHOD: "e_css_selector_method",
		CSS_SELECTOR_STRING: "e_css_selector_string",
		OPTION_KEY: "e_option_key"
	}, t.jPlayer.warningMsg = {
		CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
		CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
		CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
		OPTION_KEY: "The option requested in jPlayer('option') is undefined."
	}, t.jPlayer.warningHint = {
		CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
		CSS_SELECTOR_METHOD: "Check your method name.",
		CSS_SELECTOR_STRING: "Check your css selector is a string.",
		OPTION_KEY: "Check your option name."
	}
});
!
function(s, t) {
	jPlayerPlaylist = function(t, i, e) {
		var l = this;
		this.current = 0, this.loop = !1, this.shuffled = !1, this.removing = !1, this.cssSelector = s.extend({}, this._cssSelector, t), this.options = s.extend(!0, {
			keyBindings: {
				next: {
					key: 39,
					fn: function() {
						l.next()
					}
				},
				previous: {
					key: 37,
					fn: function() {
						l.previous()
					}
				}
			}
		}, this._options, e), this.playlist = [], this.original = [], this._initPlaylist(i), this.cssSelector.title = this.cssSelector.cssSelectorAncestor + " .jp-title", this.cssSelector.playlist = this.cssSelector.cssSelectorAncestor + " .jp-playlist", this.cssSelector.next = this.cssSelector.cssSelectorAncestor + " .jp-next", this.cssSelector.previous = this.cssSelector.cssSelectorAncestor + " .jp-previous", this.cssSelector.shuffle = this.cssSelector.cssSelectorAncestor + " .jp-shuffle", this.cssSelector.shuffleOff = this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off", this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor, this.options.repeat = function(s) {
			l.loop = s.jPlayer.options.loop
		}, s(this.cssSelector.jPlayer).bind(s.jPlayer.event.ready, function() {
			l._init()
		}), s(this.cssSelector.jPlayer).bind(s.jPlayer.event.ended, function() {
			l.next()
		}), s(this.cssSelector.jPlayer).bind(s.jPlayer.event.play, function() {
			s(this).jPlayer("pauseOthers")
		}), s(this.cssSelector.jPlayer).bind(s.jPlayer.event.resize, function(t) {
			t.jPlayer.options.fullScreen ? s(l.cssSelector.title).show() : s(l.cssSelector.title).hide()
		}), s(this.cssSelector.previous).click(function() {
			return l.previous(), s(this).blur(), !1
		}), s(this.cssSelector.next).click(function() {
			return l.next(), s(this).blur(), !1
		}), s(this.cssSelector.shuffle).click(function() {
			return l.shuffle(!0), !1
		}), s(this.cssSelector.shuffleOff).click(function() {
			return l.shuffle(!1), !1
		}).hide(), this.options.fullScreen || s(this.cssSelector.title).hide(), s(this.cssSelector.playlist + " ul").empty(), this._createItemHandlers(), s(this.cssSelector.jPlayer).jPlayer(this.options)
	}, jPlayerPlaylist.prototype = {
		_cssSelector: {
			jPlayer: "#jquery_jplayer_1",
			cssSelectorAncestor: "#jp_container_1"
		},
		_options: {
			playlistOptions: {
				autoPlay: !1,
				loopOnPrevious: !1,
				shuffleOnLoop: !0,
				enableRemoveControls: !1,
				displayTime: "slow",
				addTime: "fast",
				removeTime: "fast",
				shuffleTime: "slow",
				itemClass: "jp-playlist-item",
				freeGroupClass: "jp-free-media",
				freeItemClass: "jp-playlist-item-free",
				removeItemClass: "jp-playlist-item-remove"
			}
		},
		option: function(s, i) {
			if (i === t) return this.options.playlistOptions[s];
			switch (this.options.playlistOptions[s] = i, s) {
			case "enableRemoveControls":
				this._updateControls();
				break;
			case "itemClass":
			case "freeGroupClass":
			case "freeItemClass":
			case "removeItemClass":
				this._refresh(!0), this._createItemHandlers()
			}
			return this
		},
		_init: function() {
			var s = this;
			this._refresh(function() {
				s.options.playlistOptions.autoPlay ? s.play(s.current) : s.select(s.current)
			})
		},
		_initPlaylist: function(t) {
			this.current = 0, this.shuffled = !1, this.removing = !1, this.original = s.extend(!0, [], t), this._originalPlaylist()
		},
		_originalPlaylist: function() {
			var t = this;
			this.playlist = [], s.each(this.original, function(s) {
				t.playlist[s] = t.original[s]
			})
		},
		_refresh: function(t) {
			var i = this;
			if (t && !s.isFunction(t)) s(this.cssSelector.playlist + " ul").empty(), s.each(this.playlist, function(t) {
				s(i.cssSelector.playlist + " ul").append(i._createListItem(i.playlist[t]))
			}), this._updateControls();
			else {
				var e = s(this.cssSelector.playlist + " ul").children().length ? this.options.playlistOptions.displayTime : 0;
				s(this.cssSelector.playlist + " ul").slideUp(e, function() {
					var e = s(this);
					s(this).empty(), s.each(i.playlist, function(s) {
						e.append(i._createListItem(i.playlist[s]))
					}), i._updateControls(), s.isFunction(t) && t(), i.playlist.length ? s(this).slideDown(i.options.playlistOptions.displayTime) : s(this).show()
				})
			}
		},
		_createListItem: function(t) {
			var i = this,
				e = "<li><div>";
			if (e += "<a href='javascript:;' class='" + this.options.playlistOptions.removeItemClass + "'>&times;</a>", t.free) {
				var l = !0;
				e += "<span class='" + this.options.playlistOptions.freeGroupClass + "'>(", s.each(t, function(t, n) {
					s.jPlayer.prototype.format[t] && (l ? l = !1 : e += " | ", e += "<a class='" + i.options.playlistOptions.freeItemClass + "' href='" + n + "' tabindex='1'>" + t + "</a>")
				}), e += ")</span>"
			}
			return e += "<a href='javascript:;' class='" + this.options.playlistOptions.itemClass + "' tabindex='1'>" + t.title + (t.artist ? " <span class='jp-artist'>by " + t.artist + "</span>" : "") + "<span class='details'>" + (t.duration ? "<span class='jp-duration'>" + t.duration + "</span><span class='sprite-arrow-submit-button graphic'></span>" : "") + "</span></a>", e += "</div></li>"
		},
		_createItemHandlers: function() {
			var t = this;
			s(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemClass).on("click", "a." + this.options.playlistOptions.itemClass, function() {
				var i = s(this).parent().parent().index();
				return t.current !== i ? t.play(i) : s(t.cssSelector.jPlayer).jPlayer("play"), s(this).blur(), !1
			}), s(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.freeItemClass).on("click", "a." + this.options.playlistOptions.freeItemClass, function() {
				return s(this).parent().parent().find("." + t.options.playlistOptions.itemClass).click(), s(this).blur(), !1
			}), s(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.removeItemClass).on("click", "a." + this.options.playlistOptions.removeItemClass, function() {
				var i = s(this).parent().parent().index();
				return t.remove(i), s(this).blur(), !1
			})
		},
		_updateControls: function() {
			this.options.playlistOptions.enableRemoveControls ? s(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).show() : s(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).hide(), this.shuffled ? (s(this.cssSelector.shuffleOff).show(), s(this.cssSelector.shuffle).hide()) : (s(this.cssSelector.shuffleOff).hide(), s(this.cssSelector.shuffle).show())
		},
		_highlight: function(i) {
			this.playlist.length && i !== t && (s(this.cssSelector.playlist + " .jp-playlist-current").removeClass("jp-playlist-current"), s(this.cssSelector.playlist + " li:nth-child(" + (i + 1) + ")").addClass("jp-playlist-current").find(".jp-playlist-item").addClass("jp-playlist-current"), s(this.cssSelector.title + " li").html(this.playlist[i].title + (this.playlist[i].artist ? " <span class='jp-artist'>by " + this.playlist[i].artist + "</span>" : "")))
		},
		setPlaylist: function(s) {
			this._initPlaylist(s), this._init()
		},
		add: function(t, i) {
			s(this.cssSelector.playlist + " ul").append(this._createListItem(t)).find("li:last-child").hide().slideDown(this.options.playlistOptions.addTime), this._updateControls(), this.original.push(t), this.playlist.push(t), i ? this.play(this.playlist.length - 1) : 1 === this.original.length && this.select(0)
		},
		remove: function(i) {
			var e = this;
			return i === t ? (this._initPlaylist([]), this._refresh(function() {
				s(e.cssSelector.jPlayer).jPlayer("clearMedia")
			}), !0) : this.removing ? !1 : (i = 0 > i ? e.original.length + i : i, i >= 0 && i < this.playlist.length && (this.removing = !0, s(this.cssSelector.playlist + " li:nth-child(" + (i + 1) + ")").slideUp(this.options.playlistOptions.removeTime, function() {
				if (s(this).remove(), e.shuffled) {
					var t = e.playlist[i];
					s.each(e.original, function(s) {
						return e.original[s] === t ? (e.original.splice(s, 1), !1) : void 0
					}), e.playlist.splice(i, 1)
				} else e.original.splice(i, 1), e.playlist.splice(i, 1);
				e.original.length ? i === e.current ? (e.current = i < e.original.length ? e.current : e.original.length - 1, e.select(e.current)) : i < e.current && e.current-- : (s(e.cssSelector.jPlayer).jPlayer("clearMedia"), e.current = 0, e.shuffled = !1, e._updateControls()), e.removing = !1
			})), !0)
		},
		select: function(t) {
			t = 0 > t ? this.original.length + t : t, t >= 0 && t < this.playlist.length ? (this.current = t, this._highlight(t), s(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current])) : this.current = 0
		},
		play: function(i) {
			i = 0 > i ? this.original.length + i : i, i >= 0 && i < this.playlist.length ? this.playlist.length && (this.select(i), s(this.cssSelector.jPlayer).jPlayer("play")) : i === t && s(this.cssSelector.jPlayer).jPlayer("play")
		},
		pause: function() {
			s(this.cssSelector.jPlayer).jPlayer("pause")
		},
		next: function() {
			var s = this.current + 1 < this.playlist.length ? this.current + 1 : 0;
			this.loop ? 0 === s && this.shuffled && this.options.playlistOptions.shuffleOnLoop && this.playlist.length > 1 ? this.shuffle(!0, !0) : this.play(s) : s > 0 && this.play(s)
		},
		previous: function() {
			var s = this.current - 1 >= 0 ? this.current - 1 : this.playlist.length - 1;
			(this.loop && this.options.playlistOptions.loopOnPrevious || s < this.playlist.length - 1) && this.play(s)
		},
		shuffle: function(i, e) {
			var l = this;
			i === t && (i = !this.shuffled), (i || i !== this.shuffled) && s(this.cssSelector.playlist + " ul").slideUp(this.options.playlistOptions.shuffleTime, function() {
				l.shuffled = i, i ? l.playlist.sort(function() {
					return .5 - Math.random()
				}) : l._originalPlaylist(), l._refresh(!0), e || !s(l.cssSelector.jPlayer).data("jPlayer").status.paused ? l.play(0) : l.select(0), s(this).slideDown(l.options.playlistOptions.shuffleTime)
			})
		}
	}
}(jQuery);
!
function(e, t) {
	function n() {
		for (var e, t, n, i, r, o, a, s, l = _.errorInfo, c = _.plugins, u = 0; u < _.gallery.length; ++u) {
			switch (e = _.gallery[u], t = !1, n = null, e.player) {
			case "flv":
			case "swf":
				c.fla || (n = "fla");
				break;
			case "qt":
				c.qt || (n = "qt");
				break;
			case "wmp":
				_.isMac ? c.qt && c.f4m ? e.player = "qt" : n = "qtf4m" : c.wmp || (n = "wmp");
				break;
			case "qtwmp":
				c.qt ? e.player = "qt" : c.wmp ? e.player = "wmp" : n = "qtwmp"
			}
			if (n) if ("link" == _.options.handleUnsupported) {
				switch (n) {
				case "qtf4m":
					r = "shared", o = [l.qt.url, l.qt.name, l.f4m.url, l.f4m.name];
					break;
				case "qtwmp":
					r = "either", o = [l.qt.url, l.qt.name, l.wmp.url, l.wmp.name];
					break;
				default:
					r = "single", o = [l[n].url, l[n].name]
				}
				e.player = "html", e.content = '<div class="sb-message">' + f(_.lang.errors[r], o) + "</div>"
			} else t = !0;
			else "inline" == e.player ? (i = U.exec(e.content), i ? (a = h(i[1]), a ? e.content = a.innerHTML : t = !0) : t = !0) : ("swf" == e.player || "flv" == e.player) && (s = e.options && e.options.flashVersion || _.options.flashVersion, _.flash && !_.flash.hasFlashPlayerVersion(s) && (e.width = 310, e.height = 177));
			t && (_.gallery.splice(u, 1), u < _.current ? --_.current : u == _.current && (_.current = u > 0 ? u - 1 : u), --u)
		}
	}
	function i(e) {
		_.options.enableKeys && (e ? b : x)(document, "keydown", r)
	}
	function r(e) {
		if (!(e.metaKey || e.shiftKey || e.altKey || e.ctrlKey)) {
			var t, n = w(e);
			switch (n) {
			case 81:
			case 88:
			case 27:
				t = _.close;
				break;
			case 37:
				t = _.previous;
				break;
			case 39:
				t = _.next;
				break;
			case 32:
				t = "number" == typeof X ? _.pause : _.play
			}
			t && (g(e), t())
		}
	}
	function o(e) {
		i(!1);
		var t = _.getCurrent(),
			n = "inline" == t.player ? "html" : t.player;
		if ("function" != typeof _[n]) throw "unknown player " + n;
		if (e && (_.player.remove(), _.revertOptions(), _.applyOptions(t.options || {})), _.player = new _[n](t, _.playerId), _.gallery.length > 1) {
			var r = _.gallery[_.current + 1] || _.gallery[0];
			if ("img" == r.player) {
				var o = new Image;
				o.src = r.content
			}
			var s = _.gallery[_.current - 1] || _.gallery[_.gallery.length - 1];
			if ("img" == s.player) {
				var l = new Image;
				l.src = s.content
			}
		}
		_.skin.onLoad(e, a)
	}
	function a() {
		if (Z) if ("undefined" != typeof _.player.ready) var e = setInterval(function() {
			Z ? _.player.ready && (clearInterval(e), e = null, _.skin.onReady(s)) : (clearInterval(e), e = null)
		}, 10);
		else _.skin.onReady(s)
	}
	function s() {
		Z && (_.player.append(_.skin.body, _.dimensions), _.skin.onShow(l))
	}
	function l() {
		Z && (_.player.onLoad && _.player.onLoad(), _.options.onFinish(_.getCurrent()), _.isPaused() || _.play(), i(!0))
	}
	function c() {
		return (new Date).getTime()
	}
	function u(e, t) {
		for (var n in t) e[n] = t[n];
		return e
	}
	function d(e, t) {
		for (var n = 0, i = e.length, r = e[0]; i > n && t.call(r, n, r) !== !1; r = e[++n]);
	}
	function f(e, t) {
		return e.replace(/\{(\w+?)\}/g, function(e, n) {
			return t[n]
		})
	}
	function p() {}
	function h(e) {
		return document.getElementById(e)
	}
	function v(e) {
		e.parentNode.removeChild(e)
	}
	function m() {
		var e = document.body,
			t = document.createElement("div");
		it = "string" == typeof t.style.opacity, t.style.position = "fixed", t.style.margin = 0, t.style.top = "20px", e.appendChild(t, e.firstChild), rt = 20 == t.offsetTop, e.removeChild(t)
	}
	function y(e) {
		var t = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
			n = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
		return [t, n]
	}
	function g(e) {
		e.preventDefault()
	}
	function w(e) {
		return e.which ? e.which : e.keyCode
	}
	function b(t, n, i) {
		if (t.addEventListener) t.addEventListener(n, i, !1);
		else {
			if (3 === t.nodeType || 8 === t.nodeType) return;
			t.setInterval && t !== e && !t.frameElement && (t = e), i.__guid || (i.__guid = b.guid++), t.events || (t.events = {});
			var r = t.events[n];
			r || (r = t.events[n] = {}, t["on" + n] && (r[0] = t["on" + n])), r[i.__guid] = i, t["on" + n] = b.handleEvent
		}
	}
	function x(e, t, n) {
		e.removeEventListener ? e.removeEventListener(t, n, !1) : e.events && e.events[t] && delete e.events[t][n.__guid]
	}
	function C() {
		if (!at) {
			try {
				document.documentElement.doScroll("left")
			} catch (e) {
				return setTimeout(C, 1), void 0
			}
			_.load()
		}
	}
	function E() {
		if ("complete" === document.readyState) return _.load();
		if (document.addEventListener) document.addEventListener("DOMContentLoaded", ot, !1), e.addEventListener("load", _.load, !1);
		else if (document.attachEvent) {
			document.attachEvent("onreadystatechange", ot), e.attachEvent("onload", _.load);
			var t = !1;
			try {
				t = null === e.frameElement
			} catch (n) {}
			document.documentElement.doScroll && t && C()
		}
	}
	function T(e) {
		_.open(this), _.gallery.length && g(e)
	}
	function I() {
		ht = {
			x: 0,
			y: 0,
			startX: null,
			startY: null
		}
	}
	function k() {
		var e = _.dimensions;
		u(vt.style, {
			height: e.innerHeight + "px",
			width: e.innerWidth + "px"
		})
	}
	function S() {
		I();
		var e = ["position:absolute", "cursor:" + (_.isGecko ? "-moz-grab" : "move"), "background-color:" + (_.isIE ? "#fff;filter:alpha(opacity=0)" : "transparent")].join(";");
		_.appendHTML(_.skin.body, '<div id="' + yt + '" style="' + e + '"></div>'), vt = h(yt), k(), b(vt, "mousedown", A)
	}
	function O() {
		vt && (x(vt, "mousedown", A), v(vt), vt = null), mt = null
	}
	function A(e) {
		g(e);
		var t = y(e);
		ht.startX = t[0], ht.startY = t[1], mt = h(_.player.id), b(document, "mousemove", L), b(document, "mouseup", N), _.isGecko && (vt.style.cursor = "-moz-grabbing")
	}
	function L(e) {
		var t = _.player,
			n = _.dimensions,
			i = y(e),
			r = i[0] - ht.startX;
		ht.startX += r, ht.x = Math.max(Math.min(0, ht.x + r), n.innerWidth - t.width);
		var o = i[1] - ht.startY;
		ht.startY += o, ht.y = Math.max(Math.min(0, ht.y + o), n.innerHeight - t.height), u(mt.style, {
			left: ht.x + "px",
			top: ht.y + "px"
		})
	}
	function N() {
		x(document, "mousemove", L), x(document, "mouseup", N), _.isGecko && (vt.style.cursor = "-moz-grab")
	}
	function M(e, t, n, i, r) {
		var o = "opacity" == t,
			a = o ? _.setOpacity : function(e, n) {
				e.style[t] = "" + n + "px"
			};
		if (0 == i || !o && !_.options.animate || o && !_.options.animateFade) return a(e, n), r && r(), void 0;
		var s = parseFloat(_.getStyle(e, t)) || 0,
			l = n - s;
		if (0 == l) return r && r(), void 0;
		i *= 1e3;
		var u, d = c(),
			f = _.ease,
			p = d + i,
			h = setInterval(function() {
				u = c(), u >= p ? (clearInterval(h), h = null, a(e, n), r && r()) : a(e, s + f((u - d) / i) * l)
			}, 10)
	}
	function D() {
		xt.style.height = _.getWindowSize("Height") + "px", xt.style.width = _.getWindowSize("Width") + "px"
	}
	function F() {
		xt.style.top = document.documentElement.scrollTop + "px", xt.style.left = document.documentElement.scrollLeft + "px"
	}
	function j(e) {
		e ? d(It, function(e, t) {
			t[0].style.visibility = t[1] || ""
		}) : (It = [], d(_.options.troubleElements, function(e, t) {
			d(document.getElementsByTagName(t), function(e, t) {
				It.push([t, t.style.visibility]), t.style.visibility = "hidden"
			})
		}))
	}
	function H(e, t) {
		var n = h("sb-nav-" + e);
		n && (n.style.display = t ? "" : "none")
	}
	function P(e, t) {
		var n = h("sb-loading"),
			i = _.getCurrent().player,
			r = "img" == i || "html" == i;
		if (e) {
			_.setOpacity(n, 0), n.style.display = "block";
			var o = function() {
					_.clearOpacity(n), t && t()
				};
			r ? M(n, "opacity", 1, _.options.fadeDuration, o) : o()
		} else {
			var o = function() {
					n.style.display = "none", _.clearOpacity(n), t && t()
				};
			r ? M(n, "opacity", 0, _.options.fadeDuration, o) : o()
		}
	}
	function W(e) {
		var t = _.getCurrent();
		h("sb-title-inner").innerHTML = t.title || "";
		var n, i, r, o, a;
		if (_.options.displayNav) {
			n = !0;
			var s = _.gallery.length;
			s > 1 && (_.options.continuous ? i = a = !0 : (i = s - 1 > _.current, a = _.current > 0)), _.options.slideshowDelay > 0 && _.hasNext() && (o = !_.isPaused(), r = !o)
		} else n = i = r = o = a = !1;
		H("close", n), H("next", i), H("play", r), H("pause", o), H("previous", a);
		var l = "";
		if (_.options.displayCounter && _.gallery.length > 1) {
			var s = _.gallery.length;
			if ("skip" == _.options.counterType) {
				var c = 0,
					u = s,
					d = parseInt(_.options.counterLimit) || 0;
				if (s > d && d > 2) {
					var f = Math.floor(d / 2);
					c = _.current - f, 0 > c && (c += s), u = _.current + (d - f), u > s && (u -= s)
				}
				for (; c != u;) c == s && (c = 0), l += '<a onclick="Shadowbox.change(' + c + ');"', c == _.current && (l += ' class="sb-counter-current"'), l += ">" + ++c + "</a>"
			} else l = [_.current + 1, _.lang.of, s].join(" ")
		}
		h("sb-counter").innerHTML = l, e()
	}
	function B(e) {
		var t = h("sb-title-inner"),
			n = h("sb-info-inner"),
			i = .35;
		t.style.visibility = n.style.visibility = "", "" != t.innerHTML && M(t, "marginTop", 0, i), M(n, "marginTop", 0, i, e)
	}
	function z(e, t) {
		var n = h("sb-title"),
			i = h("sb-info"),
			r = n.offsetHeight,
			o = i.offsetHeight,
			a = h("sb-title-inner"),
			s = h("sb-info-inner"),
			l = e ? .35 : 0;
		M(a, "marginTop", r, l), M(s, "marginTop", -1 * o, l, function() {
			a.style.visibility = s.style.visibility = "hidden", t()
		})
	}
	function q(e, t, n, i) {
		var r = h("sb-wrapper-inner"),
			o = n ? _.options.resizeDuration : 0;
		M(Et, "top", t, o), M(r, "height", e, o, i)
	}
	function R(e, t, n, i) {
		var r = n ? _.options.resizeDuration : 0;
		M(Et, "left", t, r), M(Et, "width", e, r, i)
	}
	function V(e, t) {
		var n = h("sb-body-inner"),
			e = parseInt(e),
			t = parseInt(t),
			i = Et.offsetHeight - n.offsetHeight,
			r = Et.offsetWidth - n.offsetWidth,
			o = Ct.offsetHeight,
			a = Ct.offsetWidth,
			s = parseInt(_.options.viewportPadding) || 20,
			l = _.player && "drag" != _.options.handleOversize;
		return _.setDimensions(e, t, o, a, i, r, s, l)
	}
	var _ = {
		version: "3.0.3"
	},
		$ = navigator.userAgent.toLowerCase();
	$.indexOf("windows") > -1 || $.indexOf("win32") > -1 ? _.isWindows = !0 : $.indexOf("macintosh") > -1 || $.indexOf("mac os x") > -1 ? _.isMac = !0 : $.indexOf("linux") > -1 && (_.isLinux = !0), _.isIE = $.indexOf("msie") > -1, _.isIE6 = $.indexOf("msie 6") > -1, _.isIE7 = $.indexOf("msie 7") > -1, _.isGecko = $.indexOf("gecko") > -1 && -1 == $.indexOf("safari"), _.isWebKit = $.indexOf("applewebkit/") > -1;
	var G, X, U = /#(.+)$/,
		Y = /^(light|shadow)box\[(.*?)\]/i,
		K = /\s*([a-z_]*?)\s*=\s*(.+)\s*/,
		Q = /[0-9a-z]+$/i,
		J = /(.+\/)shadowbox\.js/i,
		Z = !1,
		et = !1,
		tt = {},
		nt = 0;
	_.current = -1, _.dimensions = null, _.ease = function(e) {
		return 1 + Math.pow(e - 1, 3)
	}, _.errorInfo = {
		fla: {
			name: "Flash",
			url: "http://www.adobe.com/products/flashplayer/"
		},
		qt: {
			name: "QuickTime",
			url: "http://www.apple.com/quicktime/download/"
		},
		wmp: {
			name: "Windows Media Player",
			url: "http://www.microsoft.com/windows/windowsmedia/"
		},
		f4m: {
			name: "Flip4Mac",
			url: "http://www.flip4mac.com/wmv_download.htm"
		}
	}, _.gallery = [], _.onReady = p, _.path = null, _.player = null, _.playerId = "sb-player", _.options = {
		animate: !0,
		animateFade: !0,
		autoplayMovies: !0,
		continuous: !1,
		enableKeys: !0,
		flashParams: {
			bgcolor: "#000000",
			allowfullscreen: !0
		},
		flashVars: {},
		flashVersion: "9.0.115",
		handleOversize: "resize",
		handleUnsupported: "link",
		onChange: p,
		onClose: p,
		onFinish: p,
		onOpen: p,
		showMovieControls: !0,
		skipSetup: !1,
		slideshowDelay: 0,
		viewportPadding: 20
	}, _.getCurrent = function() {
		return _.current > -1 ? _.gallery[_.current] : null
	}, _.hasNext = function() {
		return _.gallery.length > 1 && (_.current != _.gallery.length - 1 || _.options.continuous)
	}, _.isOpen = function() {
		return Z
	}, _.isPaused = function() {
		return "pause" == X
	}, _.applyOptions = function(e) {
		tt = u({}, _.options), u(_.options, e)
	}, _.revertOptions = function() {
		u(_.options, tt)
	}, _.init = function(e, t) {
		if (!et) {
			if (et = !0, _.skin.options && u(_.options, _.skin.options), e && u(_.options, e), !_.path) for (var n, i = document.getElementsByTagName("script"), r = 0, o = i.length; o > r; ++r) if (n = J.exec(i[r].src)) {
				_.path = n[1];
				break
			}
			t && (_.onReady = t), E()
		}
	}, _.open = function(e) {
		if (!Z) {
			var t = _.makeGallery(e);
			if (_.gallery = t[0], _.current = t[1], e = _.getCurrent(), null != e && (_.applyOptions(e.options || {}), n(), _.gallery.length)) {
				if (e = _.getCurrent(), _.options.onOpen(e) === !1) return;
				Z = !0, _.skin.onOpen(e, o)
			}
		}
	}, _.close = function() {
		Z && (Z = !1, _.player && (_.player.remove(), _.player = null), "number" == typeof X && (clearTimeout(X), X = null), nt = 0, i(!1), _.options.onClose(_.getCurrent()), _.skin.onClose(), _.revertOptions())
	}, _.play = function() {
		_.hasNext() && (nt || (nt = 1e3 * _.options.slideshowDelay), nt && (G = c(), X = setTimeout(function() {
			nt = G = 0, _.next()
		}, nt), _.skin.onPlay && _.skin.onPlay()))
	}, _.pause = function() {
		"number" == typeof X && (nt = Math.max(0, nt - (c() - G)), nt && (clearTimeout(X), X = "pause", _.skin.onPause && _.skin.onPause()))
	}, _.change = function(e) {
		if (!(e in _.gallery)) {
			if (!_.options.continuous) return;
			if (e = 0 > e ? _.gallery.length + e : 0, !(e in _.gallery)) return
		}
		_.current = e, "number" == typeof X && (clearTimeout(X), X = null, nt = G = 0), _.options.onChange(_.getCurrent()), o(!0)
	}, _.next = function() {
		_.change(_.current + 1)
	}, _.previous = function() {
		_.change(_.current - 1)
	}, _.setDimensions = function(e, t, n, i, r, o, a, s) {
		var l = e,
			c = t,
			u = 2 * a + r;
		e + u > n && (e = n - u);
		var d = 2 * a + o;
		t + d > i && (t = i - d);
		var f = (l - e) / l,
			p = (c - t) / c,
			h = f > 0 || p > 0;
		return s && h && (f > p ? t = Math.round(c / l * e) : p > f && (e = Math.round(l / c * t))), _.dimensions = {
			height: e + r,
			width: t + o,
			innerHeight: e,
			innerWidth: t,
			top: Math.floor((n - (e + u)) / 2 + a),
			left: Math.floor((i - (t + d)) / 2 + a),
			oversized: h
		}, _.dimensions
	}, _.makeGallery = function(e) {
		var t = [],
			n = -1;
		if ("string" == typeof e && (e = [e]), "number" == typeof e.length) d(e, function(e, n) {
			t[e] = n.content ? n : {
				content: n
			}
		}), n = 0;
		else {
			if (e.tagName) {
				var i = _.getCache(e);
				e = i ? i : _.makeObject(e)
			}
			if (e.gallery) {
				t = [];
				var r;
				for (var o in _.cache) r = _.cache[o], r.gallery && r.gallery == e.gallery && (-1 == n && r.content == e.content && (n = t.length), t.push(r)); - 1 == n && (t.unshift(e), n = 0)
			} else t = [e], n = 0
		}
		return d(t, function(e, n) {
			t[e] = u({}, n)
		}), [t, n]
	}, _.makeObject = function(e, t) {
		var n = {
			content: e.href,
			title: e.getAttribute("title") || "",
			link: e
		};
		t ? (t = u({}, t), d(["player", "title", "height", "width", "gallery"], function(e, i) {
			"undefined" != typeof t[i] && (n[i] = t[i], delete t[i])
		}), n.options = t) : n.options = {}, n.player || (n.player = _.getPlayer(n.content));
		var i = e.getAttribute("rel");
		if (i) {
			var r = i.match(Y);
			r && (n.gallery = escape(r[2])), d(i.split(";"), function(e, t) {
				r = t.match(K), r && (n[r[1]] = r[2])
			})
		}
		return n
	}, _.getPlayer = function(e) {
		if (e.indexOf("#") > -1 && 0 == e.indexOf(document.location.href)) return "inline";
		var t = e.indexOf("?");
		t > -1 && (e = e.substring(0, t));
		var n, i = e.match(Q);
		if (i && (n = i[0].toLowerCase()), n) {
			if (_.img && _.img.ext.indexOf(n) > -1) return "img";
			if (_.swf && _.swf.ext.indexOf(n) > -1) return "swf";
			if (_.flv && _.flv.ext.indexOf(n) > -1) return "flv";
			if (_.qt && _.qt.ext.indexOf(n) > -1) return _.wmp && _.wmp.ext.indexOf(n) > -1 ? "qtwmp" : "qt";
			if (_.wmp && _.wmp.ext.indexOf(n) > -1) return "wmp"
		}
		return "iframe"
	}, Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
		var n = this.length >>> 0;
		for (t = t || 0, 0 > t && (t += n); n > t; ++t) if (t in this && this[t] === e) return t;
		return -1
	});
	var it = !0,
		rt = !0;
	_.getStyle = function() {
		var e = /opacity=([^)]*)/,
			t = document.defaultView && document.defaultView.getComputedStyle;
		return function(n, i) {
			var r;
			if (!it && "opacity" == i && n.currentStyle) return r = e.test(n.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "", "" === r ? "1" : r;
			if (t) {
				var o = t(n, null);
				o && (r = o[i]), "opacity" == i && "" == r && (r = "1")
			} else r = n.currentStyle[i];
			return r
		}
	}(), _.appendHTML = function(e, t) {
		if (e.insertAdjacentHTML) e.insertAdjacentHTML("BeforeEnd", t);
		else if (e.lastChild) {
			var n = e.ownerDocument.createRange();
			n.setStartAfter(e.lastChild);
			var i = n.createContextualFragment(t);
			e.appendChild(i)
		} else e.innerHTML = t
	}, _.getWindowSize = function(e) {
		return "CSS1Compat" === document.compatMode ? document.documentElement["client" + e] : document.body["client" + e]
	}, _.setOpacity = function(e, t) {
		var n = e.style;
		it ? n.opacity = 1 == t ? "" : t : (n.zoom = 1, 1 == t ? "string" == typeof n.filter && /alpha/i.test(n.filter) && (n.filter = n.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi, "")) : n.filter = (n.filter || "").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi, "") + " alpha(opacity=" + 100 * t + ")")
	}, _.clearOpacity = function(e) {
		_.setOpacity(e, 1)
	}, b.guid = 1, b.handleEvent = function(t) {
		var n = !0;
		t = t || b.fixEvent(((this.ownerDocument || this.document || this).parentWindow || e).event);
		var i = this.events[t.type];
		for (var r in i) this.__handleEvent = i[r], this.__handleEvent(t) === !1 && (n = !1);
		return n
	}, b.preventDefault = function() {
		this.returnValue = !1
	}, b.stopPropagation = function() {
		this.cancelBubble = !0
	}, b.fixEvent = function(e) {
		return e.preventDefault = b.preventDefault, e.stopPropagation = b.stopPropagation, e
	};
	var ot, at = !1;
	if (document.addEventListener ? ot = function() {
		document.removeEventListener("DOMContentLoaded", ot, !1), _.load()
	} : document.attachEvent && (ot = function() {
		"complete" === document.readyState && (document.detachEvent("onreadystatechange", ot), _.load())
	}), _.load = function() {
		if (!at) {
			if (!document.body) return setTimeout(_.load, 13);
			at = !0, m(), _.onReady(), _.options.skipSetup || _.setup(), _.skin.init()
		}
	}, _.plugins = {}, navigator.plugins && navigator.plugins.length) {
		var st = [];
		d(navigator.plugins, function(e, t) {
			st.push(t.name)
		}), st = st.join(",");
		var lt = st.indexOf("Flip4Mac") > -1;
		_.plugins = {
			fla: st.indexOf("Shockwave Flash") > -1,
			qt: st.indexOf("QuickTime") > -1,
			wmp: !lt && st.indexOf("Windows Media") > -1,
			f4m: lt
		}
	} else {
		var ct = function(e) {
				var t;
				try {
					t = new ActiveXObject(e)
				} catch (n) {}
				return !!t
			};
		_.plugins = {
			fla: ct("ShockwaveFlash.ShockwaveFlash"),
			qt: ct("QuickTime.QuickTime"),
			wmp: ct("wmplayer.ocx"),
			f4m: !1
		}
	}
	var ut = /^(light|shadow)box/i,
		dt = "shadowboxCacheKey",
		ft = 1;
	_.cache = {}, _.select = function(e) {
		var t = [];
		if (e) {
			var n = e.length;
			if (n) if ("string" == typeof e) _.find && (t = _.find(e));
			else if (2 == n && "string" == typeof e[0] && e[1].nodeType) _.find && (t = _.find(e[0], e[1]));
			else for (var i = 0; n > i; ++i) t[i] = e[i];
			else t.push(e)
		} else {
			var r;
			d(document.getElementsByTagName("a"), function(e, n) {
				r = n.getAttribute("rel"), r && ut.test(r) && t.push(n)
			})
		}
		return t
	}, _.setup = function(e, t) {
		d(_.select(e), function(e, n) {
			_.addCache(n, t)
		})
	}, _.teardown = function(e) {
		d(_.select(e), function(e, t) {
			_.removeCache(t)
		})
	}, _.addCache = function(e, n) {
		var i = e[dt];
		i == t && (i = ft++, e[dt] = i, b(e, "click", T)), _.cache[i] = _.makeObject(e, n)
	}, _.removeCache = function(e) {
		x(e, "click", T), delete _.cache[e[dt]], e[dt] = null
	}, _.getCache = function(e) {
		var t = e[dt];
		return t in _.cache && _.cache[t]
	}, _.clearCache = function() {
		for (var e in _.cache) _.removeCache(_.cache[e].link);
		_.cache = {}
	}, _.find = function() {
		function e(t) {
			for (var n, i = "", r = 0; t[r]; r++) n = t[r], 3 === n.nodeType || 4 === n.nodeType ? i += n.nodeValue : 8 !== n.nodeType && (i += e(n.childNodes));
			return i
		}
		function n(e, t, n, i, r, o) {
			for (var a = 0, s = i.length; s > a; a++) {
				var l = i[a];
				if (l) {
					l = l[e];
					for (var c = !1; l;) {
						if (l.sizcache === n) {
							c = i[l.sizset];
							break
						}
						if (1 !== l.nodeType || o || (l.sizcache = n, l.sizset = a), l.nodeName.toLowerCase() === t) {
							c = l;
							break
						}
						l = l[e]
					}
					i[a] = c
				}
			}
		}
		function i(e, t, n, i, r, o) {
			for (var a = 0, s = i.length; s > a; a++) {
				var l = i[a];
				if (l) {
					l = l[e];
					for (var u = !1; l;) {
						if (l.sizcache === n) {
							u = i[l.sizset];
							break
						}
						if (1 === l.nodeType) if (o || (l.sizcache = n, l.sizset = a), "string" != typeof t) {
							if (l === t) {
								u = !0;
								break
							}
						} else if (c.filter(t, [l]).length > 0) {
							u = l;
							break
						}
						l = l[e]
					}
					i[a] = u
				}
			}
		}
		var r = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			o = 0,
			a = Object.prototype.toString,
			s = !1,
			l = !0;
		[0, 0].sort(function() {
			return l = !1, 0
		});
		var c = function(e, t, n, i) {
				n = n || [];
				var o = t = t || document;
				if (1 !== t.nodeType && 9 !== t.nodeType) return [];
				if (!e || "string" != typeof e) return n;
				for (var s, l, f, h, v = [], w = !0, b = y(t), x = e; null !== (r.exec(""), s = r.exec(x));) if (x = s[3], v.push(s[1]), s[2]) {
					h = s[3];
					break
				}
				if (v.length > 1 && d.exec(e)) if (2 === v.length && u.relative[v[0]]) l = g(v[0] + v[1], t);
				else for (l = u.relative[v[0]] ? [t] : c(v.shift(), t); v.length;) e = v.shift(), u.relative[e] && (e += v.shift()), l = g(e, l);
				else {
					if (!i && v.length > 1 && 9 === t.nodeType && !b && u.match.ID.test(v[0]) && !u.match.ID.test(v[v.length - 1])) {
						var C = c.find(v.shift(), t, b);
						t = C.expr ? c.filter(C.expr, C.set)[0] : C.set[0]
					}
					if (t) {
						var C = i ? {
							expr: v.pop(),
							set: p(i)
						} : c.find(v.pop(), 1 !== v.length || "~" !== v[0] && "+" !== v[0] || !t.parentNode ? t : t.parentNode, b);
						for (l = C.expr ? c.filter(C.expr, C.set) : C.set, v.length > 0 ? f = p(l) : w = !1; v.length;) {
							var E = v.pop(),
								T = E;
							u.relative[E] ? T = v.pop() : E = "", null == T && (T = t), u.relative[E](f, T, b)
						}
					} else f = v = []
				}
				if (f || (f = l), !f) throw "Syntax error, unrecognized expression: " + (E || e);
				if ("[object Array]" === a.call(f)) if (w) if (t && 1 === t.nodeType) for (var I = 0; null != f[I]; I++) f[I] && (f[I] === !0 || 1 === f[I].nodeType && m(t, f[I])) && n.push(l[I]);
				else for (var I = 0; null != f[I]; I++) f[I] && 1 === f[I].nodeType && n.push(l[I]);
				else n.push.apply(n, f);
				else p(f, n);
				return h && (c(h, o, n, i), c.uniqueSort(n)), n
			};
		c.uniqueSort = function(e) {
			if (v && (s = l, e.sort(v), s)) for (var t = 1; t < e.length; t++) e[t] === e[t - 1] && e.splice(t--, 1);
			return e
		}, c.matches = function(e, t) {
			return c(e, null, null, t)
		}, c.find = function(e, t, n) {
			var i, r;
			if (!e) return [];
			for (var o = 0, a = u.order.length; a > o; o++) {
				var r, s = u.order[o];
				if (r = u.leftMatch[s].exec(e)) {
					var l = r[1];
					if (r.splice(1, 1), "\\" !== l.substr(l.length - 1) && (r[1] = (r[1] || "").replace(/\\/g, ""), i = u.find[s](r, t, n), null != i)) {
						e = e.replace(u.match[s], "");
						break
					}
				}
			}
			return i || (i = t.getElementsByTagName("*")), {
				set: i,
				expr: e
			}
		}, c.filter = function(e, n, i, r) {
			for (var o, a, s = e, l = [], c = n, d = n && n[0] && y(n[0]); e && n.length;) {
				for (var f in u.filter) if (null != (o = u.match[f].exec(e))) {
					var p, h, v = u.filter[f];
					if (a = !1, c === l && (l = []), u.preFilter[f]) if (o = u.preFilter[f](o, c, i, l, r, d)) {
						if (o === !0) continue
					} else a = p = !0;
					if (o) for (var m = 0; null != (h = c[m]); m++) if (h) {
						p = v(h, o, m, c);
						var g = r ^ !! p;
						i && null != p ? g ? a = !0 : c[m] = !1 : g && (l.push(h), a = !0)
					}
					if (p !== t) {
						if (i || (c = l), e = e.replace(u.match[f], ""), !a) return [];
						break
					}
				}
				if (e === s) {
					if (null == a) throw "Syntax error, unrecognized expression: " + e;
					break
				}
				s = e
			}
			return c
		};
		var u = c.selectors = {
			order: ["ID", "NAME", "TAG"],
			match: {
				ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
				CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
				NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
				ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
				TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
				CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
				POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
				PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
			},
			leftMatch: {},
			attrMap: {
				"class": "className",
				"for": "htmlFor"
			},
			attrHandle: {
				href: function(e) {
					return e.getAttribute("href")
				}
			},
			relative: {
				"+": function(e, t) {
					var n = "string" == typeof t,
						i = n && !/\W/.test(t),
						r = n && !i;
					i && (t = t.toLowerCase());
					for (var o, a = 0, s = e.length; s > a; a++) if (o = e[a]) {
						for (;
						(o = o.previousSibling) && 1 !== o.nodeType;);
						e[a] = r || o && o.nodeName.toLowerCase() === t ? o || !1 : o === t
					}
					r && c.filter(t, e, !0)
				},
				">": function(e, t) {
					var n = "string" == typeof t;
					if (n && !/\W/.test(t)) {
						t = t.toLowerCase();
						for (var i = 0, r = e.length; r > i; i++) {
							var o = e[i];
							if (o) {
								var a = o.parentNode;
								e[i] = a.nodeName.toLowerCase() === t ? a : !1
							}
						}
					} else {
						for (var i = 0, r = e.length; r > i; i++) {
							var o = e[i];
							o && (e[i] = n ? o.parentNode : o.parentNode === t)
						}
						n && c.filter(t, e, !0)
					}
				},
				"": function(e, t, r) {
					var a = o++,
						s = i;
					if ("string" == typeof t && !/\W/.test(t)) {
						var l = t = t.toLowerCase();
						s = n
					}
					s("parentNode", t, a, e, l, r)
				},
				"~": function(e, t, r) {
					var a = o++,
						s = i;
					if ("string" == typeof t && !/\W/.test(t)) {
						var l = t = t.toLowerCase();
						s = n
					}
					s("previousSibling", t, a, e, l, r)
				}
			},
			find: {
				ID: function(e, t, n) {
					if ("undefined" != typeof t.getElementById && !n) {
						var i = t.getElementById(e[1]);
						return i ? [i] : []
					}
				},
				NAME: function(e, t) {
					if ("undefined" != typeof t.getElementsByName) {
						for (var n = [], i = t.getElementsByName(e[1]), r = 0, o = i.length; o > r; r++) i[r].getAttribute("name") === e[1] && n.push(i[r]);
						return 0 === n.length ? null : n
					}
				},
				TAG: function(e, t) {
					return t.getElementsByTagName(e[1])
				}
			},
			preFilter: {
				CLASS: function(e, t, n, i, r, o) {
					if (e = " " + e[1].replace(/\\/g, "") + " ", o) return e;
					for (var a, s = 0; null != (a = t[s]); s++) a && (r ^ (a.className && (" " + a.className + " ").replace(/[\t\n]/g, " ").indexOf(e) >= 0) ? n || i.push(a) : n && (t[s] = !1));
					return !1
				},
				ID: function(e) {
					return e[1].replace(/\\/g, "")
				},
				TAG: function(e) {
					return e[1].toLowerCase()
				},
				CHILD: function(e) {
					if ("nth" === e[1]) {
						var t = /(-?)(\d*)n((?:\+|-)?\d*)/.exec("even" === e[2] && "2n" || "odd" === e[2] && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
						e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
					}
					return e[0] = o++, e
				},
				ATTR: function(e, t, n, i, r, o) {
					var a = e[1].replace(/\\/g, "");
					return !o && u.attrMap[a] && (e[1] = u.attrMap[a]), "~=" === e[2] && (e[4] = " " + e[4] + " "), e
				},
				PSEUDO: function(e, t, n, i, o) {
					if ("not" === e[1]) {
						if (!((r.exec(e[3]) || "").length > 1 || /^\w/.test(e[3]))) {
							var a = c.filter(e[3], t, n, !0 ^ o);
							return n || i.push.apply(i, a), !1
						}
						e[3] = c(e[3], null, null, t)
					} else if (u.match.POS.test(e[0]) || u.match.CHILD.test(e[0])) return !0;
					return e
				},
				POS: function(e) {
					return e.unshift(!0), e
				}
			},
			filters: {
				enabled: function(e) {
					return e.disabled === !1 && "hidden" !== e.type
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					return e.checked === !0
				},
				selected: function(e) {
					return e.parentNode.selectedIndex, e.selected === !0
				},
				parent: function(e) {
					return !!e.firstChild
				},
				empty: function(e) {
					return !e.firstChild
				},
				has: function(e, t, n) {
					return !!c(n[3], e).length
				},
				header: function(e) {
					return /h\d/i.test(e.nodeName)
				},
				text: function(e) {
					return "text" === e.type
				},
				radio: function(e) {
					return "radio" === e.type
				},
				checkbox: function(e) {
					return "checkbox" === e.type
				},
				file: function(e) {
					return "file" === e.type
				},
				password: function(e) {
					return "password" === e.type
				},
				submit: function(e) {
					return "submit" === e.type
				},
				image: function(e) {
					return "image" === e.type
				},
				reset: function(e) {
					return "reset" === e.type
				},
				button: function(e) {
					return "button" === e.type || "button" === e.nodeName.toLowerCase()
				},
				input: function(e) {
					return /input|select|textarea|button/i.test(e.nodeName)
				}
			},
			setFilters: {
				first: function(e, t) {
					return 0 === t
				},
				last: function(e, t, n, i) {
					return t === i.length - 1
				},
				even: function(e, t) {
					return t % 2 === 0
				},
				odd: function(e, t) {
					return t % 2 === 1
				},
				lt: function(e, t, n) {
					return t < n[3] - 0
				},
				gt: function(e, t, n) {
					return t > n[3] - 0
				},
				nth: function(e, t, n) {
					return n[3] - 0 === t
				},
				eq: function(e, t, n) {
					return n[3] - 0 === t
				}
			},
			filter: {
				PSEUDO: function(t, n, i, r) {
					var o = n[1],
						a = u.filters[o];
					if (a) return a(t, i, n, r);
					if ("contains" === o) return (t.textContent || t.innerText || e([t]) || "").indexOf(n[3]) >= 0;
					if ("not" === o) {
						for (var s = n[3], i = 0, l = s.length; l > i; i++) if (s[i] === t) return !1;
						return !0
					}
					throw "Syntax error, unrecognized expression: " + o
				},
				CHILD: function(e, t) {
					var n = t[1],
						i = e;
					switch (n) {
					case "only":
					case "first":
						for (; i = i.previousSibling;) if (1 === i.nodeType) return !1;
						if ("first" === n) return !0;
						i = e;
					case "last":
						for (; i = i.nextSibling;) if (1 === i.nodeType) return !1;
						return !0;
					case "nth":
						var r = t[2],
							o = t[3];
						if (1 === r && 0 === o) return !0;
						var a = t[0],
							s = e.parentNode;
						if (s && (s.sizcache !== a || !e.nodeIndex)) {
							var l = 0;
							for (i = s.firstChild; i; i = i.nextSibling) 1 === i.nodeType && (i.nodeIndex = ++l);
							s.sizcache = a
						}
						var c = e.nodeIndex - o;
						return 0 === r ? 0 === c : c % r === 0 && c / r >= 0
					}
				},
				ID: function(e, t) {
					return 1 === e.nodeType && e.getAttribute("id") === t
				},
				TAG: function(e, t) {
					return "*" === t && 1 === e.nodeType || e.nodeName.toLowerCase() === t
				},
				CLASS: function(e, t) {
					return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
				},
				ATTR: function(e, t) {
					var n = t[1],
						i = u.attrHandle[n] ? u.attrHandle[n](e) : null != e[n] ? e[n] : e.getAttribute(n),
						r = i + "",
						o = t[2],
						a = t[4];
					return null == i ? "!=" === o : "=" === o ? r === a : "*=" === o ? r.indexOf(a) >= 0 : "~=" === o ? (" " + r + " ").indexOf(a) >= 0 : a ? "!=" === o ? r !== a : "^=" === o ? 0 === r.indexOf(a) : "$=" === o ? r.substr(r.length - a.length) === a : "|=" === o ? r === a || r.substr(0, a.length + 1) === a + "-" : !1 : r && i !== !1
				},
				POS: function(e, t, n, i) {
					var r = t[2],
						o = u.setFilters[r];
					return o ? o(e, n, t, i) : void 0
				}
			}
		},
			d = u.match.POS;
		for (var f in u.match) u.match[f] = new RegExp(u.match[f].source + /(?![^\[]*\])(?![^\(]*\))/.source), u.leftMatch[f] = new RegExp(/(^(?:.|\r|\n)*?)/.source + u.match[f].source);
		var p = function(e, t) {
				return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
			};
		try {
			Array.prototype.slice.call(document.documentElement.childNodes, 0)
		} catch (h) {
			p = function(e, t) {
				var n = t || [];
				if ("[object Array]" === a.call(e)) Array.prototype.push.apply(n, e);
				else if ("number" == typeof e.length) for (var i = 0, r = e.length; r > i; i++) n.push(e[i]);
				else for (var i = 0; e[i]; i++) n.push(e[i]);
				return n
			}
		}
		var v;
		document.documentElement.compareDocumentPosition ? v = function(e, t) {
			if (!e.compareDocumentPosition || !t.compareDocumentPosition) return e == t && (s = !0), e.compareDocumentPosition ? -1 : 1;
			var n = 4 & e.compareDocumentPosition(t) ? -1 : e === t ? 0 : 1;
			return 0 === n && (s = !0), n
		} : "sourceIndex" in document.documentElement ? v = function(e, t) {
			if (!e.sourceIndex || !t.sourceIndex) return e == t && (s = !0), e.sourceIndex ? -1 : 1;
			var n = e.sourceIndex - t.sourceIndex;
			return 0 === n && (s = !0), n
		} : document.createRange && (v = function(e, t) {
			if (!e.ownerDocument || !t.ownerDocument) return e == t && (s = !0), e.ownerDocument ? -1 : 1;
			var n = e.ownerDocument.createRange(),
				i = t.ownerDocument.createRange();
			n.setStart(e, 0), n.setEnd(e, 0), i.setStart(t, 0), i.setEnd(t, 0);
			var r = n.compareBoundaryPoints(Range.START_TO_END, i);
			return 0 === r && (s = !0), r
		}), function() {
			var e = document.createElement("div"),
				n = "script" + (new Date).getTime();
			e.innerHTML = "<a name='" + n + "'/>";
			var i = document.documentElement;
			i.insertBefore(e, i.firstChild), document.getElementById(n) && (u.find.ID = function(e, n, i) {
				if ("undefined" != typeof n.getElementById && !i) {
					var r = n.getElementById(e[1]);
					return r ? r.id === e[1] || "undefined" != typeof r.getAttributeNode && r.getAttributeNode("id").nodeValue === e[1] ? [r] : t : []
				}
			}, u.filter.ID = function(e, t) {
				var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
				return 1 === e.nodeType && n && n.nodeValue === t
			}), i.removeChild(e), i = e = null
		}(), function() {
			var e = document.createElement("div");
			e.appendChild(document.createComment("")), e.getElementsByTagName("*").length > 0 && (u.find.TAG = function(e, t) {
				var n = t.getElementsByTagName(e[1]);
				if ("*" === e[1]) {
					for (var i = [], r = 0; n[r]; r++) 1 === n[r].nodeType && i.push(n[r]);
					n = i
				}
				return n
			}), e.innerHTML = "<a href='#'></a>", e.firstChild && "undefined" != typeof e.firstChild.getAttribute && "#" !== e.firstChild.getAttribute("href") && (u.attrHandle.href = function(e) {
				return e.getAttribute("href", 2)
			}), e = null
		}(), document.querySelectorAll && !
		function() {
			var e = c,
				t = document.createElement("div");
			if (t.innerHTML = "<p class='TEST'></p>", !t.querySelectorAll || 0 !== t.querySelectorAll(".TEST").length) {
				c = function(t, n, i, r) {
					if (n = n || document, !r && 9 === n.nodeType && !y(n)) try {
						return p(n.querySelectorAll(t), i)
					} catch (o) {}
					return e(t, n, i, r)
				};
				for (var n in e) c[n] = e[n];
				t = null
			}
		}(), function() {
			var e = document.createElement("div");
			e.innerHTML = "<div class='test e'></div><div class='test'></div>", e.getElementsByClassName && 0 !== e.getElementsByClassName("e").length && (e.lastChild.className = "e", 1 !== e.getElementsByClassName("e").length && (u.order.splice(1, 0, "CLASS"), u.find.CLASS = function(e, t, n) {
				return "undefined" == typeof t.getElementsByClassName || n ? void 0 : t.getElementsByClassName(e[1])
			}, e = null))
		}();
		var m = document.compareDocumentPosition ?
		function(e, t) {
			return 16 & e.compareDocumentPosition(t)
		} : function(e, t) {
			return e !== t && (e.contains ? e.contains(t) : !0)
		}, y = function(e) {
			var t = (e ? e.ownerDocument || e : 0).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		}, g = function(e, t) {
			for (var n, i = [], r = "", o = t.nodeType ? [t] : t; n = u.match.PSEUDO.exec(e);) r += n[0], e = e.replace(u.match.PSEUDO, "");
			e = u.relative[e] ? e + "*" : e;
			for (var a = 0, s = o.length; s > a; a++) c(e, o[a], i);
			return c.filter(r, i)
		};
		return c
	}(), _.flash = function() {
		var n = function() {
				function i() {
					"complete" == E.readyState && (E.parentNode.removeChild(E), r())
				}
				function r() {
					if (!z) {
						if (R.ie && R.win) {
							var e = y("span");
							try {
								var t = N.getElementsByTagName("body")[0].appendChild(e);
								t.parentNode.removeChild(t)
							} catch (n) {
								return
							}
						}
						z = !0, P && (clearInterval(P), P = null);
						for (var i = D.length, r = 0; i > r; r++) D[r]()
					}
				}
				function o(e) {
					z ? e() : D[D.length] = e
				}
				function a(e) {
					if (typeof L.addEventListener != T) L.addEventListener("load", e, !1);
					else if (typeof N.addEventListener != T) N.addEventListener("load", e, !1);
					else if (typeof L.attachEvent != T) g(L, "onload", e);
					else if ("function" == typeof L.onload) {
						var t = L.onload;
						L.onload = function() {
							t(), e()
						}
					} else L.onload = e
				}
				function s() {
					for (var e = F.length, t = 0; e > t; t++) {
						var n = F[t].id;
						if (R.pv[0] > 0) {
							var i = m(n);
							i && (F[t].width = i.getAttribute("width") ? i.getAttribute("width") : "0", F[t].height = i.getAttribute("height") ? i.getAttribute("height") : "0", w(F[t].swfVersion) ? (R.webkit && R.webkit < 312 && l(i), x(n, !0)) : F[t].expressInstall && !q && w("6.0.65") && (R.win || R.mac) ? c(F[t]) : u(i))
						} else x(n, !0)
					}
				}
				function l(e) {
					var t = e.getElementsByTagName(I)[0];
					if (t) {
						var n = y("embed"),
							i = t.attributes;
						if (i) for (var r = i.length, o = 0; r > o; o++)"DATA" == i[o].nodeName ? n.setAttribute("src", i[o].nodeValue) : n.setAttribute(i[o].nodeName, i[o].nodeValue);
						var a = t.childNodes;
						if (a) for (var s = a.length, l = 0; s > l; l++) 1 == a[l].nodeType && "PARAM" == a[l].nodeName && n.setAttribute(a[l].getAttribute("name"), a[l].getAttribute("value"));
						e.parentNode.replaceChild(n, e)
					}
				}
				function c(e) {
					q = !0;
					var t = m(e.id);
					if (t) {
						if (e.altContentId) {
							var n = m(e.altContentId);
							n && (W = n, B = e.altContentId)
						} else W = d(t);
						!/%$/.test(e.width) && parseInt(e.width, 10) < 310 && (e.width = "310"), !/%$/.test(e.height) && parseInt(e.height, 10) < 137 && (e.height = "137"), N.title = N.title.slice(0, 47) + " - Flash Player Installation";
						var i = R.ie && R.win ? "ActiveX" : "PlugIn",
							r = N.title,
							o = "MMredirectURL=" + L.location + "&MMplayerType=" + i + "&MMdoctitle=" + r,
							a = e.id;
						if (R.ie && R.win && 4 != t.readyState) {
							var s = y("div");
							a += "SWFObjectNew", s.setAttribute("id", a), t.parentNode.insertBefore(s, t), t.style.display = "none";
							var l = function() {
									t.parentNode.removeChild(t)
								};
							g(L, "onload", l)
						}
						f({
							data: e.expressInstall,
							id: A,
							width: e.width,
							height: e.height
						}, {
							flashvars: o
						}, a)
					}
				}
				function u(e) {
					if (R.ie && R.win && 4 != e.readyState) {
						var t = y("div");
						e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(d(e), t), e.style.display = "none";
						var n = function() {
								e.parentNode.removeChild(e)
							};
						g(L, "onload", n)
					} else e.parentNode.replaceChild(d(e), e)
				}
				function d(e) {
					var t = y("div");
					if (R.win && R.ie) t.innerHTML = e.innerHTML;
					else {
						var n = e.getElementsByTagName(I)[0];
						if (n) {
							var i = n.childNodes;
							if (i) for (var r = i.length, o = 0; r > o; o++) 1 == i[o].nodeType && "PARAM" == i[o].nodeName || 8 == i[o].nodeType || t.appendChild(i[o].cloneNode(!0))
						}
					}
					return t
				}
				function f(e, t, n) {
					var i, r = m(n);
					if (r) if (typeof e.id == T && (e.id = n), R.ie && R.win) {
						var o = "";
						for (var a in e) e[a] != Object.prototype[a] && ("data" == a.toLowerCase() ? t.movie = e[a] : "styleclass" == a.toLowerCase() ? o += ' class="' + e[a] + '"' : "classid" != a.toLowerCase() && (o += " " + a + '="' + e[a] + '"'));
						var s = "";
						for (var l in t) t[l] != Object.prototype[l] && (s += '<param name="' + l + '" value="' + t[l] + '" />');
						r.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + o + ">" + s + "</object>", j[j.length] = e.id, i = m(e.id)
					} else if (R.webkit && R.webkit < 312) {
						var c = y("embed");
						c.setAttribute("type", O);
						for (var u in e) e[u] != Object.prototype[u] && ("data" == u.toLowerCase() ? c.setAttribute("src", e[u]) : "styleclass" == u.toLowerCase() ? c.setAttribute("class", e[u]) : "classid" != u.toLowerCase() && c.setAttribute(u, e[u]));
						for (var d in t) t[d] != Object.prototype[d] && "movie" != d.toLowerCase() && c.setAttribute(d, t[d]);
						r.parentNode.replaceChild(c, r), i = c
					} else {
						var f = y(I);
						f.setAttribute("type", O);
						for (var h in e) e[h] != Object.prototype[h] && ("styleclass" == h.toLowerCase() ? f.setAttribute("class", e[h]) : "classid" != h.toLowerCase() && f.setAttribute(h, e[h]));
						for (var v in t) t[v] != Object.prototype[v] && "movie" != v.toLowerCase() && p(f, v, t[v]);
						r.parentNode.replaceChild(f, r), i = f
					}
					return i
				}
				function p(e, t, n) {
					var i = y("param");
					i.setAttribute("name", t), i.setAttribute("value", n), e.appendChild(i)
				}
				function h(e) {
					var t = m(e);
					!t || "OBJECT" != t.nodeName && "EMBED" != t.nodeName || (R.ie && R.win ? 4 == t.readyState ? v(e) : L.attachEvent("onload", function() {
						v(e)
					}) : t.parentNode.removeChild(t))
				}
				function v(e) {
					var t = m(e);
					if (t) {
						for (var n in t)"function" == typeof t[n] && (t[n] = null);
						t.parentNode.removeChild(t)
					}
				}
				function m(e) {
					var t = null;
					try {
						t = N.getElementById(e)
					} catch (n) {}
					return t
				}
				function y(e) {
					return N.createElement(e)
				}
				function g(e, t, n) {
					e.attachEvent(t, n), H[H.length] = [e, t, n]
				}
				function w(e) {
					var t = R.pv,
						n = e.split(".");
					return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1
				}
				function b(e, t) {
					if (!R.ie || !R.mac) {
						var n = N.getElementsByTagName("head")[0],
							i = y("style");
						if (i.setAttribute("type", "text/css"), i.setAttribute("media", "screen"), R.ie && R.win || typeof N.createTextNode == T || i.appendChild(N.createTextNode(e + " {" + t + "}")), n.appendChild(i), R.ie && R.win && typeof N.styleSheets != T && N.styleSheets.length > 0) {
							var r = N.styleSheets[N.styleSheets.length - 1];
							typeof r.addRule == I && r.addRule(e, t)
						}
					}
				}
				function x(e, t) {
					var n = t ? "visible" : "hidden";
					z && m(e) ? m(e).style.visibility = n : b("#" + e, "visibility:" + n)
				}
				function C(e) {
					var t = /[\\\"<>\.;]/,
						n = null != t.exec(e);
					return n ? encodeURIComponent(e) : e
				} {
					var E, T = "undefined",
						I = "object",
						k = "Shockwave Flash",
						S = "ShockwaveFlash.ShockwaveFlash",
						O = "application/x-shockwave-flash",
						A = "SWFObjectExprInst",
						L = e,
						N = document,
						M = navigator,
						D = [],
						F = [],
						j = [],
						H = [],
						P = null,
						W = null,
						B = null,
						z = !1,
						q = !1,
						R = function() {
							var e = typeof N.getElementById != T && typeof N.getElementsByTagName != T && typeof N.createElement != T,
								t = [0, 0, 0],
								n = null;
							if (typeof M.plugins != T && typeof M.plugins[k] == I) n = M.plugins[k].description, !n || typeof M.mimeTypes != T && M.mimeTypes[O] && !M.mimeTypes[O].enabledPlugin || (n = n.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), t[0] = parseInt(n.replace(/^(.*)\..*$/, "$1"), 10), t[1] = parseInt(n.replace(/^.*\.(.*)\s.*$/, "$1"), 10), t[2] = /r/.test(n) ? parseInt(n.replace(/^.*r(.*)$/, "$1"), 10) : 0);
							else if (typeof L.ActiveXObject != T) {
								var i = null,
									r = !1;
								try {
									i = new ActiveXObject(S + ".7")
								} catch (o) {
									try {
										i = new ActiveXObject(S + ".6"), t = [6, 0, 21], i.AllowScriptAccess = "always"
									} catch (o) {
										6 == t[0] && (r = !0)
									}
									if (!r) try {
										i = new ActiveXObject(S)
									} catch (o) {}
								}
								if (!r && i) try {
									n = i.GetVariable("$version"), n && (n = n.split(" ")[1].split(","), t = [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)])
								} catch (o) {}
							}
							var a = M.userAgent.toLowerCase(),
								s = M.platform.toLowerCase(),
								l = /webkit/.test(a) ? parseFloat(a.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
								c = !1,
								u = s ? /win/.test(s) : /win/.test(a),
								d = s ? /mac/.test(s) : /mac/.test(a);
							return {
								w3cdom: e,
								pv: t,
								webkit: l,
								ie: c,
								win: u,
								mac: d
							}
						}();
					!
					function() {
						if (R.w3cdom) {
							if (o(s), R.ie && R.win) try {
								N.write("<script id=__ie_ondomload defer=true src=//:></script>"), E = m("__ie_ondomload"), E && g(E, "onreadystatechange", i)
							} catch (e) {}
							R.webkit && typeof N.readyState != T && (P = setInterval(function() {
								/loaded|complete/.test(N.readyState) && r()
							}, 10)), typeof N.addEventListener != T && N.addEventListener("DOMContentLoaded", r, null), a(r)
						}
					}(), function() {
						R.ie && R.win && e.attachEvent("onunload", function() {
							for (var e = H.length, t = 0; e > t; t++) H[t][0].detachEvent(H[t][1], H[t][2]);
							for (var i = j.length, r = 0; i > r; r++) h(j[r]);
							for (var o in R) R[o] = null;
							R = null;
							for (var a in n) n[a] = null;
							n = null
						})
					}()
				}
				return {
					registerObject: function(e, t, n) {
						if (R.w3cdom && e && t) {
							var i = {};
							i.id = e, i.swfVersion = t, i.expressInstall = n ? n : !1, F[F.length] = i, x(e, !1)
						}
					},
					getObjectById: function(e) {
						var t = null;
						if (R.w3cdom) {
							var n = m(e);
							if (n) {
								var i = n.getElementsByTagName(I)[0];
								!i || i && typeof n.SetVariable != T ? t = n : typeof i.SetVariable != T && (t = i)
							}
						}
						return t
					},
					embedSWF: function(e, t, n, i, r, a, s, l, u) {
						if (R.w3cdom && e && t && n && i && r) if (n += "", i += "", w(r)) {
							x(t, !1);
							var d = {};
							if (u && typeof u === I) for (var p in u) u[p] != Object.prototype[p] && (d[p] = u[p]);
							d.data = e, d.width = n, d.height = i;
							var h = {};
							if (l && typeof l === I) for (var v in l) l[v] != Object.prototype[v] && (h[v] = l[v]);
							if (s && typeof s === I) for (var m in s) s[m] != Object.prototype[m] && (typeof h.flashvars != T ? h.flashvars += "&" + m + "=" + s[m] : h.flashvars = m + "=" + s[m]);
							o(function() {
								f(d, h, t), d.id == t && x(t, !0)
							})
						} else a && !q && w("6.0.65") && (R.win || R.mac) && (q = !0, x(t, !1), o(function() {
							var e = {};
							e.id = e.altContentId = t, e.width = n, e.height = i, e.expressInstall = a, c(e)
						}))
					},
					getFlashPlayerVersion: function() {
						return {
							major: R.pv[0],
							minor: R.pv[1],
							release: R.pv[2]
						}
					},
					hasFlashPlayerVersion: w,
					createSWF: function(e, n, i) {
						return R.w3cdom ? f(e, n, i) : t
					},
					removeSWF: function(e) {
						R.w3cdom && h(e)
					},
					createCSS: function(e, t) {
						R.w3cdom && b(e, t)
					},
					addDomLoadEvent: o,
					addLoadEvent: a,
					getQueryParamValue: function(e) {
						var t = N.location.search || N.location.hash;
						if (null == e) return C(t);
						if (t) for (var n = t.substring(1).split("&"), i = 0; i < n.length; i++) if (n[i].substring(0, n[i].indexOf("=")) == e) return C(n[i].substring(n[i].indexOf("=") + 1));
						return ""
					},
					expressInstallCallback: function() {
						if (q && W) {
							var e = m(A);
							e && (e.parentNode.replaceChild(W, e), B && (x(B, !0), R.ie && R.win && (W.style.display = "block")), W = null, B = null, q = !1)
						}
					}
				}
			}();
		return n
	}(), _.lang = {
		code: "en",
		of: "of",
		loading: "loading",
		cancel: "Cancel",
		next: "Next",
		previous: "Previous",
		play: "Play",
		pause: "Pause",
		close: "Close",
		errors: {
			single: 'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',
			shared: 'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',
			either: 'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'
		}
	};
	var pt, ht, vt, mt, yt = "sb-drag-proxy";
	_.img = function(e, t) {
		this.obj = e, this.id = t, this.ready = !1;
		var n = this;
		pt = new Image, pt.onload = function() {
			n.height = e.height ? parseInt(e.height, 10) : pt.height, n.width = e.width ? parseInt(e.width, 10) : pt.width, n.ready = !0, pt.onload = null, pt = null
		}, pt.src = e.content
	}, _.img.ext = ["bmp", "gif", "jpg", "jpeg", "png"], _.img.prototype = {
		append: function(e, t) {
			var n = document.createElement("img");
			n.id = this.id, n.src = this.obj.content, n.style.position = "absolute";
			var i, r;
			t.oversized && "resize" == _.options.handleOversize ? (i = t.innerHeight, r = t.innerWidth) : (i = this.height, r = this.width), n.setAttribute("height", i), n.setAttribute("width", r), e.appendChild(n)
		},
		remove: function() {
			var e = h(this.id);
			e && v(e), O(), pt && (pt.onload = null, pt = null)
		},
		onLoad: function() {
			var e = _.dimensions;
			e.oversized && "drag" == _.options.handleOversize && S()
		},
		onWindowResize: function() {
			var e = _.dimensions;
			switch (_.options.handleOversize) {
			case "resize":
				var t = h(this.id);
				t.height = e.innerHeight, t.width = e.innerWidth;
				break;
			case "drag":
				if (mt) {
					var n = parseInt(_.getStyle(mt, "top")),
						i = parseInt(_.getStyle(mt, "left"));
					n + this.height < e.innerHeight && (mt.style.top = e.innerHeight - this.height + "px"), i + this.width < e.innerWidth && (mt.style.left = e.innerWidth - this.width + "px"), k()
				}
			}
		}
	}, _.iframe = function(e, t) {
		this.obj = e, this.id = t;
		var n = h("sb-overlay");
		this.height = e.height ? parseInt(e.height, 10) : n.offsetHeight, this.width = e.width ? parseInt(e.width, 10) : n.offsetWidth
	}, _.iframe.prototype = {
		append: function(e) {
			var t = '<iframe id="' + this.id + '" name="' + this.id + '" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" style="visibility:hidden" onload="this.style.visibility=\'visible\'" scrolling="auto"';
			_.isIE && (t += ' allowtransparency="true"', _.isIE6 && (t += " src=\"javascript:false;document.write('');\"")), t += "></iframe>", e.innerHTML = t
		},
		remove: function() {
			var t = h(this.id);
			t && (v(t), _.isGecko && delete e.frames[this.id])
		},
		onLoad: function() {
			var t = _.isIE ? h(this.id).contentWindow : e.frames[this.id];
			t.location.href = this.obj.content
		}
	}, _.html = function(e, t) {
		this.obj = e, this.id = t, this.height = e.height ? parseInt(e.height, 10) : 300, this.width = e.width ? parseInt(e.width, 10) : 500
	}, _.html.prototype = {
		append: function(e) {
			var t = document.createElement("div");
			t.id = this.id, t.className = "html", t.innerHTML = this.obj.content, e.appendChild(t)
		},
		remove: function() {
			var e = h(this.id);
			e && v(e)
		}
	}, _.swf = function(e, t) {
		this.obj = e, this.id = t, this.height = e.height ? parseInt(e.height, 10) : 300, this.width = e.width ? parseInt(e.width, 10) : 300
	}, _.swf.ext = ["swf"], _.swf.prototype = {
		append: function(e, t) {
			var n = document.createElement("div");
			n.id = this.id, e.appendChild(n);
			var i = t.innerHeight,
				r = t.innerWidth,
				o = this.obj.content,
				a = _.options.flashVersion,
				s = _.path + "expressInstall.swf",
				l = _.options.flashVars,
				c = _.options.flashParams;
			_.flash.embedSWF(o, this.id, r, i, a, s, l, c)
		},
		remove: function() {
			_.flash.expressInstallCallback(), _.flash.removeSWF(this.id)
		},
		onWindowResize: function() {
			var e = _.dimensions,
				t = h(this.id);
			t.height = e.innerHeight, t.width = e.innerWidth
		}
	};
	var gt = 20;
	_.flv = function(e, t) {
		this.obj = e, this.id = t, this.height = e.height ? parseInt(e.height, 10) : 300, _.options.showMovieControls && (this.height += gt), this.width = e.width ? parseInt(e.width, 10) : 300
	}, _.flv.ext = ["flv", "m4v"], _.flv.prototype = {
		append: function(e, t) {
			var n = document.createElement("div");
			n.id = this.id, e.appendChild(n);
			var i = t.innerHeight,
				r = t.innerWidth,
				o = _.path + "player.swf",
				a = _.options.flashVersion,
				s = _.path + "expressInstall.swf",
				l = u({
					file: this.obj.content,
					height: i,
					width: r,
					autostart: _.options.autoplayMovies ? "true" : "false",
					controlbar: _.options.showMovieControls ? "bottom" : "none",
					backcolor: "0x000000",
					frontcolor: "0xCCCCCC",
					lightcolor: "0x557722"
				}, _.options.flashVars),
				c = _.options.flashParams;
			_.flash.embedSWF(o, this.id, r, i, a, s, l, c)
		},
		remove: function() {
			_.flash.expressInstallCallback(), _.flash.removeSWF(this.id)
		},
		onWindowResize: function() {
			var e = _.dimensions,
				t = h(this.id);
			t.height = e.innerHeight, t.width = e.innerWidth
		}
	};
	var wt = 16;
	_.qt = function(e, t) {
		this.obj = e, this.id = t, this.height = e.height ? parseInt(e.height, 10) : 300, _.options.showMovieControls && (this.height += wt), this.width = e.width ? parseInt(e.width, 10) : 300
	}, _.qt.ext = ["dv", "mov", "moov", "movie", "mp4", "avi", "mpg", "mpeg"], _.qt.prototype = {
		append: function(e) {
			var t = _.options,
				n = String(t.autoplayMovies),
				i = String(t.showMovieControls),
				r = "<object",
				o = {
					id: this.id,
					name: this.id,
					height: this.height,
					width: this.width,
					kioskmode: "true"
				};
			_.isIE ? (o.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B", o.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0") : (o.type = "video/quicktime", o.data = this.obj.content);
			for (var a in o) r += " " + a + '="' + o[a] + '"';
			r += ">";
			var s = {
				src: this.obj.content,
				scale: "aspect",
				controller: i,
				autoplay: n
			};
			for (var l in s) r += '<param name="' + l + '" value="' + s[l] + '">';
			r += "</object>", e.innerHTML = r
		},
		remove: function() {
			try {
				document[this.id].Stop()
			} catch (e) {}
			var t = h(this.id);
			t && v(t)
		}
	};
	var bt = _.isIE ? 70 : 45;
	_.wmp = function(e, t) {
		this.obj = e, this.id = t, this.height = e.height ? parseInt(e.height, 10) : 300, _.options.showMovieControls && (this.height += bt), this.width = e.width ? parseInt(e.width, 10) : 300
	}, _.wmp.ext = ["asf", "avi", "mpg", "mpeg", "wm", "wmv"], _.wmp.prototype = {
		append: function(e) {
			var t = _.options,
				n = (t.autoplayMovies ? 1 : 0, '<object id="' + this.id + '" name="' + this.id + '" height="' + this.height + '" width="' + this.width + '"'),
				i = {
					autostart: t.autoplayMovies ? 1 : 0
				};
			_.isIE ? (n += ' classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"', i.url = this.obj.content, i.uimode = t.showMovieControls ? "full" : "none") : (n += ' type="video/x-ms-wmv"', n += ' data="' + this.obj.content + '"', i.showcontrols = t.showMovieControls ? 1 : 0), n += ">";
			for (var r in i) n += '<param name="' + r + '" value="' + i[r] + '">';
			n += "</object>", e.innerHTML = n
		},
		remove: function() {
			if (_.isIE) try {
				e[this.id].controls.stop(), e[this.id].URL = "movie" + c() + ".wmv", e[this.id] = function() {}
			} catch (t) {}
			var n = h(this.id);
			n && setTimeout(function() {
				v(n)
			}, 10)
		}
	};
	var xt, Ct, Et, Tt = !1,
		It = [],
		kt = ["sb-nav-close", "sb-nav-next", "sb-nav-play", "sb-nav-pause", "sb-nav-previous"],
		St = !0,
		Ot = {};
	Ot.markup = '<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div></div></div></div></div>', Ot.options = {
		animSequence: "sync",
		counterLimit: 10,
		counterType: "default",
		displayCounter: !0,
		displayNav: !0,
		fadeDuration: .35,
		initialHeight: 160,
		initialWidth: 320,
		modal: !1,
		overlayColor: "#000",
		overlayOpacity: .5,
		resizeDuration: .35,
		showOverlay: !0,
		troubleElements: ["select", "object", "embed", "canvas"]
	}, Ot.init = function() {
		if (_.appendHTML(document.body, f(Ot.markup, _.lang)), Ot.body = h("sb-body-inner"), xt = h("sb-container"), Ct = h("sb-overlay"), Et = h("sb-wrapper"), rt || (xt.style.position = "absolute"), !it) {
			var t, n, i = /url\("(.*\.png)"\)/;
			d(kt, function(e, r) {
				t = h(r), t && (n = _.getStyle(t, "backgroundImage").match(i), n && (t.style.backgroundImage = "none", t.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=" + n[1] + ",sizingMethod=scale);"))
			})
		}
		var r;
		b(e, "resize", function() {
			r && (clearTimeout(r), r = null), Z && (r = setTimeout(Ot.onWindowResize, 10))
		})
	}, Ot.onOpen = function(t, n) {
		St = !1, xt.style.display = "block", D();
		var i = V(_.options.initialHeight, _.options.initialWidth);
		q(i.innerHeight, i.top), R(i.width, i.left), _.options.showOverlay && (Ct.style.backgroundColor = _.options.overlayColor, _.setOpacity(Ct, 0), _.options.modal || b(Ct, "click", _.close), Tt = !0), rt || (F(), b(e, "scroll", F)), j(), xt.style.visibility = "visible", Tt ? M(Ct, "opacity", _.options.overlayOpacity, _.options.fadeDuration, n) : n()
	}, Ot.onLoad = function(e, t) {
		for (P(!0); Ot.body.firstChild;) v(Ot.body.firstChild);
		z(e, function() {
			Z && (e || (Et.style.visibility = "visible"), W(t))
		})
	}, Ot.onReady = function(e) {
		if (Z) {
			var t = _.player,
				n = V(t.height, t.width),
				i = function() {
					B(e)
				};
			switch (_.options.animSequence) {
			case "hw":
				q(n.innerHeight, n.top, !0, function() {
					R(n.width, n.left, !0, i)
				});
				break;
			case "wh":
				R(n.width, n.left, !0, function() {
					q(n.innerHeight, n.top, !0, i)
				});
				break;
			default:
				R(n.width, n.left, !0), q(n.innerHeight, n.top, !0, i)
			}
		}
	}, Ot.onShow = function(e) {
		P(!1, e), St = !0
	}, Ot.onClose = function() {
		rt || x(e, "scroll", F), x(Ct, "click", _.close), Et.style.visibility = "hidden";
		var t = function() {
				xt.style.visibility = "hidden", xt.style.display = "none", j(!0)
			};
		Tt ? M(Ct, "opacity", 0, _.options.fadeDuration, t) : t()
	}, Ot.onPlay = function() {
		H("play", !1), H("pause", !0)
	}, Ot.onPause = function() {
		H("pause", !1), H("play", !0)
	}, Ot.onWindowResize = function() {
		if (St) {
			D();
			var e = _.player,
				t = V(e.height, e.width);
			R(t.width, t.left), q(t.innerHeight, t.top), e.onWindowResize && e.onWindowResize()
		}
	}, _.skin = Ot, e.Shadowbox = _
}(window);
var BrowserDetect = {
	init: function() {
		this.browser = this.searchString(this.dataBrowser) || "Other", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown"
	},
	searchString: function(r) {
		for (var i = 0; i < r.length; i++) {
			var t = r[i].string;
			if (this.versionSearchString = r[i].subString, -1 != t.indexOf(r[i].subString)) return r[i].identity
		}
	},
	searchVersion: function(r) {
		var i = r.indexOf(this.versionSearchString);
		if (-1 != i) return parseFloat(r.substring(i + this.versionSearchString.length + 1))
	},
	dataBrowser: [{
		string: navigator.userAgent,
		subString: "Chrome",
		identity: "Chrome"
	}, {
		string: navigator.userAgent,
		subString: "MSIE",
		identity: "Explorer"
	}, {
		string: navigator.userAgent,
		subString: "Firefox",
		identity: "Firefox"
	}, {
		string: navigator.userAgent,
		subString: "Safari",
		identity: "Safari"
	}, {
		string: navigator.userAgent,
		subString: "Opera",
		identity: "Opera"
	}]
};
!
function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
}(function(e) {
	function n(e) {
		return u.raw ? e : encodeURIComponent(e)
	}
	function o(e) {
		return u.raw ? e : decodeURIComponent(e)
	}
	function i(e) {
		return n(u.json ? JSON.stringify(e) : String(e))
	}
	function r(e) {
		0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
		try {
			return e = decodeURIComponent(e.replace(c, " ")), u.json ? JSON.parse(e) : e
		} catch (n) {}
	}
	function t(n, o) {
		var i = u.raw ? n : r(n);
		return e.isFunction(o) ? o(i) : i
	}
	var c = /\+/g,
		u = e.cookie = function(r, c, a) {
			if (arguments.length > 1 && !e.isFunction(c)) {
				if (a = e.extend({}, u.defaults, a), "number" == typeof a.expires) {
					var f = a.expires,
						s = a.expires = new Date;
					s.setTime(+s + 864e5 * f)
				}
				return document.cookie = [n(r), "=", i(c), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
			}
			for (var d = r ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], m = 0, x = p.length; x > m; m++) {
				var l = p[m].split("="),
					g = o(l.shift()),
					k = l.join("=");
				if (r && r === g) {
					d = t(k, c);
					break
				}
				r || void 0 === (k = t(k)) || (d[g] = k)
			}
			return d
		};
	u.defaults = {}, e.removeCookie = function(n, o) {
		return void 0 === e.cookie(n) ? !1 : (e.cookie(n, "", e.extend({}, o, {
			expires: -1
		})), !e.cookie(n))
	}
});
!
function(e, t, i, o) {
	var n = e(t);
	e.fn.lazyload = function(r) {
		function f() {
			var t = 0;
			l.each(function() {
				var i = e(this);
				if (!h.skip_invisible || i.is(":visible")) if (e.abovethetop(this, h) || e.leftofbegin(this, h));
				else if (e.belowthefold(this, h) || e.rightoffold(this, h)) {
					if (++t > h.failure_limit) return !1
				} else i.trigger("appear"), t = 0
			})
		}
		var a, l = this,
			h = {
				threshold: 0,
				failure_limit: 0,
				event: "scroll",
				effect: "show",
				container: t,
				data_attribute: "original",
				skip_invisible: !0,
				appear: null,
				load: null,
				placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
			};
		return r && (o !== r.failurelimit && (r.failure_limit = r.failurelimit, delete r.failurelimit), o !== r.effectspeed && (r.effect_speed = r.effectspeed, delete r.effectspeed), e.extend(h, r)), a = h.container === o || h.container === t ? n : e(h.container), 0 === h.event.indexOf("scroll") && a.bind(h.event, function() {
			return f()
		}), this.each(function() {
			var t = this,
				i = e(t);
			t.loaded = !1, (i.attr("src") === o || i.attr("src") === !1) && i.is("img") && i.attr("src", h.placeholder), i.one("appear", function() {
				if (!this.loaded) {
					if (h.appear) {
						var o = l.length;
						h.appear.call(t, o, h)
					}
					e("<img />").bind("load", function() {
						var o = i.attr("data-" + h.data_attribute);
						i.hide(), i.is("img") ? i.attr("src", o) : i.css("background-image", "url('" + o + "')"), i[h.effect](h.effect_speed), t.loaded = !0;
						var n = e.grep(l, function(e) {
							return !e.loaded
						});
						if (l = e(n), h.load) {
							var r = l.length;
							h.load.call(t, r, h)
						}
					}).attr("src", i.attr("data-" + h.data_attribute))
				}
			}), 0 !== h.event.indexOf("scroll") && i.bind(h.event, function() {
				t.loaded || i.trigger("appear")
			})
		}), n.bind("resize", function() {
			f()
		}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && n.bind("pageshow", function(t) {
			t.originalEvent && t.originalEvent.persisted && l.each(function() {
				e(this).trigger("appear")
			})
		}), e(i).ready(function() {
			f()
		}), this
	}, e.belowthefold = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? (t.innerHeight ? t.innerHeight : n.height()) + n.scrollTop() : e(r.container).offset().top + e(r.container).height(), f <= e(i).offset().top - r.threshold
	}, e.rightoffold = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? n.width() + n.scrollLeft() : e(r.container).offset().left + e(r.container).width(), f <= e(i).offset().left - r.threshold
	}, e.abovethetop = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? n.scrollTop() : e(r.container).offset().top, f >= e(i).offset().top + r.threshold + e(i).height()
	}, e.leftofbegin = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? n.scrollLeft() : e(r.container).offset().left, f >= e(i).offset().left + r.threshold + e(i).width()
	}, e.inviewport = function(t, i) {
		return !(e.rightoffold(t, i) || e.leftofbegin(t, i) || e.belowthefold(t, i) || e.abovethetop(t, i))
	}, e.extend(e.expr[":"], {
		"below-the-fold": function(t) {
			return e.belowthefold(t, {
				threshold: 0
			})
		},
		"above-the-top": function(t) {
			return !e.belowthefold(t, {
				threshold: 0
			})
		},
		"right-of-screen": function(t) {
			return e.rightoffold(t, {
				threshold: 0
			})
		},
		"left-of-screen": function(t) {
			return !e.rightoffold(t, {
				threshold: 0
			})
		},
		"in-viewport": function(t) {
			return e.inviewport(t, {
				threshold: 0
			})
		},
		"above-the-fold": function(t) {
			return !e.belowthefold(t, {
				threshold: 0
			})
		},
		"right-of-fold": function(t) {
			return e.rightoffold(t, {
				threshold: 0
			})
		},
		"left-of-fold": function(t) {
			return !e.rightoffold(t, {
				threshold: 0
			})
		}
	})
}(jQuery, window, document);
//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a) {
	function b(a, b, c) {
		switch (arguments.length) {
		case 2:
			return null != a ? a : b;
		case 3:
			return null != a ? a : null != b ? b : c;
		default:
			throw new Error("Implement me")
		}
	}
	function c(a, b) {
		return Bb.call(a, b)
	}
	function d() {
		return {
			empty: !1,
			unusedTokens: [],
			unusedInput: [],
			overflow: -2,
			charsLeftOver: 0,
			nullInput: !1,
			invalidMonth: null,
			invalidFormat: !1,
			userInvalidated: !1,
			iso: !1
		}
	}
	function e(a) {
		vb.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
	}
	function f(a, b) {
		var c = !0;
		return o(function() {
			return c && (e(a), c = !1), b.apply(this, arguments)
		}, b)
	}
	function g(a, b) {
		sc[a] || (e(b), sc[a] = !0)
	}
	function h(a, b) {
		return function(c) {
			return r(a.call(this, c), b)
		}
	}
	function i(a, b) {
		return function(c) {
			return this.localeData().ordinal(a.call(this, c), b)
		}
	}
	function j(a, b) {
		var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
			f = a.clone().add(e, "months");
		return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d)
	}
	function k(a, b, c) {
		var d;
		return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b
	}
	function l() {}
	function m(a, b) {
		b !== !1 && H(a), p(this, a), this._d = new Date(+a._d), uc === !1 && (uc = !0, vb.updateOffset(this), uc = !1)
	}
	function n(a) {
		var b = A(a),
			c = b.year || 0,
			d = b.quarter || 0,
			e = b.month || 0,
			f = b.week || 0,
			g = b.day || 0,
			h = b.hour || 0,
			i = b.minute || 0,
			j = b.second || 0,
			k = b.millisecond || 0;
		this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = vb.localeData(), this._bubble()
	}
	function o(a, b) {
		for (var d in b) c(b, d) && (a[d] = b[d]);
		return c(b, "toString") && (a.toString = b.toString), c(b, "valueOf") && (a.valueOf = b.valueOf), a
	}
	function p(a, b) {
		var c, d, e;
		if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = b._pf), "undefined" != typeof b._locale && (a._locale = b._locale), Kb.length > 0) for (c in Kb) d = Kb[c], e = b[d], "undefined" != typeof e && (a[d] = e);
		return a
	}
	function q(a) {
		return 0 > a ? Math.ceil(a) : Math.floor(a)
	}
	function r(a, b, c) {
		for (var d = "" + Math.abs(a), e = a >= 0; d.length < b;) d = "0" + d;
		return (e ? c ? "+" : "" : "-") + d
	}
	function s(a, b) {
		var c = {
			milliseconds: 0,
			months: 0
		};
		return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
	}
	function t(a, b) {
		var c;
		return b = M(b, a), a.isBefore(b) ? c = s(a, b) : (c = s(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c
	}
	function u(a, b) {
		return function(c, d) {
			var e, f;
			return null === d || isNaN(+d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = vb.duration(c, d), v(this, e, a), this
		}
	}
	function v(a, b, c, d) {
		var e = b._milliseconds,
			f = b._days,
			g = b._months;
		d = null == d ? !0 : d, e && a._d.setTime(+a._d + e * c), f && pb(a, "Date", ob(a, "Date") + f * c), g && nb(a, ob(a, "Month") + g * c), d && vb.updateOffset(a, f || g)
	}
	function w(a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	}
	function x(a) {
		return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
	}
	function y(a, b, c) {
		var d, e = Math.min(a.length, b.length),
			f = Math.abs(a.length - b.length),
			g = 0;
		for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && C(a[d]) !== C(b[d])) && g++;
		return g + f
	}
	function z(a) {
		if (a) {
			var b = a.toLowerCase().replace(/(.)s$/, "$1");
			a = lc[a] || mc[b] || b
		}
		return a
	}
	function A(a) {
		var b, d, e = {};
		for (d in a) c(a, d) && (b = z(d), b && (e[b] = a[d]));
		return e
	}
	function B(b) {
		var c, d;
		if (0 === b.indexOf("week")) c = 7, d = "day";
		else {
			if (0 !== b.indexOf("month")) return;
			c = 12, d = "month"
		}
		vb[b] = function(e, f) {
			var g, h, i = vb._locale[b],
				j = [];
			if ("number" == typeof e && (f = e, e = a), h = function(a) {
				var b = vb().utc().set(d, a);
				return i.call(vb._locale, b, e || "")
			}, null != f) return h(f);
			for (g = 0; c > g; g++) j.push(h(g));
			return j
		}
	}
	function C(a) {
		var b = +a,
			c = 0;
		return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c
	}
	function D(a, b) {
		return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
	}
	function E(a, b, c) {
		return jb(vb([a, 11, 31 + b - c]), b, c).week
	}
	function F(a) {
		return G(a) ? 366 : 365
	}
	function G(a) {
		return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
	}
	function H(a) {
		var b;
		a._a && -2 === a._pf.overflow && (b = a._a[Db] < 0 || a._a[Db] > 11 ? Db : a._a[Eb] < 1 || a._a[Eb] > D(a._a[Cb], a._a[Db]) ? Eb : a._a[Fb] < 0 || a._a[Fb] > 24 || 24 === a._a[Fb] && (0 !== a._a[Gb] || 0 !== a._a[Hb] || 0 !== a._a[Ib]) ? Fb : a._a[Gb] < 0 || a._a[Gb] > 59 ? Gb : a._a[Hb] < 0 || a._a[Hb] > 59 ? Hb : a._a[Ib] < 0 || a._a[Ib] > 999 ? Ib : -1, a._pf._overflowDayOfYear && (Cb > b || b > Eb) && (b = Eb), a._pf.overflow = b)
	}
	function I(b) {
		return null == b._isValid && (b._isValid = !isNaN(b._d.getTime()) && b._pf.overflow < 0 && !b._pf.empty && !b._pf.invalidMonth && !b._pf.nullInput && !b._pf.invalidFormat && !b._pf.userInvalidated, b._strict && (b._isValid = b._isValid && 0 === b._pf.charsLeftOver && 0 === b._pf.unusedTokens.length && b._pf.bigHour === a)), b._isValid
	}
	function J(a) {
		return a ? a.toLowerCase().replace("_", "-") : a
	}
	function K(a) {
		for (var b, c, d, e, f = 0; f < a.length;) {
			for (e = J(a[f]).split("-"), b = e.length, c = J(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
				if (d = L(e.slice(0, b).join("-"))) return d;
				if (c && c.length >= b && y(e, c, !0) >= b - 1) break;
				b--
			}
			f++
		}
		return null
	}
	function L(a) {
		var b = null;
		if (!Jb[a] && Lb) try {
			b = vb.locale(), require("./locale/" + a), vb.locale(b)
		} catch (c) {}
		return Jb[a]
	}
	function M(a, b) {
		var c, d;
		return b._isUTC ? (c = b.clone(), d = (vb.isMoment(a) || x(a) ? +a : +vb(a)) - +c, c._d.setTime(+c._d + d), vb.updateOffset(c, !1), c) : vb(a).local()
	}
	function N(a) {
		return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
	}
	function O(a) {
		var b, c, d = a.match(Pb);
		for (b = 0, c = d.length; c > b; b++) d[b] = rc[d[b]] ? rc[d[b]] : N(d[b]);
		return function(e) {
			var f = "";
			for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
			return f
		}
	}
	function P(a, b) {
		return a.isValid() ? (b = Q(b, a.localeData()), nc[b] || (nc[b] = O(b)), nc[b](a)) : a.localeData().invalidDate()
	}
	function Q(a, b) {
		function c(a) {
			return b.longDateFormat(a) || a
		}
		var d = 5;
		for (Qb.lastIndex = 0; d >= 0 && Qb.test(a);) a = a.replace(Qb, c), Qb.lastIndex = 0, d -= 1;
		return a
	}
	function R(a, b) {
		var c, d = b._strict;
		switch (a) {
		case "Q":
			return _b;
		case "DDDD":
			return bc;
		case "YYYY":
		case "GGGG":
		case "gggg":
			return d ? cc : Tb;
		case "Y":
		case "G":
		case "g":
			return ec;
		case "YYYYYY":
		case "YYYYY":
		case "GGGGG":
		case "ggggg":
			return d ? dc : Ub;
		case "S":
			if (d) return _b;
		case "SS":
			if (d) return ac;
		case "SSS":
			if (d) return bc;
		case "DDD":
			return Sb;
		case "MMM":
		case "MMMM":
		case "dd":
		case "ddd":
		case "dddd":
			return Wb;
		case "a":
		case "A":
			return b._locale._meridiemParse;
		case "x":
			return Zb;
		case "X":
			return $b;
		case "Z":
		case "ZZ":
			return Xb;
		case "T":
			return Yb;
		case "SSSS":
			return Vb;
		case "MM":
		case "DD":
		case "YY":
		case "GG":
		case "gg":
		case "HH":
		case "hh":
		case "mm":
		case "ss":
		case "ww":
		case "WW":
			return d ? ac : Rb;
		case "M":
		case "D":
		case "d":
		case "H":
		case "h":
		case "m":
		case "s":
		case "w":
		case "W":
		case "e":
		case "E":
			return Rb;
		case "Do":
			return d ? b._locale._ordinalParse : b._locale._ordinalParseLenient;
		default:
			return c = new RegExp($(Z(a.replace("\\", "")), "i"))
		}
	}
	function S(a) {
		a = a || "";
		var b = a.match(Xb) || [],
			c = b[b.length - 1] || [],
			d = (c + "").match(jc) || ["-", 0, 0],
			e = +(60 * d[1]) + C(d[2]);
		return "+" === d[0] ? e : -e
	}
	function T(a, b, c) {
		var d, e = c._a;
		switch (a) {
		case "Q":
			null != b && (e[Db] = 3 * (C(b) - 1));
			break;
		case "M":
		case "MM":
			null != b && (e[Db] = C(b) - 1);
			break;
		case "MMM":
		case "MMMM":
			d = c._locale.monthsParse(b, a, c._strict), null != d ? e[Db] = d : c._pf.invalidMonth = b;
			break;
		case "D":
		case "DD":
			null != b && (e[Eb] = C(b));
			break;
		case "Do":
			null != b && (e[Eb] = C(parseInt(b.match(/\d{1,2}/)[0], 10)));
			break;
		case "DDD":
		case "DDDD":
			null != b && (c._dayOfYear = C(b));
			break;
		case "YY":
			e[Cb] = vb.parseTwoDigitYear(b);
			break;
		case "YYYY":
		case "YYYYY":
		case "YYYYYY":
			e[Cb] = C(b);
			break;
		case "a":
		case "A":
			c._meridiem = b;
			break;
		case "h":
		case "hh":
			c._pf.bigHour = !0;
		case "H":
		case "HH":
			e[Fb] = C(b);
			break;
		case "m":
		case "mm":
			e[Gb] = C(b);
			break;
		case "s":
		case "ss":
			e[Hb] = C(b);
			break;
		case "S":
		case "SS":
		case "SSS":
		case "SSSS":
			e[Ib] = C(1e3 * ("0." + b));
			break;
		case "x":
			c._d = new Date(C(b));
			break;
		case "X":
			c._d = new Date(1e3 * parseFloat(b));
			break;
		case "Z":
		case "ZZ":
			c._useUTC = !0, c._tzm = S(b);
			break;
		case "dd":
		case "ddd":
		case "dddd":
			d = c._locale.weekdaysParse(b), null != d ? (c._w = c._w || {}, c._w.d = d) : c._pf.invalidWeekday = b;
			break;
		case "w":
		case "ww":
		case "W":
		case "WW":
		case "d":
		case "e":
		case "E":
			a = a.substr(0, 1);
		case "gggg":
		case "GGGG":
		case "GGGGG":
			a = a.substr(0, 2), b && (c._w = c._w || {}, c._w[a] = C(b));
			break;
		case "gg":
		case "GG":
			c._w = c._w || {}, c._w[a] = vb.parseTwoDigitYear(b)
		}
	}
	function U(a) {
		var c, d, e, f, g, h, i;
		c = a._w, null != c.GG || null != c.W || null != c.E ? (g = 1, h = 4, d = b(c.GG, a._a[Cb], jb(vb(), 1, 4).year), e = b(c.W, 1), f = b(c.E, 1)) : (g = a._locale._week.dow, h = a._locale._week.doy, d = b(c.gg, a._a[Cb], jb(vb(), g, h).year), e = b(c.w, 1), null != c.d ? (f = c.d, g > f && ++e) : f = null != c.e ? c.e + g : g), i = kb(d, e, f, h, g), a._a[Cb] = i.year, a._dayOfYear = i.dayOfYear
	}
	function V(a) {
		var c, d, e, f, g = [];
		if (!a._d) {
			for (e = X(a), a._w && null == a._a[Eb] && null == a._a[Db] && U(a), a._dayOfYear && (f = b(a._a[Cb], e[Cb]), a._dayOfYear > F(f) && (a._pf._overflowDayOfYear = !0), d = fb(f, 0, a._dayOfYear), a._a[Db] = d.getUTCMonth(), a._a[Eb] = d.getUTCDate()), c = 0; 3 > c && null == a._a[c]; ++c) a._a[c] = g[c] = e[c];
			for (; 7 > c; c++) a._a[c] = g[c] = null == a._a[c] ? 2 === c ? 1 : 0 : a._a[c];
			24 === a._a[Fb] && 0 === a._a[Gb] && 0 === a._a[Hb] && 0 === a._a[Ib] && (a._nextDay = !0, a._a[Fb] = 0), a._d = (a._useUTC ? fb : eb).apply(null, g), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[Fb] = 24)
		}
	}
	function W(a) {
		var b;
		a._d || (b = A(a._i), a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], V(a))
	}
	function X(a) {
		var b = new Date;
		return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
	}
	function Y(b) {
		if (b._f === vb.ISO_8601) return void ab(b);
		b._a = [], b._pf.empty = !0;
		var c, d, e, f, g, h = "" + b._i,
			i = h.length,
			j = 0;
		for (e = Q(b._f, b._locale).match(Pb) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match(R(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && b._pf.unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), rc[f] ? (d ? b._pf.empty = !1 : b._pf.unusedTokens.push(f), T(f, d, b)) : b._strict && !d && b._pf.unusedTokens.push(f);
		b._pf.charsLeftOver = i - j, h.length > 0 && b._pf.unusedInput.push(h), b._pf.bigHour === !0 && b._a[Fb] <= 12 && (b._pf.bigHour = a), b._a[Fb] = k(b._locale, b._a[Fb], b._meridiem), V(b), H(b)
	}
	function Z(a) {
		return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
			return b || c || d || e
		})
	}
	function $(a) {
		return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	}
	function _(a) {
		var b, c, e, f, g;
		if (0 === a._f.length) return a._pf.invalidFormat = !0, void(a._d = new Date(0 / 0));
		for (f = 0; f < a._f.length; f++) g = 0, b = p({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._pf = d(), b._f = a._f[f], Y(b), I(b) && (g += b._pf.charsLeftOver, g += 10 * b._pf.unusedTokens.length, b._pf.score = g, (null == e || e > g) && (e = g, c = b));
		o(a, c || b)
	}
	function ab(a) {
		var b, c, d = a._i,
			e = fc.exec(d);
		if (e) {
			for (a._pf.iso = !0, b = 0, c = hc.length; c > b; b++) if (hc[b][1].exec(d)) {
				a._f = hc[b][0] + (e[6] || " ");
				break
			}
			for (b = 0, c = ic.length; c > b; b++) if (ic[b][1].exec(d)) {
				a._f += ic[b][0];
				break
			}
			d.match(Xb) && (a._f += "Z"), Y(a)
		} else a._isValid = !1
	}
	function bb(a) {
		ab(a), a._isValid === !1 && (delete a._isValid, vb.createFromInputFallback(a))
	}
	function cb(a, b) {
		var c, d = [];
		for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
		return d
	}
	function db(b) {
		var c, d = b._i;
		d === a ? b._d = new Date : x(d) ? b._d = new Date(+d) : null !== (c = Mb.exec(d)) ? b._d = new Date(+c[1]) : "string" == typeof d ? bb(b) : w(d) ? (b._a = cb(d.slice(0), function(a) {
			return parseInt(a, 10)
		}), V(b)) : "object" == typeof d ? W(b) : "number" == typeof d ? b._d = new Date(d) : vb.createFromInputFallback(b)
	}
	function eb(a, b, c, d, e, f, g) {
		var h = new Date(a, b, c, d, e, f, g);
		return 1970 > a && h.setFullYear(a), h
	}
	function fb(a) {
		var b = new Date(Date.UTC.apply(null, arguments));
		return 1970 > a && b.setUTCFullYear(a), b
	}
	function gb(a, b) {
		if ("string" == typeof a) if (isNaN(a)) {
			if (a = b.weekdaysParse(a), "number" != typeof a) return null
		} else a = parseInt(a, 10);
		return a
	}
	function hb(a, b, c, d, e) {
		return e.relativeTime(b || 1, !! c, a, d)
	}
	function ib(a, b, c) {
		var d = vb.duration(a).abs(),
			e = Ab(d.as("s")),
			f = Ab(d.as("m")),
			g = Ab(d.as("h")),
			h = Ab(d.as("d")),
			i = Ab(d.as("M")),
			j = Ab(d.as("y")),
			k = e < oc.s && ["s", e] || 1 === f && ["m"] || f < oc.m && ["mm", f] || 1 === g && ["h"] || g < oc.h && ["hh", g] || 1 === h && ["d"] || h < oc.d && ["dd", h] || 1 === i && ["M"] || i < oc.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
		return k[2] = b, k[3] = +a > 0, k[4] = c, hb.apply({}, k)
	}
	function jb(a, b, c) {
		var d, e = c - b,
			f = c - a.day();
		return f > e && (f -= 7), e - 7 > f && (f += 7), d = vb(a).add(f, "d"), {
			week: Math.ceil(d.dayOfYear() / 7),
			year: d.year()
		}
	}
	function kb(a, b, c, d, e) {
		var f, g, h = fb(a, 0, 1).getUTCDay();
		return h = 0 === h ? 7 : h, c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), g = 7 * (b - 1) + (c - e) + f + 1, {
			year: g > 0 ? a : a - 1,
			dayOfYear: g > 0 ? g : F(a - 1) + g
		}
	}
	function lb(b) {
		var c, d = b._i,
			e = b._f;
		return b._locale = b._locale || vb.localeData(b._l), null === d || e === a && "" === d ? vb.invalid({
			nullInput: !0
		}) : ("string" == typeof d && (b._i = d = b._locale.preparse(d)), vb.isMoment(d) ? new m(d, !0) : (e ? w(e) ? _(b) : Y(b) : db(b), c = new m(b), c._nextDay && (c.add(1, "d"), c._nextDay = a), c))
	}
	function mb(a, b) {
		var c, d;
		if (1 === b.length && w(b[0]) && (b = b[0]), !b.length) return vb();
		for (c = b[0], d = 1; d < b.length; ++d) b[d][a](c) && (c = b[d]);
		return c
	}
	function nb(a, b) {
		var c;
		return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), D(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
	}
	function ob(a, b) {
		return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
	}
	function pb(a, b, c) {
		return "Month" === b ? nb(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
	}
	function qb(a, b) {
		return function(c) {
			return null != c ? (pb(this, a, c), vb.updateOffset(this, b), this) : ob(this, a)
		}
	}
	function rb(a) {
		return 400 * a / 146097
	}
	function sb(a) {
		return 146097 * a / 400
	}
	function tb(a) {
		vb.duration.fn[a] = function() {
			return this._data[a]
		}
	}
	function ub(a) {
		"undefined" == typeof ender && (wb = zb.moment, zb.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", vb) : vb)
	}
	for (var vb, wb, xb, yb = "2.9.0", zb = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, Ab = Math.round, Bb = Object.prototype.hasOwnProperty, Cb = 0, Db = 1, Eb = 2, Fb = 3, Gb = 4, Hb = 5, Ib = 6, Jb = {}, Kb = [], Lb = "undefined" != typeof module && module && module.exports, Mb = /^\/?Date\((\-?\d+)/i, Nb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ob = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Pb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Qb = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Rb = /\d\d?/, Sb = /\d{1,3}/, Tb = /\d{1,4}/, Ub = /[+\-]?\d{1,6}/, Vb = /\d+/, Wb = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Xb = /Z|[\+\-]\d\d:?\d\d/gi, Yb = /T/i, Zb = /[\+\-]?\d+/, $b = /[\+\-]?\d+(\.\d{1,3})?/, _b = /\d/, ac = /\d\d/, bc = /\d{3}/, cc = /\d{4}/, dc = /[+-]?\d{6}/, ec = /[+-]?\d+/, fc = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gc = "YYYY-MM-DDTHH:mm:ssZ", hc = [
		["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
		["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
		["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
		["GGGG-[W]WW", /\d{4}-W\d{2}/],
		["YYYY-DDD", /\d{4}-\d{3}/]
	], ic = [
		["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
		["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
		["HH:mm", /(T| )\d\d:\d\d/],
		["HH", /(T| )\d\d/]
	], jc = /([\+\-]|\d\d)/gi, kc = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
		Milliseconds: 1,
		Seconds: 1e3,
		Minutes: 6e4,
		Hours: 36e5,
		Days: 864e5,
		Months: 2592e6,
		Years: 31536e6
	}), lc = {
		ms: "millisecond",
		s: "second",
		m: "minute",
		h: "hour",
		d: "day",
		D: "date",
		w: "week",
		W: "isoWeek",
		M: "month",
		Q: "quarter",
		y: "year",
		DDD: "dayOfYear",
		e: "weekday",
		E: "isoWeekday",
		gg: "weekYear",
		GG: "isoWeekYear"
	}, mc = {
		dayofyear: "dayOfYear",
		isoweekday: "isoWeekday",
		isoweek: "isoWeek",
		weekyear: "weekYear",
		isoweekyear: "isoWeekYear"
	}, nc = {}, oc = {
		s: 45,
		m: 45,
		h: 22,
		d: 26,
		M: 11
	}, pc = "DDD w W M D d".split(" "), qc = "M D H h m s w W".split(" "), rc = {
		M: function() {
			return this.month() + 1
		},
		MMM: function(a) {
			return this.localeData().monthsShort(this, a)
		},
		MMMM: function(a) {
			return this.localeData().months(this, a)
		},
		D: function() {
			return this.date()
		},
		DDD: function() {
			return this.dayOfYear()
		},
		d: function() {
			return this.day()
		},
		dd: function(a) {
			return this.localeData().weekdaysMin(this, a)
		},
		ddd: function(a) {
			return this.localeData().weekdaysShort(this, a)
		},
		dddd: function(a) {
			return this.localeData().weekdays(this, a)
		},
		w: function() {
			return this.week()
		},
		W: function() {
			return this.isoWeek()
		},
		YY: function() {
			return r(this.year() % 100, 2)
		},
		YYYY: function() {
			return r(this.year(), 4)
		},
		YYYYY: function() {
			return r(this.year(), 5)
		},
		YYYYYY: function() {
			var a = this.year(),
				b = a >= 0 ? "+" : "-";
			return b + r(Math.abs(a), 6)
		},
		gg: function() {
			return r(this.weekYear() % 100, 2)
		},
		gggg: function() {
			return r(this.weekYear(), 4)
		},
		ggggg: function() {
			return r(this.weekYear(), 5)
		},
		GG: function() {
			return r(this.isoWeekYear() % 100, 2)
		},
		GGGG: function() {
			return r(this.isoWeekYear(), 4)
		},
		GGGGG: function() {
			return r(this.isoWeekYear(), 5)
		},
		e: function() {
			return this.weekday()
		},
		E: function() {
			return this.isoWeekday()
		},
		a: function() {
			return this.localeData().meridiem(this.hours(), this.minutes(), !0)
		},
		A: function() {
			return this.localeData().meridiem(this.hours(), this.minutes(), !1)
		},
		H: function() {
			return this.hours()
		},
		h: function() {
			return this.hours() % 12 || 12
		},
		m: function() {
			return this.minutes()
		},
		s: function() {
			return this.seconds()
		},
		S: function() {
			return C(this.milliseconds() / 100)
		},
		SS: function() {
			return r(C(this.milliseconds() / 10), 2)
		},
		SSS: function() {
			return r(this.milliseconds(), 3)
		},
		SSSS: function() {
			return r(this.milliseconds(), 3)
		},
		Z: function() {
			var a = this.utcOffset(),
				b = "+";
			return 0 > a && (a = -a, b = "-"), b + r(C(a / 60), 2) + ":" + r(C(a) % 60, 2)
		},
		ZZ: function() {
			var a = this.utcOffset(),
				b = "+";
			return 0 > a && (a = -a, b = "-"), b + r(C(a / 60), 2) + r(C(a) % 60, 2)
		},
		z: function() {
			return this.zoneAbbr()
		},
		zz: function() {
			return this.zoneName()
		},
		x: function() {
			return this.valueOf()
		},
		X: function() {
			return this.unix()
		},
		Q: function() {
			return this.quarter()
		}
	}, sc = {}, tc = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], uc = !1; pc.length;) xb = pc.pop(), rc[xb + "o"] = i(rc[xb], xb);
	for (; qc.length;) xb = qc.pop(), rc[xb + xb] = h(rc[xb], 2);
	rc.DDDD = h(rc.DDD, 3), o(l.prototype, {
		set: function(a) {
			var b, c;
			for (c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
			this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
		},
		_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		months: function(a) {
			return this._months[a.month()]
		},
		_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		monthsShort: function(a) {
			return this._monthsShort[a.month()]
		},
		monthsParse: function(a, b, c) {
			var d, e, f;
			for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
				if (e = vb.utc([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
				if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
				if (!c && this._monthsParse[d].test(a)) return d
			}
		},
		_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		weekdays: function(a) {
			return this._weekdays[a.day()]
		},
		_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		weekdaysShort: function(a) {
			return this._weekdaysShort[a.day()]
		},
		_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		weekdaysMin: function(a) {
			return this._weekdaysMin[a.day()]
		},
		weekdaysParse: function(a) {
			var b, c, d;
			for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++) if (this._weekdaysParse[b] || (c = vb([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b
		},
		_longDateFormat: {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY LT",
			LLLL: "dddd, MMMM D, YYYY LT"
		},
		longDateFormat: function(a) {
			var b = this._longDateFormat[a];
			return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
				return a.slice(1)
			}), this._longDateFormat[a] = b), b
		},
		isPM: function(a) {
			return "p" === (a + "").toLowerCase().charAt(0)
		},
		_meridiemParse: /[ap]\.?m?\.?/i,
		meridiem: function(a, b, c) {
			return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
		},
		_calendar: {
			sameDay: "[Today at] LT",
			nextDay: "[Tomorrow at] LT",
			nextWeek: "dddd [at] LT",
			lastDay: "[Yesterday at] LT",
			lastWeek: "[Last] dddd [at] LT",
			sameElse: "L"
		},
		calendar: function(a, b, c) {
			var d = this._calendar[a];
			return "function" == typeof d ? d.apply(b, [c]) : d
		},
		_relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		relativeTime: function(a, b, c, d) {
			var e = this._relativeTime[c];
			return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
		},
		pastFuture: function(a, b) {
			var c = this._relativeTime[a > 0 ? "future" : "past"];
			return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
		},
		ordinal: function(a) {
			return this._ordinal.replace("%d", a)
		},
		_ordinal: "%d",
		_ordinalParse: /\d{1,2}/,
		preparse: function(a) {
			return a
		},
		postformat: function(a) {
			return a
		},
		week: function(a) {
			return jb(a, this._week.dow, this._week.doy).week
		},
		_week: {
			dow: 0,
			doy: 6
		},
		firstDayOfWeek: function() {
			return this._week.dow
		},
		firstDayOfYear: function() {
			return this._week.doy
		},
		_invalidDate: "Invalid date",
		invalidDate: function() {
			return this._invalidDate
		}
	}), vb = function(b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._i = b, g._f = c, g._l = e, g._strict = f, g._isUTC = !1, g._pf = d(), lb(g)
	}, vb.suppressDeprecationWarnings = !1, vb.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
		a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
	}), vb.min = function() {
		var a = [].slice.call(arguments, 0);
		return mb("isBefore", a)
	}, vb.max = function() {
		var a = [].slice.call(arguments, 0);
		return mb("isAfter", a)
	}, vb.utc = function(b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._useUTC = !0, g._isUTC = !0, g._l = e, g._i = b, g._f = c, g._strict = f, g._pf = d(), lb(g).utc()
	}, vb.unix = function(a) {
		return vb(1e3 * a)
	}, vb.duration = function(a, b) {
		var d, e, f, g, h = a,
			i = null;
		return vb.isDuration(a) ? h = {
			ms: a._milliseconds,
			d: a._days,
			M: a._months
		} : "number" == typeof a ? (h = {}, b ? h[b] = a : h.milliseconds = a) : (i = Nb.exec(a)) ? (d = "-" === i[1] ? -1 : 1, h = {
			y: 0,
			d: C(i[Eb]) * d,
			h: C(i[Fb]) * d,
			m: C(i[Gb]) * d,
			s: C(i[Hb]) * d,
			ms: C(i[Ib]) * d
		}) : (i = Ob.exec(a)) ? (d = "-" === i[1] ? -1 : 1, f = function(a) {
			var b = a && parseFloat(a.replace(",", "."));
			return (isNaN(b) ? 0 : b) * d
		}, h = {
			y: f(i[2]),
			M: f(i[3]),
			d: f(i[4]),
			h: f(i[5]),
			m: f(i[6]),
			s: f(i[7]),
			w: f(i[8])
		}) : null == h ? h = {} : "object" == typeof h && ("from" in h || "to" in h) && (g = t(vb(h.from), vb(h.to)), h = {}, h.ms = g.milliseconds, h.M = g.months), e = new n(h), vb.isDuration(a) && c(a, "_locale") && (e._locale = a._locale), e
	}, vb.version = yb, vb.defaultFormat = gc, vb.ISO_8601 = function() {}, vb.momentProperties = Kb, vb.updateOffset = function() {}, vb.relativeTimeThreshold = function(b, c) {
		return oc[b] === a ? !1 : c === a ? oc[b] : (oc[b] = c, !0)
	}, vb.lang = f("moment.lang is deprecated. Use moment.locale instead.", function(a, b) {
		return vb.locale(a, b)
	}), vb.locale = function(a, b) {
		var c;
		return a && (c = "undefined" != typeof b ? vb.defineLocale(a, b) : vb.localeData(a), c && (vb.duration._locale = vb._locale = c)), vb._locale._abbr
	}, vb.defineLocale = function(a, b) {
		return null !== b ? (b.abbr = a, Jb[a] || (Jb[a] = new l), Jb[a].set(b), vb.locale(a), Jb[a]) : (delete Jb[a], null)
	}, vb.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function(a) {
		return vb.localeData(a)
	}), vb.localeData = function(a) {
		var b;
		if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return vb._locale;
		if (!w(a)) {
			if (b = L(a)) return b;
			a = [a]
		}
		return K(a)
	}, vb.isMoment = function(a) {
		return a instanceof m || null != a && c(a, "_isAMomentObject")
	}, vb.isDuration = function(a) {
		return a instanceof n
	};
	for (xb = tc.length - 1; xb >= 0; --xb) B(tc[xb]);
	vb.normalizeUnits = function(a) {
		return z(a)
	}, vb.invalid = function(a) {
		var b = vb.utc(0 / 0);
		return null != a ? o(b._pf, a) : b._pf.userInvalidated = !0, b
	}, vb.parseZone = function() {
		return vb.apply(null, arguments).parseZone()
	}, vb.parseTwoDigitYear = function(a) {
		return C(a) + (C(a) > 68 ? 1900 : 2e3)
	}, vb.isDate = x, o(vb.fn = m.prototype, {
		clone: function() {
			return vb(this)
		},
		valueOf: function() {
			return +this._d - 6e4 * (this._offset || 0)
		},
		unix: function() {
			return Math.floor(+this / 1e3)
		},
		toString: function() {
			return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
		},
		toDate: function() {
			return this._offset ? new Date(+this) : this._d
		},
		toISOString: function() {
			var a = vb(this).utc();
			return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : P(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : P(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
		},
		toArray: function() {
			var a = this;
			return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
		},
		isValid: function() {
			return I(this)
		},
		isDSTShifted: function() {
			return this._a ? this.isValid() && y(this._a, (this._isUTC ? vb.utc(this._a) : vb(this._a)).toArray()) > 0 : !1
		},
		parsingFlags: function() {
			return o({}, this._pf)
		},
		invalidAt: function() {
			return this._pf.overflow
		},
		utc: function(a) {
			return this.utcOffset(0, a)
		},
		local: function(a) {
			return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(this._dateUtcOffset(), "m")), this
		},
		format: function(a) {
			var b = P(this, a || vb.defaultFormat);
			return this.localeData().postformat(b)
		},
		add: u(1, "add"),
		subtract: u(-1, "subtract"),
		diff: function(a, b, c) {
			var d, e, f = M(a, this),
				g = 6e4 * (f.utcOffset() - this.utcOffset());
			return b = z(b), "year" === b || "month" === b || "quarter" === b ? (e = j(this, f), "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), c ? e : q(e)
		},
		from: function(a, b) {
			return vb.duration({
				to: this,
				from: a
			}).locale(this.locale()).humanize(!b)
		},
		fromNow: function(a) {
			return this.from(vb(), a)
		},
		calendar: function(a) {
			var b = a || vb(),
				c = M(b, this).startOf("day"),
				d = this.diff(c, "days", !0),
				e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
			return this.format(this.localeData().calendar(e, this, vb(b)))
		},
		isLeapYear: function() {
			return G(this.year())
		},
		isDST: function() {
			return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
		},
		day: function(a) {
			var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
			return null != a ? (a = gb(a, this.localeData()), this.add(a - b, "d")) : b
		},
		month: qb("Month", !0),
		startOf: function(a) {
			switch (a = z(a)) {
			case "year":
				this.month(0);
			case "quarter":
			case "month":
				this.date(1);
			case "week":
			case "isoWeek":
			case "day":
				this.hours(0);
			case "hour":
				this.minutes(0);
			case "minute":
				this.seconds(0);
			case "second":
				this.milliseconds(0)
			}
			return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
		},
		endOf: function(b) {
			return b = z(b), b === a || "millisecond" === b ? this : this.startOf(b).add(1, "isoWeek" === b ? "week" : b).subtract(1, "ms")
		},
		isAfter: function(a, b) {
			var c;
			return b = z("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = vb.isMoment(a) ? a : vb(a), +this > +a) : (c = vb.isMoment(a) ? +a : +vb(a), c < +this.clone().startOf(b))
		},
		isBefore: function(a, b) {
			var c;
			return b = z("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = vb.isMoment(a) ? a : vb(a), +a > +this) : (c = vb.isMoment(a) ? +a : +vb(a), +this.clone().endOf(b) < c)
		},
		isBetween: function(a, b, c) {
			return this.isAfter(a, c) && this.isBefore(b, c)
		},
		isSame: function(a, b) {
			var c;
			return b = z(b || "millisecond"), "millisecond" === b ? (a = vb.isMoment(a) ? a : vb(a), +this === +a) : (c = +vb(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
		},
		min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(a) {
			return a = vb.apply(null, arguments), this > a ? this : a
		}),
		max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(a) {
			return a = vb.apply(null, arguments), a > this ? this : a
		}),
		zone: f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function(a, b) {
			return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
		}),
		utcOffset: function(a, b) {
			var c, d = this._offset || 0;
			return null != a ? ("string" == typeof a && (a = S(a)), Math.abs(a) < 16 && (a = 60 * a), !this._isUTC && b && (c = this._dateUtcOffset()), this._offset = a, this._isUTC = !0, null != c && this.add(c, "m"), d !== a && (!b || this._changeInProgress ? v(this, vb.duration(a - d, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, vb.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? d : this._dateUtcOffset()
		},
		isLocal: function() {
			return !this._isUTC
		},
		isUtcOffset: function() {
			return this._isUTC
		},
		isUtc: function() {
			return this._isUTC && 0 === this._offset
		},
		zoneAbbr: function() {
			return this._isUTC ? "UTC" : ""
		},
		zoneName: function() {
			return this._isUTC ? "Coordinated Universal Time" : ""
		},
		parseZone: function() {
			return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(S(this._i)), this
		},
		hasAlignedHourOffset: function(a) {
			return a = a ? vb(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0
		},
		daysInMonth: function() {
			return D(this.year(), this.month())
		},
		dayOfYear: function(a) {
			var b = Ab((vb(this).startOf("day") - vb(this).startOf("year")) / 864e5) + 1;
			return null == a ? b : this.add(a - b, "d")
		},
		quarter: function(a) {
			return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
		},
		weekYear: function(a) {
			var b = jb(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
			return null == a ? b : this.add(a - b, "y")
		},
		isoWeekYear: function(a) {
			var b = jb(this, 1, 4).year;
			return null == a ? b : this.add(a - b, "y")
		},
		week: function(a) {
			var b = this.localeData().week(this);
			return null == a ? b : this.add(7 * (a - b), "d")
		},
		isoWeek: function(a) {
			var b = jb(this, 1, 4).week;
			return null == a ? b : this.add(7 * (a - b), "d")
		},
		weekday: function(a) {
			var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
			return null == a ? b : this.add(a - b, "d")
		},
		isoWeekday: function(a) {
			return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
		},
		isoWeeksInYear: function() {
			return E(this.year(), 1, 4)
		},
		weeksInYear: function() {
			var a = this.localeData()._week;
			return E(this.year(), a.dow, a.doy)
		},
		get: function(a) {
			return a = z(a), this[a]()
		},
		set: function(a, b) {
			var c;
			if ("object" == typeof a) for (c in a) this.set(c, a[c]);
			else a = z(a), "function" == typeof this[a] && this[a](b);
			return this
		},
		locale: function(b) {
			var c;
			return b === a ? this._locale._abbr : (c = vb.localeData(b), null != c && (this._locale = c), this)
		},
		lang: f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(b) {
			return b === a ? this.localeData() : this.locale(b)
		}),
		localeData: function() {
			return this._locale
		},
		_dateUtcOffset: function() {
			return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
		}
	}), vb.fn.millisecond = vb.fn.milliseconds = qb("Milliseconds", !1), vb.fn.second = vb.fn.seconds = qb("Seconds", !1), vb.fn.minute = vb.fn.minutes = qb("Minutes", !1), vb.fn.hour = vb.fn.hours = qb("Hours", !0), vb.fn.date = qb("Date", !0), vb.fn.dates = f("dates accessor is deprecated. Use date instead.", qb("Date", !0)), vb.fn.year = qb("FullYear", !0), vb.fn.years = f("years accessor is deprecated. Use year instead.", qb("FullYear", !0)), vb.fn.days = vb.fn.day, vb.fn.months = vb.fn.month, vb.fn.weeks = vb.fn.week, vb.fn.isoWeeks = vb.fn.isoWeek, vb.fn.quarters = vb.fn.quarter, vb.fn.toJSON = vb.fn.toISOString, vb.fn.isUTC = vb.fn.isUtc, o(vb.duration.fn = n.prototype, {
		_bubble: function() {
			var a, b, c, d = this._milliseconds,
				e = this._days,
				f = this._months,
				g = this._data,
				h = 0;
			g.milliseconds = d % 1e3, a = q(d / 1e3), g.seconds = a % 60, b = q(a / 60), g.minutes = b % 60, c = q(b / 60), g.hours = c % 24, e += q(c / 24), h = q(rb(e)), e -= q(sb(h)), f += q(e / 30), e %= 30, h += q(f / 12), f %= 12, g.days = e, g.months = f, g.years = h
		},
		abs: function() {
			return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
		},
		weeks: function() {
			return q(this.days() / 7)
		},
		valueOf: function() {
			return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * C(this._months / 12)
		},
		humanize: function(a) {
			var b = ib(this, !a, this.localeData());
			return a && (b = this.localeData().pastFuture(+this, b)), this.localeData().postformat(b)
		},
		add: function(a, b) {
			var c = vb.duration(a, b);
			return this._milliseconds += c._milliseconds, this._days += c._days, this._months += c._months, this._bubble(), this
		},
		subtract: function(a, b) {
			var c = vb.duration(a, b);
			return this._milliseconds -= c._milliseconds, this._days -= c._days, this._months -= c._months, this._bubble(), this
		},
		get: function(a) {
			return a = z(a), this[a.toLowerCase() + "s"]()
		},
		as: function(a) {
			var b, c;
			if (a = z(a), "month" === a || "year" === a) return b = this._days + this._milliseconds / 864e5, c = this._months + 12 * rb(b), "month" === a ? c : c / 12;
			switch (b = this._days + Math.round(sb(this._months / 12)), a) {
			case "week":
				return b / 7 + this._milliseconds / 6048e5;
			case "day":
				return b + this._milliseconds / 864e5;
			case "hour":
				return 24 * b + this._milliseconds / 36e5;
			case "minute":
				return 24 * b * 60 + this._milliseconds / 6e4;
			case "second":
				return 24 * b * 60 * 60 + this._milliseconds / 1e3;
			case "millisecond":
				return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
			default:
				throw new Error("Unknown unit " + a)
			}
		},
		lang: vb.fn.lang,
		locale: vb.fn.locale,
		toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
			return this.toISOString()
		}),
		toISOString: function() {
			var a = Math.abs(this.years()),
				b = Math.abs(this.months()),
				c = Math.abs(this.days()),
				d = Math.abs(this.hours()),
				e = Math.abs(this.minutes()),
				f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
			return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
		},
		localeData: function() {
			return this._locale
		},
		toJSON: function() {
			return this.toISOString()
		}
	}), vb.duration.fn.toString = vb.duration.fn.toISOString;
	for (xb in kc) c(kc, xb) && tb(xb.toLowerCase());
	vb.duration.fn.asMilliseconds = function() {
		return this.as("ms")
	}, vb.duration.fn.asSeconds = function() {
		return this.as("s")
	}, vb.duration.fn.asMinutes = function() {
		return this.as("m")
	}, vb.duration.fn.asHours = function() {
		return this.as("h")
	}, vb.duration.fn.asDays = function() {
		return this.as("d")
	}, vb.duration.fn.asWeeks = function() {
		return this.as("weeks")
	}, vb.duration.fn.asMonths = function() {
		return this.as("M")
	}, vb.duration.fn.asYears = function() {
		return this.as("y")
	}, vb.locale("en", {
		ordinalParse: /\d{1,2}(th|st|nd|rd)/,
		ordinal: function(a) {
			var b = a % 10,
				c = 1 === C(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
			return a + c
		}
	}), Lb ? module.exports = vb : "function" == typeof define && define.amd ? (define(function(a, b, c) {
		return c.config && c.config() && c.config().noGlobal === !0 && (zb.moment = wb), vb
	}), ub(!0)) : ub()
}).call(this);
//! moment-timezone.js
//! version : 0.3.0
//! author : Tim Wood
//! license : MIT
//! github.com/moment/moment-timezone
!
function(a, b) {
	"use strict";
	"function" == typeof define && define.amd ? define(["moment"], b) : "object" == typeof exports ? module.exports = b(require("moment")) : b(a.moment)
}(this, function(a) {
	"use strict";

	function b(a) {
		return a > 96 ? a - 87 : a > 64 ? a - 29 : a - 48
	}
	function c(a) {
		var c, d = 0,
			e = a.split("."),
			f = e[0],
			g = e[1] || "",
			h = 1,
			i = 0,
			j = 1;
		for (45 === a.charCodeAt(0) && (d = 1, j = -1), d; d < f.length; d++) c = b(f.charCodeAt(d)), i = 60 * i + c;
		for (d = 0; d < g.length; d++) h /= 60, c = b(g.charCodeAt(d)), i += c * h;
		return i * j
	}
	function d(a) {
		for (var b = 0; b < a.length; b++) a[b] = c(a[b])
	}
	function e(a, b) {
		for (var c = 0; b > c; c++) a[c] = Math.round((a[c - 1] || 0) + 6e4 * a[c]);
		a[b - 1] = 1 / 0
	}
	function f(a, b) {
		var c, d = [];
		for (c = 0; c < b.length; c++) d[c] = a[b[c]];
		return d
	}
	function g(a) {
		var b = a.split("|"),
			c = b[2].split(" "),
			g = b[3].split(""),
			h = b[4].split(" ");
		return d(c), d(g), d(h), e(h, g.length), {
			name: b[0],
			abbrs: f(b[1].split(" "), g),
			offsets: f(c, g),
			untils: h
		}
	}
	function h(a) {
		a && this._set(g(a))
	}
	function i(a) {
		return (a || "").toLowerCase().replace(/\//g, "_")
	}
	function j(a) {
		var b, c, d;
		for ("string" == typeof a && (a = [a]), b = 0; b < a.length; b++) c = new h(a[b]), d = i(c.name), y[d] = c, n(d)
	}
	function k(a) {
		return y[i(a)] || null
	}
	function l() {
		var a, b = [];
		for (a in y) y.hasOwnProperty(a) && y[a] && b.push(y[a].name);
		return b.sort()
	}
	function m(a) {
		var b, c;
		for ("string" == typeof a && (a = [a]), b = 0; b < a.length; b++) c = a[b].split("|"), p(c[0], c[1]), p(c[1], c[0])
	}
	function n(a) {
		if (z[a]) {
			var b, c = y[a],
				d = z[a];
			for (b = 0; b < d.length; b++) o(c, d[b]);
			z[a] = null
		}
	}
	function o(a, b) {
		var c = y[i(b)] = new h;
		c._set(a), c.name = b
	}
	function p(a, b) {
		a = i(a), y[a] ? o(y[a], b) : (z[a] = z[a] || [], z[a].push(b))
	}
	function q(a) {
		j(a.zones), m(a.links), u.dataVersion = a.version
	}
	function r(a) {
		return r.didShowError || (r.didShowError = !0, t("moment.tz.zoneExists('" + a + "') has been deprecated in favor of !moment.tz.zone('" + a + "')")), !! k(a)
	}
	function s(a) {
		return !(!a._a || void 0 !== a._tzm)
	}
	function t(a) {
		"undefined" != typeof console && "function" == typeof console.error && console.error(a)
	}
	function u(b) {
		var c = Array.prototype.slice.call(arguments, 0, -1),
			d = arguments[arguments.length - 1],
			e = k(d),
			f = a.utc.apply(null, c);
		return e && !a.isMoment(b) && s(f) && f.add(e.parse(f), "minutes"), f.tz(d), f
	}
	function v(a) {
		return function() {
			return this._z ? this._z.abbr(this) : a.call(this)
		}
	}
	function w(a) {
		return function() {
			return this._z = null, a.apply(this, arguments)
		}
	}
	if (void 0 !== a.tz) return a;
	var x = "0.3.0",
		y = {},
		z = {},
		A = a.version.split("."),
		B = +A[0],
		C = +A[1];
	(2 > B || 2 === B && 6 > C) && t("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + a.version + ". See momentjs.com"), h.prototype = {
		_set: function(a) {
			this.name = a.name, this.abbrs = a.abbrs, this.untils = a.untils, this.offsets = a.offsets
		},
		_index: function(a) {
			var b, c = +a,
				d = this.untils;
			for (b = 0; b < d.length; b++) if (c < d[b]) return b
		},
		parse: function(a) {
			var b, c, d, e, f = +a,
				g = this.offsets,
				h = this.untils,
				i = h.length - 1;
			for (e = 0; i > e; e++) if (b = g[e], c = g[e + 1], d = g[e ? e - 1 : e], c > b && u.moveAmbiguousForward ? b = c : b > d && u.moveInvalidForward && (b = d), f < h[e] - 6e4 * b) return g[e];
			return g[i]
		},
		abbr: function(a) {
			return this.abbrs[this._index(a)]
		},
		offset: function(a) {
			return this.offsets[this._index(a)]
		}
	}, u.version = x, u.dataVersion = "", u._zones = y, u._links = z, u.add = j, u.link = m, u.load = q, u.zone = k, u.zoneExists = r, u.names = l, u.Zone = h, u.unpack = g, u.unpackBase60 = c, u.needsOffset = s, u.moveInvalidForward = !0, u.moveAmbiguousForward = !1;
	var D = a.fn;
	a.tz = u, a.defaultZone = null, a.updateOffset = function(b, c) {
		var d;
		void 0 === b._z && (b._z = a.defaultZone), b._z && (d = b._z.offset(b), Math.abs(d) < 16 && (d /= 60), void 0 !== b.utcOffset ? b.utcOffset(-d, c) : b.zone(d, c))
	}, D.tz = function(b) {
		return b ? (this._z = k(b), this._z ? a.updateOffset(this) : t("Moment Timezone has no data for " + b + ". See http://momentjs.com/timezone/docs/#/data-loading/."), this) : this._z ? this._z.name : void 0
	}, D.zoneName = v(D.zoneName), D.zoneAbbr = v(D.zoneAbbr), D.utc = w(D.utc), a.tz.setDefault = function(b) {
		return (2 > B || 2 === B && 9 > C) && t("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + a.version + "."), a.defaultZone = b ? k(b) : null, a
	};
	var E = a.momentProperties;
	return "[object Array]" === Object.prototype.toString.call(E) ? (E.push("_z"), E.push("_a")) : E && (E._z = null), q({
		version: "2014j",
		zones: ["Africa/Abidjan|GMT|0|0|", "Africa/Addis_Ababa|EAT|-30|0|", "Africa/Algiers|CET|-10|0|", "Africa/Bangui|WAT|-10|0|", "Africa/Blantyre|CAT|-20|0|", "Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010|1Cby0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0 1o10 jz0 gN0 pb0 1qN0 dX0 e10 xz0 1o10 bb0 e10 An0 1o10 5z0 e10 FX0 1o10 2L0 e10 IL0 1C10 Lz0", "Africa/Casablanca|WET WEST|0 -10|01010101010101010101010101010101010101010|1Cco0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uo0 e00 DA0 11A0 rA0 e00 Jc0 WM0 m00 gM0 M00 WM0 jc0 e00 RA0 11A0 dA0 e00 Uo0 11A0 800 gM0 Xc0", "Africa/Ceuta|CET CEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Africa/Johannesburg|SAST|-20|0|", "Africa/Tripoli|EET CET CEST|-20 -10 -20|0120|1IlA0 TA0 1o00", "Africa/Windhoek|WAST WAT|-20 -10|01010101010101010101010|1C1c0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0", "America/Adak|HAST HADT|a0 90|01010101010101010101010|1BR00 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1BQX0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Anguilla|AST|40|0|", "America/Araguaina|BRT BRST|30 20|010|1IdD0 Lz0", "America/Argentina/Buenos_Aires|ART|30|0|", "America/Asuncion|PYST PYT|30 40|01010101010101010101010|1C430 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0", "America/Atikokan|EST|50|0|", "America/Bahia|BRT BRST|30 20|010|1FJf0 Rb0", "America/Bahia_Banderas|MST CDT CST|70 50 60|01212121212121212121212|1C1l0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Belem|BRT|30|0|", "America/Belize|CST|60|0|", "America/Boa_Vista|AMT|40|0|", "America/Bogota|COT|50|0|", "America/Boise|MST MDT|70 60|01010101010101010101010|1BQV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Campo_Grande|AMST AMT|30 40|01010101010101010101010|1BIr0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10", "America/Cancun|CST CDT|60 50|01010101010101010101010|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Caracas|VET|4u|0|", "America/Cayenne|GFT|30|0|", "America/Chicago|CST CDT|60 50|01010101010101010101010|1BQU0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Chihuahua|MST MDT|70 60|01010101010101010101010|1C1l0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Creston|MST|70|0|", "America/Dawson|PST PDT|80 70|01010101010101010101010|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Detroit|EST EDT|50 40|01010101010101010101010|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Eirunepe|AMT ACT|40 50|01|1KLE0", "America/Glace_Bay|AST ADT|40 30|01010101010101010101010|1BQS0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Godthab|WGT WGST|30 20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "America/Goose_Bay|AST ADT|40 30|01010101010101010101010|1BQQ1 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Grand_Turk|EST EDT AST|50 40 40|0101010101012|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Guayaquil|ECT|50|0|", "America/Guyana|GYT|40|0|", "America/Havana|CST CDT|50 40|01010101010101010101010|1BQR0 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0", "America/La_Paz|BOT|40|0|", "America/Lima|PET|50|0|", "America/Metlakatla|PST|80|0|", "America/Miquelon|PMST PMDT|30 20|01010101010101010101010|1BQR0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Montevideo|UYST UYT|20 30|01010101010101010101010|1BQQ0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10", "America/Noronha|FNT|20|0|", "America/North_Dakota/Beulah|MST MDT CST CDT|70 60 60 50|01232323232323232323232|1BQV0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Paramaribo|SRT|30|0|", "America/Port-au-Prince|EST EDT|50 40|0101010101010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Santa_Isabel|PST PDT|80 70|01010101010101010101010|1C1m0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0", "America/Santiago|CLST CLT|30 40|01010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1zb0 Op0 1zb0 Rd0 1wn0 Rd0", "America/Sao_Paulo|BRST BRT|20 30|01010101010101010101010|1BIq0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10", "America/Scoresbysund|EGT EGST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1BQPv 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Antarctica/Casey|CAST AWST|-b0 -80|0101|1BN30 40P0 KL0", "Antarctica/Davis|DAVT DAVT|-50 -70|0101|1BPw0 3Wn0 KN0", "Antarctica/DumontDUrville|DDUT|-a0|0|", "Antarctica/Macquarie|AEDT MIST|-b0 -b0|01|1C140", "Antarctica/Mawson|MAWT|-50|0|", "Antarctica/McMurdo|NZDT NZST|-d0 -c0|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00", "Antarctica/Rothera|ROTT|30|0|", "Antarctica/Syowa|SYOT|-30|0|", "Antarctica/Troll|UTC CEST|0 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Antarctica/Vostok|VOST|-60|0|", "Asia/Aden|AST|-30|0|", "Asia/Almaty|ALMT|-60|0|", "Asia/Amman|EET EEST|-20 -30|010101010101010101010|1BVy0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0", "Asia/Anadyr|ANAT ANAST ANAT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0", "Asia/Aqtau|AQTT|-50|0|", "Asia/Ashgabat|TMT|-50|0|", "Asia/Baku|AZT AZST|-40 -50|01010101010101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Asia/Bangkok|ICT|-70|0|", "Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1BWm0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0", "Asia/Bishkek|KGT|-60|0|", "Asia/Brunei|BNT|-80|0|", "Asia/Calcutta|IST|-5u|0|", "Asia/Chita|YAKT YAKST YAKT IRKT|-90 -a0 -a0 -80|01023|1BWh0 1qM0 WM0 8Hz0", "Asia/Choibalsan|CHOT|-80|0|", "Asia/Chongqing|CST|-80|0|", "Asia/Dacca|BDT|-60|0|", "Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1C0m0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0", "Asia/Dili|TLT|-90|0|", "Asia/Dubai|GST|-40|0|", "Asia/Dushanbe|TJT|-50|0|", "Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1BVW1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0", "Asia/Hebron|EET EEST|-20 -30|0101010101010101010101010|1BVy0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0", "Asia/Hong_Kong|HKT|-80|0|", "Asia/Hovd|HOVT|-70|0|", "Asia/Irkutsk|IRKT IRKST IRKT|-80 -90 -90|01020|1BWi0 1qM0 WM0 8Hz0", "Asia/Istanbul|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Asia/Jakarta|WIB|-70|0|", "Asia/Jayapura|WIT|-90|0|", "Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1BVA0 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0", "Asia/Kabul|AFT|-4u|0|", "Asia/Kamchatka|PETT PETST PETT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0", "Asia/Karachi|PKT|-50|0|", "Asia/Kashgar|XJT|-60|0|", "Asia/Kathmandu|NPT|-5J|0|", "Asia/Khandyga|VLAT VLAST VLAT YAKT YAKT|-a0 -b0 -b0 -a0 -90|010234|1BWg0 1qM0 WM0 17V0 7zD0", "Asia/Krasnoyarsk|KRAT KRAST KRAT|-70 -80 -80|01020|1BWj0 1qM0 WM0 8Hz0", "Asia/Kuala_Lumpur|MYT|-80|0|", "Asia/Magadan|MAGT MAGST MAGT MAGT|-b0 -c0 -c0 -a0|01023|1BWf0 1qM0 WM0 8Hz0", "Asia/Makassar|WITA|-80|0|", "Asia/Manila|PHT|-80|0|", "Asia/Nicosia|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Asia/Novokuznetsk|KRAT NOVST NOVT NOVT|-70 -70 -60 -70|01230|1BWj0 1qN0 WM0 8Hz0", "Asia/Novosibirsk|NOVT NOVST NOVT|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0", "Asia/Omsk|OMST OMSST OMST|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0", "Asia/Oral|ORAT|-50|0|", "Asia/Pyongyang|KST|-90|0|", "Asia/Qyzylorda|QYZT|-60|0|", "Asia/Rangoon|MMT|-6u|0|", "Asia/Sakhalin|SAKT SAKST SAKT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0", "Asia/Samarkand|UZT|-50|0|", "Asia/Singapore|SGT|-80|0|", "Asia/Srednekolymsk|MAGT MAGST MAGT SRET|-b0 -c0 -c0 -b0|01023|1BWf0 1qM0 WM0 8Hz0", "Asia/Tbilisi|GET|-40|0|", "Asia/Tehran|IRST IRDT|-3u -4u|01010101010101010101010|1BTUu 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0", "Asia/Thimbu|BTT|-60|0|", "Asia/Tokyo|JST|-90|0|", "Asia/Ulaanbaatar|ULAT|-80|0|", "Asia/Ust-Nera|MAGT MAGST MAGT VLAT VLAT|-b0 -c0 -c0 -b0 -a0|010234|1BWf0 1qM0 WM0 17V0 7zD0", "Asia/Vladivostok|VLAT VLAST VLAT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0", "Asia/Yakutsk|YAKT YAKST YAKT|-90 -a0 -a0|01020|1BWh0 1qM0 WM0 8Hz0", "Asia/Yekaterinburg|YEKT YEKST YEKT|-50 -60 -60|01020|1BWl0 1qM0 WM0 8Hz0", "Asia/Yerevan|AMT AMST|-40 -50|01010|1BWm0 1qM0 WM0 1qM0", "Atlantic/Azores|AZOT AZOST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Atlantic/Canary|WET WEST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Atlantic/Cape_Verde|CVT|10|0|", "Atlantic/South_Georgia|GST|20|0|", "Atlantic/Stanley|FKST FKT|30 40|010|1C6R0 U10", "Australia/ACT|AEDT AEST|-b0 -a0|01010101010101010101010|1C140 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0", "Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1C14u 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0", "Australia/Brisbane|AEST|-a0|0|", "Australia/Darwin|ACST|-9u|0|", "Australia/Eucla|ACWST|-8J|0|", "Australia/LHI|LHDT LHST|-b0 -au|01010101010101010101010|1C130 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu", "Australia/Perth|AWST|-80|0|", "Chile/EasterIsland|EASST EAST|50 60|01010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1wn0 Rd0 1zb0 Op0 1zb0 Rd0 1wn0 Rd0", "Eire|GMT IST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Etc/GMT+1|GMT+1|10|0|", "Etc/GMT+10|GMT+10|a0|0|", "Etc/GMT+11|GMT+11|b0|0|", "Etc/GMT+12|GMT+12|c0|0|", "Etc/GMT+2|GMT+2|20|0|", "Etc/GMT+3|GMT+3|30|0|", "Etc/GMT+4|GMT+4|40|0|", "Etc/GMT+5|GMT+5|50|0|", "Etc/GMT+6|GMT+6|60|0|", "Etc/GMT+7|GMT+7|70|0|", "Etc/GMT+8|GMT+8|80|0|", "Etc/GMT+9|GMT+9|90|0|", "Etc/GMT-1|GMT-1|-10|0|", "Etc/GMT-10|GMT-10|-a0|0|", "Etc/GMT-11|GMT-11|-b0|0|", "Etc/GMT-12|GMT-12|-c0|0|", "Etc/GMT-13|GMT-13|-d0|0|", "Etc/GMT-14|GMT-14|-e0|0|", "Etc/GMT-2|GMT-2|-20|0|", "Etc/GMT-3|GMT-3|-30|0|", "Etc/GMT-4|GMT-4|-40|0|", "Etc/GMT-5|GMT-5|-50|0|", "Etc/GMT-6|GMT-6|-60|0|", "Etc/GMT-7|GMT-7|-70|0|", "Etc/GMT-8|GMT-8|-80|0|", "Etc/GMT-9|GMT-9|-90|0|", "Etc/UCT|UCT|0|0|", "Etc/UTC|UTC|0|0|", "Europe/Belfast|GMT BST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Europe/Kaliningrad|EET EEST FET|-20 -30 -30|01020|1BWo0 1qM0 WM0 8Hz0", "Europe/Minsk|EET EEST FET MSK|-20 -30 -30 -30|01023|1BWo0 1qM0 WM0 8Hy0", "Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0", "Europe/Samara|SAMT SAMST SAMT|-40 -40 -30|0120|1BWm0 1qN0 WM0", "Europe/Simferopol|EET EEST MSK MSK|-20 -30 -40 -30|01010101023|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0", "Europe/Volgograd|MSK MSK|-30 -40|01010|1BWn0 1qM0 WM0 8Hz0", "HST|HST|a0|0|", "Indian/Chagos|IOT|-60|0|", "Indian/Christmas|CXT|-70|0|", "Indian/Cocos|CCT|-6u|0|", "Indian/Kerguelen|TFT|-50|0|", "Indian/Mahe|SCT|-40|0|", "Indian/Maldives|MVT|-50|0|", "Indian/Mauritius|MUT|-40|0|", "Indian/Reunion|RET|-40|0|", "Kwajalein|MHT|-c0|0|", "MET|MET MEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "NZ-CHAT|CHADT CHAST|-dJ -cJ|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00", "Pacific/Apia|SST SDT WSDT WSST|b0 a0 -e0 -d0|01012323232323232323232|1Dbn0 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00", "Pacific/Bougainville|PGT BST|-a0 -b0|01|1NwE0", "Pacific/Chuuk|CHUT|-a0|0|", "Pacific/Efate|VUT|-b0|0|", "Pacific/Enderbury|PHOT|-d0|0|", "Pacific/Fakaofo|TKT TKT|b0 -d0|01|1Gfn0", "Pacific/Fiji|FJST FJT|-d0 -c0|01010101010101010101010|1BWe0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 xA0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1SM0", "Pacific/Funafuti|TVT|-c0|0|", "Pacific/Galapagos|GALT|60|0|", "Pacific/Gambier|GAMT|90|0|", "Pacific/Guadalcanal|SBT|-b0|0|", "Pacific/Guam|ChST|-a0|0|", "Pacific/Kiritimati|LINT|-e0|0|", "Pacific/Kosrae|KOST|-b0|0|", "Pacific/Marquesas|MART|9u|0|", "Pacific/Midway|SST|b0|0|", "Pacific/Nauru|NRT|-c0|0|", "Pacific/Niue|NUT|b0|0|", "Pacific/Norfolk|NFT|-bu|0|", "Pacific/Noumea|NCT|-b0|0|", "Pacific/Palau|PWT|-90|0|", "Pacific/Pohnpei|PONT|-b0|0|", "Pacific/Port_Moresby|PGT|-a0|0|", "Pacific/Rarotonga|CKT|a0|0|", "Pacific/Tahiti|TAHT|a0|0|", "Pacific/Tarawa|GILT|-c0|0|", "Pacific/Tongatapu|TOT|-d0|0|", "Pacific/Wake|WAKT|-c0|0|", "Pacific/Wallis|WFT|-c0|0|"],
		links: ["Africa/Abidjan|Africa/Accra", "Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Bissau", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Monrovia", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Sao_Tome", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|America/Danmarkshavn", "Africa/Abidjan|Atlantic/Reykjavik", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Abidjan|Etc/GMT", "Africa/Abidjan|Etc/GMT+0", "Africa/Abidjan|Etc/GMT-0", "Africa/Abidjan|Etc/GMT0", "Africa/Abidjan|Etc/Greenwich", "Africa/Abidjan|GMT", "Africa/Abidjan|GMT+0", "Africa/Abidjan|GMT-0", "Africa/Abidjan|GMT0", "Africa/Abidjan|Greenwich", "Africa/Abidjan|Iceland", "Africa/Addis_Ababa|Africa/Asmara", "Africa/Addis_Ababa|Africa/Asmera", "Africa/Addis_Ababa|Africa/Dar_es_Salaam", "Africa/Addis_Ababa|Africa/Djibouti", "Africa/Addis_Ababa|Africa/Juba", "Africa/Addis_Ababa|Africa/Kampala", "Africa/Addis_Ababa|Africa/Khartoum", "Africa/Addis_Ababa|Africa/Mogadishu", "Africa/Addis_Ababa|Africa/Nairobi", "Africa/Addis_Ababa|Indian/Antananarivo", "Africa/Addis_Ababa|Indian/Comoro", "Africa/Addis_Ababa|Indian/Mayotte", "Africa/Algiers|Africa/Tunis", "Africa/Bangui|Africa/Brazzaville", "Africa/Bangui|Africa/Douala", "Africa/Bangui|Africa/Kinshasa", "Africa/Bangui|Africa/Lagos", "Africa/Bangui|Africa/Libreville", "Africa/Bangui|Africa/Luanda", "Africa/Bangui|Africa/Malabo", "Africa/Bangui|Africa/Ndjamena", "Africa/Bangui|Africa/Niamey", "Africa/Bangui|Africa/Porto-Novo", "Africa/Blantyre|Africa/Bujumbura", "Africa/Blantyre|Africa/Gaborone", "Africa/Blantyre|Africa/Harare", "Africa/Blantyre|Africa/Kigali", "Africa/Blantyre|Africa/Lubumbashi", "Africa/Blantyre|Africa/Lusaka", "Africa/Blantyre|Africa/Maputo", "Africa/Cairo|Egypt", "Africa/Casablanca|Africa/El_Aaiun", "Africa/Ceuta|Arctic/Longyearbyen", "Africa/Ceuta|Atlantic/Jan_Mayen", "Africa/Ceuta|CET", "Africa/Ceuta|Europe/Amsterdam", "Africa/Ceuta|Europe/Andorra", "Africa/Ceuta|Europe/Belgrade", "Africa/Ceuta|Europe/Berlin", "Africa/Ceuta|Europe/Bratislava", "Africa/Ceuta|Europe/Brussels", "Africa/Ceuta|Europe/Budapest", "Africa/Ceuta|Europe/Busingen", "Africa/Ceuta|Europe/Copenhagen", "Africa/Ceuta|Europe/Gibraltar", "Africa/Ceuta|Europe/Ljubljana", "Africa/Ceuta|Europe/Luxembourg", "Africa/Ceuta|Europe/Madrid", "Africa/Ceuta|Europe/Malta", "Africa/Ceuta|Europe/Monaco", "Africa/Ceuta|Europe/Oslo", "Africa/Ceuta|Europe/Paris", "Africa/Ceuta|Europe/Podgorica", "Africa/Ceuta|Europe/Prague", "Africa/Ceuta|Europe/Rome", "Africa/Ceuta|Europe/San_Marino", "Africa/Ceuta|Europe/Sarajevo", "Africa/Ceuta|Europe/Skopje", "Africa/Ceuta|Europe/Stockholm", "Africa/Ceuta|Europe/Tirane", "Africa/Ceuta|Europe/Vaduz", "Africa/Ceuta|Europe/Vatican", "Africa/Ceuta|Europe/Vienna", "Africa/Ceuta|Europe/Warsaw", "Africa/Ceuta|Europe/Zagreb", "Africa/Ceuta|Europe/Zurich", "Africa/Ceuta|Poland", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|America/Juneau", "America/Anchorage|America/Nome", "America/Anchorage|America/Sitka", "America/Anchorage|America/Yakutat", "America/Anchorage|US/Alaska", "America/Anguilla|America/Antigua", "America/Anguilla|America/Aruba", "America/Anguilla|America/Barbados", "America/Anguilla|America/Blanc-Sablon", "America/Anguilla|America/Curacao", "America/Anguilla|America/Dominica", "America/Anguilla|America/Grenada", "America/Anguilla|America/Guadeloupe", "America/Anguilla|America/Kralendijk", "America/Anguilla|America/Lower_Princes", "America/Anguilla|America/Marigot", "America/Anguilla|America/Martinique", "America/Anguilla|America/Montserrat", "America/Anguilla|America/Port_of_Spain", "America/Anguilla|America/Puerto_Rico", "America/Anguilla|America/Santo_Domingo", "America/Anguilla|America/St_Barthelemy", "America/Anguilla|America/St_Kitts", "America/Anguilla|America/St_Lucia", "America/Anguilla|America/St_Thomas", "America/Anguilla|America/St_Vincent", "America/Anguilla|America/Tortola", "America/Anguilla|America/Virgin", "America/Argentina/Buenos_Aires|America/Argentina/Catamarca", "America/Argentina/Buenos_Aires|America/Argentina/ComodRivadavia", "America/Argentina/Buenos_Aires|America/Argentina/Cordoba", "America/Argentina/Buenos_Aires|America/Argentina/Jujuy", "America/Argentina/Buenos_Aires|America/Argentina/La_Rioja", "America/Argentina/Buenos_Aires|America/Argentina/Mendoza", "America/Argentina/Buenos_Aires|America/Argentina/Rio_Gallegos", "America/Argentina/Buenos_Aires|America/Argentina/Salta", "America/Argentina/Buenos_Aires|America/Argentina/San_Juan", "America/Argentina/Buenos_Aires|America/Argentina/San_Luis", "America/Argentina/Buenos_Aires|America/Argentina/Tucuman", "America/Argentina/Buenos_Aires|America/Argentina/Ushuaia", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Buenos_Aires|America/Catamarca", "America/Argentina/Buenos_Aires|America/Cordoba", "America/Argentina/Buenos_Aires|America/Jujuy", "America/Argentina/Buenos_Aires|America/Mendoza", "America/Argentina/Buenos_Aires|America/Rosario", "America/Atikokan|America/Cayman", "America/Atikokan|America/Coral_Harbour", "America/Atikokan|America/Jamaica", "America/Atikokan|America/Panama", "America/Atikokan|EST", "America/Atikokan|Jamaica", "America/Belem|America/Fortaleza", "America/Belem|America/Maceio", "America/Belem|America/Recife", "America/Belem|America/Santarem", "America/Belize|America/Costa_Rica", "America/Belize|America/El_Salvador", "America/Belize|America/Guatemala", "America/Belize|America/Managua", "America/Belize|America/Regina", "America/Belize|America/Swift_Current", "America/Belize|America/Tegucigalpa", "America/Belize|Canada/East-Saskatchewan", "America/Belize|Canada/Saskatchewan", "America/Boa_Vista|America/Manaus", "America/Boa_Vista|America/Porto_Velho", "America/Boa_Vista|Brazil/West", "America/Boise|America/Cambridge_Bay", "America/Boise|America/Denver", "America/Boise|America/Edmonton", "America/Boise|America/Inuvik", "America/Boise|America/Ojinaga", "America/Boise|America/Shiprock", "America/Boise|America/Yellowknife", "America/Boise|Canada/Mountain", "America/Boise|MST7MDT", "America/Boise|Navajo", "America/Boise|US/Mountain", "America/Campo_Grande|America/Cuiaba", "America/Cancun|America/Merida", "America/Cancun|America/Mexico_City", "America/Cancun|America/Monterrey", "America/Cancun|Mexico/General", "America/Chicago|America/Indiana/Knox", "America/Chicago|America/Indiana/Tell_City", "America/Chicago|America/Knox_IN", "America/Chicago|America/Matamoros", "America/Chicago|America/Menominee", "America/Chicago|America/North_Dakota/Center", "America/Chicago|America/North_Dakota/New_Salem", "America/Chicago|America/Rainy_River", "America/Chicago|America/Rankin_Inlet", "America/Chicago|America/Resolute", "America/Chicago|America/Winnipeg", "America/Chicago|CST6CDT", "America/Chicago|Canada/Central", "America/Chicago|US/Central", "America/Chicago|US/Indiana-Starke", "America/Chihuahua|America/Mazatlan", "America/Chihuahua|Mexico/BajaSur", "America/Creston|America/Dawson_Creek", "America/Creston|America/Hermosillo", "America/Creston|America/Phoenix", "America/Creston|MST", "America/Creston|US/Arizona", "America/Dawson|America/Ensenada", "America/Dawson|America/Los_Angeles", "America/Dawson|America/Tijuana", "America/Dawson|America/Vancouver", "America/Dawson|America/Whitehorse", "America/Dawson|Canada/Pacific", "America/Dawson|Canada/Yukon", "America/Dawson|Mexico/BajaNorte", "America/Dawson|PST8PDT", "America/Dawson|US/Pacific", "America/Dawson|US/Pacific-New", "America/Detroit|America/Fort_Wayne", "America/Detroit|America/Indiana/Indianapolis", "America/Detroit|America/Indiana/Marengo", "America/Detroit|America/Indiana/Petersburg", "America/Detroit|America/Indiana/Vevay", "America/Detroit|America/Indiana/Vincennes", "America/Detroit|America/Indiana/Winamac", "America/Detroit|America/Indianapolis", "America/Detroit|America/Iqaluit", "America/Detroit|America/Kentucky/Louisville", "America/Detroit|America/Kentucky/Monticello", "America/Detroit|America/Louisville", "America/Detroit|America/Montreal", "America/Detroit|America/Nassau", "America/Detroit|America/New_York", "America/Detroit|America/Nipigon", "America/Detroit|America/Pangnirtung", "America/Detroit|America/Thunder_Bay", "America/Detroit|America/Toronto", "America/Detroit|Canada/Eastern", "America/Detroit|EST5EDT", "America/Detroit|US/East-Indiana", "America/Detroit|US/Eastern", "America/Detroit|US/Michigan", "America/Eirunepe|America/Porto_Acre", "America/Eirunepe|America/Rio_Branco", "America/Eirunepe|Brazil/Acre", "America/Glace_Bay|America/Halifax", "America/Glace_Bay|America/Moncton", "America/Glace_Bay|America/Thule", "America/Glace_Bay|Atlantic/Bermuda", "America/Glace_Bay|Canada/Atlantic", "America/Havana|Cuba", "America/Metlakatla|Pacific/Pitcairn", "America/Noronha|Brazil/DeNoronha", "America/Santiago|Antarctica/Palmer", "America/Santiago|Chile/Continental", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "Antarctica/McMurdo|Antarctica/South_Pole", "Antarctica/McMurdo|NZ", "Antarctica/McMurdo|Pacific/Auckland", "Asia/Aden|Asia/Baghdad", "Asia/Aden|Asia/Bahrain", "Asia/Aden|Asia/Kuwait", "Asia/Aden|Asia/Qatar", "Asia/Aden|Asia/Riyadh", "Asia/Aqtau|Asia/Aqtobe", "Asia/Ashgabat|Asia/Ashkhabad", "Asia/Bangkok|Asia/Ho_Chi_Minh", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Saigon", "Asia/Bangkok|Asia/Vientiane", "Asia/Calcutta|Asia/Colombo", "Asia/Calcutta|Asia/Kolkata", "Asia/Chongqing|Asia/Chungking", "Asia/Chongqing|Asia/Harbin", "Asia/Chongqing|Asia/Macao", "Asia/Chongqing|Asia/Macau", "Asia/Chongqing|Asia/Shanghai", "Asia/Chongqing|Asia/Taipei", "Asia/Chongqing|PRC", "Asia/Chongqing|ROC", "Asia/Dacca|Asia/Dhaka", "Asia/Dubai|Asia/Muscat", "Asia/Hong_Kong|Hongkong", "Asia/Istanbul|Europe/Istanbul", "Asia/Istanbul|Turkey", "Asia/Jakarta|Asia/Pontianak", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kashgar|Asia/Urumqi", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kuala_Lumpur|Asia/Kuching", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Nicosia|EET", "Asia/Nicosia|Europe/Athens", "Asia/Nicosia|Europe/Bucharest", "Asia/Nicosia|Europe/Chisinau", "Asia/Nicosia|Europe/Helsinki", "Asia/Nicosia|Europe/Kiev", "Asia/Nicosia|Europe/Mariehamn", "Asia/Nicosia|Europe/Nicosia", "Asia/Nicosia|Europe/Riga", "Asia/Nicosia|Europe/Sofia", "Asia/Nicosia|Europe/Tallinn", "Asia/Nicosia|Europe/Tiraspol", "Asia/Nicosia|Europe/Uzhgorod", "Asia/Nicosia|Europe/Vilnius", "Asia/Nicosia|Europe/Zaporozhye", "Asia/Pyongyang|Asia/Seoul", "Asia/Pyongyang|ROK", "Asia/Samarkand|Asia/Tashkent", "Asia/Singapore|Singapore", "Asia/Tehran|Iran", "Asia/Thimbu|Asia/Thimphu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Atlantic/Canary|Atlantic/Faeroe", "Atlantic/Canary|Atlantic/Faroe", "Atlantic/Canary|Atlantic/Madeira", "Atlantic/Canary|Europe/Lisbon", "Atlantic/Canary|Portugal", "Atlantic/Canary|WET", "Australia/ACT|Australia/Canberra", "Australia/ACT|Australia/Currie", "Australia/ACT|Australia/Hobart", "Australia/ACT|Australia/Melbourne", "Australia/ACT|Australia/NSW", "Australia/ACT|Australia/Sydney", "Australia/ACT|Australia/Tasmania", "Australia/ACT|Australia/Victoria", "Australia/Adelaide|Australia/Broken_Hill", "Australia/Adelaide|Australia/South", "Australia/Adelaide|Australia/Yancowinna", "Australia/Brisbane|Australia/Lindeman", "Australia/Brisbane|Australia/Queensland", "Australia/Darwin|Australia/North", "Australia/LHI|Australia/Lord_Howe", "Australia/Perth|Australia/West", "Chile/EasterIsland|Pacific/Easter", "Eire|Europe/Dublin", "Etc/UCT|UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Belfast|Europe/Guernsey", "Europe/Belfast|Europe/Isle_of_Man", "Europe/Belfast|Europe/Jersey", "Europe/Belfast|Europe/London", "Europe/Belfast|GB", "Europe/Belfast|GB-Eire", "Europe/Moscow|W-SU", "HST|Pacific/Honolulu", "HST|Pacific/Johnston", "HST|US/Hawaii", "Kwajalein|Pacific/Kwajalein", "Kwajalein|Pacific/Majuro", "NZ-CHAT|Pacific/Chatham", "Pacific/Chuuk|Pacific/Truk", "Pacific/Chuuk|Pacific/Yap", "Pacific/Guam|Pacific/Saipan", "Pacific/Midway|Pacific/Pago_Pago", "Pacific/Midway|Pacific/Samoa", "Pacific/Midway|US/Samoa", "Pacific/Pohnpei|Pacific/Ponape"]
	}), a
});
!
function(a) {
	var b = /iPhone/i,
		c = /iPod/i,
		d = /iPad/i,
		e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
		f = /Android/i,
		g = /IEMobile/i,
		h = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
		i = /BlackBerry/i,
		j = /BB10/i,
		k = /Opera Mini/i,
		l = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
		m = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
		n = function(a, b) {
			return a.test(b)
		},
		o = function(a) {
			var o = a || navigator.userAgent;
			return this.apple = {
				phone: n(b, o),
				ipod: n(c, o),
				tablet: n(d, o),
				device: n(b, o) || n(c, o) || n(d, o)
			}, this.android = {
				phone: n(e, o),
				tablet: !n(e, o) && n(f, o),
				device: n(e, o) || n(f, o)
			}, this.windows = {
				phone: n(g, o),
				tablet: n(h, o),
				device: n(g, o) || n(h, o)
			}, this.other = {
				blackberry: n(i, o),
				blackberry10: n(j, o),
				opera: n(k, o),
				firefox: n(l, o),
				device: n(i, o) || n(j, o) || n(k, o) || n(l, o)
			}, this.seven_inch = n(m, o), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0
		},
		p = function() {
			var a = new o;
			return a.Class = o, a
		};
	"undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = o : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = p() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = p()) : a.isMobile = p()
}(this);

function log(e) {
	console.log(e)
}
function inArray(e, n) {
	for (var t = n.length, i = 0; t > i; i++) if (n[i] == e) return !0;
	return !1
}
function strstr(e, n, t) {
	var i = 0;
	return e += "", i = e.indexOf(n), -1 == i ? !1 : "undefined" == typeof t ? e.slice(i) : !0
}
function strpos(e, n, t) {
	var i = (e + "").indexOf(n, t || 0);
	return -1 === i ? !1 : i
}
function substr(e, n, t) {
	var i = 0,
		o = !0,
		r = 0,
		a = 0,
		s = 0,
		d = "";
	e += "";
	var c = e.length;
	switch (this.php_js = this.php_js || {}, this.php_js.ini = this.php_js.ini || {}, this.php_js.ini["unicode.semantics"] && this.php_js.ini["unicode.semantics"].local_value.toLowerCase()) {
	case "on":
		for (i = 0; i < e.length; i++) if (/[\uD800-\uDBFF]/.test(e.charAt(i)) && /[\uDC00-\uDFFF]/.test(e.charAt(i + 1))) {
			o = !1;
			break
		}
		if (!o) {
			if (0 > n) for (i = c - 1, r = n += c; i >= r; i--) / [\uDC00 - \uDFFF] / .test(e.charAt(i)) && /[\uD800-\uDBFF]/.test(e.charAt(i - 1)) && (n--, r--);
			else for (var l = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; null != l.exec(e);) {
				var u = l.lastIndex;
				if (!(n > u - 2)) break;
				n++
			}
			if (n >= c || 0 > n) return !1;
			if (0 > t) {
				for (i = c - 1, a = c += t; i >= a; i--) / [\uDC00 - \uDFFF] / .test(e.charAt(i)) && /[\uD800-\uDBFF]/.test(e.charAt(i - 1)) && (c--, a--);
				return n > c ? !1 : e.slice(n, c)
			}
			for (s = n + t, i = n; s > i; i++) d += e.charAt(i), /[\uD800-\uDBFF]/.test(e.charAt(i)) && /[\uDC00-\uDFFF]/.test(e.charAt(i + 1)) && s++;
			return d
		}
	case "off":
	default:
		return 0 > n && (n += c), c = "undefined" == typeof t ? c : 0 > t ? t + c : t + n, n >= e.length || 0 > n || n > c ? !1 : e.slice(n, c)
	}
	return void 0
}
function isset(e) {
	return "udefined" == typeof e ? !1 : !0
}
function scrollTo(e) {
	e = $.extend({
		offset: 0,
		duration: 777,
		callback: function() {}
	}, e), $("html:not(:animated),body:not(:animated)").animate({
		scrollTop: e.offset
	}, {
		duration: e.duration,
		complete: function() {
			e.callback()
		}
	})
}
function rotate(e, n) {
	$(e).css({
		"-webkit-transform": "rotate(" + n + "deg)",
		"-moz-transform": "rotate(" + n + "deg)",
		"-ms-transform": "rotate(" + n + "deg)",
		"-o-transform": "rotate(" + n + "deg)",
		transform: "rotate(" + n + "deg)",
		zoom: 1
	})
}
function makeHash(e) {
	window.location.hash = "#!" + e
}
function removeAccent(e) {
	for (var n = ["ά", "έ", "ή", "ί", "ό", "ύ", "ώ", "Ά", "Έ", "Ή", "Ί", "Ό", "Ύ", "Ώ", "ς", "À", "Â", "Á", "Ã", "Ä", "Ç", "È", "É", "Ê", "Ë", "Î", "Ò", "Ó", "Ô", "Õ", "Ö", "Ù", "Ú", "Û", "à", "à", "á", "â", "ã", "ä", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ò", "ó", "ô", "õ", "ù", "ú", "û", "ü"], t = ["α", "ε", "η", "ι", "ο", "υ", "ω", "Α", "Ε", "Η", "Ι", "Ο", "Υ", "Ω", "Σ", "A", "A", "A", "A", "A", "C", "E", "E", "E", "E", "I", "O", "O", "O", "O", "O", "U", "U", "U", "a", "a", "a", "a", "a", "a", "c", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "u", "u", "u", "u"], i = [], o = 0; o <= e.length - 1; o++) i[o] = n.indexOf(e[o]) >= 0 ? t[n.indexOf(e[o])] : e[o];
	return i.join("")
}
function doUppercase(e) {
	e = this.removeAccent(e);
	for (var n = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "ς"], t = ["Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω", "Σ"], i = [], o = 0; o <= e.length - 1; o++) i[o] = n.indexOf(e[o]) >= 0 ? t[n.indexOf(e[o])] : e[o];
	return i.join("").replace("&AMP;", "&amp;")
}
function resize() {
	homepage ? Modernizr.backgroundsize || resize_gal(".ie-image-cover") : fixMenuAlignmentInsidePages(), resize_resort_sections(), resizeMapsOverlayContactPage(), $fullHeight.height($(window).height()), $(".photo-fullpage-banner-inner").height(2 * $(window).height() / 3)
}
function openFullScreenSlideshow(e) {
	if ($fullScreenSlideshow.detach().appendTo("#fullscreen-global-container"), $advCustomCaption.detach().appendTo("#fullscreen-global-container"), "undefined" == typeof e && !$.isNumeric(e) && 0 >= e) {
		e = 0;
		var n = $fullScreenSlideshow
	} else var n = $fullScreenSlideshow.filter(function() {
		return $(this).data("id") == e ? $(this).data("id") == e : void 0
	});
	$(document.documentElement).keyup(function(e) {
		39 == e.keyCode && n.cycle("next"), 37 == e.keyCode && n.cycle("prev")
	}), n.cycle("goto", 0), $("#adv-custom-caption" + e).find(".current").html("1"), n.show(function() {
		$(this).toggleClass("open");
		window.setTimeout(function() {
			$("#adv-custom-caption" + e).addClass("open")
		}, 500)
	})
}
function openFullScreenSlideshowByHash(e) {
	return "undefined" == typeof e || "" == e ? !1 : (e.indexOf("gallery-") < 0 ? openFullScreenSlideshow() : openFullScreenSlideshow(e.replace("#gallery-", "")), void 0)
}
function closeFullScreenSlideshow() {
	$fullScreenSlideshow.hasClass("open") && ($advCustomCaption.removeClass("open"), window.setTimeout(function() {
		$fullScreenSlideshow.removeClass("open"), window.setTimeout(function() {
			$fullScreenSlideshow.hide()
		}, 500)
	}, 500))
}
function resize_resort_sections() {
	resize_gal()
}
function resize_gal(e) {
	"undefined" == typeof e && (e = ".resorts-image-centered, .image-centered");
	var n = $(e);
	if (n.show(), n.hasClass("resorts-image-centered")) var t = 725,
		i = 800;
	else var t = 1450,
		i = 800;
	var o = i / t,
		r = t / i;
	if (n.hasClass("resorts-image-centered")) var a = $(window).width() / 2,
		s = $(window).height();
	else var a = $(window).width(),
		s = $(window).height();
	if (o > s / a) {
		n.width(a), n.height(o * a);
		var d = a,
			c = o * a
	} else {
		n.height(s), n.width(r * s);
		var d = r * s,
			c = s
	}
	var l = Math.abs(c / 2),
		u = Math.abs(d / 2);
	n.css({
		marginTop: "-" + l + "px",
		marginLeft: "-" + u + "px",
		left: "50%",
		top: "50%"
	})
}
function fixMenuAlignmentInsidePages() {
	if ($thirdMenuInner.find("li.active").length > 0 || $secondMenuInner.find("li.active").length > 0) {
		var e = ("" != $mainMenuInnerActiveLI ? $mainMenuInnerActiveLI.position().left : 0) + $mainMenuInnerActiveLI.width() / 2 - $secondMenuInner.find("li.active").width() / 2;
		(e < $mainMenuInnerFirstLI.position().left || e < $mainMenuInnerActiveLI.width() / 2 + $mainMenuInnerFirstLI.position().left) && (e = $mainMenuInnerFirstLI.position().left), e + $secondMenuInner.find("li.active").width() / 2 > $mainMenuInnerFirstLI.parents(".main-menu-inner").width() - $secondMenuInner.find("li.active").width() && (e = $mainMenuInnerFirstLI.parents(".main-menu-inner").width() - $secondMenuInner.find("li.active").width()), $secondMenuInner.css({
			left: e + "px"
		}), $thirdMenuInner.css({
			left: $mainMenuInnerFirstLI.position().left + parseInt($mainMenuInnerFirstLI.css("margin-left").replace("px", "")) + "px"
		}), $secondMenuInner.addClass("open"), $thirdMenuInner.addClass("open")
	}
}
function resizeMapsOverlayContactPage() {
	$(".overlay-map").width($(window).width() - ($(".website-fixed-borders .left").width() + $(".website-fixed-borders .right").width())).height($(window).height() - ($(".website-fixed-borders .top").height() + $(".website-fixed-borders .bottom").height())).css({
		left: $(".website-fixed-borders .left").width(),
		top: $(".website-fixed-borders .top").height()
	}), $(".view-the-map").click(function() {
		$(".overlay-map").addClass("open")
	}), $(".close-map").click(function() {
		$(".overlay-map").removeClass("open")
	})
}
function getCurrentMonth() {
	return date = new Date, date.getMonth(), $.isNumeric(date.getMonth()) ? date.getMonth() : 0
}
function isTouchDevice() {
	return $("html").hasClass("touch") ? !0 : !1
}
function costaNavarinoAccordion() {
	$(".dining-category-title").click(function() {
		if ($(this).parent(".dining-category-item").hasClass("active")) $(".dining-category-item").removeClass("active"), $(".dining-category-items").slideUp();
		else {
			$(".dining-category-item").removeClass("active"), $(".dining-category-items").slideUp();
			var e = $(this);
			e.parent(".dining-category-item").addClass("active"), e.next().slideDown(400, function() {
				$("html,body").animate({
					scrollTop: e.parent(".dining-category-item").offset().top - $(".submenu-container").height()
				}, 800)
			})
		}
	})
}
function handleMainMenuColors(e) {
	var n = 10;
	"undefined" == typeof e && (e = !1);
	var t = $(window).scrollTop();
	if (t > 0 && !homepage || e && !homepage) {
		if ($(".calendar-gb").length > 0) return $(".submenu-container .bg.calendar").addClass("open"), void 0;
		$fixedContainerInnerPages.length > 0 && t > $(window).height() - n ? $("body").addClass("brown-top-menu") : $fixedContainerInnerPages.length > 0 ? $("body").removeClass("brown-top-menu") : $("body").addClass("brown-top-menu brown-top-menu--force")
	} else $("body").removeClass("brown-top-menu"), $(".submenu-container .bg.calendar").removeClass("open")
}
function showHomePageContect() {
	$("body.hiddenPage").removeClass("active")
}
if (!1 in window || "undefined" == typeof console) {
	var methods = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"],
		emptyFn = function() {};
	window.console = {};
	for (var i = 0; i < methods.length; ++i) window.console[methods[i]] = emptyFn
}
$.fn.serializeObject = function() {
	var e = {},
		n = this.serializeArray();
	return $.each(n, function() {
		void 0 !== e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]), e[this.name].push(this.value || "")) : e[this.name] = this.value || ""
	}), e
}, $.createCache = function(e) {
	var n = {};
	return function(t, i) {
		return n[t] || (n[t] = $.Deferred(function(n) {
			e(n, t)
		}).promise()), n[t].done(i)
	}
}, $.loadImage = $.createCache(function(e, n) {
	function t() {
		i.onload = i.onerror = null
	}
	var i = new Image;
	e.then(t, t), i.onload = function() {
		e.resolve(n)
	}, i.onerror = e.reject, i.src = n
});
!
function(t) {
	function e() {
		var e = t(this).data("target"),
			i = a.filter("[data-id='" + e + "']"),
			n = i.find(o);
		if (text_container_init_height = i.data("height"), "" == text_container_init_height && (text_container_init_height = i.height(), i.attr("data-height", text_container_init_height)), i.height() > text_container_init_height) i.stop().animate({
			height: text_container_init_height
		}, {
			duration: 377,
			complete: function() {
				h.after()
			}
		}), t(".text", this).html(Translations.toggleMore), t(".icon", this).hide().toggleClass(h.openClass);
		else {
			i.stop().animate({
				height: n.height()
			}, {
				duration: 377,
				complete: function() {
					h.after()
				}
			}), t(".text", this).html(Translations.toggleLess), t(".icon", this).show().toggleClass(h.openClass);
			var s = i.attr("data-href");
			isset(s) && makeHash(s)
		}
	}
	function i(t, e) {
		e = "undefined" != typeof e ? e : "";
		var i = '<span class="' + h.toogleButtonClass + ' toggle-text-button"><span class="sprite-arrow-horizontal-small-brown graphic"></span><span class="text">' + t + "</span></span>";
		return i
	}
	var n = "",
		a = "",
		o = "",
		h = {};
	t.fn.toggleText = function(s) {
		h = t.extend({
			openText: "Read more",
			closeText: "Read less",
			openClass: "open",
			iconText: "",
			height: 162,
			position: "relative",
			overflow: "hidden",
			marginBottom: 13,
			autoheightStyle: {
				height: "auto",
				overflow: "visible"
			},
			toogleButtonClass: "more-link",
			after: function() {}
		}, s), a = t(this), a.css({
			height: h.height,
			position: h.position,
			overflow: h.overflow,
			marginBottom: h.marginBottom
		});
		var r = i(h.openText, h.iconText);
		a.each(function() {
			t(this).wrapInner('<div class="text-container-inner" />'), t(this).after(r)
		}), o = t(".text-container-inner"), a.each(function() {
			var e = t(this).data("id");
			n = t(this).next(".toggle-text-button"), n.attr("data-target", e), textContainer_height = t(this).height(), textContainer_inner_height = t(this).find(o).height(), textContainer_height + 30 >= textContainer_inner_height && (t(this).css(h.autoheightStyle), n.filter('[data-target="' + e + '"]').css("display", "none")), t(this).attr("data-height", textContainer_height), n.find(".icon").hide()
		}), n = t(".toggle-text-button"), n.on("click", e)
	}
}(jQuery);
!
function(e) {
	function r() {
		if (-1 != window.location.href.indexOf("#!") && (hash = window.location.hash.replace("#!", ""), strpos(hash, "form-") !== !1)) for (i = 0; i < o.targetIdPrefix.length; i++) if (formId = hash.split("-"), f = "#" + o.targetIdPrefix[i] + formId[1], "newsletterCampaignMonitor" == formId[1] && e(".item.footer-newsletter.md-trigger").trigger("click"), e(f).length > 0) return f;
		return !1
	}
	var t = "",
		o = {},
		f = "";
	e.fn.flashMessage = function(i) {
		if (o = e.extend({
			targetIdPrefix: ["ContactFormAddon", "CmsNewsletter", "GuestbookReview", "QuestionnaireAnswer", "newsletterform-newsletterCampaignMonitor"],
			before: !1
		}, i), t = e(this), 0 == (f = r())) return !0;
		if (o.before !== !1) {
			var n = e(o.before).offset().top - 100;
			f = o.before
		} else var n = e(f).offset().top - 100;
		return scrollTo({
			offset: n
		}), e(f).before(t), t.show(), makeHash(""), !0
	}
}(jQuery);
if ("undefined" == typeof homepage) var homepage = !1;
var Translations = {
	booknow: "Book now",
	toggleMore: "Read more",
	toggleLess: "Read less"
};
$fullHeight = $(".full-height"), $navigation = $(".navigation"), $bookBuyButtonHolder = $(".book-n-buy-holder"), $nsRadioButton = $(".ns-radio-button"), $nsLoader = $(".form-loader"), $footerNewsInner = $(".footer-news-inner .open-container, .footer-news-inner .close-container"), $newsSlideshow = $("#news-slideshow"), $discoverMoreButton = $(".discover-more-button"), $nsCountry = $("#nsCountry"), $calendarBgContainer = $(".calendar-bg-container"), $calendarYearContainer = $(".calendar-year-container"), $calendarMonth = $("#calendar_month"), $fixedContainerInnerPages = $(".fixed-container-inner-pages"), $fixedContainerInnerPagesCloseButton = $(".fixed-container-inner-pages-close-button"), $submenuContainerBg = $(".submenu-container .bg"), $calendarPage = $(".calendar-page"), $fullScreenSlideshow = $(".full-screen-slideshow"), $advCustomCaption = $(".adv-custom-caption"), $closeButtonFullScreen = $(".close-button.full-screen"), $openFullscreenGallery = $(".open-fullscreen-gallery"), $mainMenuInnerFirstLI = $(".main-menu-inner > ul > li:first-child").find("a").length <= 0 ? $(".main-menu-inner > ul > li:eq(1)").find("a") : $(".main-menu-inner > ul > li:first-child").find("a"), $mainMenuInnerActiveLI = $(".main-menu-inner > ul > li.active").find("a"), $secondMenuInner = $(".inner-pages-menu-inner .second-level"), $thirdMenuInner = $(".inner-pages-menu-inner .third-level"), $uiTabs = $("#tabs"), $textLimit = $(".text-limit"), $playlistCustomPlay = $("#custom-play"), $playlistCustomPause = $("#custom-pause"), $playlistCustomStop = $("#custom-stop"), $playlistCustomPrev = $("#custom-prev"), $playlistCustomNext = $("#custom-next"), $playlistPrevious = $(".jp-previous"), $playlistNext = $(".jp-next"), $playlistPlay = $(".jp-play"), $playlistPause = $(".jp-pause"), $playlistStop = $(".jp-stop"), $galleryCategoryLink = $(".gallery-category-link"), $(window).on("load", function() {
	function e(e) {
		e.text && $("#sb-caption").text(e.text), 0 == $(".music-player-holder").hasClass("stop") && "undefined" != typeof myPlaylist && myPlaylist.pause()
	}
	if ("undefined" != typeof window.Shadowbox) {
		Shadowbox.skin.markup = ['<div id="sb-container">', '<div id="sb-overlay"></div>', '<div id="sb-wrapper">', '<a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()">', '<i class="icon icon-shadowbox-close"></i>', "</a>", '<a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()">', '<i class="icon icon-shadowbox-prev"></i>', "</a>", '<a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()">', '<i class="icon icon-shadowbox-next"></i>', "</a>", '<div id="sb-loading">', '<div id="sb-loading-inner">', "<span>{loading}</span>", "</div>", "</div>", '<div id="sb-wrapper-inner">', '<div id="sb-body">', '<div id="sb-body-inner"></div>', '<div id="sb-info">', '<div id="sb-info-inner">', '<div id="sb-counter"></div>', '<div id="sb-title">', '<h3 id="sb-title-inner"></h3>', "</div>", '<div id="sb-caption"></div>', '<div id="sb-nav">', "</div>", "</div>", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
		Shadowbox.init({
			overlayOpacity: 1,
			overlayColor: "#312a24",
			continuous: !0,
			viewportPadding: 80,
			onChange: e,
			onOpen: e,
			onClose: function() {
				("undefined" == typeof $.cookie("music_stopped") || "undefined" != typeof $.cookie("music_stopped") && "true" != $.cookie("music_stopped")) && "undefined" != typeof myPlaylist && myPlaylist.play()
			}
		}), isMobile.apple.phone && $('meta[name="viewport"]').attr("content", "width=1050, initial-scale=0, maximum-scale=1")
	}
});
$(window).ready(function() {
	$("body").addClass("ready")
}), $(window).ready(function() {
	"undefined" == typeof $.cookie("loaderIsLoaded") ? ("undefined" == typeof initIntro || isTouchDevice() ? ($(".loader-overlay").removeClass("open"), "function" == typeof initHomepageScroll && initHomepageScroll()) : ("Explorer" == BrowserDetect.browser && BrowserDetect.version < 9 && ($(".loader-overlay").removeClass("open"), initHomepageScroll()), $("body").prepend('<div class="loader-overlay open" id="loader-overlay"><div class="loader"><div class="loader-outer sprite-outer"><img src="' + Website.url + 'img/loader/inner.png" style="display: none;" /><img src="' + Website.url + 'img/loader/inner.png" style="display: none;" /><div class="loader-inner sprite-inner"></div></div></div></div>'), imagesLoaded("#loader-overlay", function() {
		showHomePageContect(), initIntro()
	})), $.cookie("loaderIsLoaded", !0)) : "true" === $.cookie("loaderIsLoaded") && "function" == typeof initHomepageScroll && initHomepageScroll(), $("html").hasClass("touch") ? $("img.lazy").each(function() {
		$(this).attr("src", $(this).data("original"))
	}) : $("img.lazy").lazyload({
		event: "loadLazyImage"
	}), $("#published_year").on("keypress, keydown, keyup, focusout", function() {
		$(this).trigger("change")
	}), $("#published_year").on("change", function() {
		"" != $(this).val() ? ($(".awards-item").slideUp(200), $('.awards-item[data-published-year="' + $(this).val() + '"]').slideDown(200)) : $(".awards-item").slideDown(200)
	})
}), $(window).on("resize orientationchange", resize), $(window).on("load", function() {
	resize(), BrowserDetect.init(), $bookBuyButtonHolder.find(".button").click(function() {
		$(this).hasClass("expanded") ? ($(this).removeClass("expanded"), $bookBuyButtonHolder.find(".expandable").animate({
			top: -1 * $bookBuyButtonHolder.find(".expandable").height()
		}, 400)) : ($(this).addClass("expanded"), $bookBuyButtonHolder.find(".expandable").animate({
			top: 45
		}, 400))
	}), $bookBuyButtonHolder.find(".close-button").click(function() {
		$bookBuyButtonHolder.find(".button").removeClass("expanded"), $bookBuyButtonHolder.find(".expandable").animate({
			top: -1 * $bookBuyButtonHolder.find(".expandable").height()
		}, 400)
	}), $(document).keyup(function(e) {
		e.stopPropagation(), 27 == e.keyCode && ($bookBuyButtonHolder.find(".button").removeClass("expanded"), $bookBuyButtonHolder.find(".expandable").animate({
			top: -1 * $bookBuyButtonHolder.find(".expandable").height()
		}, 400), $footerNewsInner.parent().hasClass("open") && $footerNewsInner.filter(".close-container").trigger("click"), closeFullScreenSlideshow(), $(".close-map").click())
	}), $footerNewsInner.click(function() {
		$(this).parent().toggleClass("open"), $(this).parent().parent().toggleClass("open")
	}), homepage || ($textLimit.toggleText({
		iconText: '<span class="sprite-arrow-horizontal-small-brown pull-left"></span>',
		marginBottom: 20,
		autoheightStyle: {
			height: "auto",
			overflow: "visible"
		}
	}), $(".full-screen-slideshow").on("cycle-next", function() {
		resize_resort_sections()
	}), $closeButtonFullScreen.click(function() {
		closeFullScreenSlideshow()
	}), "Explorer" == BrowserDetect.browser && BrowserDetect.version < 9 || $openFullscreenGallery.click(function() {
		"undefined" != typeof $(this).data("id") || $.isNumeric($(this).data("id")) ? openFullScreenSlideshow($(this).data("id")) : openFullScreenSlideshow()
	})), "undefined" != typeof tabs && $uiTabs.tabs({
		beforeActivate: function(e, n) {
			$(n.oldPanel).removeClass("open"), $(n.newPanel).addClass("open")
		}
	}), window.setTimeout(function() {
		$calendarYearContainer.animate({
			height: $calendarYearContainer.find(".calendar-events.cycle-slide-active").height() + 80
		}, 0)
	}, 1), $calendarYearContainer.on("cycle-before", function(e, n) {
		$calendarMonth.text($(this).children().eq(n.nextSlide + 1).data("month"))
	}).on("cycle-after", function(e, n) {
		$($(this)).animate({
			height: $(this).find(".calendar-events.cycle-slide-active").height() + 80
		}, 0), $calendarMonth.text($(this).children().eq(n.nextSlide + 1).data("month"))
	}), $galleryCategoryLink.click(function() {
		$(this).parent().parent().find(".gallery-category-more")[0].click()
	}), $("#login_button").parent().parent().on("submit", function(e) {
		e.preventDefault();
		var n = [];
		n[0] = "", n[0].login = "";
		var o = $(this);
		n = o.serializeArray(), "login" == n[0].name && "nestor" == n[0].value ? $(".downloads-after-login-hide").slideUp(400, function() {
			$(".downloads-after-login-show").slideDown(400, function() {
				$(".footer-pages-container").hasClass("hasloginForm") && $(".footer-pages-container").removeClass("hasloginForm")
			})
		}) : (o.find("input").addClass("error"), o.find(".error_message").addClass("show"))
	}), $("#ns_form").on("submit", function() {
		return $(this).parsley("isValid") && $.ajax({
			type: "POST",
			url: $(this).attr("action"),
			data: $(this).serializeObject(),
			dataType: "json",
			cache: !1,
			beforeSend: function() {
				$nsLoader.addClass("open")
			}
		}).done(function(e) {
			$nsLoader.find(".loader").hide(), $nsLoader.find(".text").html(e.message), 200 != e.code ? ($nsLoader.find(".text").addClass("error"), window.setTimeout(function() {
				$nsLoader.removeClass("open"), $nsLoader.find(".loader").show(), $nsLoader.find(".text").html("")
			}, 5e3)) : ($nsLoader.find(".text").addClass("successful"), window.setTimeout(function() {
				$nsLoader.removeClass("open"), $nsLoader.find(".loader").show(), $nsLoader.find(".text").html("")
			}, 15e3))
		}), !1
	}), $calendarPage.length > 0 && $submenuContainerBg.addClass("calendar"), Modernizr.touch && ($(".main-menu-inner .emptyLinkMenu").on("click touchstart MSPointerDown", function(e) {
		return e.preventDefault(), $(".main-menu-inner >ul>li>ul").stop(!0).slideUp(), $(this).parent().find(">ul").stop(!0).slideDown(), !1
	}), $(document).click(function() {
		$(".main-menu-inner >ul>li>ul").stop(!0).slideUp()
	})), openFullScreenSlideshowByHash(window.location.hash), "undefined" != typeof window.location.hash && "#openStoryVideo" == window.location.hash && $('.footer-pages-menu-container a[rel="shadowbox[global_video]"]')[0].click(), $(".main-section.index2 .half-item.left").hover(function() {
		$(".split-screen .split-images-container .col:eq(0)").toggleClass("hovering")
	}), $(".main-section.index2 .half-item.right").hover(function() {
		$(".split-screen .split-images-container .col:eq(1)").toggleClass("hovering")
	});
	var e = $(".main-menu-inner");
	e.find(">ul>li").each(function() {
		$(this).find("ul").length > 0 && $(this).hover(function() {
			$("img.lazy").show().trigger("loadLazyImage"), $(">ul", this).stop(!0, !0).fadeIn(300)
		}, function() {
			$(">ul", this).stop(!0, !0).fadeOut(300)
		})
	}), $(".homepage-horizontal-arrow-pager .item").unbind("click"), $(".homepage-horizontal-arrow-pager .item").click(function() {
		window.open(this.href, "_self")
	}), "?showVideo" == window.location.search && window.setTimeout(function() {
		$(".footer-pages-menu-container ul li ul .first a")[0].click()
	}, 1e3), $(".website-holder").height() > $(window).height() && ($(".back-to-top").click(function() {
		return $("html, body").animate({
			scrollTop: $fixedContainerInnerPages.length > 0 ? $fixedContainerInnerPages.height() : 0
		}, 2e3), !1
	}), $(".back-to-top").show()), $fixedContainerInnerPagesCloseButton.click(function() {
		var e = $fixedContainerInnerPages.parent().next(),
			n = e.next(),
			o = $fixedContainerInnerPages.height(),
			t = e.outerHeight(),
			i = parseInt(n.css("padding-top")),
			a = (o + t + i) / 2;
		(isNaN(a) || a > o) && (a = o), $("html, body").animate({
			scrollTop: a
		}, 900)
	}), costaNavarinoAccordion(), $('[data-modal="modal-newsletter"]').on("click", function() {
		$("#modal-newsletter").addClass("md-show")
	}), $('[data-modal="modal-apps"]').on("click", function(e) {
		e.preventDefault(), $("#modal-apps").addClass("md-show")
	}), $(".modal-newsletter .md-close, .md-overlay").on("click", function() {
		$("#modal-newsletter, #modal-apps").removeClass("md-show")
	}), $(".residences-files-content .item > a").on("click", function(e) {
		e.preventDefault(), $(this).parent().find(".image-container a")[0].click()
	})
}), $(window).scroll(function() {
	$(window).scrollTop() > .6 * $(window).height() ? $(".footer-news-container").addClass("hide") : $(".footer-news-container").removeClass("hide"), handleMainMenuColors()
}), $(window).on("load", function() {
	handleMainMenuColors(!0)
});
var repaintScreen = function() {
		$("#device").css("height", "200px"), setTimeout(function() {
			$("#device").css("height", "0px"), $("<style></style>").appendTo($(document.body)).remove()
		}, 500)
	};
$(document).ready(function() {
	$("body").delegate(".current-language", "touchstart", function() {
		$(this).toggleClass("hovered").trigger("mouseenter");
		try {
			repaintScreen()
		} catch (e) {}
	}), $("body").delegate(".footer-socialize > .text", "touchstart", function() {
		$(this).parent().toggleClass("hovered").trigger("mouseenter");
		try {
			repaintScreen()
		} catch (e) {}
	}), $("body").delegate(".md-trigger", "touchstart", function() {
		try {
			var e = $(this).data("modal");
			$("#" + e).removeClass("md-show")
		} catch (n) {
			alert(n)
		}
		closeFullScreenSlideshow(), repaintScreen()
	})
});
$(window).load(function() {
	"Explorer" == BrowserDetect.browser && BrowserDetect.version < 9 && ($(".logo img").each(function() {
		$(this).attr("src", $(this).attr("src").replace("logo.png", "ie8-logo.png"))
	}), $(".brown-logo img").each(function() {
		$(this).attr("src", $(this).attr("src").replace("brown-logo.png", "ie8-brown-logo.png"))
	}))
}), $(window).scroll(function() {
	"Explorer" == BrowserDetect.browser && BrowserDetect.version < 9
});