import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search : React.FC = () => {
    const dispatch = useDispatch();
    const callback = React.useCallback;
    const [value, setValue] = React.useState<string>('');
    const inputSearchRef = React.useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputSearchRef.current?.focus();
    }

    const updateSearchValue = callback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 250),
        []);

    const onChangeInput = (event : React.ChangeEvent<HTMLInputElement> ) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }
    return (
        <div className={styles.root}>
            <svg className={styles.icon} width="16px" height="16px" viewBox="0 0 32 32" version="1.1">
                <defs>
                </defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Icon-Set" transform="translate(-256.000000, -1139.000000)" fill="#000000">
                        <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search">

                        </path>
                    </g>
                </g>
            </svg>
            <input ref={inputSearchRef} value={value} onChange={onChangeInput} className={styles.input} placeholder='Я ищу...' />
            {value && <svg onClick={onClickClear} className={styles.close} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z" /></svg>}
        </div>
    )
}

export default Search
