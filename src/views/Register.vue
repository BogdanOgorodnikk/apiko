<template>
    <div class="register">
        <Header />
        <RegisterForm />
    </div>
</template>

<script>
import Header from '../components/register/Header'
import RegisterForm from '../components/register/RegisterForm'

export default {
    name: "Register",
    components: {
        Header,
        RegisterForm
    }
}
</script>