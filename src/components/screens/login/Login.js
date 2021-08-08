import React from 'react'

function Login() {
    return (
        <div className="loginView">
            <div class="content_log">
                <div class="text">
                    Sign in
                </div>
                <form action="#">
                    <div class="field">
                        <input type="text" required />
                        <span class="fas fa-user"></span>
                        <label>Email or Phone</label>
                    </div>
                    <div class="field">
                        <input type="password" required />
                        <span class="fas fa-lock"></span>
                        <label>Password</label>
                    </div>
                    <div class="forgot-pass">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button>Sign in</button>
                    <div class="sign-up">
                        Not a member?
                        <a href="#">signup now</a>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
