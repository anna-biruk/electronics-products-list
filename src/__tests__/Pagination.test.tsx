import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Pagination, { Props } from '../components/Pagination';

describe('Pagination', () => {
  const handlePageChange = jest.fn();
  const pageNumber = 1;
  const props: Props = { handlePageChange, pageNumber };

  it('renders the component with Next and Previous buttons', () => {
    const { getByText } = render(<Pagination {...props} />);
    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });
  it('calls handlePageChange when Next button is clicked', () => {
    const handlePageChange = jest.fn();
    const props = {
      handlePageChange,
      pageNumber: 1,
    };
    const { getByText } = render(<Pagination {...props} />);

    fireEvent.click(getByText('Next'));

    expect(handlePageChange).toHaveBeenCalled();
    expect(handlePageChange).toBeCalledTimes(1);
  });
  it('calls handlePageChange when Previous button is clicked', () => {
    const handlePageChange = jest.fn();
    const props = {
      handlePageChange,
      pageNumber: 2,
    };
    const { getByText } = render(<Pagination {...props} />);

    fireEvent.click(getByText('Previous'));

    expect(handlePageChange).toHaveBeenCalled();
    expect(handlePageChange).toBeCalledTimes(1);
  });
  it('disables Previous button when pageNumber is 1', () => {
    const { getByText } = render(<Pagination {...props} />);
    expect(getByText('Previous')).toBeDisabled();
  });
});
