import React from 'react';
import styled from 'styled-components';
import Blue from "../../../views/design/font-families/Blue";


// Display the remaining time with 0.1s update intervals.
export class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayTime: this.props.startTime, // in ms
            timer: null
        };
        this.updateTime = this.updateTime.bind(this);
    }

    componentDidMount() {
        this.setState ({
            displayTime: this.props.startTime,
            timer: window.setInterval(this.updateTime, 100)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    updateTime() {
        if (this.state.displayTime > 100) {
            this.setState({
                displayTime: this.state.displayTime - 100
            });
        }
        else {
            if (this.state.displayTime > 0) {
                this.props.onTimerFinished();
            }
            this.setState({
                displayTime: 0
            });
        }
    }

    render() {
        return (
            <TimerContainer>
                <Blue>
                    {Math.floor(this.state.displayTime / 100) / 10} s
                </Blue>
            </TimerContainer>
        );
    }
}


const TimerContainer = styled.div`
position: fixed;
top: 5%;
left: 50%;
transform: translate( -50%, -50%);

padding: 2px;

border-radius: 2px;
text-align: center;
background: #F8E7D1;
border: 3px solid #DDC18E;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;