import styled from 'styled-components';
import profilePlaceholder from '../../../img/profilePlaceholder.png';

const ProfilePictureContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: flex-end;

width: 181px;
height: 200px;
background-image: url(${profilePlaceholder});
background-repeat: no-repeat;
background-size: 181px 200px;
background-color: #F8E7D1;

border: 2px solid black;
`;

export default ProfilePictureContainer;