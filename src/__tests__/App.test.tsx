import { it, expect, describe, beforeEach } from 'vitest';
import { render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from '../App';

describe('Calculator App', () => {

    // Define containers
    let numberContainer: HTMLElement;
    let operatorContainer: HTMLElement;
    let miscContainer: HTMLElement;
    let displayContainer: HTMLElement;

    beforeEach(() => {
        // Render App.tsx
        render(<App />);

        // Initialize containers
        numberContainer = document.querySelector('#numbers')!;
        operatorContainer = document.querySelector('#operators')!;
        miscContainer = document.querySelector('#misc')!;
        displayContainer = document.querySelector('#final-result')!;
    });

    it('should add two numbers', () => {
        // Click on the number buttons to input 5 and 3
        fireEvent.click(getByText(numberContainer, '5'));
        fireEvent.click(getByText(operatorContainer, '+'));
        fireEvent.click(getByText(numberContainer, '3'));
        fireEvent.click(getByText(operatorContainer, '='));

        // Assert that the display shows 8
        expect(getByText(displayContainer, '8')).toHaveTextContent('8');
    });

    it('should subtract two numbers', () => {
        // Click on the number buttons to input 5 and 3
        fireEvent.click(getByText(numberContainer, '5'));
        fireEvent.click(getByText(operatorContainer, '-'));
        fireEvent.click(getByText(numberContainer, '3'));
        fireEvent.click(getByText(operatorContainer, '='));
    
        // Assert that the display shows 2
        expect(getByText(displayContainer, '2')).toHaveTextContent('2');
    });
        
    it('should multiply two numbers', () => {
        // Click on the number buttons to input 5 and 3
        fireEvent.click(getByText(numberContainer, '5'));
        fireEvent.click(getByText(operatorContainer, '*'));
        fireEvent.click(getByText(numberContainer, '3'));
        fireEvent.click(getByText(operatorContainer, '='));

        // Assert that the display shows 15
        expect(getByText(displayContainer, '15')).toHaveTextContent('15');
    });
        
    it('should divide two numbers', () => {
        // Click on the number buttons to input 6 and 3
        fireEvent.click(getByText(numberContainer, '6'));
        fireEvent.click(getByText(operatorContainer, '/'));
        fireEvent.click(getByText(numberContainer, '3'));
        fireEvent.click(getByText(operatorContainer, '='));

        // Assert that the display shows 2
        expect(getByText(displayContainer, '2')).toHaveTextContent('2');
    });
        
    it('should clear the calculator', () => {
        // Input some numbers and operations
        fireEvent.click(getByText(numberContainer, '5'));
        fireEvent.click(getByText(operatorContainer, '+'));
        fireEvent.click(getByText(numberContainer, '3'));

        // Click on the clear button
        fireEvent.click(getByText(miscContainer, 'AC'));

        // Assert that the display is empty
        expect(getByText(displayContainer, '0')).toHaveTextContent('0');
    });

    it('should perform all four operations before pressing equals', () => {
        // Input some numbers and operations
        fireEvent.click(getByText(numberContainer, '1'));
        fireEvent.click(getByText(numberContainer, '0'));
        fireEvent.click(getByText(operatorContainer, '+'));
        fireEvent.click(getByText(numberContainer, '2'));
        fireEvent.click(getByText(operatorContainer, '-'));
        fireEvent.click(getByText(numberContainer, '3'));
        fireEvent.click(getByText(operatorContainer, '*'));
        fireEvent.click(getByText(numberContainer, '4'));
        fireEvent.click(getByText(operatorContainer, '/'));
        fireEvent.click(getByText(numberContainer, '2'));
        fireEvent.click(getByText(operatorContainer, '='));

         // Assert that the display shows 6 (10 + 2 - 3 * 4 / 2)
        expect(getByText(displayContainer, '6')).toHaveTextContent('6');
    });
})
