import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
constructor() {
super();
this.state = {
allStories: [],
dataSource: [],
search: '',
};
}
componentDidMount() {
this.retrieveStories();
}

retrieveStories = () => {
try {
var allStories = [];
var stories = db
.collection('story')
.get()
.then((querySnapshot) => {
querySnapshot.forEach((doc) => {
allStories.push(doc.data());
console.log('story', allStories);
});
this.setState({ allStories });
});
} catch (error) {
console.log(error);
}
};

SearchFilterFunction(text) {
const newData = this.state.allStories.filter((item) => {
const itemData = item.TitleStory ? item.TitleStory : '';
const textData = text;
return itemData.indexOf(textData) > -1;
});
this.setState({
dataSource: newData,
search: text,
});
}

render() {
return (
<View style={styles.container}>
<Text style={styles.header}>bedtimestory</Text>
<SearchBar style = {styles.searchBar}
placeholder="Write title of your story here."
onChangeText={(text) => this.SearchFilterFunction(text)}
value={this.state.search}
/>
<ScrollView style = {styles.scrollView}>
<View>
{this.state.search === ''
? this.state.allStories.map((item) => (
<View
style={{
borderColor:'black',
borderWidth:3,
marginLeft:20,
marginTop:10,
maginright:10,
backgroundColor:'#ff1493'
}}>
<TouchableOpacity>
<Text style = {styles.story}>Title : {item.TitleStory}</Text>
<Text style = {styles.story}>Author : {item.AuthorStory}</Text>
<Text style = {styles.story}>Story : {item.Writestory}</Text>

</TouchableOpacity>
</View>
))
: this.state.dataSource.map((item) => (
<View
style={{
borderColor:'black',
borderWidth:3,
marginLeft:20,
marginTop:10,
maginright:10,
backgroundColor:'#ff1493'
}}>
<TouchableOpacity>
<Text style = {styles.story}>Title : {item.TitleStory}</Text>
<Text style = {styles.story}>Author : {item.AuthorStory}</Text>
<Text style = {styles.story}>Story : {item.Writestory}</Text>
</TouchableOpacity>
</View>
))}
</View>
</ScrollView>

</View>
);
}
}

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: 'pink',
},
story:{
fontSize:20,
},
searchBar:{
color:'white',
padding:10,
},
scrollView: {
width:300
},
});
