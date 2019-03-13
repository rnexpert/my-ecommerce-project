import React, { Component } from 'react'
import { Image } from 'react-native'
import {
    View,
    Text,
    Container,
    Content,
    Card,
    CardItem,
    Left,
    Body,
    Right,
    Icon,

} from 'native-base'

import '../../../res/data/mydata'

class CategoryView extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <View>
                        {
                            categorylist.map((data, index) => {
                                return (
                                    <Card key={index}>
                                        <CardItem>
                                            <Left>
                                                <Image source={{ uri: data.image }}
                                                    resizeMode='stretch'
                                                    style={{ width: 90, height: 90 }}
                                                />
                                            </Left>
                                            <Body>
                                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{data.name}</Text>
                                                <Text style={{ marginTop: 5, fontSize: 15, color: '#bdbdbd' }}>{data.description}</Text>
                                            </Body>
                                            <Right>
                                                <Icon type='AntDesign' name='right' />
                                            </Right>
                                        </CardItem>
                                    </Card>
                                )
                            })
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}

export default CategoryView