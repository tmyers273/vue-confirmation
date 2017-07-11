import Confirmation from './Confirmation.vue'

const Plugin = {
    install(Vue, options = {}) {

        if (! this.hasOwnProperty("event")) {
            this.event = new Vue()
        }

        const $confirmation = {
            show(name, params) {
                Plugin.event.$emit('show', name, true, params)
                this.promise = new Promise((resolve, reject) => {
                    Plugin.event.$off('cancelled');
                    Plugin.event.$off('confirmed');

                    Plugin.event.$on('cancelled', action_name => {
                        if (action_name == name) {
                            reject(name);
                        }
                    });
                    Plugin.event.$on('confirmed', action_name => {
                        if (action_name == name) {
                            resolve(name);
                        }
                    });
                });
                return this.promise;
            },
        };

        Object.defineProperty(Vue.prototype, '$confirmation', {
            get: () => $confirmation,
        });

        window.confirm = (name) => {
            return Vue.prototype.$confirmation.show(name);
        };

        let component_name = options.component_name ? options.component_name : 'vue-confirmation';

        Vue.component(component_name, Confirmation);

        return null;
    }
};

export default Plugin;
