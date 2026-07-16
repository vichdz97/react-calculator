import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, getByText, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import AppV2 from '../AppV2';

describe('Calculator App', () => {

    let resultContainer: HTMLElement;

    beforeEach(() => {
        render(<AppV2 />);
        resultContainer = document.querySelector('#result')!;
    });

    afterEach(() => {
        cleanup();
    });

    it('should add two numbers', () => {
        // 6 + 7
        fireEvent.click(screen.getByRole('button', { name: '6' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '7' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

        // assert sum is 13
        expect(getByText(resultContainer, '13')).toHaveTextContent('13');
    });

    it('should subtract two numbers', () => {
        // 5 - 3
        fireEvent.click(screen.getByRole('button', { name: '5' }));
        fireEvent.click(screen.getByRole('button', { name: '-' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
    
        // assert difference is 2
        expect(getByText(resultContainer, '2')).toHaveTextContent('2');
    });
        
    it('should multiply two numbers', () => {
        // 4 * 4
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        fireEvent.click(screen.getByRole('button', { name: '×' }));
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

        // assert product is 16
        expect(getByText(resultContainer, '16')).toHaveTextContent('16');
    });
        
    it('should divide two numbers', () => {
        // 100 / 5
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        fireEvent.click(screen.getByRole('button', { name: '÷' }));
        fireEvent.click(screen.getByRole('button', { name: '5' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

        // assert quotient is 20
        expect(getByText(resultContainer, '20')).toHaveTextContent('20');
    });
        
    it('should clear the calculator', () => {
        // input some numbers and operations
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        
        // clear result
        fireEvent.click(screen.getByRole('button', { name: 'AC' }));

        // assert result is 0
        expect(getByText(resultContainer, '0')).toHaveTextContent('0');
    });

    it('should perform all four operations before pressing equals', () => {
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '-' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '×' }));
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        fireEvent.click(screen.getByRole('button', { name: '÷' }));
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

         // assert result is 6 (10 + 2 - 3 * 4 / 2)
        expect(getByText(resultContainer, '6')).toHaveTextContent('6');
    });

    it('should allow decimals after a whole number', () => {
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '.' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));

        // assert result is 2.0
        expect(getByText(resultContainer, '2.0')).toHaveTextContent('2.0');
    });
})
