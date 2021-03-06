﻿import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    components: {
        NavMenuComponent: require('./components/nav-menu/nav-menu.vue').default,
        TopMenuComponent: require('./components/top-menu/top-menu.vue').default,
    },
})
export default class AdminLayoutComponent extends Vue {
}
