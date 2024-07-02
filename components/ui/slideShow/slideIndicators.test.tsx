import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import SlideIndicators from './slideIndicators';

// Mock react-icons
vi.mock('react-icons/bs', () => ({
  BsSquare: () => <div data-testid="square" />,
  BsSquareFill: () => <div data-testid="square-fill" />,
}));

describe('SlideIndicators', () => {
  const mockSlides = [
    { url1: 'image1.jpg', url2: 'image2.jpg' },
    { url1: 'image3.jpg', url2: 'image4.jpg' },
  ];
  const mockGoToSlide = vi.fn();

  const defaultProps = {
    slides: mockSlides,
    currentIndex: 0,
    goToSlide: mockGoToSlide,
  };

  it('renders the correct number of indicators', () => {
    render(<SlideIndicators {...defaultProps} />);
    
    const indicators = screen.getAllByTestId(/^slide-indicator-/);
    expect(indicators).toHaveLength(mockSlides.length);
  });

  it('renders filled square for the current slide and empty squares for others', () => {
    render(<SlideIndicators {...defaultProps} />);
    
    const filledSquares = screen.getAllByTestId('square-fill');
    const emptySquares = screen.getAllByTestId('square');

    expect(filledSquares).toHaveLength(1);
    expect(emptySquares).toHaveLength(mockSlides.length - 1);
  });


  it('updates the filled square when currentIndex changes', () => {
    const { rerender } = render(<SlideIndicators {...defaultProps} />);
    
    let filledSquares = screen.getAllByTestId('square-fill');
    let emptySquares = screen.getAllByTestId('square');

    expect(filledSquares).toHaveLength(1);
    expect(emptySquares).toHaveLength(mockSlides.length - 1);

    rerender(<SlideIndicators {...defaultProps} currentIndex={1} />);

    filledSquares = screen.getAllByTestId('square-fill');
    emptySquares = screen.getAllByTestId('square');

    expect(filledSquares).toHaveLength(1);
    expect(emptySquares).toHaveLength(mockSlides.length - 1);
    expect(filledSquares[0].parentElement).toHaveAttribute('data-testid', 'slide-indicator-1');
  });
});
