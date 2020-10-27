<template>
	<div class="home">
		<sup-progress
			type="circle"
			:percentage="50"
			:showText="true"
			:textInside="true"
		></sup-progress>
	</div>
</template>

<script>
	// @ is an alias to /src
	import SupProgress from "@/components/progress.vue";

	export default {
		name: "Home",
		components: {
			SupProgress
		}
	};
</script>
