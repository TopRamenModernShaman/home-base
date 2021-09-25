<template>
  <div>
		<HelloWorld msg="Welcome"/>
		<test2 />
		<test />
		<img :src="mtg.imageUrl" >
		<!-- <Dropdown
			:options="cards"
			drop-down-type="single"
			:track-by="['name']"
			placeholder="Search Card"
			@selection="yeah"
		/> -->
		<span>
			<input type="text" class="" v-model="mtgName">
			<button @click="getMtg(mtgName)"></button>
		</span>
	</div>
</template>

<script>
//import Dropdown from '../utilities/Dropdown.vue';
import test from '../utilities/test.vue';
import test2 from '../components/test2.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'mtg',
  components: {
		test,
    HelloWorld,
    test2
  },
  data() {
		return{
			mtg: '',
			mtgName: '',
			cards: ['1', '2']
		}
  },
  components: {
  },
	created() {
	},
  methods: {
		async getMtg(name){
			let mtgData = ''
			console.log("HERE WE GO")
			await fetch('https://api.magicthegathering.io/v1/cards?name=' + name)
				.then(response => response.json())
				.then(data => mtgData = data)
				console.log(mtgData)
				console.log("FIRE IN THEE HOOL")
				let cards = mtgData.cards
				console.log(cards.length)
				
				let newcards = cards.sort( function ( a,b ) {
					a = a.name.toLowerCase();
					b = b.name.toLowerCase();

					return a < b ? -1 : a > b ? 1 : 0;
				});
				console.log(newcards)
				if(cards.length > 0){
					this.cards = newcards
					this.mtg = newcards[0]
				} else {
					this.mtg = ''
				}
		},
		async yeah(){
			console.log("yeah")
		}
  }
}
</script>
<style scoped>
</style>