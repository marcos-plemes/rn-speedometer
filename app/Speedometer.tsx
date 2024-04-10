import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';
import ponteiro from '../assets/speedometer-needle.png'
import {useRef} from "react";
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";

const {width} = Dimensions.get('window');
const currentSize = width - 20;

interface LabelsInterface {
    color: ColorValue,
    porcentagem: number
}

interface SpeedometerProps {
    readonly labels: LabelsInterface[],
    readonly valor: number
}

const style = StyleSheet.create({
    outerCircle: {
        width: width - 20,
        height: width / 2 - 10,
    },
    innerCircle: {
        width: width * 0.6,
        height: (width / 2) * 0.6
    },
    halfCircle: {
        width: currentSize / 2,
        height: currentSize,
        borderRadius: currentSize / 2
    },
    image: {
        resizeMode: 'stretch',
        height: currentSize,
        width: currentSize
    },
    imageWrapper: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
    }
})

export default function (props: SpeedometerProps) {
    const rotation = useRef(new Animated.Value(props.valor)).current;
    Animated.timing(rotation, {
        toValue: props.valor,
        duration: 1000,
        useNativeDriver: true
    }).start();

    const interpolatedRotation = rotation.interpolate({
        inputRange: [0, 100],
        outputRange: ['-90deg', '89deg']
    })
    return (
        <View className="mx-1.5 my-2.5 self-center">
            <View className="justify-end items-center overflow-hidden border-white bg-zinc-200 rounded-t-full"
                  style={[style.outerCircle]}>

                {props.labels.map((level, index) => {
                    const soma = props.labels.slice(0, index).reduce((acc, curr) => acc + curr.porcentagem, 0);
                    const grauDeRotacao = 90 + (180 / 100 * soma * (index == 0 ? 0 : 1));
                    return (
                        <View className="absolute top-0 left-0 rounded-r-none"
                              key={index}
                              style={[style.halfCircle, {
                                  backgroundColor: level.color,
                                  transform: [
                                      {translateX: currentSize / 4},
                                      {rotate: `${grauDeRotacao}deg`},
                                      {translateX: currentSize / 4 * -1}
                                  ]
                              }]}
                        />
                    );
                })}
            </View>
            <Animated.View style={[style.imageWrapper, {
                transform: [
                    {rotate: interpolatedRotation}
                ]
            }]}>
                <Image style={[style.image]} source={ponteiro}></Image>
            </Animated.View>
        </View>
    );
}
