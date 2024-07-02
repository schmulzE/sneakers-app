import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Slide from './slide'; // Adjust the import path as needed

describe('Slide component', () => {
  it('renders correctly with provided props', () => {
    const props = {
      imageClass: 'test-image-class',
      url: 'https://example.com/image.jpg',
      additionalClasses: 'additional-class-1 additional-class-2'
    };

    const { container } = render(<Slide {...props} />);
    const slideDiv = container.firstChild as HTMLElement;

    // Check if the div is rendered
    expect(slideDiv).toBeTruthy();

    // Check if the background image is set correctly
    expect(slideDiv.style.backgroundImage).toBe(`url(${props.url})`);

    // Check if the classes are applied correctly
    expect(slideDiv.className).toContain(props.imageClass);
    expect(slideDiv.className).toContain(props.additionalClasses);
    expect(slideDiv.className).toContain('border-black border bg-center bg-cover');
  });

  it('applies default classes even without custom classes', () => {
    const props = {
      imageClass: '',
      url: 'https://example.com/image.jpg',
      additionalClasses: ''
    };

    const { container } = render(<Slide {...props} />);
    const slideDiv = container.firstChild as HTMLElement;

    expect(slideDiv.className).toContain('border-black border bg-center bg-cover');
  });
});