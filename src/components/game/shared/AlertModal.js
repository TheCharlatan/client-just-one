import React from "react";
import close from '../../../img/close.png'
import Red from "../../../views/design/font-families/Red";
import Yellow from "../../../views/design/font-families/Yellow";

export default class AlertModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal" style={{top: "20%", height: 'auto', maxHeight: '600px', overflowY: 'auto'}}>
                <div style={{marginBottom: '8%', marginTop: '8%'}}>
                    <Red style={{fontSize: "x-large", fontSizeImportant: "true"}}>
                        Alert
                        <img onClick={() => this.props.hideModal()} style={{
                            cursor: 'pointer',
                            height: '16px',
                            float: 'right',
                            marginRight: '5px',
                            marginTop: '-5px'
                        }} src={close} />
                    </Red>
                </div >
                <div>
                    <Red style={{lineHeight:"unset"}}>{this.props.message_1}</Red>
                </div>
                <div>
                    <Yellow style={{lineHeight:"unset"}}>{this.props.message_2}</Yellow>
                </div>


            </div>
        );
    }
}