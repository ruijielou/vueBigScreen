<template>
  <div class="container">
    <v-left></v-left>
    <v-right></v-right>

  </div>
</template>

<script type="text/ecmascript-6">
  // import {urlParse} from 'common/js/util';
  import left from 'components/left/left.vue';
  import right from 'components/right/right.vue';

  // const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          // id: (() => {
          //   let queryParam = urlParse();
          //   return queryParam.id;
          // })()
        }
      };
    },
    created() {
      // this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      //   response = response.body;
      //   if (response.errno === ERR_OK) {
      //     this.seller = Object.assign({}, this.seller, response.data);
      //   }
      // });
    },
    components: {
      'v-left': left,
      'v-right': right
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

 
</style>
