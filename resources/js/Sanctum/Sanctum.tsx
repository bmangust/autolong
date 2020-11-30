import * as React from 'react'
import axios, {AxiosError} from 'axios'
import SanctumContext from './SanctumContext'

axios.defaults.withCredentials = true

const token = localStorage.getItem('token')

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

interface Props {
    config: {
        apiUrl: string;
        csrfCookieRoute: string;
        signInRoute: string;
        signOutRoute: string;
        userObjectRoute: string;
    };
    checkOnInit?: boolean;
}

interface State {
    user: null | {} | false;
    authenticated: null | boolean;
}

const setAccessToLocale = (data) => {
    const activeAccess = Object.entries(data.role.accesses)
        .map(([key, value]) => {
            if (value == 1) {
                return key
            } else {
                return null
            }
        }).filter((el) => el !== null)
    localStorage.setItem('access-autolong',
        JSON.stringify(activeAccess.join(',')))
}

class Sanctum extends React.Component<Props, State> {
    static defaultProps = {
        checkOnInit: true
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            user: null,
            authenticated: null
        }

        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
        this.setUser = this.setUser.bind(this)
        this.checkAuthentication = this.checkAuthentication.bind(this)
    }

    signIn(
        email: string,
        password: string,
        remember: boolean = false
    ): Promise<{}> {
        const {
            apiUrl,
            csrfCookieRoute,
            signInRoute,
            userObjectRoute
        } = this.props.config

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                // Get CSRF cookie.
                await axios
                    .get(`${apiUrl}/${csrfCookieRoute}`)
                // Sign in.
                await axios
                    .post(`${apiUrl}/${signInRoute}`, {
                        email,
                        password,
                        remember: remember ? true : null
                    })
                    .then((answer) =>
                        localStorage.setItem('token', answer.data))
                const token = localStorage.getItem('token')
                // When correct, get the user data.
                const {data} = await axios
                    .get(`${apiUrl}/${userObjectRoute}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                setAccessToLocale(data)
                this.setState({user: data, authenticated: true})
                return resolve(data)
            } catch (error) {
                return reject(error)
            }
        })
    }

    signOut() {
        const {apiUrl, signOutRoute} = this.props.config
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(`${apiUrl}/${signOutRoute}`)
                // Only sign out after the server has successfully responded.
                this.setState({user: false, authenticated: false})
                localStorage.removeItem('access-autolong')
                resolve()
            } catch (error) {
                return reject(error)
            }
        })
    }

    setUser(user: object, authenticated: boolean = true) {
        this.setState({user, authenticated})
    }

    async checkAuthentication(): Promise<boolean> {
        const {apiUrl, userObjectRoute} = this.props.config
        return await axios
            .get(`${apiUrl}/${userObjectRoute}`)
            .then(({data}) => {
                setAccessToLocale(data)
                this.setState({user: data, authenticated: true})
                return true
            })
            .catch((error: AxiosError) => {
                if (error.response && error.response.status === 401) {
                    // If there's a 401 error the user is not signed in.
                    this.setState({user: false, authenticated: false})
                    localStorage.removeItem('access-autolong')
                    return false
                } else {
                    // If there's any other error, something has gone wrong.
                    return false
                }
            })
    }

    componentDidMount() {
        if (this.props.checkOnInit) {
            this.checkAuthentication()
        }
    }

    render() {
        return (
            <SanctumContext.Provider
                value={{
                    user: this.state.user,
                    authenticated: this.state.authenticated,
                    signIn: this.signIn,
                    signOut: this.signOut,
                    setUser: this.setUser,
                    checkAuthentication: this.checkAuthentication
                }}
            >
                {this.props.children || null}
            </SanctumContext.Provider>
        )
    }
}

export default Sanctum
