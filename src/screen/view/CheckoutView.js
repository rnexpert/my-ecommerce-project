import React, { Component } from 'react'
import { Image, FlatList, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import {
    Container,
    Card,
    CardItem,
    Left,
    Icon,
    Text,
    View,
    Content,
    Right,
    Form,
    Picker,
    Footer,
    FooterTab,
    Button,
    Textarea
} from 'native-base'

import { getTotalPrice, getOrders } from '../../publics/redux/actions/carts'
import { getProfile } from '../../publics/redux/actions/users'


class CheckoutView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dcart: [],
            totprice: 0,
            totitems: 0,
            cost: 10000,
            selected: '10000'
        }
    }
    toRupiah = (angka) => {
        if (angka != undefined) {
            var rupiah = ''
            var angkarev = angka.toString().split('').reverse().join('')
            for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
            return rupiah.split('', rupiah.length - 1).reverse().join('')
        } else {
            return angka = 0
        }
    }
    onValueChange = (value) => {
        this.setState({
            selected: value
        })
    }

    componentDidMount() {
        this.getData()
        this.getProfile()
    }

    async getProfile() {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        if (val_token !== null) {
            await this.props.dispatch(getProfile(Number(val_id), val_token))
        }
        else {
            this.props.navigation.navigate('LoginView')
        }
    }

    getData = async () => {
        await this.props.dispatch(getOrders())
        await this.props.dispatch(getTotalPrice())
    }

    _keyExtractor = (item, index) => item.id.toString()

    render() {
        const { navigate } = this.props.navigation
        const { profile } = this.props.users
        const { dcarts, price } = this.props.carts
        let total_ongkir = Number(this.state.selected) * Number(price.total_qty)
        let total_payment = total_ongkir + Number(price.total_price)
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem style={{ borderBottomColor: '#212121', borderBottomWidth: 0.75 }}>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Alamat Pengiriman</Text>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontWeight: 'bold' }}>{profile.name}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: '#9E9E9E', fontWeight: 'bold' }}>(Alamat Rumah)</Text>
                        </CardItem>
                        <CardItem>
                            <Form>
                                <Textarea rowSpan={3} placeholderTextColor='black' bordered value={profile.address} />
                            </Form>
                        </CardItem>
                    </Card>
                    <View>
                        <FlatList
                            data={this.props.carts.dcarts}
                            keyExtractor={this._keyExtractor}
                            refreshing={this.props.carts.isLoading}
                            onRefresh={this.getData}
                            renderItem={({ item, index }) =>
                                (
                                    <Content>
                                        <Card>
                                            <CardItem>
                                                <Text style={{ color: '#9E9E9E', fontWeight: 'bold' }}>Penjual: </Text>
                                                <Left>
                                                    <Image source={{ uri: 'https://icon-icons.com/icons2/317/PNG/512/shop-icon_34368.png' }}
                                                        style={{ width: 20, height: 20, paddingLeft: 10 }} />
                                                    <Text style={{ fontWeight: 'bold' }}>{item.seller}</Text>
                                                </Left>
                                            </CardItem>
                                            <CardItem style={{ borderBottomColor: '#212121', borderBottomWidth: 0.75 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Image
                                                            source={{ uri: item.image }}
                                                            style={{ height: 100, width: 100 }}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 3, flexDirection: 'column', paddingLeft: 50 }}>
                                                        <Text>{item.brand}</Text>
                                                        <Text>{item.name}</Text>
                                                        <Text>Rp. {this.toRupiah(item.price_product)}</Text>
                                                        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                                            <Text style={{ color: '#9E9E9E' }}>{item.qty} barang</Text>
                                                            <Text style={{ paddingLeft: 10, color: '#9E9E9E' }}>(250g)</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                <Left>
                                                    <Text>Sub Total</Text>
                                                </Left>
                                                <Right>
                                                    <Text>Rp. {this.toRupiah(item.price)}</Text>
                                                </Right>
                                            </CardItem>
                                        </Card>
                                    </Content>
                                )} />

                    </View>
                    <CardItem style={{ borderBottomColor: '#212121', borderBottomWidth: 0.75 }} >
                        <Left>
                            <Text>Pilih Kurir</Text>
                        </Left>
                        <Right>
                            <Content>
                                <Form>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 120, fontWeight: 'bold', color: 'black', backgroundColor: '' }}
                                        placeholder='Ubah Kurir'
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="JNE" value='10000' />
                                        <Picker.Item label="J & T" value='9000' />
                                        <Picker.Item label="TIKI" value='8000' />
                                    </Picker>
                                </Form>
                            </Content>
                        </Right>
                    </CardItem>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text>Ongkos Kirim / Item</Text>
                            </Left>
                            <Right>
                                <Text>Rp. {this.toRupiah(total_ongkir)}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ borderBottomColor: '#212121', borderBottomWidth: 0.75, paddingBottom: 10 }}>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Ringkasan Belanja</Text>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Total Harga</Text>
                            </Left>
                            <Right>
                                <Text>Rp. {this.toRupiah(price.total_price)}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content >
                <Footer>
                    <FooterTab style={{
                        backgroundColor: 'white', borderColor: '#3F51B5', borderWidth: 2,
                        justifyContent: 'space-around', alignItems: 'center'
                    }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#9e9e9e' }}>Total Tagihan</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Rp. {this.toRupiah(total_payment)}
                            </Text>
                        </View>
                    </FooterTab>
                    <FooterTab>
                        <Button vertical onPress={() => navigate('PaymentView', { total_payment: total_payment })} >
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Pay</Text>
                        </Button>
                    </FooterTab>
                </Footer>
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
export default connect(mapStateToProps)(CheckoutView)