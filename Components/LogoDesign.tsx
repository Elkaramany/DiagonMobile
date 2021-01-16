import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors, GlobalStyles} from './Constants'
import HeaderArrow from './common/HeaderArrow'
import {connect} from 'react-redux'
import {setSelectedDesign} from '../actions'
import Spinner from './common/Spinner'
import {StackNavigationProp} from '@react-navigation/stack'

interface Props {
  navigation: StackNavigationProp<any, any>
  selectedShirt: {id: number; name: string; image: string; hexCode: string}
  selectedDesign: string
  setSelectedDesign: (item: string | null) => void
  designs: Array<string>
}

const LogoDesign: React.FC<Props> = props => {
  const [loaded, setLoaded] = useState(false)
  const {selectedShirt, selectedDesign, setSelectedDesign} = props

  const backToLogin = () => {
    props.navigation.goBack()
  }

  useEffect(() => {
    try {
      if (props.designs.length) {
        if (!loaded) {
          setSelectedDesign(null)
          setLoaded(true)
        }
      }
    } catch {}
  }, [props.designs])

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item}
        onPress={() => setSelectedDesign(item)}
        style={styles.designContainer}>
        <Image source={{uri: item}} style={styles.designPicked} />
      </TouchableOpacity>
    )
  }

  if (loaded) {
    return (
      <View style={styles.container}>
        <HeaderArrow
          HeaderText={'Choose your design'}
          HeaderStyle={{backgroundColor: 'transparent'}}
          TextEdited={GlobalStyles.headerTextStyle}
          navigateMeBack={() => backToLogin()}
          iconName={'arrow-left'}
          iconColor={Colors.mainForeGround}
        />
        <View style={styles.design}>
          <ImageBackground
            source={{uri: selectedShirt.image}}
            style={styles.image}>
            <View style={styles.designImageContainer}>
              <Image
                source={{uri: selectedDesign}}
                style={styles.designImage}
              />
            </View>
          </ImageBackground>
        </View>
        <ScrollView style={{flex: 1}}>
          <FlatList
            numColumns={2}
            data={props.designs}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </ScrollView>
        <TouchableOpacity
          style={[
            GlobalStyles.buttonContainer,
            {width: '60%', alignSelf: 'center'},
          ]}
          onPress={() => {}}>
          <Text style={GlobalStyles.buttonText}>Choose this design</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.mainBackground,
  },
  design: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: hp('3%'),
    height: hp('40%'),
    width: wp('40%'),
  },
  designImage: {
    height: hp('25%'),
    width: wp('25%'),
    resizeMode: 'contain'
  },
  designContainer: {
    height: hp('30%'),
    width: wp('45%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('5%'),
  },
  designPicked: {
    height: hp('20%'),
    width: wp('20%'),
  },designImageContainer:{
    justifyContent: 'center', 
    alignItems: 'center',
    top: hp('20%')
  }
})

const mapStateToProps = ({fetchReducer}) => {
  return {
    designs: fetchReducer.allDesigns,
    selectedDesign: fetchReducer.selectedDesign,
    selectedShirt: fetchReducer.selectedShirt,
  }
}

export default connect(mapStateToProps, {setSelectedDesign})(LogoDesign)
