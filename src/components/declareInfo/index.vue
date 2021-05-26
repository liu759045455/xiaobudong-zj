<template>
  <div class="inforList">
    <infor-list-norma v-if="!setEditor" @editorFunc="editorFunc" />
    <infor-list-editor v-else @editorFunc="editorFunc" />
  </div>
</template>

<script>
import InforListNorma from "../infor/inforListNorma.vue";
import InforListEditor from "../infor/inforListEditor.vue";
import { getEditor } from "@/utils/expauth";

export default {
  data() {
    return {
      setEditor: true,
    };
  },
  components: {
    InforListNorma,
    InforListEditor,
  },
  created() {
    this.setEditor = JSON.parse(getEditor());
  },
  methods: {
    editorFunc(type) {
      this.setEditor = type;
    },
  },
};
</script>

<style lang="less">
.declare-btn {
  margin-top: 80px;
  margin-bottom: 98px;
  .el-row {
    display: flex;
    justify-content: center;
    .editor-btn {
      width: 118px;
      height: 36px;
      background: #fff5e5;
      border: 1px solid #cda059;
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #cda059;
      cursor: pointer;
      margin-left: 30px;
      &:hover {
        background: rgba(255, 245, 229, 0.7);
      }
    }
    .up-btn {
      width: 118px;
      height: 36px;
      border: 1px solid #999999;
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      background: #fff;
      cursor: pointer;
      margin-left: 30px;
      &:hover {
        border: 1px solid #cda059;
        color: #cda059;
      }
    }
    .down-btn {
      width: 118px;
      height: 36px;
      background: #cda059;
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      outline: none;
      border: 0;
      cursor: pointer;
      margin-left: 30px;
      &:hover {
        background: rgba(205, 160, 89, 0.7);
      }
    }
    .submit-btn {
      width: 118px;
      height: 36px;
      background: #87cd59;
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      outline: none;
      border: 0;
      margin-left: 30px;
      cursor: pointer;
      &:hover {
        background: rgba(135, 205, 89, 0.7);
      }
    }
  }
}
</style>