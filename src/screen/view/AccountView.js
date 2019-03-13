import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'

import {
    View,
    Text,
    Container,
    Left,
    Card,
    CardItem,
    Icon,
    Content,
    Body,
    Right,
} from 'native-base'

import { getProfile, getTransaction } from '../../publics/redux/actions/users'

class AccountView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {},
        }
    }
    async componentDidMount() {
        await this.getData()
        this.setState({
            profile: this.props.users.profile
        })
    }
    async getData() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                const { id, token } = this.props.users.data
                await this.props.dispatch(getProfile(id, token))
                await this.props.dispatch(getTransaction(val_id))
            }
        } catch (error) {
            console.log('asyncstorage is empty')
        }
    }
    convertDate(date) {
        change = String(date)
        change = change.slice(0, 10)
        return change
    }

    render() {
        const { profile } = this.state
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginLeft: -5 }}>
                                    <Image source={{ uri: profile.image }}
                                        style={{ width: 80, height: 80, borderRadius: 40 }} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{profile.name}</Text>
                                    <Text style={{ marginTop: 10, fontSize: 17, color: '#2196F3' }}>CLASSIC MEMBER</Text>
                                    <Text style={{ marginTop: 15, fontSize: 14, color: '#9E9E9E' }}>Member since {this.convertDate(profile.created_at)}</Text>
                                </View>
                            </View>
                            <Right>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ProfileView')}>
                                    <Icon name='ios-arrow-forward'
                                    />
                                </TouchableOpacity>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 5, paddingBottom: 5 }}>
                            <View style={{ borderRightWidth: 0.5, borderRightColor: '#BDBDBD' }}>
                                <Icon type='MaterialIcons' name='account-balance-wallet'
                                    style={{ paddingRight: 65, fontSize: 30, color: '#03A9F4' }} />
                                <Text style={{ marginLeft: 0, color: '#03A9F4' }}>Rp. 0</Text>
                            </View>
                            <View style={{ borderLeftWidth: 0.5, borderLeftColor: '#BDBDBD' }}>
                                <Icon type='Ionicons' name='ios-ribbon'
                                    style={{ paddingLeft: 65, fontSize: 30, color: '#03A9F4' }} />
                                <Text style={{ marginLeft: 53, color: '#03A9F4' }}>0 Points</Text>
                            </View>
                        </View>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold' }}>My Account</Text>
                            </Left>
                        </CardItem>
                        <CardItem style={{ marginTop: -5 }}>
                            <Left>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('TransactionView')}
                                >
                                    <Text>History Transaction</Text>
                                </TouchableOpacity>
                            </Left>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('TransactionView')}
                            >
                                <Right>
                                    <Icon name='ios-arrow-forward' />
                                </Right>
                            </TouchableOpacity>
                        </CardItem>
                        <CardItem style={{ marginTop: -5 }}>
                            <Left>
                                <Text>Vouchers</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                        <CardItem style={{ marginTop: -5 }}>
                            <Left>
                                <Text>Review</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                        <CardItem style={{ marginTop: -5 }}>
                            <Left>
                                <Text>Product Discussions</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                        <CardItem style={{ marginTop: -5 }}>
                            <Left>
                                <Text>Product Return</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                        <CardItem style={{ marginTop: -5 }}>
                            <Left>
                                <Text>Resolution Center</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold' }}>Helpdesk</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold' }}>Rate The App</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold' }}>E-com Friends</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold' }}>About E-Commerce</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold' }}>Settings</Text>
                            </Left>
                            <Right>
                                <Icon name='ios-arrow-forward' />
                            </Right>
                        </CardItem>
                    </Card>
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
export default connect(mapStateToProps)(AccountView)