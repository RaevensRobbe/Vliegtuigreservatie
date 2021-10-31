<script lang="ts">
    import loginCompStore from "../../stores/loginCompStore";
    import RegisterForm from "./RegisterForm.svelte";
    import LoginForm from "./LoginForm.svelte";

</script>

{#if $loginCompStore.showRegister}
    <RegisterForm></RegisterForm>
{:else}
    <LoginForm/>
{/if}

