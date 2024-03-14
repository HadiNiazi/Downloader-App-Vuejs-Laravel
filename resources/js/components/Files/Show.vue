<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-5">
                <div class="card">

                    <div class="card-header">
                        Dashboard
                    </div>

                    <div class="card-body">
                        <p v-if="user" class="card-text">Your are logged in!  {{ user.name }}.</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
