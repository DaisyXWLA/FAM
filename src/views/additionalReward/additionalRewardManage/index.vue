<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="奖励人" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择人员"
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
      <el-form-item label="奖励日期" prop="status">
        <el-date-picker
          v-model="title"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
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
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:role:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-s-check"
          size="mini"
          :disabled="single"
          @click="check"
          v-hasPermi="['system:role:remove']"
          >同意</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-circle-close"
          size="mini"
          :disabled="single"
          @click="check"
          v-hasPermi="['system:role:remove']"
          >拒绝</el-button
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column
        label="奖励原因"
        prop="title"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="奖励人" prop="name" align="center" />
      <el-table-column
        label="奖励日期"
        prop="createTime"
        align="center"
        width="150"
      />
      <el-table-column
        label="奖励积分"
        prop="integral"
        align="center"
        width="150"
      />
      <el-table-column label="审核状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            v-if="scope.row.status == 0"
            style="width: 70px"
          >
            待审核
          </el-tag>
          <el-tag
            type="success"
            v-if="scope.row.status == 1"
            style="width: 70px"
          >
            审核中
          </el-tag>
          <el-tag type="" v-if="scope.row.status == 2"> 审核通过 </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-check"
            @click="check(scope.row)"
            >同意</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-close"
            @click="refuse(scope.row)"
            >拒绝</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:role:edit']"
            >修改</el-button
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

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.current"
      :limit.sync="queryParams.size"
      @pagination="getList"
    />

    <!-- 添加或修改区域对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="奖励人" prop="name">
                <el-select
                  v-model="form.sex"
                  placeholder="请选择人员"
                  style="width: 100%"
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖励日期" prop="creatTime">
                <el-date-picker
                  v-model="title"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item label="奖励原因" prop="name">
              <el-input
                type="textarea"
                v-model="form.name"
                placeholder="请输入奖励原因"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="内容" prop="code">
              <el-input
                type="textarea"
                v-model="form.name"
                placeholder="内容"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="奖励积分" prop="code">
              <el-input v-model="form.name" placeholder="奖励积分" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 审核对话框 -->
    <el-dialog
      :title="checkTitle"
      :visible.sync="checkOpen"
      width="600px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="50px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="name">
              <el-input
                type="textarea"
                v-model="form.name"
                placeholder="请输入描述内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="checkCancel">取 消</el-button>
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
      checkTitle: "",
      // 是否显示弹出层
      open: false,
      checkOpen: false,
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
          name: "蔡晓旭",
          createTime: "2020-02-01",
          integral: "20",
          id: 0,
          status: 0,
          score: 0,
        },
        {
          code: "FAMKT20200102",
          title: "工程设计方案优化",
          name: "姚文轩",
          createTime: "2020-02-01",
          integral: "20",
          id: 1,
          status: 1,
          score: 0,
        },
        {
          code: "FAMKT20201020",
          title: "生产流程改造",
          name: "周慧娟",
          createTime: "2020-02-01",
          integral: "20",
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
      this.title = "新增奖励";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const areaId = row.id || this.ids;
      this.open = true;
      this.title = "修改奖励";
    },
    /** 审核 */
    check(row) {
      this.checkOpen = true;
      this.checkTitle = "奖励审核通过";
    },
    refuse(row) {
      this.checkOpen = true;
      this.checkTitle = "奖励审核拒绝";
    },
    checkCancel() {
      this.checkOpen = false;
      this.reset();
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
/deep/ .el-upload-list--picture-card .el-upload-list__item-actions span + span {
  margin-left: 5px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-actions {
  font-size: 16px;
}
</style>