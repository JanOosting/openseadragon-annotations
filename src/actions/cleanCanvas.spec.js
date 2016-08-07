import test from 'ava';
import Dispatcher from '../dispatcher/Dispatcher';
import types from '../constants/actionTypes';
import cleanCanvas from './cleanCanvas';
import sinon from 'sinon';

let dispatch;

test.beforeEach(t => {
  dispatch = sinon.spy(Dispatcher, 'dispatch');
});

test.beforeEach(t => {
  cleanCanvas();
});

test.afterEach(t => {
  Dispatcher.dispatch.restore();
});

test('should abort any ongoing activity', t => {
  t.true(dispatch.firstCall.calledWith({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

test('then it should empty the annotations list', t => {
  t.true(dispatch.secondCall.calledWith({
    type: types.ANNOTATIONS_RESET,
    annotations: [],
  }));
});