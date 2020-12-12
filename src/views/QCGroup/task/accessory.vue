<template>
  <div class="app-container">
    <el-form>
      <div class="title">课题基本信息</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课题名称" prop="code">
            设备升级改造
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="审核状态" prop="code">
            <span style="color: #67c23a">审核通过</span>
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
            设备不够先进，为提高生产效率、优化生产质量，需要对设备进行全面升级改造
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="课题目标" prop="code">
            短时间内完成设备全面升级改造
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="QC小组名称" prop="code">
            降耗QC小组
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="得分" prop="code">
            -
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="预计完成日期" prop="code">
            2020-11-20
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="现状描述" prop="code">
            目前设备部分零部件需要更新，主要结构需要优化
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="达成效果" prop="code">
            升级改造后的设备达到原生产效率的1.5倍
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="accessory-record">
      <div class="upload">
        <div class="title">活动记录</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </div>
      <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
      </el-upload> -->
      <el-table
        v-loading="loading"
        :data="categoryList"
      >
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column label="文件名称" prop="groupName" align="center" />
        <el-table-column label="上传日期" prop="createTime" align="center" />
        <el-table-column
          label="操作"
          align="center"
          width="300"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:role:edit']"
              >下载</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:role:remove']"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="accessory-result">
      <div class="upload">
        <div class="title">成果报告书</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </div>
      <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
      </el-upload> -->
      <el-table
        v-loading="loading"
        :data="categoryList"
      >
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column label="文件名称" prop="groupName" align="center" />
        <el-table-column label="上传日期" prop="createTime" align="center" />
        <el-table-column
          label="操作"
          align="center"
          width="300"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:role:edit']"
              >下载</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:role:remove']"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="cancel">取 消</el-button>
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
.footer {
  text-align: center;
  margin-top: 30px;
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