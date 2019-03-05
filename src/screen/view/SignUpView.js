import React, { Component } from 'react'
import { connect } from 'react-redux'
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
            <Container>
                <Header>
                    <Body>
                        <Title>This is Sign Up page</Title>
                    </Body>
                </Header>
                <Form>
                    <FormItem floatingLabel>
                        <Label>Email</Label>
                        <Input
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                    </FormItem>
                    <FormItem floatingLabel>
                        <Label>Username</Label>
                        <Input
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username}
                        />
                    </FormItem>
                    <FormItem floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry={true}
                            onChangeText={(password1 => this.setState({ password1 }))}
                            value={this.state.password1}
                        />
                    </FormItem>
                    <FormItem floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry={true}
                            onChangeText={(password2 => this.setState({ password2 }))}
                            value={this.state.password2}
                        />
                    </FormItem>
                    <Button full primary style={{ paddingBottom: 4 }}
                        onPress={() => this.SignUpAuth()}>
                        <Text> Sign Up </Text>
                    </Button>
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