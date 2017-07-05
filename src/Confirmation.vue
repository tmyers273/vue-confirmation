<template>
    <vue-modal :name="name" @closed="cancelled">
        <div class="modal-container">
            <h3 class="title">Confirm Delete</h3>
            <div class="body" align="center">
                <slot></slot>
            </div>
            <div class="footer">
                <button class="btn btn-danger" @click="confirmed">Delete</button>
                <button class="btn btn-default" @click="$modal.hide(name)">Cancel</button>
            </div>
        </div>
    </vue-modal>
</template>

<script>
    import Confirmation from './index';

    export default {

        data() {
            return {
                promise: null,
            }
        },

        methods: {

            confirmed() {
                Confirmation.event.$emit('confirmed', this.name);
                this.$modal.hide(this.name);
            },

            cancelled() {
                Confirmation.event.$emit('cancelled', this.name);
            },

            load() {
//                this.promise = new Promise();
//                return this.promise();
            }

        },

        mounted() {
            Confirmation.event.$on('show', name => {
                if (name == this.name) {
                    this.$modal.show(this.name);
                }
            });
        },

        props: [
            'name'
        ]

    }
</script>