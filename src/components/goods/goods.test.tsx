import { render, screen } from '@testing-library/react';
import { Goods } from './goods';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { mockFullOffer } from '../../store/mocks/full-offer';


describe('Component: Offer List', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<Goods goods={mockFullOffer.goods}/>);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('goods')).toBeInTheDocument();
  });
});
