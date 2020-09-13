import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                black: "#212121",
                primary: '#71D1DA'
            },
        },
    },
})
