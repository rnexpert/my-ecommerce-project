import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Footer,
    FooterTab,
    Left,
    Right,
    Icon,
    Content,
    Toast
} from 'native-base'
import { connect } from 'react-redux'
import { Rating } from 'react-native-ratings'
import ImageSlider from 'react-native-image-slider'
import Modal from "react-native-modal"
import { StyleSheet, Dimensions, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native'

import { getProduct } from '../../publics/redux/actions/products'
import { postOrder, totalPrice } from '../../publics/redux/actions/carts'

class DetailsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qty: 1,
            qty2: 0,
            isModalVisible: false,
            isModalVisible2: false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: '',
        headerTransparent: true,
        tabBarVisible: false,
        tintColor: '#FFF',
        headerLeft: (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductList')}
                style={{ paddingLeft: 10, paddingTop: 10 }}>
                <Icon type='FontAwesome5' name='arrow-circle-left'
                    style={{ color: '#BDBDBD' }} />
            </TouchableOpacity>
        ),
    })
    componentWillMount() {
        this.getData()
    }
    getData = () => {
        const { id } = this.props.navigation.state.params
        this.props.dispatch(getProduct(id))
    }
    incrementQty() {
        this.setState({
            qty: ++this.state.qty
        })
    }
    decrementQty() {
        this.setState({
            qty: --this.state.qty
        })
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

    toRupiah(angka) {
        var rupiah = ''
        var angkarev = angka.toString().split('').reverse().join('')
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
        return rupiah.split('', rupiah.length - 1).reverse().join('')
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible })

    _toggleModal2 = () =>
        this.setState({
            isModalVisible2: !this.state.isModalVisible2,
            qty2: this.state.qty
        })
    _resetQty = () => {
        this.setState({
            isModalVisible: false,
        })
    }
    _resetQty2 = () => {
        this.setState({
            isModalVisible2: false,
        })
    }

    async addToCart(product_id, qty, price) {
        try {
            await this.props.dispatch(postOrder({
                product_id: product_id,
                qty: qty,
                price: price
            }))
            await this.props.dispatch(totalPrice())
            Toast.show({
                text: "Product Success Added To Cart",
                position: "top",
                type: 'success',
                duration: 3000
            })
            this.props.navigation.navigate('ProductList')
            //console.warn(this.props.carts.dcarts)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { details } = this.props.products
        const { navigate } = this.props.navigation
        return (
            <Container>
                <Content>
                    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
                    <ImageSlider images={[
                        details.image,
                        'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-2804338/vivo_vivo-y91-starry-black-2-16-gb_full03.jpg',
                        'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//88/MTA-2714551/realme_realme-c1-smartphone--16gb--2gb-_full15.jpg'
                    ]} style={styles.imageDetails} />
                    <Card style={styles.frameImage}>
                        <CardItem style={styles.frameTextProduct}>
                            <Text style={styles.textProduct}>{details.brand} {details.name}</Text>
                        </CardItem>
                        <CardItem style={styles.frameTextPrice}>
                            <Text style={styles.textPrice}>Rp. {this.toRupiah(Number(details.price))}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 14 }}>Stock Tersedia</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image source={{ uri: 'https://icon-icons.com/icons2/317/PNG/512/shop-icon_34368.png' }}
                                    style={{ width: 20, height: 20 }} />
                                <Text style={{ fontSize: 14 }}> {details.seller}</Text>
                            </Left>
                            <Right>
                                <Rating
                                    ratingCount={5}
                                    startingValue={details.rating}
                                    imageSize={15}
                                />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 14 }}>dari</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}> {details.location}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text style={{ fontSize: 14 }}>Cicilan</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 12, color: '#F57C00', marginTop: -20 }}>
                                Bunga 0% mulai dari Rp. 3.042</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Infromasi Produk</Text>
                        </CardItem>
                        <CardItem>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>Min. Pemesanan</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'right', fontSize: 14 }}>1</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem style={{ borderBottomColor: 'black', borderBottomWidth: 0.75 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>Kondisi</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'right', fontSize: 14 }}>Baru</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Deskripsi Product</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 14 }}>{details.description}</Text>
                        </CardItem>
                    </Card>
                </Content>


                <Modal isVisible={this.state.isModalVisible}
                    onSwipe={this._toggleModal}
                    swipeDirection='down'
                    backdropColor='#757575'
                    backdropOpacity={0.5}
                    deviceHeight={Dimensions.get('window').height}
                >
                    <StatusBar translucent={false} backgroundColor={'#303F9F'} barStyle="light-content" />
                    <Card style={{ borderRadius: 10, marginTop: 200 }}>
                        <CardItem style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <Icon type='SimpleLineIcons' name='close'
                                style={{ marginLeft: 270, marginTop: -5, color: '#9E9E9E' }}
                                onPress={this._resetQty} />
                        </CardItem>
                        <CardItem>
                            <Image source={{ uri: details.image }} style={{ width: 150, height: 150 }} />
                            <Text>Rp. {this.toRupiah(Number(details.price))}</Text>
                        </CardItem>
                        <CardItem style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Quantity</Text>
                                <View style={{ paddingLeft: 150, flexDirection: 'row' }}>
                                    {this.decrementCondition()}
                                    <Text
                                        onPress={this._toggleModal2}
                                        style={{ paddingLeft: 10, paddingRight: 10, borderBottomWidth: 0.5 }}>{this.state.qty}</Text>
                                    {this.incrementCondition()}
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                    <Button rounded block
                        onPress={() => this.addToCart(details.id, this.state.qty, details.price)}>
                        <Text>Add To Cart</Text>
                    </Button>
                </Modal>

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
                                            value={(this.state.qty2).toString()}
                                            editable={true}
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
                                        onPress={() => {
                                            this.setState({
                                                qty: this.state.qty2,
                                                isModalVisible2: false
                                            })
                                        }}>
                                        <Text>Yes</Text>
                                    </Button>
                                </View>
                            </View>
                        </CardItem>
                    </Card>

                </Modal>

                <Footer>
                    <FooterTab style={{ backgroundColor: '#F57C00' }}>
                        <Button active vertical onPress={() => navigate('')}
                            style={{ backgroundColor: '#F57C00' }}>
                            <Text>Buy Now</Text>
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button active vertical onPress={this._toggleModal} >
                            <Icon active name="ios-cart" />
                            <Text>Add To Cart</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container >
        )
    }
    decrementCondition() {
        if (this.state.qty > 1) {
            return (
                <Icon
                    onPress={() => { this.decrementQty() }}
                    type='AntDesign' name='minuscircleo' style={{ fontSize: 25 }} />
            )
        } else {
            return (
                <Icon
                    type='AntDesign' name='minuscircleo' style={{ fontSize: 25, color: '#BDBDBD' }} />
            )
        }
    }
    incrementCondition() {
        if (this.state.qty < 10) {
            return (
                <Icon
                    onPress={() => { this.incrementQty() }}
                    type='AntDesign' name='pluscircleo' style={{ fontSize: 25 }} />
            )
        } else {
            return (
                <Icon
                    type='AntDesign' name='pluscircleo' style={{ fontSize: 25, color: '#BDBDBD' }} />
            )
        }
    }

    decrementCondition2() {
        if (this.state.qty > 1) {
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
        if (this.state.qty < 10) {
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
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        carts: state.carts
    }
}

export default connect(mapStateToProps)(DetailsView)


const styles = StyleSheet.create({
    frameImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        paddingLeft: -10
    },
    imageDetails: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2
    },
    frameTextProduct: {
        width: Dimensions.get('window').width - (Dimensions.get('window').width / 4)
    },
    textProduct: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    frameTextPrice: {
        marginTop: -20,
        backgroundColor: 'transparent',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    textPrice: {
        fontSize: 15,
        color: '#F57C00',
        fontWeight: 'bold'
    },
    detailsBtnCart: {
        marginBottom: 20,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 10,
        color: '#F57C00'
    },
    detailsBtnBuy: {
        marginBottom: 20,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 20,
        borderColor: '#f57C00'
    }
})