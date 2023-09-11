import React from 'react';
import ContentLoader from "react-content-loader";

const Skeleton = (props) => {
    return (
        <ContentLoader
            className='pizza-block'
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="8" y="277" rx="10" ry="10" width="261" height="24" />
            <rect x="8" y="311" rx="10" ry="10" width="260" height="34" />
            <circle cx="139" cy="136" r="125" />
            <rect x="11" y="353" rx="10" ry="10" width="118" height="43" />
            <rect x="143" y="353" rx="10" ry="10" width="120" height="44" />
        </ContentLoader>
    )
}

export default Skeleton;
