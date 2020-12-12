<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="项目名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入项目名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目来源" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择项目来源"
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
      <el-form-item label="项目负责人" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择项目负责人"
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
      <el-form-item label="项目类型" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择项目类型"
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
      <el-form-item label="成本类别" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择成本类别"
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
          >审核</el-button
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
      <el-table-column label="项目编号" align="center">
        <template slot-scope="scope">
          <router-link
            :to="'/improveProject/detail/' + scope.row.id"
            class="link-type"
          >
            <span>{{ scope.row.code }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="项目名称"
        prop="projectName"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="项目来源"
        prop="source"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="项目类型" prop="projectType" align="center" />
      <el-table-column label="项目负责人" prop="leader" align="center" />
      <el-table-column label="成本类别" prop="costType" align="center" />
      <el-table-column label="部门" prop="departmentName" align="center" />
      <el-table-column label="科室/班组" prop="team" align="center" />
      <el-table-column label="节约总金额" prop="saveAmount" align="center" />
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
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-user-solid"
            @click="handleMember(scope.row)"
            v-hasPermi="['system:role:edit']"
            >成员</el-button
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
            icon="el-icon-s-check"
            @click="check(scope.row)"
            >审核</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-upload"
            @click="upload(scope.row)"
            >上传附件</el-button
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
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入小组名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目编号" prop="name">
              <el-input v-model="form.name" placeholder="自动生成" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目来源" prop="name">
              <el-select
                v-model="form.sex"
                placeholder="请选择部门"
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
            <el-form-item label="项目负责人" prop="name">
              <el-select
                v-model="form.sex"
                placeholder="请选择项目负责人"
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目类型" prop="name">
              <el-select
                v-model="form.sex"
                placeholder="请选择项目类型"
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
            <el-form-item label="成本类别" prop="name">
              <el-select
                v-model="form.sex"
                placeholder="请选择成本类别"
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" prop="name">
              <el-select
                v-model="form.sex"
                placeholder="请选择部门"
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
            <el-form-item label="科室/班组" prop="name">
              <el-select
                v-model="form.sex"
                placeholder="请选择科室或班组"
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预计节约总金额" prop="name">
              <el-input v-model="form.name" placeholder="请输入节约总金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小组成员" prop="name">
              <el-select
                v-model="form.postIds"
                multiple
                placeholder="请选择成员"
                style="width: 100%"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="问题描述" prop="name">
              <el-input
                type="textarea"
                v-model="form.name"
                placeholder="请输入问题描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="采取措施" prop="name">
              <el-input
                type="textarea"
                v-model="form.name"
                placeholder="请输入采取措施"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="计算明细" prop="name">
              <el-input
                type="textarea"
                v-model="form.name"
                placeholder="请描述计算明细"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
          { required: true, message: "小组名称不能为空", trigger: "blur" },
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
          code: "P20200901",
          projectName: "标准印痕滚检机改造",
          departmentName: "技术部",
          source: "对标",
          projectType: "效率",
          leader: "张雨生",
          costType: "材料费用",
          team: "一班",
          saveAmount: "120000",
          status:'0',
          id: 0,
        },
        {
          code: "P20200102",
          projectName: "生产流程改造",
          departmentName: "生产部",
          source: "对标",
          projectType: "管理",
          leader: "周筱奎",
          costType: "材料费用",
          team: "二班",
          saveAmount: "120000",
          status:'1',
          id: 1,
        },
        {
          code: "P20201020",
          projectName: "工程设计方案优化",
          departmentName: "工程部",
          source: "对标",
          projectType: "质量",
          leader: "马燕",
          costType: "材料费用",
          team: "三班",
          saveAmount: "120000",
          status:'2',
          id: 2,
        },
      ];
      this.total = 3;
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
      this.title = "新增项目";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const areaId = row.id || this.ids;
      this.open = true;
      this.title = "修改项目";
    },
    /** 审核 */
    check(row) {
      if (this.ids.length > 0) {
        this.$router.push({
          path: "/improveProject/check/" + this.ids,
        });
      } else {
        this.$router.push({
          path: "/improveProject/check/" + row.id,
        });
      }
    },
    upload(row) {
      this.$router.push({
        path: "/improveProject/accessory/" + row.id,
      });
    },
    /** 成员操作 */
    handleMember(row) {
      // const areaId = row.id;
      this.$router.push({ path: "/QCGroup/member/" + row.id });
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