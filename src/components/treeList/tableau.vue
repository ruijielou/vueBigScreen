<template>
    <div class="menuList-item tableau-list">
        <div class="tools-tree">
            <div v-if="httpData.tableauData.tableauFirstData == null">loading
                <span v-bind="loadingText" class="iconfont icons-loading"></span>
            </div>
            <div v-for="(tableauIndex, tableau) in httpData.tableauData.tableauFirstData" class="tools-item">
                <div class="tools-item-title" :data-id="tableau.ID" :data-ServerDomainName="tableau.ServerDomainName" @click.stop.prevent="getSecondData(tableauIndex, $event)">
                    <i class="iconfont" :class="{'icons-down': tableau.showFlag, 'icons-right': !tableau.showFlag}" :data-id="tableau.ID" :data-ServerDomainName="tableau.ServerDomainName"></i>
                    <div class="tools-itemText" :data-id="tableau.ID" :data-ServerDomainName="tableau.ServerDomainName">{{tableau.ProductName}}</div>
                </div>
                <div class="tools-item-content order3" v-bind:class="{hide: !tableau.showFlag}">
                    <div v-if="tableauSecondData == null">loading
                        <span v-bind="loadingText" class="iconfont icons-loading"></span>
                    </div>
                    <div class="tools-content" v-for="(tableauApp, tableauAppIndex) in tableauSecondData">
                        <div class="secondIcon tools-content-title" :data-id="tableauApp.id" :data-app-id="tableauApp.appId" :data-product-id="tableau.ID" @click.stop.prevent="getThirdData(tableauAppIndex, $event, tableauApp.id.split('-').join(''))">
                            <i class="iconfont" :class="{'icons-down': tableauApp.showFlag, 'icons-right': !tableauApp.showFlag}" :data-id="tableauApp.id" :data-app-id="tableauApp.appId" :data-product-id="tableau.ID"></i>
                            <div class="tools-itemText" :data-id="tableauApp.id" :data-app-id="tableauApp.appId" :data-product-id="tableau.ID">
                                <span class="iconfont icons-worksheet" :data-id="tableauApp.id" :data-app-id="tableauApp.appId" :data-product-id="tableau.ID"></span>{{tableauApp.name}}</div>
                        </div>
                        <div class="tools-contents" v-bind:class="{hide: !tableauApp.showFlag}">

                            <div v-if="tableauThirdData['tableau'+ tableauApp.id.split('-').join('')] == undefined">loading
                                <span v-bind="loadingText" class="iconfont icons-loading"></span>
                            </div>
                            <div class="tools-content-list" v-for="(tableauSheet, tableauSheetIndex) in tableauThirdData['tableau' + tableauApp.id.split('-').join('')]">
                                <div class="thirdIcon tools-content-list-title" :data-id="tableauSheet.SheetId" :data-app-id="tableauApp.id" :data-product-id="tableau.ID" @click.stop.prevent="getFouthData(tableauSheetIndex, $event, 'tableau'+ tableauApp.id.split('-').join(''), 'tableausheet' + tableauSheet.SheetId.split('-').join(''))">
                                    <i class="iconfont icons-right" :class="{'icons-down': tableauSheet.showFlag, 'icons-right': !tableauSheet.showFlag}" :data-id="tableauSheet.SheetId" :data-app-id="tableauApp.id" :data-product-id="tableau.ID"></i>
                                    <div class="tools-itemText" :data-id="tableauSheet.SheetId" :data-app-id="tableauApp.id" :data-product-id="tableau.ID">
                                        <span class="iconfont icons-worksheet" :data-id="tableauSheet.SheetId" :data-app-id="tableauApp.id" :data-product-id="tableau.ID"></span>{{tableauSheet.Title}}</div>
                                </div>
                                <div class="tools-content-list-content " v-bind:class="{hide: !tableauThirdData['tableau'+ tableauApp.id.split('-').join('')][tableauSheetIndex].showFlag}">

                                    <div v-if="tableauFouthData['tableausheet'+ tableauSheet.SheetId.split('-').join('')] == undefined">loading{{tableauFouthData['tableausheet'+ tableauSheet.SheetId.split('-').join('')]}}
                                        <span v-bind="loadingText" class="iconfont icons-loading"></span>
                                    </div>

                                    <div v-for="(data, dataIndex) in tableauFouthData['tableausheet' + tableauSheet.SheetId.split('-').join('')]" class="last-content-item dropElement" :class="{active: data.showFlag}" @click.stop.prevent="clickDatasIsActive(dataIndex, $event, 'tableausheet' + tableauSheet.SheetId.split('-').join(''))" :data-id="data.Name" :data-app-id="data.AppId" :data-product-id="tableau.ID" :data-source-text="data.Title" :title="data.Title" draggable="true">

                                        <a href="javascript:;" :data-id="data.Name" :data-app-id="data.AppId" :data-product-id="tableau.ID" class="left-control-item" draggable="false">
                                            <span class="iconfont icons-datasheet"></span>
                                        </a>

                                        <div :data-id="data.Name" :data-app-id="data.AppId" :data-product-id="tableau.ID" class="tools-itemText text">{{data.type}} {{data.Title}}</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['slidertype', 'httpData'],
    // data() {
    //     return {
    //         tableauData: {
    //             tableauFirstData: null
    //         }
    //     };
    // },
    methods: {
        init: function(o) {
            // window.alert('tableau');
            // if (this.tableauData.tableauFirstData === null) {
            //     this.$http.get('../../../static/data.json').then((res) => {
            //         var data = res.body.first;
            //         if (data.length === 0) {
            //             this.loadingText = '抱歉，没有找到数据！';
            //             return;
            //         }
            //         this.loadingText = '';
            //         data.forEach(function(element) {
            //             element.showFlag = false;
            //         });
            //         this.tableauData.tableauFirstData = data;
            //         console.log(this.tableauData.tableauFirstData);
            //     }, response => {
            //         console.log('error');
            //     });
            // };
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
    .tools-item-title 
        white-space: nowrap
  
</style>