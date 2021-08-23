import React from 'react';
import App from '../App';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('the App component', () => {
  const pictures = [
    {
      copyright: "Christopher Go",
      date: "2021-08-21",
      title: "Triple Transit and Mutual Events",
      url: "https://apod.nasa.gov/apod/image/2108/j20210815a_cgo_crop1200.jpg"
    }
  ]
  afterEach(cleanup)
  it('displays loading gif', () => {
    render(<App />)
    expect(screen.getByTestId('loading-gif')).toBeInTheDocument()
  })
  it('displays gallery container', () => {
    render(<App picturesTest={pictures} />)
    expect(screen.getByTestId('gallery')).toBeInTheDocument()
  })
  it('displays the arrows and img', () => {
    render(<App picturesTest={pictures} />)
    expect(screen.getByTestId('right-arrow')).toBeInTheDocument()
    expect(screen.getByTestId('left-arrow')).toBeInTheDocument()
    expect(screen.getByTestId('img')).toBeInTheDocument()
  })
  it('renders current picture component on click', () => {
    render(<App picturesTest={pictures} />)
    fireEvent.click(screen.getByTestId('btn-down'))
    expect(screen.getByTestId('current-picture-container')).toBeInTheDocument()
    expect(screen.getByTestId('current-picture')).toBeInTheDocument()
    expect(screen.getByTestId('current-picture-title')).toBeInTheDocument()
    expect(screen.getByTestId('current-picture-title')).toHaveTextContent('Triple Transit and Mutual Events')
    expect(screen.getByTestId('current-picture-author')).toBeInTheDocument()
    expect(screen.getByTestId('current-picture-author')).toHaveTextContent('Christopher Go')
  })
})