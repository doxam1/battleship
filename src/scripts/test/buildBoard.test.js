/**
 * @jest-environment jsdom
 */

// got help from chat gpt

import buildBoard from "../buildBoardDOM";


describe('buildBoard', () => {
  let mockBoardElement;

  beforeEach(() => {
    // Create a mock element for the board
    mockBoardElement = {
      innerHTML: '',
      appendChild: jest.fn(),
    };

    // Mock document.querySelector to return the mock board element
    jest.spyOn(document, 'querySelector').mockReturnValue(mockBoardElement);

    // Mock document.createElement to return a mock element with necessary properties
    jest.spyOn(document, 'createElement').mockImplementation(() => {
      return {
        classList: {
          add: jest.fn(),
        },
        style: {},
      };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  it('should clear the board and append squares with the correct size', () => {
    buildBoard(10, 'testBoardClass');

    expect(mockBoardElement.innerHTML).toBe(''); // Check that the board was cleared
    expect(mockBoardElement.appendChild).toHaveBeenCalledTimes(100); // 10x10 grid

    const firstCall = mockBoardElement.appendChild.mock.calls[0][0]; // First appended square
    expect(firstCall.classList.add).toHaveBeenCalledWith('square', 'testBoardClass');
    expect(firstCall.style.width).toBe('40px');
    expect(firstCall.style.height).toBe('40px');
  });
});
