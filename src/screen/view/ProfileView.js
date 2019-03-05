import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import {
    Container,
    Content,
    Form,
    Item,
    Label,
    Input,
    Textarea,
    Text,
    Button,
    View
} from 'native-base'




class ProfileView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '12345678',
            age: '',
            gender: '',
            phone_number: '',
            address: ''
        }
    }

    async logoutAccount(id, token) {
        try {
            await AsyncStorage.removeItem(id)
            await AsyncStorage.removeItem(token)
            this.props.navigation.navigate('LoginView')
            return true
        }
        catch (exception) {
            return false
        }
    }


    render() {
        const { profile } = this.props.users
        if (profile.age == null) {
            profile.age = 0
        }
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input value={profile.username} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input value={profile.email} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true}
                                value={this.state.password} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Name</Label>
                            <Input
                                value={profile.name} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Age</Label>
                            <Input
                                value={(profile.age).toString()} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Gender</Label>
                            <Input
                                value={profile.gender} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Phone Number</Label>
                            <Input
                                value={profile.no_telp} />
                        </Item>
                        <Item style={{ marginTop: 5, borderBottomWidth: 0 }}>
                            <Label>Adress</Label>
                        </Item>
                        <Item style={{ paddingTop: 10, width: 310 }}>
                            <Textarea rowSpan={5} bordered
                                value={profile.address} />
                        </Item>
                    </Form>
                    <View style={{ marginTop: 10, marginBottom: 5 }}>
                        <Button block light
                            onPress={() => this.logoutAccount('id', 'token')}>
                            <Text>Log Out</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(ProfileView)