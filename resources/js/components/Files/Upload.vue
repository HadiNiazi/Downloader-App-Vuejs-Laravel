<template>
    <div class="container">
        <div class="row">
            <div class="col-8 offset-2 mt-5">
                <div class="card">

                    <div class="card-header">
                        Upload Files
                    </div>

                    <div class="card-body">

                        <div>
                            <ul v-for="error in errors">
                                <li class="text-danger">{{ error }}</li>
                            </ul>
                        </div>

                        <div v-if="successMsg" class="alert alert-success" role="alert">
                            {{ successMsg }}
                        </div>

                        <form @submit.prevent="uploadFile">
                            <input type="file" class="form-control" @change="handleFile">
                            <button type="submit" class="btn btn-primary btn-sm mt-2">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            file: '',
            formData: null,
            errors: [],
            successMsg: ''
        }
    },

    methods: {
        handleFile(event) {
            this.file = event.target.files[0]
        },

        uploadFile() {

            this.clearMessages();

            this.formData = new FormData();
            this.formData.append('file', this.file)

            axios.post('api/files/uploads', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).
            then( response => {

                if (response.status == 201) {
                    this.successMsg = response.data.message;
                }

            }).
            catch( error => {

                if (error.response.status == 422) {
                    this.errors = Object.values(error.response.data.errors).flat()
                }
                else {
                    this.errors = ['Something went wrong, please refresh the webpage and try again']
                }

            })

        },

        clearMessages() {
            this.errors = [],
            this.successMsg = null
        }
    }
}

</script>
