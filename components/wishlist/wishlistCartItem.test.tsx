import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WishlistCartItem from './wishlistCartItem';

// Mock the react-icons components
vi.mock('react-icons/md', () => ({
  MdClose: () => <div data-testid="close-icon">Close</div>
}));

// Mock the BagButton component
vi.mock('../bag/bagButton', () => ({
  default: ({ sneaker, addToBag }: { sneaker: Sneakers; addToBag: (item: Sneakers) => void }) => (
    <button data-testid="bag-button" onClick={() => addToBag(sneaker)}>
      Add to Bag
    </button>
  )
}));

// Mock the SneakerListItem component
vi.mock('../sneaker/sneakerListItem', () => ({
  default: ({ sneaker }: { sneaker: Sneakers }) => (
    <div data-testid="sneaker-list-item">
      <span>{sneaker.brand?.name}</span>
      <span>{sneaker.shortDescription}</span>
      <span>{sneaker.priceInfo?.formattedFinalPrice}</span>
    </div>
  )
}));

describe('WishlistCartItem Component', () => {
  const mockSneaker = {
    id: 1,
    shortDescription: 'Test Sneaker',
    brand: { id: 1,  name: 'Test Brand' },
    priceInfo: { formattedFinalPrice: '$100' },
    images: { cutOut: 'test-image.jpg' }
  };
  const mockHandleClick = vi.fn();
  const mockAddToBag = vi.fn();

  it('renders the close button', () => {
    render(
      <WishlistCartItem
        sneaker={mockSneaker}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('calls handleClick when close button is clicked', () => {
    render(
      <WishlistCartItem
        sneaker={mockSneaker}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockHandleClick).toHaveBeenCalledWith(mockSneaker);
  });

  it('renders the SneakerListItem component with correct sneaker information', () => {
    render(
      <WishlistCartItem
        sneaker={mockSneaker}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    expect(screen.getByTestId('sneaker-list-item')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Sneaker')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('renders the BagButton component', () => {
    render(
      <WishlistCartItem
        sneaker={mockSneaker}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    expect(screen.getByTestId('bag-button')).toBeInTheDocument();
  });

  it('calls addToBag when BagButton is clicked', () => {
    render(
      <WishlistCartItem
        sneaker={mockSneaker}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    fireEvent.click(screen.getByTestId('bag-button'));
    expect(mockAddToBag).toHaveBeenCalledWith(mockSneaker);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <WishlistCartItem
        sneaker={mockSneaker}
        handleClick={mockHandleClick}
        addToBag={mockAddToBag}
      />
    );

    const gridDiv = container.firstChild;
    expect(gridDiv).toHaveClass('grid');

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveClass('relative', 'justify-self-end', 'p-2', 'w-9', 'h-9', 'rounded-full', 'mt-1', 'mr-3', 'font-black', 'z-10');
  });
});