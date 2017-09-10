# vue-confirmation

A simple package to add stylized confirmation boxes

## Installation

Add the following to your `package.json` file

```
"dependencies": {
    ...
    "tmyers273.vue-confirmation": "git+https://git@github.com/tmyers273/vue-confirmation.git"
}
```

`npm install`

```
import VueConfirmation from 'tmyers273.vue-confirmation';
Vue.use(VueConfirmation);
```

You **will** want to ensure that the vue-modal-js component is using the `vue-modal` component name

```
import VModal from 'vue-js-modal'
Vue.use(VModal, {
    componentName: 'vue-modal'
});
```

## Usage

```
<template>
    <div>
        <span class="fa fa-trash" title="Delete" @click="destroy"></span>
    </div>
</template>

<script>
export default {
    methods: {
        destroy() {
            confirm('cost-delete-confirmation').then(() => {
                console.log('delete was confirmed');
                // call server and delete
            }).catch(() => {
                console.log('delete was canceled');
            });
        }
    },
}
```
