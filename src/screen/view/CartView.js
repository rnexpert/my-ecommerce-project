import React, { Component } from 'react'
import { Alert, Image, FlatList, TextInput, Dimensions, StatusBar, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Modal from "react-native-modal"
import {
    Button,
    Text,
    Content,
    View,
    ListItem,
    Container,
    List,
    Left,
    Right,
    Body,
    Icon,
    Card,
    CardItem,
    Toast,
    Footer,
    FooterTab
} from 'native-base'
import { getOrders, deleteOrder, patchOrder, getTotalPrice, totalPrice } from '../../publics/redux/actions/carts'

class CartView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible2: false,
            id: 0,
            qty2: 0,
            price: 0,
        }
    }

    _toggleModal2 = () =>
        this.setState({
            isModalVisible2: !this.state.isModalVisible2,
        })

    showModal(id, qty, price) {
        this.setState({
            id: id,
            qty2: qty,
            price: price
        })
        this._toggleModal2()
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        await this.props.dispatch(getOrders())
        await this.props.dispatch(getTotalPrice())
        await this.props.dispatch(totalPrice())
    }

    _keyExtractor = (item, index) => item.id.toString()
    _keyExtractor2 = (item, index) => index.toString()

    deleteCart(id, brand, name) {
        Alert.alert(
            '\t\t\t\t\t\t\t\t\t\t\t\t\tConfirm',
            `Are you sure you want to delete ${brand} ${name} from cart?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        await this.props.dispatch(deleteOrder(id))
                        await this.getData()
                    }
                },
            ],
            { cancelable: false },
        )
    }

    async incrementQty(id, qty, price) {
        qty = ++qty
        price = price * qty
        await this.props.dispatch(patchOrder(id, qty, price))
        await this.getData()
    }

    async decrementQty(id, qty, price) {
        qty = --qty
        price = price * qty
        await this.props.dispatch(patchOrder(id, qty, price))
        await this.getData()
    }

    async updateQty(id, qty, price) {
        price = price * qty
        await this.props.dispatch(patchOrder(id, qty, price))
        this._toggleModal2()
        await this.getData()
    }

    toRupiah = (angka) => {
        if (angka != null) {
            var rupiah = ''
            var angkarev = angka.toString().split('').reverse().join('')
            for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
            return rupiah.split('', rupiah.length - 1).reverse().join('')
        } else {
            return 0
        }
    }

    incrementQty2() {
        this.setState({
            qty2: ++this.state.qty2
        })
    }
    decrementQty2() {
        this.setState({
            qty2: --this.state.qty2
        })
    }
    _resetQty2 = () => {
        this.setState({
            isModalVisible2: false,
        })
    }

    async moveCheckout() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value != null) {
                this.props.navigation.navigate('CheckoutView')
            }
            else {
                this.props.navigation.navigate('LoginView')
            }
        } catch (error) {
            alert('asyncstorage kosong harus login')
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#e0e0e0' }}>
                <FlatList
                    data={this.props.carts.dcarts}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.props.carts.isLoading}
                    onRefresh={this.getData}
                    renderItem={({ item, index }) =>
                        (
                            <View style={{ backgroundColor: 'white', marginTop: 7.5 }}>
                                <View style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ height: 100, width: 100 }}
                                        />
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'column', paddingLeft: 100 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.brand}</Text>
                                        <Text style={{ fontSize: 14 }}>{item.name}</Text>
                                        <Text style={{ fontWeight: 'bold', color: 'orange', fontSize: 15, marginTop: 5, marginBottom: 5 }}>Rp. {this.toRupiah(item.price)}</Text>
                                        <Text style={{ color: '#BDBDBD', fontSize: 13 }}>{item.seller}</Text>
                                        <Text style={{ color: '#BDBDBD', fontSize: 13 }}>dari {item.location}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 10, paddingLeft: 10 }}>
                                    <View style={{ paddingRight: 5 }}>
                                        {/* <Button small light
                                            onPress={() => this.decrementQty(item.id, item.qty, item.price_product)}>
                                            <Text>-</Text>
                                        </Button> */}
                                        {this.decCondition(item.id, item.qty, item.price_product)}
                                    </View>
                                    <Text onPress={() => this.showModal(item.id, item.qty, item.price_product)}
                                        style={{
                                            borderBottomWidth: 1, borderTopWidth: 1,
                                            borderLeftWidth: 1, borderRightWidth: 1, paddingLeft: 10,
                                            paddingRight: 10, textAlignVertical: 'center',
                                            borderColor: '#BDBDBD', borderRadius: 5, textAlign: 'center'
                                        }}
                                    > {item.qty} </Text>
                                    <View style={{ paddingLeft: 5 }}>
                                        {/* <Button small light
                                            onPress={() => {
                                                this.incrementQty(item.id, item.qty, item.price_product)
                                            }}>
                                            <Text>+</Text>
                                        </Button> */}
                                        {this.incCondition(item.id, item.qty, item.price_product)}
                                    </View>
                                    <View style={{ marginLeft: 190 }}>
                                        <Icon type='FontAwesome' name='trash-o'
                                            style={{ color: '#009688' }}
                                            onPress={() => {
                                                this.deleteCart(item.id, item.brand, item.name)
                                            }} />
                                    </View>
                                </View>
                            </View>
                        )}

                />
                <Modal
                    isVisible={this.state.isModalVisible2}
                    onSwipe={this._toggleModal2}
                    swipeDirection='down'
                    backdropColor='#757575'
                    backdropOpacity={0.5}
                    deviceHeight={Dimensions.get('window').height}
                >
                    <StatusBar translucent={false} backgroundColor={'#303F9F'} barStyle="light-content" />
                    <Card style={{ borderRadius: 10, marginTop: 150 }}>
                        <CardItem style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'center', marginLeft: 60 }}>Modify Quantity of Products</Text>
                                <View style={{ flexDirection: 'row', marginLeft: 80, marginTop: 15 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {this.decrementCondition2()}
                                        <TextInput
                                            style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1, textAlign: 'center' }}
                                            onChangeText={(qty2) => this.setState({ qty2 })}
                                            editable={true}
                                            value={(this.state.qty2).toString()}
                                            keyboardType='numeric'
                                        />
                                        {this.incrementCondition2()}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <Button bordered style={{ marginLeft: 65, borderRadius: 10 }}
                                        onPress={this._resetQty2}>
                                        <Text style={{ textAlign: "center" }}>No</Text>
                                    </Button>
                                    <Button medium style={{ marginLeft: 55, borderRadius: 10 }}
                                        onPress={() => this.updateQty(this.state.id, this.state.qty2, this.state.price)}>
                                        <Text>Yes</Text>
                                    </Button>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                </Modal>
                {
                    this.emptyCondition()
                }

            </Container >
        )
    }

    emptyCondition() {
        if (this.props.carts.dcarts.length != 0) {
            return (
                <Footer>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <View>
                            <Text style={{ color: '#FF5722', marginTop: 17, marginLeft: 25, fontWeight: 'bold' }}
                            >Total:  Rp. {this.toRupiah(this.props.carts.total)}</Text>
                        </View>
                    </FooterTab>
                    <FooterTab style={{ backgroundColor: 'white', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.moveCheckout()}>
                            <View style={{ backgroundColor: '#3F51B5', marginLeft: 45, width: 120, height: 45, borderRadius: 10 }}>
                                <Text style={{ fontSize: 13, color: 'white', textAlign: 'center', marginTop: 15 }}>CHECKOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>
            )
        } else {
            return (
                <Content style={{}}>
                    <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', marginTop: -30 }}>
                        <Image source={{ uri: 'https://www.klipplastik.co.id/assets/img/empty_cart.png' }} style={{ width: 350, height: 300 }} />
                    </View>
                </Content>
            )
        }

    }


    decrementCondition2() {
        if (this.state.qty2 > 1) {
            return (
                <TouchableOpacity
                    onPress={() => this.decrementQty2()}>
                    <TextInput
                        style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1, textAlign: 'center', color: 'black' }}
                        value='-'
                        editable={false}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <TextInput
                    style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1, textAlign: 'center' }}
                    value='-'
                    editable={false}
                />
            )
        }
    }
    incrementCondition2() {
        if (this.state.qty2 < 10) {
            return (
                <TouchableOpacity
                    onPress={() => this.incrementQty2()}>
                    <TextInput
                        style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1, textAlign: 'center', color: 'black' }}
                        value='+'
                        editable={false}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <TextInput
                    style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1, textAlign: 'center' }}
                    value='+'
                    editable={false}
                />
            )
        }
    }

    decCondition(id, qty, price) {
        if (qty === 1) {
            return (
                <Button small light disabled>
                    <Text>-</Text>
                </Button>
            )
        } else {
            return (
                <Button small light
                    onPress={() => this.decrementQty(id, qty, price)}>
                    <Text>-</Text>
                </Button>
            )
        }
    }

    incCondition(id, qty, price) {
        if (qty > 9) {
            return (
                <Button small light disabled>
                    <Text>+</Text>
                </Button>
            )
        } else {
            return (
                <Button small light
                    onPress={() => {
                        this.incrementQty(id, qty, price)
                    }}>
                    <Text>+</Text>
                </Button>
            )
        }
    }




}

const mapStateToProps = (state) => {
    return {
        carts: state.carts
    }
}
export default connect(mapStateToProps)(CartView)