import React, {Component} from "react";
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

class CardStack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardCount: 5,
            data: [],
            progress: 0
        };

        this.cardPositions = [];

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                for (let i = 0; i < this.state.cardCount; i++) {
                    this.cardPositions[i].setValue({
                        x: gestureState.dx / ((this.state.cardCount - i) * (this.state.cardCount - i)),
                        y: gestureState.dy / ((this.state.cardCount - i) * (this.state.cardCount - i))
                    }, {useNativeDriver: true});
                }
            },
            onPanResponderRelease: (e, gesture) => {
                if (Math.abs(gesture.vx) > 0.7 || Math.abs(gesture.vy) > 0.7) {
                    for (let i = 0; i < this.state.cardCount - 1; i++) {
                        Animated.spring(
                            this.cardPositions[i],
                            {toValue: {x: 0, y: 0}},
                            {useNativeDriver: true}
                        ).start();
                    }
                    Animated.timing(
                        this.cardPositions[this.state.cardCount - 1],
                        {
                            toValue: {x: gesture.dx * 5, y: gesture.dy * 5},
                            duration: 200
                        },
                        {useNativeDriver: true}
                    ).start(() => {
                        this.removeCard();
                    });
                } else {
                    for (let i = 0; i < this.state.cardCount; i++) {
                        Animated.spring(
                            this.cardPositions[i],
                            {toValue: {x: 0, y: 0}},
                            {useNativeDriver: true}
                        ).start();
                    }
                }
            }
        });
    }

    componentDidMount() {
        this.cardPositions = [];
        for (let i = 0; i < this.props.cardCount; i++)
            this.cardPositions = this.cardPositions.concat(new Animated.ValueXY());

        this.setState({cardCount: this.props.cardCount, data: this.props.data});
    }

    removeCard() {
        this.cardPositions.pop();

        if (this.state.progress + this.state.cardCount >= this.state.data.length) {
            this.setState({
                cardCount: this.state.cardCount - 1,
                progress: this.state.progress + 1
            });
        } else {
            this.cardPositions = [new Animated.ValueXY(), ...this.cardPositions];
            this.setState({
                progress: this.state.progress + 1
            });
        }
    }

    renderCards() {
        if (this.cardPositions.length === 0)
            return null;

        let renderedCards = [];
        let scale = 1.00 - (this.state.cardCount * 0.02);
        let top = (this.state.cardCount - 0.5) * (-10);
        let left = (this.state.cardCount - 0.5) * (-8);

        for (let i = 0; i < this.state.cardCount - 1; i++) {
            renderedCards = renderedCards.concat(
                <View style={styles.cardContainer} key={'card_' + i}>
                    <Animated.View
                        style={[this.cardPositions[i].getLayout(), styles.card, {transform: ([{scale: scale}, {translateY: top}, {translateX: left}])}]}>
                        {this.props.renderCardContent(this.state.data[this.state.progress + (this.state.cardCount - 1 - i)])}
                    </Animated.View>
                </View>
            );
            scale = scale + 0.02;
            top = top + 10;
            left = left + 8;
        }

        renderedCards = renderedCards.concat(
            <View
                key={'card_' + this.state.cardCount}
                style={[styles.cardContainer]}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[this.cardPositions[this.state.cardCount - 1].getLayout(), styles.cardActive]}>
                    {this.props.renderCardContent(this.state.data[this.state.progress])}
                </Animated.View>
            </View>
        );

        return renderedCards;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    cardContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    cardActive: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

        width: 300,
        height: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderColor: '#CCCCCC',
        borderWidth: 1
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

        width: 300,
        height: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderColor: '#CCCCCC',
        borderWidth: 1
    }
});

export default CardStack;
