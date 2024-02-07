import { render, screen, fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom";
import Popup from '@/components/ui/Popup';

describe('Popup Component', () => {
  it('should not render popup', () => {
    render(<Popup show={false}><div>Test Content</div></Popup>);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('should render popup', () => {
    render(<Popup show={true}><div>Test Content</div></Popup>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should call onClose when the overlay is clicked', () => {
    const handleClose = jest.fn();
    render(<Popup show={true} onClose={handleClose}><div>Test Content</div></Popup>);

    const overlay = screen.getByTestId('overlay'); 
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
