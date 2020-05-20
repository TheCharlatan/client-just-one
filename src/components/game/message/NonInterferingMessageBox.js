import React from "react";
import Blue from "../../../views/design/font-families/Blue";
import Label from "../../../views/design/customized-layouts/Label";


// small message box at the top of the page, requires no interaction and disappears after 4s
export class NonInterferingMessageBox extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Label style={{width: 'auto', height: 'auto', margin: '20px 0px 0px 0px', background: '#F8E7D1'}}>
                <Blue style={{margin: '5px'}}>
                    {this.props.message}
                </Blue>
            </Label>
        );
    }
}