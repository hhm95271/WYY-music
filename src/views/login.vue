<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/login.png" alt />
    </div>
    <!-- 登录消息 -->
    <div class="loginform">
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        type="tel"
        v-model="loginForm.phone"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        type="password"
        v-model="loginForm.password"
      ></mt-field>
      <mt-field
        type="number"
        placeholder="请输入验证码"
        v-model="loginForm.captcha"
      >
        <span id="span" @click="captchaNum" v-text="txtcaptcha"></span>
      </mt-field>
      <mt-button
        size="large"
        @click.native="loginUserForm"
        :type="loginForm.isprimary"
        >登录
      </mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import axios from '@/router/myaxios';
export default {
  data() {
    return {
      // 随机验证码
      txtcaptcha: '获取验证',
      loginForm: {
        phone: '18870260352',
        password: 'tzy520...+',
        isprimary: 'primary',
        captcha: '',
      },
    };
  },
  methods: {
    // 登陆
    loginUserForm() {
      console.log(12);
      let { phone, password, captcha } = this.loginForm;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        Toast({
          message: '手机号码错误',
          position: 'top',
          duration: 1000,
        });
        return false;
      } else if (password.toString().length < 7 || password == '') {
        Toast({
          message: '密码错误',
          position: 'top',
          duration: 1000,
        });
        return false;
      } else if (captcha != this.txtcaptcha) {
        Toast({
          message: '验证码错误',
          position: 'top',
          duration: 1000,
        });
        this.loginForm.captcha = '';
        this.captchaNum();
        return false;
      }
      axios
        .post('/login/cellphone', {
          phone,
          password,
        })
        .then((res) => {
          console.log(res);
          let { id } = res.data.account;
          sessionStorage.setItem('uid', id);
          this.$router.push('/User1');
        });
    },
    // 验证码
    captchaNum() {
      // 存放验证码
      // 验证码长度
      this.txtcaptcha = '';
      var codelength = 4;
      var arrcode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (var i = 0; i < codelength; i++) {
        var codeIndex = Math.floor(Math.random() * 10);
        this.txtcaptcha += arrcode[codeIndex];
      }
      console.log(this.txtcaptcha);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scope>
#span {
  background: #ccc;
  display: block;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 0.3125rem;
  font-size: 0.625rem;
  color: #f8f8f8;
}
.login {
  height: 37rem;
  width: 100%;
  background: #f8f8f8
    url('https://imgessl.kugou.com/h5_pic/20180727152725698372.png') no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .logo {
    width: 50%;
    height: 2rem;
    img {
      height: 100%;
    }
  }
  .loginform {
    width: 90%;
  }
}
</style>
