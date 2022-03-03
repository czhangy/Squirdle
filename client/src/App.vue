<template>
	<router-view />
</template>

<style lang="scss">
#app {
	font-family: 'Helvetica Neue', Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
  // Site color
  background: lighten(black, 10);
  // Site sizing
  height: 100vh;
  width: 100vw;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
}
</style>
