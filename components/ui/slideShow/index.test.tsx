import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SlideShow from './index';
import { gsap } from 'gsap';

// Mock the gsap library
vi.mock('gsap', () => ({
  gsap: {
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({
      fromTo: vi.fn(),
      restart: vi.fn(),
    })),
    context: vi.fn((callback) => {
      callback();
      return { revert: vi.fn() };
    }),
  },
}));

// Mock the child components
vi.mock('../../shared/bannerText.tsx', () => ({
  default: () => <div data-testid="banner-text">Banner Text</div>,
}));

vi.mock('./slideContainer', () => ({
  default: ({ prevSlide, nextSlide, goToSlide }) => (
    <div data-testid="slide-container">
      <button onClick={prevSlide} data-testid="prev-button">Prev</button>
      <button onClick={nextSlide} data-testid="next-button">Next</button>
      <button onClick={() => goToSlide(1)} data-testid="go-to-slide">Go to Slide 1</button>
    </div>
  ),
}));

describe('SlideShow component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<SlideShow />);
    expect(screen.getByTestId('banner-text')).toBeTruthy();
    expect(screen.getByTestId('slide-container')).toBeTruthy();
  });

  it('initializes with the first slide', () => {
    render(<SlideShow />);
    expect(gsap.fromTo).toHaveBeenCalledTimes(2); // Once for each image slide
  });
});