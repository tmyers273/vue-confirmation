'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Confirmation = require('./Confirmation.vue');

var _Confirmation2 = _interopRequireDefault(_Confirmation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = {
    install: function install(Vue) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


        if (!this.hasOwnProperty("event")) {
            this.event = new Vue();
        }

        var $confirmation = {
            show: function show(name, params) {
                Plugin.event.$emit('show', name, true, params);
                this.promise = new Promise(function (resolve, reject) {
                    Plugin.event.$off('cancelled');
                    Plugin.event.$off('confirmed');

                    Plugin.event.$on('cancelled', function (action_name) {
                        if (action_name == name) {
                            reject(name);
                        }
                    });
                    Plugin.event.$on('confirmed', function (action_name) {
                        if (action_name == name) {
                            resolve(name);
                        }
                    });
                });
                return this.promise;
            }
        };

        Object.defineProperty(Vue.prototype, '$confirmation', {
            get: function get() {
                return $confirmation;
            }
        });

        window.confirm = function (name) {
            return Vue.prototype.$confirmation.show(name);
        };

        var component_name = options.component_name ? options.component_name : 'vue-confirmation';

        Vue.component(component_name, _Confirmation2.default);

        return null;
    }
};

exports.default = Plugin;