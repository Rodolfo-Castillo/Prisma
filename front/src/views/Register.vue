<script setup>
import { reactive } from "vue";
import { useAuthStore } from "@/store/auth";
import Message from "@/components/Message.vue";
const store = useAuthStore();

const formData = reactive({
    username: null,
    email: null,
    password: null,
});

const validPassword = reactive({
    length: false,
    capital: false,
    number: false,
    symbol: false,
});

function validatePassword(password) {
    // Test length
    if (password != null) validPassword.length = password.length >= 8;
    else validPassword.length = false;
    // Test capital
    validPassword.capital = /^(?=.*[A-Z])/.test(password);
    // Test number
    validPassword.number = /^(?=.*[0-9])/.test(password);
    // Test symbol
    validPassword.symbol = /^(?=.*[!@#\$%\^&\*_\-=+])/.test(password);
    return (
        validPassword.length &&
        validPassword.capital &&
        validPassword.number &&
        validPassword.symbol
    );
}

function validateEmail(email) {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

const closeDialog = async () => {
    store.setError();
};

const handleClick = async () => {
    if (username.value != null && email.value != null && password.value != null)
        await store.register(formData);
};

const Cancel = async () => {
    formData.username = null;
    formData.email = null;
    formData.password = null;
};
</script>
<template>
    <q-layout>
        <q-page-container>
            <q-page
                class="window-height window-width row justify-center items-center"
            >
                <div class="column q-pa-lg">
                    <div class="row">
                        <q-card
                            square
                            class="shadow-24"
                            style="width: 350px; height: 600px"
                        >
                            <q-card-section>
                                <h3 class="text-h5 q-my-md text-center">
                                    Create New Account
                                </h3>
                                <div class="text-subtitle1 q-my-md text-center">
                                    Fill out the following form to create your
                                    new account.
                                </div>
                            </q-card-section>
                            <q-separator inset />
                            <q-card-section>
                                <q-form class="q-px-sm">
                                    <q-input
                                        class="q-mb-md"
                                        square
                                        clearable
                                        outlined
                                        dense
                                        v-model="formData.username"
                                        label="Username"
                                        :disabled="store.isLoading"
                                        @keyup.enter="handleClick"
                                        :rules="[
                                            (val) =>
                                                (val && val.length > 0) ||
                                                'Name must be filled in.',
                                        ]"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon name="person" />
                                        </template>
                                    </q-input>
                                    <q-input
                                        class="q-mb-md"
                                        square
                                        clearable
                                        outlined
                                        dense
                                        v-model="formData.email"
                                        label="Email"
                                        :disabled="store.isLoading"
                                        @keyup.enter="handleClick"
                                        :rules="[
                                            (val) =>
                                                validateEmail(val) ||
                                                'Must be a valid email.',
                                        ]"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon name="person" />
                                        </template>
                                    </q-input>
                                    <q-input
                                        square
                                        clearable
                                        outlined
                                        dense
                                        v-model="formData.password"
                                        type="password"
                                        label="Password"
                                        :disabled="store.isLoading"
                                        @keyup.enter="handleClick"
                                        :rules="[
                                            (val) =>
                                                validatePassword(val) ||
                                                'Password must meet all criteria.',
                                        ]"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon name="lock" />
                                        </template>
                                    </q-input>
                                    <div class="password-criteria q-pa-sm">
                                        <div class="text-subtitle2 q-mb-sm">
                                            Password Criteria:
                                        </div>
                                        <div>
                                            <q-icon
                                                :name="
                                                    validPassword.length
                                                        ? 'check_circle'
                                                        : 'cancel'
                                                "
                                                :color="
                                                    validPassword.length
                                                        ? 'positive'
                                                        : 'negative'
                                                "
                                            ></q-icon>
                                            Must be at least 8 characters long.
                                        </div>
                                        <div>
                                            <q-icon
                                                :name="
                                                    validPassword.capital
                                                        ? 'check_circle'
                                                        : 'cancel'
                                                "
                                                :color="
                                                    validPassword.capital
                                                        ? 'positive'
                                                        : 'negative'
                                                "
                                            ></q-icon>
                                            Must contain at least one capital
                                            letter.
                                        </div>
                                        <div>
                                            <q-icon
                                                :name="
                                                    validPassword.number
                                                        ? 'check_circle'
                                                        : 'cancel'
                                                "
                                                :color="
                                                    validPassword.number
                                                        ? 'positive'
                                                        : 'negative'
                                                "
                                            ></q-icon>
                                            Must contain at least one number.
                                        </div>
                                        <div>
                                            <q-icon
                                                :name="
                                                    validPassword.symbol
                                                        ? 'check_circle'
                                                        : 'cancel'
                                                "
                                                :color="
                                                    validPassword.symbol
                                                        ? 'positive'
                                                        : 'negative'
                                                "
                                            ></q-icon>
                                            Must contain at least one special
                                            character: !@#$%^&*()-_+=
                                        </div>
                                    </div>
                                    <q-card-actions align="right">
                                        <q-btn
                                            class="q-mr-md"
                                            unelevated
                                            label="Cancel"
                                            flat
                                            :disabled="store.isLoading"
                                            @click="Cancel"
                                        />
                                        <q-btn
                                            class="q-ml-md"
                                            unelevated
                                            color="primary"
                                            label="Register"
                                            @click="handleClick"
                                            :disabled="store.isLoading"
                                        />
                                    </q-card-actions>
                                </q-form>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </q-page>
            <Message
                :open="store.error"
                title="ERROR"
                type="error"
                :text="store.msg"
                @close-dialog="closeDialog"
            />
        </q-page-container>
    </q-layout>
</template>
