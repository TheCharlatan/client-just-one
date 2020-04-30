import React from 'react';
import styled from 'styled-components';
import Blue from "../../../views/design/font-families/Blue";


export class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayTime: this.props.startTime,
            timer: null
        };
        this.updateTime = this.updateTime.bind(this);
    }

    componentDidMount() {
        this.state = {
            timer: window.setInterval(this.updateTime, 1000)
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    updateTime() {
        if (this.state.displayTime >= 0) {
            this.state = {
                displayTime: this.state.displayTime - 1
            };
        }
    }

    render() {
        return (
            <TimerContainer>
                <Blue>
                    {this.state.displayTime} s
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