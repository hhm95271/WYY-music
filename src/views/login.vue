<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/login.png" alt />
    </div>
    <!-- 提示消息 -->

    <div class="form">
      <form id="ruleForm" ref="loginForm">
        <mt-field placeholder="请输入手机号" type="number" :state="state" v-model="loginForm.phone"></mt-field>
        <mt-field placeholder="请输入密码" type="password" v-model="loginForm.password"></mt-field>
        <mt-button @click="login" @keyup.native.enter="login" type="primary">登陆</mt-button>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "@/router/myaxios";
export default {
  data() {
    return {
      loginForm: {
        phone: "18870260352",
        password: "tzy520..."
      },
      state: ""
    };
  },
  methods: {
    login() {
      var phone1 = parseFloat(this.loginForm.phone);
      var password1 = this.loginForm.password;
      if (!phone1 || phone1 == "" || phone1.toString().length !== 11) {
        setTimeout(() => {
          this.state = "error";
          Toast("手机号码错误");
        }, 100);
        return false;
      }
      if (!password1 || password1 == "") {
        setTimeout(() => {
          Toast("请输入密码");
        }, 100);
        return false;
      }

      axios({
        url: "/login/cellphone",
        data: {
          password: password1,
          phone: phone1
        },
        method: "POST"
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            console.log("ok");
            sessionStorage.setItem("my-token", res.data.token);
            this.$router.go(-1);
          } else {
            setTimeout(() => {
              Toast("密码错误");
            }, 100);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    //底部消失效果
  },
  mounted() {}
};
</script>

<style lang='less' scope>
.login {
  height: 35rem;
  width: 100%;
  background: #f8f8f8
    url("https://imgessl.kugou.com/h5_pic/20180727152725698372.png") no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .logo {
    width: 50%;
    height: 3rem;
  }
  .form {
    width: 80%;
    height: 10rem;
    .mint-button--normal {
      margin-top: 5px;
      width: 100%;
      background: cornflowerblue;
    }
  }
}
</style>