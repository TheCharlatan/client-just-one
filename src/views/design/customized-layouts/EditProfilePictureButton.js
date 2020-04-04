import styled from 'styled-components';
import edit from '../../../img/edit.png';

const EditProfilePictureButton = styled.button`
width: 41px;
height: 36px;
background-image: url(${edit});
background-repeat: no-repeat;
background-size: 41px 36px;

&:hover {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.4);
  transform: translateY(-0.25em);
  cursor:pointer;
}
`;

export default EditProfilePictureButton;