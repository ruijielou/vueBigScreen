<template>
    <div class='right'>
        <div class='right-title'>
            <h1 class='title'>我的工作表</h1>
            <div class='rightControl'>
                <a href='javascript:;' class='btn-icons' type='button'>
                    <i class='iconfont icons-delete'></i>
                </a>
                <a href='javascript:;' class='btn-icons' type='button'>
                    <i class='iconfont icons-save'></i>
                </a>
            </div>
        </div>
        <div class='right-content' style='width: calc(100%);height: calc(100%);left: calc(0%);top:calc(0%)'>
            <div class='move'></div>
            <div class='lines'>
                <div v-for='i in column' :style="{left: ' calc( '+ i * calcX + '%) '}" class='column-line'>
                    <div class='column-line-inner'></div>
                </div>
                <div v-for='i in row' :style="{top: ' calc( '+ i * calcY + '%) '}" class='row-line'>
                    <div class='row-line-inner'></div>
                </div>
            </div>
            <!-- <div class='mask'></div> -->
            <!-- 当目标区域为空的时候显示默认的模块儿 -->
            <div class='showState1' v-show='dragParts == 0' @dragenter='dragEnter'>
                <h4>列表组为空</h4>
            </div>
            <!-- 拖动到目标区域上时showState2显示在目标区域上 -->
            <div class='showState2' v-show='showState2' @dragover='dragOver' @drop='dragDrop' style='width: calc(100%);height: calc(100%);left: calc(0%);top:calc(0%)'>
                <h4 class='stateTitle'>放置内容在此</h4>
            </div>
            <div class='dragsContentList' @dragover='dragOver' @drop='dragDrop' style='width: calc(100%);height: calc(100%);left: calc(0%);top:calc(0%)'>
                <div class='mask' v-if='maskShow' v-bind:style='{width: maskStyle.maskWidth, height: maskStyle.maskHeight, top: maskStyle.maskTop, left: maskStyle.maskLeft}'></div>{{maskStyle.maskLeft}}
                <views :model='model' :show='show'></views>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import creatViewData from 'components/right/creatView.vue';
export default {
    props: ['slidertype'],
    data() {
        return {
            showState1: true,
            column: 24,
            row: 12,
            calcX: 100 / 24,
            calcY: 100 / 12,
            showState2: false,
            maskShow: false,
            maskStyle: {
                maskWidth: 0,
                maskHeight: 0,
                maskTop: 0,
                maskLeft: 0
            },
            creatHtmlStyle: {
                creatHtmlWidth: 0,
                creatHtmlHeight: 0,
                creatHtmlTop: 0,
                creatHtmlLeft: 0
            },
            dropTargetStyle: {
                dropTargetWidth: 0,
                dropTargetHeight: 0,
                dropTargetTop: 0,
                dropTargetLeft: 0
            },
            dragDir: '',
            dragParts: 0,
            show: true,
            model: []
        };
    },
    methods: {
        dragEnter: function(event) {
            this.maskShow = true;
            this.showState1 = false;
            this.showState2 = true;
        },
        dragOver: function(event) {
            event.preventDefault();
            // console.log(this);
            // console.log(this.calcX + 'calc' + this.calcY);
            this.maskShow = true;
            // this.widthStyle = 'calc(50%)';
            // this.heightStyle = 'calc(50%)';
            let target = event.target;
            let x = event.offsetX;
            let y = event.offsetY;
            // console.log('x=========' + x);
            // console.log('y============' + y);
            let partten = /\((.*?)%/;
            if (!target) return;
            let targetLeft = parseInt(partten.exec(target.style.left)[1]);
            let targetTop = parseInt(partten.exec(target.style.top)[1]);
            let targetWidth = parseInt(partten.exec(target.style.width)[1]);
            let targetHeight = parseInt(partten.exec(target.style.height)[1]);
            // console.log('targetLeft' + targetLeft + 'targetTop' + targetTop + 'targetWidth' + targetWidth + 'targetHeight' + targetHeight);
            let width = parseInt(target.offsetWidth / 3);
            let height = parseInt(target.offsetHeight / 3);
            // console.log('width' + width + 'height' + height);
            let iMaskWidth = 0;
            let iMaskHeight = 0;
            let iMaskTop = 0;
            let iMaskLeft = 0;
            if (x > 0 && x < width && y > 0 && y < height) {
                // 左上 在左邊生成div
                // console.log('左上=================')
                this.dragDir = 'left';
                if (targetWidth <= this.calcX) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth / 2;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft + targetWidth / 2;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                }
            } else if (x > 0 && x < width && y < height * 2 && y > height) {
                // 左中 在左邊生成div
                this.dragDir = 'left';
                if (targetWidth <= this.calcX) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth / 2;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft + targetWidth / 2;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                }
            } else if (x > 0 && x < width && y < height * 3 && y > height * 2) {
                // 左下 在左邊生成div
                this.dragDir = 'left';
                if (targetWidth <= this.calcX) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth / 2;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft + targetWidth / 2;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                }
            } else if (x > width && x < width * 2 && y > 0 && y < height) {
                // 上中 div在上邊
                this.dragDir = 'top';
                // console.log('上中=================')
                if (targetHeight <= this.calcY) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight / 2;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop + targetHeight / 2;
                }
            } else if (x > width && x < width * 2 && y > height * 2 && y < height * 3) {
                // 下中 div在下邊
                this.dragDir = 'bottom';
                // console.log('下中=================')
                if (targetHeight <= this.calcY) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop + targetHeight / 2;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight / 2;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                }
            } else if (x > width * 2 && x < width * 3 && y > 0 && y < height) {
                // 右上 div在右邊
                this.dragDir = 'right';
                // console.log('右上=================');
                if (this.targetWidth <= this.calcX) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft + targetWidth / 2;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth / 2;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                }
            } else if (x > width * 2 && x < width * 3 && y > height && y < height * 2) {
                // 右中 div在右邊
                this.dragDir = 'right';
                // console.log('右中=================')
                if (targetWidth <= this.calcX) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft + targetWidth / 2;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth / 2;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                }
            } else if (x > width * 2 && x < width * 3 && y > height * 2 && y < height * 3) {
                // 右下 div在右邊
                this.dragDir = 'right';
                // console.log('右下=================')
                if (targetWidth <= this.calcX) {
                    iMaskLeft = targetLeft;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                } else {
                    iMaskLeft = targetLeft + targetWidth / 2;
                    iMaskTop = targetTop;
                    iMaskWidth = targetWidth / 2;
                    iMaskHeight = targetHeight;
                    this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                    this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                    this.dropTargetStyle.dropTargetLeft = targetLeft;
                    this.dropTargetStyle.dropTargetTop = targetTop;
                }
            } else if (x > width && x < width * 2 && y > height && y < height * 2) {
                // 中間 div跟target一樣大小
                this.dragDir = 'middle';
                iMaskLeft = targetLeft;
                iMaskTop = targetTop;
                iMaskWidth = targetWidth;
                iMaskHeight = targetHeight;
                this.dropTargetStyle.dropTargetWidth = iMaskWidth;
                this.dropTargetStyle.dropTargetHeight = iMaskHeight;
                this.dropTargetStyle.dropTargetLeft = targetLeft;
                this.dropTargetStyle.dropTargetTop = targetTop;
            }
            // this.creatMask.classList.add('active');
            this.maskStyle.maskLeft = 'calc(' + iMaskLeft + '%)';
            this.maskStyle.maskTop = 'calc(' + iMaskTop + '%)';
            this.maskStyle.maskWidth = 'calc(' + iMaskWidth + '%)';
            this.maskStyle.maskHeight = 'calc(' + iMaskHeight + '%)';
        },
        dragDrop: function(event) {
            var source = event.dataTransfer.getData('source');
            this.showState2 = false;
            this.dragParts += 1;
            console.log(source);
            var PorductID = '3f8c01dc-1a40-444a-8a23-b7f5ae3d9b5e';
            var AppId = '1ca8a669-e082-4b8e-80e6-593d223a3766';
            // var _Uri = encodeURIComponent('http://portal.ebistrategy.com:8030/BigScreen/GetProductList?PorductType=3');
            // this.$http.get('DataServer.ashx?uri=' + _Uri).then(function(res) {
            //     console.log(res);
            // });
            var obj = [{
                id: 'dragIdsssssss',
                appId: AppId,
                maskWidth: this.maskStyle.maskWidth,
                maskHeight: this.maskStyle.maskHeight,
                maskTop: this.maskStyle.maskTop,
                maskLeft: this.maskStyle.maskLeft,
                creatHtmlWidth: this.creatHtmlStyle.creatHtmlWidth,
                creatHtmlHeight: this.creatHtmlStyle.creatHtmlHeight,
                creatHtmlTop: this.creatHtmlStyle.creatHtmlTop,
                creatHtmlLeft: this.creatHtmlStyle.creatHtmlLeft,
                next: [{
                    id: PorductID,
                    appId: AppId,
                    maskWidth: this.maskStyle.maskWidth,
                    maskHeight: this.maskStyle.maskHeight,
                    maskTop: this.maskStyle.maskTop,
                    maskLeft: this.maskStyle.maskLeft,
                    creatHtmlWidth: this.creatHtmlStyle.creatHtmlWidth,
                    creatHtmlHeight: this.creatHtmlStyle.creatHtmlHeight,
                    creatHtmlTop: this.creatHtmlStyle.creatHtmlTop,
                    creatHtmlLeft: this.creatHtmlStyle.creatHtmlLeft
                }]
            }];
            this.model.push(obj);
            // var newObj = this.model.push(obj);
            // console.log(this.model);
            // this.$set(this.model, obj);
            console.log(this.model);
        }
    },
    created() {
        console.log('created');
    },
    updated() {
        console.log('updated');
    },
    computed() {
        console.log(this.model);
    },
    components: {
        'views': creatViewData
    }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin.styl'
    .right-title
     .title
        display: inline-block
    .rightControl
        display: inline-block
        float: right
    .btn-icons 
        padding: 6px 
        font-weight: bold
        padding: 6px 10px
        transition: all 0.5s
        border-radius: 2px
    .btn-icons:hover
         transform: scale(1.2)
         background: #007CC2
         color: #fff
    .btn-icons
        .iconfont 
           font-weight: bold
           font-size 18px   
</style>