import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Carousel from './carousel';  // Adjust the import path as needed
import WishlistProvider from '../../context/wishlistContext';  // Adjust the import path as needed

// Mock the external modules
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
  },
}));
vi.mock('gsap/dist/ScrollTrigger', () => ({
  default: {},
}));
vi.mock('swiper/react', () => ({
  Swiper: vi.fn(({ children }) => <div data-testid="swiper">{children}</div>),
  SwiperSlide: vi.fn(({ children }) => <div data-testid="swiper-slide">{children}</div>),
}));

describe('Carousel Component', () => {
  const mockSneakers = [
    { id: 1, brand: { id: 1, name: 'Nike' }, shortDescription: 'Air Max', priceInfo: { formattedFinalPrice: '$100' }, images: { cutOut: 'image1.jpg' } },
    { id: 2, brand: { id: 2, name: 'Adidas' }, shortDescription: 'Ultraboost', priceInfo: { formattedFinalPrice: '$120' }, images: { cutOut: 'image2.jpg' } },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders the carousel with correct text', () => {
    render(
      <WishlistProvider>
        <Carousel text="Test Carousel" sneakers={mockSneakers} gender="men" />
      </WishlistProvider>
    );
    expect(screen.getByText('Test Carousel')).toBeDefined();
  });

  it('renders the correct number of slides', () => {
    render(
      <WishlistProvider>
        <Carousel text="Test Carousel" sneakers={mockSneakers} gender="men" />
      </WishlistProvider>
    );
    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(mockSneakers.length);
  });

  it('displays sneaker information correctly', () => {
    render(
      <WishlistProvider>
        <Carousel text="Test Carousel" sneakers={mockSneakers} gender="men" />
      </WishlistProvider>
    );
    expect(screen.getByText('Nike')).toBeDefined();
    expect(screen.getByText('Air Max')).toBeDefined();
    expect(screen.getByText('$100')).toBeDefined();
  });

});