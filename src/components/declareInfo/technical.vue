<template>
  <div class="technical">
    <technical-norma v-if="!setEditor" />
    <technical-editor v-if="setEditor" /> 
  </div>
</template>

<script>
import { getEditor } from "@/utils/expauth";
import TechnicalEditor from "../technical/technicalEditor.vue";
import TechnicalNorma from "../technical/technicalNorma.vue";
export default {
  components: {
    TechnicalEditor,
    TechnicalNorma,
  },
  data() {
    return {
      setEditor: false,
    };
  },

  created() {
    this.setEditor = JSON.parse(getEditor());
  },

};
</script>
