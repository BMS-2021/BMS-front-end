import React, { useState } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

import { useRouter } from 'next/router';

import { getUserStateContext } from '../utils/UserState';

const categories = [
  {
    id: '功能列表',
    children: [
      {
        id: 'query',
        name: '查询图书',
        icon: <DnsRoundedIcon />,
        loginRequired: false,
      },
      {
        id: 'import',
        name: '导入图书',
        icon: <PeopleIcon />,
        loginRequired: true,
      },
      {
        id: 'borrow',
        name: '借阅图书',
        icon: <PermMediaOutlinedIcon />,
        loginRequired: true,
      },
      {
        id: 'return',
        name: '归还图书',
        icon: <PublicIcon />,
        loginRequired: true,
      },
      {
        id: 'card',
        name: '卡片管理',
        icon: <SettingsEthernetIcon />,
        loginRequired: true,
      },
    ],
  },
];

const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
      color: theme.palette.common.white,
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  });

export interface NavigatorProps
  extends Omit<DrawerProps, 'classes'>,
    WithStyles<typeof styles> {
  navName: string;
}

function Navigator(props: NavigatorProps) {
  const { classes, navName, ...other } = props;

  const [activeListItem, setActiveListItem] = useState(navName);

  const router = useRouter();

  const { state } = getUserStateContext();

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          {navName}
        </ListItem>
        <ListItem
          className={clsx(classes.item, classes.itemCategory)}
          button
          onClick={() => router.push('/')}
        >
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            {'返回首页'}
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, name, icon, loginRequired }) => (
              <ListItem
                key={childId}
                button
                className={clsx(
                  classes.item,
                  activeListItem === childId && classes.itemActiveItem
                )}
                onClick={(): void => {
                  setActiveListItem(childId);
                  router.push(childId);
                }}
                disabled={loginRequired && state.username === null}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {name}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
