<template>
  <div>
		<p @click="kanye"> SEAN SUCKS </p>
		<span>{{quote}}</span>
	</div>
</template>

<script>

export default {
  name: 'SeanSucks',
  data() {
		return{
			quote: '',
			mtg: '',
			mtgName: '',
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
		},
  }
}
</script>
<style scoped>
p {
	cursor: pointer;
	color: orange;
}
</style>