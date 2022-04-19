
function LoginForm() {
  return (
    <div>
      <form action="localhost:4000/users" method="post" className='center-center border-b border-solid'>
        <div>
          <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type="email" placeholder="Enter Email Address..." name="email" id="password" />
        </div>
        <div>
          <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type="password" placeholder="Password" name="password" id="password" />
        </div>
        <div>
          <input className="" type="checkbox" name="rememebr-me" id="remember-me" />
          <label className="mx-4" htmlFor="remember-me">Remember Me</label>
        </div>
        <div>
          <button className="py-2 bg-primary text-white hover:brightness-200 w-full px-4 my-4 rounded-3xl" type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm