import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../const/const';

const FullPizza : React.FC = () => {
    const navigate = useNavigate();

    const [pizza, setPizza] = React.useState<{title: string; imageUrl: string; price: number}>();
    const { id } = useParams();

    React.useEffect(() => {
        async function fethchPizza() {
            try {
                const { data } = await axios.get(`${URL}/items/${id}`);
                setPizza(data);
            } catch (e) {
                navigate('/*');
            }
        }
        fethchPizza();
    }, [id, navigate]);

    if (!pizza) {
        return <div>Загрузка...</div>
    }

    return (
        <div className='content__pizza'>
            <h1>{pizza.title}</h1>
            <img src={pizza.imageUrl} alt='Пицца'></img>
            <p>Цена: {pizza.price} ₽</p>
            <p className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odit quam iusto. Nisi inventore quidem aut debitis, laudantium facilis sed libero maxime, rem aspernatur, eveniet enim molestias magni temporibus. Corrupti?</p>
        </div>
    )
}

export default FullPizza
