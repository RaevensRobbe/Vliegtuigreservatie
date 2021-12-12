<script lang="ts">
    import {
confirmPasswordReset,
    getAuth, sendPasswordResetEmail} from 'firebase/auth'

    const auth = getAuth()
    let email: string = ''
    let test
    let newPwd
    const forgotPw = async() => {
        sendPasswordResetEmail(auth, email).then(() => {
            confirmPasswordReset(auth,test, newPwd)
        })
    }
</script>

<body>
    <input bind:value = {email} type="email" name="email" placeholder="enter your email address"/>
    <button
        on:click={forgotPw}
    >
        click
    </button>
</body>