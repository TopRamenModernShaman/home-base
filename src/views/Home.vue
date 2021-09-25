<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome"/>
    <HelloWorld msg="Welcome"/>
    <HelloWorld msg="Welcome"/>
    <test2 />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import test2 from '../components/test2.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    test2
  }
}
</script>
