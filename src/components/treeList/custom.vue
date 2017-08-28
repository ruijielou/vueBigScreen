<template>
    <div class="menuList-item custom-list">
        <div class="item dropElement" draggable="true" data-id="12345" data-app-id="54321" data-source-text="饼状图" @dragstart="dragStart($event)">
          <span></span>
          <a href="#" draggable="false">饼状图</a>
        </div>
        <div class="item dropElement" draggable="true" data-id="12345" data-app-id="54321" data-source-text="饼状图" @dragstart="dragStart($event)">
          <span></span>
          <a href="#" draggable="false">饼状图</a>
        </div>
        <div class="item dropElement" draggable="true" data-id="12345" data-app-id="54321" data-source-text="饼状图" @dragstart="dragStart($event)">
          <span></span>
          <a href="#" draggable="false">饼状图</a>
        </div>
        <div class="item dropElement" draggable="true" data-id="12345" data-app-id="54321" data-source-text="饼状图" @dragstart="dragStart($event)">
          <span></span>
          <a href="#" draggable="false">饼状图</a>
        </div>
        <div class="item dropElement" draggable="true" data-id="12345" data-app-id="54321" data-source-text="饼状图" @dragstart="dragStart($event)">
          <span></span>
          <a href="#" draggable="false">饼状图</a>
        </div>

      </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ['maskShow'],
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
        console.log('created');
    },
    updated() {
        console.log('updated');
    },
    computed() {
        console.log('computed');
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  
</style>