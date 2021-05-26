<template>
  <div class="evaluation">
    <template v-if="!setEditor">
      <EvalNorma />
    </template>
    <template v-if="setEditor">
      <EvalEditor />
    </template>
  </div>
</template>

<script>
import EvalNorma from "../evaluation/evalNorma";
import EvalEditor from "../evaluation/evalEditor";
import { mapActions } from "vuex";
import { getEditor } from "@/utils/expauth";

export default {
  data() {
    return {
      setEditor: false
    }
  },
  created() {
    this.setEditor = JSON.parse(getEditor());
  },

  components: {
    EvalNorma,
    EvalEditor,
  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
.evaluation {
  height: 100%;
}
</style>