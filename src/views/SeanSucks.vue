<template>
  <div>
      <p @click="kanye"> SEAN SUCKS </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
      return{
				quote: ''
      }
  },
  components: {
  },
  methods: {
		async kanye(){
			fetch('https://api.kanye.rest')
				.then(response => response.json())
				.then(data => console.log(data));
		}
  }
}
</script>
