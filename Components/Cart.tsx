import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from './Constants';
import HeaderArrow from './common/HeaderArrow';
import { GlobalStyles } from './Constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {DrawerNavigationProp} from '@react-navigation/drawer';

interface Props{
    navigation: DrawerNavigationProp<any, any>
}

const Cart: React.FC <Props> = ({navigation}) => {

    const DrawerNavigationToggle = () => {
        navigation.toggleDrawer();
    }

    return (
        <View style={styles.container}>
            <HeaderArrow HeaderText={'Shopping cart'} HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={GlobalStyles.headerTextStyle}
                navigateMeBack={() => DrawerNavigationToggle()}
                iconName={'menu'}
                iconColor={Colors.mainForeGround}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBackground
    }
})

export default Cart
