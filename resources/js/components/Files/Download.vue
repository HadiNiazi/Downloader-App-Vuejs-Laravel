<template>
    <div class="container">
        <div class="row">
            <div class="col-8 offset-2 mt-5">
                <div class="card">

                    <div class="card-header">
                        Downloads
                    </div>

                    <div class="card-body">

                        <main class="container">

                            <div v-for="file in files" :key="file.id" class="my-1 p-1 bg-body rounded shadow-sm">

                                <div class="d-flex text-muted pt-1">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-images me-2" viewBox="0 0 16 16">
                                        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"/>
                                    </svg>

                                    <div class="pb-1 mb-0 small lh-sm border-bottom w-100">
                                        <div class="d-flex justify-content-between">


                                        <span class="pt-1">Downloads({{ file.downloads }})</span>

                                        <a href="#" class="btn btn-info text-white" @click="downloadFile(file.id)">Download</a>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </main>

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
            files: []
        }

    },

    mounted() {
        this.getFiles();
    },

    methods: {

        getFiles() {

            axios.get('api/files')
                 .then(response => {
                    this.files = response.data;
                 })
                 .catch(error => {
                    console.log(error)
                 })

        },

        downloadFile(fileId) {

           axios.get('api/files/downloads/'+ fileId, {
                    responseType: 'blob'
                })
                .then(response => {

                    // Create a blob object from the response
                    const blob = new Blob([response.data]);
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);

                    // Generate a unique filename
                    const uniqueFilename = this.generateUniqueFilename(); // Implement this method

                    link.setAttribute('download', uniqueFilename);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    this.getFiles();

                })
                .catch(error => {
                    console.log(error)
                })

        },

        generateUniqueFilename() {
            const timestamp = new Date().getTime();
            const randomString = Math.random()
                .toString(36)
                .substring(7);
            return `downloaded_file_${timestamp}_${randomString}.png`; // Modify the file extension accordingly
        }

    }

}

</script>
