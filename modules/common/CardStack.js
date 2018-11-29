import React, {Component} from "react";
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

class CardStack extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            cardCount: 0,
            cardPositions: [],
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                for (let i = 0; i < this.state.cardCount; i++) {
                    this.state.cardPositions[i].setValue({
                        x: gestureState.dx / ((this.state.cardCount - i) * (this.state.cardCount - i)),
                        y: gestureState.dy / ((this.state.cardCount - i) * (this.state.cardCount - i))
                    });
                }
            },
            onPanResponderRelease: (e, gesture) => {
                console.log(e, gesture);
                for (let i = 0; i < this.state.cardCount; i++) {
                    Animated.spring(
                        this.state.cardPositions[i],
                        {toValue: {x: 0, y: 0}}
                    ).start();
                }
            }
        });
    }

    componentDidMount() {
        let cardCount = this.props.cardCount;
        let cardPositions = [];
        for (let i = 0; i < cardCount; i++)
            cardPositions = cardPositions.concat(new Animated.ValueXY());
        this.setState({cardPositions: cardPositions, cardCount: cardCount});
    }

    renderCards() {
        if (this.state.cardPositions.length === 0)
            return null;

        let cardCount = this.props.cardCount;
        let renderedCards = [];
        let scale = 1.00 - (cardCount * 0.02);

        for (let i = 0; i < cardCount - 1; i++) {
            renderedCards = renderedCards.concat(
                <View style={styles.cardContainer} key={'card_' + i}>
                    <Animated.View
                        style={[this.state.cardPositions[i].getLayout(), styles.card, {

                            backgroundColor: '#FFF'
                        }]}>
                    </Animated.View>
                </View>
            );
        }

        renderedCards = renderedCards.concat(
            <View
                key={'card_' + cardCount}
                style={[styles.cardContainer]}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[this.state.cardPositions[cardCount - 1].getLayout(), styles.cardActive, {backgroundColor: '#FFF'}]}>
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
        borderRadius: 3,
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
        borderRadius: 3,
        borderColor: '#CCCCCC',
        borderWidth: 1
    }
});

export default CardStack;
