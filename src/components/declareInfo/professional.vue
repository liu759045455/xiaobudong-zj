<template>
  <div class="professional">
    <ProfessEditor v-if="setEditor"/>
    <ProfessNorma v-if="!setEditor"/>
  </div>
</template>

<script>
import { getEditor, setEditor } from "@/utils/expauth";
import ProfessEditor from "../profess/professEditor";
import ProfessNorma from "../profess/professNorma";

export default {
  components: {
    ProfessEditor,
    ProfessNorma
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