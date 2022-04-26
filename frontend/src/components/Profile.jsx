

function Profile() {
  return (
        <div>
          <h1>My profile</h1>
           <div>
            <img src="" alt="pic"/>
            <div class="container">
              <h4><b>John Doe</b></h4>
              <p> Engineer</p>
            </div>
          </div> 

          <div>
            <h3>User settings</h3>
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

          <div>
            <h3>Contact settings</h3>
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
  )
}

export default Profile