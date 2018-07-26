import React, { Component } from 'react';
import { View, Text, Button, Alert, ToastAndroid, FlatList, Image, ImageBackground } from 'react-native';
import Axios from 'axios'

class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFromServer: ''
        }
        this.fetDataHTTP();
    }

    fetDataHTTP() {
        var strUrl = 'http://csclub.ssru.ac.th/s56122201044/csc4202/monitor/php_get_monitor.php';
        Axios.get(strUrl).then(response => {

            var data = response.data;
            this.setState({
                dataFromServer: data
            })
            console.log("response => " + JSON.stringify(data));

            //Alert.alert("Data" , data);
        }).catch(err => {
            ToastAndroid.show(err + "", ToastAndroid.SHORT);
            console.log("error");
        })
    }

    fetchItem(item) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Image
                    resizeMode='contain'
                    // source={require('./src/images/blue_eye_white_dragon.png')}\
                    source={{uri : item.image}}
                    style={{ width: 100, height: 130 }}
                />
    
                <View style={{flexDirection:'column' , justifyContent:'center' , marginLeft: 20}}>
                    <Text>
                        {item.product_name}
                    </Text>
                    <Text>
                        price : {item.price} บาท
                    </Text>
                </View>

            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <FlatList
                    style={{ marginTop: 40, marginLeft: 12, marginRight: 12 }}
                    //data={[1, 2, 3, 4]}
                    data ={this.state.dataFromServer}
                    renderItem={({ item }) => this.fetchItem(item)}
                />
            </View>
        );
    }
}

export default componentName;
