import React, { useContext } from 'react';
import styled from 'styled-components';

import { fontSize1, greenBoxShadow, color3 } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: ${color3};
    ${fontSize1}
    padding: 5px;
    cursor: pointer;
    &:hover {
        ${greenBoxShadow}
    }
`
const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`

const ConfirmButton = props => {
    const appContext = useContext(AppContext);
    return (
        <CenterDiv>
            <ConfirmButtonStyled onClick={appContext.confirmFavorites}>
                Confirm Favorites
            </ConfirmButtonStyled>
        </CenterDiv>
    )
}

export default ConfirmButton;