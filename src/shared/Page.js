import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

//Work around since not using router, if page name is not the same, don't display anything
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