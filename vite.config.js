import {fileURLToPath, URL} from 'node:url'

import {defineConfig, splitVendorChunkPlugin} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `static/[name].js`,
				chunkFileNames: `static/[name].js`,
				assetFileNames: `static/[name].[ext]`
			}
		}
	},
	plugins: [
		splitVendorChunkPlugin(),
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => ['center'].includes(tag),
				}
			}
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	transpileDependencies: [
		'@stomp/stompjs'
	]
})
