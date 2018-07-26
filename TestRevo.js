import React, { Component } from 'react';
import { View, Text, Button, Alert, ToastAndroid, TextInput, StyleSheet, ProgressBarAndroid } from 'react-native';
import Axios from 'axios';
import * as Progress from 'react-native-progress'
import { ProgressDialog ,ConfirmDialog } from 'react-native-simple-dialogs';

export default class componentName extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataFromServer: '',
            myTextInput: '',
            progress: 0,
            indeterminate: true,
        }
        //this.fetDataHTTP();
    }

    


    fetDataHTTP = (word_id) => {
        //this.openProgress();

        var strUrl = 'http://192.168.1.106/webapi/product/viewProductById';

        var parameter = parseInt(word_id);
        //ToastAndroid.show(result + " ",ToastAndroid.SHORT);

        const data_option = {
            params: {
                id: parameter
            }
        }
        console.log("option =>" + JSON.stringify(data_option));

        Axios.get(strUrl, data_option).then(response => {
            var data = response.data.product_name;
            this.setState({
                dataFromServer: data
            })
            console.log("response => " + JSON.stringify(response));
            this.setState({ showProgress: false })
        }).catch(err => {
            ToastAndroid.show(err + "", ToastAndroid.SHORT);
            console.log("error");
            this.setState({ showProgress: false })
        })
        this.setState({ myTextInput: '' });

    }

    openProgress() {
        this.setState({ showProgress: true })
    }

    gotoFetchData = () => {
        if (this.state.myTextInput == '') {
            ToastAndroid.show('Word empty', ToastAndroid.SHORT);
            this.openConfirm(true)
        } else {
            this.fetDataHTTP(this.state.myTextInput);
        }
    }

    openConfirm(show) {
        this.setState({ showConfirm: show })
    }

    optionYes() {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(() => alert("Yes touched!"), 100);
    }

    optionNo() {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(() => alert("No touched!"), 100);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <TextInput
                    keyboardType='numeric'
                    style={{ marginTop: 20 }}
                    onChangeText={(myTextInput) => this.setState({ myTextInput })}
                    value={this.state.myTextInput}

                />
                <Button
                    title="Search Item"
                    onPress={this.gotoFetchData}
                />
                <Text> Data : {this.state.dataFromServer} </Text>
                <ProgressDialog
                    visible={this.state.showProgress}
                    title="Progress Dialog"
                    message="Please, wait..."
                    activityIndicatorSize="large"
                    activityIndicatorColor="red"
                />

                <ConfirmDialog
                    title="Confirm Dialog"
                    message="Are you sure about that?"
                    visible={this.state.showConfirm}
                    onTouchOutside={() => this.openConfirm(false)}
                    positiveButton={{
                        title: "YES",
                        onPress: () => this.optionYes()
                    }}

                    negativeButton={{
                        title: "NO",
                        // disabled: true,
                        titleStyle: {
                            color: 'blue',
                            colorDisabled: 'aqua',
                        },
                        style: {
                            backgroundColor: 'transparent',
                            backgroundColorDisabled: 'transparent',
                        },
                        onPress: () => this.optionNo()
                    }}
                />
            </View>
        );
    }
}

