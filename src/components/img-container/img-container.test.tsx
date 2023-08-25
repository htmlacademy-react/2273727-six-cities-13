import { render, screen } from '@testing-library/react';
import { ImgContainer } from './img-container';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { mockFullOffer } from '../../store/mocks/mock-full-offer';


describe('Component: Img Container', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<ImgContainer images={mockFullOffer.images} />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('img-container')).toBeInTheDocument();
  });
});
