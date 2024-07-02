import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WishlistButton from './wishlistButton';
import { useWishlist } from '../../context/wishlistContext';

// Mock the useWishlist hook
vi.mock('../../context/wishlistContext', () => ({
  useWishlist: vi.fn()
}));

// Mock the react-icons components
vi.mock('react-icons/bs', () => ({
  BsSuitHeart: () => <div data-testid="empty-heart">Empty Heart</div>,
  BsSuitHeartFill: () => <div data-testid="filled-heart">Filled Heart</div>
}));

describe('WishlistButton Component', () => {
  const mockSneaker = { id: 1, name: 'Test Sneaker' };
  const mockHandleClick = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty heart icon when sneaker is not in wishlist', () => {
    vi.mocked(useWishlist).mockReturnValue({
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      resetWishlist: vi.fn(),
      wishlists: []
    });

    render(<WishlistButton sneaker={mockSneaker} handleClick={mockHandleClick} />);
    
    expect(screen.getByTestId('empty-heart')).toBeInTheDocument();
    expect(screen.queryByTestId('filled-heart')).not.toBeInTheDocument();
  });

  it('renders filled heart icon when sneaker is in wishlist', () => {
    vi.mocked(useWishlist).mockReturnValue({
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      resetWishlist: vi.fn(),
      wishlists: [mockSneaker]
    });

    render(<WishlistButton sneaker={mockSneaker} handleClick={mockHandleClick} />);
    
    expect(screen.getByTestId('filled-heart')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-heart')).not.toBeInTheDocument();
  });

  it('calls handleClick function when button is clicked', () => {
    vi.mocked(useWishlist).mockReturnValue({
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      resetWishlist: vi.fn(),
      wishlists: []
    });

    render(<WishlistButton sneaker={mockSneaker} handleClick={mockHandleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledWith(mockSneaker);
  });

  it('has correct CSS classes', () => {
    vi.mocked(useWishlist).mockReturnValue({
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      resetWishlist: vi.fn(),
      wishlists: []
    });

    render(<WishlistButton sneaker={mockSneaker} handleClick={mockHandleClick} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('mt-1');
    expect(button).toHaveClass('mr-2');
    expect(button).toHaveClass('font-black');
    expect(button).toHaveClass('absolute');
    expect(button).toHaveClass('top-8');
    expect(button).toHaveClass('right-0');
    expect(button).toHaveClass('z-50');
  });

  it('updates icon when wishlist changes', () => {
    const { rerender } = render(<WishlistButton sneaker={mockSneaker} handleClick={mockHandleClick} />);
    
    vi.mocked(useWishlist).mockReturnValue({
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      resetWishlist: vi.fn(),
      wishlists: []
    });
    expect(screen.getByTestId('empty-heart')).toBeInTheDocument();

    vi.mocked(useWishlist).mockReturnValue({
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      resetWishlist: vi.fn(),
      wishlists: [mockSneaker]
    });
    rerender(<WishlistButton sneaker={mockSneaker} handleClick={mockHandleClick} />);
    expect(screen.getByTestId('filled-heart')).toBeInTheDocument();
  });
});