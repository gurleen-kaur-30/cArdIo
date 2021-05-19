import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import firebase from 'firebase/app';
import axios from 'axios';
import utilStyles from '../styles/util.module.scss'



class Graph extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label : 'count',
                    backgroundColor: "#17224d",
                    borderColor: "#17224d",
                    borderWidth: 1,
                    hoverBackgroundColor: "#007fff",
                    hoverBorderColor:"#007fff" ,
                    data: []
                }
            ]
        }
        
    }
	async componentWillMount(){
        var uid = firebase.auth().currentUser.uid
        const res = await axios.get(`http://localhost:3000/api/exercises/bicepCurls/${uid}`)
        var newData = Object.entries(res.data).map((e) => ( e[1] ));
        var countArr = []
        var dateArr = []
        newData.map((item) => {
            countArr.push(item.count)
            dateArr.push(new Date(item.created._seconds*1000).getHours() + ":" + new Date(item.created._seconds*1000).getMinutes() + ":" + new Date(item.created._seconds*1000).getSeconds())
        })
        var newState = {}
        newState = this.state.datasets
        newState[0].data = countArr;
		this.setState({datasets: newState});
        this.setState({labels : dateArr })
	}

	componentDidMount(){
		var _this = this;

		// setInterval(function(){
		// 	var oldDataSet = _this.state.datasets[0];
		// 	var newData = [];

		// 	for(var x=0; x< _this.state.labels.length; x++){
		// 		newData.push(Math.floor(Math.random() * 100));
		// 	}

		// 	var newDataSet = {
		// 		...oldDataSet
		// 	};

		// 	newDataSet.data = newData;
		// 	newDataSet.backgroundColor = 'red';
		// 	newDataSet.borderColor = 'blue';
		// 	newDataSet.hoverBackgroundColor = 'green';
		// 	newDataSet.hoverBorderColor = 'yellow';

		// 	var newState = {
		// 		...initialState,
		// 		datasets: [newDataSet]
		// 	};

		// 	_this.setState(newState);
		// }, 5000);
	}

	render() {
		return (
			<Line data={this.state}  height={70}
            />
		);
	}
}


const Charts = () => (
	<div>
		<h2 className={utilStyles.headingLg}>Statistics</h2>
		<Graph/>
	</div>
);

export default Charts;