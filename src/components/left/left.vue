<template>
  <div class="left">
    <div class="left-slider">
      <div class="left-banner">
        <a @click="showLeftMenu" class="slider-item qlik" title="Qlik sense"></a>
        <a @click="showLeftMenu" class="slider-item tableau" title="tableau"></a>
        <a @click="showLeftMenu" class="slider-item custom" title="custom control"></a>
      </div>
      <div class="left-menu" v-if="leftMenuShow">
        <div class="menu-list">
          <!-- <keep-alive>
            <router-view :http-data="httpData"></router-view>
          </keep-alive> -->
          <v-qlik v-show="sliderType=='qlik'" :http-data="httpData"></v-qlik>
          <v-tableau v-show="sliderType=='tableau'" :http-data="httpData"></v-tableau>
          <v-custom v-show="sliderType=='custom'" :http-data="httpData"></v-custom>
        </div>
        <div class="left-console" v-if="showConsole">
          <i v-if="iframeLoading" class="iconfont icons-loading"></i>
          <iframe :src="iframeSrc" v-if="!iframeLoading" class="iframe" frameborder="0" width="100%" height="100%"></iframe>
        </div>
      </div>
      <!-- <tree-list v-if="leftMenuShow" :sliderType="sliderType"></tree-list> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qlik from 'components/treeList/qlik.vue';
import tableau from 'components/treeList/tableau.vue';
import custom from 'components/treeList/custom.vue';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      sliderType: '',
      leftMenuShow: false,
      leftSliderIsActive: false,
      leftConsole: false,
      httpData: {
        qlikData: {
          qlikFirstData: null
        },
        tableauData: {
          tableauFirstData: null
        }
      }
    };
  },
  methods: {
    showLeftMenu(event) {
      this.leftMenuShow = true;
      var clickStatus = event.target.classList.contains('active');
      var sliderItem = event.target.parentNode.children;
      for (var i = 0; i < sliderItem.length; i++) {
        sliderItem[i].classList.remove('active');
      }
      if (clickStatus) {
        this.leftMenuShow = false;
        this.leftSliderIsActive = true;
        event.target.classList.remove('active');
      } else {
        this.leftSliderIsActive = false;
        this.leftMenuShow = true;
        event.target.classList.add('active');
        if (event.target.classList.contains('qlik')) {
          this.sliderType = 'qlik';
          if (this.httpData.qlikData.qlikFirstData === null) {
            this.$http.get('../../../static/data.json').then((res) => {
               console.log(res);
              var data = res.body.qlikfirst;
              if (data.length === 0) {
                this.loadingText = '抱歉，没有找到数据！';
                return;
              }
              this.loadingText = '';
              data.forEach(function(element) {
                element.showFlag = false;
              });
              this.httpData.qlikData.qlikFirstData = data;
              console.log(this.httpData.qlikData.qlikFirstData);
            }, response => {
              console.log('error');
            });
          };
        } else if (event.target.classList.contains('tableau')) {
          if (this.httpData.tableauData.tableauFirstData === null) {
            this.$http.get('../../../static/data.json').then((res) => {
              var data = res.body.tableaufirst;
              if (data.length === 0) {
                this.loadingText = '抱歉，没有找到数据！';
                return;
              }
              this.loadingText = '';
              data.forEach(function(element) {
                element.showFlag = false;
              });
              this.httpData.tableauData.tableauFirstData = data;
              console.log(this.httpData.tableauData.tableauFirstData);
            }, response => {
              console.log('error');
            });
          };
          this.sliderType = 'tableau';
        } else if (event.target.classList.contains('custom')) {
          this.sliderType = 'custom';
        }
      }
    }
  },
   components: {
      'v-qlik': qlik,
      'v-tableau': tableau,
      'v-custom': custom
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  
</style>