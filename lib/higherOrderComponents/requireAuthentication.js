import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.token);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.token);
        }

        checkAuth (token) {
            if (!token) {
                this.props.goToLogin();
            }
        }

        render () {
            return (
                <div>
                    {this.props.token
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            );
        }
    }

    const mapStateToProps = (state) => ({
        location: state.userInterface.location,
        token: state.login.token
    });

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            goToLogin: () => actions.navigate('login')
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
