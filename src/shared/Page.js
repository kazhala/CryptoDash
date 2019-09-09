import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

const Page = props => {
    const pageContext = useContext(AppContext);
    let page = pageContext.page === props.name ? props.children : null;
    return (
        <div>
            {page}
        </div>
    );
}

export default Page;