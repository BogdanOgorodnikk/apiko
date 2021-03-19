<template>
    <div class="container">
        <div class="register-form-box">
            <form class="register-form" @submit.prevent="signup">
                <h2 class="register-form__headline">Register</h2>
                <p class="register-form__info">EMAIL</p>
                <input class="register-form__input" type="text" placeholder="Example@gmail.com" v-model="email"
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
                <p class="register-form__info">FULL NAME</p>
                <input class="register-form__input" type="text" placeholder="Tony Stark" v-model="fullname"
                    :class="{invalid: ($v.fullname.$dirty && !$v.fullname.required) || ($v.fullname.$dirty && !$v.fullname.minLength)}"
                >
                <small class="helper-text__invalid"
                    v-if="$v.fullname.$dirty && !$v.fullname.required"
                    >Поле вашего имени не должно быть пустым!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.fullname.$dirty && !$v.fullname.minLength"
                    >Минимально количество символов {{$v.fullname.$params.minLength.min}} штук! Сейчас он: {{fullname.length}}</small>
                <div class="register-form__block">
                    <p class="register-form__info">PASSWORD</p>
                    <input class="register-form__input" :type="showPass ? 'text' : 'password'" v-model="password"
                        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                    >
                    <small class="helper-text__invalid"
                    v-if="$v.password.$dirty && !$v.password.required"
                    >Поле пароля не должно быть пустым!</small>
                    <small class="helper-text__invalid"
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                    >Минимально количество символов {{$v.password.$params.minLength.min}} штук! Сейчас он: {{password.length}}</small>
                    <img class="register-form__img" src="../../assets/img/watch.png" alt="watch" @click.prevent="changeShowPass" >
                </div>
                <div class="register-form__block">
                    <p class="register-form__info">PASSWORD AGAIN</p>
                    <input class="register-form__input" :type="showConfirmPass ? 'text' : 'password'" v-model="confirmPassword"
                        :class="{invalid: !$v.confirmPassword.sameAsPassword}"
                    >
                    <small class="helper-text__invalid"
                        v-if="!$v.confirmPassword.sameAsPassword">
                        Пароли не идентичные!
                    </small>
                    <img class="register-form__img" src="../../assets/img/watch.png" alt="watch" @click.prevent="changeConfirmPass">
                </div>
                <button class="register-form__button" type="submit">Continue</button>
            </form>
        </div>
        <div class="register-form-login">
            <p class="register-form-login__info">I already have account, 
                <router-link class="register-form-login__info--link" to="/login">
                    LOG IN
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
import {email, minLength, required, sameAs} from 'vuelidate/lib/validators'

export default {
    name: "LoginForm",
    data: () => ({
        email: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        showPass: false,
        showConfirmPass: false
    }),
    validations: {
        email: {required, email},
        fullname: {required, minLength: minLength(2)},
        password: {required, minLength: minLength(6)},
        confirmPassword: {sameAsPassword: sameAs('password')}
    },
    methods: {
        async signup() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formdata = {
                email: this.email,
                fullname: this.fullname,
                password: this.password
            }
            try {
                await this.$store.dispatch('register', formdata)
                this.$router.push('/login')
            } catch(e) {
                alert('Произошла ошибка')
            }
        },
        changeShowPass() {
            this.showPass = !this.showPass
        },
        changeConfirmPass() {
            this.showConfirmPass = !this.showConfirmPass
        }
    }
}
</script>

<style lang="scss" scoped>
    .register-form-box {
        width: 425px;
        background: #FFFFFF;
        box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
        border-radius: 7px; 
        margin: 81px auto 0;
        overflow: hidden;
    }
    .register-form {
        margin-left: 24px;
    }
    .register-form__headline {
        font-size: 22px;
        font-weight: 400;
        color: #282828;
        text-align: center;
        margin-top: 25px;
        margin-bottom: 17px;
    }
    .register-form__info {
        font-size: 12px;
        font-weight: 400;
        color: #303030;
        margin-top: 15px;
    }
    .register-form__input {
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
    .register-form__block {
        position: relative;
    }
    .register-form__img {
        position: absolute;
        top: 33px;
        left: 335px;
        cursor: pointer;
    }
    .register-form__button {
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
    .register-form-login {
        background: #FFFFFF;
        box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
        border-radius: 7px;
        overflow: hidden;
        width: 425px;
        margin: 21px auto;
    }
    .register-form-login__info {
        color: #2A2A2A;
        font-size: 14px;
        padding: 30px 0;
        text-align: center;
    }
    .register-form-login__info--link {
        text-decoration: none;
        color: #349A89;
    }
    @media screen and (max-width: 500px) {
        .register-form-box {
            max-width: 240px;
        }
        .register-form__input {
            width: 100%;
        }
        .register-form {
            margin-right: 24px;
        }
        .register-form__button {
            width: 100%;
        }
        .register-form-login {
            max-width: 240px;
        }
    }
</style>