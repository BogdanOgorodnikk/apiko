<template>
    <div class="create-product">
        <div class="container">
            <div class="create-product__box">
                <h2 class="create-product__headline">
                    Add product
                </h2>
                <div class="create-product__wrap">
                    <form class="create-product__form" @submit.prevent="CreateProduct">
                        <p class="create-product__info">TITLE<span class="create-product__info--span">*</span></p>
                        <input class="create-product__input" type="text" placeholder="For example: Iron man suit" v-model="title"
                            :class="{invalid: ($v.title.$dirty && !$v.title.required) || ($v.title.$dirty && !$v.title.minLength)}"
                        >
                        <small 
                        class="helper-text__invalid"
                        v-if="$v.title.$dirty && !$v.title.required"
                        >Поле Title не должно быть пустым!</small>
                        <small 
                        class="helper-text__invalid"
                        v-else-if="$v.title.$dirty && !$v.title.minLength"
                        >Минимально количество символов {{$v.title.$params.minLength.min}} штук! Сейчас он: {{title.length}}</small>
                        <p class="create-product__info">LOCATION<span class="create-product__info--span">*</span></p>
                        <input class="create-product__input" type="text" placeholder="For example: Los Angeles, CA" v-model="location"
                            :class="{invalid: ($v.location.$dirty && !$v.location.required) || ($v.location.$dirty && !$v.location.minLength)}"
                        >
                        <small 
                        class="helper-text__invalid"
                        v-if="$v.location.$dirty && !$v.location.required"
                        >Поле Location не должно быть пустым!</small>
                        <small 
                        class="helper-text__invalid"
                        v-else-if="$v.location.$dirty && !$v.location.minLength"
                        >Минимально количество символов {{$v.location.$params.minLength.min}} штук! Сейчас он: {{location.length}}</small>
                        <p class="create-product__info">DESCRIPTION</p>
                        <textarea class="create-product__textarea" placeholder="For example: Irton man suit" v-model="description"
                            :class="{invalid: ($v.description.$dirty && !$v.description.required) || ($v.description.$dirty && !$v.description.minLength)}"
                        ></textarea>
                        <small 
                        class="helper-text__invalid"
                        v-if="$v.description.$dirty && !$v.description.required"
                        >Поле Description не должно быть пустым!</small>
                        <small 
                        class="helper-text__invalid"
                        v-else-if="$v.description.$dirty && !$v.description.minLength"
                        >Минимально количество символов {{$v.description.$params.minLength.min}} штук! Сейчас он: {{description.length}}</small>
                        <p class="create-product__info">PHOTOS</p>
                        <div class="create-product__download"
                            :class="{invalid: ($v.photos.$dirty && !$v.photos.required)}"
                        >
                            <img class="create-product__download--img" :src="imageUrl" v-if="photos !== null">
                            <input type="file" id="input__file" class="create-product__download--input" ref="input__file" @change="handleFileUpload">
                            <label for="input__file" class="create-product__download--btn">
                                <span class="create-product__download--btn-span">+</span>
                            </label>
                        </div>
                        <small 
                        class="helper-text__invalid"
                        v-if="$v.photos.$dirty && !$v.photos.required"
                        >Поле Photos не должно быть пустым!</small>
                        <p class="create-product__info">PRICE</p>
                        <input class="create-product__input" type="text" placeholder="For example: Los Angeles, CA" v-model="price"
                            :class="{invalid: ($v.price.$dirty && !$v.price.required) || ($v.price.$dirty && !$v.price.minValue)}"
                        >
                        <small 
                        class="helper-text__invalid"
                        v-if="$v.price.$dirty && !$v.price.required"
                        >Поле Price не должно быть пустым!</small>
                        <button class="create-product__button">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {minLength, required, minValue} from 'vuelidate/lib/validators'

export default {
    name: "CreateProduct",
    data: () => ({
        title: '',
        location: '',
        description: '',
        photos: null,
        imageUrl: '',
        price: ''
    }),
    validations: {
        title: {required, minLength: minLength(3)},
        location: {required, minLength: minLength(2)},
        description: {required, minLength: minLength(6)},
        photos: {required},
        price: {required, minValue: minValue(1)}
    },
    methods: {
        async CreateProduct() {
            try {
                if(this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                if(!this.photos) {
                    return false
                }
                await this.$store.dispatch('createProduct', {
                    title: this.title,
                    location: this.location,
                    description: this.description,
                    price: this.price,
                    photos: this.photos
                })
                this.title = ''
                this.location = ''
                this.description = ''
                this.price = ''
                this.photos = null
            } catch(e) {
                alert('Произошла ошибка')
            }
        },
        handleFileUpload(event){
            this.photos = this.$refs.input__file.files[0];
            const files = event.target.files
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.photos = files[0]
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-product__box {
        max-width: 1136px;
        background: #fff;
        box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
        margin: 34px auto 95px;
        overflow: hidden;
        border-radius: 7px;
    }
    .create-product__headline {
        color: #282828;
        font-size: 22px;
        text-align: center;
        margin-top: 36px;
        font-weight: 400;
    }
    .create-product__wrap {
        max-width: 668px;
        margin-right: auto;
        margin-left: auto;
    }
    .create-product__info {
        color: #303030;
        font-size: 12px;
        font-weight: 400;
        margin-top: 24px;
    }
    .create-product__info--span {
        color: #ff0000;
    }
    .create-product__input {
        background: #F9FAFB;
        width: 664px;
        height: 58px;
        border: 1px solid #DEDEE0;
        font-size: 16px;
        font-weight: 400;
        border-radius: 5px;
        padding: 0 23px;
        &::placeholder {
            color: #b8b8b8;
        }
    }
    .create-product__textarea {
        resize: none;
        width: 664px;
        height: 183px;
        background: #F9FAFB;
        border: 1px solid #DEDEE0;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 400;
        padding: 19px 23px;
        &::placeholder {
            color: #b8b8b8;
        }
    }
    .create-product__download--input {
        opacity: 0;
        visibility: hidden;
        position: absolute;
    }
    .create-product__download {
        width: 664px;
        height: 124px;
        background: #F9FAFB;
        border: 1px solid #DEDEE0;
        border-radius: 5px;
        display: flex;
    }
    .create-product__download--img {
        display: block;
        width: 92px;
        height: 92px;
        margin: 16px;
    }
    .create-product__download--btn {
        display: block;
        width: 92px;
        height: 92px;
        background: #E4E4E4;
        border-radius: 4px;
        margin: 16px;
        cursor: pointer;
    }
    .create-product__download--btn-span {
        color: #349A89;
        font-size: 78px;
        margin-left: 24px;
    }
    .create-product__button {
        display: block;
        background: #349A89;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        border: none;
        width: 377px;
        height: 58px;
        cursor: pointer;
        margin: 32px 145px;
    }
    @media screen and (max-width: 698px) {
        .create-product__input {
            width: 100%;
        }
        .create-product__form {
            padding-left: 5px;
            padding-right: 5px;
        }
        .create-product__textarea {
            width: 100%;
        }
        .create-product__download {
            width: 100%;
        }
        .create-product__button {
            margin: 32px auto;
            width: 50%;
        }
    }
</style>