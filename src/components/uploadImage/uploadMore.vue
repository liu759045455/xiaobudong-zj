<template>
  <div class="component-upload-image">
    <el-upload
      :action="uploadImgUrl"
      list-type="picture-card"
      :limit="3"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :accept="accept"
      :data="uploadData"
      :file-list="fileslist"
      :on-exceed="handleExceed"
    >
      <template v-if="fileslist.length < 3">
        <img v-if="value" :src="value" class="avatar" ref="img" />
      </template>

      <div slot="file" slot-scope="{ file }">
        <!-- <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" /> -->
        <viewer
          :images="[file.url]"
          :class="['avatar', { border: fileslist.length > 0 }]"
          ref="img"
        >
          <img :src="file.url" />
        </viewer>
        <span
          class="closeIcon"
          @click.stop="clearFiles(file)"
          v-if="fileslist.length > 0"
        ></span>
      </div>
    </el-upload>

    <div class="upload-explain" v-html="explain" v-if="explain"></div>
    <div class="upload-tips" v-html="text" v-if="text"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      limit: 3,
      uploadImgUrl: this.imgUrl, // 上传的图片服务器地址
      filesImg: require("@/assets/icon/yj_icon_mr.png"),
      fileslist: [],
      uploadData: {
        categoryCode: this.code,
      },
    };
  },
  props: {
    code: {
      type: String,
      default: "",
    },
    accept: {
      type: String,
      default: ".jpg,.png",
    },
    explain: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    imgUrl: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    //编辑的文件列表
    list: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.$nextTick(() => {
      this.fileslist = this.list.map((item) => {
        return { url: location.origin + "/api" + item.path };
      });
    });
  },
  methods: {
    /** 删除文件 */
    clearFiles(file) {
      // this.$refs.img.src = this.value;

      let idx = null;
      this.fileslist.forEach((item, index) => {
        if (item.uid === file.uid) {
          idx = index;
        }
      });
      this.fileslist.splice(idx, 1);
      this.$emit("deleteId", {
        code: this.code,
        result: idx,
      });
    },
    /** 上传成功 */
    handleUploadSuccess(res, flist) {
      this.fileslist.push(flist);
      let params = {
        code: this.code,
        result: res.data,
      };
      this.$emit("returnId", params);
      this.loading.close();
    },
    handleBeforeUpload(file) {
      console.log("file", file);
      let size = file.size / 1024 / 1024 <= 10;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";

      if (!size) {
        this.$message.error("上传头像图片大小不能超过 10MB！");
        return false;
      }
      if (!isJPG) {
        this.$message.error("上传图片仅支持 jpg 、jpeg、png、bmp格式！");
        return false;
      }
      this.loading = this.$loading({
        lock: true,
        text: "上传中",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    handleUploadError() {
      this.$message({
        type: "error",
        message: "上传失败",
        center: true,
      });
      this.loading.close();
    },
    /** 超出限制的回调 */
    handleExceed(files) {
      this.$message({
        type: "error",
        message: "最多只可以上传三张图片！",
        center: true,
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.component-upload-image {
  > div {
    display: flex;
  }
  /deep/.el-upload-list__item-status-label {
    display: none !important;
  }
  /deep/.el-upload-list__item-actions {
    display: none;
  }
}
.el-upload--picture-card {
  border: none;
  background: url("~@/assets/icon/yj_icon_sc.png") center center no-repeat !important;
  background-size: 100% 100%;
  width: 184px;
  height: 133px;
  position: relative;
  background: transparent;
}
.avatar {
  width: 184px;
  height: 133px;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: contain;
  }
}
.border {
  background-color: #f8f8f8;
  border: 1px solid #eeeeee;
}
.upload-tips {
  margin-top: 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
}
.upload-explain {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
.closeIcon {
  cursor: pointer;
  display: inline-block;
  position: absolute;
  width: 24px;
  height: 24px;
  right: -24px;
  top: -24px;
  background: url("~@/assets/icon/yj_icon_ygb.png") center center no-repeat;
}
</style>
