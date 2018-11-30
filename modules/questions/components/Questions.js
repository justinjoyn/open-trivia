import React, {Component} from "react";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {SafeAreaView} from "react-navigation";
import ActivityLoader from "../../common/ActivityLoader";
import {getQuestions} from "../actions"
import CardStack from "../../common/CardStack";
import {TEST_DATA} from "../../../common/constants";

class Questions extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    static getDerivedStateFromProps(props) {
        return null;
    }

    componentDidMount() {

    }

    renderQuestion(item) {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{item.number}</Text>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden={true}/>
                <CardStack
                    cardCount={5}
                    data={TEST_DATA}
                    renderCardContent={(item) => this.renderQuestion(item)}/>
                <ActivityLoader loading={this.props.isLoading}/>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getQuestions
    }, dispatch);
};

const mapStateToProps = state => ({
    questions: state.questions.questions.questions,
    isLoading: state.questions.questions.isLoading
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Questions);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    card: {
        padding: 10,
        marginVertical: 5,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 10
    },
    cardContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTitle: {
        fontFamily: 'product-sans-regular',
        fontSize: 16
    }
});
