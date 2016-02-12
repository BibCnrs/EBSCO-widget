import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

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
                this.props.push(`/login?next=${this.props.location.pathname}`);
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
        token: state.login.token
    });

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            push: routeActions.push
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
