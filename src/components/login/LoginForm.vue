<template>
    <div class="container">
        <div class="login-form-box">
            <form class="login-form" @submit.prevent="signin">
                <h2 class="login-form__headline">Login</h2>
                <p class="login-form__info">EMAIL</p>
                <input class="login-form__input" type="text" placeholder="Example@gmail.com" v-model="email"
                    :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                >
                <small 
                class="helper-text__invalid"
                v-if="$v.email.$dirty && !$v.email.required"
                >Поле Email не должно быть пустым!</small>
                <small 
                class="helper-text__invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
                >Введите коректный Email!</small>
                <div class="login-form__block">
                    <p class="login-form__info">PASSWORD</p>
                    <input class="login-form__input" :type="showPass ? 'text' : 'password'" v-model="password"
                        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                    >
                    <small class="helper-text__invalid"
                    v-if="$v.password.$dirty && !$v.password.required"
                    >Поле пароля не должно быть пустым!</small>
                    <small class="helper-text__invalid"
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                    >Минимально количество символов {{$v.password.$params.minLength.min}} штук! Сейчас он: {{password.length}}</small>
                    <img class="login-form__img" src="../../assets/img/watch.png" alt="watch" @click.prevent="changeShowPass">
                </div>
                <p class="login-form__forget-password">Don`t remember password?</p>
                <button class="login-form__button" type="submit">Continue</button>
            </form>
        </div>
        <div class="login-form-register">
            <p class="login-form-register__info">I have no account, 
                <router-link class="login-form-register__info--link" to="/register">
                    REGISTER NOW
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
import {email, minLength, required} from 'vuelidate/lib/validators'

export default {
    name: "LoginForm",
    data: () => ({
        email: '',
        password: '',
        showPass: false
    }),
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async signin() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formdata = {
                email: this.email,
                password: this.password
            }
            try {
                await this.$store.dispatch('login', formdata);
                this.$router.push('/');
            } catch (e) {
                return false
            }
        },
        changeShowPass() {
            this.showPass = !this.showPass
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-form-box {
        width: 425px;
        background: #FFFFFF;
        box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
        border-radius: 7px; 
        margin: 81px auto 0;
        overflow: hidden;
    }
    .login-form {
        margin-left: 24px;
    }
    .login-form__headline {
        font-size: 22px;
        font-weight: 400;
        color: #282828;
        text-align: center;
        margin-top: 25px;
        margin-bottom: 17px;
    }
    .login-form__info {
        font-size: 12px;
        font-weight: 400;
        color: #303030;
        margin-top: 15px;
    }
    .login-form__input {
        background: #F9FAFB;
        border: 1px solid #DEDEE0;
        border-radius: 5px;
        width: 377px;
        height: 58px;
        font-size: 16px;
        font-weight: 400;
        padding: 0 48px 0 13px;
        &::placeholder {
            color: #b8b8b8;
        }
    }
    .login-form__block {
        position: relative;
    }
    .login-form__img {
        position: absolute;
        top: 33px;
        left: 335px;
        cursor: pointer;
    }
    .login-form__forget-password {
        text-align: right;
        font-size: 14px;
        font-weight: 400;
        color: #8C8C8C;
        margin-top: 5px;
        margin-right: 23px;
    }
    .login-form__button {
        display: block;
        background: #349A89;
        width: 377px;
        height: 58px;
        margin-top: 16px;
        margin-bottom: 21px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        cursor: pointer;
    }
    .login-form-register {
        background: #FFFFFF;
        box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
        border-radius: 7px;
        overflow: hidden;
        width: 425px;
        margin: 21px auto;
    }
    .login-form-register__info {
        color: #2A2A2A;
        font-size: 14px;
        padding: 30px 0;
        text-align: center;
    }
    .login-form-register__info--link {
        text-decoration: none;
        color: #349A89;
    }
    @media screen and (max-width: 500px) {
        .login-form-box {
            max-width: 240px;
        }
        .login-form__input {
            width: 100%;
        }
        .login-form {
            margin-right: 24px;
        }
        .login-form__button {
            width: 100%;
        }
        .login-form-register {
            max-width: 240px;
        }
    }
</style>