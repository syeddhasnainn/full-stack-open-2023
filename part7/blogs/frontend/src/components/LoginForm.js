/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    username,
    password,
    setUsername,
    setPassword
    }) => {

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={setUsername}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={setPassword}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.func.isRequired,
    password: PropTypes.func.isRequired,
    setUsername: PropTypes.string.isRequired,
    setPassword: PropTypes.string.isRequired
  }

export default LoginForm