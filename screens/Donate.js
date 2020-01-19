import React, {Component} from 'react';
import { Text, View, SafeAreaView, ScrollView, AsyncStorage} from 'react-native'; 
import RedeemBox from '../components/RedeemBox';
export default class RedeemScreen extends Component{
   render() {
	return(
	<ScrollView>
		<RedeemBox Msg = "Donated!" Pic = "https://www.bing.com/th/id/OIP.bef9dQ3GywMmUCOlZkarmQHaDW?pid=Api&rs=1" />
		<RedeemBox Msg = "Donated!" Pic = "https://rcforward.org/wp-content/uploads/2019/06/catf-banner-1024x256.jpeg"/>
		<RedeemBox Msg = "Donated!" Pic = "https://biz.prlog.org/RainforestFoundation/logo.jpg" />
		<RedeemBox Msg = "Donated!" Pic = "https://350.org/wp-content/uploads/2016/11/350-site-share-image-1024x538.jpg" />
		<RedeemBox Msg = "Donated!" Pic = "https://businesstrumpet.com/wp-content/uploads/2018/10/world-wildlife-fun-wwf.jpg" />
		<RedeemBox Msg = "Donated!" Pic = "https://earthjustice.org/sites/default/files/feature/2017/yir/earthjustice-eoy-1200.jpg"/>
		<RedeemBox Msg = "Donated!" Pic = "http://c2.accu.fm/banners/sweeper/allianceforthegreatlakes.jpg"/>
	</ScrollView>
	);
   }
};

RedeemScreen.navigationOptions = {
	title: 'Redeem',
};
