import React from 'react';
import { render, wait } from '@testing-library/react';
import { getByTestId, fireEvent } from '@testing-library/dom';
import App from './App';


// you probably want to have some sort of timeout here so this doesn't hang in the event of some
// other grid related issue
const ensureGridApiHasBeenSet = (component) => {
  return new Promise(function (resolve, reject) {
    (function waitForGridReady() {
      if (getByTestId(component.container, 'api').innerHTML !== '') {
        return resolve();
      }
      setTimeout(waitForGridReady, 100);
    })();
  });
};


describe('row selection', () => {

  let appComponent = null;

  beforeEach(async () => {
    appComponent = render(<App />);
    await wait(() => ensureGridApiHasBeenSet(appComponent));
  });

  afterEach(() => {
    appComponent.unmount();
  })

  test('all rows selected', () => {
    let selectAllButton = getByTestId(appComponent.container, 'selectAll');
    fireEvent.click(selectAllButton);
    let selectedNodesLength = appComponent.container.querySelectorAll('.ag-center-cols-container .ag-row-selected').length;
    expect(selectedNodesLength).toBe(3);
  });

  test('all rows deselected', () => {
    let deSelectAllButton = getByTestId(appComponent.container, 'deSelectAll');
    fireEvent.click(deSelectAllButton);
    let selectedNodesLength = appComponent.container.querySelectorAll('.ag-center-cols-container .ag-row-selected').length;
    expect(selectedNodesLength).toBe(0);
  });

});