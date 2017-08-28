<template>
    <div class="parentList">
        <div class="content-menu">
            <div class="delete"></div>
            <div class="draglogo" draggable="true"></div>
            <div class="leftLine" style="left: 0px;"></div>
            <div class="rightLine" style="right: 0px;"></div>
            <div class="topLine" style="top: 0px;"></div>
            <div class="bottomLine" style="bottom: 0px;"></div>
            <div class="header"></div>
            <div class="list-content">
                <div id="" data-qlik-app-id="" data-qlik-obj-id="" style="width: calc(100% - 4px); height: calc(100% - 4px);">{{model.text}}</div>
            </div>
        </div>  
        <template>
            <views></views>
        </template>
        </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'views',
    props: ['model', 'show'],
    data() {
        return {
            message: false
        };
    },
    methods: {
        dragStart: function(event) {
            console.log('======start======');
            // let event = event || window.event;
            let sourceText = event.target.dataset.sourceText;
            let id = event.target.dataset.id;
            let appId = event.target.dataset.appId;
            let sourceObj = JSON.stringify({ 'sourceText': sourceText, 'sourceId': id, 'sourceAppId': appId });
            event.dataTransfer.setData('source', sourceObj);
        }
    },
    created() {
        console.log(this.model);
    },
    updated() {
        console.log(this.model);
    },
    computed() {
        console.log(this.model);
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  
</style>