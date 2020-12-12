<template>
  <div class="app-container">
    <el-form>
      <div class="title">项目基本信息</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="code">
            标准印痕滚检机改造
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
          <el-form-item label="项目编号" prop="code"> P20200901 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目来源" prop="code"> 对标 </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="问题描述" prop="code">
            设备不够先进，为提高生产效率、优化生产质量，需要对设备进行全面升级改造
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="采取措施" prop="code">
            短时间内完成设备全面升级改造
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="项目负责人" prop="code"> 张雨生 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目成员" prop="code">
            张雨生，苗龙涛，蔡文静，张阳，袁豪文
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="项目类型" prop="code"> 效率 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成本类别" prop="code"> 材料费用 </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="科室/班组" prop="code"> 一班 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" prop="code"> 技术部 </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预计节约总金额" prop="code">
            12000
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="计算明细" prop="code">
            设备不够先进，为提高生产效率、优化生产质量，需要对设备进行全面升级改造，短时间内完成设备全面升级改造
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="accessory-record">
      <div class="upload">
        <div class="title">改善报告</div>
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
      <el-table>
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
    <div class="accessory-record">
      <div class="upload">
        <div class="title">实际节约金额</div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="实际节约总金额" prop="saveAmount">
                <el-input
                  v-model="form.saveAmount"
                  placeholder="请输入实际节约总金额"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
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
    return {
      id: "",
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        saveAmount: [
          {
            required: true,
            message: "实际节约总金额不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    agree() {
      this.$confirm("是否同意该课题?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(function () {
          return deleteArea(areaId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("审核通过！");
        });
    },
    refuse() {
      this.$confirm("是否拒绝通过该课题?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(function () {
          return deleteArea(areaId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("已拒绝！");
        });
    },
    grade() {
      this.$router.push({
        path: "/QCGroup/grade/" + this.$route.params.id,
      });
    },
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
    margin-right: 0 !important;
  }
  /deep/ .el-form-item__content {
    text-align: left;
    border-left: none;
    border-right: none;
    display: inline-block;
    margin-left: 0 !important;
    width: 92%;
  }
  /deep/ .el-input__inner {
    border: none;
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
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
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