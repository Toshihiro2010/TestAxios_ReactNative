import React, { Component } from 'react';
import { View, Text, Button, Alert, ToastAndroid } from 'react-native';
import Axios from 'axios'

class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataTest: ''
    };
  }

  fetchGet = () => {

    const data_option = {
      username: 'admin',
      password: 'password',
      type: 'foods'
    }
    //var strUrl = 'http://facebook.github.io/react-native/movies.json';
    //var strUrl = 'http://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=foods';

    var strUrl = 'http://codemobiles.com/adhoc/youtubes/index_new.php';


    Axios.get(strUrl, { params: data_option }).then(response => {
      //var data = response.data.movies[1].title;
      var dataJsonResponse = JSON.stringify(response);

      var data = response.data.youtubes[0].title;
      console.log("response => " + dataJsonResponse);
      this.setState({ dataTest: data });
      //Alert.alert("Data" , data);
    }).catch(err => {
      ToastAndroid.show(err + "", ToastAndroid.SHORT);
      console.log("error");
    })

  }

  fetchPost = () => {
    Alert.alert("Hello", "Post");
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>

        <Text>
          Data : {this.state.dataTest}
        </Text>

        <View style={{ flexDirection: 'row', margin: 10, marginTop: 20 }}>
          <Button
            title="Get API"
            onPress={this.fetchGet} />
        </View>


        <View style={{ margin: 10 }}>
          <Button
            title="Post API"
            onPress={this.fetchPost} />
        </View>

      </View>
    );
  }
}

export default componentName;
