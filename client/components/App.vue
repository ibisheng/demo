<template>
    <div :class="$style.container">
        毕升文档Api开发样例
        <Button>打开</Button>
    </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {

        };
    }
})
</script>

<style lang="less">
    @import "~iview/src/styles/index.less";
</style>


<style lang="less" module>
    .container {
        font-size: 24px;
    }
</style>
