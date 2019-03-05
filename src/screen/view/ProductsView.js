import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import ImageSlider from 'react-native-image-slider'
import { connect } from 'react-redux'
import {
    View, Text, Input, Button,
    Container, Icon,
    Content, Header, Item, Card, CardItem, Left, Right, Body
} from 'native-base'

import { getProducts } from '../../publics/redux/actions/products'
import '../../../res/data/mydata'

class ProductsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: category
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header searchBar rounded androidStatusBarColor='#303F9F'>
                <Item rounded>
                    <Icon name="search" />
                    <Input placeholder="Search products" />
                    <Icon name="mic" />
                    <Icon name="camera" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
        )
    })



    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.props.dispatch(getProducts())
    }

    toRupiah(angka) {
        var rupiah = ''
        var angkarev = angka.toString().split('').reverse().join('')
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
        return rupiah.split('', rupiah.length - 1).reverse().join('')
    }

    _keyExtractor = (item, index) => item.id.toString()
    _keyCategory = (item, index) => item.name.toString()
    render() {
        const { navigate } = this.props.navigation
        return (
            <Container>
                <Content>
                    <ImageSlider
                        autoPlayWithInterval={5000}
                        images={[
                            'https://www.static-src.com/siva/asset//01_2019/Q1Gaji5Juta_MainBannerCarousel840x280.gif',
                            'https://www.static-src.com/siva/asset//02_2019/Q1Cashback1502_MainBannerCarouel840x280.jpg',
                            'https://www.static-src.com/siva/asset//02_2019/iem3-home.jpg',
                            'https://www.static-src.com/siva/asset//02_2019/190125-LaLaLa_Fest_LAZone-840x280-Homepage_Desktop.jpg'
                        ]} style={styles.imageBanner} />

                    <FlatList
                        data={this.state.category}
                        keyExtractor={this._keyCategory}
                        numColumns={5}
                        horizontal={false}
                        renderItem={({ item, index }) => (
                            <View style={{ flexBasis: '20%', paddingTop: 15, paddingLeft: 3, paddingBottom: 10 }}>
                                <Image source={{ uri: item.icon }} style={{ width: 40, height: 40, marginLeft: 16 }} />
                                <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 5 }}>{item.name}</Text>
                            </View>
                        )} />

                    <Card>
                        <CardItem style={{ backgroundColor: '#FFFFFF' }}>
                            <Left>
                                <Image source={{ uri: 'http://www.pngall.com/wp-content/uploads/2/Flash-Sale-PNG-Free-Image.png' }}
                                    style={{ width: 150, height: 55 }} />
                            </Left>
                            <Body style={{ paddingTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#3F51B5' }}>
                                        <Text style={{ fontSize: 20, marginLeft: 5, marginRight: 5, color: 'white', fontFamily: 'Arial' }}>00</Text>
                                    </View>
                                    <Text style={{ fontSize: 20, color: '#3F51B5', fontWeight: 'bold' }}> : </Text>
                                    <View style={{ backgroundColor: '#3F51B5' }}>
                                        <Text style={{ fontSize: 20, marginLeft: 5, marginRight: 5, color: 'white' }}>00</Text>
                                    </View>
                                    <Text style={{ fontSize: 20, color: '#3F51B5', fontWeight: 'bold' }}> : </Text>
                                    <View style={{ backgroundColor: '#3F51B5' }}>
                                        <Text style={{ fontSize: 20, marginLeft: 5, marginRight: 5, color: 'white' }}>00</Text>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', paddingTop: 0 }}>
                            <FlatList
                                data={this.props.products.data}
                                keyExtractor={this._keyExtractor}
                                refreshing={this.props.products.isLoading}
                                onRefresh={this.getData}
                                numColumns={1}
                                horizontal={true}
                                renderItem={({ item, index }) => (
                                    <CardItem>
                                        <View style={styles.viewHorizontal}>
                                            <TouchableOpacity
                                                onPress={() => navigate('DetailsProduct', {
                                                    id: item.id
                                                })}>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Image source={{ uri: item.image }}
                                                        style={{ width: 120, height: 100 }} />
                                                </View>
                                                <View style={{ paddingLeft: 15, paddingBottom: 5, paddingTop: 5 }}>
                                                    <Text style={styles.textNormal}>{item.brand}</Text>
                                                    <Text style={styles.textNormal}>{item.name}</Text>
                                                    <Text style={styles.textPrice}>Rp. {this.toRupiah(item.price)} </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.textDiscount}>Rp. {this.toRupiah(item.price + 1000000)}</Text>
                                                        <Text style={{ marginLeft: 5, fontSize: 16 }}>20% OFF</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </CardItem>
                                )}
                            />
                        </View>
                    </Card>

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Card>
                            <CardItem>
                                <Image source={{ uri: 'https://cdn1.iconfinder.com/data/icons/devices-7/128/devices-10-512.png' }}
                                    style={{ height: 75, width: 75 }} />
                                <Text style={{ fontWeight: 'bold', color: '#3F51B5' }}>SMARTPHONE</Text>
                            </CardItem>
                        </Card>
                        <FlatList
                            data={this.props.products.data}
                            keyExtractor={this._keyExtractor}
                            refreshing={this.props.products.isLoading}
                            onRefresh={this.getData}
                            numColumns={2}
                            horizontal={false}
                            renderItem={({ item, index }) => (
                                <View style={styles.viewParent}>
                                    <TouchableOpacity
                                        onPress={() => navigate('DetailsProduct', {
                                            id: item.id
                                        })}>
                                        <View style={{ justifyContent: 'center', paddingTop: 15, paddingLeft: 15 }}>
                                            <Image source={{ uri: item.image }}
                                                style={{ width: 120, height: 100, paddingTop: 10 }} />
                                        </View>
                                        <View style={{ paddingLeft: 20, paddingBottom: 5, paddingTop: 5 }}>
                                            <Text style={styles.textNormal}>{item.brand}</Text>
                                            <Text style={styles.textNormal}>{item.name}</Text>
                                            <Text style={styles.textPrice}>Rp. {this.toRupiah(item.price)}</Text>
                                            <Text style={styles.textSeller}>{item.seller}</Text>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <Icon name='pin' style={{ fontSize: 12, color: '#BDBDBD', paddingTop: 2, marginLeft: 10 }} />
                                                <Text style={styles.textLocation}>
                                                    {item.location}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(ProductsView)

const styles = StyleSheet.create({
    viewParent: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderBottomWidth: 2.25,
        borderRightWidth: 2.25,
        borderLeftWidth: 2.25,
        borderTopWidth: 2.25,
        borderBottomColor: '#CFD8DC',
        borderTopColor: '#CFD8DC',
        borderRightColor: '#CFD8DC',
        borderLeftColor: '#CFD8DC',
        flexBasis: '50%',
    },
    viewHorizontal: {
        paddingLeft: 0,
        paddingTop: 10,
        paddingBottom: 5,
        flexBasis: '50%',
    },
    contentContainer: {
        height: 50
    },
    textStock: {
        fontSize: 13,
        color: 'blue',
        paddingTop: 5
    },
    iconSeller: {
        width: 20,
        height: 20,
        paddingLeft: 10
    },
    textPrice: {
        fontSize: 16,
        color: '#E64A19',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    textNormal: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 1.5
    },
    textLocation: {
        fontSize: 12,
        color: '#BDBDBD',
        marginTop: 1.5,
        marginLeft: 10,
    },
    textSeller: {
        fontSize: 12,
        color: '#607D8B',
        marginTop: 1.5,
        marginLeft: 10,
    },
    imageBanner: {
        width: Dimensions.get('window').width,
        height: 120,
        flex: 0,
        resizeMode: 'contain',
        backgroundColor: 'white'
    },
    textDiscount: {
        marginTop: 1.5,
        marginLeft: 10,
        color: '#757575',
        fontSize: 13,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: '#000'
    }
})