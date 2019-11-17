import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App } from './App';
import { CircularProgress } from 'material-ui/Progress';
import FileUploaderContainer from './Components/FileUploaderContainer';
import RouteContainer from './Components/RouteContainer';

describe('App main component', () => {
  it('Initial render without crashing', () => {
      const props = {
          showRoute: false,
          progress: false,
          id: null
      };
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.find(CircularProgress).length).toBe(0);
      expect(wrapper.find(FileUploaderContainer).length).toBe(1);
      expect(wrapper.find(RouteContainer).length).toBe(0);
      expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('Loading some activity render', () => {
        const props = {
            showRoute: false,
            progress: true,
            id: null
        };
        const wrapper = shallow(<App {...props} />);
        expect(wrapper.find(CircularProgress).length).toBe(1);
        expect(wrapper.find(FileUploaderContainer).length).toBe(1);
        expect(wrapper.find(RouteContainer).length).toBe(0);
  });
  it('Some activity loaded render', () => {
        const idActivity = "1234567890";
        const props = {
            showRoute: true,
            progress: false,
            id: idActivity
        };
        const wrapper = shallow(<App {...props} />);
        expect(wrapper.find(CircularProgress).length).toBe(0);
        expect(wrapper.find(FileUploaderContainer).length).toBe(1);
        const routeContainer = wrapper.find(RouteContainer);
        expect(routeContainer.length).toBe(1);
        expect(routeContainer.props().id).toBe(idActivity);
  });
});
