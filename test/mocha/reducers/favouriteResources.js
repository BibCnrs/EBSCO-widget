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

    describe('ADD_FAVOURITE_RESSOURCES', () => {
        it('should add given resource to state', () => {
            assert.deepEqual(
                favouriteResources(
                    ['resource1', 'resource2'],
                    actions.addFavouriteResource('new resource'),
                ),
                ['new resource', 'resource1', 'resource2'],
            );
        });
    });

    describe('REMOVE_FAVOURITE_RESSOURCES', () => {
        it('should remove given url from state', () => {
            assert.deepEqual(
                favouriteResources(
                    [
                        { url: 'resource1' },
                        { url: 'resource2' },
                        { url: 'resource3' },
                    ],
                    actions.removeFavouriteResource('resource2'),
                ),
                [{ url: 'resource1' }, { url: 'resource3' }],
            );
        });
    });
});
