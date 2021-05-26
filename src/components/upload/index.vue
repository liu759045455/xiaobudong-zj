<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="uploadImgUrl"
      :data="data"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
    <div class="imgmanage">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    </el-upload>
  </div>
</template>

<script>
// import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      uploadImgUrl: "api/file/upload/common",
    //   headers: {
    //     Authorization: "Bearer " + getToken(),
    //   },
      data: {
        categoryCode: "profess_cert",
        file: {},
      },
      imageUrl: "",
    };
  },
  created() {
  },
  methods: {
    // 父组件关闭弹框清空imageUrl地址
    clearImageUrl() {
      this.imageUrl = "";
    },
    // 父组件传递过来的图片路径
    getPath(path) {
      this.imageUrl = "192.168.0.111:8888/" + path
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code === 200) {
        this.$emit('getFile',res.data.id)
        this.$message({
          type: "success",
          message: "上传图片成功",
          center: true,
        });
      }
    },
    // 上传前的校验
    beforeAvatarUpload(file) {
      this.data.file = file;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("请上传正确的图片格式");
      }
      if (!isLt2M) {
        this.$message.error("图片不能超过2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
}
.imgmanage{
  width: 178px;
  height: 178px;
  position: relative;
}
</style>