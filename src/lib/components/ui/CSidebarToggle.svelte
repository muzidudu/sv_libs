<script lang="ts">
	export { className as class };
	export let as = 'div';

	import clsx, { type ClassArray, type ClassDictionary } from 'clsx';
	import { SidebarToggle } from './Sidebar';

	/** @type {string} */
	let className:
		| string
		| number
		| bigint
		| boolean
		| ClassArray
		| ClassDictionary
		| null
		| undefined;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element this={as} on:click={() => SidebarToggle()} class={clsx('sidebar-toggle', className)}
	><slot /></svelte:element
>
