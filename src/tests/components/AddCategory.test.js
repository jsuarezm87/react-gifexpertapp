import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { AddCategory } from '../../components/AddCategory';


describe('Pruebas en <AddCategory />', () => {

    const setCategories = jest.fn();
    let wrapper = shallow( <AddCategory setCategories={ setCategories } /> );

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallow( <AddCategory setCategories={ setCategories } /> );
    });
   
    test('debe de mostrarse corrextamente ', () => {
        expect( wrapper ).toMatchSnapshot();        
    });

    test('debe de cambiar la caja de texto ', () => {
        
        const input = wrapper.find('input');
        const value = 'Hola mundo';

        // Con { target:{ value } }  Se simula e.target.value

        input.simulate('change', { target:{ value } }); 

        expect( wrapper.find('p').text().trim() ).toBe( value );
    });

    test('No debe de postear la informacion con submit ', () => {
        
        wrapper.find('form').simulate('submit', { preventDefault(){} });

        expect( setCategories ).not.toHaveBeenCalled();

    });

    test('debe de llamar el setCategories y limpiar la caja de texto', () => {

        const value = 'Hola Mundo';

        // 1. simular el inputChanger el input
        wrapper.find('input').simulate('change', { target:{ value } });

        // 2. simular el submit
        wrapper.find('form').simulate('submit', { preventDefault(){} });

        // 3. setCategories se debe haver llamado
        expect( setCategories ).toHaveBeenCalled();
        expect( setCategories ).toHaveBeenCalledTimes(1);
        expect( setCategories ).toHaveBeenCalledWith( expect.any(Function) );        

        //4. el valor del input debe de estar ''
        expect( wrapper.find('input').prop('value') ).toBe('');
        
    });
    
    
    
});
