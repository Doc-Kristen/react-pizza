import React from "react";

type CategoriesProps = {
    value: number;
    onClickCategory: (index: number) => void;
};

const Categories : React.FC<CategoriesProps>  = ({ value, onClickCategory }) => {
    const categories = ['Все', 'Вегетарианская', 'Мясные', 'Гриль', 'Острые', 'Закрытые'];
    return (<div className="categories">
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
        </div>);
};

export default Categories;