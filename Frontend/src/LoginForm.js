import React from 'react';
import './LoginForm.css';

function LoginForm(){
    return (
        <section className="loginContainer">
        <div class="login">
          <form action="#" method="get" id="login-form">
          <label for="username" class="required" type="text">Username</label>
          <input required type="text" name="username" class="inputs"/>
          <label for="password" class="required" type="password" id="password">Password</label>
          <input required type="text" name="password" class="inputs"/>
          <button type="submit" value="submit" id="login-submit">LOGIN</button>
        </form>
        </div>
      </section>
    );
}

export default LoginForm;