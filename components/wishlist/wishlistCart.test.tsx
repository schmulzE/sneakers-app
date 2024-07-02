import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WishlistCart from './wishlistCart';

// Mock the WishlistCartItem component
vi.mock('./wishlistCartItem', () => ({
  default: ({ sneaker }: { sneaker: Sneakers }) => (
    <div data-testid="wishlist-cart-item">{sneaker.brand.name}</div>
  ),
}));

describe('WishlistCart Component', () => {
  const mockData = [
    {
      id: 1,
      brand: { id: 1, name: 'Brand A' },
      shortDescription: 'Product A',
      priceInfo: { formattedFinalPrice: '$100' },
      images: { cutOut: 'imageA.png' },
      size: 42,
      quantity: 1,
    },
    {
      id: 2,
      brand: { id: 1, name: 'Brand B' },
      shortDescription: 'Product B',
      priceInfo: { formattedFinalPrice: '$200' },
      images: { cutOut: 'imageB.png' },
      size: 43,
      quantity: 2,
    },
  ];
  const mockHandleClick = vi.fn();
  const mockAddToBag = vi.fn();

  it('renders the correct number of WishlistCartItem components', () => {
    render(
      <WishlistCart
        data={mockData}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    const items = screen.getAllByTestId('wishlist-cart-item');
    expect(items).toHaveLength(mockData.length);
  });

  it('passes correct props to WishlistCartItem components', () => {
    render(
      <WishlistCart
        data={mockData}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    mockData.forEach((sneaker) => {
      expect(screen.getByText(sneaker.brand.name)).toBeInTheDocument();
    });
  });

  it('renders correctly with empty data', () => {
    render(
      <WishlistCart data={[]} handleClick={mockHandleClick} addToBag={mockAddToBag} />
    );

    const items = screen.queryAllByTestId('wishlist-cart-item');
    expect(items).toHaveLength(0);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <WishlistCart
        data={mockData}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    expect(container.firstChild).toHaveClass('bg-white');
    
    const innerContainer = container.firstChild?.firstChild;
    expect(innerContainer).toHaveClass('mx-auto', 'max-w-2xl', 'py-8', 'px-4', 'sm:py-24', 'sm:px-6', 'lg:max-w-7xl', 'lg:px-8');

    const grid = innerContainer?.firstChild;
    expect(grid).toHaveClass('grid', 'grid-cols-2', 'gap-y-10', 'gap-x-6', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'xl:gap-x-8');
  });

  it('filters out items with falsy ids', () => {
    const dataWithFalsyId = [
      ...mockData,
      { id: 0, name: 'Sneaker with falsy id' },
    ];

    render(
      <WishlistCart
        data={dataWithFalsyId}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    const items = screen.getAllByTestId('wishlist-cart-item');
    expect(items).toHaveLength(mockData.length);
    expect(screen.queryByText('Sneaker with falsy id')).not.toBeInTheDocument();
  });
});