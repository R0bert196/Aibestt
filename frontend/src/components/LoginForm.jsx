
function LoginForm() {
  return (
    <>
      <form action="localhost:4000/users" method="post">
        <div>
          <input type="email" placeholder="Enter Email Address..."  name="email" id="password"/>
        </div>
        <div>
          <input type="password" placeholder="Password" name="password" id="password" />
        </div>
        <div>
          <input type="checkbox" name="rememebr-me" id="remember-me" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  )
}

export default LoginForm