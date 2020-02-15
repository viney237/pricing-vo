import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{
        state = {
            chartData: {
                labels: [],
                datasets: [
                  {
                    label: 'Proba',
                    data: [],
                    backgroundColor: '#cbc9ff'
                  }
                ]
            }
        }
        
        componentDidMount = () => {
            setInterval(() => {
              this.setState({
                chartData: {
                  labels: this.props.prix,
                  datasets: [{
                    label: 'Proba',
                    data: this.props.proba,
                  }]
                }
              })
            }, 1000);
          }

    render(){
        return (
          <div className="chart" style={{position: "relative", width:400}}>
            <Line
              data={this.state.chartData}
              options={{
                  title:{
                      display: 'true',
                      text: 'Probability de vente',
                      fontSize: 15
                  },
                  legend:{
                      display: true,
                      position: "right"
                  }
              }}
              
            />
          </div>
        );
    }
}

export default Chart;

