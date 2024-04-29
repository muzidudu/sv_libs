<script lang="ts">
	export { className as class };
	export let as = 'div';

	import clsx, { type ClassArray, type ClassDictionary } from 'clsx';

	/** @type {string} */
	let className:
		| string
		| number
		| bigint
		| boolean
		| ClassArray
		| ClassDictionary
		| null
		| undefined = undefined;
</script>

<svelte:element this={as} class={clsx('sidebar-footer', className)}><slot /></svelte:element>
