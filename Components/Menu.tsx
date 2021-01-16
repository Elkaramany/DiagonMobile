import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors, GlobalStyles} from './Constants'
import {connect} from 'react-redux'
import {Credential, fetchAll, setSelectedShirt} from '../actions'
import HeaderArrow from './common/HeaderArrow'
import Spinner from './common/Spinner'
import {DrawerNavigationProp} from '@react-navigation/drawer'

interface shirtType {
  id: number
  name: string
  image: string
  hexCode: string
}

interface Props {
  navigation: DrawerNavigationProp<any, any>
  shirtColors: Array<{id: number; name: string; image: string; hexCode: string}>
  selectedShirt: {id: number; name: string; image: string; hexCode: string}
  setSelectedShirt: (item: shirtType) => void
  fetchAll: () => void
}

const UserMenu: React.FC<Props> = props => {
  const [loaded, setLoaded] = useState(false)

  const {selectedShirt, setSelectedShirt} = props

  useEffect(() => {
    props.fetchAll()
  }, [])

  useEffect(() => {
    try {
      if (props.shirtColors.length) {
        if (!loaded) {
          setSelectedShirt(props.shirtColors[0])
          setLoaded(true)
        }
      }
    } catch {}
  }, [props.shirtColors])

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.singleShirt}
        key={parseInt(item.id)}
        onPress={() => setSelectedShirt(item)}>
        <View style={[styles.shirtColor, {backgroundColor: item.hexCode}]} />
      </TouchableOpacity>
    )
  }

  const DrawerNavigationToggle = () => {
    props.navigation.toggleDrawer()
  }

  if (loaded) {
    return (
      <View style={{flex: 1, backgroundColor: Colors.mainBackground}}>
          <HeaderArrow
            HeaderText={'Choose your color'}
            HeaderStyle={{backgroundColor: 'transparent'}}
            TextEdited={GlobalStyles.headerTextStyle}
            navigateMeBack={() => DrawerNavigationToggle()}
            iconName={'menu'}
            iconColor={Colors.mainForeGround}
          />
        <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: selectedShirt.image}} style={styles.image} />
          <FlatList
            numColumns={4}
            data={props.shirtColors}
            renderItem={renderItem}
            keyExtractor={item => item.hexCode}
          />
          <TouchableOpacity
            style={[
              GlobalStyles.buttonContainer,
              {width: '60%', marginTop: hp('5%')},
            ]}
            onPress={() =>
              props.navigation.navigate('LogoDesign')
            }>
            <Text style={GlobalStyles.buttonText}>Choose this color</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  } else
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.mainBackground,
        }}>
        <Spinner size={false} />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('10%'),
  },
  singleShirt: {
    marginHorizontal: wp('3%'),
  },
  image: {
    height: hp('40%'),
    width: wp('70%'),
    marginBottom: hp('5%'),
  },
  shirtColor: {
    marginTop: hp('5%'),
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('15%'),
  },
})

const mapStateToProps = ({fetchReducer}) => {
  return {
    shirtColors: fetchReducer.allShirtColors,
    selectedShirt: fetchReducer.selectedShirt,
  }
}

export default connect(mapStateToProps, {
  Credential,
  fetchAll,
  setSelectedShirt,
})(UserMenu)
