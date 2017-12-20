import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconFolderOpen from 'material-ui/svg-icons/file/folder-open';
import IconLanguage from 'material-ui/svg-icons/action/language';

const recentsIcon = <IconLanguage />;
const favoritesIcon = <IconFolderOpen />;
// const nearybyIcon = <FontIcon className="material-icons"></FontIcon>;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNavigationBar extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="data.world"
            icon={recentsIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="local folder"
            icon={favoritesIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="dataset.tools"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNavigationBar;
