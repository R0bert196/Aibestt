function RegisterForm() {
  return (
    <>
    <form action="localhost:4000/users" method="post">
        <div>
          <div>
            <input type="text" placeholder="First Name"  name="first-name" id="first-name"/>
          </div>
          <div>
            <input type="text" placeholder="Last Name" name="last-name"  id="last-name"/>     
          </div>
        </div>
        <div>
          <div>
            <input type="email" placeholder="Email Address" name="email" id="email" />
          </div>
        </div>
        <div>
          <div>
            <input type="password" placeholder="Password" name="password" id="password" />
          </div>
          <div>
            <input type="password" placeholder="Repeat Password" name="repeat-password" id="repeat-password" />
          </div>
        </div>
        <div>
          <div>
            <input type="text" placeholder="Company Group Name" name="company-group-name" id="company-group-name"/>
          </div>
          <div>
            <input type="text" placeholder="Company CUI" name="company-cui" id="company-cui" />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  )
}

export default RegisterForm