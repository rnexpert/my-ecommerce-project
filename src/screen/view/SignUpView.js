import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container,
    Button,
    Text,
    Form,
    Item as FormItem,
    Input,
    Label,
    Toast,
    View,
    Icon
} from 'native-base'

import { postUser } from '../../publics/redux/actions/users'

class SignUpView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
        }
    }
    async SignUpAuth() {
        if (this.state.password1 == this.state.password2) {
            try {
                await this.props.dispatch(postUser({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password2
                }))
                this.props.navigation.navigate('LoginView')
            } catch (error) {
                console.error(error)
            }
        } else {
            alert('Password different')
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#b2ebf2' }}>
                <Form>
                    <View style={{ marginTop: 50, marginHorizontal: 25, borderRadius: 20, backgroundColor: 'white' }}>
                        <FormItem>
                            <Icon type='MaterialIcons' name='email' style={{ marginLeft: 5, color: '#bdbdbd', fontSize: 20 }} />
                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                placeholder='Email'
                                style={{ fontSize: 15 }}
                            />
                        </FormItem>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 25, borderRadius: 20, backgroundColor: 'white' }}>
                        <FormItem>
                            <Icon name='person' style={{ marginLeft: 5, color: '#bdbdbd', fontSize: 20 }} />
                            <Input
                                onChangeText={(username) => this.setState({ username })}
                                value={this.state.username}
                                placeholder='Username'
                                style={{ fontSize: 15 }}
                            />
                        </FormItem>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 25, borderRadius: 20, backgroundColor: 'white' }}>
                        <FormItem>
                            <Icon type='MaterialCommunityIcons' name='key-variant' style={{ marginLeft: 5, color: '#bdbdbd', fontSize: 20 }} />
                            <Input secureTextEntry={true}
                                onChangeText={(password1) => this.setState({ password1 })}
                                value={this.state.password1}
                                placeholder='Password'
                                style={{ fontSize: 15 }}
                            />
                        </FormItem>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 25, borderRadius: 20, backgroundColor: 'white' }}>
                        <FormItem>
                            <Icon type='MaterialCommunityIcons' name='key-variant' style={{ marginLeft: 5, color: '#bdbdbd', fontSize: 20 }} />
                            <Input secureTextEntry={true}
                                onChangeText={(password2) => this.setState({ password2 })}
                                value={this.state.password2}
                                placeholder='Confirm Password'
                                style={{ fontSize: 15 }}
                            />
                        </FormItem>
                    </View>
                    <View style={{ alignSelf: 'center', width: 305, marginTop: 20 }}>
                        <Button block rounded style={{ paddingBottom: 4, marginTop: 15 }}
                            onPress={() => this.SignUpAuth()}
                        >
                            <Text> Sign Up </Text>
                        </Button>
                    </View>
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
export default connect(mapStateToProps)(SignUpView)