<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-border">
      <div class="login-main animated fadeIn leftImg">
        <div class="login-info text-white animated fadeInLeft">
          <h2 class="login-info-title">欢迎登录!</h2>
        </div>
      </div>
      <div class="login-main animated fadeIn">
        <img src="../../assets/img/3logo.png" alt="logo" width="185px" height="72px" style="" style="margin:0px 0 0 70px">
        <h2>在线运维管理系统</h2>
        <span>系统登录</span>
        <userLogin></userLogin>
      </div>
    </div>
  </div>
</template>
<script>
  import userLogin from "./userlogin";
  export default {
    name: "login",
    data() {
      return {
        activeName: "user"
      };
    },
    created() {},
    mounted() {},
    computed: {},
    props: [],
    methods: {
      handleClick() {}
    },
    components: {
      userLogin
    }
  };

</script>

<style lang="scss">
  .login-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .login-container::before {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/login.jpg");
    background-size: cover;
  }

  .login-info-title {
    line-height: 400px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 8px;
  }

  .login-info-item {
    font-size: 14px;
  }

  .login-border {
    margin: 0 auto;
  }

  .login-main {
    float: left;
    padding: 20px;
    width: 360px;
    height: 455px;
    box-sizing: border-box;
    background-color: #fff;
    &>.el-tabs {
      margin-top: 30px;
    }
    &>h2{
      text-align: center;
    }
    &>span{
      font-size: 18px;
      text-align: center;
      color: #b20000;
      display:block;
      letter-spacing: 8px;
    }
  }

  .leftImg {
    background: url("../../assets/img/2tu.jpg");
  }

  .login-main>h3 {
    margin-bottom: 20px;
  }

  .login-main>p {
    color: #76838f;
  }

  .login-submit {
    width: 100%;
  }

  .login-form {
    margin: 10px 0;
  }

  .login-code {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 0 10px;
  }

  .login-code-img {
    width: 100px;
    height: 43px;
    background-color: #eee;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 2px;
    text-indent: 2px;
    text-align: center;
    cursor: pointer;
  }

  .login-code-icon {}
  .el-form-item__error {
    left: 60px;
  }
</style>
