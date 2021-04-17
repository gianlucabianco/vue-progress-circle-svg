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
      default: () => {}
    },

    /*
    * Binds every property of the passed Object as props/attributes of the sector `path` tag.
    */
    sectorCustomProps: {
      type: Object,
      default: () => {}
    },

    /*
    * Binds every property of the passed Object as props/attributes of the `circle` tag.
    */
    circleCustomProps: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    componentViewBox() {
      return `0 0 ${this.size} ${this.size}`;
    },

    circleCenter() {
      return this.size / 2;
    },

    circleRadius() {
      return this.circleCenter / 1.02;
    },

    borderWidth() {
      const border = this.size * 0.02;
      return border < 1 ? 1 : border;
    },

    normalizedRange() {
      return Math.min(Math.max(0, (this.value - this.minValue) / (this.maxValue - this.minValue) * 100), 100);
    },

    currentRadiantAngle() {
      /*
      * 0.06283 is the conversion rate from percentage to radians
      */
      return this.normalizedRange * 0.06283;
    },

    moveToPath() {
      return this.polarToCartesian(this.circleCenter, this.circleCenter, this.circleRadius, this.currentRadiantAngle);
    },

    ellipticalArcCurvesCoordinatesPath() {
      return this.polarToCartesian(this.circleCenter, this.circleCenter, this.circleRadius, this.startAngle);
    },

    ellipticalArcCurvesLargeArcFlagPath() {
      return this.currentRadiantAngle - this.startAngle <= 3.14 ? '0' : '1';
    },

    path() {
      return `M ${this.moveToPath.x} ${this.moveToPath.y} A ${this.circleRadius} ${this.circleRadius} 0 ${this.ellipticalArcCurvesLargeArcFlagPath} 0 ${this.ellipticalArcCurvesCoordinatesPath.x} ${this.ellipticalArcCurvesCoordinatesPath.y} L ${this.circleCenter} ${this.circleCenter} Z`;
    }

  },
  methods: {
    polarToCartesian(centerX, centerY, radius, angleInRadians) {
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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
  }, 'svg', _vm.svgCustomProps, false), [_vm.value ? _c('path', _vm._b({
    class: _vm.sectorClassName,
    attrs: {
      "fill": _vm.sectorFill,
      "stroke": _vm.sectorStroke,
      "fill-rule": _vm.sectorFillRule,
      "d": _vm.path
    }
  }, 'path', _vm.sectorCustomProps, false)) : _vm._e(), _vm._v(" "), _c('circle', _vm._b({
    attrs: {
      "cx": _vm.circleCenter,
      "cy": _vm.circleCenter,
      "r": _vm.circleRadius,
      "stroke-width": _vm.borderWidth,
      "fill": _vm.borderFill,
      "stroke": _vm.borderStroke
    }
  }, 'circle', _vm.circleCustomProps, false))]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-352c6438_0", {
    source: ".vue-progress-circle-svg[data-v-352c6438]{transform:rotate(-90deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-352c6438";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('ProgressCircle', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
