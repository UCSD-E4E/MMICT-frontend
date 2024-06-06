import "../assets/css/Login.css"

export default function Login() {
    return (
        <div className="login-layout">
            <div className="login-form-block flex">
                <form className="login-form">
                    <div>
                        <h1>Welcome Back</h1>
                        <h2>Enter your Credentials to access your account</h2>
                    </div>
                    <div>
                        <label htmlFor="login-form-email">Email Address</label>
                        <input type={"email"} id="login-form-email" name="email" placeholder="Enter your email"/>
                    </div>
                    <div>
                        <label htmlFor="login-form-name">Name</label>
                        <input id="login-form-name" name="name" placeholder="Name"/>
                    </div>
                    <div>
                        <label htmlFor="login-form-pass">Password</label>
                        <input type="password" id="login-form-pass" name="password" placeholder="Password"/>
                    </div>
                    <input type={"submit"} value="Log In"/>
                    <p>Don't have an account? <a href="https://www.google.com/">Sign up</a></p>
                </form>
            </div>
            <div className="login-img-block flex">
                {/* <img src="gin-splash.jpeg" /> */}
            </div>
        </div>
    )
}
