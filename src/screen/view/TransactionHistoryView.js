import React, { Component } from 'react'
import { FlatList, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import {
    View,
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Left
} from 'native-base'

import { getTransaction } from '../../publics/redux/actions/users'

class TrannsactionHistoryView extends Component {

    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        const val_id = await AsyncStorage.getItem('id')
        await this.props.dispatch(getTransaction(val_id))
    }
    _keyExtractor = (item, index) => item.id.toString()
    render() {
        console.warn(this.props.users.transaction)
        return (
            <Container>
                <Content>
                    <FlatList
                        data={this.props.users.transaction}
                        keyExtractor={this._keyExtractor}
                        refreshing={this.props.users.isLoading}
                        onRefresh={this.getData}
                        renderItem={({ item, index }) =>
                            (
                                <Card>
                                    <CardItem>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text>Date Transaction: {item.created_at}</Text>
                                            <Text>Name: {item.profiles.name}</Text>
                                            <Text>Qty Item: {item.total_qty}</Text>
                                            <Text>Total Payments: {item.total_paid}</Text>
                                            <Text>Payment Method: {item.payment_method}</Text>
                                            <Text style={{ paddingTop: 10 }}> Address Direction</Text>
                                            <View style={{ borderWidth: 0.25, borderColor: '#BDBDBD' }}>
                                                <Text
                                                    style={{ marginLeft: 5 }}
                                                >Address Direction: {item.profiles.address}</Text>
                                            </View>
                                        </View>
                                    </CardItem>
                                </Card>
                            )} />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(TrannsactionHistoryView)