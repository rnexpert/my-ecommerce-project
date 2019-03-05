import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
    Toast
} from 'native-base'

import { postLogin, getProfile } from '../../publics/redux/actions/users'

class LoginView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    clearAsyncStorage = async () => {
        await AsyncStorage.removeItem('token')
    }
    async loginAuth() {
        try {
            await this.props.dispatch(postLogin({
                email: this.state.email,
                password: this.state.password
            }))
            if (this.props.users.data.message == undefined) {
                await AsyncStorage.setItem('id', (this.props.users.data.id).toString())
                await AsyncStorage.setItem('token', this.props.users.data.token)
                Toast.show({
                    text: 'Login Success',
                    position: "top",
                    type: "success",
                    textStyle: { textAlign: 'center' }

                })
                this.props.navigation.navigate('AccountView')
            }
            else {
                Toast.show({
                    text: 'Wrong Username or Password',
                    position: "top",
                    type: "warning",
                    textStyle: { textAlign: 'center' }

                })
            }
            //this.props.navigation.navigate('AccountView')
        } catch (error) {
            alert('Email or Password Wrong')
        }
    }

    moveSignUp() {
        this.props.navigation.navigate('SignUpView')
    }
    async componentWillMount() {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        if (val_token != null) {
            await this.props.dispatch(getProfile(Number(val_id), val_token))
            await this.props.navigation.navigate('AccountView')
        }
        else {
            this.props.navigation.navigate('LoginView')
        }
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormItem floatingLabel>
                        <Label>Email</Label>
                        <Input
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                    </FormItem>
                    <FormItem floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password} />
                    </FormItem>
                    <Button full primary style={{ paddingBottom: 4, marginTop: 15 }}
                        onPress={() => this.loginAuth()}
                    >
                        <Text> Login </Text>
                    </Button>
                    <Button full primary
                        onPress={() => this.moveSignUp()}
                    ><Text> Sign Up </Text></Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(LoginView)