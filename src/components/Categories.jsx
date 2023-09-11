import React from "react";

const Categories = () => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const [activeCategory, setActiveCategory] = React.useState(0);
    const onClickCategory = (indexCategory) => {
        setActiveCategory(indexCategory);
    };
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => {
                        return <li
                            key={category.toString()}
                            onClick={() => onClickCategory(index)}
                            className={activeCategory === index ? 'active' : ''}
                        >{category}</li>
                    })
                }
            </ul>
        </div>
    );
};

export default Categories;