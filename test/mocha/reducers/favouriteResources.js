import favouriteResources from '../../../lib/reducers/favouriteResources';
import actions from '../../../lib/actions';

describe('favouriteResources reducers', () => {
    describe('LOGIN_SUCCESS', () => {
        it('should set state to favouriteRessources', () => {
            assert.deepEqual(
                favouriteResources(
                    [],
                    actions.loginSuccess({
                        favouriteResources: 'favouriteResources',
                    }),
                ),
                'favouriteResources',
            );
        });
        it('should set state to [] if no favouriteRessources', () => {
            assert.deepEqual(
                favouriteResources([], actions.loginSuccess({})),
                [],
            );
        });
    });

    describe('LOGOUT', () => {
        it('should set state to []', () => {
            assert.deepEqual(favouriteResources('state', actions.logout()), []);
        });
    });
});
