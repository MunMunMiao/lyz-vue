<template>

    <div class="signup">

        <v-card width="100%" height="100%">

            <v-img height="200" contain :src="logo"></v-img>

            <v-card-text class="content">

                <div class="text">
                    <v-text-field label="Name"></v-text-field>
                </div>
                <div class="text">
                    <v-text-field label="Password" type="password"></v-text-field>
                </div>
                <div class="text">
                    <v-text-field label="Confirm password" type="password"></v-text-field>
                </div>

            </v-card-text>

            <v-card-actions class="actions">

                <v-btn block color="primary">submit</v-btn>

            </v-card-actions>

            <v-card-actions class="actions">

                <v-btn depressed flat color="secondary" to="/passport/login">Login</v-btn>

                <v-btn depressed flat color="secondary">Forget?</v-btn>

            </v-card-actions>

        </v-card>

    </div>

</template>
<style lang="less" scoped>

    .signup{


        .content{
            width: 100%;
            padding: 0 10%;

            .text{
                width: 100%;
            }
        }
        .actions{
            width: 100%;
            padding: 5% 10%;
            justify-content: space-between;
        }
    }

</style>
<script>

    import logo from '../../assets/images/logo.svg'

    export default ({
        name: 'signup',
        props: [],
        data() {
            return {}
        },
        components: {},
        computed: {
            logo(){
                return logo
            }
        },
        watch: {},
        beforeCreate() {

        },
        create() {

        },
        beforeMount() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {}

    })
</script>
