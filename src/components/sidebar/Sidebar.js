import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Box, Button, Columns, Container, Dropdown, Heading, Image, Menu } from 'react-bulma-components';
import i18n from '../../i18n';
import Utils from '../../assets/utils';

import { toggleSidebar } from '../../actions/appAction';

import { menuItems } from '../../assets/constants';

import logo from '../../assets/images/logo.png';

import './sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.sidebarRef = React.createRef();
        this.language = Utils.getCurrentLanguage(i18n);
        this.currentLanguage = i18n.getDataByLanguage(this.language);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
        setTimeout(() => {
            this.sidebarRef.current.querySelector('.sidebar__toggle').classList.remove('sidebar__toggle--hidden');
        }, 1000);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.props.state.rootReducers.openDrawer && !this.sidebarRef.current.contains(e.target)) {
            this.props.dispatch(toggleSidebar());
        }
    };

    handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        this.language = language;
        this.currentLanguage = i18n.getDataByLanguage(this.language);
    };

    render() {
        return (
            <Fragment>
                <div
                    className={
                        'sidebar has-background-white no-print' +
                        (this.props.state.rootReducers.openDrawer ? ' sidebar--open' : '')
                    }
                    ref={this.sidebarRef}
                >
                    <Button
                        className="sidebar__toggle sidebar__toggle--hidden"
                        color="info"
                        onClick={() => this.props.dispatch(toggleSidebar())}
                    >
                        <FontAwesomeIcon icon="arrow-right" />
                    </Button>

                    <Container className="logo mx-0 my-0 px-4 py-4">
                        <Columns breakpoint="mobile" className="is-vcentered">
                            <Columns.Column narrow>
                                <Image src={logo} size={64} />
                            </Columns.Column>
                            <Columns.Column>
                                <Heading size={4}>{this.props.t('siteName')}</Heading>
                            </Columns.Column>
                        </Columns>
                    </Container>

                    <Menu>
                        <Menu.List>
                            {menuItems.map((menuItem, index) => (
                                <Menu.List.Item
                                    renderAs={Link}
                                    to={menuItem.to}
                                    key={index}
                                    onClick={() => this.props.dispatch(toggleSidebar())}
                                >
                                    <Fragment>
                                        <span className="menu-list-item-icon">
                                            <FontAwesomeIcon icon={menuItem.icon} />
                                        </span>
                                        <span className="menu-list-item-label">{this.props.t(menuItem.label)}</span>
                                    </Fragment>
                                </Menu.List.Item>
                            ))}
                        </Menu.List>
                    </Menu>

                    <Dropdown
                        className="dropdown__language mt-auto mx-4 py-4 pt-2"
                        up={true}
                        onChange={(language) => this.handleChangeLanguage(language)}
                        label={this.currentLanguage.label}
                        value={this.language}
                    >
                        {Object.keys(i18n.services.resourceStore.data).map((language, index) => (
                            <Dropdown.Item value={language} key={index}>
                                {i18n.getDataByLanguage(language).label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                    <Box className="mt-0 mx-4 my-4">
                        <Container>
                            <Columns breakpoint="mobile">
                                <Columns.Column>
                                    <p>GIL Jérôme</p>
                                    <p>PEYROT Thomas</p>
                                </Columns.Column>
                                <Columns.Column>
                                    <p>SCRIVEN Anthony</p>
                                    <p>DERRAR Marvin</p>
                                </Columns.Column>
                            </Columns>
                        </Container>
                    </Box>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state,
});

export default connect(mapStateToProps)(withTranslation()(Sidebar));
