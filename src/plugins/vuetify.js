import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const options = {
	icons: {
		iconfont: 'mdi',
	},
	theme: {
		themes: {
			light: {
				primary: '#435e40',
				secondary: '#717171',
				defaultPrimary: '#0069bd',
				defaultSecondary: '#424242',
				defaultAccent: '#82B1FF',
				defaultError: '#FF5252',
				defaultInfo: '#0069bd',
				defaultSuccess: '#4CAF50',
				defaultWarning: '#FFC107',
			}
		}
	}
}


export default new Vuetify(options);
