import React from 'react';
import styled from 'styled-components';
import {BaseContainer, CenterContainer, ChatContainer, LeaderboardContainer} from '../../helpers/layout';
import FormContainer from '../../views/design/customized-layouts/FormContainer';

import Form from '../../views/design/customized-layouts/Form';
import { withRouter } from 'react-router-dom';
import Violet from '../../views/design/font-families/Violet';
import Blue from '../../views/design/font-families/Blue';
import Red from '../../views/design/font-families/Red';
import Orange from '../../views/design/font-families/Orange';
import Green from '../../views/design/font-families/Orange';
import Label from '../../views/design/customized-layouts/Label'
import Button from "../../views/design/Button";

class Test extends React.Component {
    render() {
        return (
            <BaseContainer>
                <CenterContainer>
                    <FormContainer>
                    <Form shouldHover>
                            <Violet>test</Violet>
                            <br></br>
                            <Blue>test</Blue>
                            <br></br>
                            <Red>test</Red>
                            <br></br>
                            <div>
                               <Label><Green>Test Label</Green></Label>

                               </div>
                               <br></br>
                               <div>
                           <Button><Orange>Submit</Orange></Button>

                            </div>
                        </Form>
                    </FormContainer>
                        
                </CenterContainer>
            </BaseContainer>
        );
      }
    }
    
    /**
     * You can get access to the history object's properties via the withRouter.
     * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
     */
    export default withRouter(Test);
