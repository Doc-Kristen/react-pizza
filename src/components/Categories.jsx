import React from "react";

const Categories = ({ value, onClickCategory }) => {
    const categories = ['Все', 'Вегетарианская', 'Мясные', 'Гриль', 'Острые', 'Закрытые'];
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => {
                        return <li
                            key={category.toString()}
                            onClick={() => onClickCategory(index)}
                            className={value === index ? 'active' : ''}
                        >{category}</li>
                    })
                }
            </ul>
        </div>
    );
};

export default Categories;