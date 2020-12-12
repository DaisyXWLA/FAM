<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="成员姓名" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择成员"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组内职务" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择职务"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-circle-check"
          size="mini"  
          style="margin-top:10px;"
          >保存</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <div class="intergral">
          <span>小组总积分：</span>
          <el-input
          value="420"
          size="small"
          style="width: 80px"
          readonly
        />
        </div>
      </el-col>
      <el-col :span="1.5">
        <div class="intergral">
          <span>可分配积分：</span>
          <el-input
          value="420"
          size="small"
          style="width: 80px"
          readonly
        />
        </div>
      </el-col>
      
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="memberList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column label="成员姓名" prop="name" align="center" />
      <el-table-column label="组内职务" prop="duty" align="center" />
      <el-table-column label="分配积分" align="center">
        <template slot-scope="scope">
          <el-input
          v-model="scope.row.score"
          placeholder="请输入积分"
          clearable
          size="small"
          style="width: 240px"
        />
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.current"
      :limit.sync="queryParams.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { areaList, addArea, getArea, deleteArea } from "@/api/proposal/area";

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 类别表格数据
      memberList: [
        {
           id: 0,
          name: "张阳",
          age: "25",
          sex: "女",
          post: "员工",
          duty: "成员",
          degree: "大专",
        },
        {
          id: 1,
          name: "苗龙涛",
          age: "32",
          sex: "男",
          post: "主任",
          duty: "成员",
          degree: "本科",
        },
        {
          id: 2,
          name: "蔡文静",
          age: "46",
          sex: "女",
          post: "主任",
          duty: "成员",
          degree: "大专",
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        current: 1,
        size: 10,
        name: undefined,
      },
      statusOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "小组名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "课题登记号不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = false;
      this.categoryList = [
        {
          code: "FAMKT20200901",
          title: "设备升级改造",
          groupName: "降耗QC小组",
          createTime: "2020-02-01",
          finishTime: "2020-11-20",
          id: 0,
          status: 0,
          score: 0,
        },
        {
          code: "FAMKT20200102",
          title: "工程设计方案优化",
          groupName: "铆焊QC小组",
          createTime: "2020-02-01",
          finishTime: "2020-11-20",
          id: 1,
          status: 1,
          score: 0,
        },
        {
          code: "FAMKT20201020",
          title: "生产流程改造",
          groupName: "生产技术部QC小组",
          createTime: "2020-02-01",
          finishTime: "2020-11-20",
          id: 2,
          status: 2,
          score: 50,
        },
      ];
      this.total = 2;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        name: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pages = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.reset();
      this.open = true;
      this.title = "新增课题";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const areaId = row.id || this.ids;
      this.open = true;
      this.title = "修改课题";
    },
    /** 审核 */
    check(row) {
      if (this.ids.length > 0) {
        this.$router.push({
          path: "/QCGroup/check/" + this.ids,
        });
      } else {
        this.$router.push({
          path: "/QCGroup/check/" + row.id,
        });
      }
    },
    upload(row) {
      this.$router.push({
        path: "/QCGroup/accessory/" + row.id,
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            addArea(this.form).then((res) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addArea(this.form).then((res) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const areaId = row.id || this.ids;
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return deleteArea(areaId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.intergral {
  margin-top: 10px;
  /deep/ .el-input--small .el-input__inner{
      text-align: center;
  }
}
</style>