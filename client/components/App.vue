<template>
    <div :class="$style.container">
        毕升文档Api开发样例
        <Table border :columns="cols" :data="files" width="600" stripe></Table>
    </div>
</template>

<script>
import Vue from 'vue'
import { fetch } from 'whatwg-fetch'
export default Vue.extend({
    data() {
        return {
            cols: [
                {
                    title: 'ID',
                    key: 'docId',
                    width: 120,
                },
                {
                    title: '名称',
                    key: 'title'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 160,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success'
                                },
                                style: {
                                    marginRight: '6px'
                                },
                                on: {
                                    click: () => {
                                        this.onPreview(params.row);
                                    }
                                }
                            }, '预览'),
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                    click: () => {
                                        this.onEdit(params.row);
                                    }
                                }
                            }, '编辑'),
                        ]);
                    }
                }
            ],
            files: []
        };
    },
    methods: {
        onPreview(rowData) {
            fetch(`/api/file/view/${rowData.docId}`).then(response => {
                return response.json()
            }).then(json => {
                window.open(json.url);
            }).catch(fex => {
                console.error('parsing failed', ex)
            });
        },
        onEdit(rowData) {
            fetch(`/api/file/edit/${rowData.docId}`).then(response => {
                return response.json()
            }).then(json => {
                window.open(json.url);
            }).catch(fex => {
                console.error('parsing failed', ex)
            });
        }
    },
    mounted() {
        fetch('/api/queryFileList').then(response => {
            return response.json()
        }).then(json => {
            this.files = json;
        }).catch(fex => {
            console.error('parsing failed', ex)
        });
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
