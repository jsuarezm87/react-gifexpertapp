import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { GifGrid } from '../../components/GifGrid';
import { useFetchGifs } from '../../hooks/useFetchGifs';
jest.mock('../../hooks/useFetchGifs');

describe('Pruebas en <GifGrid />', () => {

    const category = 'Dragon Ball';
    
    test('debe de mostrarse corrextamente ', () => {

        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
        });

       const wrapper = shallow( <GifGrid category={category} /> );
       expect( wrapper ).toMatchSnapshot(); 

    });

    test('debe de mostrar items cuando se carga imagenes con useFetchGifs ', () => {

        const gifs = [{
            id: 'ABC',
            url: 'http://localhost/cualquier/cosa.jpg',
            title: 'Cualquier cosa'
        }];

        useFetchGifs.mockReturnValue({
            data: gifs,
            loading: false
        });

        const wrapper = shallow( <GifGrid category={category} /> );
        
        expect( wrapper.find('p').exists() ).toBe(false);   
        expect( wrapper.find('GifGridItem').length ).toBe( gifs.length );
        
    });
    
    
});
