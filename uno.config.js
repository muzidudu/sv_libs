import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';
import transformerCompileClass from '@unocss/transformer-compile-class'

import extractorSvelte from '@unocss/extractor-svelte';
export default defineConfig({
	extractors: [extractorSvelte()],
	presets: [
		presetUno(),
		presetAttributify({}),
		presetIcons({
			prefix: 'i-',
			scale: 1.5,
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		})
	],
	// layers: {
	// 	components: -1,
	// 	default: 1,
	// 	utilities: 2
	// },
	shortcuts: [
		{
			'container': 'w-full max-w-7xl mx-auto px-1 md:px-4',
			'flex-col': 'flex flex-col',
			'fcc': 'flex justify-center items-center',
			'f-start': 'flex items-center justify-start',
			'f-between': 'flex items-center justify-between',
			'f-center': 'flex items-center justify-center',
			'f-end': 'flex items-center justify-end'
		}
		// 	// you could still have object style
		// 	{
		// 		// btn: 'py-1.5 px-2 font-semibold rounded-lg shadow-md'
		// 	},
		// 	// dynamic shortcuts
		// 	// [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-1.5 px-2 rounded-lg`]
	],
	transformers: [transformerCompileClass(),transformerDirectives(), transformerVariantGroup()]
});
