import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { useFetchGifs } from '../../hooks/useFetchGifs';
import { renderHook } from '@testing-library/react-hooks';

describe('Pruebas en el hook useFetchGifs', () => {

    test('debe de retornar el estado inicial ', async () => {
        
        const { result, waitForNextUpdate } = renderHook( () => useFetchGifs('Dragon Ball') );
        const { data, loading } = result.current;

        await waitForNextUpdate();

        expect( data ).toEqual( [] );
        expect( loading ).toEqual( true );

    });

    test('debe de retornar un arreglo de imgs y loading en false ', async () => {
        
        const { result, waitForNextUpdate } = renderHook( () => useFetchGifs('Dragon Ball') );

        await waitForNextUpdate();

        const { data, loading } = result.current;

        expect( data.length ).toBe( 10 );
        expect( loading ).toBe( false );
        
    }); 
    
    
});



