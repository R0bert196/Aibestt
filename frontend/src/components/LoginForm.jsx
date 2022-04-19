
function LoginForm() {
  return (
    <div>
      <form action="localhost:4000/users" method="post" className='center-center'>
        <div>
          <input className="block" type="email" placeholder="Enter Email Address..." name="email" id="password" />
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
    </div>
  )
}

export default LoginForm