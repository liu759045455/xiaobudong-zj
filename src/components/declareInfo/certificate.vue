<template>
  <div class="certificate">
    <template v-if="!setEditor">
      <cret-norma />
    </template>
    <template v-if="setEditor">
      <cret-editor />
    </template>
  </div>
</template>

<script>
import CretEditor from "../certificate/certEditor";
import CretNorma from "../certificate/certNorma";

import { getEditor, setEditor } from "@/utils/expauth";

export default {
  data() {
    return {
      setEditor: false,
    };
  },

  created() {
    this.setEditor = JSON.parse(getEditor());
  },

  components: {
    CretEditor,
    CretNorma,
  },
};
</script>

<style lang="less" scoped>
</style>