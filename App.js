
import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ReadScreen from './screens/Readstory';
import WriteScreen from './screens/Writestory';

export default class App extends React.Component {
render(){
return (
<AppContainer/>
);
}
}

const TabNavigator=createBottomTabNavigator({
Write:{screen:WriteScreen},
Read:{screen:ReadScreen}
},
{
defaultNavigationOptions:({navigation})=>({
tabBarIcon: ()=>{
const routeName=navigation.state.routeName;
console.log (routeName);
if(routeName==='Read'){
return(
<Image style={{width:40,height:40}} source={require('./assets/read.png')}/>
)
}else if(routeName==='Write'){
return(
<Image style={{width:40,height:40}} source={require('./assets/write.png')}/>
)
}
}
})
}
);
const AppContainer= createAppContainer(TabNavigator)