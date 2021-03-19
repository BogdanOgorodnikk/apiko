<template>
    <div class="login">
        <Header />
        <LoginForm />
    </div>
</template>

<script>
import Header from '../components/login/Header'
import LoginForm from '../components/login/LoginForm'

export default {
    name: "Login",
    components: {
        Header,
        LoginForm
    }
}
</script>