// SlideContainer.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import SlideContainer from './slideContainer';

// Mock the child components
vi.mock('../arrowButton', () => ({
  default: ({ direction, onClick }: { direction: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={`arrow-${direction}`}>
      {direction}
    </button>
  ),
}));

vi.mock('./slide', () => ({
  default: ({ url, imageClass, additionalClasses }: { url: string; imageClass: string; additionalClasses: string }) => (
    <div data-testid={imageClass} className={additionalClasses}>
      {url}
    </div>
  ),
}));

vi.mock('./slideIndicators', () => ({
  default: ({ slides, currentIndex, goToSlide }: { slides: any[]; currentIndex: number; goToSlide: (index: number) => void }) => (
    <div data-testid="slide-indicators">
      {slides.map((_, index) => (
        <button key={index} onClick={() => goToSlide(index)} data-testid={`indicator-${index}`}>
          {index}
        </button>
      ))}
    </div>
  ),
}));

describe('SlideContainer', () => {
  const mockSlides = [
    { url1: 'image1.jpg', url2: 'image2.jpg' },
    { url1: 'image3.jpg', url2: 'image4.jpg' },
  ];
  const mockPrevSlide = vi.fn();
  const mockNextSlide = vi.fn();
  const mockGoToSlide = vi.fn();

  const defaultProps = {
    slides: mockSlides,
    currentIndex: 0,
    prevSlide: mockPrevSlide,
    nextSlide: mockNextSlide,
    goToSlide: mockGoToSlide,
  };

  it('renders both slides', () => {
    render(<SlideContainer {...defaultProps} />);
    
    expect(screen.getByTestId('left_image_slide')).toBeInTheDocument();
    expect(screen.getByTestId('right_image_slide')).toBeInTheDocument();
  });

  it('renders arrow buttons', () => {
    render(<SlideContainer {...defaultProps} />);
    
    expect(screen.getByTestId('arrow-left')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-right')).toBeInTheDocument();
  });

  it('renders slide indicators', () => {
    render(<SlideContainer {...defaultProps} />);
    
    expect(screen.getByTestId('slide-indicators')).toBeInTheDocument();
  });

  it('calls prevSlide when left arrow is clicked', () => {
    render(<SlideContainer {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('arrow-left'));
    expect(mockPrevSlide).toHaveBeenCalledTimes(1);
  });

  it('calls nextSlide when right arrow is clicked', () => {
    render(<SlideContainer {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('arrow-right'));
    expect(mockNextSlide).toHaveBeenCalledTimes(1);
  });

  it('calls goToSlide when an indicator is clicked', () => {
    render(<SlideContainer {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('indicator-1'));
    expect(mockGoToSlide).toHaveBeenCalledWith(1);
  });

  it('applies correct classes to slide elements', () => {
    render(<SlideContainer {...defaultProps} />);
    
    const leftSlide = screen.getByTestId('left_image_slide');
    const rightSlide = screen.getByTestId('right_image_slide');

    expect(leftSlide).toHaveClass('lg:w-[50%]', 'md:w-[50%]', 'w-full', 'md:h-[440px]', 'lg:h-full', 'h-full', 'lg:absolute', 'lg:top-0', 'lg:left-4', 'lg:mt-10');
    expect(rightSlide).toHaveClass('w-[50%]', 'md:h-[470px]', 'absolute', 'top-0', 'right-4', 'lg:h-full', 'h-full', 'hidden', 'md:block', 'lg:block');
  });

  it('renders correct slide content based on currentIndex', () => {
    const { rerender } = render(<SlideContainer {...defaultProps} />);
    
    expect(screen.getByTestId('left_image_slide')).toHaveTextContent('image1.jpg');
    expect(screen.getByTestId('right_image_slide')).toHaveTextContent('image2.jpg');

    rerender(<SlideContainer {...defaultProps} currentIndex={1} />);

    expect(screen.getByTestId('left_image_slide')).toHaveTextContent('image3.jpg');
    expect(screen.getByTestId('right_image_slide')).toHaveTextContent('image4.jpg');
  });
});