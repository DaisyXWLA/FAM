<template>
  <div class="app-container">
    <el-form>
      <div class="title">课题基本信息</div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="课题名称" prop="code">
            设备升级改造
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课题登记号：" prop="code">
            FAMKT20200901
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登记日期" prop="code"> 2020-02-01 </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="选题理由" prop="code">
            FAMKT20200901
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="课题目标" prop="code">
            设备升级改造
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="QC小组名称" prop="code">
            降耗QC小组
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="得分" prop="code">
            -
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="预计完成日期" prop="code">
            2020-11-20
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核状态" prop="code">
            <span style="color: #ffba00">待审核</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="现状描述" prop="code">
            FAMKT20200901
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="达成效果" prop="code">
            设备升级改造
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="accessory-record">
      <div class="upload">
        <div class="title">活动记录</div>
      </div>
      <el-table
        v-loading="loading"
        :data="categoryList"
      >
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column label="文件名称" prop="groupName" align="center" />
        <el-table-column label="上传日期" prop="createTime" align="center" />
      </el-table>
    </div>
    <div class="accessory-result">
      <div class="upload">
        <div class="title">成果报告书</div>
      </div>
      <el-table
        v-loading="loading"
        :data="categoryList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column label="文件名称" prop="groupName" align="center" />
        <el-table-column label="上传日期" prop="createTime" align="center" />
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin: 10px 0 15px;
  padding-left: 10px;
  border-left: 4px solid #3c5dbd;
}
.accessory-record {
  margin-top: 10px;
  .upload {
    .title {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
.accessory-result {
  margin-top: 10px;
  .upload {
    .title {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
/deep/ .el-form {
  border-bottom: 1px solid #ddd;
}
/deep/ .el-form-item {
  border-top: 1px solid #ddd;
  margin-bottom: 0;
}

/deep/ .el-form-item__label {
  background: #f2f2f2;
  width: 220px;
  text-align: center;
  margin-right: 20px;
}
/deep/ .el-form-item__content {
  text-align: left;
  border-left: 1px solid #ddd;
   border-right: 1px solid #ddd;
}
</style>