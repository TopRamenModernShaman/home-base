<template>
  <div>
      <p @click="kanye"> SEAN SUCKS </p>
			<span>{{quote}}</span>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<span class="mtgcard">Phyrexian Dreadnought</span> for existing. But really <span class="mtgcard">Serra Angel [M10]</span>

			<blockquote>
    		12 Serra Angel
			</blockquote>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SeanSucks',
  data() {
      return{
				quote: ''
      }
  },
  components: {
  },
	created() {
		this.kanye()
	},
  methods: {
		async kanye(){
			fetch('https://api.kanye.rest')
				.then(response => response.json())
				.then(data => this.quote = data.quote);
		}
  }
}
</script>
<style scoped>
p {
	cursor: pointer;
	color: orange;
}
</style>