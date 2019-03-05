import React, { Component } from 'react'
import { Image, FlatList, AsyncStorage, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
    Text,
    View,
    Container,
    Content,
    Card,
    CardItem,
    Left,
    Right,
    Body,
    Icon,
    Form,
    Picker,
    Button,
} from 'native-base'

import '../../../res/data/mydata'

import { postTransaction } from '../../publics/redux/actions/users'
import { deleteAll } from '../../publics/redux/actions/carts'


class PaymentView extends Component {
    constructor(props) {
        super(props)
        const { total_payment } = props.navigation.state.params
        this.state = {
            paymentlist: paymentlist,
            total_payment: total_payment
        }
    }
    toRupiah = (angka) => {
        var rupiah = ''
        var angkarev = angka.toString().split('').reverse().join('')
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
        return rupiah.split('', rupiah.length - 1).reverse().join('')
    }

    async addTransaction(payment_method) {
        const val_id = await AsyncStorage.getItem('id')
        await this.props.dispatch(postTransaction({
            user_id: val_id,
            total_paid: this.state.total_payment,
            total_qty: this.props.carts.price.total_qty,
            payment_method: payment_method,
        }))
        await this.props.dispatch(deleteAll())
        Alert.alert('\t\t\t\t\t\t\t\t\t\t\t\t\t\tSukses', 'Pembayaran Sukses Menggunakan ' + payment_method)
        this.props.navigation.navigate('Home')
    }
    _keyExtractor = (item, index) => item.name.toString()
    render() {
        const { navigate } = this.props.navigation
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 0 }}>Rp. {this.toRupiah(this.state.total_payment)}</Text>
                            </Left>
                            <Right>
                                <Text>Detail Tagihan</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', marginLeft: 20 }}>Pilih Metode Pembayaran</Text>
                    <Card>
                        <CardItem>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rekomendasi Pembayaran</Text>
                        </CardItem>
                        <FlatList
                            data={this.state.paymentlist}
                            keyExtractor={this._keyExtractor}
                            renderItem={({ item, index }) =>
                                (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.addTransaction(item.name)
                                        }}
                                    >
                                        <CardItem style={{ borderBottomColor: 'black', borderBottomWidth: 0.75 }}>
                                            <Left>
                                                <Image source={{ uri: item.image }} style={{ width: 75, height: 50 }} />
                                            </Left>
                                            <Body style={{ justifyContent: 'space-around' }}>
                                                <Text style={{ fontSize: 17 }}>{item.name}</Text>
                                            </Body>
                                            <Right>
                                                <Icon name='arrow-forward' style={{ color: 'black' }} />
                                            </Right>
                                        </CardItem>
                                    </TouchableOpacity>
                                )
                            } />
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.carts,
        users: state.users,
    }
}
export default connect(mapStateToProps)(PaymentView)