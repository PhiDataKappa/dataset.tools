import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconFolderOpen from 'material-ui/svg-icons/file/folder-open';
import IconLanguage from 'material-ui/svg-icons/action/language';

const dataworldIcon = <IconLanguage />;
const folderIcon = <IconFolderOpen />;
// const nearybyIcon = <FontIcon className="material-icons"></FontIcon>;
const datasetToolsIcon = <IconLocationOn />;

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
  open = () => require('electron').shell.showItemInFolder(require('os').homedir());
  dataworld = () => require('electron').shell.openExternal('http://data.world')

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="dataset.tools"
            icon={datasetToolsIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="local folder"
            icon={folderIcon}
            onClick={() => this.open().select(1)}
          />
          <BottomNavigationItem
            label="data.world"
            icon={dataworldIcon}
            onClick={() => this.dataworld().select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNavigationBar;
