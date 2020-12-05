<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行政职务" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择行政职务"
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
          placeholder="请选择组内职务"
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

      <el-form-item label="文化程度" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择文化程度"
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
      <el-form-item label="性别" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择性别"
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
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:role:add']"
          >新增成员</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:role:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="categoryList"
      @selection-change="handleSelectMemberChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="70" />
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="行政职务" prop="post" align="center" />
      <el-table-column label="组内职务" prop="duty" align="center" />
      <el-table-column label="文化程度" prop="degree" align="center" />
      <el-table-column label="年龄" prop="age" align="center" />
      <el-table-column label="性别" prop="sex" align="center" />
      <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
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

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.current"
      :limit.sync="queryParams.size"
      @pagination="getList"
    />

    <!-- 添加或修改区域对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="980px"
      append-to-body
    >
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          size="small"
          style="width: 120px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行政职务" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择行政职务"
          clearable
          size="small"
          style="width: 120px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
           <el-form-item label="文化程度" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择文化程度"
          clearable
          size="small"
          style="width: 120px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择性别"
          clearable
          size="small"
          style="width: 120px"
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
       <el-table
      v-loading="loading"
      :data="categoryList"
      @selection-change="handleSelectMemberChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="70" />
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="行政职务" prop="post" align="center" />
      <el-table-column label="文化程度" prop="degree" align="center" />
      <el-table-column label="年龄" prop="age" align="center" />
      <el-table-column label="性别" prop="sex" align="center" />
       </el-table>
       <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.current"
      :limit.sync="queryParams.size"
      @pagination="getList"
      style="margin-top:5px"
    />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>

    </el-dialog>
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
      categoryList: [],
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
          { required: true, message: "区域名称不能为空", trigger: "blur" },
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
          id: 0,
          name: "张雨生",
          age: "35",
          sex: "男",
          post: "经理",
          duty: "组长",
          degree: "研究生",
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
        {
           id: 3,
          name: "张阳",
          age: "25",
          sex: "女",
          post: "员工",
          duty: "成员",
          degree: "大专",
        },
        {
           id: 4,
          name: "袁豪文",
          age: "30",
          sex: "女",
          post: "经理",
          duty: "成员",
          degree: "大专",
        },
        {
           id: 5,
          name: "姚文轩",
          age: "29",
          sex: "女",
          post: "经理",
          duty: "成员",
          degree: "本科",
        },
        {
           id: 6,
          name: "蔡晓旭",
          age: "36",
          sex: "男",
          post: "经理",
          duty: "成员",
          degree: "大专",
        },
        {
           id: 7,
          name: "杨平平",
          age: "20",
          sex: "女",
          post: "员工",
          duty: "成员",
          degree: "大专",
        },
        {
           id: 8,
          name: "周慧娟",
          age: "23",
          sex: "女",
          post: "员工",
          duty: "成员",
          degree: "本科",
        },
        {
           id: 9,
          name: "程丽丽",
          age: "30",
          sex: "女",
          post: "经理",
          duty: "成员",
          degree: "本科",
        },
        {
           id: 10,
          name: "陈阳",
          age: "30",
          sex: "女",
          post: "员工",
          duty: "成员",
          degree: "大专",
        },
      ];
      this.total = 10;
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
    // 选择成员
    handleSelectMemberChange(selection){},
    /** 新增按钮操作 */
    handleAdd() {
      // this.reset();
      this.open = true;
      this.title = "新增成员";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const areaId = row.id || this.ids;
      this.open = true;
      this.title = "修改提案";
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
/deep/ .el-upload-list--picture-card .el-upload-list__item-actions span + span {
  margin-left: 5px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-actions {
  font-size: 16px;
}
/deep/ .el-dialog__footer{
    padding-top: 20px;
}
</style>