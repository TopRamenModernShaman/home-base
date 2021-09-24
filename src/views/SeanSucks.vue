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
			<img v-if="mtg.img" :src="mtg.img">
			<span>
				<input type="text" v-model="mtgName">
				<button @click="getMtg(mtgName)"></button>
			</span>
	</div>
</template>

<script>

export default {
  name: 'SeanSucks',
  data() {
      return{
				quote: '',
				mtg: {},
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
		async getMtg(name){
			console.log("HERE WE GO")
			fetch('https://api.magicthegathering.io/v1/cards?name=' + name)
				.then(function (response){
					let cards = response.data.cards
					console.log(cards.length)
					
					let newcards = cards.sort( function ( a,b ) {
							a = a.name.toLowerCase();
							b = b.name.toLowerCase();

							return a < b ? -1 : a > b ? 1 : 0;
					});
					console.log(newcards)

					resolve(cards);
			})
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