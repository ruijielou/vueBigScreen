<template>
  <div class="left-menu" v-el:qlikData>
    <div class="menu-list">
      <!-- QlikSense四级菜单start -->
      <div class="menuList-item QlikSense-list" v-if="slidertype=='qlik'">
        <div class="tools-tree">
          <div v-if="qlikData.qlikFirstData == null">loading
            <span v-bind="loadingText" class="iconfont icons-loading"></span>
          </div>
          <div v-for="(qlikIndex, qlik) in qlikData.qlikFirstData" class="tools-item">
            <div class="tools-item-title" :data-id="qlik.ID" :data-ServerDomainName="qlik.ServerDomainName" @click.stop.prevent="getSecondData(qlikIndex, $event)">
              <i class="iconfont" :class="{'icons-down': qlik.showFlag, 'icons-right': !qlik.showFlag}" :data-id="qlik.ID" :data-ServerDomainName="qlik.ServerDomainName"></i>
              <div class="tools-itemText" :data-id="qlik.ID" :data-ServerDomainName="qlik.ServerDomainName">{{qlik.ProductName}}</div>
            </div>
            <div class="tools-item-content order3" v-bind:class="{hide: !qlik.showFlag}">
              <div v-if="qlikSecondData == null">loading
                <span v-bind="loadingText" class="iconfont icons-loading"></span>
              </div>
              <div class="tools-content" v-for="(qlikApp, qlikAppIndex) in qlikSecondData">
                <div class="secondIcon tools-content-title" :data-id="qlikApp.id" :data-app-id="qlikApp.appId" :data-product-id="qlik.ID" @click.stop.prevent="getThirdData(qlikAppIndex, $event, qlikApp.id.split('-').join(''))">
                  <i class="iconfont" :class="{'icons-down': qlikApp.showFlag, 'icons-right': !qlikApp.showFlag}" :data-id="qlikApp.id" :data-app-id="qlikApp.appId" :data-product-id="qlik.ID"></i>
                  <div class="tools-itemText" :data-id="qlikApp.id" :data-app-id="qlikApp.appId" :data-product-id="qlik.ID">
                    <span class="iconfont icons-worksheet" :data-id="qlikApp.id" :data-app-id="qlikApp.appId" :data-product-id="qlik.ID"></span>{{qlikApp.name}}</div>
                </div>
                <div class="tools-contents" v-bind:class="{hide: !qlikApp.showFlag}">

                  <div v-if="qlikThirdData['qlik'+ qlikApp.id.split('-').join('')] == undefined">loading
                    <span v-bind="loadingText" class="iconfont icons-loading"></span>
                  </div>
                  <div class="tools-content-list" v-for="(qlikSheet, qlikSheetIndex) in qlikThirdData['qlik' + qlikApp.id.split('-').join('')]">
                    <div class="thirdIcon tools-content-list-title" :data-id="qlikSheet.SheetId" :data-app-id="qlikApp.id" :data-product-id="qlik.ID" @click.stop.prevent="getFouthData(qlikSheetIndex, $event, 'qlik'+ qlikApp.id.split('-').join(''), 'qliksheet' + qlikSheet.SheetId.split('-').join(''))">
                      <i class="iconfont icons-right" :class="{'icons-down': qlikSheet.showFlag, 'icons-right': !qlikSheet.showFlag}" :data-id="qlikSheet.SheetId" :data-app-id="qlikApp.id" :data-product-id="qlik.ID"></i>
                      <div class="tools-itemText" :data-id="qlikSheet.SheetId" :data-app-id="qlikApp.id" :data-product-id="qlik.ID">
                        <span class="iconfont icons-worksheet" :data-id="qlikSheet.SheetId" :data-app-id="qlikApp.id" :data-product-id="qlik.ID"></span>{{qlikSheet.Title}}</div>
                    </div>
                    <div class="tools-content-list-content " v-bind:class="{hide: !qlikThirdData['qlik'+ qlikApp.id.split('-').join('')][qlikSheetIndex].showFlag}">

                      <div v-if="qlikFouthData['qliksheet'+ qlikSheet.SheetId.split('-').join('')] == undefined">loading{{qlikFouthData['qliksheet'+ qlikSheet.SheetId.split('-').join('')]}}
                        <span v-bind="loadingText" class="iconfont icons-loading"></span>
                      </div>

                      <div v-for="(data, dataIndex) in qlikFouthData['qliksheet' + qlikSheet.SheetId.split('-').join('')]" class="last-content-item dropElement" :class="{active: data.showFlag}" @click.stop.prevent="clickDatasIsActive(dataIndex, $event, 'qliksheet' + qlikSheet.SheetId.split('-').join(''))" :data-id="data.Name" :data-app-id="data.AppId" :data-product-id="qlik.ID" :data-source-text="data.Title" :title="data.Title" draggable="true">

                        <a href="javascript:;" :data-id="data.Name" :data-app-id="data.AppId" :data-product-id="qlik.ID" class="left-control-item" draggable="false">
                          <span class="iconfont icons-datasheet"></span>
                        </a>

                        <div :data-id="data.Name" :data-app-id="data.AppId" :data-product-id="qlik.ID" class="tools-itemText text">{{data.type}} {{data.Title}}</div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- QlikSense四级菜单end -->
      <!-- tableau四級菜單start -->
      <div class="menuList-item tableau-list" v-if="slidertype=='tableau'">
        <div class="tools-tree">
          <div id="tableau" class="tools-item">
            <div class="firstIcon tools-item-title">
              <i class="iconfont icons-right"></i>
              <div class="tools-itemText">tableau</div>
            </div>
          </div>
        </div>
      </div>
      <!-- tableau三級菜單end -->
      <!-- 自定義圖形start -->
      <div class="menuList-item custom-list" v-if="slidertype=='custom'">
        <div class="item dropElement" draggable="true" data-source-text="饼状图">
          <span></span>
          <a href="#" draggable="false">饼状图</a>
        </div>

      </div>
    </div>
    <div class="left-console" v-show="leftConsole">
      <i class="iconfont icons-loading"></i>
      <iframe src="" class="iframe" style="display: none;" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['slidertype'],
  data() {
    return {
      qlikData: {
        qlikFirstData: null
      }
    };
  },
  methods: {
    init: function(o) {
      if (this.slidertype === 'qlik') {
        window.alert('qlik');
        if (this.qlikData.qlikFirstData === null) {
          this.$http.get('../../../static/data.json').then((res) => {
            var data = res.body.first;
            if (data.length === 0) {
              this.loadingText = '抱歉，没有找到数据！';
              return;
            }
            this.loadingText = '';
            data.forEach(function(element) {
              element.showFlag = false;
            });
            this.qlikData.qlikFirstData = data;
            console.log(this.qlikData.qlikFirstData);
          }, response => {
            console.log('error');
          });
        };
      } else if (this.slidertype === 'tableau') {
        window.alert('tableau');
      } else if (this.slidertype === 'custom') {
        window.alert('custom');
      }
    }
  },
  created() {
    this.init();
  },
  updated() {
    this.init();
  },
  computed: {
    function() {
      console.log('dddd');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  
</style>