'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'progress-circle',
  props: {
    /*
    * @model
    * The value for current progress
    */
    value: {
      type: Number,
      default: 0
    },

    /*
    * Sets the diameter of the circle in pixels
    */
    size: {
      type: Number,
      default: 24
    },

    /*
    * Sets the starting sector angle, in radians
    */
    startAngle: {
      type: Number,
      default: 0
    },

    /*
    * Sets the minimum value needed to normalize the value range.
    */
    minValue: {
      type: Number,
      default: 0
    },

    /*
    * Sets the maximum value needed to normalize the value range.
    */
    maxValue: {
      type: Number,
      default: 100
    },

    /*
    * Sets the svg root tag class name.
    */
    svgClassName: {
      type: String,
      default: ''
    },

    /*
    * Sets the sector class name.
    */
    sectorClassName: {
      type: String,
      default: ''
    },

    /*
    * Sets the sector fill.
    */
    sectorFill: {
      type: String,
      default: '#5B85AA'
    },

    /*
    * Sets the sector stroke.
    */
    sectorStroke: {
      type: String,
      default: 'none'
    },

    /*
    * Sets the sector fill rule.
    */
    sectorFillRule: {
      type: String,
      default: 'evenodd'
    },

    /*
    * Sets the border class name.
    */
    borderClassName: {
      type: String,
      default: ''
    },

    /*border
    * Sets the sector fill.
    */
    borderFill: {
      type: String,
      default: 'none'
    },

    /*
    * Sets the border stroke.
    */
    borderStroke: {
      type: String,
      default: '#414770'
    },

    /*
    * Binds every property of the passed Object as props/attributes of the `svg` component.
    */
    svgCustomProps: {
      type: Object,
      default: function _default() {}
    },

    /*
    * Binds every property of the passed Object as props/attributes of the sector `path` tag.
    */
    sectorCustomProps: {
      type: Object,
      default: function _default() {}
    },

    /*
    * Binds every property of the passed Object as props/attributes of the `circle` tag.
    */
    circleCustomProps: {
      type: Object,
      default: function _default() {}
    }
  },
  computed: {
    componentViewBox: function componentViewBox() {
      return "0 0 ".concat(this.size, " ").concat(this.size);
    },
    circleCenter: function circleCenter() {
      return this.size / 2;
    },
    circleRadius: function circleRadius() {
      return this.circleCenter / 1.02;
    },
    borderWidth: function borderWidth() {
      var border = this.size * 0.02;
      return border < 1 ? 1 : border;
    },
    normalizedRange: function normalizedRange() {
      return Math.min(Math.max(0, (this.value - this.minValue) / (this.maxValue - this.minValue) * 100), 100);
    },
    currentRadiantAngle: function currentRadiantAngle() {
      /*
      * 0.06283 is the conversion rate from percentage to radians
      */
      return this.normalizedRange * 0.06283;
    },
    moveToPath: function moveToPath() {
      return this.polarToCartesian(this.circleCenter, this.circleCenter, this.circleRadius, this.currentRadiantAngle);
    },
    ellipticalArcCurvesCoordinatesPath: function ellipticalArcCurvesCoordinatesPath() {
      return this.polarToCartesian(this.circleCenter, this.circleCenter, this.circleRadius, this.startAngle);
    },
    ellipticalArcCurvesLargeArcFlagPath: function ellipticalArcCurvesLargeArcFlagPath() {
      return this.currentRadiantAngle - this.startAngle <= 3.14 ? '0' : '1';
    },
    path: function path() {
      return "M ".concat(this.moveToPath.x, " ").concat(this.moveToPath.y, " A ").concat(this.circleRadius, " ").concat(this.circleRadius, " 0 ").concat(this.ellipticalArcCurvesLargeArcFlagPath, " 0 ").concat(this.ellipticalArcCurvesCoordinatesPath.x, " ").concat(this.ellipticalArcCurvesCoordinatesPath.y, " L ").concat(this.circleCenter, " ").concat(this.circleCenter, " Z");
    }
  },
  methods: {
    polarToCartesian: function polarToCartesian(centerX, centerY, radius, angleInRadians) {
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', _vm._b({
    staticClass: "vue-progress-circle-svg",
    class: _vm.svgClassName,
    attrs: {
      "viewBox": _vm.componentViewBox,
      "width": _vm.size,
      "height": _vm.size
    }
  }, 'svg', _vm.svgCustomProps, false), [_vm._ssrNode((_vm.value ? "<path" + _vm._ssrAttr("fill", _vm.sectorFill) + _vm._ssrAttr("stroke", _vm.sectorStroke) + _vm._ssrAttr("fill-rule", _vm.sectorFillRule) + _vm._ssrAttr("d", _vm.path) + _vm._ssrAttrs(_vm.sectorCustomProps) + _vm._ssrClass(null, _vm.sectorClassName) + " data-v-352c6438></path>" : "<!---->") + " <circle" + _vm._ssrAttr("cx", _vm.circleCenter) + _vm._ssrAttr("cy", _vm.circleCenter) + _vm._ssrAttr("r", _vm.circleRadius) + _vm._ssrAttr("stroke-width", _vm.borderWidth) + _vm._ssrAttr("fill", _vm.borderFill) + _vm._ssrAttr("stroke", _vm.borderStroke) + _vm._ssrAttrs(_vm.circleCustomProps) + " data-v-352c6438></circle>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-352c6438_0", {
    source: ".vue-progress-circle-svg[data-v-352c6438]{transform:rotate(-90deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-352c6438";
/* module identifier */

var __vue_module_identifier__ = "data-v-352c6438";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('ProgressCircle', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;